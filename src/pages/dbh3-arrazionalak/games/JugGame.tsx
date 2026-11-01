import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { compare, toLatex, toNumber } from '../../../features/unit-v2/math/fraction'
import { RationalsGameArt } from './GameArt'
import { rationalsGames } from './info'
import { chosenSum, createJugRounds, isFull, JUG_CAPACITY, JUG_ROUNDS, jugSolutionLatex, jugStars, type JugRound } from './jug'
import './Games.css'

const game = rationalsGames.find((item) => item.id === 'jug')!
/** Cards and sums are read at a glance: full-size fractions */
const big = (latex: string) => latex.replace(/\\frac/g, '\\dfrac')

/** The jug, filled to the sum of the chosen cards; water above the mark spills in red */
function Jug({ round, chosen }: { round: JugRound; chosen: number[] }) {
    const sum = toNumber(chosenSum(round, chosen))
    const target = toNumber(round.target)
    const top = 18
    const bottom = 196
    const Y = (value: number) => bottom - (Math.min(JUG_CAPACITY, Math.max(0, value)) / JUG_CAPACITY) * (bottom - top)
    const level = Y(sum)
    const mark = Y(target)
    return (
        <svg className="rationals-jug" viewBox="0 0 220 210" aria-hidden="true" direction="ltr">
            <defs>
                <clipPath id="rationals-jug-inside"><path d={`M60 ${top} h100 l-8 ${bottom - top} h-84 Z`} /></clipPath>
            </defs>
            <g clipPath="url(#rationals-jug-inside)">
                <rect x={40} y={Math.max(level, mark)} width={140} height={bottom - Math.max(level, mark)} fill="var(--blue-tint, #dde7f7)" />
                {sum > target && <rect x={40} y={level} width={140} height={mark - level} fill="var(--coral-tint, #f6d5cc)" />}
            </g>
            <path d={`M60 ${top} h100 l-8 ${bottom - top} h-84 Z`} fill="none" stroke="var(--ink)" strokeWidth={3} strokeLinejoin="round" />
            <path d={`M160 ${top + 20} q34 6 28 52 q-4 26 -32 30`} fill="none" stroke="var(--ink)" strokeWidth={3} />
            <line x1={50} x2={170} y1={mark} y2={mark} stroke="var(--coral, #c4432a)" strokeWidth={2.4} strokeDasharray="7 5" />
            {[0.5, 1, 1.5].map((value) => <line key={value} x1={50} x2={64} y1={Y(value)} y2={Y(value)} stroke="var(--muted)" strokeWidth={1.4} />)}
            <text x={40} y={Y(1) + 4} textAnchor="middle" fontSize={12} fill="var(--muted)">1</text>
        </svg>
    )
}

