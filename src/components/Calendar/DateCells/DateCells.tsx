import { useRecoilState, useSetRecoilState } from 'recoil';
import * as F from 'date-fns';
import { transactionState } from 'recoil/atom';
import { selectedDateSelector, toggleCalendarSelector } from 'recoil/selector';
import { DateCellType, TransactionType } from 'types/types';
import styles from './DateCells.module.scss';

export const DateCells = ({
  currentMonth,
}: Pick<DateCellType, 'currentMonth'>) => {
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const setSelectedDate = useSetRecoilState(selectedDateSelector);
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<TransactionType>(transactionState);

  const monthStart = F.startOfMonth(currentMonth);
  const monthEnd = F.endOfMonth(currentMonth);
  const startDate = F.startOfWeek(monthStart);
  const endDate = F.endOfWeek(monthEnd);

  const rows: JSX.Element[] = [];
  let dates: JSX.Element[] = [];
  let date = startDate;
  let formatDate = '';

  while (date <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = F.format(date, 'd');
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

            setToggleCalendar('add');
          }}
        >
          <span
            className={
              !F.isSameMonth(date, monthStart)
                ? styles.disabled
                : F.isSameDay(date, currentMonth)
                ? styles.current
                : ''
            }
          >
            {formatDate}
          </span>
        </div>
      );

      date = F.addDays(date, 1);
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
