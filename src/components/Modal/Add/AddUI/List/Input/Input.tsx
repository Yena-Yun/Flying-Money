import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import classnames from 'classnames';
import { AIndex } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import styles from './Input.module.scss';

interface InputProp {
  index: string;
  tag: string;
}

export const Input = ({ index, tag }: InputProp) => {
  const setNameOrPriceToItem = useSetRecoilState(
    SMain.addNameOrPriceToItemSelector
  );
  const setClickedTagPopupIndex = useSetRecoilState(
    AIndex.clickedTagPopupIndexState
  );
  const setOpenTagPopup = useSetRecoilState(SOpen.toggleModalSelector);
  const isOpenNewModal = useRef(false);

  useEffect(() => {
    if (!isOpenNewModal.current) {
      isOpenNewModal.current = true;
    }
  }, []);

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
            setOpenTagPopup('tagPopup');
            setClickedTagPopupIndex(String(e.currentTarget.dataset.id));
            isOpenNewModal.current = true;
          }}
        >
          <div className={styles.tag}>
            {!isOpenNewModal.current ? '태그 등록' : tag}
          </div>
        </div>
      </div>
    </div>
  );
};