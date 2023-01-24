import { useRecoilValue, useSetRecoilState } from 'recoil';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { isOpenModalState } from 'recoil/atom';
import { openModalSelector } from 'recoil/selector';
import { Header } from 'components/Header/Header';
import { Main } from 'components/Main/Main';
import { MainList } from 'components/MainList/MainList';
import { ModalTest } from 'components/Modal/Modal';
import styles from './Home.module.scss';

export const Home = () => {
  const isOpenModal = useRecoilValue(isOpenModalState);
  const setOpenModal = useSetRecoilState(openModalSelector);

  return (
    <>
      {isOpenModal && <ModalTest />}
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
