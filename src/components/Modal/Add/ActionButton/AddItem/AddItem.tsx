import { useSetRecoilState } from 'recoil';
import { AUtil } from '~/recoil/atom';
import { addOrDeleteItemInAddModalSelector } from 'recoil/selector/mainSelector';
import { PlusButton as PlusIcon } from 'components/Icons';
import styles from './AddItem.module.scss';

export const AddItem = () => {
  const setAddedCount = useSetRecoilState(AUtil.addedInputGroupCountState);
  const setAddOrDeleteItem = useSetRecoilState(
    addOrDeleteItemInAddModalSelector
  );

  const addItemHandler = () => {
    setAddedCount((prev: number) => prev - 1);
    setAddOrDeleteItem({
      flag: 'addItem',
      index: '',
    });
  };

  return (
    <div className={styles.addItemButton} onClick={addItemHandler}>
      <PlusIcon />
      <div className={styles.addItemText}>항목 추가</div>
    </div>
  );
};
