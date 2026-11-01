import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import type { LocalizedText } from '../../../features/unit-v2/types'
import type { DecimalKind } from '../../dbh4-aplikatuak-errealak/reals'
import { RationalsGameArt } from './GameArt'
import { rationalsGames } from './info'
import { createPeriodItems, PERIOD_FALL_MS, PERIOD_ITEMS, PERIOD_KINDS, periodStars, type PeriodItem } from './period'
import './Games.css'

const game = rationalsGames.find((item) => item.id === 'period')!

const KIND_NAMES: Record<DecimalKind, LocalizedText> = {
    exact: { eu: 'Zehatza', es: 'Exacto', en: 'Terminating', ar: 'منتهٍ' },
    pure: { eu: 'Periodiko hutsa', es: 'Periódico puro', en: 'Purely recurring', ar: 'دوري بحت' },
    mixed: { eu: 'Periodiko mistoa', es: 'Periódico mixto', en: 'Mixed recurring', ar: 'دوري مختلط' }
}

/** What the learner did with the falling number: a bin, or it reached the floor */
type Answer = DecimalKind | 'floor'

export function PeriodGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [items, setItems] = useState<PeriodItem[]>([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState<Answer | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const advance = useRef<number | null>(null)
    const item = items[index]
    const score = results.filter(Boolean).length

    useEffect(() => () => {
        if (advance.current !== null) window.clearTimeout(advance.current)
    }, [])

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setItems(createPeriodItems(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setAnswer(null)
        setResults([])
        setPhase('playing')
    }

    const next = (finalResults: boolean[]) => {
        if (advance.current !== null) window.clearTimeout(advance.current)
        advance.current = null
        if (index + 1 >= PERIOD_ITEMS) {
            const total = finalResults.filter(Boolean).length
            onResult(level, { stars: periodStars(total), score: total, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setAnswer(null)
    }

    const drop = (chosen: Answer) => {
        if (answer !== null || !item) return
        const right = chosen === item.kind
        const nextResults = [...results, right]
        setAnswer(chosen)
        setResults(nextResults)
        // A right answer moves on by itself; a wrong one waits for the learner to read why
        if (right) advance.current = window.setTimeout(() => next(nextResults), 900)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<RationalsGameArt game="period" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${PERIOD_ITEMS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Zenbaki bat erortzen da: bota bere ontzira lurrera iritsi aurretik.', es: 'Cae un número: échalo a su cubo antes de que llegue al suelo.', en: 'A number falls: drop it into its bin before it hits the floor.', ar: 'يسقط عدد: ضعه في سلّته قبل أن يصل إلى الأرض.' })}</li>
                        <li>{l({ eu: 'Zehatza amaitzen da; periodiko hutsak komaren ondoren berehala errepikatzen du; mistoak beste zifra batzuk ditu aurretik.', es: 'El exacto se acaba; el periódico puro se repite justo tras la coma; el mixto tiene otras cifras antes.', en: 'A terminating decimal ends; a purely recurring one repeats right after the point; a mixed one has other digits first.', ar: 'المنتهي ينتهي؛ والدوري البحت يتكرر بعد الفاصلة مباشرة؛ والمختلط تسبقه أرقام أخرى.' })}</li>
                        <li>{l({ eu: 'Zatikietan, begiratu izendatzaileari sinplifikatu ondoren.', es: 'En las fracciones, mira el denominador después de simplificar.', en: 'With fractions, look at the denominator after simplifying.', ar: 'في الكسور انظر إلى المقام بعد الاختزال.' })}</li>
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
                    stars={periodStars(score)}
                    title={`${score} / ${PERIOD_ITEMS}`}
                    subtitle={l({ eu: '3 izar: 11 asmatu · 2 izar: 9 · izar 1: 6', es: '3 estrellas: 11 aciertos · 2: 9 · 1: 6', en: '3 stars: 11 correct · 2: 9 · 1: 6', ar: '3 نجوم: 11 إجابة صحيحة · 2: 9 · 1: 6' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${PERIOD_ITEMS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!item) return <></>
    const right = answer === item.kind
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {PERIOD_ITEMS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="rationals-period-lane" aria-live="polite">
                <div
                    key={index}
                    className={`rationals-period-drop${answer !== null ? ' stopped' : ''}${answer === null ? '' : right ? ' right' : ' wrong'}`}
                    style={{ '--fall-ms': `${PERIOD_FALL_MS[level]}ms` } as CSSProperties}
                    onAnimationEnd={() => drop('floor')}
                >
                    <MathText text={`$${localLatex(item.latex, language)}$`} inline />
                </div>
            </div>
            <div className="rationals-period-bins" role="group" aria-label={l({ eu: 'Ontziak', es: 'Cubos', en: 'Bins', ar: 'السلال' })}>
                {PERIOD_KINDS.map((kind) => (
                    <button key={kind} type="button" data-kind={kind} disabled={answer !== null} className={answer === null ? '' : kind === item.kind ? 'right' : kind === answer ? 'wrong' : ''} onClick={() => drop(kind)}>
                        {l(KIND_NAMES[kind])}
                    </button>
                ))}
            </div>
            {answer !== null && (
                <div className="prop3-panel">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}>
                        <strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : answer === 'floor' ? l({ eu: 'Lurrera iritsi da.', es: 'Ha llegado al suelo.', en: 'It hit the floor.', ar: 'وصل إلى الأرض.' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong>{' '}
                        <MathText text={l(item.why)} inline />
                    </p>
                    {!right && (
                        <button type="button" className="fraction-v2-primary" onClick={() => next(results)} ref={(node) => node?.focus({ preventScroll: true })}>
                            {index + 1 >= PERIOD_ITEMS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}
