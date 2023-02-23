import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  clickedIndexState,
  isOpenToastState,
  transactionListState,
} from 'recoil/atom';
import { toggleModalSelector, toggleToastSelector } from 'recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import { Toast } from '../Toast/Toast';
import { formatDate } from 'utils/hooks/formatDate';
import styles from './Detail.module.scss';
import { formatMoney } from 'utils/hooks/formatMoney';

export const Detail = () => {
  const isOpenToast = useRecoilValue(isOpenToastState);
  const setIsOpenToast = useSetRecoilState(toggleToastSelector);
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const transactionList = useRecoilValue(transactionListState);
  const clickedIndex = useRecoilValue(clickedIndexState);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedIndex
  )!;

  return (
    <>
      {isOpenToast && <Toast role='detail' />}
      <ModalLayout role='detail'>
        <h2 className={styles.modalTitle}>상세</h2>
        <div className={styles.date}>{formatDate(date)}</div>

        <div className={styles.mainContainer}>
          {lists.map(({ id, title, items }) => (
            <div key={id}>
              <div className={styles.title}>{title}</div>
              <div className={styles.expenseList}>
                {items.map(({ id, name, tag, price }) => (
                  <div key={id} className={styles.expenseItem}>
                    <div className={styles.nameTagGroup}>
                      <div className={styles.name}>
                        {name !== '' && '‣'} &nbsp; {name}&nbsp;
                      </div>
                      {tag && <div className={styles.tag}>{tag}</div>}
                    </div>
                    <div className={styles.price}>{formatMoney(price)}</div>
                  </div>
                ))}
              </div>
              <div className={styles.total}>
                Total&nbsp;
                <span>
                  {formatMoney(
                    items
                      .map(({ price }) => price)
                      .reduce((acc, cur) => acc + cur)
                  )}
                </span>
              </div>
            </div>
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
            onClick={() => setIsOpenToast()}
          >
            삭제
          </button>
        </div>
      </ModalLayout>
    </>
  );
};
