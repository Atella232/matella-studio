import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { CURVE_BOX, curveLatex, curveValue } from '../../batx1-zientziak-deribatuak/games/curves'
import { Plane, PlanePath, PlanePoint } from '../../dbh2-funtzioak-v2/plane'
import { texDec } from '../../dbh3-segidak/lab/labStyle'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-deribatuak/games/BachDerivativesGames.css'
import './BachApplicationsGames.css'
import { createExtremaRounds, EXTREMA_ROUNDS, extremaPointName, pointKind, primeValue, type ExtremaQuestion, type ExtremaRound } from './extrema'
import { createShapeRounds, curveSecond, SHAPE_ROUNDS, SHAPES, type Shape, type ShapeRound } from './shape'
import { createUpdownRounds, signChart, UPDOWN_ROUNDS, updownLatex, updownValue, type UpdownGraph, type UpdownRound } from './updown'

/* ==========================================================================
   Sube o baja, Caza los extremos and ¿∪ o ∩? (Deribatuaren aplikazioak,
   Batxilergoa 1 · Zientziak): the first chooses the graph of f from the
   sign chart of f′; the second reads the graph of f′ to find a maximum, a
   minimum or a flat point of f; the third tells ∪, ∩ or an inflection
   from a graph, from f″ or from f. After each answer the reason comes in.
   ========================================================================== */

/** A formula in the language's names */
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
const BLUE = 'var(--blue, #2f6fdb)'
const RED = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const AMBER = '#e0a100'
const VIOLET = '#7b52c7'
const INK = 'var(--ink, #1d2733)'
const PAPER = 'var(--card, #fffcf6)'
const POINT_COLORS = [VIOLET, AMBER, GREEN]
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

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))

/* ---------- Sube o baja ---------- */

/** The sign chart of f′ as a strip: green +, red −, amber where f′ = 0, a ring where f does not exist */
function SignStrip({ graph, label }: { graph: UpdownGraph; label: string }) {
    const { pieces, marks } = signChart(graph)
    const X = (x: number) => 30 + (x + 4) * 37
    return (
        <svg viewBox="0 0 330 56" role="img" aria-label={label} direction="ltr" className="bach-app-strip">
            <text x={14} y={25} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>f′</text>
            {pieces.map((piece) => (
                <g key={piece.from}>
                    <rect x={X(piece.from) + 1} y={10} width={X(piece.to) - X(piece.from) - 2} height={22} rx={5} fill={piece.sign > 0 ? GREEN : RED} />
                    {X(piece.to) - X(piece.from) > 34 && <text x={(X(piece.from) + X(piece.to)) / 2} y={26} textAnchor="middle" fontSize={15} fontWeight={700} fill={PAPER}>{piece.sign > 0 ? '+ ↗' : '− ↘'}</text>}
                </g>
            ))}
            {marks.map((mark) => (
                <g key={mark.x}>
                    <circle cx={X(mark.x)} cy={21} r={6.5} fill={mark.hole ? PAPER : AMBER} stroke={INK} strokeWidth={1.4} />
                    <text x={X(mark.x)} y={50} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{minus(mark.x)}</text>
                </g>
            ))}
        </svg>
    )
}

function SmallGraph({ graph, label }: { graph: UpdownGraph; label: string }) {
    const B = CURVE_BOX
    const parts = sampled((x) => updownValue(graph, x), -B, B, B * 2)
    return (
        <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={12} labelStep={4} labels={false} maxHeight={120} label={label}>
            {(map, clip) => <g>{parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={BLUE} width={2.6} clip={clip} />)}</g>}
        </Plane>
    )
}

const OPTION_NAMES = ['A', 'B', 'C']

