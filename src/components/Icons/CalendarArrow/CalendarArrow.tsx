import { SetterOrUpdater } from 'recoil';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Hook } from 'utils';
import styles from './CalendarArrow.module.scss';

type CalendarArrowType = {
  direction: string;
  month: {
    currentMonth: Date;
    setCurrentMonth: SetterOrUpdater<Date>;
  };
};

export const CalendarArrow = ({
  direction,
  month: { currentMonth, setCurrentMonth },
}: CalendarArrowType) => {
  return (
    <div
      className={styles.arrow}
      onClick={() =>
        Hook.changeMonth(direction === 'left' ? 'PREV' : 'NEXT', {
          currentMonth,
          setCurrentMonth,
        })
      }
    >
      {direction === 'left' ? <BsChevronLeft /> : <BsChevronRight />}
    </div>
  );
};
