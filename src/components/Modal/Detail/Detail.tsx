import { useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedExpenseCardState, transactionListState } from 'recoil/atom';
import { toggleDetailModalSelector } from 'recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import styles from './Detail.module.scss';

export const Detail = () => {
  const setCloseDetailModal = useSetRecoilState(toggleDetailModalSelector);
  const transactionList = useRecoilValue(transactionListState);
  const clickedExpenseCard = useRecoilValue(clickedExpenseCardState);

  const { date, title, items } = transactionList.filter(
    ({ id }) => id === clickedExpenseCard
  )[0];

  return (
    <ModalLayout modalRole='detail'>
      <h2 className={styles.modalTitle}>상세</h2>

      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.date}>
            {date.toLocaleString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </div>
        </div>
        <div className={styles.info}>
          {items.map(({ id, name, tag, price }) => (
            <div key={id} className={styles.nameTagGroup}>
              <div className={styles.name}>
                {name !== '' && '-'} &nbsp; {name}
              </div>
              <div className={styles.tag}>{tag}</div>
              <div className={styles.price}>{price}</div>
            </div>
          ))}
        </div>
        <div className={styles.total}>
          {items.map(({ price }) => price).reduce((acc, cur) => acc + cur)}
        </div>
      </div>

      <div className={styles.confirmButtonContainer}>
        <button
          className={styles.confirmButton}
          onClick={() => setCloseDetailModal()}
        >
          확인
        </button>
      </div>
    </ModalLayout>
  );
};
