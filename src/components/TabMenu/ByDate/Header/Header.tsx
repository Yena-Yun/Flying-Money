import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, AOpen, ADate } from 'recoil/atom';
import { SOpen, SDate, STotal } from 'recoil/selector';
import { Calendar } from 'components/Calendar/Calendar';
import { CalendarIcon } from 'components/Icons';
import { Hook } from 'utils';
import styles from './Header.module.scss';

const ROLE = 'byDate';

export const Header = () => {
  const [isSelectSomeDate, setIsSelectSomeDate] = useState(true);
  const isOpenCalender = useRecoilValue(AOpen.isOpenByDateCalendarState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  const transactionList = useRecoilValue(AMain.transactionListState);
  const selectedDate = useRecoilValue(ADate.byDateSelectedDateState);
  const setSelectDate = useSetRecoilState(SDate.selectedByDateDateSelector);

  const dateTotalExpense = useRecoilValue(AMain.totalPerDateByDateState);
  const setDateTotalExpense = useSetRecoilState(STotal.getTotalPerDateSelector);

  useEffect(() => {
    setDateTotalExpense(ROLE);
  }, [selectedDate, transactionList]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {isOpenCalender && <Calendar tabName={ROLE} mini />}

        <div className={styles.period}>
          <CalendarIcon />
          <div
            className={styles.selectedDate}
            onClick={() => {
              setToggleCalendar(ROLE);
              setSelectDate(selectedDate);
              setDateTotalExpense(ROLE);
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
