import { forwardRef } from 'react';

import { Button, Flex, Modal, Typography } from '@strapi/design-system';
import { Trash } from '@strapi/icons';

import { useHook } from './hook';
import { IConfirmModalProps, IConfirmModalRef } from './types';

export const ConfirmModal = forwardRef(
  (
    { onCancel, onConfirm, text, title }: IConfirmModalProps,
    ref: React.Ref<IConfirmModalRef<unknown>> | null
  ) => {
    const { handleClose, handleConfirm, isOpen, isLoadingConfirm } = useHook({
      onCancel,
      onConfirm,
      ref,
    });

    return (
      <Modal.Root open={isOpen} onOpenChange={handleClose}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ paddingLeft: '2rem', paddingRight: '1rem' }}>
            <Typography>{text}</Typography>
          </Modal.Body>
          <Modal.Footer>
            <Flex justifyContent="space-between" alignItems="center" width="100%">
              <Flex flex="1" />
              <Flex gap="1rem">
                <Button onClick={handleClose} variant="tertiary">
                  Cancel
                </Button>
                <Button
                  color="white"
                  loading={isLoadingConfirm}
                  onClick={handleConfirm}
                  startIcon={<Trash color="white" />}
                  variant="danger"
                  style={{ color: 'white' }}
                >
                  Confirm
                </Button>
              </Flex>
            </Flex>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    );
  }
);
