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
    B_LIMIT, buildRight, BUILD_ROUNDS, C_LIMIT, CHECK_ROUNDS, checkRight, createBuildRounds, createCheckRounds, createCrossRounds, createPaintRounds, CROSS_ROUNDS, equationLatex, lineAt,
    PAINT_ROUNDS, paintRight, pieceCount, pieceSolves, relationLatex, rootSolves, solutionLatex, standardStars, type BuildRound, type CheckRound, type CrossRound, type PaintRound
} from './equations'
import { createDomainRounds, DOMAIN_ROUNDS, type DomainRound } from './functions'
import { polyLatex, valueAt } from './polynomials'
import '../dbh2-funtzioak-v2/Functions.css'
import './Dbh4Games.css'

/* ==========================================================================
   The equation games of 4. DBH: is it a solution? and paint the solution
   (academic), build the equation and the crossing point (applied; the
   crossing point also in Systems). All in the shared RoundGame.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const signed = (value: number) => (value < 0 ? `−${-value}` : String(value))
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const BLUE = 'var(--blue, #2f5fb3)'
const check = (language: UnitLanguage) => (language === 'eu' ? 'Egiaztatu' : language === 'ar' ? 'تحقّق' : language === 'en' ? 'Check' : 'Comprobar')

type Config<Round> = Omit<RoundGameConfig<Round>, 'game' | 'art'>
function makeGame<Round>(config: Config<Round>) {
    return function Game({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
        return <RoundGame {...props} config={{ ...config, game, art }} />
    }
}

/* ---------- Is it a solution? ---------- */

