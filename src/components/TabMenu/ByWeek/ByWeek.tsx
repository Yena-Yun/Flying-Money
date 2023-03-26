import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AMain } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { Header } from './Header/Header';
import { formatMoney } from 'utils/hooks';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const weekTotal = useRecoilValue(AMain.totalPerWeekState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setToggleCalendar('byWeek')}
      ></div>
      <div className={styles.container}>
        <Header />

        <div className={styles.totalExpense}>
          <div className={styles.totalArea}>
            <h3 className={styles.subTitle}>Total</h3>
            <div className={styles.expense}>{formatMoney(weekTotal)}</div>
          </div>
          <button className={styles.actionButton}>상세</button>
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
              className={classNames(styles.actionButton, styles.editButton)}
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
