import { useRecoilValue } from 'recoil';
import { AOpen, AIndex } from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { Add } from 'components/Modal/Add/Add';
import { Detail } from 'components/TabMenu/All/Detail/Detail';
import { TabMenu } from 'components/TabMenu/Layout/TabMenuLayout';
import { ByDateDetail } from 'components/TabMenu/ByDate/Detail/Detail';
import styles from './Home.module.scss';

export const Home = () => {
  const isOpenAddModal = useRecoilValue(AOpen.isOpenAddModalState);
  const isOpenDetailModal = useRecoilValue(AOpen.isOpenDetailModalState);
  const isOpenByDateDetailModal = useRecoilValue(
    AOpen.isOpenByDateDetailModalState
  );
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);
  const clickedItemIndex = useRecoilValue(AIndex.clickedItemIndexState);

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
