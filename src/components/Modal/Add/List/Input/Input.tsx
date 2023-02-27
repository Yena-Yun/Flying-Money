import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import classnames from 'classnames';
import { Main, Open, Index } from 'recoil/atom';
import { SOpen } from 'recoil/selector';
import { TagPopup } from 'components/Modal/TagPopup/TagPopup';
import { TMain } from 'types';
import styles from './Input.module.scss';

type InputType = {
  index: string;
  tag: string;
};

export const Input = ({ index, tag }: InputType) => {
  const [items, setItems] = useRecoilState<TMain.ItemType[]>(Main.itemState);
  const isOpenTagPopup = useRecoilValue(Open.isOpenTagPopupState);
  const [clickedTagPopupIndex, setClickedTagPopupIndex] = useRecoilState(
    Index.clickedTagPopupIndexState
  );
  const setOpenTagPopup = useSetRecoilState(SOpen.toggleTagPopupSelector);

  const handleSetName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItems(
      items.map((item) =>
        item.id === index ? { ...item, name: e.target.value } : item
      )
    );
  };

  const handleSetPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isNaN(e.target.valueAsNumber)) return;

    setItems(
      items.map((item) =>
        item.id === index
          ? {
              ...item,
              price: parseInt(e.target.value),
            }
          : item
      )
    );
  };

  const handleSetTag = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenTagPopup();
    setClickedTagPopupIndex(String(e.currentTarget.dataset.id));
  };

  return (
    <div className={styles.inputGroup}>
      <div className={classnames(styles.inputItem, styles.nameInput)}>
        <input placeholder='항목명' onChange={handleSetName} />
      </div>

      <div className={styles.priceTagGroup}>
        <div className={classnames(styles.inputItem, styles.priceInput)}>
          <input type='number' placeholder='가격' onChange={handleSetPrice} />
        </div>

        <div
          className={styles.tagOpenButton}
          data-id={index}
          onClick={handleSetTag}
        >
          {tag ? (
            <div className={styles.tag}>{tag}</div>
          ) : (
            <div className={styles.tag}>태그 등록하기</div>
          )}
        </div>
      </div>
      {clickedTagPopupIndex === index && isOpenTagPopup && <TagPopup />}
    </div>
  );
};
