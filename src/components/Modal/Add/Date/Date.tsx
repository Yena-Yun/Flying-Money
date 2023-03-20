import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ADate } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { CalendarIcon } from 'components/Icons';
import { Hook } from 'utils';
import styles from './Date.module.scss';

export const Date = () => {
  const selectedDate = useRecoilValue(ADate.addModalDateState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  return (
    <div className={styles.dateWrap}>
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
