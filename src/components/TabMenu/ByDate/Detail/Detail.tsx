import { useRecoilValue } from 'recoil';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { ItemList, TotalExpense, ActionButton } from 'components/Detail';
import { Toast } from 'components/Modal/Toast/Toast';
import styles from './Detail.module.scss';

export const ByDateDetail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenToastState);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const totalExpense = useRecoilValue(AMain.totalPerDateState);
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);
  const clickedItemIndex = useRecoilValue(AIndex.clickedItemIndexState);

  const { lists } = transactionList.find(({ id }) => id === clickedIndex)!;
  const { title, items } = lists.find(({ id }) => id === clickedItemIndex)!;

  return (
    <>
      {isOpenToast && <Toast role='byDateDetail' />}
      <ModalLayout role='byDateDetail'>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className={styles.mainContainer}>
          <ItemList items={items} />
        </div>
        <TotalExpense total={totalExpense} />
        <ActionButton role='byDateDetail' />
      </ModalLayout>
    </>
  );
};
