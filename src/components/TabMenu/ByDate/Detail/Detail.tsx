import { useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { ItemList } from 'components/Detail/ItemList/ItemList';
import { Toast } from 'components/Modal/Toast/Toast';
import { Hook } from 'utils';
import styles from './Detail.module.scss';

export const ByDateDetail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenToastState);
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);

  const transactionList = useRecoilValue(AMain.transactionListState);
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);
  const clickedItemIndex = useRecoilValue(AIndex.clickedItemIndexState);

  const { lists } = transactionList.find(({ id }) => id === clickedIndex)!;
  const { title, items } = lists.find(({ id }) => id === clickedItemIndex)!;

  return (
    <>
      {isOpenToast && <Toast role='byDateDetail' />}
      <ModalLayout role='byDateDetail'>
        <h2 className={styles.modalTitle}>{title}</h2>

        <div className={styles.mainContainer}>
          <ItemList items={items} />
        </div>

        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(
            items.map(({ price }) => price).reduce((acc, cur) => acc + cur, 0)
          )}
        </div>

        <div className={styles.actionButtonContainer}>
          <button
            className={classNames(styles.actionButton, styles.confirmButton)}
            onClick={() => {
              setCloseModal('byDateDetail');
            }}
          >
            확인
          </button>
          <button
            className={classNames(styles.actionButton, styles.deleteButton)}
            onClick={() => setIsOpenToast()}
          >
            삭제
          </button>
        </div>
      </ModalLayout>
    </>
  );
};
