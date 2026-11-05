import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD_TINT, MUTED, say, SECOND, STAGE, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { E_PAYMENTS, E_RATES, eLimit, eMachineChallenges, eMachineExtra, eMachinePrediction, eMark, eValue, initialEMachineState, setEMachine, type EMachineState } from './eMachine'
import { FIB_LIMITS, fibChallenges, fibExtra, fibPrediction, fibRatio, fibRatios, fibTerms, initialFibState, PHI, setFib, type FibState } from './fibonacci'
import { BAND_EPSILONS, BAND_SEQUENCES, BAND_TERMS, epsilonTex, firstInside, initialLimitBandState, insideBand, limitBandChallenges, limitBandExtra, limitBandPrediction, setLimitBand, type LimitBandState } from './limitBand'

/* ==========================================================================
   Segidak · Batxilergoa 1 · Zientziak — the three tools of this unit:
   Fibonacci and the golden ratio (the quotients that jump around φ), the
   band of the limit (from which term on all the terms stay within ε) and
   the e machine (interest paid more and more often). Each asks for a
   prediction before it shows the result; Fibonacci and the e machine move
   with ▶. Logic in fibonacci.ts, limitBand.ts and eMachine.ts.
   ========================================================================== */

/* ---------- L1. Fibonacci and the golden ratio ---------- */

