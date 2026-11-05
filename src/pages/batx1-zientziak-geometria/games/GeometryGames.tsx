import { useId, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './GeometryGames.css'
import { generalLatex, type Line, type Point } from './lines'
import { createRadarRounds, detected, RADAR_ROUNDS, type RadarRound } from './radar'
import { createTwinRounds, TWINS_ROUNDS, type LineForm, type TwinError, type TwinRound } from './twins'

/* ==========================================================================
   Zuzen bikiak and Radarra (Geometria analitikoa, Batxilergoa 1 ·
   Zientziak): the first shows a line in one form and asks which of four
   lines in another form is the same one, and draws the right line and the
   chosen one after answering; the second asks how close a ship's route
   gets to a radar and draws the perpendicular and the radar's range.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')

/** A small Cartesian plane in pixels, with its grid and axes */
function Plane({ limit, size, label, children }: { limit: number; size: number; label: string; children: (x: (value: number) => number, y: (value: number) => number, clip: string) => ReactNode }) {
    const id = useId().replace(/:/g, '')
    const cell = (size - 20) / (2 * limit)
    const x = (value: number) => 10 + (value + limit) * cell
    const y = (value: number) => 10 + (limit - value) * cell
    const ticks = Array.from({ length: 2 * limit + 1 }, (_, index) => index - limit)
    return (
        <svg className="geo-game-drawing" viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label} direction="ltr">
            <defs><clipPath id={`geo-plane-${id}`}><rect x={x(-limit)} y={y(limit)} width={x(limit) - x(-limit)} height={y(-limit) - y(limit)} /></clipPath></defs>
            <rect x={x(-limit)} y={y(limit)} width={x(limit) - x(-limit)} height={y(-limit) - y(limit)} fill="var(--card, #fffcf6)" stroke="var(--line, #d8d2c4)" />
            {ticks.map((tick) => <line key={`v${tick}`} x1={x(tick)} x2={x(tick)} y1={y(limit)} y2={y(-limit)} stroke="var(--line, #d8d2c4)" strokeWidth={0.6} />)}
            {ticks.map((tick) => <line key={`h${tick}`} y1={y(tick)} y2={y(tick)} x1={x(-limit)} x2={x(limit)} stroke="var(--line, #d8d2c4)" strokeWidth={0.6} />)}
            <line x1={x(-limit)} x2={x(limit)} y1={y(0)} y2={y(0)} stroke="var(--muted, #58616e)" strokeWidth={1.4} />
            <line x1={x(0)} x2={x(0)} y1={y(-limit)} y2={y(limit)} stroke="var(--muted, #58616e)" strokeWidth={1.4} />
            {children(x, y, `url(#geo-plane-${id})`)}
        </svg>
    )
}

/** Two far points of Ax + By + C = 0 */
function ends({ A, B, C }: Line): [Point, Point] {
    if (B === 0) return [[-C / A, -40], [-C / A, 40]]
    return [[-40, (-C + 40 * A) / B], [40, (-C - 40 * A) / B]]
}

/* ---------- Twin lines ---------- */

const FORM_NAMES: Record<LineForm, LocalizedText> = {
    general: say('orokorra', 'general', 'العامة', 'general'),
    explicit: say('esplizitua', 'explícita', 'الصريحة', 'explicit'),
    'point-slope': say('puntu-malda', 'punto-pendiente', 'النقطة والميل', 'point-slope'),
    vector: say('bektoriala', 'vectorial', 'المتجهية', 'vector'),
    parametric: say('parametrikoak', 'paramétricas', 'الوسيطيتان', 'parametric'),
    continuous: say('jarraitua', 'continua', 'المتصلة', 'continuous')
}

