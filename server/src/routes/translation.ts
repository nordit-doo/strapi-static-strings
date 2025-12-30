export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects/:projectId/translations',
      handler: 'controller.translationFindAllProjectTranslations',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/translations/:translationId',
      handler: 'controller.translationFindTranslationById',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations',
      handler: 'controller.translationFindTranslations',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationFindTranslationById',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },

    {
      method: 'POST',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations',
      handler: 'controller.translationCreateTranslation',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.create'] },
      },
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationUpdateTranslation',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.update'] },
      },
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId/namespaces/:namespaceId/translations/:translationId',
      handler: 'controller.translationDeleteTranslation',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.delete'] },
      },
    },
  ],
};
