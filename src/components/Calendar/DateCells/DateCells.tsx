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
import { selectedDateState, transactionState } from 'recoil/atom';
import styles from './DateCells.module.scss';
import {
  setSelectedDateSelector,
  toggleCalendarSelector,
} from 'recoil/selector';
import { Transaction } from 'types/types';

interface DateCellProps {
  currentMonth: Date;
}

export const RenderDateCells = ({ currentMonth }: DateCellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const selectedDate = useRecoilValue(selectedDateState);
  const setSelectedDate = useSetRecoilState(setSelectedDateSelector);
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<Transaction>(transactionState);
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
      <div key={date.toString()} className={styles.week}>
        {dates}
      </div>
    );

    dates = [];
  }

  return <div className={styles.month}>{rows}</div>;
};
