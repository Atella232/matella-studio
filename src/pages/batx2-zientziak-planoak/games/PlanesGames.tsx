import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { Board3D } from '../../batx2-zientziak-bektoreak/space/Board3D'
import { SPACE, type SceneItem } from '../../batx2-zientziak-bektoreak/space/scene'
import { dot, scale, type Vec3 } from '../../batx2-zientziak-bektoreak/space/vec3'
import { CLASSIFY_ROUNDS, createClassifyRounds, POSITIONS, type ClassifyRound, type PairType, type Position } from './classify'
import { boxedLatex, createMissingRounds, MISSING_ROUNDS, type MissingRound } from './missingPlane'
import { createTwinRounds, TWIN_LETTERS, TWIN_ROUNDS, type TwinKind, type TwinRound } from './twins'
import './PlanesGames.css'

/* ==========================================================================
   The three round games of Zuzenak eta planoak espazioan (Batxilergoa 2 ·
   Zientziak): twin lines in space (which equation is the same line),
   classify the pair (two planes, a line and a plane, two lines; drawn on
   the 3D board after answering) and the missing plane (the number behind
   the box; the plane is drawn after answering). Logic in twins.ts,
   classify.ts and missingPlane.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** Fractions at full size, for the equations of lines (MathText spoils a \displaystyle before a bracket) */
const big = (latex: string, language: UnitLanguage) => formula(latex.replace(/\\frac/g, '\\dfrac'), language)
const STARS_NOTE =say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
/** A plane a·x + b·y + c·z = d for the board, through its point closest to the origin */
const planeItem = (normal: Vec3, level: number, color: string, opacity = 0.3): SceneItem => ({ kind: 'plane', point: scale(level / dot(normal, normal), normal), normal, color, opacity })

/* ---------- Twin lines in space ---------- */

const TWIN_REASONS: Record<Exclude<TwinKind, 'right'>, LocalizedText> = {
    sign: say('Puntuaren zeinuak aldatuta daude: zuzen hori $-A$ puntutik pasatzen da.', 'Los signos del punto están cambiados: esa recta pasa por $-A$.', 'إشارات النقطة معكوسة: هذا المستقيم يمر بـ $-A$.', 'The signs of the point are changed: that line goes through $-A$.'),
    swap: say('Puntua eta norabidea trukatuta daude.', 'El punto y el director están cambiados.', 'النقطة ومتجه التوجيه مبدَّلان.', 'The point and the direction are swapped.'),
    'point-off': say('Norabide bera, baina puntua ez dago zuzenean: zuzen paralelo bat da.', 'El mismo director, pero el punto no está en la recta: es una paralela.', 'الاتجاه نفسه لكن النقطة ليست على المستقيم: إنه موازٍ.', 'The same direction, but the point is not on the line: it is a parallel line.'),
    'direction-off': say('Zuzeneko puntu batetik pasatzen da, baina beste norabide batekin.', 'Pasa por un punto de la recta, pero con otro director.', 'يمر بنقطة من المستقيم لكن باتجاه آخر.', 'It goes through a point of the line, but with another direction.'),
    'same-plane': say('Bi planoak bat datoz: hori plano bat da, ez zuzen bat.', 'Los dos planos son el mismo: eso es un plano, no una recta.', 'المستويان منطبقان: هذا مستوى لا مستقيم.', 'The two planes are the same: that is a plane, not a line.')
}

function TwinsPlay({ round, language, onAnswer, answered }: RoundProps<TwinRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const pickedKind = picked === null ? null : round.options[picked].kind
    return (
        <>
            <div className="dbh4-big-formula planes-games-big" dir="ltr">{big(round.given, language)}</div>
            <p className="prop3-prompt">{l(say('Zein da zuzen bera?', '¿Cuál es la misma recta?', 'أيها المستقيم نفسه؟', 'Which one is the same line?'))}</p>
            <div className="prop3-options planes-games-equations" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={option.latex} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        <strong>{TWIN_LETTERS[index]}</strong>
                        <span>{big(option.latex, language)}</span>
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {pickedKind && pickedKind !== 'right' && <MathText text={l(TWIN_REASONS[pickedKind])} />}
                    <span className="dbh4-worked planes-games-worked">{formula(round.working, language)}</span>
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
                rounds: TWIN_ROUNDS,
                rules: [
                    say('Lau ekuazioetatik bakarra da zuzen bera.', 'De las cuatro ecuaciones, solo una es la misma recta.', 'من المعادلات الأربع واحدة فقط هي المستقيم نفسه.', 'Of the four equations, only one is the same line.'),
                    say('Zuzen bera da norabidea paraleloa bada eta puntu bat zuzenean badago.', 'Es la misma recta si el director es paralelo y un punto está en la recta.', 'هو المستقيم نفسه إذا كان الاتجاه موازيًا ونقطة منه على المستقيم.', 'It is the same line if the direction is parallel and a point lies on the line.'),
                    say('Inplizituetan: bi planoek zuzena dute eta ez dira bat bera.', 'En las implícitas: los dos planos contienen la recta y no son el mismo.', 'في الديكارتية: المستويان يحويان المستقيم وليسا المستوى نفسه.', 'In the implicit ones: both planes hold the line and are not the same plane.')
                ],
                create: createTwinRounds,
                stars: standardStars(TWIN_ROUNDS),
                starsNote: STARS_NOTE,
                Round: TwinsPlay
            }}
        />
    )
}

