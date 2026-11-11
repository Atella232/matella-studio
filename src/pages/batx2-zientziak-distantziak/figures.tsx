import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Board3D } from '../batx2-zientziak-bektoreak/space/Board3D'
import { DEFAULT_VIEW, type View } from '../batx2-zientziak-bektoreak/space/camera'
import { SPACE, type SceneItem } from '../batx2-zientziak-bektoreak/space/scene'
import { arrow } from '../batx2-zientziak-bektoreak/space/sceneKit'
import { add, dot, scale, sub, type Vec3 } from '../batx2-zientziak-bektoreak/space/vec3'

/* ==========================================================================
   Angeluak eta distantziak · Batxilergoa 2 · Zientziak — the lesson
   figures, all on the 3D board of the Espacio block (a sideways swipe
   turns them). Each one draws the exercise of «Let's solve» of its
   lesson with the same numbers: the angle as an arc, the perpendicular
   dashed down to its foot, the mirror point, the distance as a segment.
   Names in the drawing are letters and numbers only, left to right in
   every language.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
/** Looking along a plane whose normal is horizontal at 45°: the perpendicular segments are seen at full length */
const SIDEWAYS: View = { azimuth: -25, elevation: 20 }

function SpaceFigure({ language, label, scene, range = 5, view = DEFAULT_VIEW }: { language: UnitLanguage; label: LocalizedText; scene: SceneItem[]; range?: number; view?: View }) {
    return <Board3D language={language} label={pickText(language, label)} scene={scene} range={range} height={300} rotate="swipe" initialView={view} />
}

/** A plane a·x + b·y + c·z = d, through its point closest to the origin */
const plane = (normal: Vec3, level: number, color: string = SPACE.planeBlue, opacity = 0.28): SceneItem => ({ kind: 'plane', point: scale(level / dot(normal, normal), normal), normal, color, opacity })
const dashed = (from: Vec3, to: Vec3, color: string = SPACE.red): SceneItem => ({ kind: 'segment', from, to, color, dashed: true, width: 2.4 })
const dot3 = (at: Vec3, label: string, color: string = SPACE.ink): SceneItem => ({ kind: 'point', at, label, color })

/* ---------- 1. Angles ---------- */

export function AngleLinesFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 0, 2]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('r eta s zuzenen norabideek 60 graduko angelua osatzen dute', 'Los directores de r y s forman un ángulo de 60 grados', 'اتجاها r وs يصنعان زاوية 60 درجة', 'The directions of r and s form an angle of 60 degrees')}
            scene={[
                { kind: 'line', point: [1, 0, 2], direction: [-1, -1, 0], color: SPACE.red, width: 3, label: 'r' },
                { kind: 'line', point: [0, 3, 1], direction: [-1, 0, -1], color: SPACE.blue, width: 3, label: 's' },
                arrow(a, add(a, [2, 2, 0]), SPACE.red, 'u'),
                arrow(a, add(a, [2, 0, 2]), SPACE.blue, 'v'),
                { kind: 'arc', at: a, u: [1, 1, 0], v: [1, 0, 1], radius: 1.1, color: SPACE.violet, label: '60°' },
                dot3(a, 'A')
            ]}
        />
    )
}

export function AngleLinePlaneFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [2, 3, 0]
    const u: Vec3 = [1, 0, 1]
    const shadow: Vec3 = sub(u, scale(0.5, [1, 1, 0]))
    return (
        <SpaceFigure
            language={language}
            range={5}
            view={SIDEWAYS}
            label={say('r zuzenak x + y = 5 planoarekin 30 graduko angelua osatzen du; normalarekin 60 gradukoa', 'La recta r forma 30 grados con el plano x + y = 5 y 60 con su normal', 'يصنع المستقيم r زاوية 30 درجة مع المستوى x + y = 5 و60 مع ناظمه', 'The line r forms 30 degrees with the plane x + y = 5 and 60 with its normal')}
            scene={[
                plane([1, 1, 0], 5, SPACE.planeGreen, 0.3),
                { kind: 'line', point: p, direction: scale(-1, u), color: SPACE.violet, width: 3, label: 'r' },
                arrow(p, add(p, scale(2, [1, 1, 0])), SPACE.mustard, 'n'),
                dashed(p, add(p, scale(2.4, shadow)), SPACE.muted),
                { kind: 'arc', at: p, u, v: shadow, radius: 1.3, color: SPACE.red, label: '30°' },
                dot3(p, 'P')
            ]}
        />
    )
}

