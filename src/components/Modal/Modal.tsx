import { Calendar } from 'components/Calendar';
import { useSetRecoilState } from 'recoil';
import { closeModalSelector } from 'recoil/selector';
import styles from './Modal.module.scss';

export const Modal = () => {
  const setCloseModal = useSetRecoilState(closeModalSelector);

  return (
    <>
      <div className={styles.background} onClick={() => setCloseModal()}></div>
      <div className={styles.container}>
        <form className={styles.innerContainer}>
          <div className={styles.date}>
            <Calendar />
          </div>
          <div className={styles.title}>
            <input placeholder='제목/장소' />
          </div>
          <ul className={styles.itemList}>
            <li className={styles.item}>
              <div className={styles.name}>
                <input placeholder='상품/서비스명' />
              </div>
              <div className={styles.price}>
                <input type='number' placeholder='가격' />
              </div>
              <select className={styles.tagSelect}>
                <option value='화장품' />
                <option value='까페' />
                <option value='식당' />
              </select>
            </li>
          </ul>
          <button onClick={() => setCloseModal()}>등록</button>
        </form>
      </div>
    </>
  );
};
