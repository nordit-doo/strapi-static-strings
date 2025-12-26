import { useEffect, useRef, useState } from 'react';

import { IPagination } from '../../../../types/Common';
import { INamespace } from '../../../../types/Namespace';
import { useParams, useSearchParams } from 'react-router-dom';
import { deleteNamespace, getNamespaces } from './request';
import { IConfirmModalRef } from 'src/components/ConfirmModal/types';

export const useHook = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [params, setParams] = useSearchParams();

  const confirmDeleteModalRef = useRef<IConfirmModalRef<unknown> | null>(null);
  const namespaceCreatedEditModalRef = useRef<{ open: (data?: INamespace) => void } | null>(null);

  const [isPending, setIsPending] = useState(true);
  const [namespaces, setNamespaces] = useState<{
    items: INamespace[];
    pagination: IPagination;
  } | null>(null);
  const [selectedDeleteNamespace, setSelectedDeleteNamespace] = useState<INamespace | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleEditNamespace = (namespace: INamespace) => () => {
    namespaceCreatedEditModalRef.current?.open(namespace);
  };

  const handleToggleDeleteNamespace = (namespace?: INamespace) => async () => {
    if (namespace) {
      setSelectedDeleteNamespace(namespace);
      confirmDeleteModalRef.current?.open(namespace);
    } else {
      setSelectedDeleteNamespace(null);
    }
  };

  const handleDeleteConfirm = async (): Promise<boolean> => {
    if (projectId && selectedDeleteNamespace?.id) {
      try {
        await deleteNamespace({
          namespaceId: Number(selectedDeleteNamespace.id),
          projectId: Number(projectId),
        });
        handleRefetch({ page: Number(params.get('page')) || 1, search: searchQuery });
        return true;
      } catch (error) {
        console.error(error);
      }
    }
    return false;
  };

  const handleNamespaceCreate = () => {
    namespaceCreatedEditModalRef.current?.open();
  };

  const handlePagePress = (page: number) => {
    setParams({ page: String(page) });
    handleRefetch({ page, search: searchQuery });
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setParams({ page: '1' });
    handleRefetch({ page: 1, search: value });
  };

  const handleRefetch = async (
    { page, search }: { page?: number; search?: string } = {
      page: Number(params.get('page')) || 1,
      search: '',
    }
  ) => {
    const currentPage = page || 1;
    const searchTerm = search !== undefined ? search : searchQuery;

    if (projectId) {
      setIsPending(true);
      const data = await getNamespaces({ page: currentPage, projectId, search: searchTerm });
      setNamespaces(data);
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (projectId) {
      const page = Number(params.get('page')) || 1;
      handleRefetch({ page, search: '' });
    }
  }, [projectId]);

  return {
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
  };
};
