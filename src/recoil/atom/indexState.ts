import { atom } from 'recoil';
import { TTab } from 'types';

export const clickedIndexState = atom({
  key: 'clickedIndex',
  default: '',
});

export const clickedListIndexState = atom({
  key: 'clickedItemIndex',
  default: '',
});

export const clickedTagPopupIndexState = atom({
  key: 'clickedTagPopupIndex',
  default: '',
});

export const clickedTabNameState = atom<TTab.TabMenuIdType>({
  key: 'clickedTabName',
  default: 'all',
});

export const weekButtonIndexState = atom({
  key: 'weekButtonIndex',
  default: 0,
});
