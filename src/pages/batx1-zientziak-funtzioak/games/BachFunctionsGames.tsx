import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { Plane, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import { say } from '../text'
import './BachFunctionsGames.css'
import { applyChain, chainLatex, machineLabel, type Machine } from './machines'
import { chainOf, chainValues, createOrderRounds, ORDER_ROUNDS, reachesGoal, type OrderRound } from './order'
import { createUndoRounds, undoAnswer, undoes, UNDO_ROUNDS, type UndoRound } from './undo'
import { createWhereRounds, isWherePick, WHERE_BOX, WHERE_ROUNDS, whereWorking, type WhereRound } from './where'

/* ==========================================================================
   ¿Dónde cae el punto?, Ordena las máquinas and Deshaz la máquina
   (Funtzio elementalak, Batxilergoa 1 · Zientziak): the first asks to tap
   on the grid where a point of f goes under y = A·f(Bx + c) + k; the other
   two lay machine cards in a row, to reach a goal or to undo a function.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const RED = 'var(--second, #c4432a)'
const BLUE = 'var(--blue, #2f6fdb)'
const GREEN = 'var(--success, #267b53)'

/* ---------- ¿Dónde cae el punto? ---------- */

function WherePlay({ round, language, onAnswer, answered }: RoundProps<WhereRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<[number, number] | null>(null)
    const right = isWherePick(round, picked)
    const [p, q] = round.point
    const [working, value] = whereWorking(round)
    return (
        <>
            <div className="dbh4-big-formula bach-fn-big" dir="ltr">{formula(round.latex, language)}</div>
            <p className="prop3-prompt"><MathText text={l(say(`$f$ funtzioa $P(${p},${q})$ puntutik pasatzen da. Sakatu P puntutik datorren puntua.`, `$f$ pasa por $P(${p},${q})$. Toca el punto que sale de P.`, `تمر $f$ بالنقطة $P(${p},${q})$. المس النقطة الناتجة عن P.`, `$f$ passes through $P(${p},${q})$. Tap the point that comes from P.`))} /></p>
            <div className="bach-fn-plane">
                <Plane
                    box={{ xMin: -WHERE_BOX, xMax: WHERE_BOX, yMin: -WHERE_BOX, yMax: WHERE_BOX }}
                    cell={22}
                    labelStep={2}
                    maxHeight={340}
                    label={l(say('Sare koordenatua', 'Cuadrícula', 'الشبكة', 'Grid'))}
                    onPick={answered ? undefined : (point) => setPicked([point[0], point[1]])}
                >
                    {(map) => (
                        <g>
                            {answered && <PlanePath map={map} points={[round.point, round.answer]} color={GREEN} width={2} dashed />}
                            <PlanePoint map={map} point={round.point} color={RED} name="P" radius={7} />
                            {picked && <PlanePoint map={map} point={picked} color={answered && !right ? RED : BLUE} radius={7} hollow={!answered || !right} />}
                            {answered && <PlanePoint map={map} point={round.answer} color={GREEN} name="P′" radius={7} />}
                        </g>
                    )}
                </Plane>
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <p className="bach-fn-picked" dir="ltr">{picked ? formula(`(${picked[0]},${picked[1]})`, language) : '—'}</p>
                    <button type="button" className="fraction-v2-primary" disabled={picked === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(working, language)}</span>
                    <span className="dbh4-worked">{formula(value, language)}</span>
                    <span className="dbh4-worked">{formula(`P'(${round.answer[0]},${round.answer[1]})`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function WhereGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WHERE_ROUNDS,
                rules: [
                    say('$f$ funtzioaren puntu bat ematen da, eta funtzio berri bat.', 'Te dan un punto de $f$ y una función nueva.', 'تُعطى نقطة من $f$ ودالة جديدة.', 'You get a point of $f$ and a new function.'),
                    say('Barrukoak $x$ aldatzen du, alderantziz: $x+3$ ezkerrera doa. Kanpokoak $y$ aldatzen du.', 'Lo de dentro cambia la $x$, al revés: $x+3$ va a la izquierda. Lo de fuera cambia la $y$.', 'ما بالداخل يغيّر $x$ بالعكس: $x+3$ تذهب إلى اليسار. وما بالخارج يغيّر $y$.', 'The inside changes $x$, the other way round: $x+3$ goes left. The outside changes $y$.'),
                    say('Sakatu sarean puntu berria, eta egiaztatu.', 'Toca en la cuadrícula el punto nuevo y comprueba.', 'المس النقطة الجديدة على الشبكة وتحقّق.', 'Tap the new point on the grid and check.')
                ],
                create: createWhereRounds,
                stars: standardStars(WHERE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: WherePlay
            }}
        />
    )
}

/* ---------- Machine cards in a row ---------- */

/** The cards to choose from and the row they are laid in; a card in the row goes back when tapped */
function MachineRow({ cards, chosen, size, answered, onChoose, onRemove, language }: {
    cards: Machine[]
    chosen: number[]
    size: number
    answered: boolean
    onChoose: (index: number) => void
    onRemove: (position: number) => void
    language: UnitLanguage
}) {
    const l = useGameText(language)
    return (
        <>
            <div className="bach-fn-row" dir="ltr" role="group" aria-label={l(say('Makinen errenkada', 'La fila de máquinas', 'صف الآلات', 'The row of machines'))}>
                <span className="bach-fn-end">x</span>
                {Array.from({ length: size }, (_, position) => {
                    const index = chosen[position]
                    return (
                        <span key={position} className="bach-fn-slot-wrap">
                            <span className="bach-fn-arrow" aria-hidden="true">→</span>
                            <button type="button" className={`bach-fn-slot${index === undefined ? ' empty' : ''}`} disabled={answered || index === undefined} onClick={() => onRemove(position)}>
                                {index === undefined ? position + 1 : machineLabel(cards[index])}
                            </button>
                        </span>
                    )
                })}
            </div>
            <div className="bach-fn-cards" dir="ltr" role="group" aria-label={l(say('Makinak', 'Máquinas', 'الآلات', 'Machines'))}>
                {cards.map((card, index) => (
                    <button key={index} type="button" className="bach-fn-card" disabled={answered || chosen.includes(index) || chosen.length >= size} onClick={() => onChoose(index)}>
                        {machineLabel(card)}
                    </button>
                ))}
            </div>
        </>
    )
}

/** Choose cards one after another; tapping a placed card takes it and the ones after it back */
function useRow() {
    const [chosen, setChosen] = useState<number[]>([])
    return {
        chosen,
        choose: (index: number) => setChosen((current) => (current.includes(index) ? current : [...current, index])),
        remove: (position: number) => setChosen((current) => current.slice(0, position))
    }
}

/* ---------- Ordena las máquinas ---------- */

function OrderPlay({ round, language, onAnswer, answered }: RoundProps<OrderRound>) {
    const l = useGameText(language)
    const row = useRow()
    const size = round.machines.length
    const right = reachesGoal(round, row.chosen)
    const goodChain = chainOf(round, round.order)
    const prompt = round.formula === null
        ? say(`$x=${round.input}$ sartzen da, eta $${round.target}$ atera behar da. Ordenatu makinak.`, `Entra $x=${round.input}$ y tiene que salir $${round.target}$. Ordena las máquinas.`, `يدخل $x=${round.input}$ ويجب أن يخرج $${round.target}$. رتّب الآلات.`, `$x=${round.input}$ goes in and $${round.target}$ must come out. Put the machines in order.`)
        : say(`Ordenatu makinak, $h(x)=${round.formula}$ eman dezaten.`, `Ordena las máquinas para que den $h(x)=${round.formula}$.`, `رتّب الآلات لتعطي $h(x)=${round.formula}$.`, `Put the machines in order so that they give $h(x)=${round.formula}$.`)
    const yours = chainOf(round, row.chosen)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} /></p>
            <MachineRow cards={round.machines} chosen={row.chosen} size={size} answered={answered} onChoose={row.choose} onRemove={row.remove} language={language} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={row.chosen.length < size} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {round.formula === null
                        ? (
                            <>
                                {!right && <span className="dbh4-worked">{formula(chainValues(yours, round.input ?? 0).join('\\ \\to\\ '), language)}</span>}
                                <span className="dbh4-worked">{formula(chainValues(goodChain, round.input ?? 0).join('\\ \\to\\ '), language)}</span>
                            </>
                        )
                        : (
                            <>
                                {!right && <span className="dbh4-worked">{formula(`${chainLatex(yours)}\\neq ${round.formula}`, language)}</span>}
                                <span className="dbh4-worked bach-fn-chain" dir="ltr">{['x', ...goodChain.map(machineLabel)].join('  →  ')}</span>
                            </>
                        )}
                </RoundVerdict>
            )}
        </>
    )
}

