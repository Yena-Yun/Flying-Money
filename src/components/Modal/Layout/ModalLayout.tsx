import { ReactNode } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AOpen } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import styles from './ModalLayout.module.scss';

type ModalLayoutType = {
  role: string;
  children: ReactNode | ReactNode[];
};

export const ModalLayout = ({ role, children }: ModalLayoutType) => {
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const resetOpenTagPopup = useResetRecoilState(AOpen.isOpenTagPopupState);

  const handleClose = () => {
    if (role === 'addModal') {
      setCloseModal('addModal');
    } else if (role === 'allDetail') {
      setCloseModal('allDetail');
    } else {
      setCloseModal('byDateDetail');
    }

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
              : ''
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