export function FibonacciTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<FibState>(initialFibState)
    const shown = state.prediction !== null
    const ratios = fibRatios(state)
    const terms = fibTerms(state, state.n)
    const playback = usePlayback(`${state.a1}-${state.a2}-${state.n}`, 1600)
    // Before the prediction the last quotient is hidden; ▶ draws them again one by one
    const visible = !shown ? ratios.length - 1 : playback.progress === null ? ratios.length : Math.max(1, Math.ceil(playback.progress * ratios.length))
    const X = (k: number) => 44 + (k - 2) * 28
    const Y = (ratio: number) => 196 - (Math.min(3, Math.max(0.5, ratio)) - 0.5) * 60
    const ratio = fibRatio(state)
    const last = terms[terms.length - 1]
    const before = terms[terms.length - 2]
    const controls = (
        <>
            <Stepper label="a₁" value={state.a1} min={FIB_LIMITS.start.min} max={FIB_LIMITS.start.max} onChange={(a1) => setState((s) => setFib(s, { a1 }))} language={props.language} />
            <Stepper label="a₂" value={state.a2} min={FIB_LIMITS.start.min} max={FIB_LIMITS.start.max} onChange={(a2) => setState((s) => setFib(s, { a2 }))} language={props.language} />
            <Stepper label={l(say('Gaiak n', 'Términos n', 'الحدود n', 'Terms n'))} value={state.n} min={FIB_LIMITS.n.min} max={FIB_LIMITS.n.max} onChange={(n) => setState((s) => setFib(s, { n }))} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: azken zatidura, $\\frac{a_n}{a_{n-1}}$, $\\varphi$ baino txikiagoa, berdina edo handiagoa izango da?', 'Antes de verlo: ¿el último cociente, $\\frac{a_n}{a_{n-1}}$, será menor, igual o mayor que $\\varphi$?', 'قبل أن تراه: هل يكون آخر خارج قسمة $\\frac{a_n}{a_{n-1}}$ أصغر من $\\varphi$ أم يساويه أم أكبر؟', 'Before you see it: will the last quotient, $\\frac{a_n}{a_{n-1}}$, be smaller than, equal to or greater than $\\varphi$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Smaller'), '=': say('Berdina', 'Igual', 'يساويه', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={fibPrediction(state)}
            choice={state.prediction}
            tip={say('Zatidurak txandaka geratzen dira $\\varphi$ zenbakiaren azpitik eta gainetik. Inoiz ez dira zehazki $\\varphi$: irrazionala da.', 'Los cocientes quedan por turnos debajo y encima de $\\varphi$. Nunca son exactamente $\\varphi$: es irracional.', 'تقع خوارج القسمة بالتناوب تحت $\\varphi$ وفوقه، ولا تساويه أبدًا: إنه غير نسبي.', 'The quotients take turns below and above $\\varphi$. They are never exactly $\\varphi$: it is irrational.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`\\frac{a_{${state.n}}}{a_{${state.n - 1}}}=\\frac{${last}}{${before}}\\approx ${texDec(ratio, props.language, 4)}`, `\\varphi\\approx ${texDec(PHI, props.language, 4)}`]}
                note={l(say(`Aldea: $${texDec(Math.abs(ratio - PHI), 'eu', 4)}$. Zenbat eta gai gehiago, orduan eta txikiagoa.`, `Diferencia: $${texDec(Math.abs(ratio - PHI), 'es', 4)}$. Cuantos más términos, más pequeña.`, `الفرق: $${texDec(Math.abs(ratio - PHI), 'ar', 4)}$. وكلما زادت الحدود صغر الفرق.`, `Difference: $${texDec(Math.abs(ratio - PHI), 'en', 4)}$. The more terms, the smaller it gets.`))}
            />
        </Predict>
    )
    const shownTerms = terms.length > 6 ? `…, ${terms.slice(-6).join(', ')}` : terms.join(', ')
    const points = ratios.slice(0, visible).map((value, index) => ({ k: index + 2, value }))
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={fibChallenges} extraChallenges={fibExtra} state={state}>
            <Board height={236} label={l(say(`aₙ = aₙ₋₁ + aₙ₋₂ segida, ${state.a1} eta ${state.a2} zenbakiekin hasita, eta haren zatidurak φ zenbakiaren ondoan`, `La sucesión aₙ = aₙ₋₁ + aₙ₋₂ que empieza por ${state.a1} y ${state.a2}, y sus cocientes junto a φ`, `المتتالية aₙ = aₙ₋₁ + aₙ₋₂ التي تبدأ بـ ${state.a1} و${state.a2} وخوارج قسمتها بجانب φ`, `The sequence aₙ = aₙ₋₁ + aₙ₋₂ starting with ${state.a1} and ${state.a2}, and its quotients next to φ`))}>
                <text x={180} y={22} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{shownTerms}</text>
                <line x1={34} x2={334} y1={Y(PHI)} y2={Y(PHI)} stroke={SECOND} strokeWidth={1.8} strokeDasharray="6 4" />
                <text x={340} y={Y(PHI) + 5} fontSize={15} fontWeight={700} fill={SECOND}>φ</text>
                {[1, 2].map((value) => (
                    <g key={value}>
                        <line x1={34} x2={334} y1={Y(value)} y2={Y(value)} stroke={MUTED} strokeWidth={0.8} opacity={0.5} />
                        <text x={26} y={Y(value) + 4} textAnchor="end" fontSize={12} fill={MUTED}>{value}</text>
                    </g>
                ))}
                <line x1={34} x2={334} y1={208} y2={208} stroke={INK} strokeWidth={1.4} />
                {[2, 4, 6, 8, 10, 12].map((k) => <text key={k} x={X(k)} y={224} textAnchor="middle" fontSize={12} fill={MUTED}>{k}</text>)}
                <text x={350} y={224} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>n</text>
                {points.length > 1 && <polyline points={points.map((point) => `${X(point.k)},${Y(point.value)}`).join(' ')} fill="none" stroke={MUTED} strokeWidth={1.2} />}
                {points.map((point) => <circle key={point.k} cx={X(point.k)} cy={Y(point.value)} r={4.5} fill={point.value > PHI ? SECOND : STAGE} stroke={INK} strokeWidth={0.8} />)}
                {!shown && <Hidden x={X(state.n)} y={Y(PHI) - 14} size={22} />}
            </Board>
            <PlayButton label={l(say('Marraztu', 'Dibujar', 'ارسم', 'Draw'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. The band of the limit ---------- */

const SEQUENCE_NAMES = ['aₙ = (2n + 1)/n', 'aₙ = (3n − 1)/(n + 1)', 'aₙ = 1 + (−1)ⁿ/n']

export function LimitBandTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<LimitBandState>(initialLimitBandState)
    const shown = state.prediction !== null
    const { limit, latex, term } = BAND_SEQUENCES[state.sequence]
    const epsilon = BAND_EPSILONS[state.epsilon]
    const first = firstInside(state.sequence, state.epsilon)
    const X = (n: number) => 30 + (n - 1) * 3.1
    const Y = (value: number) => 132 - (value - limit) * 45
    const gap = state.sequence === 1 ? '\\frac{4}{n+1}' : '\\frac{1}{n}'
    const eps = epsilonTex(state.epsilon).replace('{,}', props.language === 'ar' ? '.' : '{,}')
    const controls = (
        <>
            <Segmented<string> label={l(say('Segida', 'Sucesión', 'المتتالية', 'Sequence'))} value={String(state.sequence)} options={['A', 'B', 'C'].map((name, index) => ({ value: String(index), label: name }))} onChange={(value) => setState((s) => setLimitBand(s, { sequence: Number(value) }))} />
            <Segmented<string> label="ε" value={String(state.epsilon)} options={BAND_EPSILONS.map((value, index) => ({ value: String(index), label: dec(value, props.language) }))} onChange={(value) => setState((s) => setLimitBand(s, { epsilon: Number(value) }))} />
            <Stepper label="N" value={state.from} min={1} max={BAND_TERMS} onChange={(from) => setState((s) => setLimitBand(s, { from }))} language={props.language} />
        </>
    )
    const where = limitBandPrediction(state)
    const note = where === '<'
        ? say(`$N=${state.from}$ goizegi da: $a_{${first - 1}}$ bandatik kanpo dago oraindik. Lehena: $N=${first}$.`, `$N=${state.from}$ es pronto: $a_{${first - 1}}$ aún queda fuera de la banda. El primero: $N=${first}$.`, `$N=${state.from}$ مبكر: لا يزال $a_{${first - 1}}$ خارج الشريط. الأول هو $N=${first}$.`, `$N=${state.from}$ is too early: $a_{${first - 1}}$ is still outside the band. The first one: $N=${first}$.`)
        : where === '='
            ? say(`$N=${first}$ da lehena: hortik aurrera, gai guztiak bandan daude.`, `$N=${first}$ es el primero: desde ahí, todos están en la banda.`, `$N=${first}$ هو الأول: ابتداءً منه كل الحدود في الشريط.`, `$N=${first}$ is the first: from there on, every term is in the band.`)
            : say(`$N=${state.from}$ gaitik aurrera ere guztiak bandan daude, baina lehena $N=${first}$ da.`, `Desde $N=${state.from}$ también están todos en la banda, pero el primero es $N=${first}$.`, `ابتداءً من $N=${state.from}$ كلها في الشريط أيضًا، لكن الأول هو $N=${first}$.`, `From $N=${state.from}$ on they are all in the band too, but the first one is $N=${first}$.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $N$ gaitik aurrera gai guztiak bandan daude? Eta $N$ lehena da?', 'Antes de verlo: ¿desde el término $N$ están todos en la banda? ¿Y es $N$ el primero?', 'قبل أن ترى: هل كل الحدود في الشريط ابتداءً من $N$؟ وهل $N$ هو الأول؟', 'Before you see it: from term $N$ on, are all the terms in the band? And is $N$ the first?')}
            labels={{ '<': say('Goizegi', 'Demasiado pronto', 'مبكر جدًا', 'Too early'), '=': say('Zehazki lehena', 'Justo el primero', 'الأول تمامًا', 'Exactly the first'), '>': say('Bai, baina beranduago', 'Sí, pero más tarde', 'نعم، لكن متأخر', 'Yes, but later') }}
            actual={where}
            choice={state.prediction}
            tip={say('Gaiaren eta limitearen arteko distantzia $|a_n-L|$ da, eta $\\varepsilon$ baino txikiagoa izan behar du.', 'La distancia del término al límite es $|a_n-L|$, y tiene que ser menor que $\\varepsilon$.', 'المسافة بين الحد والنهاية هي $|a_n-L|$، ويجب أن تكون أقل من $\\varepsilon$.', 'The distance from the term to the limit is $|a_n-L|$, and it has to be less than $\\varepsilon$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={[`a_n=${latex}\\qquad L=${limit}`, `|a_n-${limit}|=${gap}<${eps}\\ \\to\\ n\\ge ${first}`]} note={l(note)} />
        </Predict>
    )
    const terms = Array.from({ length: BAND_TERMS }, (_, index) => index + 1)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={limitBandChallenges} extraChallenges={limitBandExtra} state={state}>
            <Board height={250} label={l(say(`${SEQUENCE_NAMES[state.sequence]} segidaren lehen 100 gaiak eta L ± ε banda`, `Los 100 primeros términos de ${SEQUENCE_NAMES[state.sequence]} y la banda L ± ε`, `الحدود المئة الأولى من ${SEQUENCE_NAMES[state.sequence]} والشريط L ± ε`, `The first 100 terms of ${SEQUENCE_NAMES[state.sequence]} and the band L ± ε`))}>
                <text x={180} y={20} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{SEQUENCE_NAMES[state.sequence]}</text>
                <rect x={26} y={Y(limit + epsilon)} width={316} height={Y(limit - epsilon) - Y(limit + epsilon)} fill={MUSTARD_TINT} />
                <line x1={26} x2={342} y1={Y(limit)} y2={Y(limit)} stroke={SECOND} strokeWidth={1.4} strokeDasharray="5 4" />
                <text x={346} y={Y(limit) + 4} fontSize={13} fontWeight={700} fill={SECOND}>L</text>
                <line x1={X(state.from)} x2={X(state.from)} y1={34} y2={228} stroke={STAGE} strokeWidth={1.6} />
                <text x={Math.min(330, Math.max(30, X(state.from)))} y={46} textAnchor="middle" fontSize={13} fontWeight={700} fill={STAGE}>{`N = ${state.from}`}</text>
                {terms.map((n) => {
                    const after = n >= state.from
                    const color = !after ? MUTED : !shown ? INK : insideBand(state.sequence, state.epsilon, n) ? GREEN : SECOND
                    return <circle key={n} cx={X(n)} cy={Y(term(n))} r={after ? 2.4 : 1.7} fill={color} opacity={after ? 1 : 0.45} />
                })}
                <line x1={26} x2={342} y1={234} y2={234} stroke={INK} strokeWidth={1.2} />
                {[1, 50, 100].map((n) => <text key={n} x={X(n)} y={247} textAnchor="middle" fontSize={11} fill={MUTED}>{n}</text>)}
                {!shown && <Hidden x={300} y={90} size={22} />}
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The e machine ---------- */

export function EMachineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<EMachineState>(initialEMachineState)
    const shown = state.prediction !== null
    const k = E_RATES[state.rate]
    const n = E_PAYMENTS[state.payments]
    const value = eValue(state)
    const top = eLimit(state.rate)
    const mark = eMark(state.rate)
    const playback = usePlayback(`${state.rate}-${state.payments}`, 1800)
    const reached = !shown ? 0 : playback.progress === null ? 1 : playback.progress
    const X = (t: number) => 36 + t * 296
    const Y = (money: number) => 200 - ((money - 1) / (top - 1)) * 158
    const curve = Array.from({ length: 61 }, (_, i) => `${i === 0 ? 'M' : 'L'} ${X(i / 60).toFixed(1)} ${Y(Math.exp(k * (i / 60))).toFixed(1)}`).join(' ')
    // The staircase climbed so far: flat until each payment, then up by 1 + k/n
    let stairs = `M ${X(0)} ${Y(1)}`
    for (let i = 1; i <= n && i / n <= reached + 1e-9; i += 1) {
        const level = (1 + k / n) ** (i - 1)
        stairs += ` L ${X(i / n).toFixed(2)} ${Y(level).toFixed(2)} L ${X(i / n).toFixed(2)} ${Y((1 + k / n) ** i).toFixed(2)}`
    }
    const controls = (
        <>
            <Segmented<string> label={l(say('Interesa', 'Interés', 'الفائدة', 'Interest'))} value={String(state.rate)} options={E_RATES.map((rate, index) => ({ value: String(index), label: `k = ${rate}` }))} onChange={(rate) => setState((s) => setEMachine(s, { rate: Number(rate) }))} />
            <Stepper label={l(say('Ordainketak n', 'Pagos n', 'الدفعات n', 'Payments n'))} value={state.payments} min={0} max={E_PAYMENTS.length - 1} format={(index) => String(E_PAYMENTS[index])} onChange={(payments) => setState((s) => setEMachine(s, { payments }))} language={props.language} />
        </>
    )
    const markTex = texDec(mark, props.language, 1)
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: urte amaieran, $${markTex}$ baino gutxiago, berdin edo gehiago izango da?`, `Antes de verlo: al final del año, ¿habrá menos, lo mismo o más que $${markTex}$?`, `قبل أن ترى: في آخر السنة، هل يكون المال أقل من $${markTex}$ أم يساويه أم أكثر؟`, `Before you see it: at the end of the year, will there be less than, the same as or more than $${markTex}$?`)}
            labels={{ '<': say('Gutxiago', 'Menos', 'أقل', 'Less'), '=': say('Berdin', 'Lo mismo', 'يساويه', 'The same'), '>': say('Gehiago', 'Más', 'أكثر', 'More') }}
            actual={eMachinePrediction(state)}
            choice={state.prediction}
            tip={say('Ordainketa bakoitzak bider $1+\\frac{k}{n}$ egiten du; urte osoan, $\\left(1+\\frac{k}{n}\\right)^n$. Gero eta gehiago da, baina inoiz ez $e^k$ baino gehiago.', 'Cada pago multiplica por $1+\\frac{k}{n}$; en todo el año, $\\left(1+\\frac{k}{n}\\right)^n$. Cada vez es más, pero nunca más que $e^k$.', 'كل دفعة تضرب في $1+\\frac{k}{n}$، وفي السنة كلها $\\left(1+\\frac{k}{n}\\right)^n$. يزداد المال لكنه لا يتجاوز $e^k$ أبدًا.', 'Each payment multiplies by $1+\\frac{k}{n}$; over the whole year, $\\left(1+\\frac{k}{n}\\right)^n$. It keeps growing, but never past $e^k$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`\\left(1+\\frac{${k}}{${n}}\\right)^{${n}}\\approx ${texDec(value, props.language, 4)}`, `e^{${k}}\\approx ${texDec(top, props.language, 4)}`]}
                note={l(say('Ordainketa gehiago, diru gehiago, baina eskailera inoiz ez da kurbaren gainetik igotzen.', 'Más pagos, más dinero, pero la escalera nunca sube por encima de la curva.', 'دفعات أكثر تعني مالًا أكثر، لكن الدرج لا يرتفع أبدًا فوق المنحنى.', 'More payments, more money, but the staircase never climbs above the curve.'))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={eMachineChallenges} extraChallenges={eMachineExtra} state={state}>
            <Board height={236} label={l(say(`Euro 1 urtebetean, ${n} ordainketarekin eta k = ${k}; kurba eᵏᵗ da`, `1 euro durante un año con ${n} pagos y k = ${k}; la curva es eᵏᵗ`, `يورو واحد خلال سنة مع ${n} دفعات وk = ${k}؛ والمنحنى eᵏᵗ`, `1 euro for a year with ${n} payments and k = ${k}; the curve is eᵏᵗ`))}>
                <line x1={36} x2={36} y1={30} y2={204} stroke={INK} strokeWidth={1.4} />
                <line x1={32} x2={340} y1={204} y2={204} stroke={INK} strokeWidth={1.4} />
                <line x1={36} x2={340} y1={Y(mark)} y2={Y(mark)} stroke={MUTED} strokeWidth={1.2} strokeDasharray="3 4" />
                <text x={30} y={Y(mark) + 4} textAnchor="end" fontSize={12} fontWeight={700} fill={MUTED}>{dec(mark, props.language, 1)}</text>
                <text x={30} y={Y(1) + 4} textAnchor="end" fontSize={12} fill={MUTED}>1</text>
                <path d={curve} fill="none" stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
                <text x={338} y={Y(top) - 8} textAnchor="end" fontSize={14} fontWeight={700} fill={SECOND}>{`e${['', '²', '³'][state.rate]}`}</text>
                {shown && <path d={stairs} fill="none" stroke={STAGE} strokeWidth={2.6} strokeLinejoin="round" />}
                {shown && reached >= 1 && <circle cx={X(1)} cy={Y(value)} r={5} fill={STAGE} stroke={INK} strokeWidth={1} />}
                {!shown && <Hidden x={X(1) - 16} y={Y(mark) + 26} size={22} />}
                <text x={X(0)} y={222} textAnchor="middle" fontSize={12} fill={MUTED}>0</text>
                <Label x={X(1)} y={222} textAnchor="end" fontSize={12} fill={MUTED}>{l(say('urte 1', '1 año', 'سنة واحدة', '1 year'))}</Label>
            </Board>
            <PlayButton label={l(say('Igo eskailera', 'Sube la escalera', 'اصعد الدرج', 'Climb the stairs'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
