import { selector, DefaultValue } from 'recoil';
import uuid4 from 'uuid4';
import {
  clickedTabState,
  expenseListState,
  isOpenCalendarState,
  isOpenModalState,
  isOpenTagPopupState,
  selectedDateState,
  savedTagGroupState,
  transactionListState,
  transactionState,
  clickedTagPopupIndexState,
  isOpenDetailModalState,
  clickedExpenseIndexState,
} from './atom';

export const openModalSelector = selector({
  key: 'handleOpenModal',
  get: () => {},
  set: ({ set }) => {
    set(isOpenModalState, true);
  },
});

export const closeModalSelector = selector({
  key: 'handleCloseModal',
  get: () => {},
  set: ({ set }) => {
    set(isOpenModalState, false);
  },
});

export const toggleCalendarSelector = selector({
  key: 'handleToggleCalendar',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenCalendar = get(isOpenCalendarState);
    if (isOpenCalendar) set(isOpenCalendarState, false);
    else set(isOpenCalendarState, true);
  },
});

export const toggleDetailModalSelector = selector({
  key: 'toggleDetailModalSelector',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenDetailModal = get(isOpenDetailModalState);

    if (isOpenDetailModal) set(isOpenDetailModalState, false);
    else set(isOpenDetailModalState, true);
  },
});

export const toggleTagPopupSelector = selector({
  key: 'handleToggleTagPopup',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenTagPopup = get(isOpenTagPopupState);

    if (isOpenTagPopup) set(isOpenTagPopupState, false);
    else set(isOpenTagPopupState, true);
  },
});

export const tabClickSelector = selector({
  key: 'handleTabClick',
  get: ({ get }) => {
    return get(clickedTabState);
  },
  set: ({ set }, newTab) => {
    set(clickedTabState, newTab);
  },
});

export const addTagSelector = selector({
  key: 'handleAddTag',
  get: () => {
    return '';
  },
  set: ({ get, set }, newTag) => {
    const tags = get(savedTagGroupState);

    if (newTag instanceof DefaultValue) {
      return newTag;
    } else {
      set(savedTagGroupState, [...tags, { id: uuid4(), name: newTag }]);
    }
  },
});

export const selectedDateSelector = selector({
  key: 'handleSelectedDate',
  get: () => {
    return new Date(); // void 피하기 -> get에 원형값 입력
  },
  set: ({ set }, newDate) => {
    // DefaultValue 임포트
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else set(selectedDateState, newDate);
  },
});

export const expenseListSelector = selector({
  key: 'handleExpenseList',
  get: () => {
    return '';
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      const expenseItemList = get(expenseListState);
      const clickedTagPopupIndex = get(clickedTagPopupIndexState);

      const result = expenseItemList.map((item) => {
        return item.id === clickedTagPopupIndex
          ? { ...item, tag: newValue }
          : item;
      });

      set(expenseListState, result);
    }
  },
});

export const transactionSelector = selector({
  key: 'handleTransaction',
  get: ({ get }) => {
    return {
      id: '',
      date: new Date(),
      title: '',
      items: get(expenseListState),
    };
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      set(transactionState, newValue);
    }
  },
});

export const addTransactionListSelector = selector({
  key: 'addTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const item = get(transactionState);
    const list = get(transactionListState);

    set(transactionListState, [...list, item]);
  },
});

export const deleteTransactionListSelector = selector({
  key: 'deleteTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const list = get(transactionListState);
    const index = get(clickedExpenseIndexState);

    const deletedList = list.filter(({ id }) => id !== index);

    set(transactionListState, deletedList);
  },
});
