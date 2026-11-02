import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import { toLatex } from '../../features/unit-v2/math/fraction'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { standardStars } from './equations'
import { branch, cellValue, COLOUR_NAMES, createTableRounds, createTreeRounds, eventProbability, eventText, leafProbability, TABLE_CONTEXTS, TABLE_ROUNDS, tableAnswer, tableQuestionLatex, totalValue, TREE_ROUNDS, type Cell, type Total, type TableRound, type TreeRound } from './probability'
import './Dbh4Games.css'

/* ==========================================================================
   The paths of the tree and The contingency table (4. DBH academic
   probability): choose the leaves or the cells first; then the products of
   the branches, or the fraction, are worked out.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const BLUE = 'var(--blue, #2f5fb3)'
const BALL_COLOURS = ['#d9502e', '#2f5fb3', '#2f8f5b']
/** The first letter of each colour in the language, written on the balls */
const initial = (colour: number, language: UnitLanguage) => COLOUR_NAMES[colour][language].charAt(0).toUpperCase()
/** A fraction as plain text for the drawing: 3/7 */
const plainFraction = (latex: string) => latex.replace(/\\frac\{(\d+)\}\{(\d+)\}/, '$1/$2')

/* ---------- The paths of the tree ---------- */

function Ball({ x, y, colour, language, size = 9 }: { x: number; y: number; colour: number; language: UnitLanguage; size?: number }) {
    return (
        <g>
            <circle cx={x} cy={y} r={size} fill={BALL_COLOURS[colour]} stroke={INK} strokeWidth="1.5" />
            <text x={x} y={y + size * 0.45} textAnchor="middle" fontSize={size * 1.15} fontWeight="700" fill="#fff">{initial(colour, language)}</text>
        </g>
    )
}

function TreeScene({ round, selected, onToggle, answered, language }: { round: TreeRound; selected: string[]; onToggle: (leaf: string) => void; answered: boolean; language: UnitLanguage }) {
    const colours = round.counts.length
    const gap = colours === 3 ? 24 : 34
    const top = 60
    const leafY = (first: number, second: number) => top + (first * colours + second) * gap + gap / 2
    const firstY = (first: number) => top + first * colours * gap + (colours * gap) / 2
    const height = top + colours * colours * gap + 10
    const bag = round.counts.flatMap((count, colour) => Array<number>(count).fill(colour))
    return (
        <svg className="dbh4-scene" viewBox={`0 0 320 ${height}`} direction="ltr" role="group">
            {bag.map((colour, index) => <Ball key={index} x={18 + index * 21} y={22} colour={colour} language={language} size={8} />)}
            <circle cx="24" cy={(top + height - 10) / 2} r="5" fill={INK} />
            {round.counts.map((_, first) => (
                <g key={first}>
                    <line x1="24" y1={(top + height - 10) / 2} x2="104" y2={firstY(first)} stroke={INK} strokeWidth="1.8" />
                    <text x="60" y={((top + height - 10) / 2 + firstY(first)) / 2 - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill={BLUE}>{plainFraction(toLatex(branch(round, first)))}</text>
                    <Ball x={114} y={firstY(first)} colour={first} language={language} />
                    {round.counts.map((__, second) => {
                        const leaf = `${first}-${second}`
                        const y = leafY(first, second)
                        const isRight = round.right.includes(leaf)
                        const isChosen = selected.includes(leaf)
                        const ring = answered ? (isRight ? GREEN : isChosen ? RED : 'transparent') : isChosen ? BLUE : 'transparent'
                        return (
                            <g
                                key={second}
                                className={answered ? undefined : 'dbh4-leaf'}
                                role="button"
                                tabIndex={answered ? -1 : 0}
                                aria-pressed={isChosen}
                                aria-label={`${COLOUR_NAMES[first][language]}, ${COLOUR_NAMES[second][language]}`}
                                onClick={answered ? undefined : () => onToggle(leaf)}
                                onKeyDown={answered ? undefined : (event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault()
                                        onToggle(leaf)
                                    }
                                }}
                            >
                                <line x1="124" y1={firstY(first)} x2="190" y2={y} stroke={INK} strokeWidth="1.5" />
                                {/* One label per leaf row, at the end of its branch, so close branches do not overlap */}
                                <text x="178" y={y + 4} textAnchor="end" fontSize="11" fontWeight="700" fill={BLUE} stroke="var(--card, #fffcf6)" strokeWidth="3" paintOrder="stroke">{plainFraction(toLatex(branch(round, first, second)))}</text>
                                <rect x="184" y={y - gap / 2 + 2} width={answered ? 132 : 60} height={gap - 4} rx="8" fill={answered && isRight ? 'var(--success-tint, #d9efe2)' : isChosen ? 'var(--blue-tint, #dde7f7)' : 'var(--card, #fffcf6)'} stroke={ring === 'transparent' ? 'var(--line, #d6cfc2)' : ring} strokeWidth={ring === 'transparent' ? 1.2 : 2.6} />
                                <Ball x={200} y={y} colour={first} language={language} size={colours === 3 ? 7.5 : 9} />
                                <Ball x={224} y={y} colour={second} language={language} size={colours === 3 ? 7.5 : 9} />
                                {answered && <text x="244" y={y + 4} fontSize="12" fontWeight="700" fill={INK}>{plainFraction(toLatex(leafProbability(round, leaf)))}</text>}
                            </g>
                        )
                    })}
                </g>
            ))}
        </svg>
    )
}

