# 문서 사이트 페이지 구조

## 홈
- `/` — 개요, 컴포넌트 카탈로그, 빠른 시작 ✅

## Style Guide
- `/style-guide/typography` — 폰트 체계 (Pretendard Variable, JetBrains Mono, 한글/영문 혼용, 크기/굵기 스케일) ✅
- `/style-guide/colors` — oklch 색상 팔레트 (시맨틱 색상, 컴포넌트 색상 15종, D3 시각화 색상, Dark/Light 비교) ✅
- `/style-guide/spacing` — 간격/여백 체계 (Tailwind 스케일, 컴포넌트 간격 규칙, D3 spacing 토큰) ✅

## Components
- `/components/layout` — AppLayout, Sidebar, TableOfContents, BackToTop, TopicPage, TopicHeader ✅
- `/components/ui` — Alert, InfoBox, StatCard, Section, Prose, InfoTable, CardGrid, InlineCode, SourceRef ✅
- `/components/viz` — CodeBlock, MermaidDiagram, AnimatedDiagram ✅
- `/components/d3-dsl` — D3 DSL 헬퍼 시스템 (createD3Theme, addNode, addArrow, addLabel, addLegend) ✅
- `/components/search` — SearchModal (검색 기능, 키보드 단축키, 점수 체계, SiteConfig 연동) ✅

## Theme & Context
- `/theme` — ThemeProvider, StudyProvider, SiteConfig, useTheme, useIsDark, 다크 모드 ✅

## Customization
- `/customization/hooks` — useAnimationStep, useD3, useThree, useTheme, useIsDark, useStudyConfig ✅

## 기존 페이지에서 커버 (별도 페이지 불필요)
- 레이아웃 패턴 → LayoutPage (`/components/layout`) 반응형 섹션에서 커버
- 다크 모드 가이드 → ThemePage (`/theme`) 다크 모드 동작 섹션에서 커버
- StudyProvider 설정 → ThemePage (`/theme`) + LayoutPage에서 커버
- 컴포넌트 확장 → UIComponentsPage (`/components/ui`) 확장 섹션에서 커버
