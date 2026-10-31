import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed, type Random } from '../../../features/unit-v2/games/random'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { Functions3GameArt } from './GameArt'
import { functions3Games, type Functions3GameId } from './info'
import { createMatchRounds, createSignsRounds, createStoryRounds, curveAt, QUIZ_ROUNDS, quizStars, SIGN_LETTERS, SIGN_PAIRS, signsLatex, signsWhy, type Curve } from './quiz'
import './Games.css'

/* ==========================================================================
   The three picture games of Funtzioak 3. DBH share one board: eight
   rounds, a graph or a story, three or four answers, a verdict with its
   reason. Each game only says how to make its rounds and how to draw them.
   ========================================================================== */

/** A graph on a grid from −6 to 6 (or the walk from 0 to 4 hours), clipped to its frame */
export function MiniGraph({ curve, size = 300, colour = 'var(--stage, #2f6fdb)' }: { curve: Curve; size?: number; colour?: string }) {
    const walk = curve.kind === 'walk'
    const box = walk ? { xMin: 0, xMax: 4, yMin: 0, yMax: 10 } : { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    const pad = 10
    const X = (x: number) => pad + ((x - box.xMin) / (box.xMax - box.xMin)) * (size - 2 * pad)
    const Y = (y: number) => size - pad - ((y - box.yMin) / (box.yMax - box.yMin)) * (size - 2 * pad)
    const xs = Array.from({ length: box.xMax - box.xMin + 1 }, (_, index) => box.xMin + index)
    const ys = Array.from({ length: box.yMax - box.yMin + 1 }, (_, index) => box.yMin + index)
    const steps = walk ? curve.positions.map((_, index) => index) : Array.from({ length: 121 }, (_, index) => box.xMin + index / 10)
    const id = `funtzioak-clip-${size}`
    return (
        <svg className="funtzioak-mini-graph" viewBox={`0 0 ${size} ${size}`} direction="ltr" aria-hidden="true">
            <defs><clipPath id={id}><rect x={pad} y={pad} width={size - 2 * pad} height={size - 2 * pad} /></clipPath></defs>
            {xs.map((x) => <line key={`x${x}`} x1={X(x)} x2={X(x)} y1={Y(box.yMin)} y2={Y(box.yMax)} stroke={x === 0 ? 'var(--muted)' : 'var(--line, #e6dfd1)'} strokeWidth={x === 0 ? 1.4 : 1} />)}
            {ys.map((y) => <line key={`y${y}`} y1={Y(y)} y2={Y(y)} x1={X(box.xMin)} x2={X(box.xMax)} stroke={y === 0 ? 'var(--muted)' : 'var(--line, #e6dfd1)'} strokeWidth={y === 0 ? 1.4 : 1} />)}
            {!walk && <text x={X(1)} y={Y(0) + 13} textAnchor="middle" fontSize={11} fill="var(--muted)">1</text>}
            {!walk && <text x={X(0) - 5} y={Y(1) + 4} textAnchor="end" fontSize={11} fill="var(--muted)">1</text>}
            <polyline clipPath={`url(#${id})`} points={steps.map((x) => `${X(x)},${Y(curveAt(curve, x))}`).join(' ')} fill="none" stroke={colour} strokeWidth={3.2} strokeLinejoin="round" />
            {walk && curve.positions.map((d, t) => <circle key={t} cx={X(t)} cy={Y(d)} r={3.4} fill={colour} />)}
        </svg>
    )
}

interface QuizRound {
    /** What is shown above the answers */
    picture: ReactNode
    /** Key and look of every answer */
    options: Array<{ key: string; content: ReactNode }>
    answer: string
    why: LocalizedText
}

interface QuizConfig {
    id: Functions3GameId
    columns: number
    rules: LocalizedText[]
    rounds: (random: Random, level: number, language: GameProps['language']) => QuizRound[]
}

function QuizGame({ config, language, records, onResult, onExit }: GameProps & { config: QuizConfig }) {
    const game = functions3Games.find((item) => item.id === config.id)! as GameInfo<Functions3GameId>
    const l = useGameText(language)
    const [phase, setPhase] = useState<'pick' | 'playing' | 'finished'>('pick')
    const [level, setLevel] = useState(0)
    const [rounds, setRounds] = useState<QuizRound[]>([])
    const [index, setIndex] = useState(0)
    const [picked, setPicked] = useState<string | null>(null)
    const [results, setResults] = useState<boolean[]>([])
    const round = rounds[index]
    const score = results.filter(Boolean).length

    const start = (nextLevel: number) => {
        setLevel(nextLevel)
        setRounds(config.rounds(createRandom(randomSeed()), nextLevel, language))
        setIndex(0)
        setPicked(null)
        setResults([])
        setPhase('playing')
    }

    const choose = (key: string) => {
        if (picked !== null) return
        setPicked(key)
        setResults([...results, key === round.answer])
    }

    const next = () => {
        if (index + 1 >= QUIZ_ROUNDS) {
            onResult(level, { stars: quizStars(score), score, timeMs: null })
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
                art={<Functions3GameArt game={config.id} />}
                language={language}
                records={records}
                onStart={start}
                onExit={onExit}
                bestLabel={(record) => `${l({ eu: 'Marka', es: 'Récord', en: 'Record', ar: 'الرقم' })}: ${record.score} / ${QUIZ_ROUNDS}`}
                howTo={<ul className="fraction-v2-game-rules">{config.rules.map((rule) => <li key={rule.es}><MathText text={l(rule)} inline /></li>)}</ul>}
            />
        )
    }

    if (phase === 'finished') {
        return (
            <div className="prop3-game">
                <GameTopbar game={game} language={language} onExit={onExit} />
                <ResultPanel
                    language={language}
                    stars={quizStars(score)}
                    title={`${score} / ${QUIZ_ROUNDS}`}
                    subtitle={l({ eu: '3 izar: 8 asmatu · 2 izar: 6 · izar 1: 4', es: '3 estrellas: 8 aciertos · 2: 6 · 1: 4', en: '3 stars: 8 correct · 2: 6 · 1: 4', ar: '3 نجوم: 8 إجابات صحيحة · 2: 6 · 1: 4' })}
                    stats={[{ label: l({ eu: 'Asmatuak', es: 'Aciertos', en: 'Correct answers', ar: 'الإجابات الصحيحة' }), value: `${score} / ${QUIZ_ROUNDS}` }]}
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
                <span>{index + 1} / {QUIZ_ROUNDS}</span>
                <span><strong>{score}</strong> {l({ eu: 'asmatu', es: 'aciertos', en: 'correct', ar: 'صحيحة' })}</span>
            </GameTopbar>
            <div className="prop3-dots" aria-hidden="true">
                {Array.from({ length: QUIZ_ROUNDS }, (_, position) => <span key={position} className={position < results.length ? (results[position] ? 'right' : 'wrong') : position === index ? 'now' : ''} />)}
            </div>
            {round.picture}
            <div className="prop3-options funtzioak-options" role="group" aria-label={l({ eu: 'Aukerak', es: 'Opciones', en: 'Options', ar: 'الخيارات' })} style={{ gridTemplateColumns: `repeat(${config.columns}, 1fr)` }}>
                {round.options.map((option) => (
                    <button key={option.key} type="button" disabled={picked !== null} className={picked === null ? '' : option.key === round.answer ? 'right' : option.key === picked ? 'wrong' : ''} onClick={() => choose(option.key)}>{option.content}</button>
                ))}
            </div>
            {picked !== null && (
                <div className="prop3-panel" aria-live="polite">
                    <p className={`prop3-verdict ${right ? 'right' : 'wrong'}`}><strong>{right ? l({ eu: 'Zuzena!', es: '¡Correcto!', en: 'Correct!', ar: 'صحيح!' }) : l({ eu: 'Ez.', es: 'No.', en: 'No.', ar: 'لا.' })}</strong> <MathText text={l(round.why)} inline /></p>
                    <button type="button" className="fraction-v2-primary" onClick={next} ref={(node) => node?.focus({ preventScroll: true })}>
                        {index + 1 >= QUIZ_ROUNDS ? l({ eu: 'Emaitza ikusi', es: 'Ver resultado', en: 'See the result', ar: 'اعرض النتيجة' }) : l({ eu: 'Hurrengoa', es: 'Siguiente', en: 'Next', ar: 'التالي' })}
                    </button>
                </div>
            )}
        </div>
    )
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: GameProps['language']) => <MathText text={`$${localLatex(latex, language)}$`} inline />

const matchConfig: QuizConfig = {
    id: 'match',
    columns: 2,
    rules: [
        say('Begiratu grafikoa: non mozten du Y ardatza eta nola igotzen edo jaisten da?', 'Mira la gráfica: ¿dónde corta al eje Y y cómo sube o baja?', 'انظر إلى التمثيل: أين يقطع محور Y وكيف يصعد أو ينزل؟', 'Look at the graph: where does it meet the Y axis and how does it rise or fall?'),
        say('Aukeratu bere ekuazioa lau aukeren artean.', 'Elige su ecuación entre cuatro.', 'اختر معادلته من بين أربع.', 'Pick its equation out of four.')
    ],
    rounds: (random, level, language) => createMatchRounds(random, level).map((round) => ({
        picture: <MiniGraph curve={round.curve} />,
        options: round.options.map((option) => ({ key: option, content: formula(option, language) })),
        answer: round.answer,
        why: round.why
    }))
}

const storyConfig: QuizConfig = {
    id: 'story',
    columns: 3,
    rules: [
        say('Irakurri ibilaldia: zati bakoitza ordubete da.', 'Lee el paseo: cada tramo es una hora.', 'اقرأ النزهة: كل جزء ساعة واحدة.', 'Read the walk: each stretch is one hour.'),
        say('Aukeratu etxetik dagoen distantzia kontatzen duen grafikoa.', 'Elige la gráfica que cuenta la distancia a casa.', 'اختر التمثيل الذي يروي البعد عن البيت.', 'Pick the graph of the distance from home.')
    ],
    rounds: (random, level, language) => createStoryRounds(random, level).map((round) => ({
        picture: <p className="funtzioak-story">{round.story[language]}</p>,
        options: round.options.map((positions) => ({ key: positions.join(','), content: <MiniGraph curve={{ kind: 'walk', positions }} size={160} /> })),
        answer: round.answer.join(','),
        why: say(
            `Distantziak orduz ordu: ${round.answer.join(' → ')} km. Gora urruntzen da, horizontalean geldirik dago eta behera etxera hurbiltzen da.`,
            `Distancias hora a hora: ${round.answer.join(' → ')} km. Sube al alejarse, es horizontal al pararse y baja al acercarse a casa.`,
            `المسافات ساعة بساعة: ${round.answer.join(' → ')} كم. يصعد عند الابتعاد، ويكون أفقيًا عند التوقف، وينزل عند الاقتراب من البيت.`,
            `Distances hour by hour: ${round.answer.join(' → ')} km. It rises moving away, is flat when stopped and falls coming home.`
        )
    }))
}

const signsConfig: QuizConfig = {
    id: 'signs',
    columns: 2,
    rules: [
        say('Zuzen batean: igotzen bada $m>0$; Y ardatza 0-tik gora mozten badu $n>0$.', 'En una recta: si sube, $m>0$; si corta al eje Y por encima del 0, $n>0$.', 'في المستقيم: إذا صعد فإن $m>0$؛ وإذا قطع محور Y فوق $0$ فإن $n>0$.', 'On a line: rising means $m>0$; meeting the Y axis above 0 means $n>0$.'),
        say('Parabola batean: gora irekitzen bada $a>0$; $c$ Y ardatzeko puntua da; $x_{v}$ erpinaren $x$ da.', 'En una parábola: si se abre hacia arriba, $a>0$; $c$ es el corte con el eje Y; $x_{v}$ es la $x$ del vértice.', 'في القطع المكافئ: إذا انفتح إلى الأعلى فإن $a>0$؛ و$c$ تقاطعه مع محور Y؛ و$x_{v}$ هو $x$ للرأس.', 'On a parabola: opening upwards means $a>0$; $c$ is where it meets the Y axis; $x_{v}$ is the $x$ of the vertex.')
    ],
    rounds: (random, level, language) => createSignsRounds(random, level).map((round) => ({
        picture: <MiniGraph curve={round.curve} />,
        options: SIGN_PAIRS.map((pair) => ({ key: pair, content: formula(signsLatex(pair, SIGN_LETTERS[level]), language) })),
        answer: round.answer,
        why: signsWhy(round, level)
    }))
}

export const MatchGame = (props: GameProps) => <QuizGame {...props} config={matchConfig} />
export const SignsGame = (props: GameProps) => <QuizGame {...props} config={signsConfig} />
export const StoryGame = (props: GameProps) => <QuizGame {...props} config={storyConfig} />
