import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ADate, AIndex, AMain } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { Header } from './Header/Header';
import { Hook } from 'utils';
import styles from './ByDate.module.scss';

export const ByDate = () => {
  const transactionList = useRecoilValue(AMain.defaultTransactionListState);
  const selectedDate = useRecoilValue(ADate.byDateSelectedDateState);
  const setClickedIndex = useSetRecoilState(
    AIndex.clickedTransactionIndexState
  );
  const setClickedListIndex = useSetRecoilState(AIndex.clickedListIndexState);
  const setOpenModal = useSetRecoilState(SOpen.toggleModalSelector);

  const { id: index, lists } = transactionList.filter(
    ({ date }) => Hook.formatDate(selectedDate) === Hook.formatDate(date)
  )[0] || { id: '', lists: [] };

  const openDetailModal = (id: string) => {
    setClickedIndex(index);
    setClickedListIndex(id);
    setOpenModal('byDateDetail');
  };

  return (
    <div className={styles.container}>
      <Header />

      {lists.length > 0 && (
        <ul className={styles.filteredList}>
          {lists.map(({ id, title, items }) => (
            <li
              key={id}
              className={styles.expenseItem}
              onClick={() => openDetailModal(id)}
            >
              <div className={styles.title}>{title}</div>

              {items.map(({ id, name, tag, price }) => (
                <div key={id} className={styles.item}>
                  <div className={styles.nameTagGroup}>
                    <div className={styles.name}>
                      {name !== '' && '‣'} &nbsp; {name}&nbsp;
                    </div>
                    {tag && <div className={styles.tag}>{tag}</div>}
                  </div>
                  <div className={styles.price}>{Hook.formatMoney(price)}</div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
