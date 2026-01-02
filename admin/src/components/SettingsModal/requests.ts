import { getFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../../pluginId';

const { get, post } = getFetchClient();

export const getApiKey = async () => {
  return get(`/${PLUGIN_ID}/api/settings/api-key`).then((res) => res.data);
};

export const regenerateApiKey = async () => {
  const res = await post(`/${PLUGIN_ID}/api/settings/api-key/regenerate`);
  return res.data;
};
