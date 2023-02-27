import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Open, Date } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(Open.isOpenByWeekCalendarState);
  const selectedDate = useRecoilValue(Date.byWeekStartDateState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

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
