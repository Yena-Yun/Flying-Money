# WYS-WYA (What You Spend is What You Are)

수기로 쓰는 가계부의 점점 날아가는 글씨(?)에 지쳐 <br/>
주별 지출을 한눈에 파악하려고 만드는 토이 프로젝트

## 구현 예정 기간
2023.01.21 - 2023.02.13
(다른 프로젝트 마무리와 병행중)

## 특징
* 수입은 기록 안 하고 **지출만 기록 (지출 관리가 목표)**
* 한 주에, 얼마를, 어디(tag)에 쓰는지를 한눈에 파악
* 목표: 주별 절대적인 지출 금액 관리 => 쓸데 없는 지출 줄이기, 수입과 관계 없이 지출 그 자체 관리
* 메인 화면에 경각심을 일깨우는 랜덤 문구 등장
* 이번 주 쓴 총합은 선택적으로 확인 가능

## 상태 (state)
```
// 지출 내역 변수
const transactions = Transaction[]

// 지출 내역
type Transaction = {
  id: number(string?), // uuid4
  date: string?, // 달력 라이브러리
  diary?: string[], // 그날 있었던 일 간단 기록 (문자열 배열, optional)
  title: string, // 지출 제목
  items: Item[], // 지출한 상품과 서비스 항목
}

// 각 장소에서 쓴 항목
type Item = {
  name: string, // 상품이나 서비스 이름
  price: number, // 금액
  tag: string, // 태그: 까페, 밥, 화장품, 옷 등 (**작성자가 직접 태그 설정**)
  description?: string, // 항목에 대해 가끔 추가하는 한 줄 소감 (optional)
}
```

## 구현 예정 기능
### MVP 기능
1. 거래 내역 등록 (Create) - 추가 버튼 클릭 시 Modal 띄우기
2. 거래 내역 렌더링 (Read)
3. 새로 고침 및 다시 들어왔을 때 거래 내역 기억 (**localStorage 저장**)
4. 거래 내역 삭제 (Delete)
5. 타입에서 required 속성만 구현
6. 기본 디자인 (**Grid로 반응형 필요 없는 뷰 구현**)
7. **recoil로 전역 상태 관리**

### 2차 MVP 기능
1. 태그 필터 (전체 보기, 태그별 보기)
2. 주별 지출 필터 (기간 선택 시 그 주의 총 지출 내역 + 합계 보여주기)
 - 기간을 '입력'하게 하지 않고, 주별 지출 보는 탭을 따로 만들고 <br/>
	'1월 1주차', '1월 2주차' 이런 식으로 거래 내역 등록 때마다 자동으로 버튼 생성
 -	이후 '1월 1주차(2023.01.01 ~ 2023.01.07)' 버튼을 누르면 <br/>
	그 주의 총 지출, 태그별 이용 횟수 및 지출을 오른쪽 리스트에 보여주기
3. 검색엔진최적화 (index.html, 시맨틱 마크업)
4. 배포 (Vercel 예정)

### 추가 기능
1. 날짜별 정렬
2. 주별 지출 탭에서 주별 소감 등록
3. 타입에서 optional인 속성들(diary, description) 추가
4. 태그별 지출 -> 그래프(차트)를 통해 시각적으로 보여주기
5. 테스트 코드 작성 (jest unit test 고민중)

## 기술 스택
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiNmMjZiMDAiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjYwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
