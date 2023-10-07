import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AMain } from 'recoil/atom';
import { SModal, SOpen } from 'recoil/selector';
import { ModalLayout } from 'components/Modal/Layout/ModalLayout';
import styles from './TagPopup.module.scss';

export const TagPopup = () => {
  const savedTagGroup = useRecoilValue(AMain.savedTagGroupState);
  const setAddTagToItem = useSetRecoilState(SModal.addTagToItemSelector);
  const setCloseTagPopup = useSetRecoilState(SOpen.toggleModalSelector);

  const selectTagHandler = (name: string) => {
    setAddTagToItem(name);
    setCloseTagPopup('tagPopup');
  };

  return (
    <>
      <ModalLayout role='tagPopup'>
        <h3 className={styles.title}>태그 추가</h3>
        {savedTagGroup.length < 1 && (
          <p className={styles.noTagGuide}>
            홈 화면의 '태그 관리' 메뉴에서 <br />
            사용하실 태그를 등록해주세요.
          </p>
        )}
        {savedTagGroup.length > 0 && (
          <div className={styles.tagGroup}>
            {savedTagGroup.map(({ id, name }) => {
              return (
                <div
                  key={id}
                  className={styles.tagWrap}
                  onClick={() => selectTagHandler(name)}
                >
                  {name}
                </div>
              );
            })}
          </div>
        )}
      </ModalLayout>
    </>
  );
};
