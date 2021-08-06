# 우아한 가계부 - 3팀

## 개요
- [데모](https://github.com/woowa-techcamp-2021/cashbook-03#데모)
- [스크린샷](https://github.com/woowa-techcamp-2021/cashbook-03#스크린샷)
- [프로젝트 구조](https://github.com/woowa-techcamp-2021/cashbook-03#프로젝트-구조)
- [진행 과정](https://github.com/woowa-techcamp-2021/cashbook-03#진행-과정)

## 데모
- ### [프로젝트 링크](http://ec2-52-78-160-142.ap-northeast-2.compute.amazonaws.com/calendar)
- ### 테스트용 계정
  - ID: ```test@woowa.com```
  - PW: ```1234```
- ### [소개 영상](https://youtu.be/McrdrI2Hll0)

## 스크린샷
<img width="1792" alt="스크린샷 2021-08-06 오후 1 44 08" src="https://user-images.githubusercontent.com/31500012/128457310-da43c423-84f7-4469-a5d0-939f597b14b8.png">
<img width="1792" alt="스크린샷 2021-08-06 오후 1 48 51" src="https://user-images.githubusercontent.com/31500012/128457514-d6535fd9-e6ec-4f0e-af93-f4f0878d3c64.png">
<img width="1792" alt="스크린샷 2021-08-06 오후 1 44 51" src="https://user-images.githubusercontent.com/31500012/128457526-9441c45c-4655-476d-b16e-a52c09ec794c.png">



## 프로젝트 구조

#### 클라이언트
```bash
src
├── index.html     # 웹팩에서 로드하는 HTML
├── public         # 정적 파일
├── App.ts         # Entry Point (pages, store, Router 등 임포트)
├── Router.ts      # 클라이언트 라우터
├── pages          # 클래스로 선언된 각 페이지
├── components     # 인자를 받아서 html string을 리턴하는 함수들
├── containers     # View의 인스턴스들
├── store          # Observable의 인스턴스들
└── utils 
    ├── Observable    # 옵저버블 객체 (전역 상태 관리에 이용)
    ├── View          # store 구독, 상태 관리, 랜더링 (컴포넌트 호출), 이벤트 핸들링
    ├── api           # API 서버 요청
    └── loader        # 로딩 UI
```

#### 서버
```bash
src
│   app.ts              # App entry point
├── config              # 환경변수 및 설정
├── loaders             # 시작 프로세스 모듈화 (express, sequelize, session)
├── models              # 데이터베이스 핸들링 (sequelize)
├── controllers         # 컨트롤러
├── service             # 비즈니스 로직
├── repository          # 쿼리문
├── error               # 에러 처리
├── middleware          # 미들웨어
├── passport            # 패스포트(auth)
└── types               # 타입스크립트 타입 지정
```

#### ERD
<img width="511" alt="스크린샷 2021-08-05 오후 11 19 54" src="https://user-images.githubusercontent.com/57904979/128365936-da2a4522-def0-4c3c-bff3-d38067276426.png">

## 진행 과정
#### 목표
- 팀원 둘 다 BE가 미완성인 상태에서 FE를 만들면 나중에 연동 작업 등에서 힘들어진다는 점에 공감하여 BE를 우선적으로 개발을 진행하기로 함
- FE, BE 구조를 잘 잡는 데 신경을 많이 썼음
- 배포는 미리 미리 해보고 항상 배포 가능한 코드를 유지
- 요구사항에 주어진 기능은 모두 구현하는 것을 목표로 하되 중간중간 리팩토링 진행
- 코드 리뷰는 최대한 꼼꼼하게

#### 1주차
- 팀 목표 설정, 컨벤션 논의
- 마일스톤 설정
- 각각 FE, BE 구조 잡아보고 리뷰
- BE 위주로 개발

#### 2주차
- FE 구조 리팩토링
- 본격적인 기능 구현
- FE, BE 연동
- 최종 배포

#### [활동 기록](https://github.com/woowa-techcamp-2021/cashbook-03/wiki/%ED%8C%80-%ED%99%9C%EB%8F%99-%EA%B8%B0%EB%A1%9D)
