# 진행사항

## Sprint 1: 프로젝트 초기화 및 기반 설정 — 완료 (2026-03-23)

- [x] pnpm workspace 모노레포 구조 (pnpm-workspace.yaml, root package.json)
- [x] tsconfig.base.json 공통 TypeScript 설정
- [x] packages/ui 패키지 설정 (package.json, tsconfig.json)
- [x] 타입 시스템: Topic, GlossaryEntry, GlossaryConfig, SectionEntry, SiteConfig
- [x] ThemeContext + ThemeProvider (dark/light, localStorage)
- [x] StudyContext + StudyProvider (SiteConfig 기반 데이터 주입)
- [x] useTheme, useIsDark hooks
- [x] colors.ts (oklch 기반 themeColors + createColorMap)
- [x] base.css (Tailwind + 폰트 + 스크롤바)
- [x] barrel export (index.ts)
- [x] docs/PAGES.md, docs/PROCESS.md, docs/STYLE.md 초안
- [x] pnpm install 및 타입 체크 통과

## Sprint 2: Category A 컴포넌트 추출 — 완료 (2026-03-23)

- [x] UI: Alert, InfoBox, StatCard, Section, Prose, InfoTable, CardGrid, InlineCode, SourceRef
- [x] Layout: BackToTop, TableOfContents
- [x] Viz: CodeBlock, D3Container, MermaidDiagram, WebGLCanvas, AnimatedDiagram
- [x] Hooks: useAnimationStep, useD3, useThree
- [x] D3Theme 타입 및 createD3Theme 함수
- [x] 타입 체크 통과

## Sprint 3: Category B+C 컴포넌트 일반화 — 완료 (2026-03-23)

- [x] Sidebar: 하드코딩 → useStudyConfig() (topics, name, subtitle, footerLinks)
- [x] AppLayout: 하드코딩 → useStudyConfig().name
- [x] SearchModal: 직접 import → useStudyConfig() (topics, glossary, searchIndex)
- [x] TopicNavigation: kernelTopics → useStudyConfig().topics
- [x] LearningCard: kernelTopics → useStudyConfig().topics
- [x] GlossaryTooltip (T): glossary/카테고리 상수 → useStudyConfig().glossary
- [x] KernelRef + RfcRef → SourceRef 통합
- [x] 타입 체크 통과

## Sprint 4: D3 DSL 빌더 시스템 — 완료 (2026-03-23)

- [x] D3Theme 인터페이스 (colors, fonts, spacing, border, transition)
- [x] createD3Theme(isDark) 함수
- [x] D3 헬퍼 함수: addLabel, addNode, addArrow, addLegend
- [x] D3Container에 D3Theme 타입 지원 (renderFn 시그니처 확장)
- [x] 타입 체크 통과

## Sprint 5: 폰트 전략 & 스타일 가이드 — 완료 (2026-03-23)

- [x] docs/STYLE.md에 폰트 체계 문서화
- [x] base.css에 한글 fallback 포함 font-family 스택 설정

## 코드 리뷰 & 버그 수정 — 완료 (2026-03-23)

### CRITICAL 수정
- [x] TopicNavigation: `<a href="#...">` → `<Link to={...}>` (React Router 호환)
- [x] CodeBlock: setTimeout 클린업 누락 → useRef + useEffect cleanup
- [x] useTheme: Provider 없이 사용 시 무음 실패 → null context + throw Error
- [x] ThemeProvider: localStorage SSR 가드 추가 (try-catch)
- [x] useD3/useThree: top-level import → dynamic import() (d3/three 미설치 시 크래시 방지)

### HIGH 수정
- [x] GlossaryEntry 타입: aliases/topicRef 호환성 주석 문서화
- [x] SearchModal: 매 키스트로크 O(n) → useCallback + useMemo 캐싱
- [x] LearningCard: filter(Boolean) → type predicate로 타입 좁힘

### MEDIUM 수정
- [x] MermaidDiagram: globalId → useId() + renderSeq (안정적 ID 생성)

### 확인된 잔여 이슈 (LOW / 의도적 보류)
- [ ] 한국어 UI 텍스트 하드코딩 (i18n 필요 시 추후)
- [ ] InfoTable 커스텀 셀 렌더링 미지원 (확장 필요 시 추후)
- [ ] CardGrid 4열 반응형 중간 breakpoint 미적용

## 3회 추가 검토 사이클 — 완료 (2026-03-23)

### 사이클 1/3: 컴포넌트 완결성
- [x] AnimatedDiagram: 빈 steps 배열 방어 (early return + Math.max)
- [x] SearchModal: definition 잘림 시 불필요한 '...' 방지
- [x] SearchModal: 검색 결과 key에 type prefix 추가 (ID 충돌 방지)
- [x] TableOfContents: non-null assertion 제거 → 명시적 null 체크
- [x] d3-helpers: ownerSVGElement null 시 fallback (this 반환)

