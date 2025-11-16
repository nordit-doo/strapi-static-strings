"use strict";
const react = require("react");
const icons = require("@strapi/icons");
const PLUGIN_ID = "strapi-static-strings";
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: icons.Pencil,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: "Static translations"
      },
      Component: async () => {
        const App = await Promise.resolve().then(() => require("./App-CYGpD-Tw.js"));
        return App;
      },
      permissions: []
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  }
};
exports.PLUGIN_ID = PLUGIN_ID;
exports.index = index;
