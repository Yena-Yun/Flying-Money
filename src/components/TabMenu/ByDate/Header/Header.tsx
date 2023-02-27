import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Main, Open, Date } from 'recoil/atom';
import { SOpen, SDate } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(Open.isOpenByDateCalendarState);
  const selectedDate = useRecoilValue(Date.byDateSelectedDateState);
  const transactionList = useRecoilValue(Main.transactionListState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const setSelectDate = useSetRecoilState(SDate.selectedMiniDateSelector);

  const filterPriceByDate = () => {
    return transactionList
      .filter(({ date }) => DateFn.isSameDay(date, selectedDate))
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
            {Hook.formatDate(selectedDate)}
          </div>
        </div>

        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(
            filterPriceByDate().reduce((acc, cur) => acc + cur, 0)
          )}
        </div>
      </div>
      {isSelectSomeDate && <p className={styles.guide}>날짜를 선택하세요</p>}
    </div>
  );
};
