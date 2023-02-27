import { useRecoilValue } from 'recoil';
import { Open, Index } from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { Add } from 'components/Modal/Add/Add';
import { Detail } from 'components/Modal/Detail/Detail';
import { TabMenu } from 'components/TabMenu/Layout/TabMenuLayout';
import { ByDateDetail } from 'components/TabMenu/ByDate/Detail/Detail';
import styles from './Home.module.scss';

export const Home = () => {
  const isOpenAddModal = useRecoilValue(Open.isOpenAddModalState);
  const isOpenDetailModal = useRecoilValue(Open.isOpenDetailModalState);
  const isOpenByDateDetailModal = useRecoilValue(
    Open.isOpenByDateDetailModalState
  );
  const clickedIndex = useRecoilValue(Index.clickedIndexState);
  const clickedItemIndex = useRecoilValue(Index.clickedItemIndexState);

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
