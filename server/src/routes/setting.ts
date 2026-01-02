export default {
  routes: [
    {
      method: 'GET',
      path: '/api/settings',
      handler: 'controller.settingsFind',
    },
    {
      method: 'GET',
      path: '/api/settings/api-key',
      handler: 'controller.settingsFindApiKey',
    },
    {
      method: 'POST',
      path: '/api/settings/api-key/regenerate',
      handler: 'controller.settingsRegenerateApiKey',
    },
  ],
};
