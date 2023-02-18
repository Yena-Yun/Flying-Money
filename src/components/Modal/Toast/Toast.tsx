import { useSetRecoilState } from 'recoil';
import {
  deleteItemSelector,
  deleteTransactionSelector,
  toggleModalSelector,
  toggleToastSelector,
} from 'recoil/selector';
import styles from './Toast.module.scss';

type ToastType = {
  role: string;
};

export const Toast = ({ role }: ToastType) => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const setCloseToast = useSetRecoilState(toggleToastSelector);
  const setDeleteTransaction = useSetRecoilState(deleteTransactionSelector);
  const setDeleteItem = useSetRecoilState(deleteItemSelector);

  const deleteTransaction = () => {
    setCloseToast();

    if (role === 'detail') {
      setCloseModal('detail');
      setDeleteTransaction();
    } else if (role === 'byDateDetail') {
      setCloseModal('byDateDetail');
      setDeleteItem();
    } else return;
  };

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => setCloseToast()}
      ></div>
      <div className={styles.popupSection}>
        <div className={styles.popup}>
          <p className={styles.deleteGuide}>지출 내역을 정말 삭제하시겠어요?</p>
          <button className={styles.deleteButton} onClick={deleteTransaction}>
            삭제
          </button>
        </div>
      </div>
    </>
  );
};
