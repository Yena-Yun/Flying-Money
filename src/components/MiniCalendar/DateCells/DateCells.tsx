import { useRecoilState, useSetRecoilState } from 'recoil';
import { DateFn } from 'utils';
import { Main } from 'recoil/atom';
import { SDate, SOpen } from 'recoil/selector';
import * as T from 'types';
import styles from './DateCells.module.scss';

export const DateCells = ({ currentMonth, tabName }: T.DateCellType) => {
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<T.TransactionType>(Main.transactionState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const setSelectedDate = useSetRecoilState(SDate.selectedMiniDateSelector);

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
            if (tabName === 'byWeek' && !DateFn.isMonday(cloneDay)) {
              return;
            } else {
              setSelectedDate(() => ({ flag: tabName, newDate: cloneDay }));

              setExpenseTransaction({
                ...expenseTransaction,
                date: cloneDay,
              });

              if (tabName === 'byDate') {
                setToggleCalendar('byDate');
              } else {
                setToggleCalendar('byWeek');
              }
            }
          }}
        >
          <span
            className={
              !DateFn.isSameMonth(date, monthStart)
                ? styles.disabled
                : DateFn.isSameDay(date, currentMonth)
                ? styles.current
                : tabName === 'byWeek' && !DateFn.isMonday(date)
                ? styles.disabled
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
      <div id={date.toString()} key={date.toString()} className={styles.week}>
        {dates}
      </div>
    );

    dates = [];
  }

  return <div className={styles.month}>{rows}</div>;
};
