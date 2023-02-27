import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Main, Date, Index } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { Header } from './Header/Header';
import { Hook } from 'utils';
import styles from './ByDate.module.scss';

export const ByDate = () => {
  const transactionList = useRecoilValue(Main.transactionListState);
  const selectedDate = useRecoilValue(Date.byDateSelectedDateState);
  const setClickedIndex = useSetRecoilState(Index.clickedIndexState);
  const setClickedItemIndex = useSetRecoilState(Index.clickedItemIndexState);
  const setOpenModal = useSetRecoilState(SOpen.toggleModalSelector);

  const { id: index, lists } = transactionList.filter(
    ({ date }) =>
      selectedDate.toString().slice(0, 15) === date.toString().slice(0, 15)
  )[0] || { id: '', lists: [] };

  const openDetailModal = (id: string) => {
    setClickedIndex(index);
    setClickedItemIndex(id);
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
              <div className={styles.item}>
                <div className={styles.nameTagGroup}>
                  <div className={styles.name}>
                    {items[0].name !== '' && '•'} {items[0].name}
                  </div>
                  {items[0].tag && (
                    <div className={styles.tag}>{items[0].tag}</div>
                  )}
                  {items.length > 1 && ` 외 +${items.length - 1}`}
                </div>
                <div className={styles.price}>
                  {Hook.formatMoney(
                    items
                      .map(({ price }) => price)
                      .reduce((acc, cur) => acc + cur)
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
