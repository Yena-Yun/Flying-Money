import React, { useState } from 'react';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';
import styles from './MainList.module.scss';
import { transactionState } from 'recoil/atom';

export const MainList = () => {
  const [clickedTab, setClickedTab] = useState('');
  const transaction = useRecoilValue(transactionState);

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
              {transaction.date.toLocaleString().slice(0, 11)}
            </div>
            <div className={styles.title}>{transaction.title}</div>
            <div className={styles.name}>• {transaction.items.name}</div>
          </div>
          <div className={styles.price}>{transaction.items.price}</div>
        </li>
      </ul>
    </section>
  );
};
