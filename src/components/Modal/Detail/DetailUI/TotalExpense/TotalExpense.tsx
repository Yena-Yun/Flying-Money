import { Hook } from 'utils';
import styles from './TotalExpense.module.scss';

type TotalExpenseType = {
  total: number;
};

export const TotalExpense = ({ total }: TotalExpenseType) => {
  return (
    <div className={styles.totalExpense}>
      <span>Total</span>&nbsp;
      {Hook.formatMoney(total)}
    </div>
  );
};
