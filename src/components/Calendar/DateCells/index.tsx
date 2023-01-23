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
import styles from './index.module.scss';

interface DateCellProps {
  currentMonth: Date;
  selectedDate: Date;
  onDateClick: (prev: Date) => void;
  mini?: boolean;
}

export const RenderDateCells = ({
  currentMonth,
  selectedDate,
  onDateClick,
  mini,
}: DateCellProps) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

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
          className={`${styles.date} ${mini && styles.mini}`}
          key={date.toString()}
          onClick={() => onDateClick(cloneDay)}
        >
          <span
            className={`${
              !isSameMonth(date, monthStart)
                ? styles.disabled
                : isSameDay(date, currentMonth)
                ? styles.current
                : isSameDay(date, selectedDate)
                ? styles.selected
                : format(currentMonth, 'M') !== format(date, 'M')
                ? styles.notValid
                : styles.valid
            } ${mini && styles.mini}`}
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
