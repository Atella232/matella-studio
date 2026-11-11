import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import './Bach2SketchGames.css'
import { createGraphRounds, GRAPH_ROUNDS, type GraphRound, type GraphView } from './graphGame'
import { createReadRounds, READ_PROMPTS, READ_ROUNDS, type ReadRound } from './readGame'
import { createSightRounds, SIGHT_ROUNDS, type SightRound } from './sightGame'

/* ==========================================================================
   ¿Qué gráfica es?, Lee la derivada and Asíntotas a la vista (Adierazpena,
   Batxilergoa 2 · Zientziak): the first picks one sketch out of three for
   a formula, the second answers a question about f from the graph of f′,
   the third picks the right list of asymptotes. The sketches are small
   planes with their axes and the curve only: no words, the same in every
   language.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
const stars = say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4')

/** A curve as an SVG path, broken where it does not exist, leaves the band or jumps */
function path(fn: (x: number) => number, view: GraphView, X: (x: number) => number, Y: (y: number) => number): string {
    const margin = (view.yMax - view.yMin) / 2
    const step = (view.xMax - view.xMin) / 400
    let d = ''
    let open = false
    let previous: number | null = null
    for (let x = view.xMin; x <= view.xMax + 1e-9; x += step) {
        const y = fn(x)
        const outside = !Number.isFinite(y) || y < view.yMin - margin || y > view.yMax + margin
        if (outside || (previous !== null && Math.abs(y - previous) > margin)) {
            open = false
            previous = outside ? null : y
            continue
        }
        d += `${open ? 'L' : 'M'} ${X(x).toFixed(1)} ${Y(y).toFixed(1)} `
        open = true
        previous = y
    }
    return d
}

/** A small plane with its axes, integer ticks and one curve */
function Sketch({ fn, view, height = 120, label, color = 'var(--blue)' }: { fn: (x: number) => number; view: GraphView; height?: number; label: string; color?: string }) {
    const X = (x: number) => 10 + ((x - view.xMin) * 280) / (view.xMax - view.xMin)
    const Y = (y: number) => 8 + ((view.yMax - y) * (height - 16)) / (view.yMax - view.yMin)
    const axisY = Y(Math.min(view.yMax, Math.max(view.yMin, 0)))
    const axisX = X(Math.min(view.xMax, Math.max(view.xMin, 0)))
    const ticks: number[] = []
    for (let x = Math.ceil(view.xMin); x <= Math.floor(view.xMax); x++) if (x !== 0) ticks.push(x)
    const id = `clip-${label.replace(/[^a-z0-9]/gi, '')}-${height}`
    return (
        <svg className="bach2-sketch-plot" viewBox={`0 0 300 ${height}`} direction="ltr" role="img" aria-label={label}>
            <defs><clipPath id={id}><rect x={10} y={8} width={280} height={height - 16} /></clipPath></defs>
            <rect x={10} y={8} width={280} height={height - 16} fill="var(--card, #fffcf6)" />
            {ticks.map((x) => <line key={x} x1={X(x)} x2={X(x)} y1={axisY - 3} y2={axisY + 3} stroke="var(--ink)" strokeWidth={1.2} />)}
            <line x1={10} x2={290} y1={axisY} y2={axisY} stroke="var(--ink)" strokeWidth={1.4} />
            <line x1={axisX} x2={axisX} y1={8} y2={height - 8} stroke="var(--ink)" strokeWidth={1.4} />
            <path d={path(fn, view, X, Y)} fill="none" stroke={color} strokeWidth={3} clipPath={`url(#${id})`} />
        </svg>
    )
}

const LETTERS = ['A', 'B', 'C']

/* ---------- ¿Qué gráfica es? ---------- */

