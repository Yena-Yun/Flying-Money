import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import uuid4 from 'uuid4';
import {
  itemState,
  isOpenCalendarState,
  listState,
  transactionState,
} from 'recoil/atom';
import {
  addTransactionListSelector,
  addListToTransactionSelector,
  toggleModalSelector,
} from 'recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import { Date } from './Date/Date';
import { Title } from './Title/Title';
import { List } from './List/List';
import { Calendar } from 'components/Calendar/Calendar';
import { ItemType, TransactionType } from 'types/types';
import styles from './Add.module.scss';

export const Add = () => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);

  const expenseItemList = useRecoilValue<ItemType[]>(itemState);
  const resetExpenseItemList = useResetRecoilState(itemState);

  const [list, setList] = useRecoilState(listState);
  const setListToTransactionList = useSetRecoilState(
    addListToTransactionSelector
  );

  const [transaction, setTransaction] =
    useRecoilState<TransactionType>(transactionState);
  const setTransactionToTransactionList = useSetRecoilState(
    addTransactionListSelector
  );
  const resetTransaction = useResetRecoilState(transactionState);

  return (
    <ModalLayout modalRole='add'>
      {isOpenCalender && <Calendar />}
      <h2 className={styles.title}>항목 등록하기</h2>

      <div className={styles.mainContainer}>
        <Date />
        <Title />
        <List />
      </div>

      <div className={styles.submitButtonWrap}>
        <button
          className={styles.submitButton}
          onClick={() => {
            setList({
              ...list,
              items: expenseItemList,
            });

            setListToTransactionList();
            setTransactionToTransactionList();

            resetExpenseItemList();
            resetTransaction();

            setCloseModal('add');
          }}
        >
          등록
        </button>
      </div>
    </ModalLayout>
  );
};
