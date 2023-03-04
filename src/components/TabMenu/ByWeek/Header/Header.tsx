import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AMain, ADate } from 'recoil/atom';
import { SMain } from 'recoil/selector';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { DateFn, Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  const [currentMonth, setCurrentMonth] = useRecoilState(
    ADate.byWeekStartDateState
  );
  const [isClickedButtonIndex, setIsClickedButtonIndex] = useState(0);

  const setTotalExpense = useSetRecoilState(SMain.getTotalPerMonthSelector);
  const totalExpense = useRecoilValue(AMain.totalPerMonthState);
  const startDate = useRecoilValue(ADate.byWeekStartDateState);
  const transactionList = useRecoilValue(AMain.transactionListState);

  /* 주차별 total 보여주기 (전역으로 관리) */
  const [weeksOfMonth, setWeeksOfMonth] = useRecoilState(
    ADate.weeksOfMonthState
  );

  const getWeeks = () => {
    const weekNumber = DateFn.getWeeksInMonth(currentMonth);
    const weeksArray = [...Array(weekNumber).keys()];
    return weeksArray.map((weekNum) => weekNum + 1);
  };

  const filterPriceByMonth = () => {
    return transactionList
      .filter(({ date }) => DateFn.isSameMonth(date, startDate))
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.map(({ price }) => price))
      );
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
        <div className={styles.monthTotal}>
          Total:{' '}
          <span>{filterPriceByMonth().reduce((acc, cur) => acc + cur, 0)}</span>
        </div>
      </div>

      <div className={styles.weeksButtonWrap}>
        {getWeeks().map((week, id) => (
          <li
            key={id}
            id={String(id)}
            className={classNames(
              styles.weekButton,
              isClickedButtonIndex === id && styles.clicked
            )}
            onClick={(e) => {
              setIsClickedButtonIndex(Number(e.currentTarget.id));
            }}
          >
            {week}주차
          </li>
        ))}
      </div>
    </div>
  );
};
