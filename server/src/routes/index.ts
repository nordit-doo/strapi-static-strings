import cli from './cli';
import namespace from './namespace';
import project from './project';
import setting from './setting';
import translation from './translation';

export default [
  ...cli.routes,
  ...namespace.routes,
  ...project.routes,
  ...setting.routes,
  ...translation.routes,
];
