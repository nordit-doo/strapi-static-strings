import { useEffect, useRef, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';

import { IPagination } from '../../../../types/Common';
import { ITranslation } from '../../../../types/Translation';
import { deleteTranslation, getTranslation } from './request';

export const useHook = () => {
  const params = useParams<{ namespaceId: string; projectId: string }>();
  const namespaceId = Number(params.namespaceId);
  const projectId = Number(params.projectId);
  const [searchParams, setSearchParams] = useSearchParams();

  const confirmDeleteModalRef = useRef<{ open: (data?: unknown) => void } | null>(null);
  const translationCreatedEditModalRef = useRef<{ open: (data?: ITranslation) => void } | null>(
    null
  );

  const [selectedDeleteTranslation, setSelectedDeleteTranslation] = useState<ITranslation | null>(
    null
  );
  const [isPending, setIsPending] = useState(true);
  const [translations, setTranslations] = useState<{
    items: ITranslation[];
    pagination: IPagination;
  } | null>(null);
  const [showMissingTranslationsOnly, setShowMissingTranslationsOnly] = useState(false);

  const handleEditTranslation = (translation: ITranslation) => () => {
    translationCreatedEditModalRef.current?.open(translation);
  };

  const handleToggleDeleteTranslation = (translation?: ITranslation) => async () => {
    if (translation) {
      setSelectedDeleteTranslation(translation);
      confirmDeleteModalRef.current?.open(translation);
    } else {
      setSelectedDeleteTranslation(null);
    }
  };

  const handleDeleteConfirm = async (): Promise<boolean> => {
    if (namespaceId && projectId && selectedDeleteTranslation?.id) {
      try {
        await deleteTranslation({
          namespaceId,
          projectId,
          translationId: selectedDeleteTranslation.id,
        });
        handleRefetch({
          page: Number(searchParams.get('page')) || 1,
          showMissingOnly: showMissingTranslationsOnly,
        });
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };

  const handleTranslationCreate = () => {
    translationCreatedEditModalRef.current?.open();
  };

  const handlePagePress = (page: number) => {
    setSearchParams({ page: String(page) });
    handleRefetch({ page, showMissingOnly: showMissingTranslationsOnly });
  };

  const handleRefetch = async (
    { page, showMissingOnly }: { page?: number; showMissingOnly: boolean } = {
      page: 1,
      showMissingOnly: showMissingTranslationsOnly,
    }
  ) => {
    const currentPage = page || 1;

    if (projectId) {
      setIsPending(true);
      const data = await getTranslation({
        namespaceId: Number(namespaceId),
        page: currentPage,
        projectId: Number(projectId),
        showMissingOnly,
      });
      setTranslations(data);
      setIsPending(false);
    }
  };

  const handleShowMissingTranslationsOnlyChange = (value: boolean) => {
    setShowMissingTranslationsOnly(value);
    handleRefetch({ page: 1, showMissingOnly: value });
  };

  useEffect(() => {
    if (projectId) {
      handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly });
    }
  }, [projectId]);

  return {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handlePagePress,
    handleRefetch,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    handleTranslationCreate,
    isPending,
    namespaceId,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef,
  };
};
