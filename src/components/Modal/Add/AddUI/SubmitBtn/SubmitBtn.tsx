import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { AMain } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { Hook, Const } from 'utils';
import { TMain } from 'types';
import styles from './SubmitBtn.module.scss';

export const SubmitBtn = () => {
  const list = useRecoilValue(AMain.listState);
  const items = useRecoilValue<TMain.ItemType[]>(AMain.itemState);

  const setItemToList = useSetRecoilState(SMain.setItemToListSelector);
  const setListToTransaction = useSetRecoilState(
    SMain.setListToTransactionSelector
  );
  const setTransactionToTransactionList = useSetRecoilState(
    SMain.setTransactionListSelector
  );
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);

  const resetItems = useResetRecoilState(AMain.itemState);
  const resetList = useResetRecoilState(AMain.listState);
  const resetTransaction = useResetRecoilState(AMain.transactionState);

  const setCurrentDateToAddModal = useSetRecoilState(
    SMain.setCurrentDateToAddModalSelector
  );
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);

  const validateList = () => {
    const isNoName = items.some(({ name }) => !name);
    const isNoPrice = items.some(({ price }) => !price);

    if (!list.title) {
      Hook.popupToast('제목을 입력해주세요!', Const.TOAST_ID.TITLE);
    } else if (isNoName && isNoPrice) {
      Hook.popupToast('항목명과 가격을 입력해주세요!', Const.TOAST_ID.ITEM);
    } else if (isNoName) {
      Hook.popupToast('항목명을 입력해주세요!', Const.TOAST_ID.NAME);
    } else if (isNoPrice) {
      Hook.popupToast('가격을 입력해주세요!', Const.TOAST_ID.PRICE);
    } else if (!isNoName && !isNoPrice) {
      return true;
    }
  };

  const submitTransaction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateList()) {
      setItemToList();
      setListToTransaction();
      setTransactionToTransactionList();

      setTotalExpense('all');
      setTotalExpense('byDate');

      resetItems();
      resetList();
      resetTransaction();

      setCurrentDateToAddModal();
      setCloseModal('addModal');
    }
  };

  return (
    <form className={styles.submitButtonWrap} onSubmit={submitTransaction}>
      <button className={styles.submitButton}>등록</button>
    </form>
  );
};
