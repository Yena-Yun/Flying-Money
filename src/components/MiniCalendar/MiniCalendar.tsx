import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { DateCells } from './DateCells/DateCells';
import { DAYS } from 'utils/constants/constants';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styles from './WeekCalendar.module.scss';
import { toggleCalendarSelector } from 'recoil/selector';
import { useSetRecoilState } from 'recoil';

export const MiniCalendar = ({ tabName }: { tabName: string }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  const changeMonth = (moveTo: string) => {
    if (moveTo === 'PREV') setCurrentMonth(subMonths(currentMonth, 1));
    else setCurrentMonth(addMonths(currentMonth, 1));
  };

  return (
    <>
      <div
        className={styles.background}
        onClick={() =>
          setToggleCalendar(tabName === 'byDate' ? 'byDate' : 'byWeek')
        }
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <div
              className={`${styles.prev} ${styles.arrow}`}
              onClick={() => changeMonth('PREV')}
            >
              <BsChevronLeft />
            </div>
            <div className={styles.title}>
              {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
            </div>
            <div
              className={`${styles.next} ${styles.arrow}`}
              onClick={() => changeMonth('NEXT')}
            >
              <BsChevronRight />
            </div>
          </div>
          <div className={styles.days}>
            {DAYS.map((day, id) => (
              <div key={id} className={styles.day}>
                {day}
              </div>
            ))}
          </div>
          <DateCells currentMonth={currentMonth} />
        </div>
      </div>
    </>
  );
};
