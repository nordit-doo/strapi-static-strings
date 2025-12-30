import axios from 'axios';

import { PLUGIN_ID } from '../../pluginId';

export const getProjectTranslations = async ({
  page,
  projectId,
  showMissingOnly,
  search,
}: {
  page: number;
  projectId: number;
  showMissingOnly: boolean;
  search?: string;
}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
  return axios
    .get(
      `/${PLUGIN_ID}/api/projects/${projectId}/translations?page=${page}&showMissingOnly=${showMissingOnly}${searchParam}`
    )
    .then((res) => res.data);
};

export const deleteTranslation = async ({
  projectId,
  translationId,
}: {
  projectId: number;
  translationId: number;
}) => {
  try {
    // Find the translation first to get its namespace
    const translation = await axios.get(
      `/${PLUGIN_ID}/api/projects/${projectId}/translations/${translationId}`
    );
    const namespaceId = translation.data.namespace?.id;

    if (!namespaceId) {
      throw new Error('Cannot find namespace for translation');
    }

    const response = await axios.delete(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
