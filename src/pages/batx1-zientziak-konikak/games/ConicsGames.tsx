import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './ConicsGames.css'
import { ANTENNA_ROUNDS, createAntennaRounds, type AntennaError, type AntennaRound, type AntennaShape } from './antenna'
import { CONIC_KINDS, CONIC_ROUNDS, createConicRounds, type ConicElement, type ConicError, type ConicKind, type ConicRound } from './conic'

/* ==========================================================================
   Zein konika da? and Antena (Leku geometrikoak eta konikak, Batxilergoa
   1 · Zientziak): the first shows an equation, asks which conic it is and
   then one of its elements; the second asks where the receiver of a dish
   or the second focus of an elliptical room goes, and draws the rays
   bouncing to the focus after answering.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')

/* ---------- Which conic is it? ---------- */

const KIND_NAMES: Record<ConicKind, LocalizedText> = {
    circle: say('Zirkunferentzia', 'Circunferencia', 'دائرة', 'Circle'),
    ellipse: say('Elipsea', 'Elipse', 'قطع ناقص', 'Ellipse'),
    hyperbola: say('Hiperbola', 'Hipérbola', 'قطع زائد', 'Hyperbola'),
    parabola: say('Parabola', 'Parábola', 'قطع مكافئ', 'Parabola')
}

const KIND_REASONS: Record<ConicKind, LocalizedText> = {
    circle: say('$x^2$ eta $y^2$ gaien koefizienteak berdinak dira: zirkunferentzia.', 'Los coeficientes de $x^2$ e $y^2$ son iguales: circunferencia.', 'معاملا $x^2$ و$y^2$ متساويان: دائرة.', 'The coefficients of $x^2$ and $y^2$ are equal: a circle.'),
    ellipse: say('$x^2$ eta $y^2$ gaiek zeinu bera dute, baina koefiziente desberdinak: elipsea.', '$x^2$ e $y^2$ tienen el mismo signo y coeficientes distintos: elipse.', 'لـ $x^2$ و$y^2$ الإشارة نفسها ومعاملان مختلفان: قطع ناقص.', '$x^2$ and $y^2$ have the same sign and different coefficients: an ellipse.'),
    hyperbola: say('$x^2$ eta $y^2$ gaiek zeinu desberdinak dituzte: hiperbola.', '$x^2$ e $y^2$ tienen signos distintos: hipérbola.', 'لـ $x^2$ و$y^2$ إشارتان مختلفتان: قطع زائد.', '$x^2$ and $y^2$ have different signs: a hyperbola.'),
    parabola: say('Aldagai bakarra dago karratura: parabola.', 'Solo una variable va al cuadrado: parábola.', 'متغير واحد فقط مربّع: قطع مكافئ.', 'Only one variable is squared: a parabola.')
}

const ELEMENT_QUESTIONS: Record<ConicElement, LocalizedText> = {
    radius: say('Zein da haren erradioa?', '¿Cuál es su radio?', 'ما نصف قطرها؟', 'What is its radius?'),
    foci: say('Non daude haren fokuak?', '¿Dónde están sus focos?', 'أين بؤرتاه؟', 'Where are its foci?'),
    asymptotes: say('Zein dira haren asintotak?', '¿Cuáles son sus asíntotas?', 'ما مقارباه؟', 'What are its asymptotes?'),
    focus: say('Non dago haren fokua?', '¿Dónde está su foco?', 'أين بؤرته؟', 'Where is its focus?'),
    centre: say('Zein da haren zentroa?', '¿Cuál es su centro?', 'ما مركزه؟', 'What is its centre?'),
    vertex: say('Zein da haren erpina?', '¿Cuál es su vértice?', 'ما رأسه؟', 'What is its vertex?')
}

