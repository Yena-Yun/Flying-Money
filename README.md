# 💸 Flying Money (플라잉 머니)

수기로 쓰던 가계부를 웹으로 만들어본 토이 프로젝트

### [Vercel 배포 🚀](flying-money.vercel.app)
### [Lighthouse 최적화 기록 ✨](https://velog.io/@yena1025/%ED%94%8C%EB%9D%BC%EC%9E%89-%EB%A8%B8%EB%8B%88-Lighthouse-%EC%B5%9C%EC%A0%81%ED%99%94-%EA%B8%B0%EB%A1%9D)

![녹화_2023_04_16_20_46_49_431](https://user-images.githubusercontent.com/68722179/232470181-881751ac-84e5-4276-aaed-a5176fe046c5.gif)


## 🧨 실행 방법
```
git clone -> yarn install -> yarn 
```

## 🪀 기술 스택
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiNmMjZiMDAiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjYwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


## ✨ 특징
* **목표**: 수입과 관계 없이 **지출 줄이기에 집중 (지출만 기록)**
* **일별, 주별, 태그별 지출 확인** 가능 
* 각 지출별로 여러 개의 항목 등록 가능
* Main 화면에 지출에 대한 경각심을 일깨우는 랜덤 문구 등장

## 📘 주요 상태 데이터
```
const TransactionType = {
  id: string;
  date: Date;
  lists: ListType[]; // 해당 날짜의 지출 리스트
};

// 해당 날짜의 지출 리스트
const ListType = {
  id: string;
  title: string; // 지출 제목
  items: ItemType[]; // 세부 지출 항목 리스트
  diaries?: string[]; // 그날 있었던 일 간단 기록 (optional, 구현 예정)
};

 // 세부 지출 항목 리스트
const ItemType = {
  id: string;
  name: string; // 세부 항목명
  price: number; // 세부 항목의 지출액
  tag: string; // 항목 분류 태그: 까페, 밥, 화장품, 옷 등 (작성자가 직접 태그 등록)
  description?: string; // 항목별 소감 및 기록 (optional, 구현 예정)
};
```

## 🍬 구현 기능
* 데이터 depth: 총 3단계
<img src="https://user-images.githubusercontent.com/68722179/226562127-84ae5106-3e9b-4409-b11c-78af04657fed.png" width='500'/>

1. **새 지출항목 등록**
<img src="https://user-images.githubusercontent.com/68722179/226583033-f2585e2c-ea79-4ace-bd74-26b618dd1c09.png" width='450'/>

2. **탭별 조회** (전체 보기, 날짜별 보기)
<img src="https://user-images.githubusercontent.com/68722179/226578461-78b72872-4ec3-4aeb-929e-43545dd5833f.png" width='450'/>

3. **지출항목 상세 확인 모달**
<img src="https://user-images.githubusercontent.com/68722179/226584845-ceafc8be-f517-408c-a6e7-60f988af6897.png" width='450'/>

4. **커스텀 태그 등록**

<img src="https://user-images.githubusercontent.com/68722179/226578099-028d3c6c-40cf-45aa-a198-af8dac4fa8c7.png" width='450'/>)

5. **상세 모달에서 확인 및 삭제**
<img src="https://user-images.githubusercontent.com/68722179/226578903-65887a45-52f4-4822-ad7e-0f3fdc9278cd.png" width='450'/>

6.**캘린더 기능**<br/>
* 총 2군데서 사용, 컴포넌트 모듈화하고 스타일은 prop으로 분기<br/>

<img src="https://user-images.githubusercontent.com/68722179/226582636-f1a422dc-902e-47f4-a309-a7852c4aaff2.png" width='400'/>


### 세부 기능
* 같은 날짜로 추가할 경우 기존에 있던 날짜 항목 밑으로 들어감
<img src="https://user-images.githubusercontent.com/68722179/226579850-32906b40-9807-4224-afd2-15caab3531ca.png" width='400'/>

* 주별 탭에서 달 이동 시 해당 달의 week 수에 맞는 주차별 버튼 렌더링 <br/>
예: 2023년 3월 (총 5주차) <br/>
<img src="https://user-images.githubusercontent.com/68722179/226581022-bf8a0388-6637-4f88-9a36-b0f1559feadb.png" width='400'/>
예: 2023년 4월 (총 6주차) <br/>
<img src="https://user-images.githubusercontent.com/68722179/226581086-8def2194-847c-43b3-8061-31820eba5cbc.png" width='400'/>


## 🧙‍♀️ UX를 위한 장치
1. 등록된 커스텀 태그는 시간이 지나도 유지 (localStorage)
2. debounce로 인풋 입력 최적화 (use-debounce)
```
// 선언
const debounced = useDebouncedCallback(({ id, flag, value }) => {
    setList({
      id,
      flag,
      input: value,
    });
  }, 400);
  
// 사용
  <Input
     ...
     onChange={(e) =>
     debounced({
       id,
       flag: 'name',
       value: e.target.value,
    })
   }
 />
```
3. 제출 시 비어있는 입력란이 있으면 화면 상단 토스트 알림 (react-toastify)
<img src="https://user-images.githubusercontent.com/68722179/226586966-0bab7157-5a5f-49c1-906c-8d8a9ed5e637.png" width='400'/>

