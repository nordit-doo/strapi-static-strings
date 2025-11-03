import cliController from './cli.controller';
import namespaceController from './namespace.controller';
import projectController from './project.controller';
import settingsController from './settings.controller';
import translationController from './translation.controller';

const controller = () => ({
  ...cliController,
  ...namespaceController,
  ...projectController,
  ...settingsController,
  ...translationController,
});

export default controller;
