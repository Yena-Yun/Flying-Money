import { TransactionType } from '~/types/mainType';

export const saveToLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getFromLocalStorage = (key: string): TransactionType[] => {
  const savedData = localStorage.getItem(key) || null;
  return savedData && JSON.parse(savedData);
};
