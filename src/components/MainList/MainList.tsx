import { useRecoilValue, useRecoilState } from 'recoil';
import classnames from 'classnames';
import { clickedTabState, transactionState } from 'recoil/atom';
import styles from './MainList.module.scss';

export const MainList = () => {
  const [clickedTab, setClickedTab] = useRecoilState(clickedTabState);
  const transaction = useRecoilValue(transactionState);

  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        <li
          id='all'
          className={classnames(
            styles.filterTabItem,
            clickedTab === 'all' && styles.selected
          )}
          onClick={(e) => setClickedTab(e.currentTarget.id)}
        >
          전체
        </li>
        <li
          id='byTag'
          className={classnames(
            styles.filterTabItem,
            clickedTab === 'byTag' && styles.selected
          )}
          onClick={(e) => setClickedTab(e.currentTarget.id)}
        >
          태그별
        </li>
      </ul>
      <ul className={styles.expenseItemList}>
        <li className={styles.expenseItem}>
          <div className={styles.info}>
            <div className={styles.date}>
              {transaction.date.toLocaleString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </div>
            <div className={styles.title}>{transaction.title}</div>
            <div className={styles.name}>
              {transaction.items.name !== '' && '•'} {transaction.items.name}
            </div>
          </div>
          <div className={styles.price}>{transaction.items.price}</div>
        </li>
      </ul>
    </section>
  );
};
