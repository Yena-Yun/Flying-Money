# ๐ธ Flying Money (ํ๋ผ์ ๋จธ๋)

์๊ธฐ๋ก ์ฐ๋ ๊ฐ๊ณ๋ถ๋ฅผ ์น์ผ๋ก ๋ง๋ค์ด๋ณด๋ ํ ์ด ํ๋ก์ ํธ

<img src="https://user-images.githubusercontent.com/68722179/223064450-6ebde80c-3b4a-40f7-9943-8026a5ffc8e4.png" width='400' />

## ๐งจ ์คํ ๋ฐฉ๋ฒ
```
git clone -> yarn install -> yarn start
```

## ๐ช ๊ธฐ์  ์คํ
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiNmMjZiMDAiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjYwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)


## โจ ํน์ง
* **๋ชฉํ**: ์์๊ณผ ๊ด๊ณ ์์ด **์ง์ถ ์ค์ด๊ธฐ์ ์ง์ค (์ง์ถ๋ง ๊ธฐ๋ก)**
* **์ผ๋ณ, ์ฃผ๋ณ, ํ๊ทธ๋ณ ์ง์ถ ํ์ธ** ๊ฐ๋ฅ 
* ๊ฐ ์ง์ถ๋ณ๋ก ์ฌ๋ฌ ๊ฐ์ ํญ๋ชฉ ๋ฑ๋ก ๊ฐ๋ฅ
* Main ํ๋ฉด์ ์ง์ถ์ ๋ํ ๊ฒฝ๊ฐ์ฌ์ ์ผ๊นจ์ฐ๋ ๋๋ค ๋ฌธ๊ตฌ ๋ฑ์ฅ

## ๐ ๋ฐ์ดํฐ ์ค๊ณ
```
const TransactionType = {
  id: string;
  date: Date;
  lists: ListType[]; // ํด๋น ๋ ์ง์ ์ง์ถ ๋ด์ญ ๋ฆฌ์คํธ
};

const ListType = {
  id: string;
  title: string; // ์ง์ถ ๋ด์ญ์ ์ ๋ชฉ
  items: ItemType[]; // ์ง์ถํ ์ํ๊ณผ ์๋น์ค ํญ๋ชฉ (๋ฐฐ์ด)
  diaries?: string[]; // ๊ทธ๋  ์์๋ ์ผ ๊ฐ๋จ ๊ธฐ๋ก (๋ฌธ์์ด ๋ฐฐ์ด, optional)
};

const ItemType = {
  id: string;
  name: string; // ํญ๋ชฉ์ ์ํ/์๋น์ค๋ช
  price: number; // ํญ๋ชฉ์ ๊ธ์ก
  tag: string; // ํญ๋ชฉ ๋ถ๋ฅ ํ๊ทธ: ๊นํ, ๋ฐฅ, ํ์ฅํ, ์ท ๋ฑ (์์ฑ์๊ฐ ์ง์  ํ๊ทธ ๋ฑ๋ก)
  description?: string; // ํญ๋ชฉ๋ณ ๊ฐ๋จ ๊ธฐ๋ก (์๊ฐ, ์๊ฒ ๋ ์  ๋ฑ)
};
```

## ๐  ๊ตฌํ ๊ธฐ๋ฅ
### 1์ฐจ MVP 
1. ์ง์ถ ๋ฑ๋ก
2. ์ง์ถ ์กฐํ (์ ์ฒด, ์ฃผ๋ณ, ์ผ๋ณ, ํ๊ทธ๋ณ)
3. ์ง์ถ๋ณ ์์ธ ํ์ธ (Detail)
4. ์ง์ถ ์์  ๋ฐ ์ญ์ 
5. ๋ฐ์ดํฐ ์ค required ์์ฑ ์ฐ์  ๊ตฌํ


### 2์ฐจ MVP 
1. optional ๋ฐ์ดํฐ ์ถ๊ฐ ๊ตฌํ (diaries, description)
2. ๊ฒ์ ์์ง ์ต์ ํ (SEO)


### for UX
1. ์๋ก๊ณ ์นจ ๋ฐ ๋ธ๋ผ์ฐ์  ์ข๋ฃ ์์๋ ์ ์ง
2. ์๋ฆผ Toast (react-toastify)

### ์ถ๊ฐ ์์ 
1. ๊ฐ ํญ: ๋ ์ง๋ณ ์ ๋ ฌ
2. ํ๊ทธ๋ณ ํญ: ๊ทธ๋ํ๋ ์ฐจํธ๋ก ์๊ฐ์  ํ์ธ


## ๐ ๋ชจ๋ํ


