# 📝 Todo App

Next.js 14(App Router)와 TypeScript를 활용해 만든 간단한 **할 일 관리 애플리케이션**입니다.  
할 일 추가, 완료/취소, 삭제, 상세 페이지 이동 기능을 지원합니다.  

---

## 🚀 주요 기능

- **할 일 추가** : 새로운 TODO를 작성할 수 있습니다.
- **완료/취소 토글** : TODO 항목을 완료/미완료로 변경할 수 있습니다.
- **삭제 기능** : 필요 없는 항목을 제거할 수 있습니다.
- **상세 페이지 이동** : 할 일을 클릭하면 상세 화면으로 이동합니다.
- **API 연동** : Swagger 문서 기반 API 규칙을 준수합니다.

---

## 🛠️ 기술 스택

- [Next.js 14 (App Router)](https://nextjs.org/)
- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)  
- API 연동: `fetch` 기반 커스텀 fetcher

---

## 📂 폴더 구조

```bash
todo-app/
└─ src
   ├─ app
   │  └─ items
   │      └─ [itemId]   # 개별 아이템 상세 페이지
   ├─ components        # UI 컴포넌트 (Input, SearchBar, CheckList 등)
   ├─ lib               # API 연동(fetcher)
   └─ types             # TypeScript 타입 정의 (Item 등)
```

---

## ⚡ 실행 방법

### 1. 프로젝트 클론
```bash
git clone https://github.com/<your-username>/todo-app.git
cd todo-app
```

### 2. 패키지 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000) 으로 접속합니다.

---

## 🌐 배포

본 프로젝트는 [Vercel](https://vercel.com/)을 통해 손쉽게 배포할 수 있습니다.  
GitHub 저장소를 연결하면 자동으로 빌드 및 배포됩니다.  

---

## ✅ 현재 진행 상황

- [x] Todo 추가
- [x] Todo 완료/취소 토글
- [x] Todo 삭제
- [x] 상세 페이지 라우팅
- [ ] 상세 페이지 UI 개선
- [ ] Swagger API 기반 검증 강화

---

## 📜 라이선스
MIT License
