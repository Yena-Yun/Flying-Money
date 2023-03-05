import { ItemType } from 'types/mainType';
import { Hook } from 'utils';
import styles from './ItemList.module.scss';

type ItemListType = {
  items: ItemType[];
};

export const ItemList = ({ items }: ItemListType) => {
  return (
    <>
      {items.map(({ id, name, tag, price }) => (
        <div key={id} className={styles.info}>
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
