import { Context } from 'koa';

import {
  PLUGIN_ID,
  PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME,
  PLUGIN_TRANSLATION_TABLE_NAME,
} from '../../../admin/src/pluginId';

const tableName = PLUGIN_TRANSLATION_TABLE_NAME;
const tableNamespaceLink = PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME;

export default {
  /*************************************************************************************************
   * TRANSLATION controllers - query
   *************************************************************************************************/
  async translationFindTranslations(ctx: Context) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;
    const namespaceId = Number(ctx.params.namespaceId);
    const showMissingOnly = String(ctx.query.showMissingOnly) === 'true';
    const searchQuery = String(ctx.query.search || '').trim();

    const knex = strapi.db.connection;
    const table = PLUGIN_TRANSLATION_TABLE_NAME;

    // languages available
    const locales = await strapi.plugin('i18n').service('locales').find();
    const localeCodes: string[] = locales.map((l) => l.code);

    // metadata about "namespace" attribute (relation mapping)
    const meta = strapi.db.metadata.get(`plugin::${PLUGIN_ID}.translation`);
    const nsAttr = meta.attributes.namespace;

    let query = knex({ t: table })
      .select('t.*')
      .orderBy('t.key', 'asc')
      .limit(pageSize)
      .offset(start);
    let countQuery = knex({ t: table }).count<{ count: string }>(' * as count');

    if ('columnName' in nsAttr && nsAttr.columnName) {
      query = query.where(`t.${nsAttr.columnName}`, namespaceId);
      countQuery = countQuery.where(`t.${nsAttr.columnName}`, namespaceId);
    } else if (
      'joinTable' in nsAttr &&
      nsAttr.joinTable &&
      'name' in nsAttr.joinTable &&
      'joinColumn' in nsAttr.joinTable &&
      'inverseJoinColumn' in nsAttr.joinTable &&
      nsAttr.joinTable.name &&
      nsAttr.joinTable.joinColumn?.name &&
      nsAttr.joinTable.inverseJoinColumn?.name
    ) {
      const jtName = nsAttr.joinTable.name;
      const jtJoinCol = nsAttr.joinTable.joinColumn.name;
      const jtInverseCol = nsAttr.joinTable.inverseJoinColumn.name;

      query = query
        .join({ jt: jtName }, `jt.${jtJoinCol}`, 't.id')
        .where(`jt.${jtInverseCol}`, namespaceId);

      countQuery = countQuery
        .join({ jt: jtName }, `jt.${jtJoinCol}`, 't.id')
        .where(`jt.${jtInverseCol}`, namespaceId);
    } else {
      ctx.throw(500, 'Namespace relation not mapped (no columnName or joinTable).');
    }

    // filter: showOnlyMissing=true  → at least one language is missing
    if (showMissingOnly && localeCodes.length) {
      const addMissingClause = function (this: any) {
        for (const lang of localeCodes) {
          this.orWhereNull(`t.${lang}`).orWhere(`t.${lang}`, '');
        }
      };
      query.andWhere(addMissingClause);
      countQuery.andWhere(addMissingClause);
    }

    // filter: search by key or translation values
    if (searchQuery) {
      const addSearchClause = function (this: any) {
        // Search in key field
        this.where(`t.key`, 'like', `%${searchQuery}%`);
        // Search in all locale fields
        for (const lang of localeCodes) {
          this.orWhere(`t.${lang}`, 'like', `%${searchQuery}%`);
        }
      };
      query.andWhere(addSearchClause);
      countQuery.andWhere(addSearchClause);
    }

    const items = await query;
    const total = Number((await countQuery.first())?.count ?? 0);

    ctx.body = {
      items,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) },
    };
  },
  async translationFindTranslationById(ctx: Context) {
    const { translationId } = ctx.params;
    const namespace = await strapi.db
      .query(`plugin::${PLUGIN_ID}.translation`)
      .findOne({ where: { id: translationId } });
    ctx.body = namespace;
  },
  async translationFindTranslationsMissingCountAnyLanguage(ctx) {
    const knex = strapi.db.connection;

    const locales = await strapi.plugin('i18n').service('locales').find();
    const localeCodes = locales.map((l) => l.code);

    const result = await knex(tableName)
      .count('* as count')
      .where(function () {
        for (const lang of localeCodes) {
          this.orWhereNull(lang).orWhere(lang, '');
        }
      })
      .first();
    ctx.body = {
      count: Number(result.count),
      locales: localeCodes,
    };
  },

  /*************************************************************************************************
   * TRANSLATION controllers - mutation
   *************************************************************************************************/
  async translationCreateTranslation(ctx: Context) {
    const { namespaceId } = ctx.params;
    const { key, translations } = ctx.request.body;

    if (!key || !namespaceId) {
      ctx.throw(400, 'Key and namespace are required');
    }

    const knex = strapi.db.connection;
    const existing = await knex(tableName)
      .join({ lnk: tableNamespaceLink }, 'lnk.translation_id', `${tableName}.id`)
      .where('lnk.namespace_id', namespaceId)
      .andWhere(`${tableName}.key`, key)
      .first();

    if (existing) {
      ctx.throw(400, 'Translation already exists');
    }

    const data: Record<string, any> = { key, created_at: new Date(), updated_at: new Date() };
    for (const [lang, value] of Object.entries(translations || {})) {
      data[lang] = value ?? null;
    }
    const existingColumns = Object.keys(await knex(tableName).columnInfo());
    for (const field of Object.keys(data)) {
      if (!existingColumns.includes(field)) {
        delete data[field];
      }
    }

    const [insertedId] = await knex(tableName).insert(data).returning('id');
    await knex(tableNamespaceLink).insert({
      translation_id: insertedId.id ?? insertedId,
      namespace_id: namespaceId,
    });

    const newTranslation = await knex(tableName)
      .where({ id: insertedId.id ?? insertedId })
      .first();

    ctx.send(newTranslation);
  },

  async translationUpdateTranslation(ctx: Context) {
    const { translationId } = ctx.params;
    const { key, translations } = ctx.request.body;

    if (!key) {
      ctx.throw(400, 'Key is required');
    }

    const knex = strapi.db.connection;

    const data: Record<string, any> = { key, updated_at: new Date() };
    for (const [lang, value] of Object.entries(translations)) {
      data[lang] = value ?? '';
    }
    await knex(tableName).where({ id: translationId }).update(data);
    const updated = await knex(tableName).where({ id: translationId }).first();
    ctx.send(updated);
  },
  async translationDeleteTranslation(ctx: Context) {
    const { translationId } = ctx.params;
    await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).delete({
      where: { id: translationId },
    });
    ctx.body = { translationId, success: true };
  },
};
