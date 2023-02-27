import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Main, Open, Index } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { Toast } from 'components/Modal/Toast/Toast';
import styles from './Detail.module.scss';
import { Hook } from 'utils';

export const ByDateDetail = () => {
  const isOpenToast = useRecoilValue(Open.isOpenToastState);
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);
  const transactionList = useRecoilValue(Main.transactionListState);
  const clickedIndex = useRecoilValue(Index.clickedIndexState);
  const clickedItemIndex = useRecoilValue(Index.clickedItemIndexState);

  const { lists } = transactionList.find(({ id }) => id === clickedIndex)!;
  const { title, items } = lists.find(({ id }) => id === clickedItemIndex)!;

  return (
    <>
      {isOpenToast && <Toast role='byDateDetail' />}
      <ModalLayout role='byDateDetail'>
        <h2 className={styles.modalTitle}>상세</h2>

        <div className={styles.mainContainer}>
          <div className={styles.title}>{title}</div>
          {items.map(({ id, name, tag, price }) => (
            <div key={id} className={styles.info}>
              <div className={styles.nameTagGroup}>
                <div className={styles.name}>
                  {name !== '' && '‣'} &nbsp; {name}
                </div>
                {tag && <div className={styles.tag}>{tag}</div>}
              </div>
              <div className={styles.price}>{Hook.formatMoney(price)}</div>
            </div>
          ))}
          <div className={styles.totalExpense}>
            <span>Total</span>&nbsp;
            {Hook.formatMoney(
              items.map(({ price }) => price).reduce((acc, cur) => acc + cur, 0)
            )}
          </div>
        </div>

        <div className={styles.actionButtonContainer}>
          <button
            className={styles.confirmButton}
            onClick={() => {
              setCloseModal('byDateDetail');
            }}
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
