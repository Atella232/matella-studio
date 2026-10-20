import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toExactDecimal, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { COLORS, INK, LINE, MUTED, SECOND, STAGE } from '../../dbh2-estatistika-v2/palette'
import {
    A_MAX,
    A_MIN,
    B_MAX,
    B_MIN,
    balanceChallenges,
    DEVIATION_MAX,
    deviationChallenges,
    deviationMean,
    GROUP_MAX,
    initialBalanceState,
    initialDeviationState,
    initialStrataState,
    initialTransformState,
    joinedMeanOf,
    MEAN_TENTHS_MAX,
    meanDeviationOf,
    SAMPLE_MAX,
    SAMPLE_MIN,
    SAMPLE_STEP,
    samplingFraction,
    setBalance,
    setDeviation,
    setStrata,
    setTransform,
    strataChallenges,
    strataShares,
    STRATA_MAX,
    STRATA_STEP,
    TRANSFORM_DATA,
    transformChallenges,
    transformedCv,
    transformedData,
    transformedMean,
    transformedSigma,
    varianceOf,
    type BalanceState,
    type DeviationState,
    type StrataState,
    type TransformState
} from './labTools'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const separator = (language: UnitLanguage) => (language === 'ar' ? '.' : ',')

/** A number in the learner's language: exact when it has few decimals, otherwise rounded with ≈ */
function plain(value: number, language: UnitLanguage, digits = 2): string {
    const rounded = Math.round(value * 10 ** digits) / 10 ** digits
    const text = String(Math.abs(rounded) < 1e-12 ? 0 : rounded).replace('.', separator(language)).replace('-', '−')
    return Math.abs(rounded - value) < 1e-9 ? text : `≈ ${text}`
}

/** "= value" or "\approx value" for LaTeX from a float */
function texNumber(value: number, language: UnitLanguage, digits = 2) {
    const text = plain(value, language, digits).replace(',', '{,}').replace('−', '-')
    return text.startsWith('≈ ') ? `\\approx ${text.slice(2)}` : `=${text}`
}

/** "= value" for an exact fraction, as a decimal when short */
function texFraction(value: FractionValue, language: UnitLanguage, digits = 2) {
    const exact = toExactDecimal(value, separator(language))
    if (exact !== null && exact.replace(/^[^,.]*[,.]?/, '').length <= digits) return `=${exact.replace(',', '{,}')}`
    return texNumber(toNumber(value), language, digits)
}

function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return <svg viewBox={`0 0 640 ${height}`} direction="ltr" role="img" aria-label={label} style={{ width: '100%', height: 'auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>{children}</svg>
}

function Readout({ latex, note }: { latex: string; note: string }) {
    return (
        <>
            {/* Each \quad part is its own formula, so a long readout wraps instead of scrolling */}
            <span className="fraction-v2-lab-readout-main"><MathText text={latex.split(/\\qquad|\\quad/).map((part) => `$${part.trim()}$`).join('\u2003')} /></span>
            <span className="fraction-v2-lab-readout-note">{note}</span>
        </>
    )
}

function Text({ x, y, children, color = INK, size = 20, anchor = 'middle', weight = 700 }: { x: number; y: number; children: ReactNode; color?: string; size?: number; anchor?: 'start' | 'middle' | 'end'; weight?: number }) {
    return <text x={x} y={y} textAnchor={anchor} fontSize={size} fontWeight={weight} fill={color}>{children}</text>
}

/** A number line with ticks every step */
function Axis({ x, y, from, to, step, language }: { x: (value: number) => number; y: number; from: number; to: number; step: number; language: UnitLanguage }) {
    const ticks = Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, index) => from + index * step)
    return (
        <g>
            <line x1={x(from)} x2={x(to)} y1={y} y2={y} stroke={INK} strokeWidth={2} />
            {ticks.map((value) => (
                <g key={value}>
                    <line x1={x(value)} x2={x(value)} y1={y - 5} y2={y + 5} stroke={INK} strokeWidth={1.4} />
                    <Text x={x(value)} y={y + 26} size={20} weight={400}>{plain(value, language)}</Text>
                </g>
            ))}
        </g>
    )
}

/* ---------- 1. Stratified sample ---------- */

const COURSES = [say('1. maila', '1.º', 'الأول'), say('2. maila', '2.º', 'الثاني'), say('3. maila', '3.º', 'الثالث'), say('4. maila', '4.º', 'الرابع')]

