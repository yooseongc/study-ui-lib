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
| `text-4xl` | 36px | 히어로 텍스트 |

### 폰트 굵기

| weight | 용도 |
|--------|------|
| 400 (normal) | 본문 |
| 500 (medium) | 소제목, 강조 텍스트 |
| 600 (semibold) | 섹션 제목 |
| 700 (bold) | 페이지 제목, 강한 강조 |

### 한글/영문 혼용 가이드
- Pretendard Variable은 한글과 영문 모두에 최적화된 가변 폰트
- CJK 텍스트의 행간(line-height)은 1.7~1.8 권장 (Tailwind `leading-relaxed` 이상)
- 자간(letter-spacing)은 기본값 유지 (한글에서 추가 자간은 가독성 저하)
- **범용 컴포넌트에서 `font-mono` 사용 금지** — 한글 데이터가 들어올 수 있는 컴포넌트(InfoTable, StatCard 등)는 기본을 `font-sans`로 설정. mono가 필요한 컬럼만 `mono: true`로 명시

## 2. 색상 팔레트 (Colors)

### oklch 기반 시맨틱 색상

| 토큰 | Dark 모드 | Light 모드 | 용도 |
|------|----------|-----------|------|
| `text` | oklch(92% 0 0) | oklch(18% 0 0) | 기본 텍스트 |
| `textMuted` | oklch(63% 0 0) | oklch(40% 0 0) | 보조 텍스트 |
| `textDim` | oklch(62% 0 0) | oklch(55% 0 0) | 약한 텍스트 |
| `border` | oklch(48% 0 0) | oklch(82% 0 0) | 테두리 |
| `link` | oklch(32% 0 0) | oklch(80% 0 0) | 링크/구분선 |
| `bg` | oklch(16% 0 0) | oklch(99% 0 0) | 배경 |
| `bgCard` | oklch(22% 0 0) | oklch(96% 0 0) | 카드 배경 |

### 컴포넌트 색상 (8색 × Fill/Stroke/Text)
- blue (H≈250), indigo (H≈270), purple (H≈295), pink (H≈320)
- red (H≈25), amber (H≈65), green (H≈145), cyan (H≈200)

### Tailwind 컴포넌트 색상 (15색)
InfoBox, StatCard 등에서 사용:
blue, purple, green, amber, red, gray, cyan, teal, lime, rose, orange, violet, indigo, emerald, sky

## 3. 간격/여백 (Spacing)

Tailwind 기본 스케일 사용:
- `p-1` (4px) ~ `p-8` (32px)
- 컴포넌트 내부 패딩: `p-4` (16px) ~ `p-6` (24px)
- 컴포넌트 간 간격: `space-y-4` (16px) ~ `space-y-8` (32px)
- 섹션 간 간격: `mb-8` (32px) ~ `mb-12` (48px)

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

## 5. 다크 모드 (Dark Mode)

- `ThemeProvider`로 앱 래핑
- `<html>` 요소에 `dark` 클래스 토글
- localStorage에 `theme` 키로 상태 저장
- oklch 색상 체계로 일관된 명도(L) 반전

## 6. D3 시각화 스타일

### D3Theme 시스템
- `createD3Theme(isDark)` 함수로 테마 객체 생성
- 폰트: sans (Pretendard Variable), mono (JetBrains Mono)
- 크기 스케일: sm (11px), base (13px), lg (15px), xl (18px)
- D3 헬퍼 함수로 일관된 스타일 자동 적용

### D3 색상 규칙
- `themeColors(isDark)` 함수에서 Fill/Stroke/Text 3종 세트 사용
- Fill: 배경 (낮은 채도)
- Stroke: 테두리 (높은 채도)
- Text: 라벨 텍스트 (중간 채도)
