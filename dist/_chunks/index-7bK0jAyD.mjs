import { useRef, useEffect } from "react";
import { Pencil } from "@strapi/icons";
const PLUGIN_ID = "strapi-static-strings";
const Initializer = ({ setPlugin }) => {
  const ref = useRef(setPlugin);
  useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const index = {
  register(app) {
    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: Pencil,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: "Static translations"
      },
      Component: async () => {
        const App = await import("./App-CrMSWdVH.mjs");
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
export {
  PLUGIN_ID as P,
  index as i
};
