import { useState, useImperativeHandle } from 'react';
import { getApiKey, regenerateApiKey } from './requests';
import { useNotification } from '@strapi/strapi/admin';

export const useHook = () => {
  const { toggleNotification } = useNotification();

  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchApiKey = async () => {
    setIsLoading(true);
    try {
      const data = await getApiKey();
      setApiKey(data.value);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    setIsLoading(true);
    try {
      const data = await regenerateApiKey();
      setApiKey(data.value);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (apiKey) {
      try {
        await navigator.clipboard.writeText(apiKey);
        toggleNotification({ type: 'success', message: 'API key copied to clipboard!' });
      } catch {
        toggleNotification({ type: 'warning', message: 'Failed to copy API key.' });
      }
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      handleFetchApiKey();
    }
  };

  const handleClose = () => setIsOpen(false);

  return {
    apiKey,
    isOpen,
    isLoading,
    handleClose,
    handleCopy,
    handleOpenChange,
    handleFetchApiKey,
    handleRegenerate,
  };
};
