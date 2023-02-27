import { atom } from 'recoil';
import * as T from 'types';

export const clickedIndexState = atom({
  key: 'clickedIndex',
  default: '',
});

export const clickedItemIndexState = atom({
  key: 'clickedItemIndex',
  default: '',
});

export const clickedTagPopupIndexState = atom({
  key: 'clickedTagPopupIndex',
  default: '',
});

export const clickedTabNameState = atom<T.TabMenuIdType>({
  key: 'clickedTabName',
  default: 'all',
});
