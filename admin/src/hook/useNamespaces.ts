import { useEffect, useState } from 'react';
import axios from 'axios';

import { PLUGIN_ID } from '../pluginId';
import { INamespace } from '../../../types/Namespace';

const getNamespaces = async (projectId: number) => {
  return axios(`/${PLUGIN_ID}/api/projects/${projectId}/namespaces/all`).then((res) => res.data);
};

export const useNamespaces = ({ projectId }: { projectId?: number }) => {
  const [namespaces, setNamespaces] = useState<INamespace[]>([]);

  const refetchNamespaces = async () => {
    if (!projectId) {
      return;
    }
    const data = await getNamespaces(projectId);
    setNamespaces(data);
  };

  useEffect(() => {
    refetchNamespaces();
  }, []);

  return { namespaces };
};
