import classNames from 'classnames';
import { useSetRecoilState } from 'recoil';
import { SOpen } from 'recoil/selector';
import styles from './ActionButton.module.scss';

interface ActionButtonProp {
  role: string;
}

export const ActionButton = ({ role }: ActionButtonProp) => {
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);

  return (
    <div className={styles.actionButtonContainer}>
      <button
        className={classNames(styles.actionButton, styles.confirmButton)}
        onClick={() => setCloseModal(role)}
      >
        확인
      </button>
      <button
        className={classNames(styles.actionButton, styles.deleteButton)}
        onClick={() => setIsOpenToast('deleteExpense')}
      >
        삭제
      </button>
    </div>
  );
};
