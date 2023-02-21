import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  transactionListState,
  clickedIndexState,
  clickedItemIndexState,
  byDateSelectedDateState,
} from 'recoil/atom';
import { toggleModalSelector } from 'recoil/selector';
import { Header } from './Header/Header';
import styles from './ByDate.module.scss';

export const ByDate = () => {
  const setOpenModal = useSetRecoilState(toggleModalSelector);
  const selectedDate = useRecoilValue(byDateSelectedDateState);
  const transactionList = useRecoilValue(transactionListState);
  const setClickedIndex = useSetRecoilState(clickedIndexState);
  const setClickedItemIndex = useSetRecoilState(clickedItemIndexState);

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
              {items.map(({ id, name, price }) => (
                <div key={id} className={styles.item}>
                  <div className={styles.name}>
                    {items[0].name !== '' && '•'} {name}
                  </div>
                  <div className={styles.price}>{price}</div>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
