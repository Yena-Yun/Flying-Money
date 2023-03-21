import { isSameDay } from 'date-fns';
import { selector, DefaultValue } from 'recoil';
import uuid4 from 'uuid4';
import { AMain, ADate, AIndex } from 'recoil/atom';
import { DateFn, Hook } from 'utils';
import { saveToLocalStorage } from '~/utils/hooks/localStorage';

export const setItemToListSelector = selector({
  key: 'setItemToList',
  get: () => {},
  set: ({ get, set }) => {
    const list = get(AMain.listState);
    const modalTitle = get(AMain.addModalTitleState);
    const modalList = get(AMain.addModalListState);

    set(AMain.listState, {
      ...list,
      title: modalTitle,
      items: modalList,
    });
  },
});

export const setListToTransactionSelector = selector({
  key: 'setListToTransactionList',
  get: () => {},
  set: ({ get, set }) => {
    const list = get(AMain.listState);
    const transaction = get(AMain.transactionState);

    set(AMain.transactionState, {
      ...transaction,
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
    const transaction = get(AMain.transactionState);
    const transactionList = get(AMain.transactionListState);

    const selectedTransaction = transactionList.find(({ date }) =>
      isSameDay(date, transaction.date)
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

    /* 최종 데이터를 로컬스토리지에 저장 (이후 total 등의 연산에 쓰임) */
    const finalTransaction = [...filteredTransaction, addedTransaction];

    saveToLocalStorage('transactionList', finalTransaction);
    set(AMain.transactionListState, finalTransaction);

    /* 날짜 형태를 변경한 데이터는 따로 저장 (for 렌더링) */
    const formatDateTransaction = finalTransaction.map((transaction) => ({
      ...transaction,
      date: Hook.formatDate(transaction.date),
    }));

    saveToLocalStorage('formatDateList', formatDateTransaction);

    set(AMain.transactionListState, finalTransaction);
  },
});

export const getDefaultTransactionSelector = selector({
  key: 'getDefaultTransactionFromLocalStorage',
  get: () => {},
  set: ({ set }) => {
    const transactionList = Hook.getFromLocalStorage('transactionList');
    const formatDateList = Hook.getFromLocalStorage('formatDateList');

    transactionList ? set(AMain.transactionListState, transactionList) : [];
    formatDateList
      ? set(AMain.defaultTransactionListState, formatDateList)
      : [];
  },
});

export const setCurrentDateToAddModalSelector = selector({
  key: 'setCurrentDateToAddModal',
  get: () => {},
  set: ({ get, set }) => {
    const selectedDate = get(ADate.addModalDateState);
    const transaction = get(AMain.transactionState);

    const transactionWithCurrentDate = {
      ...transaction,
      date: selectedDate,
    };

    set(AMain.transactionState, transactionWithCurrentDate);
  },
});

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
      const expenseItemList = get(AMain.itemState);
      const clickedTagPopupIndex = get(AIndex.clickedTagPopupIndexState);

      const result = expenseItemList.map((item) => {
        return item.id === clickedTagPopupIndex
          ? { ...item, tag: newTag }
          : item;
      });

      set(AMain.itemState, result);
    }
  },
});

export const getTotalPerDateSelector = selector({
  key: 'getTotalPerDate',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const transactionList = get(AMain.defaultTransactionListState);
    const allSelectedDate = get(ADate.allSelectedDateState);
    const byDateSelectedDate = get(ADate.byDateSelectedDateState);

    const filteredList = transactionList.filter(({ date }) =>
      flag === 'all' ? date === allSelectedDate : date === byDateSelectedDate
    );

    const total =
      filteredList.length > 0
        ? filteredList
            .flatMap(({ lists }) =>
              lists.flatMap(({ items }) => items.flatMap(({ price }) => price))
            )
            .reduce((acc, cur) => acc + cur, 0)
        : 0;

    flag === 'all'
      ? set(AMain.totalPerDateAllState, total)
      : set(AMain.totalPerDateByDateState, total);
  },
});

export const getTotalPerListInByDateSelector = selector({
  key: 'getTotalPerListInByDate',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.defaultTransactionListState);
    const byDateSelectedDate = get(ADate.byDateSelectedDateState);
    const clickedListIndex = get(AIndex.clickedListIndexState);

    const filteredList = transactionList.filter(
      ({ date }) => date === byDateSelectedDate
    );

    const total =
      filteredList.length > 0
        ? filteredList
            .flatMap(({ lists }) =>
              lists.filter(({ id }) => id === clickedListIndex)
            )
            .flatMap(({ items }) => items.flatMap(({ price }) => price))
            .reduce((acc, cur) => acc + cur, 0)
        : 0;

    set(AMain.totalPerListState, total);
  },
});

export const getTotalPerMonthSelector = selector({
  key: 'getTotalPerMonth',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
    const startDate = get(ADate.byWeekStartDateState);

    const filteredList = transactionList.filter(({ date }) =>
      DateFn.isSameMonth(date, startDate)
    );

    const monthTotal =
      filteredList.length > 0
        ? filteredList
            .flatMap(({ lists }) =>
              lists.flatMap(({ items }) => items.flatMap(({ price }) => price))
            )
            .reduce((acc, cur) => acc + cur, 0)
        : 0;

    set(AMain.totalPerMonthState, monthTotal);
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

export const deleteListSelector = selector({
  key: 'deleteList',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
    const index = get(AIndex.clickedTransactionIndexState);
    const listIndex = get(AIndex.clickedListIndexState);

    const filteredList = transactionList.find(({ id }) => id === index) || null;

    const deletedList = filteredList
      ? filteredList.lists.filter(({ id }) => id !== listIndex)
      : [];

    if (deletedList.length > 0) {
      const deletedTransaction = transactionList.map((transaction) => {
        if (transaction.id === index) {
          return { ...transaction, lists: deletedList };
        } else {
          return transaction;
        }
      });

      set(AMain.transactionListState, deletedTransaction);
    } else {
      const deletedTransaction = transactionList.filter(
        ({ id }) => id !== index
      );

      set(AMain.transactionListState, deletedTransaction);
    }
  },
});

export const deleteTransactionSelector = selector({
  key: 'deleteTransaction',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
    const index = get(AIndex.clickedTransactionIndexState);

    const deletedList = transactionList?.filter(({ id }) => id !== index);

    set(AMain.transactionListState, deletedList);
  },
});
