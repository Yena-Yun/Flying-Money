import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AMain, ADate, AIndex } from 'recoil/atom';
import { SMain } from 'recoil/selector';
import { CalendarHeader } from 'components/Calendar/Header/CalendarHeader';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [currentMonth, setCurrentMonth] = useRecoilState(
    ADate.byWeekStartDateState
  );
  const monthTotal = useRecoilValue(AMain.totalPerMonthState);
  const setMonthTotalExpense = useSetRecoilState(
    SMain.getTotalPerMonthSelector
  );
  const [clickedButtonIndex, setClickedButtonIndex] = useRecoilState(
    AIndex.weekButtonIndexState
  );
  // const setWeekTotal = useSetRecoilState(SMain.getTotalPerWeekSelector);
  // const setStartEndDate = useSetRecoilState(SDate.selectedStartEndDateSelector);

  useEffect(() => {
    //   setStartEndDate(currentMonth);
    setMonthTotalExpense();
  }, [currentMonth]);

  const getWeeks = () => {
    const weekNumber = DateFn.getWeeksInMonth(currentMonth);
    const weeksArray = [...Array(weekNumber).keys()];
    return weeksArray.map((weekNum) => weekNum + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CalendarHeader month={{ currentMonth, setCurrentMonth }} separate />
        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(monthTotal)}
        </div>
      </div>

      <div className={styles.weeksButtonWrap}>
        {getWeeks().map((weekNum, id) => (
          <li
            key={id}
            id={String(id)}
            className={classNames(
              styles.weekButton,
              clickedButtonIndex === id && styles.clicked
            )}
            onClick={(e) => {
              setClickedButtonIndex(Number(e.currentTarget.id));
              // setWeekTotal();
            }}
          >
            {weekNum}주차
          </li>
        ))}
      </div>
    </div>
  );
};
