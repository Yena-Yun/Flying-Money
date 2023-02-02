import { useRecoilState, useRecoilValue } from 'recoil';
import {
  clickedExpenseIndexState,
  isOpenDetailModalState,
  isOpenModalState,
} from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { Modal } from 'components/Modal/Modal';
import { TabMenu } from 'components/TabMenuList/Layout/TabMenu';
import styles from './Home.module.scss';
import { Detail } from 'components/Modal/Detail/Detail';
import { toggleDetailModalSelector } from 'recoil/selector';

export const Home = () => {
  const isOpenModal = useRecoilValue(isOpenModalState);
  const clickedExpenseCard = useRecoilValue(clickedExpenseIndexState);
  const [isOpenDetailModal, setIsOpenDetailModal] = useRecoilState(
    isOpenDetailModalState
  );

  return (
    <>
      {isOpenModal && <Modal />}
      {clickedExpenseCard !== '' && isOpenDetailModal && <Detail />}
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
