import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { complexLatex, type Complex } from '../lab/complex'
import { localize } from '../text'
import './ComplexGames.css'
import { AFFIX_LIMIT, AFFIX_ROUNDS, createAffixRounds, isAffixRight, type AffixRound } from './affix'
import { createRootHuntRounds, isRootHuntRight, ROOT_HUNT_POINTS, ROOT_HUNT_ROUNDS, type RootHuntRound } from './hunt'
import { createTwistRounds, TWIST_LIMIT, TWIST_ROUNDS, twistRight, type TwistRound } from './twist'

/* ==========================================================================
   Non dago afixua?, Biratu eta luzatu and Ehizatu erroak (Zenbaki
   konplexuak, Batxilergoa 1 · Zientziak): a number to place on a grid of
   whole points, a point z and four candidates for z · i, −z, 2z…, and the
   roots of z^n = w tapped on a circle with a point every 15°.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const GRID = '#e3ddd0'
const BLUE = 'var(--blue, #2f5fb3)'
const CORAL = 'var(--error, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const STARS = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const LETTERS = ['A', 'B', 'C', 'D']

/** A formula in the language's notation (\sen in its name, its decimal mark) */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />

/** A grid of whole points from −limit to limit, with the axes called Re and Im */
function Grid({ size, limit, children, label }: { size: number; limit: number; children: (at: (value: Complex) => [number, number]) => ReactNode; label: string }) {
    const middle = size / 2
    const unit = (size / 2 - 22) / limit
    const at = ([a, b]: Complex): [number, number] => [middle + a * unit, middle - b * unit]
    const values = Array.from({ length: 2 * limit + 1 }, (_, index) => index - limit)
    const far = limit * unit
    return (
        <svg className="dbh4-scene konplexuak-grid" viewBox={`0 0 ${size} ${size}`} direction="ltr" role="group" aria-label={label}>
            {values.map((value) => (
                <g key={value}>
                    <line x1={middle + value * unit} y1={middle - far} x2={middle + value * unit} y2={middle + far} stroke={GRID} strokeWidth={1} />
                    <line x1={middle - far} y1={middle - value * unit} x2={middle + far} y2={middle - value * unit} stroke={GRID} strokeWidth={1} />
                </g>
            ))}
            <line x1={middle - far - 10} y1={middle} x2={middle + far + 10} y2={middle} stroke={MUTED} strokeWidth={1.6} />
            <line x1={middle} y1={middle + far + 10} x2={middle} y2={middle - far - 10} stroke={MUTED} strokeWidth={1.6} />
            <text x={middle + far + 12} y={middle - 6} textAnchor="end" fontSize={13} fontWeight={700} fill={MUTED}>Re</text>
            <text x={middle + 6} y={middle - far - 6} fontSize={13} fontWeight={700} fill={MUTED}>Im</text>
            <text x={middle + far} y={middle + 16} textAnchor="middle" fontSize={12} fill={MUTED}>{limit}</text>
            <text x={middle - far} y={middle + 16} textAnchor="middle" fontSize={12} fill={MUTED}>{`−${limit}`}</text>
            <text x={middle - 6} y={middle - far + 4} textAnchor="end" fontSize={12} fill={MUTED}>{`${limit}i`}</text>
            <text x={middle - 6} y={middle + far + 4} textAnchor="end" fontSize={12} fill={MUTED}>{`−${limit}i`}</text>
            {children(at)}
        </svg>
    )
}

/* ---------- Where is the affix? ---------- */

