import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { axesOf, createSticksRounds, createSymmetryRounds, SHAPES, STICK_LIMIT, STICKS_ROUNDS, SYMMETRY_ROUNDS, type Candidate, type Point, type SticksRound, type SymmetryRound } from './figureRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   Can it be built? and lines of symmetry (1. DBH plane figures): answer
   first; then the sticks try to close, or the lines of symmetry appear.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const BLUE = 'var(--blue, #2f5fb3)'
const STICK_COLOURS = ['var(--blue, #2f5fb3)', 'var(--coral, #d9502e)', 'var(--mustard, #b8860b)']
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const STARS_NOTE = say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3')

/* ---------- Can it be built? ---------- */

/** The three sticks one under the other, before answering */
function Sticks({ sides }: { sides: number[] }) {
    const unit = 280 / STICK_LIMIT
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 120" direction="ltr" aria-hidden="true">
            {sides.map((side, index) => (
                <g key={index}>
                    <rect x="20" y={18 + index * 34} width={side * unit} height="12" rx="6" fill={STICK_COLOURS[index]} />
                    <text x={28 + side * unit} y={29 + index * 34} fontSize="14" fontWeight="700" fill={INK}>{`${side} cm`}</text>
                </g>
            ))}
        </svg>
    )
}

/** The longest stick as the base; the other two close a triangle, lie flat or fall short */
function Attempt({ sides }: { sides: number[] }) {
    const order = [0, 1, 2].sort((p, q) => sides[q] - sides[p])
    const [c, a, b] = order.map((index) => sides[index])
    const [colourC, colourA, colourB] = order.map((index) => STICK_COLOURS[index])
    const closes = a + b > c
    const along = (c * c + a * a - b * b) / (2 * c)
    const rise = closes ? Math.sqrt(Math.max(0, a * a - along * along)) : 0
    const unit = Math.min(280 / c, closes && rise > 0 ? 120 / rise : 280 / c, 18)
    // Without a triangle the sticks lie flat, so the drawing is lower
    const [x0, base] = [170 - (c * unit) / 2, closes ? 150 : 96]
    return (
        <svg className="dbh4-scene" viewBox={`0 0 340 ${closes ? 170 : 116}`} direction="ltr" aria-hidden="true">
            <line x1={x0} y1={base} x2={x0 + c * unit} y2={base} stroke={colourC} strokeWidth="7" strokeLinecap="round" />
            {closes ? (
                <g className="dbh1-close">
                    <line x1={x0} y1={base} x2={x0 + along * unit} y2={base - rise * unit} stroke={colourA} strokeWidth="7" strokeLinecap="round" />
                    <line x1={x0 + c * unit} y1={base} x2={x0 + along * unit} y2={base - rise * unit} stroke={colourB} strokeWidth="7" strokeLinecap="round" />
                    <polygon points={`${x0},${base} ${x0 + c * unit},${base} ${x0 + along * unit},${base - rise * unit}`} fill="var(--success-tint, #d9efe2)" fillOpacity="0.6" />
                </g>
            ) : (
                <g>
                    <line x1={x0} y1={base - 14} x2={x0 + a * unit} y2={base - 14} stroke={colourA} strokeWidth="7" strokeLinecap="round" />
                    <line x1={x0 + (c - b) * unit} y1={base - 28} x2={x0 + c * unit} y2={base - 28} stroke={colourB} strokeWidth="7" strokeLinecap="round" />
                    {a + b < c && <line x1={x0 + a * unit} y1={base - 50} x2={x0 + (c - b) * unit} y2={base - 50} stroke={RED} strokeWidth="3" />}
                    {a + b < c && <text x={x0 + ((a + (c - b)) / 2) * unit} y={base - 58} textAnchor="middle" fontSize="14" fontWeight="700" fill={RED}>{`${c - a - b} cm`}</text>}
                </g>
            )}
        </svg>
    )
}

