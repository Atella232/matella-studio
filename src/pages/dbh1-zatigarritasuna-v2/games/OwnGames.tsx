import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { createMeetRounds, createRectanglesRounds, departures, divisorsOf, MEET_ROUNDS, rectanglePairs, RECTANGLES_MAX, RECTANGLES_ROUNDS, type MeetRound, type RectanglesRound } from './divisibilityRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   Rectangles, and buses and ribbons (1. DBH divisibility): answer first;
   then every rectangle of N tiles, or the timeline of the two buses, or
   the two ribbons cut into equal pieces.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const INK = 'var(--ink, #1d2733)'
const BLUE = 'var(--blue, #2f5fb3)'
const CORAL = 'var(--coral, #d9502e)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const STARS_NOTE = say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3')

/* ---------- Rectangles ---------- */

/** Every rectangle a × b of n tiles, one under the other; the square one in yellow */
function RectanglesScene({ n }: { n: number }) {
    const pairs = rectanglePairs(n)
    const shortSides = pairs.reduce((total, [a]) => total + a, 0)
    const cell = Math.min(14, 300 / n, (300 - 28 * pairs.length) / shortSides)
    // The top of each rectangle, under its label
    const tops = pairs.map((_, index) => 26 + pairs.slice(0, index).reduce((total, [a]) => total + a * cell + 28, 0))
    return (
        <svg className="dbh4-scene" viewBox={`0 0 340 ${8 + pairs.reduce((total, [a]) => total + a * cell + 28, 0)}`} direction="ltr" aria-hidden="true">
            {pairs.map(([a, b], index) => {
                const top = tops[index]
                return (
                    <g key={a}>
                        <text x="20" y={top - 5} fontSize="13" fontWeight="700" fill={INK}>{`${a} × ${b}`}</text>
                        <rect x="20" y={top} width={b * cell} height={a * cell} fill={a === b ? 'var(--mustard-tint, #fbebc0)' : 'var(--blue-tint, #dde7f7)'} stroke={INK} strokeWidth="1.5" />
                        {cell >= 4.5 && Array.from({ length: b - 1 }, (_, index) => <line key={`c${index}`} x1={20 + (index + 1) * cell} y1={top} x2={20 + (index + 1) * cell} y2={top + a * cell} stroke={INK} strokeWidth="0.6" opacity="0.5" />)}
                        {cell >= 4.5 && Array.from({ length: a - 1 }, (_, index) => <line key={`r${index}`} x1="20" y1={top + (index + 1) * cell} x2={20 + b * cell} y2={top + (index + 1) * cell} stroke={INK} strokeWidth="0.6" opacity="0.5" />)}
                    </g>
                )
            })}
        </svg>
    )
}

