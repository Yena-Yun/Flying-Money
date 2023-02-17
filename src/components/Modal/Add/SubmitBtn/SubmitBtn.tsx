import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import { itemState, listState, transactionState } from 'recoil/atom';
import {
  addTransactionListSelector,
  addListToTransactionSelector,
  toggleModalSelector,
} from 'recoil/selector';
import { ItemType } from 'types/types';
import styles from './SubmitBtn.module.scss';

export const SubmitBtn = () => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const resetItems = useResetRecoilState(itemState);

  const [list, setList] = useRecoilState(listState);
  const items = useRecoilValue<ItemType[]>(itemState);
  const setListToTransactionList = useSetRecoilState(
    addListToTransactionSelector
  );

  const setTransactionToTransactionList = useSetRecoilState(
    addTransactionListSelector
  );
  const resetTransaction = useResetRecoilState(transactionState);

  return (
    <div className={styles.submitButtonWrap}>
      <button
        className={styles.submitButton}
        onClick={() => {
          setList({
            ...list,
            items,
          });

          setListToTransactionList();
          setTransactionToTransactionList();

          resetItems();
          resetTransaction();

          setCloseModal('add');
        }}
      >
        등록
      </button>
    </div>
  );
};
