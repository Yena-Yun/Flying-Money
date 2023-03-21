import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AOpen, AIndex, AMain } from 'recoil/atom';
import { SMain } from 'recoil/selector';
import { ModalLayout, Toast } from 'components/Modal';
import { ItemList, TotalExpense, ActionButton } from '../DetailUI';
import { Hook } from '~/utils';
import styles from './ByDateDetail.module.scss';

export const ByDateDetail = () => {
  const transactionList = useRecoilValue(AMain.transactionListState);
  const isOpenToast = useRecoilValue(AOpen.isOpenDeleteExpenseToastState);
  const clickedIndex = useRecoilValue(AIndex.clickedTransactionIndexState);
  const clickedListIndex = useRecoilValue(AIndex.clickedListIndexState);
  const setTotalExpense = useSetRecoilState(
    SMain.getTotalPerListInByDateSelector
  );

  useEffect(() => {
    setTotalExpense();
  }, [clickedListIndex]);

  const filteredList =
    transactionList.find(({ id }) => id === clickedIndex) || null;

  const filteredResult = filteredList
    ? filteredList.lists.find(({ id }) => id === clickedListIndex)
    : null;

  const { title, items } = filteredResult || { title: '', items: [] };

  return (
    <>
      {isOpenToast && <Toast role='deleteExpenseByDate' />}
      <ModalLayout role='byDateDetail'>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className={styles.mainContainer}>
          <ItemList deliveredItemList={items} />
        </div>
        <TotalExpense where='byDate' />
        <ActionButton role='byDateDetail' />
      </ModalLayout>
    </>
  );
};