4. 원활한 앱 사용을 위한 가이드 문구 <br/>

<img src="https://user-images.githubusercontent.com/68722179/226577742-e451654f-49de-499b-8431-686330105914.png" width='400'/> <br/>
<img src="https://user-images.githubusercontent.com/68722179/226592909-621bf8d9-a37d-4636-8a41-488aa2f2fd81.png" width='400'/>


5. 새 등록 모달에서 항목 추가 시 아래로 자동 스크롤 + 항목이 2개 이상일 때만 오른쪽에 '-' 버튼 렌더링
<img src="https://user-images.githubusercontent.com/68722179/226580631-f1ed00cc-d158-4623-a17a-463d5ec94667.png" width='400'/>

```
  useEffect(() => {
    if (list.length < 2) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [list]);
```


## 🛍 파일/폴더 모듈화
* 수많은 atom과 selector를 각각의 역할에 따라 파일 분리
<img src="https://user-images.githubusercontent.com/68722179/226563795-c8566a16-592a-4242-9752-0bd8473309a4.png" width='200' />

* 내보내기 예시
<img src="https://user-images.githubusercontent.com/68722179/226566405-2d2d13d8-8465-4e7b-9298-9af12cedeee5.png" width='400' />

[ 위와 같이 수정하기 전 ]
* **라이브러리 recoil과 로컬 recoil 폴더가 잘 구분되지 않음**
* recoil 폴더에서 atom이나 selector를 가져올 때마다 매번 import 라인이 추가됨
* 구체적인 이름을 위해 **긴 변수명**을 사용하는 과정에서 **각 atom과 selector가 어떤 역할인지 잘 인지되지 않음**

```
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalDateState } from 'recoil';
import { toggleCalendarSelector } from 'recoil';
```

[ 수정 후 ]
* **역할과 관련된 이름**으로 내보내서 **컴포넌트 파일에서 역할이 잘 인지됨**
* 라이브러리 recoil과 로컬 recoil 폴더가 확실히 구분됨
* 해당 이름이 이미 import 되어 있을 경우 import 라인이 매번 추가되지 않음
```
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ADate, AOpen } from 'recoil/atom';
import { SMain } from 'recoil/selector';
```

## 📚 폴더 구조

