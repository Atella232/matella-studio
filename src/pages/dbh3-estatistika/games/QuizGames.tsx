import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { GameTopbar, LevelPicker, ResultPanel } from '../../../features/unit-v2/games/GameKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { createRandom, randomSeed, type Random } from '../../../features/unit-v2/games/random'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { Stats3GameArt } from './GameArt'
import { stats3Games, type Stats3GameId } from './info'
import { bagsWhy, createBagsRounds, createReadRounds, createVariableRounds, QUIZ_ROUNDS, quizStars, readWhy, type Bag, type BagChoice, type ChartKind, type VariableKind } from './quiz'
import './Games.css'

/* ==========================================================================
   The three picture and word games of Estatistika eta probabilitatea
   3. DBH share one board (as in Funtzioak 3. DBH): eight rounds, a chart,
   a survey question or two bags, three answers, a verdict with its reason.
   Each game only says how to make its rounds and how to draw them.
   ========================================================================== */

/** A bar chart of the frequencies of the values 1 to 5 */
function FrequencyChart({ counts }: { counts: number[] }) {
    const top = Math.max(...counts, 1)
    const X = (index: number) => 44 + index * 52
    const Y = (count: number) => 190 - (count / top) * 160
    return (
        <svg className="estatistika-chart" viewBox="0 0 320 220" direction="ltr" aria-hidden="true">
            {Array.from({ length: top + 1 }, (_, count) => <line key={count} x1={30} x2={300} y1={Y(count)} y2={Y(count)} stroke="var(--line, #e6dfd1)" />)}
            {Array.from({ length: top + 1 }, (_, count) => <text key={`t${count}`} x={24} y={Y(count) + 4} textAnchor="end" fontSize={11} fill="var(--muted)">{count}</text>)}
            {counts.map((count, index) => (
                <g key={index}>
                    <rect x={X(index)} y={Y(count)} width={36} height={190 - Y(count)} rx={3} fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth={2} />
                    <text x={X(index) + 18} y={208} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--ink)">{index + 1}</text>
                </g>
            ))}
            <line x1={30} x2={300} y1={190} y2={190} stroke="var(--ink)" strokeWidth={1.6} />
            <text x={300} y={18} textAnchor="end" fontSize={12} fontWeight={700} fill="var(--muted)">f</text>
        </svg>
    )
}

