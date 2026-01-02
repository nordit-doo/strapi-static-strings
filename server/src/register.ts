import type { Core } from '@strapi/strapi';
import { PLUGIN_ID } from '../../admin/src/pluginId';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
  const actions = [
    {
      section: 'plugins',
      displayName: 'Access the plugin',
      uid: 'main',
      pluginName: PLUGIN_ID,
    },
  ];

  strapi.admin.services.permission.actionProvider.registerMany(actions);
};

export default register;
