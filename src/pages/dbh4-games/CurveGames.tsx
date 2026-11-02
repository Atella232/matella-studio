import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import type { Point } from '../dbh2-funtzioak-v2/functions'
import { Plane, PlanePath, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import {
    createCurveRounds, createGrowthRounds, createMatchRounds, curveAt, curveLatex, GROWTH_ROUNDS, growthAt, hitsAll, LASER_CURVE_ROUNDS, MATCH_ROUNDS, PARAMETERS, RANGES, START,
    type Curve, type CurveRound, type Family, type GrowthRound, type MatchRound
} from './curves'
import { standardStars } from './equations'
import '../dbh2-funtzioak-v2/Functions.css'
import './Dbh4Games.css'

/* ==========================================================================
   The graph games of 4. DBH: the curve laser, which formula? and when
   does it double?, all in the shared RoundGame. Each unit passes the
   families of each level.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const BOX = { xMin: -6, xMax: 6, yMin: -7, yMax: 7 }
const check = (language: UnitLanguage) => (language === 'eu' ? 'Egiaztatu' : language === 'ar' ? 'تحقّق' : language === 'en' ? 'Check' : 'Comprobar')

/** The curve as a list of points, broken where it is not defined or leaves the box */
function curvePaths(curve: Curve): Point[][] {
    const paths: Point[][] = []
    let current: Point[] = []
    for (let index = 0; index <= 480; index += 1) {
        const x = BOX.xMin + (index * (BOX.xMax - BOX.xMin)) / 480
        const y = curveAt(curve, x)
        if (y === null || !Number.isFinite(y) || Math.abs(y) > 30) {
            if (current.length > 1) paths.push(current)
            current = []
            continue
        }
        current.push([x, y])
    }
    if (current.length > 1) paths.push(current)
    return paths
}

/** The family written with letters: y = a(x − h)² + k */
const TEMPLATES: Record<Family, (base: number) => string> = {
    line: () => 'y=mx+n',
    parabola: () => 'y=a(x-h)^{2}+k',
    abs: () => 'y=a|x-h|+k',
    inverse: () => 'y=\\frac{a}{x-h}+k',
    exp: (base) => `y=${base}^{x-h}+k`,
    log: (base) => `y=\\log_{${base}}(x-h)+k`
}
const LETTER: Record<Family, Record<'a' | 'h' | 'k' | 'base', string>> = {
    line: { a: 'm', h: 'h', k: 'n', base: 'b' },
    parabola: { a: 'a', h: 'h', k: 'k', base: 'b' },
    abs: { a: 'a', h: 'h', k: 'k', base: 'b' },
    inverse: { a: 'a', h: 'h', k: 'k', base: 'b' },
    exp: { a: 'a', h: 'h', k: 'k', base: 'b' },
    log: { a: 'a', h: 'h', k: 'k', base: 'b' }
}

/* ---------- The curve laser ---------- */

function CurvePlay({ round, language, onAnswer, answered }: RoundProps<CurveRound>) {
    const l = useGameText(language)
    const { family, base } = round.curve
    const [curve, setCurve] = useState<Curve>({ ...START[family], base })
    const right = hitsAll(curve, round.targets)
    const isHit = ([x, y]: [number, number]) => {
        const value = curveAt(curve, x)
        return answered && value !== null && Math.abs(value - y) < 1e-9
    }
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Kurba bakar batek jo behar ditu jomuga guztiak:', 'Una sola curva tiene que dar en todas las dianas:', 'يجب أن يصيب منحنى واحد كل الأهداف:', 'One single curve has to hit every target:'))}
                <strong>{formula(TEMPLATES[family](base), language)}</strong>
            </p>
            <div className="func2-plane">
                <Plane box={BOX} cell={22} labelStep={2} label={l(say('Planoa', 'Plano', 'المستوى', 'Grid'))}>
                    {(map, clip) => (
                        <g>
                            {answered && curvePaths(curve).map((path, index) => <PlanePath key={index} map={map} points={path} color={right ? GREEN : RED} clip={clip} />)}
                            {answered && !right && curvePaths(round.curve).map((path, index) => <PlanePath key={`r${index}`} map={map} points={path} color={GREEN} dashed width={2.5} clip={clip} />)}
                            {round.targets.map((point) => (
                                <g key={`${point[0]}-${point[1]}`}>
                                    <circle cx={map.x(point[0])} cy={map.y(point[1])} r="11" fill="none" stroke={isHit(point) ? GREEN : RED} strokeWidth="2.5" />
                                    <PlanePoint map={map} point={point} color={isHit(point) ? GREEN : RED} radius={5} />
                                </g>
                            ))}
                        </g>
                    )}
                </Plane>
            </div>
            <p className="dbh4-readout" dir="ltr">{formula(curveLatex(curve), language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers">
                        {PARAMETERS[family].map((name) => (
                            <Stepper key={name} label={LETTER[family][name]} value={curve[name]} min={RANGES[name][0]} max={RANGES[name][1]} format={signed} onChange={(value) => setCurve({ ...curve, [name]: value })} language={language} />
                        ))}
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Jaurti', 'Disparar', 'أطلق', 'Fire'))}</button>
                    </div>
                </>
            )}
            {answered && <RoundVerdict right={right} language={language}>{formula(curveLatex(round.curve), language)}</RoundVerdict>}
        </>
    )
}

