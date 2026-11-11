import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Board3D } from '../batx2-zientziak-bektoreak/space/Board3D'
import { DEFAULT_VIEW, type View } from '../batx2-zientziak-bektoreak/space/camera'
import { SPACE, type SceneItem } from '../batx2-zientziak-bektoreak/space/scene'
import { arrow, triangle } from '../batx2-zientziak-bektoreak/space/sceneKit'
import { add, scale, type Vec3 } from '../batx2-zientziak-bektoreak/space/vec3'

/* ==========================================================================
   Zuzenak eta planoak espazioan · Batxilergoa 2 · Zientziak — the lesson
   figures, all on the 3D board of the Espacio block (a sideways swipe
   turns them). Each one draws the exercise of «Let's solve» of its
   lesson with the same numbers. Names in the drawing are letters and
   numbers only, left to right in every language.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function SpaceFigure({ language, label, scene, range = 5, view = DEFAULT_VIEW }: { language: UnitLanguage; label: LocalizedText; scene: SceneItem[]; range?: number; view?: View }) {
    return <Board3D language={language} label={pickText(language, label)} scene={scene} range={range} height={300} rotate="swipe" initialView={view} />
}

/** The plane with normal (−1, 1, 2) is seen edge-on from the usual corner: these turn towards it */
const FACING_GREEN_PLANE: View = { azimuth: 62, elevation: 30 }

/** A plane a·x + b·y + c·z = d, drawn through one of its points */
const plane = (normal: Vec3, level: number, color: string = SPACE.planeBlue, opacity = 0.3, label?: string): SceneItem => {
    const [a, b, c] = normal
    const point: Vec3 = c !== 0 ? [0, 0, level / c] : b !== 0 ? [0, level / b, 0] : [level / a, 0, 0]
    return { kind: 'plane', point, normal, color, opacity, label }
}

/* ---------- 1. Equations of a line ---------- */

export function LineParametricFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, -2, 3]
    const u: Vec3 = [2, 1, -1]
    return (
        <SpaceFigure
            language={language}
            label={say('A(1, −2, 3) puntutik u = (2, 1, −1) norabidearekin pasatzen den zuzena, eta t = 2 puntua', 'La recta por A(1, −2, 3) con dirección u = (2, 1, −1), y el punto de t = 2', 'المستقيم المار بـ A(1, −2, 3) باتجاه u = (2, 1, −1)، والنقطة عند t = 2', 'The line through A(1, −2, 3) with direction u = (2, 1, −1), and the point for t = 2')}
            scene={[
                // Drawn backwards so that the name r goes to the top end, away from the point of t = 2
                { kind: 'line', point: a, direction: scale(-1, u), color: SPACE.violet, label: 'r' },
                arrow(a, add(a, u), SPACE.red, 'u'),
                { kind: 'point', at: a, label: 'A', color: SPACE.ink, drop: 'floor' },
                { kind: 'point', at: [5, 0, 1], label: 't = 2', color: SPACE.blue }
            ]}
        />
    )
}

export function LineContinuousFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            label={say('Zuzena, 2x + 3y − 4 = 0 eta y + 2z + 2 = 0 planoen ebaki gisa', 'La recta como corte de los planos 2x + 3y − 4 = 0 e y + 2z + 2 = 0', 'المستقيم تقاطعًا للمستويين 2x + 3y − 4 = 0 وy + 2z + 2 = 0', 'The line as the meeting of the planes 2x + 3y − 4 = 0 and y + 2z + 2 = 0')}
            scene={[
                plane([2, 3, 0], 4, SPACE.planeBlue, 0.26),
                plane([0, 1, 2], -2, SPACE.planeMustard, 0.3),
                { kind: 'line', point: [2, 0, -1], direction: [3, -2, 1], color: SPACE.violet, width: 3.2, label: 'r' },
                { kind: 'point', at: [2, 0, -1], label: 'A', color: SPACE.ink }
            ]}
        />
    )
}

