import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { CURVE_BOX } from '../../batx1-zientziak-deribatuak/games/curves'
import { graphLatex, graphValue, type Graph } from '../../batx1-zientziak-deribatuak/games/match'
import { Plane, PlanePath } from '../../dbh2-funtzioak-v2/plane'
import { texDec } from '../../dbh3-segidak/lab/labStyle'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-deribatuak/games/BachDerivativesGames.css'
import './BachIntegralsGames.css'
import { numberLatex } from '../lab/numbers'
import { ADJUST_ROUNDS, adjustOptionLatex, createAdjustRounds, factorLatex, type AdjustRound } from './adjust'
import { createEstimateRounds, ESTIMATE_ROUNDS, estimateArea, estimateIntegral, estimateRoots, estimateValue, type EstimateCurve, type EstimateRound } from './estimate'
import { createPrimitiveRounds, PRIMITIVE_ROUNDS, type PrimitiveRound } from './primitive'

/* ==========================================================================
   ¿De quién es la primitiva?, Ajusta la constante and Área a ojo
   (Integralak, Batxilergoa 1 · Zientziak): the first chooses the graph of
   an antiderivative F from the graph of f; the second chooses the number
   in front of a composite antiderivative; the third reads an area (or an
   integral with its sign) off a grid of unit squares. After each answer
   the reason comes in.
   ========================================================================== */

/** A formula in the language's names */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
const BLUE = 'var(--blue, #2f6fdb)'
const RED = 'var(--second, #c4432a)'
const FILL_BLUE = '#2f6fdb'
const FILL_RED = '#c4432a'
type Point = [number, number]

/** A curve sampled in real values, broken where it is not defined, leaves the band or jumps */
function sampled(fn: (x: number) => number, from: number, to: number, limit: number, step = 0.02): Point[][] {
    const parts: Point[][] = []
    let current: Point[] = []
    for (let x = from; x <= to + 1e-9; x += step) {
        const y = fn(x)
        const previous = current[current.length - 1]
        if (!Number.isFinite(y) || Math.abs(y) > limit || (previous && Math.abs(y - previous[1]) > limit)) {
            if (current.length > 1) parts.push(current)
            current = []
            continue
        }
        current.push([x, y])
    }
    if (current.length > 1) parts.push(current)
    return parts
}

const OPTION_NAMES = ['A', 'B', 'C']

/* ---------- ¿De quién es la primitiva? ---------- */

function GraphPlane({ graph, color, size, label }: { graph: Graph; color: string; size: 'big' | 'small'; label: string }) {
    const B = CURVE_BOX
    const parts = sampled((x) => graphValue(graph, x), -B, B, B * 2)
    return (
        <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={size === 'big' ? 28 : 12} labelStep={size === 'big' ? 2 : 4} labels={size === 'big'} maxHeight={size === 'big' ? 300 : 120} label={label}>
            {(map, clip) => <g>{parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={color} width={size === 'big' ? 3 : 2.6} clip={clip} />)}</g>}
        </Plane>
    )
}

