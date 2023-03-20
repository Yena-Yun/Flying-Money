import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AIndex, AMain, AOpen } from 'recoil/atom';
import { SMain, SOpen } from '~/recoil/selector';
import { ModalLayout } from '../Layout/ModalLayout';
import { Calendar } from 'components/Calendar/Calendar';
import { Date } from './Date/Date';
import { SubmitBtn } from './SubmitBtn/SubmitBtn';
import { Input } from '~/components/Shared/Input/Input';
import { RemoveItem } from './ActionButton/RemoveItem/RemoveItem';
import { AddItem } from './ActionButton/AddItem/AddItem';
import { blockInvalidInput } from '~/utils/hooks';
import styles from './Add.module.scss';
import { addedInputGroupCountState } from '~/recoil/atom/utilState';
import { useDebouncedCallback } from 'use-debounce';

export const AddModal = () => {
  const isOpenCalender = useRecoilValue(AOpen.isOpenAddCalendarState);
  const saveTagGroup = useRecoilValue(AMain.savedTagGroupState);
  const bottomRef = useRef<HTMLDivElement>(null);

  const setTitle = useSetRecoilState(SMain.addModalTitleSelector);
  const list = useRecoilValue(AMain.addModalListState);
  const setList = useSetRecoilState(SMain.addModalListSelector);

  const addedCount = useRecoilValue(addedInputGroupCountState);

  const setClickedTagPopupIndex = useSetRecoilState(
    AIndex.clickedTagPopupIndexState
  );
  const setOpenTagPopup = useSetRecoilState(SOpen.toggleModalSelector);
  const isOpenNewModal = useRef(false);

  useEffect(() => {
    if (addedCount < 1) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [addedCount]);

  const selectTagHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    setOpenTagPopup('tagPopup');
    setClickedTagPopupIndex(String(e.currentTarget.dataset.id));
    isOpenNewModal.current = true;
  };

  const debounced = useDebouncedCallback(({ id, flag, value }) => {
    setList({
      id,
      flag,
      input: value,
    });
  }, 500);

  return (
    <ModalLayout role='addModal'>
      {isOpenCalender && <Calendar tabName='add' />}

      <h2 className={styles.modalTitle}>항목 등록하기</h2>
      <p className={styles.noTagGuide}>
        {saveTagGroup.length < 1 && '등록하신 태그가 없어요!'}
      </p>

      <form>
        <div className={styles.inputContainer}>
          <Date />

          <div className={styles.inputGroupWrap}>
            {/* 제목 입력란 */}
            <label className={styles.subTitle}>제목</label>
            <Input
              name='title'
              className={styles.titleInput}
              placeholder='제목을 입력해주세요.'
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* 항목 입력란 리스트 */}
          <div className={styles.inputGroupWrap}>
            <label className={styles.subTitle}>항목</label>
            {list.map(({ id, tag }) => {
              return (
                <div key={id} className={styles.inputItemGroup}>
                  <div className={styles.inputGroup}>
                    <div className={styles.inputItem}>
                      <Input
                        name='name'
                        className={styles.nameInput}
                        placeholder='항목명'
                        onChange={(e) =>
                          debounced({
                            id,
                            flag: 'name',
                            value: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className={styles.priceTagGroup}>
                      <Input
                        type='number'
                        name='price'
                        className={styles.priceInput}
                        placeholder='가격'
                        onKeyDown={blockInvalidInput}
                        onChange={(e) =>
                          debounced({
                            id,
                            flag: 'price',
                            value: e.target.value,
                          })
                        }
                      />

                      <div
                        className={styles.tagOpenButton}
                        data-id={id}
                        onClick={selectTagHandler}
                      >
                        <div className={styles.tag}>
                          {!isOpenNewModal.current || !tag ? '태그 추가' : tag}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 개별 항목 삭제 버튼 */}
                  <RemoveItem index={id} />
                </div>
              );
            })}
          </div>

          {/* '항목 추가' 버튼 */}
          <AddItem />

          {/* 항목이 추가되면 스크롤 생김 */}
          <div ref={bottomRef} />
        </div>

        <SubmitBtn />
      </form>
    </ModalLayout>
  );
};
