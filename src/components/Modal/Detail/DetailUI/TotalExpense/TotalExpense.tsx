import { useRecoilValue } from 'recoil';
import { AMain } from 'recoil/atom';
import { Hook } from 'utils';
import styles from './TotalExpense.module.scss';

type TotalExpenseProp = {
  where: 'all' | 'byDate';
};
export const TotalExpense = ({ where }: TotalExpenseProp) => {
  const allTotal = useRecoilValue(AMain.totalPerDateAllState);
  const byDateTotal = useRecoilValue(AMain.totalPerListState);

  return (
    <div className={styles.totalExpense}>
      <span>Total</span>&nbsp;
      {Hook.formatMoney(where === 'all' ? allTotal : byDateTotal)}
    </div>
  );
};
