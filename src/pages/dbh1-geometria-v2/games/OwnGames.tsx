import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { AREA_ROUNDS, createAreaRounds, GRID, type AreaRound, type Point } from './areaRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   Areas on the grid (1. DBH plane geometry): choose the area of the shape;
   then it turns into the rectangle or parallelogram it comes from.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CELL = 30
const [LEFT, TOP] = [20, 16]
const at = ([x, y]: Point) => `${LEFT + x * CELL},${TOP + y * CELL}`
const polygon = (points: Point[]) => points.map(at).join(' ')
const GREEN = 'var(--success, #267b53)'

/** The shape it comes from: the rectangle under a parallelogram, two triangles, two trapezoids, the box of a rhombus */
function source(round: AreaRound): Point[] | null {
    const { kind, points, base } = round
    if (kind === 'parallelogram') {
        const [topLeft, , , bottomLeft] = points
        return [[topLeft[0], topLeft[1]], [topLeft[0] + base, topLeft[1]], [topLeft[0] + base, bottomLeft[1]], [topLeft[0], bottomLeft[1]]]
    }
    if (kind === 'triangle') {
        const [left, right, apex] = points
        return apex[0] + base <= GRID.columns ? [left, right, [apex[0] + base, apex[1]], apex] : [left, right, apex, [apex[0] - base, apex[1]]]
    }
    if (kind === 'trapezoid') {
        const [topLeft, topRight, bottomRight, bottomLeft] = points
        const top = topRight[0] - topLeft[0]
        return [topLeft, [topRight[0] + base, topRight[1]], [bottomRight[0] + top, bottomRight[1]], bottomLeft]
    }
    if (kind === 'rhombus') {
        const [up, right, down, left] = points
        return [[left[0], up[1]], [right[0], up[1]], [right[0], down[1]], [left[0], down[1]]]
    }
    return null
}

function GridShape({ round, answered }: { round: AreaRound; answered: boolean }) {
    const { columns, rows } = GRID
    const from = answered ? source(round) : null
    const [apex] = round.kind === 'triangle' ? [round.points[2]] : [null]
    return (
        <svg className="dbh4-scene" viewBox={`0 0 ${LEFT * 2 + columns * CELL} ${TOP * 2 + rows * CELL}`} direction="ltr" aria-hidden="true">
            {Array.from({ length: columns + 1 }, (_, index) => <line key={`v${index}`} x1={LEFT + index * CELL} y1={TOP} x2={LEFT + index * CELL} y2={TOP + rows * CELL} stroke="var(--line, #d6cfc2)" strokeWidth="1" />)}
            {Array.from({ length: rows + 1 }, (_, index) => <line key={`h${index}`} x1={LEFT} y1={TOP + index * CELL} x2={LEFT + columns * CELL} y2={TOP + index * CELL} stroke="var(--line, #d6cfc2)" strokeWidth="1" />)}
            {from && <polygon className="dbh1-source" points={polygon(from)} fill="var(--success-tint, #d9efe2)" fillOpacity="0.6" stroke={GREEN} strokeWidth="2.5" strokeDasharray="7 4" />}
            <polygon points={polygon(round.points)} fill="var(--blue-tint, #dde7f7)" fillOpacity="0.85" stroke="var(--ink, #1d2733)" strokeWidth="2.5" />
            {apex && <line x1={LEFT + apex[0] * CELL} y1={TOP + apex[1] * CELL} x2={LEFT + apex[0] * CELL} y2={TOP + round.points[0][1] * CELL} stroke="var(--coral, #d9502e)" strokeWidth="2" strokeDasharray="5 4" />}
            {apex && (apex[0] < round.points[0][0] || apex[0] > round.points[1][0]) && <line x1={LEFT + Math.min(apex[0], round.points[0][0]) * CELL} y1={TOP + round.points[0][1] * CELL} x2={LEFT + Math.max(apex[0], round.points[1][0]) * CELL} y2={TOP + round.points[0][1] * CELL} stroke="var(--coral, #d9502e)" strokeWidth="2" strokeDasharray="5 4" />}
        </svg>
    )
}

