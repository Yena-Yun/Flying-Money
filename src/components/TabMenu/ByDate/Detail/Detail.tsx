import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  clickedIndexState,
  clickedItemIndexState,
  isOpenToastState,
  transactionListState,
} from 'recoil/atom';
import { toggleModalSelector, toggleToastSelector } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { Toast } from 'components/Modal/Toast/Toast';
import styles from './Detail.module.scss';

export const ByDateDetail = () => {
  const isOpenToast = useRecoilValue(isOpenToastState);
  const setIsOpenToast = useSetRecoilState(toggleToastSelector);
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const transactionList = useRecoilValue(transactionListState);
  const clickedIndex = useRecoilValue(clickedIndexState);
  const clickedItemIndex = useRecoilValue(clickedItemIndexState);

  const { lists } = transactionList.find(({ id }) => id === clickedIndex)!;
  const { title, items } = lists.find(({ id }) => id === clickedItemIndex)!;

  const confirmTransaction = () => {
    setCloseModal('byDateDetail');
  };

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
                  {name !== '' && '-'} &nbsp; {name}
                </div>
                {tag && <div className={styles.tag}>{tag}</div>}
              </div>
              <div className={styles.price}>{price}</div>
            </div>
          ))}
          <div className={styles.total}>
            {items.map(({ price }) => price).reduce((acc, cur) => acc + cur)}
          </div>
        </div>

        <div className={styles.actionButtonContainer}>
          <button className={styles.confirmButton} onClick={confirmTransaction}>
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