function UpdownPlay({ round, language, onAnswer, answered }: RoundProps<UpdownRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Hau da $f\'$ deribatuaren zeinu-taula. Zein da $f$ funtzioaren grafikoa?', 'Esta es la tabla de signos de $f\'$. ¿Cuál es la gráfica de $f$?', 'هذا جدول إشارات $f\'$. أي رسم هو رسم $f$؟', 'This is the sign chart of $f\'$. Which one is the graph of $f$?'))} /></p>
            <div className="bach-app-strip-box">
                <SignStrip graph={round.f} label={l(say('f′ deribatuaren zeinu-taula', 'La tabla de signos de f′', 'جدول إشارات f′', 'The sign chart of f′'))} />
            </div>
            <div className="bach-der-options" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {round.options.map((graph, index) => (
                    <button key={index} type="button" disabled={answered} className={`bach-der-option ${!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''}`} onClick={() => choose(index)}>
                        <span className="bach-der-option-name">{OPTION_NAMES[index]}</span>
                        <SmallGraph graph={graph} label={OPTION_NAMES[index]} />
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked">{formula(`f(x)=${updownLatex(round.f)}`, language)}</span>
                    <MathText text={l(say('$+$ dagoen tokian $f$ igotzen da, eta $-$ dagoen tokian jaisten. Zeinua aldatzen ez den zero batean ez dago muturrik; zulo batean, $f$ ez da existitzen.', 'Donde hay $+$, $f$ sube; donde hay $-$, baja. En un cero sin cambio de signo no hay extremo; en un hueco, $f$ no existe.', 'حيث توجد $+$ تصعد $f$، وحيث توجد $-$ تنزل. وعند صفر لا تتغير فيه الإشارة لا قيمة قصوى، وعند الفراغ لا توجد $f$.', 'Where there is $+$, $f$ goes up; where there is $-$, it goes down. At a zero with no change of sign there is no extremum; at a gap, $f$ does not exist.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function UpdownGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: UPDOWN_ROUNDS,
                rules: [
                    say('Goian, $f\'$ deribatuaren zeinu-taula; behean, hiru grafiko.', 'Arriba, la tabla de signos de $f\'$; abajo, tres gráficas.', 'في الأعلى جدول إشارات $f\'$، وفي الأسفل ثلاثة رسوم.', 'Above, the sign chart of $f\'$; below, three graphs.'),
                    say('Berdea, $+$: $f$ igotzen da. Gorria, $-$: $f$ jaisten da. Puntu horia: $f\'=0$.', 'Verde, $+$: $f$ sube. Rojo, $-$: $f$ baja. Punto ámbar: $f\'=0$.', 'الأخضر $+$: تصعد $f$. والأحمر $-$: تنزل $f$. والنقطة البرتقالية: $f\'=0$.', 'Green, $+$: $f$ goes up. Red, $-$: $f$ goes down. Amber dot: $f\'=0$.'),
                    say('Aukeratu taula betetzen duen grafikoa.', 'Elige la gráfica que cumple la tabla.', 'اختر الرسم الذي يوافق الجدول.', 'Choose the graph that fits the chart.')
                ],
                create: createUpdownRounds,
                stars: standardStars(UPDOWN_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: UpdownPlay
            }}
        />
    )
}

/* ---------- Caza los extremos ---------- */

const EXTREMA_TEXT: Record<ExtremaQuestion, LocalizedText> = {
    maximum: say('Grafikoa $f\'$ da. Zein puntutan du $f$ funtzioak maximo bat?', 'La gráfica es $f\'$. ¿En qué punto tiene $f$ un máximo?', 'الرسم هو $f\'$. عند أي نقطة لـ $f$ قيمة عظمى؟', 'The graph is $f\'$. At which point does $f$ have a maximum?'),
    minimum: say('Grafikoa $f\'$ da. Zein puntutan du $f$ funtzioak minimo bat?', 'La gráfica es $f\'$. ¿En qué punto tiene $f$ un mínimo?', 'الرسم هو $f\'$. عند أي نقطة لـ $f$ قيمة صغرى؟', 'The graph is $f\'$. At which point does $f$ have a minimum?'),
    flat: say('Grafikoa $f\'$ da. Zein puntutan da $f\'=0$, baina mutur gabe?', 'La gráfica es $f\'$. ¿En qué punto es $f\'=0$, pero sin extremo?', 'الرسم هو $f\'$. عند أي نقطة يكون $f\'=0$ دون قيمة قصوى؟', 'The graph is $f\'$. At which point is $f\'=0$, but with no extremum?')
}

const KIND_WORDS: Record<ExtremaQuestion | 'none', LocalizedText> = {
    maximum: say('maximoa', 'máximo', 'قيمة عظمى', 'maximum'),
    minimum: say('minimoa', 'mínimo', 'قيمة صغرى', 'minimum'),
    flat: say('$f\'=0$, muturrik gabe', '$f\'=0$, sin extremo', '$f\'=0$ دون قيمة قصوى', '$f\'=0$, no extremum'),
    none: say('$f\'\\ne 0$', '$f\'\\ne 0$', '$f\'\\ne 0$', '$f\'\\ne 0$')
}

function ExtremaPlay({ round, language, onAnswer, answered }: RoundProps<ExtremaRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const B = CURVE_BOX
    const parts = sampled((x) => primeValue(round, x), -B, B, B * 2)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(EXTREMA_TEXT[round.question])} /></p>
            <div className="bach-der-plane">
                <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={28} labelStep={2} maxHeight={300} label={l(say('f′ deribatuaren grafikoa eta A, B eta C puntuak', 'La gráfica de f′ y los puntos A, B y C', 'رسم f′ والنقاط A وB وC', 'The graph of f′ and the points A, B and C'))}>
                    {(map, clip) => (
                        <g>
                            {parts.map((points, index) => <PlanePath key={index} map={map} points={points} color={RED} width={3} clip={clip} />)}
                            {round.xs.map((x, index) => <PlanePoint key={index} map={map} point={[x, 0]} color={POINT_COLORS[index]} radius={6} name={extremaPointName(index)} />)}
                        </g>
                    )}
                </Plane>
            </div>
            <div className="prop3-options bach-der-points" dir="ltr" role="group" aria-label={l(say('Puntuak', 'Puntos', 'النقاط', 'Points'))}>
                {round.xs.map((_, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <span className="bach-der-dot" style={{ background: POINT_COLORS[index] }} aria-hidden="true" />
                        {extremaPointName(index)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="bach-app-kinds">
                        {round.xs.map((x, index) => (
                            <span key={index}><strong>{extremaPointName(index)}</strong> <MathText text={l(KIND_WORDS[pointKind(round, x)])} inline /></span>
                        ))}
                    </span>
                    <MathText text={l(say('$f\'$ ardatzaren gainetik azpira pasatzen bada, $f$ igo eta jaisten da: maximoa. Azpitik gainera: minimoa. Ardatza ukitu besterik ez badu egiten, ez dago muturrik.', 'Si $f\'$ pasa de encima a debajo del eje, $f$ sube y baja: máximo. De debajo a encima: mínimo. Si solo toca el eje, no hay extremo.', 'إذا انتقل $f\'$ من فوق المحور إلى تحته صعدت $f$ ثم نزلت: قيمة عظمى. ومن تحته إلى فوقه: صغرى. وإذا اكتفى بلمس المحور فلا قيمة قصوى.', 'If $f\'$ goes from above the axis to below it, $f$ rises and falls: a maximum. From below to above: a minimum. If it only touches the axis, there is no extremum.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function ExtremaGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: EXTREMA_ROUNDS,
                rules: [
                    say('Kontuz: grafikoa $f\'$ da, ez $f$.', 'Ojo: la gráfica es $f\'$, no $f$.', 'انتبه: الرسم هو $f\'$ لا $f$.', 'Careful: the graph is $f\'$, not $f$.'),
                    say('$f\'$ ardatzaren gainean dagoen tokian $f$ igotzen da; azpian dagoen tokian, jaisten.', 'Donde $f\'$ está encima del eje, $f$ sube; donde está debajo, baja.', 'حيث يكون $f\'$ فوق المحور تصعد $f$، وحيث يكون تحته تنزل.', 'Where $f\'$ is above the axis, $f$ goes up; where it is below, it goes down.'),
                    say('Aukeratu galderari erantzuten dion puntua.', 'Elige el punto que responde a la pregunta.', 'اختر النقطة التي تجيب عن السؤال.', 'Choose the point that answers the question.')
                ],
                create: createExtremaRounds,
                stars: standardStars(EXTREMA_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ExtremaPlay
            }}
        />
    )
}

/* ---------- ¿∪ o ∩? ---------- */

const SHAPE_LABELS: Record<Shape, LocalizedText> = {
    up: say('∪ ahurra', '∪ cóncava', '∪ نحو الأعلى', '∪ concave up'),
    down: say('∩ ganbila', '∩ convexa', '∩ نحو الأسفل', '∩ concave down'),
    inflection: say('Inflexioa', 'Inflexión', 'انعطاف', 'Inflection')
}

function ShapePlay({ round, language, onAnswer, answered }: RoundProps<ShapeRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<Shape | null>(null)
    const choose = (shape: Shape) => {
        if (answered) return
        setPicked(shape)
        onAnswer(shape === round.answer)
    }
    const B = CURVE_BOX
    const a = texDec(round.a, language, 1)
    const second = round.kind === 'graph' ? curveSecond(round.curve, round.a) : round.second
    return (
        <>
            {round.kind === 'graph' ? (
                <>
                    <p className="prop3-prompt"><MathText text={l(say('Nolakoa da kurba $P$ puntuan?', '¿Cómo es la curva en el punto $P$?', 'كيف يكون المنحنى عند النقطة $P$؟', 'What is the curve like at the point $P$?'))} /></p>
                    <div className="bach-der-plane">
                        <Plane box={{ xMin: -B, xMax: B, yMin: -B, yMax: B }} cell={28} labelStep={2} maxHeight={300} label={l(say('Kurba eta P puntua', 'La curva y el punto P', 'المنحنى والنقطة P', 'The curve and the point P'))}>
                            {(map, clip) => (
                                <g>
                                    {sampled((x) => curveValue(round.curve, x), -B, B, B * 2).map((points, index) => <PlanePath key={index} map={map} points={points} color={BLUE} width={3} clip={clip} />)}
                                    <PlanePoint map={map} point={[round.a, curveValue(round.curve, round.a)]} color={RED} radius={6} name="P" />
                                </g>
                            )}
                        </Plane>
                    </div>
                </>
            ) : (
                <>
                    <p className="prop3-prompt"><MathText text={l(say(`Nolakoa da $f$ funtzioa $x=${a}$ puntuan?`, `¿Cómo es $f$ en $x=${a}$?`, `كيف تكون $f$ عند $x=${a}$؟`, `What is $f$ like at $x=${a}$?`))} /></p>
                    <div className="dbh4-big-formula bach-der-big" dir="ltr">{formula(round.latex, language)}</div>
                </>
            )}
            <div className="prop3-options bach-app-shapes" dir="ltr" role="group" aria-label={l(say('Aukerak', 'Opciones', 'الخيارات', 'Options'))}>
                {SHAPES.map((shape) => (
                    <button key={shape} type="button" disabled={answered} className={!answered ? '' : shape === round.answer ? 'right' : shape === picked ? 'wrong' : ''} onClick={() => choose(shape)}>{l(SHAPE_LABELS[shape])}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {round.kind === 'graph' && <span className="dbh4-worked">{formula(`f(x)=${curveLatex(round.curve)}`, language)}</span>}
                    {round.kind === 'function' && <span className="dbh4-worked">{formula(round.secondLatex, language)}</span>}
                    <span className="dbh4-worked">{formula(`f''(${a})=${texDec(second, language, 2)}`, language)}</span>
                    <MathText text={l(say('$f\'\'>0$: ∪. $f\'\'<0$: ∩. Inflexioa, $f\'\'$ deribatuak zeinua aldatzen duenean bakarrik; $f\'\'=0$ ez da nahikoa.', '$f\'\'>0$: ∪. $f\'\'<0$: ∩. Inflexión solo si $f\'\'$ cambia de signo; $f\'\'=0$ no basta.', '$f\'\'>0$: ∪. $f\'\'<0$: ∩. ولا انعطاف إلا إذا غيّرت $f\'\'$ إشارتها؛ لا يكفي $f\'\'=0$.', '$f\'\'>0$: ∪. $f\'\'<0$: ∩. An inflection only if $f\'\'$ changes sign; $f\'\'=0$ is not enough.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function ShapeGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SHAPE_ROUNDS,
                rules: [
                    say('Kurba bat, $f\'\'$ edo $f$, eta puntu bat ematen dira.', 'Te dan una curva, $f\'\'$ o $f$, y un punto.', 'يُعطى منحنى أو $f\'\'$ أو $f$، ونقطة.', 'You get a curve, $f\'\'$ or $f$, and a point.'),
                    say('$f\'\'>0$ denean, ∪ (ahurra); $f\'\'<0$ denean, ∩ (ganbila); zeinua aldatzen bada, inflexioa.', 'Si $f\'\'>0$, ∪ (cóncava); si $f\'\'<0$, ∩ (convexa); si cambia de signo, inflexión.', 'إذا $f\'\'>0$ فـ ∪ (نحو الأعلى)، وإذا $f\'\'<0$ فـ ∩ (نحو الأسفل)، وإذا تغيرت الإشارة فانعطاف.', 'If $f\'\'>0$, ∪ (concave up); if $f\'\'<0$, ∩ (concave down); if it changes sign, an inflection.'),
                    say('Aukeratu forma.', 'Elige la forma.', 'اختر الشكل.', 'Choose the shape.')
                ],
                create: createShapeRounds,
                stars: standardStars(SHAPE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ShapePlay
            }}
        />
    )
}
