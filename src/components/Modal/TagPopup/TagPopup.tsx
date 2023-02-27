import React, { useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import uuid4 from 'uuid4';
import { Main } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { IoIosClose } from 'react-icons/io';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const [value, setValue] = useState('');
  const setItems = useSetRecoilState(Main.itemState);
  const [savedTagGroup, setSavedTagGroup] = useRecoilState(
    Main.savedTagGroupState
  );
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

  const handleSubmitTag = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.length < 1) return;

    setSavedTagGroup([...savedTagGroup, { id: uuid4(), name: value }]);
    setValue('');
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
          <form onSubmit={handleSubmitTag} className={styles.inputForm}>
            <input
              value={value}
              placeholder='태그'
              autoFocus
              onChange={(e) => setValue(e.target.value)}
            />
          </form>
        </div>
      </div>
    </>
  );
};
