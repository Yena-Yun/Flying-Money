import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain } from '~/recoil/atom';
import { SModal } from '~/recoil/selector';
import { HiOutlineMinusCircle as MinusIcon } from 'react-icons/hi2';
import styles from './RemoveItem.module.scss';

interface RemoveItemProp {
  index: string;
}

export const RemoveItem = ({ index }: RemoveItemProp) => {
  const list = useRecoilValue(AMain.addModalListState);
  const setAddOrDeleteItem = useSetRecoilState(
    SModal.addOrDeleteItemInAddModalSelector
  );

  const removeItemHandler = () => {
    setAddOrDeleteItem({
      flag: 'deleteItem',
      index,
    });
  };

  return (
    <>
      {/* inputGroup이 2개 이상이면 오른쪽에 삭제 버튼 등장 */}
      {list.length > 1 && (
        <div className={styles.removeItemButton} onClick={removeItemHandler}>
          <MinusIcon />
        </div>
      )}
    </>
  );
};
