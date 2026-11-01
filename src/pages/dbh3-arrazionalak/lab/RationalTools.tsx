import { useState } from 'react'
import { Stepper, Segmented, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toLatex, toNumber, type FractionValue } from '../../../features/unit-v2/math/fraction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { expand } from '../../dbh4-aplikatuak-errealak/reals'
import { betweenCount, initialMagnifierState, MAGNIFIER_LIMITS, magnifierChallenges, magnifierExtra, magnifierGrid, magnifierPrediction, pickedValue, pickMark, setMagnifier, valueOf, type MagnifierState } from './magnifier'
import { bottomStrip, initialMachineState, MACHINE_DECIMALS, MACHINE_LIMITS, machineChallenges, machineDifference, machineExtra, machineFraction, machinePrediction, machineValue, setMachine, strip, tailsCancel, type MachineState } from './machine'
import { setPrediction } from './prediction'
import { initialRemainingState, leftAfterFirst, REMAINING_LIMITS, remainingChallenges, remainingExtra, remainingMistake, remainingPart, remainingPrediction, secondOfWhole, setRemaining, type RemainingState } from './remaining'
import { initialWholeState, piece, setWhole, WHOLE_LIMITS, wholeChallenges, wholeExtra, wholeMistake, wholeOf, wholePrediction, type WholeState } from './whole'

/* ==========================================================================
   Zenbaki arrazionalak · 3. DBH — the four tools of this unit: the
   magnifier on the number line (there is always another fraction in
   between), what is left after two cuts, the generating-fraction machine
   (two strips whose tails cancel) and from the part to the whole. Each
   asks for a prediction before it shows the result, and each moves with
   ▶. The board, the readout and the prediction come from Segidak 3. DBH.
   ========================================================================== */

