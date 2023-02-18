import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { toggleModalSelector, toggleTagPopupSelector } from 'recoil/selector';
import styles from './ModalLayout.module.scss';

type ModalLayoutType = {
  role: string;
  children: ReactNode | ReactNode[];
};

export const ModalLayout = ({ role, children }: ModalLayoutType) => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  const handleClose = () => {
    role === 'add'
      ? setCloseModal('add')
      : role === 'detail'
      ? setCloseModal('detail')
      : role === 'byDateDetail'
      ? setCloseModal('byDateDetail')
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