/** Level 3: the whole lengths that work on a number line, and the learner's range */
function Range({ round, chosen }: { round: SticksRound; chosen: [number, number] }) {
    const [a, b] = round.sides
    const top = a + b + 2
    const x = (value: number) => 20 + (value / top) * 300
    const [low, high] = round.range!
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 100" direction="ltr" aria-hidden="true">
            <line x1="20" y1="50" x2="320" y2="50" stroke={INK} strokeWidth="2" />
            <rect x={x(low)} y="40" width={x(high) - x(low)} height="20" rx="4" fill="var(--success-tint, #d9efe2)" stroke={GREEN} strokeWidth="2" />
            {Array.from({ length: top + 1 }, (_, value) => <line key={value} x1={x(value)} y1="46" x2={x(value)} y2="54" stroke={INK} strokeWidth="1.5" />)}
            {[Math.abs(a - b), a + b].map((value) => <circle key={value} cx={x(value)} cy="50" r="5" fill="var(--card, #fffcf6)" stroke={RED} strokeWidth="2" />)}
            {[low, high].map((value) => <text key={value} x={x(value)} y="80" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREEN}>{value}</text>)}
            {chosen.map((value, index) => <path key={index} d={`M ${x(value)} 34 l -6 -12 h 12 z`} fill={BLUE} />)}
        </svg>
    )
}