function TreePlay({ round, language, onAnswer, answered }: RoundProps<TreeRound>) {
    const l = useGameText(language)
    const [selected, setSelected] = useState<string[]>([])
    const right = selected.length === round.right.length && round.right.every((leaf) => selected.includes(leaf))
    const toggle = (leaf: string) => setSelected((previous) => (previous.includes(leaf) ? previous.filter((value) => value !== leaf) : [...previous, leaf]))
    // Many leaves: their values only, so the line fits on a phone
    const products = round.right.map((leaf) => {
        const [first, second] = leaf.split('-').map(Number)
        return round.right.length > 3 ? toLatex(leafProbability(round, leaf)) : `${toLatex(branch(round, first))}\\cdot ${toLatex(branch(round, first, second))}`
    })
    const event = eventText(round)
    return (
        <>
            <p className="prop3-prompt">
                {round.replace
                    ? l(say('Poltsatik bi bola ateratzen dira, lehena itzulita.', 'Se sacan dos bolas de la bolsa, devolviendo la primera.', 'نسحب كرتين من الكيس مع إرجاع الأولى.', 'Two balls are drawn from the bag, putting the first back.'))
                    : l(say('Poltsatik bi bola ateratzen dira, itzuli gabe.', 'Se sacan dos bolas de la bolsa, sin devolver.', 'نسحب كرتين من الكيس دون إرجاع.', 'Two balls are drawn from the bag, without putting back.'))}
                <span className="dbh4-subprompt">{l(say(`Ukitu gertaera hau osatzen duten adarrak: ${event.eu}.`, `Toca las ramas que forman el suceso: ${event.es}.`, `المس فروع الحدث: ${event.ar}.`, `Tap the branches that make up the event: ${event.en}.`))}</span>
            </p>
            <TreeScene round={round} selected={selected} onToggle={toggle} answered={answered} language={language} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={selected.length === 0} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`P=${products.join('+')}`, language)}</span>
                    <span className="dbh4-worked">{formula(`P=${toLatex(eventProbability(round))}`, language)}</span>
                    {l(say('Adar bateko probabilitateak biderkatu; adarrak batu.', 'Se multiplica a lo largo de cada rama y se suman las ramas.', 'نضرب على طول كل فرع ونجمع الفروع.', 'Multiply along each branch and add the branches.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function TreePathsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TREE_ROUNDS,
                rules: [
                    say('Hosto bakoitza emaitza bat da: lehen bola eta bigarrena.', 'Cada hoja es un resultado: la primera bola y la segunda.', 'كل ورقة نتيجة: الكرة الأولى والثانية.', 'Each leaf is an outcome: the first ball and the second.'),
                    say('Itzuli gabe, bigarren adarretan bola bat gutxiago dago.', 'Sin devolución, en las segundas ramas hay una bola menos.', 'دون إرجاع تكون في الفروع الثانية كرة أقل.', 'Without putting back, the second branches have one ball fewer.'),
                    say('Ukitu gertaerako hosto guztiak eta egiaztatu: gero probabilitateak.', 'Toca todas las hojas del suceso y comprueba: luego, las probabilidades.', 'المس كل أوراق الحدث وتحقّق: ثم الاحتمالات.', 'Tap every leaf of the event and check: then the probabilities.')
                ],
                create: createTreeRounds,
                stars: standardStars(TREE_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TreePlay
            }}
        />
    )
}