export function AnglePlanesFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [0, 1, 1]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('x + y = 1 eta y + z = 2 planoak eta haien normalak, 60 graduko angeluarekin', 'Los planos x + y = 1 e y + z = 2 y sus normales, con un ángulo de 60 grados', 'المستويان x + y = 1 وy + z = 2 وناظماهما بزاوية 60 درجة', 'The planes x + y = 1 and y + z = 2 and their normals, with an angle of 60 degrees')}
            scene={[
                plane([1, 1, 0], 1, SPACE.planeBlue, 0.24),
                plane([0, 1, 1], 2, SPACE.planeMustard, 0.28),
                arrow(p, add(p, [1.6, 1.6, 0]), SPACE.blue, 'n₁'),
                arrow(p, add(p, [0, 1.6, 1.6]), SPACE.mustard, 'n₂'),
                { kind: 'arc', at: p, u: [1, 1, 0], v: [0, 1, 1], radius: 1, color: SPACE.violet, label: '60°' },
                dot3(p, '')
            ]}
        />
    )
}

/* ---------- 2. Projections ---------- */

export function ProjectPointPlaneFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [3, 1, 4]
    const m: Vec3 = [1, -1, 2]
    return (
        <SpaceFigure
            language={language}
            range={5}
            view={{ azimuth: -45, elevation: 10 }}
            label={say('P(3, 1, 4) puntutik x + y + z = 2 planora perpendikularra, M(1, −1, 2) oinarekin', 'La perpendicular de P(3, 1, 4) al plano x + y + z = 2, con el pie M(1, −1, 2)', 'العمودي من P(3, 1, 4) إلى المستوى x + y + z = 2 ومسقطه M(1, −1, 2)', 'The perpendicular from P(3, 1, 4) to the plane x + y + z = 2, with the foot M(1, −1, 2)')}
            scene={[
                plane([1, 1, 1], 2, SPACE.planeGreen, 0.3),
                dashed(p, m),
                { kind: 'right-angle', at: m, u: [1, 1, 1], v: [1, -1, 0], size: 0.45 },
                dot3(p, 'P', SPACE.red),
                dot3(m, 'M', SPACE.blue)
            ]}
        />
    )
}

export function ProjectPointLineFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [2, 3, 1]
    const m: Vec3 = [3, 2, 0]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('P(2, 3, 1) puntua, r zuzena eta M(3, 2, 0) oina; x + y = 5 plano perpendikularra', 'El punto P(2, 3, 1), la recta r y el pie M(3, 2, 0); el plano perpendicular x + y = 5', 'النقطة P(2, 3, 1) والمستقيم r والمسقط M(3, 2, 0)؛ والمستوى العمودي x + y = 5', 'The point P(2, 3, 1), the line r and the foot M(3, 2, 0); the perpendicular plane x + y = 5')}
            scene={[
                plane([1, 1, 0], 5, SPACE.planeMustard, 0.16),
                { kind: 'line', point: [1, 0, 0], direction: [-1, -1, 0], color: SPACE.violet, width: 3, label: 'r' },
                dashed(p, m),
                { kind: 'right-angle', at: m, u: [1, 1, 0], v: sub(p, m), size: 0.4 },
                dot3(p, 'P', SPACE.red),
                dot3(m, 'M', SPACE.blue)
            ]}
        />
    )
}

export function ProjectLinePlaneFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 0, 3]
    const b: Vec3 = [2, 1, 2]
    return (
        <SpaceFigure
            language={language}
            range={4}
            view={{ azimuth: -45, elevation: 20 }}
            label={say('r zuzena eta haren proiekzioa lurrean: A eta B puntuak proiektatzen dira', 'La recta r y su proyección en el suelo: se proyectan los puntos A y B', 'المستقيم r ومسقطه على الأرض: نُسقط النقطتين A وB', 'The line r and its projection on the floor: the points A and B are projected')}
            scene={[
                { kind: 'line', point: a, direction: [-1, -1, 1], color: SPACE.violet, width: 3, label: 'r' },
                { kind: 'line', point: [1, 0, 0], direction: [-1, -1, 0], color: SPACE.blue, width: 3, dashed: true, label: "r'" },
                dashed(a, [1, 0, 0], SPACE.muted),
                dashed(b, [2, 1, 0], SPACE.muted),
                dot3(a, 'A'),
                dot3(b, 'B'),
                dot3([1, 0, 0], "A'", SPACE.blue),
                dot3([2, 1, 0], "B'", SPACE.blue)
            ]}
        />
    )
}

