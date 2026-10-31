import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { Polynomials3GameArt } from './GameArt'
import { polynomials3Games } from './info'
import { createRuffiniRounds, RUFFINI_ROUNDS, ruffiniStars, type RuffiniRound } from './ruffiniRun'
import './Games.css'

const game = polynomials3Games.find((item) => item.id === 'ruffini')!

const divisorLatex = (a: number) => (a > 0 ? `x-${a}` : `x+${-a}`)
function polyLatex(coefficients: number[]): string {
    const degree = coefficients.length - 1
    const parts: string[] = []
    coefficients.forEach((coefficient, index) => {
        if (coefficient === 0) return
        const power = degree - index
        const letter = power === 0 ? '' : power === 1 ? 'x' : `x^{${power}}`
        const size = Math.abs(coefficient)
        parts.push(`${coefficient < 0 ? '-' : parts.length === 0 ? '' : '+'}${size === 1 && letter ? '' : size}${letter}`)
    })
    return parts.join('')
}

export function RuffiniGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<RuffiniRound[]>([])
    const [index, setIndex] = useState(0)
    /** The numbers the learner has chosen so far for the bottom row (after the first) */
    const [filled, setFilled] = useState<number[]>([])
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createRuffiniRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setFilled([])
        setResults([])
        setPhase('playing')
    }

    const done = round !== undefined && filled.length === round.choices.length

    const choose = (value: number) => {
        if (!round || done) return
        const next = [...filled, value]
        setFilled(next)
        if (next.length === round.choices.length) setResults([...results, next.every((item, position) => item === round.bottom[position + 1])])
    }

    const next = () => {
        if (index + 1 >= RUFFINI_ROUNDS) {
            onResult(level, { stars: ruffiniStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setFilled([])
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Polynomials3GameArt game="ruffini" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${RUFFINI_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Bete beheko errenkada: biderkatu a zenbakiaz eta batu goikoarekin.', es: 'Rellena la fila de abajo: multiplica por a y suma con el de arriba.', en: 'Fill in the bottom row: multiply by a and add the number above.', ar: 'املأ الصف السفلي: اضرب في a واجمع مع العدد في الأعلى.' })}</li>
                        <li>{l({ eu: 'Kontuz: x + 3 zatitzeko, a = −3.', es: 'Cuidado: para dividir entre x + 3, a = −3.', en: 'Careful: to divide by x + 3, a = −3.', ar: 'انتبه: للقسمة على \u2066x\u00a0+\u00a03\u2069 يكون \u2066a\u00a0=\u00a0−3\u2069.' })}</li>
                        <li>{l({ eu: 'Taula ona da lauki guztiak zuzenak badira.', es: 'La tabla vale si todas las casillas están bien.', en: 'A table counts only if every box is right.', ar: 'يُحتسب الجدول إذا كانت كل الخانات صحيحة.' })}</li>
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
                    stars={ruffiniStars(score)}
                    title={`${score} / ${RUFFINI_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 6 asmatu · 2 izar: 5 · izar 1: 3', es: '3 estrellas: 6 aciertos · 2: 5 · 1: 3', en: '3 stars: 6 correct · 2: 5 · 1: 3', ar: '3 نجوم: 6 إجابات صحيحة · 2: 5 · 1: 3' })}
                    stats={[{ label: l({ eu: 'Taula zuzenak', es: 'Tablas correctas', en: 'Correct tables', ar: 'الجداول الصحيحة' }), value: `${score} / ${RUFFINI_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const columns = round.coefficients.length
    const right = done && filled.every((item, position) => item === round.bottom[position + 1])
    const current = filled.length
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {RUFFINI_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: RUFFINI_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="prop3-prompt"><MathText text={`$(${polyLatex(round.coefficients)}):(${divisorLatex(round.a)})$`} /></div>
            <div className="polinomioak-table" style={{ gridTemplateColumns: `repeat(${columns + 1}, auto)` }} aria-label={l({ eu: 'Ruffiniren taula', es: 'Tabla de Ruffini', en: 'Ruffini\'s table', ar: 'جدول روفيني' })}>
                <span className="a" />
                {round.coefficients.map((coefficient, position) => <span key={`c${position}`}>{coefficient}</span>)}
                <span className="a">{round.a}</span>
                {round.coefficients.map((_, position) => {
                    if (position === 0) return <span key={`m${position}`} />
                    const ready = position - 1 <= filled.length
                    const previous = position === 1 ? round.bottom[0] : filled[position - 2]
                    return <span key={`m${position}`} style={{ color: 'var(--muted)' }}>{ready && previous !== undefined ? previous * round.a : ''}</span>
                })}
                <span className="a bottom" />
                {round.coefficients.map((_, position) => {
                    if (position === 0) return <span key={`b${position}`} className="bottom done">{round.bottom[0]}</span>
                    const value = filled[position - 1]
                    const wrong = done && value !== round.bottom[position]
                    return <span key={`b${position}`} className={`bottom ${value === undefined ? 'box' : wrong ? 'bad' : 'done'}`}>{value === undefined ? (position - 1 === current ? '?' : '') : value}</span>
                })}
            </div>
            {!done && (
                <div className="prop3-options" role="group" aria-label={l({ eu: 'Hurrengo zenbakia', es: 'Siguiente número', en: 'Next number', ar: 'العدد التالي' })} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                    {round.choices[current].map((value) => <button key={value} type="button" dir="ltr" onClick={() => choose(value)}>{value}</button>)}
                </div>
            )}
            {done && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Taula zuzena!', es: '¡Tabla correcta!', en: 'Correct table!', ar: 'جدول صحيح!' }) : l({ eu: `Ez. Beheko errenkada: ${round.bottom.join(', ')}.`, es: `No. La fila de abajo: ${round.bottom.join(', ')}.`, en: `No. The bottom row: ${round.bottom.join(', ')}.`, ar: `لا. الصف السفلي: \u2066${round.bottom.join(', ')}\u2069.` })}</strong></p>
                    <p>{l({ eu: `Hondarra: ${round.bottom[columns - 1]}.`, es: `Resto: ${round.bottom[columns - 1]}.`, en: `Remainder: ${round.bottom[columns - 1]}.`, ar: `الباقي: ${round.bottom[columns - 1]}.` })}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= RUFFINI_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