const CONIC_REASONS: Record<ConicError, LocalizedText> = {
    square: say('Hori $r^2$ da: erradioa haren erroa da.', 'Eso es $r^2$: el radio es su raíz.', 'هذا $r^2$: ونصف القطر جذره.', 'That is $r^2$: the radius is its root.'),
    diameter: say('Hori diametroa da: erradioa erdia da.', 'Eso es el diámetro: el radio es la mitad.', 'هذا القطر: ونصف القطر نصفه.', 'That is the diameter: the radius is half of it.'),
    axis: say('Fokua konikaren ardatzean dago: elipsean, izendatzaile handienaren aldagaiarena; parabolan, karratura ez doan aldagaiarena.', 'El foco está en el eje de la cónica: en la elipse, el de la variable con el denominador mayor; en la parábola, el de la variable que no va al cuadrado.', 'البؤرة على محور القطع: في القطع الناقص محور المتغير ذي المقام الأكبر، وفي القطع المكافئ محور المتغير غير المربّع.', 'The focus is on the axis of the conic: in an ellipse, that of the variable with the greater denominator; in a parabola, that of the variable that is not squared.'),
    sum: say('Elipsean $c^2=a^2-b^2$, ez $a^2+b^2$.', 'En la elipse $c^2=a^2-b^2$, no $a^2+b^2$.', 'في القطع الناقص $c^2=a^2-b^2$ لا $a^2+b^2$.', 'In an ellipse $c^2=a^2-b^2$, not $a^2+b^2$.'),
    vertex: say('Hori erpin bat da: fokuak zentrotik $c$ distantziara daude.', 'Eso es un vértice: los focos están a $c$ del centro.', 'هذا رأس: البؤرتان على بعد $c$ من المركز.', 'That is a vertex: the foci are $c$ from the centre.'),
    inverted: say('Malda $\\frac{b}{a}$ da, ez $\\frac{a}{b}$.', 'La pendiente es $\\frac{b}{a}$, no $\\frac{a}{b}$.', 'الميل $\\frac{b}{a}$ لا $\\frac{a}{b}$.', 'The slope is $\\frac{b}{a}$, not $\\frac{a}{b}$.'),
    squares: say('Asintotek $a$ eta $b$ erabiltzen dituzte, ez haien karratuak.', 'Las asíntotas usan $a$ y $b$, no sus cuadrados.', 'المقاربان يستعملان $a$ و$b$ لا مربعيهما.', 'The asymptotes use $a$ and $b$, not their squares.'),
    'not-half': say('Fokua $\\frac{p}{2}$ distantziara dago, ez $p$ distantziara.', 'El foco está a $\\frac{p}{2}$, no a $p$.', 'البؤرة على بعد $\\frac{p}{2}$ لا $p$.', 'The focus is $\\frac{p}{2}$ away, not $p$.'),
    side: say('Fokua parabola irekitzen den aldean dago.', 'El foco está del lado hacia el que se abre la parábola.', 'البؤرة في الجهة التي ينفتح نحوها القطع.', 'The focus is on the side the parabola opens towards.'),
    sign: say('Parentesietako zenbakiek zeinua aldatzen dute: $x-3$ gaiak $3$ ematen du.', 'Los números de los paréntesis cambian de signo: $x-3$ da $3$.', 'تتغير إشارة أعداد القوسين: $x-3$ تعطي $3$.', 'The numbers in the brackets change sign: $x-3$ gives $3$.'),
    swapped: say('Lehenik $x$, gero $y$.', 'Primero la $x$ y después la $y$.', 'أولًا $x$ ثم $y$.', 'First $x$, then $y$.'),
    'one-sign': say('Bi koordenatuek aldatzen dute zeinua.', 'Las dos coordenadas cambian de signo.', 'يتغير إشارة الإحداثيين كليهما.', 'Both coordinates change sign.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}

function ConicPlay({ round, language, onAnswer, answered }: RoundProps<ConicRound>) {
    const l = useGameText(language)
    const [kind, setKind] = useState<ConicKind | null>(null)
    const [picked, setPicked] = useState<number | null>(null)
    const kindRight = kind === round.kind
    const chooseKind = (choice: ConicKind) => {
        if (answered || kind !== null) return
        setKind(choice)
        if (choice !== round.kind) onAnswer(false)
    }
    const chooseElement = (index: number) => {
        if (answered || picked !== null) return
        setPicked(index)
        onAnswer(round.options[index].error === null)
    }
    const chosen = picked === null ? null : round.options[picked]
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein konika da?', '¿Qué cónica es?', 'أي قطع مخروطي هو؟', 'Which conic is it?'))}</p>
            <div className="dbh4-big-formula conic-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="prop3-options conic-kinds">
                {CONIC_KINDS.map((option) => (
                    <button key={option} type="button" disabled={answered || kind !== null} className={kind === null ? '' : option === round.kind ? 'right' : option === kind ? 'wrong' : ''} onClick={() => chooseKind(option)}>{l(KIND_NAMES[option])}</button>
                ))}
            </div>
            {kindRight && (
                <>
                    <p className="prop3-prompt">{l(ELEMENT_QUESTIONS[round.element])}</p>
                    <div className="prop3-options conic-elements" dir="ltr">
                        {round.options.map((option, index) => (
                            <button key={option.latex} type="button" disabled={answered} className={!answered ? '' : option.error === null ? 'right' : index === picked ? 'wrong' : ''} onClick={() => chooseElement(index)}>{formula(option.latex, language)}</button>
                        ))}
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={kindRight && chosen !== null && chosen.error === null} language={language}>
                    {!kindRight && <MathText text={l(KIND_REASONS[round.kind])} />}
                    {chosen && chosen.error && <MathText text={l(CONIC_REASONS[chosen.error])} />}
                    <span className="dbh4-worked">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function ConicGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CONIC_ROUNDS,
                rules: [
                    say('Begiratu $x^2$ eta $y^2$ gaiei: koefiziente berdinak, zirkunferentzia; zeinu bera, elipsea; zeinu desberdinak, hiperbola; bakarra, parabola.', 'Mira $x^2$ e $y^2$: coeficientes iguales, circunferencia; mismo signo, elipse; signos distintos, hipérbola; solo uno, parábola.', 'انظر إلى $x^2$ و$y^2$: معاملان متساويان دائرة؛ الإشارة نفسها قطع ناقص؛ إشارتان مختلفتان قطع زائد؛ واحد فقط قطع مكافئ.', 'Look at $x^2$ and $y^2$: equal coefficients, a circle; the same sign, an ellipse; different signs, a hyperbola; only one, a parabola.'),
                    say('Gero aukeratu eskatzen den elementua: erradioa, fokuak, asintotak, zentroa edo erpina.', 'Después elige el elemento que se pide: radio, focos, asíntotas, centro o vértice.', 'ثم اختر العنصر المطلوب: نصف القطر أو البؤر أو المقاربات أو المركز أو الرأس.', 'Then choose the element asked for: radius, foci, asymptotes, centre or vertex.'),
                    say('Bi urratsak ondo egin behar dira puntua lortzeko.', 'Hay que acertar los dos pasos para sumar el punto.', 'يجب إصابة الخطوتين لكسب النقطة.', 'You need both steps right to score the point.')
                ],
                create: createConicRounds,
                stars: standardStars(CONIC_ROUNDS),
                starsNote: STARS_NOTE,
                Round: ConicPlay
            }}
        />
    )
}

/* ---------- The antenna ---------- */

const ANTENNA_REASONS: Record<AntennaError, LocalizedText> = {
    'not-half': say('Hori $p$ da: fokua $\\frac{p}{2}$ distantziara dago.', 'Eso es $p$: el foco está a $\\frac{p}{2}$.', 'هذا $p$: البؤرة على بعد $\\frac{p}{2}$.', 'That is $p$: the focus is $\\frac{p}{2}$ away.'),
    'two-p': say('Hori $2p$ da: fokua $\\frac{p}{2}$ distantziara dago.', 'Eso es $2p$: el foco está a $\\frac{p}{2}$.', 'هذا $2p$: البؤرة على بعد $\\frac{p}{2}$.', 'That is $2p$: the focus is $\\frac{p}{2}$ away.'),
    depth: say('Hori antenaren sakonera da, ez fokua.', 'Eso es la profundidad de la antena, no el foco.', 'هذا عمق الهوائي لا البؤرة.', 'That is the depth of the dish, not the focus.'),
    rim: say('Hori zabaleraren erdia da; ertzeko puntuak $p$ ematen du.', 'Eso es la mitad del ancho; el punto del borde da $p$.', 'هذا نصف العرض؛ ونقطة الحافة تعطي $p$.', 'That is half the width; the point on the rim gives $p$.'),
    vertex: say('Hori erpin bat da: fokuak barrurago daude, $c$ distantziara.', 'Eso es un vértice: los focos están más dentro, a $c$.', 'هذا رأس: البؤرتان أقرب إلى المركز، على بعد $c$.', 'That is a vertex: the foci are further in, $c$ away.'),
    minor: say('Hori $b$ da: $c^2=a^2-b^2$.', 'Eso es $b$: $c^2=a^2-b^2$.', 'هذا $b$: ‏$c^2=a^2-b^2$.', 'That is $b$: $c^2=a^2-b^2$.'),
    'from-vertex': say('Hori erpinetik fokurako distantzia da, ez zentrotik.', 'Eso es la distancia del vértice al foco, no del centro.', 'هذه المسافة من الرأس إلى البؤرة لا من المركز.', 'That is the distance from the vertex to the focus, not from the centre.'),
    calculation: say('Berrikusi kalkulua.', 'Revisa el cálculo.', 'راجع الحساب.', 'Check your working.')
}

/** The dish or the room, and after answering the rays bouncing to the focus */
function AntennaDrawing({ shape, answered, label }: { shape: AntennaShape; answered: boolean; label: string }) {
    const [width, height] = [280, 180]
    if (shape.kind === 'parabola') {
        const { focus, rim, depth } = shape
        const scale = Math.min((width - 40) / (depth + focus * 0.6 + rim * 0.9), (height - 30) / (2 * rim))
        const x = (value: number) => 20 + value * scale
        const y = (value: number) => height / 2 - value * scale
        const curve = Array.from({ length: 41 }, (_, i) => -rim + (2 * rim * i) / 40).map((v) => `${x((v * v) / (4 * focus))},${y(v)}`).join(' ')
        const rays = [-0.75, -0.4, 0.4, 0.75].map((t) => t * rim)
        const end = x(depth) + rim * 0.9 * scale
        return (
            <svg className="conic-game-drawing" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} direction="ltr">
                <line x1={x(0)} y1={y(0)} x2={width - 6} y2={y(0)} stroke="var(--line, #d8d2c4)" strokeWidth={1.4} strokeDasharray="5 4" />
                <polyline points={curve} fill="none" stroke="var(--ink, #1d2733)" strokeWidth={4} strokeLinejoin="round" />
                {rays.map((v) => {
                    const hit = (v * v) / (4 * focus)
                    return (
                        <g key={v}>
                            <line x1={end} y1={y(v)} x2={x(hit)} y2={y(v)} stroke="var(--mustard, #e0a100)" strokeWidth={2} />
                            {answered && <line x1={x(hit)} y1={y(v)} x2={x(focus)} y2={y(0)} stroke="var(--coral, #c4432a)" strokeWidth={2} />}
                        </g>
                    )
                })}
                {answered ? <circle cx={x(focus)} cy={y(0)} r={6} fill="var(--coral, #c4432a)" stroke="var(--ink, #1d2733)" strokeWidth={1.2} /> : <text x={x(focus)} y={y(0) - 10} textAnchor="middle" fontSize={20} fontWeight={700} fill="var(--muted, #58616e)">?</text>}
                <circle cx={x(0)} cy={y(0)} r={4} fill="var(--ink, #1d2733)" />
                {answered && <text x={x(focus)} y={y(0) + 22} textAnchor="middle" fontSize={14} fontWeight={700} fill="var(--coral, #c4432a)">F</text>}
            </svg>
        )
    }
    const { a, b, c } = shape
    const scale = Math.min((width - 30) / (2 * a), (height - 30) / (2 * b))
    const x = (value: number) => width / 2 + value * scale
    const y = (value: number) => height / 2 - value * scale
    const points = [0.35, 0.6, 1.9, 2.4, 4.1].map((t): [number, number] => [a * Math.cos(t), b * Math.sin(t)])
    return (
        <svg className="conic-game-drawing" viewBox={`0 0 ${width} ${height}`} role="img" aria-label={label} direction="ltr">
            <ellipse cx={x(0)} cy={y(0)} rx={a * scale} ry={b * scale} fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink, #1d2733)" strokeWidth={3.4} />
            {answered && points.map(([px, py]) => (
                <g key={px}>
                    <line x1={x(-c)} y1={y(0)} x2={x(px)} y2={y(py)} stroke="var(--mustard, #e0a100)" strokeWidth={1.8} />
                    <line x1={x(px)} y1={y(py)} x2={x(c)} y2={y(0)} stroke="var(--coral, #c4432a)" strokeWidth={1.8} />
                </g>
            ))}
            <circle cx={x(0)} cy={y(0)} r={3.5} fill="var(--ink, #1d2733)" />
            {answered
                ? [-c, c].map((value) => <circle key={value} cx={x(value)} cy={y(0)} r={6} fill="var(--coral, #c4432a)" stroke="var(--ink, #1d2733)" strokeWidth={1.2} />)
                : [-1, 1].map((side) => <text key={side} x={x(side * a * 0.55)} y={y(0) + 7} textAnchor="middle" fontSize={20} fontWeight={700} fill="var(--muted, #58616e)">?</text>)}
        </svg>
    )
}

