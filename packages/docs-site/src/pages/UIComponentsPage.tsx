import {
    Section,
    Alert,
    InfoBox,
    StatCard,
    Prose,
    InfoTable,
    CardGrid,
    InlineCode,
    SourceRef,
    CodeBlock,
} from '@study-ui/components'

const alertCode = `<Alert variant="tip" title="팁">유용한 정보입니다</Alert>
<Alert variant="warning">주의가 필요합니다</Alert>
<Alert variant="info">참고 정보입니다</Alert>
<Alert variant="danger" title="위험">치명적 오류</Alert>`

const infoBoxCode = `<InfoBox color="blue" title="제목">내용</InfoBox>
<InfoBox color="purple" title="제목">내용</InfoBox>
<InfoBox color="green" title="제목">내용</InfoBox>`

const statCardCode = `<CardGrid cols={4}>
    <StatCard title="프로세스" value="1,024" color="blue" />
    <StatCard title="메모리" value="8.2 GB" color="green" />
    <StatCard title="CPU" value="73%" color="amber" />
    <StatCard title="에러" value="0" color="red" />
</CardGrid>`

export function UIComponentsPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">UI Components</h1>
                <p className="text-gray-500 dark:text-gray-400">재사용 가능한 UI 컴포넌트 모음</p>
            </div>

            <Section id="alert" title="Alert">
                <Prose>variant에 따라 다른 스타일의 알림 박스를 표시합니다. tip, warning, info, danger 4가지 변형을 지원합니다.</Prose>
                <div className="space-y-3">
                    <Alert variant="tip" title="팁">유용한 정보를 전달할 때 사용합니다</Alert>
                    <Alert variant="warning">주의가 필요한 내용을 알릴 때 사용합니다</Alert>
                    <Alert variant="info">참고할 만한 정보를 제공할 때 사용합니다</Alert>
                    <Alert variant="danger" title="위험">치명적인 오류나 주의사항을 강조할 때 사용합니다</Alert>
                </div>
                <CodeBlock code={alertCode} language="tsx" filename="Alert.tsx" />
            </Section>

            <Section id="infobox" title="InfoBox">
                <Prose>15가지 색상을 지원하는 정보 카드입니다. title은 선택 사항입니다.</Prose>
                <CardGrid cols={3}>
                    <InfoBox color="blue" title="Blue">기본 정보 표시</InfoBox>
                    <InfoBox color="purple" title="Purple">보라색 계열</InfoBox>
                    <InfoBox color="green" title="Green">성공/완료 상태</InfoBox>
                    <InfoBox color="amber" title="Amber">주의/경고</InfoBox>
                    <InfoBox color="red" title="Red">에러/위험</InfoBox>
                    <InfoBox color="cyan" title="Cyan">보조 정보</InfoBox>
                </CardGrid>
                <CodeBlock code={infoBoxCode} language="tsx" filename="InfoBox.tsx" />
            </Section>

            <Section id="statcard" title="StatCard">
                <Prose>숫자 통계를 표시하는 카드입니다. 10가지 색상을 지원합니다.</Prose>
                <CardGrid cols={4}>
                    <StatCard title="프로세스" value="1,024" color="blue" />
                    <StatCard title="메모리" value="8.2 GB" color="green" />
                    <StatCard title="CPU" value="73%" color="amber" />
                    <StatCard title="에러" value="0" color="red" desc="최근 24시간" />
                </CardGrid>
                <CodeBlock code={statCardCode} language="tsx" filename="StatCard.tsx" />
            </Section>

            <Section id="infotable" title="InfoTable">
                <Prose>구조화된 데이터를 테이블 형태로 표시합니다.</Prose>
                <InfoTable
                    headers={['시스템 콜', '번호', '설명']}
                    rows={[
                        { cells: ['read()', '0', '파일 디스크립터에서 데이터 읽기'] },
                        { cells: ['write()', '1', '파일 디스크립터에 데이터 쓰기'] },
                        { cells: ['open()', '2', '파일 열기'] },
                        { cells: ['close()', '3', '파일 닫기'] },
                    ]}
                />
            </Section>

            <Section id="prose-inline" title="Prose & InlineCode">
                <Prose>
                    <InlineCode>Prose</InlineCode> 컴포넌트는 일관된 본문 텍스트 스타일을 제공합니다.{' '}
                    <InlineCode>InlineCode</InlineCode>는 인라인 코드 표시에 사용됩니다.
                </Prose>
            </Section>

            <Section id="sourceref" title="SourceRef">
                <Prose>외부 소스 코드나 문서로의 링크를 표시합니다.</Prose>
                <div className="flex gap-4">
                    <SourceRef href="https://elixir.bootlin.com/linux/latest/source/kernel/sched/core.c" label="kernel/sched/core.c" />
                    <SourceRef href="https://www.rfc-editor.org/rfc/rfc793" label="RFC 793" title="TCP Specification" />
                </div>
            </Section>

            <Section id="cardgrid" title="CardGrid">
                <Prose>반응형 그리드 레이아웃입니다. 2, 3, 4열을 지원합니다.</Prose>
                <CardGrid cols={3}>
                    <InfoBox color="sky">cols=3 — 항목 1</InfoBox>
                    <InfoBox color="sky">cols=3 — 항목 2</InfoBox>
                    <InfoBox color="sky">cols=3 — 항목 3</InfoBox>
                </CardGrid>
            </Section>
        </div>
    )
}
