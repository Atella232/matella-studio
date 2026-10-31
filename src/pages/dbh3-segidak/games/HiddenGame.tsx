import { useState } from 'react'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { SequencesGameArt } from './GameArt'
import { createHiddenRounds, HIDDEN_ROUNDS, hiddenStars, type HiddenRound } from './hidden'
import { sequencesGames } from './info'
import './Games.css'

const game = sequencesGames.find((item) => item.id === 'hidden')!

/** A negative number with a real minus sign */
const show = (value: number) => (value < 0 ? `−${-value}` : String(value))

export function HiddenGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<HiddenRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<number | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createHiddenRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (value: number) => {
        if (picked !== null) return
        setPicked(value)
        setResults([...results, value === round.answer])
    }

    const next = () => {
        if (index + 1 >= HIDDEN_ROUNDS) {
            onResult(level, { stars: hiddenStars(score), score, timeMs: null })
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
                art={<SequencesGameArt game="hidden" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${HIDDEN_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Segida batean gai bat ezkutatuta dago. Aurkitu araua eta aukeratu falta dena.', es: 'En una sucesión hay un término escondido. Descubre la regla y elige el que falta.', en: 'One term of a sequence is hidden. Find the rule and choose the missing term.', ar: 'في متتالية حدّ مخفي. اكتشف القاعدة واختر الحد الناقص.' })}</li>
                        <li>{l({ eu: 'Begiratu kendurak eta zatidurak: batzen da ala biderkatzen?', es: 'Mira las restas y los cocientes: ¿se suma o se multiplica?', en: 'Look at the differences and the quotients: is it adding or multiplying?', ar: 'انظر إلى الفروق وحواصل القسمة: هل نجمع أم نضرب؟' })}</li>
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
                    stars={hiddenStars(score)}
                    title={`${score} / ${HIDDEN_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${HIDDEN_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = picked !== null && picked === round.answer
    const rule = round.kind === 'arithmetic'
        ? l({ eu: `Beti ${show(round.terms[1] - round.terms[0])} batzen da.`, es: `Siempre se suma ${show(round.terms[1] - round.terms[0])}.`, en: `${show(round.terms[1] - round.terms[0])} is always added.`, ar: `نضيف دائمًا ${show(round.terms[1] - round.terms[0])}.` })
        : round.kind === 'geometric'
            ? l({ eu: `Beti biderkatzen da: r = ${round.terms[1] / round.terms[0] === 0.5 ? '1/2' : show(round.terms[1] / round.terms[0])}.`, es: `Siempre se multiplica: r = ${round.terms[1] / round.terms[0] === 0.5 ? '1/2' : show(round.terms[1] / round.terms[0])}.`, en: `It is always multiplied: r = ${round.terms[1] / round.terms[0] === 0.5 ? '1/2' : show(round.terms[1] / round.terms[0])}.`, ar: `نضرب دائمًا: r = ${round.terms[1] / round.terms[0] === 0.5 ? '1/2' : show(round.terms[1] / round.terms[0])}.` })
            : round.kind === 'fibonacci'
                ? l({ eu: 'Gai bakoitza aurreko bien batura da.', es: 'Cada término es la suma de los dos anteriores.', en: 'Each term is the sum of the two before it.', ar: 'كل حد مجموع الحدين السابقين.' })
                : round.kind === 'squares'
                    ? l({ eu: 'Karratuak gehi zenbaki bat: kendurak 3, 5, 7, 9…', es: 'Cuadrados más un número: las restas son 3, 5, 7, 9…', en: 'Squares plus a number: the differences are 3, 5, 7, 9…', ar: 'مربعات زائد عدد: الفروق 3، 5، 7، 9…' })
                    : l({ eu: 'Kendurak gero eta handiagoak dira, beti kopuru berean.', es: 'Las restas crecen cada vez en la misma cantidad.', en: 'The differences grow by the same amount each time.', ar: 'تكبر الفروق كل مرة بالمقدار نفسه.' })
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {HIDDEN_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: HIDDEN_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <div className="segidak-sequence" dir="ltr" aria-label={round.terms.map((term, position) => (position === round.hole ? '?' : show(term))).join(', ')}>
                {round.terms.map((term, position) => <span key={position} className={position === round.hole ? 'hole' : ''}>{position === round.hole ? (picked === null ? '?' : show(round.answer)) : show(term)}</span>)}
                <span>…</span>
            </div>
            <div className="prop3-options" role="group" aria-label={l({ eu: 'Zein da falta den gaia?', es: '¿Qué término falta?', en: 'Which term is missing?', ar: 'ما الحد الناقص؟' })}>
                {round.options.map((option) => (
                    <button key={option} type="button" dir="ltr" disabled={picked !== null} className={picked === null ? '' : option === round.answer ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}>{show(option)}</button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> {rule}</p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= HIDDEN_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
