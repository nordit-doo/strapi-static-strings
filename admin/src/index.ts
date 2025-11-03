import type { StrapiApp } from '@strapi/strapi/admin';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { Pencil } from '@strapi/icons';

export default {
  register(app: StrapiApp) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: Pencil,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: 'Static translations',
      },
      Component: async () => {
        const App = await import('./pages/App');
        return App;
      },
      permissions: [],
    });

    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },
};
