import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tagGroupState, transactionListState } from 'recoil/atom';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

import styles from './All.module.scss';
import { openModalSelector } from 'recoil/selector';

export const All = () => {
  const transactionList = useRecoilValue(transactionListState);
  const tags = useRecoilValue(tagGroupState);
  const setOpenModal = useSetRecoilState(openModalSelector);

  return (
    <div className={styles.container}>
      <ul className={styles.expenseItemList}>
        {transactionList.map(({ id, date, title, items }) => (
          <li key={id} className={styles.expenseItem}>
            <div className={styles.info}>
              <div className={styles.date}>
                {date.toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                })}
              </div>
              <div className={styles.title}>{title}</div>
              <div className={styles.name}>
                {items[0].name !== '' && '•'} {items[0].name}
                {items.length > 1 && ` 외 +${items.length - 1}`}
              </div>
            </div>
            <div className={styles.priceTagGroup}>
              <div className={styles.tagGroup}>
                {tags.map(({ id, name }) => (
                  <div key={id} className={styles.tag}>
                    {name}
                  </div>
                ))}
              </div>
              <div className={styles.price}>
                {items
                  .map(({ price }) => price)
                  .reduce((acc, cur) => acc + cur)}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button
        className={styles.addNewItemButton}
        onClick={() => setOpenModal()}
      >
        <div className={styles.addNewItemIcon}>
          <HiOutlinePlusCircle />
        </div>
        <p>새 항목 등록하기</p>
      </button>
    </div>
  );
};
