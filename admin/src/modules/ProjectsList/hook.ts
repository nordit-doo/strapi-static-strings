import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import { IPagination } from '../../../../types/Common';
import { IProject } from '../../../../types/Project';
import { PLUGIN_ID } from '../../pluginId';
import { useNotification } from '@strapi/strapi/admin';

const getNamespaces = async () => {
  return axios(`/${PLUGIN_ID}/api/projects`).then((res) => res.data);
};

export const useHook = () => {
  const { toggleNotification } = useNotification();

  const projectCreatedEditModalRef = useRef<{ open: (data?: IProject) => void } | null>(null);

  const [isPending, setIsPending] = useState(true);
  const [projects, setProjects] = useState<{ items: IProject[]; pagination: IPagination } | null>(
    null
  );

  const handleClipboardCopy = (project: IProject) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(project.documentId);
    toggleNotification({
      type: 'success',
      message: 'Copied to clipboard!',
    });
  };

  const handleEdit = (project: IProject) => (e: React.MouseEvent) => {
    e.preventDefault();
    projectCreatedEditModalRef.current?.open(project);
  };

  const handleDelete = (project: IProject) => (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Implement delete logic here
  };

  const handleProjectCreate = () => {
    projectCreatedEditModalRef.current?.open();
  };

  const handleRefetch = async () => {
    setIsPending(true);
    const data = await getNamespaces();
    setProjects(data);
    setIsPending(false);
  };

  useEffect(() => {
    handleRefetch();
  }, []);

  return {
    handleClipboardCopy,
    handleDelete,
    handleEdit,
    handleProjectCreate,
    handleRefetch,
    isPending,
    projectCreatedEditModalRef,
    projects,
  };
};