const TWIN_REASONS: Record<TwinError, LocalizedText> = {
    parallel: say('Aukeratutakoa paraleloa da: norabide bera du, baina beste puntu batetik pasatzen da.', 'La que elegiste es paralela: tiene la misma dirección, pero pasa por otro punto.', 'ما اخترته موازٍ: له الاتجاه نفسه لكنه يمر بنقطة أخرى.', 'The one you chose is parallel: same direction, but through another point.'),
    'normal-direction': say('Aukeratutakoa perpendikularra da: bektore normala norabide-bektoretzat hartu da.', 'La que elegiste es perpendicular: se tomó el vector normal como director.', 'ما اخترته عمودي: أُخذ المتجه الناظمي متجه توجيه.', 'The one you chose is perpendicular: the normal vector was taken as the direction.'),
    'point-sign': say('Aukeratutakoak puntua zeinu aldatuta du: $x-a$ behar zuen, ez $x+a$.', 'La que elegiste tiene el punto con el signo cambiado: era $x-a$, no $x+a$.', 'ما اخترته فيه النقطة بإشارة معكوسة: كان $x-a$ لا $x+a$.', 'The one you chose has the point with its sign changed: it was $x-a$, not $x+a$.'),
    'slope-inverted': say('Aukeratutakoak malda alderantziz du: $\\frac{\\Delta y}{\\Delta x}$ da.', 'La que elegiste tiene la pendiente al revés: es $\\frac{\\Delta y}{\\Delta x}$.', 'ما اخترته ميله مقلوب: إنه $\\frac{\\Delta y}{\\Delta x}$.', 'The one you chose has the slope upside down: it is $\\frac{\\Delta y}{\\Delta x}$.')
}

function TwinsDrawing({ line, wrong, label }: { line: Line; wrong: Line | null; label: string }) {
    const [a, b] = ends(line)
    const other = wrong ? ends(wrong) : null
    return (
        <Plane limit={6} size={220} label={label}>
            {(x, y, clip) => (
                <g clipPath={clip}>
                    {other && <line x1={x(other[0][0])} y1={y(other[0][1])} x2={x(other[1][0])} y2={y(other[1][1])} stroke="var(--coral, #c4432a)" strokeWidth={2.6} strokeDasharray="7 5" />}
                    <line x1={x(a[0])} y1={y(a[1])} x2={x(b[0])} y2={y(b[1])} stroke="var(--blue, #2f6fdb)" strokeWidth={3.2} />
                </g>
            )}
        </Plane>
    )
}

