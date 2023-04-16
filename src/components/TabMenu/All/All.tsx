import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AIndex, ADate, AMain } from 'recoil/atom';
import { SOpen, STotal } from 'recoil/selector';
import { PlusIcon } from 'components/Icons';
import { Hook } from 'utils';
import styles from './All.module.scss';

export const All = () => {
  const transactionList = useRecoilValue(AMain.transactionListState);
  const setOpenModal = useSetRecoilState(SOpen.toggleModalSelector);
  const setClickedIndex = useSetRecoilState(
    AIndex.clickedTransactionIndexState
  );
  const setSelectedDate = useSetRecoilState(ADate.allSelectedDateState);
  const setAllTotalExpense = useSetRecoilState(STotal.getTotalPerDateSelector);

  const openAddModal = () => {
    setOpenModal('addModal');
  };

  const openDetailModal = (id: string, date: Date) => {
    setClickedIndex(id);
    setSelectedDate(date);
    setAllTotalExpense('byAll');
    setOpenModal('byAll');
  };

  return (
    <div className={styles.container}>
      <ul className={styles.expenseItemList}>
        {transactionList.length < 1 ? (
          <div className={styles.defaultContainer}>
            <picture className={styles.defaultImageContainer}>
              <source
                srcSet='svgs/default.svg'
                media='all and (min-width: 768px)'
              />
              <img
                className={styles.defaultImage}
                src='svgs/default.svg'
                alt='default'
              />
            </picture>
            <p className={styles.defaultGuide}>
              '태그 관리'에서 태그를 먼저 등록 후 <br />새 항목을 등록해주세요!
            </p>
          </div>
        ) : (
          transactionList?.map(({ id, date, lists }) => (
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
      <button className={styles.addNewItemButtonWrap} onClick={openAddModal}>
        <div className={styles.addNewItemButton}>
          <PlusIcon />
        </div>
        <p className={styles.addNewItemText}>새 항목 등록하기</p>
      </button>
    </div>
  );
};