1. recoil ๊ด๋ จ import๋ฌธ
[ ์์  ์  ]
* ๋ผ์ด๋ธ๋ฌ๋ฆฌ ํจํค์ง recoil๊ณผ ๋ก์ปฌ recoil ํด๋๊ฐ ์ ๊ตฌ๋ถ๋์ง ์์ (2๋ฒ์งธ ์ค๋ถํฐ๋ ๋ก์ปฌ recoil ํด๋)
* recoil ํด๋์์ atom์ด๋ selector๋ฅผ ๊ฐ์ ธ์ฌ ๋๋ง๋ค **๋งค๋ฒ import ๋ผ์ธ์ด ์ถ๊ฐ๋จ**
* ๊ตฌ์ฒด์ ์ธ ์ด๋ฆ์ ์ํด **๊ธด ๋ณ์๋ช**์ ์ฌ์ฉํ๋ ๊ณผ์ ์์ **๊ฐ atom๊ณผ selector๊ฐ ์ด๋ค ์ญํ ์ธ์ง ์ ์ธ์ง๋์ง ์์**

```
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalDateState } from 'recoil';
import { toggleCalendarSelector } from 'recoil';
```

[ ์ดํ ]
* ๋ก์ปฌ recoil ํด๋์์ atom๊ณผ selector ํด๋๋ก ํ๋ฒ ๋ ๋๋ -> **importํ ๊ฒ์ ์ถ์ฒ๊ฐ atom์ธ์ง selector์ธ์ง ๋ถ๋ชํด์ง**
* **ํจํค์ง recoil๊ณผ ๋ก์ปฌ recoil ํด๋๊ฐ ํ์คํ ๊ตฌ๋ถ๋จ**
* atom๊ณผ selector๋ค์ **์ฉ๋์ ๋ง๋ ์ด๋ฆ**์ผ๋ก ํ๋ฒ ๋ ๋๋ ์ export -> **importํ ํ์ผ ๋ด์์ ์ฉ๋๊ฐ ์ง๊ด์ ์ผ๋ก ์๋ณ๋จ** <br/>
์: atom์ ADate(๋ ์ง ๊ด๋ จ atom), AOpen(๋ชจ๋ฌ/ํ์ ์ฌ๋ซ๊ธฐ ๊ด๋ จ atom)<br/>
์: selector์ SMain(transaction ๋ฑ ์ฃผ์ ๋ฐ์ดํฐ๋ฅผ ๋ณ๊ฒฝํ๋ selector)
```
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ADate, AOpen } from 'recoil/atom';
import { SMain } from 'recoil/selector';
```

## ๐ [Velog ๊ตฌํ ์์ธ ๊ธฐ๋ก (ํด๋ฆญ!)](https://velog.io/@yena1025/Flying-Money-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%A1%9D)

## ๐ ํด๋ ๊ตฌ์กฐ

