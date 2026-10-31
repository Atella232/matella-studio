import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Equations3GameArt } from './GameArt'
import { equations3Games } from './info'
import { createRootsRounds, ROOTS_RANGE, ROOTS_ROUNDS, rootsRight, rootsStars, type RootsRound } from './roots'
import './Games.css'

const game = equations3Games.find((item) => item.id === 'roots')!
const POINTS = Array.from({ length: 2 * ROOTS_RANGE + 1 }, (_, index) => index - ROOTS_RANGE)

export function RootsGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<RootsRound[]>([])
    const [index, setIndex] = useState(0)
    const [marked, setMarked] = useState<number[]>([])
    const [checked, setChecked] = useState(false)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createRootsRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setMarked([])
        setChecked(false)
        setResults([])
        setPhase('playing')
    }

    const toggle = (point: number) => {
        if (checked) return
        setMarked(marked.includes(point) ? marked.filter((item) => item !== point) : [...marked, point])
    }

    const check = (answer: number[]) => {
        setMarked(answer)
        setChecked(true)
        setResults([...results, rootsRight(round, answer)])
    }

    const next = () => {
        if (index + 1 >= ROOTS_ROUNDS) {
            onResult(level, { stars: rootsStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setMarked([])
        setChecked(false)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Equations3GameArt game="roots" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${ROOTS_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Sakatu zuzenean ekuazioaren ebazpen guztiak eta gero «Egiaztatu».', es: 'Toca en la recta todas las soluciones de la ecuación y después «Comprobar».', en: 'Tap every solution of the equation on the line, then «Check».', ar: 'المس على المستقيم كل حلول المعادلة ثم «تحقق».' })}</li>
                        <li>{l({ eu: 'Ebazpenik ez badu, sakatu «Ez du ebazpenik».', es: 'Si no tiene solución, pulsa «No tiene solución».', en: 'If it has none, press «No solution».', ar: 'إذا لم يكن لها حل فاضغط «لا حل لها».' })}</li>
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
                    stars={rootsStars(score)}
                    title={`${score} / ${ROOTS_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${ROOTS_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = checked && rootsRight(round, marked)
    const answerText = round.roots.length === 0 ? '\\Delta<0' : round.roots.map((root) => `x=${root}`).join(',\\ ')
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {ROOTS_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: ROOTS_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="prop3-prompt" style={{ fontSize: 22 }}><MathText text={`$${round.latex}$`} /></div>
            <div className="ekuazioak-line" dir="ltr" role="group" aria-label={l({ eu: 'Zuzena −6 eta 6 artean', es: 'Recta de −6 a 6', en: 'Number line from −6 to 6', ar: 'مستقيم من ⁦−6⁩ إلى 6' })}>
                {POINTS.map((point) => {
                    const isRoot = round.roots.includes(point)
                    const mark = !checked ? (marked.includes(point) ? 'on' : '') : marked.includes(point) ? (isRoot ? 'right' : 'wrong') : isRoot ? 'missed' : ''
                    return <button key={point} type="button" className={mark} aria-pressed={marked.includes(point)} disabled={checked} onClick={() => toggle(point)}>{point}</button>
                })}
            </div>
            {!checked && (
                <div className="prop3-options" style={{ gridTemplateColumns: '1fr 1fr' }}>
                    <button type="button" onClick={() => check(marked)} disabled={marked.length === 0}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>
                    <button type="button" onClick={() => check([])}>{l({ eu: 'Ez du ebazpenik', es: 'No tiene solución', en: 'No solution', ar: 'لا حل لها' })}</button>
                </div>
            )}
            {checked && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez. Begiratu ebazpenak:', es: 'No. Mira las soluciones:', en: 'No. Look at the solutions:', ar: 'لا. انظر إلى الحلول:' })}</strong> <MathText text={`$${answerText}$`} inline /></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= ROOTS_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
