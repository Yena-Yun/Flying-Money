import { useRecoilValue } from 'recoil';
import {
  clickedExpenseIndexState,
  isOpenDetailModalState,
  isOpenAddModalState,
} from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { TabMenu } from 'components/TabMenuList/Layout/TabMenu';
import styles from './Home.module.scss';
import { Detail } from 'components/Modal/Detail/Detail';
import { Add } from 'components/Modal/Add/Add';

export const Home = () => {
  const isOpenAddModal = useRecoilValue(isOpenAddModalState);
  const clickedIndex = useRecoilValue(clickedExpenseIndexState);
  const isOpenDetailModal = useRecoilValue(isOpenDetailModalState);

  return (
    <>
      {isOpenAddModal && <Add />}
      {clickedIndex !== '' && isOpenDetailModal && <Detail />}
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
