import { useState } from 'react';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2';
import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import {
  closeModalSelector,
  toggleCalendarSelector,
  expenseItemSelector,
} from 'recoil/selector';
import { Calendar } from 'components/Calendar/Calendar';
import { CiCalendar } from 'react-icons/ci';
import styles from './Modal.module.scss';
import {
  expenseItemState,
  isOpenCalendarState,
  selectedDateState,
  transactionState,
} from 'recoil/atom';
import classnames from 'classnames';
import { Item, Transaction } from 'types/types';
import uuid4 from 'uuid4';

export const ModalTest = () => {
  const setCloseModal = useSetRecoilState(closeModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const selectedDate = useRecoilValue(selectedDateState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const [expenseItem, setExpenseItem] = useRecoilState<Item>(expenseItemState);
  const resetExpenseItem = useResetRecoilState(expenseItemState);
  // const [expenseItemList, setExpenseItemList] = useState<Item[]>([expenseItem]);
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<Transaction>(transactionState);

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => setCloseModal()}
      ></div>

      <div className={styles.popupSection}>
        <div className={styles.popup}>
          {isOpenCalender && <Calendar />}
          <h2 className={styles.title}>항목 등록하기</h2>

          <div className={styles.mainContainer}>
            <div className={classnames(styles.inputGroup, styles.date)}>
              <h3 className={styles.subTitle}>날짜</h3>
              <div
                className={classnames(styles.dateIcon, styles.icon)}
                onClick={() => setToggleCalendar()}
              >
                <CiCalendar />
              </div>
              <div
                className={styles.selectedDate}
              >{`${selectedDate.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                weekday: 'long',
              })}`}</div>
            </div>

            <div className={styles.inputGroup}>
              <h3 className={styles.subTitle}>제목</h3>
              <div className={styles.inputItem}>
                <input
                  id='title'
                  placeholder='제목을 입력해주세요.'
                  onChange={(e) =>
                    setExpenseTransaction({
                      ...expenseTransaction,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <h3 className={styles.subTitle}>항목</h3>

              {/* 기존에 초기값으로 1개 있는 항목 */}
              <div className={styles.inputItemGroup}>
                <div className={styles.inputItem}>
                  <input
                    placeholder='항목명'
                    onChange={(e) => {
                      setExpenseItem({ ...expenseItem, name: e.target.value });
                    }}
                  />
                </div>
                <div className={styles.inputItem}>
                  <input
                    type='number'
                    placeholder='가격'
                    onChange={(e) =>
                      setExpenseItem({
                        ...expenseItem,
                        price: parseInt(e.target.value),
                      })
                    }
                  />
                </div>
              </div>
              {/* '항목 추가' 클릭 시 추가되는 항목 */}
              {/* {expenseItemList.length > 1 &&
                expenseItemList.map(({ id: index, name, price, tag }) => (
                  <div
                    key={index}
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
                      onClick={() => {
                        setItemCount((prev) => prev - 1);
                        setExpenseItemList(
                          expenseItemList.filter(({ id }) => id !== index)
                        );
                      }}
                    >
                      <HiOutlineMinusCircle />
                    </div>
                  </div>
                ))}
              <div
                className={styles.addItemButton}
                onClick={() => {
                  setItemCount((prev) => prev + 1);
                  setExpenseItemList([
                    ...expenseItemList,
                    { id: uuid4(), name: '', price: 0, tag: '' },
                  ]);
                }}
              >
                <div className={classnames(styles.addIcon, styles.icon)}>
                  <HiOutlinePlusCircle />
                </div>
                <div className={styles.addItemText}>항목 추가</div>
              </div> */}
            </div>
          </div>

          <div className={styles.submitButtonContainer}>
            <button
              className={styles.submitButton}
              onClick={() => {
                setCloseModal();
                resetExpenseItem();
                setExpenseTransaction({
                  ...expenseTransaction,
                  items: expenseItem,
                });
              }}
            >
              등록
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
