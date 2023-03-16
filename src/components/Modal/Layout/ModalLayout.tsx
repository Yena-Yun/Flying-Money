import { ReactNode } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AOpen } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import styles from './ModalLayout.module.scss';

interface ModalLayoutProp {
  role: string;
  children: ReactNode | ReactNode[];
}

export const ModalLayout = ({ role, children }: ModalLayoutProp) => {
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const resetOpenTagPopup = useResetRecoilState(AOpen.isOpenTagPopupState);

  const handleClose = () => {
    setCloseModal(role);
    resetOpenTagPopup();
  };

  return (
    <>
      <div className={styles.popupBackground} onClick={handleClose}></div>
      <div className={styles.popupSection}>
        <div
          className={classNames(
            styles.popup,
            role === 'addModal'
              ? styles.addModal
              : role === 'allDetail'
              ? styles.allDetail
              : role === 'byDateDetail'
              ? styles.byDateDetail
              : role === 'tagModal'
              ? styles.tagModal
              : ''
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
