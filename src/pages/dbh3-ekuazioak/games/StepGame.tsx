import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Equations3GameArt } from './GameArt'
import { equations3Games } from './info'
import { createStepRounds, linearSolution, STEP_ROUNDS, stepStars, type StepRound } from './step'
import './Games.css'

const game = equations3Games.find((item) => item.id === 'step')!

export function StepGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<StepRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<string | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createStepRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (option: string) => {
        if (picked !== null) return
        setPicked(option)
        setResults([...results, option === round.answer])
    }

    const next = () => {
        if (index + 1 >= STEP_ROUNDS) {
            onResult(level, { stars: stepStars(score), score, timeMs: null })
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
                art={<Equations3GameArt game="step" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${STEP_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Ekuazio baten azpian hiru urrats daude. Bakarrak gordetzen du ebazpena.', es: 'Bajo cada ecuación hay tres pasos. Solo uno conserva la solución.', en: 'Under each equation there are three steps. Only one keeps the solution.', ar: 'تحت كل معادلة ثلاث خطوات. واحدة فقط تحافظ على الحل.' })}</li>
                        <li>{l({ eu: 'Besteek akats tipiko bat dute: zeinua, parentesia edo izendatzailea.', es: 'Los otros tienen un error típico: el signo, el paréntesis o el denominador.', en: 'The others have a typical mistake: the sign, the brackets or the denominator.', ar: 'في الأخرى خطأ شائع: الإشارة أو القوس أو المقام.' })}</li>
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
                    stars={stepStars(score)}
                    title={`${score} / ${STEP_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 10 asmatu · 2 izar: 8 · izar 1: 5', es: '3 estrellas: 10 aciertos · 2: 8 · 1: 5', en: '3 stars: 10 correct · 2: 8 · 1: 5', ar: '3 نجوم: 10 إجابات صحيحة · 2: 8 · 1: 5' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${STEP_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === round.answer
    const solution = linearSolution(round.before)
    // MathText writes the decimal point in English; Arabic keeps the point
    const shown = String(Math.round(solution * 100) / 100).replace('.', language === 'ar' ? '.' : '{,}')
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {STEP_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: STEP_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="prop3-prompt" style={{ fontSize: 22 }}><MathText text={`$${round.before.latex}$`} /></div>
            <p className="ekuazioak-hint">{l({ eu: 'Zein da hurrengo urrats zuzena?', es: '¿Cuál es el siguiente paso correcto?', en: 'Which is the right next step?', ar: 'ما الخطوة التالية الصحيحة؟' })}</p>
            <div className="ekuazioak-steps" role="group" aria-label={l({ eu: 'Urratsak', es: 'Pasos', en: 'Steps', ar: 'الخطوات' })}>
                {round.options.map((option) => (
                    <button key={option.latex} type="button" disabled={picked !== null} className={picked === null ? '' : option.latex === round.answer ? 'right' : option.latex === picked ? 'wrong' : ''} onClick={() => choose(option.latex)}><MathText text={`$${option.latex}$`} inline /></button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena! Ebazpena ez da aldatu.', es: '¡Correcto! La solución no cambia.', en: 'Correct! The solution does not change.', ar: 'صحيح! الحل لا يتغيّر.' }) : l({ eu: 'Ez: urrats horrek ebazpena aldatzen du.', es: 'No: ese paso cambia la solución.', en: 'No: that step changes the solution.', ar: 'لا: هذه الخطوة تغيّر الحل.' })}</strong></p>
                    <p><MathText text={`$x${Number.isInteger(solution * 100) ? '=' : '\\approx '}${shown}$`} inline /></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= STEP_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
