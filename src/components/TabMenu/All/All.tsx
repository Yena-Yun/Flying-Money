import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  clickedIndexState,
  transactionListState,
  transactionState,
} from 'recoil/atom';
import { toggleModalSelector } from 'recoil/selector';
import { formatDate } from 'utils/hooks/formatDate';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import styles from './All.module.scss';

export const All = () => {
  const setOpenModal = useSetRecoilState(toggleModalSelector);
  const transactionList = useRecoilValue(transactionListState);
  const setClickedIndex = useSetRecoilState(clickedIndexState);
  const resetTransactionToTransactionList =
    useResetRecoilState(transactionState);

  const openAddModal = () => {
    setOpenModal('add');
    resetTransactionToTransactionList();
  };

  const openDetailModal = (id: string) => {
    setClickedIndex(id);
    setOpenModal('detail');
  };

  return (
    <div className={styles.container}>
      <ul className={styles.expenseItemList}>
        {transactionList.map(({ id, date, lists }) => (
          <li
            key={id}
            className={styles.expenseItem}
            onClick={() => openDetailModal(id)}
          >
            <div className={styles.date}>{formatDate(date)}</div>
            {lists.map(({ id, title, items }) => (
              <div key={id} className={styles.itemList}>
                <div className={styles.info}>
                  <div className={styles.title}>{title}</div>
                  <div className={styles.nameTagGroup}>
                    <div className={styles.name}>
                      {items[0].name !== '' && '•'} {items[0].name}
                    </div>
                    {items[0].tag && (
                      <div className={styles.tag}>{items[0].tag}</div>
                    )}
                    {items.length > 1 && ` 외 +${items.length - 1}`}
                  </div>
                </div>
                <div className={styles.price}>
                  {items
                    .map(({ price }) => price)
                    .reduce((acc, cur) => acc + cur)}
                </div>
              </div>
            ))}
          </li>
        ))}
      </ul>
      <button className={styles.addNewItemButton} onClick={openAddModal}>
        <div className={styles.addNewItemIcon}>
          <HiOutlinePlusCircle />
        </div>
        <p>새 항목 등록하기</p>
      </button>
    </div>
  );
};
