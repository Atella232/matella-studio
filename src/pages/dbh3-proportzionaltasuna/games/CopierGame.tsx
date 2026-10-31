import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed } from '../../../features/unit-v2/games/random'
import { COPIER_BUTTONS, COPIER_ROUNDS, copierStars, createCopierRounds, indexOf, press, type CopierRound } from './copier'
import { isolate, num, percentText } from './format'
import { Proportion3GameArt } from './GameArt'
import { proportion3Games } from './info'
import './Games.css'

const game = proportion3Games.find((item) => item.id === 'copier')!

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const BLUE = 'var(--blue, #2f6fdb)'
const BLUE_TINT = 'var(--blue-tint, #dde7f7)'
const CORAL = 'var(--coral, #c4432a)'
const GREEN = 'var(--success, #267b53)'

/** The photo and the frame it has to fill, both drawn to the same scale */
function Photo({ size, target, start, done }: { size: number; target: number; start: number; done: boolean }) {
    const largest = Math.max(size, target, start)
    const scale = 300 / largest
    const w = size * scale
    const h = w * 0.7
    const tw = target * scale
    const th = tw * 0.7
    const height = Math.max(h, th) + 20
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={`${size / 100} → ${target / 100}`} style={{ display: 'block', width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <rect x={30} y={10} width={tw} height={th} fill="none" stroke={done && size === target ? GREEN : CORAL} strokeWidth={2.5} strokeDasharray="7 6" />
            <rect x={30} y={10} width={w} height={h} fill={BLUE_TINT} stroke={BLUE} strokeWidth={2} opacity={0.9} />
            <circle cx={30 + w * 0.3} cy={10 + h * 0.35} r={Math.max(3, h * 0.12)} fill="#fbebc0" stroke={INK} strokeWidth={1.2} />
            <path d={`M${30} ${10 + h} L${30 + w * 0.4} ${10 + h * 0.5} L${30 + w * 0.65} ${10 + h * 0.75} L${30 + w * 0.8} ${10 + h * 0.6} L${30 + w} ${10 + h}`} fill="#cfd9c1" stroke={MUTED} strokeWidth={1.2} />
        </svg>
    )
}

export function CopierGame({ language, records, onResult, onExit }: GameProps) {
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<CopierRound[]>([])
    const [index, setIndex] = useState(0)
    const [sequence, setSequence] = useState<number[]>([])
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(createCopierRounds(createRandom(randomSeed()), nextLevel))
        setIndex(0)
        setSequence([])
        setResults([])
        setPhase('playing')
    }

    const size = round ? sequence.reduce<number>((current, percent) => press(current, percent) ?? current, round.start) : 0
    const done = round !== undefined && sequence.length === round.presses

    const tap = (percent: number) => {
        if (!round || done) return
        const next = [...sequence, percent]
        setSequence(next)
        if (next.length === round.presses) {
            const after = next.reduce<number>((current, value) => press(current, value) ?? current, round.start)
            setResults([...results, after === round.target])
        }
    }

    const next = () => {
        if (index + 1 >= COPIER_ROUNDS) {
            onResult(level, { stars: copierStars(score), score, timeMs: null })
            setPhase('finished')
            return
        }
        setIndex(index + 1)
        setSequence([])
    }

    if (phase === 'pick') {
        return (
            <LevelPicker
                game={game}
                art={<Proportion3GameArt game="copier" />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${COPIER_ROUNDS}`}
                howTo={(
                    <ul className="fraction-v2-game-rules">
                        <li>{l({ eu: 'Argazkiak neurri zehatza izan behar du. Botoi bakoitzak ehuneko batean handitzen edo txikitzen du.', es: 'La foto tiene que salir a una medida exacta. Cada botón amplía o reduce un porcentaje.', en: 'The photo has to come out at an exact size. Each button enlarges or reduces it by a percentage.', ar: 'يجب أن تخرج الصورة بمقاس دقيق. كل زر يكبّر أو يصغّر بنسبة مئوية.' })}</li>
                        <li>{l({ eu: 'Bigarren sakatzea lehenaren ondorengo neurriari aplikatzen zaio: indizeak biderkatzen dira.', es: 'La segunda pulsación se aplica a la medida que quedó tras la primera: los índices se multiplican.', en: 'The second press applies to the size left after the first: the indices are multiplied.', ar: 'الضغطة الثانية تُطبَّق على المقاس الناتج عن الأولى: تُضرب المؤشرات.' })}</li>
                        <li>{l({ eu: `${COPIER_ROUNDS} argazki; sakatze kopuru finkoa bakoitzean.`, es: `${COPIER_ROUNDS} fotos; un número fijo de pulsaciones en cada una.`, en: `${COPIER_ROUNDS} photos; a fixed number of presses for each one.`, ar: `${COPIER_ROUNDS} صور؛ وعدد ثابت من الضغطات لكل صورة.` })}</li>
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
                    stars={copierStars(score)}
                    title={`${score} / ${COPIER_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 6 asmatu · 2 izar: 5 · izar 1: 3', es: '3 estrellas: 6 aciertos · 2: 5 · 1: 3', en: '3 stars: 6 correct · 2: 5 · 1: 3', ar: '3 نجوم: 6 إجابات صحيحة · 2: 5 · 1: 3' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${COPIER_ROUNDS}` }]}
                    onReplay={() => start(level)}
                    onNext={level < game.levels.length - 1 ? () => start(level + 1) : undefined}
                    onLevels={() => setPhase('pick')}
                />
            </div>
        )
    }

    if (!round) return <></>
    const right = done && size === round.target
    const cm = (value: number) => isolate(`${num(value / 100, language)} ${language === 'ar' ? 'سم' : 'cm'}`, language)
    const indices = (list: number[]) => list.map((percent) => num(indexOf(percent), language).replace(',', '{,}')).join('\\cdot ')
    const total = (list: number[]) => num(list.reduce((product, percent) => product * indexOf(percent), 1), language, 4).replace(',', '{,}')
    return (
        <div className="prop3-game">
            <GameTopbar game={game} language={language} onExit={onExit}>
                <span>{index + 1} / {COPIER_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: COPIER_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            <p className="prop3-prompt">
                {l({ eu: `Hasieran ${cm(round.start)}. Lortu ${round.presses} sakatzetan:`, es: `Empieza en ${cm(round.start)}. Consíguelo en ${round.presses} pulsaciones:`, en: `It starts at ${cm(round.start)}. Get it in ${round.presses} presses:`, ar: `تبدأ بمقاس ${cm(round.start)}. احصل عليه في ${round.presses} ضغطات:` })}
                <strong>{cm(round.target)}</strong>
            </p>
            <Photo size={size} target={round.target} start={round.start} done={done} />
            <p className="prop3-sum">{l({ eu: `Orain: ${cm(size)} · ${round.presses - sequence.length} sakatze falta`, es: `Ahora: ${cm(size)} · quedan ${round.presses - sequence.length} pulsaciones`, en: `Now: ${cm(size)} · ${round.presses - sequence.length} presses left`, ar: `الآن: ${cm(size)} · بقي ${round.presses - sequence.length} ضغطات` })}</p>
            <div className="prop3-trail" aria-live="polite">
                {sequence.map((percent, position) => <span key={position}>{percentText(percent, language)}</span>)}
            </div>
            <div className="prop3-buttons" role="group" aria-label={l({ eu: 'Botoiak', es: 'Botones', en: 'Buttons', ar: 'الأزرار' })}>
                {COPIER_BUTTONS[level].map((percent) => (
                    <button key={percent} type="button" className={percent > 0 ? 'up' : 'down'} disabled={done} onClick={() => tap(percent)}>{percentText(percent, language)}</button>
                ))}
            </div>
            {!done && sequence.length > 0 && (
                <button type="button" className="fraction-v2-hint-button" onClick={() => setSequence(sequence.slice(0, -1))}>{l({ eu: 'Desegin', es: 'Deshacer', en: 'Undo', ar: 'تراجع' })}</button>
            )}
            {done && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}>
                        <strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: `Ez: ${cm(size)} atera da.`, es: `No: ha salido ${cm(size)}.`, en: `No: it came out at ${cm(size)}.`, ar: `لا: خرج المقاس ${cm(size)}.` })}</strong>
                    </p>
                    <MathText text={`$${indices(sequence)}=${total(sequence)}$`} />
                    {!right && <p>{l({ eu: 'Bide bat:', es: 'Un camino:', en: 'One way:', ar: 'طريقة:' })} <MathText text={`$${indices(round.solution)}=${total(round.solution)}$`} inline /> ({round.solution.map((percent) => percentText(percent, language)).join(', ')})</p>}
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= COPIER_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}
