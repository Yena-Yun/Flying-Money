import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { format, addMonths, subMonths } from 'date-fns';
import { toggleCalendarSelector } from 'recoil/selector';
import { RenderDateCells } from './DateCells/DateCells';
import { DAYS } from 'utils/constants/constants';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styles from './Calendar.module.scss';

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  const changeMonth = (moveTo: string) => {
    if (moveTo === 'PREV') {
      setCurrentMonth(subMonths(currentMonth, 1));
    } else {
      setCurrentMonth(addMonths(currentMonth, 1));
    }
  };

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setToggleCalendar()}
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
          <RenderDateCells currentMonth={currentMonth} />
        </div>
      </div>
    </>
  );
};
