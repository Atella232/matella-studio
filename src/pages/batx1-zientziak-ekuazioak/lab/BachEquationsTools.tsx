import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUTED, PAPER, say, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { ABSOLUTE_LIMITS, absoluteChallenges, absoluteCuts, absoluteExtra, absoluteLatex, absolutePrediction, foldLatex, foldValue, initialAbsoluteState, isAbsoluteSolution, setAbsolute, type AbsoluteRelation, type AbsoluteState } from './absoluteFold'
import { CHANGE_LIMITS, changeChallenges, changeExtra, changeLatex, changePrediction, changeSolutions, initialChangeState, setChange, tEquationLatex, tRoots, xEquationLatex, xFromT, type ChangeKind, type ChangeState } from './changeMachine'
import { activeRoots, expressionLatex, factorLatex, holeOf, initialSignTableState, setSignTable, SIGN_LIMITS, signPrediction, signTableChallenges, signTableExtra, signValue, type SignTableState } from './signTable'

/* ==========================================================================
   Ekuazioak eta inekuazioak · Batxilergoa 1 · Zientziak — the three tools
   of this unit: the sign table (factors whose roots slide, one of them
   maybe in the denominator), the folded absolute value against a
   horizontal line, and the change of variable machine (each t carried to
   its x, or thrown out). Each asks for a prediction before it shows the
   result; the machine moves with ▶. Logic in signTable.ts,
   absoluteFold.ts and changeMachine.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
/** A number for LaTeX: whole, or rounded to two decimals with ≈ */
const exactOrRounded = (value: number, language: Parameters<typeof texDec>[1]) => (Math.abs(value - Math.round(value)) < 1e-9 ? String(Math.round(value)) : `${texDec(value, language, 2)}`)

/* ---------- L1. The sign table ---------- */