function TwinsPlay({ round, language, onAnswer, answered }: RoundProps<TwinRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered || picked !== null) return
        setPicked(index)
        onAnswer(round.choices[index].error === null)
    }
    const chosen = picked === null ? null : round.choices[picked]
    const target = FORM_NAMES[round.target]
    return (
        <>
            <p className="prop3-prompt">{l(say('Zuzen hau:', 'Esta recta:', 'هذا المستقيم:', 'This line:'))}</p>
            <div className="dbh4-big-formula geo-big" dir="ltr">{formula(round.givenLatex, language)}</div>
            <p className="prop3-prompt">{l(say(`Aukeratu zuzen bera. Forma: ${target.eu}.`, `Elige la misma recta, en forma ${target.es}.`, `اختر المستقيم نفسه بالصيغة: ${target.ar}.`, `Choose the same line, in ${target.en} form.`))}</p>
            <div className="prop3-options geo-twins-options" dir="ltr">
                {round.choices.map((choice, index) => (
                    <button key={choice.latex} type="button" disabled={answered} className={!answered ? '' : choice.error === null ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>{formula(choice.latex, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen !== null && chosen.error === null} language={language}>
                    {chosen && chosen.error && <MathText text={l(TWIN_REASONS[chosen.error])} />}
                    <span className="dbh4-worked">{formula(generalLatex(round.line), language)}</span>
                    <TwinsDrawing line={round.line} wrong={chosen && chosen.error ? chosen.line : null} label={l(say('Zuzena urdinez; aukeratutakoa, marra etenez', 'La recta en azul; la elegida, a trazos', 'المستقيم بالأزرق؛ والمختار متقطع', 'The line in blue; the one chosen, dashed'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function TwinsGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TWINS_ROUNDS,
                rules: [
                    say('Zuzen batek ekuazio asko ditu: orokorra, esplizitua, bektoriala…', 'Una recta tiene muchas ecuaciones: general, explícita, vectorial…', 'للمستقيم معادلات كثيرة: العامة والصريحة والمتجهية…', 'A line has many equations: general, explicit, vector…'),
                    say('Aukeratu lauretatik zein den zuzen bera; besteak paraleloak, perpendikularrak edo zeinu okerrekoak dira.', 'Elige cuál de las cuatro es la misma recta; las otras son paralelas, perpendiculares o tienen un signo mal.', 'اختر أيّ الأربعة هو المستقيم نفسه؛ والبقية موازية أو عمودية أو بإشارة خاطئة.', 'Choose which of the four is the same line; the others are parallel, perpendicular or have a wrong sign.'),
                    say('Trikimailua: egiaztatu puntu bat eta norabidea.', 'Truco: comprueba un punto y la dirección.', 'حيلة: تحقق من نقطة ومن الاتجاه.', 'Tip: check one point and the direction.')
                ],
                create: createTwinRounds,
                stars: standardStars(TWINS_ROUNDS),
                starsNote: STARS_NOTE,
                Round: TwinsPlay
            }}
        />
    )
}

/* ---------- The radar ---------- */

function RadarDrawing({ round, answered, label }: { round: RadarRound; answered: boolean; label: string }) {
    const { route, second, radar, range } = round
    const length = Math.hypot(route.A, route.B)
    const value = route.A * radar[0] + route.B * radar[1] + route.C
    const foot: Point = [radar[0] - (value * route.A) / (length * length), radar[1] - (value * route.B) / (length * length)]
    const along: Point = [-route.B / length, route.A / length]
    const ship: Point = [foot[0] + 3.2 * along[0], foot[1] + 3.2 * along[1]]
    const [a, b] = ends(route)
    const other = second ? ends(second) : null
    /* Level 3: the gap between the two routes, from a point of the first one */
    const start: Point = foot
    const secondValue = second ? second.A * start[0] + second.B * start[1] + second.C : 0
    const secondLength = second ? Math.hypot(second.A, second.B) : 1
    const across: Point = second ? [start[0] - (secondValue * second.A) / (secondLength * secondLength), start[1] - (secondValue * second.B) / (secondLength * secondLength)] : start
    return (
        <Plane limit={8} size={260} label={label}>
            {(x, y, clip) => {
                const unit = x(1) - x(0)
                const angle = (Math.atan2(-along[1], along[0]) * 180) / Math.PI
                return (
                    <g>
                        <g clipPath={clip}>
                            {!second && <circle cx={x(radar[0])} cy={y(radar[1])} r={range * unit} fill="var(--success-tint, #d9efe2)" fillOpacity={0.55} stroke="var(--success, #267b53)" strokeWidth={1.8} strokeDasharray="6 4" />}
                            {other && <line x1={x(other[0][0])} y1={y(other[0][1])} x2={x(other[1][0])} y2={y(other[1][1])} stroke="var(--ink, #1d2733)" strokeWidth={2.6} />}
                            <line x1={x(a[0])} y1={y(a[1])} x2={x(b[0])} y2={y(b[1])} stroke="var(--ink, #1d2733)" strokeWidth={2.6} />
                            {answered && !second && <line x1={x(radar[0])} y1={y(radar[1])} x2={x(foot[0])} y2={y(foot[1])} stroke="var(--coral, #c4432a)" strokeWidth={3} />}
                            {answered && second && <line x1={x(start[0])} y1={y(start[1])} x2={x(across[0])} y2={y(across[1])} stroke="var(--coral, #c4432a)" strokeWidth={3} />}
                        </g>
                        <polygon points="-9,-6 11,0 -9,6" transform={`translate(${x(ship[0])} ${y(ship[1])}) rotate(${angle})`} fill="var(--blue, #2f6fdb)" stroke="var(--ink, #1d2733)" strokeWidth={1.2} />
                        {!second && <circle cx={x(radar[0])} cy={y(radar[1])} r={5.5} fill="var(--success, #267b53)" stroke="var(--ink, #1d2733)" strokeWidth={1.2} />}
                        {!second && <text x={x(radar[0]) + 8} y={y(radar[1]) - 8} fontSize={14} fontWeight={700} fill="var(--success, #267b53)">P</text>}
                        {answered && <text x={x(((second ? start[0] : radar[0]) + (second ? across[0] : foot[0])) / 2) + 6} y={y(((second ? start[1] : radar[1]) + (second ? across[1] : foot[1])) / 2) - 6} fontSize={14} fontWeight={700} fill="var(--coral, #c4432a)">d</text>}
                    </g>
                )
            }}
        </Plane>
    )
}

function RadarPlay({ round, language, onAnswer, answered }: RoundProps<RadarRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<string | null>(null)
    const choose = (option: string) => {
        if (answered || picked !== null) return
        setPicked(option)
        onAnswer(option === round.answer)
    }
    const [px, py] = round.radar
    const prompt = round.second
        ? say(`Bi itsasontzik bide paraleloak dituzte: $${round.routeLatex}$ eta $${round.secondLatex}$. Zer distantziak bereizten ditu bideak?`, `Dos barcos siguen rutas paralelas: $${round.routeLatex}$ y $${round.secondLatex}$. ¿Qué distancia separa las rutas?`, `تسير سفينتان في طريقين متوازيين: $${round.routeLatex}$ و$${round.secondLatex}$. ما المسافة بين الطريقين؟`, `Two ships follow parallel routes: $${round.routeLatex}$ and $${round.secondLatex}$. How far apart are the routes?`)
        : say(`Radarra $P(${px},${py})$ puntuan dago, eta $${round.range}$ unitateko irismena du. Itsasontziaren bidea: $${round.routeLatex}$. Zenbat hurbiltzen da radarrera?`, `El radar está en $P(${px},${py})$ y alcanza $${round.range}$ unidades. La ruta del barco: $${round.routeLatex}$. ¿Cuánto se acerca al radar?`, `الرادار في $P(${px},${py})$ ومداه $${round.range}$ وحدات. طريق السفينة: $${round.routeLatex}$. كم تقترب من الرادار؟`, `The radar is at $P(${px},${py})$ and reaches $${round.range}$ units. The ship's route: $${round.routeLatex}$. How close does it get to the radar?`)
    const verdict = round.second
        ? say('Bideak paraleloak dira: distantzia berean daude beti.', 'Las rutas son paralelas: siempre están a la misma distancia.', 'الطريقان متوازيان: المسافة بينهما ثابتة دائمًا.', 'The routes are parallel: they are always the same distance apart.')
        : detected(round)
            ? say(`$d\\leq ${round.range}$: itsasontzia radarraren irismenean sartzen da.`, `$d\\leq ${round.range}$: el barco entra en el alcance del radar.`, `$d\\leq ${round.range}$: تدخل السفينة مدى الرادار.`, `$d\\leq ${round.range}$: the ship enters the radar's range.`)
            : say(`$d>${round.range}$: itsasontzia radarraren irismenetik kanpo pasatzen da.`, `$d>${round.range}$: el barco pasa fuera del alcance del radar.`, `$d>${round.range}$: تمر السفينة خارج مدى الرادار.`, `$d>${round.range}$: the ship passes out of the radar's range.`)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} /></p>
            <RadarDrawing round={round} answered={answered} label={l(prompt).replace(/\$/g, '')} />
            <div className="prop3-options geo-radar-options" dir="ltr">
                {round.options.map((option) => (
                    <button key={option.latex} type="button" disabled={answered} className={!answered ? '' : option.error === null ? 'right' : option.latex === picked ? 'wrong' : ''} onClick={() => choose(option.latex)}>{formula(`d=${option.latex}`, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <MathText text={l(verdict)} />
                    <span className="dbh4-worked">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function RadarGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: RADAR_ROUNDS,
                rules: [
                    say('Itsasontzi bat radarretik gertuen dagoen unean, bien arteko lerroa bidearekiko perpendikularra da.', 'Cuando el barco está más cerca del radar, la línea que los une es perpendicular a la ruta.', 'عندما تكون السفينة أقرب ما يكون إلى الرادار يكون الخط بينهما عموديًا على الطريق.', 'When the ship is closest to the radar, the line joining them is perpendicular to the route.'),
                    say('Distantzia: $d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$.', 'Distancia: $d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$.', 'المسافة: $d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$.', 'Distance: $d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$.'),
                    say('Bidea $y=mx+n$ moduan badator, lehenik idatzi forma orokorrean.', 'Si la ruta viene como $y=mx+n$, escríbela antes en forma general.', 'إذا جاء الطريق بالصيغة $y=mx+n$ فاكتبه بالصيغة العامة أولًا.', 'If the route comes as $y=mx+n$, write it in general form first.')
                ],
                create: createRadarRounds,
                stars: standardStars(RADAR_ROUNDS),
                starsNote: STARS_NOTE,
                Round: RadarPlay
            }}
        />
    )
}
