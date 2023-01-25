import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tagGroupState } from 'recoil/atom';
import { addTagSelector, toggleTagPopupSelector } from 'recoil/selector';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const setCloseTagPopup = useSetRecoilState(toggleTagPopupSelector);
  const setAddTag = useSetRecoilState(addTagSelector);
  const tags = useRecoilValue(tagGroupState);
  const [value, setValue] = useState('');

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAddTag(value);
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
          <div className={styles.mainContainer}>
            <div className={styles.tagGroup}>
              {tags.map(({ id, name }) => (
                <div key={id} className={styles.tag}>
                  {name}
                </div>
              ))}
            </div>
            <form onSubmit={handleTagSubmit} className={styles.inputItem}>
              <input
                id='title'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder='태그'
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