/* ---------- 3. Symmetric points ---------- */

export function SymmetricPlaneFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [4, 3, -1]
    const m: Vec3 = [1, 0, -1]
    const q: Vec3 = [-2, -3, -1]
    return (
        <SpaceFigure
            language={language}
            range={5}
            view={SIDEWAYS}
            label={say("P(4, 3, −1) puntua, x + y = 1 planoa ispilu gisa, M(1, 0, −1) oina eta P'(−2, −3, −1) simetrikoa", "El punto P(4, 3, −1), el plano x + y = 1 como espejo, el pie M(1, 0, −1) y el simétrico P'(−2, −3, −1)", "النقطة P(4, 3, −1) والمستوى x + y = 1 مرآةً والمسقط M(1, 0, −1) والنظيرة P'(−2, −3, −1)", "The point P(4, 3, −1), the plane x + y = 1 as a mirror, the foot M(1, 0, −1) and the symmetric P'(−2, −3, −1)")}
            scene={[
                plane([1, 1, 0], 1, SPACE.planeBlue, 0.3),
                dashed(p, q),
                dot3(p, 'P', SPACE.red),
                dot3(m, 'M', SPACE.ink),
                dot3(q, "P'", SPACE.green)
            ]}
        />
    )
}

export function SymmetricLineFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [4, 1, 0]
    const m: Vec3 = [2, 1, 2]
    const q: Vec3 = [0, 1, 4]
    return (
        <SpaceFigure
            language={language}
            range={5}
            label={say("P(4, 1, 0) puntua, r zuzena, M(2, 1, 2) oina eta P'(0, 1, 4) simetrikoa", "El punto P(4, 1, 0), la recta r, el pie M(2, 1, 2) y el simétrico P'(0, 1, 4)", "النقطة P(4, 1, 0) والمستقيم r والمسقط M(2, 1, 2) والنظيرة P'(0, 1, 4)", "The point P(4, 1, 0), the line r, the foot M(2, 1, 2) and the symmetric P'(0, 1, 4)")}
            scene={[
                { kind: 'line', point: [0, 1, 0], direction: [-1, 0, -1], color: SPACE.violet, width: 3, label: 'r' },
                dashed(p, q),
                dot3(p, 'P', SPACE.red),
                dot3(m, 'M', SPACE.ink),
                dot3(q, "P'", SPACE.green)
            ]}
        />
    )
}

export function MediatorPlaneFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 2, 3]
    const b: Vec3 = [3, 0, 1]
    return (
        <SpaceFigure
            language={language}
            range={4}
            view={{ azimuth: 75, elevation: 20 }}
            label={say('A(1, 2, 3) eta B(3, 0, 1) puntuen plano erdikaria, M(2, 1, 2) erdiko puntutik', 'El plano mediador de A(1, 2, 3) y B(3, 0, 1), por el punto medio M(2, 1, 2)', 'المستوى المنصِّف لـ A(1, 2, 3) وB(3, 0, 1) عبر المنتصف M(2, 1, 2)', 'The mediator plane of A(1, 2, 3) and B(3, 0, 1), through the midpoint M(2, 1, 2)')}
            scene={[
                plane([1, -1, -1], -1, SPACE.planeGreen, 0.3),
                { kind: 'segment', from: a, to: b, color: SPACE.red, width: 3 },
                dot3(a, 'A', SPACE.red),
                dot3(b, 'B', SPACE.red),
                dot3([2, 1, 2], 'M', SPACE.ink)
            ]}
        />
    )
}

/* ---------- 4. Distance from a point ---------- */

export function PointPlaneFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [3, 3, 1]
    const m: Vec3 = [1, 1, 0]
    return (
        <SpaceFigure
            language={language}
            range={4}
            view={SIDEWAYS}
            label={say('P(3, 3, 1) puntutik 2x + 2y + z = 4 planorako distantzia: 3', 'La distancia de P(3, 3, 1) al plano 2x + 2y + z = 4: 3', 'المسافة من P(3, 3, 1) إلى المستوى 2x + 2y + z = 4: ‏3', 'The distance from P(3, 3, 1) to the plane 2x + 2y + z = 4: 3')}
            scene={[
                plane([2, 2, 1], 4, SPACE.planeBlue, 0.3),
                { kind: 'segment', from: p, to: m, color: SPACE.red, width: 3.2 },
                { kind: 'label', at: scale(0.5, add(p, m)), text: 'd = 3', color: SPACE.red, dx: 18, dy: -14 },
                dot3(p, 'P', SPACE.red),
                dot3(m, 'M', SPACE.ink)
            ]}
        />
    )
}

