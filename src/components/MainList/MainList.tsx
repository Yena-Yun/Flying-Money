import { useRecoilValue, useRecoilState } from 'recoil';
import classnames from 'classnames';
import { clickedTabState, transactionListState } from 'recoil/atom';
import { TAB_MENU } from 'utils/constants/constants';
import styles from './MainList.module.scss';

export const MainList = () => {
  const [clickedTab, setClickedTab] = useRecoilState(clickedTabState);
  const transactionList = useRecoilValue(transactionListState);

  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        {TAB_MENU.map(({ id, name }) => (
          <li
            key={id}
            id={id}
            className={classnames(
              styles.filterTabItem,
              clickedTab === id && styles.selected
            )}
            onClick={(e) => setClickedTab(e.currentTarget.id)}
          >
            {name}
          </li>
        ))}
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
                {items[0].name !== '' && '•'} {items[0].name}
                {items.length > 1 && ` 외 +${items.length - 1}`}
              </div>
            </div>
            <div className={styles.price}>
              {items.map(({ price }) => price).reduce((acc, cur) => acc + cur)}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