export function SignTableTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SignTableState>(initialSignTableState)
    const shown = state.prediction !== null
    const roots = activeRoots(state)
    const hole = holeOf(state)
    const X = (x: number) => 30 + (x + 6) * 25
    const rowY = (index: number) => 82 + index * 30
    const totalY = rowY(roots.length) + 8
    const breaks = [...new Set(roots)].sort((a, b) => a - b)
    const edges = [-6, ...breaks, 6]
    const value = signValue(state, state.probe)
    const setRoot = (index: number, root: number) => setState((s) => {
        const next = [...s.roots] as [number, number, number]
        next[index] = root
        return setSignTable(s, { roots: next })
    })
    const controls = (
        <>
            <Segmented<string> label={l(say('Faktoreak', 'Factores', 'العوامل', 'Factors'))} value={String(state.factors)} options={[{ value: '2', label: '2' }, { value: '3', label: '3' }]} onChange={(factors) => setState((s) => setSignTable(s, { factors: Number(factors) as 2 | 3 }))} />
            <Segmented<string> label={l(say('Azkena izendatzailean', 'El último, abajo', 'الأخير في المقام', 'Last one below'))} value={state.denominator ? 'yes' : 'no'} options={[{ value: 'no', label: l(say('Ez', 'No', 'لا', 'No')) }, { value: 'yes', label: l(say('Bai', 'Sí', 'نعم', 'Yes')) }]} onChange={(answer) => setState((s) => setSignTable(s, { denominator: answer === 'yes' }))} />
            {roots.map((root, index) => <Stepper key={index} label={`${l(say('Erroa', 'Raíz', 'الجذر', 'Root'))} ${index + 1}`} value={root} min={SIGN_LIMITS.root.min} max={SIGN_LIMITS.root.max} onChange={(next) => setRoot(index, next)} language={props.language} />)}
            <Stepper label={l(say('Zunda x', 'Sonda x', 'المسبار x', 'Probe x'))} value={state.probe} min={SIGN_LIMITS.probe.min} max={SIGN_LIMITS.probe.max} onChange={(probe) => setState((s) => setSignTable(s, { probe }))} language={props.language} />
        </>
    )
    const where = signPrediction(state)
    const note = value === null
        ? say(`$x=${state.probe}$ balioak izendatzailea anulatzen du: adierazpena ez dago.`, `$x=${state.probe}$ anula el denominador: la expresión no existe.`, `$x=${state.probe}$ تعدم المقام: العبارة غير موجودة.`, `$x=${state.probe}$ makes the denominator zero: the expression does not exist.`)
        : where === '='
            ? say(`$x=${state.probe}$ erroa da: adierazpena 0 da.`, `$x=${state.probe}$ es una raíz: la expresión vale 0.`, `$x=${state.probe}$ جذر: العبارة تساوي 0.`, `$x=${state.probe}$ is a root: the expression is 0.`)
            : say('Biderkatu zundaren tarteko zeinuak.', 'Multiplica los signos del tramo de la sonda.', 'اضرب إشارات المجال الذي فيه المسبار.', 'Multiply the signs on the probe\'s stretch.')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zer zeinu du adierazpenak $x=${state.probe}$ denean?`, `Antes de verlo: ¿qué signo tiene la expresión en $x=${state.probe}$?`, `قبل أن ترى: ما إشارة العبارة عند $x=${state.probe}$؟`, `Before you see it: what sign does the expression have at $x=${state.probe}$?`)}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالبة', 'Negative'), '=': say('0 edo ez dago', '0 o no existe', 'صفر أو غير موجودة', '0 or does not exist'), '>': say('Positiboa', 'Positivo', 'موجبة', 'Positive') }}
            actual={where}
            choice={state.prediction}
            tip={say('Faktore bakoitza negatiboa da bere erroaren ezkerrean eta positiboa eskuinean. Zeinu negatibo kopurua bikoitia bada, emaitza positiboa da.', 'Cada factor es negativo a la izquierda de su raíz y positivo a la derecha. Si hay un número par de signos negativos, el resultado es positivo.', 'كل عامل سالب يسار جذره وموجب يمينه. وإذا كان عدد الإشارات السالبة زوجيًّا فالنتيجة موجبة.', 'Each factor is negative to the left of its root and positive to the right. If there is an even number of negative signs, the result is positive.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={value === null ? [expressionLatex(state)] : [expressionLatex(state), `x=${state.probe}\\ \\to\\ ${exactOrRounded(value, props.language)}`]} note={l(note)} />
        </Predict>
    )
    const signColor = (positive: boolean) => (positive ? STAGE : SECOND)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={signTableChallenges} extraChallenges={signTableExtra} state={state}>
            <Board height={totalY + 46} label={l(say(`${expressionLatex(state)} adierazpenaren zeinuen taula`, `Tabla de signos de ${expressionLatex(state)}`, `جدول إشارات ${expressionLatex(state)}`, `Sign table of ${expressionLatex(state)}`))}>
                <line x1={20} x2={340} y1={40} y2={40} stroke={INK} strokeWidth={1.6} />
                {[-6, -4, -2, 0, 2, 4, 6].map((tick) => <text key={tick} x={X(tick)} y={26} textAnchor="middle" fontSize={11} fill={MUTED}>{minus(tick)}</text>)}
                {breaks.map((root) => (
                    <g key={root}>
                        <line x1={X(root)} x2={X(root)} y1={40} y2={totalY + 12} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
                        <circle cx={X(root)} cy={40} r={5} fill={root === hole ? PAPER : INK} stroke={INK} strokeWidth={1.6} />
                    </g>
                ))}
                {roots.map((root, index) => {
                    const below = hole !== null && index === roots.length - 1
                    return (
                        <g key={index}>
                            <text x={22} y={rowY(index) - 6} fontSize={12} fontWeight={700} fill={below ? SECOND : INK} direction="ltr">{below ? `÷ (${factorLatex(root).replace('-', ' − ').replace('+', ' + ')})` : `(${factorLatex(root).replace('-', ' − ').replace('+', ' + ')})`}</text>
                            <line x1={X(-6)} x2={X(root)} y1={rowY(index)} y2={rowY(index)} stroke={signColor(false)} strokeWidth={6} />
                            <line x1={X(root)} x2={X(6)} y1={rowY(index)} y2={rowY(index)} stroke={signColor(true)} strokeWidth={6} />
                        </g>
                    )
                })}
                {edges.slice(0, -1).map((left, index) => {
                    const right = edges[index + 1]
                    const middle = (left + right) / 2
                    const sample = signValue(state, middle)
                    const positive = sample !== null && sample > 0
                    return shown
                        ? <rect key={index} x={X(left) + 1} y={totalY - 7} width={X(right) - X(left) - 2} height={14} rx={4} fill={positive ? GREEN_TINT : '#f6d5cc'} stroke={positive ? GREEN : SECOND} strokeWidth={1.4} />
                        : <rect key={index} x={X(left) + 1} y={totalY - 7} width={X(right) - X(left) - 2} height={14} rx={4} fill={PAPER} stroke={MUTED} strokeWidth={1} strokeDasharray="3 3" />
                })}
                {shown && edges.slice(0, -1).map((left, index) => {
                    const right = edges[index + 1]
                    const middle = (left + right) / 2
                    const sample = signValue(state, middle)
                    return X(right) - X(left) > 18 && sample !== null ? <text key={index} x={X(middle)} y={totalY + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={sample > 0 ? GREEN : SECOND}>{sample > 0 ? '+' : '−'}</text> : null
                })}
                <line x1={X(state.probe)} x2={X(state.probe)} y1={44} y2={totalY + 14} stroke={INK} strokeWidth={2} />
                <polygon points={`${X(state.probe)},${totalY + 16} ${X(state.probe) - 6},${totalY + 28} ${X(state.probe) + 6},${totalY + 28}`} fill={INK} />
                {!shown && <Hidden x={X(state.probe) + (state.probe > 3 ? -18 : 18)} y={totalY + 6} size={18} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The folded absolute value ---------- */

export function AbsoluteFoldTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AbsoluteState>(initialAbsoluteState)
    const shown = state.prediction !== null
    const X = (x: number) => 30 + (x + 6) * 25
    const Y = (y: number) => 196 - (y + 2) * 18
    const samples = Array.from({ length: 97 }, (_, i) => -6 + i * 0.125)
    const path = samples.map((x, i) => `${i === 0 ? 'M' : 'L'} ${X(x).toFixed(1)} ${Y(Math.min(9, foldValue(state, x))).toFixed(1)}`).join(' ')
    const cuts = absoluteCuts(state)
    const probeValue = foldValue(state, state.probe)
    const solution = isAbsoluteSolution(state, state.probe)
    const controls = (
        <>
            <Segmented<string> label="m" value={String(state.m)} options={ABSOLUTE_LIMITS.m.map((m) => ({ value: String(m), label: String(m) }))} onChange={(m) => setState((s) => setAbsolute(s, { m: Number(m) }))} />
            <Stepper label="q" value={state.q} min={ABSOLUTE_LIMITS.q.min} max={ABSOLUTE_LIMITS.q.max} onChange={(q) => setState((s) => setAbsolute(s, { q }))} language={props.language} />
            <Segmented<AbsoluteRelation> label={l(say('Erlazioa', 'Relación', 'العلاقة', 'Relation'))} value={state.relation} options={[{ value: '=', label: '=' }, { value: '<', label: '<' }, { value: '>', label: '>' }]} onChange={(relation) => setState((s) => setAbsolute(s, { relation }))} />
            <Stepper label="c" value={state.c} min={ABSOLUTE_LIMITS.c.min} max={ABSOLUTE_LIMITS.c.max} onChange={(c) => setState((s) => setAbsolute(s, { c }))} language={props.language} />
            <Stepper label={l(say('Zunda x', 'Sonda x', 'المسبار x', 'Probe x'))} value={state.probe} min={ABSOLUTE_LIMITS.probe.min} max={ABSOLUTE_LIMITS.probe.max} onChange={(probe) => setState((s) => setAbsolute(s, { probe }))} language={props.language} />
        </>
    )
    // |m·p + q| with the probe's number in it
    const probeLatex = `|${state.m === 1 ? '' : `${state.m}\\cdot `}${state.probe < 0 ? `(${state.probe})` : state.probe}${state.q === 0 ? '' : state.q > 0 ? `+${state.q}` : `-${-state.q}`}|`
    const cutsLatex = cuts.length === 0 ? '\\varnothing' : cuts.map((x) => exactOrRounded(x, props.language)).join(',\\ ')
    const setLatex = state.relation === '='
        ? `x\\in\\{${cutsLatex}\\}`
        : state.relation === '<'
            ? (cuts.length === 2 ? `(${exactOrRounded(cuts[0], props.language)},\\ ${exactOrRounded(cuts[1], props.language)})` : '\\varnothing')
            : (cuts.length === 2 ? `(-\\infty,\\ ${exactOrRounded(cuts[0], props.language)})\\cup(${exactOrRounded(cuts[1], props.language)},\\ +\\infty)` : cuts.length === 1 ? `x\\neq ${exactOrRounded(cuts[0], props.language)}` : '\\mathbb{R}')
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: $x=${state.probe}$ denean, $${foldLatex(state)}$ adierazpena $c$ baino txikiagoa, berdina edo handiagoa da?`, `Antes de verlo: en $x=${state.probe}$, ¿$${foldLatex(state)}$ es menor, igual o mayor que $c$?`, `قبل أن ترى: عند $x=${state.probe}$ هل $${foldLatex(state)}$ أصغر من $c$ أم تساويه أم أكبر؟`, `Before you see it: at $x=${state.probe}$, is $${foldLatex(state)}$ smaller than, equal to or greater than $c$?`)}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Smaller'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={absolutePrediction(state)}
            choice={state.prediction}
            tip={say('Kalkulatu barrukoa, eta kendu zeinua: balio absolutua ez da inoiz negatiboa.', 'Calcula lo de dentro y quítale el signo: un valor absoluto nunca es negativo.', 'احسب ما في الداخل واحذف الإشارة: القيمة المطلقة ليست سالبة أبدًا.', 'Work out the inside and drop the sign: an absolute value is never negative.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`${probeLatex}=${probeValue}`, `${absoluteLatex(state)}\\ \\to\\ ${setLatex}`]}
                note={l(solution
                    ? say(`$x=${state.probe}$ soluzioa da.`, `$x=${state.probe}$ es solución.`, `$x=${state.probe}$ حل.`, `$x=${state.probe}$ is a solution.`)
                    : say(`$x=${state.probe}$ ez da soluzioa.`, `$x=${state.probe}$ no es solución.`, `$x=${state.probe}$ ليس حلًّا.`, `$x=${state.probe}$ is not a solution.`))}
            />
        </Predict>
    )
    // The part of the x axis that solves the relation, drawn after the prediction
    const solvedStretches: Array<[number, number]> = state.relation === '<'
        ? (cuts.length === 2 ? [[cuts[0], cuts[1]]] : [])
        : state.relation === '>'
            ? (cuts.length === 2 ? [[-6, cuts[0]], [cuts[1], 6]] : cuts.length === 1 ? [[-6, 6]] : state.c < 0 ? [[-6, 6]] : [])
            : []
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={absoluteChallenges} extraChallenges={absoluteExtra} state={state}>
            <Board height={236} label={l(say(`${absoluteLatex(state)}: V forma eta y = ${state.c} zuzena`, `${absoluteLatex(state)}: la V y la recta y = ${state.c}`, `${absoluteLatex(state)}: الشكل V والمستقيم y = ${state.c}`, `${absoluteLatex(state)}: the V and the line y = ${state.c}`))}>
                <defs><clipPath id="absolute-fold-board"><rect x={20} y={10} width={330} height={190} /></clipPath></defs>
                <line x1={20} x2={345} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={1.6} />
                {[-6, -4, -2, 0, 2, 4, 6].map((tick) => (
                    <g key={tick}>
                        <line x1={X(tick)} x2={X(tick)} y1={Y(0) - 4} y2={Y(0) + 4} stroke={INK} strokeWidth={1.2} />
                        <text x={X(tick)} y={Y(0) + 18} textAnchor="middle" fontSize={11} fill={MUTED}>{minus(tick)}</text>
                    </g>
                ))}
                {shown && solvedStretches.map(([left, right], index) => <line key={index} x1={X(Math.max(-6, left))} x2={X(Math.min(6, right))} y1={Y(0)} y2={Y(0)} stroke={GREEN} strokeWidth={6} />)}
                <g clipPath="url(#absolute-fold-board)">
                    <path d={path} fill="none" stroke={STAGE} strokeWidth={3} strokeLinejoin="round" />
                    <line x1={20} x2={345} y1={Y(state.c)} y2={Y(state.c)} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                </g>
                <text x={350} y={Math.min(196, Math.max(20, Y(state.c) + 4))} textAnchor="end" fontSize={12} fontWeight={700} fill={SECOND}>{`y = ${minus(state.c)}`}</text>
                {shown && cuts.filter((x) => x >= -6 && x <= 6).map((x) => <circle key={x} cx={X(x)} cy={Y(state.c)} r={4.5} fill={SECOND} stroke={INK} strokeWidth={1} />)}
                <line x1={X(state.probe)} x2={X(state.probe)} y1={Y(0)} y2={Y(Math.min(9, probeValue))} stroke={INK} strokeWidth={1.6} strokeDasharray="3 3" />
                {shown
                    ? <circle cx={X(state.probe)} cy={Y(Math.min(9, probeValue))} r={5.5} fill={solution ? GREEN : PAPER} stroke={INK} strokeWidth={1.4} />
                    : <Hidden x={X(state.probe) + (state.probe > 3 ? -16 : 16)} y={Y(Math.min(8, probeValue)) + 6} size={18} />}
                <polygon points={`${X(state.probe)},${Y(0) + 22} ${X(state.probe) - 5},${Y(0) + 32} ${X(state.probe) + 5},${Y(0) + 32}`} fill={INK} />
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The change of variable machine ---------- */

const KIND_OPTIONS: Array<{ value: ChangeKind; label: string }> = [{ value: 'square', label: 't = x²' }, { value: 'cube', label: 't = x³' }, { value: 'exp', label: 't = 2ˣ' }]

export function ChangeMachineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ChangeState>(initialChangeState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.kind}-${state.t1}-${state.t2}`, 1400)
    const progress = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const T = (t: number) => 30 + (t + 9) * (300 / 18)
    const Xx = (x: number) => 30 + (x + 4) * (300 / 8)
    const tY = 58
    const xY = 168
    const solutions = changeSolutions(state)
    const controls = (
        <>
            <Segmented<ChangeKind> label={l(say('Aldaketa', 'Cambio', 'التغيير', 'Change'))} value={state.kind} options={KIND_OPTIONS} onChange={(kind) => setState((s) => setChange(s, { kind }))} />
            <Stepper label="t₁" value={state.t1} min={CHANGE_LIMITS.t.min} max={CHANGE_LIMITS.t.max} onChange={(t1) => setState((s) => setChange(s, { t1 }))} language={props.language} />
            <Stepper label="t₂" value={state.t2} min={CHANGE_LIMITS.t.min} max={CHANGE_LIMITS.t.max} onChange={(t2) => setState((s) => setChange(s, { t2 }))} language={props.language} />
        </>
    )
    const listLatex = solutions.length === 0 ? '\\varnothing' : solutions.map((x) => (Math.abs(x - Math.round(x)) < 1e-9 ? String(Math.round(x)) : `${texDec(x, props.language, 2)}`)).join(',\\ ')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $x$ aldagaian, zenbat soluzio izango dira?', 'Antes de verlo: ¿cuántas soluciones habrá en $x$?', 'قبل أن ترى: كم حلًّا سيكون في $x$؟', 'Before you see it: how many solutions will there be in $x$?')}
            labels={{ '<': say('2 baino gutxiago', 'Menos de 2', 'أقل من 2', 'Fewer than 2'), '=': say('Zehazki 2', 'Exactamente 2', '2 بالضبط', 'Exactly 2'), '>': say('2 baino gehiago', 'Más de 2', 'أكثر من 2', 'More than 2') }}
            actual={changePrediction(state)}
            choice={state.prediction}
            tip={say('$t=x^2$: $t>0$ bakoitzak bi. $t=x^3$: $t$ bakoitzak bat. $t=2^x$: $t>0$ bakoitzak bat.', '$t=x^2$: cada $t>0$ da dos. $t=x^3$: cada $t$ da una. $t=2^x$: cada $t>0$ da una.', '$t=x^2$: كل $t>0$ يعطي حلّين. $t=x^3$: كل $t$ يعطي حلًّا. $t=2^x$: كل $t>0$ يعطي حلًّا.', '$t=x^2$: each $t>0$ gives two. $t=x^3$: each $t$ gives one. $t=2^x$: each $t>0$ gives one.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[xEquationLatex(state), `${changeLatex(state.kind)}\\ \\to\\ ${tEquationLatex(state)}`, `x\\in\\{${listLatex}\\}`]} note={l(say(`${solutions.length} soluzio.`, `${solutions.length} ${solutions.length === 1 ? 'solución' : 'soluciones'}.`, `عدد الحلول: ${solutions.length}.`, `${solutions.length} ${solutions.length === 1 ? 'solution' : 'solutions'}.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={changeChallenges} extraChallenges={changeExtra} state={state}>
            <Board height={214} label={l(say(`${changeLatex(state.kind)} aldaketa: t = ${state.t1} eta t = ${state.t2}`, `El cambio ${changeLatex(state.kind)}: t = ${state.t1} y t = ${state.t2}`, `التغيير ${changeLatex(state.kind)}: t = ${state.t1} وt = ${state.t2}`, `The change ${changeLatex(state.kind)}: t = ${state.t1} and t = ${state.t2}`))}>
                <text x={14} y={tY - 20} fontSize={13} fontWeight={700} fill={MUTED}>t</text>
                <line x1={24} x2={336} y1={tY} y2={tY} stroke={INK} strokeWidth={1.6} />
                {[-9, -6, -3, 0, 3, 6, 9].map((tick) => <text key={tick} x={T(tick)} y={tY - 10} textAnchor="middle" fontSize={11} fill={MUTED}>{minus(tick)}</text>)}
                <text x={14} y={xY - 20} fontSize={13} fontWeight={700} fill={MUTED}>x</text>
                <line x1={24} x2={336} y1={xY} y2={xY} stroke={INK} strokeWidth={1.6} />
                {[-4, -2, 0, 2, 4].map((tick) => <text key={tick} x={Xx(tick)} y={xY + 20} textAnchor="middle" fontSize={11} fill={MUTED}>{minus(tick)}</text>)}
                {tRoots(state).map((t) => {
                    const targets = xFromT(state.kind, t)
                    return (
                        <g key={t}>
                            {shown && targets.map((x, index) => {
                                const endX = T(t) + (Xx(x) - T(t)) * progress
                                const endY = tY + (xY - tY) * progress
                                return <line key={index} x1={T(t)} x2={endX} y1={tY} y2={endY} stroke={GREEN} strokeWidth={2} />
                            })}
                            {shown && targets.length === 0 && (
                                <g opacity={progress}>
                                    <line x1={T(t)} x2={T(t)} y1={tY + 6} y2={tY + 40 * progress + 6} stroke={SECOND} strokeWidth={2} strokeDasharray="4 3" />
                                    <text x={T(t)} y={tY + 62} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>✗</text>
                                </g>
                            )}
                            <circle cx={T(t)} cy={tY} r={6} fill={targets.length ? STAGE : SECOND} stroke={INK} strokeWidth={1.2} />
                        </g>
                    )
                })}
                {shown && progress >= 1 && solutions.map((x, index) => <circle key={index} cx={Xx(x)} cy={xY} r={6} fill={GREEN} stroke={INK} strokeWidth={1.2} />)}
                {!shown && <Hidden x={180} y={xY - 14} size={22} />}
            </Board>
            <PlayButton label={l(say('Desegin aldaketa', 'Deshacer el cambio', 'اعكس التغيير', 'Undo the change'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
