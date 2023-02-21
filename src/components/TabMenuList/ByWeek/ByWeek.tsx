import { useRecoilValue, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { addDays } from 'date-fns';
import { CiCalendar } from 'react-icons/ci';
import { WeekCalendar } from 'components/WeekCalendar/WeekCalendar';
import { filterByWeekStartDateState, isOpenCalendarState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { formatDateWeekday } from 'hooks/formatDate';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(filterByWeekStartDateState);

  return (
    <div className={styles.container}>
      <div className={classnames(styles.inputGroup, styles.period)}>
        <h3 className={styles.subTitle}>기간</h3>
        <div
          className={classnames(styles.dateIcon, styles.icon)}
          onClick={() => setToggleCalendar()}
        >
          <CiCalendar />
        </div>
        {isOpenCalender && <WeekCalendar />}
        <div className={styles.selectedDate}>
          {formatDateWeekday(selectedDate)}
        </div>
        -
        <div className={styles.selectedDate}>
          {formatDateWeekday(addDays(selectedDate, 6))}
        </div>
      </div>

      <div className={classnames(styles.inputGroup, styles.totalExpense)}>
        <h3 className={styles.subTitle}>총 지출</h3>
        <div className={styles.expense}>기간 내 지출 금액</div>
      </div>
    </div>
  );
};
