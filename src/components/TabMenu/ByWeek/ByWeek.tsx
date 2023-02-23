import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addDays, isWithinInterval, subDays } from 'date-fns';
import {
  byWeekEndDateState,
  byWeekStartDateState,
  transactionListState,
} from 'recoil/atom';
import {
  selectedMiniDateSelector,
  toggleCalendarSelector,
} from 'recoil/selector';
import { Header } from './Header/Header';
import { formatMoney } from 'utils/hooks/formatMoney';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const startDate = useRecoilValue(byWeekStartDateState);
  const endDate = useRecoilValue(byWeekEndDateState);
  const setSelectDate = useSetRecoilState(selectedMiniDateSelector);
  const transactionList = useRecoilValue(transactionListState);

  const filterPriceByWeek = () => {
    return transactionList
      .filter(({ date }) =>
        isWithinInterval(date, {
          start: subDays(startDate, 1),
          end: addDays(endDate, 1),
        })
      )
      .flatMap(({ lists }) =>
        lists.flatMap(({ items }) => items.map(({ price }) => price))
      );
  };

  return (
    <>
      <div
        className={styles.background}
        onClick={() => {
          setToggleCalendar('byWeek');
          setSelectDate({ flag: 'byWeek', newDate: startDate });
        }}
      ></div>
      <div className={styles.container}>
        <Header />

        <div className={styles.totalExpense}>
          <div className={styles.info}>
            <h3 className={styles.subTitle}>총 지출</h3>
            <div className={styles.expense}>
              {formatMoney(
                filterPriceByWeek().reduce((acc, cur) => acc + cur, 0)
              )}
            </div>
          </div>
          <button className={styles.detailButton}>상세</button>
        </div>
        <div className={styles.weekDiary}>
          <div className={styles.inputArea}>
            <h3 className={styles.subTitle}>한 주 소감</h3>
            {isOpenTextarea ? (
              <textarea
                className={styles.textarea}
                rows={8}
                cols={32}
                onBlur={() => setIsOpenTextarea(false)}
                autoFocus
              >
                이번 주는 무지출 데이가 많았다
              </textarea>
            ) : (
              <p>이번 주는 무지출 데이가 많았다</p>
            )}
          </div>

          {!isOpenTextarea && (
            <button
              className={styles.editButton}
              onClick={() => setIsOpenTextarea(true)}
            >
              수정
            </button>
          )}
        </div>
      </div>
    </>
  );
};
