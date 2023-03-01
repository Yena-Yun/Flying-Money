import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, ADate } from 'recoil/atom';
import { SOpen, SDate } from 'recoil/selector';
import { Header } from './Header/Header';
import { DateFn, Hook } from 'utils';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const startDate = useRecoilValue(ADate.byWeekStartDateState);
  const endDate = useRecoilValue(ADate.byWeekEndDateState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const setSelectDate = useSetRecoilState(SDate.selectedMiniDateSelector);

  const filterPriceByWeek = () => {
    return transactionList
      .filter(({ date }) =>
        DateFn.isWithinInterval(date, {
          start: DateFn.subDays(startDate, 1),
          end: DateFn.addDays(endDate, 1),
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
          <div className={styles.totalArea}>
            <h3 className={styles.subTitle}>Total</h3>
            <div className={styles.expense}>
              {Hook.formatMoney(
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
                onChange={() => {}}
                onBlur={() => setIsOpenTextarea(false)}
                autoFocus
              >
                이번 주는 무지출 데이가 많았다
              </textarea>
            ) : (
              <p className={styles.editedText}>
                이번 주는 무지출 데이가 많았다
              </p>
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
