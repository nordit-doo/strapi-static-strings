import { Breadcrumbs, Box, Crumb, CrumbLink, Main, Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';

import { Namespaces } from '../modules/Namespaces';
import { PLUGIN_ID } from '../pluginId';

const NamespacesPage = () => (
  <Main padding="2rem">
    <Box paddingBottom="1rem">
      <Flex paddingBottom="0.5rem" gap="1rem">
        <Typography variant="alpha">Static translations</Typography>
      </Flex>
      <Breadcrumbs label="Folder navigatation">
        <CrumbLink href={`/admin/plugins/${PLUGIN_ID}`}>Projects</CrumbLink>
        <Crumb isCurrent>Namespaces</Crumb>
      </Breadcrumbs>
    </Box>

    <Box padding="1rem">
      <Namespaces />
    </Box>
  </Main>
);

export { NamespacesPage };
