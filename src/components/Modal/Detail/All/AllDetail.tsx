import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AOpen, AIndex, AMain } from 'recoil/atom';
import { ModalLayout, Toast } from 'components/Modal';
import { ItemList, TotalExpense, ActionButton } from '../DetailUI';
import { Hook } from 'utils';
import styles from './AllDetail.module.scss';

export const AllDetail = () => {
  const transactionList = useRecoilValue(AMain.defaultTransactionListState);
  const isOpenToast = useRecoilValue(AOpen.isOpenDeleteExpenseToastState);
  const clickedIndex = useRecoilValue(AIndex.clickedTransactionIndexState);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedIndex
  )!;

  return (
    <>
      {isOpenToast && <Toast role='deleteExpenseAll' />}
      <ModalLayout role='allDetail'>
        <div className={styles.date}>{date}</div>
        <div className={styles.mainContainer}>
          {lists.map(({ id, title, items }) => (
            <div key={id}>
              <div className={styles.title}>{title}</div>
              <ItemList deliveredItemList={items} />
            </div>
          ))}
        </div>
        <TotalExpense where='all' />
        <ActionButton role='allDetail' />
      </ModalLayout>
    </>
  );
};
