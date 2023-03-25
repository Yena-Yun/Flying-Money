import { RANDOM_PHRASES } from 'utils/constants';
import styles from './Banner.module.scss';

export const Banner = () => {
  const { line1, line2 } =
    RANDOM_PHRASES[Math.floor(Math.random() * RANDOM_PHRASES.length)];

  return (
    <div className={styles.container}>
      <div className={styles.titleHeader}>
        <h1 className={styles.title}>Flying Money</h1>
      </div>
      <picture className={styles.mainImageContainer}>
        <source
          type='image/webp'
          srcSet='images/logo.webp'
          media='all and (min-width: 768px)'
        />
        <source
          type='image/webp'
          srcSet='images/logo.jpg'
          media='all and (min-width: 768px)'
        />
        <img className={styles.mainImage} src='images/logo.jpg' alt='logo' />
      </picture>
      <div className={styles.randomPhrases}>
        <p>{line1}</p>
        <p>{line2}</p>
      </div>
    </div>
  );
};