/** A fraction drawn as numerator over denominator, centred on x; whole numbers stay on one line */
function SvgFraction({ value, x, y, size = 13, colour = INK }: { value: FractionValue; x: number; y: number; size?: number; colour?: string }) {
    const { numerator, denominator } = value
    const sign = numerator < 0 ? '−' : ''
    if (denominator === 1) return <text x={x} y={y + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={700} fill={colour}>{`${sign}${Math.abs(numerator)}`}</text>
    const width = Math.max(String(Math.abs(numerator)).length, String(denominator).length) * size * 0.62 + 4
    const shift = sign ? size * 0.32 : 0
    return (
        <g fill={colour} fontSize={size} fontWeight={700} textAnchor="middle">
            {sign && <text x={x - width / 2 - shift + 2} y={y + size * 0.35}>{sign}</text>}
            <text x={x + shift / 2} y={y - 3}>{Math.abs(numerator)}</text>
            <line x1={x + shift / 2 - width / 2} x2={x + shift / 2 + width / 2} y1={y} y2={y} stroke={colour} strokeWidth={1.4} />
            <text x={x + shift / 2} y={y + size - 1}>{denominator}</text>
        </g>
    )
}

/** Unsimplified n/d as LaTeX, with the sign in front */
const raw = (numerator: number, denominator: number) => (denominator === 1 ? String(numerator) : `${numerator < 0 ? '-' : ''}\\frac{${Math.abs(numerator)}}{${denominator}}`)
/** A fraction for the readout notes, which are plain text with $…$ */
const tex = (value: FractionValue) => `$${toLatex(value)}$`

/* ---------- L1. The magnifier on the number line ---------- */

export function MagnifierTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MagnifierState>(initialMagnifierState)
    const shown = state.prediction !== null
    const grid = magnifierGrid(state)
    const count = betweenCount(state)
    const picked = pickedValue(state)
    const playback = usePlayback(`${state.first.numerator}/${state.first.denominator}-${state.second.numerator}/${state.second.denominator}-${state.k}`, 1600)
    const zoom = playback.progress ?? 1
    const set = (patch: Parameters<typeof setMagnifier>[1]) => setState((s) => setMagnifier(s, patch))

    // The overview line, from a whole number to a whole number around both fractions
    const a = toNumber(valueOf(state.first))
    const b = toNumber(valueOf(state.second))
    const from = Math.floor(Math.min(a, b))
    const to = Math.max(from + 1, Math.ceil(Math.max(a, b)))
    const OX = (value: number) => 30 + ((value - from) / (to - from)) * 300
    // The zoomed line: the gap between the two fractions, grown from its place on the overview
    const lowX = OX(Math.min(a, b))
    const highX = OX(Math.max(a, b))
    const ZX = (top: number) => {
        const t = grid.high === grid.low ? 0.5 : (top - grid.low) / (grid.high - grid.low)
        const left = lowX + (40 - lowX) * zoom
        const right = highX + (320 - highX) * zoom
        return left + t * (right - left)
    }
    const marks = Array.from({ length: grid.high - grid.low + 1 }, (_, index) => grid.low + index)
    const visible = shown ? Math.round(count * zoom) : 0
    const tooMany = count > 40

    const controls = (
        <>
            <Stepper label={l(say('1. zatikia: zenbakitzailea', '1.ª fracción: numerador', 'الكسر 1: البسط', '1st fraction: numerator'))} value={state.first.numerator} min={MAGNIFIER_LIMITS.numerator.min} max={MAGNIFIER_LIMITS.numerator.max} onChange={(value) => set({ firstNumerator: value })} language={props.language} />
            <Stepper label={l(say('1. zatikia: izendatzailea', '1.ª fracción: denominador', 'الكسر 1: المقام', '1st fraction: denominator'))} value={state.first.denominator} min={MAGNIFIER_LIMITS.denominator.min} max={MAGNIFIER_LIMITS.denominator.max} onChange={(value) => set({ firstDenominator: value })} language={props.language} />
            <Stepper label={l(say('2. zatikia: zenbakitzailea', '2.ª fracción: numerador', 'الكسر 2: البسط', '2nd fraction: numerator'))} value={state.second.numerator} min={MAGNIFIER_LIMITS.numerator.min} max={MAGNIFIER_LIMITS.numerator.max} onChange={(value) => set({ secondNumerator: value })} language={props.language} />
            <Stepper label={l(say('2. zatikia: izendatzailea', '2.ª fracción: denominador', 'الكسر 2: المقام', '2nd fraction: denominator'))} value={state.second.denominator} min={MAGNIFIER_LIMITS.denominator.min} max={MAGNIFIER_LIMITS.denominator.max} onChange={(value) => set({ secondDenominator: value })} language={props.language} />
            <Stepper label={l(say('Lupa: k', 'Lupa: k', 'العدسة: k', 'Magnifier: k'))} value={state.k} min={MAGNIFIER_LIMITS.k.min} max={MAGNIFIER_LIMITS.k.max} format={(value) => `×${value}`} onChange={(value) => set({ k: value })} language={props.language} />
            {shown && count > 0 && <Stepper label={l(say('Aukeratu marka', 'Elige una marca', 'اختر علامة', 'Pick a mark'))} value={state.pick} min={0} max={count} format={(value) => (value === 0 ? '—' : String(value))} onChange={(value) => setState((s) => pickMark(s, value))} language={props.language} />}
        </>
    )
    const firstTex = raw(state.first.numerator, state.first.denominator)
    const secondTex = raw(state.second.numerator, state.second.denominator)
    const lines = [`${firstTex}=${raw(grid.firstTop, grid.denominator)}\\qquad ${secondTex}=${raw(grid.secondTop, grid.denominator)}`]
    if (picked !== null) lines.push(`${raw(grid.low, grid.denominator)}<${raw(grid.low + state.pick, grid.denominator)}<${raw(grid.high, grid.denominator)}`)
    const note = grid.low === grid.high
        ? say('Zatiki bera da: ez dago tarterik.', 'Es la misma fracción: no hay hueco.', 'إنه الكسر نفسه: لا فجوة بينهما.', 'It is the same fraction: there is no gap.')
        : count === 0
            ? say(`$${grid.denominator}$ izendatzailearekin ez dago bat ere tartean. Igo lupa: beti dago beste bat.`, `Con denominador $${grid.denominator}$ no hay ninguna en medio. Sube la lupa: siempre hay otra.`, `بالمقام $${grid.denominator}$ لا يوجد أي كسر بينهما. كبّر العدسة: يوجد دائمًا كسر آخر.`, `With denominator $${grid.denominator}$ there is none in between. Turn the magnifier up: there is always another one.`)
            : say(`$${grid.denominator}$ izendatzailearekin ${count} zatiki daude tartean. Lupa igo ahala, gero eta gehiago.`, `Con denominador $${grid.denominator}$ hay ${count} en medio. Cuanto más sube la lupa, más hay.`, `بالمقام $${grid.denominator}$ يوجد ${count} بينهما. وكلما كبّرت العدسة زاد العدد.`, `With denominator $${grid.denominator}$ there are ${count} in between. The higher the magnifier, the more there are.`)
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: lupa honekin, zenbat zatiki daude bien artean?', 'Antes de verlo: con esta lupa, ¿cuántas fracciones hay entre las dos?', 'قبل رؤيته: بهذه العدسة، كم كسرًا يوجد بينهما؟', 'Before you see it: with this magnifier, how many fractions are there between them?')}
            labels={{ '<': say('Bat ere ez', 'Ninguna', 'لا شيء', 'None'), '=': say('Bat', 'Una', 'واحد', 'One'), '>': say('Bat baino gehiago', 'Más de una', 'أكثر من واحد', 'More than one') }}
            actual={magnifierPrediction(state)}
            choice={state.prediction}
            tip={say('Jarri izendatzaile komuna eta biderkatu $k$-z: zenbakitzaileen arteko zenbaki osoak dira tarteko zatikiak.', 'Pon denominador común y multiplícalo por $k$: los enteros entre los numeradores son las fracciones de en medio.', 'وحّد المقامين واضرب في $k$: الأعداد الصحيحة بين البسطين هي الكسور الوسطى.', 'Use a common denominator times $k$: the whole numbers between the numerators are the fractions in between.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines} note={l(note)} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={magnifierChallenges} extraChallenges={magnifierExtra} state={state}>
            <Board height={230} label={l(say('Lupa zuzenean', 'Lupa en la recta', 'عدسة على المستقيم', 'Magnifier on the number line'))}>
                {/* Overview */}
                <line x1={30} x2={330} y1={46} y2={46} stroke={MUTED} strokeWidth={1.6} />
                {Array.from({ length: to - from + 1 }, (_, index) => from + index).map((value) => (
                    <g key={value}>
                        <line x1={OX(value)} x2={OX(value)} y1={40} y2={52} stroke={MUTED} strokeWidth={1.4} />
                        <text x={OX(value)} y={68} textAnchor="middle" fontSize={11} fill={MUTED}>{value < 0 ? `−${-value}` : value}</text>
                    </g>
                ))}
                <line x1={lowX} x2={Math.max(highX, lowX + 2)} y1={46} y2={46} stroke={SECOND} strokeWidth={5} strokeLinecap="round" />
                <circle cx={(lowX + highX) / 2} cy={46} r={Math.max(12, (highX - lowX) / 2 + 8)} fill="none" stroke={INK} strokeWidth={2} />
                {/* The lens throws the gap down to the zoomed line */}
                <line x1={lowX} y1={52} x2={ZX(grid.low)} y2={150} stroke={MUTED} strokeDasharray="4 4" />
                <line x1={highX} y1={52} x2={ZX(grid.high)} y2={150} stroke={MUTED} strokeDasharray="4 4" />
                {/* Zoomed line */}
                <line x1={ZX(grid.low)} x2={ZX(grid.high)} y1={150} y2={150} stroke={INK} strokeWidth={2.2} />
                {shown && !tooMany && marks.slice(1, 1 + visible).filter((top) => top < grid.high).map((top) => <line key={top} x1={ZX(top)} x2={ZX(top)} y1={143} y2={157} stroke={STAGE} strokeWidth={1.6} />)}
                {shown && tooMany && <text x={180} y={136} textAnchor="middle" fontSize={11} fill={MUTED}>{l(say(`${count} marka: gehiegi marrazteko`, `${count} marcas: demasiadas para dibujarlas`, `${count} علامة: أكثر من أن تُرسم`, `${count} marks: too many to draw`))}</text>}
                {[grid.low, grid.high].map((top) => <line key={`end${top}`} x1={ZX(top)} x2={ZX(top)} y1={140} y2={160} stroke={SECOND} strokeWidth={2.6} />)}
                <SvgFraction value={{ numerator: grid.low, denominator: grid.denominator }} x={ZX(grid.low)} y={182} colour={SECOND} />
                <SvgFraction value={{ numerator: grid.high, denominator: grid.denominator }} x={ZX(grid.high)} y={182} colour={SECOND} />
                {!shown && <Hidden x={180} y={130} />}
                {shown && picked !== null && zoom === 1 && (
                    <>
                        <circle cx={ZX(grid.low + state.pick)} cy={150} r={6.5} fill={GREEN} stroke="#fff" strokeWidth={2} />
                        <SvgFraction value={picked} x={ZX(grid.low + state.pick)} y={212} colour={GREEN} size={14} />
                    </>
                )}
            </Board>
            <PlayButton label={l(say('Handitu', 'Amplía', 'كبّر', 'Zoom in'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L2. What is left ---------- */

export function RemainingTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<RemainingState>(initialRemainingState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.first.numerator}/${state.first.denominator}-${state.second.numerator}/${state.second.denominator}`, 2200)
    const progress = playback.progress
    // While playing, the first cut goes in the first half and the second cut in the second half
    const firstGone = progress === null ? 0 : Math.min(1, progress * 2)
    const secondGone = progress === null ? 0 : Math.max(0, progress * 2 - 1)
    const set = (patch: Parameters<typeof setRemaining>[1]) => setState((s) => setRemaining(s, patch))
    const { numerator: a, denominator: b } = state.first
    const { numerator: c, denominator: d } = state.second
    const X0 = 30
    const W = 300
    const Y0 = 34
    const H = 150
    const column = W / b
    const row = H / d
    const left = remainingPart(state)
    const mistake = remainingMistake(state)

    const controls = (
        <>
            <Stepper label={l(say('1. ebakia: zenbakitzailea', '1.er corte: numerador', 'القطع 1: البسط', '1st cut: numerator'))} value={a} min={1} max={b - 1} onChange={(value) => set({ firstNumerator: value })} language={props.language} />
            <Stepper label={l(say('1. ebakia: izendatzailea', '1.er corte: denominador', 'القطع 1: المقام', '1st cut: denominator'))} value={b} min={REMAINING_LIMITS.denominator.min} max={REMAINING_LIMITS.denominator.max} onChange={(value) => set({ firstDenominator: value })} language={props.language} />
            <Stepper label={l(say('2. ebakia (geratzen denarena): zenbakitzailea', '2.º corte (de lo que queda): numerador', 'القطع 2 (من الباقي): البسط', '2nd cut (of what is left): numerator'))} value={c} min={1} max={d - 1} onChange={(value) => set({ secondNumerator: value })} language={props.language} />
            <Stepper label={l(say('2. ebakia: izendatzailea', '2.º corte: denominador', 'القطع 2: المقام', '2nd cut: denominator'))} value={d} min={REMAINING_LIMITS.denominator.min} max={REMAINING_LIMITS.denominator.max} onChange={(value) => set({ secondDenominator: value })} language={props.language} />
        </>
    )
    const cutTex = (numerator: number, denominator: number) => `\\frac{${numerator}}{${denominator}}`
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: amaieran osoaren erdia baino gutxiago, erdia ala gehiago geratzen da?', 'Antes de verlo: al final, ¿queda menos de la mitad, la mitad o más?', 'قبل رؤيته: في النهاية، هل يبقى أقل من النصف أم النصف أم أكثر؟', 'Before you see it: at the end, is less than half left, exactly half or more?')}
            labels={{ '<': say('Erdia baino gutxiago', 'Menos de la mitad', 'أقل من النصف', 'Less than half'), '=': say('Erdia justu', 'Justo la mitad', 'النصف تمامًا', 'Exactly half'), '>': say('Erdia baino gehiago', 'Más de la mitad', 'أكثر من النصف', 'More than half') }}
            actual={remainingPrediction(state)}
            choice={state.prediction}
            tip={say('Bigarren ebakia ez da osoarena, geratzen denarena baizik: biderkatu geratzen diren zatiak.', 'El segundo corte no es del total, sino de lo que queda: multiplica las partes que quedan.', 'القطع الثاني ليس من الكل بل من الباقي: اضرب الأجزاء الباقية.', 'The second cut is not of the whole but of what is left: multiply the parts that are left.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`1-${cutTex(a, b)}=${toLatex(leftAfterFirst(state))}`, `${cutTex(c, d)}\\cdot ${toLatex(leftAfterFirst(state))}=${toLatex(secondOfWhole(state))}`, `${toLatex(leftAfterFirst(state))}\\cdot\\frac{${d - c}}{${d}}=${toLatex(left)}`]}
                note={l(say(
                    `Geratzen da ${tex(left)}: ${(b - a) * (d - c)} lauki, guztira ${b * d} daudenean. Kontuz: osoaren ${tex(state.second)} kentzean ${tex(mistake)} geratuko litzateke, eta hori ez da galdera.`,
                    `Queda ${tex(left)} (${(b - a) * (d - c)} casillas de ${b * d}). Ojo: quitar ${tex(state.second)} del total dejaría ${tex(mistake)}, y eso no es lo que se pregunta.`,
                    `يبقى ${tex(left)} (${(b - a) * (d - c)} خانة من ${b * d}). انتبه: طرح ${tex(state.second)} من الكل يترك ${tex(mistake)}، وليس هذا المطلوب.`,
                    `${tex(left)} is left (${(b - a) * (d - c)} cells out of ${b * d}). Careful: taking ${tex(state.second)} of the whole would leave ${tex(mistake)}, which is not the question.`
                ))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={remainingChallenges} extraChallenges={remainingExtra} state={state}>
            <Board height={220} label={l(say('Osoa eta bi ebakiak', 'El total y los dos cortes', 'الكل والقطعان', 'The whole and the two cuts'))}>
                <rect x={X0} y={Y0} width={W} height={H} fill={PAPER} stroke={INK} strokeWidth={2} />
                {/* First cut: a of the b columns */}
                {Array.from({ length: a }, (_, index) => (
                    <rect key={`a${index}`} x={X0 + index * column} y={Y0 - firstGone * 18} width={column} height={H} fill={STAGE_TINT} stroke={STAGE} strokeWidth={1.4} opacity={1 - firstGone * 0.75} />
                ))}
                {Array.from({ length: b - 1 }, (_, index) => <line key={`c${index}`} x1={X0 + (index + 1) * column} x2={X0 + (index + 1) * column} y1={Y0} y2={Y0 + H} stroke={INK} strokeWidth={1.2} />)}
                <text x={X0 + (a * column) / 2} y={Y0 - 8} textAnchor="middle" fontSize={12} fontWeight={700} fill={STAGE}>1</text>
                {shown
                    ? (
                        <>
                            {/* Second cut: c of the d rows of what is left */}
                            {Array.from({ length: d - 1 }, (_, index) => <line key={`r${index}`} x1={X0 + a * column} x2={X0 + W} y1={Y0 + (index + 1) * row} y2={Y0 + (index + 1) * row} stroke={MUTED} strokeWidth={1} strokeDasharray="4 3" />)}
                            <rect x={X0 + a * column} y={Y0 - secondGone * 18} width={(b - a) * column} height={c * row} fill={SECOND_TINT} stroke={SECOND} strokeWidth={1.6} opacity={1 - secondGone * 0.75} />
                            <text x={X0 + a * column + ((b - a) * column) / 2} y={Y0 + (c * row) / 2 + 4} textAnchor="middle" fontSize={12} fontWeight={700} fill={SECOND}>2</text>
                            <rect x={X0 + a * column} y={Y0 + c * row} width={(b - a) * column} height={(d - c) * row} fill={progress === 1 ? GREEN_TINT : 'none'} stroke={GREEN} strokeWidth={progress === 1 ? 2.6 : 0} />
                        </>
                    )
                    : <Hidden x={X0 + a * column + ((b - a) * column) / 2} y={Y0 + H / 2 + 9} />}
                <text x={180} y={Y0 + H + 26} textAnchor="middle" fontSize={12} fill={MUTED}>{l(say(`${b} zutabe · ${d} errenkada`, `${b} columnas · ${d} filas`, `${b} أعمدة · ${d} صفوف`, `${b} columns · ${d} rows`))}</text>
            </Board>
            <PlayButton label={l(say('Moztu', 'Corta', 'اقطع', 'Cut'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L3. The generating-fraction machine ---------- */

const CELL = 15
const COMMA_X = 220

/** The strip 10ᵏ·x: whole digits to the left of the comma, the tail to the right */
function Strip({ whole, tail, y, label, colour, tailColour, tailOpacity = 1, digits = 8, separator, dots }: { whole: number; tail: string; y: number; label: string; colour: string; tailColour: string; tailOpacity?: number; digits?: number; separator: string; dots: boolean }) {
    const wholeText = String(whole)
    return (
        <g fontSize={17} fontWeight={700} textAnchor="middle" fontFamily='"Atkinson Hyperlegible", ui-monospace, monospace'>
            <text x={12} y={y} textAnchor="start" fontSize={13} fill={MUTED}>{label}</text>
            {[...wholeText].map((digit, index) => <text key={`w${index}`} x={COMMA_X - (wholeText.length - index) * CELL + 2} y={y} fill={colour}>{digit}</text>)}
            <text x={COMMA_X + 3} y={y} fill={colour}>{separator}</text>
            {[...tail.slice(0, digits)].map((digit, index) => <text key={`t${index}`} x={COMMA_X + 12 + index * CELL} y={y} fill={tailColour} opacity={tailOpacity}>{digit}</text>)}
            {dots && <text x={COMMA_X + 12 + digits * CELL - 2} y={y} fill={tailColour} opacity={tailOpacity}>…</text>}
        </g>
    )
}

export function MachineTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MachineState>(initialMachineState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.decimal}-${state.m}-${state.n}`, 1600)
    const done = playback.progress === 1
    const value = machineValue(state)
    const top = strip(value, state.m)
    const bottom = bottomStrip(state)
    const cancel = tailsCancel(state)
    const result = machineFraction(state)
    const { number, factor } = machineDifference(state)
    const separator = props.language === 'en' || props.language === 'ar' ? '.' : ','
    const exactTail = (tail: string) => /^0+$/.test(tail)
    const power = (k: number) => (k === 0 ? 'x' : `${10 ** k}x`)
    const label = (k: number) => `${power(k)} =`
    const decimalLabel = (index: number) => {
        const { integer, preperiod, period } = expand(MACHINE_DECIMALS[index])
        const repeated = period === '' ? '' : `${period.repeat(period.length === 1 ? 3 : 2)}…`
        const text = `${integer}${separator}${preperiod}${repeated}`
        // Arabic runs right to left: keep the dots after the digits
        return props.language === 'ar' ? `\u2066${text}\u2069` : text
    }
    const fade = playback.progress === null ? 1 : 1 - playback.progress

    const controls = (
        <>
            <Segmented label={l(say('Hamartarra: x', 'Decimal: x', 'العشري: x', 'Decimal: x'))} value={String(state.decimal)} options={MACHINE_DECIMALS.map((_, index) => ({ value: String(index), label: decimalLabel(index) }))} onChange={(next) => setState((s) => setMachine(s, { decimal: Number(next) }))} />
            <Stepper label={l(say('Goiko zerrenda: m', 'Tira de arriba: m', 'الشريط العلوي: m', 'Top strip: m'))} value={state.m} min={MACHINE_LIMITS.m.min} max={MACHINE_LIMITS.m.max} format={(k) => power(k)} onChange={(m) => setState((s) => setMachine(s, { m }))} language={props.language} />
            <Stepper label={l(say('Beheko zerrenda: n', 'Tira de abajo: n', 'الشريط السفلي: n', 'Bottom strip: n'))} value={state.n} min={MACHINE_LIMITS.n.min} max={MACHINE_LIMITS.n.max} format={(k) => (k < 0 ? '—' : power(k))} onChange={(n) => setState((s) => setMachine(s, { n }))} language={props.language} />
        </>
    )
    const left = state.n < 0 ? power(state.m) : `${power(state.m)}-${power(state.n)}`
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: nolako hamartarra da, eta nolako izendatzailea aterako da?', 'Antes de verlo: ¿qué tipo de decimal es y qué denominador saldrá?', 'قبل رؤيته: ما نوع هذا العشري، وأي مقام سيظهر؟', 'Before you see it: what kind of decimal is it, and what denominator will come out?')}
            labels={{ '<': say('Zehatza: 10, 100…', 'Exacto: 10, 100…', 'منتهٍ: 10، 100…', 'Terminating: 10, 100…'), '=': say('Periodiko hutsa: 9, 99…', 'Periódico puro: 9, 99…', 'دوري بحت: 9، 99…', 'Purely recurring: 9, 99…'), '>': say('Periodiko mistoa: 90, 990…', 'Periódico mixto: 90, 990…', 'دوري مختلط: 90، 990…', 'Mixed recurring: 90, 990…') }}
            actual={machinePrediction(state)}
            choice={state.prediction}
            tip={say('Periodoa komaren ondoren berehala hasten bada, hutsa; tartean beste zifra batzuk badaude, mistoa; amaitzen bada, zehatza.', 'Si el periodo empieza justo después de la coma, es puro; si antes hay otras cifras, es mixto; si se acaba, es exacto.', 'إذا بدأ الدور بعد الفاصلة مباشرة فهو بحت؛ وإذا سبقته أرقام أخرى فهو مختلط؛ وإذا انتهى فهو منتهٍ.', 'If the repeating part starts right after the point, it is pure; if other digits come first, it is mixed; if it ends, it terminates.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={cancel && result !== null ? [`${left}=${number}`, `x=\\frac{${number}}{${factor}}=${toLatex(result)}`] : [`${left}`]}
                note={l(cancel
                    ? say('Buztanak berdinak dira: kenketak zenbaki osoa ematen du.', 'Las colas son iguales: la resta da un número entero.', 'الذيلان متساويان: الطرح يعطي عددًا صحيحًا.', 'The tails are equal: the subtraction gives a whole number.')
                    : say('Buztanak ez dira berdinak: kenketak buztan bat uzten du. Mugitu $m$ edo $n$.', 'Las colas no son iguales: la resta deja una cola. Mueve $m$ o $n$.', 'الذيلان غير متساويين: يترك الطرح ذيلًا. حرّك $m$ أو $n$.', 'The tails are not equal: the subtraction leaves a tail. Move $m$ or $n$.'))}
            />
        </Predict>
    )
    const tailColour = !shown ? INK : cancel ? GREEN : SECOND
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={machineChallenges} extraChallenges={machineExtra} state={state}>
            <Board height={160} label={l(say('Bi zerrendak komaren gainean', 'Las dos tiras alineadas en la coma', 'الشريطان على الفاصلة', 'The two strips lined up at the point'))}>
                <line x1={COMMA_X + 3} x2={COMMA_X + 3} y1={20} y2={140} stroke={MUSTARD} strokeWidth={1.4} strokeDasharray="3 4" />
                <Strip whole={top.whole} tail={top.tail} y={50} label={label(state.m)} colour={INK} tailColour={tailColour} tailOpacity={done && cancel ? 0.25 : fade < 1 && cancel ? 0.25 + 0.75 * fade : 1} separator={separator} dots={!exactTail(top.tail)} />
                {state.n < 0
                    ? <text x={12} y={92} fontSize={13} fill={MUTED}>{l(say('— (ez da ezer kentzen)', '— (no se resta nada)', '— (لا يُطرح شيء)', '— (nothing is subtracted)'))}</text>
                    : <Strip whole={bottom.whole} tail={bottom.tail} y={92} label={`− ${label(state.n)}`} colour={INK} tailColour={tailColour} tailOpacity={done && cancel ? 0.25 : fade < 1 && cancel ? 0.25 + 0.75 * fade : 1} separator={separator} dots={!exactTail(bottom.tail)} />}
                <line x1={12} x2={348} y1={108} y2={108} stroke={INK} strokeWidth={1.6} />
                {shown && done
                    ? <text x={COMMA_X} y={138} textAnchor="end" fontSize={17} fontWeight={700} fill={cancel ? GREEN : SECOND}>{cancel ? `${factor}x = ${number}` : l(say('buztana geratzen da', 'queda cola', 'يبقى ذيل', 'a tail is left'))}</text>
                    : <Hidden x={COMMA_X} y={140} size={22} />}
            </Board>
            <PlayButton label={l(say('Kendu', 'Resta', 'اطرح', 'Subtract'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. From the part to the whole ---------- */

export function WholeTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<WholeState>(initialWholeState)
    const shown = state.prediction !== null
    const playback = usePlayback(`${state.numerator}/${state.denominator}-${state.part}`, 2000)
    const { numerator: a, denominator: b, part } = state
    const unit = piece(state)
    const total = wholeOf(state)
    const copies = shown ? (playback.progress === null ? b - a : Math.floor(playback.progress * (b - a) + 1e-9)) : 0
    const X0 = 30
    const W = 300
    const width = W / b
    const set = (patch: Parameters<typeof setWhole>[1]) => setState((s) => setWhole(s, patch))

    const controls = (
        <>
            <Stepper label={l(say('Zatikia: zenbakitzailea', 'Fracción: numerador', 'الكسر: البسط', 'Fraction: numerator'))} value={a} min={1} max={b - 1} onChange={(value) => set({ numerator: value })} language={props.language} />
            <Stepper label={l(say('Zatikia: izendatzailea', 'Fracción: denominador', 'الكسر: المقام', 'Fraction: denominator'))} value={b} min={WHOLE_LIMITS.denominator.min} max={WHOLE_LIMITS.denominator.max} onChange={(value) => set({ denominator: value })} language={props.language} />
            <Stepper label={l(say('Zatiaren balioa', 'Lo que vale la parte', 'قيمة الجزء', 'What the part is worth'))} value={part} min={WHOLE_LIMITS.part.min} max={WHOLE_LIMITS.part.max} onChange={(value) => set({ part: value })} language={props.language} />
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: osoa zatiaren bikoitza (${2 * part}) baino gutxiago, bikoitza ala gehiago da?`, `Antes de verlo: ¿el total es menos del doble de la parte (${2 * part}), el doble o más?`, `قبل رؤيته: هل الكل أقل من ضعف الجزء (${2 * part}) أم ضعفه أم أكثر؟`, `Before you see it: is the whole less than double the part (${2 * part}), double or more?`)}
            labels={{ '<': say('Bikoitza baino gutxiago', 'Menos del doble', 'أقل من الضعف', 'Less than double'), '=': say('Bikoitza justu', 'Justo el doble', 'الضعف تمامًا', 'Exactly double'), '>': say('Bikoitza baino gehiago', 'Más del doble', 'أكثر من الضعف', 'More than double') }}
            actual={wholePrediction(state)}
            choice={state.prediction}
            tip={say('Zatia erdia baino handiagoa bada, osoa bikoitza baino txikiagoa da; erdia baino txikiagoa bada, handiagoa.', 'Si la parte es más de la mitad, el total es menos del doble; si es menos de la mitad, más del doble.', 'إذا كان الجزء أكبر من النصف فالكل أقل من الضعف؛ وإذا كان أصغر فالكل أكثر من الضعف.', 'If the part is more than half, the whole is less than double; if it is less than half, more than double.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout
                latex={[`\\frac{${part}}{${a}}=${toLatex(unit)}`, `${toLatex(unit)}\\cdot ${b}=${toLatex(total)}`]}
                note={l(say(
                    `Zati bakoitza ${tex(unit)} da eta osoak ${b} zati ditu. Kontuz: ${part} bider ${tex({ numerator: a, denominator: b })} eginez gero ${tex(wholeMistake(state))} aterako litzateke, zatia baino txikiagoa.`,
                    `Cada trozo vale ${tex(unit)} y el total tiene ${b} trozos. Ojo: multiplicar ${part} por ${tex({ numerator: a, denominator: b })} daría ${tex(wholeMistake(state))}, menos que la parte.`,
                    `كل قطعة تساوي ${tex(unit)} والكل ${b} قطع. انتبه: ضرب ${part} في ${tex({ numerator: a, denominator: b })} يعطي ${tex(wholeMistake(state))}، أقل من الجزء.`,
                    `Each piece is ${tex(unit)} and the whole has ${b} pieces. Careful: multiplying ${part} by ${tex({ numerator: a, denominator: b })} would give ${tex(wholeMistake(state))}, less than the part.`
                ))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={wholeChallenges} extraChallenges={wholeExtra} state={state}>
            <Board height={190} label={l(say('Zatitik osora', 'Del trozo al todo', 'من الجزء إلى الكل', 'From the part to the whole'))}>
                {/* The known part, with its value above */}
                <path d={`M${X0} 46 v-8 h${a * width} v8`} fill="none" stroke={STAGE} strokeWidth={1.8} />
                <text x={X0 + (a * width) / 2} y={30} textAnchor="middle" fontSize={14} fontWeight={700} fill={STAGE}>{part}</text>
                {Array.from({ length: b }, (_, index) => {
                    const known = index < a
                    const copied = !known && index - a < copies
                    return (
                        <g key={index}>
                            <rect x={X0 + index * width} y={54} width={width} height={56} fill={known ? STAGE_TINT : copied ? GREEN_TINT : PAPER} stroke={known ? STAGE : copied ? GREEN : MUTED} strokeWidth={known || copied ? 1.8 : 1.2} strokeDasharray={known || copied ? undefined : '4 3'} />
                            {shown && (known || copied) && width >= 26 && <SvgFraction value={unit} x={X0 + index * width + width / 2} y={84} size={unit.denominator === 1 ? 13 : 11} colour={known ? STAGE : GREEN} />}
                        </g>
                    )
                })}
                {/* The whole, below */}
                <path d={`M${X0} 118 v8 h${W} v-8`} fill="none" stroke={shown ? GREEN : MUTED} strokeWidth={1.8} />
                {shown && copies === b - a
                    ? <SvgFraction value={total} x={180} y={152} size={15} colour={GREEN} />
                    : <Hidden x={180} y={158} size={22} />}
                <text x={180} y={182} textAnchor="middle" fontSize={11} fill={MUTED}>{l(say(`${a} zati ezagun · ${b} zati osoan`, `${a} trozos conocidos · ${b} en el total`, `${a} قطع معروفة · ${b} في الكل`, `${a} known pieces · ${b} in the whole`))}</text>
            </Board>
            <PlayButton label={l(say('Kopiatu zatia', 'Copia el trozo', 'انسخ القطعة', 'Copy the piece'))} disabled={!shown} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}
