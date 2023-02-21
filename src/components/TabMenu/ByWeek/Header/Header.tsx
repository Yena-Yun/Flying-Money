import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { addDays } from 'date-fns';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { byWeekStartDateState, isOpenByWeekCalendarState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { formatDateWeekday } from 'utils/hooks/formatDate';
import styles from './Header.module.scss';

export const Header = () => {
  const isOpenCalender = useRecoilValue(isOpenByWeekCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(byWeekStartDateState);
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);

  return (
    <div className={classnames(styles.inputGroup, styles.period)}>
      {isOpenCalender && <MiniCalendar tabName='byWeek' />}

      <div className={styles.period}>
        <CalendarIcon />
        <div
          className={classnames(styles.startDate, styles.selectedDate)}
          onClick={() => {
            setToggleCalendar('byWeek');
            setIsSelectSomeDate(false);
          }}
        >
          {formatDateWeekday(selectedDate)}
        </div>
        -
        <div className={styles.selectedDate}>
          {formatDateWeekday(addDays(selectedDate, 6))}
        </div>
      </div>
      <div className={styles.header}>
        {isSelectSomeDate && <p>시작 날짜를 선택하세요.</p>}
      </div>
    </div>
  );
};
