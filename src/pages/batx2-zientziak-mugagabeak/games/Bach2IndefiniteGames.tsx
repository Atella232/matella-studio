import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-deribatuak/games/BachDerivativesGames.css'
import '../../batx1-zientziak-integralak/games/BachIntegralsGames.css'
import './Bach2IndefiniteGames.css'
import { BUILD_ROUNDS, createBuildRounds, type BuildRound } from './build'
import { CHOOSE_U_ROUNDS, createChooseURounds, optionLatex, type ChooseURound } from './chooseU'
import { createMethodRounds, METHOD_NAMES, METHOD_ROUNDS, METHODS, type MethodRound } from './method'

/* ==========================================================================
   ¿Qué método?, Elige la u and Construye las fracciones (Integral
   mugagabeak, Batxilergoa 2 · Zientziak): the first sends an integral to
   its basket; the second chooses the split into u and dv that makes the
   new integral easier; the third builds the partial fractions (the
   skeleton, a coefficient or the division first). After each answer the
   reason comes in. Logic in method.ts, chooseU.ts and build.ts.
   ========================================================================== */

/** A formula in the language's names */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />

function usePick(answered: boolean, onAnswer: (right: boolean) => void, answer: number) {
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === answer)
    }
    const state = (index: number) => (!answered ? '' : index === answer ? 'right' : index === picked ? 'wrong' : '')
    return { picked, choose, state }
}

/* ---------- ¿Qué método? ---------- */

function MethodPlay({ round, language, onAnswer, answered }: RoundProps<MethodRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(answered, onAnswer, round.answer)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Zein metodo komeni da integral honetarako?', '¿Qué método conviene para esta integral?', 'أيّ طريقة تناسب هذا التكامل؟', 'Which method suits this integral?'))} /></p>
            <div className="bach-der-big">{formula(`\\int ${round.integrand}\\,dx`, language)}</div>
            <div className="prop3-options bach2-ind-baskets" role="group" aria-label={l(say('Saskiak', 'Cestas', 'السلال', 'Baskets'))}>
                {METHODS.map((method, index) => (
                    <button key={method} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{l(METHOD_NAMES[method])}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(round.why)} />
                    <span className="dbh4-worked">{formula(round.first, language)}</span>
                    <span className="dbh4-worked">{formula(round.result, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function MethodGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: METHOD_ROUNDS,
                rules: [
                    say('Integral bakoitza bere saskira.', 'Cada integral, a su cesta.', 'كل تكامل إلى سلّته.', 'Each integral to its basket.'),
                    say('Galdetu ordenan: kanpoan dago barrukoaren deribatua? Polinomio bat bider $e^x$, sinua edo logaritmoa? Polinomioen zatidura? Erro bat edo $e^x$ baturetan?', 'Pregunta en orden: ¿está fuera la derivada de lo de dentro? ¿Un polinomio por $e^x$, seno o logaritmo? ¿Un cociente de polinomios? ¿Una raíz o $e^x$ en sumas?', 'اسأل بالترتيب: هل مشتقة الداخل في الخارج؟ كثير حدود في $e^x$ أو جيب أو لوغاريتم؟ خارج قسمة كثيرَي حدود؟ جذر أو $e^x$ في مجاميع؟', 'Ask in order: is the derivative of the inside outside? A polynomial times $e^x$, sine or logarithm? A quotient of polynomials? A root or $e^x$ in sums?')
                ],
                create: createMethodRounds,
                stars: standardStars(METHOD_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: MethodPlay
            }}
        />
    )
}

/* ---------- Elige la u ---------- */

const KIND_REASONS: Record<'reversed' | 'whole', LocalizedText> = {
    reversed: say('Alderantziz hartuta, integral berriak maila handiagoa du edo $\\int\\ln x$ behar du: zailagoa da.', 'Al revés, la integral nueva tiene más grado o necesita $\\int\\ln x$: es más difícil.', 'بالعكس يكون للتكامل الجديد درجة أعلى أو يحتاج $\\int\\ln x$: إنه أصعب.', 'The other way round, the new integral has a higher degree or needs $\\int\\ln x$: it is harder.'),
    whole: say('Dena $u$ gisa hartuta, $du$ luzeagoa da eta integral berria okerragoa.', 'Tomando todo como $u$, $du$ es más largo y la integral nueva es peor.', 'بأخذ الكل $u$ يصبح $du$ أطول والتكامل الجديد أسوأ.', 'Taking it all as $u$, $du$ is longer and the new integral is worse.')
}

function ChooseUPlay({ round, language, onAnswer, answered }: RoundProps<ChooseURound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(answered, onAnswer, round.answer)
    const wrongKind = picked !== null && picked !== round.answer ? round.kinds[picked] : null
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Zein banaketak egiten du $\\int v\\,du$ errazagoa?', '¿Qué reparto hace más fácil $\\int v\\,du$?', 'أيّ توزيع يجعل $\\int v\\,du$ أسهل؟', 'Which split makes $\\int v\\,du$ easier?'))} /></p>
            <div className="bach-der-big">{formula(`\\int ${round.integrand}\\,dx`, language)}</div>
            <div className="prop3-options bach-int-formulas" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(optionLatex(option), language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.duv, language)}</span>
                    <span className="dbh4-worked">{formula(round.step, language)}</span>
                    {wrongKind && wrongKind !== 'right' && <MathText text={l(KIND_REASONS[wrongKind])} />}
                </RoundVerdict>
            )}
        </>
    )
}

