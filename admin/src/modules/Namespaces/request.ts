import axios from 'axios';

import { PLUGIN_ID } from '../../pluginId';

export const getNamespaces = async ({ page, projectId }: { page: number; projectId: string }) => {
  return axios(
    `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/missing-translations?page=${page}`
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
    const response = await axios.delete(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
