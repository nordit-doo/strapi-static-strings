export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects/:projectId/translations',
      handler: 'controller.translationFindAllProjectTranslations',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/translations/:translationId',
      handler: 'controller.translationFindTranslationById',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations',
      handler: 'controller.translationFindTranslations',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationFindTranslationById',
      config: { auth: false, policies: [] },
    },

    {
      method: 'POST',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations',
      handler: 'controller.translationCreateTranslation',
      config: { auth: false, policies: [] },
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationUpdateTranslation',
      config: { auth: false, policies: [] },
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationDeleteTranslation',
      config: { auth: false, policies: [] },
    },
  ],
};
