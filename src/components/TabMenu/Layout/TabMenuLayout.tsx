import { useTransition } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { AOpen, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { All, ByDate, ByWeek } from 'components/TabMenu';
import { Const } from 'utils';
import { TabMenuIdType } from 'types/tabMenuType';
import styles from './TabMenuLayout.module.scss';

export const TabMenu = () => {
  const [isPending, startTransition] = useTransition();
  const setCloseByDateCalendar = useSetRecoilState(
    AOpen.isOpenByDateCalendarState
  );
  const setOpenTagModal = useSetRecoilState(SOpen.toggleModalSelector);
  const [clickedTabName, setClickedTabName] = useRecoilState(
    AIndex.clickedTabNameState
  );

  const tabClickHandler = (id: TabMenuIdType) => {
    startTransition(() => {
      setClickedTabName(id);
    });

    setCloseByDateCalendar(false);
  };

  const RENDER_BY_TAB = {
    byAll: <All />,
    byWeek: <ByWeek />,
    byDate: <ByDate />,
  };

  return (
    <section className={styles.showExpenseList}>
      <ul className={styles.filterTabList}>
        {Const.TAB_MENU.map(({ id, name }) => (
          <li
            key={id}
            className={classnames(
              styles.filterTabItem,
              clickedTabName === id && styles.selected,
              isPending && styles.blur
            )}
            onClick={() => tabClickHandler(id)}
          >
            {name}
          </li>
        ))}
        <button
          className={styles.tagManageButton}
          onClick={() => setOpenTagModal('tagModal')}
        >
          태그 관리
        </button>
      </ul>
      {RENDER_BY_TAB[clickedTabName as keyof typeof RENDER_BY_TAB]}
    </section>
  );
};
