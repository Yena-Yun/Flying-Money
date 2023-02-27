import { TTab } from 'types';

export const RANDOM_PHRASES = [
  {
    line1: 'Gone with the wind~',
    line2: '이번 주는 어디로 날아갔나요?',
  },
  {
    line1: '돈을 많이 쓴 곳은 곧 당신이랍니다',
    line2: '이번 주 당신은 무엇이었나요?',
  },
  {
    line1: '지금 구매하면 30% 할인?',
    line2: '응, 안 사면 100% 할인~',
  },
  {
    line1: '돈은 있다가도 없고 없다가도 있는 거라고요?',
    line2: '훗, 돈은 없으면 없는 거랍니다 :)',
  },
  {
    line1: '지름신을 내쫓는 법?',
    line2: '정말 필요한 것인지 다시 한 번 생각하기!',
  },
  {
    line1: '오늘 쓴 1000원?',
    line2: '한 달이면 3만 원..!',
  },
  {
    line1: '이 돈이면 떡볶이가 몇 그릇..?',
    line2: '여러분이 좋아하는 걸로 환산해보세요',
  },
];

export const TAB_MENU: {
  id: TTab.TabMenuIdType;
  name: TTab.TabMenuStringType;
}[] = [
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
