import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './SocialBivarGames.css'
import { createPredictRounds, isReliable, PREDICT_ROUNDS, predictTex, type PredictRound } from './predict'
import { createWhichRRounds, WHICH_R_ROUNDS, type WhichRRound } from './whichR'

/* ==========================================================================
   Zein r dagokio? and Aurreikusi zuzenarekin (Estatistika bidimentsionala,
   Batxilergoa 1 · Gizarte Zientziak): the first shows a cloud and three
   coefficients; the second a regression line, its r, the range of the data
   and an x, and asks for the estimate and whether it is reliable. Logic in
   whichR.ts and predict.ts.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')

/* ---------- Which r fits? ---------- */

function Cloud({ round }: { round: WhichRRound }) {
    const ys = round.points.map(([, y]) => y)
    const [low, high] = [Math.min(...ys), Math.max(...ys)]
    const x = (value: number) => 30 + (value - 1) * 33
    const y = (value: number) => 170 - ((value - low) / (high - low || 1)) * 140
    return (
        <svg viewBox="0 0 360 196" role="img" aria-label="" className="social-bivar-chart" direction="ltr">
            <line x1={18} x2={346} y1={184} y2={184} stroke="var(--ink)" strokeWidth={1.6} />
            <line x1={18} x2={18} y1={12} y2={184} stroke="var(--ink)" strokeWidth={1.6} />
            {round.points.map(([a, b], index) => <circle key={index} cx={x(a)} cy={y(b)} r={7} fill="var(--blue-tint, #dde7f7)" stroke="var(--blue, #2f6fdb)" strokeWidth={1.8} />)}
        </svg>
    )
}

function WhichRPlay({ round, language, onAnswer, answered }: RoundProps<WhichRRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(round.options[index] === round.r)
    }
    const r = predictTex(round.r)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Zein r dagokio hodei honi?', '¿Qué r le toca a esta nube?', 'أي r يناسب هذه السحابة؟', 'Which r fits this cloud?'))} /></p>
            <Cloud round={round} />
            <div className="prop3-options social-bivar-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : option === round.r ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(`r=${predictTex(option)}`, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked !== null && round.options[picked] === round.r} language={language}>
                    <span className="dbh4-worked">{formula(`r=${r}`, language)}</span>
                    <MathText text={l(round.r > 0
                        ? say(`Hodeiak gora egiten du, eta ${Math.abs(round.r) >= 0.7 ? 'puntuak zuzenetik hurbil daude' : 'puntuak sakabanatuta daude'}.`, `La nube sube y ${Math.abs(round.r) >= 0.7 ? 'los puntos están pegados a una recta' : 'los puntos están dispersos'}.`, `السحابة تصعد و${Math.abs(round.r) >= 0.7 ? 'النقاط ملتصقة بمستقيم' : 'النقاط متفرقة'}.`, `The cloud rises and ${Math.abs(round.r) >= 0.7 ? 'the points are close to a line' : 'the points are spread out'}.`)
                        : say(`Hodeiak behera egiten du, eta ${Math.abs(round.r) >= 0.7 ? 'puntuak zuzenetik hurbil daude' : 'puntuak sakabanatuta daude'}.`, `La nube baja y ${Math.abs(round.r) >= 0.7 ? 'los puntos están pegados a una recta' : 'los puntos están dispersos'}.`, `السحابة تهبط و${Math.abs(round.r) >= 0.7 ? 'النقاط ملتصقة بمستقيم' : 'النقاط متفرقة'}.`, `The cloud falls and ${Math.abs(round.r) >= 0.7 ? 'the points are close to a line' : 'the points are spread out'}.`))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function WhichRGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WHICH_R_ROUNDS,
                rules: [
                    say('Hodei bakoitzak hiru koefizienteetako bat du.', 'Cada nube tiene uno de los tres coeficientes.', 'لكل سحابة واحد من المعاملات الثلاثة.', 'Each cloud has one of the three coefficients.'),
                    say('Zeinua: gora ala behera. Indarra: puntuak zuzen batetik zein hurbil.', 'El signo: sube o baja. La fuerza: lo pegados que están los puntos a una recta.', 'الإشارة: صعود أم هبوط. والقوة: مدى التصاق النقاط بمستقيم.', 'The sign: rises or falls. The strength: how close the points are to a line.')
                ],
                create: createWhichRRounds,
                stars: standardStars(WHICH_R_ROUNDS),
                starsNote: STARS_NOTE,
                Round: WhichRPlay
            }}
        />
    )
}

/* ---------- Predict with the line ---------- */

const RELIABLE = say('fidagarria', 'fiable', 'موثوق', 'reliable')
const NOT_RELIABLE = say('ez fidagarria', 'no fiable', 'غير موثوق', 'not reliable')