function curveConfig(families: Family[][]): Omit<RoundGameConfig<CurveRound>, 'game' | 'art'> {
    return {
        rounds: LASER_CURVE_ROUNDS,
        rules: [
            say('Jomugak puntuak dira; kurba familia bat da, bere parametroekin.', 'Las dianas son puntos; la curva es una familia con sus parámetros.', 'الأهداف نقاط؛ والمنحنى عائلة لها معاملاتها.', 'The targets are points; the curve is a family with its parameters.'),
            say('Irakurri jomugetan parametroak, jarri eta jaurti: orduan bakarrik ikusiko duzu kurba.', 'Lee los parámetros en las dianas, ponlos y dispara: solo entonces verás la curva.', 'اقرأ المعاملات من الأهداف وضعها وأطلق: عندها فقط سترى المنحنى.', 'Read the parameters from the targets, set them and fire: only then will you see the curve.'),
            say(`${LASER_CURVE_ROUNDS} jaurtiketa maila bakoitzean.`, `${LASER_CURVE_ROUNDS} disparos por nivel.`, `${LASER_CURVE_ROUNDS} طلقات في كل مستوى.`, `${LASER_CURVE_ROUNDS} shots per level.`)
        ],
        create: createCurveRounds(families),
        stars: standardStars(LASER_CURVE_ROUNDS),
        starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
        Round: CurvePlay
    }
}

export function CurveLaserGame({ game, art, families, ...props }: GameProps & { game: GameInfo; art: ReactNode; families: Family[][] }) {
    return <RoundGame {...props} config={{ ...curveConfig(families), game, art }} />
}

/* ---------- Which formula? ---------- */

