import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { toggleModalSelector, toggleTagPopupSelector } from 'recoil/selector';
import styles from './ModalLayout.module.scss';

type ModalLayoutType = {
  modalRole: string;
  children: ReactNode | ReactNode[];
};

export const ModalLayout = ({ modalRole, children }: ModalLayoutType) => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  const handleClose = () => {
    modalRole === 'add'
      ? setCloseModal('add')
      : modalRole === 'detail'
      ? setCloseModal('detail')
      : setCloseTagPopup();
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
