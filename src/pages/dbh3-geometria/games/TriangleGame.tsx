import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Geometry3GameArt } from './GameArt'
import { geometry3Games } from './info'
import { createKindRounds, KIND_ROUNDS, kindStars, type KindRound, type TriangleKind } from './triangleKind'
import './Games.css'

const game = geometry3Games.find((item) => item.id === 'triangle')!

const KIND_NAMES: Record<TriangleKind, { eu: string; es: string; en: string; ar: string }> = {
    acute: { eu: 'Zorrotza', es: 'Acutángulo', en: 'Acute', ar: 'حاد' },
    right: { eu: 'Zuzena', es: 'Rectángulo', en: 'Right', ar: 'قائم' },
    obtuse: { eu: 'Kamutsa', es: 'Obtusángulo', en: 'Obtuse', ar: 'منفرج' },
    none: { eu: 'Ez da triangelua', es: 'No es triángulo', en: 'Not a triangle', ar: 'ليس مثلثًا' }
}

export function TriangleGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<KindRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<TriangleKind | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length
    const kinds: TriangleKind[] = level === 2 ? ['acute', 'right', 'obtuse', 'none'] : ['acute', 'right', 'obtuse']

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createKindRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (kind: TriangleKind) => {
        if (picked !== null) return
        setPicked(kind)
        setResults([...results, kind === round.kind])
    }

    const next = () => {
        if (index + 1 >= KIND_ROUNDS) {
            onResult(level, { stars: kindStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setPicked(null)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Geometry3GameArt game="triangle" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${KIND_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Konparatu alde luzearen karratua beste bien karratuen baturarekin.', es: 'Compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos.', en: 'Compare the square of the longest side with the sum of the squares of the other two.', ar: 'قارن مربع أطول ضلع بمجموع مربعي الضلعين الآخرين.' })}</li>
                        <li>{l({ eu: 'Berdina: zuzena. Txikiagoa: zorrotza. Handiagoa: kamutsa.', es: 'Igual: rectángulo. Menor: acutángulo. Mayor: obtusángulo.', en: 'Equal: right. Smaller: acute. Larger: obtuse.', ar: 'يساوي: قائم. أصغر: حاد. أكبر: منفرج.' })}</li>
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
                    stars={kindStars(score)}
                    title={`${score} / ${KIND_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 10 asmatu · 2 izar: 8 · izar 1: 5', es: '3 estrellas: 10 aciertos · 2: 8 · 1: 5', en: '3 stars: 10 correct · 2: 8 · 1: 5', ar: '3 نجوم: 10 إجابات صحيحة · 2: 8 · 1: 5' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${KIND_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const [a, b, c] = round.sides
    const right = picked !== null && picked === round.kind
    const legs = a * a + b * b
    const relation = round.kind === 'none' ? `${a}+${b}\\le ${c}` : `${c}^{2}=${c * c}${c * c === legs ? '=' : c * c < legs ? '<' : '>'}${a}^{2}+${b}^{2}=${legs}`
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {KIND_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: KIND_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="geometria-sides" dir="ltr">
                {round.sides.map((side, position) => <span key={position}>{side}</span>)}
            </div>
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Triangelu motak', es: 'Tipos de triángulo', en: 'Kinds of triangle', ar: 'أنواع المثلث' })} style={{ gridTemplateColumns: `repeat(${kinds.length === 4 ? 2 : 3}, 1fr)` }}>
                {kinds.map((kind) => (
                    <button key={kind} type="button" disabled={picked !== null} className={picked === null ? '' : kind === round.kind ? 'right' : kind === picked ? 'wrong' : ''} onClick={() => choose(kind)}>{l(KIND_NAMES[kind])}</button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: `Ez: ${KIND_NAMES[round.kind].eu.toLowerCase()}.`, es: `No: ${KIND_NAMES[round.kind].es.toLowerCase()}.`, en: `No: ${KIND_NAMES[round.kind].en.toLowerCase()}.`, ar: `لا: ${KIND_NAMES[round.kind].ar}.` })}</strong></p>
                    <p><MathText text={`$${relation}$`} inline /></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= KIND_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
