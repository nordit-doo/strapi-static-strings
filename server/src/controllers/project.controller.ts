import {
  PLUGIN_ID,
  PLUGIN_NAMESPACE_TABLE_NAME,
  PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME,
  PLUGIN_TRANSLATION_TABLE_NAME,
} from '../../../admin/src/pluginId';

export default {
  async projectFindProjects(ctx) {
    strapi.log.info('[projectFindProjects] CONTROLLER CALLED!!!');
    strapi.log.info(
      '[projectFindProjects] User from ctx.state:',
      ctx.state.user || ctx.state.admin
    );

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
      const knex = strapi.db.connection;

      // Find all namespaces for this project
      const namespaceIds = await knex(PLUGIN_NAMESPACE_TABLE_NAME)
        .leftJoin(
          `${PLUGIN_NAMESPACE_TABLE_NAME.replace(/_namespaces$/, '_namespaces_project_lnk')}`,
          `${PLUGIN_NAMESPACE_TABLE_NAME}.id`,
          `${PLUGIN_NAMESPACE_TABLE_NAME.replace(/_namespaces$/, '_namespaces_project_lnk')}.namespace_id`
        )
        .leftJoin(
          `${PLUGIN_NAMESPACE_TABLE_NAME.replace(/_namespaces$/, '_projects')}`,
          `${PLUGIN_NAMESPACE_TABLE_NAME.replace(/_namespaces$/, '_namespaces_project_lnk')}.project_id`,
          `${PLUGIN_NAMESPACE_TABLE_NAME.replace(/_namespaces$/, '_projects')}.id`
        )
        .where(
          `${PLUGIN_NAMESPACE_TABLE_NAME.replace(/_namespaces$/, '_projects')}.document_id`,
          projectId
        )
        .pluck(`${PLUGIN_NAMESPACE_TABLE_NAME}.id`);

      if (namespaceIds.length > 0) {
        // Get all translation IDs associated with these namespaces
        const translationIds = await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME)
          .whereIn('namespace_id', namespaceIds)
          .pluck('translation_id');

        if (translationIds.length > 0) {
          // Delete translation-namespace links
          await knex(PLUGIN_TRANSLATION_NAMESPACE_LINK_TABLE_NAME)
            .whereIn('namespace_id', namespaceIds)
            .delete();
          // Delete translations
          await knex(PLUGIN_TRANSLATION_TABLE_NAME).whereIn('id', translationIds).delete();
        }

        // Delete namespaces
        await knex(PLUGIN_NAMESPACE_TABLE_NAME).whereIn('id', namespaceIds).delete();
      }

      // Delete the project itself
      await strapi.db
        .query(`plugin::${PLUGIN_ID}.project`)
        .delete({ where: { documentId: projectId } });

      ctx.body = { success: true, projectId };
    } catch (error) {
      strapi.log.error('Error deleting project:', error);
      ctx.throw(500, 'Failed to delete project and related entities');
    }
  },
};
