'use strict';

export default {
  routes: [
    {
      method: 'GET',
      path: '/api/projects',
      handler: 'controller.projectFindProjects',
      config: { auth: false, policies: [] },
    },
    {
      method: 'POST',
      path: '/api/projects',
      handler: 'controller.projectCreateProject',
      config: { auth: false, policies: [] },
    },
    {
      method: 'PUT',
      path: '/api/projects/:projectId',
      handler: 'controller.projectUpdateProject',
      config: { auth: false, policies: [] },
    },
    {
      method: 'DELETE',
      path: '/api/projects/:projectId',
      handler: 'controller.projectDeleteProject',
      config: { auth: false, policies: [] },
    },
    {
      method: 'GET',
      path: '/api/projects/:projectId',
      handler: 'controller.projectFindProjectById',
      config: { auth: false, policies: [] },
    },
  ],
};
