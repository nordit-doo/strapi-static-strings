export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces',
      handler: 'controller.namespaceFindNamespaces',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/missing-translations',
      handler: 'controller.namespaceFindNamespacesWithMissingTranslations',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/all',
      handler: 'controller.namespaceFindNamespacesAll',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceFindNamespaceById',
      config: { auth: false, policies: [] },
    },

    {
      method: 'POST',
      path: '/api/projects/:projectId/namespaces',
      handler: 'controller.namespaceCreateNamespace',
      config: { auth: false, policies: [] },
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceUpdateNamespace',
      config: { auth: false, policies: [] },
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceDeleteNamespace',
      config: { auth: false, policies: [] },
    },
  ],
};
