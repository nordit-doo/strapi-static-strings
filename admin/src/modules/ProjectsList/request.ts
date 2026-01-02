import { getFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../../pluginId';

const { get, del } = getFetchClient();

export const getProjects = async () => {
  const { data } = await get(`/${PLUGIN_ID}/api/projects`);
  return data;
};

export const deleteProject = async (id: string) => {
  const { data } = await del(`/${PLUGIN_ID}/api/projects/${id}`);
  return data;
};
