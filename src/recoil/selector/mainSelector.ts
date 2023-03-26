import { selector } from 'recoil';
import uuid4 from 'uuid4';
import { AMain, AIndex } from 'recoil/atom';
import { DateFn } from 'utils';

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
      DateFn.isSameDay(date, transaction.date)
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

    set(AMain.transactionListState, finalTransaction);
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
