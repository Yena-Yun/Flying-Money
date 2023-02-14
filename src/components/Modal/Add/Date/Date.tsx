import { useRecoilValue, useSetRecoilState } from 'recoil';
import { selectedDateState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { CiCalendar } from 'react-icons/ci';
import styles from './Date.module.scss';

export const Date = () => {
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(selectedDateState);

  return (
    <div className={styles.inputGroup}>
      <h3 className={styles.subTitle}>날짜</h3>
      <div className={styles.dateIcon} onClick={() => setToggleCalendar()}>
        <CiCalendar />
      </div>
      <div className={styles.selectedDate}>{`${selectedDate.toLocaleString(
        'ko-KR',
        {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          weekday: 'long',
        }
      )}`}</div>
    </div>
  );
};
