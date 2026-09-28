import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ResultAnswer, Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { fraction } from '../../../features/unit-v2/math/fraction'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { termLatex } from '../../dbh1-aljebra-v2/algebra'
import { MachineTool as BaseMachineTool, TilesTool as BaseTilesTool } from '../../dbh1-aljebra-v2/lab/AlgebraTools'
import {
    answerArea,
    answerIdentity,
    AREA_LIMITS,
    areaChallenges,
    areaExpected,
    FACTOR_LIMITS,
    factorChallenges,
    factorInside,
    factorLatex,
    factorPolynomials,
    greatestFactor,
    IDENTITY_LIMITS,
    identityChallenges,
    identityMistake,
    identityTerms,
    identityValue,
    initialAreaState,
    initialFactorState,
    initialIdentityState,
    initialTilesState,
    MACHINE_LIMITS,
    machineChallenges,
    machineExpressions,
    productLatex,
    setAreaModel,
    setFactor,
    setIdentity,
    tilesChallenges,
    type AreaAsk,
    type AreaState,
    type FactorState,
    type IdentityKind,
    type IdentityState
} from './labTools'

const INK = 'var(--ink, #1d2733)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const MUSTARD_TINT = 'var(--mustard-tint, #fbebc0)'
const SECOND_TINT = 'var(--second-tint, #f8dcd0)'

const numberTexts = {
    placeholder: { eu: 'Adib.: 12', es: 'Ej.: 12', ar: 'مثال: 12' },
    unreadable: { eu: 'Idatzi zenbaki oso bat.', es: 'Escribe un número entero.', ar: 'اكتب عددًا صحيحًا.' }
}

/* ---------- The 1. DBH machine and tiles with this course's polynomials ---------- */

export function MachineTool(props: LabToolProps) {
    return <BaseMachineTool {...props} expressions={machineExpressions} limits={MACHINE_LIMITS} challenges={machineChallenges} />
}

export function TilesTool(props: LabToolProps) {
    return <BaseTilesTool {...props} initial={initialTilesState} challenges={tilesChallenges} />
}

/* ---------- Area model ---------- */

const askNames: Record<AreaAsk, LocalizedText> = {
    middle: { eu: 'x-ren koefizientea', es: 'Coeficiente de x', ar: 'معامل x' },
    constant: { eu: 'Gai askea', es: 'Término independiente', ar: 'الحد الثابت' }
}

export function AreaTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AreaState>(initialAreaState)
    const { a, b } = state
    const shown = state.checked || state.revealed
    const x = 150
    const unit = 22
    const left = 70
    const top = 36
    const factor = (value: number) => (value === 0 ? 'x' : `x+${value}`)
    const controls = (
        <>
            <Stepper label="a" value={a} min={AREA_LIMITS.min} max={AREA_LIMITS.max} onChange={(next) => setState((current) => setAreaModel(current, { a: next }))} language={props.language} />
            <Stepper label="b" value={b} min={AREA_LIMITS.min} max={AREA_LIMITS.max} onChange={(next) => setState((current) => setAreaModel(current, { b: next }))} language={props.language} />
            <Segmented label={l({ eu: 'Idatzi', es: 'Escribe', ar: 'اكتب' })} value={state.ask} options={(['middle', 'constant'] as AreaAsk[]).map((value) => ({ value, label: l(askNames[value]) }))} onChange={(next) => setState((current) => setAreaModel(current, { ask: next }))} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$(${factor(a)})(${factor(b)})${shown ? `=${productLatex(state)}` : ''}$`} />
            </span>
            <ResultAnswer language={props.language} state={state} expected={fraction(areaExpected(state))} placeholder={numberTexts.placeholder} unreadable={numberTexts.unreadable} onChange={(patch) => setState((current) => answerArea(current, patch))} />
        </>
    )
    const parts = [
        { x: left, y: top, w: x, h: x, fill: STAGE_TINT, label: 'x²' },
        { x: left + x, y: top, w: b * unit, h: x, fill: MUSTARD_TINT, label: b > 0 ? `${b}x` : '' },
        { x: left, y: top + x, w: x, h: a * unit, fill: MUSTARD_TINT, label: a > 0 ? `${a}x` : '' },
        { x: left + x, y: top + x, w: b * unit, h: a * unit, fill: SECOND_TINT, label: a * b > 0 ? String(a * b) : '' }
    ]
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={areaChallenges} state={state}>
            <div className="algebra2-lab-figure">
                <svg viewBox="0 0 400 360" role="img" aria-label={`(${factor(a)})(${factor(b)})`}>
                    {parts.filter((part) => part.w > 0 && part.h > 0).map((part, index) => (
                        <g key={index}>
                            <rect x={part.x} y={part.y} width={part.w} height={part.h} fill={part.fill} stroke={INK} strokeWidth={2} />
                            {part.label && <text x={part.x + part.w / 2} y={part.y + part.h / 2 + 6} textAnchor="middle" fontSize={part.w < 50 || part.h < 50 ? 14 : 20} fontWeight={700} fill={INK}>{part.label}</text>}
                        </g>
                    ))}
                    <text x={left + x / 2} y={top - 10} textAnchor="middle" fontSize={18} fontStyle="italic" fontWeight={700} fill={STAGE}>x</text>
                    {b > 0 && <text x={left + x + (b * unit) / 2} y={top - 10} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>{b}</text>}
                    <text x={left - 16} y={top + x / 2 + 6} textAnchor="middle" fontSize={18} fontStyle="italic" fontWeight={700} fill={STAGE}>x</text>
                    {a > 0 && <text x={left - 16} y={top + x + (a * unit) / 2 + 6} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>{a}</text>}
                </svg>
            </div>
        </ToolFrame>
    )
}

/* ---------- Notable products with numbers ---------- */

const identityNames: Record<IdentityKind, LocalizedText> = {
    sum: { eu: '(a + b)²', es: '(a + b)²', ar: '(a + b)²' },
    difference: { eu: '(a − b)²', es: '(a − b)²', ar: '(a − b)²' },
    product: { eu: '(a + b)(a − b)', es: '(a + b)(a − b)', ar: '(a + b)(a − b)' }
}

function identityLeft(state: IdentityState): string {
    const { a, b } = state
    if (state.kind === 'sum') return `(${a}+${b})^{2}`
    if (state.kind === 'difference') return `(${a}-${b})^{2}`
    return `(${a}+${b})(${a}-${b})`
}

function identityRight(state: IdentityState): string {
    const { a, b } = state
    if (state.kind === 'sum') return `${a}^{2}+2\\cdot ${a}\\cdot ${b}+${b}^{2}`
    if (state.kind === 'difference') return `${a}^{2}-2\\cdot ${a}\\cdot ${b}+${b}^{2}`
    return `${a}^{2}-${b}^{2}`
}

export function IdentityTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<IdentityState>(initialIdentityState)
    const shown = state.checked || state.revealed
    const value = identityValue(state)
    const terms = identityTerms(state)
    const mistake = identityMistake(state)
    const controls = (
        <>
            <Segmented label={l({ eu: 'Identitatea', es: 'Identidad', ar: 'المتطابقة' })} value={state.kind} options={(['sum', 'difference', 'product'] as IdentityKind[]).map((value) => ({ value, label: l(identityNames[value]) }))} onChange={(next) => setState((current) => setIdentity(current, { kind: next }))} />
            <Stepper label="a" value={state.a} min={IDENTITY_LIMITS.min} max={IDENTITY_LIMITS.max} onChange={(next) => setState((current) => setIdentity(current, { a: next }))} language={props.language} />
            <Stepper label="b" value={state.b} min={IDENTITY_LIMITS.min} max={IDENTITY_LIMITS.max} onChange={(next) => setState((current) => setIdentity(current, { b: next }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main"><MathText text={`$${identityLeft(state)}${shown ? `=${value}` : '=\\ ?'}$`} /></span>
            <ResultAnswer language={props.language} state={state} expected={fraction(value)} placeholder={numberTexts.placeholder} unreadable={numberTexts.unreadable} onChange={(patch) => setState((current) => answerIdentity(current, patch))} />
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={identityChallenges} state={state}>
            <div className="algebra2-lab-figure algebra2-identity">
                <p><MathText text={`$${identityLeft(state)}$`} /></p>
                <p className="algebra2-identity-equal"><MathText text={`$=${identityRight(state)}$`} /></p>
                <p className="algebra2-identity-equal"><MathText text={`$=${terms.map((term, index) => (index === 0 ? String(term) : term < 0 ? `-${-term}` : `+${term}`)).join('')}${shown ? `=${value}` : ''}$`} /></p>
                {mistake !== null && (
                    <p className="algebra2-identity-mistake">
                        {l({ eu: 'Akats ohikoa:', es: 'Error típico:', ar: 'خطأ شائع:' })} <MathText text={`$${state.a}^{2}+${state.b}^{2}=${mistake}$`} />
                        {' '}{l({ eu: `— ${2 * state.a * state.b} falta zaio (2ab).`, es: `— le faltan ${2 * state.a * state.b} (2ab).`, ar: `— ينقصه ${2 * state.a * state.b} (2ab).` })}
                    </p>
                )}
            </div>
        </ToolFrame>
    )
}

/* ---------- Common factor ---------- */

export function FactorTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FactorState>(initialFactorState)
    const { terms } = factorPolynomials[state.polynomial]
    const inside = factorInside(terms, state.coefficient, state.power)
    const outside = termLatex({ coefficient: state.coefficient, power: state.power })
    const greatest = greatestFactor(terms)
    const isGreatest = greatest.coefficient === state.coefficient && greatest.power === state.power
    const controls = (
        <>
            <Segmented label={l({ eu: 'Polinomioa', es: 'Polinomio', ar: 'الحدودية' })} value={String(state.polynomial)} options={factorPolynomials.map((polynomial, index) => ({ value: String(index), label: factorLatex(polynomial.terms).replace(/\^\{(\d)\}/g, (_, digit: string) => '⁰¹²³⁴⁵'[Number(digit)]).replace(/-/g, '−') }))} onChange={(next) => setState((current) => setFactor(current, { polynomial: Number(next) }))} />
            <Stepper label={l({ eu: 'Koefizientea', es: 'Coeficiente', ar: 'المعامل' })} value={state.coefficient} min={FACTOR_LIMITS.coefficient.min} max={FACTOR_LIMITS.coefficient.max} onChange={(next) => setState((current) => setFactor(current, { coefficient: next }))} language={props.language} />
            <Stepper label={l({ eu: 'x-ren berretzailea', es: 'Exponente de x', ar: 'أس x' })} value={state.power} min={FACTOR_LIMITS.power.min} max={FACTOR_LIMITS.power.max} onChange={(next) => setState((current) => setFactor(current, { power: next }))} language={props.language} />
        </>
    )
    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={inside ? `$${factorLatex(terms)}=${outside}\\cdot(${factorLatex(inside)})$` : `$${factorLatex(terms)}$`} />
            </span>
            <span className="fraction-v2-lab-readout-note">
                {inside === null
                    ? l({ eu: `${outside} ez da gai guztien zatitzailea: aukeratu beste bat.`, es: `${outside} no divide a todos los términos: elige otro.`, ar: `${outside} لا يقسم كل الحدود: اختر غيره.` })
                    : isGreatest
                        ? l({ eu: 'Faktore komunik handiena da! Parentesi barruan ez da ezer komunik geratzen.', es: '¡Es el mayor factor común! Dentro del paréntesis ya no queda nada en común.', ar: 'إنه أكبر عامل مشترك! لم يبقَ شيء مشترك داخل القوس.' })
                        : l({ eu: 'Faktore komuna da, baina handiagoa atera daiteke.', es: 'Es un factor común, pero se puede sacar uno mayor.', ar: 'إنه عامل مشترك، لكن يمكن إخراج أكبر منه.' })}
            </span>
        </>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={factorChallenges} state={state}>
            <div className="algebra2-lab-figure algebra2-factor" dir="ltr">
                {terms.map((term, index) => {
                    const part = inside?.[index]
                    return (
                        <div className={`algebra2-factor-term ${inside ? 'ok' : 'bad'}`} key={index}>
                            <MathText text={`$${termLatex(term)}$`} />
                            <span aria-hidden="true">↓</span>
                            <MathText text={part ? `$${outside}\\cdot ${part.coefficient < 0 ? `(${termLatex(part)})` : termLatex(part)}$` : `$${termLatex(term)}\\mathbin{:}${outside}$ ✗`} />
                        </div>
                    )
                })}
            </div>
        </ToolFrame>
    )
}
