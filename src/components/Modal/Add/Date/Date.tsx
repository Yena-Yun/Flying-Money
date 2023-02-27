import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Date } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { Hook } from 'utils';
import styles from './Date.module.scss';

export const AddModalDate = () => {
  const selectedDate = useRecoilValue(Date.addModalDateState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  return (
    <div className={styles.inputGroup}>
      <CalendarIcon />
      <div
        className={styles.selectedDate}
        onClick={() => setToggleCalendar('add')}
      >
        {Hook.formatDate(selectedDate)}
      </div>
    </div>
  );
};
