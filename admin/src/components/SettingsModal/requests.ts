import axios from 'axios';

import { PLUGIN_ID } from '../../pluginId';

export const getApiKey = async () => {
  return axios(`/${PLUGIN_ID}/api/settings/api-key`).then((res) => res.data);
};

export const regenerateApiKey = async () => {
  const res = await axios.post(`/${PLUGIN_ID}/api/settings/api-key/regenerate`);
  return res.data;
};
