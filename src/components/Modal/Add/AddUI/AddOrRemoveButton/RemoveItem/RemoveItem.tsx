import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemState } from 'recoil/atom/mainState';
import { addOrDeleteItemInAddModalSelector } from 'recoil/selector/mainSelector';
import { HiOutlineMinusCircle as MinusIcon } from 'react-icons/hi2';
import { TMain } from 'types';
import styles from './RemoveItem.module.scss';
import { AMain } from '~/recoil/atom';

interface RemoveItemProp {
  index: string;
}

export const RemoveItem = ({ index }: RemoveItemProp) => {
  // const items = useRecoilValue<TMain.ItemType[]>(itemState);
  const list = useRecoilValue(AMain.addModalListState);

  const setAddOrDeleteItem = useSetRecoilState(
    addOrDeleteItemInAddModalSelector
  );

  return (
    <>
      {/* inputGroup이 2개 이상이면 오른쪽에 삭제 버튼 등장 */}
      {list.length > 1 && (
        <div
          className={styles.removeItemButton}
          onClick={() =>
            setAddOrDeleteItem({
              flag: 'deleteItem',
              index,
            })
          }
        >
          <MinusIcon />
        </div>
      )}
    </>
  );
};
