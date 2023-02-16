export type TransactionType = {
  id: string;
  date: Date;
  lists: ListType[]; // 해당 날짜의 지출 내역 리스트
};

export type ListType = {
  id: string;
  title: string; // 지출 내역의 제목
  items: ItemType[]; // 지출한 상품과 서비스 항목 (배열)
  diaries?: string[]; // 그날 있었던 일 간단 기록 (문자열 배열, optional)
};

// 지출에 포함된 항목들
export type ItemType = {
  id: string;
  name: string; // 항목의 상품/서비스명
  price: number; // 항목의 금액
  tag: string; // 항목 분류 태그: 까페, 밥, 화장품, 옷 등 (**작성자가 직접 태그 입력**)
  description?: string; // 항목별 간단 기록 (소감, 알게 된 점 등)
};

export type TagType = {
  id: string;
  name: string;
};

export type TabMenuIdType = 'all' | 'byWeek' | 'byDate' | 'byTag';

export type TabMenuStringType = '전체' | '주별' | '날짜별' | '태그별';
