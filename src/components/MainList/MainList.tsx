import classnames from 'classnames';
import styles from './MainList.module.scss';

export const MainList = () => {
  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        <li className={classnames(styles.filterTabItem, styles.showAll)}>
          전체
        </li>
        <li className={classnames(styles.filterTabItem, styles.showByTag)}>
          태그별
        </li>
      </ul>
      <ul className={styles.expenseItemList}>
        <li className={styles.expenseItem}>
          <div className={styles.info}>
            <div className={styles.date}>
              {new Date()
                .toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit', // 앞에 0 붙여주기
                  day: 'numeric',
                })
                .slice(2)}
            </div>
            <div className={styles.title}>팀별 회식하기</div>
          </div>
          <div className={styles.price}>20,000</div>
        </li>
        <li className={styles.expenseItem}>
          <div className={styles.info}>
            <div className={styles.date}>
              {new Date()
                .toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit', // 앞에 0 붙여주기
                  day: 'numeric',
                })
                .slice(2)}
            </div>
            <div className={styles.title}>팀별 회식하기</div>
          </div>
          <div className={styles.price}>20,000</div>
        </li>
        <li className={styles.expenseItem}>
          <div className={styles.info}>
            <div className={styles.date}>
              {new Date()
                .toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit', // 앞에 0 붙여주기
                  day: 'numeric',
                })
                .slice(2)}
            </div>
            <div className={styles.title}>팀별 회식하기</div>
          </div>
          <div className={styles.price}>20,000</div>
        </li>
      </ul>
    </section>
  );
};
