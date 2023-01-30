import { ReactNode } from 'react';
import { useSetRecoilState } from 'recoil';
import {
  closeModalSelector,
  toggleDetailModalSelector,
  toggleTagPopupSelector,
} from 'recoil/selector';
import styles from './ModalLayout.module.scss';

type ModalLayoutType = {
  modalRole: string;
  children: ReactNode | ReactNode[];
};

export const ModalLayout = ({ modalRole, children }: ModalLayoutType) => {
  const setCloseModal = useSetRecoilState(closeModalSelector);
  const setCloseDetailModal = useSetRecoilState(toggleDetailModalSelector);
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => {
          modalRole === 'add'
            ? setCloseModal()
            : modalRole === 'detail'
            ? setCloseDetailModal()
            : setCloseTagPopup();
        }}
      ></div>
      <div className={styles.popupSection}>
        <div className={styles.popup}>{children}</div>
      </div>
    </>
  );
};
