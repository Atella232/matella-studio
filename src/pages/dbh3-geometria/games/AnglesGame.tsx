import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { AngleArt } from './AngleArt'
import { ANGLE_ROUNDS, angleStars, createAngleRounds, type AngleRound } from './angles'
import { Geometry3GameArt } from './GameArt'
import { geometry3Games } from './info'
import './Games.css'

const game = geometry3Games.find((item) => item.id === 'angles')!

export function AnglesGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<AngleRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<number | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createAngleRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (option: number) => {
        if (picked !== null) return
        setPicked(option)
        setResults([...results, option === round.answer])
    }

    const next = () => {
        if (index + 1 >= ANGLE_ROUNDS) {
            onResult(level, { stars: angleStars(score), score, timeMs: null })
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
                art={<Geometry3GameArt game="angles" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${ANGLE_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Irudian «?» duen angelua falta da: aukeratu haren neurria.', es: 'Falta el ángulo marcado con «?»: elige cuánto mide.', en: 'The angle marked «?» is missing: choose its size.', ar: 'تنقص الزاوية المعلَّمة بـ«?»: اختر قياسها.' })}</li>
                        <li>{l({ eu: 'Triangelua 180°, laukia 360°; inskribatua zentralaren erdia.', es: 'Triángulo 180°, cuadrilátero 360°; el inscrito es la mitad del central.', en: 'Triangle 180°, quadrilateral 360°; inscribed is half the central angle.', ar: 'المثلث 180° والرباعي 360°؛ والمحيطية نصف المركزية.' })}</li>
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
                    stars={angleStars(score)}
                    title={`${score} / ${ANGLE_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${ANGLE_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === round.answer
    const figure = round.figure
    const question = figure.type === 'regular'
        ? (figure.ask === 'interior' ? l({ eu: 'Barne-angelua?', es: '¿Ángulo interior?', en: 'Interior angle?', ar: 'الزاوية الداخلية؟' }) : l({ eu: 'Kanpo-angelua?', es: '¿Ángulo exterior?', en: 'Exterior angle?', ar: 'الزاوية الخارجية؟' }))
        : figure.type === 'circle'
            ? (figure.ask === 'central' ? l({ eu: 'Angelu zentrala?', es: '¿Ángulo central?', en: 'Central angle?', ar: 'الزاوية المركزية؟' }) : l({ eu: 'Angelu inskribatua?', es: '¿Ángulo inscrito?', en: 'Inscribed angle?', ar: 'الزاوية المحيطية؟' }))
            : l({ eu: 'Zenbat neurtzen du «?» angeluak?', es: '¿Cuánto mide el ángulo «?»?', en: 'How big is the angle «?»?', ar: 'كم قياس الزاوية «?»؟' })
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {ANGLE_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: ANGLE_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <AngleArt figure={figure} />
            <p className="prop3-prompt">{question}</p>
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Aukerak', es: 'Opciones', en: 'Options', ar: 'الخيارات' })}>
                {round.options.map((option) => (
                    <button key={option} type="button" dir="ltr" disabled={picked !== null} className={picked === null ? '' : option === round.answer ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}>{`${option}°`}</button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: `Ez: ${round.answer}° da.`, es: `No: mide ${round.answer}°.`, en: `No: it is ${round.answer}°.`, ar: `لا: قياسها ${round.answer}°.` })}</strong></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= ANGLE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
