import { Hook } from 'utils';
import { ItemType } from 'types/mainType';
import styles from './ItemList.module.scss';

interface ItemListProp {
  deliveredItemList: ItemType[];
}

export const ItemList = ({ deliveredItemList }: ItemListProp) => {
  return (
    <>
      {deliveredItemList.map(({ id, name, tag, price }) => (
        <div key={id} className={styles.item}>
          <div className={styles.nameTagGroup}>
            <div className={styles.name}>
              {name !== '' && '‣'} &nbsp; {name}&nbsp;
            </div>
            {tag && <div className={styles.tag}>{tag}</div>}
          </div>
          <div className={styles.price}>{Hook.formatMoney(price)}</div>
        </div>
      ))}
    </>
  );
};
