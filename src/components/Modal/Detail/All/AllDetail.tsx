import { useRecoilValue } from 'recoil';
import { AOpen, AIndex, AMain } from 'recoil/atom';
import { ModalLayout, Toast } from 'components/Modal';
import { ItemList, TotalExpense, ActionButton } from '../DetailUI';
import { Hook } from 'utils';
import styles from './AllDetail.module.scss';

/* 하위 컴포넌트에 전달할 'role' prop 상수 */
const ROLE = 'byAll';

export const AllDetail = () => {
  const transactionList = useRecoilValue(AMain.transactionListState);
  const isOpenToast = useRecoilValue(AOpen.isOpenDeleteByAllToastState);
  const clickedIndex = useRecoilValue(AIndex.clickedTransactionIndexState);

  const filteredList =
    transactionList.find(({ id }) => id === clickedIndex) || null;

  const { date, lists } = filteredList || { date: new Date(), lists: [] };

  return (
    <>
      {isOpenToast && <Toast role={ROLE} />}
      <ModalLayout role={ROLE}>
        <div className={styles.date}>{Hook.formatDate(date)}</div>
        <div className={styles.mainContainer}>
          {lists.map(({ id, title, items }) => (
            <div key={id}>
              <div className={styles.title}>{title}</div>
              <ItemList deliveredItemList={items} />
            </div>
          ))}
        </div>
        <TotalExpense role={ROLE} />
        <ActionButton role={ROLE} />
      </ModalLayout>
    </>
  );
};
