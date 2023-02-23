import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addDays } from 'date-fns';
import { byWeekStartDateState, isOpenByWeekCalendarState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { formatDate } from 'utils/hooks/formatDate';
import styles from './Header.module.scss';

export const Header = () => {
  const isOpenCalender = useRecoilValue(isOpenByWeekCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(byWeekStartDateState);
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);

  return (
    <div className={styles.header}>
      {isOpenCalender && <MiniCalendar tabName='byWeek' />}

      <div className={styles.period}>
        <CalendarIcon />
        <div
          className={styles.startDate}
          onClick={() => {
            setToggleCalendar('byWeek');
            setIsSelectSomeDate(false);
          }}
        >
          {formatDate(selectedDate)}
        </div>
        -
        <div className={styles.endDate}>
          {formatDate(addDays(selectedDate, 6))}
        </div>
      </div>

      {isSelectSomeDate && (
        <p className={styles.guide}>주차를 선택하세요 (월요일만 선택 가능)</p>
      )}
    </div>
  );
};
