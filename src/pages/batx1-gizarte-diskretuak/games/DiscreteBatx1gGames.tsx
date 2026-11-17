import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx2-zientziak-banaketak/games/DistributionsBatx2Games.css'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability'
import { choose } from '../../batx2-zientziak-banaketak/binomial'
import './DiscreteBatx1gGames.css'
import { createEventsRounds, EVENTS_ROUNDS, eventsBinomialLatex, type EventsRound } from './eventsGame'
import { createGaltonRounds, GALTON_ROUNDS, type GaltonRound } from './galtonGame'
import { createWorthRounds, eurosLatex, gainOf, WORTH_ROUNDS, type Verdict, type WorthRound } from './worthGame'

/* ==========================================================================
   Diskretuak · Batxilergoa 1 · Gizarte Zientziak — three games played in
   rounds: which bin? (the Galton board), translate the event (words to
   symbols and sums) and is it worth it? (the mean gain of raffles and
   games). Logic in galtonGame.ts, eventsGame.ts and worthGame.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const choiceClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')

/** Three options in a column; the picked one is checked */
function Options({ options, answer, answered, onPick, render }: { options: string[]; answer: number; answered: boolean; onPick: (index: number) => void; render: (option: string) => ReactNode }) {
    const [picked, setPicked] = useState<number | null>(null)
    return (
        <div className="prop3-options prob2-stack">
            {options.map((option, index) => (
                <button key={option} type="button" disabled={answered} className={choiceClass(answered, index === answer, index === picked)} onClick={() => { if (answered) return; setPicked(index); onPick(index) }}>
                    {render(option)}
                </button>
            ))}
        </div>
    )
}

/* ---------- Which bin? ---------- */

function GaltonPlay({ round, level, language, onAnswer, answered }: RoundProps<GaltonRound>) {
    const l = useGameText(language)
    const [right, setRight] = useState(false)
    const question = level === 0
        ? say(`${round.rows} errenkada. Bolak bide hau egiten du. Zein kutxatilatara erortzen da (0 ezkerrekoa da)?`, `${round.rows} filas. La bola hace este camino. ¿En qué casilla cae (la 0 es la de la izquierda)?`, `${round.rows} صفوف. تسلك الكرة هذا المسار. في أي خانة تسقط (الخانة 0 هي اليسرى)؟`, `${round.rows} rows. The ball takes this path. Which bin does it land in (bin 0 is the left one)?`)
        : level === 1
            ? say(`${round.rows} errenkada. Zenbat bide iristen dira ${round.bin}. kutxatilara?`, `${round.rows} filas. ¿Cuántos caminos llegan a la casilla ${round.bin}?`, `${round.rows} صفوف. كم مسارًا يصل إلى الخانة ${round.bin}؟`, `${round.rows} rows. How many paths reach bin ${round.bin}?`)
            : say(`${round.rows} errenkada, tresna zuzena. Zein da ${round.bin}. kutxatilara erortzeko probabilitatea?`, `${round.rows} filas, tablero recto. ¿Qué probabilidad hay de caer en la casilla ${round.bin}?`, `${round.rows} صفوف واللوح مستقيم. ما احتمال السقوط في الخانة ${round.bin}؟`, `${round.rows} rows, a straight board. What is the probability of landing in bin ${round.bin}?`)
    const explanation = level === 0
        ? say(`Eskuinera ${round.bin} aldiz joan da: ${round.bin}. kutxatila.`, `Ha ido ${round.bin} veces a la derecha: casilla ${round.bin}.`, `اتجهت يمينًا ${round.bin} مرات: الخانة ${round.bin}.`, `It went right ${round.bin} times: bin ${round.bin}.`)
        : level === 1
            ? say(`Zein ${round.bin} errenkadatan doan eskuinera aukeratzea: $\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$.`, `Es elegir en qué ${round.bin} filas va a la derecha: $\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$.`, `هو اختيار الصفوف التي تتجه فيها يمينًا: $\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$.`, `It is choosing in which ${round.bin} rows it goes right: $\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$.`)
            : say(`$\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$ bide, $2^{${round.rows}}=${2 ** round.rows}$ bidetik.`, `$\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$ caminos de $2^{${round.rows}}=${2 ** round.rows}$.`, `$\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$ مسارًا من $2^{${round.rows}}=${2 ** round.rows}$.`, `$\\binom{${round.rows}}{${round.bin}}=${choose(round.rows, round.bin)}$ paths out of $2^{${round.rows}}=${2 ** round.rows}$.`)
    return (
        <>
            <p className="prob2-question"><MathText text={l(question)} /></p>
            {level === 0 && <p className="disc1-path" dir="ltr">{round.path.map((move) => (move ? '→' : '←')).join(' ')}</p>}
            <Options options={round.options} answer={round.answer} answered={answered} onPick={(index) => { setRight(index === round.answer); onAnswer(index === round.answer) }} render={(option) => formula(option, language)} />
            {answered && <RoundVerdict right={right} language={language}><MathText text={l(explanation)} /></RoundVerdict>}
        </>
    )
}

