import { useRecoilValue } from 'recoil';
import { transactionListState } from 'recoil/atom';
import { TabMenu } from '../Layout/TabMenu';
import styles from './All.module.scss';

export const All = () => {
  const transactionList = useRecoilValue(transactionListState);

  return (
    <TabMenu>
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
    </TabMenu>
  );
};
