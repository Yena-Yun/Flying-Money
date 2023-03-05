import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { ItemList } from 'components/Detail/ItemList/ItemList';
import { Toast } from 'components/Modal/Toast/Toast';
import { Hook } from 'utils';
import styles from './Detail.module.scss';

export const Detail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenToastState);
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);

  const transactionList = useRecoilValue(AMain.transactionListState);
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);
  const totalExpense = useRecoilValue(AMain.totalPerDateAllState);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedIndex
  )!;

  return (
    <>
      {isOpenToast && <Toast role='detail' />}
      <ModalLayout role='allDetail'>
        <div className={styles.date}>{Hook.formatDate(date)}</div>

        <div className={styles.mainContainer}>
          {lists.map(({ id, title, items }) => (
            <div key={id}>
              <div className={styles.title}>{title}</div>
              <ItemList items={items} />
            </div>
          ))}
        </div>

        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(totalExpense)}
        </div>

        <div className={styles.actionButtonContainer}>
          <button
            className={classNames(styles.actionButton, styles.confirmButton)}
            onClick={() => setCloseModal('allDetail')}
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
      </ModalLayout>
    </>
  );
};
