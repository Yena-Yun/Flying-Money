import { useSetRecoilState } from 'recoil';
import { SMain, SOpen } from 'recoil/selector';
import styles from './Toast.module.scss';

interface ToastProp {
  role: string;
}

export const Toast = ({ role }: ToastProp) => {
  const setDeleteList = useSetRecoilState(SMain.deleteListSelector);
  const setDeleteTransaction = useSetRecoilState(
    SMain.deleteTransactionSelector
  );
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const setCloseToast = useSetRecoilState(SOpen.toggleToastSelector);

  const deleteTransaction = () => {
    setCloseToast();

    if (role === 'allDetail') {
      setDeleteTransaction();
    } else if (role === 'byDateDetail') {
      setDeleteList();
    } else return;

    setCloseModal(role);
  };

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => setCloseToast()}
      ></div>
      <div className={styles.popupSection}>
        <div className={styles.popup}>
          <p className={styles.deleteGuide}>
            지출 내역을
            <br />
            정말 삭제하시겠어요?
          </p>
          <button className={styles.deleteButton} onClick={deleteTransaction}>
            삭제
          </button>
        </div>
      </div>
    </>
  );
};
