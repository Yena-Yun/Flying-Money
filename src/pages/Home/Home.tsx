import { useRecoilValue } from 'recoil';
import * as A from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { Add } from 'components/Modal/Add/Add';
import { Detail } from 'components/Modal/Detail/Detail';
import { TabMenu } from 'components/TabMenu/Layout/TabMenuLayout';
import { ByDateDetail } from 'components/TabMenu/ByDate/Detail/Detail';
import styles from './Home.module.scss';

export const Home = () => {
  const isOpenAddModal = useRecoilValue(A.isOpenAddModalState);
  const isOpenDetailModal = useRecoilValue(A.isOpenDetailModalState);
  const isOpenByDateDetailModal = useRecoilValue(
    A.isOpenByDateDetailModalState
  );
  const clickedIndex = useRecoilValue(A.clickedIndexState);
  const clickedItemIndex = useRecoilValue(A.clickedItemIndexState);

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