function MatchPlay({ round, language, onAnswer, answered }: RoundProps<MatchRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.right)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein da grafiko honen formula?', '¿Cuál es la fórmula de esta gráfica?', 'ما صيغة هذا التمثيل؟', 'What is the formula of this graph?'))}</p>
            <div className="func2-plane">
                <Plane box={BOX} cell={22} labelStep={2} label={l(say('Grafikoa', 'Gráfica', 'التمثيل البياني', 'Graph'))}>
                    {(map, clip) => <g>{curvePaths(round.curve).map((path, index) => <PlanePath key={index} map={map} points={path} clip={clip} />)}</g>}
                </Plane>
            </div>
            <div className="prop3-options dbh4-fractions" role="group" aria-label={l(say('Formulak', 'Fórmulas', 'الصيغ', 'Formulas'))}>
                {round.options.map((option, index) => (
                    <button key={option} type="button" disabled={answered} className={!answered ? '' : index === round.right ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && <RoundVerdict right={picked === round.right} language={language}>{formula(curveLatex(round.curve), language)}</RoundVerdict>}
        </>
    )
}

function matchConfig(families: Family[][]): Omit<RoundGameConfig<MatchRound>, 'game' | 'art'> {
    return {
        rounds: MATCH_ROUNDS,
        rules: [
            say('Begiratu erpina, irekiera, asintotak eta ebakidurak.', 'Mira el vértice, la abertura, las asíntotas y los cortes.', 'انظر إلى الرأس والانفتاح والمقاربات والتقاطعات.', 'Look at the vertex, the opening, the asymptotes and the cuts.'),
            say('Kontuz: $(x-3)$ eskuinera mugitzen da.', 'Cuidado: $(x-3)$ se mueve a la derecha.', 'انتبه: $(x-3)$ تُزاح إلى اليمين.', 'Careful: $(x-3)$ moves to the right.'),
            say(`${MATCH_ROUNDS} grafiko maila bakoitzean.`, `${MATCH_ROUNDS} gráficas por nivel.`, `${MATCH_ROUNDS} تمثيلات في كل مستوى.`, `${MATCH_ROUNDS} graphs per level.`)
        ],
        create: createMatchRounds(families),
        stars: standardStars(MATCH_ROUNDS),
        starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
        Round: MatchPlay
    }
}

export function WhichFormulaGame({ game, art, families, ...props }: GameProps & { game: GameInfo; art: ReactNode; families: Family[][] }) {
    return <RoundGame {...props} config={{ ...matchConfig(families), game, art }} />
}

/* ---------- When does it double? ---------- */

const UNITS = [say('ordu', 'horas', 'ساعات', 'hours'), say('urte', 'años', 'سنوات', 'years')]

function GrowthPlay({ round, language, onAnswer, answered }: RoundProps<GrowthRound>) {
    const l = useGameText(language)
    const [time, setTime] = useState(round.period)
    const right = time === round.time
    const unit = round.period === 1 ? UNITS[0] : UNITS[1]
    const story = round.kind === 'half'
        ? say(`Substantzia erradioaktibo baten ${round.start} g ditugu; erdia desagertzen da ${round.period} ${unit.eu}ro. Noiz geratuko dira ${round.target} g?`, `Tenemos ${round.start} g de una sustancia radiactiva; la mitad desaparece cada ${round.period} ${unit.es}. ¿Cuándo quedarán ${round.target} g?`, `لدينا ${round.start} غ من مادة مشعة؛ يختفي نصفها كل ${round.period} ${unit.ar}. متى يبقى ${round.target} غ؟`, `We have ${round.start} g of a radioactive substance; half of it disappears every ${round.period} ${unit.en}. When will ${round.target} g be left?`)
        : say(`Bakterio-kolonia batek ${round.start} bakterio ditu eta ${round.kind === 'double' ? 'bikoiztu' : 'hirukoiztu'} egiten da ${round.period} ${unit.eu}ro. Noiz izango ditu ${round.target}?`, `Una colonia tiene ${round.start} bacterias y se ${round.kind === 'double' ? 'duplica' : 'triplica'} cada ${round.period} ${unit.es}. ¿Cuándo tendrá ${round.target}?`, `مستعمرة فيها ${round.start} بكتيريا وتتضاعف ${round.kind === 'double' ? 'مرتين' : 'ثلاث مرات'} كل ${round.period} ${unit.ar}. متى يصبح فيها ${round.target}؟`, `A colony has ${round.start} bacteria and ${round.kind === 'double' ? 'doubles' : 'triples'} every ${round.period} ${unit.en}. When will it have ${round.target}?`)
    const steps = Math.round(round.time / round.period)
    const factor = round.kind === 'half' ? '\\frac{1}{2}' : round.kind === 'triple' ? '3' : '2'
    return (
        <>
            <p className="prop3-prompt dbh4-story">{l(story)}</p>
            {answered && (
                <div className="dbh4-bars" dir="ltr" aria-hidden="true">
                    {Array.from({ length: Math.max(steps, Math.round(time / round.period)) + 1 }, (_, index) => {
                        const value = growthAt(round, index * round.period)
                        const top = Math.max(round.start, round.target)
                        return <span key={index} className={index * round.period === round.time ? 'target' : ''} style={{ height: `${Math.max(4, (value / top) * 90)}px` }} />
                    })}
                </div>
            )}
            {!answered && (
                <div className="solids2-controls">
                    <Stepper label={l(unit)} value={time} min={round.period} max={round.period * 8} step={round.period} onChange={setTime} language={language} />
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{check(language)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(`${round.start}\\cdot ${factor}^{${steps}}=${round.target}`, language)}{' '}
                    {l(say(`${steps} aldiz ${round.period} = ${round.time}`, `${steps} veces ${round.period} = ${round.time}`, `${steps} مرات ${round.period} = ${round.time}`, `${steps} times ${round.period} = ${round.time}`))}
                </RoundVerdict>
            )}
        </>
    )
}

export function GrowthGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: GROWTH_ROUNDS,
                rules: [
                    say('Hazkunde esponentziala: aldi bakoitzean kopurua bider 2, bider 3 edo zati 2.', 'Crecimiento exponencial: en cada periodo la cantidad se multiplica por 2, por 3 o se divide entre 2.', 'النمو الأسي: في كل فترة تُضرب الكمية في 2 أو 3 أو تُقسم على 2.', 'Exponential growth: each period the amount is multiplied by 2 or 3, or halved.'),
                    say('Zenbat aldi behar dira? Jarri denbora eta egiaztatu.', '¿Cuántos periodos hacen falta? Pon el tiempo y comprueba.', 'كم فترة نحتاج؟ ضع الزمن وتحقّق.', 'How many periods are needed? Set the time and check.'),
                    say(`${GROWTH_ROUNDS} egoera maila bakoitzean.`, `${GROWTH_ROUNDS} situaciones por nivel.`, `${GROWTH_ROUNDS} حالات في كل مستوى.`, `${GROWTH_ROUNDS} situations per level.`)
                ],
                create: createGrowthRounds,
                stars: standardStars(GROWTH_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: GrowthPlay
            }}
        />
    )
}

