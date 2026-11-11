import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx2-zientziak-planoak/games/PlanesGames.css'
import { Board3D } from '../../batx2-zientziak-bektoreak/space/Board3D'
import { SPACE, type SceneItem } from '../../batx2-zientziak-bektoreak/space/scene'
import { dot, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3'
import { say, vec } from './common'
import { createMirrorRounds, MIRROR_RANGE, MIRROR_ROUNDS, type MirrorKind, type MirrorRound } from './mirror'
import { createNearerRounds, NEARER_ANSWERS, NEARER_RANGE, NEARER_ROUNDS, type NearObject, type Nearer, type NearerRound } from './nearer'
import { createSineRounds, FORMULA_LATEX, FORMULA_OF, FORMULAS, SINE_ROUNDS, type AngleFormula, type SineRound } from './sine'
import './DistancesGames.css'

/* ==========================================================================
   The three round games of Angeluak eta distantziak (Batxilergoa 2 ·
   Zientziak): sine or cosine (the formula, then the angle), the mirror
   (four numbered points on the board, one is the symmetric point) and
   who is nearer (two distances from P; the perpendiculars are drawn
   after answering). Logic in sine.ts, mirror.ts and nearer.ts.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** Fractions at full size (MathText spoils a \displaystyle before a bracket) */
const big = (latex: string, language: UnitLanguage) => formula(latex.replace(/\\frac/g, '\\dfrac'), language)
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
/** A plane n·X + D = 0 for the board, through its point closest to the origin */
const planeItem = (normal: Vec3, D: number, color: string, opacity = 0.3): SceneItem => ({ kind: 'plane', point: scale(-D / dot(normal, normal), normal), normal, color, opacity })
const stateClass = (answered: boolean, right: boolean, picked: boolean) => (!answered ? '' : right ? 'right' : picked ? 'wrong' : '')

/* ---------- Sine or cosine? ---------- */

function SinePlay({ round, language, onAnswer, answered }: RoundProps<SineRound>) {
    const l = useGameText(language)
    const [formulaPicked, setFormulaPicked] = useState<AngleFormula | null>(null)
    const [anglePicked, setAnglePicked] = useState<number | null>(null)
    const rightFormula = FORMULA_OF[round.type]
    const chooseAngle = (angle: number) => {
        if (answered || formulaPicked === null) return
        setAnglePicked(angle)
        onAnswer(formulaPicked === rightFormula && angle === round.angle)
    }
    return (
        <>
            <div className="planes-games-pair" dir="ltr">
                <span>{formula(round.first, language)}</span>
                <span>{formula(round.second, language)}</span>
            </div>
            <p className="prop3-prompt">{l(say('1. Zein formula?', '1. ¿Qué fórmula?', '1. أي صيغة؟', '1. Which formula?'))}</p>
            <div className="prop3-options distances-games-formulas" dir="ltr">
                {FORMULAS.map((item) => (
                    <button key={item} type="button" disabled={formulaPicked !== null} className={stateClass(formulaPicked !== null, item === rightFormula, item === formulaPicked)} onClick={() => setFormulaPicked(item)}>
                        <span>{big(FORMULA_LATEX[item], language)}</span>
                    </button>
                ))}
            </div>
            {formulaPicked !== null && (
                <>
                    <p className="prop3-prompt">{l(say('2. Zein da angelua?', '2. ¿Cuál es el ángulo?', '2. ما الزاوية؟', '2. What is the angle?'))}</p>
                    <div className="prop3-options planes-games-numbers" dir="ltr">
                        {round.options.map((angle) => (
                            <button key={angle} type="button" disabled={answered} className={stateClass(answered, angle === round.angle, angle === anglePicked)} onClick={() => chooseAngle(angle)}>{formula(`${angle}^\\circ`, language)}</button>
                        ))}
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={formulaPicked === rightFormula && anglePicked === round.angle} language={language}>
                    {formulaPicked !== rightFormula && <MathText text={l(round.type === 'line-plane'
                        ? say('Zuzena eta planoa: $\\vec{u}$ eta $\\vec{n}$ bektoreen angelua osagarria da, beraz sinua.', 'Recta y plano: el ángulo de $\\vec{u}$ y $\\vec{n}$ es el complementario, así que seno.', 'مستقيم ومستوى: زاوية $\\vec{u}$ و$\\vec{n}$ هي المتممة، إذن الجيب.', 'A line and a plane: the angle of $\\vec{u}$ and $\\vec{n}$ is the complement, so the sine.')
                        : round.type === 'lines'
                            ? say('Bi zuzen: norabideen kosinua.', 'Dos rectas: el coseno de los directores.', 'مستقيمان: جيب تمام متجهي التوجيه.', 'Two lines: the cosine of the directions.')
                            : say('Bi plano: normalen kosinua.', 'Dos planos: el coseno de los normales.', 'مستويان: جيب تمام الناظمين.', 'Two planes: the cosine of the normals.'))} />}
                    <span className="dbh4-worked planes-games-worked">{big(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function SineGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SINE_ROUNDS,
                rules: [
                    say('Lehenik aukeratu formula, gero angelua. Biak ondo behar dira.', 'Primero elige la fórmula y después el ángulo. Hacen falta las dos bien.', 'اختر الصيغة أولًا ثم الزاوية. يجب أن يكون الاثنان صحيحين.', 'First choose the formula, then the angle. Both have to be right.'),
                    say('Bi zuzen edo bi plano: kosinua. Zuzena eta planoa: sinua.', 'Dos rectas o dos planos: coseno. Recta y plano: seno.', 'مستقيمان أو مستويان: جيب التمام. مستقيم ومستوى: الجيب.', 'Two lines or two planes: cosine. A line and a plane: sine.'),
                    say('Balio absolutuarekin, angelua 0 eta 90 gradu artean dago.', 'Con el valor absoluto, el ángulo queda entre 0 y 90 grados.', 'بالقيمة المطلقة تكون الزاوية بين 0 و90 درجة.', 'With the absolute value, the angle stays between 0 and 90 degrees.')
                ],
                create: createSineRounds,
                stars: standardStars(SINE_ROUNDS),
                starsNote: STARS_NOTE,
                Round: SinePlay
            }}
        />
    )
}

/* ---------- The mirror ---------- */

const MIRROR_REASONS: Record<Exclude<MirrorKind, 'right'>, LocalizedText> = {
    foot: say('Hori $M$ oina da, ispiluaren gainean. Simetrikoa beste aldean dago: $P\'=2M-P$.', 'Ese es el pie $M$, sobre el espejo. El simétrico está al otro lado: $P\'=2M-P$.', 'هذا المسقط $M$ على المرآة. والنظيرة في الجهة الأخرى: $P\'=2M-P$.', 'That is the foot $M$, on the mirror. The symmetric point is on the other side: $P\'=2M-P$.'),
    difference: say('Hori $M-P$ bektorea da, puntu gisa marraztuta.', 'Ese es el vector $M-P$ dibujado como punto.', 'هذا المتجه $M-P$ مرسومًا كنقطة.', 'That is the vector $M-P$ drawn as a point.'),
    'wrong-way': say('Hori $P$ puntutik alderantziz joatea da: $t$ parametroaren zeinua aldatuta.', 'Eso es ir desde $P$ hacia el lado contrario: el signo de $t$ cambiado.', 'هذا ذهاب من $P$ في الاتجاه المعاكس: إشارة $t$ معكوسة.', 'That is going from $P$ the wrong way: the sign of $t$ changed.')
}

function MirrorPlay({ round, language, onAnswer, answered }: RoundProps<MirrorRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const right = round.options[round.answer].at
    const scene: SceneItem[] = [
        ...(round.plane ? [planeItem(round.plane.normal, round.plane.D, SPACE.planeBlue, 0.3)] : []),
        ...(round.line ? [{ kind: 'line' as const, point: round.line.point, direction: round.line.direction, color: SPACE.violet, width: 3, label: 'r' }] : []),
        { kind: 'point', at: round.p, label: 'P', color: SPACE.red },
        ...round.options.map((option, index): SceneItem => ({ kind: 'point', at: option.at, label: String(index + 1), color: answered && index === round.answer ? SPACE.green : SPACE.ink, hollow: !(answered && index === round.answer) })),
        ...(answered ? [{ kind: 'segment' as const, from: round.p, to: right, color: SPACE.green, dashed: true, width: 2 }, { kind: 'point' as const, at: round.foot, label: 'M', color: SPACE.mustard }] : [])
    ]
    const pickedKind = picked === null ? null : round.options[picked].kind
    return (
        <>
            <div className="planes-games-pair" dir="ltr">
                <span>{formula(`P=${vec(round.p)}`, language)}</span>
                <span>{formula(round.given, language)}</span>
            </div>
            <Board3D key={`${round.given}${round.p.join()}`} scene={scene} language={language} range={MIRROR_RANGE} height={280} label={l(say('Puntua, ispilua eta lau hautagaiak taulan', 'El punto, el espejo y los cuatro candidatos en el tablero', 'النقطة والمرآة والمرشحون الأربعة على اللوحة', 'The point, the mirror and the four candidates on the board'))} />
            <p className="prop3-prompt"><MathText text={l(say('Zein da $P\'$ simetrikoa?', '¿Cuál es el simétrico $P\'$?', 'ما النظيرة $P\'$؟', 'Which one is the symmetric point $P\'$?'))} /></p>
            <div className="prop3-options planes-games-numbers" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={option.at.join()} type="button" disabled={answered} className={stateClass(answered, index === round.answer, index === picked)} onClick={() => choose(index)}>
                        <strong>{index + 1}</strong> {formula(vec(option.at), language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {pickedKind && pickedKind !== 'right' && <MathText text={l(MIRROR_REASONS[pickedKind])} />}
                    {round.working.map((latex) => <span key={latex} className="dbh4-worked planes-games-worked">{big(latex, language)}</span>)}
                </RoundVerdict>
            )}
        </>
    )
}

export function MirrorGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: MIRROR_ROUNDS,
                rules: [
                    say('Taulan lau puntu daude: bakarra da $P$ puntuaren simetrikoa.', 'En el tablero hay cuatro puntos: solo uno es el simétrico de $P$.', 'على اللوحة أربع نقاط: واحدة فقط نظيرة $P$.', 'There are four points on the board: only one is the symmetric point of $P$.'),
                    say('Lehenik $M$ oina; gero $P\'=2M-P$.', 'Primero el pie $M$; después $P\'=2M-P$.', 'أولًا المسقط $M$، ثم $P\'=2M-P$.', 'First the foot $M$; then $P\'=2M-P$.'),
                    say('Biratu taula puntuak hobeto ikusteko.', 'Gira el tablero para ver mejor los puntos.', 'دوّر اللوحة لترى النقاط أفضل.', 'Turn the board to see the points better.')
                ],
                create: createMirrorRounds,
                stars: standardStars(MIRROR_ROUNDS),
                starsNote: STARS_NOTE,
                Round: MirrorPlay
            }}
        />
    )
}

