import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { AMain, AOpen } from 'recoil/atom';
import { ModalLayout } from '../Layout/ModalLayout';
import { Calendar } from 'components/Calendar/Calendar';
import { Date, Title, List, SubmitBtn } from './AddUI';
import { TMain } from 'types';
import styles from './Add.module.scss';

export const AddModal = () => {
  const items = useRecoilValue<TMain.ItemType[]>(AMain.itemState);
  const isOpenCalender = useRecoilValue(AOpen.isOpenAddCalendarState);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length < 2) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  return (
    <ModalLayout role='addModal'>
      {isOpenCalender && <Calendar tabName='add' />}
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
