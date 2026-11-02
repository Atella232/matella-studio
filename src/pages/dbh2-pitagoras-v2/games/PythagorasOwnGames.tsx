import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundGameConfig, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import { WorkedDetectiveGame } from '../../../features/unit-v2/games/WorkedDetectiveGame'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { CLASSIFY_ROUNDS, classifyStars, createClassifyRounds, TRIANGLE_KINDS, type ClassifyRound, type TriangleKind } from './classify'
import { createPythagorasDetectiveCases, length, PYTHAGORAS_DETECTIVE_CASES, pythagorasDetectiveNames, pythagorasDetectiveTips } from './detective'
import { PythagorasGameArt } from './GameArt'
import { pythagorasGames, type PythagorasGameId } from './info'
import { createLadderRounds, LADDER_ROUNDS, ladderRight, ladderStars, ladderTarget, ladderTop, type LadderRound } from './ladder'
import './OwnGames.css'

/* ==========================================================================
   The three games of Pitagorasen teorema 2. DBH that belong to this
   topic: the ladder and what triangle is it (in the shared RoundGame) and
   the Pythagoras detective (the shared worked-solution detective).
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const info = (id: PythagorasGameId) => pythagorasGames.find((game) => game.id === id)!
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** A length in a sentence or a readout, with the language's decimal mark */
const metres = (value: number, language: UnitLanguage) => `${String(Math.round(value * 10) / 10).replace('.', language === 'eu' || language === 'es' ? ',' : '.')} ${language === 'ar' ? 'م' : 'm'}`

/* ---------- J1. The ladder ---------- */

function LadderScene({ round, value, leaned, right, language }: { round: LadderRound; value: number; leaned: boolean; right: boolean; language: UnitLanguage }) {
    // Metres to pixels: everything fits in 220 × 200 with the wall on the left
    const span = Math.max(round.height + 1.5, round.unknown === 'foot' ? round.ladder : round.foot + 2, round.foot + 2)
    const scale = 190 / span
    const wallX = 40
    const groundY = 220
    const x = (metresAlong: number) => wallX + metresAlong * scale
    const y = (metresUp: number) => groundY - metresUp * scale
    const foot = round.unknown === 'foot' ? value : round.foot
    const top = ladderTop(round, value)
    const label = (metresLong: number) => metres(metresLong, language)
    return (
        <svg className="pyth2-scene" viewBox="0 0 260 240" role="img" aria-hidden="true">
            <rect x={wallX - 16} y="10" width="16" height={groundY - 10} fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2" />
            <line x1="10" y1={groundY} x2="250" y2={groundY} stroke="var(--ink)" strokeWidth="3" />
            {/* The window, with its height */}
            <rect x={wallX - 16} y={y(round.height) - 14} width="16" height="18" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
            <line x1={wallX + 4} y1={y(round.height)} x2={wallX + 24} y2={y(round.height)} stroke="var(--blue, #2f5fb3)" strokeWidth="2" strokeDasharray="4 3" />
            <text x={wallX + 28} y={y(round.height) + 5} fontSize="13" fontWeight="700" fill="var(--blue, #2f5fb3)" direction="ltr">{label(round.height)}</text>
            {/* The foot of the ladder on the ground */}
            <line x1={wallX} y1={groundY + 10} x2={x(foot)} y2={groundY + 10} stroke="var(--muted)" strokeWidth="1.5" />
            <circle cx={x(foot)} cy={groundY} r="6" fill="var(--coral)" stroke="var(--ink)" strokeWidth="2" />
            {leaned && top > 0 && (
                <line className={`pyth2-ladder ${right ? 'right' : 'wrong'}`} x1={x(foot)} y1={groundY} x2={wallX} y2={y(top)} strokeWidth="6" strokeLinecap="round" />
            )}
            {!leaned && round.unknown === 'foot' && (
                <text x="140" y="40" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--ink)" direction="ltr">{label(round.ladder)}</text>
            )}
        </svg>
    )
}

