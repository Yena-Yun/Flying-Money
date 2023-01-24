import { useRecoilValue, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { addDays } from 'date-fns';
import { CiCalendar } from 'react-icons/ci';
import { WeekCalendar } from 'components/WeekCalendar/WeekCalendar';
import { selectedDateState, isOpenCalendarState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const selectedDate = useRecoilValue(selectedDateState);

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
        <div className={styles.selectedDate}>{`${selectedDate.toLocaleString(
          'ko-KR',
          {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            weekday: 'long',
          }
        )}`}</div>
        -
        <div className={styles.selectedDate}>{`${addDays(
          selectedDate,
          6
        ).toLocaleString('ko-KR', {
          year: '2-digit',
          month: '2-digit',
          day: '2-digit',
          weekday: 'long',
        })}`}</div>
      </div>

      <div className={classnames(styles.inputGroup, styles.totalExpense)}>
        <h3 className={styles.subTitle}>총 지출</h3>
        <div className={styles.expense}>기간 내 지출 금액</div>
      </div>
    </div>
  );
};
