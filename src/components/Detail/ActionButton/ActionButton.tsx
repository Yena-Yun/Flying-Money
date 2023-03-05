import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';
import { SOpen } from 'recoil/selector';
import styles from './ActionButton.module.scss';

type ActionButtonType = {
  role: string;
};

export const ActionButton = ({ role }: ActionButtonType) => {
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);

  return (
    <div className={styles.actionButtonContainer}>
      <button
        className={classNames(styles.actionButton, styles.confirmButton)}
        onClick={() => {
          setCloseModal(role);
        }}
      >
        확인
      </button>
      <button
        className={classNames(styles.actionButton, styles.deleteButton)}
        onClick={() => setIsOpenToast()}
      >
        삭제
      </button>
    </div>
  );
};
