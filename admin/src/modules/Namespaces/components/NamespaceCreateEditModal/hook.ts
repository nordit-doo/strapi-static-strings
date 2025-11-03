import { useImperativeHandle, useState } from 'react';

import axios from 'axios';

import { PLUGIN_ID } from '../../../../pluginId';
import { INamespace } from '../../../../../../types/Namespace';

const createNamespace = async ({
  projectId,
  name,
  description,
}: Partial<INamespace & { projectId: string }>) => {
  return axios
    .post(`/${PLUGIN_ID}/api/projects/${projectId}/namespaces`, { name, description })
    .then((res) => res.data);
};

const updateNamespace = async ({
  projectId,
  id,
  name,
  description,
}: INamespace & { projectId: string }) => {
  return axios
    .put(`/${PLUGIN_ID}/api/projects/${projectId}/namespaces/${id}`, { name, description })
    .then((res) => res.data);
};

const deleteNamespace = async (id: string) => {
  return axios.delete(`/${PLUGIN_ID}/api/projects/${id}/namespaces/${id}`).then((res) => res.data);
};

export const useHook = ({ projectId, ref, refetch }: any) => {
  const [currentNamespace, setCurrentNamespace] = useState<INamespace | null>(null);
  const [description, setDescription] = useState('');
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDelete = async () => {
    if (currentNamespace) {
      setIsLoadingDelete(true);
      await deleteNamespace(currentNamespace.id);
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

  const handleOpenModal = (data?: INamespace) => {
    setIsOpen(true);
    setCurrentNamespace(data || null);
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
    try {
      if (currentNamespace) {
        await updateNamespace({ id: currentNamespace.id, description, name, projectId });
      } else {
        await createNamespace({ projectId, name, description });
      }
      handleClose();
      refetch();
    } catch (error) {
      console.error('Error saving namespace:', error);
    }
    setIsLoadingSave(false);
  };

  useImperativeHandle(ref, () => ({
    open: handleOpenModal,
  }));

  return {
    currentNamespace,
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
