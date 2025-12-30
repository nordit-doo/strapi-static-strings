export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces',
      handler: 'controller.namespaceFindNamespaces',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/missing-translations',
      handler: 'controller.namespaceFindNamespacesWithMissingTranslations',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/all',
      handler: 'controller.namespaceFindNamespacesAll',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceFindNamespaceById',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },

    {
      method: 'POST',
      path: '/api/projects/:projectId/namespaces',
      handler: 'controller.namespaceCreateNamespace',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.create'] },
      },
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceUpdateNamespace',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.update'] },
      },
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceDeleteNamespace',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.delete'] },
      },
    },
  ],
};
