import { useRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { itemState } from 'recoil/atom';
import { Input } from './Input/Input';
import { ItemType } from 'types/types';
import { HiOutlinePlusCircle, HiOutlineMinusCircle } from 'react-icons/hi2';
import styles from './List.module.scss';

export const List = () => {
  const [items, setItems] = useRecoilState<ItemType[]>(itemState);

  return (
    <div className={styles.inputGroupWrap}>
      <h3 className={styles.subTitle}>항목</h3>

      {items.map(({ id: index, tag }) => (
        <div key={index} className={styles.inputItemGroup}>
          <Input index={index} tag={tag} />

          {parseInt(index) > 1 && (
            <div
              className={styles.removeItemButton}
              onClick={() => {
                setItems(items.filter(({ id }) => id !== index));
              }}
            >
              <HiOutlineMinusCircle />
            </div>
          )}
        </div>
      ))}

      <div
        className={styles.addItemButton}
        onClick={() => {
          setItems((prev) => [
            ...prev,
            { id: uuid4(), name: '', price: 0, tag: '' },
          ]);
        }}
      >
        <div className={styles.addIcon}>
          <HiOutlinePlusCircle />
        </div>
        <div className={styles.addItemText}>항목 추가</div>
      </div>
    </div>
  );
};
