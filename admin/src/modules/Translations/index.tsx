import {
  Badge,
  Box,
  Button,
  Dialog,
  EmptyStateLayout,
  Flex,
  Loader,
  Switch,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Typography,
} from '@strapi/design-system';
import { Pencil, Plus, Trash } from '@strapi/icons';

import { TranslationCreateEditModal } from './components/TranslationCreateEditModal';
import { useHook } from './hook';
import { Pagination } from '../../components/Pagination';
import { ITranslation } from '../../../../types/Translation';
import { useLocales } from '../../hook/useLocales';
import { ILocale } from '../../../../types/Locale';
import { ConfirmModal } from '../../components/ConfirmModal';

export const Translations = () => {
  const { locales } = useLocales();
  const {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handleTranslationCreate,
    handlePagePress,
    handleRefetch,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    isPending,
    namespaceId,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef,
  } = useHook();

  const renderLoader = () => {
    if (isPending && !translations?.items.length) {
      return (
        <Box>
          <Loader />
        </Box>
      );
    }
    return <></>;
  };

  const renderEmptyState = () => {
    if (!isPending && !translations?.items.length) {
      return (
        <Box background="neutral100">
          <EmptyStateLayout
            content="You don't have any translations yet."
            action={
              <Button onClick={handleTranslationCreate} startIcon={<Plus />} variant="secondary">
                Create your first translation
              </Button>
            }
          />
        </Box>
      );
    }
    return <></>;
  };

  const renderContent = () => {
    if (!isPending && !translations?.items.length) {
      return <></>;
    }

    return (
      <>
        {!!translations?.items?.length && (
          <Flex marginBottom="1rem">
            <Button
              marginRight="1rem"
              onClick={handleTranslationCreate}
              startIcon={<Plus />}
              variant="secondary"
            >
              Add translation
            </Button>
            <Switch
              checked={showMissingTranslationsOnly}
              name="showMissingTranslationsOnly"
              onLabel="Show missing translations only"
              offLabel="Show missing translations only"
              onCheckedChange={handleShowMissingTranslationsOnlyChange}
              visibleLabels
            />
          </Flex>
        )}
        <Box paddingTop="1rem" paddingBottom="1rem">
          <Table colCount={3} rowCount={translations?.items?.length || 0}>
            <Thead>
              <Tr style={{ width: '280px' }}>
                <Th>
                  <Typography variant="sigma">Key</Typography>
                </Th>
                <Th>
                  <Typography variant="sigma">Translations</Typography>
                </Th>
                <Th style={{ width: '120px' }}>
                  <Typography variant="sigma">Actions</Typography>
                </Th>
              </Tr>
            </Thead>

            <Tbody>
              {translations?.items?.map((translation: ITranslation) => {
                const isMissing = Object.values(locales).some(
                  (locale: ILocale) => !translation[locale.code]
                );
                return (
                  <Tr key={translation.id}>
                    <Td style={{ width: '280px', verticalAlign: 'top' }}>
                      <Flex gap={2} paddingTop="15px">
                        <Typography
                          cursor="pointer"
                          fontWeight="bold"
                          onClick={handleEditTranslation(translation)}
                          variant="omega"
                        >
                          {translation.key}
                        </Typography>
                        {isMissing && (
                          <Badge backgroundColor="red" style={{ padding: '2px 6px' }}>
                            <Typography fontWeight="bold" textColor="white" fontSize="9px">
                              Missing
                            </Typography>
                          </Badge>
                        )}
                      </Flex>
                    </Td>
                    <Td
                      style={{
                        paddingTop: '10px',
                        paddingBottom: '10px',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                      }}
                    >
                      {locales.map((locale) => (
                        <Flex key={locale.code} marginRight={1} padding={1} alignItems="flex-start">
                          <Box display="flex">
                            <Typography
                              lineHeight="14px"
                              fontWeight="bold"
                              variant="omega"
                              style={{ minWidth: '100px' }}
                            >
                              {locale.name}:{' '}
                            </Typography>
                          </Box>
                          <Typography lineHeight="16px" variant="omega">
                            {translation[locale.code] || '-'}
                          </Typography>
                        </Flex>
                      ))}
                    </Td>
                    <Td style={{ width: '120px' }}>
                      <Flex gap="0.5rem" justifyContent="flex-end">
                        <Button
                          gap="0"
                          onClick={handleEditTranslation(translation)}
                          variant="secondary"
                          startIcon={<Pencil />}
                        />
                        <Button
                          gap="0"
                          onClick={handleToggleDeleteTranslation(translation)}
                          startIcon={<Trash color="white" />}
                          variant="danger"
                        />
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
          <Flex justifyContent="space-between" paddingTop="1rem">
            {translations?.pagination && (
              <Pagination pagination={translations?.pagination} onPagePress={handlePagePress} />
            )}
          </Flex>
        </Box>
      </>
    );
  };

  return (
    <>
      {renderContent()}
      {renderEmptyState()}
      {renderLoader()}
      <TranslationCreateEditModal
        ref={translationCreatedEditModalRef}
        namespaceId={namespaceId}
        projectId={projectId}
        refetch={handleRefetch}
      />

      <ConfirmModal
        ref={confirmDeleteModalRef}
        onCancel={handleToggleDeleteTranslation()}
        onConfirm={handleDeleteConfirm}
        text={`Are you sure you want to delete "${selectedDeleteTranslation?.key}"? This action cannot be undone.`}
        title="Delete translation"
      />
    </>
  );
};
