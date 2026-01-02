import { getFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../../pluginId';
import { ITranslationPayload } from '../../../../types/Translation';

const { get, post, put, del } = getFetchClient();

export const getTranslation = async ({
  namespaceId,
  page,
  projectId,
  showMissingOnly,
  search,
}: {
  namespaceId: number;
  page: number;
  projectId: number;
  showMissingOnly: boolean;
  search?: string;
}) => {
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : '';
  return get(
    `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations?page=${page}&showMissingOnly=${showMissingOnly}${searchParam}`
  ).then((res) => res.data);
};

export const createTranslation = async ({
  projectId,
  namespaceId,
  key,
  translations,
}: ITranslationPayload) => {
  try {
    const response = await post(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations`,
      {
        key,
        translations,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating translation:', error);
    throw error;
  }
};

export const updateTranslation = async ({
  projectId,
  namespaceId,
  id,
  key,
  translations,
}: ITranslationPayload) => {
  try {
    const response = await put(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${id}`,
      {
        key,
        translations,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating translation:', error);
    throw error;
  }
};

export const deleteTranslation = async ({
  namespaceId,
  projectId,
  translationId,
}: {
  namespaceId: number;
  projectId: number;
  translationId: number;
}) => {
  try {
    const response = await del(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
