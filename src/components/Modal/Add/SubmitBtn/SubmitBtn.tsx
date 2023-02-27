import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { Main } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { Hook, Const } from 'utils';
import { TMain } from 'types';
import styles from './SubmitBtn.module.scss';

export const SubmitBtn = () => {
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const list = useRecoilValue(Main.listState);
  const items = useRecoilValue<TMain.ItemType[]>(Main.itemState);
  const resetItems = useResetRecoilState(Main.itemState);
  const resetList = useResetRecoilState(Main.listState);
  const resetTransaction = useResetRecoilState(Main.transactionState);
  const setItemToList = useSetRecoilState(SMain.setItemToListSelector);
  const setListToTransaction = useSetRecoilState(
    SMain.setListToTransactionSelector
  );
  const setTransactionToTransactionList = useSetRecoilState(
    SMain.setTransactionListSelector
  );
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);

  const validateList = () => {
    const noNameItem = items.map((item) => !item.name)[0];
    const noPriceItem = items.map((item) => !item.price)[0];

    if (!list.title) {
      Hook.popupToast('제목을 입력해주세요!', Const.TOAST_ID.TITLE);
    } else if (noNameItem && noPriceItem) {
      Hook.popupToast('항목을 하나 이상 입력해주세요!', Const.TOAST_ID.ITEM);
    } else if (noNameItem) {
      Hook.popupToast('항목명을 입력해주세요!', Const.TOAST_ID.NAME);
    } else if (noPriceItem) {
      Hook.popupToast('가격을 입력해주세요!', Const.TOAST_ID.PRICE);
    } else if (!noNameItem && !noPriceItem) {
      return true;
    }
  };

  const submitTransaction = () => {
    if (validateList()) {
      setItemToList();
      setListToTransaction();
      setTransactionToTransactionList();
      setTotalExpense('all');
      setTotalExpense('byDate');
      resetItems();
      resetList();
      resetTransaction();
      setCloseModal('addModal');
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
