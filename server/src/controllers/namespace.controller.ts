import type { Context } from 'koa';

import {
  PLUGIN_ID,
  PLUGIN_NAMESPACE_TABLE_NAME,
  PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME,
  PLUGIN_TRANSLATION_TABLE_NAME,
} from '../../../admin/src/pluginId';

export default {
  /*************************************************************************************************
   * NAMESPACE controllers - query
   *************************************************************************************************/
  async namespaceFindNamespaces(ctx: Context) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const namespaceRepo = strapi.db.query(`plugin::${PLUGIN_ID}.namespace`);
    const namespaces = await namespaceRepo.findMany({
      where: { project: ctx.params.projectId },
      limit: pageSize,
      offset: start,
      orderBy: { name: 'asc' },
    });
    const total = await namespaceRepo.count({ where: { project: ctx.params.projectId } });

    ctx.body = {
      items: namespaces,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) },
    };
  },
  async namespaceFindNamespacesAll(ctx: Context) {
    const namespaceRepo = strapi.db.query(`plugin::${PLUGIN_ID}.namespace`);
    const namespaces = await namespaceRepo.findMany({
      where: { project: ctx.params.projectId },
      orderBy: { name: 'asc' },
    });
    ctx.body = namespaces;
  },
  async namespaceFindNamespaceById(ctx: Context) {
    const { namespaceId } = ctx.params;
    const namespace = await strapi.db
      .query(`plugin::${PLUGIN_ID}.namespace`)
      .findOne({ where: { id: namespaceId }, populate: ['translations'] });
    ctx.body = namespace;
  },
  async namespaceFindNamespacesWithMissingTranslations(ctx: Context) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const projectId = Number(ctx.params.projectId);

    const knex = strapi.db.connection;

    const locales = await strapi.plugin('i18n').service('locales').find();
    const localeCodes = locales.map((l) => l.code);

    const nsMeta = strapi.db.metadata.get(`plugin::${PLUGIN_ID}.namespace`);

    const nsToTr = nsMeta.attributes.translations as unknown as {
      joinTable: {
        name: string;
        joinColumn: { name: string };
        inverseJoinColumn: { name: string };
      };
    };

    const nsToPr = nsMeta.attributes.project as unknown as
      | {
          joinTable: {
            name: string;
            joinColumn: { name: string };
            inverseJoinColumn: { name: string };
          };
        }
      | { columnName: string };

    const nsTrJoinTable = nsToTr.joinTable.name;
    const nsTrJoinCol = nsToTr.joinTable.joinColumn.name;
    const nsTrInvCol = nsToTr.joinTable.inverseJoinColumn.name;

    let projectJoin: { table: string; nsKey: string; prKey: string } | null = null;
    if ('joinTable' in nsToPr) {
      projectJoin = {
        table: nsToPr.joinTable.name,
        nsKey: nsToPr.joinTable.joinColumn.name,
        prKey: nsToPr.joinTable.inverseJoinColumn.name,
      };
    } else if ('columnName' in nsToPr) {
      projectJoin = null;
    }

    const nsTable = PLUGIN_NAMESPACE_TABLE_NAME;
    const trTable = PLUGIN_TRANSLATION_TABLE_NAME;

    const missingCondition = localeCodes
      .map((lang) => `t.${lang} IS NULL OR t.${lang} = ''`)
      .join(' OR ');

    const query = knex({ n: nsTable })
      .select(
        'n.id',
        'n.name',
        'n.description',
        knex.raw(`
        COALESCE(CAST(
          COUNT(DISTINCT t.id) FILTER (WHERE ${missingCondition})
          AS INTEGER
        ), 0) AS "missingTranslationsCount"
      `),
        knex.raw(`
        COALESCE(CAST(COUNT(DISTINCT t.id) AS INTEGER), 0) AS "totalTranslationsCount"
      `)
      )
      .modify((qb) => {
        if (projectJoin) {
          qb.join({ np: projectJoin.table }, `np.${projectJoin.nsKey}`, 'n.id').where(
            `np.${projectJoin.prKey}`,
            projectId
          );
        } else {
          qb.where('n.project_id', projectId);
        }
      })
      .leftJoin({ nt: nsTrJoinTable }, `nt.${nsTrJoinCol}`, 'n.id')
      .leftJoin({ t: trTable }, 't.id', `nt.${nsTrInvCol}`)
      .groupBy('n.id')
      .orderBy('n.name', 'asc')
      .limit(pageSize)
      .offset(start);

    const items = await query;

    const totalQuery = knex({ n: nsTable })
      .count<{ count: string }>('* as count')
      .modify((qb) => {
        if (projectJoin) {
          qb.join({ np: projectJoin.table }, `np.${projectJoin.nsKey}`, 'n.id').where(
            `np.${projectJoin.prKey}`,
            projectId
          );
        } else {
          qb.where('n.project_id', projectId);
        }
      });

    const total = Number((await totalQuery.first())?.count ?? 0);

    ctx.body = {
      items,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) },
    };
  },

  /*************************************************************************************************
   * NAMESPACE controllers - mutation
   *************************************************************************************************/
  async namespaceCreateNamespace(ctx: Context) {
    const { projectId } = ctx.params;
    const { description, name } = ctx.request.body;
    const newNamespace = await strapi.db
      .query(`plugin::${PLUGIN_ID}.namespace`)
      .create({ data: { description, name, project: { connect: { id: projectId } } } });
    ctx.body = newNamespace;
  },
  async namespaceUpdateNamespace(ctx: Context) {
    const { namespaceId } = ctx.params;
    const { name, description } = ctx.request.body;
    const updatedNamespace = await strapi.db
      .query(`plugin::${PLUGIN_ID}.namespace`)
      .update({ where: { id: namespaceId }, data: { name, description } });
    ctx.body = updatedNamespace;
  },
  async namespaceDeleteNamespace(ctx: Context) {
    const { namespaceId } = ctx.params;

    try {
      const knex = strapi.db.connection;

      const translationIds = await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME)
        .where('namespace_id', namespaceId)
        .pluck('translation_id');

      if (translationIds.length > 0) {
        await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME)
          .where('namespace_id', namespaceId)
          .delete();
        await knex(PLUGIN_TRANSLATION_TABLE_NAME).whereIn('id', translationIds).delete();
      }

      await strapi.db
        .query(`plugin::${PLUGIN_ID}.namespace`)
        .delete({ where: { id: namespaceId } });

      ctx.body = { namespaceId, success: true };
    } catch (error) {
      strapi.log.error('Error deleting namespace and translations:', error);
      ctx.throw(500, 'Failed to delete namespace and translations');
    }
  },
};