export function GaltonGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: GALTON_ROUNDS,
                rules: [
                    say('Iltze bakoitzean bola eskuinera (→) edo ezkerrera (←) doa.', 'En cada clavo la bola va a la derecha (→) o a la izquierda (←).', 'عند كل مسمار تتجه الكرة يمينًا (→) أو يسارًا (←).', 'At each pin the ball goes right (→) or left (←).'),
                    say('Kutxatila eskuinera egindako jauzien kopurua da.', 'La casilla es el número de saltos a la derecha.', 'الخانة هي عدد القفزات إلى اليمين.', 'The bin is the number of jumps to the right.'),
                    say('$k$ kutxatilara $\\binom{n}{k}$ bide iristen dira, $2^n$ bidetik.', 'A la casilla $k$ llegan $\\binom{n}{k}$ caminos de $2^n$.', 'تصل إلى الخانة $k$ $\\binom{n}{k}$ مسارًا من $2^n$.', '$\\binom{n}{k}$ of the $2^n$ paths reach bin $k$.')
                ],
                create: createGaltonRounds,
                stars: standardStars(GALTON_ROUNDS),
                starsNote: STARS_NOTE,
                Round: GaltonPlay
            }}
        />
    )
}

/* ---------- Translate the event ---------- */

function EventsPlay({ round, level, language, onAnswer, answered }: RoundProps<EventsRound>) {
    const l = useGameText(language)
    const [right, setRight] = useState(false)
    const event = l(round.event)
    const question = level === 0
        ? say(`Nola idazten da «${event}»?`, `¿Cómo se escribe «${event}»?`, `كيف يُكتب «${event}»؟`, `How is ‘${event}’ written?`)
        : level === 1
            ? say(`$${eventsBinomialLatex(round)}$. Nola kalkulatzen da «${event}»?`, `$${eventsBinomialLatex(round)}$. ¿Cómo se calcula «${event}»?`, `$${eventsBinomialLatex(round)}$. كيف يُحسب «${event}»؟`, `$${eventsBinomialLatex(round)}$. How is ‘${event}’ worked out?`)
            : say(`$${eventsBinomialLatex(round)}$. Zenbat da «${event}» gertaeraren probabilitatea?`, `$${eventsBinomialLatex(round)}$. ¿Qué probabilidad tiene «${event}»?`, `$${eventsBinomialLatex(round)}$. ما احتمال «${event}»؟`, `$${eventsBinomialLatex(round)}$. What is the probability of ‘${event}’?`)
    const answerLatex = round.options[round.answer]
    return (
        <>
            <p className="dist2-situation"><MathText text={l(round.context)} /></p>
            <p className="prob2-question"><MathText text={l(question)} /></p>
            <Options options={round.options} answer={round.answer} answered={answered} onPick={(index) => { setRight(index === round.answer); onAnswer(index === round.answer) }} render={(option) => formula(option, language)} />
            {answered && <RoundVerdict right={right} language={language}><MathText text={`$${localLatex(answerLatex, language)}$`} /></RoundVerdict>}
        </>
    )
}

export function EventsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: EVENTS_ROUNDS,
                rules: [
                    say('«Gutxienez $k$»: $X\\ge k$. «$k$ baino gehiago»: $X>k$. «Gehienez $k$»: $X\\le k$.', '«Al menos $k$»: $X\\ge k$. «Más de $k$»: $X>k$. «Como mucho $k$»: $X\\le k$.', '«$k$ على الأقل»: $X\\ge k$. «أكثر من $k$»: $X>k$. «$k$ على الأكثر»: $X\\le k$.', '‘At least $k$’: $X\\ge k$. ‘More than $k$’: $X>k$. ‘At most $k$’: $X\\le k$.'),
                    say('«Gutxienez bat» $1-P(X=0)$ da, eta «bat ere ez», $q^n$.', '«Al menos uno» es $1-P(X=0)$, y «ninguno», $q^n$.', '«واحد على الأقل» هو $1-P(X=0)$، و«لا أحد» هو $q^n$.', '‘At least one’ is $1-P(X=0)$, and ‘none’, $q^n$.')
                ],
                create: createEventsRounds,
                stars: standardStars(EVENTS_ROUNDS),
                starsNote: STARS_NOTE,
                Round: EventsPlay
            }}
        />
    )
}

