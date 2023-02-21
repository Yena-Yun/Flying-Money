import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalSelectedDateState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { formatDate } from 'hooks/formatDate';
import { CiCalendar } from 'react-icons/ci';
import styles from './Date.module.scss';

export const Date = () => {
  const selectedDate = useRecoilValue(addModalSelectedDateState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  return (
    <div className={styles.inputGroup}>
      <h3 className={styles.subTitle}>날짜</h3>
      <div className={styles.dateIcon} onClick={() => setToggleCalendar('add')}>
        <CiCalendar />
      </div>
      <div className={styles.selectedDate}>{formatDate(selectedDate)}</div>
    </div>
  );
};