function AffixPlay({ round, language, onAnswer, answered }: RoundProps<AffixRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<Complex | null>(null)
    const values = Array.from({ length: 2 * AFFIX_LIMIT + 1 }, (_, index) => index - AFFIX_LIMIT)
    const right = chosen !== null && isAffixRight(round, chosen)
    const same = (a: Complex | null, b: Complex) => a !== null && a[0] === b[0] && a[1] === b[1]
    return (
        <>
            <p className="prop3-prompt">{l(say('Ukitu zenbaki honen afixua.', 'Toca el afijo de este número.', 'المس صورة هذا العدد.', 'Tap the affix of this number.'))}</p>
            <div className="dbh4-big-formula konplexuak-asked" dir="ltr">{formula(`\\displaystyle ${round.expression}`, language)}</div>
            <Grid size={340} limit={AFFIX_LIMIT} label={l(say('Planoa, puntu oso guztiekin', 'El plano, con todos los puntos enteros', 'المستوى بكل النقاط الصحيحة', 'The plane, with every whole point'))}>
                {(at) => values.flatMap((a) => values.map((b) => {
                    const point: Complex = [a, b]
                    const [x, y] = at(point)
                    const picked = same(chosen, point)
                    const solution = isAffixRight(round, point)
                    const fill = answered ? (solution ? GREEN : picked ? CORAL : 'var(--card, #fffcf6)') : picked ? BLUE : 'var(--card, #fffcf6)'
                    const big = picked || (answered && solution)
                    return (
                        <g key={`${a},${b}`} role="button" tabIndex={answered ? -1 : 0} aria-pressed={picked} aria-label={`(${a}, ${b})`}
                            onClick={() => !answered && setChosen(point)}
                            onKeyDown={(event) => { if (!answered && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); setChosen(point) } }}
                            style={{ cursor: answered ? 'default' : 'pointer' }}>
                            <circle cx={x} cy={y} r={13} fill="transparent" />
                            <circle cx={x} cy={y} r={big ? 8 : 3.6} fill={big ? fill : MUTED} stroke={big ? INK : 'none'} strokeWidth={1.6} />
                        </g>
                    )
                }))}
            </Grid>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`\\displaystyle ${round.working}`, language)}</span>
                    <span className="dbh4-worked">{formula(`(${round.answer[0]},\\ ${round.answer[1]})`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function AffixGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: AFFIX_ROUNDS,
                rules: [
                    say('Zenbaki konplexu bat ikusiko duzu, era batera edo bestera idatzita.', 'Verás un número complejo escrito de una forma u otra.', 'سترى عددًا مركبًا مكتوبًا بشكل أو بآخر.', 'You will see a complex number written one way or another.'),
                    say('Ukitu haren afixua planoan: zati erreala ezker-eskuin, eta irudikaria behetik gora.', 'Toca su afijo en el plano: la parte real, a izquierda y derecha; la imaginaria, abajo y arriba.', 'المس صورته في المستوى: الجزء الحقيقي يمينًا ويسارًا، والتخيلي أعلى وأسفل.', 'Tap its affix on the plane: the real part left and right, the imaginary part up and down.'),
                    say('Gero egiaztatu: kalkulua ikusiko duzu.', 'Después comprueba: verás el cálculo.', 'ثم تحقّق: سترى الحساب.', 'Then check: you will see the working.')
                ],
                create: createAffixRounds,
                stars: standardStars(AFFIX_ROUNDS),
                starsNote: STARS,
                Round: AffixPlay
            }}
        />
    )
}

/* ---------- Turn and stretch ---------- */

