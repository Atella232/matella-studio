import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import '../../batx1-zientziak-errealak/games/BachRealsGames.css'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { BAND_ROUNDS, bandAnswer, bandGapLatex, bandLatex, createBandRounds, epsilonLatex, readTerm, type BandRound } from './band'
import { createWhereRounds, MINUS, NONE, PLUS, WHERE_ROUNDS, type Destination, type WhereRound } from './where'

/* ==========================================================================
   Nora doa? and Harrapatu banda (Segidak, Batxilergoa 1 · Zientziak): the
   first shows a sequence and four destinations (a number, +∞, −∞ or
   «no limit»); the second asks for the first term inside the band, typed,
   and then works out |aₙ − L| < ε.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** {,} is the decimal comma; Arabic writes the point */
const decimals = (latex: string, language: UnitLanguage) => latex.replace(/\{,\}/g, language === 'ar' ? '.' : '{,}')

/* ---------- Where does it go? ---------- */

const NO_LIMIT = say('Ez du limiterik', 'No tiene límite', 'ليس لها نهاية', 'No limit')

function destinationLabel(destination: Destination, language: UnitLanguage, l: (text: LocalizedText) => string): ReactNode {
    return destination === NONE ? l(NO_LIMIT) : formula(destination, language)
}

function whereReason(round: WhereRound): LocalizedText {
    const { meta } = round
    switch (round.kind) {
        case 'same-degree': return say(`Maila bera: koefiziente nagusien zatidura, $\\frac{${meta.a}}{${meta.b}}$.`, `Mismo grado: cociente de los coeficientes principales, $\\frac{${meta.a}}{${meta.b}}$.`, `الدرجة نفسها: خارج قسمة المعاملين الرئيسيين $\\frac{${meta.a}}{${meta.b}}$.`, `Same degree: quotient of the leading coefficients, $\\frac{${meta.a}}{${meta.b}}$.`)
        case 'lower-degree': return say('Behean maila handiagoa: limitea 0 da.', 'Grado mayor abajo: el límite es 0.', 'درجة المقام أكبر: النهاية 0.', 'Higher degree below: the limit is 0.')
        case 'higher-degree': return say('Goian maila handiagoa: infinitura doa, koefiziente nagusien zeinuarekin.', 'Grado mayor arriba: va a infinito, con el signo de los coeficientes principales.', 'درجة البسط أكبر: تتجه إلى اللانهاية بإشارة المعاملين الرئيسيين.', 'Higher degree on top: it goes to infinity, with the sign of the leading coefficients.')
        case 'power-small': return say('$|r|<1$ bada, $r^n\\to 0$.', 'Si $|r|<1$, $r^n\\to 0$.', 'إذا كان $|r|<1$ فإن $r^n\\to 0$.', 'If $|r|<1$, $r^n\\to 0$.')
        case 'power-big': return say('$r>1$ bada, $r^n\\to+\\infty$; zeinua aurreko zenbakiarena da.', 'Si $r>1$, $r^n\\to+\\infty$; el signo es el del número de delante.', 'إذا كان $r>1$ فإن $r^n\\to+\\infty$، والإشارة إشارة العدد الذي أمامها.', 'If $r>1$, $r^n\\to+\\infty$; the sign is that of the number in front.')
        case 'power-negative': return say('Oinarri negatiboa: gaiak gero eta handiagoak, zeinua txandakatuz. Ez du limiterik.', 'Base negativa: términos cada vez mayores y con signos alternos. No tiene límite.', 'أساس سالب: حدود تكبر بإشارات متناوبة. ليس لها نهاية.', 'Negative base: ever bigger terms with alternating signs. No limit.')
        case 'alternating': return say('Bi baliotan saltoka dabil: oszilatzailea da.', 'Salta entre dos valores: es oscilante.', 'تقفز بين قيمتين: إنها متذبذبة.', 'It jumps between two values: it oscillates.')
        case 'alternating-small': return say(`$\\frac{(-1)^n}{n}\\to 0$: zeinua aldatzen da, baina gero eta txikiagoa da. Limitea ${meta.l} da.`, `$\\frac{(-1)^n}{n}\\to 0$: cambia de signo, pero cada vez es más pequeño. El límite es ${meta.l}.`, `$\\frac{(-1)^n}{n}\\to 0$: تتغير الإشارة لكنه يصغر أكثر فأكثر. النهاية ${meta.l}.`, `$\\frac{(-1)^n}{n}\\to 0$: the sign changes, but it keeps getting smaller. The limit is ${meta.l}.`)
        case 'polynomial': return say('$n^2$ gaiak agintzen du.', 'Manda el término $n^2$.', 'الحد $n^2$ هو الغالب.', 'The $n^2$ term wins.')
        case 'e-k': return say(`$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$, ez $k\\cdot e$.`, `$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$, no $k\\cdot e$.`, `$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$ لا $k\\cdot e$.`, `$\\left(1+\\frac{k}{n}\\right)^n\\to e^k$, not $k\\cdot e$.`)
        case 'e-times': return say(`$\\left(\\left(1+\\frac{1}{n}\\right)^n\\right)^{${meta.k}}\\to e^{${meta.k}}$.`, `$\\left(\\left(1+\\frac{1}{n}\\right)^n\\right)^{${meta.k}}\\to e^{${meta.k}}$.`, `$\\left(\\left(1+\\frac{1}{n}\\right)^n\\right)^{${meta.k}}\\to e^{${meta.k}}$.`, `$\\left(\\left(1+\\frac{1}{n}\\right)^n\\right)^{${meta.k}}\\to e^{${meta.k}}$.`)
        case 'e-root': return say(`$\\left(1+\\frac{1}{${meta.k}n}\\right)^{${meta.k}n}\\to e$, eta hemen berretzailea $n$ da: $e^{\\frac{1}{${meta.k}}}$.`, `$\\left(1+\\frac{1}{${meta.k}n}\\right)^{${meta.k}n}\\to e$, y aquí el exponente es $n$: $e^{\\frac{1}{${meta.k}}}$.`, `$\\left(1+\\frac{1}{${meta.k}n}\\right)^{${meta.k}n}\\to e$، والأس هنا $n$: ‏$e^{\\frac{1}{${meta.k}}}$.`, `$\\left(1+\\frac{1}{${meta.k}n}\\right)^{${meta.k}n}\\to e$, and here the exponent is $n$: $e^{\\frac{1}{${meta.k}}}$.`)
    }
}

