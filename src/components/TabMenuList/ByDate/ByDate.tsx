import { useRecoilValue, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { CiCalendar } from 'react-icons/ci';
import {
  selectedDateState,
  isOpenCalendarState,
  transactionListState,
} from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { WeekCalendar } from 'components/WeekCalendar/WeekCalendar';
import styles from './ByDate.module.scss';

export const ByDate = () => {
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(selectedDateState);
  const transactionList = useRecoilValue(transactionListState);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={classnames(styles.inputGroup, styles.period)}>
          <div
            className={classnames(styles.dateIcon, styles.icon)}
            onClick={() => setToggleCalendar()}
          >
            <CiCalendar />
          </div>
          {isOpenCalender && <WeekCalendar />}
          <div className={styles.selectedDate}>{`${selectedDate.toLocaleString(
            'ko-KR',
            {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              weekday: 'long',
            }
          )}`}</div>
        </div>
        <div className={classnames(styles.inputGroup, styles.totalExpense)}>
          <div className={styles.expense}>
            총{' '}
            {transactionList
              .filter(({ date }) =>
                selectedDate.toString().includes(date.toString())
              )
              .flatMap(({ lists }) =>
                lists.flatMap(({ items }) => items.map(({ price }) => price))
              )
              .reduce((acc, cur) => acc + cur, 0)}
            원
          </div>
        </div>
      </div>
      <div className={styles.filteredList}>
        {transactionList
          .filter(
            ({ date }) =>
              selectedDate.toString().slice(0, 15) ===
              date.toString().slice(0, 15)
          )
          .map(({ id, lists }) =>
            lists.map(({ title, items }) => (
              <li key={id} className={styles.expenseItem}>
                <div className={styles.info}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.name}>
                    {items[0].name !== '' && '•'} {items[0].name}
                    {items.length > 1 && ` 외 +${items.length - 1}`}
                  </div>
                </div>
                <div className={styles.price}>
                  {items
                    .map(({ price }) => price)
                    .reduce((acc, cur) => acc + cur)}
                </div>
              </li>
            ))
          )}
      </div>
    </div>
  );
};
