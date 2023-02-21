import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  addDays,
  endOfMonth,
  endOfWeek,
} from 'date-fns';
import classnames from 'classnames';
import {
  addModalSelectedDateState,
  filterByDateSelectedDateState,
  filterByWeekStartDateState,
  transactionState,
} from 'recoil/atom';
import {
  selectedDateSelector,
  selectedMiniDateSelector,
  toggleCalendarSelector,
} from 'recoil/selector';
import { TransactionType } from 'types/types';
import styles from './DateCells.module.scss';

type DateCellType = {
  currentMonth: Date;
  tabName: string;
};

export const DateCells = ({ currentMonth, tabName }: DateCellType) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(
    tabName === 'byDate'
      ? filterByDateSelectedDateState
      : filterByWeekStartDateState
  );
  const setSelectedDate = useSetRecoilState(selectedMiniDateSelector);

  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<TransactionType>(transactionState);

  const rows: JSX.Element[] = [];
  let dates: JSX.Element[] = [];
  let date = startDate;
  let formatDate = '';

  while (date <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = format(date, 'd');
      const cloneDay = date;

      dates.push(
        <div
          className={styles.date}
          key={date.toString()}
          onClick={() => {
            setSelectedDate(() => {
              return { flag: tabName, newDate: cloneDay };
            });
            setExpenseTransaction({
              ...expenseTransaction,
              date: cloneDay,
            });

            if (tabName === 'byDate') {
              setToggleCalendar('byDate');
            } else {
              setToggleCalendar('byWeek');
            }
          }}
        >
          <span
            className={
              !isSameMonth(date, monthStart)
                ? styles.disabled
                : isSameDay(date, currentMonth)
                ? styles.current
                : isSameDay(date, selectedDate)
                ? styles.selected
                : format(currentMonth, 'M') !== format(date, 'M')
                ? styles.notValid
                : styles.valid
            }
          >
            {formatDate}
          </span>
        </div>
      );

      date = addDays(date, 1);
    }

    rows.push(
      <div
        id={date.toString()}
        key={date.toString()}
        className={classnames(
          styles.week
          // selectedWeek === startOfWeek(date) && styles.selectedWeek
        )}
      >
        {dates}
      </div>
    );

    dates = [];
  }

  return <div className={styles.month}>{rows}</div>;
};
