import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Board3D } from './space/Board3D'
import { cuboid, SPACE, type SceneItem } from './space/scene'
import { arrow, boxBetween, parallelogram, planeOf, triangle } from './space/sceneKit'
import { add, cross, scale, type Vec3 } from './space/vec3'

/* ==========================================================================
   Espazioko bektoreak · Batxilergoa 2 · Zientziak — the lesson figures,
   all on the 3D board of the block (space/Board3D.tsx): a sideways swipe
   turns them, so the page still scrolls. Each one draws the exercise of
   «Let's solve» of its lesson with the same numbers. Names in the
   drawing are letters and numbers only (left to right in every
   language); what they mean is in the lesson text.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

function SpaceFigure({ language, label, scene, range = 5, height = 300 }: { language: UnitLanguage; label: LocalizedText; scene: SceneItem[]; range?: number; height?: number }) {
    return <Board3D language={language} label={pickText(language, label)} scene={scene} range={range} height={height} rotate="swipe" />
}

/* ---------- 1. Points and vectors in space ---------- */

export function SpacePointFigure({ language }: { language: UnitLanguage }) {
    const p: Vec3 = [3, -2, 4]
    return (
        <SpaceFigure
            language={language}
            label={say('P(3, −2, 4) puntua, haren kutxa eta XY planoko proiekzioa', 'El punto P(3, −2, 4), su caja y su proyección sobre el plano XY', 'النقطة P(3, −2, 4) وصندوقها ومسقطها على المستوى XY', 'The point P(3, −2, 4), its box and its projection onto the plane XY')}
            scene={[
                ...cuboid(p),
                { kind: 'point', at: [3, -2, 0], color: SPACE.blue, hollow: true },
                { kind: 'label', at: [3, -2, 0], text: '(3, −2, 0)', color: SPACE.blue, dx: -48, dy: 5, size: 14 },
                { kind: 'point', at: [0, 0, 4], color: SPACE.green, hollow: true },
                { kind: 'label', at: [0, 0, 4], text: '(0, 0, 4)', color: SPACE.green, dx: 40, dy: 5, size: 14 },
                { kind: 'point', at: p, label: 'P', color: SPACE.red }
            ]}
        />
    )
}

export function SpaceVectorFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, -2, 0]
    const b: Vec3 = [3, 1, 6]
    return (
        <SpaceFigure
            language={language}
            range={6}
            label={say('A puntutik B puntura doan bektorea eta 2, 3 eta 6 aldeko kutxa', 'El vector de A a B y la caja de lados 2, 3 y 6', 'المتجه من A إلى B والصندوق الذي أضلاعه 2 و3 و6', 'The vector from A to B and the box with sides 2, 3 and 6')}
            scene={[
                ...boxBetween(a, b),
                { kind: 'segment', from: a, to: [3, 1, 0], color: SPACE.mustard, width: 2.2 },
                arrow(a, b, SPACE.blue, 'AB'),
                { kind: 'point', at: a, label: 'A', color: SPACE.ink },
                { kind: 'point', at: b, label: 'B', color: SPACE.ink }
            ]}
        />
    )
}

export function MidpointFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [0, -2, 3]
    const b: Vec3 = [2, 2, 1]
    const m: Vec3 = [1, 0, 2]
    const p: Vec3 = [3, 1, 0]
    const q: Vec3 = [-1, -1, 4]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('AB zuzenkiaren M erdiko puntua, eta P eta haren simetrikoa M puntuarekiko', 'El punto medio M del segmento AB, y P y su simétrico respecto de M', 'المنتصف M للقطعة AB، والنقطة P ونظيرتها بالنسبة إلى M', 'The midpoint M of the segment AB, and P and its symmetric point with respect to M')}
            scene={[
                { kind: 'segment', from: a, to: b, color: SPACE.blue, width: 2.6 },
                { kind: 'segment', from: p, to: q, color: SPACE.red, width: 2, dashed: true },
                { kind: 'point', at: a, label: 'A', color: SPACE.blue },
                { kind: 'point', at: b, label: 'B', color: SPACE.blue },
                { kind: 'point', at: p, label: 'P', color: SPACE.red, drop: 'floor' },
                { kind: 'point', at: q, label: 'P′', color: SPACE.red },
                { kind: 'point', at: m, label: 'M', color: SPACE.ink }
            ]}
        />
    )
}

/* ---------- 2. Linear dependence and bases ---------- */

