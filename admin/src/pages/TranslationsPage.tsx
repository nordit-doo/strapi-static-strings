import { Breadcrumbs, Box, Crumb, CrumbLink, Main, Typography } from '@strapi/design-system';
import { Flex } from '@strapi/design-system';
import { getFetchClient } from '@strapi/strapi/admin';

import { Translations } from '../modules/Translations';
import { PLUGIN_ID } from '../pluginId';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { get } = getFetchClient();

const getNamespace = async (id: string) => {
  return get(`/${PLUGIN_ID}/api/projects/${id}/namespaces/${id}`).then((res) => res.data);
};

const TranslationsPage = () => {
  const params = useParams();
  const { namespaceId, projectId } = params;

  const [namespace, setNamespace] = useState<any>(null);

  useEffect(() => {
    const fetchNamespace = async () => {
      if (namespaceId) {
        const data = await getNamespace(namespaceId);
        setNamespace(data);
      }
    };
    fetchNamespace();
  }, [namespaceId]);

  return (
    <Main padding="2rem">
      <Box paddingBottom="1rem">
        <Flex paddingBottom="0.5rem" gap="1rem">
          <Typography variant="alpha">Static translations</Typography>
        </Flex>
        <Breadcrumbs label="Folder navigatation">
          <CrumbLink href={`/admin/plugins/${PLUGIN_ID}`}>Projects</CrumbLink>
          <CrumbLink href={`/admin/plugins/${PLUGIN_ID}/projects/${projectId}`}>
            Namespaces {namespace ? ` - ${namespace.name}` : ''}
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
