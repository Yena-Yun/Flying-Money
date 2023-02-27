import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Main, Open, Index } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from '../../../Modal/Layout/ModalLayout';
import { Toast } from '../../../Modal/Toast/Toast';
import { Hook } from 'utils';
import styles from './Detail.module.scss';

export const Detail = () => {
  const isOpenToast = useRecoilValue(Open.isOpenToastState);
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const transactionList = useRecoilValue(Main.transactionListState);
  const clickedIndex = useRecoilValue(Index.clickedIndexState);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedIndex
  )!;

  return (
    <>
      {isOpenToast && <Toast role='detail' />}
      <ModalLayout role='detail'>
        <h2 className={styles.modalTitle}>상세</h2>
        <div className={styles.date}>{Hook.formatDate(date)}</div>

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
                    <div className={styles.price}>
                      {Hook.formatMoney(price)}
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.total}>
                Total&nbsp;
                <span>
                  {Hook.formatMoney(
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
