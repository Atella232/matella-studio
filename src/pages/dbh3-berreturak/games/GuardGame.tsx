import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { PowersGameArt } from './GameArt'
import { createGuardItems, GUARD_ITEMS, guardStars, guardWhy, type GuardItem } from './guard'
import { powersGames } from './info'
import './Games.css'

const game = powersGames.find((item) => item.id === 'guard')!

export function GuardGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [items, setItems] = useState<GuardItem[]>([])
    const [index, setIndex] = useState(0)
    /** What the learner answered for the current number: true = rational */
    const [answer, setAnswer] = useState<boolean | null>(null)
    const [results, setResults] = useState<boolean[]>([])

    const item = items[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setItems(createGuardItems(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setAnswer(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (rational: boolean) => {
        if (answer !== null) return
        setAnswer(rational)
        setResults([...results, rational === item.rational])
    }

    const next = () => {
        if (index + 1 >= GUARD_ITEMS) {
            onResult(level, { stars: guardStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setAnswer(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<PowersGameArt game="guard" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${GUARD_ITEMS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Zenbaki bat agertzen da: aukeratu arrazionala edo irrazionala den.', es: 'Aparece un número: elige si es racional o irracional.', en: 'A number appears: choose whether it is rational or irrational.', ar: 'يظهر عدد: اختر هل هو نسبي أم غير نسبي.' })}</li>
                        <li>{l({ eu: 'Erantzun bakoitzaren ondoren, zergatia ikusiko duzu.', es: 'Tras cada respuesta verás el porqué.', en: 'After each answer you will see why.', ar: 'بعد كل إجابة ترى السبب.' })}</li>
                        <li>{l({ eu: `${GUARD_ITEMS} zenbaki maila bakoitzean; puntu bat zuzen bakoitzeko.`, es: `${GUARD_ITEMS} números por nivel; un punto por acierto.`, en: `${GUARD_ITEMS} numbers per level; one point per correct answer.`, ar: `${GUARD_ITEMS} أعداد في كل مستوى ونقطة لكل إجابة صحيحة.` })}</li>
                    </ul>
                )}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="berreturak-game" data-stage={game.levels[level].stage}>
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={guardStars(score)}
                    title={`${score} / ${GUARD_ITEMS}`}
                    subtitle={l({ eu: '3 izar: 9 asmatu · 2 izar: 7 · izar 1: 5', es: '3 estrellas: 9 aciertos · 2: 7 · 1: 5', en: '3 stars: 9 correct · 2: 7 · 1: 5', ar: '3 نجوم: 9 إجابات صحيحة · 2: 7 · 1: 5' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${GUARD_ITEMS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    // Only while a level is being set up
    if (!item) return <></>
    const right = answer !== null && answer === item.rational

    return (
        <div className="berreturak-game" data-stage={game.levels[level].stage}>
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {GUARD_ITEMS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>

            <div className="berreturak-dots" aria-hidden="true">
                {Array.from({ length: GUARD_ITEMS }, (_, position) => (
                    <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />
                ))}
            </div>

            <div className="berreturak-panel">
                <div className="berreturak-guard-card" aria-live="polite">
                    <MathText text={`$${localLatex(item.latex, language)}$`} inline />
                </div>
                <div className="berreturak-guard-buttons" role="group" aria-label={l({ eu: 'Zer da?', es: '¿Qué es?', en: 'What is it?', ar: 'ما هو؟' })}>
                    <button type="button" className={answer === true ? 'picked' : ''} disabled={answer !== null} onClick={() => choose(true)}>{l({ eu: 'Arrazionala', es: 'Racional', en: 'Rational', ar: 'نسبي' })}</button>
                    <button type="button" className={answer === false ? 'picked' : ''} disabled={answer !== null} onClick={() => choose(false)}>{l({ eu: 'Irrazionala', es: 'Irracional', en: 'Irrational', ar: 'غير نسبي' })}</button>
                </div>
                {answer !== null && (
                    <>
                        <p className={`berreturak-verdict ${right ? 'right' : 'wrong'}`} aria-live="polite">
                            <strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : item.rational ? l({ eu: 'Ez: arrazionala da.', es: 'No: es racional.', en: 'No: it is rational.', ar: 'لا: إنه نسبي.' }) : l({ eu: 'Ez: irrazionala da.', es: 'No: es irracional.', en: 'No: it is irrational.', ar: 'لا: إنه غير نسبي.' })}</strong>{' '}
                            <MathText text={l(guardWhy(item))} inline />
                        </p>
                        <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                            {index + 1 >= GUARD_ITEMS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