function LadderPlay({ round, language, onAnswer, answered }: RoundProps<LadderRound>) {
    const l = useGameText(language)
    const [value, setValue] = useState(round.min)
    const right = ladderRight(round, value)
    const set = (next: number) => !answered && setValue(Math.round(Math.min(round.max, Math.max(round.min, next)) * 10) / 10)
    const target = ladderTarget(round)
    const prompt = round.unknown === 'foot'
        ? say(`${metres(round.ladder, 'eu')}-ko eskailera batek ${metres(round.height, 'eu')}-ko altueran dagoen leihoa ukitu behar du. Zenbat metrora jarri behar da oina hormatik?`, `Una escalera de ${metres(round.ladder, 'es')} tiene que llegar a una ventana a ${metres(round.height, 'es')} de altura. ¿A cuántos metros de la pared pones el pie?`, `سلّم طوله ${metres(round.ladder, 'ar')} يجب أن يصل إلى نافذة على ارتفاع ${metres(round.height, 'ar')}. على أي بعد من الجدار تضع قاعدته؟`, `A ${metres(round.ladder, 'en')} ladder has to reach a window ${metres(round.height, 'en')} high. How far from the wall do you put its foot?`)
        : say(`Oina hormatik ${metres(round.foot, 'eu')}-ra dago eta leihoa ${metres(round.height, 'eu')}-ko altueran. Zer eskailera behar da?`, `El pie está a ${metres(round.foot, 'es')} de la pared y la ventana a ${metres(round.height, 'es')} de altura. ¿Qué escalera hace falta?`, `القاعدة على بعد ${metres(round.foot, 'ar')} من الجدار والنافذة على ارتفاع ${metres(round.height, 'ar')}. ما طول السلّم اللازم؟`, `The foot is ${metres(round.foot, 'en')} from the wall and the window is ${metres(round.height, 'en')} high. What ladder do you need?`)
    const worked = round.unknown === 'foot'
        ? `d=\\sqrt{${length(round.ladder)}^{2}-${length(round.height)}^{2}}${round.step === 1 ? '=' : '\\approx '}${length(target)}`
        : `L=\\sqrt{${length(round.foot)}^{2}+${length(round.height)}^{2}}${round.step === 1 ? '=' : '\\approx '}${length(target)}`
    return (
        <>
            <p className="prop3-prompt pyth2-problem">{l(prompt)}</p>
            <LadderScene round={round} value={value} leaned={answered} right={right} language={language} />
            {!answered && (
                <div className="pyth2-controls">
                    <input type="range" min={round.min} max={round.max} step={round.step} value={value} onChange={(event) => set(Number(event.target.value))} aria-label={round.unknown === 'foot' ? l(say('Oinaren distantzia', 'Distancia del pie', 'بعد القاعدة', 'Distance of the foot')) : l(say('Eskaileraren luzera', 'Longitud de la escalera', 'طول السلّم', 'Length of the ladder'))} />
                    <Stepper
                        label={round.unknown === 'foot' ? l(say('Oina hormatik', 'Pie a la pared', 'بعد القاعدة عن الجدار', 'Foot to wall')) : l(say('Eskailera', 'Escalera', 'السلّم', 'Ladder'))}
                        value={value}
                        min={round.min}
                        max={round.max}
                        step={round.step}
                        format={(current) => metres(current, language)}
                        onChange={set}
                        language={language}
                    />
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Jarri eskailera', 'Apoya la escalera', 'أسند السلّم', 'Lean the ladder'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    {formula(worked, language)}{' '}
                    {right
                        ? l(say('Eskailera leihoraino iristen da.', 'La escalera llega justo a la ventana.', 'يصل السلّم إلى النافذة تمامًا.', 'The ladder reaches the window exactly.'))
                        : ladderTop(round, value) > round.height
                            ? l(say('Eskailera leihotik gora pasatzen da.', 'La escalera se pasa de la ventana.', 'يتجاوز السلّم النافذة.', 'The ladder goes past the window.'))
                            : l(say('Eskailera ez da leihora iristen.', 'La escalera no llega a la ventana.', 'لا يصل السلّم إلى النافذة.', 'The ladder does not reach the window.'))}
                </RoundVerdict>
            )}
        </>
    )
}

const ladderConfig: RoundGameConfig<LadderRound> = {
    game: info('ladder'),
    art: <PythagorasGameArt game="ladder" />,
    rounds: LADDER_ROUNDS,
    rules: [
        say('Horma, lurra eta eskailera triangelu angeluzuzen bat dira: eskailera hipotenusa da.', 'La pared, el suelo y la escalera forman un triángulo rectángulo: la escalera es la hipotenusa.', 'الجدار والأرض والسلّم تكوّن مثلثًا قائمًا: السلّم هو الوتر.', 'The wall, the ground and the ladder make a right-angled triangle: the ladder is the hypotenuse.'),
        say('Kalkulatu, jarri balioa eta sakatu botoia: orduan bakarrik ikusiko duzu eskailera.', 'Calcula, pon el valor y pulsa el botón: solo entonces verás la escalera.', 'احسب وضع القيمة واضغط الزر: عندها فقط سترى السلّم.', 'Work it out, set the value and press the button: only then will you see the ladder.'),
        say('3. mailan, hamarren batera biribildu.', 'En el nivel 3, redondea a las décimas.', 'في المستوى 3 قرّب إلى أقرب عُشر.', 'In level 3, round to one decimal place.')
    ],
    create: createLadderRounds,
    stars: ladderStars,
    starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
    Round: LadderPlay
}