/* ---------- Who is nearer? ---------- */

const NEAR_COLORS = [SPACE.blue, SPACE.red]
const NEAR_PLANES = [SPACE.planeBlue, SPACE.planeRed]

function objectItem(object: NearObject, index: number, name: string): SceneItem {
    if (object.kind === 'plane') return planeItem(object.plane.normal, object.plane.D, NEAR_PLANES[index], 0.26)
    return { kind: 'line', point: object.line.point, direction: object.line.direction, color: NEAR_COLORS[index], width: 3, label: name }
}

function NearerPlay({ round, language, onAnswer, answered }: RoundProps<NearerRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<Nearer | null>(null)
    const choose = (answer: Nearer) => {
        if (answered) return
        setPicked(answer)
        onAnswer(answer === round.answer)
    }
    const plain = round.names.map((name) => name.replace('\\pi', 'π').replace('_1', '₁').replace('_2', '₂'))
    const scene: SceneItem[] = [
        ...round.objects.map((object, index) => objectItem(object, index, plain[index])),
        { kind: 'point', at: round.p, label: 'P', color: SPACE.ink },
        ...round.feet.flatMap((foot, index): SceneItem[] => [{ kind: 'segment', from: round.p, to: foot, color: NEAR_COLORS[index], dashed: true, width: 2 }, { kind: 'point', at: foot, color: NEAR_COLORS[index] }])
    ]
    const labels: Record<Nearer, LocalizedText> = {
        first: say(`$${round.names[0]}$ hurbilago`, `Más cerca $${round.names[0]}$`, `$${round.names[0]}$ أقرب`, `$${round.names[0]}$ is nearer`),
        second: say(`$${round.names[1]}$ hurbilago`, `Más cerca $${round.names[1]}$`, `$${round.names[1]}$ أقرب`, `$${round.names[1]}$ is nearer`),
        same: say('Distantzia bera', 'A la misma distancia', 'المسافة نفسها', 'The same distance')
    }
    return (
        <>
            <div className="planes-games-pair" dir="ltr">
                <span>{formula(`P=${vec(round.p)}`, language)}</span>
                {round.latex.map((latex) => <span key={latex}>{formula(latex, language)}</span>)}
            </div>
            <p className="prop3-prompt"><MathText text={l(say('Nor dago $P$ puntutik hurbilago?', '¿Quién está más cerca de $P$?', 'من الأقرب إلى $P$؟', 'Which one is nearer to $P$?'))} /></p>
            <div className="prop3-options distances-games-nearer">
                {NEARER_ANSWERS.map((answer) => (
                    <button key={answer} type="button" disabled={answered} className={stateClass(answered, answer === round.answer, answer === picked)} onClick={() => choose(answer)}><MathText text={l(labels[answer])} inline /></button>
                ))}
            </div>
            {answered && (
                <>
                    <RoundVerdict right={picked === round.answer} language={language}>
                        {round.working.map((latex) => <span key={latex} className="dbh4-worked planes-games-worked">{big(latex, language)}</span>)}
                    </RoundVerdict>
                    <Board3D key={round.latex.join()} scene={scene} language={language} range={NEARER_RANGE} height={280} label={l(say('Perpendikularrak taulan', 'Las perpendiculares en el tablero', 'العموديان على اللوحة', 'The perpendiculars on the board'))} />
                </>
            )}
        </>
    )
}

export function NearerGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: NEARER_ROUNDS,
                rules: [
                    say('Kalkulatu $P$ puntutik bi objektuetarainoko distantziak eta aukeratu.', 'Calcula las dos distancias desde $P$ y elige.', 'احسب المسافتين من $P$ واختر.', 'Work out both distances from $P$ and choose.'),
                    say('Planora: $\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$. Zuzenera: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.', 'A un plano: $\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$. A una recta: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.', 'إلى مستوى: $\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$. إلى مستقيم: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.', 'To a plane: $\\frac{|\\vec{n}\\cdot P+D|}{|\\vec{n}|}$. To a line: $\\frac{|\\overrightarrow{AP}\\times\\vec{u}|}{|\\vec{u}|}$.'),
                    say('Erantzutean, perpendikularrak taulan ikusiko dituzu.', 'Al responder, verás las perpendiculares en el tablero.', 'عند الإجابة سترى العموديين على اللوحة.', 'When you answer, you will see the perpendiculars on the board.')
                ],
                create: createNearerRounds,
                stars: standardStars(NEARER_ROUNDS),
                starsNote: STARS_NOTE,
                Round: NearerPlay
            }}
        />
    )
}
