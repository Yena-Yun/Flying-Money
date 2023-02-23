import { RANDOM_PHRASES } from 'utils/constants/constants';
import styles from './Main.module.scss';

export const Main = () => {
  const { line1, line2 } =
    RANDOM_PHRASES[Math.floor(Math.random() * RANDOM_PHRASES.length)];

  return (
    <div className={styles.container}>
      <div className={styles.titleHeader}>
        <h1 className={styles.title}>Flying Money</h1>
      </div>
      <figure className={styles.mainImageContainer}>
        <img src={'/images/flying_money.png'} alt='main' />
      </figure>
      <div className={styles.randomPhrases}>
        <p>{line1}</p>
        <p>{line2}</p>
      </div>
    </div>
  );
};