```
๐ฆsrc
 โฃ ๐components
 โ โฃ ๐Calendar
 โ โ โฃ ๐DateCells
 โ โ โ โฃ ๐DateCells.module.scss
 โ โ โ โ ๐DateCells.tsx
 โ โ โฃ ๐Header
 โ โ โ โฃ ๐CalendarHeader.module.scss
 โ โ โ โ ๐CalendarHeader.tsx
 โ โ โฃ ๐Calendar.module.scss
 โ โ โ ๐Calendar.tsx
 โ โฃ ๐Icons
 โ โ โฃ ๐Calendar
 โ โ โ โฃ ๐Calendar.module.scss
 โ โ โ โ ๐Calendar.tsx
 โ โ โฃ ๐CalendarArrow
 โ โ โ โฃ ๐CalendarArrow.module.scss
 โ โ โ โ ๐CalendarArrow.tsx
 โ โ โฃ ๐PlusItem
 โ โ โ โฃ ๐PlusItem.module.scss
 โ โ โ โ ๐PlusItem.tsx
 โ โ โ ๐index.ts
 โ โฃ ๐Main
 โ โ โฃ ๐Banner
 โ โ โ โฃ ๐Banner.module.scss
 โ โ โ โ ๐Banner.tsx
 โ โ โฃ ๐Header
 โ โ โ โฃ ๐Header.module.scss
 โ โ โ โ ๐Header.tsx
 โ โ โ ๐index.ts
 โ โฃ ๐Modal
 โ โ โฃ ๐Add
 โ โ โ โฃ ๐AddUI
 โ โ โ โ โฃ ๐Date
 โ โ โ โ โ โฃ ๐Date.module.scss
 โ โ โ โ โ โ ๐Date.tsx
 โ โ โ โ โฃ ๐List
 โ โ โ โ โ โฃ ๐Input
 โ โ โ โ โ โ โฃ ๐Input.module.scss
 โ โ โ โ โ โ โ ๐Input.tsx
 โ โ โ โ โ โฃ ๐List.module.scss
 โ โ โ โ โ โ ๐List.tsx
 โ โ โ โ โฃ ๐SubmitBtn
 โ โ โ โ โ โฃ ๐SubmitBtn.module.scss
 โ โ โ โ โ โ ๐SubmitBtn.tsx
 โ โ โ โ โฃ ๐TagPopup
 โ โ โ โ โ โฃ ๐TagPopup.module.scss
 โ โ โ โ โ โ ๐TagPopup.tsx
 โ โ โ โ โฃ ๐Title
 โ โ โ โ โ โฃ ๐Title.module.scss
 โ โ โ โ โ โ ๐Title.tsx
 โ โ โ โ โ ๐index.ts
 โ โ โ โฃ ๐Add.module.scss
 โ โ โ โ ๐Add.tsx
 โ โ โฃ ๐Detail
 โ โ โ โฃ ๐All
 โ โ โ โ โฃ ๐AllDetail.module.scss
 โ โ โ โ โ ๐AllDetail.tsx
 โ โ โ โฃ ๐ByDate
 โ โ โ โ โฃ ๐ByDateDetail.module.scss
 โ โ โ โ โ ๐ByDateDetail.tsx
 โ โ โ โ ๐DetailUI
 โ โ โ โ โฃ ๐ActionButton
 โ โ โ โ โ โฃ ๐ActionButton.module.scss
 โ โ โ โ โ โ ๐ActionButton.tsx
 โ โ โ โ โฃ ๐ItemList
 โ โ โ โ โ โฃ ๐ItemList.module.scss
 โ โ โ โ โ โ ๐ItemList.tsx
 โ โ โ โ โฃ ๐TotalExpense
 โ โ โ โ โ โฃ ๐TotalExpense.module.scss
 โ โ โ โ โ โ ๐TotalExpense.tsx
 โ โ โ โ โ ๐index.ts
 โ โ โฃ ๐Layout
 โ โ โ โฃ ๐ModalLayout.module.scss
 โ โ โ โ ๐ModalLayout.tsx
 โ โ โฃ ๐Toast
 โ โ โ โฃ ๐Toast.module.scss
 โ โ โ โ ๐Toast.tsx
 โ โ โ ๐index.ts
 โ โฃ ๐RootToast
 โ โ โ ๐RootToast.tsx
 โ โ ๐TabMenu
 โ โ โฃ ๐All
 โ โ โ โฃ ๐All.module.scss
 โ โ โ โ ๐All.tsx
 โ โ โฃ ๐ByDate
 โ โ โ โฃ ๐Header
 โ โ โ โ โฃ ๐Header.module.scss
 โ โ โ โ โ ๐Header.tsx
 โ โ โ โฃ ๐ByDate.module.scss
 โ โ โ โ ๐ByDate.tsx
 โ โ โฃ ๐ByTag
 โ โ โ โฃ ๐ByTag.module.scss
 โ โ โ โ ๐ByTag.tsx
 โ โ โฃ ๐ByWeek
 โ โ โ โฃ ๐Header
 โ โ โ โ โฃ ๐Header.module.scss
 โ โ โ โ โ ๐Header.tsx
 โ โ โ โฃ ๐ByWeek.module.scss
 โ โ โ โ ๐ByWeek.tsx
 โ โ โฃ ๐Layout
 โ โ โ โฃ ๐TabMenuLayout.module.scss
 โ โ โ โ ๐TabMenuLayout.tsx
 โ โ โ ๐index.ts
 โฃ ๐pages
 โ โ ๐Home
 โ โ โฃ ๐Home.module.scss
 โ โ โ ๐Home.tsx
 โฃ ๐recoil
 โ โฃ ๐atom
 โ โ โฃ ๐dateState.ts
 โ โ โฃ ๐index.ts
 โ โ โฃ ๐indexState.ts
 โ โ โฃ ๐mainState.ts
 โ โ โ ๐openState.ts
 โ โ ๐selector
 โ โ โฃ ๐dateSelector.ts
 โ โ โฃ ๐index.ts
 โ โ โฃ ๐mainSelector.ts
 โ โ โ ๐openSelector.ts
 โฃ ๐styles
 โ โฃ ๐globals.scss
 โ โ ๐mixins.scss
 โฃ ๐types
 โ โฃ ๐index.ts
 โ โฃ ๐mainType.ts
 โ โ ๐tabMenuType.ts
 โฃ ๐utils
 โ โฃ ๐constants
 โ โ โฃ ๐clickedIndex.ts
 โ โ โฃ ๐date.ts
 โ โ โฃ ๐index.ts
 โ โ โ ๐mainData.ts
 โ โฃ ๐hooks
 โ โ โฃ ๐changeMonth.ts
 โ โ โฃ ๐formatDate.ts
 โ โ โฃ ๐formatMoney.ts
 โ โ โฃ ๐index.ts
 โ โ โ ๐popupToast.ts
 โ โฃ ๐libraries
 โ โ โฃ ๐dateFns.ts
 โ โ โ ๐index.ts
 โ โ ๐index.ts
 โฃ ๐App.tsx
 โ ๐index.tsx
```
