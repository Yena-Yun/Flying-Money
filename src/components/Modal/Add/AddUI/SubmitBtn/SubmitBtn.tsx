import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import { AMain } from 'recoil/atom';
import { SDate, SMain, SOpen, STotal } from 'recoil/selector';
import { Hook, Const } from 'utils';
import styles from './SubmitBtn.module.scss';

export const SubmitBtn = () => {
  const title = useRecoilValue(AMain.addModalTitleState);
  const list = useRecoilValue(AMain.addModalListState);

  const setItemToList = useSetRecoilState(SMain.setItemToListSelector);
  const setListToTransaction = useSetRecoilState(
    SMain.setListToTransactionSelector
  );
  const setTransactionToTransactionList = useSetRecoilState(
    SMain.setTransactionListSelector
  );
  const setTotalExpense = useSetRecoilState(STotal.getTotalPerDateSelector);

  const resetItems = useResetRecoilState(AMain.itemState);
  const resetList = useResetRecoilState(AMain.listState);
  const resetTransaction = useResetRecoilState(AMain.transactionState);
  const resetModalTitle = useResetRecoilState(AMain.addModalTitleState);
  const resetModalList = useResetRecoilState(AMain.addModalListState);

  const setCurrentDateToAddModal = useSetRecoilState(
    SDate.setCurrentDateToAddModalSelector
  );
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);

  const validateList = () => {
    const isNoName = list.some(({ name }) => !name);
    const isNoPrice = list.some(({ price }) => !price);

    if (!title) {
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

  const submitTransaction = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      resetModalTitle();
      resetModalList();

      setCurrentDateToAddModal();
      setCloseModal('addModal');
    }
  };

  return (
    <button className={styles.submitButton} onClick={submitTransaction}>
      등록하기
    </button>
  );
};