function WherePlay({ round, language, onAnswer, answered }: RoundProps<WhereRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<Destination | null>(null)
    const choose = (destination: Destination) => {
        if (answered) return
        setPicked(destination)
        onAnswer(destination === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Nora doa segida hau?', '¿Hacia dónde va esta sucesión?', 'إلى أين تتجه هذه المتتالية؟', 'Where does this sequence go?'))}</p>
            <div className="dbh4-big-formula" dir="ltr">{formula(`a_n=${round.latex}`, language)}</div>
            <div className="prop3-options" role="group" aria-label={l(say('Limitea', 'Límite', 'النهاية', 'Limit'))}>
                {round.options.map((destination) => (
                    <button key={destination} type="button" dir={destination === NONE ? undefined : 'ltr'} disabled={answered} className={!answered ? '' : destination === round.answer ? 'right' : destination === picked ? 'wrong' : ''} onClick={() => choose(destination)}>
                        {destinationLabel(destination, language, l)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(whereReason(round))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function WhereGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WHERE_ROUNDS,
                rules: [
                    say('Segida bat ikusiko duzu.', 'Verás una sucesión.', 'سترى متتالية.', 'You will see a sequence.'),
                    say(`Aukeratu nora doan: zenbaki batera, $${PLUS}$ edo $${MINUS}$ aldera, edo ez du limiterik.`, `Elige hacia dónde va: a un número, a $${PLUS}$ o a $${MINUS}$, o no tiene límite.`, `اختر إلى أين تتجه: إلى عدد أو إلى $${PLUS}$ أو إلى $${MINUS}$، أو ليس لها نهاية.`, `Choose where it goes: to a number, to $${PLUS}$ or to $${MINUS}$, or it has no limit.`),
                    say('Zatiduretan alderatu mailak; berreturetan begiratu oinarriari.', 'En los cocientes compara los grados; en las potencias mira la base.', 'في خوارج القسمة قارن الدرجتين، وفي القوى انظر إلى الأساس.', 'In quotients compare the degrees; in powers look at the base.')
                ],
                create: createWhereRounds,
                stars: standardStars(WHERE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: WherePlay
            }}
        />
    )
}

/* ---------- Catch the band ---------- */

function BandPlay({ round, language, onAnswer, answered }: RoundProps<BandRound>) {
    const l = useGameText(language)
    const [input, setInput] = useState('')
    const [unreadable, setUnreadable] = useState(false)
    const [typed, setTyped] = useState<number | null>(null)
    const answer = bandAnswer(round)
    const epsilon = decimals(epsilonLatex(round), language)
    const gap = bandGapLatex(round)
    const submit = () => {
        const term = readTerm(input)
        if (term === null || term < 1) {
            setUnreadable(true)
            return
        }
        setTyped(term)
        onAnswer(term === answer)
    }
    const prompt = say(
        `Limitea ${round.limit} da. Zein gaitik aurrera daude gai guztiak ${round.limit} zenbakitik $\\varepsilon=${epsilon}$ baino gertuago?`,
        `El límite es ${round.limit}. ¿A partir de qué término están todos a menos de $\\varepsilon=${epsilon}$ de ${round.limit}?`,
        `النهاية ${round.limit}. ابتداءً من أيّ حد تكون كل الحدود على بعد أقل من $\\varepsilon=${epsilon}$ عن ${round.limit}؟`,
        `The limit is ${round.limit}. From which term on are they all less than $\\varepsilon=${epsilon}$ away from ${round.limit}?`
    )
    const bound = round.kind === 'over-square' ? `n^2` : round.kind === 'quotient' ? `n+${round.b}` : 'n'
    return (
        <>
            <div className="dbh4-big-formula" dir="ltr">{formula(`a_n=${bandLatex(round)}`, language)}</div>
            <p className="prop3-prompt"><MathText text={l(prompt)} /></p>
            {!answered && (
                <form className="fraction-v2-race-pit-form bach-coefficient-form" onSubmit={(event) => { event.preventDefault(); submit() }}>
                    <label htmlFor="bach-band-answer">{l(say('Lehen gaia', 'Primer término', 'الحد الأول', 'First term'))} {formula('N', language)}</label>
                    <div>
                        <input id="bach-band-answer" size={6} value={input} inputMode="numeric" autoComplete="off" placeholder="101" onChange={(event) => { setInput(event.target.value); setUnreadable(false) }} />
                        <button type="submit" className="fraction-v2-primary" disabled={!input.trim()}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                    {unreadable && <p className="fraction-v2-race-pit-note" role="alert">{l(say('Idatzi zenbaki oso positibo bat, adibidez 101.', 'Escribe un número entero positivo, por ejemplo 101.', 'اكتب عددًا صحيحًا موجبًا، مثل 101.', 'Write a positive whole number, for example 101.'))}</p>}
                </form>
            )}
            {answered && (
                <RoundVerdict right={typed === answer} language={language}>
                    <span className="dbh4-worked">{formula(`|a_n-${round.limit}|=${gap}<${epsilon}`, language)}</span>
                    <span className="dbh4-worked">{formula(`${bound}>${decimals(String((round.c * round.q) / round.p).replace('.', '{,}'), language)}\\ \\to\\ N=${answer}`, language)}</span>
                    {l(say('Desberdintza hertsia da: berdintza betetzen duen gaia ez da sartzen.', 'La desigualdad es estricta: el término que da la igualdad no entra.', 'المتباينة صارمة: الحد الذي يحقق المساواة لا يدخل.', 'The inequality is strict: the term that gives equality is not included.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function BandGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BAND_ROUNDS,
                rules: [
                    say('Segida bat, bere limitea $L$ eta distantzia bat $\\varepsilon$.', 'Una sucesión, su límite $L$ y una distancia $\\varepsilon$.', 'متتالية ونهايتها $L$ ومسافة $\\varepsilon$.', 'A sequence, its limit $L$ and a distance $\\varepsilon$.'),
                    say('Kalkulatu $|a_n-L|$ eta ebatzi $|a_n-L|<\\varepsilon$.', 'Calcula $|a_n-L|$ y resuelve $|a_n-L|<\\varepsilon$.', 'احسب $|a_n-L|$ وحُلّ $|a_n-L|<\\varepsilon$.', 'Work out $|a_n-L|$ and solve $|a_n-L|<\\varepsilon$.'),
                    say('Idatzi betetzen duen lehen gaia, $N$.', 'Escribe el primer término que lo cumple, $N$.', 'اكتب أول حد يحقق ذلك، $N$.', 'Write the first term that works, $N$.')
                ],
                create: createBandRounds,
                stars: standardStars(BAND_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: BandPlay
            }}
        />
    )
}