export const LadderGame = (props: GameProps) => <RoundGame {...props} config={ladderConfig} />

/* ---------- J2. What triangle is it? ---------- */

const KIND_NAMES: Record<TriangleKind, LocalizedText> = {
    acute: say('Angelu-zorrotza', 'Acutángulo', 'حاد الزوايا', 'Acute'),
    right: say('Angeluzuzena', 'Rectángulo', 'قائم الزاوية', 'Right'),
    obtuse: say('Angelu-kamutsa', 'Obtusángulo', 'منفرج الزاوية', 'Obtuse')
}

/** c² against a² + b², in the numbers of the round */
function comparison(round: ClassifyRound): string {
    const [a, b, c] = [...round.sides].sort((left, right) => left - right)
    const square = (value: number) => length(value * value)
    const relation = round.kind === 'right' ? '=' : round.kind === 'acute' ? '<' : '>'
    return `${length(c)}^{2}=${square(c)}\\ ${relation}\\ ${square(a)}+${square(b)}=${length(a * a + b * b)}`
}

function ClassifyPlay({ round, language, onAnswer, answered }: RoundProps<ClassifyRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<TriangleKind | null>(null)
    const choose = (kind: TriangleKind) => {
        if (answered) return
        setPicked(kind)
        onAnswer(kind === round.kind)
    }
    const labels = round.sides.map((side) => formula(length(side), language))
    return (
        <>
            <p className="prop3-prompt">{l(say('Hiru alde hauek dituen triangelua…', 'El triángulo con estos tres lados es…', 'المثلث الذي له هذه الأضلاع الثلاثة…', 'The triangle with these three sides is…'))}</p>
            <div className="pyth2-sides" dir="ltr">
                {labels.map((label, index) => <span key={index}>{label}</span>)}
            </div>
            <div className="prop3-options pyth2-kinds" role="group" aria-label={l(say('Triangelu mota', 'Tipo de triángulo', 'نوع المثلث', 'Kind of triangle'))}>
                {TRIANGLE_KINDS.map((kind) => (
                    <button key={kind} type="button" disabled={answered} className={!answered ? '' : kind === round.kind ? 'right' : kind === picked ? 'wrong' : ''} onClick={() => choose(kind)}>{l(KIND_NAMES[kind])}</button>
                ))}
            </div>
            {answered && <RoundVerdict right={picked === round.kind} language={language}>{formula(comparison(round), language)}</RoundVerdict>}
        </>
    )
}

const classifyConfig: RoundGameConfig<ClassifyRound> = {
    game: info('classify'),
    art: <PythagorasGameArt game="classify" />,
    rounds: CLASSIFY_ROUNDS,
    rules: [
        say('Konparatu alde handienaren karratua beste bien karratuen baturarekin.', 'Compara el cuadrado del lado mayor con la suma de los cuadrados de los otros dos.', 'قارن مربع الضلع الأكبر بمجموع مربعي الضلعين الآخرين.', 'Compare the square of the longest side with the sum of the squares of the other two.'),
        say('Txikiagoa: angelu-zorrotza. Berdina: angeluzuzena. Handiagoa: angelu-kamutsa.', 'Menor: acutángulo. Igual: rectángulo. Mayor: obtusángulo.', 'أصغر: حاد الزوايا. يساوي: قائم الزاوية. أكبر: منفرج الزاوية.', 'Smaller: acute. Equal: right. Larger: obtuse.'),
        say(`${CLASSIFY_ROUNDS} triangelu maila bakoitzean; saiakera bat bakoitzeko.`, `${CLASSIFY_ROUNDS} triángulos por nivel; un intento en cada uno.`, `${CLASSIFY_ROUNDS} مثلثات في كل مستوى؛ محاولة واحدة لكل مثلث.`, `${CLASSIFY_ROUNDS} triangles per level; one try each.`)
    ],
    create: createClassifyRounds,
    stars: classifyStars,
    starsNote: say('3 izar: 8 · 2 izar: 6 · izar 1: 4', '3 estrellas: 8 · 2: 6 · 1: 4', '3 نجوم: 8 · 2: 6 · 1: 4', '3 stars: 8 · 2: 6 · 1: 4'),
    Round: ClassifyPlay
}

export const ClassifyGame = (props: GameProps) => <RoundGame {...props} config={classifyConfig} />

/* ---------- J3. The Pythagoras detective ---------- */

export const PythagorasDetectiveGame = (props: GameProps) => (
    <WorkedDetectiveGame
        {...props}
        config={{ game: info('detective'), art: <PythagorasGameArt game="detective" />, cases: PYTHAGORAS_DETECTIVE_CASES, createCases: createPythagorasDetectiveCases, names: pythagorasDetectiveNames, tips: pythagorasDetectiveTips }}
    />
)
