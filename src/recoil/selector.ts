import { selector } from 'recoil';
import { isOpenModalState } from './atom';

export const openModalSelector = selector({
  key: 'openModalSelector',
  get: () => {},
  set: ({ set }) => {
    set(isOpenModalState, true);
  },
});

export const closeModalSelector = selector({
  key: 'closeModalSelector',
  get: () => {},
  set: ({ set }) => {
    set(isOpenModalState, false);
  },
});
