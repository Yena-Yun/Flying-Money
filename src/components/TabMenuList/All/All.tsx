import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  clickedExpenseIndexState,
  isOpenDetailModalState,
  transactionListState,
  transactionState,
} from 'recoil/atom';
import { toggleModalSelector } from 'recoil/selector';
import { Detail } from 'components/Modal/Detail/Detail';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import styles from './All.module.scss';

export const All = () => {
  const setOpenModal = useSetRecoilState(toggleModalSelector);
  const transactionList = useRecoilValue(transactionListState);
  const isOpenDetailModal = useRecoilValue(isOpenDetailModalState);
  const [clickedExpenseCard, setClickedExpenseCard] = useRecoilState(
    clickedExpenseIndexState
  );
  const resetTransactionList = useResetRecoilState(transactionState);

  return (
    <div className={styles.container}>
      <ul className={styles.expenseItemList}>
        {transactionList.map(({ id, date, lists }) => (
          <li
            key={id}
            className={styles.expenseItem}
            onClick={() => {
              setClickedExpenseCard(id);
              setOpenModal('detail');
            }}
          >
            {clickedExpenseCard === id && isOpenDetailModal && <Detail />}
            {lists.map(({ items }) => (
              <>
                <div className={styles.info}>
                  <div className={styles.date}>
                    {date.toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </div>
                  <div className={styles.title}>{lists[0].title}</div>
                  <div className={styles.nameTagGroup}>
                    <div className={styles.name}>
                      {items[0].name !== '' && '•'} {items[0].name}
                    </div>
                    <div className={styles.tag}>{items[0].tag}</div>
                    {items.length > 1 && ` 외 +${items.length - 1}`}
                  </div>
                </div>
                <div className={styles.price}>
                  {items
                    .map(({ price }) => price)
                    .reduce((acc, cur) => acc + cur)}
                </div>
              </>
            ))}
          </li>
        ))}
      </ul>
      <button
        className={styles.addNewItemButton}
        onClick={() => {
          setOpenModal('add');
          resetTransactionList();
        }}
      >
        <div className={styles.addNewItemIcon}>
          <HiOutlinePlusCircle />
        </div>
        <p>새 항목 등록하기</p>
      </button>
    </div>
  );
};
