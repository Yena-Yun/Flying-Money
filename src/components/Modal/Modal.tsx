import { useState } from 'react';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { closeModalSelector, toggleCalendarSelector } from 'recoil/selector';
import { Calendar } from 'components/Calendar/Calendar';
import { CiCalendar } from 'react-icons/ci';
import styles from './Modal.module.scss';
import { isOpenCalendarState } from 'recoil/atom';
import classnames from 'classnames';

export const ModalTest = () => {
  const setCloseModal = useSetRecoilState(closeModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const setOpenCalendar = useSetRecoilState(toggleCalendarSelector);
  const [voteItemCount, setVoteItemCount] = useState(0);

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => setCloseModal()}
      ></div>

      <div className={styles.popupSection}>
        <div className={styles.popup}>
          {isOpenCalender ? <Calendar /> : null}
          <h2 className={styles.title}>항목 등록하기</h2>

          <div className={styles.mainContainer}>
            <div className={styles.inputGroup}>
              <div className={styles.date}>
                <h3 className={styles.subTitle}>날짜</h3>
                <div
                  className={classnames(styles.dateIcon, styles.icon)}
                  onClick={() => setOpenCalendar()}
                >
                  <CiCalendar />
                </div>
              </div>
            </div>

            <div className={styles.inputGroup}>
              <h3 className={styles.subTitle}>제목</h3>
              <div className={styles.inputItem}>
                <input placeholder='제목을 입력해주세요.' />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <h3 className={styles.subTitle}>항목</h3>

              {/* 기존에 초기값으로 1개 있는 항목 */}
              <div className={styles.inputItemGroup}>
                <div className={styles.inputItem}>
                  <input placeholder='항목명' />
                </div>
                <div className={styles.inputItem}>
                  <input type='number' placeholder='가격' />
                </div>
              </div>
              {/* '항목 추가' 클릭 시 추가되는 항목 */}
              {voteItemCount > 0 &&
                [...Array(voteItemCount).keys()].map((voteItem, id) => (
                  <div
                    key={id}
                    className={classnames(
                      styles.inputItemGroup,
                      styles.addedInputItemGroup
                    )}
                  >
                    <div className={styles.inputItem}>
                      <input placeholder='항목명' />
                    </div>
                    <div className={styles.inputItem}>
                      <input type='number' placeholder='가격' />
                    </div>
                    <div
                      className={classnames(
                        styles.removeItemButton,
                        styles.icon
                      )}
                      onClick={() => setVoteItemCount((prev) => prev - 1)}
                    >
                      <HiOutlineMinusCircle />
                    </div>
                  </div>
                ))}
              <div
                className={styles.addItemButton}
                onClick={() => setVoteItemCount((prev) => prev + 1)}
              >
                <div className={classnames(styles.addIcon, styles.icon)}>
                  <HiOutlinePlusCircle />
                </div>
                <div className={styles.addItemText}>항목 추가</div>
              </div>
            </div>
          </div>

          <div className={styles.submitButtonContainer}>
            <button
              className={styles.submitButton}
              onClick={() => setCloseModal()}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
