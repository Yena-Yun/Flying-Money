import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './MainList.module.scss';

export const MainList = () => {
  const [clickedTab, setClickedTab] = useState('');

  const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setClickedTab('');
    const { id } = e.currentTarget;
    setClickedTab(id);
  };

  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        <li
          id='all'
          className={classnames(
            styles.filterTabItem,
            clickedTab === 'all' && styles.selected
          )}
          onClick={handleTabClick}
        >
          전체
        </li>
        <li
          id='byTag'
          className={classnames(
            styles.filterTabItem,
            clickedTab === 'byTag' && styles.selected
          )}
          onClick={handleTabClick}
        >
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
      </ul>
    </section>
  );
};
