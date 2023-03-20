import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, AIndex, ADate } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { PlusButton as PlusIcon } from 'components/Icons';
import { Hook } from 'utils';
import styles from './All.module.scss';

export const All = () => {
  const transactionList = useRecoilValue(AMain.transactionListState);
  const setOpenModal = useSetRecoilState(SOpen.toggleModalSelector);
  const setClickedIndex = useSetRecoilState(
    AIndex.clickedTransactionIndexState
  );
  const setSelectedDate = useSetRecoilState(ADate.allSelectedDateState);
  const setAllTotalExpense = useSetRecoilState(SMain.getTotalPerDateSelector);

  const openAddModal = () => {
    setOpenModal('addModal');
  };

  const openDetailModal = (id: string, date: Date) => {
    setClickedIndex(id);
    setSelectedDate(date);
    setAllTotalExpense('all');
    setOpenModal('allDetail');
  };

  return (
    <div className={styles.container}>
      <ul className={styles.expenseItemList}>
        {transactionList.length < 1 ? (
          <div className={styles.defaultContainer}>
            <figure className={styles.defaultImageContainer}>
              <img src={'/svgs/default.svg'} alt='default' />
            </figure>
            <p className={styles.defaultGuide}>
              새 항목을 등록하기 전 <br />
              사용할 태그를 먼저 등록해주세요!
            </p>
          </div>
        ) : (
          transactionList.map(({ id, date, lists }) => (
            <li key={id} className={styles.expenseItem}>
              <div className={styles.header}>
                <div className={styles.date}>{Hook.formatDate(date)}</div>
              </div>

              <div
                className={styles.itemWrap}
                onClick={() => openDetailModal(id, date)}
              >
                {lists.map(({ id, title, items }) => (
                  <div key={id} className={styles.itemList}>
                    <div className={styles.item}>
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
              </div>
            </li>
          ))
        )}
      </ul>
      <button className={styles.addNewItemButton} onClick={openAddModal}>
        <PlusIcon size='lg' />
        <p>새 항목 등록하기</p>
      </button>
    </div>
  );
};