export function StrataTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<StrataState>(initialStrataState)
    const shares = strataShares(state)
    const fractionOfSample = toNumber(samplingFraction(state))
    const total = state.sizes.reduce((sum, size) => sum + size, 0)
    const controls = (
        <>
            {COURSES.map((course, index) => (
                <Stepper key={index} label={`${l(course)} (Nᵢ)`} value={state.sizes[index]} min={STRATA_STEP} max={STRATA_MAX} step={STRATA_STEP} onChange={(size) => setState((s) => setStrata(s, { index, size }))} language={props.language} />
            ))}
            <Stepper label={l(say('Lagina (n)', 'Muestra (n)', 'العيّنة (n)'))} value={state.sample} min={SAMPLE_MIN} max={SAMPLE_MAX} step={SAMPLE_STEP} onChange={(sample) => setState((s) => setStrata(s, { sample }))} language={props.language} />
        </>
    )
    const latex = `\\frac{n}{N}=\\frac{${state.sample}}{${total}}${texFraction(samplingFraction(state), props.language, 3)}`
    const note = shares.map((share, index) => `${l(COURSES[index])}: ${plain(toNumber(share), props.language, 1)}`).join(' · ')
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={strataChallenges} state={state}>
            <Board height={290} label={l(say('Maila bakoitza eta haren zatia laginean', 'Cada curso y su parte en la muestra', 'كل صف ونصيبه في العيّنة'))}>
                {state.sizes.map((size, index) => {
                    const y = 18 + index * 60
                    const width = size * 1.4
                    return (
                        <g key={index}>
                            <Text x={12} y={y + 31} anchor="start" size={24} color={COLORS[index]}>{index + 1}</Text>
                            <rect x={42} y={y} width={width} height={44} rx={7} fill={COLORS[index]} fillOpacity={0.14} stroke={COLORS[index]} strokeWidth={2.4} />
                            <rect x={42} y={y} width={width * fractionOfSample} height={44} rx={7} fill={COLORS[index]} fillOpacity={0.6} />
                            <Text x={42 + width + 8} y={y + 30} anchor="start" size={20} color={MUTED}>{size}</Text>
                            <Text x={630} y={y + 32} anchor="end" size={28} color={COLORS[index]}>{plain(toNumber(shares[index]), props.language, 1)}</Text>
                        </g>
                    )
                })}
                <Text x={42} y={278} anchor="start" size={22} color={MUTED}>{`N = ${total}`}</Text>
                <Text x={630} y={278} anchor="end" size={22} color={STAGE}>{`n = ${state.sample}`}</Text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Two groups on a balance ---------- */

export function BalanceTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BalanceState>(initialBalanceState)
    const joined = joinedMeanOf(state)
    const x = (value: number) => 40 + value * 56
    const tenths = (value: number) => plain(value / 10, props.language)
    const names = ['A', 'B']
    /** The group drawn on the left: its label leans left, the other's right */
    const leftGroup = state.means[0] <= state.means[1] ? 0 : 1
    const controls = (
        <>
            {([0, 1] as const).map((group) => (
                <div key={group} style={{ display: 'contents' }}>
                    <Stepper label={`${names[group]}: n`} value={state.sizes[group]} min={1} max={GROUP_MAX} onChange={(size) => setState((s) => setBalance(s, { group, size }))} language={props.language} />
                    <Stepper label={`${names[group]}: x̄`} value={state.means[group]} min={0} max={MEAN_TENTHS_MAX} format={tenths} onChange={(mean) => setState((s) => setBalance(s, { group, mean }))} language={props.language} />
                </div>
            ))}
        </>
    )
    const weighted = state.sizes[0] * state.means[0] + state.sizes[1] * state.means[1]
    const latex = `\\bar{x}=\\frac{${plain(weighted / 10, props.language).replace(',', '{,}')}}{${state.sizes[0] + state.sizes[1]}}${texFraction(joined, props.language, 3)}`
    const note = names.map((name, group) => `${name}: ${state.sizes[group]} · ${tenths(state.means[group])} = ${plain((state.sizes[group] * state.means[group]) / 10, props.language)}`).join('  ·  ')
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={balanceChallenges} state={state}>
            <Board height={280} label={l(say('Bi taldeak balantza batean', 'Los dos grupos en una balanza', 'المجموعتان على ميزان'))}>
                <line x1={x(0)} x2={x(10)} y1={190} y2={190} stroke={INK} strokeWidth={4} strokeLinecap="round" />
                {([0, 1] as const).map((group) => {
                    const height = state.sizes[group] * 4
                    const centre = x(state.means[group] / 10)
                    const color = COLORS[group === 0 ? 0 : 3]
                    return (
                        <g key={group}>
                            <rect x={centre - 16} y={190 - height} width={32} height={height} rx={5} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={2.4} />
                            <Text x={leftGroup === group ? centre + 16 : centre - 16} y={182 - height} size={22} anchor={leftGroup === group ? 'end' : 'start'} color={color}>{`${names[group]} ${state.sizes[group]}`}</Text>
                        </g>
                    )
                })}
                <polygon points={`${x(toNumber(joined))},${193} ${x(toNumber(joined)) - 14},${218} ${x(toNumber(joined)) + 14},${218}`} fill={SECOND} />
                <Axis x={x} y={236} from={0} to={10} step={1} language={props.language} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 3. Five data: distances and squares ---------- */

