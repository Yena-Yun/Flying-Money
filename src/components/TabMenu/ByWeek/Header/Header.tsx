import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Open, Date } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(Open.isOpenByWeekCalendarState);
  const selectedDate = useRecoilValue(Date.byWeekStartDateState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  const [currentMonth, setCurrentMonth] = useRecoilState(
    Date.byWeekStartDateState
  );

  return (
    <div className={styles.container}>
      {/* {isOpenCalender && <MiniCalendar tabName='byWeek' />}
       */}

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

      <div className={styles.period}>
        <CalendarIcon />
        <div
          className={styles.startDate}
          onClick={() => {
            setToggleCalendar('byWeek');
            setIsSelectSomeDate(false);
          }}
        >
          {Hook.formatDate(selectedDate)}
        </div>
        -
        <div className={styles.endDate}>
          {Hook.formatDate(DateFn.addDays(selectedDate, 6))}
        </div>
      </div>

      {isSelectSomeDate && (
        <p className={styles.guide}>주차를 선택하세요 (월요일만 선택 가능)</p>
      )}
    </div>
  );
};
