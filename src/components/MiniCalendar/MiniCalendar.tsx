import { useRecoilState, useSetRecoilState } from 'recoil';
import { ADate } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { DateCells } from './DateCells/DateCells';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DateFn, Const, Hook } from 'utils';
import styles from './MiniCalendar.module.scss';

export const MiniCalendar = () => {
  const [currentMonth, setCurrentMonth] = useRecoilState(
    ADate.byDateSelectedDateState
  );
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setToggleCalendar('byDate')}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
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
          <div className={styles.days}>
            {Const.DAYS.map((day, id) => (
              <div key={id}>{day}</div>
            ))}
          </div>

          <DateCells currentMonth={currentMonth} />
        </div>
      </div>
    </>
  );
};
