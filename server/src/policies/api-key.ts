import { PLUGIN_ID } from '../../../admin/src/pluginId';

const apiKeyPolicy = async (policyContext, config, { strapi }) => {
  const token = policyContext.request.header['authorization']?.replace('Bearer ', '').trim();

  strapi.log.info(`[${PLUGIN_ID}] API Key Policy invoked. Token: ${token}`);

  const record = await strapi.db
    .query('plugin::strapi-static-strings.setting')
    .findOne({ where: { key: 'apiKey' } });

  const expected = record?.value;

  if (!expected) {
    strapi.log.warn(`[${PLUGIN_ID}] apiKey not set — skipping auth`);
    return true;
  }

  if (token === expected) {
    strapi.log.info(`[${PLUGIN_ID}] Authorized successfully`);
    return true;
  }

  strapi.log.warn(`[${PLUGIN_ID}] Invalid API key: ${token}`);
  return policyContext.unauthorized('Invalid API key');
};

export default apiKeyPolicy;
