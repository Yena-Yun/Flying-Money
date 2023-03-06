import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, AOpen, ADate } from 'recoil/atom';
import { SMain, SOpen, SDate } from 'recoil/selector';
import { Calendar } from 'components/Calendar/Calendar';
import { CalendarIcon } from 'components/Icons';
import { Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(AOpen.isOpenByDateCalendarState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  const selectedDate = useRecoilValue(ADate.byDateSelectedDateState);
  const setSelectDate = useSetRecoilState(SDate.selectedByDateDateSelector);
  const transactionList = useRecoilValue(AMain.transactionListState);

  const dateTotalExpense = useRecoilValue(AMain.totalPerDateByDateState);
  const setDateTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);

  useEffect(() => {
    setDateTotalExpense('byDate');
  }, [selectedDate, transactionList]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isOpenCalender && <Calendar tabName='byDate' mini />}

        <div className={styles.period}>
          <CalendarIcon />
          <div
            className={styles.selectedDate}
            onClick={() => {
              setToggleCalendar('byDate');
              setSelectDate(selectedDate);
              setDateTotalExpense('byDate');
              setIsSelectSomeDate(false);
            }}
          >
            {Hook.formatDate(selectedDate)}
          </div>
        </div>

        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(dateTotalExpense)}
        </div>
      </div>
      {isSelectSomeDate && <p className={styles.guide}>날짜를 선택하세요</p>}
    </div>
  );
};
