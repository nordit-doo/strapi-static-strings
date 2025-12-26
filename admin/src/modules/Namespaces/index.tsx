import {
  Badge,
  Box,
  Button,
  EmptyStateLayout,
  Flex,
  Link,
  Loader,
  Table,
  Tbody,
  Td,
  TextInput,
  Th,
  Thead,
  Tr,
  Typography,
} from '@strapi/design-system';
import { Pencil, Plus, Trash } from '@strapi/icons';

import { NamespaceCreateEditModal } from './components/NamespaceCreateEditModal';
import { useHook } from './hook';
import { Pagination } from '../../components/Pagination';
import { PLUGIN_ID } from '../../pluginId';
import { ConfirmModal } from '../../components/ConfirmModal';

export const Namespaces = () => {
  const {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditNamespace,
    handleNamespaceCreate,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleToggleDeleteNamespace,
    isPending,
    namespaces,
    namespaceCreatedEditModalRef,
    projectId,
    searchQuery,
    selectedDeleteNamespace,
  } = useHook();

  const renderLoader = () => {
    if (isPending && !namespaces?.items.length) {
      return (
        <Box>
          <Loader />
        </Box>
      );
    }
    return <></>;
  };

  const renderEmptyState = () => {
    if (!isPending && !namespaces?.items.length) {
      return (
        <Box background="neutral100">
          <EmptyStateLayout
            content="You don't have any namespaces yet."
            action={
              <Button onClick={handleNamespaceCreate} startIcon={<Plus />} variant="secondary">
                Create your first namespace
              </Button>
            }
          />
        </Box>
      );
    }
    return <></>;
  };

  const renderContent = () => {
    if (!isPending && !namespaces?.items.length) {
      return <></>;
    }

    return (
      <>
        {!!namespaces?.items?.length && (
          <Button
            marginBottom="1rem"
            onClick={handleNamespaceCreate}
            startIcon={<Plus />}
            variant="secondary"
          >
            Add namespace
          </Button>
        )}
        <Box paddingTop="1rem" paddingBottom="1rem">
          <Table colCount={3} rowCount={namespaces?.items?.length || 0}>
            <Thead>
              <Tr style={{ width: '280px' }}>
                <Th>
                  <Typography variant="sigma">Namespace</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Description</Typography>
                </Th>
                <Th style={{ width: '120px' }}>
                  <Typography variant="sigma">Actions</Typography>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {namespaces?.items?.map((namespace) => (
                <Tr key={namespace.id}>
                  <Td style={{ width: '280px' }}>
                    <Link
                      href={`/admin/plugins/${PLUGIN_ID}/projects/${projectId}/namespaces/${namespace.id}`}
                    >
                      <Flex gap={2} paddingTop="15px">
                        <Typography fontWeight="bold" variant="omega" style={{ color: 'white' }}>
                          {namespace.name}
                        </Typography>
                        {!!namespace.missingTranslationsCount && (
                          <Badge backgroundColor="red" style={{ padding: '2px 6px' }}>
                            <Typography textColor="white" fontSize="9px">
                              Missing
                            </Typography>
                            <Typography
                              marginLeft="4px"
                              fontWeight="bold"
                              textColor="white"
                              fontSize="10px"
                            >
                              {namespace.missingTranslationsCount}
                            </Typography>
                          </Badge>
                        )}
                      </Flex>
                    </Link>
                  </Td>
                  <Td>
                    <Typography variant="omega">{namespace.description}</Typography>
                  </Td>
                  <Td style={{ width: '120px' }}>
                    <Flex gap="0.5rem" justifyContent="flex-end">
                      <Button
                        gap="0"
                        onClick={handleEditNamespace(namespace)}
                        variant="secondary"
                        startIcon={<Pencil />}
                      />
                      <Button
                        gap="0"
                        onClick={handleToggleDeleteNamespace(namespace)}
                        startIcon={<Trash color="white" />}
                        variant="danger"
                      />
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justifyContent="space-between" paddingTop="1rem">
            {namespaces?.pagination && (
              <Pagination pagination={namespaces?.pagination} onPagePress={handlePagePress} />
            )}
          </Flex>
        </Box>
      </>
    );
  };

  return (
    <>
      <Box marginBottom="2rem" width="100%">
        <TextInput
          name="search"
          placeholder="Search namespaces by name or description..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </Box>
      {renderContent()}
      {renderEmptyState()}
      {renderLoader()}
      <NamespaceCreateEditModal
        ref={namespaceCreatedEditModalRef}
        projectId={projectId}
        refetch={handleRefetch}
      />
      <ConfirmModal
        ref={confirmDeleteModalRef}
        onCancel={handleToggleDeleteNamespace()}
        onConfirm={handleDeleteConfirm}
        text={`Are you sure you want to delete "${selectedDeleteNamespace?.name}"? This action cannot be undone.`}
        title="Delete namespace"
      />
    </>
  );
};
