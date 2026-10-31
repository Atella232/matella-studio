import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Motions3GameArt } from './GameArt'
import { motions3Games } from './info'
import { createTileRounds, interiorAngle, mixtureSum, TILE_ROUNDS, tileStars, type TileRound } from './tiles'
import './Games.css'

const game = motions3Games.find((item) => item.id === 'tiles')!

/** A regular polygon drawn small, for the question */
function Polygon({ sides, x, size = 26 }: { sides: number; x: number; size?: number }) {
    const points = Array.from({ length: sides }, (_, i) => {
        const angle = -Math.PI / 2 + (2 * Math.PI * i) / sides
        return `${x + size * Math.cos(angle)},${36 + size * Math.sin(angle)}`
    }).join(' ')
    return <polygon points={points} fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth={2} />
}

const angleLatex = (sides: number) => String(Math.round(interiorAngle(sides) * 100) / 100).replace('.', '{,}')

export function TilesGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<TileRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<string | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createTileRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const answerOf = (item: TileRound) => (item.kind === 'count' ? String(item.answer) : item.answer ? 'yes' : 'no')

    const choose = (option: string) => {
        if (picked !== null) return
        setPicked(option)
        setResults([...results, option === answerOf(round)])
    }

    const next = () => {
        if (index + 1 >= TILE_ROUNDS) {
            onResult(level, { stars: tileStars(score), score, timeMs: null })
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
                art={<Motions3GameArt game="tiles" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${TILE_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Erpin batean elkartzen diren angeluek zehazki 360° batu behar dute.', es: 'Los ángulos que se juntan en un vértice tienen que sumar justo 360°.', en: 'The angles that meet at a vertex must add up to exactly 360°.', ar: 'يجب أن يكون مجموع الزوايا الملتقية عند رأس 360° تمامًا.' })}</li>
                        <li>{l({ eu: 'n aldeko poligono erregularraren barne-angelua: 180° − 360° : n.', es: 'Ángulo interior del polígono regular de n lados: 180° − 360° : n.', en: 'Interior angle of the regular polygon with n sides: 180° − 360° ÷ n.', ar: 'الزاوية الداخلية للمضلع المنتظم ذي n ضلعًا: 180° − 360° ÷ n.' })}</li>
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
                    stars={tileStars(score)}
                    title={`${score} / ${TILE_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${TILE_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === answerOf(round)
    const polygons = round.kind === 'mixture' ? round.polygons : [round.sides]
    const options = round.kind === 'count' ? round.options.map(String) : ['yes', 'no']
    const optionLabel = (option: string) => (option === 'yes' ? l({ eu: 'Bai', es: 'Sí', en: 'Yes', ar: 'نعم' }) : option === 'no' ? l({ eu: 'Ez', es: 'No', en: 'No', ar: 'لا' }) : option)
    const question = round.kind === 'single'
        ? l({ eu: `${round.sides} aldeko poligono erregularrek planoa estaltzen al dute?`, es: `¿Los polígonos regulares de ${round.sides} lados cubren el plano?`, en: `Do regular polygons with ${round.sides} sides tile the plane?`, ar: `هل تغطي المضلعات المنتظمة ذات ${round.sides} أضلاع المستوى؟` })
        : round.kind === 'count'
            ? l({ eu: `Zenbat ${round.sides} aldeko poligono erregular sartzen dira erpin batean?`, es: `¿Cuántos polígonos regulares de ${round.sides} lados caben en un vértice?`, en: `How many regular polygons with ${round.sides} sides fit at a vertex?`, ar: `كم مضلعًا منتظمًا ذا ${round.sides} أضلاع يتسع الرأس؟` })
            : l({ eu: 'Poligono hauek erpin batean hutsunerik gabe ixten al dute?', es: '¿Estos polígonos cierran un vértice sin huecos?', en: 'Do these polygons close up a vertex with no gaps?', ar: 'هل تُغلق هذه المضلعات رأسًا دون فراغات؟' })
    const sumLatex = round.kind === 'mixture'
        ? `${round.polygons.map(angleLatex).join('°+')}°=${String(Math.round(mixtureSum(round.polygons) * 100) / 100).replace('.', '{,}')}°`
        : round.kind === 'count' ? `${round.answer}\\cdot ${angleLatex(round.sides)}°=360°` : `360°\\div ${angleLatex(round.sides)}°${Number.isInteger(360 / interiorAngle(round.sides)) ? '=' : '\\approx '}${String(Math.round((360 / interiorAngle(round.sides)) * 100) / 100).replace('.', '{,}')}`
    const width = polygons.length * 64
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {TILE_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: TILE_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <svg className="mugimenduak-tiles" viewBox={`0 0 ${Math.max(width, 120)} 74`} aria-hidden="true">
                {polygons.map((sides, position) => <Polygon key={position} sides={sides} x={32 + position * 64 + (width < 120 ? (120 - width) / 2 : 0)} />)}
            </svg>
            <p className="prop3-prompt">{question}</p>
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Erantzunak', es: 'Respuestas', en: 'Answers', ar: 'الإجابات' })} style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}>
                {options.map((option) => (
                    <button key={option} type="button" disabled={picked !== null} className={picked === null ? '' : option === answerOf(round) ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}>{optionLabel(option)}</button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> <MathText text={`$${sumLatex}$`} inline /></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= TILE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
