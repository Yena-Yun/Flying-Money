import { SetterOrUpdater } from 'recoil';
import classNames from 'classnames';
import { LeftArrowIcon, RightArrowIcon } from 'components/Icons';
import { Hook } from 'utils';
import styles from './CalendarArrow.module.scss';

interface CalendarArrowProp {
  direction: string;
  month: {
    currentMonth: Date;
    setCurrentMonth: SetterOrUpdater<Date>;
  };
  separate?: boolean;
}

export const CalendarArrow = ({
  direction,
  month: { currentMonth, setCurrentMonth },
  separate,
}: CalendarArrowProp) => {
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
      {direction === 'left' ? <LeftArrowIcon /> : <RightArrowIcon />}
    </div>
  );
};
