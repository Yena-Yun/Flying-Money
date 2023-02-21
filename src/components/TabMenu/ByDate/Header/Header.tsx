import { useRecoilValue, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import {
  byDateSelectedDateState,
  isOpenByDateCalendarState,
  transactionListState,
} from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { formatDate } from 'utils/hooks/formatDate';
import { CiCalendar } from 'react-icons/ci';
import styles from './Header.module.scss';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';

export const Header = () => {
  const isOpenCalender = useRecoilValue(isOpenByDateCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(byDateSelectedDateState);
  const transactionList = useRecoilValue(transactionListState);

  const filterPriceOnDate = () => {
    return transactionList
      .filter(({ date }) => selectedDate.toString().includes(date.toString()))
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.map(({ price }) => price))
      );
  };

  return (
    <div className={styles.header}>
      {isOpenCalender && <MiniCalendar tabName='byDate' />}

      <div className={classnames(styles.inputGroup, styles.period)}>
        <CalendarIcon />
        <div
          className={styles.selectedDate}
          onClick={() => setToggleCalendar('byDate')}
        >
          {formatDate(selectedDate)}
        </div>
      </div>
      <div className={classnames(styles.inputGroup, styles.totalExpense)}>
        <div className={styles.expense}>
          총 {filterPriceOnDate().reduce((acc, cur) => acc + cur, 0)}원
        </div>
      </div>
    </div>
  );
};