export function CombinationFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [-1, 0, 2]
    const v: Vec3 = [0, 1, -1]
    const twoU = scale(2, u)
    const w = add(twoU, scale(3, v))
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('u eta v bektoreen planoa, eta w = 2u + 3v plano horretan', 'El plano de u y v, y w = 2u + 3v en ese plano', 'مستوى u وv، وw = 2u + 3v في هذا المستوى', 'The plane of u and v, and w = 2u + 3v in that plane')}
            scene={[
                planeOf([0, 0, 0], u, v),
                arrow([0, 0, 0], twoU, SPACE.red, '2u', true),
                arrow(twoU, w, SPACE.green, '3v', true),
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.green, 'v'),
                arrow([0, 0, 0], w, SPACE.blue, 'w')
            ]}
        />
    )
}

export function DependenceFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [1, 2, -1]
    const v: Vec3 = [2, 1, 0]
    const w: Vec3 = [1, -1, 1]
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('k = 1 denean, u, v eta w plano berean daude', 'Con k = 1, u, v y w están en un mismo plano', 'عندما k = 1 تقع u وv وw في مستوى واحد', 'With k = 1, u, v and w lie in one plane')}
            scene={[
                planeOf([0, 0, 0], u, v, SPACE.planeViolet, 0.34),
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.green, 'v'),
                arrow([0, 0, 0], w, SPACE.blue, 'w')
            ]}
        />
    )
}

export function BasisFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [1, 1, 0]
    const v: Vec3 = [0, 1, 1]
    const w: Vec3 = [1, 0, 1]
    const first = scale(2, u)
    const second = add(first, scale(3, v))
    const target = add(second, w)
    return (
        <SpaceFigure
            language={language}
            label={say('(3, 5, 4) puntura bidea: 2u, gero 3v eta gero w', 'El camino a (3, 5, 4): 2u, después 3v y después w', 'الطريق إلى (3, 5, 4): ‏2u ثم 3v ثم w', 'The path to (3, 5, 4): 2u, then 3v, then w')}
            scene={[
                arrow([0, 0, 0], first, SPACE.red, '2u', true),
                arrow(first, second, SPACE.green, '3v', true),
                arrow(second, target, SPACE.violet, 'w', true),
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.green, 'v'),
                arrow([0, 0, 0], w, SPACE.violet, 'w'),
                { kind: 'point', at: target, color: SPACE.blue, drop: 'box' },
                { kind: 'label', at: target, text: '(3, 5, 4)', color: SPACE.blue, dx: 4, dy: -14, size: 14 }
            ]}
        />
    )
}

/* ---------- 3. The dot product in space ---------- */

export function DotFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [2, -1, 3]
    const v: Vec3 = [1, 4, 2]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('u eta v bektoreak eta haien angelu zorrotza', 'Los vectores u y v y su ángulo agudo', 'المتجهان u وv وزاويتهما الحادة', 'The vectors u and v and their acute angle')}
            scene={[
                { kind: 'arc', at: [0, 0, 0], u, v, radius: 1.2, color: SPACE.mustard, label: 'α' },
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.blue, 'v')
            ]}
        />
    )
}

export function AngleFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [3, 3, 0]
    const v: Vec3 = [0, 3, 3]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('(1, 1, 0) eta (0, 1, 1) norabideek 60 graduko angelua osatzen dute', 'Las direcciones (1, 1, 0) y (0, 1, 1) forman un ángulo de 60 grados', 'الاتجاهان (1, 1, 0) و(0, 1, 1) يصنعان زاوية 60 درجة', 'The directions (1, 1, 0) and (0, 1, 1) make an angle of 60 degrees')}
            scene={[
                { kind: 'polygon', points: [[0, 0, 0], u, v], color: SPACE.planeMustard, opacity: 0.35 },
                { kind: 'arc', at: [0, 0, 0], u, v, radius: 1.5, color: SPACE.mustard, label: '60°' },
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.blue, 'v')
            ]}
        />
    )
}

export function ProjectionFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [1, 2, 2]
    const v: Vec3 = [4, 1, 6]
    const shadow: Vec3 = [2, 4, 4]
    return (
        <SpaceFigure
            language={language}
            range={6}
            label={say('v bektorearen itzala u bektorearen zuzenean: (2, 4, 4) bektorea', 'La sombra de v sobre la recta de u: el vector (2, 4, 4)', 'ظل v على مستقيم u: المتجه (2, 4, 4)', 'The shadow of v on the line of u: the vector (2, 4, 4)')}
            scene={[
                { kind: 'line', point: [0, 0, 0], direction: u, color: SPACE.muted, width: 1.4 },
                { kind: 'segment', from: v, to: shadow, color: SPACE.ink, dashed: true, width: 1.6 },
                { kind: 'right-angle', at: shadow, u: scale(-1, u), v: [2, -3, 2], size: 0.55 },
                { kind: 'vector', to: shadow, color: SPACE.green, width: 6, label: '' },
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.blue, 'v')
            ]}
        />
    )
}

