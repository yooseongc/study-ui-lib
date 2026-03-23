# Style Guide

## 1. 폰트 (Typography)

### 폰트 패밀리

| 용도 | 폰트 | fallback |
|-----|------|----------|
| 본문 (한글+영문) | **Pretendard Variable** | Pretendard, Apple SD Gothic Neo, Noto Sans KR, system-ui, Segoe UI, sans-serif |
| 코드/수치 | **JetBrains Mono** | Fira Code, D2Coding, ui-monospace, SFMono-Regular, Cascadia Code, monospace |
| D3 다이어그램 라벨 | **Pretendard Variable** (기본), **JetBrains Mono** (코드/수치) | 위와 동일 |

### 폰트 크기 스케일

| Tailwind 클래스 | 크기 | 용도 |
|----------------|------|------|
| `text-xs` | 12px | 캡션, 배지 |
| `text-sm` | 14px | 보조 텍스트, 테이블 |
| `text-base` | 16px | 본문 |
| `text-lg` | 18px | 소제목 |
| `text-xl` | 20px | 섹션 제목 |
| `text-2xl` | 24px | 페이지 제목 |
| `text-3xl` | 30px | 대제목 |

### 폰트 굵기

| weight | 용도 |
|--------|------|
| 400 (normal) | 본문 |
| 500 (medium) | 소제목, 강조 텍스트 |
| 600 (semibold) | 섹션 제목, 토픽 번호 라벨 |
| 700 (bold) | 페이지 제목, 강한 강조 |

### 한글/영문 혼용 가이드
- Pretendard Variable은 한글과 영문 모두에 최적화된 가변 폰트
- CJK 텍스트의 행간(line-height)은 1.7~1.8 권장 (Tailwind `leading-relaxed` 이상)
- 자간(letter-spacing)은 기본값 유지 (한글에서 추가 자간은 가독성 저하)
- **범용 컴포넌트에서 `font-mono` 사용 금지** — 한글 데이터가 들어올 수 있는 컴포넌트(InfoTable, StatCard 등)는 기본을 `font-sans`로 설정. mono가 필요한 컬럼만 `mono: true`로 명시

### font-mono 사용 규칙
`font-mono`는 **코드, 명령어, 함수명, 상수명, 숫자 데이터**에만 사용합니다. 일반 텍스트(한글이든 영문이든)에는 사용하지 않습니다.

| 사용 O (font-mono) | 사용 X (font-sans 유지) |
|-----|------|
| `fork()`, `SCHED_FIFO`, `0x400000` | '마운트~언마운트', '가장 낮음', '높음' |
| `taskset -c 0,1 ./app` | '파일 존재 기간', '캐시' |
| `VM_READ`, `GFP_KERNEL` | '읽기 가능', '실행 가능' |
| `192.168.1.0/24`, `RT 1~99` | '프로세스 복제', '메모리 관리' |

**컴포넌트별 적용:**
- `StatCard` — value에 CJK 문자 포함 시 자동으로 `font-sans` 전환
- `InfoTable` — 기본 `font-sans`, 컬럼별 `mono: true`로 명시 가능
- `GlossaryTooltip` — term에 CJK 문자 포함 시 자동으로 `font-sans` 전환
- `TopicHeader` — 토픽 번호만 `font-semibold`, 부제목은 `font-sans`

## 2. 색상 팔레트 (Colors)

### oklch 기반 시맨틱 색상

| 토큰 | Dark 모드 | Light 모드 | 용도 |
|------|----------|-----------|------|
| `text` | oklch(92% 0 0) | oklch(18% 0 0) | 기본 텍스트 |
| `textMuted` | oklch(63% 0 0) | oklch(40% 0 0) | 보조 텍스트 |
| `textDim` | oklch(50% 0 0) | oklch(65% 0 0) | 비활성/힌트 텍스트 |
| `border` | oklch(38% 0 0) | oklch(82% 0 0) | 테두리 |
| `link` | oklch(32% 0 0) | oklch(80% 0 0) | 링크/구분선 |
| `bg` | oklch(16% 0 0) | oklch(99% 0 0) | 배경 |
| `bgCard` | oklch(22% 0 0) | oklch(96% 0 0) | 카드 배경 |

Dark 모드 명도 위계: `text(92) > textMuted(63) > textDim(50) > border(38) > link(32) > bgCard(22) > bg(16)`

### D3 시각화 색상 (8색 x Fill/Stroke/Text)

| 색상 | Hue | 용도 예 |
|------|-----|--------|
| blue | H≈250 | 기본 강조, 프로세스 |
| indigo | H≈270 | 보조 강조 |
| purple | H≈295 | 메모리 관련 |
| pink | H≈320 | 핑크 계열 |
| red | H≈25 | 에러, 위험 |
| amber | H≈65 | 경고, 주의 |
| green | H≈145 | 성공, 완료 |
| cyan | H≈200 | 네트워크 |

