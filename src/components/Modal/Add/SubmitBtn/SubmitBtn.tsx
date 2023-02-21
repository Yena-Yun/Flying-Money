import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { itemState, listState, transactionState } from 'recoil/atom';
import {
  setTransactionListSelector,
  setListToTransactionSelector,
  toggleModalSelector,
  setItemToListSelector,
} from 'recoil/selector';
import { popupToast } from 'utils/hooks/popupToast';
import { TOAST_ID } from 'utils/constants/constants';
import { ItemType } from 'types/types';
import styles from './SubmitBtn.module.scss';

export const SubmitBtn = () => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const list = useRecoilValue(listState);
  const items = useRecoilValue<ItemType[]>(itemState);

  const setItemToList = useSetRecoilState(setItemToListSelector);
  const setListToTransaction = useSetRecoilState(setListToTransactionSelector);
  const setTransactionToTransactionList = useSetRecoilState(
    setTransactionListSelector
  );

  const resetItems = useResetRecoilState(itemState);
  const resetList = useResetRecoilState(listState);
  const resetTransaction = useResetRecoilState(transactionState);

  const validateList = () => {
    const noNameItem = items.map((item) => !item.name)[0];
    const noPriceItem = items.map((item) => !item.price)[0];

    if (!list.title) {
      popupToast('제목을 입력해주세요!', TOAST_ID.TITLE);
    } else if (noNameItem && noPriceItem) {
      popupToast('항목을 하나 이상 입력해주세요!', TOAST_ID.ITEM);
    } else if (noNameItem) {
      popupToast('항목명을 입력해주세요!', TOAST_ID.NAME);
    } else if (noPriceItem) {
      popupToast('가격을 입력해주세요!', TOAST_ID.PRICE);
    } else if (!noNameItem && !noPriceItem) {
      return true;
    }
  };

  const submitTransaction = () => {
    if (validateList()) {
      setItemToList();
      setListToTransaction();
      setTransactionToTransactionList();

      resetItems();
      resetList();
      resetTransaction();

      setCloseModal('add');
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
