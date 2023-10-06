import { ReactNode } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AOpen } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { GrFormClose } from '@react-icons/all-files/gr/GrFormClose';
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
      {/* <div
        className={classNames(
          styles.popupBackground,
          role === 'tagPopup' && styles.tagPopup
        )}
        onClick={handleClose}
      ></div> */}
      <div
        className={classNames(
          styles.popupSection,
          role === 'tagPopup' && styles.tagPopup
        )}
      >
        <div className={styles.closeButton}>
          <GrFormClose onClick={handleClose} />
        </div>
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
              : role === 'tagPopup'
              ? styles.tagPopup
              : ''
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};