function RectanglesPlay({ round, language, onAnswer, answered }: RoundProps<RectanglesRound>) {
    const l = useGameText(language)
    const [value, setValue] = useState(0)
    const right = value === round.answer
    const { n } = round
    const pairs = rectanglePairs(n)
    const square = pairs.some(([a, b]) => a === b)
    const prompt = round.ask === 'rectangles'
        ? say(`$${n}$ lauza karratu ditugu. Zenbat laukizuzen desberdin egin daitezke, denak erabilita?`, `Tenemos $${n}$ baldosas cuadradas. ¿Cuántos rectángulos distintos se forman usándolas todas?`, `لدينا $${n}$ بلاطة مربعة. كم مستطيلًا مختلفًا نكوّن باستعمالها كلها؟`, `We have $${n}$ square tiles. How many different rectangles can be made using them all?`)
        : say(`Zenbat zatitzaile ditu $${n}$ zenbakiak?`, `¿Cuántos divisores tiene $${n}$?`, `كم قاسمًا للعدد $${n}$؟`, `How many divisors does $${n}$ have?`)
    return (
        <>
            <p className="prop3-prompt">
                <MathText text={l(prompt)} inline />
                {round.ask === 'rectangles' && <span className="dbh4-subprompt"><MathText text={l(say('$2\\times 3$ eta $3\\times 2$ laukizuzen bera dira.', '$2\\times 3$ y $3\\times 2$ son el mismo rectángulo.', '$2\\times 3$ و$3\\times 2$ مستطيل واحد.', '$2\\times 3$ and $3\\times 2$ are the same rectangle.'))} inline /></span>}
            </p>
            {answered && <RectanglesScene n={n} />}
            {!answered && (
                <>
                    <div className="func2-steppers" dir="ltr">
                        <Stepper label={round.ask === 'rectangles' ? l(say('Laukizuzenak', 'Rectángulos', 'المستطيلات', 'Rectangles')) : l(say('Zatitzaileak', 'Divisores', 'القواسم', 'Divisors'))} value={value} min={0} max={RECTANGLES_MAX} onChange={setValue} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {l(say(`${n} zenbakiaren zatitzaileak: ${divisorsOf(n).join(', ')}.`, `Divisores de ${n}: ${divisorsOf(n).join(', ')}.`, `قواسم ${n}: ${divisorsOf(n).join('، ')}.`, `Divisors of ${n}: ${divisorsOf(n).join(', ')}.`))}{' '}
                    {round.ask === 'rectangles'
                        ? l(say(`Bikote bakoitza laukizuzen bat da: ${pairs.length}.`, `Cada pareja es un rectángulo: ${pairs.length}.`, `كل زوج مستطيل: ${pairs.length}.`, `Each pair is a rectangle: ${pairs.length}.`))
                        : square
                            ? l(say('Laukizuzen bakoitzak bi zatitzaile ematen ditu; karratuak, bakarra.', 'Cada rectángulo da dos divisores; el cuadrado, solo uno.', 'كل مستطيل يعطي قاسمين، والمربع قاسمًا واحدًا.', 'Each rectangle gives two divisors; the square gives only one.'))
                            : l(say('Laukizuzen bakoitzak bi zatitzaile ematen ditu.', 'Cada rectángulo da dos divisores.', 'كل مستطيل يعطي قاسمين.', 'Each rectangle gives two divisors.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function RectanglesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: RECTANGLES_ROUNDS,
                rules: [
                    say('$a\\times b$ laukizuzen batek $a\\cdot b$ lauza ditu: $a$ eta $b$ zatitzaileak dira.', 'Un rectángulo $a\\times b$ tiene $a\\cdot b$ baldosas: $a$ y $b$ son divisores.', 'المستطيل $a\\times b$ فيه $a\\cdot b$ بلاطة: $a$ و$b$ قاسمان.', 'An $a\\times b$ rectangle has $a\\cdot b$ tiles: $a$ and $b$ are divisors.'),
                    say('$2\\times 3$ eta $3\\times 2$ laukizuzen bera dira.', '$2\\times 3$ y $3\\times 2$ son el mismo rectángulo.', '$2\\times 3$ و$3\\times 2$ مستطيل واحد.', '$2\\times 3$ and $3\\times 2$ are the same rectangle.'),
                    say('Jarri zenbakia eta egiaztatu: gero, laukizuzen guztiak marraztuta.', 'Pon el número y comprueba: luego, todos los rectángulos dibujados.', 'ضع العدد وتحقّق: ثم كل المستطيلات مرسومة.', 'Set the number and check: then all the rectangles are drawn.')
                ],
                create: createRectanglesRounds,
                stars: standardStars(RECTANGLES_ROUNDS),
                starsNote: STARS_NOTE,
                Round: RectanglesPlay
            }}
        />
    )
}

/* ---------- Buses and ribbons ---------- */

/** The departures of the two buses on a timeline; the meetings ringed */
function Timeline({ round, chosen }: { round: MeetRound; chosen: number }) {
    const until = Math.max(round.answer, chosen, 2 * round.b)
    const x = (t: number) => 20 + (t / until) * 300
    const meetings = departures(round.answer, until)
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 140" direction="ltr" aria-hidden="true">
            <line x1="20" y1="70" x2="320" y2="70" stroke={INK} strokeWidth="2" />
            {meetings.map((t) => (
                <g key={t}>
                    <line x1={x(t)} y1="36" x2={x(t)} y2="104" stroke={GREEN} strokeWidth="2" strokeDasharray="4 3" />
                    <text x={x(t)} y="124" textAnchor="middle" fontSize="13" fontWeight="700" fill={GREEN}>{t}</text>
                </g>
            ))}
            {departures(round.a, until).map((t) => <circle key={`a${t}`} cx={x(t)} cy="50" r="6" fill="var(--blue-tint, #dde7f7)" stroke={BLUE} strokeWidth="2" />)}
            {departures(round.b, until).map((t) => <circle key={`b${t}`} cx={x(t)} cy="90" r="6" fill="var(--coral-tint, #f6d5cc)" stroke={CORAL} strokeWidth="2" />)}
            <text x="20" y="26" fontSize="13" fontWeight="700" fill={BLUE}>{`+${round.a}`}</text>
            <text x="320" y="26" textAnchor="end" fontSize="13" fontWeight="700" fill={CORAL}>{`+${round.b}`}</text>
            {chosen !== round.answer && <path d={`M ${x(chosen)} 64 l -6 -12 h 12 z`} fill={RED} />}
        </svg>
    )
}

/** The two ribbons cut into pieces of the GCD */
function Ribbons({ round }: { round: MeetRound }) {
    const scale = 300 / round.b
    const ribbon = (length: number, y: number, fill: string, stroke: string) => (
        <g>
            <text x="20" y={y - 6} fontSize="13" fontWeight="700" fill={INK}>{`${length} cm`}</text>
            {Array.from({ length: length / round.answer }, (_, index) => (
                <rect key={index} x={20 + index * round.answer * scale} y={y} width={round.answer * scale} height="20" fill={index % 2 === 0 ? fill : 'var(--card, #fffcf6)'} stroke={stroke} strokeWidth="2" />
            ))}
        </g>
    )
    return (
        <svg className="dbh4-scene" viewBox="0 0 340 120" direction="ltr" aria-hidden="true">
            {ribbon(round.a, 30, 'var(--blue-tint, #dde7f7)', BLUE)}
            {ribbon(round.b, 82, 'var(--coral-tint, #f6d5cc)', CORAL)}
        </svg>
    )
}

const multiplesUpTo = (every: number, until: number) => departures(every, until).slice(1)

function MeetPlay({ round, language, onAnswer, answered }: RoundProps<MeetRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const { a, b, answer } = round
    const prompt = round.kind === 'lcm'
        ? say(`Bi autobus elkarrekin irten dira. Bata $${a}$ minuturo irteten da eta bestea $${b}$ minuturo. Zenbat minutu barru irtengo dira berriro elkarrekin?`, `Dos autobuses salen juntos. Uno sale cada $${a}$ minutos y el otro cada $${b}$. ¿Dentro de cuántos minutos vuelven a salir juntos?`, `حافلتان تنطلقان معًا. الأولى تنطلق كل $${a}$ دقيقة والثانية كل $${b}$. بعد كم دقيقة تنطلقان معًا مرة أخرى؟`, `Two buses leave together. One leaves every $${a}$ minutes and the other every $${b}$. In how many minutes do they next leave together?`)
        : say(`Bi zinta ditugu: $${a}$ cm eta $${b}$ cm. Luzera bereko zatitan moztuko ditugu, ahalik eta luzeenak, ezer soberan gabe. Zenbat cm ditu zati bakoitzak?`, `Hay dos cintas de $${a}$ cm y $${b}$ cm. Se cortan en trozos iguales, lo más largos posible, sin que sobre nada. ¿Cuántos cm mide cada trozo?`, `لدينا شريطان طولهما $${a}$ سم و$${b}$ سم. نقطعهما قطعًا متساوية أطول ما يمكن دون أن يتبقى شيء. كم سنتيمترًا طول كل قطعة؟`, `There are two ribbons, $${a}$ cm and $${b}$ cm long. They are cut into equal pieces, as long as possible, with nothing left over. How many cm long is each piece?`)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} inline /></p>
            {answered && chosen !== null && (round.kind === 'lcm' ? <Timeline round={round} chosen={chosen} /> : <Ribbons round={round} />)}
            <div className="dbh4-candidates" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={answered ? (option === answer ? 'found' : option === chosen ? 'missed' : '') : ''} onClick={() => {
                        setChosen(option)
                        onAnswer(option === answer)
                    }}>
                        {option}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen === answer} language={language}>
                    {round.kind === 'lcm'
                        ? l(say(`${a} zenbakiaren multiploak: ${multiplesUpTo(a, answer).join(', ')}. ${b} zenbakiarenak: ${multiplesUpTo(b, answer).join(', ')}. Lehen komuna ${answer} da: MKT.`, `Múltiplos de ${a}: ${multiplesUpTo(a, answer).join(', ')}. Múltiplos de ${b}: ${multiplesUpTo(b, answer).join(', ')}. El primero común es ${answer}: el m.c.m.`, `مضاعفات ${a}: ${multiplesUpTo(a, answer).join('، ')}. مضاعفات ${b}: ${multiplesUpTo(b, answer).join('، ')}. أول مضاعف مشترك هو ${answer}: م.م.أ.`, `Multiples of ${a}: ${multiplesUpTo(a, answer).join(', ')}. Multiples of ${b}: ${multiplesUpTo(b, answer).join(', ')}. The first common one is ${answer}: the LCM.`))
                        : l(say(`${a} zenbakiaren zatitzaileak: ${divisorsOf(a).join(', ')}. ${b} zenbakiarenak: ${divisorsOf(b).join(', ')}. Komunetan handiena ${answer} da: ZKH. Zatiak: ${a / answer} eta ${b / answer}.`, `Divisores de ${a}: ${divisorsOf(a).join(', ')}. Divisores de ${b}: ${divisorsOf(b).join(', ')}. El mayor común es ${answer}: el m.c.d. Trozos: ${a / answer} y ${b / answer}.`, `قواسم ${a}: ${divisorsOf(a).join('، ')}. قواسم ${b}: ${divisorsOf(b).join('، ')}. أكبر قاسم مشترك هو ${answer}: ق.م.أ. عدد القطع: ${a / answer} و${b / answer}.`, `Divisors of ${a}: ${divisorsOf(a).join(', ')}. Divisors of ${b}: ${divisorsOf(b).join(', ')}. The greatest common one is ${answer}: the GCD. Pieces: ${a / answer} and ${b / answer}.`))}
                </RoundVerdict>
            )}
        </>
    )
}