```
📦src
 ┣ 📂components
 ┃ ┣ 📂Calendar
 ┃ ┃ ┣ 📂DateCells
 ┃ ┃ ┃ ┣ 📜DateCells.module.scss
 ┃ ┃ ┃ ┗ 📜DateCells.tsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜CalendarHeader.module.scss
 ┃ ┃ ┃ ┗ 📜CalendarHeader.tsx
 ┃ ┃ ┣ 📜Calendar.module.scss
 ┃ ┃ ┗ 📜Calendar.tsx
 ┃ ┣ 📂Icons
 ┃ ┃ ┣ 📂Calendar
 ┃ ┃ ┃ ┣ 📜Calendar.module.scss
 ┃ ┃ ┃ ┗ 📜Calendar.tsx
 ┃ ┃ ┣ 📂CalendarArrow
 ┃ ┃ ┃ ┣ 📜CalendarArrow.module.scss
 ┃ ┃ ┃ ┗ 📜CalendarArrow.tsx
 ┃ ┃ ┣ 📂PlusButton
 ┃ ┃ ┃ ┣ 📜PlusButton.module.scss
 ┃ ┃ ┃ ┗ 📜PlusButton.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Main
 ┃ ┃ ┣ 📂Banner
 ┃ ┃ ┃ ┣ 📜Banner.module.scss
 ┃ ┃ ┃ ┗ 📜Banner.tsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Header.module.scss
 ┃ ┃ ┃ ┗ 📜Header.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂Modal
 ┃ ┃ ┣ 📂Add
 ┃ ┃ ┃ ┣ 📂ActionButton
 ┃ ┃ ┃ ┃ ┣ 📂AddItem
 ┃ ┃ ┃ ┃ ┃ ┣ 📜AddItem.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ 📜AddItem.tsx
 ┃ ┃ ┃ ┃ ┗ 📂RemoveItem
 ┃ ┃ ┃ ┃ ┃ ┣ 📜RemoveItem.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ 📜RemoveItem.tsx
 ┃ ┃ ┃ ┣ 📂Date
 ┃ ┃ ┃ ┃ ┣ 📜Date.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜Date.tsx
 ┃ ┃ ┃ ┣ 📂SubmitBtn
 ┃ ┃ ┃ ┃ ┣ 📜SubmitBtn.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜SubmitBtn.tsx
 ┃ ┃ ┃ ┣ 📂TagPopup
 ┃ ┃ ┃ ┃ ┣ 📜TagPopup.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜TagPopup.tsx
 ┃ ┃ ┃ ┣ 📜Add.module.scss
 ┃ ┃ ┃ ┗ 📜Add.tsx
 ┃ ┃ ┣ 📂Detail
 ┃ ┃ ┃ ┣ 📂All
 ┃ ┃ ┃ ┃ ┣ 📜AllDetail.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜AllDetail.tsx
 ┃ ┃ ┃ ┣ 📂ByDate
 ┃ ┃ ┃ ┃ ┣ 📜ByDateDetail.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜ByDateDetail.tsx
 ┃ ┃ ┃ ┗ 📂DetailUI
 ┃ ┃ ┃ ┃ ┣ 📂ActionButton
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ActionButton.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ActionButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📂ItemList
 ┃ ┃ ┃ ┃ ┃ ┣ 📜ItemList.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ 📜ItemList.tsx
 ┃ ┃ ┃ ┃ ┣ 📂TotalExpense
 ┃ ┃ ┃ ┃ ┃ ┣ 📜TotalExpense.module.scss
 ┃ ┃ ┃ ┃ ┃ ┗ 📜TotalExpense.tsx
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂Layout
 ┃ ┃ ┃ ┣ 📜ModalLayout.module.scss
 ┃ ┃ ┃ ┗ 📜ModalLayout.tsx
 ┃ ┃ ┣ 📂Toast
 ┃ ┃ ┃ ┣ 📜Toast.module.scss
 ┃ ┃ ┃ ┗ 📜Toast.tsx
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂RootToast
 ┃ ┃ ┗ 📜RootToast.tsx
 ┃ ┣ 📂Shared
 ┃ ┃ ┗ 📂Input
 ┃ ┃ ┃ ┗ 📜Input.tsx
 ┃ ┗ 📂TabMenu
 ┃ ┃ ┣ 📂All
 ┃ ┃ ┃ ┣ 📜All.module.scss
 ┃ ┃ ┃ ┗ 📜All.tsx
 ┃ ┃ ┣ 📂ByDate
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┃ ┣ 📜Header.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜ByDate.module.scss
 ┃ ┃ ┃ ┗ 📜ByDate.tsx
 ┃ ┃ ┣ 📂ByWeek
 ┃ ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┃ ┣ 📜Header.module.scss
 ┃ ┃ ┃ ┃ ┗ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜ByWeek.module.scss
 ┃ ┃ ┃ ┗ 📜ByWeek.tsx
 ┃ ┃ ┣ 📂Layout
 ┃ ┃ ┃ ┣ 📜TabMenuLayout.module.scss
 ┃ ┃ ┃ ┗ 📜TabMenuLayout.tsx
 ┃ ┃ ┣ 📂ManageTag
 ┃ ┃ ┃ ┣ 📜ManageTag.module.scss
 ┃ ┃ ┃ ┗ 📜ManageTag.tsx
 ┃ ┃ ┗ 📜index.ts
 ┣ 📂hooks
 ┃ ┣ 📜blockInvalidInput.ts
 ┃ ┣ 📜changeMonth.ts
 ┃ ┣ 📜formatDate.ts
 ┃ ┣ 📜formatMoney.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜localStorage.ts
 ┃ ┗ 📜popupToast.ts
 ┣ 📂pages
 ┃ ┗ 📂Home
 ┃ ┃ ┣ 📜Home.module.scss
 ┃ ┃ ┗ 📜Home.tsx
 ┣ 📂recoil
 ┃ ┣ 📂atom
 ┃ ┃ ┣ 📜dateState.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜indexState.ts
 ┃ ┃ ┣ 📜mainState.ts
 ┃ ┃ ┣ 📜openState.ts
 ┃ ┃ ┗ 📜utilState.ts
 ┃ ┗ 📂selector
 ┃ ┃ ┣ 📜dateSelector.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜mainSelector.ts
 ┃ ┃ ┣ 📜modalSelector.ts
 ┃ ┃ ┣ 📜openSelector.ts
 ┃ ┃ ┗ 📜totalSelector.ts
 ┣ 📂styles
 ┃ ┣ 📜globals.scss
 ┃ ┗ 📜mixins.scss
 ┣ 📂types
 ┃ ┣ 📜flagType.ts
 ┃ ┣ 📜index.ts
 ┃ ┣ 📜mainType.ts
 ┃ ┗ 📜tabMenuType.ts
 ┣ 📂utils
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜banner.ts
 ┃ ┃ ┣ 📜clickedIndex.ts
 ┃ ┃ ┣ 📜date.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┣ 📜tabMenu.ts
 ┃ ┃ ┗ 📜toast.ts
 ┃ ┣ 📂libraries
 ┃ ┃ ┣ 📜dateFns.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📜index.ts
 ┣ 📜App.tsx
 ┗ 📜main.tsx
```
