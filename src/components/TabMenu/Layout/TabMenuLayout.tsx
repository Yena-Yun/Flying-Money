import { useRecoilState, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { AOpen, AIndex } from 'recoil/atom';
import { All } from '../All/All';
import { ByWeek } from '../ByWeek/ByWeek';
import { ByDate } from '../ByDate/ByDate';
import { ByTag } from '../ByTag/ByTag';
import { Const } from 'utils';
import styles from './TabMenuLayout.module.scss';

export const TabMenu = () => {
  const setCloseByDateCalendar = useSetRecoilState(
    AOpen.isOpenByDateCalendarState
  );
  const setCloseByWeekCalendar = useSetRecoilState(
    AOpen.isOpenByWeekCalendarState
  );
  const [clickedTabName, setClickedTabName] = useRecoilState(
    AIndex.clickedTabNameState
  );

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
            onClick={() => {
              setClickedTabName(id);
              setCloseByDateCalendar(false);
              setCloseByWeekCalendar(false);
            }}
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
