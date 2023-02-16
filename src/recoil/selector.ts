import { selector, DefaultValue } from 'recoil';
import {
  clickedTabState,
  itemState,
  isOpenCalendarState,
  isOpenTagPopupState,
  selectedDateState,
  transactionListState,
  transactionState,
  clickedTagPopupIndexState,
  isOpenDetailModalState,
  clickedExpenseIndexState,
  listState,
  isOpenAddModalState,
} from './atom';
import uuid4 from 'uuid4';

export const toggleModalSelector = selector({
  key: 'toggleModal',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenModal = get(isOpenAddModalState);
    const isOpenDetailModal = get(isOpenDetailModalState);

    if (flag === 'add' && isOpenModal) {
      set(isOpenAddModalState, false);
    } else if (flag === 'add' && !isOpenModal) {
      set(isOpenAddModalState, true);
    } else if (flag === 'detail' && isOpenDetailModal) {
      set(isOpenDetailModalState, false);
    } else {
      set(isOpenDetailModalState, true);
    }
  },
});

export const toggleCalendarSelector = selector({
  key: 'toggleCalendar',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenCalendar = get(isOpenCalendarState);

    if (isOpenCalendar) {
      set(isOpenCalendarState, false);
    } else {
      set(isOpenCalendarState, true);
    }
  },
});

export const selectedDateSelector = selector({
  key: 'handleSelectDate',
  get: () => {
    return new Date(); // void 에러 피하기 -> get에 default값 입력
  },
  set: ({ set }, newDate) => {
    // DefaultValue 임포트
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else set(selectedDateState, newDate);
  },
});

export const toggleTagPopupSelector = selector({
  key: 'toggleTagPopup',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenTagPopup = get(isOpenTagPopupState);

    if (isOpenTagPopup) {
      set(isOpenTagPopupState, false);
    } else {
      set(isOpenTagPopupState, true);
    }
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

export const addTagToItemSelector = selector({
  key: 'addTagToItem',
  get: () => {
    return '';
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      const expenseItemList = get(itemState);
      const clickedTagPopupIndex = get(clickedTagPopupIndexState);

      const result = expenseItemList.map((item) => {
        return item.id === clickedTagPopupIndex
          ? { ...item, tag: newValue }
          : item;
      });

      set(itemState, result);
    }
  },
});

export const addListToTransactionSelector = selector({
  key: 'addListToTransaction',
  get: () => {},
  set: ({ get, set }) => {
    const list = get(listState);
    const transaction = get(transactionState);

    set(transactionState, {
      ...transaction,
      id: uuid4(),
      lists: [...transaction.lists, list],
    });
  },
});

/* 하나의 날짜(transaction)에 같은 날짜로 항목이 추가될 경우 하나의 transaction에 몰아넣음 */
export const addTransactionListSelector = selector({
  key: 'addTransactionToTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const transaction = get(transactionState);
    const transactionList = get(transactionListState);

    const result = transactionList.find(
      (transactionListItem) =>
        transactionListItem.date.toString().slice(0, 15) ===
        transaction.date.toString().slice(0, 15)
    );

    const addedTransaction =
      result !== undefined
        ? { ...result, id: uuid4(), lists: transaction.lists }
        : transaction;

    set(transactionListState, [...transactionList, addedTransaction]);
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
