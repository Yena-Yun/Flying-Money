import { selector } from 'recoil';
import * as I from '../atom/clickedIndexState';

export const tabClickSelector = selector({
  key: 'handleTabClick',
  get: ({ get }) => {
    return get(I.clickedTabNameState);
  },
  set: ({ set }, newTab) => {
    set(I.clickedTabNameState, newTab);
  },
});
