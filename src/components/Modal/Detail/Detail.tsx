import { useRecoilValue } from 'recoil';
import { transactionListState } from 'recoil/atom';
import { ModalLayout } from '../Layout/ModalLayout';
import styles from './Detail.module.scss';

export const Detail = () => {
  const transactionList = useRecoilValue(transactionListState);

  return (
    <ModalLayout>
      <div></div>
      <div></div>
    </ModalLayout>
  );
};