/** Two bags with their balls */
function TwoBags({ a, b }: { a: Bag; b: Bag }) {
    const balls = (bag: Bag) => [...Array(bag.red).fill('var(--coral, #c4432a)'), ...Array(bag.blue).fill('var(--blue, #2f6fdb)'), ...Array(bag.green).fill('var(--success, #267b53)')] as string[]
    const drawBag = (bag: Bag, x: number, name: string) => (
        <g>
            <path d={`M ${x + 20} 40 Q ${x} 60 ${x + 6} 150 Q ${x + 70} 176 ${x + 134} 150 Q ${x + 140} 60 ${x + 120} 40 Z`} fill="var(--card)" stroke="var(--ink)" strokeWidth={2} />
            {balls(bag).map((colour, index) => <circle key={index} cx={x + 30 + (index % 5) * 20} cy={70 + Math.floor(index / 5) * 22} r={8} fill={colour} stroke="var(--ink)" strokeWidth={1} />)}
            <text x={x + 70} y={26} textAnchor="middle" fontSize={18} fontWeight={700} fill="var(--ink)">{name}</text>
        </g>
    )
    return (
        <svg className="estatistika-bags" viewBox="0 0 320 180" direction="ltr" aria-hidden="true">
            {drawBag(a, 10, 'A')}
            {drawBag(b, 170, 'B')}
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
    id: Stats3GameId
    columns: number
    rules: LocalizedText[]
    rounds: (random: Random, level: number, language: GameProps['language']) => QuizRound[]
}

function QuizGame({ config, language, records, onResult, onExit }: GameProps & { config: QuizConfig }) {
    const game = stats3Games.find((item) => item.id === config.id)! as GameInfo<Stats3GameId>
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
                art={<Stats3GameArt game={config.id} />}
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

const MEASURE_QUESTION = {
    mode: say('Zein da moda?', '¿Cuál es la moda?', 'ما المنوال؟', 'What is the mode?'),
    median: say('Zein da mediana?', '¿Cuál es la mediana?', 'ما الوسيط؟', 'What is the median?'),
    mean: say('Zein da batez bestekoa?', '¿Cuál es la media?', 'ما المتوسط؟', 'What is the mean?')
}

const readConfig: QuizConfig = {
    id: 'read',
    columns: 3,
    rules: [
        say('Barra bakoitza balio bat da ($1$, $2$… $5$), eta haren altuera maiztasuna.', 'Cada barra es un valor (del 1 al 5) y su altura es la frecuencia.', 'كل عمود قيمة (من $1$ إلى $5$) وارتفاعه تكرارها.', 'Each bar is a value (1 to 5) and its height is the frequency.'),
        say('Aukeratu eskatzen den neurria.', 'Elige la medida que se pide.', 'اختر المقياس المطلوب.', 'Pick the measure that is asked for.')
    ],
    rounds: (random, level, language) => createReadRounds(random, level).map((round) => ({
        picture: (
            <>
                <FrequencyChart counts={round.counts} />
                <p className="estatistika-question">{MEASURE_QUESTION[round.measure][language]}</p>
            </>
        ),
        options: round.options.map((option) => ({ key: option, content: formula(option, language) })),
        answer: round.answer,
        why: readWhy(round)
    }))
}

const KIND_NAMES: Record<VariableKind, LocalizedText> = {
    qualitative: say('Kualitatiboa', 'Cualitativa', 'نوعي', 'Qualitative'),
    discrete: say('Kuantitatibo diskretua', 'Cuantitativa discreta', 'كمّي منفصل', 'Quantitative discrete'),
    continuous: say('Kuantitatibo jarraitua', 'Cuantitativa continua', 'كمّي متصل', 'Quantitative continuous')
}
const CHART_NAMES: Record<ChartKind, LocalizedText> = {
    pie: say('Sektore-diagrama', 'Diagrama de sectores', 'مخطط دائري', 'Pie chart'),
    bars: say('Barra-diagrama', 'Diagrama de barras', 'مخطط أعمدة', 'Bar chart'),
    histogram: say('Histograma', 'Histograma', 'مدرّج تكراري', 'Histogram')
}
const KIND_WHY: Record<VariableKind, LocalizedText> = {
    qualitative: say('Hitzekin erantzuten da: kualitatiboa. Sektore-diagrama batek osotasunean duen zatia erakusten du.', 'Se responde con palabras: cualitativa. Un diagrama de sectores muestra su parte del total.', 'يُجاب عنه بكلمات: نوعي. والمخطط الدائري يُظهر جزأه من الكل.', 'It is answered with words: qualitative. A pie chart shows its share of the whole.'),
    discrete: say('Zenbaki solteak (0, 1, 2…): diskretua. Barra bereiziak.', 'Números sueltos (0, 1, 2…): discreta. Barras separadas.', 'أعداد منفردة (0، 1، 2…): منفصل. أعمدة منفصلة.', 'Separate numbers (0, 1, 2…): discrete. Separate bars.'),
    continuous: say('Tarte bateko edozein balio: jarraitua. Histograma, laukizuzenak elkarren ondoan.', 'Cualquier valor de un intervalo: continua. Histograma, con rectángulos pegados.', 'أي قيمة في فترة: متصل. مدرّج تكراري بمستطيلات متلاصقة.', 'Any value in an interval: continuous. A histogram, with touching rectangles.')
}

const variableConfig: QuizConfig = {
    id: 'variable',
    columns: 1,
    rules: [
        say('Inkesta baten galdera bat ikusiko duzu.', 'Verás una pregunta de una encuesta.', 'سترى سؤالًا من استبيان.', 'You will see a survey question.'),
        say('Esan zer aldagai mota den, edo zer grafikok balio duen hobekien.', 'Di qué tipo de variable es, o qué gráfico le va mejor.', 'قل ما نوع المتغيّر أو أي مخطط يناسبه أكثر.', 'Say what kind of variable it is, or which chart suits it best.')
    ],
    rounds: (random, level, language) => createVariableRounds(random, level).map((round) => ({
        picture: (
            <div className="estatistika-survey">
                <strong>{round.survey.text[language]}</strong>
                <span>{(round.asks === 'kind' ? say('Zer aldagai mota da?', '¿Qué tipo de variable es?', 'ما نوع المتغيّر؟', 'What kind of variable is it?') : say('Zer grafiko da egokiena?', '¿Qué gráfico es el más adecuado?', 'أي مخطط هو الأنسب؟', 'Which chart suits it best?'))[language]}</span>
            </div>
        ),
        options: round.asks === 'kind'
            ? (Object.keys(KIND_NAMES) as VariableKind[]).map((kind) => ({ key: kind, content: KIND_NAMES[kind][language] }))
            : (Object.keys(CHART_NAMES) as ChartKind[]).map((chart) => ({ key: chart, content: CHART_NAMES[chart][language] })),
        answer: round.answer,
        why: KIND_WHY[round.survey.kind]
    }))
}

const CHOICE_NAMES: Record<BagChoice, LocalizedText> = {
    A: say('A poltsa', 'Bolsa A', 'الكيس A', 'Bag A'),
    B: say('B poltsa', 'Bolsa B', 'الكيس B', 'Bag B'),
    same: say('Berdin', 'Igual', 'متساويان', 'The same')
}

const bagsConfig: QuizConfig = {
    id: 'bags',
    columns: 3,
    rules: [
        say('Bi poltsa ikusiko dituzu. Bola bat ausaz aterako duzu.', 'Verás dos bolsas. Sacarás una bola al azar.', 'سترى كيسين. ستسحب كرة عشوائيًا.', 'You will see two bags. You will draw one ball at random.'),
        say('Zeinetan da probableagoa eskatutako kolorea? Edo berdin?', '¿En cuál es más probable el color pedido? ¿O igual?', 'في أيهما يكون اللون المطلوب أرجح؟ أم متساويان؟', 'In which is the colour asked for more likely? Or the same?')
    ],
    rounds: (random, level, language) => createBagsRounds(random, level).map((round) => ({
        picture: (
            <>
                <TwoBags a={round.a} b={round.b} />
                <p className="estatistika-question">{(round.colour === 'red' ? say('Zeinetan da probableagoa bola gorria?', '¿En cuál es más probable sacar roja?', 'في أيهما تكون الحمراء أرجح؟', 'In which is a red ball more likely?') : say('Zeinetan da probableagoa bola urdina?', '¿En cuál es más probable sacar azul?', 'في أيهما تكون الزرقاء أرجح؟', 'In which is a blue ball more likely?'))[language]}</p>
            </>
        ),
        options: (['A', 'B', 'same'] as BagChoice[]).map((choice) => ({ key: choice, content: CHOICE_NAMES[choice][language] })),
        answer: round.answer,
        why: bagsWhy(round)
    }))
}

export const ReadGame = (props: GameProps) => <QuizGame {...props} config={readConfig} />
export const VariableGame = (props: GameProps) => <QuizGame {...props} config={variableConfig} />
export const BagsGame = (props: GameProps) => <QuizGame {...props} config={bagsConfig} />
