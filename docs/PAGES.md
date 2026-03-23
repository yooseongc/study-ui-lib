# 문서 사이트 페이지 구조

## 홈
- `/` — 개요, 디자인 철학, 빠른 시작

## 시작하기
- `/getting-started` — 설치 (git submodule, pnpm, 설정)

## Style Guide
- `/style-guide/typography` — 폰트 체계 (Pretendard Variable, JetBrains Mono, 한글/영문 혼용, 크기/굵기 스케일)
- `/style-guide/colors` — oklch 색상 팔레트 (시맨틱 색상, 컴포넌트 색상 15종, D3 시각화 색상, Dark/Light 비교)
- `/style-guide/spacing` — 간격/여백 체계 (Tailwind 스케일, 컴포넌트 간격 규칙)
- `/style-guide/layout` — 레이아웃 패턴 (3단 레이아웃, 반응형 breakpoint, 모바일 적응)
- `/style-guide/dark-mode` — 다크 모드 가이드 (ThemeProvider, oklch 전환 원리, 컴포넌트별 비교)

## Components
- `/components/layout` — AppLayout, Sidebar, TableOfContents, BackToTop
- `/components/ui` — Alert, InfoBox, StatCard, Section, Prose, InfoTable, CardGrid, InlineCode, LearningCard, TopicNavigation, GlossaryTooltip, SourceRef
- `/components/viz` — CodeBlock, D3Container, MermaidDiagram, WebGLCanvas, AnimatedDiagram
- `/components/d3-dsl` — D3 DSL 헬퍼 시스템 (D3Theme, addNode, addArrow, addLabel, addLegend)
- `/components/search` — SearchModal

## Customization
- `/customization/study-provider` — StudyProvider 설정, SiteConfig 구조
- `/customization/hooks` — useAnimationStep, useD3, useThree
- `/customization/extending` — 컴포넌트 확장/오버라이드 가이드
