import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import '../../../pages/dbh3-proportzionaltasuna/games/Games.css'
import type { LocalizedText, UnitLanguage } from '../types'
import { GameTopbar, LevelPicker, ResultPanel } from './GameKit'
import { useGameText } from './gameHooks'
import type { GameProps } from './GamesHub'
import { createRandom, randomSeed, type Random } from './random'
import type { GameInfo, Stars } from './records'

/* ==========================================================================
   A game of a few rounds with one try each, as the picture games of 3. DBH:
   the level picker, the dots of the rounds, the round itself and the
   result. Each game only says how to make its rounds and how to play one;
   a round calls `onAnswer` once and then shows its own verdict, and the
   shell adds the button to the next round.
   ========================================================================== */

export interface RoundProps<Round> {
    round: Round
    level: number
    language: UnitLanguage
    /** Called once, when the learner commits to an answer */
    onAnswer: (right: boolean) => void
    /** True once the answer is given */
    answered: boolean
}

export interface RoundGameConfig<Round> {
    game: GameInfo
    art: ReactNode
    rounds: number
    rules: LocalizedText[]
    create: (random: Random, level: number) => Round[]
    stars: (score: number) => Stars
    /** What the stars need, e.g. «3 estrellas: 6 · 2: 5 · 1: 3» */
    starsNote: LocalizedText
    Round: (props: RoundProps<Round>) => ReactNode
}

/** The verdict under a round: «Correct!» or «No.» and the explanation */
export function RoundVerdict({ right, language, children }: { right: boolean; language: UnitLanguage; children?: ReactNode }) {
    const l = useGameText(language)
    return (
        <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`} aria-live="polite">
            <strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> {children}
        </p>
    )
}

export function RoundGame<Round>({ config, language, records, onResult, onExit }: GameProps & { config: RoundGameConfig<Round> }) {
    const { game, rounds: count, Round } = config
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<Round[]>([])
    const [index, setIndex] = useState(0)
    const [results, setResults] = useState<boolean[]>([])
    const score = results.filter(Boolean).length
    const answered = results.length > index

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(config.create(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setResults([])
        setPhase('playing')
    }

    const answer = (right: boolean) => {
        if (answered) return
        setResults([...results, right])
    }

    const next = () => {
        if (index + 1 >= count) {
            onResult(level, { stars: config.stars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={config.art}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${count}`}
                howTo={<ul className="fraction-v2-game-rules">{config.rules.map((rule) => <li key={rule.es}><MathText text={l(rule)} inline /></li>)}</ul>}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="prop3-game">
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={config.stars(score)}
                    title={`${score} / ${count}`}
                    subtitle={l(config.starsNote)}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${count}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    const round = rounds[index]
    if (round === undefined) return <></>
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {count}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: count }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <Round key={index} round={round} level={level} language={language} onAnswer={answer} answered={answered} />
            {answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= count ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
