import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Plane, PlaneLine, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import {
    checkCandidate,
    chooseKind,
    choosePlaneSystem,
    chooseRadical,
    eliminatedUnknown,
    initialPlaneState,
    initialRadicalState,
    initialReductionState,
    isTrueSolution,
    linearLatex,
    movePoint,
    MULTIPLIER_LIMIT,
    PLANE_LIMIT,
    planeChallenges,
    planeSystems,
    radicalCandidates,
    radicalChallenges,
    radicalEquations,
    reductionChallenges,
    reductionRows,
    reductionSolution,
    reductionSystems,
    satisfies,
    setMultipliers,
    squaredQuadratic,
    squareRadical,
    type LinearEquation,
    type PlaneState,
    type RadicalEquation,
    type RadicalState,
    type ReductionState,
    type SystemKind
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'

type Text = { eu: string; es: string; ar: string }
const say = (eu: string, es: string, ar: string): Text => ({ eu, es, ar })
/** Negative numbers in the drawings with the true minus sign */
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${latex}$`} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

/* ---------- 1. Radical equations ---------- */

/** x + c as LaTeX */
const rightLatex = (c: number) => (c === 0 ? 'x' : `x${c < 0 ? '-' : '+'}${Math.abs(c)}`)
const insideLatex = ({ a, b }: RadicalEquation) => `${a === 1 ? '' : a}x${b < 0 ? '-' : '+'}${Math.abs(b)}`
const radicalLatex = (equation: RadicalEquation) => `\\sqrt{${insideLatex(equation)}}=${rightLatex(equation.c)}`
function quadraticLatex([, p, q]: [number, number, number]): string {
    const middle = p === 0 ? '' : `${p < 0 ? '-' : '+'}${Math.abs(p) === 1 ? '' : Math.abs(p)}x`
    return `x^{2}${middle}${q < 0 ? '-' : '+'}${Math.abs(q)}=0`
}

export function RadicalTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RadicalState>(initialRadicalState)
    const equation = radicalEquations[state.equation]
    const squared = state.squared.includes(state.equation)
    const candidates = radicalCandidates(equation)
    const checked = state.checked[state.equation] ?? []
    const controls = (
        <>
            <Segmented label={l(say('Ekuazioa', 'Ecuación', 'المعادلة'))} value={String(state.equation)} options={radicalEquations.map((_, index) => ({ value: String(index), label: `E${index + 1}` }))} onChange={(value) => setState((s) => chooseRadical(s, Number(value)))} />
            <button type="button" className="fraction-v2-secondary" disabled={squared} onClick={() => setState(squareRadical)}>{l(say('Karratura jaso', 'Elevar al cuadrado', 'ربّع الطرفين'))}</button>
            {squared && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} role="group" aria-label={l(say('Hautagaiak', 'Candidatos', 'المرشحون'))}>
                    {candidates.map((x) => (
                        <button key={x} type="button" className="fraction-v2-secondary" disabled={checked.includes(x)} onClick={() => setState((s) => checkCandidate(s, x))}>{l(say(`Egiaztatu x = ${signed(x)}`, `Comprobar x = ${signed(x)}`, `تحقّق من x = ${signed(x)}`))}</button>
                    ))}
                </div>
            )}
        </>
    )
    const valid = checked.filter((x) => isTrueSolution(equation, x))
    const latex = squared ? `${radicalLatex(equation)}\\ \\to\\ ${quadraticLatex(squaredQuadratic(equation))}` : radicalLatex(equation)
    const note = !squared
        ? l(say('Erroa bakarrik dago: jaso bi atalak karratura.', 'La raíz está sola: eleva los dos miembros al cuadrado.', 'الجذر وحده: ربّع الطرفين.'))
        : checked.length < candidates.length
            ? l(say(`Hautagaiak: ${candidates.map(signed).join(' eta ')}. Egiaztatu bakoitza hasierako ekuazioan.`, `Candidatos: ${candidates.map(signed).join(' y ')}. Comprueba cada uno en la ecuación inicial.`, `المرشحون: ${candidates.map(signed).join(' و')}. تحقّق من كل واحد في المعادلة الأصلية.`))
            : valid.length === 0
                ? l(say('Ez dago ebazpenik.', 'No hay solución.', 'لا حل.'))
                : l(say(`Ebazpena: ${valid.map((x) => `x = ${signed(x)}`).join(', ')}.`, `Solución: ${valid.map((x) => `x = ${signed(x)}`).join(', ')}.`, `الحل: ${valid.map((x) => `x = ${signed(x)}`).join('، ')}.`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={radicalChallenges} state={state}>
            <Board height={190} label={l(say('Egiaztatutako hautagaiak', 'Candidatos comprobados', 'المرشحون الذين تم التحقق منهم'))}>
                {candidates.length > 0 && !squared && <text x={320} y={100} textAnchor="middle" fontSize={20} fill={MUTED}>?</text>}
                {squared && candidates.map((x, index) => {
                    const done = checked.includes(x)
                    const good = isTrueSolution(equation, x)
                    const inside = equation.a * x + equation.b
                    const cx = candidates.length === 1 ? 320 : 170 + index * 300
                    return (
                        <g key={x}>
                            <rect x={cx - 130} y={30} width={260} height={120} rx={14} fill={!done ? '#fffcf6' : good ? '#d6eddf' : '#f8dcd0'} stroke={INK} strokeWidth={1.8} />
                            <text x={cx} y={66} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>x = {signed(x)}</text>
                            {done && <text x={cx} y={102} textAnchor="middle" fontSize={18} fill={INK}>{`√${signed(inside)} ${good ? '=' : '≠'} ${signed(x + equation.c)}`}</text>}
                            <text x={cx} y={134} textAnchor="middle" fontSize={20} fontWeight={700} fill={!done ? MUTED : good ? GREEN : SECOND}>{!done ? '?' : good ? '✓' : '✗'}</text>
                        </g>
                    )
                })}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Systems on the plane ---------- */

function LineOf({ map, equation, color, clip, dashed }: { map: Parameters<typeof PlaneLine>[0]['map']; equation: LinearEquation; color: string; clip: string; dashed?: boolean }) {
    const [a, b, c] = equation
    return <PlaneLine map={map} m={-a / b} n={c / b} color={color} clip={clip} width={3.2} dashed={dashed} />
}

export function PlaneTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PlaneState>(initialPlaneState)
    const system = planeSystems[state.system]
    const onFirst = satisfies(system.first, state.x, state.y)
    const onSecond = satisfies(system.second, state.x, state.y)
    const kindLabels: Record<SystemKind, Text> = {
        one: say('Ebazpen bat', 'Una solución', 'حل واحد'),
        none: say('Ebazpenik ez', 'Ninguna', 'لا حل'),
        infinite: say('Infinitu', 'Infinitas', 'ما لا نهاية')
    }
    const controls = (
        <>
            <Segmented label={l(say('Sistema', 'Sistema', 'النظام'))} value={String(state.system)} options={planeSystems.map((_, index) => ({ value: String(index), label: `S${index + 1}` }))} onChange={(value) => setState((s) => choosePlaneSystem(s, Number(value)))} />
            <Stepper label="x" value={state.x} min={-PLANE_LIMIT} max={PLANE_LIMIT} format={signed} onChange={(x) => setState((s) => movePoint(s, x, s.y))} language={props.language} />
            <Stepper label="y" value={state.y} min={-PLANE_LIMIT} max={PLANE_LIMIT} format={signed} onChange={(y) => setState((s) => movePoint(s, s.x, y))} language={props.language} />
            <Segmented label={l(say('Zenbat ebazpen?', '¿Cuántas soluciones?', 'كم حلًّا؟'))} value={state.kinds[state.system] ?? ('' as SystemKind)} options={(['one', 'none', 'infinite'] as const).map((kind) => ({ value: kind, label: l(kindLabels[kind]) }))} onChange={(kind) => setState((s) => chooseKind(s, kind))} />
        </>
    )
    const mark = (ok: boolean) => (ok ? '\\ \\checkmark' : '\\ \\times')
    const latex = `${linearLatex(system.first)}${mark(onFirst)}\\qquad ${linearLatex(system.second)}${mark(onSecond)}`
    const note = onFirst && onSecond
        ? l(say(`(${signed(state.x)}, ${signed(state.y)}) bi zuzenetan dago: sistemaren ebazpena da.`, `(${signed(state.x)}, ${signed(state.y)}) está en las dos rectas: es solución del sistema.`, `(${signed(state.x)}, ${signed(state.y)}) على المستقيمين: إنها حل للنظام.`))
        : onFirst || onSecond
            ? l(say('Puntua zuzen batean dago, baina ez bestean.', 'El punto está en una recta, pero no en la otra.', 'النقطة على مستقيم واحد لا على الآخر.'))
            : l(say('Mugitu puntua edo sakatu planoan.', 'Mueve el punto o pulsa en el plano.', 'حرّك النقطة أو انقر على المستوى.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={planeChallenges} state={state}>
            <Plane box={{ xMin: -PLANE_LIMIT, xMax: PLANE_LIMIT, yMin: -PLANE_LIMIT, yMax: PLANE_LIMIT }} cell={26} label={l(say('Sistemaren bi zuzenak eta puntua', 'Las dos rectas del sistema y el punto', 'مستقيما النظام والنقطة'))} onPick={([x, y]) => setState((s) => movePoint(s, x, y))}>
                {(map, clip) => (
                    <g>
                        <LineOf map={map} equation={system.first} color={STAGE} clip={clip} />
                        <LineOf map={map} equation={system.second} color={SECOND} clip={clip} dashed />
                        {(state.hits[state.system] ?? []).map((key) => {
                            const [x, y] = key.split(',').map(Number)
                            return <PlanePoint key={key} map={map} point={[x, y]} color={GREEN} radius={5} />
                        })}
                        <PlanePoint map={map} point={[state.x, state.y]} color={onFirst && onSecond ? GREEN : INK} radius={7} name={`(${signed(state.x)}, ${signed(state.y)})`} />
                    </g>
                )}
            </Plane>
        </ToolFrame>
    )
}

/* ---------- 3. The reduction method ---------- */

function EquationRow({ y, factor, equation, color }: { y: number; factor: string; equation: LinearEquation; color: string }) {
    const [a, b, c] = equation
    const cell = (value: number, letter: string, x: number) => <text x={x} y={y} textAnchor="end" fontSize={22} fontWeight={700} fill={value === 0 ? MUTED : color}>{`${value < 0 ? '−' : x > 200 ? '+' : ''} ${Math.abs(value)}${letter}`}</text>
    return (
        <g>
            <text x={70} y={y} textAnchor="end" fontSize={17} fill={MUTED}>{factor}</text>
            {cell(a, 'x', 200)}
            {cell(b, 'y', 330)}
            <text x={360} y={y} fontSize={22} fontWeight={700} fill={color}>=</text>
            <text x={470} y={y} textAnchor="end" fontSize={22} fontWeight={700} fill={color}>{signed(c)}</text>
        </g>
    )
}

export function ReductionTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ReductionState>(initialReductionState)
    const rows = reductionRows(state)
    const gone = eliminatedUnknown(state)
    const solution = reductionSolution(reductionSystems[state.system])
    const system = reductionSystems[state.system]
    const controls = (
        <>
            <Segmented label={l(say('Sistema', 'Sistema', 'النظام'))} value={String(state.system)} options={reductionSystems.map((_, index) => ({ value: String(index), label: `S${index + 1}` }))} onChange={(value) => setState((s) => setMultipliers(s, { system: Number(value) }))} />
            <Stepper label={l(say('1. ekuazioa bider', '1.ª ecuación por', 'المعادلة 1 في'))} value={state.m1} min={-MULTIPLIER_LIMIT} max={MULTIPLIER_LIMIT} format={signed} onChange={(m1) => setState((s) => setMultipliers(s, { m1 }))} language={props.language} />
            <Stepper label={l(say('2. ekuazioa bider', '2.ª ecuación por', 'المعادلة 2 في'))} value={state.m2} min={-MULTIPLIER_LIMIT} max={MULTIPLIER_LIMIT} format={signed} onChange={(m2) => setState((s) => setMultipliers(s, { m2 }))} language={props.language} />
        </>
    )
    const latex = `${linearLatex(system.first)},\\quad ${linearLatex(system.second)}`
    const note = gone === 'y'
        ? l(say(`y desagertu da: x = ${signed(solution.x)}, eta ordeztuz y = ${signed(solution.y)}.`, `La y ha desaparecido: x = ${signed(solution.x)}, y sustituyendo, y = ${signed(solution.y)}.`, `اختفى y: x = ${signed(solution.x)}، وبالتعويض y = ${signed(solution.y)}.`))
        : gone === 'x'
            ? l(say(`x desagertu da: y = ${signed(solution.y)}, eta ordeztuz x = ${signed(solution.x)}.`, `La x ha desaparecido: y = ${signed(solution.y)}, y sustituyendo, x = ${signed(solution.x)}.`, `اختفى x: y = ${signed(solution.y)}، وبالتعويض x = ${signed(solution.x)}.`))
            : l(say('Bilatu ezezagun baten koefizienteak aurkako bihurtzen dituzten zenbakiak.', 'Busca los números que hacen opuestos los coeficientes de una incógnita.', 'ابحث عن العددين اللذين يجعلان معاملي مجهول متعاكسين.'))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={reductionChallenges} state={state}>
            <Board height={230} label={l(say('Bi ekuazioak biderkatuta eta batuta', 'Las dos ecuaciones multiplicadas y sumadas', 'المعادلتان مضروبتان ومجموعتان'))}>
                <EquationRow y={50} factor={`· ${signed(state.m1)}`} equation={rows.first} color={INK} />
                <EquationRow y={96} factor={`· ${signed(state.m2)}`} equation={rows.second} color={INK} />
                <line x1={90} x2={490} y1={116} y2={116} stroke={INK} strokeWidth={2} />
                <text x={60} y={150} textAnchor="end" fontSize={22} fontWeight={700} fill={INK}>+</text>
                <EquationRow y={150} factor="" equation={rows.sum} color={gone ? GREEN : STAGE} />
                {gone && <text x={560} y={150} textAnchor="middle" fontSize={22} fontWeight={700} fill={GREEN}>{gone === 'y' ? `x = ${signed(solution.x)}` : `y = ${signed(solution.y)}`}</text>}
                {gone && <text x={320} y={204} textAnchor="middle" fontSize={20} fontWeight={700} fill={GREEN}>{`x = ${signed(solution.x)},  y = ${signed(solution.y)}`}</text>}
            </Board>
        </ToolFrame>
    )
}
