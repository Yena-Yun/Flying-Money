import { PlusButton as PlusIcon } from 'components/Icons';
import { useSetRecoilState } from 'recoil';
import { addOrDeleteItemInAddModalSelector } from 'recoil/selector/mainSelector';
import styles from './AddItem.module.scss';

export const AddItem = () => {
  const setAddOrDeleteItem = useSetRecoilState(
    addOrDeleteItemInAddModalSelector
  );

  return (
    <div
      className={styles.addItemButton}
      onClick={() =>
        setAddOrDeleteItem({
          flag: 'addItem',
          index: '',
        })
      }
    >
      <PlusIcon />
      <div className={styles.addItemText}>항목 추가</div>
    </div>
  );
};
