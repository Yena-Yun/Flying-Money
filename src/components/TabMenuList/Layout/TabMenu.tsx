import { ReactNode } from 'react';
import { useRecoilState } from 'recoil';
import classnames from 'classnames';
import { clickedTabState } from 'recoil/atom';
import { TAB_MENU } from 'utils/constants/constants';
import styles from './TabMenu.module.scss';

export type TabMenuType = {
  children: ReactNode | ReactNode[];
};

export const TabMenu = ({ children }: TabMenuType) => {
  const [clickedTab, setClickedTab] = useRecoilState(clickedTabState);

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

      {children}
    </section>
  );
};
