'use strict';

export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects',
      handler: 'controller.projectFindProjects',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
    {
      method: 'POST',
      path: '/api/projects',
      handler: 'controller.projectCreateProject',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.create'] },
      },
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId',
      handler: 'controller.projectUpdateProject',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.update'] },
      },
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId',
      handler: 'controller.projectDeleteProject',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.delete'] },
      },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId',
      handler: 'controller.projectFindProjectById',
      config: {
        policies: [],
        auth: { scope: ['plugin::strapi-static-strings.read'] },
      },
    },
  ],
};