function AreaPlay({ round, language, onAnswer, answered }: RoundProps<AreaRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const { kind, base, height, top, area } = round
    const worked = kind === 'rectangle' || kind === 'parallelogram'
        ? `A=${base}\\cdot ${height}=${area}`
        : kind === 'triangle' || kind === 'rhombus'
            ? `A=\\frac{${base}\\cdot ${height}}{2}=${area}`
            : `A=\\frac{(${base}+${top})\\cdot ${height}}{2}=${area}`
    const why: Record<AreaRound['kind'], LocalizedText> = {
        rectangle: say('Oinarria bider altuera.', 'Base por altura.', 'القاعدة في الارتفاع.', 'Base times height.'),
        parallelogram: say('Triangelu bat mugituta laukizuzen bat da: oinarria bider altuera, ez alde okertua.', 'Moviendo un triángulo es un rectángulo: base por altura, no por el lado inclinado.', 'بنقل مثلث يصير مستطيلًا: القاعدة في الارتفاع لا في الضلع المائل.', 'Moving a triangle makes it a rectangle: base times height, not the slanted side.'),
        triangle: say('Bi triangelu berdinek paralelogramo bat osatzen dute: horren erdia.', 'Dos triángulos iguales forman un paralelogramo: es la mitad.', 'مثلثان متطابقان يكوّنان متوازي أضلاع: المثلث نصفه.', 'Two equal triangles make a parallelogram: it is half of it.'),
        rhombus: say('Erronboa diagonalen laukizuzenaren erdia da.', 'El rombo es la mitad del rectángulo de sus diagonales.', 'المعين نصف مستطيل قطريه.', 'A rhombus is half the rectangle of its diagonals.'),
        trapezoid: say('Bi trapezio berdinek paralelogramo bat osatzen dute, oinarria $B+b$.', 'Dos trapecios iguales forman un paralelogramo de base $B+b$.', 'شبها منحرف متطابقان يكوّنان متوازي أضلاع قاعدته $B+b$.', 'Two equal trapezoids make a parallelogram with base $B+b$.')
    }
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Zein da irudiaren azalera?', '¿Cuál es el área de la figura?', 'ما مساحة الشكل؟', 'What is the area of the shape?'))}
                <span className="dbh4-subprompt">{l(say('Karratutxo bakoitza 1 cm² da.', 'Cada cuadradito es 1 cm².', 'كل مربع صغير 1 سم².', 'Each small square is 1 cm².'))}</span>
            </p>
            <GridShape round={round} answered={answered} />
            <div className="dbh4-candidates" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={answered ? (option === area ? 'found' : option === chosen ? 'missed' : '') : ''} onClick={() => {
                        setChosen(option)
                        onAnswer(option === area)
                    }}>
                        {`${option} cm²`}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen === area} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(`${worked}\\ \\text{cm}^{2}`, language)}</span>
                    <MathText text={l(why[kind])} inline />
                </RoundVerdict>
            )}
        </>
    )
}

export function AreaGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: AREA_ROUNDS,
                rules: [
                    say('Kontatu karratutxoak oinarrian eta altueran: altuera zuzena da, oinarriarekiko perpendikularra.', 'Cuenta cuadraditos en la base y en la altura: la altura es recta, perpendicular a la base.', 'عدّ المربعات في القاعدة والارتفاع: الارتفاع عمودي على القاعدة.', 'Count squares along the base and the height: the height is perpendicular to the base.'),
                    say('Triangelua, erronboa eta trapezioa: zatitu $2$-z.', 'Triángulo, rombo y trapecio: entre $2$.', 'المثلث والمعين وشبه المنحرف: نقسم على $2$.', 'Triangle, rhombus and trapezoid: divide by $2$.'),
                    say('Aukeratu azalera: gero, irudia nondik datorren.', 'Elige el área: luego, de dónde sale la figura.', 'اختر المساحة: ثم من أين يأتي الشكل.', 'Choose the area: then where the shape comes from.')
                ],
                create: createAreaRounds,
                stars: standardStars(AREA_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: AreaPlay
            }}
        />
    )
}

/** The art of areas on the grid: a triangle and the parallelogram it is half of */
export function AreaArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {Array.from({ length: 11 }, (_, index) => <line key={`v${index}`} x1={10 + index * 20} y1="10" x2={10 + index * 20} y2="110" stroke="var(--line, #d6cfc2)" strokeWidth="1" />)}
            {Array.from({ length: 6 }, (_, index) => <line key={`h${index}`} x1="10" y1={10 + index * 20} x2="210" y2={10 + index * 20} stroke="var(--line, #d6cfc2)" strokeWidth="1" />)}
            <polygon points="30,90 110,90 170,30 90,30" fill="var(--success-tint, #d9efe2)" stroke="var(--success, #267b53)" strokeWidth="2.5" strokeDasharray="6 4" />
            <polygon points="30,90 110,90 90,30" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.5" />
        </svg>
    )
}
