import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isSameDay } from 'date-fns';
import {
  byDateSelectedDateState,
  isOpenByDateCalendarState,
  transactionListState,
} from 'recoil/atom';
import {
  selectedMiniDateSelector,
  toggleCalendarSelector,
} from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { formatDate } from 'utils/hooks/formatDate';
import { formatMoney } from 'utils/hooks/formatMoney';
import styles from './Header.module.scss';

export const Header = () => {
  const isOpenCalender = useRecoilValue(isOpenByDateCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(byDateSelectedDateState);
  const setSelectDate = useSetRecoilState(selectedMiniDateSelector);
  const transactionList = useRecoilValue(transactionListState);
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);

  const filterPriceByDate = () => {
    return transactionList
      .filter(({ date }) => isSameDay(date, selectedDate))
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.map(({ price }) => price))
      );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isOpenCalender && <MiniCalendar tabName='byDate' />}

        <div className={styles.period}>
          <CalendarIcon />
          <div
            className={styles.selectedDate}
            onClick={() => {
              setToggleCalendar('byDate');
              setSelectDate({ flag: 'byDate', newDate: selectedDate });
              setIsSelectSomeDate(false);
            }}
          >
            {formatDate(selectedDate)}
          </div>
        </div>

        <div className={styles.totalExpense}>
          {formatMoney(filterPriceByDate().reduce((acc, cur) => acc + cur, 0))}
        </div>
      </div>
      {isSelectSomeDate && (
        <p className={styles.guide}>확인할 날짜를 선택하세요</p>
      )}
    </div>
  );
};