/** The art of the graph games */
export function CurveArt({ game }: { game: 'laser' | 'match' | 'growth' }) {
    if (game === 'growth') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                {[6, 12, 24, 48, 96].map((height, index) => <rect key={index} x={30 + index * 34} y={108 - height} width="24" height={height} rx="3" fill={index === 4 ? 'var(--success, #267b53)' : 'var(--blue, #2f5fb3)'} />)}
                <text x="40" y="24" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">×2</text>
            </svg>
        )
    }
    if (game === 'match') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d="M 30 16 Q 80 150 130 16" fill="none" stroke="var(--blue, #2f5fb3)" strokeWidth="4" />
                <text x="150" y="50" fontSize="14" fontWeight="700" fill="var(--ink)" direction="ltr">(x − 2)²</text>
                <text x="150" y="80" fontSize="14" fontWeight="700" fill="var(--coral)" direction="ltr">(x + 2)²</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <path d="M 20 110 Q 110 -60 200 110" fill="none" stroke="var(--coral)" strokeWidth="4" />
            {[[56, 54], [110, 25], [164, 54]].map(([cx, cy]) => (
                <g key={cx}>
                    <circle cx={cx} cy={cy} r="10" fill="none" stroke="var(--success, #267b53)" strokeWidth="2.5" />
                    <circle cx={cx} cy={cy} r="4" fill="var(--success, #267b53)" />
                </g>
            ))}
        </svg>
    )
}
