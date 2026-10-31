import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { SequencesGameArt } from './GameArt'
import { sequencesGames } from './info'
import { createSorterItems, SORTER_ITEMS, sorterStars, sorterWhy, type SorterItem, type SorterKind } from './sorter'
import './Games.css'

const game = sequencesGames.find((item) => item.id === 'sorter')!

const KINDS: SorterKind[] = ['arithmetic', 'geometric', 'neither']

export function SorterGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [items, setItems] = useState<SorterItem[]>([])
    const [index, setIndex] = useState(0)
    const [answer, setAnswer] = useState<SorterKind | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const item = items[index]
    const score = results.filter(Boolean).length
    const names: Record<SorterKind, string> = {
        arithmetic: l({ eu: 'Aritmetikoa', es: 'Aritmética', en: 'Arithmetic', ar: 'حسابية' }),
        geometric: l({ eu: 'Geometrikoa', es: 'Geométrica', en: 'Geometric', ar: 'هندسية' }),
        neither: l({ eu: 'Bat ere ez', es: 'Ninguna', en: 'Neither', ar: 'لا هذه ولا تلك' })
    }

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setItems(createSorterItems(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setAnswer(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (kind: SorterKind) => {
        if (answer !== null) return
        setAnswer(kind)
        setResults([...results, kind === item.kind])
    }

    const next = () => {
        if (index + 1 >= SORTER_ITEMS) {
            onResult(level, { stars: sorterStars(score), score, timeMs: null })
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
                art={<SequencesGameArt game="sorter" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${SORTER_ITEMS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Segida bat agertzen da: aritmetikoa, geometrikoa ala bat ere ez?', es: 'Aparece una sucesión: ¿aritmética, geométrica o ninguna?', en: 'A sequence appears: arithmetic, geometric or neither?', ar: 'تظهر متتالية: حسابية أم هندسية أم لا هذه ولا تلك؟' })}</li>
                        <li>{l({ eu: 'Aritmetikoa: beti zenbaki bera batzen da. Geometrikoa: beti zenbaki beraz biderkatzen da.', es: 'Aritmética: siempre se suma lo mismo. Geométrica: siempre se multiplica por lo mismo.', en: 'Arithmetic: the same number is always added. Geometric: it is always multiplied by the same number.', ar: 'الحسابية: نضيف دائمًا العدد نفسه. الهندسية: نضرب دائمًا في العدد نفسه.' })}</li>
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
                    stars={sorterStars(score)}
                    title={`${score} / ${SORTER_ITEMS}`}
                    subtitle={l({ eu: '3 izar: 9 asmatu · 2 izar: 7 · izar 1: 5', es: '3 estrellas: 9 aciertos · 2: 7 · 1: 5', en: '3 stars: 9 correct · 2: 7 · 1: 5', ar: '3 نجوم: 9 إجابات صحيحة · 2: 7 · 1: 5' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${SORTER_ITEMS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!item) return <></>
    const right = answer !== null && answer === item.kind
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {SORTER_ITEMS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: SORTER_ITEMS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="segidak-sorter-card" aria-live="polite">
                <MathText text={`$${localLatex(`${item.latex},\\ldots`, language)}$`} inline />
            </div>
            <div className="segidak-sorter-buttons" role="group" aria-label={l({ eu: 'Zer da?', es: '¿Qué es?', en: 'What is it?', ar: 'ما هي؟' })}>
                {KINDS.map((kind) => <button key={kind} type="button" className={answer === kind ? 'picked' : ''} disabled={answer !== null} onClick={() => choose(kind)}>{names[kind]}</button>)}
            </div>
            {answer !== null && (
                <div className="prop3-panel">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`} aria-live="polite">
                        <strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : `${l({ eu: 'Ez:', es: 'No:', en: 'No:', ar: 'لا:' })} ${names[item.kind]}.`}</strong>{' '}
                        <MathText text={l(sorterWhy(item))} inline />
                    </p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= SORTER_ITEMS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
