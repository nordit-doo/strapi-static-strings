import { Main } from '@strapi/design-system';

import { Breadcrumbs, Box, Crumb, Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';

import { SettingsModal } from '../components/SettingsModal';
import { ProjectsList } from '../modules/ProjectsList';

const ProjectsPage = () => (
  <Main padding="2rem">
    <Box paddingBottom="1rem">
      <Flex paddingBottom="0.5rem" gap="1rem">
        <Typography variant="alpha">Static translations</Typography>
        <SettingsModal />
      </Flex>
      <Breadcrumbs label="Folder navigatation">
        <Crumb isCurrent>Projects</Crumb>
      </Breadcrumbs>
    </Box>

    <Box padding="1rem">
      <ProjectsList />
    </Box>
  </Main>
);

export { ProjectsPage };
