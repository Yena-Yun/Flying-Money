import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AOpen, ADate } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';
import { weeksOfMonthState } from 'recoil/atom/dateState';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(AOpen.isOpenByWeekCalendarState);
  const selectedDate = useRecoilValue(ADate.byWeekStartDateState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  const [currentMonth, setCurrentMonth] = useRecoilState(
    ADate.byWeekStartDateState
  );

  const [weeksOfMonth, setWeeksOfMonth] = useRecoilState(weeksOfMonthState);

  const getWeeks = () => {
    const weeksNum = DateFn.getWeeksInMonth(new Date());
    const weeksArray = [...Array(weeksNum).keys()];

    return weeksArray.map((weekNum) => weekNum + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div
          className={styles.arrow}
          onClick={() =>
            Hook.changeMonth('PREV', { currentMonth, setCurrentMonth })
          }
        >
          <BsChevronLeft />
        </div>
        <div className={styles.title}>
          {DateFn.format(currentMonth, 'yyyy')}년{' '}
          {DateFn.format(currentMonth, 'M')}월
        </div>
        <div
          className={styles.arrow}
          onClick={() =>
            Hook.changeMonth('NEXT', { currentMonth, setCurrentMonth })
          }
        >
          <BsChevronRight />
        </div>
      </div>

      <div className={styles.weeksButtonWrap}>
        {getWeeks().map((week) => (
          <li className={styles.weekButton}>{week}주차</li>
        ))}
      </div>
    </div>
  );
};
