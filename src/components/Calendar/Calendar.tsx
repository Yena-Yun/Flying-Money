import { useRecoilState, useSetRecoilState } from 'recoil';
import { ADate } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { DateCells } from './DateCells/DateCells';
import { CalendarArrow } from 'components/Icons';
import { Const, DateFn } from 'utils';
import styles from './Calendar.module.scss';

export const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useRecoilState(
    ADate.addModalDateState
  );
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setToggleCalendar('add')}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.header}>
            <CalendarArrow
              direction='left'
              month={{ currentMonth, setCurrentMonth }}
            />
            <div className={styles.title}>
              {DateFn.format(currentMonth, 'yyyy')}년{' '}
              {DateFn.format(currentMonth, 'M')}월
            </div>
            <CalendarArrow
              direction='right'
              month={{ currentMonth, setCurrentMonth }}
            />
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
