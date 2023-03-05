import { useRecoilState, useSetRecoilState } from 'recoil';
import { AMain } from 'recoil/atom';
import { SOpen, SDate } from 'recoil/selector';
import { DateFn } from 'utils';
import { TMain } from 'types';
import styles from './DateCells.module.scss';

type DateCellType = {
  currentMonth: Date;
};

export const DateCells = ({ currentMonth }: DateCellType) => {
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const setSelectedDate = useSetRecoilState(SDate.selectedDateSelector);
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<TMain.TransactionType>(AMain.transactionState);
  const setStartEndDate = useSetRecoilState(SDate.selectedStartEndDateSelector);

  const monthStart = DateFn.startOfMonth(currentMonth);
  const monthEnd = DateFn.endOfMonth(currentMonth);
  const startDate = DateFn.startOfWeek(monthStart);
  const endDate = DateFn.endOfWeek(monthEnd);

  const rows: JSX.Element[] = [];
  let dates: JSX.Element[] = [];
  let date = startDate;
  let formatDate = '';

  while (date <= endDate) {
    for (let i = 0; i < 7; i++) {
      formatDate = DateFn.format(date, 'd');
      const cloneDay = date;

      dates.push(
        <div
          className={styles.date}
          key={date.toString()}
          onClick={() => {
            setSelectedDate(() => cloneDay);
            setStartEndDate(() => cloneDay);
            setExpenseTransaction({
              ...expenseTransaction,
              date: cloneDay,
            });
            setToggleCalendar('add');
          }}
        >
          <span
            className={
              !DateFn.isSameMonth(date, monthStart)
                ? styles.disabled
                : DateFn.isSameDay(date, currentMonth)
                ? styles.current
                : DateFn.isSameDay(date, new Date())
                ? styles.today
                : ''
            }
          >
            {formatDate}
          </span>
        </div>
      );

      date = DateFn.addDays(date, 1);
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
