import { useRecoilValue, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { addDays } from 'date-fns';
import { CiCalendar } from 'react-icons/ci';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import {
  filterByWeekStartDateState,
  isOpenByWeekCalendarState,
} from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { formatDateWeekday } from 'hooks/formatDate';
import styles from './Header.module.scss';

export const Header = () => {
  const isOpenCalender = useRecoilValue(isOpenByWeekCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(filterByWeekStartDateState);

  return (
    <div className={classnames(styles.inputGroup, styles.period)}>
      <h3 className={styles.subTitle}>기간</h3>
      {isOpenCalender && <MiniCalendar tabName='byWeek' />}
      <div
        className={classnames(styles.dateIcon, styles.icon)}
        onClick={() => setToggleCalendar('byWeek')}
      >
        <CiCalendar />
      </div>
      <div className={styles.selectedDate}>
        {formatDateWeekday(selectedDate)}
      </div>
      -
      <div className={styles.selectedDate}>
        {formatDateWeekday(addDays(selectedDate, 6))}
      </div>
    </div>
  );
};
