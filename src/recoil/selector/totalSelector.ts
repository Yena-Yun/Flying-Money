import { selector } from 'recoil';
import { DateFn } from '~/utils';
import { ADate, AIndex, AMain } from '../atom';

export const getTotalPerDateSelector = selector({
  key: 'getTotalPerDate',
  get: () => {
    return '';
  },
  set: ({ get, set }, flag) => {
    const transactionList = get(AMain.transactionListState);
    const allSelectedDate = get(ADate.allSelectedDateState);
    const byDateSelectedDate = get(ADate.byDateSelectedDateState);

    const filteredList = transactionList.filter(({ date }) =>
      flag === 'byAll'
        ? DateFn.isSameDay(date, allSelectedDate)
        : DateFn.isSameDay(date, byDateSelectedDate)
    );

    const total =
      filteredList.length > 0
        ? filteredList
            .flatMap(({ lists }) =>
              lists.flatMap(({ items }) => items.flatMap(({ price }) => price))
            )
            .reduce((acc, cur) => acc + cur, 0)
        : 0;

    flag === 'byAll'
      ? set(AMain.totalPerDateAllState, total)
      : set(AMain.totalPerDateByDateState, total);
  },
});

export const getTotalPerListInByDateSelector = selector({
  key: 'getTotalPerListInByDate',
  get: () => {},
  set: ({ get, set }) => {
    const transactionList = get(AMain.transactionListState);
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
