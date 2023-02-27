import { ReactNode } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { SOpen } from 'recoil/selector';
import styles from './ModalLayout.module.scss';

type ModalLayoutType = {
  role: string;
  children: ReactNode | ReactNode[];
};

export const ModalLayout = ({ role, children }: ModalLayoutType) => {
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const resetOpenTagPopup = useResetRecoilState(SOpen.toggleTagPopupSelector);

  const handleClose = () => {
    if (role === 'add') {
      setCloseModal('add');
    } else if (role === 'detail') {
      setCloseModal('detail');
    } else {
      setCloseModal('byDateDetail');
    }

    resetOpenTagPopup();
  };

  return (
    <>
      <div className={styles.popupBackground} onClick={handleClose}></div>
      <div className={styles.popupSection}>
        <div className={styles.popup}>{children}</div>
      </div>
    </>
  );
};
