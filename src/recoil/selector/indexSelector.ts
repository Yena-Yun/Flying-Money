import { selector } from 'recoil';
import { clickedTabNameState } from '../atom/indexState';

export const tabClickSelector = selector({
  key: 'handleTabClick',
  get: ({ get }) => {
    return get(clickedTabNameState);
  },
  set: ({ set }, newTab) => {
    set(clickedTabNameState, newTab);
  },
});
