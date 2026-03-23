# study-ui-lib

## What

`../kernel-study` 와 `../network-study` 의 공통 UI 요소를 뽑아서 아래 작업을 수행합니다.

    - 공통 디자인을 추려서 Style Guide를 작성, 체계화.
    - 공통 UI를 추려서 UI 공통 라이브러리 생성
    - 가능하다면 d3 등 그래픽 요소를 모듈화하여 제공
    - 공통 컴포넌트를 보여줄 수 있는 `https://getbootstrap.com/docs/5.3/getting-started/introduction/` 같은 페이지를 제공
    - 안정적인 UI 라이브러리가 되고 Material UI 디자인처럼 완결성 있는 UI style guide가 도출되어야 합니다.
    - 완성되면 `../kernel-study` 와 `../network-study` 를 공통으로 하여 라이브러리 형태로 교체
        - git submodule 형태로 `../kernel-study` 와 `../network-study` 프로젝트에서 사용
    - react.js + typescript + pnpm 을 이용합니다.
    - 최종 형태는 공통 UI 라이브러리입니다.
    - 공통 폰트나 색상표 (특히 dark and light theme 각각과 공통 theme 파트)

## Rule

    - 필요하다면 CLAUDE는 skill을 만들고 이를 활용할 수 있습니다.
    - `kernel-study` 와 `network-study` 프로젝트의 공통을 뽑아내고 호환성을 갖추는데에 집중합니다.
    - 웹에 보여줄 목차와 내용 개요를 docs/PAGES.md 에 정리하고, 변경 시 항상 업데이트 합니다.
    - 진행사항은 docs/PROCESS.md에 정리하고, 변경 시 항상 업데이트 합니다.
    - UI 스타일에 대한 사항은 docs/STYLE.md에 정리하고, UI 작업 시 항상 참조합니다. 변경 시 항상 업데이트 합니다.
    - **작업 완료 후 반드시 docs/PROCESS.md를 업데이트합니다.** 스프린트 또는 단위 작업이 끝날 때마다 완료 항목을 기록하고, 날짜를 최신화합니다.
