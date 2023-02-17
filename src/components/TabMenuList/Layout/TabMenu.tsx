import { useRecoilState } from 'recoil';
import classnames from 'classnames';
import { clickedTabNameState } from 'recoil/atom';
import { All } from '../All/All';
import { ByWeek } from '../ByWeek/ByWeek';
import { ByDate } from '../ByDate/ByDate';
import { ByTag } from '../ByTag/ByTag';
import { TAB_MENU } from 'utils/constants/constants';
import styles from './TabMenu.module.scss';

export const TabMenu = () => {
  const [clickedTabName, setClickedTabName] =
    useRecoilState(clickedTabNameState);

  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        {TAB_MENU.map(({ id, name }) => (
          <li
            key={id}
            className={classnames(
              styles.filterTabItem,
              clickedTabName === id && styles.selected
            )}
            onClick={() => setClickedTabName(id)}
          >
            {name}
          </li>
        ))}
      </ul>

      {clickedTabName === 'all' ? (
        <All />
      ) : clickedTabName === 'byWeek' ? (
        <ByWeek />
      ) : clickedTabName === 'byDate' ? (
        <ByDate />
      ) : clickedTabName === 'byTag' ? (
        <ByTag />
      ) : null}
    </section>
  );
};
