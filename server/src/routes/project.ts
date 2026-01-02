'use strict';

export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects',
      handler: 'controller.projectFindProjects',
    },
    {
      method: 'POST',
      path: '/api/projects',
      handler: 'controller.projectCreateProject',
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId',
      handler: 'controller.projectUpdateProject',
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId',
      handler: 'controller.projectDeleteProject',
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId',
      handler: 'controller.projectFindProjectById',
    },
  ],
};
