import { TabMenuIdType, TabMenuStringType } from 'types/types';

export const RANDOM_PHRASES = [
  {
    line1: 'Gone with the wind~',
    line2: '이번 주도 바람과 함께 사라졌나요?',
  },
  {
    line1: '돈을 많이 쓴 곳이 곧 당신이랍니다',
    line2: '이번 주 당신은 무엇이었나요?',
  },
  {
    line1: '지금 구매하면 30% 할인?',
    line2: '아예 안 사면 100% 할인!',
  },
  {
    line1: '돈은 있다가도 없고, 없다가도 있는 거라고요?',
    line2: '훗, 돈은 없으면 없는 거랍니다 :)',
  },
  {
    line1: '지름신이 오시면 가슴에 손을 얹고 생각해보세요',
    line2: '정말 필요한 것인지 아닌지',
  },
  {
    line1: '오늘 쓴 1000원',
    line2: '한 달이면 3만 원',
  },
];

export const TAB_MENU: { id: TabMenuIdType; name: TabMenuStringType }[] = [
  {
    id: 'all',
    name: '전체',
  },
  {
    id: 'byWeek',
    name: '주별',
  },
  {
    id: 'byDate',
    name: '날짜별',
  },
  {
    id: 'byTag',
    name: '태그별',
  },
];

export const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

export const MONTHS = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export const ITEM_ID = 'toast_Item_Id';
export const TITLE_ID = 'toast_Title_Id';
export const NAME_ID = 'toast_Name_Id';
export const PRICE_ID = 'toast_Price_Id';
