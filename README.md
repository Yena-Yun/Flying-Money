# 💸 Flying Money (플라잉 머니)

* 수기로 작성하던 가계부를 웹으로 개발하고 싶어 제작
* 역할: **기획, 디자인, 개발, 배포 1인 진행**

### 🚀 [Vercel 배포 링크](https://flying-money.vercel.app/)


<img src="https://user-images.githubusercontent.com/68722179/232470181-881751ac-84e5-4276-aaed-a5176fe046c5.gif" width="500" />


## 🧨 실행 방법
```
git clone -> yarn install -> yarn dev
```


## 🪀 기술 스택
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Recoil](https://img.shields.io/badge/recoil-f26b00?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBmaWxsPSJub25lIiBoZWlnaHQ9IjI1MDAiIHdpZHRoPSIyMzY4IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjMwIDExIDI3LjUgNzgiPjxyZWN0IGZpbGw9IiNmMjZiMDAiIGhlaWdodD0iOTUiIHJ4PSIxMCIgd2lkdGg9IjYwIi8+PGNpcmNsZSBjeD0iNDMuNSIgY3k9IjE4LjUiIGZpbGw9IiNmZmYiIHI9IjcuNSIvPjxjaXJjbGUgY3g9IjQzLjUiIGN5PSI4MS41IiBmaWxsPSIjZmZmIiByPSI3LjUiLz48ZyBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMyI+PHBhdGggZD0iTTQzLjk5OSAyNUM0Mi41IDM3IDU3LjUgMzQgNTcuNSA0Mi41YzAgNS01Ljg3OCA2LjM2NS0xMy41MDEgN0MzNy45OTkgNTAgMzAgNTAgMzAgNThzMTYgNS41IDEzLjk5OSAxN00zNC4xMzIgMzMuMzUzYzAgMTUuMjg5IDIzLjE1IDE4LjI4OSAyMy4xNSAzMi42MiIvPjwvZz48L3N2Zz4=)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ 요약
* 수입 상관 없이 **지출 줄이기에 집중하여 지출만 기록하는 가계부**
* [**Lighthouse 성능 개선 과정** 블로그](https://velog.io/@yena1025/%ED%94%8C%EB%9D%BC%EC%9E%89-%EB%A8%B8%EB%8B%88-Lighthouse-%EC%B5%9C%EC%A0%81%ED%99%94-%EA%B8%B0%EB%A1%9D)🔗

## 🍬 구현 기능

* **일별, 주별, 태그별 지출 확인** 
* **날짜당 여러 개의 항목 등록** 가능 (조회에서 '~외 +(추가된 갯수)'로 조회)
* 지출을 분류하기 위한 **사용자 커스텀 태그 등록**

1. **새 지출항목 등록**
<img src="https://user-images.githubusercontent.com/68722179/226583033-f2585e2c-ea79-4ace-bd74-26b618dd1c09.png" width='400'/>

2. **탭별 조회** (전체 보기, 날짜별 보기)
<img src="https://user-images.githubusercontent.com/68722179/226578461-78b72872-4ec3-4aeb-929e-43545dd5833f.png" width='400'/>

3. **지출항목 상세 확인 모달**
<img src="https://user-images.githubusercontent.com/68722179/226584845-ceafc8be-f517-408c-a6e7-60f988af6897.png" width='400'/>

4. **커스텀 태그 등록**

<img src="https://user-images.githubusercontent.com/68722179/226578099-028d3c6c-40cf-45aa-a198-af8dac4fa8c7.png" width='400'/>)

5. **상세 모달에서 확인 및 삭제**
<img src="https://user-images.githubusercontent.com/68722179/226578903-65887a45-52f4-4822-ad7e-0f3fdc9278cd.png" width='400'/>

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


## 🧙‍♀️ UX 개선 내역
1. 등록된 커스텀 태그는 브라우저 종료 후에도 유지 (localStorage)
2. debounce로 인풋 입력 최적화 (use-debounce)
3. 제출 시 비어있는 입력란이 있으면 화면 상단에 toast 알림 (react-toastify)
<img src="https://user-images.githubusercontent.com/68722179/226586966-0bab7157-5a5f-49c1-906c-8d8a9ed5e637.png" width='400'/>

4. 원활한 앱 사용을 위한 가이드 문구 추가 <br/>

<img src="https://user-images.githubusercontent.com/68722179/226577742-e451654f-49de-499b-8431-686330105914.png" width='400'/> <br/>
<img src="https://user-images.githubusercontent.com/68722179/226592909-621bf8d9-a37d-4636-8a41-488aa2f2fd81.png" width='400'/>


5. 새 등록 모달에서 항목 추가 시 아래로 자동 스크롤
 - 항목이 2개 이상일 때만 오른쪽에 '-' 버튼 렌더링
<img src="https://user-images.githubusercontent.com/68722179/226580631-f1ed00cc-d158-4623-a17a-463d5ec94667.png" width='400'/>

```
  useEffect(() => {
    if (list.length < 2) return;
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [list]);
```

## 🍹 코드 리팩토링
- 목적: **조건에 맞는 컴포넌트 렌더링**하기
- 수정 전: 삼항연산자 사용 - 컴포넌트 갯수가 많아질수록 **JSX에 계속 코드가 추가되는 문제 예상됨**
- 수정 후: 렌더링할 컴포넌트를 **객체로 선언**하여 **key에 맞는 컴포넌트 렌더링** (`keyof typeof`로 타입 지정)
```
// 수정 전

return (
    {clickedTabName === 'byAll' ? (
        <All />
      ) : clickedTabName === 'byWeek' ? (
        <ByWeek />
      ) : clickedTabName === 'byDate' ? (
        <ByDate />
      ) : null}
);
```

```
// 수정 후

  const RENDER_BY_TAB = {
    byAll: <All />,
    byWeek: <ByWeek />,
    byDate: <ByDate />,
  };

...
return (
    ...
    {RENDER_BY_TAB[clickedTabName as keyof typeof RENDER_BY_TAB]}
);
```


## 🚀 최적화
- **CRA를 Vite로 마이그레이션**하여 빌드 속도 97.5% 상승 (20초 -> 0.5초)
- [**Lighthouse 성능 최적화**](https://velog.io/@yena1025/%ED%94%8C%EB%9D%BC%EC%9E%89-%EB%A8%B8%EB%8B%88-Lighthouse-%EC%B5%9C%EC%A0%81%ED%99%94-%EA%B8%B0%EB%A1%9D)로 성능 점수 91.6% 상승 (48점 -> 92점)


## 🛍 이슈 해결
**[ 계기 ]**
* 전역 상태 관리 과정에서 **atom과 selector 갯수가 늘어남**
* **적절한 파일/폴더 구조로 분리**하여 이후 작업에 편할 수 있도록 관리하고 싶어짐

**[ 수정 전 ]**
```
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { addModalDateState } from 'recoil';
import { toggleCalendarSelector } from 'recoil';
```

1. import문에서 **라이브러리 recoil인지 로컬 recoil 폴더인지 잘 구분되지 않음**
2. recoil 폴더에서 atom이나 selector를 가져올 때마다 매번 import 라인이 추가됨
3. 구체적인 이름을 위해 **긴 변수명**을 사용하며 **atom과 selector가 잘 구분되지 않음**

**[ 수정 후 ]**
```
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ADate, AOpen } from 'recoil/atom';
import { SMain } from 'recoil/selector';
```

* 로컬 recoil 폴더 내에 atom과 selector 폴더로 구분하여 import할 때 라이브러리 recoil과 확실히 구분됨
* 역할과 관련된 짧은 그룹명(예: Date 관련 atom => ADate)으로 묶어서 내보내서 다음 효과를 얻음
  * atom인지 selector인지 바로 알아볼 수 있음
  * 역할(Date인지 모달 Open인지) 바로 구분 가능
  * 불필요하게 import문이 길어지지 않음 
  * 해당 그룹명이 이미 import되어 있을 경우 개별 atom 및 selector마다 import 라인이 매번 추가되지 않음

