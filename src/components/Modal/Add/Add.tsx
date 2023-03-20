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
  const saveTagGroup = useRecoilValue(AMain.savedTagGroupState);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (items.length < 2) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [items]);

  return (
    <ModalLayout role='addModal'>
      {isOpenCalender && <Calendar tabName='add' />}
      <h2 className={styles.modalTitle}>항목 등록하기</h2>
      <p className={styles.noTagGuide}>
        {saveTagGroup.length < 1 && '등록하신 태그가 없어요!'}
      </p>

      <div className={styles.inputContainer}>
        <Date />
        <Title />
        <List />
        <div ref={bottomRef} />
      </div>

      <SubmitBtn />
    </ModalLayout>
  );
};
