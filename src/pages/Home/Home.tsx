import { Header } from 'components/Header/Header';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Main } from 'components/Main/Main';
import { MainList } from 'components/MainList/MainList';
import styles from './Home.module.scss';
import { openModalSelector } from 'recoil/selector';
import { isOpenModalState } from 'recoil/atom';
import { Modal } from 'components/Modal/Modal';

export const Home = () => {
  const isOpenModal = useRecoilValue(isOpenModalState);
  const setOpenModal = useSetRecoilState(openModalSelector);

  return (
    <>
      {isOpenModal && <Modal />}
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Header />
          <Main />
          <MainList />
          <button
            className={styles.addNewItemButton}
            onClick={() => setOpenModal()}
          >
            <div className={styles.addNewItemIcon}>
              <HiOutlinePlusCircle />
            </div>
            <p>새 항목 등록하기</p>
          </button>
        </div>
      </div>
    </>
  );
};
