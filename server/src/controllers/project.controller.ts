import { PLUGIN_ID } from '../../../admin/src/pluginId';

export default {
  async projectFindProjects(ctx) {
    const page = Number(ctx.query.page) || 1;
    const pageSize = Number(ctx.query.pageSize) || 15;
    const start = (page - 1) * pageSize;

    const projectRepo = strapi.db.query(`plugin::${PLUGIN_ID}.project`);
    const projects = await projectRepo.findMany({
      populate: ['namespaces'],
      limit: pageSize,
      offset: start,
      orderBy: { createdAt: 'desc' },
    });

    const total = await projectRepo.count();

    ctx.body = {
      items: projects,
      pagination: { page, pageSize, total, pageCount: Math.ceil(total / pageSize) },
    };
  },

  async projectFindProjectById(ctx) {
    const { projectId } = ctx.params;
    const project = await strapi.db
      .query(`plugin::${PLUGIN_ID}.project`)
      .findOne({ where: { id: projectId }, populate: ['namespaces'] });
    ctx.body = project;
  },

  async projectCreateProject(ctx) {
    const { name, description } = ctx.request.body;
    const newProject = await strapi.db
      .query(`plugin::${PLUGIN_ID}.project`)
      .create({ data: { name, description } });
    ctx.body = newProject;
  },

  async projectUpdateProject(ctx) {
    const { projectId } = ctx.params;
    const { name, description } = ctx.request.body;
    const updatedProject = await strapi.db
      .query(`plugin::${PLUGIN_ID}.project`)
      .update({ where: { id: projectId }, data: { name, description } });
    ctx.body = updatedProject;
  },

  async projectDeleteProject(ctx) {
    const { projectId } = ctx.params;

    try {
      const namespaces = await strapi.db
        .query(`plugin::${PLUGIN_ID}.namespace`)
        .findMany({ where: { project: projectId }, select: ['id'] });

      const namespaceIds = namespaces.map((ns) => ns.id);
      if (namespaceIds.length > 0) {
        await strapi.db.query(`plugin::${PLUGIN_ID}.translation`).deleteMany({
          where: { namespace: { $in: namespaceIds } },
        });
      }

      await strapi.db.query(`plugin::${PLUGIN_ID}.namespace`).deleteMany({
        where: { project: projectId },
      });

      await strapi.db.query(`plugin::${PLUGIN_ID}.project`).delete({ where: { id: projectId } });

      ctx.body = { success: true, projectId };
    } catch (error) {
      strapi.log.error('Error deleting project:', error);
      ctx.throw(500, 'Failed to delete project and related entities');
    }
  },
};
