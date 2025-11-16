import {
  PLUGIN_ID,
  PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME,
  PLUGIN_TRANSLATION_TABLE_NAME,
} from '../../../admin/src/pluginId';

export default {
  async cliFindLocales(ctx) {
    const locales = await strapi.plugin('i18n').service('locales').find();
    ctx.send({ items: locales });
  },

  async cliGetProjectData(ctx) {
    const { projectId: projectDocumentId } = ctx.params;
    try {
      /** 1. Load project */
      const project = await strapi.db
        .query(`plugin::${PLUGIN_ID}.project`)
        .findOne({ where: { document_id: projectDocumentId } });
      if (!project) {
        return ctx.notFound('Project not found');
      }

      const projectId = project.id;
      /** 2. Load languages from i18n plugin */
      const locales = await strapi.plugin('i18n').service('locales').find();
      const languages = locales.map((l) => l.code);

      /** 3. Load all namespaces for the project */
      const namespaces = await strapi.db
        .query(`plugin::${PLUGIN_ID}.namespace`)
        .findMany({ where: { project: projectId }, orderBy: { name: 'asc' } });

      if (namespaces.length === 0) {
        return ctx.send({ projectId: projectDocumentId, languages, namespaces: [] });
      }

      /** 4. Load ALL translations for ALL namespaces in one ORM query */
      const allTranslations = await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).findMany({
        where: { namespace: { project: projectId } },
        populate: ['namespace'],
        orderBy: { key: 'asc' },
      });

      if (allTranslations.length === 0) {
        const ns = namespaces.map((ns) => ({ id: ns.id, name: ns.name, translations: {} }));
        return ctx.send({ projectId: projectDocumentId, languages, namespaces });
      }

      /** 5. Load full DB rows (to get all dynamic language columns) */
      const knex = strapi.db.connection;
      const fullRows = await knex(PLUGIN_TRANSLATION_TABLE_NAME)
        .select('*')
        .whereIn(
          'id',
          allTranslations.map((t) => t.id)
        );

      /** 6. Prepare lookup map: translationId → namespace name + translation key */
      const translationsMeta = {};
      for (const t of allTranslations) {
        translationsMeta[t.id] = { nsId: t.namespace.id, nsName: t.namespace.name, key: t.key };
      }
      /** 7. Build namespace map for output */
      const namespaceMap = {};
      for (const ns of namespaces) {
        namespaceMap[ns.name] = { id: ns.id, name: ns.name, translations: {} };
      }
      /** 8. Combine full DB rows + meta → structured output */
      for (const row of fullRows) {
        const meta = translationsMeta[row.id];
        if (!meta) {
          continue;
        }

        const nsName = meta.nsName;
        const formatted = {};
        /** copy dynamic language fields */
        for (const lang of languages) {
          if (row[lang] !== undefined && row[lang] !== null) {
            formatted[lang] = row[lang];
          }
        }
        namespaceMap[nsName].translations[meta.key] = formatted;
      }

      /** Final output */
      const ns = Object.values(namespaceMap);
      ctx.send({ projectId: projectDocumentId, languages, namespaces: ns });
    } catch (error) {
      strapi.log.error('Error in cliGetProjectData:', error);
      ctx.throw(500, 'Failed to fetch project data');
    }
  },

  async cliSyncTranslations(ctx) {
    const { projectId: projectDocumentId } = ctx.params;
    const { namespace, translations } = ctx.request.body;

    const project = await strapi.db
      .query(`plugin::${PLUGIN_ID}.project`)
      .findOne({ where: { documentId: projectDocumentId } });
    if (!project) {
      return ctx.notFound('Project not found');
    }
    const projectId = project.id;

    if (!namespace || !translations) {
      return ctx.badRequest('Missing namespace or translations');
    }

    // 🔹 Ensure namespace exists
    let ns = await strapi.db
      .query(`plugin::${PLUGIN_ID}.namespace`)
      .findOne({ where: { name: namespace, project: projectId } });

    if (!ns) {
      ns = await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).create({
        data: {
          name: namespace,
          description: `Auto-created via CLI`,
          project: projectId,
        },
      });
    }

    const knex = strapi.db.connection;
    const existing: string[] = [];
    const created: string[] = [];

    // 🔹 Iterate through all translation keys
    for (const [key, langs] of Object.entries(translations)) {
      const exist = await strapi.db
        .query(`plugin::${PLUGIN_ID}.translation`)
        .findOne({ where: { key, namespace: ns.id } });

      if (exist) {
        existing.push(key);
        continue;
      }

      // insert new translation
      const langObj = langs as Record<string, string>;
      const [id] = await knex(PLUGIN_TRANSLATION_TABLE_NAME)
        .insert({ key, ...langObj, created_at: new Date(), updated_at: new Date() })
        .returning('id');

      await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME).insert({
        translation_id: id.id ?? id,
        namespace_id: ns.id,
      });

      created.push(key);
    }

    ctx.send({
      ok: true,
      namespaceId: ns.id,
      createdCount: created.length,
      existingCount: existing.length,
      existingKeys: existing,
    });
  },

  async cliSyncTranslationOverwrite(ctx) {
    const { namespace, translationKey, translations } = ctx.request.body;
    const { projectId } = ctx.params;

    const project = await strapi.db
      .query(`plugin::${PLUGIN_ID}.project`)
      .findOne({ where: { documentId: projectId } });

    if (!project) return ctx.notFound('Project not found');

    const namespaceRecord = await strapi.db
      .query(`plugin::${PLUGIN_ID}.namespace`)
      .findOne({ where: { name: namespace, project: project.id } });

    if (!namespaceRecord) return ctx.notFound(`Namespace "${namespace}" not found`);

    const knex = strapi.db.connection;
    const linkTable = PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME;

    // Provjeri postoji li translation s istim key-em u ovom namespaceu
    const exist = await knex(`${PLUGIN_TRANSLATION_TABLE_NAME} as t`)
      .join({ lnk: linkTable }, 'lnk.translation_id', 't.id')
      .where('lnk.namespace_id', namespaceRecord.id)
      .andWhere('t.key', translationKey)
      .first();

    if (exist) {
      await knex(PLUGIN_TRANSLATION_TABLE_NAME)
        .where({ id: exist.id })
        .update({ ...(translations as Record<string, string>), updated_at: new Date() });

      return ctx.send({ updated: true });
    }

    // Ako ne postoji, kreiraj novi translation i poveži ga s namespaceom
    const [inserted] = await knex(PLUGIN_TRANSLATION_TABLE_NAME)
      .insert({
        key: translationKey,
        ...(translations as Record<string, string>),
        created_at: new Date(),
        updated_at: new Date(),
      })
      .returning('id');

    await knex(linkTable).insert({
      translation_id: inserted.id ?? inserted,
      namespace_id: namespaceRecord.id,
    });

    ctx.send({ created: true });
  },
};
