import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import classnames from 'classnames';
import uuid4 from 'uuid4';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2';
import { CiCalendar } from 'react-icons/ci';
import {
  expenseListState,
  isOpenCalendarState,
  selectedDateState,
  transactionState,
} from 'recoil/atom';
import {
  closeModalSelector,
  toggleCalendarSelector,
  transactionListSelector,
} from 'recoil/selector';
import { Calendar } from 'components/Calendar/Calendar';
import { Item, Transaction } from 'types/types';
import styles from './Modal.module.scss';

export const ModalTest = () => {
  const setCloseModal = useSetRecoilState(closeModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const selectedDate = useRecoilValue(selectedDateState);
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);
  const [expenseItemList, setExpenseItemList] =
    useRecoilState<Item[]>(expenseListState);
  const [expenseTransaction, setExpenseTransaction] =
    useRecoilState<Transaction>(transactionState);
  const setTransactionList = useSetRecoilState(transactionListSelector);

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

              {/* '항목 추가' 클릭 시 추가되는 항목 */}
              {expenseItemList.length > 0 &&
                expenseItemList.map(({ id: index, name, price }) => (
                  <div
                    key={index}
                    className={classnames(
                      styles.inputItemGroup,
                      styles.addedInputItemGroup
                    )}
                  >
                    <div className={styles.inputItem}>
                      <input
                        placeholder='항목명'
                        onChange={(e) => {
                          setExpenseItemList(
                            expenseItemList.map((item) =>
                              item.id === index
                                ? { ...item, name: e.target.value }
                                : item
                            )
                          );
                        }}
                      />
                    </div>
                    <div className={styles.inputItem}>
                      <input
                        type='number'
                        placeholder='가격'
                        onChange={(e) => {
                          setExpenseItemList(
                            expenseItemList.map((item) =>
                              item.id === index
                                ? { ...item, price: parseInt(e.target.value) }
                                : item
                            )
                          );
                        }}
                      />
                    </div>
                    <div
                      className={classnames(
                        styles.removeItemButton,
                        styles.icon
                      )}
                      onClick={() => {
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
                  setExpenseItemList([
                    ...expenseItemList,
                    { id: uuid4(), name: '', price: 0 },
                  ]);
                }}
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
              onClick={() => {
                setCloseModal();
                // resetExpenseItem();
                setExpenseTransaction({
                  ...expenseTransaction,
                  id: uuid4(),
                  items: expenseItemList,
                });
                setTransactionList();
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
