import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { SMain } from 'recoil/selector';
import { ModalLayout, Toast } from 'components/Modal';
import { ItemList, TotalExpense, ActionButton } from '../DetailUI';
import styles from './ByDateDetail.module.scss';

export const ByDateDetail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenToastState);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const totalExpense = useRecoilValue(AMain.totalPerListState);
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);
  const clickedListIndex = useRecoilValue(AIndex.clickedListIndexState);
  const setTotalExpense = useSetRecoilState(SMain.getTotalPerListSelector);

  useEffect(() => {
    setTotalExpense();
  }, [clickedListIndex]);

  const { lists } = transactionList.find(({ id }) => id === clickedIndex)!;
  const { title, items } = lists.find(({ id }) => id === clickedListIndex)!;

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
