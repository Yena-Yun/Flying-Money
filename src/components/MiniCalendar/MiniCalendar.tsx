import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { format, addMonths, subMonths } from 'date-fns';
import { toggleCalendarSelector } from 'recoil/selector';
import { DateCells } from './DateCells/DateCells';
import { DAYS } from 'utils/constants/constants';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import styles from './MiniCalendar.module.scss';
import { byDateSelectedDateState, byWeekStartDateState } from 'recoil/atom';

type MiniCalendarType = {
  tabName: string;
};

export const MiniCalendar = ({ tabName }: MiniCalendarType) => {
  const [currentMonth, setCurrentMonth] = useRecoilState(
    tabName === 'byDate' ? byDateSelectedDateState : byWeekStartDateState
  );
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
          <DateCells currentMonth={currentMonth} tabName={tabName} />
        </div>
      </div>
    </>
  );
};
