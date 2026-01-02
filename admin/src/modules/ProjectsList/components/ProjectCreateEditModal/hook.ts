import { useImperativeHandle, useState } from 'react';

import { getFetchClient } from '@strapi/strapi/admin';

import { IProject } from '../../../../../../types/Project';
import { PLUGIN_ID } from '../../../../pluginId';

const { post, put, del } = getFetchClient();

const createProject = async ({ name, description }: Partial<IProject>) => {
  return post(`/${PLUGIN_ID}/api/projects`, { name, description }).then((res) => res.data);
};

const updateProject = async ({ id, name, description }: Partial<IProject>) => {
  return put(`/${PLUGIN_ID}/api/projects/${id}`, { name, description }).then((res) => res.data);
};

const deleteProject = async (id: string) => {
  return del(`/${PLUGIN_ID}/api/projects/${id}`).then((res) => res.data);
};

export const useHook = ({ ref, refetch }: any) => {
  const [currentProject, setCurrentProject] = useState<IProject | null>(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (currentProject) {
      setIsLoadingDelete(true);
      await deleteProject(currentProject.id);
      setIsLoadingDelete(false);
    }
    handleClose();
    refetch();
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenModal = (data?: IProject) => {
    setIsOpen(true);
    setCurrentProject(data || null);
    if (data) {
      setName(data.name);
      setDescription(data.description || '');
    } else {
      setName('');
      setDescription('');
    }
  };

  const handleSave = async () => {
    setIsLoadingSave(true);
    if (currentProject) {
      await updateProject({ id: currentProject.id, name, description });
    } else {
      await createProject({ name, description });
    }
    handleClose();
    refetch();
    setIsLoadingSave(false);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpenModal,
  }));

  return {
    currentProject,
    description,
    handleClose,
    handleDelete,
    handleDescriptionChange,
    handleNameChange,
    handleOpenChange,
    handleSave,
    isLoadingDelete,
    isLoadingSave,
    isOpen,
    name,
  };
};
