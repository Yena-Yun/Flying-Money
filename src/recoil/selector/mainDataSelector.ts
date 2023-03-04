import { isSameDay } from 'date-fns';
import { selector, DefaultValue } from 'recoil';
import uuid4 from 'uuid4';
import * as AMain from '../atom/mainDataState';
import {
  byDateSelectedDateState,
  allSelectedDateState,
} from '../atom/dateState';
import {
  clickedTagPopupIndexState,
  clickedIndexState,
  clickedItemIndexState,
} from '../atom/clickedIndexState';
import { DateFn } from 'utils';
import { ADate, AIndex } from 'recoil/atom';

export const setItemToListSelector = selector({
  key: 'setItemToList',
  get: () => {},
  set: ({ get, set }) => {
    const item = get(AMain.itemState);
    const list = get(AMain.listState);

    set(AMain.listState, {
      ...list,
      items: item,
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

    set(AMain.transactionListState, [...filteredTransaction, addedTransaction]);
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
      const expenseItemList = get(AMain.itemState);
      const clickedTagPopupIndex = get(clickedTagPopupIndexState);

      const result = expenseItemList.map((item) => {
        return item.id === clickedTagPopupIndex
          ? { ...item, tag: newValue }
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
    const transactionList = get(AMain.transactionListState);
    const byDateSelectedDate = get(byDateSelectedDateState);
    const allSelectedDate = get(allSelectedDateState);

    const total = transactionList
      .filter(({ date }) =>
        DateFn.isSameDay(
          date,
          flag === 'byDate' ? byDateSelectedDate : allSelectedDate
        )
      )
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.flatMap(({ price }) => price))
      )
      .reduce((acc, cur) => acc + cur, 0);

    if (flag === 'all') {
      set(AMain.totalPerDateAllState, total);
    } else {
      set(AMain.totalPerDateState, total);
    }
  },
});

export const getTotalPerDateAllSelector = selector({
  key: 'getTotalPerDateAll',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
    const byDateSelectedDate = get(byDateSelectedDateState);

    const total = transactionList
      .filter(({ lists }) => lists.length > 0)
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.flatMap(({ price }) => price))
      )
      .reduce((acc, cur) => acc + cur, 0);

    // console.log(total);

    set(AMain.totalPerDateAllState, total);
  },
});

export const getTotalPerWeekSelector = selector({
  key: 'getTotalPerWeek',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
    const startDate = get(ADate.byWeekStartDateState);
    const endDate = get(ADate.byWeekEndDateState);

    const currentMonth = get(ADate.byWeekStartDateState);
    const clickedButtonIndex = get(AIndex.weekButtonIndexState);

    console.log(clickedButtonIndex);

    // console.log(startDate);
    // console.log(endDate);

    const selectedMonth = transactionList.filter(({ date }) =>
      DateFn.isSameMonth(date, startDate)
    );

    const weekTotal = selectedMonth
      .filter(({ date }) =>
        DateFn.isWithinInterval(date, {
          start: DateFn.subDays(startDate, 1),
          end: DateFn.addDays(endDate, 1),
        })
      )
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.map(({ price }) => price))
      )
      .reduce((acc, cur) => acc + cur, 0);

    console.log(weekTotal);

    set(AMain.totalPerWeekState, weekTotal);
  },
});

export const getTotalPerMonthSelector = selector({
  key: 'getTotalPerMonth',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
    const startDate = get(ADate.byWeekStartDateState);

    const selectedMonth = transactionList.filter(({ date }) =>
      DateFn.isSameMonth(date, startDate)
    );

    const monthTotal = selectedMonth
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.flatMap(({ price }) => price))
      )
      .reduce((acc, cur) => acc + cur, 0);

    set(AMain.totalPerMonthState, monthTotal);
  },
});

export const deleteItemSelector = selector({
  key: 'deleteItem',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
    const index = get(clickedIndexState);
    const itemIndex = get(clickedItemIndexState);

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

    set(AMain.transactionListState, deletedList);
  },
});

export const deleteTransactionSelector = selector({
  key: 'deleteTransaction',
  get: () => {},
  set: ({ get, set }) => {
    const transaction = get(AMain.transactionListState);
    const index = get(clickedIndexState);

    const deletedList = transaction.filter(({ id }) => id !== index);

    set(AMain.transactionListState, deletedList);
  },
});
