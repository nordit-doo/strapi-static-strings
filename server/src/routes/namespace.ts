import { PLUGIN_ID } from '../../../admin/src/pluginId';

export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces',
      handler: 'controller.namespaceFindNamespaces',
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/missing-translations',
      handler: 'controller.namespaceFindNamespacesWithMissingTranslations',
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/all',
      handler: 'controller.namespaceFindNamespacesAll',
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceFindNamespaceById',
    },

    {
      method: 'POST',
      path: '/api/projects/:projectId/namespaces',
      handler: 'controller.namespaceCreateNamespace',
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceUpdateNamespace',
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId/namespaces/:namespaceId',
      handler: 'controller.namespaceDeleteNamespace',
    },
  ],
};
