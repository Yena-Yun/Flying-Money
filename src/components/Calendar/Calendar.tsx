import { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RenderDateCells } from './DateCells/DateCells';
import { DAYS } from 'utils/constants/constants';
import styles from './Calendar.module.scss';
import { closeModalSelector, toggleCalendarSelector } from 'recoil/selector';
import { isOpenCalendarState } from 'recoil/atom';

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const setCloseModal = useSetRecoilState(closeModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const setOpenCalendar = useSetRecoilState(toggleCalendarSelector);

  const changeMonth = (moveTo: string) => {
    if (moveTo === 'PREV') setCurrentMonth(subMonths(currentMonth, 1));
    else setCurrentMonth(addMonths(currentMonth, 1));
  };

  const onDateClick = (day: Date) => {
    setSelectedDate(day);
  };

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setOpenCalendar()}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <div
              className={`${styles.prev} ${styles.arrow}`}
              onClick={() => changeMonth('PREV')}
            >
              <img src='svg/calendar/prev_arrow.svg' alt='previous-arrow' />
            </div>
            <div className={styles.title}>
              {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
            </div>
            <div
              className={`${styles.next} ${styles.arrow}`}
              onClick={() => changeMonth('NEXT')}
            >
              <img src='svg/calendar/next_arrow.svg' alt='next-arrow' />
            </div>
          </div>
          <div className={styles.days}>
            {DAYS.map((day, id) => (
              <div key={id} className={styles.day}>
                {day}
              </div>
            ))}
          </div>
          <RenderDateCells
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={onDateClick}
          />
        </div>
      </div>
    </>
  );
};
