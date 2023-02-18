import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { itemState, isOpenCalendarState } from 'recoil/atom';
import { ModalLayout } from '../Layout/ModalLayout';
import { Date } from './Date/Date';
import { Title } from './Title/Title';
import { List } from './List/List';
import { SubmitBtn } from './SubmitBtn/SubmitBtn';
import { Calendar } from 'components/Calendar/Calendar';
import { ItemType } from 'types/types';
import styles from './Add.module.scss';

export const Add = () => {
  const isOpenCalender = useRecoilValue(isOpenCalendarState);
  const items = useRecoilValue<ItemType[]>(itemState);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length < 2) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  return (
    <ModalLayout role='add'>
      {isOpenCalender && <Calendar />}
      <h2 className={styles.title}>항목 등록하기</h2>

      <div className={styles.mainContainer}>
        <Date />
        <Title />
        <List />
        <div ref={bottomRef} />
      </div>

      <SubmitBtn />
    </ModalLayout>
  );
};
