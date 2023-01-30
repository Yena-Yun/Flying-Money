import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import { closeModalSelector, toggleTagPopupSelector } from 'recoil/selector';
import styles from './ModalLayout.module.scss';

type ModalLayoutType = {
  children: ReactNode[];
};

export const ModalLayout = ({ children }: ModalLayoutType) => {
  const setCloseModal = useSetRecoilState(closeModalSelector);
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => {
          setCloseModal();
          setCloseTagPopup();
        }}
      ></div>
      <div className={styles.popupSection}>
        <div className={styles.popup}>{children}</div>
      </div>
    </>
  );
};
