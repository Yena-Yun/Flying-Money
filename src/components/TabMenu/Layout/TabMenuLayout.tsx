import { useRecoilState, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { AOpen, AIndex } from 'recoil/atom';
import { All, ByDate, ByWeek } from 'components/TabMenu';
import { Const } from 'utils';
import styles from './TabMenuLayout.module.scss';
import { TabMenuIdType } from 'types/tabMenuType';

export const TabMenu = () => {
  const setCloseByDateCalendar = useSetRecoilState(
    AOpen.isOpenByDateCalendarState
  );
  const [clickedTabName, setClickedTabName] = useRecoilState(
    AIndex.clickedTabNameState
  );

  const tabMenuHandler = (id: TabMenuIdType) => {
    setClickedTabName(id);
    setCloseByDateCalendar(false);
  };

  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        {Const.TAB_MENU.map(({ id, name }) => (
          <li
            key={id}
            className={classnames(
              styles.filterTabItem,
              clickedTabName === id && styles.selected
            )}
            onClick={() => tabMenuHandler(id)}
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
      ) : null}
    </section>
  );
};