export function ChooseUGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CHOOSE_U_ROUNDS,
                rules: [
                    say('$\\int u\\,dv=uv-\\int v\\,du$: $u$ deribatzen da, eta $dv$ integratzen.', '$\\int u\\,dv=uv-\\int v\\,du$: $u$ se deriva y $dv$ se integra.', '$\\int u\\,dv=uv-\\int v\\,du$: نشتق $u$ ونكامل $dv$.', '$\\int u\\,dv=uv-\\int v\\,du$: $u$ is differentiated and $dv$ integrated.'),
                    say('Aukeratu integral berria errazago egiten duen banaketa.', 'Elige el reparto que hace más fácil la integral nueva.', 'اختر التوزيع الذي يجعل التكامل الجديد أسهل.', 'Choose the split that makes the new integral easier.')
                ],
                create: createChooseURounds,
                stars: standardStars(CHOOSE_U_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ChooseUPlay
            }}
        />
    )
}

/* ---------- Construye las fracciones ---------- */

const BUILD_QUESTIONS: Record<BuildRound['ask'], LocalizedText> = {
    skeleton: say('Zein zatiki sinple eskatzen ditu izendatzaile honek?', '¿Qué fracciones simples pide este denominador?', 'ما الكسور البسيطة التي يتطلبها هذا المقام؟', 'Which partial fractions does this denominator ask for?'),
    A: say('Zenbat da $A$, $\\frac{A}{x-a}+\\frac{B}{x-b}$ adierazpenean?', '¿Cuánto vale $A$ en $\\frac{A}{x-a}+\\frac{B}{x-b}$?', 'كم يساوي $A$ في $\\frac{A}{x-a}+\\frac{B}{x-b}$؟', 'What is $A$ in $\\frac{A}{x-a}+\\frac{B}{x-b}$?'),
    B: say('Zenbat da $B$, $\\frac{A}{x-a}+\\frac{B}{x-b}$ adierazpenean?', '¿Cuánto vale $B$ en $\\frac{A}{x-a}+\\frac{B}{x-b}$?', 'كم يساوي $B$ في $\\frac{A}{x-a}+\\frac{B}{x-b}$؟', 'What is $B$ in $\\frac{A}{x-a}+\\frac{B}{x-b}$?'),
    division: say('Zatitu: zein da zatidura gehi hondarra?', 'Divide: ¿cuál es el cociente más el resto?', 'اقسم: ما خارج القسمة زائد الباقي؟', 'Divide: what is the quotient plus the remainder?')
}

const BUILD_REASONS: Record<BuildRound['ask'], LocalizedText> = {
    skeleton: say('Zatiki bat erro bakun bakoitzeko; erro bikoitzak bi zatiki; errorik gabeko 2. mailako faktoreak $\\frac{Bx+C}{x^2+c}$.', 'Una fracción por raíz simple; una raíz doble, dos; un factor de grado 2 sin raíces, $\\frac{Bx+C}{x^2+c}$.', 'كسر لكل جذر بسيط، وكسران للجذر المضاعف، و$\\frac{Bx+C}{x^2+c}$ لعامل من الدرجة 2 بلا جذور.', 'One fraction per simple root; two for a double root; $\\frac{Bx+C}{x^2+c}$ for a degree 2 factor with no roots.'),
    A: say('Estali erroaren faktorea, ordeztu $x$ erro horrekin, eta zatitu beste faktoreaz.', 'Tapa el factor de la raíz, sustituye $x$ por esa raíz y divide entre el otro factor.', 'غطِّ عامل الجذر وعوّض $x$ به واقسم على العامل الآخر.', 'Cover the factor of the root, put that root in for $x$ and divide by the other factor.'),
    B: say('Estali erroaren faktorea, ordeztu $x$ erro horrekin, eta zatitu beste faktoreaz.', 'Tapa el factor de la raíz, sustituye $x$ por esa raíz y divide entre el otro factor.', 'غطِّ عامل الجذر وعوّض $x$ به واقسم على العامل الآخر.', 'Cover the factor of the root, put that root in for $x$ and divide by the other factor.'),
    division: say('Zatikizuna = zatitzailea · zatidura + hondarra; hondarra ez da gai askea.', 'Dividendo = divisor · cociente + resto; el resto no es el término independiente.', 'المقسوم = المقسوم عليه · خارج القسمة + الباقي؛ والباقي ليس الحد الثابت.', 'Dividend = divisor · quotient + remainder; the remainder is not the constant term.')
}

function BuildPlay({ round, language, onAnswer, answered }: RoundProps<BuildRound>) {
    const l = useGameText(language)
    const { picked, choose, state } = usePick(answered, onAnswer, round.answer)
    const numbers = round.ask === 'A' || round.ask === 'B'
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(BUILD_QUESTIONS[round.ask])} /></p>
            <div className="bach-der-big">{formula(`R(x)=${round.rational}`, language)}</div>
            <div className={`prop3-options ${numbers ? '' : 'bach-int-formulas'}`} dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={state(index)} onClick={() => choose(index)}>{formula(option, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.reason, language)}</span>
                    <MathText text={l(BUILD_REASONS[round.ask])} />
                </RoundVerdict>
            )}
        </>
    )
}

export function BuildGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BUILD_ROUNDS,
                rules: [
                    say('Begiratu izendatzaileari: erroek erabakitzen dituzte zatikiak.', 'Mira el denominador: sus raíces deciden las fracciones.', 'انظر إلى المقام: جذوره تحدد الكسور.', 'Look at the denominator: its roots decide the fractions.'),
                    say('Zenbakitzailearen maila handiagoa bada, lehenik zatitu.', 'Si el numerador tiene más grado, primero divide.', 'إذا كانت درجة البسط أعلى فاقسم أولًا.', 'If the numerator has a higher degree, divide first.')
                ],
                create: createBuildRounds,
                stars: standardStars(BUILD_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: BuildPlay
            }}
        />
    )
}
