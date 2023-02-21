import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalSelectedDateState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { formatDateWeekday } from 'hooks/formatDate';
import styles from './Date.module.scss';

export const Date = () => {
  const selectedDate = useRecoilValue(addModalSelectedDateState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  return (
    <div className={styles.inputGroup}>
      <CalendarIcon />
      <div
        className={styles.selectedDate}
        onClick={() => setToggleCalendar('add')}
      >
        {formatDateWeekday(selectedDate)}
      </div>
    </div>
  );
};