function CheckPlay({ round, language, onAnswer, answered }: RoundProps<CheckRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number[]>([])
    const toggle = (value: number) => !answered && setChosen(chosen.includes(value) ? chosen.filter((item) => item !== value) : [...chosen, value])
    const right = checkRight(round, chosen)
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Hautatu benetako soluzioak (bat ere ez, bat edo gehiago):', 'Elige las soluciones de verdad (ninguna, una o varias):', 'اختر الحلول الحقيقية (لا شيء أو واحدًا أو أكثر):', 'Choose the true solutions (none, one or more):'))}
                <strong>{formula(round.latex, language)}</strong>
            </p>
            <div className="dbh4-candidates" dir="ltr" role="group" aria-label={l(say('Hautagaiak', 'Candidatos', 'المرشحون', 'Candidates'))}>
                {round.candidates.map((value) => {
                    const mark = answered ? (round.solutions.includes(value) ? 'found' : chosen.includes(value) ? 'missed' : '') : chosen.includes(value) ? 'chosen' : ''
                    return <button key={value} type="button" aria-pressed={chosen.includes(value)} className={mark} onClick={() => toggle(value)}>{`x = ${signed(value)}`}</button>
                })}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{chosen.length === 0 ? l(say('Bat ere ez', 'Ninguna', 'لا شيء', 'None')) : check(language)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {round.solutions.length === 0 ? l(say('Ez du soluziorik.', 'No tiene solución.', 'لا حل لها.', 'It has no solution.')) : formula(round.solutions.map((value) => `x=${value}`).join(',\\ '), language)}{' '}
                    {l(say('Ordeztu hasierako ekuazioan egiaztatzeko.', 'Sustituye en la ecuación inicial para comprobar.', 'عوّض في المعادلة الأصلية للتحقق.', 'Substitute in the first equation to check.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export const CheckSolutionsGame = makeGame<CheckRound>({
    rounds: CHECK_ROUNDS,
    rules: [
        say('Metodoak hautagaiak ematen ditu, baina ber bi egiteak edo izendatzaileak kentzeak soluzio faltsuak sor ditzakete.', 'El método da candidatos, pero elevar al cuadrado o quitar denominadores puede dar soluciones falsas.', 'الطريقة تعطي مرشحين، لكن التربيع أو حذف المقامات قد يعطي حلولًا زائفة.', 'The method gives candidates, but squaring or clearing denominators can give false solutions.'),
        say('Hautatu hasierako ekuazioa betetzen dutenak bakarrik.', 'Elige solo los que cumplen la ecuación inicial.', 'اختر فقط ما يحقق المعادلة الأصلية.', 'Choose only the ones that satisfy the first equation.'),
        say('3. mailan, $t=x^{2}$: kontuz t-ren balioekin.', 'En el nivel 3, $t=x^{2}$: cuidado con los valores de t.', 'في المستوى 3، $t=x^{2}$: انتبه لقيم t.', 'In level 3, $t=x^{2}$: careful with the values of t.')
    ],
    create: createCheckRounds,
    stars: standardStars(CHECK_ROUNDS),
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: CheckPlay
})

/* ---------- Paint the solution ---------- */

const LINE_MIN = -9
const LINE_MAX = 9
const lineX = (value: number) => 20 + ((value - LINE_MIN) / (LINE_MAX - LINE_MIN)) * 300

function PaintPlay({ round, language, onAnswer, answered }: RoundProps<PaintRound>) {
    const l = useGameText(language)
    const count = pieceCount(round)
    const [pieces, setPieces] = useState<boolean[]>(Array(count).fill(false))
    const [ends, setEnds] = useState<boolean[]>(round.roots.map(() => false))
    const right = paintRight(round, pieces, ends)
    const shownPieces = answered ? pieces.map((_, piece) => pieceSolves(round, piece)) : pieces
    const shownEnds = answered ? round.roots.map(() => rootSolves(round)) : ends
    const bounds = (piece: number): [number, number] => [piece === 0 ? LINE_MIN : round.roots[piece - 1], piece === round.roots.length ? LINE_MAX : round.roots[piece]]
    const label = (piece: number) => {
        const [from, to] = bounds(piece)
        const left = piece === 0 ? '−∞' : round.hidden && !answered ? '?' : signed(from)
        const rightEnd = piece === round.roots.length ? '+∞' : round.hidden && !answered ? '?' : signed(to)
        return `${left} … ${rightEnd}`
    }
    return (
        <>
            <p className="prop3-prompt">
                {'display' in round
                    ? <>{l(say('Funtzio honen eremua:', 'El dominio de la función:', 'مجال الدالة:', 'The domain of the function:'))}<strong>{formula(`f(x)=${(round as DomainRound).display}`, language)}</strong></>
                    : <strong>{formula(`${polyLatex(round.coefficients)}${relationLatex[round.relation]}0`, language)}</strong>}
            </p>
            <svg className="dbh4-line" viewBox="0 0 340 60" aria-hidden="true">
                <line x1="8" y1="30" x2="332" y2="30" stroke="var(--ink)" strokeWidth="2" />
                {shownPieces.map((on, piece) => {
                    if (!on) return null
                    const [from, to] = bounds(piece)
                    return <line key={piece} x1={lineX(from) + (piece === 0 ? -12 : 0)} y1="30" x2={lineX(to) + (piece === round.roots.length ? 12 : 0)} y2="30" stroke={answered ? GREEN : BLUE} strokeWidth="7" strokeLinecap="round" opacity="0.85" />
                })}
                {round.roots.map((root, index) => (
                    <g key={index}>
                        <circle cx={lineX(root)} cy="30" r="6" fill={shownEnds[index] ? (answered ? GREEN : BLUE) : 'var(--card)'} stroke={answered ? GREEN : BLUE} strokeWidth="2.5" />
                        <text x={lineX(root)} y="54" textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--ink)" direction="ltr">{round.hidden && !answered ? '?' : signed(root)}</text>
                    </g>
                ))}
            </svg>
            {!answered && (
                <>
                    <div className="dbh4-candidates" dir="ltr" role="group" aria-label={l(say('Zatiak', 'Trozos', 'الأجزاء', 'Pieces'))}>
                        {pieces.map((on, piece) => <button key={piece} type="button" aria-pressed={on} className={on ? 'chosen' : ''} onClick={() => setPieces(pieces.map((value, index) => (index === piece ? !value : value)))}>{label(piece)}</button>)}
                    </div>
                    {round.roots.length > 0 && (
                        <div className="dbh4-candidates" dir="ltr" role="group" aria-label={l(say('Erroak', 'Raíces', 'الجذور', 'Roots'))}>
                            {ends.map((on, index) => <button key={index} type="button" aria-pressed={on} className={on ? 'chosen' : ''} onClick={() => setEnds(ends.map((value, other) => (other === index ? !value : value)))}>{`${round.hidden ? '?' : signed(round.roots[index])} ${on ? '●' : '○'}`}</button>)}
                        </div>
                    )}
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{check(language)}</button>
                    </div>
                </>
            )}
            {answered && <RoundVerdict right={right} language={language}>{formula(solutionLatex(round), language)}</RoundVerdict>}
        </>
    )
}

export const PaintSolutionGame = makeGame<PaintRound>({
    rounds: PAINT_ROUNDS,
    rules: [
        say('Zuzena erroetan mozten da. Piztu desberdintza betetzen duten zatiak.', 'La recta se corta en las raíces. Enciende los trozos que cumplen la inecuación.', 'يُقطع المستقيم عند الجذور. أضئ الأجزاء التي تحقق المتباينة.', 'The line is cut at the roots. Switch on the pieces that satisfy the inequality.'),
        say('Erroak barne (●) ≤ edo ≥ denean; kanpo (○) < edo > denean.', 'Las raíces dentro (●) con ≤ o ≥; fuera (○) con < o >.', 'الجذور داخلة (●) مع ≤ أو ≥ وخارجة (○) مع < أو >.', 'Roots in (●) with ≤ or ≥; out (○) with < or >.'),
        say('3. mailan erroak ezkutuan daude: kalkulatu.', 'En el nivel 3 las raíces están ocultas: calcúlalas.', 'في المستوى 3 الجذور مخفية: احسبها.', 'In level 3 the roots are hidden: work them out.')
    ],
    create: createPaintRounds,
    stars: standardStars(PAINT_ROUNDS),
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: PaintPlay
})

export const DomainGame = makeGame<PaintRound>({
    rounds: DOMAIN_ROUNDS,
    rules: [
        say('Erro karratuaren barrukoa ≥ 0; izendatzailea ≠ 0; biak batera, > 0.', 'Lo de dentro de una raíz, ≥ 0; un denominador, ≠ 0; las dos cosas a la vez, > 0.', 'ما تحت الجذر ≥ 0، والمقام ≠ 0، ومعًا > 0.', 'Inside a square root, ≥ 0; a denominator, ≠ 0; both at once, > 0.'),
        say('Zuzena puntu kritikoetan mozten da: piztu eremuko zatiak eta muturrak.', 'La recta se corta en los puntos críticos: enciende los trozos y los extremos del dominio.', 'يُقطع المستقيم عند النقاط الحرجة: أضئ أجزاء المجال وأطرافه.', 'The line is cut at the critical points: switch on the pieces and the ends of the domain.'),
        say('2. eta 3. mailetan puntuak ezkutuan daude: kalkulatu.', 'En los niveles 2 y 3 los puntos están ocultos: calcúlalos.', 'في المستويين 2 و3 النقاط مخفية: احسبها.', 'In levels 2 and 3 the points are hidden: work them out.')
    ],
    create: createDomainRounds,
    stars: standardStars(DOMAIN_ROUNDS),
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: PaintPlay
})

/* ---------- Build the equation ---------- */

const BOX = { xMin: -8, xMax: 8, yMin: -8, yMax: 8 }
const parabola = (b: number, c: number): Point[] => Array.from({ length: 81 }, (_, index) => {
    const x = BOX.xMin + (index * (BOX.xMax - BOX.xMin)) / 80
    return [x, valueAt([1, b, c], x)] as const
})

function BuildPlay({ round, language, onAnswer, answered }: RoundProps<BuildRound>) {
    const l = useGameText(language)
    const [b, setB] = useState(0)
    const [c, setC] = useState(0)
    const right = buildRight(round, b, c)
    const [r1, r2] = round.roots
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Soluzio hauek dituen ekuazioa:', 'La ecuación con estas soluciones:', 'المعادلة التي لها هذان الحلان:', 'The equation with these solutions:'))}
                <strong>{formula(r1 === r2 ? `x=${r1}` : `x_{1}=${r1},\\ x_{2}=${r2}`, language)}{r1 === r2 && ` (${l(say('bikoitza', 'doble', 'مضاعف', 'double'))})`}</strong>
            </p>
            <p className="dbh4-readout" dir="ltr">{formula(`x^{2}${b < 0 ? '-' : '+'}${Math.abs(b)}x${c < 0 ? '-' : '+'}${Math.abs(c)}=0`, language)}</p>
            {answered && (
                <div className="func2-plane">
                    <Plane box={BOX} cell={18} label={l(say('Parabola', 'Parábola', 'القطع المكافئ', 'Parabola'))}>
                        {(map, clip) => (
                            <g>
                                <PlanePath map={map} points={parabola(b, c)} color={right ? GREEN : RED} clip={clip} />
                                {round.roots.map((root) => <PlanePoint key={root} map={map} point={[root, 0]} color={GREEN} radius={6} />)}
                            </g>
                        )}
                    </Plane>
                </div>
            )}
            {!answered && (
                <div className="solids2-controls">
                    <Stepper label="b" value={b} min={-B_LIMIT} max={B_LIMIT} format={signed} onChange={setB} language={language} />
                    <input type="range" min={-C_LIMIT} max={C_LIMIT} value={c} onChange={(event) => setC(Number(event.target.value))} aria-label="c" />
                    <Stepper label="c" value={c} min={-C_LIMIT} max={C_LIMIT} format={signed} onChange={setC} language={language} />
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{check(language)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(`b=-(x_{1}+x_{2})=${-(r1 + r2)},\\ c=x_{1}\\cdot x_{2}=${r1 * r2}`, language)}
                </RoundVerdict>
            )}
        </>
    )
}

export const BuildEquationGame = makeGame<BuildRound>({
    rounds: BUILD_ROUNDS,
    rules: [
        say('$x^{2}+bx+c=0$ ekuazioan: $b=-(x_{1}+x_{2})$ eta $c=x_{1}\\cdot x_{2}$.', 'En $x^{2}+bx+c=0$: $b=-(x_{1}+x_{2})$ y $c=x_{1}\\cdot x_{2}$.', 'في $x^{2}+bx+c=0$: $b=-(x_{1}+x_{2})$ و$c=x_{1}\\cdot x_{2}$.', 'In $x^{2}+bx+c=0$: $b=-(x_{1}+x_{2})$ and $c=x_{1}\\cdot x_{2}$.'),
        say('Jarri b eta c, eta egiaztatu: parabolak non mozten duen ikusiko duzu.', 'Pon b y c, y comprueba: verás dónde corta la parábola.', 'ضع b وc وتحقّق: سترى أين يقطع القطع المكافئ.', 'Set b and c, then check: you will see where the parabola crosses.'),
        say(`${BUILD_ROUNDS} ekuazio maila bakoitzean.`, `${BUILD_ROUNDS} ecuaciones por nivel.`, `${BUILD_ROUNDS} معادلات في كل مستوى.`, `${BUILD_ROUNDS} equations per level.`)
    ],
    create: createBuildRounds,
    stars: standardStars(BUILD_ROUNDS),
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: BuildPlay
})

/* ---------- The crossing point ---------- */

const CROSS_BOX = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }

