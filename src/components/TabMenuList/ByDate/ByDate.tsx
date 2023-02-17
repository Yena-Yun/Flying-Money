import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedDateState,
  transactionListState,
  clickedIndexState,
  isOpenDetailModalState,
} from 'recoil/atom';
import { toggleModalSelector } from 'recoil/selector';
import { Detail } from 'components/Modal/Detail/Detail';
import { Header } from './Header/Header';
import styles from './ByDate.module.scss';

export const ByDate = () => {
  const setOpenModal = useSetRecoilState(toggleModalSelector);
  const isOpenDetailModal = useRecoilValue(isOpenDetailModalState);
  const selectedDate = useRecoilValue(selectedDateState);
  const transactionList = useRecoilValue(transactionListState);
  const [clickedIndex, setClickedIndex] = useRecoilState(clickedIndexState);

  const filterTransactionOnDate = () => {
    return transactionList.filter(
      ({ date }) =>
        selectedDate.toString().slice(0, 15) === date.toString().slice(0, 15)
    );
  };

  const openDetailModal = (id: string) => {
    setClickedIndex(id);
    setOpenModal('detail');
  };

  return (
    <div className={styles.container}>
      <Header />
      <ul className={styles.filteredList}>
        {filterTransactionOnDate().map(({ id, lists }) =>
          lists.map(({ title, items }) => (
            <li
              key={id}
              className={styles.expenseItem}
              onClick={() => openDetailModal(id)}
            >
              {clickedIndex === id && isOpenDetailModal && <Detail />}
              <div className={styles.title}>{title}</div>
              {items.map(({ name, price }) => (
                <div className={styles.item}>
                  <div className={styles.name}>
                    {items[0].name !== '' && '•'} {name}
                  </div>
                  <div className={styles.price}>{price}</div>
                </div>
              ))}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};
