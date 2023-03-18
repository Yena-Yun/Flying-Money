import { useRecoilValue } from 'recoil';
import { itemState } from 'recoil/atom/mainState';
import { Input } from './Input/Input';
import { TMain } from 'types';
import styles from './List.module.scss';
import { AddItem } from '../../AddOrRemoveItem/AddItem/AddItem';
import { RemoveItem } from '../../AddOrRemoveItem/RemoveItem/RemoveItem';

export const List = () => {
  const items = useRecoilValue<TMain.ItemType[]>(itemState);

  return (
    <div className={styles.inputGroupWrap}>
      <h3 className={styles.subTitle}>항목</h3>

      {items.map(({ id: index, tag }) => (
        <div key={index} className={styles.inputItemGroup}>
          <Input index={index} tag={tag} />
          <RemoveItem index={index} />
        </div>
      ))}

      <AddItem />
    </div>
  );
};
