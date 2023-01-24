// 지출 내역
export type Transaction = {
  id: string; // uuid4
  date: Date; // 달력 라이브러리
  diary?: string[]; // 그날 있었던 일 간단 기록 (문자열 배열, optional)
  title: string; // 지출 제목
  items: Item; // 지출한 상품과 서비스 항목
};

// 지출 내역 변수
export const transactions: Transaction[] = [];

// 각 장소에서 쓴 항목
export type Item = {
  name: string; // 상품이나 서비스 이름
  price: number; // 금액
  tag?: string; // 태그: 까페, 밥, 화장품, 옷 등 (**작성자가 직접 태그 설정**)
  description?: string;
};