export function MeetGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: MEET_ROUNDS,
                rules: [
                    say('Berriro elkartu, aldi berean: multiplo komun txikiena (MKT).', 'Volver a coincidir a la vez: el mínimo común múltiplo (m.c.m.).', 'الالتقاء مرة أخرى في الوقت نفسه: المضاعف المشترك الأصغر (م.م.أ).', 'Meeting again at the same time: the least common multiple (LCM).'),
                    say('Zati berdinak, ahalik eta handienak: zatitzaile komunetako handiena (ZKH).', 'Trozos iguales lo más grandes posible: el máximo común divisor (m.c.d.).', 'قطع متساوية أكبر ما يمكن: القاسم المشترك الأكبر (ق.م.أ).', 'Equal pieces as big as possible: the greatest common divisor (GCD).'),
                    say('Aukeratu erantzuna: gero, ordutegia edo moztutako zintak.', 'Elige la respuesta: luego, el horario o las cintas cortadas.', 'اختر الإجابة: ثم الجدول الزمني أو الأشرطة المقطوعة.', 'Choose the answer: then the timetable or the cut ribbons.')
                ],
                create: createMeetRounds,
                stars: standardStars(MEET_ROUNDS),
                starsNote: STARS_NOTE,
                Round: MeetPlay
            }}
        />
    )
}