function PredictPlay({ round, language, onAnswer, answered }: RoundProps<PredictRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const right = (index: number) => round.options[index].value === round.answer.value && round.options[index].reliable === round.answer.reliable
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(right(index))
    }
    const sign = round.intercept < 0 ? '-' : '+'
    const lineLatex = `y=${predictTex(round.slope)}x${sign}${predictTex(Math.abs(round.intercept))}`
    const given = round.given
    const question = given
        ? say(`$\\bar{x}=${predictTex(given.mx)}$, $\\bar{y}=${given.my}$, $\\sigma_x^2=${given.vx}$, $\\sigma_{xy}=${predictTex(given.cxy)}$ eta $r=${predictTex(round.r)}$; x ${round.low} eta ${round.high} artean dago datuetan. Estimatu y, $x=${round.x}$ denean.`, `$\\bar{x}=${predictTex(given.mx)}$, $\\bar{y}=${given.my}$, $\\sigma_x^2=${given.vx}$, $\\sigma_{xy}=${predictTex(given.cxy)}$ y $r=${predictTex(round.r)}$; en los datos, x va de ${round.low} a ${round.high}. Estima y para $x=${round.x}$.`, `$\\bar{x}=${predictTex(given.mx)}$ و$\\bar{y}=${given.my}$ و$\\sigma_x^2=${given.vx}$ و$\\sigma_{xy}=${predictTex(given.cxy)}$ و$r=${predictTex(round.r)}$؛ وفي البيانات x من ${round.low} إلى ${round.high}. قدّر y عندما $x=${round.x}$.`, `$\\bar{x}=${predictTex(given.mx)}$, $\\bar{y}=${given.my}$, $\\sigma_x^2=${given.vx}$, $\\sigma_{xy}=${predictTex(given.cxy)}$ and $r=${predictTex(round.r)}$; in the data, x goes from ${round.low} to ${round.high}. Estimate y for $x=${round.x}$.`)
        : say(`Zuzena $${lineLatex}$ da, $r=${predictTex(round.r)}$, eta datuetan x ${round.low} eta ${round.high} artean dago. Estimatu y, $x=${round.x}$ denean.`, `La recta es $${lineLatex}$, con $r=${predictTex(round.r)}$, y en los datos x va de ${round.low} a ${round.high}. Estima y para $x=${round.x}$.`, `المستقيم $${lineLatex}$ مع $r=${predictTex(round.r)}$، وفي البيانات x من ${round.low} إلى ${round.high}. قدّر y عندما $x=${round.x}$.`, `The line is $${lineLatex}$, with $r=${predictTex(round.r)}$, and in the data x goes from ${round.low} to ${round.high}. Estimate y for $x=${round.x}$.`)
    const reliable = isReliable(round)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className="prop3-options social-bivar-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : right(index) ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <span>{formula(`\\hat{y}=${predictTex(option.value)}`, language)}</span>
                        <span className="social-bivar-verdict">{l(option.reliable ? RELIABLE : NOT_RELIABLE)}</span>
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked !== null && right(picked)} language={language}>
                    {given && <span className="dbh4-worked">{formula(`m_{yx}=\\frac{${predictTex(given.cxy)}}{${given.vx}}=${predictTex(round.slope)}\\qquad ${lineLatex}`, language)}</span>}
                    <span className="dbh4-worked">{formula(`\\hat{y}=${predictTex(round.slope)}\\cdot ${round.x}${sign}${predictTex(Math.abs(round.intercept))}=${predictTex(round.answer.value)}`, language)}</span>
                    <MathText text={l(reliable
                        ? say('Fidagarria: $|r|$ 1 zenbakitik hurbil dago, eta x datuen barruan.', 'Fiable: $|r|$ está cerca de 1 y x, dentro de los datos.', 'موثوق: $|r|$ قريب من 1 وx داخل البيانات.', 'Reliable: $|r|$ is close to 1 and x is within the data.')
                        : Math.abs(round.r) < 0.75
                            ? say('Ez da fidagarria: $|r|$ txikiegia da.', 'No es fiable: $|r|$ es demasiado pequeño.', 'غير موثوق: $|r|$ صغير جدًّا.', 'Not reliable: $|r|$ is too small.')
                            : say('Ez da fidagarria: x datuetatik urrun dago.', 'No es fiable: x está lejos de los datos.', 'غير موثوق: x بعيدة عن البيانات.', 'Not reliable: x is far from the data.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function PredictGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: PREDICT_ROUNDS,
                rules: [
                    say('Aukeratu estimazioa eta haren fidagarritasuna batera.', 'Elige a la vez la estimación y su fiabilidad.', 'اختر التقدير وموثوقيته معًا.', 'Choose the estimate and its reliability together.'),
                    say('Fidagarria da $|r|\\ge 0{,}75$ bada eta x datuen tartean badago.', 'Es fiable si $|r|\\ge 0{,}75$ y x está dentro del intervalo de los datos.', 'يكون موثوقًا إذا كان $|r|\\ge 0{,}75$ وكانت x داخل مجال البيانات.', 'It is reliable if $|r|\\ge 0{,}75$ and x is within the range of the data.'),
                    say('3. mailan, lehenik zuzena: $y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$.', 'En el nivel 3, primero la recta: $y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$.', 'في المستوى 3 أولًا المستقيم: $y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$.', 'In level 3, first the line: $y-\\bar{y}=\\frac{\\sigma_{xy}}{\\sigma_x^2}\\,(x-\\bar{x})$.')
                ],
                create: createPredictRounds,
                stars: standardStars(PREDICT_ROUNDS),
                starsNote: STARS_NOTE,
                Round: PredictPlay
            }}
        />
    )
}
