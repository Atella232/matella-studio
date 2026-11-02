import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { boxVertices, fitCamera, roundHull, SKY } from '../geometry3d'
import { Cylinder, Solid } from '../solids'
import { createSolidsDetectiveCases, num, SOLIDS_DETECTIVE_CASES, solidsDetectiveNames, solidsDetectiveTips } from './detective'
import { createEulerRounds, EULER_ELEMENTS, EULER_ROUNDS, eulerRight, eulerStars, solidName, type EulerCounts, type EulerElement, type EulerRound } from './euler'
import { SolidsGameArt } from './GameArt'
import { solidsGames, type SolidsGameId } from './info'
import { createTankRounds, TANK_ROUNDS, tankRight, tankStars, type TankRound } from './tank'
import './OwnGames.css'

/* ==========================================================================
   The three games of Gorputz geometrikoak 2. DBH that belong to this
   topic: count and Euler and fill the tank (in the shared RoundGame) and
   the solids detective (the shared worked-solution detective).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const info = (id: SolidsGameId) => solidsGames.find((game) => game.id === id)!
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** Water: a clear blue in both themes */
const WATER = '#7fb0e8'

/* ---------- J1. Count and Euler ---------- */

const ELEMENT_NAMES: Record<EulerElement, LocalizedText> = {
    faces: say('Aurpegiak', 'Caras', 'الأوجه', 'Faces'),
    vertices: say('Erpinak', 'Vértices', 'الرؤوس', 'Vertices'),
    edges: say('Ertzak', 'Aristas', 'الأحرف', 'Edges')
}
/** Euler's formula in words, as in the lessons */
const EULER_WORDS = say('aurpegiak + erpinak = ertzak + 2', 'caras + vértices = aristas + 2', 'الأوجه + الرؤوس = الأحرف + 2', 'faces + vertices = edges + 2')
const eulerLatex = (counts: EulerCounts) => `${counts.faces}+${counts.vertices}=${counts.edges}+2`

