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
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import styles from './All.module.scss';
import {
  toggleAddModalSelector,
  toggleDetailModalSelector,
} from 'recoil/selector';
import { Detail } from 'components/Modal/Detail/Detail';

export const All = () => {
  const transactionList = useRecoilValue(transactionListState);
  const setOpenModal = useSetRecoilState(toggleAddModalSelector);
  const resetTransactionList = useResetRecoilState(transactionState);
  const [clickedExpenseCard, setClickedExpenseCard] = useRecoilState(
    clickedExpenseIndexState
  );
  const setIsOpenDetailModal = useSetRecoilState(toggleDetailModalSelector);

  const isOpenDetailModal = useRecoilValue(isOpenDetailModalState);

  return (
    <div className={styles.container}>
      <ul className={styles.expenseItemList}>
        {transactionList.map(({ id, date, list }) => (
          <li
            key={id}
            className={styles.expenseItem}
            onClick={() => {
              setClickedExpenseCard(id);
              setIsOpenDetailModal();
            }}
          >
            {clickedExpenseCard === id && isOpenDetailModal && <Detail />}
            {list.map(({ items }) => (
              <>
                <div className={styles.info}>
                  <div className={styles.date}>
                    {date.toLocaleString('ko-KR', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </div>
                  <div className={styles.title}>{list[0].title}</div>
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
          setOpenModal();
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
