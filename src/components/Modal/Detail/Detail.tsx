import { useRecoilValue, useSetRecoilState } from 'recoil';
import { clickedIndexState, transactionListState } from 'recoil/atom';
import {
  deleteTransactionListSelector,
  toggleModalSelector,
} from 'recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import { formatDate } from 'hooks/formatDate';
import styles from './Detail.module.scss';

export const Detail = () => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const transactionList = useRecoilValue(transactionListState);
  const clickedIndex = useRecoilValue(clickedIndexState);
  const setDeleteTransaction = useSetRecoilState(deleteTransactionListSelector);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedIndex
  )!;

  const confirmTransaction = () => {
    setCloseModal('detail');
  };

  const deleteTransaction = () => {
    setDeleteTransaction();
    setCloseModal('detail');
  };

  return (
    <ModalLayout modalRole='detail'>
      <h2 className={styles.modalTitle}>상세</h2>

      <div className={styles.mainContainer}>
        {lists.map(({ id, title, items }) => (
          <div key={id}>
            <div className={styles.header}>
              <div className={styles.title}>{title}</div>
              <div className={styles.date}>{formatDate(date)}</div>
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
        ))}
      </div>

      <div className={styles.actionButtonContainer}>
        <button className={styles.confirmButton} onClick={confirmTransaction}>
          확인
        </button>
        <button className={styles.deleteButton} onClick={deleteTransaction}>
          삭제
        </button>
      </div>
    </ModalLayout>
  );
};
