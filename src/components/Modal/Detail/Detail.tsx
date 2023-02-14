import { useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedExpenseIndexState, transactionListState } from 'recoil/atom';
import {
  deleteTransactionListSelector,
  toggleModalSelector,
} from 'recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import styles from './Detail.module.scss';

export const Detail = () => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const transactionList = useRecoilValue(transactionListState);
  const clickedExpenseCard = useRecoilValue(clickedExpenseIndexState);
  const setDeleteTransaction = useSetRecoilState(deleteTransactionListSelector);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedExpenseCard
  )!;

  return (
    <ModalLayout modalRole='detail'>
      <h2 className={styles.modalTitle}>상세</h2>

      <div className={styles.mainContainer}>
        {lists.map(({ title, items }) => (
          <>
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
          </>
        ))}
      </div>

      <div className={styles.actionButtonContainer}>
        <button
          className={styles.confirmButton}
          onClick={() => setCloseModal('detail')}
        >
          확인
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => {
            setDeleteTransaction();
            setCloseModal('detail');
          }}
        >
          삭제
        </button>
      </div>
    </ModalLayout>
  );
};
