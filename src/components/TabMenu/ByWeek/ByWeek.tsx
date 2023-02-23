import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { toggleCalendarSelector } from 'recoil/selector';
import { Header } from './Header/Header';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setToggleCalendar('byWeek')}
      ></div>
      <div className={styles.container}>
        <Header />

        <div className={styles.totalExpense}>
          <div className={styles.info}>
            <h3 className={styles.subTitle}>총 지출</h3>
            <div className={styles.expense}>기간 내 지출 금액</div>
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
