import { useRecoilValue } from 'recoil';
import {
  clickedIndexState,
  isOpenDetailModalState,
  isOpenAddModalState,
  clickedItemIndexState,
  isOpenByDateDetailModalState,
} from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { TabMenu } from 'components/TabMenuList/Layout/TabMenu';
import styles from './Home.module.scss';
import { Detail } from 'components/Modal/Detail/Detail';
import { Detail as ByDateDetail } from 'components/TabMenuList/ByDate/Detail/Detail';
import { Add } from 'components/Modal/Add/Add';

export const Home = () => {
  const isOpenAddModal = useRecoilValue(isOpenAddModalState);
  const isOpenDetailModal = useRecoilValue(isOpenDetailModalState);
  const isOpenByDateDetailModal = useRecoilValue(isOpenByDateDetailModalState);
  const clickedIndex = useRecoilValue(clickedIndexState);
  const clickedItemIndex = useRecoilValue(clickedItemIndexState);

  return (
    <>
      {isOpenAddModal && <Add />}
      {clickedIndex && isOpenDetailModal && <Detail />}
      {clickedItemIndex && isOpenByDateDetailModal && <ByDateDetail />}
      <div className={styles.container}>
        <Header />
        <div className={styles.innerContainer}>
          <Main />
          <TabMenu />
        </div>
      </div>
    </>
  );
};
