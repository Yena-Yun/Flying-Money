import { Header } from 'components/Header/Header';
import { HiOutlinePlusCircle } from 'react-icons/hi2';
import { Main } from 'components/Main/Main';
import { MainList } from 'components/MainList/MainList';
import styles from './Home.module.scss';

export const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <Header />
        <Main />
        <MainList />
        <article className={styles.addNewItemButton}>
          <button onClick={() => {}}>
            <div className={styles.addNewItemIcon}>
              <HiOutlinePlusCircle />
            </div>
            <p>새 항목 등록하기</p>
          </button>
        </article>
      </div>
    </div>
  );
};
