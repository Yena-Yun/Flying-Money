import { useState, ChangeEvent, MouseEvent } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AMain } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { Header } from './Header/Header';
import { formatMoney } from 'utils/hooks';
import styles from './ByWeek.module.scss';

export const ByWeek = () => {
  const [isOpenTextarea, setIsOpenTextarea] = useState(false);
  const [textareaInput, setTextareaInput] = useState('');
  const [weekDiary, setWeekDiary] = useState('');
  const weekTotal = useRecoilValue(AMain.totalPerWeekState);
  const setToggleCalendar = useSetRecoilState(SOpen.toggleCalendarSelector);

  const TEXTAREA_DEFAULT = '한 주 소감을 작성해보세요!';

  const handleEditText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaInput(e.currentTarget.value);
  };

  const submitEditText = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setWeekDiary(textareaInput);
    setTextareaInput('');
    setIsOpenTextarea((prev) => !prev);
  };

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
          {weekTotal !== 0 && (
            <button className={styles.actionButton}>상세</button>
          )}
        </div>

        <div className={styles.weekDiary}>
          <div className={styles.inputArea}>
            <h3 className={styles.subTitle}>한 주 소감</h3>
            {isOpenTextarea ? (
              <textarea
                className={styles.textarea}
                rows={8}
                cols={32}
                value={textareaInput}
                onChange={handleEditText}
                autoFocus
              >
                {textareaInput}
              </textarea>
            ) : (
              <p className={styles.editedText}>{weekDiary}</p>
            )}

            {!weekDiary && !isOpenTextarea && (
              <p className={styles.editedText}>{TEXTAREA_DEFAULT}</p>
            )}
          </div>

          <button
            className={classNames(styles.actionButton, styles.editButton)}
            onClick={submitEditText}
          >
            {!isOpenTextarea ? '수정' : '제출'}
          </button>
        </div>
      </div>
    </>
  );
};
