# study-ui-lib

`kernel-study`와 `network-study`의 공통 UI 컴포넌트 라이브러리입니다.

- [Style Guide & Docs](https://yooseongc.github.io/study-ui-lib/)
- [kernel-study](https://github.com/yooseongc/kernel-study)
- [network-study](https://github.com/yooseongc/network-study)

## Tech Stack

React 19 + TypeScript + Tailwind CSS 4 + Vite

## Components

### Layout
| Component | Description |
|-----------|------------|
| `AppLayout` | 3단 레이아웃 (Sidebar \| Content \| TOC), 모바일 드로어, Cmd+K 검색 |
| `Sidebar` | 토픽 네비게이션, 검색, 테마 토글 |
| `TableOfContents` | h2/h3 자동 탐지, IntersectionObserver 활성 추적 |
| `BackToTop` | 플로팅 스크롤 버튼 |

### UI
| Component | Description |
|-----------|------------|
| `TopicPage` | 토픽 페이지 전체 래퍼 (헤더 + LearningCard + children + 하단 네비) |
| `TopicHeader` | 토픽 번호/제목/부제목/설명 자동 렌더링 |
| `Section` | id + title 섹션 래퍼 (TOC 연동) |
| `Alert` | tip / warning / info / danger 4가지 변형 |
| `InfoBox` | 15색 정보 카드 |
| `StatCard` | 숫자 통계 카드 (CJK 폰트 자동 감지) |
| `InfoTable` | 컬럼별 정렬/mono/색상 설정, striped rows, ReactNode 셀 |
| `CardGrid` | 반응형 2/3/4열 그리드 |
| `LearningCard` | 학습 목표 + 선수 지식 (StudyConfig 연동) |
| `TopicNavigation` | 이전/다음 토픽 링크 |
| `GlossaryTooltip` (`T`) | 인라인 용어 툴팁 (포털 기반) |
| `Prose` | 본문 텍스트 래퍼 |
| `InlineCode` | 인라인 코드 표시 |
| `SourceRef` | 외부 소스 링크 |
| `SearchModal` | 토픽/용어/섹션 통합 검색 |

### Visualization
| Component | Description |
|-----------|------------|
| `CodeBlock` | 구문 강조 + 줄 번호 + 복사 버튼 |
| `D3Container` | ResizeObserver + 줌 컨트롤 |
| `MermaidDiagram` | Mermaid 다이어그램 (다크 모드 대응) |
| `WebGLCanvas` | Three.js 캔버스 래퍼 |
| `AnimatedDiagram` | 단계별 애니메이션 (Play/Pause/Prev/Next) |

### D3 DSL
| Function | Description |
|----------|------------|
| `createD3Theme(isDark)` | 테마 객체 생성 (colors, fonts, spacing) |
| `addLabel()` | 테마 적용 텍스트 |
| `addNode()` | 테마 적용 박스/노드 |
| `addArrow()` | 테마 적용 화살표 |
| `addLegend()` | 범례 |

### Theme & Context
| Export | Description |
|--------|------------|
| `ThemeProvider` | dark/light 모드 (localStorage 저장) |
| `StudyProvider` | SiteConfig 주입 (토픽, 용어집, 검색 인덱스) |
| `useTheme()` | 현재 테마 + toggle |
| `useIsDark()` | boolean 다크 모드 여부 |
| `themeColors(isDark)` | oklch 색상 팔레트 |
| `createColorMap()` | D3용 Fill/Stroke/Text 색상 맵 |

## Installation (git submodule)

```bash
# 1. submodule 추가
git submodule add ../study-ui-lib lib/study-ui-lib

# 2. tsconfig.app.json에 path alias
{
  "compilerOptions": {
    "paths": {
      "@study-ui/components": ["./lib/study-ui-lib/packages/ui/src/index.ts"]
    }
  }
}

# 3. vite.config.ts에 resolve alias
import path from 'path'
resolve: {
  alias: {
    '@study-ui/components': path.resolve(__dirname, 'lib/study-ui-lib/packages/ui/src/index.ts'),
  },
}

# 4. index.css에 Tailwind 소스 스캔
@source "../lib/study-ui-lib/packages/ui/src/**/*.tsx";

# 5. App.tsx에서 사용
import { ThemeProvider, StudyProvider, AppLayout } from '@study-ui/components'
```

## Project Structure

```
study-ui-lib/
  packages/
    ui/          # 컴포넌트 라이브러리 (@study-ui/components)
    docs-site/   # 스타일 가이드 & 컴포넌트 쇼케이스
  docs/
    PAGES.md     # 문서 사이트 목차
    PROCESS.md   # 진행사항
    STYLE.md     # 스타일 가이드
```
