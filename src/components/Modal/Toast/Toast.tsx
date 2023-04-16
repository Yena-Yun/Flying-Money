import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AIndex, AMain } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { TOAST_PHRASES } from 'utils/constants';
import { TFlag } from 'types';
import styles from './Toast.module.scss';

interface ToastProp {
  role: TFlag.ToastType;
}

export const Toast = ({ role }: ToastProp) => {
  const setDeleteList = useSetRecoilState(SMain.deleteListSelector);
  const setDeleteTransaction = useSetRecoilState(
    SMain.deleteTransactionSelector
  );
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const setCloseToast = useSetRecoilState(SOpen.toggleToastSelector);

  const setSavedTagGroup = useSetRecoilState(AMain.savedTagGroupState);
  const deleteTagIndex = useRecoilValue(AIndex.deleteTagIndexState);

  const toastButtonHandler = () => {
    setCloseToast(role);

    if (role === 'byAll') {
      setDeleteTransaction();
    } else if (role === 'byDate') {
      setDeleteList();
    } else if (role === 'tag') {
      setSavedTagGroup((savedTagGroup) =>
        savedTagGroup.filter(({ id }) => id !== deleteTagIndex)
      );
    } else return;

    setCloseModal(role);
  };

  return (
    <>
      <div
        className={styles.popupBackground}
        onClick={() => setCloseToast(role)}
      ></div>
      <div className={styles.popupSection}>
        <div
          className={classNames(
            styles.popup,
            role === 'tag' && styles.deleteTag
          )}
        >
          <p className={styles.deleteGuide}>
            {role === 'tag'
              ? TOAST_PHRASES.deleteTag.line1
              : role.includes('by')
              ? TOAST_PHRASES.deleteExpense.line1
              : ''}
            <br />
            <span>{role === 'tag' && TOAST_PHRASES.deleteTag.line2}</span>
            {role.includes('by') && TOAST_PHRASES.deleteExpense.line2}
          </p>
          <button className={styles.deleteButton} onClick={toastButtonHandler}>
            삭제
          </button>
        </div>
      </div>
    </>
  );
};
