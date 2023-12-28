import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <img src='images/logo.jpg' alt='logo' />
        </div>
        <h1 className={styles.title}>Flying Money</h1>
      </div>
    </div>
  );
};