function CrossPlay({ round, language, onAnswer, answered }: RoundProps<CrossRound>) {
    const l = useGameText(language)
    const [point, setPoint] = useState<Point | null>(null)
    const right = point !== null && point[0] === round.point[0] && point[1] === round.point[1]
    const linePoints = (index: 0 | 1): Point[] => [CROSS_BOX.xMin - 1, CROSS_BOX.xMax + 1].map((x) => [x, lineAt(round.lines[index], x)] as const)
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Sakatu sistemaren soluzioa den puntua:', 'Pulsa el punto que resuelve el sistema:', 'اضغط النقطة التي تحل النظام:', 'Tap the point that solves the system:'))}
                <strong>{formula(`\\begin{cases}${equationLatex(round.lines[0], round.explicit)}\\\\${equationLatex(round.lines[1], round.explicit)}\\end{cases}`, language)}</strong>
            </p>
            <div className="func2-plane">
                <Plane box={CROSS_BOX} cell={22} label={l(say('Planoa', 'Plano', 'المستوى', 'Grid'))} onPick={answered ? undefined : (picked) => setPoint(picked)}>
                    {(map, clip) => (
                        <g>
                            {answered && <PlanePath map={map} points={linePoints(0)} color={BLUE} clip={clip} />}
                            {answered && <PlanePath map={map} points={linePoints(1)} color="var(--coral, #d9502e)" clip={clip} />}
                            {point && <PlanePoint map={map} point={point} color={answered ? (right ? GREEN : RED) : BLUE} radius={7} />}
                            {answered && !right && <PlanePoint map={map} point={round.point} color={GREEN} radius={7} />}
                        </g>
                    )}
                </Plane>
            </div>
            <p className="dbh4-readout" dir="ltr">{point ? formula(`(${point[0]},\\,${point[1]})`, language) : '—'}</p>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={!point} onClick={() => onAnswer(right)}>{check(language)}</button>
                </div>
            )}
            {answered && <RoundVerdict right={right} language={language}>{formula(`x=${round.point[0]},\\ y=${round.point[1]}`, language)}</RoundVerdict>}
        </>
    )
}

