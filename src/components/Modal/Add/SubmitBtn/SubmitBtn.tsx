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
import { toast } from 'react-toastify';
import { ItemType } from 'types/types';
import {
  ITEM_ID,
  NAME_ID,
  PRICE_ID,
  TITLE_ID,
} from 'utils/constants/constants';
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
      toast.info('항목을 하나 이상 입력해주세요!', {
        toastId: ITEM_ID,
      });
    } else if (noNameItem) {
      toast.info('항목명을 입력해주세요!', {
        toastId: NAME_ID,
      });
    } else if (noPriceItem) {
      toast.info('가격을 입력해주세요!', {
        toastId: PRICE_ID,
      });
    } else if (!noNameItem && !noPriceItem) {
      return true;
    }
  };

  const submitTransaction = () => {
    if (!list.title) {
      toast.info('제목을 입력해주세요!', {
        toastId: TITLE_ID,
      });
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
