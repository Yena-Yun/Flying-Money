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
import { addModalSelectedDateState, transactionState } from 'recoil/atom';
import { selectedDateSelector, toggleCalendarSelector } from 'recoil/selector';
import { TransactionType } from 'types/types';
import styles from './WeekDateCells.module.scss';
import classnames from 'classnames';
import { useState } from 'react';

interface DateCellProps {
  currentMonth: Date;
}

export const RenderDateCells = ({ currentMonth }: DateCellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const [selectedWeek, setSelectedWeek] = useState(new Date());

  const selectedDate = useRecoilValue(addModalSelectedDateState);
  const setSelectedDate = useSetRecoilState(selectedDateSelector);
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<TransactionType>(transactionState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

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
            setSelectedDate(() => cloneDay);
            setExpenseTransaction({
              ...expenseTransaction,
              date: cloneDay,
            });
            setToggleCalendar();
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
          styles.week,
          selectedWeek === startOfWeek(date) && styles.selectedWeek
        )}
        onClick={(e) =>
          setSelectedWeek(startOfWeek(parseInt(e.currentTarget.id)))
        }
      >
        {dates}
      </div>
    );

    dates = [];
  }

  return <div className={styles.month}>{rows}</div>;
};
