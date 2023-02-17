import { useSetRecoilState } from 'recoil';
import {
  deleteTransactionListSelector,
  toggleModalSelector,
  toggleToastSelector,
} from 'recoil/selector';
import styles from './Toast.module.scss';

export const Toast = () => {
  const setCloseToast = useSetRecoilState(toggleToastSelector);
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const setDeleteTransaction = useSetRecoilState(deleteTransactionListSelector);

  const deleteTransaction = () => {
    setDeleteTransaction();
    setCloseToast();
    setCloseModal('detail');
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
