import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { ALIKE_ROUNDS, alikeRight, alikeStars, createAlikeRounds, monomialLatex, type AlikeRound } from './alike'
import { Polynomials3GameArt } from './GameArt'
import { polynomials3Games } from './info'
import './Games.css'

const game = polynomials3Games.find((item) => item.id === 'alike')!

export function AlikeGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<AlikeRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<number[]>([])
    const [checked, setChecked] = useState(false)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createAlikeRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked([])
        setChecked(false)
        setResults([])
        setPhase('playing')
    }

    const toggle = (position: number) => {
        if (checked) return
        setPicked(picked.includes(position) ? picked.filter((item) => item !== position) : [...picked, position])
    }

    const check = () => {
        setChecked(true)
        setResults([...results, alikeRight(round, picked)])
    }

    const next = () => {
        if (index + 1 >= ALIKE_ROUNDS) {
            onResult(level, { stars: alikeStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setPicked([])
        setChecked(false)
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Polynomials3GameArt game="alike" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${ALIKE_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Sakatu goiko monomioaren antzeko guztiak: letra berak, berretzaile berekin.', es: 'Toca todos los semejantes al monomio de arriba: las mismas letras con los mismos exponentes.', en: 'Tap every like term of the monomial at the top: the same letters with the same exponents.', ar: 'المس كل الحدود المشابهة لوحيد الحد في الأعلى: الحروف نفسها بالأسس نفسها.' })}</li>
                        <li>{l({ eu: 'Koefizienteak ez du axola. Gero sakatu «Egiaztatu».', es: 'El coeficiente no importa. Después pulsa «Comprobar».', en: 'The coefficient does not matter. Then press «Check».', ar: 'المعامل لا يهم. ثم اضغط «تحقق».' })}</li>
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
                    stars={alikeStars(score)}
                    title={`${score} / ${ALIKE_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${ALIKE_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = checked && alikeRight(round, picked)
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {ALIKE_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: ALIKE_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt">
                {l({ eu: 'Aurkitu honen antzeko guztiak:', es: 'Encuentra todos los semejantes a:', en: 'Find every like term of:', ar: 'جد كل الحدود المشابهة لـ:' })}
                <strong><MathText text={`$${monomialLatex(round.target)}$`} inline /></strong>
            </p>
            <div className="polinomioak-cards" role="group" aria-label={l({ eu: 'Monomioak', es: 'Monomios', en: 'Monomials', ar: 'وحيدات الحد' })}>
                {round.cards.map((card, position) => {
                    const like = round.like.includes(position)
                    const mark = !checked ? '' : picked.includes(position) ? (like ? 'right' : 'wrong') : like ? 'missed' : ''
                    return <button key={position} type="button" className={mark} aria-pressed={picked.includes(position)} disabled={checked} onClick={() => toggle(position)}><MathText text={`$${monomialLatex(card)}$`} inline /></button>
                })}
            </div>
            {!checked && <button type="button" className="fraction-v2-primary" onClick={check}>{l({ eu: 'Egiaztatu', es: 'Comprobar', en: 'Check', ar: 'تحقق' })}</button>}
            {checked && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Denak aurkitu dituzu!', es: '¡Los has encontrado todos!', en: 'You found them all!', ar: 'وجدتها كلها!' }) : l({ eu: `Ez: ${round.like.length} antzeko zeuden.`, es: `No: había ${round.like.length} semejantes.`, en: `No: there were ${round.like.length} like terms.`, ar: `لا: كان هناك ${round.like.length} حدود مشابهة.` })}</strong></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= ALIKE_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
