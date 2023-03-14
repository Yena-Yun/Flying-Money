import { useRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { AMain } from 'recoil/atom';
import { Input } from './Input/Input';
import { PlusButton as PlusIcon } from 'components/Icons';
import { HiOutlineMinusCircle as MinusIcon } from 'react-icons/hi2';
import { TMain } from 'types';
import styles from './List.module.scss';

export const List = () => {
  const [items, setItems] = useRecoilState<TMain.ItemType[]>(AMain.itemState);

  const handleAddItem = () => {
    setItems((prev) => [...prev, { id: uuid4(), name: '', price: 0, tag: '' }]);
  };

  const handleDeleteItem = (index: string) => {
    setItems(items.filter(({ id }) => id !== index));
  };

  return (
    <div className={styles.inputGroupWrap}>
      <h3 className={styles.subTitle}>항목</h3>

      {items.map(({ id: index, tag }) => (
        <div key={index} className={styles.inputItemGroup}>
          <Input index={index} tag={tag} />

          {/* 인풋이 2개 이상일 때 오른쪽에 삭제 버튼 등장 */}
          {items.length > 1 && (
            <div
              className={styles.removeItemButton}
              onClick={() => handleDeleteItem(index)}
            >
              <MinusIcon />
            </div>
          )}
        </div>
      ))}

      <div className={styles.addItemButton} onClick={handleAddItem}>
        <PlusIcon />
        <div className={styles.addItemText}>항목 추가</div>
      </div>
    </div>
  );
};