/* ---------- Is it worth it? ---------- */

const VERDICT_NAMES: Record<Verdict, ReturnType<typeof say>> = {
    unfavourable: say('Kontrakoa', 'Desfavorable', 'ضد اللاعب', 'Unfavourable'),
    fair: say('Bidezkoa', 'Justo', 'عادلة', 'Fair'),
    favourable: say('Aldekoa', 'Favorable', 'في صالح اللاعب', 'Favourable')
}

function WorthPlay({ round, level, language, onAnswer, answered }: RoundProps<WorthRound>) {
    const l = useGameText(language)
    const [right, setRight] = useState(false)
    const { game } = round
    const question = level === 0
        ? say('Zein da jokalariaren batez besteko irabazia, eurotan?', '¿Cuál es la ganancia media del jugador, en euros?', 'ما الربح المتوسط للاعب باليورو؟', 'What is the player\'s mean gain, in euros?')
        : level === 1
            ? say('Nolakoa da jokoa jokalariarentzat?', '¿Cómo es el juego para el jugador?', 'كيف تبدو اللعبة للاعب؟', 'What is the game like for the player?')
            : say('Zenbat balio beharko luke jokatzeak, jokoa bidezkoa izateko? (eurotan)', '¿Cuánto debería costar jugar para que fuera justo? (en euros)', 'كم يجب أن يكلّف اللعب لتكون اللعبة عادلة؟ (باليورو)', 'How much should it cost to play for it to be fair? (in euros)')
    const explanation = level === 2
        ? say(`Prezio bidezkoa batez besteko saria da: $\\mu=${eurosLatex(game.mean)}$.`, `El precio justo es el premio medio: $\\mu=${eurosLatex(game.mean)}$.`, `الثمن العادل هو الجائزة المتوسطة: $\\mu=${eurosLatex(game.mean)}$.`, `The fair price is the mean prize: $\\mu=${eurosLatex(game.mean)}$.`)
        : say(`$\\mu=${eurosLatex(game.mean)}$ eta irabazia $${eurosLatex(game.mean)}-${eurosLatex(game.price)}=${eurosLatex(gainOf(game))}$.`, `$\\mu=${eurosLatex(game.mean)}$ y la ganancia es $${eurosLatex(game.mean)}-${eurosLatex(game.price)}=${eurosLatex(gainOf(game))}$.`, `$\\mu=${eurosLatex(game.mean)}$ والربح $${eurosLatex(game.mean)}-${eurosLatex(game.price)}=${eurosLatex(gainOf(game))}$.`, `$\\mu=${eurosLatex(game.mean)}$ and the gain is $${eurosLatex(game.mean)}-${eurosLatex(game.price)}=${eurosLatex(gainOf(game))}$.`)
    return (
        <>
            <p className="dist2-situation"><MathText text={l(game.text)} /></p>
            <p className="prob2-question"><MathText text={l(question)} /></p>
            <Options options={round.options} answer={round.answer} answered={answered} onPick={(index) => { setRight(index === round.answer); onAnswer(index === round.answer) }} render={(option) => (level === 1 ? l(VERDICT_NAMES[option as Verdict]) : formula(option, language))} />
            {answered && <RoundVerdict right={right} language={language}><MathText text={l(explanation)} /></RoundVerdict>}
        </>
    )
}

export function WorthGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WORTH_ROUNDS,
                rules: [
                    say('Batez besteko saria $\\mu$ da: sari bakoitza bider bere probabilitatea.', 'El premio medio es $\\mu$: cada premio por su probabilidad.', 'الجائزة المتوسطة هي $\\mu$: كل جائزة في احتمالها.', 'The mean prize is $\\mu$: each prize times its probability.'),
                    say('Irabazia $\\mu$ ken prezioa da: 0 bada, bidezkoa; negatiboa, kontrakoa.', 'La ganancia es $\\mu$ menos el precio: si es 0, justo; si es negativa, desfavorable.', 'الربح هو $\\mu$ ناقص الثمن: إن كان 0 فاللعبة عادلة، وإن كان سالبًا فهي ضد اللاعب.', 'The gain is $\\mu$ minus the price: if 0, fair; if negative, unfavourable.')
                ],
                create: createWorthRounds,
                stars: standardStars(WORTH_ROUNDS),
                starsNote: STARS_NOTE,
                Round: WorthPlay
            }}
        />
    )
}
