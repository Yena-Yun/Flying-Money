# 💸 Flying Money (플라잉 머니)

수기로 쓰는 가계부를 웹으로 만들어보는 토이 프로젝트

<img src="https://user-images.githubusercontent.com/68722179/223064450-6ebde80c-3b4a-40f7-9943-8026a5ffc8e4.png" width='350' />


## 📬 구현 예정 기간
2023.01.21 - 2023.03


## ✨ 특징
* **목표**: 수입과 관계 없이 **지출 줄이기에 집중 (지출만 기록)**
* **일별, 주별, 태그별 지출 확인** 가능 
* 각 지출별로 여러 개의 항목 등록 가능
* Main 화면에 지출에 대한 경각심을 일깨우는 랜덤 문구 등장

## 📘 데이터 설계
```
const TransactionType = {
  id: string;
  date: Date;
  lists: ListType[]; // 해당 날짜의 지출 내역 리스트
};

const ListType = {
  id: string;
  title: string; // 지출 내역의 제목
  items: ItemType[]; // 지출한 상품과 서비스 항목 (배열)
  diaries?: string[]; // 그날 있었던 일 간단 기록 (문자열 배열, optional)
};

const ItemType = {
  id: string;
  name: string; // 항목의 상품/서비스명
  price: number; // 항목의 금액
  tag: string; // 항목 분류 태그: 까페, 밥, 화장품, 옷 등 (작성자가 직접 태그 등록)
  description?: string; // 항목별 간단 기록 (소감, 알게 된 점 등)
};
```

## 👠 구현 기능
### 1차 MVP 
1. 지출 등록
2. 지출 조회 (전체, 주별, 일별, 태그별)
3. 지출별 상세 확인 (Detail)
4. 지출 수정 및 삭제
5. 데이터 중 required 속성 우선 구현


### 2차 MVP 
1. optional 데이터 추가 구현 (diaries, description)
2. 검색 엔진 최적화 (SEO)


### for UX
1. 새로고침 및 브라우저 종료 시에도 유지
2. 알림 Toast (react-toastify)

### 추가 예정
1. 각 탭: 날짜별 정렬
2. 태그별 탭: 그래프나 차트로 시각적 확인


## 🪀 기술 스택
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiNmMjZiMDAiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjYwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

