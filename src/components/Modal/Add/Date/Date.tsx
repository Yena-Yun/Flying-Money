import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalDateState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { formatDate } from 'utils/hooks/formatDate';
import styles from './Date.module.scss';

export const Date = () => {
  const selectedDate = useRecoilValue(addModalDateState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  return (
    <div className={styles.inputGroup}>
      <CalendarIcon />
      <div
        className={styles.selectedDate}
        onClick={() => setToggleCalendar('add')}
      >
        {formatDate(selectedDate)}
      </div>
    </div>
  );
};
