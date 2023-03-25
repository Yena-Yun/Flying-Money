import { useSetRecoilState } from 'recoil';
import { SModal } from 'recoil/selector';
import { PlusIcon } from 'components/Icons';
import styles from './AddItem.module.scss';

export const AddItem = () => {
  const setAddOrDeleteItem = useSetRecoilState(
    SModal.addOrDeleteItemInAddModalSelector
  );

  const addItemHandler = () => {
    setAddOrDeleteItem({
      flag: 'addItem',
      index: '',
    });
  };

  return (
    <div className={styles.addItemButtonWrap} onClick={addItemHandler}>
      <div className={styles.addItemButton}>
        <PlusIcon />
      </div>
      <div className={styles.addItemText}>항목 추가</div>
    </div>
  );
};
