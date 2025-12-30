import { useEffect, useRef, useState } from 'react';

import { useParams, useSearchParams } from 'react-router-dom';

import { IPagination } from '../../../../types/Common';
import { ITranslation } from '../../../../types/Translation';
import { deleteTranslation, getProjectTranslations } from './request';

export const useHook = () => {
  const params = useParams<{ projectId: string }>();
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
  const [searchQuery, setSearchQuery] = useState('');

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
    if (projectId && selectedDeleteTranslation?.id) {
      try {
        await deleteTranslation({
          projectId,
          translationId: selectedDeleteTranslation.id,
        });
        handleRefetch({
          page: Number(searchParams.get('page')) || 1,
          showMissingOnly: showMissingTranslationsOnly,
          search: searchQuery,
        });
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };

  const handlePagePress = (page: number) => {
    setSearchParams({ page: String(page) });
    handleRefetch({ page, showMissingOnly: showMissingTranslationsOnly, search: searchQuery });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setSearchParams({ page: '1' });
    handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly, search: value });
  };

  const handleRefetch = async (
    {
      page,
      showMissingOnly,
      search,
    }: { page?: number; showMissingOnly: boolean; search?: string } = {
      page: 1,
      showMissingOnly: showMissingTranslationsOnly,
      search: '',
    }
  ) => {
    const currentPage = page || 1;
    const searchTerm = search !== undefined ? search : searchQuery;

    if (projectId) {
      setIsPending(true);
      const data = await getProjectTranslations({
        page: currentPage,
        projectId: Number(projectId),
        showMissingOnly,
        search: searchTerm,
      });
      setTranslations(data);
      setIsPending(false);
    }
  };

  const handleShowMissingTranslationsOnlyChange = (value: boolean) => {
    setShowMissingTranslationsOnly(value);
    handleRefetch({ page: 1, showMissingOnly: value, search: searchQuery });
  };

  useEffect(() => {
    if (projectId) {
      handleRefetch({ page: 1, showMissingOnly: showMissingTranslationsOnly, search: '' });
    }
  }, [projectId]);

  return {
    confirmDeleteModalRef,
    handleDeleteConfirm,
    handleEditTranslation,
    handlePagePress,
    handleRefetch,
    handleSearchChange,
    handleShowMissingTranslationsOnlyChange,
    handleToggleDeleteTranslation,
    isPending,
    searchQuery,
    translations,
    projectId,
    selectedDeleteTranslation,
    showMissingTranslationsOnly,
    translationCreatedEditModalRef,
  };
};
