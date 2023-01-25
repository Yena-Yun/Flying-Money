import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import classnames from 'classnames';
import uuid4 from 'uuid4';
import { toggleTagPopupSelector } from 'recoil/selector';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setCloseTagPopup()}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.inputGroup}>
              <div className={styles.inputItem}>
                <input id='title' placeholder='태그를 입력해주세요.' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