export function ParallelPlanesFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [3, 0, 0]
    const b: Vec3 = [11 / 3, 4 / 3, -4 / 3]
    return (
        <SpaceFigure
            language={language}
            range={5}
            label={say('x + 2y − 2z = 3 eta x + 2y − 2z = 9 plano paraleloak, 2 distantziara', 'Los planos paralelos x + 2y − 2z = 3 y x + 2y − 2z = 9, a distancia 2', 'المستويان المتوازيان x + 2y − 2z = 3 وx + 2y − 2z = 9 على بعد 2', 'The parallel planes x + 2y − 2z = 3 and x + 2y − 2z = 9, at distance 2')}
            scene={[
                plane([1, 2, -2], 3, SPACE.planeBlue, 0.24),
                plane([1, 2, -2], 9, SPACE.planeMustard, 0.28),
                { kind: 'segment', from: a, to: b, color: SPACE.red, width: 3.2 },
                { kind: 'label', at: scale(0.5, add(a, b)), text: 'd = 2', color: SPACE.red, dx: 10 },
                dot3(a, ''),
                dot3(b, '')
            ]}
        />
    )
}

export function PointLineFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [2, 3, 4]
    const m: Vec3 = [2, 0, 0]
    return (
        <SpaceFigure
            language={language}
            range={5}
            view={{ azimuth: -70, elevation: 15 }}
            label={say('P(2, 3, 4) puntutik x ardatzerako distantzia: 5', 'La distancia de P(2, 3, 4) al eje x: 5', 'المسافة من P(2, 3, 4) إلى المحور x: ‏5', 'The distance from P(2, 3, 4) to the x axis: 5')}
            scene={[
                { kind: 'line', point: [0, 0, 0], direction: [-1, 0, 0], color: SPACE.violet, width: 3, label: 'r' },
                { kind: 'polygon', points: [[0, 0, 0], [1, 0, 0], [3, 3, 4], [2, 3, 4]], color: SPACE.planeMustard, opacity: 0.4, stroke: SPACE.mustard },
                { kind: 'segment', from: p, to: m, color: SPACE.red, width: 3.2 },
                { kind: 'label', at: scale(0.5, add(p, m)), text: 'd = 5', color: SPACE.red, dx: 10 },
                dot3(p, 'P', SPACE.red),
                dot3([0, 0, 0], 'A')
            ]}
        />
    )
}

/* ---------- 5. Distance between lines ---------- */

export function ParallelLinesFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={5}
            label={say('z ardatza eta (3, 4, 1) puntutik pasatzen den zuzen paraleloa, 5 distantziara', 'El eje z y la recta paralela por (3, 4, 1), a distancia 5', 'المحور z والمستقيم الموازي المار بـ (3, 4, 1) على بعد 5', 'The z axis and the parallel line through (3, 4, 1), at distance 5')}
            scene={[
                { kind: 'line', point: [0, 0, 0], direction: [0, 0, -1], color: SPACE.red, width: 3, label: 'r' },
                { kind: 'line', point: [3, 4, 1], direction: [0, 0, -2], color: SPACE.blue, width: 3, label: 's' },
                { kind: 'segment', from: [0, 0, 1], to: [3, 4, 1], color: SPACE.violet, width: 3.2 },
                { kind: 'label', at: [1.5, 2, 1], text: 'd = 5', color: SPACE.violet, dy: -10 },
                dot3([3, 4, 1], 'B')
            ]}
        />
    )
}

