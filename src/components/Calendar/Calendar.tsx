import { useRecoilState, useSetRecoilState } from 'recoil';
import { format } from 'date-fns';
import { addModalDateState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { DateCells } from './DateCells/DateCells';
import { changeMonth } from 'utils/hooks/changeMonth';
import { DAYS } from 'utils/constants/constants';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styles from './Calendar.module.scss';

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useRecoilState(addModalDateState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setToggleCalendar('add')}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <div
              className={styles.arrow}
              onClick={() =>
                changeMonth('PREV', { currentMonth, setCurrentMonth })
              }
            >
              <BsChevronLeft />
            </div>
            <div className={styles.title}>
              {format(currentMonth, 'yyyy')}년 {format(currentMonth, 'M')}월
            </div>
            <div
              className={styles.arrow}
              onClick={() =>
                changeMonth('NEXT', { currentMonth, setCurrentMonth })
              }
            >
              <BsChevronRight />
            </div>
          </div>
          <div className={styles.days}>
            {DAYS.map((day, id) => (
              <div key={id}>{day}</div>
            ))}
          </div>
          <DateCells currentMonth={currentMonth} />
        </div>
      </div>
    </>
  );
};
