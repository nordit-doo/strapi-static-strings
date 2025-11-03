import crypto from 'crypto';

export default {
  async settingsFind(ctx) {
    try {
      const settings = await strapi.db.query('plugin::strapi-static-strings.setting').findMany();

      ctx.body = { data: settings };
    } catch (err) {
      strapi.log.error(`[strapi-static-strings] Error fetching settings: ${err.message}`);
      ctx.throw(500, 'Failed to fetch settings');
    }
  },
  async settingsFindApiKey(ctx) {
    try {
      const record = await strapi.db
        .query('plugin::strapi-static-strings.setting')
        .findOne({ where: { key: 'apiKey' } });

      if (!record) {
        ctx.throw(404, 'API key not found');
      }

      ctx.body = { value: record.value };
    } catch (err) {
      strapi.log.error(`[strapi-static-strings] Error fetching API key: ${err.message}`);
      ctx.throw(500, 'Failed to fetch API key');
    }
  },
  async settingsRegenerateApiKey(ctx) {
    try {
      const newKey = crypto.randomUUID();

      const existing = await strapi.db
        .query('plugin::strapi-static-strings.setting')
        .findOne({ where: { key: 'apiKey' } });

      if (existing) {
        await strapi.db.query('plugin::strapi-static-strings.setting').update({
          where: { key: 'apiKey' },
          data: { value: newKey },
        });
      } else {
        await strapi.db.query('plugin::strapi-static-strings.setting').create({
          data: { key: 'apiKey', value: newKey },
        });
      }

      strapi.log.info(`[strapi-static-strings] API key regenerated`);

      ctx.body = { value: newKey };
    } catch (err) {
      strapi.log.error(`[strapi-static-strings] Error regenerating API key: ${err.message}`);
      ctx.throw(500, 'Failed to regenerate API key');
    }
  },
};
