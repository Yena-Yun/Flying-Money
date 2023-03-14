import { CiCalendar } from 'react-icons/ci';
import styles from './Calendar.module.scss';

export const CalendarIcon = () => {
  return (
    <div className={styles.calendar}>
      <CiCalendar />
    </div>
  );
};
