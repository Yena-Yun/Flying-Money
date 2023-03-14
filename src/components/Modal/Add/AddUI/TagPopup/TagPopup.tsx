import { useRef, FormEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { AMain } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { IoIosClose } from 'react-icons/io';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const tagFormRef = useRef<HTMLFormElement>(null);
  const [savedTagGroup, setSavedTagGroup] = useRecoilState(
    AMain.savedTagGroupState
  );
  const setItems = useSetRecoilState(AMain.itemState);
  const setAddTagToItem = useSetRecoilState(SMain.addTagToItemSelector);
  const setCloseTagPopup = useSetRecoilState(SOpen.toggleTagPopupSelector);

  const handleSetTag = (name: string) => {
    setAddTagToItem(name);
    setCloseTagPopup();
  };

  const handleDeleteTag = (id: string, name: string) => {
    setItems((items) =>
      items.filter(({ name: itemName }) => itemName !== name)
    );
    setSavedTagGroup((savedTagGroup) =>
      savedTagGroup.filter(({ id: index }) => index !== id)
    );
  };

  const handleSubmitTag = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const tag = formData.get('tag') as string;

    if (tag.length < 1) return;

    setSavedTagGroup([...savedTagGroup, { id: uuid4(), name: tag }]);

    if (tagFormRef.current) {
      tagFormRef.current.reset();
    }
  };

  return (
    <>
      <div
        className={styles.background}
        onClick={() => setCloseTagPopup()}
      ></div>
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.tagGroup}>
            {savedTagGroup.map(({ id, name }) => {
              return (
                <div key={id} className={styles.tagWrap}>
                  <div
                    className={styles.tag}
                    onClick={() => handleSetTag(name)}
                  >
                    {name}
                  </div>
                  <div
                    className={styles.deleteTagIcon}
                    onClick={() => handleDeleteTag(id, name)}
                  >
                    <IoIosClose />
                  </div>
                </div>
              );
            })}
          </div>
          <form
            className={styles.inputForm}
            ref={tagFormRef}
            onSubmit={handleSubmitTag}
          >
            <input name='tag' placeholder='태그' autoFocus />
          </form>
        </div>
      </div>
    </>
  );
};
