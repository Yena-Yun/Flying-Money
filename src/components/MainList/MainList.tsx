import { useRecoilValue, useRecoilState } from 'recoil';
import classnames from 'classnames';
import {
  clickedTabState,
  transactionListState,
  transactionState,
} from 'recoil/atom';
import styles from './MainList.module.scss';
import { transactionListSelector } from 'recoil/selector';

export const MainList = () => {
  const [clickedTab, setClickedTab] = useRecoilState(clickedTabState);
  const transactionList = useRecoilValue(transactionListState);

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
                {items.name !== '' && '•'} {items.name}
              </div>
            </div>
            <div className={styles.price}>{items.price}</div>
          </li>
        ))}
      </ul>
    </section>
  );
};