function PrimitivePlay({ round, language, onAnswer, answered }: RoundProps<PrimitiveRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Hau $f$ da. Zein da haren jatorrizko bat, $F$?', 'Esta es $f$. ¿Cuál es una primitiva suya, $F$?', 'هذه $f$. أيها دالة أصلية لها $F$؟', 'This is $f$. Which one is an antiderivative of it, $F$?'))} /></p>
            <div className="bach-der-plane">
                <GraphPlane graph={round.f} color={RED} size="big" label={l(say('f funtzioaren grafikoa', 'La gráfica de f', 'رسم f', 'The graph of f'))} />
            </div>
            <div className="bach-der-options" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((graph, index) => (
                    <button key={index} type="button" disabled={answered} className={`bach-der-option ${!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''}`} onClick={() => choose(index)}>
                        <span className="bach-der-option-name">{OPTION_NAMES[index]}</span>
                        <GraphPlane graph={graph} color={BLUE} size="small" label={OPTION_NAMES[index]} />
                        {/* A cubic's formula does not fit a third of the screen: it comes in the explanation */}
                        {answered && graphLatex(graph).length <= 24 && <span className="bach-der-option-formula">{formula(`y=${graphLatex(graph)}`, language)}</span>}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(`F(x)=${graphLatex(round.options[round.answer])}\\ \\to\\ F'(x)=${graphLatex(round.f)}`, language)}</span>
                    <MathText text={l(say('$f>0$ den tokian $F$ igotzen da; $f<0$ den tokian, jaisten; eta $f=0$ denean, $F$ funtzioaren zuzen ukitzailea horizontala da. Gora edo behera mugitutako $F$ ere jatorrizkoa da.', 'Donde $f>0$, $F$ sube; donde $f<0$, baja; y donde $f=0$, la tangente de $F$ es horizontal. $F$ movida arriba o abajo también es primitiva.', 'حيث $f>0$ تصعد $F$، وحيث $f<0$ تنزل، وحيث $f=0$ يكون مماس $F$ أفقيًّا. و$F$ المزاحة إلى الأعلى أو الأسفل أصلية أيضًا.', 'Where $f>0$, $F$ goes up; where $f<0$, it goes down; and where $f=0$, the tangent of $F$ is horizontal. $F$ moved up or down is also an antiderivative.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function PrimitiveGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: PRIMITIVE_ROUNDS,
                rules: [
                    say('Goian $f$ funtzioaren grafikoa; behean, hiru grafiko.', 'Arriba, la gráfica de $f$; abajo, tres gráficas.', 'في الأعلى رسم $f$، وفي الأسفل ثلاثة رسوم.', 'Above, the graph of $f$; below, three graphs.'),
                    say('$F\'=f$: $f$ funtzioaren altuera $F$ funtzioaren malda da.', '$F\'=f$: la altura de $f$ es la pendiente de $F$.', '$F\'=f$: ارتفاع $f$ هو ميل $F$.', '$F\'=f$: the height of $f$ is the slope of $F$.'),
                    say('Aukeratu $F$ izan daitekeen grafikoa.', 'Elige la gráfica que puede ser $F$.', 'اختر الرسم الذي يمكن أن يكون $F$.', 'Choose the graph that can be $F$.')
                ],
                create: createPrimitiveRounds,
                stars: standardStars(PRIMITIVE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: PrimitivePlay
            }}
        />
    )
}

/* ---------- Ajusta la constante ---------- */

function AdjustPlay({ round, language, onAnswer, answered }: RoundProps<AdjustRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const integral = `\\int ${round.integrand}\\,dx`
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Zein da integral honen emaitza?', '¿Cuál es el resultado de esta integral?', 'ما نتيجة هذا التكامل؟', 'What is the result of this integral?'))} /></p>
            <div className="bach-der-big">{formula(integral, language)}</div>
            <div className="prop3-options bach-int-formulas" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.factors.map((_, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(adjustOptionLatex(round, index), language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(round.u, language)}</span>
                    <span className="dbh4-worked">{formula(`\\left(${factorLatex(round.factors[round.answer])}${round.core}\\right)'=${round.integrand}`, language)}</span>
                    <MathText text={l(say('Barruan falta den zenbakiaz biderkatzen da eta kanpoan zatitu: deribatzean integrakizuna bera atera behar da.', 'Se multiplica dentro por el número que falta y se divide fuera: al derivar tiene que salir el integrando.', 'نضرب في الداخل في العدد الناقص ونقسم في الخارج: عند الاشتقاق يجب أن تخرج الدالة المكاملة.', 'Multiply inside by the missing number and divide outside: differentiating must give back the integrand.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function AdjustGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ADJUST_ROUNDS,
                rules: [
                    say('Hiru jatorrizkok aurreko zenbakia bakarrik dute desberdina.', 'Las tres primitivas solo cambian en el número de delante.', 'لا تختلف الدوال الأصلية الثلاث إلا في العدد في المقدمة.', 'The three antiderivatives only differ in the number in front.'),
                    say('Bilatu barruko $u$ eta haren deribatua $u\'$: zer zenbaki falta da kanpoan?', 'Busca la $u$ de dentro y su derivada $u\'$: ¿qué número falta fuera?', 'ابحث عن $u$ في الداخل ومشتقتها $u\'$: ما العدد الناقص في الخارج؟', 'Find the $u$ inside and its derivative $u\'$: which number is missing outside?'),
                    say('Egiaztatu deribatuz.', 'Comprueba derivando.', 'تحقق بالاشتقاق.', 'Check by differentiating.')
                ],
                create: createAdjustRounds,
                stars: standardStars(ADJUST_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: AdjustPlay
            }}
        />
    )
}

/* ---------- Área a ojo ---------- */

const plusMinus = (value: number) => (value === 0 ? '' : value > 0 ? `+${numberLatex(value)}` : numberLatex(value))
function curveLatex(curve: EstimateCurve): string {
    if (curve.kind === 'line') {
        const slope = curve.m === 1 ? 'x' : curve.m === -1 ? '-x' : `${numberLatex(curve.m)}x`
        return `${slope}${plusMinus(curve.n)}`
    }
    const square = curve.h === 0 ? 'x^2' : `(x${curve.h > 0 ? '-' : '+'}${Math.abs(curve.h)})^2`
    return curve.kind === 'cap' ? `${numberLatex(curve.c)}-${square}` : `${square}${plusMinus(-curve.c)}`
}

/** An option: exact when it has at most two decimals, otherwise ≈ two decimals */
function optionLatex(value: number, language: UnitLanguage): string {
    const rounded = Math.round(value * 100) / 100
    const text = texDec(rounded, language, 2)
    return Math.abs(rounded - value) < 1e-9 ? text : `\\approx ${text}`
}

function EstimatePlay({ round, language, onAnswer, answered }: RoundProps<EstimateRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const B = CURVE_BOX
    const fn = (x: number) => estimateValue(round.curve, x)
    const parts = sampled(fn, -B, B, B * 2)
    const cuts = [round.a, ...estimateRoots(round.curve, round.a, round.b), round.b]
    const integral = `\\int_{${numberLatex(round.a)}}^{${numberLatex(round.b)}}f(x)\\,dx`
    const prompt = round.question === 'area'
        ? say('Karratu bakoitzak 1 balio du. Zenbat da eremu itzalduaren azalera?', 'Cada cuadrado vale 1. ¿Cuánto mide el área sombreada?', 'كل مربع يساوي 1. كم مساحة المنطقة المظللة؟', 'Each square is worth 1. What is the shaded area?')
        : say(`Karratu bakoitzak 1 balio du. Zenbat da $${integral}$?`, `Cada cuadrado vale 1. ¿Cuánto vale $${integral}$?`, `كل مربع يساوي 1. كم يساوي $${integral}$؟`, `Each square is worth 1. What is $${integral}$?`)
    const exact = estimateIntegral(round.curve, round.a, round.b)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} /></p>
            <div className="bach-der-plane">
                <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={28} labelStep={1} maxHeight={300} label={l(say('Eremu itzaldua karratuen sarean', 'La región sombreada en la cuadrícula', 'المنطقة المظللة على الشبكة', 'The shaded region on the grid'))}>
                    {(map, clip) => (
                        <g>
                            {cuts.slice(0, -1).map((from, index) => {
                                const to = cuts[index + 1]
                                const above = fn((from + to) / 2) > 0
                                const steps = 40
                                const xs = Array.from({ length: steps + 1 }, (_, k) => from + ((to - from) * k) / steps)
                                const d = `M${[...xs.map((x) => `${map.x(x)},${map.y(fn(x))}`), `${map.x(to)},${map.y(0)}`, `${map.x(from)},${map.y(0)}`].join(' L')} Z`
                                return <path key={from} d={d} fill={above || round.question === 'area' ? FILL_BLUE : FILL_RED} fillOpacity={0.32} clipPath={clip} />
                            })}
                            {parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={BLUE} width={3} clip={clip} />)}
                        </g>
                    )}
                </Plane>
            </div>
            <div className="prop3-options" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((value, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(optionLatex(value, language), language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(`f(x)=${curveLatex(round.curve)}`, language)}</span>
                    <span className="dbh4-worked">{formula(`${integral}=${numberLatex(exact)}`, language)}</span>
                    {round.question === 'integral' && <span className="dbh4-worked">{formula(`A=${numberLatex(estimateArea(round.curve, round.a, round.b))}`, language)}</span>}
                    <MathText text={l(round.question === 'area'
                        ? say('Zenbatu karratu osoak eta batu erdiak: hurbilketa ona da. Zehazki, Barrow-ren erregelarekin.', 'Cuenta los cuadrados enteros y suma las mitades: es una buena aproximación. Exacto, con la regla de Barrow.', 'عُدّ المربعات الكاملة واجمع الأنصاف: إنه تقريب جيد. والقيمة الدقيقة بقاعدة بارو.', 'Count the whole squares and add the halves: it is a good approximation. Exactly, with Barrow\'s rule.')
                        : say('Ardatzaren azpiko zatia (gorria) kendu egiten da integralean; azalerak, ordea, biak batzen ditu.', 'La parte de debajo del eje (roja) resta en la integral; el área, en cambio, suma las dos.', 'الجزء تحت المحور (الأحمر) يُطرح في التكامل، أما المساحة فتجمع الجزأين.', 'The part below the axis (red) subtracts in the integral; the area, instead, adds both.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function EstimateGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ESTIMATE_ROUNDS,
                rules: [
                    say('Sareko karratu bakoitzak 1 unitate karratu balio du.', 'Cada cuadrado de la cuadrícula vale 1 unidad cuadrada.', 'كل مربع في الشبكة يساوي وحدة مربعة واحدة.', 'Each square of the grid is worth 1 square unit.'),
                    say('Zenbatu karratu osoak eta erdiak, eta aukeratu zenbakirik hurbilena.', 'Cuenta los cuadrados enteros y las mitades, y elige el número más cercano.', 'عُدّ المربعات الكاملة والأنصاف واختر أقرب عدد.', 'Count the whole squares and the halves, and choose the closest number.'),
                    say('3. mailan, ardatzaren azpikoa (gorria) negatibo gisa zenbatzen da.', 'En el nivel 3, lo de debajo del eje (rojo) cuenta en negativo.', 'في المستوى 3 يُحسب ما تحت المحور (الأحمر) سالبًا.', 'In level 3, what is below the axis (red) counts as negative.')
                ],
                create: createEstimateRounds,
                stars: standardStars(ESTIMATE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: EstimatePlay
            }}
        />
    )
}