export function SkewDistanceFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('x ardatza eta (0, 1, 2) puntutik y ardatzaren paraleloa den zuzena: AB, u eta v bektoreen kutxa, 2 altuerakoa', 'El eje x y la recta paralela al eje y por (0, 1, 2): la caja de AB, u y v, de altura 2', 'المحور x والمستقيم الموازي للمحور y المار بـ (0, 1, 2): صندوق AB وu وv بارتفاع 2', 'The x axis and the line parallel to the y axis through (0, 1, 2): the box of AB, u and v, of height 2')}
            scene={[
                { kind: 'line', point: [0, 0, 0], direction: [-1, 0, 0], color: SPACE.red, width: 3, label: 'r' },
                { kind: 'line', point: [0, 1, 2], direction: [0, -1, 0], color: SPACE.blue, width: 3, label: 's' },
                { kind: 'box', origin: [0, 0, 0], edges: [[1, 0, 0], [0, 1, 0], [0, 1, 2]], color: SPACE.planeGreen, opacity: 0.18 },
                arrow([0, 0, 0], [0, 1, 2], SPACE.violet, 'AB'),
                dot3([0, 0, 0], 'A'),
                dot3([0, 1, 2], 'B')
            ]}
        />
    )
}

export function CommonPerpendicularFigure({ language }: { language: UnitLanguage }) {
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('Gurutzatzen diren r eta s zuzenen perpendikular komuna: P(0, 0, 0) eta Q(0, 0, 2) puntuak', 'La perpendicular común de las rectas r y s que se cruzan: los puntos P(0, 0, 0) y Q(0, 0, 2)', 'العمودي المشترك للمستقيمين المتخالفين r وs: النقطتان P(0, 0, 0) وQ(0, 0, 2)', 'The common perpendicular of the skew lines r and s: the points P(0, 0, 0) and Q(0, 0, 2)')}
            scene={[
                { kind: 'line', point: [0, 0, 0], direction: [-1, 0, 0], color: SPACE.red, width: 3, label: 'r' },
                { kind: 'line', point: [0, 1, 2], direction: [0, -1, 0], color: SPACE.blue, width: 3, label: 's' },
                { kind: 'segment', from: [0, 0, 0], to: [0, 0, 2], color: SPACE.violet, width: 3.4 },
                { kind: 'right-angle', at: [0, 0, 0], u: [1, 0, 0], v: [0, 0, 1], size: 0.35 },
                { kind: 'right-angle', at: [0, 0, 2], u: [0, 1, 0], v: [0, 0, -1], size: 0.35 },
                dot3([0, 0, 0], 'P', SPACE.violet),
                dot3([0, 0, 2], 'Q', SPACE.violet)
            ]}
        />
    )
}

/** The cover: an angle, a foot and a mirror, and the distance to a plane */
export function AnglesDistancesHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 22) rotate(-4)">
                    <rect width={260} height={230} rx={16} fill="#fffcf6" stroke="#1d2733" strokeWidth={2} />
                    <polygon points="30,180 150,210 230,130 110,100" fill="#8fb3ef" fillOpacity={0.45} stroke="#2f6fdb" strokeWidth={2} />
                    <line x1={130} y1={40} x2={130} y2={155} stroke="#c4432a" strokeWidth={4} strokeDasharray="10 6" />
                    <circle cx={130} cy={40} r={8} fill="#c4432a" />
                    <circle cx={130} cy={155} r={7} fill="#1d2733" />
                    <text x={146} y={46} fontSize={22} fontWeight={700} fill="#c4432a" fontFamily="Fraunces, serif">P</text>
                    <text x={146} y={150} fontSize={22} fontWeight={700} fill="#1d2733" fontFamily="Fraunces, serif">M</text>
                </g>
                <g transform="translate(300 52) rotate(5)">
                    <rect width={196} height={176} rx={16} fill="#fbebc0" stroke="#1d2733" strokeWidth={2} />
                    <line x1={30} y1={150} x2={170} y2={150} stroke="#2f6fdb" strokeWidth={4} />
                    <line x1={30} y1={150} x2={150} y2={40} stroke="#c4432a" strokeWidth={4} />
                    <path d="M 90 150 A 60 60 0 0 0 74 110" fill="none" stroke="#6b4fb8" strokeWidth={3} />
                    <text x={100} y={128} fontSize={22} fontWeight={700} fill="#6b4fb8" fontFamily="Fraunces, serif">α</text>
                </g>
                <g transform="translate(40 282) rotate(2)">
                    <rect width={440} height={86} rx={16} fill="#d9efe2" stroke="#1d2733" strokeWidth={2} />
                    <text x={220} y={56} textAnchor="middle" fontSize={26} fontWeight={700} fill="#1d2733" fontFamily="Fraunces, serif">d = |Ax₀ + By₀ + Cz₀ + D| / |n|</text>
                </g>
            </svg>
        </div>
    )
}
