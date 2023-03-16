import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain } from 'recoil/atom';
import { SMain, SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const savedTagGroup = useRecoilValue(AMain.savedTagGroupState);
  const setAddTagToItem = useSetRecoilState(SMain.addTagToItemSelector);
  const setCloseTagPopup = useSetRecoilState(SOpen.toggleModalSelector);

  return (
    <>
      <ModalLayout role='tagPopup'>
        <h2 className={styles.title}>태그 등록</h2>
        <div className={styles.tagGroup}>
          {savedTagGroup.map(({ id, name }) => {
            return (
              <div key={id} className={styles.tagWrap}>
                <div
                  className={styles.tag}
                  onClick={() => {
                    setAddTagToItem(name);
                    setCloseTagPopup('tagPopup');
                  }}
                >
                  {name}
                </div>
              </div>
            );
          })}
        </div>
      </ModalLayout>
    </>
  );
};
