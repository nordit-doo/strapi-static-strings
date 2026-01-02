import { useEffect, useState } from 'react';

import { getFetchClient } from '@strapi/strapi/admin';

import { ILocale } from '../../../types/Locale';

const { get } = getFetchClient();

const getLocales = async () => {
  const { data } = await get<ILocale[]>('/i18n/locales');
  return data;
};

export const useLocales = () => {
  const [locales, setLocales] = useState<ILocale[]>([]);

  const refetchLocales = async () => {
    const data = await getLocales();
    setLocales(data);
  };

  useEffect(() => {
    refetchLocales();
  }, []);

  return { locales };
};
