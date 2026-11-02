import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import type { Point } from '../dbh2-funtzioak-v2/functions'
import { Plane, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { standardStars } from './equations'
import { plainNumber } from './format'
import { tex } from './geometryDetective'
import { BOX_MAX, BOX_MIN, BOX_ROUNDS, CLOUD_BOX, CLOUD_KINDS, CLOUD_ROUNDS, createBoxRounds, createCloudRounds, ESTIMATE_TOLERANCE, estimateRight, percentilePlaces, signOf, type BoxRound, type CloudKind, type CloudRound, type CloudSign } from './statistics'
import '../dbh2-funtzioak-v2/Functions.css'
import './Dbh4Games.css'

/* ==========================================================================
   Build the box plot and Guess the correlation (4. DBH statistics): the
   box moves with the steppers and the right one appears after checking;
   the regression line and r appear after the guess.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const BLUE = 'var(--blue, #2f5fb3)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const CORAL = 'var(--coral, #d9502e)'

/* ---------- Build the box plot ---------- */

const X = (value: number) => 20 + (value - BOX_MIN) * (280 / (BOX_MAX - BOX_MIN))

function BoxShape({ min, q1, median, q3, max, y, color, fill, dashed }: { min: number; q1: number; median: number; q3: number; max: number; y: number; color: string; fill: string; dashed?: boolean }) {
    const [low, high] = [Math.min(q1, q3), Math.max(q1, q3)]
    const dash = dashed ? '5 4' : undefined
    return (
        <g stroke={color} strokeWidth="2.4" strokeDasharray={dash}>
            <line x1={X(min)} y1={y + 14} x2={X(low)} y2={y + 14} />
            <line x1={X(high)} y1={y + 14} x2={X(max)} y2={y + 14} />
            <line x1={X(min)} y1={y + 6} x2={X(min)} y2={y + 22} />
            <line x1={X(max)} y1={y + 6} x2={X(max)} y2={y + 22} />
            <rect x={X(low)} y={y} width={Math.max(1, X(high) - X(low))} height="28" fill={fill} />
            <line x1={X(median)} y1={y} x2={X(median)} y2={y + 28} strokeWidth="3" />
        </g>
    )
}

function BoxScene({ round, q1, median, q3, answered }: { round: BoxRound; q1: number; median: number; q3: number; answered: boolean }) {
    const { data } = round
    const n = data.length
    // The data behind each quartile, by their place in the sorted list
    const marked = new Map<number, string>()
    if (answered) {
        for (const place of percentilePlaces(n, 25)) marked.set(place - 1, CORAL)
        for (const place of percentilePlaces(n, 50)) marked.set(place - 1, GREEN)
        for (const place of percentilePlaces(n, 75)) marked.set(place - 1, CORAL)
    }
    // The axis sits under the highest pile of dots
    const piles = new Map<number, number>()
    for (const value of data) piles.set(value, (piles.get(value) ?? 0) + 1)
    const AXIS_Y = 100 + (Math.max(...piles.values()) - 1) * 11
    const heights = new Map<number, number>()
    const dots = data.map((value, index) => {
        const level = heights.get(value) ?? 0
        heights.set(value, level + 1)
        return <circle key={index} cx={X(value)} cy={AXIS_Y - 8 - level * 11} r="5" fill={marked.get(index) ?? 'var(--paper-deep, #ece6da)'} stroke={INK} strokeWidth="1.4" />
    })
    return (
        <svg className="dbh4-scene" viewBox={`0 0 320 ${AXIS_Y + 30}`} direction="ltr" aria-hidden="true">
            <BoxShape min={data[0]} q1={q1} median={median} q3={q3} max={data[n - 1]} y={12} color={answered ? (q1 === round.q1 && median === round.median && q3 === round.q3 ? GREEN : RED) : BLUE} fill="var(--blue-tint, #dde7f7)" />
            {answered && <BoxShape min={data[0]} q1={round.q1} median={round.median} q3={round.q3} max={data[n - 1]} y={50} color={GREEN} fill="var(--success-tint, #d9efe2)" dashed />}
            {dots}
            <line x1="14" y1={AXIS_Y} x2="306" y2={AXIS_Y} stroke={INK} strokeWidth="2" />
            {Array.from({ length: BOX_MAX - BOX_MIN + 1 }, (_, index) => index + BOX_MIN).map((value) => (
                <g key={value}>
                    <line x1={X(value)} y1={AXIS_Y} x2={X(value)} y2={AXIS_Y + (value % 5 === 0 ? 7 : 4)} stroke={INK} strokeWidth="1.2" />
                    {value % 2 === 0 && <text x={X(value)} y={AXIS_Y + 20} textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>{value}</text>}
                </g>
            ))}
        </svg>
    )
}

function BoxPlay({ round, language, onAnswer, answered }: RoundProps<BoxRound>) {
    const l = useGameText(language)
    const start = round.data[0]
    const [q1, setQ1] = useState(start)
    const [median, setMedian] = useState(start)
    const [q3, setQ3] = useState(start)
    const right = q1 === round.q1 && median === round.median && q3 === round.q3
    const n = round.data.length
    const format = (value: number) => plainNumber(value, language)
    const where = (p: number) => {
        const places = percentilePlaces(n, p)
        return places.length === 1 ? `x_{${places[0]}}` : `\\frac{x_{${places[0]}}+x_{${places[1]}}}{2}`
    }
    return (
        <>
            <p className="prop3-prompt">
                <MathText text={l(say('Eraiki datuen kaxa-diagrama: jarri $Q_{1}$, mediana eta $Q_{3}$.', 'Construye el diagrama de caja de los datos: coloca $Q_{1}$, la mediana y $Q_{3}$.', 'ارسم مخطط الصندوق للبيانات: ضع $Q_{1}$ والوسيط و$Q_{3}$.', 'Build the box plot of the data: place $Q_{1}$, the median and $Q_{3}$.'))} inline />
                <span className="dbh4-subprompt">{formula(`N=${n}`, language)}</span>
            </p>
            <BoxScene round={round} q1={q1} median={median} q3={q3} answered={answered} />
            {!answered && (
                <>
                    <div className="func2-steppers">
                        <Stepper label="Q₁" value={q1} min={BOX_MIN} max={BOX_MAX} step={0.5} format={format} onChange={setQ1} language={language} />
                        <Stepper label={l(say('Mediana', 'Mediana', 'الوسيط', 'Median'))} value={median} min={BOX_MIN} max={BOX_MAX} step={0.5} format={format} onChange={setMedian} language={language} />
                        <Stepper label="Q₃" value={q3} min={BOX_MIN} max={BOX_MAX} step={0.5} format={format} onChange={setQ3} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`Q_{1}=${where(25)}=${tex(round.q1)},\\ \\ Me=${where(50)}=${tex(round.median)}`, language)}</span>
                    <span className="dbh4-worked">{formula(`Q_{3}=${where(75)}=${tex(round.q3)}`, language)}</span>
                    {l(say('Kaxa berdea da zuzena; puntu koloreztatuak dira kuartilen datuak.', 'La caja verde es la correcta; los puntos de color son los datos de los cuartiles.', 'الصندوق الأخضر هو الصحيح، والنقاط الملوّنة هي قيم الربيعيات.', 'The green box is the right one; the coloured dots are the data of the quartiles.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function BoxGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BOX_ROUNDS,
                rules: [
                    say('Puntu bakoitza datu bat da, ordenatuta ezkerretik eskuinera.', 'Cada punto es un dato, ordenados de izquierda a derecha.', 'كل نقطة قيمة، مرتّبة من اليسار إلى اليمين.', 'Each dot is a datum, sorted from left to right.'),
                    say('$Q_{1}$, mediana eta $Q_{3}$: posizioak $\\frac{N}{4}$, $\\frac{N}{2}$ eta $\\frac{3N}{4}$. Osoa ez bada, hurrengo datua; osoa bada, hura eta hurrengoaren batez bestekoa.', '$Q_{1}$, mediana y $Q_{3}$: posiciones $\\frac{N}{4}$, $\\frac{N}{2}$ y $\\frac{3N}{4}$. Si no es entera, el dato siguiente; si es entera, la media de ese y el siguiente.', '$Q_{1}$ والوسيط و$Q_{3}$: المواقع $\\frac{N}{4}$ و$\\frac{N}{2}$ و$\\frac{3N}{4}$. إن لم يكن الموقع صحيحًا فالقيمة التالية، وإن كان صحيحًا فمتوسطها مع التالية.', '$Q_{1}$, median and $Q_{3}$: places $\\frac{N}{4}$, $\\frac{N}{2}$ and $\\frac{3N}{4}$. If it is not whole, the next datum; if it is whole, the mean of that one and the next.'),
                    say('Kaxa mugitzen da zuk balioak aldatu ahala.', 'La caja se mueve mientras cambias los valores.', 'يتحرك الصندوق وأنت تغيّر القيم.', 'The box moves as you change the values.')
                ],
                create: createBoxRounds,
                stars: standardStars(BOX_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: BoxPlay
            }}
        />
    )
}

/* ---------- Guess the correlation ---------- */

const KIND_NAMES: Record<CloudKind, LocalizedText> = {
    'strong-negative': say('Negatibo sendoa', 'Negativa fuerte', 'سالب قوي', 'Strong negative'),
    'weak-negative': say('Negatibo ahula', 'Negativa débil', 'سالب ضعيف', 'Weak negative'),
    none: say('Ez dago', 'Nula', 'لا ارتباط', 'None'),
    'weak-positive': say('Positibo ahula', 'Positiva débil', 'موجب ضعيف', 'Weak positive'),
    'strong-positive': say('Positibo sendoa', 'Positiva fuerte', 'موجب قوي', 'Strong positive')
}
const SIGN_NAMES: Record<CloudSign, LocalizedText> = {
    negative: say('Negatiboa', 'Negativa', 'سالب', 'Negative'),
    none: say('Ez dago', 'Nula', 'لا ارتباط', 'None'),
    positive: say('Positiboa', 'Positiva', 'موجب', 'Positive')
}

function CloudPlay({ round, level, language, onAnswer, answered }: RoundProps<CloudRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<string | null>(null)
    const [guess, setGuess] = useState<number | null>(null)
    const estimate = round.ask !== null
    const options: string[] = level === 0 ? ['negative', 'none', 'positive'] : CLOUD_KINDS
    const truth = level === 0 ? signOf(round.kind) : round.kind
    const right = estimate ? guess !== null && estimateRight(round, guess) : chosen === truth
    const line: Point[] = [[0, round.intercept], [10, round.slope * 10 + round.intercept]]
    const predicted = estimate ? round.slope * round.ask! + round.intercept : 0
    const name = (option: string) => l(level === 0 ? SIGN_NAMES[option as CloudSign] : KIND_NAMES[option as CloudKind])
    return (
        <>
            <p className="prop3-prompt">
                {estimate
                    ? <MathText text={l(say(`Estimatu $\\hat{y}$, $x=${round.ask}$ denean: sakatu marra etenean.`, `Estima $\\hat{y}$ para $x=${round.ask}$: pulsa en la línea a trazos.`, `قدّر $\\hat{y}$ عندما $x=${round.ask}$: اضغط على الخط المتقطع.`, `Estimate $\\hat{y}$ for $x=${round.ask}$: tap on the dashed line.`))} inline />
                    : l(level === 0 ? say('Nolakoa da korrelazioa?', '¿Cómo es la correlación?', 'كيف هو الارتباط؟', 'What is the correlation like?') : say('Nolakoa da korrelazioa: sendoa ala ahula, positiboa ala negatiboa?', '¿Cómo es la correlación: fuerte o débil, positiva o negativa?', 'كيف هو الارتباط: قوي أم ضعيف، موجب أم سالب؟', 'What is the correlation like: strong or weak, positive or negative?'))}
            </p>
            <div className="func2-plane">
                <Plane box={CLOUD_BOX} cell={26} labelStep={2} label={l(say('Puntu-hodeia', 'Nube de puntos', 'سحابة النقاط', 'Scatter plot'))} onPick={estimate && !answered ? ([, y]) => setGuess(y) : undefined}>
                    {(map, clip) => (
                        <g>
                            {estimate && <line x1={map.x(round.ask!)} y1={map.y(CLOUD_BOX.yMin)} x2={map.x(round.ask!)} y2={map.y(CLOUD_BOX.yMax)} stroke={CORAL} strokeWidth="2" strokeDasharray="5 4" />}
                            {round.points.map(([x, y], index) => <circle key={index} cx={map.x(x)} cy={map.y(y)} r="4" fill={BLUE} fillOpacity="0.75" />)}
                            {answered && <PlanePath map={map} points={line} color={GREEN} width={2.6} clip={clip} />}
                            {answered && <PlanePoint map={map} point={round.centre} color={GREEN} radius={5} />}
                            {answered && estimate && <PlanePoint map={map} point={[round.ask!, predicted]} color={GREEN} radius={7} />}
                            {estimate && guess !== null && <PlanePoint map={map} point={[round.ask!, guess]} color={answered ? (right ? GREEN : RED) : CORAL} radius={7} />}
                        </g>
                    )}
                </Plane>
            </div>
            {!answered && !estimate && (
                <div className="dbh4-candidates">
                    {options.map((option) => (
                        <button key={option} type="button" onClick={() => {
                            setChosen(option)
                            onAnswer(option === truth)
                        }}>{name(option)}</button>
                    ))}
                </div>
            )}
            {!answered && estimate && (
                <>
                    <p className="dbh4-readout" dir="ltr">{guess === null ? '—' : formula(`\\hat{y}=${guess}`, language)}</p>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" disabled={guess === null} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`r=${tex(round.r)}`, language)} · {l(KIND_NAMES[round.kind])}</span>
                    {estimate && <span className="dbh4-worked">{formula(`\\hat{y}=${tex(round.slope)}\\cdot ${round.ask}${round.intercept < 0 ? '' : '+'}${tex(round.intercept)}\\approx ${tex(predicted)}`, language)}</span>}
                    {estimate
                        ? l(say(`Zuzen berdea batez bestekoen puntutik pasatzen da. Ontzat jotzen da ±${ESTIMATE_TOLERANCE} tartean.`, `La recta verde pasa por el punto de las medias. Vale con un margen de ±${ESTIMATE_TOLERANCE}.`, `المستقيم الأخضر يمرّ بنقطة المتوسطين. يُقبل بهامش ±${ESTIMATE_TOLERANCE}.`, `The green line passes through the mean point. A margin of ±${ESTIMATE_TOLERANCE} counts.`))
                        : l(say('Zuzen berdea erregresio-zuzena da.', 'La recta verde es la recta de regresión.', 'المستقيم الأخضر هو مستقيم الانحدار.', 'The green line is the regression line.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function CloudGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CLOUD_ROUNDS,
                rules: [
                    say('Hodeia gorantz badoa, korrelazioa positiboa da; beherantz badoa, negatiboa.', 'Si la nube sube, la correlación es positiva; si baja, negativa.', 'إذا صعدت السحابة فالارتباط موجب، وإذا هبطت فسالب.', 'If the cloud goes up, the correlation is positive; if it goes down, negative.'),
                    say('Puntuak zuzen batetik zenbat eta hurbilago, orduan eta sendoagoa ($|r|$ 1etik hurbil).', 'Cuanto más cerca de una recta, más fuerte ($|r|$ cerca de 1).', 'كلما اقتربت النقاط من مستقيم كان الارتباط أقوى ($|r|$ قريب من 1).', 'The closer the points are to a line, the stronger it is ($|r|$ close to 1).'),
                    say('3. mailan, estimatu $\\hat{y}$ begiz: zuzenak batez bestekoen puntutik pasatzen da.', 'En el nivel 3, estima $\\hat{y}$ a ojo: la recta pasa por el punto de las medias.', 'في المستوى 3 قدّر $\\hat{y}$ بالعين: المستقيم يمرّ بنقطة المتوسطين.', 'In level 3, estimate $\\hat{y}$ by eye: the line passes through the mean point.')
                ],
                create: createCloudRounds,
                stars: standardStars(CLOUD_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: CloudPlay
            }}
        />
    )
}

/** The art of the statistics games */
export function StatisticsArt({ game }: { game: 'box' | 'cloud' }) {
    if (game === 'box') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="20" y1="36" x2="70" y2="36" stroke="var(--ink)" strokeWidth="3" />
                <line x1="150" y1="36" x2="200" y2="36" stroke="var(--ink)" strokeWidth="3" />
                <rect x="70" y="18" width="80" height="36" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="3" />
                <line x1="102" y1="18" x2="102" y2="54" stroke="var(--ink)" strokeWidth="4" />
                {[24, 46, 62, 70, 84, 96, 102, 114, 130, 150, 176, 200].map((x, index) => <circle key={index} cx={x} cy={index % 3 === 1 ? 84 : 96} r="6" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />)}
                <line x1="12" y1="106" x2="208" y2="106" stroke="var(--ink)" strokeWidth="2.5" />
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[[30, 92], [46, 86], [58, 74], [72, 80], [86, 64], [98, 66], [112, 54], [124, 58], [140, 42], [152, 46], [168, 30], [184, 34]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="6" fill={BLUE} fillOpacity="0.8" />)}
            <line x1="20" y1="100" x2="196" y2="24" stroke={GREEN} strokeWidth="3.5" />
            <text x="196" y="108" textAnchor="end" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">r ≈ ?</text>
        </svg>
    )
}
