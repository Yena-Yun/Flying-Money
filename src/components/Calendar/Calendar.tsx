import { useRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ADate } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { CalendarHeader } from './Header/CalendarHeader';
import { DateCells } from './DateCells/DateCells';
import { Const } from 'utils';
import styles from './Calendar.module.scss';

interface CalendarProp {
  mini?: boolean;
  tabName: string;
}

export const Calendar = ({ mini, tabName }: CalendarProp) => {
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const [currentMonth, setCurrentMonth] = useRecoilState(
    tabName === 'byDate'
      ? ADate.byDateSelectedDateState
      : ADate.addModalDateState
  );

  return (
    <>
      <div
        className={classNames(styles.background, mini && styles.mini)}
        onClick={() => setToggleCalendar(tabName === 'add' ? 'add' : 'byDate')}
      ></div>

      <div className={classNames(styles.container, mini && styles.mini)}>
        <div className={classNames(styles.innerContainer, mini && styles.mini)}>
          <CalendarHeader
            month={{ currentMonth, setCurrentMonth }}
            mini={mini}
          />

          <div className={classNames(styles.days, mini && styles.mini)}>
            {Const.DAYS.map((day, id) => (
              <div key={id}>{day}</div>
            ))}
          </div>

          <DateCells currentMonth={currentMonth} tabName={tabName} />
        </div>
      </div>
    </>
  );
};
