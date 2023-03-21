import { useRecoilValue } from 'recoil';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { ModalLayout, Toast } from 'components/Modal';
import { ItemList, TotalExpense, ActionButton } from '../DetailUI';
import { Hook } from 'utils';
import styles from './AllDetail.module.scss';

export const AllDetail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenDeleteByAllToastState);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const clickedIndex = useRecoilValue(AIndex.clickedTransactionIndexState);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedIndex
  )!;

  return (
    <>
      {isOpenToast && <Toast role='byAll' />}
      <ModalLayout role='byAll'>
        <div className={styles.date}>{Hook.formatDate(date)}</div>
        <div className={styles.mainContainer}>
          {lists.map(({ id, title, items }) => (
            <div key={id}>
              <div className={styles.title}>{title}</div>
              <ItemList deliveredItemList={items} />
            </div>
          ))}
        </div>
        <TotalExpense where='byAll' />
        <ActionButton role='byAll' />
      </ModalLayout>
    </>
  );
};
