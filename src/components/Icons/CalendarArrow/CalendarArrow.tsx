import { SetterOrUpdater } from 'recoil';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Hook } from 'utils';
import styles from './CalendarArrow.module.scss';
import classNames from 'classnames';

type CalendarArrowType = {
  direction: string;
  month: {
    currentMonth: Date;
    setCurrentMonth: SetterOrUpdater<Date>;
  };
  separate?: boolean;
};

export const CalendarArrow = ({
  direction,
  month: { currentMonth, setCurrentMonth },
  separate,
}: CalendarArrowType) => {
  const arrowHandler = () => {
    Hook.changeMonth(direction === 'left' ? 'PREV' : 'NEXT', {
      currentMonth,
      setCurrentMonth,
    });
  };

  return (
    <div
      className={classNames(styles.arrow, separate && styles.separate)}
      onClick={arrowHandler}
    >
      {direction === 'left' ? <BsChevronLeft /> : <BsChevronRight />}
    </div>
  );
};