export function OrderGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ORDER_ROUNDS,
                rules: [
                    say('Makina bakoitzak eragiketa bat egiten du, eta lehenengo makina lehenik.', 'Cada máquina hace una operación, y la primera actúa primero.', 'كل آلة تجري عملية، والأولى تعمل أولًا.', 'Each machine does one operation, and the first one acts first.'),
                    say('Sakatu makinak ordenan; errenkadako bat sakatuz gero, itzuli egiten da.', 'Toca las máquinas en orden; si tocas una de la fila, vuelve.', 'المس الآلات بالترتيب؛ وإذا لمست واحدة من الصف تعود.', 'Tap the machines in order; tapping one in the row sends it back.'),
                    say('Ordena bakar batek ematen du emaitza.', 'Solo un orden da el resultado.', 'ترتيب واحد فقط يعطي النتيجة.', 'Only one order gives the result.')
                ],
                create: createOrderRounds,
                stars: standardStars(ORDER_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: OrderPlay
            }}
        />
    )
}

/* ---------- Deshaz la máquina ---------- */

/** The machine labels kept left to right inside any sentence (− 4 stays − 4 in Arabic) */
const isolated = (machines: Machine[]) => machines.map((machine) => `\u2066${machineLabel(machine)}\u2069`)

function UndoPlay({ round, language, onAnswer, answered }: RoundProps<UndoRound>) {
    const l = useGameText(language)
    const row = useRow()
    const size = round.chain.length
    const right = undoes(round, row.chosen)
    const example = 1
    const out = applyChain(round.chain, example)
    const good = undoAnswer(round).map((index) => round.cards[index])
    return (
        <>
            <div className="dbh4-big-formula bach-fn-big" dir="ltr">{formula(`f(x)=${round.formula}`, language)}</div>
            <div className="bach-fn-row bach-fn-given" dir="ltr" aria-hidden="true">
                <span className="bach-fn-end">x</span>
                {round.chain.map((machine, index) => (
                    <span key={index} className="bach-fn-slot-wrap">
                        <span className="bach-fn-arrow">→</span>
                        <span className="bach-fn-slot fixed">{machineLabel(machine)}</span>
                    </span>
                ))}
            </div>
            <p className="prop3-prompt"><MathText text={l(say('Eraiki $f^{-1}$: aukeratu $f$ desegiten duten makinak, ordenan.', 'Construye $f^{-1}$: elige las máquinas que deshacen $f$, en orden.', 'ابنِ $f^{-1}$: اختر الآلات التي تعكس $f$ بالترتيب.', 'Build $f^{-1}$: choose the machines that undo $f$, in order.'))} /></p>
            <MachineRow cards={round.cards} chosen={row.chosen} size={size} answered={answered} onChoose={row.choose} onRemove={row.remove} language={language} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={row.chosen.length < size} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`f^{-1}(x)=${round.inverse}`, language)}</span>
                    <span className="dbh4-worked">{formula(`f(${example})=${Number.isInteger(out) ? out : out.toFixed(2)}\\ \\to\\ f^{-1}(${Number.isInteger(out) ? out : out.toFixed(2)})=${example}`, language)}</span>
                    <span className="dbh4-worked">{l(say(`Desegiteko: ${isolated(good).join(', gero ')}.`, `Para deshacer: ${isolated(good).join(' y después ')}.`, `للعكس: ${isolated(good).join(' ثم ')}.`, `To undo it: ${isolated(good).join(', then ')}.`))}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function UndoGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: UNDO_ROUNDS,
                rules: [
                    say('$f$ makina-kate bat da.', '$f$ es una cadena de máquinas.', '$f$ سلسلة من الآلات.', '$f$ is a chain of machines.'),
                    say('$f^{-1}$ eraikitzeko, desegin azkena lehenik: eragiketa kontrakoak, alderantzizko ordenan.', 'Para construir $f^{-1}$, deshaz primero lo último: operaciones contrarias, en orden inverso.', 'لبناء $f^{-1}$ اعكس آخر عملية أولًا: عمليات معاكسة بترتيب معكوس.', 'To build $f^{-1}$, undo the last one first: opposite operations, in reverse order.'),
                    say('Kontuz: makina batzuk $f$ funtzioarenak dira, ez alderantzizkoarenak.', 'Cuidado: algunas máquinas son las de $f$, no las de la inversa.', 'انتبه: بعض الآلات هي آلات $f$ لا آلات العكسية.', 'Careful: some machines are those of $f$, not of its inverse.')
                ],
                create: createUndoRounds,
                stars: standardStars(UNDO_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: UndoPlay
            }}
        />
    )
}