/* ---------- Art ---------- */

/** The art of rectangles: 12 tiles as 2 × 6 and 3 × 4 */
export function RectanglesArt() {
    const grid = (x: number, y: number, rows: number, columns: number, fill: string) => (
        <g>
            {Array.from({ length: rows * columns }, (_, index) => (
                <rect key={index} x={x + (index % columns) * 14} y={y + Math.floor(index / columns) * 14} width="14" height="14" fill={fill} stroke="var(--ink)" strokeWidth="1.5" />
            ))}
        </g>
    )
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {grid(16, 24, 2, 6, 'var(--blue-tint, #dde7f7)')}
            {grid(132, 18, 3, 4, 'var(--mustard-tint, #fbebc0)')}
            <text x="58" y="88" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">2 × 6</text>
            <text x="160" y="88" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">3 × 4</text>
            <text x="110" y="112" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--muted)" direction="ltr">12</text>
        </svg>
    )
}

/** The art of buses and ribbons: two rows of departures meeting at 12 */
export function MeetArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <line x1="14" y1="60" x2="206" y2="60" stroke="var(--ink)" strokeWidth="2.5" />
            {[0, 4, 8, 12, 16, 20, 24].map((t) => <circle key={`a${t}`} cx={20 + t * 7.5} cy="42" r="5" fill="var(--blue-tint, #dde7f7)" stroke="var(--blue)" strokeWidth="2" />)}
            {[0, 6, 12, 18, 24].map((t) => <circle key={`b${t}`} cx={20 + t * 7.5} cy="78" r="5" fill="var(--coral-tint, #f6d5cc)" stroke="var(--coral)" strokeWidth="2" />)}
            {[0, 12, 24].map((t) => <line key={t} x1={20 + t * 7.5} y1="28" x2={20 + t * 7.5} y2="92" stroke="var(--success, #267b53)" strokeWidth="2.5" strokeDasharray="4 3" />)}
            <text x="110" y="110" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--success, #267b53)" direction="ltr">12</text>
        </svg>
    )
}
