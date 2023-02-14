import { useRecoilValue } from 'recoil';
import {
  clickedExpenseIndexState,
  isOpenDetailModalState,
  isOpenModalState,
} from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { TabMenu } from 'components/TabMenuList/Layout/TabMenu';
import styles from './Home.module.scss';
import { Detail } from 'components/Modal/Detail/Detail';
import { Add } from 'components/Modal/Add/Add';

export const Home = () => {
  const isOpenModal = useRecoilValue(isOpenModalState);
  const clickedExpenseIndex = useRecoilValue(clickedExpenseIndexState);
  const isOpenDetailModal = useRecoilValue(isOpenDetailModalState);

  return (
    <>
      {isOpenModal && <Add />}
      {clickedExpenseIndex !== '' && isOpenDetailModal && <Detail />}
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
