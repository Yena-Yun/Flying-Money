import { useRecoilValue } from 'recoil';
import { AMain } from 'recoil/atom';
import { Hook } from 'utils';
import { TTab } from 'types';
import styles from './TotalExpense.module.scss';

type TotalExpenseProp = {
  role: TTab.TabMenuIdType;
};
export const TotalExpense = ({ role }: TotalExpenseProp) => {
  const allTotal = useRecoilValue(AMain.totalPerDateAllState);
  const byDateTotal = useRecoilValue(AMain.totalPerListState);

  return (
    <div className={styles.totalExpense}>
      <span>Total</span>&nbsp;
      {Hook.formatMoney(role === 'byAll' ? allTotal : byDateTotal)}
    </div>
  );
};