### 사이클 2/3: 통합 호환성 & 빌드
- [x] 순환 의존성: 없음 확인
- [x] consumer 프로젝트 drop-in 호환성: 확인 (BrowserRouter basename 유지)
- [x] 하드코딩된 라우트: 없음 확인 (모든 라우트 SiteConfig 기반)
- [x] peer dependency 버전: 양쪽 프로젝트 100% 호환
- [x] 누락 타입 export 추가: InfoBoxColor, StatColor, AlertVariant, AnimationStep
- [x] GlossaryTooltip: T와 GlossaryTooltip 둘 다 export

### 사이클 3/3: 확장성 & 최종 정합성
- [x] className prop 추가: Alert, Section, Prose, StatCard, InlineCode, SourceRef, CodeBlock
- [x] 모든 export 누락 없음 확인 (43+ exports)
- [x] 최종 타입 체크 통과

## Sprint 6: 문서화 사이트 — 완료 (2026-03-23)

- [x] packages/docs-site Vite + React 앱 설정 (package.json, tsconfig, vite.config)
- [x] AppLayout dogfooding — 라이브러리 자체 레이아웃 사용
- [x] StudyProvider + SiteConfig 설정 (문서 사이트 전용)
- [x] 페이지 구현:
    - HomePage: 개요, 빠른 시작 가이드
    - TypographyPage: 폰트 패밀리, 크기/굵기 라이브 프리뷰, 한영 혼용 예시
    - ColorsPage: oklch 시맨틱 색상 스와치, D3 색상 8종, InfoBox 15색 비교
    - UIComponentsPage: Alert, InfoBox, StatCard, InfoTable, Prose, InlineCode, SourceRef, CardGrid
    - VizComponentsPage: CodeBlock, MermaidDiagram, AnimatedDiagram
    - LayoutPage: AppLayout 구조, StudyProvider, 반응형 동작, 키보드 단축키
- [x] pnpm install + typecheck + vite build 통과
- [x] lint 통과 (eslint globalIgnores dist 수정)

## Sprint 7: kernel-study 통합 — 완료 (2026-03-23)

- [x] git submodule 추가 + tsconfig path alias + Vite resolve alias
- [x] Tailwind @source 경로 추가
- [x] SiteConfig + StudyProvider 래핑 (App.tsx)
- [x] 22개 로컬 컴포넌트/hook/context 파일 삭제 → @study-ui/components 교체
- [x] concepts/ D3 시각화 컴포넌트 import 경로 교체
- [x] font-mono 스타일 가이드 위반 수정 (테이블 헤더/셀, 카드 텍스트)
- [x] 단순 카드 → InfoBox/CardGrid 교체 (topic01, 03, 05)
- [x] InfoTable 확장 (TableColumn, striped, mono, align, ReactNode 셀)
- [x] topic01 직접 테이블 2개 → InfoTable 교체
- [x] topic02 직접 테이블 2개 → InfoTable 교체
- [x] 빌드 성공 + 커밋/푸시 완료

## Sprint 7: network-study 통합 — 완료 (2026-03-24)

- [x] git submodule 추가 + tsconfig path alias + Vite resolve alias
- [x] Tailwind @source 경로 추가
- [x] SiteConfig + StudyProvider 래핑 (App.tsx)
- [x] 23개 로컬 컴포넌트/hook/context 파일 삭제 → @study-ui/components 교체
- [x] concepts/ D3 시각화 컴포넌트 import 경로 교체
- [x] font-mono 스타일 가이드 위반 수정 (Glossary, Home, 토픽 부제목 15곳)
- [x] 빌드 성공 + CI 통과

## TopicHeader / TopicPage 추가 — 완료 (2026-03-24)

- [x] TopicHeader 컴포넌트: topicId → StudyConfig에서 번호/제목/부제목/설명 자동 렌더링
- [x] TopicPage 컴포넌트: TopicHeader + LearningCard + children + TopicNavigation 래핑
- [x] kernel-study 13개 토픽 적용 + CI 통과
- [x] network-study 15개 토픽 적용 + CI 통과
- [x] docs-site LayoutPage에 쇼케이스 추가

## 문서화 개선 — 완료 (2026-03-24)

- [x] README.md 작성 (프로젝트 소개, 컴포넌트 목록, 설치 가이드)
- [x] docs/STYLE.md 현행화 (oklch 값, TopicPage, D3 DSL, Context 시스템)
- [x] docs-site ThemePage (ThemeProvider, StudyProvider, SiteConfig, 의존성 표)
- [x] docs-site D3DslPage (createD3Theme, addNode/Arrow/Label/Legend, Before/After 비교)
- [x] docs-site HomePage에 Theme & D3 DSL 링크 추가
- [x] docs-site siteConfig에 Theme, D3 DSL 토픽 추가
