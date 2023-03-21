import { DefaultValue, selector } from 'recoil';
import uuid4 from 'uuid4';
import { AIndex, AMain } from '../atom';

export const addModalTitleSelector = selector({
  key: 'setModalTitle',
  get: () => {
    return '';
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      set(AMain.addModalTitleState, newValue);
    }
  },
});

export const addModalListSelector = selector({
  key: 'setModalList',
  get: () => {
    return {
      id: '',
      flag: '',
      input: '',
    };
  },
  set: ({ get, set }, newValue) => {
    const addModalList = get(AMain.addModalListState);

    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      const { id, flag, input } = newValue;

      const result = addModalList.map((item) => {
        if (item.id === id) {
          return flag === 'name'
            ? { ...item, name: input }
            : { ...item, price: parseInt(input) };
        }

        return item;
      });

      set(AMain.addModalListState, result);
    }
  },
});

export const addTagToItemSelector = selector({
  key: 'addTagToItem',
  get: () => {
    return '';
  },
  set: ({ get, set }, newTag) => {
    if (newTag instanceof DefaultValue) {
      return newTag;
    } else {
      const addModalList = get(AMain.addModalListState);
      const clickedTagPopupIndex = get(AIndex.clickedTagPopupIndexState);

      const result = addModalList.map((item) => {
        return item.id === clickedTagPopupIndex
          ? { ...item, tag: newTag }
          : item;
      });

      set(AMain.addModalListState, result);
    }
  },
});

export const addOrDeleteItemInAddModalSelector = selector({
  key: 'addOrDeleteItemInAddModal',
  get: () => {
    return {
      flag: '',
      index: '',
    };
  },
  set: ({ get, set }, newValue) => {
    const addModalList = get(AMain.addModalListState);

    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      const { flag, index } = newValue;

      if (flag === 'addItem') {
        const defaultItem = { id: uuid4(), name: '', price: 0, tag: '' };

        set(AMain.addModalListState, [...addModalList, defaultItem]);
      } else {
        const deletedItemList = addModalList.filter(({ id }) => id !== index);

        set(AMain.addModalListState, deletedItemList);
      }
    }
  },
});
