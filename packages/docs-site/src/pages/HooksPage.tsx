import { Section, InfoBox, CardGrid, InfoTable, Alert, CodeBlock } from '@study-ui/components'

const hooksOverview = [
    { cells: ['useAnimationStep', '단계별 애니메이션 상태 관리', 'AnimatedDiagram, 시각화'] },
    { cells: ['useD3', 'D3.js SVG 렌더링 ref 관리', 'D3Container 대안, 커스텀 SVG'] },
    { cells: ['useThree', 'Three.js 캔버스 렌더링 ref 관리', 'WebGLCanvas 대안, 커스텀 3D'] },
    { cells: ['useTheme', '테마 상태 및 토글 함수', '테마 전환 버튼'] },
    { cells: ['useIsDark', '다크 모드 여부 (boolean)', 'D3/스타일 조건부 분기'] },
    { cells: ['useStudyConfig', 'SiteConfig 접근', '토픽/용어 데이터 접근'] },
]

const animationStepReturn = [
    { cells: ['step', 'number', '현재 단계 (0-based)'] },
    { cells: ['playing', 'boolean', '자동 재생 상태'] },
    { cells: ['next()', '() => void', '다음 단계'] },
    { cells: ['prev()', '() => void', '이전 단계'] },
    { cells: ['reset()', '() => void', '0단계로 리셋 + 재생 중지'] },
    { cells: ['togglePlay()', '() => void', '자동 재생 토글'] },
    { cells: ['isFirst', 'boolean', 'step === 0'] },
    { cells: ['isLast', 'boolean', 'step === totalSteps - 1'] },
]

const animationCode = `import { useAnimationStep } from '@study-ui/components'

function TcpHandshake() {
    const { step, next, prev, isFirst, isLast } = useAnimationStep(3)

    return (
        <div>
            <div>현재 단계: {step + 1} / 3</div>
            {step === 0 && <div>SYN →</div>}
            {step === 1 && <div>← SYN-ACK</div>}
            {step === 2 && <div>ACK →</div>}
            <button onClick={prev} disabled={isFirst}>이전</button>
            <button onClick={next} disabled={isLast}>다음</button>
        </div>
    )
}`

const useD3Code = `import { useD3 } from '@study-ui/components'

function SimpleChart({ data }: { data: number[] }) {
    const svgRef = useD3((svg) => {
        // svg는 d3.select(svgElement) 결과
        svg.selectAll('*').remove()
        svg.selectAll('rect')
            .data(data)
            .join('rect')
            .attr('x', (_, i) => i * 30)
            .attr('y', (d) => 100 - d)
            .attr('width', 25)
            .attr('height', (d) => d)
            .attr('fill', 'steelblue')
    }, [data])  // data가 변경될 때만 리렌더

    return <svg ref={svgRef} width={300} height={100} />
}`

const useThreeCode = `import { useThree } from '@study-ui/components'

function RotatingCube() {
    const canvasRef = useThree(({ scene, camera, renderer }) => {
        // Three.js는 dynamic import로 로드됨
        import('three').then((THREE) => {
            const geometry = new THREE.BoxGeometry()
            const material = new THREE.MeshBasicMaterial({ color: 0x4488ff, wireframe: true })
            const cube = new THREE.Mesh(geometry, material)
            scene.add(cube)
            camera.position.z = 3

            function animate() {
                cube.rotation.x += 0.01
                cube.rotation.y += 0.01
                renderer.render(scene, camera)
                requestAnimationFrame(animate)
            }
            animate()
        })

        return () => { /* cleanup */ }
    }, [])

    return <canvas ref={canvasRef} width={400} height={300} />
}`

const themeHooksCode = `import { useTheme, useIsDark, useStudyConfig } from '@study-ui/components'

function MyComponent() {
    // useTheme — 테마 상태 + 토글
    const { theme, toggle } = useTheme()
    // theme: 'light' | 'dark'

    // useIsDark — boolean 단축
    const isDark = useIsDark()
    // D3/스타일에서 조건부 분기에 활용

    // useStudyConfig — SiteConfig 접근
    const config = useStudyConfig()
    // config.topics, config.glossary, config.name, ...
}`

