import { useEffect, useImperativeHandle, useState } from 'react';

import { ITranslation } from '../../../../../../types/Translation';
import { useNamespaces } from '../../../../hook/useNamespaces';
import { useLocales } from '../../../../hook/useLocales';
import { createTranslation, deleteTranslation, updateTranslation } from '../../request';

export const useHook = ({ namespaceId, projectId, ref, refetch }: any) => {
  const [currentTranslation, setCurrentTranslation] = useState<ITranslation | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState('');
  const [selectedNamespaceId, setSelectedNamespaceId] = useState(namespaceId);
  const [translations, setTranslations] = useState<{ [key: string]: string }>({});

  const { locales } = useLocales();
  const { namespaces } = useNamespaces({ projectId });

  const handleClose = () => {
    setIsOpen(false);
    setCurrentTranslation(null);
    setKey('');
    setSelectedNamespaceId(namespaceId);
    setTranslations({});
  };

  const handleDelete = async () => {
    if (currentTranslation) {
      setIsLoadingDelete(true);
      await deleteTranslation({ namespaceId, projectId, translationId: currentTranslation.id });
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };

  const handleTranslationsChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTranslations((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newKey = e.target.value;
    setKey(newKey);
  };

  const handleNamespaceChange = (value: string | number) => {
    setSelectedNamespaceId(value);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenModal = (data?: ITranslation) => {
    setIsOpen(true);
    setCurrentTranslation(data || null);
    if (data) {
      setKey(data.key);
      setSelectedNamespaceId(namespaceId);
      const translationsData: { [key: string]: string } = {};
      locales.forEach((locale) => {
        const defaultValue = data[locale.code] || '';
        translationsData[locale.code] = defaultValue as string;
      });
      setTranslations(translationsData);
    } else {
      setKey('');
      setTranslations((prev) => {
        const updated = { ...prev };
        locales.forEach((locale) => {
          if (!(locale.code in updated)) {
            const defaultValue = currentTranslation ? currentTranslation[locale.code] || '' : '';
            updated[locale.code] = defaultValue as string;
          }
        });
        return updated;
      });
      setCurrentTranslation(null);
      setSelectedNamespaceId(namespaceId);
    }
  };

  const handleSave = async () => {
    setIsLoadingSave(true);
    try {
      const translationsData: { [key: string]: string } = {};
      locales.forEach((locale) => {
        const defaultValue = translations[locale.code] || '';
        translationsData[locale.code] = defaultValue as string;
      });
      if (currentTranslation) {
        await updateTranslation({
          id: currentTranslation.id,
          key,
          namespaceId: selectedNamespaceId,
          projectId,
          translations: translationsData,
        });
      } else {
        await createTranslation({
          namespaceId: selectedNamespaceId,
          key,
          projectId,
          translations: translationsData,
        });
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error('Error saving namespace:', error);
    }
    setIsLoadingSave(false);
  };

  useEffect(() => {
    if (locales) {
      setTranslations((prev) => {
        const updated = { ...prev };
        locales.forEach((locale) => {
          if (!(locale.code in updated)) {
            const defaultValue = currentTranslation ? currentTranslation[locale.code] || '' : '';
            updated[locale.code] = defaultValue as string;
          }
        });
        return updated;
      });
    }
  }, [currentTranslation]);

  useImperativeHandle(ref, () => ({
    open: handleOpenModal,
  }));

  return {
    currentTranslation,
    handleClose,
    handleDelete,
    handleKeyChange,
    handleNamespaceChange,
    handleTranslationsChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    key,
    locales,
    namespaces,
    translations,
    selectedNamespaceId,
  };
};