function GraphPlay({ round, language, onAnswer, answered }: RoundProps<GraphRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.correct)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein da funtzio honen grafikoa?', '¿Cuál es la gráfica de esta función?', 'ما رسم هذه الدالة؟', 'Which is the graph of this function?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(`f(x)=${round.latex}`, language)}</div>
            <div className="prop3-options bach2-sketch-options" role="group" aria-label={l(say('Grafikoak', 'Gráficas', 'الرسوم', 'Graphs'))}>
                {round.options.map((option, index) => (
                    <button key={option.latex} type="button" disabled={answered} className={!answered ? '' : index === round.correct ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <span className="bach2-sketch-letter" aria-hidden="true">{LETTERS[index]}</span>
                        <Sketch fn={option.fn} view={round.view} label={LETTERS[index]} />
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.correct} language={language}>
                    <span className="dbh4-worked">{formula(`f(x)=${round.latex}`, language)}</span>
                    <span className="dbh4-worked">{formula(round.note, language)}</span>
                    <MathText text={l(say('Begiratu izate-eremuari, asintotei eta zeinuari: hiru zirriborroetan ezaugarri bakar bat aldatzen da.', 'Mira el dominio, las asíntotas y el signo: entre los tres esbozos solo cambia un rasgo.', 'انظر إلى المجال والمقاربات والإشارة: لا تختلف الرسوم الثلاثة إلا في سمة واحدة.', 'Look at the domain, the asymptotes and the sign: only one feature changes between the three sketches.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function GraphGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: GRAPH_ROUNDS,
                rules: [
                    say('Formula bat eta hiru zirriborro: aukeratu formulari dagokiona.', 'Una fórmula y tres esbozos: elige el que le corresponde.', 'صيغة وثلاثة رسوم تقريبية: اختر الرسم الذي يوافقها.', 'A formula and three sketches: choose the one that belongs to it.'),
                    say('Ez marraztu: begiratu izate-eremuari, asintotei, zeinuari edo simetriari.', 'No la dibujes: mira el dominio, las asíntotas, el signo o la simetría.', 'لا ترسمها: انظر إلى المجال أو المقاربات أو الإشارة أو التناظر.', 'Do not draw it: look at the domain, the asymptotes, the sign or the symmetry.')
                ],
                create: createGraphRounds,
                stars: standardStars(GRAPH_ROUNDS),
                starsNote: stars,
                Round: GraphPlay
            }}
        />
    )
}

/* ---------- Lee la derivada ---------- */

const READ_VIEW: GraphView = { xMin: -5, xMax: 5, yMin: -4, yMax: 4 }

function ReadPlay({ round, language, onAnswer, answered }: RoundProps<ReadRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.correct)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say('Hau $f\'$ deribatuaren grafikoa da, ez $f$ funtzioarena.', 'Esta es la gráfica de $f\'$, no la de $f$.', 'هذا رسم $f\'$ لا رسم $f$.', 'This is the graph of $f\'$, not of $f$.'))} /></p>
            <div className="bach2-sketch-derivative">
                <span className="bach2-sketch-tag" dir="ltr">y = f′(x)</span>
                <Sketch fn={round.fp} view={READ_VIEW} height={170} label="y = f′(x)" color="var(--coral, #c4432a)" />
            </div>
            <p className="prop3-prompt"><MathText text={l(READ_PROMPTS[round.question])} /></p>
            <div className="prop3-options bach2-sketch-choices" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {round.options.map((option, index) => (
                    <button key={option} type="button" dir="ltr" disabled={answered} className={!answered ? '' : index === round.correct ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(option, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.correct} language={language}>
                    <MathText text={l(round.explain)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function ReadGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: READ_ROUNDS,
                rules: [
                    say('Grafikoa $f\'$ deribatuarena da: ardatzaren gainean dagoen tokian $f$ gorakorra da, eta azpian, beherakorra.', 'La gráfica es la de $f\'$: donde está encima del eje $f$ crece, y debajo decrece.', 'الرسم رسم $f\'$: حيث يكون فوق المحور تتزايد $f$، وتحته تتناقص.', 'The graph is that of $f\'$: where it is above the axis $f$ increases, and below, it decreases.'),
                    say('Ardatza zeinua aldatuz ebakitzen duen tokian, mutur bat; $f\'$ deribatuaren mutur batean, inflexio bat.', 'Donde corta el eje cambiando de signo, un extremo; en un extremo de $f\'$, una inflexión.', 'حيث يقطع المحور مغيّرًا إشارته قيمة قصوى؛ وعند قيمة قصوى لـ $f\'$ انعطاف.', 'Where it crosses the axis changing sign, an extremum; at an extremum of $f\'$, an inflection.')
                ],
                create: createReadRounds,
                stars: standardStars(READ_ROUNDS),
                starsNote: stars,
                Round: ReadPlay
            }}
        />
    )
}

/* ---------- Asíntotas a la vista ---------- */

function SightPlay({ round, language, onAnswer, answered }: RoundProps<SightRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.correct)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Zein dira funtzio honen asintota guztiak?', '¿Cuáles son todas las asíntotas de esta función?', 'ما كل مقاربات هذه الدالة؟', 'What are all the asymptotes of this function?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(`f(x)=${round.latex}`, language)}</div>
            <div className="prop3-options bach2-sketch-choices" role="group" aria-label={l(say('Asintotak', 'Asíntotas', 'المقاربات', 'Asymptotes'))}>
                {round.options.map((option, index) => (
                    <button key={option} type="button" dir="ltr" disabled={answered} className={!answered ? '' : index === round.correct ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(option, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.correct} language={language}>
                    <span className="dbh4-worked bach2-sketch-wide">{formula(round.explain, language)}</span>
                    <MathText text={l(say('Bat falta bada edo bat soberan badago, zerrenda ez da zuzena.', 'Si falta una o sobra una, la lista no está bien.', 'إذا نقص واحد أو زاد واحد فالقائمة خاطئة.', 'If one is missing or one is too many, the list is wrong.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function SightGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SIGHT_ROUNDS,
                rules: [
                    say('Funtzio bat eta hiru asintota-zerrenda: aukeratu osoa eta zuzena dena.', 'Una función y tres listas de asíntotas: elige la que está completa y bien.', 'دالة وثلاث قوائم من المقاربات: اختر الكاملة الصحيحة.', 'A function and three lists of asymptotes: choose the one that is complete and right.'),
                    say('Bertikalak izate-eremuaren ertzetan; horizontalak eta zeiharrak $x\\to\\pm\\infty$ doanean, alde bakoitzean.', 'Las verticales en los bordes del dominio; las horizontales y oblicuas cuando $x\\to\\pm\\infty$, a cada lado.', 'الرأسية عند حواف المجال؛ والأفقية والمائلة عندما $x\\to\\pm\\infty$ في كل جهة.', 'Vertical ones at the edges of the domain; horizontal and oblique ones as $x\\to\\pm\\infty$, on each side.')
                ],
                create: createSightRounds,
                stars: standardStars(SIGHT_ROUNDS),
                starsNote: stars,
                Round: SightPlay
            }}
        />
    )
}