/* ---------- 4. The cross product ---------- */

export function CrossFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [2, 0, -1]
    const v: Vec3 = [-1, 2, 0]
    const n = cross(u, v)
    return (
        <SpaceFigure
            language={language}
            label={say('u × v bektorea, u eta v bektoreen paralelogramoarekiko perpendikularra', 'El vector u × v, perpendicular al paralelogramo de u y v', 'المتجه u × v العمودي على متوازي أضلاع u وv', 'The vector u × v, perpendicular to the parallelogram of u and v')}
            scene={[
                parallelogram([0, 0, 0], u, v),
                { kind: 'right-angle', at: [0, 0, 0], u, v: n, size: 0.5 },
                { kind: 'right-angle', at: [0, 0, 0], u: v, v: n, size: 0.5 },
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.blue, 'v'),
                arrow([0, 0, 0], n, SPACE.green, 'u × v')
            ]}
        />
    )
}

export function CrossOrderFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [1, 0, 1]
    const v: Vec3 = [0, 2, 1]
    const n = cross(u, v)
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('u × v eta v × u: luzera bera, aurkako noranzkoa', 'u × v y v × u: la misma longitud, sentidos opuestos', 'u × v وv × u: الطول نفسه ومنحيان متعاكسان', 'u × v and v × u: the same length, opposite senses')}
            scene={[
                parallelogram([0, 0, 0], u, v, SPACE.planeBlue, 0.38),
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.blue, 'v'),
                arrow([0, 0, 0], n, SPACE.green, 'u × v'),
                arrow([0, 0, 0], scale(-1, n), SPACE.violet, 'v × u')
            ]}
        />
    )
}

export function TriangleAreaFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 1, 0]
    const b: Vec3 = [2, 1, 2]
    const c: Vec3 = [3, -1, 0]
    const d = add(b, [2, -2, 0])
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('ABC triangelua, AB eta AC aldeen paralelogramoaren erdia', 'El triángulo ABC, la mitad del paralelogramo de lados AB y AC', 'المثلث ABC، نصف متوازي الأضلاع الذي ضلعاه AB وAC', 'The triangle ABC, half of the parallelogram with sides AB and AC')}
            scene={[
                { kind: 'segment', from: b, to: d, color: SPACE.red, dashed: true, width: 1.6 },
                { kind: 'segment', from: c, to: d, color: SPACE.red, dashed: true, width: 1.6 },
                triangle(a, b, c),
                arrow(a, b, SPACE.blue, 'AB'),
                arrow(a, c, SPACE.green, 'AC'),
                { kind: 'point', at: a, label: 'A' },
                { kind: 'point', at: b, label: 'B' },
                { kind: 'point', at: c, label: 'C' }
            ]}
        />
    )
}

/* ---------- 5. The mixed product ---------- */

export function MixedBoxFigure({ language }: { language: UnitLanguage }) {
    const u: Vec3 = [1, 2, 0]
    const v: Vec3 = [0, 1, 3]
    const w: Vec3 = [2, 0, 1]
    return (
        <SpaceFigure
            language={language}
            range={4}
            label={say('u, v eta w bektoreen kutxa: haren bolumena 13 da', 'La caja de u, v y w: su volumen es 13', 'صندوق u وv وw: حجمه 13', 'The box of u, v and w: its volume is 13')}
            scene={[
                { kind: 'box', origin: [0, 0, 0], edges: [u, v, w] },
                arrow([0, 0, 0], u, SPACE.red, 'u'),
                arrow([0, 0, 0], v, SPACE.blue, 'v'),
                arrow([0, 0, 0], w, SPACE.violet, 'w')
            ]}
        />
    )
}

