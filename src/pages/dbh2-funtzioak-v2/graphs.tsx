import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { lineLatex, type GraphColor, type GraphSpec } from './functions'
import { Plane, PlanePath, PlanePoint } from './plane'

/* ==========================================================================
   Funtzioak (2. DBH) — the graphs that go with diagnostic questions,
   practice, the exercise bank, challenges and the race. The exercises keep a
   plain GraphSpec (so the tests can read it); this file turns it into SVG.
   ========================================================================== */

const colors: Record<GraphColor, string> = {
    stage: 'var(--stage, #2f6fdb)',
    second: 'var(--second, #c4432a)',
    mustard: 'var(--mustard, #e0a100)',
    green: 'var(--success, #267b53)',
    ink: 'var(--ink, #1d2733)'
}

const graphLabel: LocalizedText = { eu: 'Grafikoa', es: 'Gráfica', ar: 'الرسم البياني' }

/** y = 2x − 1 written as plain text for a label on the plane */
const plainLine = (m: number, n: number) => lineLatex(m, n)
    .replace(/\\frac\{(\d+)\}\{(\d+)\}/g, '$1/$2')
    .replace(/-/g, '−')
    .replace(/=/g, ' = ')
    .replace(/([^ ])([+−])(?=\d)/g, '$1 $2 ')

export function GraphFigure({ spec, language, maxHeight = 380 }: { spec: GraphSpec; language: UnitLanguage; maxHeight?: number }) {
    const { box } = spec
    const cell = spec.cell ?? Math.max(24, Math.min(34, Math.floor(380 / (box.xMax - box.xMin)), Math.floor(320 / (box.yMax - box.yMin))))
    const xTitle = spec.xTitle && pickText(language, spec.xTitle)
    const yTitle = spec.yTitle && pickText(language, spec.yTitle)
    const label = [pickText(language, graphLabel), yTitle, xTitle].filter(Boolean).join(' · ')
    return (
        <Plane box={box} cell={cell} label={label} labelStep={spec.labelStep} xUnit={spec.xUnit} yUnit={spec.yUnit} xTitle={xTitle} yTitle={yTitle} maxHeight={maxHeight} className="functions-plane functions-graph">
            {(map, clip) => (
                <g>
                    {spec.curves?.map((curve, index) => <PlanePath key={`c${index}`} map={map} points={curve.points} color={colors[curve.color ?? 'stage']} width={3.4} dashed={curve.dashed} clip={clip} />)}
                    {spec.lines?.map((line, index) => {
                        const color = colors[line.color ?? 'stage']
                        // The name sits next to the line, at the x the exercise chose
                        const at = line.at ?? box.xMax - 1
                        return (
                            <g key={`l${index}`}>
                                <PlanePath map={map} points={[[box.xMin - 1, line.m * (box.xMin - 1) + line.n], [box.xMax + 1, line.m * (box.xMax + 1) + line.n]]} color={color} width={3.4} dashed={line.dashed} clip={clip} />
                                {line.name !== undefined && (
                                    <PlanePoint map={map} point={[at, line.m * at + line.n]} radius={0} color={color} name={line.name || plainLine(line.m, line.n)} dx={8} dy={line.m > 0 ? 16 : -10} fontSize={15} />
                                )}
                            </g>
                        )
                    })}
                    {spec.points?.map((point, index) => (
                        <PlanePoint
                            key={`p${index}`}
                            map={map}
                            point={point.at}
                            color={colors[point.color ?? 'second']}
                            radius={6}
                            name={point.name}
                            dx={point.left ? -9 : 9}
                            dy={point.below ? 20 : -9}
                            anchor={point.left ? 'end' : 'start'}
                        />
                    ))}
                </g>
            )}
        </Plane>
    )
}
