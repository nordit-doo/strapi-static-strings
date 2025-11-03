import axios from 'axios';
import { useEffect, useState } from 'react';
import { ILocale } from '../../../types/Locale';

const getLocales = async () => {
  return axios.get<ILocale[]>(`/api/i18n/locales`).then((res) => res.data);
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
