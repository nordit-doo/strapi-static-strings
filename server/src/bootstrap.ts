import crypto from 'crypto';
import { PLUGIN_TRANSLATION_TABLE_NAME } from '../../admin/src/pluginId';

export default async ({ strapi }) => {
  const knex = strapi.db.connection;
  const tableNameTranslations = PLUGIN_TRANSLATION_TABLE_NAME;
  const settingsTable = 'strapi_static_strings_settings';

  let hasSettingsTable = false;
  for (let i = 0; i < 10; i++) {
    hasSettingsTable = await knex.schema.hasTable(settingsTable);
    if (hasSettingsTable) break;
    strapi.log.info('[strapi-static-strings] Waiting for settings table...');
    await new Promise((r) => setTimeout(r, 500));
  }

  if (!hasSettingsTable) {
    strapi.log.warn('[strapi-static-strings] Settings table not found — skipping bootstrap');
    return;
  }

  const existing = await knex(settingsTable).where({ key: 'apiKey' }).first();

  if (!existing) {
    const newKey = crypto.randomUUID();
    await knex(settingsTable).insert({ key: 'apiKey', value: newKey });
    strapi.log.info(`[strapi-static-strings] Created default API key: ${newKey}`);
  }

  // 🔤 dodavanje i18n jezika kao stupaca
  const locales = await strapi.plugin('i18n').service('locales').find();
  const localeCodes = locales.map((l) => l.code);

  const existingColumns = await knex(tableNameTranslations).columnInfo();
  const existingColumnNames = Object.keys(existingColumns);

  for (const locale of localeCodes) {
    if (!existingColumnNames.includes(locale)) {
      strapi.log.info(`[strapi-static-strings] Adding missing column: ${locale}`);
      await knex.schema.alterTable(tableNameTranslations, (table) => {
        table.text(locale);
      });
    }
  }
};
