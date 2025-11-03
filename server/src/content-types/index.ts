import namespace from './namespace/schema.json';
import project from './project/schema.json';
import setting from './setting/schema.json';
import translation from './translation/schema.json';

export default {
  namespace: { schema: namespace },
  project: { schema: project },
  setting: { schema: setting },
  translation: { schema: translation },
};
