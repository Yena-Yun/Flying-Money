import { WifiIcon, BatteryIcon, CellularIcon } from 'components/Icons';
import { Hook } from 'utils';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.time}>{Hook.formatRootHeaderDate(new Date())}</div>
      <div className={styles.status}>
        <div className={styles.wifi}>
          <WifiIcon />
        </div>
        <div className={styles.cellular}>
          <BatteryIcon />
        </div>
        <div className={styles.battery}>
          <CellularIcon />
        </div>
      </div>
    </div>
  );
};