export function ImplicitFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [1, 0, 0]
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('x + y − z = 1 eta 2x − y + z = 2 planoak, haien normalak eta ebakia', 'Los planos x + y − z = 1 y 2x − y + z = 2, sus normales y su corte', 'المستويان x + y − z = 1 و2x − y + z = 2 وناظماهما وتقاطعهما', 'The planes x + y − z = 1 and 2x − y + z = 2, their normals and the line where they meet')}
            scene={[
                plane([1, 1, -1], 1, SPACE.planeBlue, 0.24),
                plane([2, -1, 1], 2, SPACE.planeMustard, 0.28),
                { kind: 'line', point: p, direction: [0, 1, 1], color: SPACE.violet, width: 3.2, label: 'r' },
                arrow(p, add(p, [1, 1, -1]), SPACE.blue, 'n₁'),
                arrow(p, add(p, scale(0.7, [2, -1, 1])), SPACE.mustard, 'n₂'),
                { kind: 'point', at: p, color: SPACE.ink }
            ]}
        />
    )
}

/* ---------- 2. Equations of a plane ---------- */

export function PlaneParametricFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 0, 2]
    return (
        <SpaceFigure
            language={language}
            range={4}
            view={FACING_GREEN_PLANE}
            label={say('A(1, 0, 2) puntutik u eta v norabideekin pasatzen den planoa', 'El plano por A(1, 0, 2) con direcciones u y v', 'المستوى المار بـ A(1, 0, 2) باتجاهي u وv', 'The plane through A(1, 0, 2) with directions u and v')}
            scene={[
                { kind: 'plane', point: a, normal: [-1, 1, 2], color: SPACE.planeGreen, opacity: 0.3 },
                arrow(a, add(a, [1, 1, 0]), SPACE.red, 'u'),
                arrow(a, add(a, [0, 2, -1]), SPACE.blue, 'v'),
                { kind: 'point', at: a, label: 'A', color: SPACE.ink },
                { kind: 'point', at: [2, -1, 3], color: SPACE.violet, label: '(2, −1, 3)' }
            ]}
        />
    )
}

export function PlaneGeneralFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 0, 2]
    return (
        <SpaceFigure
            language={language}
            range={4}
            view={FACING_GREEN_PLANE}
            label={say('Planoa eta haren n = (−1, 1, 2) normala, u eta v bektoreekiko perpendikularra', 'El plano y su normal n = (−1, 1, 2), perpendicular a u y a v', 'المستوى وناظمه n = (−1, 1, 2) العمودي على u وv', 'The plane and its normal n = (−1, 1, 2), perpendicular to u and v')}
            scene={[
                { kind: 'plane', point: a, normal: [-1, 1, 2], color: SPACE.planeGreen, opacity: 0.3 },
                arrow(a, add(a, [1, 1, 0]), SPACE.red, 'u'),
                arrow(a, add(a, [0, 2, -1]), SPACE.blue, 'v'),
                { kind: 'right-angle', at: a, u: [1, 1, 0], v: [-1, 1, 2], size: 0.4 },
                arrow(a, add(a, [-1, 1, 2]), SPACE.violet, 'n'),
                { kind: 'point', at: a, label: 'A', color: SPACE.ink }
            ]}
        />
    )
}

export function ThreePointsFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 0, 0]
    const b: Vec3 = [0, 2, 0]
    const c: Vec3 = [0, 0, 3]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('A, B eta C puntuetatik pasatzen den 6x + 3y + 2z = 6 planoa', 'El plano 6x + 3y + 2z = 6 por A, B y C', 'المستوى 6x + 3y + 2z = 6 المار بـ A وB وC', 'The plane 6x + 3y + 2z = 6 through A, B and C')}
            scene={[
                { kind: 'plane', point: a, normal: [6, 3, 2], color: SPACE.planeBlue, opacity: 0.22 },
                triangle(a, b, c, SPACE.planeRed, 0.45),
                arrow(a, b, SPACE.red, ''),
                arrow(a, c, SPACE.green, ''),
                { kind: 'point', at: a, label: 'A' },
                { kind: 'point', at: b, label: 'B' },
                { kind: 'point', at: c, label: 'C' }
            ]}
        />
    )
}

/* ---------- 3. Two lines ---------- */

export function ParallelLinesFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={6}
            label={say('r eta s zuzen bera dira: (3, −1, 5) puntua r zuzenean dago', 'r y s son la misma recta: (3, −1, 5) está en r', 'r وs المستقيم نفسه: (3, −1, 5) تقع على r', 'r and s are the same line: (3, −1, 5) is on r')}
            scene={[
                // Drawn backwards so that the name goes to the low end, away from B
                { kind: 'line', point: [1, 0, 2], direction: [-2, 1, -3], color: SPACE.violet, width: 4, label: 'r = s' },
                arrow([1, 0, 2], [3, -1, 5], SPACE.red, 'u'),
                { kind: 'point', at: [1, 0, 2], label: 'A', color: SPACE.ink },
                { kind: 'point', at: [3, -1, 5], label: 'B', color: SPACE.blue }
            ]}
        />
    )
}

