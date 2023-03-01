import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { AMain, AOpen } from 'recoil/atom';
import { ModalLayout } from '../Layout/ModalLayout';
import { Calendar } from 'components/Calendar/Calendar';
import { AddModalDate } from './Date/Date';
import { Title } from './Title/Title';
import { List } from './List/List';
import { SubmitBtn } from './SubmitBtn/SubmitBtn';
import { TMain } from 'types';
import styles from './Add.module.scss';

export const Add = () => {
  const items = useRecoilValue<TMain.ItemType[]>(AMain.itemState);
  const isOpenCalender = useRecoilValue(AOpen.isOpenCalendarState);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length < 2) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  return (
    <ModalLayout role='addModal'>
      {isOpenCalender && <Calendar />}
      <h2 className={styles.title}>항목 등록하기</h2>

      <div className={styles.mainContainer}>
        <AddModalDate />
        <Title />
        <List />
        <div ref={bottomRef} />
      </div>

      <SubmitBtn />
    </ModalLayout>
  );
};