export const CrossingPointGame = makeGame<CrossRound>({
    rounds: CROSS_ROUNDS,
    rules: [
        say('Ekuazio bakoitza zuzen bat da: soluzioa bi zuzenak mozten diren puntua da.', 'Cada ecuación es una recta: la solución es el punto donde se cortan.', 'كل معادلة مستقيم: الحل هو نقطة تقاطعهما.', 'Each equation is a line: the solution is the point where they cross.'),
        say('Kalkulatu, sakatu puntua eta egiaztatu: orduan agertuko dira zuzenak.', 'Calcula, pulsa el punto y comprueba: entonces aparecerán las rectas.', 'احسب واضغط النقطة وتحقّق: عندها يظهر المستقيمان.', 'Work it out, tap the point and check: then the lines appear.'),
        say(`${CROSS_ROUNDS} sistema maila bakoitzean.`, `${CROSS_ROUNDS} sistemas por nivel.`, `${CROSS_ROUNDS} أنظمة في كل مستوى.`, `${CROSS_ROUNDS} systems per level.`)
    ],
    create: createCrossRounds,
    stars: standardStars(CROSS_ROUNDS),
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: CrossPlay
})

/** The art of the four games */
export function EquationArt({ game }: { game: 'check' | 'paint' | 'build' | 'cross' }) {
    if (game === 'paint') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="10" y1="64" x2="210" y2="64" stroke="var(--ink)" strokeWidth="2.5" />
                <line x1="10" y1="64" x2="70" y2="64" stroke={BLUE} strokeWidth="8" strokeLinecap="round" />
                <line x1="150" y1="64" x2="210" y2="64" stroke={BLUE} strokeWidth="8" strokeLinecap="round" />
                <circle cx="70" cy="64" r="8" fill="var(--card)" stroke={BLUE} strokeWidth="3" />
                <circle cx="150" cy="64" r="8" fill="var(--card)" stroke={BLUE} strokeWidth="3" />
                <text x="110" y="34" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">x² − 9 &gt; 0</text>
            </svg>
        )
    }
    if (game === 'cross') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="30" y1="104" x2="190" y2="16" stroke={BLUE} strokeWidth="4" />
                <line x1="30" y1="24" x2="190" y2="100" stroke="var(--coral)" strokeWidth="4" />
                <circle cx="110" cy="60" r="9" fill="var(--success, #267b53)" stroke="var(--ink)" strokeWidth="2" />
            </svg>
        )
    }
    if (game === 'build') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="10" y1="70" x2="210" y2="70" stroke="var(--ink)" strokeWidth="2" />
                <path d="M 50 14 Q 110 150 170 14" fill="none" stroke={BLUE} strokeWidth="4" />
                <circle cx="76" cy="70" r="6" fill="var(--success, #267b53)" />
                <circle cx="144" cy="70" r="6" fill="var(--success, #267b53)" />
                <text x="110" y="112" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x² + bx + c = 0</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <text x="110" y="40" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">√(x + 7) = x + 1</text>
            <rect x="40" y="62" width="60" height="36" rx="8" fill="var(--success-tint, #d9efe2)" stroke="var(--ink)" strokeWidth="2" />
            <text x="70" y="86" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x = 2</text>
            <rect x="120" y="62" width="60" height="36" rx="8" fill="var(--coral-tint, #f6d5cc)" stroke="var(--ink)" strokeWidth="2" />
            <text x="150" y="86" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">x = −3</text>
        </svg>
    )
}
