import { getFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../../pluginId';

const { get, del } = getFetchClient();

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
  return get(
    `/${PLUGIN_ID}/api/projects/${projectId}/translations?page=${page}&showMissingOnly=${showMissingOnly}${searchParam}`
  ).then((res) => res.data);
};

export const deleteTranslation = async ({
  projectId,
  translationId,
}: {
  projectId: number;
  translationId: number;
}) => {
  try {
    const translation = await get(
      `/${PLUGIN_ID}/api/projects/${projectId}/translations/${translationId}`
    );
    const namespaceId = translation.data.namespace?.id;

    if (!namespaceId) {
      throw new Error('Cannot find namespace for translation');
    }

    const response = await del(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
