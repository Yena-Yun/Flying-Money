import { useRecoilState, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { AOpen, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { All, ByDate, ByWeek } from 'components/TabMenu';
import { Const } from 'utils';
import styles from './TabMenuLayout.module.scss';

export const TabMenu = () => {
  const setCloseByDateCalendar = useSetRecoilState(
    AOpen.isOpenByDateCalendarState
  );
  const setOpenTagModal = useSetRecoilState(SOpen.toggleModalSelector);
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
            }}
          >
            {name}
          </li>
        ))}
        <button
          className={styles.manageTagButton}
          onClick={() => setOpenTagModal('tagModal')}
        >
          태그 관리
        </button>
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
