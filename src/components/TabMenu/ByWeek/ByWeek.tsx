import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, ADate } from 'recoil/atom';
import { SOpen, SDate } from 'recoil/selector';
import { Header } from './Header/Header';
import { Hook } from 'utils';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const startDate = useRecoilValue(ADate.byWeekStartDateState);
  const weekTotal = useRecoilValue(AMain.totalPerWeekState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);
  const setSelectDate = useSetRecoilState(SDate.selectedMiniDateSelector);

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
            <div className={styles.expense}>{Hook.formatMoney(weekTotal)}</div>
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
