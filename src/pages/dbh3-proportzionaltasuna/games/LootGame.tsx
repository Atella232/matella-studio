import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Proportion3GameArt } from './GameArt'
import { proportion3Games } from './info'
import { createLootRounds, LOOT_ROUNDS, lootSolved, lootStars, startingPiles, type LootRound } from './loot'
import './Games.css'

const game = proportion3Games.find((item) => item.id === 'loot')!

const PIRATES = ['Ana', 'Iker', 'Leire']

export function LootGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<LootRound[]>([])
    const [index, setIndex] = useState(0)
    const [piles, setPiles] = useState<number[]>([])
    const [checked, setChecked] = useState(false)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        const next = createLootRounds(createRandom(randomSeed()), nextLevel)
        setLevel(nextLevel)
        setRounds(next)
        setIndex(0)
        setPiles(startingPiles(next[0]))
        setChecked(false)
        setResults([])
        setPhase('playing')
    }

    const change = (position: number, delta: number) => {
        if (checked) return
        setPiles(piles.map((pile, other) => (other === position ? Math.max(0, Math.min(round.total, pile + delta)) : pile)))
    }

    const check = () => {
        setChecked(true)
        setResults([...results, lootSolved(round, piles)])
    }

    const next = () => {
        if (index + 1 >= LOOT_ROUNDS) {
            onResult(level, { stars: lootStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setPiles(startingPiles(rounds[index + 1]))
        setChecked(false)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Proportion3GameArt game="loot" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${LOOT_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Txanponak banatu behar dira. Egun gehiago lan egin duenak gehiago jasotzen du; akats gehiago egin duenak, gutxiago.', es: 'Hay que repartir las monedas. Quien trabajó más días recibe más; quien tuvo más fallos, menos.', en: 'The coins have to be shared out. Whoever worked more days gets more; whoever made more mistakes gets less.', ar: 'يجب توزيع العملات. من عمل أيامًا أكثر يأخذ أكثر، ومن أخطأ أكثر يأخذ أقل.' })}</li>
                        <li>{l({ eu: 'Ezarri pila bakoitza − eta + botoiekin, eta egiaztatu behin.', es: 'Ajusta cada montón con − y +, y comprueba una sola vez.', en: 'Set each pile with − and +, and check once.', ar: 'اضبط كل كومة بالزرين − و+ ثم تحقق مرة واحدة.' })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="prop3-game">
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={lootStars(score)}
                    title={`${score} / ${LOOT_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 5 asmatu · 2 izar: 4 · izar 1: 3', es: '3 estrellas: 5 aciertos · 2: 4 · 1: 3', en: '3 stars: 5 correct · 2: 4 · 1: 3', ar: '3 نجوم: 5 إجابات صحيحة · 2: 4 · 1: 3' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${LOOT_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const inverse = round.kind === 'inverse'
    const sum = piles.reduce((a, b) => a + b, 0)
    const right = checked && lootSolved(round, piles)
    const weightsText = round.weights.join(' + ')
    const parts = round.weights.reduce((a, b) => a + b, 0)
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {LOOT_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: LOOT_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt">
                <strong>{l({ eu: `${round.total} txanpon`, es: `${round.total} monedas`, en: `${round.total} coins`, ar: `${round.total} عملة` })}</strong>
                {inverse
                    ? l({ eu: 'Akatsekiko alderantziz proportzionalean: akats gutxiago, txanpon gehiago.', es: 'Inversamente proporcional a los fallos: menos fallos, más monedas.', en: 'In inverse proportion to the mistakes: fewer mistakes, more coins.', ar: 'عكسيًا مع الأخطاء: أخطاء أقل، عملات أكثر.' })
                    : l({ eu: 'Lan egindako egunekiko zuzenki proportzionalean.', es: 'Directamente proporcional a los días trabajados.', en: 'In direct proportion to the days worked.', ar: 'طرديًا مع أيام العمل.' })}
            </p>
            <div className="prop3-piles">
                {round.numbers.map((value, position) => (
                    <div key={position} className={`prop3-pile ${checked ? (piles[position] === round.shares[position] ? 'right' : 'wrong') : ''}`}>
                        <span>{PIRATES[position]}</span>
                        <small>{inverse
                            ? l({ eu: `${value} akats`, es: `${value} ${value === 1 ? 'fallo' : 'fallos'}`, en: `${value} ${value === 1 ? 'mistake' : 'mistakes'}`, ar: `${value} أخطاء` })
                            : l({ eu: `${value} egun`, es: `${value} días`, en: `${value} days`, ar: `${value} أيام` })}</small>
                        <strong>{piles[position]}</strong>
                        <div className="prop3-pile-row">
                            <button type="button" aria-label={`− ${PIRATES[position]}`} disabled={checked || piles[position] <= 0} onClick={() => change(position, -round.step)}>−</button>
                            <button type="button" aria-label={`+ ${PIRATES[position]}`} disabled={checked || piles[position] >= round.total} onClick={() => change(position, round.step)}>+</button>
                        </div>
                        {checked && piles[position] !== round.shares[position] && <small>{`→ ${round.shares[position]}`}</small>}
                    </div>
                ))}
            </div>
            <p className={`prop3-sum ${sum > round.total ? 'over' : ''}`}>{l({ eu: `Guztira: ${sum} / ${round.total}`, es: `Total: ${sum} / ${round.total}`, en: `Total: ${sum} / ${round.total}`, ar: `المجموع: \u2066${sum} / ${round.total}\u2069` })}</p>
            {!checked && <button type="button" className="fraction-v2-primary" onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>}
            {checked && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Bidezko banaketa!', es: '¡Reparto justo!', en: 'A fair share!', ar: 'توزيع عادل!' }) : l({ eu: 'Ez da bidezkoa.', es: 'No es justo.', en: 'It is not fair.', ar: 'ليس عادلًا.' })}</strong></p>
                    <p>{inverse
                        ? l({ eu: `Alderantzizkoak, zatiki gabe: ${weightsText} = ${parts} zati. Zati bat: ${round.total} : ${parts} = ${round.unit}.`, es: `Inversos sin fracciones: ${weightsText} = ${parts} partes. Una parte: ${round.total} : ${parts} = ${round.unit}.`, en: `Reciprocals without fractions: ${weightsText} = ${parts} parts. One part: ${round.total} ÷ ${parts} = ${round.unit}.`, ar: `المقلوبات دون كسور: ${weightsText} = ${parts} أجزاء. الجزء: ${round.total} ÷ ${parts} = ${round.unit}.` })
                        : l({ eu: `${weightsText} = ${parts} zati. Zati bat: ${round.total} : ${parts} = ${round.unit}.`, es: `${weightsText} = ${parts} partes. Una parte: ${round.total} : ${parts} = ${round.unit}.`, en: `${weightsText} = ${parts} parts. One part: ${round.total} ÷ ${parts} = ${round.unit}.`, ar: `${weightsText} = ${parts} أجزاء. الجزء: ${round.total} ÷ ${parts} = ${round.unit}.` })}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= LOOT_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