각 색상은 `{color}Fill` (배경, 낮은 채도), `{color}Stroke` (테두리, 높은 채도), `{color}Text` (라벨, 중간 채도) 3종 세트로 제공.

### Tailwind 컴포넌트 색상 (15색)
InfoBox, StatCard 등에서 사용:
blue, purple, green, amber, red, gray, cyan, teal, lime, rose, orange, violet, indigo, emerald, sky

## 3. 간격/여백 (Spacing)

Tailwind 기본 스케일 사용:
- `p-1` (4px) ~ `p-8` (32px)
- 컴포넌트 내부 패딩: `p-4` (16px) ~ `p-6` (24px)
- 컴포넌트 간 간격: `space-y-4` (16px) ~ `space-y-8` (32px)
- 섹션 간 간격: `space-y-14` (56px) — TopicPage 기본값

## 4. 레이아웃 (Layout)

### 3단 레이아웃
```
[Sidebar] [Toggle] [Main Content] [Toggle] [Table of Contents]
```

### 반응형 breakpoint
| breakpoint | 너비 | 변화 |
|-----------|------|------|
| 기본 (mobile) | ~767px | 1단, 사이드바 오버레이 |
| `md:` | 768px+ | 2단, 사이드바 표시 |
| `xl:` | 1280px+ | 3단, TOC 표시 |

### 토픽 페이지 구조
```tsx
<TopicPage topicId="01-overview" learningItems={[...]}>
    <Section id="s1" title="1.1 제목">...</Section>
    <Section id="s2" title="1.2 제목">...</Section>
</TopicPage>
```
TopicPage가 자동으로 TopicHeader + LearningCard + TopicNavigation을 구성합니다.

## 5. 다크 모드 (Dark Mode)

- `ThemeProvider`로 앱 최상위 래핑
- `<html>` 요소에 `dark` 클래스 토글
- localStorage `theme` 키로 상태 저장 (SSR 안전: try-catch)
- oklch 색상 체계로 일관된 명도(L) 반전
- `useTheme()` — `{ theme, toggle }` 반환
- `useIsDark()` — boolean 반환

## 6. D3 시각화 스타일

### D3Theme 시스템

```typescript
const theme = createD3Theme(isDark)
// theme.colors  — themeColors(isDark) 결과
// theme.fonts   — { sans, mono, size: { sm, base, lg, xl } }
// theme.spacing — { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 }
// theme.border  — { radius: 6, width: 1 }
```

### D3 DSL 헬퍼 함수

```typescript
// 테마 적용 텍스트
addLabel(svg, 'Process', theme, { x: 50, y: 50, font: 'sans', size: 'lg' })

// 테마 적용 박스
addNode(svg, theme, { x: 10, y: 10, width: 200, height: 40, fill: theme.colors.blueFill, label: 'Kernel' })

// 테마 적용 화살표
addArrow(svg, theme, { from: [100, 50], to: [100, 150], color: theme.colors.link, label: 'syscall' })

// 범례
addLegend(svg, [{ label: 'User', color: c.blueStroke }, { label: 'Kernel', color: c.greenStroke }], theme, { x: 10, y: 10 })
```

### D3 색상 규칙
- `themeColors(isDark)` 함수에서 Fill/Stroke/Text 3종 세트 사용
- `createColorMap(colors, ['blue', 'green'])` — 색상 키로 일괄 매핑
- Fill: 배경 (낮은 채도)
- Stroke: 테두리 (높은 채도)
- Text: 라벨 텍스트 (중간 채도)

## 7. Context 시스템

### ThemeProvider
앱 최상위에서 `<ThemeProvider>`로 래핑. Provider 없이 `useTheme()` 호출 시 에러 throw.

### StudyProvider
`<StudyProvider config={siteConfig}>`로 사이트 설정 주입. 필요한 컴포넌트:
AppLayout, Sidebar, SearchModal, TopicPage, TopicHeader, TopicNavigation, LearningCard, GlossaryTooltip

```typescript
const siteConfig: SiteConfig = {
    name: 'Project Name',
    subtitle: 'Description',
    topics: [...],          // Topic[] — 토픽 목록
    glossary: {
        entries: [...],     // GlossaryEntry[] — 용어 목록
        categoryLabels: {}, // Record<string, string> — 카테고리 한글 라벨
        categoryColors: {}, // Record<string, string> — 카테고리 Tailwind 클래스
    },
    searchIndex: [...],     // SectionEntry[] — 섹션 검색 인덱스
    footerLinks: [...],     // FooterLink[] — 사이드바 하단 링크
}
```
