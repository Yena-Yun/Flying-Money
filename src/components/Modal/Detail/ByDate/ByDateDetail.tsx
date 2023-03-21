import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AOpen, AIndex, AMain } from 'recoil/atom';
import { STotal } from 'recoil/selector';
import { ModalLayout, Toast } from 'components/Modal';
import { ItemList, TotalExpense, ActionButton } from '../DetailUI';
import styles from './ByDateDetail.module.scss';

/* 하위 컴포넌트에 전달할 'role' prop 상수 */
const ROLE = 'byDate';

export const ByDateDetail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenDeleteByDateToastState);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const clickedIndex = useRecoilValue(AIndex.clickedTransactionIndexState);
  const clickedListIndex = useRecoilValue(AIndex.clickedListIndexState);
  const setTotalExpense = useSetRecoilState(
    STotal.getTotalPerListInByDateSelector
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
      {isOpenToast && <Toast role={ROLE} />}
      <ModalLayout role={ROLE}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <div className={styles.mainContainer}>
          <ItemList deliveredItemList={items} />
        </div>
        <TotalExpense role={ROLE} />
        <ActionButton role={ROLE} />
      </ModalLayout>
    </>
  );
};