/* ---------- Classify the pair ---------- */

const POSITION_LABELS: Record<PairType, Partial<Record<Position, LocalizedText>>> = {
    planes: {
        secant: say('Ebakitzaileak', 'Secantes', 'متقاطعان', 'Secant'),
        parallel: say('Paraleloak', 'Paralelos', 'متوازيان', 'Parallel'),
        same: say('Bat datoz', 'Coincidentes', 'منطبقان', 'The same')
    },
    'line-plane': {
        through: say('Zeharkatzen du', 'Lo corta', 'يقطعه', 'Through it'),
        parallel: say('Paraleloa', 'Paralela', 'موازٍ', 'Parallel'),
        inside: say('Barruan dago', 'Contenida', 'محتوى', 'Inside')
    },
    lines: {
        meet: say('Ebakitzen dira', 'Se cortan', 'متقاطعان', 'They meet'),
        skew: say('Gurutzatzen dira', 'Se cruzan', 'متخالفان', 'Skew'),
        parallel: say('Paraleloak', 'Paralelas', 'متوازيان', 'Parallel'),
        same: say('Bat datoz', 'Coinciden', 'منطبقان', 'The same')
    }
}

const PAIR_COLORS = [SPACE.red, SPACE.blue]
const PLANE_COLORS = [SPACE.planeBlue, SPACE.planeMustard]

function ClassifyPlay({ round, language, onAnswer, answered }: RoundProps<ClassifyRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<Position | null>(null)
    const choose = (position: Position) => {
        if (answered) return
        setPicked(position)
        onAnswer(position === round.answer)
    }
    const names = round.type === 'planes' ? ['\\pi_1', '\\pi_2'] : round.type === 'line-plane' ? ['r', '\\pi'] : ['r', 's']
    const scene: SceneItem[] = [
        ...round.planes.map((plane, index) => planeItem(plane.normal, plane.level, PLANE_COLORS[index], 0.3)),
        ...round.lines.map((item, index): SceneItem => ({ kind: 'line', point: item.point, direction: item.direction, color: round.type === 'line-plane' ? SPACE.violet : PAIR_COLORS[index], width: 3, label: round.type === 'lines' ? ['r', 's'][index] : 'r' }))
    ]
    return (
        <>
            <div className="planes-games-pair" dir="ltr">
                <span>{big(`${names[0]}\\colon ${round.first}`, language)}</span>
                <span>{big(`${names[1]}\\colon ${round.second}`, language)}</span>
            </div>
            <p className="prop3-prompt">{l(say('Nola daude?', '¿Cómo están?', 'ما وضعهما؟', 'How are they?'))}</p>
            <div className="prop3-options planes-games-positions">
                {POSITIONS[round.type].map((position) => (
                    <button key={position} type="button" disabled={answered} className={!answered ? '' : position === round.answer ? 'right' : position === picked ? 'wrong' : ''} onClick={() => choose(position)}>{l(POSITION_LABELS[round.type][position]!)}</button>
                ))}
            </div>
            {answered && (
                <>
                    <RoundVerdict right={picked === round.answer} language={language}>
                        <span className="dbh4-worked planes-games-worked">{formula(round.working, language)}</span>
                    </RoundVerdict>
                    <Board3D key={`${round.first}${round.second}`} scene={scene} language={language} range={5} height={280} label={l(say('Bikotea taulan', 'La pareja en el tablero', 'الزوج على اللوحة', 'The pair on the board'))} />
                </>
            )}
        </>
    )
}

