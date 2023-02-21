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

  const validateList = () => {
    const noNameItem = items.map((item) => !item.name)[0];
    const noPriceItem = items.map((item) => !item.price)[0];

    if (noNameItem && noPriceItem) {
      alert('항목을 하나 이상 입력해주세요!');
    } else if (noNameItem) {
      alert('항목명을 입력해주세요!');
    } else if (noPriceItem) {
      alert('가격을 입력해주세요!');
    } else if (!noNameItem && !noPriceItem) {
      return true;
    }
  };

  const submitTransaction = () => {
    if (!list.title) {
      alert('제목을 입력해주세요!');
    } else {
      if (validateList()) {
        setList({
          ...list,
          items,
        });

        setListToTransactionList();
        setTransactionToTransactionList();
        resetItems();
        resetTransaction();
        setCloseModal('add');
      }
    }
  };

  return (
    <div className={styles.submitButtonWrap}>
      <button className={styles.submitButton} onClick={submitTransaction}>
        등록
      </button>
    </div>
  );
};
