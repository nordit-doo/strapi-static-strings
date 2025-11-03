import axios from 'axios';

import { PLUGIN_ID } from '../../pluginId';
import { ITranslationPayload } from '../../../../types/Translation';

export const getTranslation = async ({
  namespaceId,
  page,
  projectId,
  showMissingOnly,
}: {
  namespaceId: number;
  page: number;
  projectId: number;
  showMissingOnly: boolean;
}) => {
  return axios
    .get(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations?page=${page}&showMissingOnly=${showMissingOnly}`
    )
    .then((res) => res.data);
};

export const createTranslation = async ({
  projectId,
  namespaceId,
  key,
  translations,
}: ITranslationPayload) => {
  try {
    const response = await axios.post(
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
    const response = await axios.put(
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
    const response = await axios.delete(
      `/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${namespaceId}/translations/${translationId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