export function ClassifyGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CLASSIFY_ROUNDS,
                rules: [
                    say('Bi planoetan, konparatu normalak eta gero gai askeak.', 'En dos planos, compara los normales y después los términos independientes.', 'في مستويين قارن الناظمين ثم الحدود الثابتة.', 'For two planes, compare the normals and then the constant terms.'),
                    say('Zuzena eta planoa: $\\vec{u}\\cdot\\vec{n}$, eta 0 bada, $A$ puntua.', 'Recta y plano: $\\vec{u}\\cdot\\vec{n}$ y, si es 0, el punto $A$.', 'مستقيم ومستوى: $\\vec{u}\\cdot\\vec{n}$، وإن كان 0 فالنقطة $A$.', 'Line and plane: $\\vec{u}\\cdot\\vec{n}$ and, if it is 0, the point $A$.'),
                    say('Bi zuzen: norabideak, eta paraleloak ez badira, biderkadura mistoa.', 'Dos rectas: los directores y, si no son paralelos, el producto mixto.', 'مستقيمان: الاتجاهان، وإن لم يتوازيا فالجداء المختلط.', 'Two lines: the directions and, if they are not parallel, the scalar triple product.')
                ],
                create: createClassifyRounds,
                stars: standardStars(CLASSIFY_ROUNDS),
                starsNote: STARS_NOTE,
                Round: ClassifyPlay
            }}
        />
    )
}

/* ---------- The missing plane ---------- */

function MissingPlay({ round, language, onAnswer, answered }: RoundProps<MissingRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (option: number) => {
        if (answered) return
        setPicked(option)
        onAnswer(option === round.answer)
    }
    const scene: SceneItem[] = [
        ...(round.plane ? [planeItem(round.plane.normal, round.plane.level, SPACE.planeBlue, 0.16)] : []),
        planeItem(round.normal, round.level, SPACE.planeMustard, 0.34),
        ...(round.line ? [{ kind: 'line' as const, point: round.line.point, direction: round.line.direction, color: SPACE.violet, width: 3, label: 'r' }] : []),
        ...round.points.map((item): SceneItem => ({ kind: 'point', at: item.at, label: item.label, color: SPACE.red }))
    ]
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.prompt)} /></p>
            <div className="dbh4-big-formula planes-games-big" dir="ltr">{formula(boxedLatex(round.normal, round.level, round.place), language)}</div>
            <div className="prop3-options planes-games-numbers" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={!answered ? '' : option === round.answer ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}>{formula(`\\square=${option}`, language)}</button>
                ))}
            </div>
            {answered && (
                <>
                    <RoundVerdict right={picked === round.answer} language={language}>
                        <span className="dbh4-worked planes-games-worked">{formula(round.working, language)}</span>
                    </RoundVerdict>
                    <Board3D key={l(round.prompt)} scene={scene} language={language} range={5} height={280} label={l(say('Planoa eta datuak taulan', 'El plano y los datos en el tablero', 'المستوى والمعطيات على اللوحة', 'The plane and the data on the board'))} />
                </>
            )}
        </>
    )
}

export function MissingGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: MISSING_ROUNDS,
                rules: [
                    say('Planoaren ekuazioari zenbaki bat falta zaio: normalaren koefiziente bat edo $d$.', 'A la ecuación del plano le falta un número: un coeficiente del normal o la $d$.', 'ينقص معادلةَ المستوى عدد: معامل من الناظم أو $d$.', 'The equation of the plane is missing a number: a coefficient of the normal or $d$.'),
                    say('Lehenik normala; gero $d=\\vec{n}\\cdot P$, planoaren puntu batekin.', 'Primero el normal; después $d=\\vec{n}\\cdot P$ con un punto del plano.', 'أولًا الناظم، ثم $d=\\vec{n}\\cdot P$ بنقطة من المستوى.', 'First the normal; then $d=\\vec{n}\\cdot P$ with a point of the plane.'),
                    say('Erantzutean, planoa taulan ikusiko duzu.', 'Al responder, verás el plano en el tablero.', 'عند الإجابة سترى المستوى على اللوحة.', 'When you answer, you will see the plane on the board.')
                ],
                create: createMissingRounds,
                stars: standardStars(MISSING_ROUNDS),
                starsNote: STARS_NOTE,
                Round: MissingPlay
            }}
        />
    )
}
