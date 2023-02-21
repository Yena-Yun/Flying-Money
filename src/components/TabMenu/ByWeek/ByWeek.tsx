import { useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import styles from './ByWeek.module.scss';
import { Header } from './Header/Header';
import { toggleCalendarSelector } from 'recoil/selector';

export const ByWeek = () => {
  const setToggleCalendar = useSetRecoilState(toggleCalendarSelector);

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setToggleCalendar('byWeek')}
      ></div>
      <div className={styles.container}>
        <Header />

        <div className={classnames(styles.inputGroup, styles.totalExpense)}>
          <h3 className={styles.subTitle}>총 지출</h3>
          <div className={styles.expense}>기간 내 지출 금액</div>
        </div>
      </div>
    </>
  );
};
