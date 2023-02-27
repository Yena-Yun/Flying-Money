import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Main, Open, Date } from 'recoil/atom';
import { SMain, SOpen, SDate } from 'recoil/selector';
import { MiniCalendar } from 'components/MiniCalendar/MiniCalendar';
import { CalendarIcon } from 'components/Icons/Calendar/Calendar';
import { Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(Open.isOpenByDateCalendarState);
  const selectedDate = useRecoilValue(Date.byDateSelectedDateState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const setSelectDate = useSetRecoilState(SDate.selectedMiniDateSelector);
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);
  const totalExpense = useRecoilValue(Main.totalPerDateState);

  useEffect(() => {
    setTotalExpense('byDate');
  }, [selectedDate]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isOpenCalender && <MiniCalendar tabName='byDate' />}

        <div className={styles.period}>
          <CalendarIcon />
          <div
            className={styles.selectedDate}
            onClick={() => {
              setToggleCalendar('byDate');
              setSelectDate({ flag: 'byDate', newDate: selectedDate });
              setTotalExpense('byDate');
              setIsSelectSomeDate(false);
            }}
          >
            {Hook.formatDate(selectedDate)}
          </div>
        </div>

        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(totalExpense)}
        </div>
      </div>
      {isSelectSomeDate && <p className={styles.guide}>날짜를 선택하세요</p>}
    </div>
  );
};
