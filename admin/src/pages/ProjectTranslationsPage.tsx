import { Breadcrumbs, Box, Crumb, CrumbLink, Main, Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';
import { getFetchClient } from '@strapi/strapi/admin';

import { PLUGIN_ID } from '../pluginId';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ProjectTranslations } from '../modules/ProjectTranslations';

const { get } = getFetchClient();

const getProject = async (id: string) => {
  return get(`/${PLUGIN_ID}/api/projects/${id}`).then((res) => res.data);
};

const ProjectTranslationsPage = () => {
  const params = useParams();
  const { projectId } = params;

  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (projectId) {
        const data = await getProject(projectId);
        setProject(data);
      }
    };
    fetchProject();
  }, [projectId]);

  return (
    <Main padding="2rem">
      <Box paddingBottom="1rem">
        <Flex paddingBottom="0.5rem" gap="1rem">
          <Typography variant="alpha">Static translations</Typography>
        </Flex>
        <Breadcrumbs label="Folder navigatation">
          <CrumbLink href={`/admin/plugins/${PLUGIN_ID}`}>Projects</CrumbLink>
          <Crumb isCurrent>All translations {project ? ` - ${project.name}` : ''}</Crumb>
        </Breadcrumbs>
      </Box>

      <Box padding="1rem">
        <ProjectTranslations />
      </Box>
    </Main>
  );
};

export { ProjectTranslationsPage };