export function TetraFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 0, 0]
    const b: Vec3 = [3, 1, 0]
    const c: Vec3 = [1, 2, 1]
    const d: Vec3 = [3, 1, 3]
    return (
        <SpaceFigure
            language={language}
            label={say('ABCD tetraedroa, ertz bereko paralelepipedoaren barruan', 'El tetraedro ABCD, dentro del paralelepípedo de las mismas aristas', 'رباعي الأوجه ABCD داخل متوازي السطوح ذي الأحرف نفسها', 'The tetrahedron ABCD, inside the parallelepiped with the same edges')}
            scene={[
                { kind: 'box', origin: a, edges: [[2, 1, 0], [0, 2, 1], [2, 1, 3]], color: SPACE.planeGreen, opacity: 0.06, stroke: SPACE.muted },
                triangle(a, b, c, SPACE.planeRed, 0.3),
                triangle(a, b, d, SPACE.planeRed, 0.3),
                triangle(a, c, d, SPACE.planeRed, 0.3),
                triangle(b, c, d, SPACE.planeRed, 0.3),
                { kind: 'point', at: a, label: 'A' },
                { kind: 'point', at: b, label: 'B' },
                { kind: 'point', at: c, label: 'C' },
                { kind: 'point', at: d, label: 'D' }
            ]}
        />
    )
}

export function CoplanarFigure({ language }: { language: UnitLanguage }) {
    const a: Vec3 = [1, 0, 1]
    const b: Vec3 = [2, 1, 0]
    const c: Vec3 = [0, 2, 1]
    const d: Vec3 = [-1, 1, 2]
    return (
        <SpaceFigure
            language={language}
            range={3}
            label={say('k = −1 denean, A, B, C eta D plano berean daude', 'Con k = −1, A, B, C y D están en un mismo plano', 'عندما k = −1 تقع A وB وC وD في مستوى واحد', 'With k = −1, A, B, C and D lie in one plane')}
            scene={[
                planeOf(a, [1, 1, -1], [-1, 2, 0], SPACE.planeGreen, 0.34),
                arrow(a, b, SPACE.red, ''),
                arrow(a, c, SPACE.blue, ''),
                arrow(a, d, SPACE.violet, ''),
                { kind: 'point', at: a, label: 'A' },
                { kind: 'point', at: b, label: 'B' },
                { kind: 'point', at: c, label: 'C' },
                { kind: 'point', at: d, label: 'D' }
            ]}
        />
    )
}

/* ---------- The hero art of the unit page ---------- */

export function SpaceVectorsHeroArt() {
    const PAPER = '#fffcf6'
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(24 22) rotate(-4)">
                    <rect width={260} height={230} rx={16} fill={PAPER} stroke="#1d2733" strokeWidth={2} />
                    <g stroke="#3d4652" strokeWidth={2.4} strokeLinecap="round">
                        <line x1={130} y1={150} x2={130} y2={30} />
                        <line x1={130} y1={150} x2={235} y2={180} />
                        <line x1={130} y1={150} x2={45} y2={205} />
                    </g>
                    <polygon points="130,150 205,130 160,85 85,105" fill="#f0a493" fillOpacity={0.55} stroke="#c4432a" strokeWidth={2} />
                    <line x1={130} y1={150} x2={205} y2={130} stroke="#c4432a" strokeWidth={4} strokeLinecap="round" />
                    <line x1={130} y1={150} x2={85} y2={105} stroke="#2f6fdb" strokeWidth={4} strokeLinecap="round" />
                    <line x1={130} y1={150} x2={118} y2={48} stroke="#267b53" strokeWidth={5} strokeLinecap="round" />
                    <polygon points="116,34 108,54 126,52" fill="#267b53" />
                </g>
                <g transform="translate(300 52) rotate(5)">
                    <rect width={196} height={176} rx={16} fill="#fbebc0" stroke="#1d2733" strokeWidth={2} />
                    <polygon points="40,130 120,130 156,96 76,96" fill="#9fd3b4" fillOpacity={0.6} stroke="#267b53" strokeWidth={2} />
                    <polygon points="40,130 40,60 76,26 76,96" fill="#9fd3b4" fillOpacity={0.35} stroke="#267b53" strokeWidth={2} />
                    <polygon points="40,60 120,60 156,26 76,26" fill="#9fd3b4" fillOpacity={0.5} stroke="#267b53" strokeWidth={2} />
                    <line x1={120} y1={130} x2={120} y2={60} stroke="#267b53" strokeWidth={2} />
                    <line x1={156} y1={96} x2={156} y2={26} stroke="#267b53" strokeWidth={2} />
                </g>
                <g transform="translate(40 282) rotate(2)">
                    <rect width={440} height={86} rx={16} fill="#d9efe2" stroke="#1d2733" strokeWidth={2} />
                    <text x={220} y={56} textAnchor="middle" fontSize={28} fontWeight={700} fill="#1d2733" fontFamily="Fraunces, serif">u × v ⟂ u, v</text>
                </g>
            </svg>
        </div>
    )
}
