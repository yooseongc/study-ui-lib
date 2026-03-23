import { Section, InfoBox, CardGrid, CodeBlock } from '@study-ui/components'
import { themeColors, useIsDark } from '@study-ui/components'

function ColorSwatch({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 shrink-0" style={{ background: value }} />
            <div>
                <div className="text-xs font-medium text-gray-800 dark:text-gray-200">{label}</div>
                <div className="text-[10px] font-mono text-gray-500">{value}</div>
            </div>
        </div>
    )
}

function HueGroup({ name, hue, colors }: { name: string; hue: string; colors: { fill: string; stroke: string; text: string } }) {
    return (
        <div className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
            <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {name} <span className="text-xs font-normal text-gray-400">H≈{hue}</span>
            </div>
            <div className="flex gap-3">
                <div className="flex-1 h-8 rounded" style={{ background: colors.fill }} />
                <div className="flex-1 h-8 rounded border-2" style={{ borderColor: colors.stroke, background: 'transparent' }} />
                <div className="flex-1 h-8 rounded flex items-center justify-center text-xs font-semibold" style={{ color: colors.text }}>
                    Text
                </div>
            </div>
            <div className="text-[10px] font-mono text-gray-500 space-y-0.5">
                <div>Fill: {colors.fill}</div>
                <div>Stroke: {colors.stroke}</div>
                <div>Text: {colors.text}</div>
            </div>
        </div>
    )
}

const usageCode = `import { themeColors, createColorMap } from '@study-ui/components'

const isDark = theme === 'dark'
const c = themeColors(isDark)

// 개별 색상 사용
svg.style('fill', c.blueFill)
   .style('stroke', c.blueStroke)

// 색상 맵으로 일괄 적용
const map = createColorMap(c, ['blue', 'green', 'red'])
// map.blue.fill, map.blue.stroke, map.blue.text`

export function ColorsPage() {
    const isDark = useIsDark()
    const c = themeColors(isDark)

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Colors</h1>
                <p className="text-gray-500 dark:text-gray-400">oklch 기반 색상 팔레트 — 다크/라이트 모드 전환으로 비교해보세요</p>
            </div>

            <Section id="semantic" title="시맨틱 색상">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <ColorSwatch label="text" value={c.text} />
                    <ColorSwatch label="textMuted" value={c.textMuted} />
                    <ColorSwatch label="textDim" value={c.textDim} />
                    <ColorSwatch label="border" value={c.border} />
                    <ColorSwatch label="link" value={c.link} />
                    <ColorSwatch label="bg" value={c.bg} />
                    <ColorSwatch label="bgCard" value={c.bgCard} />
                </div>
            </Section>

            <Section id="hue-palette" title="D3 시각화 색상 (Fill / Stroke / Text)">
                <CardGrid cols={2}>
                    <HueGroup name="Blue" hue="250" colors={{ fill: c.blueFill, stroke: c.blueStroke, text: c.blueText }} />
                    <HueGroup name="Indigo" hue="270" colors={{ fill: c.indigoFill, stroke: c.indigoStroke, text: c.indigoText }} />
                    <HueGroup name="Purple" hue="295" colors={{ fill: c.purpleFill, stroke: c.purpleStroke, text: c.purpleText }} />
                    <HueGroup name="Pink" hue="320" colors={{ fill: c.pinkFill, stroke: c.pinkStroke, text: c.pinkText }} />
                    <HueGroup name="Red" hue="25" colors={{ fill: c.redFill, stroke: c.redStroke, text: c.redText }} />
                    <HueGroup name="Amber" hue="65" colors={{ fill: c.amberFill, stroke: c.amberStroke, text: c.amberText }} />
                    <HueGroup name="Green" hue="145" colors={{ fill: c.greenFill, stroke: c.greenStroke, text: c.greenText }} />
                    <HueGroup name="Cyan" hue="200" colors={{ fill: c.cyanFill, stroke: c.cyanStroke, text: c.cyanText }} />
                </CardGrid>
            </Section>

            <Section id="component-colors" title="컴포넌트 색상 (InfoBox 15색)">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['blue', 'purple', 'green', 'amber', 'red', 'gray', 'cyan', 'teal', 'lime', 'rose', 'orange', 'violet', 'indigo', 'emerald', 'sky'] as const).map(
                        (color) => (
                            <InfoBox key={color} color={color} title={color}>
                                InfoBox color=&quot;{color}&quot;
                            </InfoBox>
                        ),
                    )}
                </div>
            </Section>

            <Section id="usage" title="사용법">
                <CodeBlock code={usageCode} language="typescript" filename="example.tsx" />
            </Section>
        </div>
    )
}
