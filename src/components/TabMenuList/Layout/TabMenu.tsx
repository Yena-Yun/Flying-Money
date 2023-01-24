import { useRecoilState } from 'recoil';
import classnames from 'classnames';
import { clickedTabState } from 'recoil/atom';
import { TAB_MENU } from 'utils/constants/constants';
import styles from './TabMenu.module.scss';
import { All } from '../All/All';
import { ByWeek } from '../ByWeek/ByWeek';
import { ByDate } from '../ByDate/ByDate';
import { ByTag } from '../ByTag/ByTag';

export const TabMenu = () => {
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

      {clickedTab === 'all' ? (
        <All />
      ) : clickedTab === 'byWeek' ? (
        <ByWeek />
      ) : clickedTab === 'byDate' ? (
        <ByDate />
      ) : clickedTab === 'byTag' ? (
        <ByTag />
      ) : null}
    </section>
  );
};
