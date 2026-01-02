import { PLUGIN_ID } from '../../../admin/src/pluginId';

export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects/:projectId/translations',
      handler: 'controller.translationFindAllProjectTranslations',
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/translations/:translationId',
      handler: 'controller.translationFindTranslationById',
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations',
      handler: 'controller.translationFindTranslations',
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationFindTranslationById',
    },

    {
      method: 'POST',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations',
      handler: 'controller.translationCreateTranslation',
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationUpdateTranslation',
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationDeleteTranslation',
    },
  ],
};