export function HooksPage() {
    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-10">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Hooks</h1>
                <p className="text-gray-500 dark:text-gray-400">커스텀 hooks — 애니메이션, D3, Three.js, 테마, 설정 접근</p>
            </div>

            <Section id="overview" title="Hooks 목록">
                <InfoTable
                    headers={[{ header: 'Hook', mono: true }, { header: '역할' }, { header: '주요 사용처' }]}
                    rows={hooksOverview}
                />
            </Section>

            <Section id="use-animation-step" title="useAnimationStep">
                <Alert variant="tip" title="단계별 애니메이션">
                    AnimatedDiagram 내부에서도 사용되며, 독립적으로도 활용 가능합니다.
                </Alert>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <code className="font-mono text-sm text-blue-600 dark:text-blue-400">useAnimationStep(totalSteps)</code>를 호출하면 단계 상태와 제어 함수를 반환합니다.
                </p>
                <InfoTable
                    headers={[{ header: '반환값', mono: true }, { header: '타입', mono: true }, { header: '설명' }]}
                    rows={animationStepReturn}
                />
                <div className="mt-4">
                    <CodeBlock code={animationCode} language="tsx" filename="TcpHandshake.tsx" />
                </div>
            </Section>

            <Section id="use-d3" title="useD3">
                <CardGrid cols={2}>
                    <InfoBox color="blue" title="Dynamic Import">
                        d3 모듈은 <strong>dynamic import</strong>로 로드됩니다. d3가 설치되지 않은 환경에서도 앱이 크래시하지 않습니다.
                    </InfoBox>
                    <InfoBox color="purple" title="Cleanup 안전">
                        컴포넌트 언마운트 시 <code className="font-mono text-sm">cancelled</code> 플래그로 비동기 렌더링을 안전하게 중단합니다.
                    </InfoBox>
                </CardGrid>
                <div className="mt-4">
                    <CodeBlock code={useD3Code} language="tsx" filename="SimpleChart.tsx" />
                </div>
                <Alert variant="info" title="D3Container와의 차이">
                    D3Container는 반응형 리사이즈, 줌 컨트롤, isDark 자동 전달을 포함합니다. 단순 SVG 렌더링만 필요하면 useD3, 풀 기능이 필요하면 D3Container를 사용하세요.
                </Alert>
            </Section>

            <Section id="use-three" title="useThree">
                <CardGrid cols={2}>
                    <InfoBox color="green" title="자동 초기화">
                        Scene, PerspectiveCamera, WebGLRenderer를 자동 생성하고 canvas에 연결합니다.
                    </InfoBox>
                    <InfoBox color="amber" title="Cleanup 반환">
                        setupFn에서 cleanup 함수를 반환하면 언마운트 시 자동 호출됩니다 (애니메이션 루프 정리 등).
                    </InfoBox>
                </CardGrid>
                <div className="mt-4">
                    <CodeBlock code={useThreeCode} language="tsx" filename="RotatingCube.tsx" />
                </div>
            </Section>

            <Section id="context-hooks" title="컨텍스트 Hooks">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    ThemeProvider와 StudyProvider에서 제공하는 컨텍스트에 접근하는 hooks입니다.
                    Provider 없이 호출하면 에러를 throw합니다.
                </p>
                <CodeBlock code={themeHooksCode} language="tsx" filename="context-hooks.tsx" />
                <CardGrid cols={3} className="mt-4">
                    <InfoBox color="blue" title="useTheme">
                        <code className="font-mono text-sm">theme</code> 문자열과 <code className="font-mono text-sm">toggle()</code> 함수 반환
                    </InfoBox>
                    <InfoBox color="purple" title="useIsDark">
                        <code className="font-mono text-sm">boolean</code> 반환 — D3/Three.js에서 조건부 색상 전환에 사용
                    </InfoBox>
                    <InfoBox color="green" title="useStudyConfig">
                        <code className="font-mono text-sm">SiteConfig</code> 객체 반환 — topics, glossary, searchIndex 접근
                    </InfoBox>
                </CardGrid>
            </Section>
        </div>
    )
}