export function CrossingLinesFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('Gurutzatzen diren r eta s zuzenak: ez dute plano komunik', 'Las rectas r y s se cruzan: no comparten plano', 'المستقيمان r وs متخالفان: لا يجمعهما مستوى', 'The lines r and s are skew: they share no plane')}
            scene={[
                { kind: 'line', point: [1, 0, 0], direction: [1, 1, 0], color: SPACE.red, width: 3, label: 'r' },
                { kind: 'line', point: [0, 1, 1], direction: [0, 1, 1], color: SPACE.blue, width: 3, label: 's' },
                { kind: 'segment', from: [1, 0, 0], to: [0, 1, 1], color: SPACE.ink, dashed: true, width: 1.6 },
                { kind: 'point', at: [1, 0, 0], label: 'A', color: SPACE.red, drop: 'floor' },
                { kind: 'point', at: [0, 1, 1], label: 'B', color: SPACE.blue, drop: 'floor' }
            ]}
        />
    )
}

export function MeetingLinesFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={4}
            view={{ azimuth: 70, elevation: 22 }}
            label={say('r eta s zuzenak (2, 2, 1) puntuan ebakitzen dira', 'Las rectas r y s se cortan en (2, 2, 1)', 'المستقيمان r وs يتقاطعان في (2, 2, 1)', 'The lines r and s meet at (2, 2, 1)')}
            scene={[
                // Seen from the side of the y axis (s runs almost towards the eye from the usual corner), and drawn backwards so their names stay away from the meeting point
                { kind: 'line', point: [1, 2, 0], direction: [-1, 0, -1], color: SPACE.red, width: 3, label: 'r' },
                { kind: 'line', point: [0, 1, 1], direction: [-2, -1, 0], color: SPACE.blue, width: 3, label: 's' },
                { kind: 'point', at: [2, 2, 1], label: '(2, 2, 1)', color: SPACE.ink, drop: 'box' }
            ]}
        />
    )
}

/* ---------- 4. A line and a plane ---------- */

export function LineInPlaneFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('r zuzena x + y + 3z = 4 planoan dago', 'La recta r está en el plano x + y + 3z = 4', 'المستقيم r في المستوى x + y + 3z = 4', 'The line r lies in the plane x + y + 3z = 4')}
            scene={[
                plane([1, 1, 3], 4, SPACE.planeGreen, 0.3),
                { kind: 'line', point: [1, 0, 1], direction: [1, 2, -1], color: SPACE.violet, width: 3.2, label: 'r' },
                arrow([1, 0, 1], [2, 1, 4], SPACE.mustard, 'n'),
                arrow([1, 0, 1], [2, 2, 0], SPACE.red, 'u'),
                { kind: 'point', at: [1, 0, 1], color: SPACE.ink }
            ]}
        />
    )
}

export function LinePlanePointFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={7}
            label={say('r zuzenak x + 2y + z = 9 planoa (3, 0, 6) puntuan zeharkatzen du', 'La recta r atraviesa el plano x + 2y + z = 9 en (3, 0, 6)', 'يخترق المستقيم r المستوى x + 2y + z = 9 في (3, 0, 6)', 'The line r goes through the plane x + 2y + z = 9 at (3, 0, 6)')}
            scene={[
                plane([1, 2, 1], 9, SPACE.planeBlue, 0.28),
                // Drawn backwards so that the name r goes to the low end, away from the meeting point
                { kind: 'line', point: [1, 2, 0], direction: [-1, 1, -3], color: SPACE.violet, width: 3.2, label: 'r' },
                { kind: 'point', at: [3, 0, 6], label: '(3, 0, 6)', color: SPACE.red }
            ]}
        />
    )
}

