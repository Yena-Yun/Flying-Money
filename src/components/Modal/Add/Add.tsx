import { useEffect, useRef } from 'react';
import {
  useRecoilValue,
  useSetRecoilState,
  useRecoilState,
  useResetRecoilState,
} from 'recoil';
import {
  itemState,
  isOpenCalendarState,
  listState,
  transactionState,
} from 'recoil/atom';
import {
  addTransactionListSelector,
  addListToTransactionSelector,
  toggleModalSelector,
} from 'recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import { Date } from './Date/Date';
import { Title } from './Title/Title';
import { List } from './List/List';
import { Calendar } from 'components/Calendar/Calendar';
import { ItemType } from 'types/types';
import styles from './Add.module.scss';

export const Add = () => {
  const setCloseModal = useSetRecoilState(toggleModalSelector);
  const isOpenCalender = useRecoilValue(isOpenCalendarState);

  const items = useRecoilValue<ItemType[]>(itemState);
  const resetItems = useResetRecoilState(itemState);

  const [list, setList] = useRecoilState(listState);
  const setListToTransactionList = useSetRecoilState(
    addListToTransactionSelector
  );

  const setTransactionToTransactionList = useSetRecoilState(
    addTransactionListSelector
  );
  const resetTransaction = useResetRecoilState(transactionState);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length < 2) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  return (
    <ModalLayout modalRole='add'>
      {isOpenCalender && <Calendar />}
      <h2 className={styles.title}>항목 등록하기</h2>

      <div className={styles.mainContainer}>
        <Date />
        <Title />
        <List />
        <div ref={bottomRef} />
      </div>

      <div className={styles.submitButtonWrap}>
        <button
          className={styles.submitButton}
          onClick={() => {
            setList({
              ...list,
              items: items,
            });

            setListToTransactionList();
            setTransactionToTransactionList();

            resetItems();
            resetTransaction();

            setCloseModal('add');
          }}
        >
          등록
        </button>
      </div>
    </ModalLayout>
  );
};
