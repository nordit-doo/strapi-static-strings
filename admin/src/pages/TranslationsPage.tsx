import { Breadcrumbs, Box, Crumb, CrumbLink, Main, Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';

import { Translations } from '../modules/Translations';
import { PLUGIN_ID } from '../pluginId';
import { useParams } from 'react-router-dom';

const TranslationsPage = () => {
  const params = useParams();
  const { projectId } = params;

  return (
    <Main padding="2rem">
      <Box paddingBottom="1rem">
        <Flex paddingBottom="0.5rem" gap="1rem">
          <Typography variant="alpha">Static translations</Typography>
        </Flex>
        <Breadcrumbs label="Folder navigatation">
          <CrumbLink href={`/admin/plugins/${PLUGIN_ID}`}>Projects</CrumbLink>
          <CrumbLink href={`/admin/plugins/${PLUGIN_ID}/projects/${projectId}`}>
            Namespaces
          </CrumbLink>
          <Crumb isCurrent>Translations</Crumb>
        </Breadcrumbs>
      </Box>

      <Box padding="1rem">
        <Translations />
      </Box>
    </Main>
  );
};

export { TranslationsPage };