export function PencilFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('r zuzena duten plano-sortako hiru plano, eta P puntutik pasatzen dena', 'Tres planos del haz de la recta r, y el que pasa por P', 'ثلاثة مستويات من حزمة المستقيم r، والمار منها بـ P', 'Three planes of the pencil of the line r, and the one through P')}
            scene={[
                plane([1, -1, 0], 1, SPACE.planeBlue, 0.18),
                plane([0, 1, 1], 2, SPACE.planeMustard, 0.18),
                plane([1, -2, -1], -1, SPACE.planeGreen, 0.34),
                // Drawn backwards so that the name r goes to the top end, away from P
                { kind: 'line', point: [3, 2, 0], direction: [-1, -1, 1], color: SPACE.violet, width: 3.4, label: 'r' },
                { kind: 'point', at: [1, 1, 0], label: 'P', color: SPACE.red }
            ]}
        />
    )
}

/* ---------- 5. Position of planes ---------- */

export function ParallelPlanesFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('Bi plano paralelo, normal berarekin', 'Dos planos paralelos, con el mismo normal', 'مستويان متوازيان بالناظم نفسه', 'Two parallel planes, with the same normal')}
            scene={[
                plane([2, -1, 3], 1, SPACE.planeBlue, 0.3),
                plane([2, -1, 3], -2.5, SPACE.planeRed, 0.3),
                arrow([0, 0, 1 / 3], [2, -1, 1 / 3 + 3], SPACE.violet, 'n')
            ]}
        />
    )
}

export function ThreePlanesFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('Hiru plano (1, 1, 1) puntuan ebakitzen dira', 'Tres planos se cortan en el punto (1, 1, 1)', 'ثلاثة مستويات تتقاطع في النقطة (1, 1, 1)', 'Three planes meet at the point (1, 1, 1)')}
            scene={[
                plane([1, 1, 1], 3, SPACE.planeBlue, 0.22),
                plane([1, -1, 0], 0, SPACE.planeMustard, 0.24),
                plane([1, 0, 1], 2, SPACE.planeGreen, 0.24),
                { kind: 'point', at: [1, 1, 1], label: '(1, 1, 1)', color: SPACE.red }
            ]}
        />
    )
}

export function ParameterPlanesFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('a = 1 denean, hirugarren planoa lehena da: planoek zuzen batean ebakitzen dute elkar', 'Con a = 1 el tercer plano es el primero: los planos se cortan en una recta', 'عندما a = 1 يكون المستوى الثالث هو الأول: تتقاطع المستويات في مستقيم', 'With a = 1 the third plane is the first one: the planes meet in a line')}
            scene={[
                plane([1, 1, 1], 1, SPACE.planeBlue, 0.26),
                plane([1, 2, 1], 2, SPACE.planeMustard, 0.26),
                { kind: 'line', point: [0, 1, 0], direction: [1, 0, -1], color: SPACE.violet, width: 3.4, label: 'r' }
            ]}
        />
    )
}

/* ---------- The hero art of the unit page ---------- */

export function LinesPlanesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 22) rotate(-4)">
                    <rect width={260} height={230} rx={16} fill="#fffcf6" stroke="#1d2733" strokeWidth={2} />
                    <polygon points="30,170 150,200 230,120 110,90" fill="#8fb3ef" fillOpacity={0.45} stroke="#2f6fdb" strokeWidth={2} />
                    <polygon points="70,40 190,60 170,200 50,180" fill="#f3d683" fillOpacity={0.4} stroke="#b98a12" strokeWidth={2} />
                    <line x1={60} y1={130} x2={200} y2={150} stroke="#6b4fb8" strokeWidth={5} strokeLinecap="round" />
                </g>
                <g transform="translate(300 52) rotate(5)">
                    <rect width={196} height={176} rx={16} fill="#fbebc0" stroke="#1d2733" strokeWidth={2} />
                    <line x1={30} y1={140} x2={170} y2={40} stroke="#c4432a" strokeWidth={4} />
                    <line x1={40} y1={50} x2={160} y2={150} stroke="#2f6fdb" strokeWidth={4} strokeDasharray="10 6" />
                </g>
                <g transform="translate(40 282) rotate(2)">
                    <rect width={440} height={86} rx={16} fill="#d9efe2" stroke="#1d2733" strokeWidth={2} />
                    <text x={220} y={56} textAnchor="middle" fontSize={28} fontWeight={700} fill="#1d2733" fontFamily="Fraunces, serif">Ax + By + Cz + D = 0</text>
                </g>
            </svg>
        </div>
    )
}