function SticksPlay({ round, language, onAnswer, answered }: RoundProps<SticksRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<boolean | null>(null)
    const [low, setLow] = useState(0)
    const [high, setHigh] = useState(0)
    const [a, b, c] = round.sides
    if (round.range) {
        const right = low === round.range[0] && high === round.range[1]
        return (
            <>
                <p className="prop3-prompt"><MathText text={l(say(`Bi makilek $${a}$ cm eta $${b}$ cm neurtzen dute. Hirugarrenak cm oso bat neurtzen du: zein da laburrena eta luzeena?`, `Dos palitos miden $${a}$ cm y $${b}$ cm. El tercero mide un número entero de cm: ¿cuál es el más corto y el más largo?`, `عودان طولاهما $${a}$ سم و$${b}$ سم. الثالث طوله عدد صحيح من السنتيمترات: ما أقصر طول وما أطوله؟`, `Two sticks are $${a}$ cm and $${b}$ cm. The third is a whole number of cm: what is the shortest and the longest?`))} inline /></p>
                {answered && <Range round={round} chosen={[low, high]} />}
                {!answered && (
                    <>
                        <div className="func2-steppers" dir="ltr">
                            <Stepper label={l(say('Laburrena', 'El más corto', 'الأقصر', 'Shortest'))} value={low} min={0} max={STICK_LIMIT} onChange={setLow} language={language} />
                            <Stepper label={l(say('Luzeena', 'El más largo', 'الأطول', 'Longest'))} value={high} min={0} max={STICK_LIMIT} onChange={setHigh} language={language} />
                        </div>
                        <div className="prop3-panel">
                            <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                        </div>
                    </>
                )}
                {answered && (
                    <RoundVerdict right={right} language={language}>
                        <span className="dbh4-worked" dir="ltr">{formula(`${Math.max(a, b)}-${Math.min(a, b)}<c<${a}+${b}\\ \\to\\ ${round.range[0]}\\le c\\le ${round.range[1]}`, language)}</span>
                        {l(say('Hirugarren aldea beste bien kendura baino luzeagoa eta batura baino laburragoa da.', 'El tercer lado es más largo que la resta de los otros dos y más corto que su suma.', 'الضلع الثالث أطول من فرق الضلعين الآخرين وأقصر من مجموعهما.', 'The third side is longer than the difference of the other two and shorter than their sum.'))}
                    </RoundVerdict>
                )}
            </>
        )
    }
    const [longest, ...others] = [...round.sides].sort((p, q) => q - p)
    const sum = others[0] + others[1]
    return (
        <>
            <p className="prop3-prompt">{l(say('Hiru makil hauekin, triangelu bat eraiki daiteke?', '¿Se puede construir un triángulo con estos tres palitos?', 'هل يمكن بناء مثلث بهذه العيدان الثلاثة؟', 'Can a triangle be built with these three sticks?'))}</p>
            {answered ? <Attempt sides={round.sides} /> : <Sticks sides={[a, b, c]} />}
            <div className="dbh4-candidates">
                {[true, false].map((option) => (
                    <button key={String(option)} type="button" disabled={answered} className={answered ? (option === round.possible ? 'found' : option === chosen ? 'missed' : '') : ''} onClick={() => {
                        setChosen(option)
                        onAnswer(option === round.possible)
                    }}>
                        {option ? l(say('Bai', 'Sí', 'نعم', 'Yes')) : l(say('Ez', 'No', 'لا', 'No'))}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen === round.possible} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(`${others[0]}+${others[1]}=${sum}${sum > longest ? '>' : sum === longest ? '=' : '<'}${longest}`, language)}</span>
                    {round.possible
                        ? l(say('Bi laburrenen batura luzeena baino handiagoa da: ixten da.', 'Los dos cortos suman más que el largo: se cierra.', 'مجموع القصيرين أكبر من الطويل: يُغلق المثلث.', 'The two short ones add up to more than the long one: it closes.'))
                        : sum === longest
                            ? l(say('Batura berdina bada, makilak lau geratzen dira: ez dago triangelurik.', 'Si la suma es igual, los palitos quedan planos: no hay triángulo.', 'إذا تساوى المجموع بقيت العيدان مسطحة: لا يوجد مثلث.', 'If the sum is equal, the sticks lie flat: there is no triangle.'))
                            : l(say('Bi laburrenak ez dira iristen.', 'Los dos cortos no llegan.', 'القصيران لا يصلان.', 'The two short ones do not reach.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function SticksGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: STICKS_ROUNDS,
                rules: [
                    say('Triangelu bat eraikitzeko, bi alde laburrenek luzeena baino gehiago batu behar dute.', 'Para que haya triángulo, los dos lados cortos deben sumar más que el largo.', 'ليوجد مثلث يجب أن يكون مجموع الضلعين القصيرين أكبر من الطويل.', 'For a triangle, the two short sides must add up to more than the long one.'),
                    say('Batura berdina bada, makilak lau geratzen dira.', 'Si la suma es igual, los palitos quedan planos.', 'إذا تساوى المجموع بقيت العيدان مسطحة.', 'If the sum is equal, the sticks lie flat.'),
                    say('Erantzun: gero, makilak ixten saiatzen dira.', 'Responde: luego, los palitos intentan cerrarse.', 'أجب: ثم تحاول العيدان أن تُغلق.', 'Answer: then the sticks try to close.')
                ],
                create: createSticksRounds,
                stars: standardStars(STICKS_ROUNDS),
                starsNote: STARS_NOTE,
                Round: SticksPlay
            }}
        />
    )
}

/* ---------- Lines of symmetry ---------- */

/** A line through two points, extended past them */
function longLine({ from, to }: Candidate, past = 40): [Point, Point] {
    const [dx, dy] = [to[0] - from[0], to[1] - from[1]]
    const length = Math.hypot(dx, dy)
    const [ux, uy] = [dx / length, dy / length]
    return [[from[0] - ux * past, from[1] - uy * past], [to[0] + ux * past, to[1] + uy * past]]
}

function SymmetryPlay({ round, language, onAnswer, answered }: RoundProps<SymmetryRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number[]>([])
    const [count, setCount] = useState(0)
    const shape = SHAPES[round.shape]
    const candidates = shape.candidates
    const right = round.count ? count === round.axes : candidates.every((candidate, index) => candidate.axis === picked.includes(index))
    const toggle = (index: number) => !answered && setPicked(picked.includes(index) ? picked.filter((item) => item !== index) : [...picked, index])
    const shown = round.count ? (answered ? axesOf(round.shape) : []) : candidates
    return (
        <>
            <p className="prop3-prompt">{round.count
                ? l(say('Zenbat simetria-ardatz ditu?', '¿Cuántos ejes de simetría tiene?', 'كم محور تناظر له؟', 'How many lines of symmetry does it have?'))
                : l(say('Sakatu simetria-ardatzak diren lerroak (agian bat ere ez).', 'Toca las líneas que son ejes de simetría (puede que ninguna).', 'المس الخطوط التي هي محاور تناظر (وقد لا يكون أي منها).', 'Tap the lines that are lines of symmetry (maybe none).'))}</p>
            <svg className="dbh4-scene" viewBox="0 0 340 240" direction="ltr" role={round.count ? 'img' : 'group'} aria-label={l(say('Irudia', 'Figura', 'الشكل', 'Shape'))}>
                <polygon points={shape.points.map(([x, y]) => `${x},${y}`).join(' ')} fill="var(--blue-tint, #dde7f7)" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
                {shown.map((candidate, index) => {
                    const [[x1, y1], [x2, y2]] = longLine(candidate)
                    const on = picked.includes(index)
                    const colour = answered ? (candidate.axis ? GREEN : on ? RED : 'var(--muted, #8a8a8a)') : on ? BLUE : 'var(--muted, #8a8a8a)'
                    return (
                        <g key={index} className={round.count ? 'dbh1-axis' : 'dbh1-candidate'} role={round.count ? undefined : 'button'} tabIndex={round.count || answered ? undefined : 0} aria-pressed={round.count ? undefined : on}
                            aria-label={round.count ? undefined : `${l(say('Lerroa', 'Línea', 'الخط', 'Line'))} ${index + 1}`}
                            onClick={() => toggle(index)} onKeyDown={(event) => {
                                if (event.key === 'Enter' || event.key === ' ') {
                                    event.preventDefault()
                                    toggle(index)
                                }
                            }}>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="transparent" strokeWidth="22" />
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={colour} strokeWidth={on || (answered && candidate.axis) ? 3.5 : 2.5} strokeDasharray={answered && candidate.axis ? undefined : '8 6'} />
                        </g>
                    )
                })}
            </svg>
            {!answered && (
                <>
                    {round.count && (
                        <div className="func2-steppers" dir="ltr">
                            <Stepper label={l(say('Ardatzak', 'Ejes', 'المحاور', 'Lines'))} value={count} min={0} max={8} onChange={setCount} language={language} />
                        </div>
                    )}
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {l(say(`Simetria-ardatzak: ${round.axes}.`, `Ejes de simetría: ${round.axes}.`, `محاور التناظر: ${round.axes}.`, `Lines of symmetry: ${round.axes}.`))}{' '}
                    {l(say('Ardatz batek irudia bi erditan banatzen du, eta tolestuta bat egiten dute.', 'Un eje parte la figura en dos mitades que coinciden al doblarla.', 'المحور يقسم الشكل إلى نصفين يتطابقان عند الطي.', 'An axis splits the shape into two halves that match when it is folded.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function SymmetryGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SYMMETRY_ROUNDS,
                rules: [
                    say('Simetria-ardatz batean tolestuta, bi erdiek bat egiten dute.', 'Al doblar por un eje de simetría, las dos mitades coinciden.', 'عند الطي على محور التناظر يتطابق النصفان.', 'Folding along a line of symmetry, the two halves match.'),
                    say('Laukizuzen baten diagonalak ez dira ardatzak.', 'Las diagonales de un rectángulo no son ejes.', 'قطرا المستطيل ليسا محوري تناظر.', 'The diagonals of a rectangle are not lines of symmetry.'),
                    say('Aukeratu lerroak edo kontatu ardatzak eta egiaztatu.', 'Elige las líneas o cuenta los ejes y comprueba.', 'اختر الخطوط أو عدّ المحاور وتحقّق.', 'Pick the lines or count the axes and check.')
                ],
                create: createSymmetryRounds,
                stars: standardStars(SYMMETRY_ROUNDS),
                starsNote: STARS_NOTE,
                Round: SymmetryPlay
            }}
        />
    )
}

/* ---------- Art ---------- */

/** The art of can it be built?: two sticks closing a triangle on the third */
export function SticksArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="30" y1="96" x2="190" y2="96" stroke="var(--mustard, #b8860b)" strokeWidth="8" strokeLinecap="round" />
            <line x1="30" y1="96" x2="120" y2="24" stroke="var(--blue)" strokeWidth="8" strokeLinecap="round" />
            <line x1="190" y1="96" x2="120" y2="24" stroke="var(--coral)" strokeWidth="8" strokeLinecap="round" />
        </svg>
    )
}

/** The art of lines of symmetry: a kite and its axis */
export function SymmetryArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <polygon points="110,10 150,48 110,110 70,48" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
            <line x1="110" y1="2" x2="110" y2="118" stroke="var(--success, #267b53)" strokeWidth="3" />
            <line x1="56" y1="48" x2="164" y2="48" stroke="var(--error, #c4432a)" strokeWidth="2.5" strokeDasharray="6 5" />
        </svg>
    )
}
