export default {
  routes: [
    {
      method: 'GET',
      path: '/api/settings',
      handler: 'controller.settingsFind',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/settings/api-key',
      handler: 'controller.settingsFindApiKey',
      config: { auth: false, policies: [] },
    },
    {
      method: 'POST',
      path: '/api/settings/api-key/regenerate',
      handler: 'controller.settingsRegenerateApiKey',
      config: { auth: false, policies: [] },
    },
  ],
};
