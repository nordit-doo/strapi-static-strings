import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Read',
      uid: 'read',
      pluginName: 'strapi-static-strings',
    },
    {
      section: 'plugins',
      displayName: 'Create',
      uid: 'create',
      pluginName: 'strapi-static-strings',
    },
    {
      section: 'plugins',
      displayName: 'Update',
      uid: 'update',
      pluginName: 'strapi-static-strings',
    },
    {
      section: 'plugins',
      displayName: 'Delete',
      uid: 'delete',
      pluginName: 'strapi-static-strings',
    },
  ];

  strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default register;
