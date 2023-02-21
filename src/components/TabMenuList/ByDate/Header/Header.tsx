import { useRecoilValue, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import {
  filterByDateSelectedDateState,
  isOpenByDateCalendarState,
  isOpenByDateDetailModalState,
  isOpenCalendarState,
  transactionListState,
} from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { formatDateWeekday } from 'hooks/formatDate';
import { CiCalendar } from 'react-icons/ci';
import styles from './Header.module.scss';

export const Header = () => {
  const isOpenCalender = useRecoilValue(isOpenByDateCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(filterByDateSelectedDateState);
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
      <div className={classnames(styles.inputGroup, styles.period)}>
        <div
          className={classnames(styles.dateIcon, styles.icon)}
          onClick={() => setToggleCalendar('byDate')}
        >
          <CiCalendar />
        </div>
        {isOpenCalender && <MiniCalendar tabName='byDate' />}
        <div className={styles.selectedDate}>
          {formatDateWeekday(selectedDate)}
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
