import { Suspense } from 'react';
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from 'recoil';
import ClipLoader from 'react-spinners/ClipLoader';
import { AMain } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { Hook, Const } from 'utils';
import { TMain } from 'types';
import styles from './SubmitBtn.module.scss';
import { setItemToListSelector } from '~/recoil/selector/mainSelector';
// import { validateInputState } from '~/recoil/atom/mainState';
// import { validateInputSelector } from '~/recoil/selector/validateSelector';

export const SubmitBtn = () => {
  const title = useRecoilValue(AMain.addModalTitleState);
  const list = useRecoilValue(AMain.addModalListState);

  // const list = useRecoilValue(AMain.listState);
  // const items = useRecoilValue<TMain.ItemType[]>(AMain.itemState);
  // const validateInput = useSetRecoilState(validateInputSelector);

  // const isValidate = useRecoilValue(validateInputState);

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

      setCurrentDateToAddModal();
      setCloseModal('addModal');
    }
  };

  return (
    <button className={styles.submitButton} onClick={submitTransaction}>
      <Suspense
        /* API 로딩이 있다고 가정 */
        fallback={
          <ClipLoader
            color='#83c7d5'
            // loading={isLoading}
            aria-label='loading-spinner'
          />
        }
      >
        등록
      </Suspense>
    </button>
  );
};
