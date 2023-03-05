import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AMain, ADate, AIndex } from 'recoil/atom';
import { SDate, SMain } from 'recoil/selector';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [clickedButtonIndex, setClickedButtonIndex] = useRecoilState(
    AIndex.weekButtonIndexState
  );
  // const setWeekTotal = useSetRecoilState(SMain.getTotalPerWeekSelector);
  const [currentMonth, setCurrentMonth] = useRecoilState(
    ADate.byWeekStartDateState
  );
  const monthTotal = useRecoilValue(AMain.totalPerMonthState);
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerMonthSelector);
  // const setStartEndDate = useSetRecoilState(SDate.selectedStartEndDateSelector);

  // useEffect(() => {
  //   setStartEndDate(currentMonth);
  //   setTotalExpense();
  // }, [currentMonth]);

  const getWeeks = () => {
    const weekNumber = DateFn.getWeeksInMonth(currentMonth);
    const weeksArray = [...Array(weekNumber).keys()];
    return weeksArray.map((weekNum) => weekNum + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.dateTotalGroup}>
        <div className={styles.date}>
          <div
            className={styles.arrow}
            onClick={() =>
              Hook.changeMonth('PREV', { currentMonth, setCurrentMonth })
            }
          >
            <BsChevronLeft />
          </div>
          <div className={styles.title}>
            {DateFn.format(currentMonth, 'yyyy')}년{' '}
            {DateFn.format(currentMonth, 'M')}월
          </div>
          <div
            className={styles.arrow}
            onClick={() =>
              Hook.changeMonth('NEXT', { currentMonth, setCurrentMonth })
            }
          >
            <BsChevronRight />
          </div>
        </div>
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
