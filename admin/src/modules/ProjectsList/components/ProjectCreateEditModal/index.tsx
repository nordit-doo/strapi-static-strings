import { forwardRef } from 'react';

import { Button, Field, Flex, Modal, Textarea } from '@strapi/design-system';
import { Trash } from '@strapi/icons';

import { useHook } from './hook';

export const ProjectCreateEditModal = forwardRef(({ refetch }: any, ref: any) => {
  const {
    currentProject,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave,
  } = useHook({ ref, refetch });

  return (
    <Modal.Root open={isOpen} onOpenChange={handleOpenChange}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>Create project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Flex flex="1" direction="column" gap="2rem">
            <Field.Root flex="1" required width="100%">
              <Field.Label>Name</Field.Label>
              <Field.Input value={name} onChange={handleNameChange} />
            </Field.Root>

            <Field.Root flex="1" width="100%">
              <Field.Label>Description</Field.Label>
              <Textarea value={description} onChange={handleDescriptionChange} />
            </Field.Root>
          </Flex>
        </Modal.Body>
        <Modal.Footer>
          {!!currentProject && (
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
});
