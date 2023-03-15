import { SetterOrUpdater } from 'recoil';
import classNames from 'classnames';
import { CalendarArrow } from 'components/Icons';
import { DateFn } from 'utils';
import styles from './CalendarHeader.module.scss';

interface CalendarHeaderProp {
  month: {
    currentMonth: Date;
    setCurrentMonth: SetterOrUpdater<Date>;
  };
  mini?: boolean;
  separate?: boolean;
}

export const CalendarHeader = ({
  month: { currentMonth, setCurrentMonth },
  mini,
  separate,
}: CalendarHeaderProp) => {
  return (
    <div
      className={classNames(
        styles.header,
        mini && styles.mini,
        separate && styles.separate
      )}
    >
      <CalendarArrow
        direction='left'
        month={{ currentMonth, setCurrentMonth }}
        separate={separate}
      />

      <div
        className={classNames(
          styles.title,
          mini && styles.mini,
          separate && styles.separate
        )}
      >
        {DateFn.format(currentMonth, 'yyyy')}년{' '}
        {DateFn.format(currentMonth, 'M')}월
      </div>

      <CalendarArrow
        direction='right'
        month={{ currentMonth, setCurrentMonth }}
        separate={separate}
      />
    </div>
  );
};
