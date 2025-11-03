import { Button, Field, Flex, Modal, Typography } from '@strapi/design-system';
import { Cog, Duplicate } from '@strapi/icons';

import { useHook } from './hook';

export const SettingsModal = () => {
  const { apiKey, isOpen, isLoading, handleCopy, handleClose, handleOpenChange, handleRegenerate } =
    useHook();

  const renderRefreshIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0114.36-3.36L23 10"></path>
      <path d="M20.49 15a9 9 0 01-14.36 3.36L1 14"></path>
    </svg>
  );

  return (
    <>
      <Button variant="tertiary" onClick={() => handleOpenChange(true)} startIcon={<Cog />}>
        Settings
      </Button>
      <Modal.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>API Key</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Flex direction="column" gap="2rem">
              <Typography variant="omega" textColor="neutral600">
                You can use this API key to authenticate external translation API calls.
              </Typography>

              <Field.Root paddingRight="0" width="100%">
                <Field.Label>API Key</Field.Label>
                <Flex
                  alignItems="center"
                  background="neutral100"
                  borderRadius="4px"
                  borderWidth="1px"
                  borderStyle="solid"
                  borderColor="neutral200"
                  gap="1rem"
                  padding="0.5rem"
                  paddingLeft="1rem"
                >
                  <Flex flex="1" padding="0.5rem 1rem">
                    <Typography textColor="neutral600" fontSize="sm">
                      {apiKey || '••••••••••••••••••••••••••••••••••••••••'}
                    </Typography>
                  </Flex>
                  <Flex gap="0.5rem">
                    <Button
                      variant="secondary"
                      onClick={handleCopy}
                      startIcon={<Duplicate />}
                      disabled={!apiKey}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="danger"
                      onClick={handleRegenerate}
                      startIcon={renderRefreshIcon()}
                      loading={isLoading}
                    >
                      Regenerate
                    </Button>
                  </Flex>
                </Flex>
              </Field.Root>
            </Flex>
          </Modal.Body>
          <Modal.Footer>
            <Flex justifyContent="flex-end" gap="1rem">
              <Button variant="tertiary" onClick={handleClose}>
                Close
              </Button>
            </Flex>
          </Modal.Footer>
        </Modal.Content>
      </Modal.Root>
    </>
  );
};
