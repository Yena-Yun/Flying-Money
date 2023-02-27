import { useRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { Main } from 'recoil/atom';
import { Input } from './Input/Input';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2';
import { TMain } from 'types';
import styles from './List.module.scss';

export const List = () => {
  const [items, setItems] = useRecoilState<TMain.ItemType[]>(Main.itemState);

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
              <HiOutlineMinusCircle />
            </div>
          )}
        </div>
      ))}

      <div className={styles.addItemButton} onClick={handleAddItem}>
        <div className={styles.addIcon}>
          <HiOutlinePlusCircle />
        </div>
        <div className={styles.addItemText}>항목 추가</div>
      </div>
    </div>
  );
};
