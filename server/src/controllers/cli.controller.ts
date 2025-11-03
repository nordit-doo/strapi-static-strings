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
      const project = await strapi.db
        .query(`plugin::${PLUGIN_ID}.project`)
        .findOne({ where: { document_id: projectDocumentId } });

      if (!project) {
        return ctx.notFound('Project not found');
      }

      const projectId = project.id;

      const locales = await strapi.plugin('i18n').service('locales').find();
      const languages = locales.map((l) => l.code);

      const namespaces = await strapi.db
        .query(`plugin::${PLUGIN_ID}.namespace`)
        .findMany({ where: { project: projectId }, orderBy: { name: 'asc' } });

      const resultNamespaces = [];
      for (const ns of namespaces) {
        const translations = await strapi.db
          .query(`plugin::${PLUGIN_ID}.translation`)
          .findMany({ where: { namespace: ns.id }, orderBy: { key: 'asc' } });

        const formattedTranslations = {};
        for (const t of translations) {
          const langs = {};
          for (const lang of languages) {
            langs[lang] = t[lang] ?? '';
          }
          formattedTranslations[t.key] = langs;
        }

        resultNamespaces.push({
          id: ns.id,
          name: ns.name,
          translations: formattedTranslations,
        });
      }
      ctx.send({ projectId: projectDocumentId, languages, namespaces: resultNamespaces });
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
    const translationsTable = 'i18n_static_translations_translations';
    const linkTable = 'i_18_n_static_translations_translations_namespace_lnk';

    // Provjeri postoji li translation s istim key-em u ovom namespaceu
    const exist = await knex(`${translationsTable} as t`)
      .join({ lnk: linkTable }, 'lnk.translation_id', 't.id')
      .where('lnk.namespace_id', namespaceRecord.id)
      .andWhere('t.key', translationKey)
      .first();

    if (exist) {
      await knex(translationsTable)
        .where({ id: exist.id })
        .update({ ...(translations as Record<string, string>), updated_at: new Date() });

      return ctx.send({ updated: true });
    }

    // Ako ne postoji, kreiraj novi translation i poveži ga s namespaceom
    const [inserted] = await knex(translationsTable)
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
