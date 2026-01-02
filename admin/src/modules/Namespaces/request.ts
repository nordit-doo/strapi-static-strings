import { getFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../../pluginId';

const { get, del } = getFetchClient();

export const getNamespaces = async ({
  page,
  projectId,
  search,
}: {
  page: number;
  projectId: string;
  search?: string;
}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
  return get(
    `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/missing-translations?page=${page}${searchParam}`
  ).then((res) => res.data);
};

export const deleteNamespace = async ({
  namespaceId,
  projectId,
}: {
  namespaceId: number;
  projectId: number;
}) => {
  try {
    const response = await del(`/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
