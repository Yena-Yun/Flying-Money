import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { Main, Index } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { Hook } from 'utils';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import styles from './All.module.scss';

export const All = () => {
  const transactionList = useRecoilValue(Main.transactionListState);
  const resetTransactionToTransactionList = useResetRecoilState(
    Main.transactionState
  );
  const setClickedIndex = useSetRecoilState(Index.clickedIndexState);
  const setOpenModal = useSetRecoilState(SOpen.toggleModalSelector);

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
        {transactionList.length < 1 ? (
          <div className={styles.defaultContainer}>
            <figure className={styles.defaultImageContainer}>
              <img src={'/svgs/default.svg'} alt='default' />
            </figure>
            <p className={styles.defaultGuide}>새로운 항목을 등록해주세요</p>
          </div>
        ) : (
          transactionList.map(({ id, date, lists }) => (
            <li
              key={id}
              className={styles.expenseItem}
              onClick={() => openDetailModal(id)}
            >
              <div className={styles.date}>{Hook.formatDate(date)}</div>
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
                    {Hook.formatMoney(
                      items
                        .map(({ price }) => price)
                        .reduce((acc, cur) => acc + cur)
                    )}
                  </div>
                </div>
              ))}
            </li>
          ))
        )}
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
