import { addDays } from 'date-fns';
import { selector, DefaultValue } from 'recoil';
import uuid4 from 'uuid4';
import * as A from './atom';

export const toggleModalSelector = selector({
  key: 'toggleModal',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenModal = get(A.isOpenAddModalState);
    const isOpenDetailModal = get(A.isOpenDetailModalState);
    const isOpenByDateDetailModal = get(A.isOpenByDateDetailModalState);

    if (flag === 'add' && isOpenModal) {
      set(A.isOpenAddModalState, false);
    } else if (flag === 'add' && !isOpenModal) {
      set(A.isOpenAddModalState, true);
    } else if (flag === 'detail' && isOpenDetailModal) {
      set(A.isOpenDetailModalState, false);
    } else if (flag === 'detail' && !isOpenDetailModal) {
      set(A.isOpenDetailModalState, true);
    } else if (flag === 'byDateDetail' && isOpenByDateDetailModal) {
      set(A.isOpenByDateDetailModalState, false);
    } else if (flag === 'byDateDetail' && !isOpenByDateDetailModal) {
      set(A.isOpenByDateDetailModalState, true);
    } else return;
  },
});

export const toggleToastSelector = selector({
  key: 'toggleToast',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenToast = get(A.isOpenToastState);

    if (isOpenToast) {
      set(A.isOpenToastState, false);
    } else {
      set(A.isOpenToastState, true);
    }
  },
});

export const toggleCalendarSelector = selector({
  key: 'toggleCalendar',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const isOpenCalendar = get(A.isOpenCalendarState);
    const isOpenByDateCalendar = get(A.isOpenByDateCalendarState);
    const isOpenByWeekCalendar = get(A.isOpenByWeekCalendarState);

    if (flag === 'add' && isOpenCalendar) {
      set(A.isOpenCalendarState, false);
    } else if (flag === 'add' && !isOpenCalendar) {
      set(A.isOpenCalendarState, true);
    } else if (flag === 'byDate' && isOpenByDateCalendar) {
      set(A.isOpenByDateCalendarState, false);
    } else if (flag === 'byDate' && !isOpenByDateCalendar) {
      set(A.isOpenByDateCalendarState, true);
    } else if (flag === 'byWeek' && isOpenByWeekCalendar) {
      set(A.isOpenByWeekCalendarState, false);
    } else if (flag === 'byWeek' && !isOpenByWeekCalendar) {
      set(A.isOpenByWeekCalendarState, true);
    } else return;
  },
});

export const selectedDateSelector = selector({
  key: 'handleSelectDate',
  get: () => {
    return new Date();
  },
  set: ({ set }, newDate) => {
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else {
      set(A.addModalDateState, newDate);
    }
  },
});

export const selectedMiniDateSelector = selector({
  key: 'handleMiniSelectDate',
  get: () => {
    return {
      flag: '',
      newDate: new Date(),
    };
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      return newValue;
    } else {
      if (newValue.flag === 'byDate') {
        set(A.byDateSelectedDateState, newValue.newDate);
      } else {
        set(A.byWeekStartDateState, newValue.newDate);
        set(A.byWeekEndDateState, addDays(newValue.newDate, 6));
      }
    }
  },
});

export const startDateSelector = selector({
  key: 'handleStartDate',
  get: () => {
    return new Date();
  },
  set: ({ set }, newDate) => {
    if (newDate instanceof DefaultValue) {
      return newDate;
    } else {
      set(A.byWeekStartDateState, newDate);
      set(A.byWeekEndDateState, addDays(newDate, 6));
    }
  },
});

export const toggleTagPopupSelector = selector({
  key: 'toggleTagPopup',
  get: () => {},
  set: ({ get, set }) => {
    const isOpenTagPopup = get(A.isOpenTagPopupState);

    if (isOpenTagPopup) {
      set(A.isOpenTagPopupState, false);
    } else {
      set(A.isOpenTagPopupState, true);
    }
  },
});

export const tabClickSelector = selector({
  key: 'handleTabClick',
  get: ({ get }) => {
    return get(A.clickedTabNameState);
  },
  set: ({ set }, newTab) => {
    set(A.clickedTabNameState, newTab);
  },
});

export const setItemToListSelector = selector({
  key: 'setItemToList',
  get: () => {},
  set: ({ get, set }) => {
    const item = get(A.itemState);
    const list = get(A.listState);

    set(A.listState, {
      ...list,
      items: item,
    });
  },
});

export const setListToTransactionSelector = selector({
  key: 'setListToTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const list = get(A.listState);
    const transaction = get(A.transactionState);

    set(A.transactionState, {
      ...transaction, // date
      id: uuid4(),
      lists: [...transaction.lists, { ...list, id: uuid4() }],
    });
  },
});

/* 하나의 날짜(transaction)에 같은 날짜로 항목이 추가될 경우 하나의 transaction에 몰아넣음 */
export const setTransactionListSelector = selector({
  key: 'setTransactionToTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const transaction = get(A.transactionState);
    const transactionList = get(A.transactionListState);

    const selectedTransaction = transactionList.find(
      (transactionListItem) => transactionListItem.id === transaction.id
    );

    const addedTransaction = !selectedTransaction
      ? transaction
      : {
          ...selectedTransaction,
          lists: [...selectedTransaction.lists, ...transaction.lists],
        };

    const filteredTransaction = transactionList.filter(
      (transactionListItem) => transactionListItem.id !== addedTransaction.id
    );

    set(A.transactionListState, [...filteredTransaction, addedTransaction]);
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
      const expenseItemList = get(A.itemState);
      const clickedTagPopupIndex = get(A.clickedTagPopupIndexState);

      const result = expenseItemList.map((item) => {
        return item.id === clickedTagPopupIndex
          ? { ...item, tag: newValue }
          : item;
      });

      set(A.itemState, result);
    }
  },
});

export const deleteItemSelector = selector({
  key: 'deleteItem',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(A.transactionListState);
    const index = get(A.clickedIndexState);
    const itemIndex = get(A.clickedItemIndexState);

    const deletedItem = transactionList
      .find(({ id }) => id === index)!
      .lists.filter(({ id }) => id === itemIndex)!;

    const deletedList = transactionList.map((transaction) => {
      if (transaction.id === index) {
        return { ...transaction, lists: deletedItem };
      } else {
        return transaction;
      }
    });

    set(A.transactionListState, deletedList);
  },
});

export const deleteTransactionSelector = selector({
  key: 'deleteTransaction',
  get: () => {},
  set: ({ get, set }) => {
    const transaction = get(A.transactionListState);
    const index = get(A.clickedIndexState);

    const deletedList = transaction.filter(({ id }) => id !== index);

    set(A.transactionListState, deletedList);
  },
});
