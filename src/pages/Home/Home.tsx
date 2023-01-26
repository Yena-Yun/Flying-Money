import { useRecoilValue } from 'recoil';
import { isOpenModalState } from 'recoil/atom';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { Modal } from 'components/Modal/Modal';
import { TabMenu } from 'components/TabMenuList/Layout/TabMenu';
import styles from './Home.module.scss';

export const Home = () => {
  const isOpenModal = useRecoilValue(isOpenModalState);

  return (
    <>
      {isOpenModal && <Modal />}
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
