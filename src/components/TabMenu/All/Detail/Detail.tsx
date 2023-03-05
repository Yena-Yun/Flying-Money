import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain, AOpen, AIndex } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import { Toast } from 'components/Modal/Toast/Toast';
import { Hook } from 'utils';
import styles from './Detail.module.scss';
import classNames from 'classnames';

export const Detail = () => {
  const isOpenToast = useRecoilValue(AOpen.isOpenToastState);
  const transactionList = useRecoilValue(AMain.transactionListState);
  const clickedIndex = useRecoilValue(AIndex.clickedIndexState);
  const totalExpense = useRecoilValue(AMain.totalPerDateAllState);
  const setIsOpenToast = useSetRecoilState(SOpen.toggleToastSelector);
  const setCloseModal = useSetRecoilState(SOpen.toggleModalSelector);

  const { date, lists } = transactionList.find(
    ({ id }) => id === clickedIndex
  )!;

  return (
    <>
      {isOpenToast && <Toast role='detail' />}
      <ModalLayout role='allDetail'>
        <div className={styles.date}>{Hook.formatDate(date)}</div>

        <div className={styles.mainContainer}>
          {lists.map(({ id, title, items }) => (
            <div key={id}>
              <div className={styles.title}>{title}</div>
              {items.map(({ id, name, tag, price }) => (
                <div key={id} className={styles.info}>
                  <div className={styles.nameTagGroup}>
                    <div className={styles.name}>
                      {name !== '' && '‣'} &nbsp; {name}&nbsp;
                    </div>
                    {tag && <div className={styles.tag}>{tag}</div>}
                  </div>
                  <div className={styles.price}>{Hook.formatMoney(price)}</div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className={styles.totalExpense}>
          <span>Total</span>&nbsp;
          {Hook.formatMoney(totalExpense)}
        </div>

        <div className={styles.actionButtonContainer}>
          <button
            className={classNames(styles.actionButton, styles.confirmButton)}
            onClick={() => setCloseModal('allDetail')}
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
