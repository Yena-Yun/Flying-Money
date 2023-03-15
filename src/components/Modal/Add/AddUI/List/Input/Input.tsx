import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import classnames from 'classnames';
import { AOpen, AIndex } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { TagPopup } from '../../TagPopup/TagPopup';
import styles from './Input.module.scss';

interface InputProp {
  index: string;
  tag: string;
}

export const Input = ({ index, tag }: InputProp) => {
  const setNameOrPriceToItem = useSetRecoilState(
    SMain.addNameOrPriceToItemSelector
  );
  const isOpenTagPopup = useRecoilValue(AOpen.isOpenTagPopupState);
  const [clickedTagPopupIndex, setClickedTagPopupIndex] = useRecoilState(
    AIndex.clickedTagPopupIndexState
  );
  const setOpenTagPopup = useSetRecoilState(SOpen.toggleTagPopupSelector);

  return (
    <div className={styles.inputGroup}>
      <div className={classnames(styles.inputItem, styles.nameInput)}>
        <input
          placeholder='항목명'
          onChange={(e) =>
            setNameOrPriceToItem({
              newInput: e.target.value,
              id: index,
              flag: 'name',
            })
          }
        />
      </div>

      <div className={styles.priceTagGroup}>
        <div className={classnames(styles.inputItem, styles.priceInput)}>
          <input
            type='number'
            placeholder='가격'
            onChange={(e) => {
              if (isNaN(e.target.valueAsNumber)) return;

              setNameOrPriceToItem({
                newInput: e.target.value,
                id: index,
                flag: 'price',
              });
            }}
          />
        </div>

        <div
          className={styles.tagOpenButton}
          data-id={index}
          onClick={(e) => {
            setOpenTagPopup();
            setClickedTagPopupIndex(String(e.currentTarget.dataset.id));
          }}
        >
          <div className={styles.tag}>{tag ? tag : '태그 등록하기'}</div>
        </div>
      </div>

      {clickedTagPopupIndex === index && isOpenTagPopup && <TagPopup />}
    </div>
  );
};
