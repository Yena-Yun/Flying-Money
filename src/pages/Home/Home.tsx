import { useRecoilValue } from 'recoil';
import { clickedExpenseCardState, isOpenModalState } from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { Modal } from 'components/Modal/Modal';
import { TabMenu } from 'components/TabMenuList/Layout/TabMenu';
import styles from './Home.module.scss';
import { Detail } from 'components/Modal/Detail/Detail';

export const Home = () => {
  const isOpenModal = useRecoilValue(isOpenModalState);
  const clickedExpenseCard = useRecoilValue(clickedExpenseCardState);

  return (
    <>
      {isOpenModal && <Modal />}
      {clickedExpenseCard && <Detail />}
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