function AntennaPlay({ round, language, onAnswer, answered }: RoundProps<AntennaRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered || picked !== null) return
        setPicked(index)
        onAnswer(round.options[index].error === null)
    }
    const chosen = picked === null ? null : round.options[picked]
    const label = round.shape.kind === 'parabola'
        ? say('Antena paraboliko bat eta ardatzarekiko paraleloak diren izpiak', 'Una antena parabólica y unos rayos paralelos a su eje', 'هوائي مقعّر وأشعة موازية لمحوره', 'A parabolic dish and some rays parallel to its axis')
        : say('Gela eliptiko bat; foku batetik irteten diren uhinak bestera iristen dira', 'Una sala elíptica; las ondas que salen de un foco llegan al otro', 'قاعة إهليلجية؛ الموجات الخارجة من بؤرة تصل إلى الأخرى', 'An elliptical room; the waves that leave one focus reach the other')
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.prompt)} /></p>
            <AntennaDrawing shape={round.shape} answered={answered} label={l(label)} />
            <div className="prop3-options conic-antenna-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={option.latex} type="button" disabled={answered} className={!answered ? '' : option.error === null ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>{formula(option.latex, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen !== null && chosen.error === null} language={language}>
                    {chosen && chosen.error && <MathText text={l(ANTENNA_REASONS[chosen.error])} />}
                    <span className="dbh4-worked">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function AntennaGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ANTENNA_ROUNDS,
                rules: [
                    say('Ardatzarekiko paralelo heltzen diren izpiak parabolaren fokura islatzen dira: hor doa hargailua.', 'Los rayos que llegan paralelos al eje se reflejan hacia el foco de la parábola: ahí va el receptor.', 'الأشعة الواصلة موازية للمحور تنعكس نحو بؤرة القطع المكافئ: هناك يوضع المستقبِل.', 'Rays that arrive parallel to the axis bounce to the focus of the parabola: that is where the receiver goes.'),
                    say('$y^2=2px$ parabolan, fokua erpinetik $\\frac{p}{2}$ distantziara dago.', 'En $y^2=2px$, el foco está a $\\frac{p}{2}$ del vértice.', 'في $y^2=2px$ البؤرة على بعد $\\frac{p}{2}$ من الرأس.', 'In $y^2=2px$, the focus is $\\frac{p}{2}$ from the vertex.'),
                    say('Elipse batean, foku batetik irteten dena beste fokura iristen da, zentrotik $c$ distantziara.', 'En una elipse, lo que sale de un foco llega al otro, a $c$ del centro.', 'في القطع الناقص ما يخرج من بؤرة يصل إلى الأخرى على بعد $c$ من المركز.', 'In an ellipse, what leaves one focus reaches the other, $c$ from the centre.')
                ],
                create: createAntennaRounds,
                stars: standardStars(ANTENNA_ROUNDS),
                starsNote: STARS_NOTE,
                Round: AntennaPlay
            }}
        />
    )
}
