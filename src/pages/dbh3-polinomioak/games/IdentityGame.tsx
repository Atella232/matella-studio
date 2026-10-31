import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Polynomials3GameArt } from './GameArt'
import { createIdentityRounds, IDENTITY_ROUNDS, identityStars, type IdentityRound } from './identity'
import { polynomials3Games } from './info'
import './Games.css'

const game = polynomials3Games.find((item) => item.id === 'identity')!

export function IdentityGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<IdentityRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<string | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createIdentityRounds(createRandom(randomSeed()), nextLevel))
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
        if (index + 1 >= IDENTITY_ROUNDS) {
            onResult(level, { stars: identityStars(score), score, timeMs: null })
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
                art={<Polynomials3GameArt game="identity" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${IDENTITY_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Identitate batean pieza bat estalita dago: aukeratu falta dena.', es: 'En una identidad hay una pieza tapada: elige la que falta.', en: 'One piece of a special product is covered: choose the missing piece.', ar: 'في متطابقة قطعة مغطاة: اختر القطعة الناقصة.' })}</li>
                        <li>{l({ eu: 'Kontuz zeinuekin eta erdiko gaiarekin.', es: 'Cuidado con los signos y con el término del medio.', en: 'Watch the signs and the middle term.', ar: 'انتبه للإشارات وللحد الأوسط.' })}</li>
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
                    stars={identityStars(score)}
                    title={`${score} / ${IDENTITY_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${IDENTITY_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === round.answer
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {IDENTITY_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: IDENTITY_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="prop3-prompt" style={{ fontSize: 22 }}><MathText text={`$${picked === null ? round.latex : round.full}$`} /></div>
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Piezak', es: 'Piezas', en: 'Pieces', ar: 'القطع' })}>
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={picked !== null} className={picked === null ? '' : option === round.answer ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}><MathText text={`$${option}$`} inline /></button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez. Begiratu identitate osoa goian.', es: 'No. Mira la identidad completa arriba.', en: 'No. Look at the whole identity above.', ar: 'لا. انظر إلى المتطابقة كاملة في الأعلى.' })}</strong></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= IDENTITY_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
