import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { deviationProducts, pairStats } from '../bivariate'
import './BivarGames.css'
import { createSignRounds, SIGN_ROUNDS, texNumber, type SignRound } from './covarianceSign'
import { createLinesRounds, lineLatex, LINES_ROUNDS, linesR, pointLatex, texValue, type LinesRound } from './whichLines'

/* ==========================================================================
   Kobariantzaren zeinua and Zein zuzen? (Estatistika bidimentsionala,
   Batxilergoa 1 · Zientziak): the first shows a cloud on a small board
   with its centre of gravity and asks for the sign of the covariance, the
   point that adds or takes away the most, or the value of σxy; the second
   shows two regression lines and asks where they cross, what r is, or
   whether the pair is possible.
   ========================================================================== */

/** Arabic writes the decimal point instead of the comma, so {,} becomes . there */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const BLUE = 'var(--blue, #2f6fdb)'
const CORAL = 'var(--coral, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const GREEN_TINT = 'var(--success-tint, #d9efe2)'
const CORAL_TINT = 'var(--coral-tint, #f6d5cc)'
const LINE = '#e3ddd1'

/* ---------- The sign of the covariance ---------- */

const bx = (value: number) => 20 + value * 20
const by = (value: number) => 150 - value * 13

function SignBoard({ round, answered }: { round: SignRound; answered: boolean }) {
    const { mx, my } = pairStats(round.points)
    const products = deviationProducts(round.points)
    const numbered = round.kind === 'point'
    return (
        <svg viewBox="0 0 240 170" role="img" aria-hidden="true" className="bivar-board" direction="ltr">
            {Array.from({ length: 11 }, (_, value) => (
                <g key={value}>
                    <line x1={bx(value)} x2={bx(value)} y1={by(0)} y2={by(10)} stroke={LINE} strokeWidth={0.8} />
                    <line x1={bx(0)} x2={bx(10)} y1={by(value)} y2={by(value)} stroke={LINE} strokeWidth={0.8} />
                </g>
            ))}
            <line x1={bx(0)} x2={bx(10)} y1={by(0)} y2={by(0)} stroke={INK} strokeWidth={1.4} />
            <line x1={bx(0)} x2={bx(0)} y1={by(0)} y2={by(10)} stroke={INK} strokeWidth={1.4} />
            {[0, 5, 10].map((value) => <text key={`x${value}`} x={bx(value)} y={by(0) + 13} textAnchor="middle" fontSize={9} fill={MUTED}>{value}</text>)}
            {[5, 10].map((value) => <text key={`y${value}`} x={bx(0) - 5} y={by(value) + 3} textAnchor="end" fontSize={9} fill={MUTED}>{value}</text>)}
            {answered && round.points.map(([x, y], index) => {
                const positive = products[index] > 0
                return <rect key={`r${index}`} x={Math.min(bx(x), bx(mx))} y={Math.min(by(y), by(my))} width={Math.abs(bx(x) - bx(mx))} height={Math.abs(by(y) - by(my))} fill={positive ? GREEN_TINT : CORAL_TINT} fillOpacity={0.7} stroke={positive ? GREEN : CORAL} strokeWidth={1} />
            })}
            <line x1={bx(mx)} x2={bx(mx)} y1={by(0)} y2={by(10)} stroke={CORAL} strokeWidth={1.2} strokeDasharray="4 3" />
            <line x1={bx(0)} x2={bx(10)} y1={by(my)} y2={by(my)} stroke={CORAL} strokeWidth={1.2} strokeDasharray="4 3" />
            {round.points.map(([x, y], index) => (
                <g key={`p${index}`}>
                    <circle cx={bx(x)} cy={by(y)} r={numbered ? 7 : 4.5} fill="var(--paper, #fffcf6)" stroke={BLUE} strokeWidth={1.6} />
                    {numbered && <text x={bx(x)} y={by(y) + 3} textAnchor="middle" fontSize={8} fontWeight={700} fill={BLUE}>{index + 1}</text>}
                </g>
            ))}
            <circle cx={bx(mx)} cy={by(my)} r={3.5} fill={CORAL} />
        </svg>
    )
}

const SIGN_LABELS = [say('Positiboa', 'Positiva', 'موجب', 'Positive'), say('Ia zero', 'Casi cero', 'قريب من الصفر', 'Almost zero'), say('Negatiboa', 'Negativa', 'سالب', 'Negative')]

function SignPlay({ round, language, onAnswer, answered }: RoundProps<SignRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number, right: boolean) => {
        if (answered) return
        setPicked(index)
        onAnswer(right)
    }
    const stats = pairStats(round.points)
    const products = deviationProducts(round.points)
    const list = round.points.map(([x, y]) => `(${x},\\,${y})`).join(',\\ ')
    const question = round.kind === 'sign'
        ? say('Nolakoa da kobariantza?', '¿Cómo es la covarianza?', 'كيف التغاير؟', 'What is the covariance like?')
        : round.kind === 'point'
            ? round.ask === 'adds'
                ? say('Zein puntuk batzen dio gehien kobariantzari?', '¿Qué punto suma más a la covarianza?', 'أي نقطة تضيف أكثر إلى التغاير؟', 'Which point adds the most to the covariance?')
                : say('Zein puntuk kentzen dio gehien kobariantzari?', '¿Qué punto le resta más a la covarianza?', 'أي نقطة تطرح أكثر من التغاير؟', 'Which point takes the most away from the covariance?')
            : say(`Zenbat da $${list}$ bikoteen $\\sigma_{xy}$?`, `¿Cuánto vale $\\sigma_{xy}$ para $${list}$?`, `كم $\\sigma_{xy}$ للأزواج $${list}$؟`, `What is $\\sigma_{xy}$ for $${list}$?`)
    const verdictLines = round.kind === 'value'
        ? [`\\bar{x}=${texNumber(stats.mx)}\\qquad\\bar{y}=${texNumber(stats.my)}`, `\\sigma_{xy}=\\frac{${texNumber((stats.cxy + stats.mx * stats.my) * 4)}}{4}-${texNumber(stats.mx)}\\cdot ${texNumber(stats.my)}=${texNumber(stats.cxy)}`]
        : round.kind === 'point'
            ? products.map((value, index) => `${index + 1}\\to ${texNumber(value)}`)
            : [`\\sigma_{xy}=${texNumber(stats.cxy)}`]
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            {round.kind !== 'value' && <SignBoard round={round} answered={answered} />}
            {round.kind === 'sign' && (
                <div className="prop3-options bivar-options-3">
                    {SIGN_LABELS.map((label, index) => (
                        <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index, index === round.answer)}>{l(label)}</button>
                    ))}
                </div>
            )}
            {round.kind === 'point' && (
                <div className="prop3-options bivar-options-5" dir="ltr">
                    {round.points.map((_, index) => (
                        <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index, index === round.answer)}>{index + 1}</button>
                    ))}
                </div>
            )}
            {round.kind === 'value' && (
                <div className="prop3-options bivar-options-3" dir="ltr">
                    {round.options.map((value, index) => (
                        <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index, index === round.answer)}>{formula(texNumber(value), language)}</button>
                    ))}
                </div>
            )}
            {answered && (
                <RoundVerdict right={picked !== null && picked === round.answer} language={language}>
                    <div className={round.kind === 'point' ? 'bivar-products' : undefined}>
                        {verdictLines.map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}
                    </div>
                    <MathText text={l(round.kind === 'point'
                        ? say('Laukizuzen berdeek batu egiten dute eta koralek kendu: zentrotik urrun dagoen puntu batek asko pisatzen du.', 'Los rectángulos verdes suman y los corales restan: un punto lejos del centro pesa mucho.', 'المستطيلات الخضراء تضيف والمرجانية تطرح: النقطة البعيدة عن المركز ترجح كثيرًا.', 'Green rectangles add and coral ones take away: a point far from the centre weighs a lot.')
                        : round.kind === 'value'
                            ? say('Biderkaduren batez bestekoa, ken batez bestekoen biderkadura.', 'La media de los productos menos el producto de las medias.', 'متوسط الجداءات ناقص جداء المتوسطين.', 'The mean of the products minus the product of the means.')
                            : say('I eta III koadranteetako laukizuzenek batu egiten dute; II eta IV koadranteetakoek, kendu.', 'Los rectángulos de los cuadrantes I y III suman; los del II y el IV, restan.', 'مستطيلات الربعين I وIII تضيف، ومستطيلات II وIV تطرح.', 'The rectangles in quadrants I and III add; those in II and IV take away.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function SignGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SIGN_ROUNDS,
                rules: [
                    say('Marra gorriek grabitate-zentroa markatzen dute, $(\\bar{x},\\bar{y})$.', 'Las rayas rojas marcan el centro de gravedad, $(\\bar{x},\\bar{y})$.', 'يحدّد الخطان الأحمران مركز الثقل $(\\bar{x},\\bar{y})$.', 'The red lines mark the centre of gravity, $(\\bar{x},\\bar{y})$.'),
                    say('Puntu bakoitzak $(x-\\bar{x})(y-\\bar{y})$ ematen du: positiboa I eta III koadranteetan, negatiboa II eta IV koadranteetan.', 'Cada punto da $(x-\\bar{x})(y-\\bar{y})$: positivo en los cuadrantes I y III, negativo en el II y el IV.', 'تعطي كل نقطة $(x-\\bar{x})(y-\\bar{y})$: موجبًا في الربعين I وIII وسالبًا في II وIV.', 'Each point gives $(x-\\bar{x})(y-\\bar{y})$: positive in quadrants I and III, negative in II and IV.'),
                    say('3. mailan, $\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$.', 'En el nivel 3, $\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$.', 'في المستوى 3: $\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$.', 'In level 3, $\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$.')
                ],
                create: createSignRounds,
                stars: standardStars(SIGN_ROUNDS),
                starsNote: STARS_NOTE,
                Round: SignPlay
            }}
        />
    )
}

/* ---------- Which lines? ---------- */

const VERDICTS = {
    possible: say('Bai, posible da', 'Sí, es posible', 'نعم، ممكن', 'Yes, it is possible'),
    signs: say('Ez: zeinu desberdinak', 'No: signos distintos', 'لا: إشارتان مختلفتان', 'No: different signs'),
    over: say('Ez: biderkadura 1 baino handiagoa', 'No: el producto pasa de 1', 'لا: الجداء يتجاوز 1', 'No: the product is more than 1')
} as const

function LinesPlay({ round, language, onAnswer, answered }: RoundProps<LinesRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const question = round.level === 0
        ? say('Non ebakitzen dira bi zuzenak?', '¿Dónde se cortan las dos rectas?', 'أين يتقاطع المستقيمان؟', 'Where do the two lines cross?')
        : round.level === 1
            ? say('Zenbat da r?', '¿Cuánto vale r?', 'كم r؟', 'What is r?')
            : say('Posible al da erregresio-zuzenen bikote hau?', '¿Es posible este par de rectas de regresión?', 'هل هذا الزوج من مستقيمي الانحدار ممكن؟', 'Is this pair of regression lines possible?')
    const product = round.a * round.c
    const verdictLines = round.level === 0
        ? [`${texValue(round.a)}\\cdot ${texValue(round.mx)}${round.b < 0 ? '' : '+'}${texValue(round.b)}=${texValue(round.my)}`, `${texValue(round.c)}\\cdot ${texValue(round.my)}${round.d < 0 ? '' : '+'}${texValue(round.d)}=${texValue(round.mx)}`]
        : round.level === 1
            ? [`r^2=${texValue(round.a)}\\cdot ${texValue(round.c)}=${texValue(product)}`, `r=${texValue(linesR(round))}`]
            : [`${texValue(round.a)}\\cdot ${texValue(round.c)}=${texValue(product)}`]
    const note = round.level === 0
        ? say('Bi zuzenak grabitate-zentrotik pasatzen dira: puntu horrek biak betetzen ditu.', 'Las dos rectas pasan por el centro de gravedad: ese punto cumple las dos.', 'يمرّ المستقيمان بمركز الثقل: هذه النقطة تحقق الاثنين.', 'Both lines pass through the centre of gravity: that point satisfies both.')
        : round.level === 1
            ? say('Biderkadura $r^2$ da, eta r koefizienteak malden zeinua du.', 'El producto es $r^2$, y r tiene el signo de las pendientes.', 'الجداء هو $r^2$، وr بإشارة الميلين.', 'The product is $r^2$, and r has the sign of the slopes.')
            : round.verdict === 'possible'
                ? say('Zeinu bera eta biderkadura 0 eta 1 artean: posible da.', 'El mismo signo y un producto entre 0 y 1: es posible.', 'الإشارة نفسها والجداء بين 0 و1: ممكن.', 'The same sign and a product between 0 and 1: it is possible.')
                : round.verdict === 'signs'
                    ? say('Bi koefizienteek $\\sigma_{xy}$ kobariantzaren zeinua dute: ezin dira desberdinak izan.', 'Los dos coeficientes tienen el signo de $\\sigma_{xy}$: no pueden ser distintos.', 'للمعاملين إشارة $\\sigma_{xy}$: لا يمكن أن يختلفا.', 'Both coefficients have the sign of $\\sigma_{xy}$: they cannot differ.')
                    : say('Biderkadura $r^2$ da, eta $r^2$ ezin da 1 baino handiagoa izan.', 'El producto es $r^2$, y $r^2$ no puede pasar de 1.', 'الجداء هو $r^2$، و$r^2$ لا يمكن أن يتجاوز 1.', 'The product is $r^2$, and $r^2$ cannot be more than 1.')
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className="bivar-lines" dir="ltr">
                <span className="dbh4-worked">{formula(lineLatex('y', round.a, round.b), language)}</span>
                <span className="dbh4-worked">{formula(lineLatex('x', round.c, round.d), language)}</span>
            </div>
            <div className={`prop3-options ${round.level === 2 ? 'bivar-options-1' : 'bivar-options-3'}`} dir={round.level === 2 ? undefined : 'ltr'}>
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {round.level === 2 ? l(VERDICTS[option as keyof typeof VERDICTS]) : formula(option, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {verdictLines.map((latex) => <span key={latex} className="dbh4-worked">{formula(latex, language)}</span>)}
                    {round.level === 0 && <span className="dbh4-worked">{formula(`(\\bar{x},\\,\\bar{y})=${pointLatex(round.mx, round.my)}`, language)}</span>}
                    <MathText text={l(note)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function LinesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: LINES_ROUNDS,
                rules: [
                    say('Lehenengo zuzena Y-ren X-rekikoa da, $y=m_{yx}\\,x+b$; bigarrena, X-ren Y-rekikoa, $x=m_{xy}\\,y+d$.', 'La primera recta es la de Y sobre X, $y=m_{yx}\\,x+b$; la segunda, la de X sobre Y, $x=m_{xy}\\,y+d$.', 'المستقيم الأول هو انحدار Y على X: $y=m_{yx}\\,x+b$؛ والثاني انحدار X على Y: $x=m_{xy}\\,y+d$.', 'The first line is Y on X, $y=m_{yx}\\,x+b$; the second, X on Y, $x=m_{xy}\\,y+d$.'),
                    say('Biak $(\\bar{x},\\bar{y})$ puntuan ebakitzen dira, eta $m_{yx}\\cdot m_{xy}=r^2$.', 'Las dos se cortan en $(\\bar{x},\\bar{y})$, y $m_{yx}\\cdot m_{xy}=r^2$.', 'يتقاطعان في $(\\bar{x},\\bar{y})$، و$m_{yx}\\cdot m_{xy}=r^2$.', 'Both cross at $(\\bar{x},\\bar{y})$, and $m_{yx}\\cdot m_{xy}=r^2$.'),
                    say('Bikote bat posible da koefizienteek zeinu bera badute eta haien biderkadura 1 baino handiagoa ez bada.', 'Un par es posible si los coeficientes tienen el mismo signo y su producto no pasa de 1.', 'يكون الزوج ممكنًا إذا كان للمعاملين الإشارة نفسها ولم يتجاوز جداؤهما 1.', 'A pair is possible if the coefficients have the same sign and their product is not more than 1.')
                ],
                create: createLinesRounds,
                stars: standardStars(LINES_ROUNDS),
                starsNote: STARS_NOTE,
                Round: LinesPlay
            }}
        />
    )
}