function TwistPlay({ round, language, onAnswer, answered }: RoundProps<TwistRound>) {
    const l = useGameText(language)
    const [choice, setChoice] = useState<number | null>(null)
    const rightIndex = twistRight(round)
    return (
        <>
            <p className="prop3-prompt">{l(say('Non geratzen da hau?', '¿Dónde queda esto?', 'أين يقع هذا؟', 'Where does this end up?'))}</p>
            <div className="dbh4-big-formula konplexuak-asked" dir="ltr">{formula(`\\displaystyle ${round.operation}`, language)}</div>
            <Grid size={340} limit={TWIST_LIMIT} label={l(say('Planoa: z eta lau puntu, A, B, C eta D', 'El plano: z y cuatro puntos, A, B, C y D', 'المستوى: z وأربع نقاط A وB وC وD', 'The plane: z and four points, A, B, C and D'))}>
                {(at) => (
                    <g>
                        <line x1={at([0, 0])[0]} y1={at([0, 0])[1]} x2={at(round.z)[0]} y2={at(round.z)[1]} stroke={BLUE} strokeWidth={2.6} />
                        <circle cx={at(round.z)[0]} cy={at(round.z)[1]} r={6} fill={BLUE} stroke={INK} strokeWidth={1.4} />
                        <text x={at(round.z)[0] + 9} y={at(round.z)[1] - 8} fontSize={16} fontWeight={700} fill={BLUE}>z</text>
                        {round.options.map((option, index) => {
                            const [x, y] = at(option.point)
                            const color = !answered ? INK : index === rightIndex ? GREEN : index === choice ? CORAL : MUTED
                            return (
                                <g key={LETTERS[index]}>
                                    <circle cx={x} cy={y} r={11} fill="var(--card, #fffcf6)" stroke={color} strokeWidth={2.2} />
                                    <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={color}>{LETTERS[index]}</text>
                                </g>
                            )
                        })}
                    </g>
                )}
            </Grid>
            <div className="prop3-options konplexuak-letters">
                {round.options.map((_, index) => {
                    const mark = !answered ? '' : index === rightIndex ? 'right' : index === choice ? 'wrong' : ''
                    return <button key={LETTERS[index]} type="button" disabled={answered} className={mark} onClick={() => { setChoice(index); onAnswer(index === rightIndex) }}>{LETTERS[index]}</button>
                })}
            </div>
            {answered && (
                <RoundVerdict right={choice === rightIndex} language={language}>
                    <span className="dbh4-worked">{formula(`{z}=${complexLatex(round.z)}`, language)}</span>
                    <span className="dbh4-worked">{formula(`\\displaystyle ${round.working}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function TwistGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TWIST_ROUNDS,
                rules: [
                    say('z puntu bat da planoan, eta eragiketa bat ematen da: z · i, −z, 2z…', 'z es un punto del plano y se da una operación: z · i, −z, 2z…', 'z نقطة في المستوى وتُعطى عملية: z · i أو −z أو 2z…', 'z is a point on the plane and an operation is given: z · i, −z, 2z…'),
                    say('Lau puntu daude markatuta: A, B, C eta D. Aukeratu emaitza dena.', 'Hay cuatro puntos marcados: A, B, C y D. Elige el que es el resultado.', 'هناك أربع نقاط مُعلَّمة: A وB وC وD. اختر الناتج.', 'Four points are marked: A, B, C and D. Choose the one that is the result.'),
                    say('i zenbakiaz biderkatzeak 90° biratzen du, erlojuaren orratzen kontra.', 'Multiplicar por i gira 90° en sentido contrario a las agujas del reloj.', 'الضرب في i دوران بزاوية 90° عكس عقارب الساعة.', 'Multiplying by i turns 90° anticlockwise.')
                ],
                create: createTwistRounds,
                stars: standardStars(TWIST_ROUNDS),
                starsNote: STARS,
                Round: TwistPlay
            }}
        />
    )
}

/* ---------- Hunt the roots ---------- */

function RootHuntCircle({ round, chosen, answered, onToggle, language }: { round: RootHuntRound; chosen: number[]; answered: boolean; onToggle: (angle: number) => void; language: UnitLanguage }) {
    const l = useGameText(language)
    const O = [170, 170]
    const R = 124
    const at = (angle: number, radius = R) => [O[0] + radius * Math.cos((angle * Math.PI) / 180), O[1] - radius * Math.sin((angle * Math.PI) / 180)]
    const solutions = round.solutions
    return (
        <svg className="dbh4-scene konplexuak-hunt" viewBox="0 0 340 340" direction="ltr" role="group" aria-label={l(say('Zirkunferentzia, puntu bat 15° bakoitzean', 'La circunferencia, con un punto cada 15°', 'الدائرة، بنقطة كل 15°', 'The circle, with a point every 15°'))}>
            <line x1={O[0] - R - 16} y1={O[1]} x2={O[0] + R + 16} y2={O[1]} stroke={MUTED} strokeWidth={1.4} />
            <line x1={O[0]} y1={O[1] - R - 16} x2={O[0]} y2={O[1] + R + 16} stroke={MUTED} strokeWidth={1.4} />
            <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={INK} strokeWidth={2.4} />
            {[0, 90, 180, 270].map((angle) => {
                const [x, y] = at(angle, R + 30)
                return <text key={angle} x={angle === 90 || angle === 270 ? x + 26 : x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={700} fill={MUTED}>{`${angle}°`}</text>
            })}
            {answered && solutions.length > 2 && <polygon points={solutions.map((angle) => at(angle).map((value) => value.toFixed(1)).join(',')).join(' ')} fill="none" stroke={GREEN} strokeWidth={2} strokeDasharray="5 4" />}
            {ROOT_HUNT_POINTS.map((angle) => {
                const [x, y] = at(angle)
                const picked = chosen.includes(angle)
                const solution = solutions.includes(angle)
                const fill = answered ? (solution ? GREEN : picked ? CORAL : 'var(--card, #fffcf6)') : picked ? BLUE : 'var(--card, #fffcf6)'
                return (
                    <g key={angle} role="button" tabIndex={answered ? -1 : 0} aria-pressed={picked} aria-label={`${angle}°`}
                        onClick={() => !answered && onToggle(angle)}
                        onKeyDown={(event) => { if (!answered && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); onToggle(angle) } }}
                        style={{ cursor: answered ? 'default' : 'pointer' }}>
                        <circle cx={x} cy={y} r={15} fill="transparent" />
                        <circle cx={x} cy={y} r={angle % 90 === 0 ? 9 : 7.5} fill={fill} stroke={answered && solution && !picked ? GREEN : INK} strokeWidth={answered && solution && !picked ? 3 : 1.6} strokeDasharray={answered && solution && !picked ? '3 2' : undefined} />
                        {answered && (solution || picked) && <text x={at(angle, R - 24)[0]} y={at(angle, R - 24)[1] + 4} textAnchor="middle" fontSize={11} fontWeight={700} fill={solution ? GREEN : CORAL}>{`${angle}°`}</text>}
                    </g>
                )
            })}
        </svg>
    )
}

function HuntPlay({ round, language, onAnswer, answered }: RoundProps<RootHuntRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number[]>([])
    const toggle = (angle: number) => setChosen((list) => (list.includes(angle) ? list.filter((item) => item !== angle) : [...list, angle]))
    const right = isRootHuntRight(round, chosen)
    const missing = round.solutions.filter((angle) => !chosen.includes(angle))
    const extra = chosen.filter((angle) => !round.solutions.includes(angle))
    const list = (angles: number[], separator: string) => angles.map((angle) => `${angle}°`).join(separator)
    const rows: string[] = []
    for (let start = 0; start < round.solutions.length; start += 3) rows.push(round.solutions.slice(start, start + 3).map((angle) => `${round.rootModulus}_{${angle}°}`).join(',\\ '))
    return (
        <>
            <p className="prop3-prompt">{l(say('Ukitu ekuazioaren soluzio guztiak. Zirkunferentzia haien modulua da.', 'Toca todas las soluciones de la ecuación. La circunferencia es su módulo.', 'المس كل حلول المعادلة. الدائرة هي طويلتها.', 'Tap every solution of the equation. The circle is their modulus.'))}</p>
            <div className="dbh4-big-formula konplexuak-asked" dir="ltr">{formula(round.equation, language)}</div>
            <RootHuntCircle round={round} chosen={chosen} answered={answered} onToggle={toggle} language={language} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen.length === 0} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {rows.map((row) => <span key={row} className="dbh4-worked">{formula(row, language)}</span>)}
                    {missing.length > 0 && <span className="dbh4-worked">{l(say(`Falta zitzaizkizun: ${list(missing, ', ')}.`, `Te faltaron: ${list(missing, ', ')}.`, `نقصك: ${list(missing, '، ')}.`, `You missed: ${list(missing, ', ')}.`))}</span>}
                    {extra.length > 0 && <span className="dbh4-worked">{l(say(`Ez dira soluzio: ${list(extra, ', ')}.`, `No son solución: ${list(extra, ', ')}.`, `ليست حلولًا: ${list(extra, '، ')}.`, `Not solutions: ${list(extra, ', ')}.`))}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function HuntGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ROOT_HUNT_ROUNDS,
                rules: [
                    say('${z}^n=w$ erako ekuazio bat eta zirkunferentzia bat ikusiko dituzu, 15° bakoitzean puntu batekin.', 'Verás una ecuación ${z}^n=w$ y una circunferencia con un punto cada 15°.', 'سترى معادلة ${z}^n=w$ ودائرة فيها نقطة كل 15°.', 'You will see an equation ${z}^n=w$ and a circle with a point every 15°.'),
                    say('Ukitu soluzio diren puntu guztiak (berriro ukituta, kendu egiten da) eta egiaztatu.', 'Toca todos los puntos que sean solución (si vuelves a tocar uno, se quita) y comprueba.', 'المس كل النقاط التي هي حلول (وإذا لمستها مرة أخرى تُزال) ثم تحقّق.', 'Tap every point that is a solution (tap it again to remove it) and check.'),
                    say('Soluzio bat falta bada edo bat soberan badago, hutsegitea da.', 'Si falta una solución o sobra una, es un fallo.', 'إذا نقص حل أو زاد حل فهو خطأ.', 'If one solution is missing or one is extra, it is a miss.')
                ],
                create: createRootHuntRounds,
                stars: standardStars(ROOT_HUNT_ROUNDS),
                starsNote: STARS,
                Round: HuntPlay
            }}
        />
    )
}
