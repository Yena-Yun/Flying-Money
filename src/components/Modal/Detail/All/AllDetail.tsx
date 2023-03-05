import { useRecoilValue } from 'recoil';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { ItemList, TotalExpense, ActionButton } from 'components/Detail';
import { Toast } from 'components/Modal/Toast/Toast';
import { Hook } from 'utils';
import styles from './AllDetail.module.scss';

export const AllDetailModal = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenToastState);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const totalExpense = useRecoilValue(AMain.totalPerDateAllState);
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);

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
        <TotalExpense total={totalExpense} />
        <ActionButton role='allDetail' />
      </ModalLayout>
    </>
  );
};
