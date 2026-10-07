import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import {
    binomialLatex,
    candidates,
    chooseRootsPolynomial,
    currentQuotient,
    factorizationLatex,
    initialRootsState,
    initialRuffiniState,
    polynomialLatex,
    RUFFINI_A_LIMIT,
    ruffiniChallenges,
    ruffiniDone,
    ruffiniFinish,
    ruffiniPolynomials,
    ruffiniRows,
    ruffiniStep,
    rootsChallenges,
    rootsFinished,
    rootsPolynomials,
    setRuffini,
    tryCandidate,
    type RootsState,
    type RuffiniState
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

/* ---------- 1. The Ruffini table ---------- */

export function RuffiniTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RuffiniState>(initialRuffiniState)
    const coefficients = ruffiniPolynomials[state.polynomial]
    const { products, bottom } = ruffiniRows(coefficients, state.a)
    const done = ruffiniDone(state)
    const controls = (
        <>
            <Segmented label={l(say('Polinomioa', 'Polinomio', 'الحدودية'))} value={String(state.polynomial)} options={ruffiniPolynomials.map((_, index) => ({ value: String(index), label: `P${index + 1}` }))} onChange={(polynomial) => setState((s) => setRuffini(s, { polynomial: Number(polynomial) }))} />
            <Stepper label="a" value={state.a} min={-RUFFINI_A_LIMIT} max={RUFFINI_A_LIMIT} format={signed} onChange={(a) => setState((s) => setRuffini(s, { a }))} language={props.language} />
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <button type="button" className="fraction-v2-secondary" disabled={done} onClick={() => setState(ruffiniStep)}>{l(say('Hurrengo urratsa', 'Siguiente paso', 'الخطوة التالية'))}</button>
                <button type="button" className="fraction-v2-secondary" disabled={done} onClick={() => setState(ruffiniFinish)}>{l(say('Bukatu', 'Terminar', 'أكمل'))}</button>
            </div>
        </>
    )
    const remainder = bottom.at(-1)!
    const latex = done
        ? `(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(state.a)})\\ \\to\\ C(x)=${polynomialLatex(bottom.slice(0, -1))},\\ R=${remainder}`
        : `(${polynomialLatex(coefficients)})\\mathbin{:}(${binomialLatex(state.a)})`
    const note = done
        ? l(say(`P(${state.a}) = ${remainder}: hondarra eta balioa berdinak dira.${remainder === 0 ? ' Zatiketa zehatza!' : ''}`, `P(${state.a}) = ${remainder}: el resto y el valor coinciden.${remainder === 0 ? ' ¡División exacta!' : ''}`, `P(${state.a}) = ${remainder}: الباقي والقيمة متساويان.${remainder === 0 ? ' قسمة تامة!' : ''}`))
        : state.steps === 1
            ? l(say('Lehen koefizientea jaitsi da. Orain: bider a eta batu.', 'Se ha bajado el primer coeficiente. Ahora: por a y suma.', 'أُنزل المعامل الأول. والآن: في a ثم اجمع.'))
            : l(say(`${bottom[state.steps - 2]} · ${state.a} = ${products[state.steps - 1]}; gehi ${coefficients[state.steps - 1]} = ${bottom[state.steps - 1]}.`, `${bottom[state.steps - 2]} · ${state.a} = ${products[state.steps - 1]}; más ${coefficients[state.steps - 1]} = ${bottom[state.steps - 1]}.`, `${bottom[state.steps - 2]} · ${state.a} = ${products[state.steps - 1]}؛ زائد ${coefficients[state.steps - 1]} = ${bottom[state.steps - 1]}.`))
    const cell = Math.min(80, 500 / coefficients.length)
    const x0 = 110
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={ruffiniChallenges} state={state}>
            <Board height={190} label={l(say('Ruffiniren taula', 'La tabla de Ruffini', 'جدول روفيني'))}>
                {coefficients.map((coefficient, index) => {
                    const x = x0 + index * cell + cell / 2
                    const shown = index < state.steps
                    const last = index === coefficients.length - 1
                    return (
                        <g key={index}>
                            <text x={x} y={46} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>{signed(coefficient)}</text>
                            {shown && products[index] !== null && <text x={x} y={96} textAnchor="middle" fontSize={20} fill={STAGE}>{signed(products[index]!)}</text>}
                            {shown && <text x={x} y={150} textAnchor="middle" fontSize={22} fontWeight={700} fill={last ? SECOND : GREEN}>{signed(bottom[index])}</text>}
                            {shown && index > 0 && <path d={`M${x - cell + 12} 140 L${x - 14} 104`} fill="none" stroke={MUTED} strokeWidth={1.2} strokeDasharray="4 4" />}
                        </g>
                    )
                })}
                <text x={x0 - 30} y={96} textAnchor="middle" fontSize={22} fontWeight={700} fill={STAGE}>{signed(state.a)}</text>
                <line x1={x0} x2={x0} y1={18} y2={166} stroke={INK} strokeWidth={2} />
                <line x1={x0 - 60} x2={x0 + coefficients.length * cell + 10} y1={116} y2={116} stroke={INK} strokeWidth={2} />
                {done && <rect x={x0 + (coefficients.length - 1) * cell + 6} y={124} width={cell - 12} height={36} rx={8} fill="none" stroke={SECOND} strokeWidth={2.4} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- 2. Hunting for roots ---------- */

export function RootsTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RootsState>(initialRootsState)
    const quotient = currentQuotient(state)
    const finished = rootsFinished(state)
    const options = candidates(quotient)
    const controls = (
        <>
            <Segmented label={l(say('Polinomioa', 'Polinomio', 'الحدودية'))} value={String(state.polynomial)} options={rootsPolynomials.map((_, index) => ({ value: String(index), label: `P${index + 1}` }))} onChange={(polynomial) => setState((s) => chooseRootsPolynomial(s, Number(polynomial)))} />
            <p className="fraction-v2-lab-tip"><MathText text={`$P(x)=${polynomialLatex(rootsPolynomials[state.polynomial])}$`} /></p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }} role="group" aria-label={l(say('Hautagaiak', 'Candidatos', 'المرشحون'))}>
                {options.map((candidate) => (
                    <button key={candidate} type="button" className="fraction-v2-secondary" disabled={finished || state.misses.includes(candidate)} onClick={() => setState((s) => tryCandidate(s, candidate))}>{signed(candidate)}</button>
                ))}
            </div>
            <button type="button" className="fraction-v2-secondary" onClick={() => setState((s) => chooseRootsPolynomial(s, s.polynomial))}>{l(say('Hasi berriro', 'Empezar de nuevo', 'ابدأ من جديد'))}</button>
        </>
    )
    const latex = `${polynomialLatex(rootsPolynomials[state.polynomial])}=${factorizationLatex(state)}`
    const note = finished
        ? quotient.length > 2
            ? l(say('Bukatuta: zatidurak ez du erro osorik, ezin da gehiago deskonposatu zenbaki osoekin.', 'Terminado: el cociente no tiene raíces enteras, no se descompone más con enteros.', 'انتهى: ليس لخارج القسمة جذور صحيحة، فلا يُحلّل أكثر بالأعداد الصحيحة.'))
            : l(say('Bukatuta: faktorizazio osoa.', 'Terminado: factorización completa.', 'انتهى: تحليل كامل.'))
        : l(say(`Probatu ${polynomialLatex(quotient).replace(/\^\{(\d+)\}/g, '^$1')} polinomioaren gai askearen zatitzaileak.`, `Prueba los divisores del término independiente de ${polynomialLatex(quotient).replace(/\^\{(\d+)\}/g, '^$1')}.`, `جرّب قواسم الحد الثابت في ${polynomialLatex(quotient).replace(/\^\{(\d+)\}/g, '^$1')}.`))
    const tried = [...state.roots.map((root) => ({ value: root, hit: true })), ...state.misses.map((miss) => ({ value: miss, hit: false }))]
    return (
        <ToolFrame {...props} controls={controls} readout={<Readout latex={latex} note={note} />} challenges={rootsChallenges} state={state}>
            <Board height={170} label={l(say('Probatutako hautagaiak', 'Candidatos probados', 'المرشحون المجرَّبون'))}>
                <text x={20} y={30} fontSize={15} fontWeight={700} fill={MUTED}>P(a)</text>
                {tried.slice(0, 10).map((item, index) => {
                    const x = 50 + index * 58
                    return (
                        <g key={`${item.value}-${index}`}>
                            <rect x={x} y={50} width={50} height={50} rx={10} fill={item.hit ? '#d6eddf' : '#f8dcd0'} stroke={INK} strokeWidth={1.6} />
                            <text x={x + 25} y={82} textAnchor="middle" fontSize={20} fontWeight={700} fill={item.hit ? GREEN : SECOND}>{signed(item.value)}</text>
                            <text x={x + 25} y={124} textAnchor="middle" fontSize={14} fill={item.hit ? GREEN : SECOND}>{item.hit ? '0 ✓' : '≠ 0'}</text>
                        </g>
                    )
                })}
                {tried.length === 0 && <text x={320} y={90} textAnchor="middle" fontSize={16} fill={MUTED}>{`${options.map(signed).join('  ')}`}</text>}
            </Board>
        </ToolFrame>
    )
}
