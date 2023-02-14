import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import uuid4 from 'uuid4';
import {
  expenseListState,
  isOpenCalendarState,
  listState,
  transactionState,
} from 'recoil/atom';
import {
  addTransactionListSelector,
  addListSelector,
  toggleAddModalSelector,
} from 'recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import { Date } from './Date/Date';
import { Title } from './Title/Title';
import { List } from './List/List';
import { Calendar } from 'components/Calendar/Calendar';
import { ItemType, TransactionType } from 'types/types';
import styles from './Add.module.scss';

export const Add = () => {
  const setCloseModal = useSetRecoilState(toggleAddModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);

  const expenseItemList = useRecoilValue<ItemType[]>(expenseListState);
  const resetExpenseItemList = useResetRecoilState(expenseListState);

  const [list, setList] = useRecoilState(listState);
  const setListToTransaction = useSetRecoilState(addListSelector);

  const [transaction, setTransaction] =
    useRecoilState<TransactionType>(transactionState);
  const addTransactionList = useSetRecoilState(addTransactionListSelector);
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

            setListToTransaction();

            setTransaction({
              ...transaction,
              id: uuid4(),
              list: [...transaction.list, list],
            });

            addTransactionList();

            resetExpenseItemList();
            resetTransaction();

            setCloseModal();
          }}
        >
          등록
        </button>
      </div>
    </ModalLayout>
  );
};