function EulerPlay({ round, language, onAnswer, answered }: RoundProps<EulerRound>) {
    const l = useGameText(language)
    const given = round.unknown ? EULER_ELEMENTS.filter((element) => element !== round.unknown) : []
    const [answer, setAnswer] = useState<EulerCounts>({ faces: 4, vertices: 4, edges: 6 })
    const right = eulerRight(round, answer)
    const set = (element: EulerElement, value: number) => !answered && setAnswer({ ...answer, [element]: value })
    const cam = round.vertices.length > 0 ? fitCamera(round.vertices, [30, 16, 210, 164], 90, -0.5, 0.42) : null
    return (
        <>
            <p className="prop3-prompt"><strong>{l(solidName(round))}</strong></p>
            {cam && (
                <svg className="solids2-scene" viewBox="0 0 240 180" role="img" aria-label={l(solidName(round))}>
                    <Solid cam={cam} vertices={round.vertices} fill={SKY} width={2.2} />
                </svg>
            )}
            {round.unknown && (
                <p className="solids2-given">
                    {given.map((element) => <span key={element}>{l(ELEMENT_NAMES[element])}: <strong>{round.counts[element]}</strong></span>)}
                </p>
            )}
            <div className="solids2-steppers">
                {(round.unknown ? [round.unknown] : EULER_ELEMENTS).map((element) => (
                    <Stepper key={element} label={l(ELEMENT_NAMES[element])} value={answer[element]} min={0} max={60} onChange={(value) => set(element, value)} language={language} />
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {EULER_ELEMENTS.map((element) => `${l(ELEMENT_NAMES[element])}: ${round.counts[element]}`).join(' · ')}.{' '}
                    {l(EULER_WORDS)}: {formula(eulerLatex(round.counts), language)}
                </RoundVerdict>
            )}
        </>
    )
}

const eulerConfig: RoundGameConfig<EulerRound> = {
    game: info('euler'),
    art: <SolidsGameArt game="euler" />,
    rounds: EULER_ROUNDS,
    rules: [
        say('Zenbatu aurpegiak, erpinak eta ertzak, ezkutukoak barne (marra etenak).', 'Cuenta las caras, los vértices y las aristas, también las ocultas (a trazos).', 'عُدّ الأوجه والرؤوس والأحرف، بما فيها المخفية (المتقطعة).', 'Count the faces, the vertices and the edges, the hidden ones (dashed) too.'),
        say(`Eulerren formula beti betetzen da poliedro hauetan: ${EULER_WORDS.eu}.`, `En estos poliedros siempre se cumple la fórmula de Euler: ${EULER_WORDS.es}.`, `في هذه المجسمات تتحقق دائمًا صيغة أويلر: ${EULER_WORDS.ar}.`, `Euler’s formula always holds for these polyhedra: ${EULER_WORDS.en}.`),
        say('3. mailan ez dago marrazkirik: erabili formula.', 'En el nivel 3 no hay dibujo: usa la fórmula.', 'في المستوى 3 لا يوجد رسم: استعمل الصيغة.', 'In level 3 there is no drawing: use the formula.')
    ],
    create: createEulerRounds,
    stars: eulerStars,
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: EulerPlay
}

export const EulerGame = (props: GameProps) => <RoundGame {...props} config={eulerConfig} />

/* ---------- J2. Fill the tank ---------- */

/** Box measures for the drawing: proportional, whatever the unit */
function TankScene({ round, litres, poured }: { round: TankRound; litres: number; poured: boolean }) {
    const fraction = poured ? Math.min(litres / round.exact, 1) : 0
    const spills = poured && litres > round.exact * 1.0001 && litres - round.litres >= 1
    if (round.shape === 'box') {
        const [a, b, c] = round.measures
        const scale = 1 / Math.max(a, b, c)
        const [x, y, z] = [a * scale, b * scale, c * scale]
        const outer = boxVertices(x, y, z)
        const cam = fitCamera(outer, [30, 20, 210, 170], 200, -0.5, 0.42)
        return (
            <svg className="solids2-scene" viewBox="0 0 240 190" aria-hidden="true">
                {fraction > 0.02 && <Solid cam={cam} vertices={boxVertices(x, y, z * fraction)} fill={WATER} opacity={0.95} hidden={false} />}
                <Solid cam={cam} vertices={outer} fill="transparent" opacity={0} width={2.2} />
                {spills && <SpillDrops />}
            </svg>
        )
    }
    const [r, , h] = round.measures
    const scale = 1 / Math.max(2 * r, h)
    const cam = fitCamera(roundHull(r * scale, 0, h * scale), [30, 20, 210, 170], 200, -0.5, 0.42)
    return (
        <svg className="solids2-scene" viewBox="0 0 240 190" aria-hidden="true">
            {fraction > 0.02 && <Cylinder cam={cam} r={r * scale} h={h * scale * fraction} fill={WATER} top={WATER} />}
            <Cylinder cam={cam} r={r * scale} h={h * scale} fill="transparent" top="transparent" />
            {spills && <SpillDrops />}
        </svg>
    )
}

function SpillDrops() {
    return (
        <g className="solids2-spill">
            {[[200, 120], [212, 140], [196, 156], [220, 168]].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill={WATER} stroke="var(--blue, #2f5fb3)" strokeWidth="1.5" />)}
        </g>
    )
}

/** The measures as a formula: 50 cm × 30 cm × 40 cm, or r = 1,5 dm, h = 4 dm */
const measuresLatex = (round: TankRound) => {
    const u = `\\ \\text{${round.unit}}`
    if (round.shape === 'box') return round.measures.map((value) => `${num(value)}${u}`).join('\\times ')
    return `r=${num(round.measures[0])}${u},\\ h=${num(round.measures[2])}${u}`
}

/** How the litres come out, for the verdict */
function tankWorked(round: TankRound): string {
    const u = `\\text{${round.unit}}^{3}`
    const [a, b, c] = round.measures
    const volume = round.shape === 'box' ? a * b * c : Math.PI * a * a * c
    const product = round.shape === 'box' ? `${num(a)}\\cdot ${num(b)}\\cdot ${num(c)}` : `\\pi\\cdot ${num(a)}^{2}\\cdot ${num(c)}`
    const approx = round.shape === 'box' ? '=' : '\\approx '
    const litres = `\\ \\to\\ ${round.shape === 'box' ? '' : '\\approx '}${round.litres}\\ \\text{L}`
    return `V=${product}${approx}${num(volume)}\\ ${u}${litres}`
}

