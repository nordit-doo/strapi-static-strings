import { PLUGIN_ID } from '../../../admin/src/pluginId';

export default {
  routes: [
    {
      method: 'GET',
      path: '/cli/locales',
      handler: 'controller.cliFindLocales',
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`],
      },
    },
    {
      method: 'GET',
      path: '/cli/projects/:projectId/translations-all',
      handler: 'controller.cliGetProjectData',
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`],
      },
    },
    {
      method: 'POST',
      path: '/cli/projects/:projectId/namespaces/translations-sync',
      handler: 'controller.cliSyncTranslations',
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`],
      },
    },
    {
      method: 'PUT',
      path: '/cli/projects/:projectId/namespaces/translations-overwrite',
      handler: 'controller.cliSyncTranslationOverwrite',
      config: {
        auth: false,
        policies: [`plugin::${PLUGIN_ID}.api-key`],
      },
    },
  ],
};
