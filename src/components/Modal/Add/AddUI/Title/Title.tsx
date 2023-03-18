import { useRecoilState } from 'recoil';
import { AMain } from 'recoil/atom';
import styles from './Title.module.scss';

export const Title = () => {
  const [list, setList] = useRecoilState(AMain.listState);

  const handleAddTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setList({
      ...list,
      title: e.target.value,
    });
  };

  return (
    <div className={styles.titleWrap}>
      <h3 className={styles.subTitle}>제목</h3>
      <input
        className={styles.inputItem}
        placeholder='제목을 입력해주세요.'
        autoFocus
        onChange={handleAddTitle}
      />
    </div>
  );
};