function TankPlay({ round, language, onAnswer, answered }: RoundProps<TankRound>) {
    const l = useGameText(language)
    const [litres, setLitres] = useState(0)
    const right = tankRight(round, litres)
    const set = (value: number) => !answered && setLitres(Math.min(round.max, Math.max(0, Math.round(value))))
    return (
        <>
            <p className="prop3-prompt">
                {round.shape === 'box' ? l(say('Depositu prismatikoa', 'Depósito con forma de prisma', 'خزان على شكل منشور', 'A box-shaped tank')) : l(say('Depositu zilindrikoa', 'Depósito cilíndrico', 'خزان أسطواني', 'A cylindrical tank'))}
                <span className="solids2-measures">{formula(measuresLatex(round), language)}</span>
            </p>
            <TankScene round={round} litres={litres} poured={answered} />
            {!answered && (
                <div className="solids2-controls">
                    <input type="range" min={0} max={round.max} step={1} value={litres} onChange={(event) => set(Number(event.target.value))} aria-label={l(say('Litroak', 'Litros', 'اللترات', 'Litres'))} />
                    <Stepper label={l(say('Litroak', 'Litros', 'اللترات', 'Litres'))} value={litres} min={0} max={round.max} format={(value) => `${value} L`} onChange={set} language={language} />
                    <button type="button" className="fraction-v2-primary" disabled={litres === 0} onClick={() => onAnswer(right)}>{l(say('Ireki txorrota', 'Abre el grifo', 'افتح الصنبور', 'Turn on the tap'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(tankWorked(round), language)}{' '}
                    {right
                        ? l(say('Depositua goraino bete da.', 'El depósito se llena justo hasta arriba.', 'امتلأ الخزان حتى حافته تمامًا.', 'The tank fills right to the top.'))
                        : litres > round.litres
                            ? l(say('Ura gainezka egiten du.', 'El agua se desborda.', 'يفيض الماء.', 'The water spills over.'))
                            : l(say('Depositua ez da bete.', 'El depósito no se llena.', 'لا يمتلئ الخزان.', 'The tank is not full.'))}
                    {' '}{round.shape === 'cylinder' && l(say('(Litro osoetara biribilduta.)', '(Redondeado a litros enteros.)', '(مقرّبًا إلى لترات كاملة.)', '(Rounded to whole litres.)'))}
                </RoundVerdict>
            )}
        </>
    )
}

const tankConfig: RoundGameConfig<TankRound> = {
    game: info('tank'),
    art: <SolidsGameArt game="tank" />,
    rounds: TANK_ROUNDS,
    rules: [
        say('Kalkulatu bolumena eta pasatu litrotara: $1\\ \\text{dm}^{3}=1\\ \\text{L}$.', 'Calcula el volumen y pásalo a litros: $1\\ \\text{dm}^{3}=1\\ \\text{L}$.', 'احسب الحجم وحوّله إلى لترات: $1\\ \\text{dm}^{3}=1\\ \\text{L}$.', 'Work out the volume and change it into litres: $1\\ \\text{dm}^{3}=1\\ \\text{L}$.'),
        say('Jarri litroak eta ireki txorrota: orduan bakarrik ikusiko duzu ura.', 'Pon los litros y abre el grifo: solo entonces verás el agua.', 'ضع اللترات وافتح الصنبور: عندها فقط سترى الماء.', 'Set the litres and turn on the tap: only then will you see the water.'),
        say('Zilindroetan, biribildu litro osoetara.', 'En los cilindros, redondea a litros enteros.', 'في الأسطوانات قرّب إلى لترات كاملة.', 'For cylinders, round to whole litres.')
    ],
    create: createTankRounds,
    stars: tankStars,
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: TankPlay
}

export const TankGame = (props: GameProps) => <RoundGame {...props} config={tankConfig} />

/* ---------- J3. The solids detective ---------- */

export const SolidsDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game: info('detective'), art: <SolidsGameArt game="detective" />, cases: SOLIDS_DETECTIVE_CASES, createCases: createSolidsDetectiveCases, names: solidsDetectiveNames, tips: solidsDetectiveTips }}
    />
)
