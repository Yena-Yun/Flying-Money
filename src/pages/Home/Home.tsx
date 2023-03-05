import { useRecoilValue } from 'recoil';
import { AOpen, AIndex } from 'recoil/atom';
import { Banner, Header } from 'components/Main';
import { TabMenu } from 'components/TabMenu';
import { AddModal, AllDetailModal, ByDateDetailModal } from 'components/Modal';
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
      {isOpenAddModal && <AddModal />}
      {clickedIndex && isOpenDetailModal && <AllDetailModal />}
      {clickedItemIndex && isOpenByDateDetailModal && <ByDateDetailModal />}

      <div className={styles.container}>
        <Header />
        <div className={styles.innerContainer}>
          <Banner />
          <TabMenu />
        </div>
      </div>
    </>
  );
};
