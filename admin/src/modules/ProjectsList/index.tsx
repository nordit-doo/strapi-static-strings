import { Link } from 'react-router-dom';
import { Box, Button, EmptyStateLayout, Grid, Loader } from '@strapi/design-system';
import { Plus } from '@strapi/icons';

import { ProjectCard } from './components/ProjectCard';
import { ProjectCreateEditModal } from './components/ProjectCreateEditModal';
import { useHook } from './hook';
import { PLUGIN_ID } from '../../pluginId';

export const ProjectsList = () => {
  const {
    handleClipboardCopy,
    handleDelete,
    handleEdit,
    handleProjectCreate,
    handleRefetch,
    isPending,
    projectCreatedEditModalRef,
    projects,
  } = useHook();

  const renderLoader = () => {
    if (isPending && !projects?.items.length) {
      return (
        <Box>
          <Loader />
        </Box>
      );
    }
    return <></>;
  };

  const renderEmptyState = () => {
    if (!isPending && !projects?.items.length) {
      return (
        <Box background="neutral100">
          <EmptyStateLayout
            content="You don't have any projects yet."
            action={
              <Button onClick={handleProjectCreate} startIcon={<Plus />} variant="secondary">
                Create your first project
              </Button>
            }
          />
        </Box>
      );
    }
    return <></>;
  };

  const renderContent = () => {
    if (!isPending && !projects?.items.length) {
      return <></>;
    }
    return (
      <>
        {!!projects?.items?.length && (
          <Button
            marginBottom="1rem"
            onClick={handleProjectCreate}
            startIcon={<Plus />}
            variant="secondary"
          >
            Add project
          </Button>
        )}

        <Grid.Root gap={2}>
          {projects?.items.map((project: any) => (
            <Link
              key={project.id}
              to={`/plugins/${PLUGIN_ID}/projects/${project.id}`}
              style={{ color: 'white', textDecoration: 'none' }}
            >
              <Grid.Item id={project.id} background="primary100" height="100%">
                <ProjectCard
                  onClipboardCopy={handleClipboardCopy}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  project={project}
                />
              </Grid.Item>
            </Link>
          ))}
        </Grid.Root>
      </>
    );
  };

  return (
    <>
      {renderContent()}
      {renderEmptyState()}
      {renderLoader()}
      <ProjectCreateEditModal ref={projectCreatedEditModalRef} refetch={handleRefetch} />
    </>
  );
};
