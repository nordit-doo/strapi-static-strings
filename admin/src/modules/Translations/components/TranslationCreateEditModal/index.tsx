import { forwardRef } from 'react';

import {
  Button,
  Divider,
  Field,
  Flex,
  Modal,
  SingleSelect,
  SingleSelectOption,
  Textarea,
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';

import { useHook } from './hook';

export const TranslationCreateEditModal = forwardRef(
  ({ namespaceId, projectId, refetch }: any, ref: any) => {
    const {
      currentTranslation,
      handleClose,
      handleDelete,
      handleKeyChange,
      handleNamespaceChange,
      handleOpenChange,
      handleTranslationsChange,
      handleSave,
      isLoadingDelete,
      isLoadingSave,
      isOpen,
      key,
      locales,
      namespaces,
      selectedNamespaceId,
      translations,
    } = useHook({ namespaceId, projectId, ref, refetch });

    return (
      <Modal.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Create namespace</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Flex flex="1" direction="column" gap="2rem">
              <Field.Root flex="1" required width="100%">
                <Field.Label>Namespace</Field.Label>
                <SingleSelect
                  required
                  onChange={handleNamespaceChange}
                  placeholder="Select namespace"
                  value={selectedNamespaceId}
                >
                  {namespaces.map((ns) => (
                    <SingleSelectOption key={ns.id} value={ns.id}>
                      {ns.name}
                    </SingleSelectOption>
                  ))}
                </SingleSelect>
              </Field.Root>
              <Field.Root flex="1" required width="100%">
                <Field.Label>Key</Field.Label>
                <Field.Input onChange={handleKeyChange} value={key} />
              </Field.Root>
            </Flex>
            <Divider marginTop="2rem" marginBottom="2rem" />
            {locales.map((locale) => (
              <Field.Root key={locale.code} marginBottom="1.5rem" required={locale.code === 'en'}>
                <Field.Label>{locale.name}</Field.Label>
                <Textarea
                  onChange={handleTranslationsChange(locale.code)}
                  rows={4}
                  value={translations[locale.code] || ''}
                />
              </Field.Root>
            ))}
          </Modal.Body>
          <Modal.Footer>
            {!!currentTranslation && (
              <Button
                color="white"
                gap="0"
                loading={isLoadingDelete}
                variant="secondary"
                onClick={handleDelete}
                startIcon={<Trash color="white" />}
              />
            )}

            <Flex gap="1rem">
              <Button onClick={handleClose} variant="tertiary">
                Cancel
              </Button>
              <Button loading={isLoadingSave} onClick={handleSave}>
                Save
              </Button>
            </Flex>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    );
  }
);
