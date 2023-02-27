import { isSameDay } from 'date-fns';
import { selector, DefaultValue } from 'recoil';
import uuid4 from 'uuid4';
import * as A from '../atom/mainDataState';
import * as I from '../atom/clickedIndexState';

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
      const clickedTagPopupIndex = get(I.clickedTagPopupIndexState);

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
    const index = get(I.clickedIndexState);
    const itemIndex = get(I.clickedItemIndexState);

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
    const index = get(I.clickedIndexState);

    const deletedList = transaction.filter(({ id }) => id !== index);

    set(A.transactionListState, deletedList);
  },
});