export function JugGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<JugRound[]>([])
    const [index, setIndex] = useState(0)
    const [chosen, setChosen] = useState<number[]>([])
    const [checked, setChecked] = useState(false)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createJugRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setChosen([])
        setChecked(false)
        setResults([])
        setPhase('playing')
    }

    const toggle = (id: number) => {
        if (checked) return
        setChosen((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
    }

    const check = () => {
        if (checked || chosen.length === 0) return
        setChecked(true)
        setResults([...results, isFull(round, chosen)])
    }

    const next = () => {
        if (index + 1 >= JUG_ROUNDS) {
            onResult(level, { stars: jugStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setChosen([])
        setChecked(false)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<RationalsGameArt game="jug" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${JUG_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Pitxerrak marka bat du. Aukeratu marka horretaraino justu betetzen duten txartelak.', es: 'La jarra tiene una marca. Elige las cartas que la llenan justo hasta esa marca.', en: 'The jug has a mark. Choose the cards that fill it exactly up to that mark.', ar: 'في الإبريق علامة. اختر البطاقات التي تملؤه حتى العلامة تمامًا.' })}</li>
                        <li>{l({ eu: 'Gehiegi jartzen baduzu, ura gainezka egiten du. Txartel negatibo batek ura kentzen du.', es: 'Si pones demasiado, el agua se desborda. Una carta negativa quita agua.', en: 'Too much and the water spills over. A negative card takes water out.', ar: 'إذا وضعت أكثر من اللازم يفيض الماء. والبطاقة السالبة تُخرج ماءً.' })}</li>
                        <li>{l({ eu: `${JUG_ROUNDS} pitxer maila bakoitzean; saiakera bat bakoitzeko.`, es: `${JUG_ROUNDS} jarras por nivel; un intento en cada una.`, en: `${JUG_ROUNDS} jugs per level; one try each.`, ar: `${JUG_ROUNDS} أباريق في كل مستوى؛ محاولة واحدة لكل إبريق.` })}</li>
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
                    stars={jugStars(score)}
                    title={`${score} / ${JUG_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 6 pitxer · 2 izar: 5 · izar 1: 3', es: '3 estrellas: 6 jarras · 2: 5 · 1: 3', en: '3 stars: 6 jugs · 2: 5 · 1: 3', ar: '3 نجوم: 6 أباريق · 2: 5 · 1: 3' })}
                    stats={[{ label: l({ eu: 'Pitxer beteak', es: 'Jarras llenas', en: 'Jugs filled', ar: 'الأباريق المملوءة' }), value: `${score} / ${JUG_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const sum = chosenSum(round, chosen)
    const relation = compare(sum, round.target)
    const right = checked && results[results.length - 1]
    const chosenCards = round.cards.filter((item) => chosen.includes(item.id))
    const sumLatex = chosenCards.length < 2 ? toLatex(sum) : `${chosenCards.map((item) => toLatex(item.value)).join('+').replace(/\+-/g, '-')}=${toLatex(sum)}`
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {JUG_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: JUG_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt">
                <MathText text={l({ eu: `Bete pitxerra marka arte: $${big(toLatex(round.target))}$`, es: `Llena la jarra hasta la marca: $${big(toLatex(round.target))}$`, en: `Fill the jug up to the mark: $${big(toLatex(round.target))}$`, ar: `املأ الإبريق حتى العلامة: $${big(toLatex(round.target))}$` })} inline />
            </p>
            <Jug round={round} chosen={chosen} />
            <p className={`prop3-sum${relation > 0 ? ' over' : ''}`} aria-live="polite">
                <MathText text={`$${big(sumLatex)}$`} inline />
                {' '}
                {relation > 0 ? l({ eu: '· gainezka!', es: '· ¡se desborda!', en: '· it spills over!', ar: '· يفيض!' }) : relation === 0 ? '· ✓' : ''}
            </p>
            <div className="prop3-options rationals-jug-cards" role="group" aria-label={l({ eu: 'Txartelak', es: 'Cartas', en: 'Cards', ar: 'البطاقات' })}>
                {round.cards.map((item) => {
                    const marks = !checked ? '' : round.solution.includes(item.id) ? 'right' : chosen.includes(item.id) ? 'wrong' : ''
                    return (
                        <button key={item.id} type="button" aria-pressed={chosen.includes(item.id)} disabled={checked} className={`${marks}${item.value.numerator < 0 ? ' negative' : ''}`} onClick={() => toggle(item.id)}>
                            <MathText text={`$${big(toLatex(item.value))}$`} inline />
                        </button>
                    )
                })}
            </div>
            {!checked && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen.length === 0} onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقّق' })}</button>
                </div>
            )}
            {checked && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}>
                        <strong>{right ? l({ eu: 'Beteta!', es: '¡Llena!', en: 'Full!', ar: 'امتلأ!' }) : relation > 0 ? l({ eu: 'Gainezka egin du.', es: 'Se ha desbordado.', en: 'It spilled over.', ar: 'فاض.' }) : l({ eu: 'Ez da iritsi.', es: 'No ha llegado.', en: 'It did not reach the mark.', ar: 'لم يصل.' })}</strong>{' '}
                        {!right && <MathText text={l({ eu: `Horrela bai: $${jugSolutionLatex(round)}$.`, es: `Así sí: $${jugSolutionLatex(round)}$.`, en: `This works: $${jugSolutionLatex(round)}$.`, ar: `هكذا يصحّ: $${jugSolutionLatex(round)}$.` })} inline />}
                    </p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= JUG_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