export function DeviationTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<DeviationState>(initialDeviationState)
    const mean = toNumber(deviationMean(state.values))
    const dm = meanDeviationOf(state.values)
    const variance = varianceOf(state.values)
    const x = (value: number) => 40 + value * 56
    const controls = (
        <>
            {state.values.map((value, index) => (
                <Stepper key={index} label={l(say(`${index + 1}. datua`, `Dato ${index + 1}`, `البيان ${index + 1}`))} value={value} min={0} max={DEVIATION_MAX} onChange={(next) => setState((s) => setDeviation(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const latex = `\\text{DM}${texFraction(dm, props.language)}\\quad \\sigma^2${texFraction(variance, props.language)}`
    const note = `x̄ = ${plain(mean, props.language)} · σ ${plain(Math.sqrt(toNumber(variance)), props.language).startsWith('≈') ? '' : '= '}${plain(Math.sqrt(toNumber(variance)), props.language)}`
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={deviationChallenges} state={state}>
            <Board height={280} label={l(say('Batez bestekorako distantziak', 'Distancias a la media', 'المسافات عن المتوسط'))}>
                <line x1={x(mean)} x2={x(mean)} y1={30} y2={220} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
                <Text x={x(mean)} y={24} color={SECOND}><tspan style={{ textDecoration: 'overline' }}>x</tspan></Text>
                {state.values.map((value, index) => {
                    const level = 52 + index * 33
                    const distance = Math.abs(value - mean)
                    return (
                        <g key={index}>
                            <line x1={x(value)} x2={x(value)} y1={level} y2={212} stroke={LINE} strokeWidth={1} />
                            {distance > 1e-9 && <line x1={x(value)} x2={x(mean)} y1={level} y2={level} stroke={COLORS[index]} strokeWidth={4} strokeLinecap="round" />}
                            {distance > 1e-9 && <Text x={(x(value) + x(mean)) / 2} y={level - 8} size={18} color={COLORS[index]}>{plain(distance, props.language, 1)}</Text>}
                            <circle cx={x(value)} cy={level} r={8} fill={COLORS[index]} stroke={INK} strokeWidth={1.2} />
                        </g>
                    )
                })}
                <Axis x={x} y={226} from={0} to={10} step={1} language={props.language} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- 4. The data a · x + b ---------- */

export function TransformTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<TransformState>(initialTransformState)
    const data = transformedData(state)
    const mean = toNumber(transformedMean(state))
    const sigma = transformedSigma(state)
    const cv = transformedCv(state)
    const x = (value: number) => 40 + (value + 5) * 9.6
    const formula = `${state.a === 1 ? '' : state.a}x${state.b === 0 ? '' : `${state.b < 0 ? ' − ' : ' + '}${Math.abs(state.b)}`}`
    const strip = (values: number[], y: number, color: string, centre: number, spread: number) => {
        const stacks = new Map<number, number>()
        return (
            <g>
                <rect x={x(centre - spread)} y={y - 64} width={x(centre + spread) - x(centre - spread)} height={70} fill={color} fillOpacity={0.1} />
                <line x1={x(centre)} x2={x(centre)} y1={y - 68} y2={y + 6} stroke={SECOND} strokeWidth={2} strokeDasharray="5 4" />
                {values.map((value, index) => {
                    const level = stacks.get(value) ?? 0
                    stacks.set(value, level + 1)
                    return <circle key={index} cx={x(value)} cy={y - 10 - level * 18} r={9} fill={color} fillOpacity={0.8} stroke={INK} strokeWidth={1.2} />
                })}
            </g>
        )
    }
    const controls = (
        <>
            <Stepper label="a" value={state.a} min={A_MIN} max={A_MAX} onChange={(a) => setState((s) => setTransform(s, { a }))} language={props.language} />
            <Stepper label="b" value={state.b} min={B_MIN} max={B_MAX} format={(value) => (value > 0 ? `+${value}` : String(value).replace('-', '−'))} onChange={(b) => setState((s) => setTransform(s, { b }))} language={props.language} />
        </>
    )
    const latex = `\\bar{x}${texNumber(mean, props.language)}\\quad \\sigma${texNumber(sigma, props.language)}\\quad \\text{CV}${cv === null ? '=\\text{—}' : texFraction(cv, props.language)}`
    const note = l(say(`Hasierako datuak: batez bestekoa 5, σ = 2. Berriak: ${formula}`, `Datos iniciales: media 5, σ = 2. Nuevos: ${formula}`, `البيانات الأولى: المتوسط 5، σ = 2. الجديدة: \u2066${formula}\u2069`))
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={transformChallenges} state={state}>
            <Board height={280} label={l(say('Hasierako datuak eta datu berriak', 'Los datos iniciales y los nuevos', 'البيانات الأولى والجديدة'))}>
                <Text x={14} y={28} anchor="start" size={20} color={MUTED}>x</Text>
                {strip(TRANSFORM_DATA, 100, COLORS[4], 5, 2)}
                <Text x={14} y={128} anchor="start" size={20} color={STAGE}>{formula}</Text>
                {strip(data, 200, STAGE, mean, sigma)}
                <Axis x={x} y={222} from={-5} to={55} step={5} language={props.language} />
            </Board>
        </ToolFrame>
    )
}