/* ---------- The contingency table ---------- */

function TablePlay({ round, language, onAnswer, answered }: RoundProps<TableRound>) {
    const l = useGameText(language)
    const [cells, setCells] = useState<Cell[]>([])
    const [total, setTotal] = useState<Total | null>(null)
    const right = total === round.denominator && cells.length === round.numerator.length && round.numerator.every((cell) => cells.includes(cell))
    const context = TABLE_CONTEXTS[round.context]
    const toggle = (cell: Cell) => !answered && setCells((previous) => (previous.includes(cell) ? previous.filter((value) => value !== cell) : [...previous, cell]))
    const cellClass = (cell: Cell) => {
        const chosen = cells.includes(cell)
        if (!answered) return chosen ? 'chosen' : ''
        return round.numerator.includes(cell) ? 'found' : chosen ? 'missed' : ''
    }
    const totalClass = (value: Total) => (!answered ? (total === value ? 'chosen' : '') : value === round.denominator ? 'found' : total === value ? 'missed' : '')
    const rowName = (index: 0 | 1) => `${index === 0 ? context.rowLetter : `\\overline{${context.rowLetter}}`}`
    const columnName = (index: 0 | 1) => `${index === 0 ? context.columnLetter : `\\overline{${context.columnLetter}}`}`
    const numeratorSum = cells.reduce((sum, cell) => sum + cellValue(round, cell), 0)
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Pertsona bat zoriz aukeratzen da. Kalkulatu:', 'Se elige una persona al azar. Calcula:', 'نختار شخصًا عشوائيًا. احسب:', 'A person is chosen at random. Work out:'))}
                <strong className="dbh4-big-formula">{formula(tableQuestionLatex(round), language)}</strong>
                <span className="dbh4-subprompt">{l(say('Ukitu zenbakitzailearen gelaxkak eta izendatzailearen guztizkoa.', 'Toca las casillas del numerador y el total del denominador.', 'المس خانات البسط ومجموع المقام.', 'Tap the cells of the numerator and the total of the denominator.'))}</span>
            </p>
            <div className="dbh4-table-wrap">
                <table className="dbh4-table">
                    <thead>
                        <tr>
                            <th />
                            {([0, 1] as const).map((column) => <th key={column}>{formula(columnName(column), language)}<small>{l(context.columns[column])}</small></th>)}
                            <th>{l(say('Guztira', 'Total', 'المجموع', 'Total'))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {([0, 1] as const).map((row) => (
                            <tr key={row}>
                                <th>{formula(rowName(row), language)}<small>{l(context.rows[row])}</small></th>
                                {([0, 1] as const).map((column) => {
                                    const cell = `${row}-${column}` as Cell
                                    return <td key={column}><button type="button" disabled={answered} aria-pressed={cells.includes(cell)} className={cellClass(cell)} onClick={() => toggle(cell)}>{cellValue(round, cell)}</button></td>
                                })}
                                <td><button type="button" disabled={answered} aria-pressed={total === `row-${row}`} className={`total ${totalClass(`row-${row}`)}`} onClick={() => setTotal(`row-${row}`)}>{totalValue(round, `row-${row}`)}</button></td>
                            </tr>
                        ))}
                        <tr>
                            <th>{l(say('Guztira', 'Total', 'المجموع', 'Total'))}</th>
                            {([0, 1] as const).map((column) => <td key={column}><button type="button" disabled={answered} aria-pressed={total === `column-${column}`} className={`total ${totalClass(`column-${column}`)}`} onClick={() => setTotal(`column-${column}`)}>{totalValue(round, `column-${column}`)}</button></td>)}
                            <td><button type="button" disabled={answered} aria-pressed={total === 'all'} className={`total ${totalClass('all')}`} onClick={() => setTotal('all')}>{totalValue(round, 'all')}</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="dbh4-readout" dir="ltr">{formula(`${tableQuestionLatex(round)}=\\frac{${cells.length ? numeratorSum : '?'}}{${total ? totalValue(round, total) : '?'}}`, language)}</p>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={cells.length === 0 || total === null} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`${tableQuestionLatex(round)}=\\frac{${round.numerator.map((cell) => cellValue(round, cell)).join('+')}}{${totalValue(round, round.denominator)}}=${toLatex(tableAnswer(round))}`, language)}</span>
                    {round.question === 'given-row' || round.question === 'given-column'
                        ? l(say('Baldintzapeko probabilitatean, izendatzailea baldintzaren guztizkoa da.', 'En la probabilidad condicionada, el denominador es el total de la condición.', 'في الاحتمال الشرطي يكون المقام مجموع الشرط.', 'In a conditional probability, the denominator is the total of the condition.'))
                        : round.question === 'union'
                            ? l(say('Bilketan, gelaxka bakoitza behin bakarrik.', 'En la unión, cada casilla una sola vez.', 'في الاتحاد تُحسب كل خانة مرة واحدة.', 'In the union, each cell only once.'))
                            : l(say('Izendatzailea guztizko orokorra da.', 'El denominador es el total general.', 'المقام هو المجموع الكلي.', 'The denominator is the grand total.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function ContingencyGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TABLE_ROUNDS,
                rules: [
                    say('Laplace: aldeko kasuak zati kasu posibleak.', 'Laplace: casos favorables entre casos posibles.', 'لابلاس: الحالات المواتية على الحالات الممكنة.', 'Laplace: favourable cases over possible cases.'),
                    say('$P(D/A)$: A dutenen artean bakarrik zenbatzen da.', '$P(D/A)$: se cuenta solo entre los que cumplen A.', '$P(D/A)$: نعدّ فقط بين من يحققون A.', '$P(D/A)$: count only among those with A.'),
                    say('Ukitu gelaxkak (zenbakitzailea) eta guztizko bat (izendatzailea), eta egiaztatu.', 'Toca las casillas (numerador) y un total (denominador), y comprueba.', 'المس الخانات (البسط) ومجموعًا (المقام) وتحقّق.', 'Tap the cells (numerator) and one total (denominator), and check.')
                ],
                create: createTableRounds,
                stars: standardStars(TABLE_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TablePlay
            }}
        />
    )
}

