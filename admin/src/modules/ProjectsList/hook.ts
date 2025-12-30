import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { IPagination } from '../../../../types/Common';
import { IProject } from '../../../../types/Project';
import { PLUGIN_ID } from '../../pluginId';
import { useNotification } from '@strapi/strapi/admin';
import { IConfirmModalRef } from 'src/components/ConfirmModal/types';

const getNamespaces = async () => {
  return axios(`/${PLUGIN_ID}/api/projects`).then((res) => res.data);
};

const deleteProject = async (id: string) => {
  return axios.delete(`/${PLUGIN_ID}/api/projects/${id}`).then((res) => res.data);
};

export const useHook = () => {
  const { toggleNotification } = useNotification();
  const navigate = useNavigate();

  const confirmDeleteModalRef = useRef<IConfirmModalRef<unknown> | null>(null);
  const projectCreatedEditModalRef = useRef<{ open: (data?: IProject) => void } | null>(null);

  const [isPending, setIsPending] = useState(true);
  const [projects, setProjects] = useState<{ items: IProject[]; pagination: IPagination } | null>(
    null
  );
  const [selectedDeleteProject, setSelectedDeleteProject] = useState<IProject | null>(null);

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

  const handleViewAllTranslations = (project: IProject) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/plugins/${PLUGIN_ID}/projects/${project.id}/translations`);
  };

  const handleToggleDelete = (project?: IProject) => async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project) {
      setSelectedDeleteProject(project);
      confirmDeleteModalRef.current?.open(project);
    } else {
      setSelectedDeleteProject(null);
    }
  };

  const handleDeleteConfirm = async (): Promise<boolean> => {
    if (selectedDeleteProject?.documentId) {
      try {
        await deleteProject(selectedDeleteProject.documentId);
        await handleRefetch();
        toggleNotification({
          type: 'success',
          message: 'Project deleted successfully!',
        });
        return true;
      } catch (error) {
        console.error(error);
        toggleNotification({
          type: 'danger',
          message: 'Failed to delete project.',
        });
      }
    }
    return false;
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
    confirmDeleteModalRef,
    handleClipboardCopy,
    handleDeleteConfirm,
    handleEdit,
    handleProjectCreate,
    handleRefetch,
    handleToggleDelete,
    handleViewAllTranslations,
    isPending,
    projectCreatedEditModalRef,
    projects,
    selectedDeleteProject,
  };
};
