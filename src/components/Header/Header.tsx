import { formatHeaderDate } from 'hooks/formatDate';
import { IoWifi, IoBatteryHalfOutline, IoCellular } from 'react-icons/io5';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.time}>{formatHeaderDate(new Date())}</div>
      <div className={styles.status}>
        <div className={styles.wifi}>
          <IoWifi />
        </div>
        <div className={styles.cellular}>
          <IoCellular />
        </div>
        <div className={styles.battery}>
          <IoBatteryHalfOutline />
        </div>
      </div>
    </div>
  );
};