/** The art of the probability games */
export function ProbabilityArt({ game }: { game: 'tree' | 'table' }) {
    if (game === 'tree') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <circle cx="24" cy="60" r="6" fill="var(--ink)" />
                {[30, 90].map((y, index) => (
                    <g key={y}>
                        <line x1="24" y1="60" x2="90" y2={y} stroke="var(--ink)" strokeWidth="2.5" />
                        <circle cx="98" cy={y} r="9" fill={BALL_COLOURS[index]} stroke="var(--ink)" strokeWidth="2" />
                        {[y - 14, y + 14].map((leaf, second) => (
                            <g key={leaf}>
                                <line x1="106" y1={y} x2="160" y2={leaf} stroke={index === 0 && second === 0 ? GREEN : 'var(--ink)'} strokeWidth={index === 0 && second === 0 ? 4 : 2} />
                                <circle cx="170" cy={leaf} r="8" fill={BALL_COLOURS[second]} stroke="var(--ink)" strokeWidth="2" />
                            </g>
                        ))}
                    </g>
                ))}
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[0, 1, 2].map((row) => [0, 1, 2].map((column) => (
                <rect key={`${row}-${column}`} x={40 + column * 48} y={14 + row * 32} width="44" height="28" rx="4" fill={row === 0 && column === 0 ? 'var(--success-tint, #d9efe2)' : row === 0 && column === 2 ? 'var(--mustard-tint, #fbebc0)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2" />
            )))}
            <text x="62" y="33" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">9</text>
            <text x="158" y="33" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">15</text>
        </svg>
    )
}
