import classnames from 'classnames';
import { Calendar } from 'components/Calendar/Calendar';
import { WeekCalendar } from 'components/WeekCalendar/WeekCalendar';
import {
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  addDays,
  endOfMonth,
  endOfWeek,
  getWeeksInMonth,
  daysToWeeks,
  weeksToDays,
} from 'date-fns';
import { useState } from 'react';
import { CiCalendar } from 'react-icons/ci';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { selectedDateState, isOpenCalendarState } from 'recoil/atom';
import { toggleCalendarSelector } from 'recoil/selector';
import { MONTHS } from 'utils/constants/constants';
import { TabMenu } from '../Layout/TabMenu';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const start = startOfWeek(new Date(), {
    weekStartsOn: 1,
  });
  const [selectedMonth, setSelectedMonth] = useState('');
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const dayOfWeek = weeksToDays(parseInt(selectedMonth.split('월')[0]));
  const result = getWeeksInMonth(new Date(2023, 4, 1), { weekStartsOn: 1 });
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
