import type { ReactNode } from 'react'
import type { UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SERIF, STAGE, STAGE_TINT, useText, type Point } from '../batx1-zientziak-geometria/figureColors'
import { Caption, Dot, F, Fig, Frame, LineDraw, RightMark, Segment } from '../batx1-zientziak-geometria/figureKit'

/* ==========================================================================
   Leku geometrikoak eta konikak · Batxilergoa 1 · Zientziak — the lesson
   figures: each one shows the exercise of «Let's solve» already solved
   (the perpendicular bisector, the bisectors of two lines, two parallels at
   a distance, circles, an ellipse with its foci, a hyperbola with its
   asymptotes, a parabola with its focus and directrix) and the cuts of a
   cone. The plane, the frame and the formulas come from Geometria
   analitikoa; formulas sit in their own <text> (left to right in every
   language) and words go through <Label>.
   ========================================================================== */

/** A curve through points given in plane coordinates, clipped to the plane */
function Curve({ map, points, clip, color = STAGE, width = 3, dashed = false }: { map: PlaneMap; points: Point[]; clip?: string; color?: string; width?: number; dashed?: boolean }) {
    const d = points.map(([x, y], index) => `${index ? 'L' : 'M'}${map.x(x).toFixed(1)} ${map.y(y).toFixed(1)}`).join(' ')
    return <path d={d} clipPath={clip} fill="none" stroke={color} strokeWidth={width} strokeDasharray={dashed ? '8 6' : undefined} strokeLinejoin="round" strokeLinecap="round" />
}

/** n + 1 values from a to b */
const range = (a: number, b: number, n = 60) => Array.from({ length: n + 1 }, (_, i) => a + ((b - a) * i) / n)

/** An ellipse with centre (h, k) and semi-axes rx (horizontal) and ry (vertical) */
function Oval({ map, h = 0, k = 0, rx, ry, color = STAGE, fill = 'rgba(47, 111, 219, 0.07)' }: { map: PlaneMap; h?: number; k?: number; rx: number; ry: number; color?: string; fill?: string }) {
    return <ellipse cx={map.x(h)} cy={map.y(k)} rx={rx * map.cell} ry={ry * map.cell} fill={fill} stroke={color} strokeWidth={3} />
}

/** The two branches of x²/a² − y²/b² = 1, as far as t reaches (x = ±a·cosh t, y = b·sinh t) */
function Branches({ map, a, b, clip, reach = 2.4, color = STAGE }: { map: PlaneMap; a: number; b: number; clip: string; reach?: number; color?: string }) {
    const right = range(-reach, reach).map((t): Point => [a * Math.cosh(t), b * Math.sinh(t)])
    return (
        <g>
            <Curve map={map} points={right} clip={clip} color={color} />
            <Curve map={map} points={right.map(([x, y]): Point => [-x, y])} clip={clip} color={color} />
        </g>
    )
}

/** A dashed segment with a short name at its middle */
function Measure({ map, from, to, name, color = SECOND, dx = 6, dy = -6 }: { map: PlaneMap; from: Point; to: Point; name: string; color?: string; dx?: number; dy?: number }) {
    return (
        <g>
            <Segment map={map} from={from} to={to} color={color} width={2.6} />
            <F x={(map.x(from[0]) + map.x(to[0])) / 2 + dx} y={(map.y(from[1]) + map.y(to[1])) / 2 + dy} size={17} color={color}>{name}</F>
        </g>
    )
}

/** The column of formulas at the right of a plane */
function Notes({ x, rows }: { x: number; rows: Array<[number, ReactNode, string?]> }) {
    return <g>{rows.map(([y, text, color]) => <F key={y} x={x} y={y} size={19} color={color ?? INK}>{text}</F>)}</g>
}

/* ---------- 1. The perpendicular bisector as a locus ---------- */

export function LociBisectorFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 7, yMin: -3, yMax: 5 }
    return (
        <Fig height={266} label={t(say('A(1, −2) eta B(5, 4) puntuen erdibitzailea: 2x + 3y − 9 = 0 zuzena, M(3, 1) puntutik; haren X(0, 3) puntua √26 distantziara dago A eta B puntuetatik', 'La mediatriz de A(1, −2) y B(5, 4): la recta 2x + 3y − 9 = 0, por M(3, 1); su punto X(0, 3) está a √26 de A y de B', 'محور A(1, −2) وB(5, 4): المستقيم 2x + 3y − 9 = 0 المار بـ M(3, 1)؛ ونقطته X(0, 3) على بعد √26 من A ومن B', 'The perpendicular bisector of A(1, −2) and B(5, 4): the line 2x + 3y − 9 = 0, through M(3, 1); its point X(0, 3) is √26 from A and from B'))}>
            <Frame box={box} cell={26} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={2} b={3} c={-9} clip={clip} color={SECOND} />
                        <Segment map={map} from={[1, -2]} to={[5, 4]} color={STAGE} width={3.4} dashed={false} />
                        <Segment map={map} from={[0, 3]} to={[1, -2]} color={GREEN} width={2.4} />
                        <Segment map={map} from={[0, 3]} to={[5, 4]} color={GREEN} width={2.4} />
                        <RightMark map={map} corner={[3, 1]} a={[5, 4]} b={[0, 3]} />
                        <Dot map={map} at={[1, -2]} name="A" dx={10} dy={6} />
                        <Dot map={map} at={[5, 4]} name="B" dx={10} dy={4} />
                        <Dot map={map} at={[3, 1]} name="M" color={SECOND} dx={10} dy={18} />
                        <Dot map={map} at={[0, 3]} name="X" color={GREEN} dx={8} dy={-10} />
                    </g>
                )}
            </Frame>
            <Notes x={270} rows={[[50, 'd(P, A) = d(P, B)'], [96, '2x + 3y − 9 = 0', SECOND], [142, 'M = (3, 1)'], [188, 'XA = XB = √26', GREEN]]} />
            <Caption y={256}>{t(say('Erdibitzaileko puntu guztiak A eta B puntuetatik distantzia berera daude', 'Todos los puntos de la mediatriz están a la misma distancia de A y de B', 'كل نقاط المحور على المسافة نفسها من A ومن B', 'Every point of the perpendicular bisector is the same distance from A and from B'))}</Caption>
        </Fig>
    )
}

/* ---------- 2. The bisectors of two lines ---------- */

export function AngleBisectorsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 4, yMin: -3, yMax: 4 }
    return (
        <Fig height={240} label={t(say('r: 3x − 4y + 2 = 0 eta s: 4x + 3y − 1 = 0 zuzenak eta haien erdikariak, x + 7y − 3 = 0 eta 7x − y + 1 = 0; Q(3, 0) puntua 11/5 distantziara dago bietatik', 'Las rectas r: 3x − 4y + 2 = 0 y s: 4x + 3y − 1 = 0 y sus bisectrices x + 7y − 3 = 0 y 7x − y + 1 = 0; el punto Q(3, 0) está a 11/5 de las dos', 'المستقيمان r: 3x − 4y + 2 = 0 وs: 4x + 3y − 1 = 0 ومنصّفاهما x + 7y − 3 = 0 و7x − y + 1 = 0؛ والنقطة Q(3, 0) على بعد 11/5 من كليهما', 'The lines r: 3x − 4y + 2 = 0 and s: 4x + 3y − 1 = 0 and their bisectors x + 7y − 3 = 0 and 7x − y + 1 = 0; the point Q(3, 0) is 11/5 from both'))}>
            <Frame box={box} cell={26} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={3} b={-4} c={2} clip={clip} color={STAGE} />
                        <LineDraw map={map} a={4} b={3} c={-1} clip={clip} color={STAGE} />
                        <LineDraw map={map} a={1} b={7} c={-3} clip={clip} color={SECOND} dashed />
                        <LineDraw map={map} a={7} b={-1} c={1} clip={clip} color={GREEN} dashed />
                        <Segment map={map} from={[3, 0]} to={[1.68, 1.76]} color={INK} width={2} />
                        <Segment map={map} from={[3, 0]} to={[1.24, -1.32]} color={INK} width={2} />
                        <Dot map={map} at={[3, 0]} name="Q" color={SECOND} dx={6} dy={-10} />
                        <F x={map.x(-3.6)} y={map.y(-1.9)} size={18} color={STAGE}>r</F>
                        <F x={map.x(-1.9)} y={map.y(3.4)} size={18} color={STAGE}>s</F>
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[46, 'r: 3x − 4y + 2 = 0', STAGE], [80, 's: 4x + 3y − 1 = 0', STAGE], [128, 'x + 7y − 3 = 0', SECOND], [162, '7x − y + 1 = 0', GREEN], [204, 'd(Q, r) = d(Q, s) = 11/5']]} />
            <Caption y={230}>{t(say('Bi erdikari, elkarren perpendikularrak', 'Dos bisectrices, perpendiculares entre sí', 'منصّفان متعامدان', 'Two bisectors, perpendicular to each other'))}</Caption>
        </Fig>
    )
}

/* ---------- 3. The points at a distance from a line ---------- */

export function DistanceLociFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 5, yMin: -4, yMax: 4 }
    return (
        <Fig height={250} label={t(say('r: 3x + 4y − 1 = 0 zuzenetik 2 distantziara dauden puntuak: 3x + 4y − 11 = 0 eta 3x + 4y + 9 = 0 zuzen paraleloak', 'Los puntos a distancia 2 de r: 3x + 4y − 1 = 0: las paralelas 3x + 4y − 11 = 0 y 3x + 4y + 9 = 0', 'النقاط التي تبعد 2 عن r: 3x + 4y − 1 = 0: المستقيمان المتوازيان 3x + 4y − 11 = 0 و3x + 4y + 9 = 0', 'The points at distance 2 from r: 3x + 4y − 1 = 0: the parallels 3x + 4y − 11 = 0 and 3x + 4y + 9 = 0'))}>
            <Frame box={box} cell={24} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={3} b={4} c={-1} clip={clip} color={STAGE} width={3.4} />
                        <LineDraw map={map} a={3} b={4} c={-11} clip={clip} color={SECOND} dashed />
                        <LineDraw map={map} a={3} b={4} c={9} clip={clip} color={SECOND} dashed />
                        <Measure map={map} from={[-1, 1]} to={[0.2, 2.6]} name="2" color={GREEN} dx={-18} dy={0} />
                        <Measure map={map} from={[-1, 1]} to={[-2.2, -0.6]} name="2" color={GREEN} dx={-20} dy={0} />
                        <Dot map={map} at={[-1, 1]} color={STAGE} />
                    </g>
                )}
            </Frame>
            <Notes x={278} rows={[[52, 'r: 3x + 4y − 1 = 0', STAGE], [98, '|3x + 4y − 1| = 2 · 5'], [144, '3x + 4y − 11 = 0', SECOND], [180, '3x + 4y + 9 = 0', SECOND]]} />
            <Caption y={240}>{t(say('Bi zuzen paralelo, alde banatan', 'Dos rectas paralelas, una a cada lado', 'مستقيمان متوازيان، واحد في كل جهة', 'Two parallel lines, one on each side'))}</Caption>
        </Fig>
    )
}

/* ---------- 4. A circle from its diameter ---------- */

export function DiameterCircleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 8, yMin: -8, yMax: 4 }
    return (
        <Fig height={274} label={t(say('A(−1, 2) eta B(5, −6) diametroa duen zirkunferentzia: zentroa C(2, −2) eta erradioa 5', 'La circunferencia de diámetro AB con A(−1, 2) y B(5, −6): centro C(2, −2) y radio 5', 'الدائرة التي قطرها AB حيث A(−1, 2) وB(5, −6): المركز C(2, −2) ونصف القطر 5', 'The circle with diameter AB, A(−1, 2) and B(5, −6): centre C(2, −2) and radius 5'))}>
            <Frame box={box} cell={18} ox={20} oy={20} labelStep={2}>
                {(map) => (
                    <g>
                        <circle cx={map.x(2)} cy={map.y(-2)} r={5 * map.cell} fill="rgba(47, 111, 219, 0.07)" stroke={STAGE} strokeWidth={3} />
                        <Segment map={map} from={[-1, 2]} to={[5, -6]} color={SECOND} width={3} dashed={false} />
                        <Dot map={map} at={[-1, 2]} name="A" dx={-22} dy={-6} />
                        <Dot map={map} at={[5, -6]} name="B" dx={8} dy={16} />
                        <Dot map={map} at={[2, -2]} name="C" color={SECOND} dx={10} dy={-4} />
                    </g>
                )}
            </Frame>
            <Notes x={270} rows={[[56, 'C = (2, −2)', SECOND], [102, 'AB = √(36 + 64) = 10'], [148, 'r = 10 / 2 = 5'], [196, '(x − 2)² + (y + 2)² = 25', STAGE]]} />
            <Caption y={264}>{t(say('Zentroa diametroaren erdiko puntua da', 'El centro es el punto medio del diámetro', 'المركز منتصف القطر', 'The centre is the midpoint of the diameter'))}</Caption>
        </Fig>
    )
}

/* ---------- 5. Completing the square ---------- */

export function CompleteSquareFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -7, xMax: 3, yMin: -2, yMax: 8 }
    return (
        <Fig height={258} label={t(say('x² + y² + 4x − 6y − 3 = 0 zirkunferentzia: (x + 2)² + (y − 3)² = 16, zentroa (−2, 3) eta erradioa 4', 'La circunferencia x² + y² + 4x − 6y − 3 = 0: (x + 2)² + (y − 3)² = 16, centro (−2, 3) y radio 4', 'الدائرة x² + y² + 4x − 6y − 3 = 0: ‏(x + 2)² + (y − 3)² = 16، المركز (−2, 3) ونصف القطر 4', 'The circle x² + y² + 4x − 6y − 3 = 0: (x + 2)² + (y − 3)² = 16, centre (−2, 3) and radius 4'))}>
            <Frame box={box} cell={20} ox={20} oy={20} labelStep={2}>
                {(map) => (
                    <g>
                        <circle cx={map.x(-2)} cy={map.y(3)} r={4 * map.cell} fill="rgba(47, 111, 219, 0.07)" stroke={STAGE} strokeWidth={3} />
                        <Measure map={map} from={[-2, 3]} to={[2, 3]} name="4" color={SECOND} dx={-4} dy={-8} />
                        <Dot map={map} at={[-2, 3]} name="C" color={SECOND} dx={-22} dy={-8} />
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[50, 'x² + y² + 4x − 6y − 3 = 0'], [96, '(x + 2)² + (y − 3)² = 3 + 4 + 9'], [142, '(x + 2)² + (y − 3)² = 16', STAGE], [188, 'C(−2, 3)  r = 4', SECOND]]} />
            <Caption y={248}>{t(say('Karratuak osatuta zentroa eta erradioa ikusten dira', 'Al completar cuadrados se ven el centro y el radio', 'بإكمال المربعين يظهر المركز ونصف القطر', 'Completing the squares shows the centre and the radius'))}</Caption>
        </Fig>
    )
}

/* ---------- 6. The tangent at a point ---------- */

export function TangentFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -5, xMax: 9, yMin: -4, yMax: 9 }
    return (
        <Fig height={253} label={t(say('(x − 1)² + (y − 2)² = 25 zirkunferentzia eta haren ukitzailea P(4, 6) puntuan: 3x + 4y − 36 = 0, CP erradioarekiko perpendikularra', 'La circunferencia (x − 1)² + (y − 2)² = 25 y su tangente en P(4, 6): 3x + 4y − 36 = 0, perpendicular al radio CP', 'الدائرة (x − 1)² + (y − 2)² = 25 ومماسها في P(4, 6): ‏3x + 4y − 36 = 0 العمودي على نصف القطر CP', 'The circle (x − 1)² + (y − 2)² = 25 and its tangent at P(4, 6): 3x + 4y − 36 = 0, perpendicular to the radius CP'))}>
            <Frame box={box} cell={15} ox={20} oy={20} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <circle cx={map.x(1)} cy={map.y(2)} r={5 * map.cell} fill="rgba(47, 111, 219, 0.07)" stroke={STAGE} strokeWidth={3} />
                        <LineDraw map={map} a={3} b={4} c={-36} clip={clip} color={SECOND} />
                        <Segment map={map} from={[1, 2]} to={[4, 6]} color={GREEN} width={3} dashed={false} />
                        <RightMark map={map} corner={[4, 6]} a={[1, 2]} b={[8, 3]} />
                        <Dot map={map} at={[1, 2]} name="C" dx={-20} dy={14} />
                        <Dot map={map} at={[4, 6]} name="P" color={SECOND} dx={6} dy={-10} />
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[50, 'CP = (3, 4)', GREEN], [96, '3(x − 4) + 4(y − 6) = 0'], [142, '3x + 4y − 36 = 0', SECOND], [188, 'd(C, t) = 25 / 5 = 5 = r']]} />
            <Caption y={243}>{t(say('Ukitzailea erradioarekiko perpendikularra da', 'La tangente es perpendicular al radio', 'المماس عمودي على نصف القطر', 'The tangent is perpendicular to the radius'))}</Caption>
        </Fig>
    )
}

/* ---------- 7. Two circles tangent on the outside ---------- */

export function TwoCirclesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 8, yMin: -2, yMax: 9 }
    return (
        <Fig height={256} label={t(say('C₁(1, 1) zentroko eta 2 erradioko zirkunferentzia eta C₂(4, 5) zentroko eta 3 erradiokoa: d = 5 = 2 + 3, kanpotik ukitzaileak', 'La circunferencia de centro C₁(1, 1) y radio 2 y la de centro C₂(4, 5) y radio 3: d = 5 = 2 + 3, tangentes exteriores', 'الدائرة التي مركزها C₁(1, 1) ونصف قطرها 2 والتي مركزها C₂(4, 5) ونصف قطرها 3: ‏d = 5 = 2 + 3، متماستان من الخارج', 'The circle with centre C₁(1, 1) and radius 2 and the one with centre C₂(4, 5) and radius 3: d = 5 = 2 + 3, tangent on the outside'))}>
            <Frame box={box} cell={18} ox={20} oy={20} labelStep={2}>
                {(map) => (
                    <g>
                        <circle cx={map.x(1)} cy={map.y(1)} r={2 * map.cell} fill="rgba(47, 111, 219, 0.07)" stroke={STAGE} strokeWidth={3} />
                        <circle cx={map.x(4)} cy={map.y(5)} r={3 * map.cell} fill="rgba(196, 67, 42, 0.07)" stroke={SECOND} strokeWidth={3} />
                        <Segment map={map} from={[1, 1]} to={[4, 5]} color={GREEN} width={2.6} />
                        <Dot map={map} at={[1, 1]} name="C₁" color={STAGE} dx={-30} dy={6} />
                        <Dot map={map} at={[4, 5]} name="C₂" color={SECOND} dx={8} dy={-8} />
                        <Dot map={map} at={[2.2, 2.6]} color={GREEN} />
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[50, 'r₁ = 2  r₂ = 3'], [96, 'd = √(3² + 4²) = 5', GREEN], [142, 'r₁ + r₂ = 2 + 3 = 5'], [188, 'd = r₁ + r₂', SECOND]]} />
            <Caption y={246}>{t(say('Puntu bakarrean ukitzen dira, kanpotik', 'Se tocan en un solo punto, por fuera', 'تتلامسان في نقطة واحدة من الخارج', 'They touch at a single point, on the outside'))}</Caption>
        </Fig>
    )
}

/* ---------- 8. The ellipse and its foci ---------- */

export function EllipseFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -6, xMax: 6, yMin: -4, yMax: 4 }
    return (
        <Fig height={202} label={t(say('x²/25 + y²/9 = 1 elipsea, F(4, 0) eta F′(−4, 0) fokuekin: P puntutik fokuetarako distantzien batura 10 da', 'La elipse x²/25 + y²/9 = 1 con focos F(4, 0) y F′(−4, 0): desde P, las distancias a los focos suman 10', 'القطع الناقص x²/25 + y²/9 = 1 وبؤرتاه F(4, 0) وF′(−4, 0): من P مجموع البعدين عن البؤرتين 10', 'The ellipse x²/25 + y²/9 = 1 with foci F(4, 0) and F′(−4, 0): from P, the distances to the foci add up to 10'))}>
            <Frame box={box} cell={18} ox={20} oy={20} labelStep={2}>
                {(map) => (
                    <g>
                        <Oval map={map} rx={5} ry={3} />
                        <Segment map={map} from={[3, 2.4]} to={[4, 0]} color={SECOND} width={2.6} dashed={false} />
                        <Segment map={map} from={[3, 2.4]} to={[-4, 0]} color={GREEN} width={2.6} dashed={false} />
                        <Dot map={map} at={[4, 0]} name="F" color={SECOND} dx={4} dy={18} />
                        <Dot map={map} at={[-4, 0]} name="F′" color={GREEN} dx={-6} dy={18} />
                        <Dot map={map} at={[3, 2.4]} name="P" dx={6} dy={-8} />
                    </g>
                )}
            </Frame>
            <Notes x={270} rows={[[44, 'PF + PF′ = 2a = 10'], [84, 'a = 5  c = 4'], [124, 'b² = 25 − 16 = 9'], [166, 'x²/25 + y²/9 = 1', STAGE]]} />
            <Caption y={192}>{t(say('Puntu guztietan batura bera', 'La misma suma en todos los puntos', 'المجموع نفسه في كل النقاط', 'The same sum at every point'))}</Caption>
        </Fig>
    )
}

/* ---------- 9. The elements of a vertical ellipse ---------- */

export function EllipseElementsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -6, xMax: 6, yMin: -6, yMax: 6 }
    return (
        <Fig height={262} label={t(say('x²/16 + y²/25 = 1 elipse bertikala: a = 5, b = 4 eta c = 3; fokuak F(0, ±3); b eta c katetoak dituen triangeluaren hipotenusa a da', 'La elipse vertical x²/16 + y²/25 = 1: a = 5, b = 4 y c = 3; focos F(0, ±3); el triángulo de catetos b y c tiene hipotenusa a', 'القطع الناقص الرأسي x²/16 + y²/25 = 1: ‏a = 5 وb = 4 وc = 3؛ البؤرتان F(0, ±3)؛ والمثلث الذي ضلعاه b وc وتره a', 'The vertical ellipse x²/16 + y²/25 = 1: a = 5, b = 4 and c = 3; foci F(0, ±3); the triangle with legs b and c has hypotenuse a'))}>
            <Frame box={box} cell={17} ox={20} oy={20} labelStep={2}>
                {(map) => (
                    <g>
                        <Oval map={map} rx={4} ry={5} />
                        <Measure map={map} from={[0, 0]} to={[4, 0]} name="b" color={GREEN} dx={-4} dy={18} />
                        <Measure map={map} from={[0, 0]} to={[0, 3]} name="c" color={MUTED} dx={-16} dy={4} />
                        <Measure map={map} from={[4, 0]} to={[0, 3]} name="a" color={SECOND} dx={4} dy={-6} />
                        <Dot map={map} at={[0, 3]} name="F" color={SECOND} dx={8} dy={-6} />
                        <Dot map={map} at={[0, -3]} name="F′" color={SECOND} dx={8} dy={16} />
                        <Dot map={map} at={[0, 5]} color={INK} />
                        <Dot map={map} at={[4, 0]} color={INK} />
                    </g>
                )}
            </Frame>
            <Notes x={270} rows={[[46, 'a = 5  b = 4', STAGE], [90, 'c = √(25 − 16) = 3'], [134, 'V(0, ±5)  F(0, ±3)', SECOND], [178, 'e = c / a = 3/5']]} />
            <Caption y={252}>{t(say('Izendatzaile handiena y² gaiaren azpian: elipse bertikala', 'El denominador mayor bajo y²: elipse vertical', 'المقام الأكبر تحت y²: قطع ناقص رأسي', 'The greater denominator under y²: a vertical ellipse'))}</Caption>
        </Fig>
    )
}

/* ---------- 10. An ellipse away from the origin ---------- */

export function ShiftedEllipseFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 8, yMin: -5, yMax: 3 }
    return (
        <Fig height={202} label={t(say('(x − 2)²/25 + (y + 1)²/9 = 1 elipsea: zentroa (2, −1) eta fokuak (6, −1) eta (−2, −1)', 'La elipse (x − 2)²/25 + (y + 1)²/9 = 1: centro (2, −1) y focos (6, −1) y (−2, −1)', 'القطع الناقص (x − 2)²/25 + (y + 1)²/9 = 1: المركز (2, −1) والبؤرتان (6, −1) و(−2, −1)', 'The ellipse (x − 2)²/25 + (y + 1)²/9 = 1: centre (2, −1) and foci (6, −1) and (−2, −1)'))}>
            <Frame box={box} cell={18} ox={20} oy={20} labelStep={2}>
                {(map) => (
                    <g>
                        <Oval map={map} h={2} k={-1} rx={5} ry={3} />
                        <Dot map={map} at={[2, -1]} name="C" dx={6} dy={-8} />
                        <Dot map={map} at={[6, -1]} name="F" color={SECOND} dx={4} dy={18} />
                        <Dot map={map} at={[-2, -1]} name="F′" color={SECOND} dx={-8} dy={18} />
                    </g>
                )}
            </Frame>
            <Notes x={270} rows={[[44, 'C(2, −1)'], [84, 'a = 5  b = 3  c = 4'], [124, 'F(6, −1)  F′(−2, −1)', SECOND]]} />
            <Caption y={192}>{t(say('Jatorrian zentroa duen elipsea, lekualdatuta', 'La elipse de centro el origen, trasladada', 'القطع الناقص الذي مركزه الأصل بعد إزاحته', 'The ellipse centred at the origin, shifted'))}</Caption>
        </Fig>
    )
}

/* ---------- 11. The hyperbola and its foci ---------- */

export function HyperbolaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -7, xMax: 7, yMin: -7, yMax: 7 }
    return (
        <Fig height={254} label={t(say('x²/9 − y²/16 = 1 hiperbola, F(5, 0) eta F′(−5, 0) fokuekin: P(5, 16/3) puntutik PF′ − PF = 6', 'La hipérbola x²/9 − y²/16 = 1 con focos F(5, 0) y F′(−5, 0): desde P(5, 16/3), PF′ − PF = 6', 'القطع الزائد x²/9 − y²/16 = 1 وبؤرتاه F(5, 0) وF′(−5, 0): من P(5, 16/3) يكون PF′ − PF = 6', 'The hyperbola x²/9 − y²/16 = 1 with foci F(5, 0) and F′(−5, 0): from P(5, 16/3), PF′ − PF = 6'))}>
            <Frame box={box} cell={14} ox={20} oy={20} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <Branches map={map} a={3} b={4} clip={clip} reach={1.5} />
                        <Segment map={map} from={[5, 16 / 3]} to={[5, 0]} color={SECOND} width={2.6} dashed={false} />
                        <Segment map={map} from={[5, 16 / 3]} to={[-5, 0]} color={GREEN} width={2.6} dashed={false} />
                        <Dot map={map} at={[5, 0]} name="F" color={SECOND} dx={6} dy={18} />
                        <Dot map={map} at={[-5, 0]} name="F′" color={GREEN} dx={-10} dy={18} />
                        <Dot map={map} at={[5, 16 / 3]} name="P" dx={-20} dy={-6} />
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[46, 'PF′ − PF = 34/3 − 16/3 = 6'], [90, '2a = 6  c = 5'], [134, 'b² = 25 − 9 = 16'], [178, 'x²/9 − y²/16 = 1', STAGE]]} />
            <Caption y={244}>{t(say('Bi adar, eta distantzien kendura beti 2a', 'Dos ramas, y la diferencia de distancias siempre 2a', 'فرعان، وفرق البعدين دائمًا 2a', 'Two branches, and the difference of distances always 2a'))}</Caption>
        </Fig>
    )
}

/* ---------- 12. The asymptotes ---------- */

export function AsymptotesFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -12, xMax: 12, yMin: -12, yMax: 12 }
    return (
        <Fig height={250} label={t(say('x²/36 − y²/64 = 1 hiperbola, 12 × 16 laukizuzena eta haren diagonalak, y = ±(4/3)x asintotak', 'La hipérbola x²/36 − y²/64 = 1, el rectángulo de 12 × 16 y sus diagonales, las asíntotas y = ±(4/3)x', 'القطع الزائد x²/36 − y²/64 = 1 والمستطيل 12 × 16 وقطراه، أي المقاربان y = ±(4/3)x', 'The hyperbola x²/36 − y²/64 = 1, the 12 × 16 rectangle and its diagonals, the asymptotes y = ±(4/3)x'))}>
            <Frame box={box} cell={8} ox={20} oy={20} labelStep={4}>
                {(map, clip) => (
                    <g>
                        <rect x={map.x(-6)} y={map.y(8)} width={12 * map.cell} height={16 * map.cell} fill="none" stroke={MUTED} strokeWidth={1.8} strokeDasharray="6 5" />
                        <LineDraw map={map} a={4} b={-3} c={0} clip={clip} color={SECOND} dashed />
                        <LineDraw map={map} a={4} b={3} c={0} clip={clip} color={SECOND} dashed />
                        <Branches map={map} a={6} b={8} clip={clip} reach={1.3} />
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[46, 'a = 6  b = 8'], [90, 'y = ±(8/6)x = ±(4/3)x', SECOND], [134, 'c = √(36 + 64) = 10'], [178, 'e = 10/6 = 5/3', STAGE]]} />
            <Caption y={240}>{t(say('Adarrak laukizuzenaren diagonaletara hurbiltzen dira', 'Las ramas se acercan a las diagonales del rectángulo', 'يقترب الفرعان من قطري المستطيل', 'The branches get closer to the diagonals of the rectangle'))}</Caption>
        </Fig>
    )
}

/* ---------- 13. The parabola: focus and directrix ---------- */

export function ParabolaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -4, xMax: 8, yMin: -7, yMax: 7 }
    return (
        <Fig height={254} label={t(say('y² = 12x parabola, F(3, 0) fokua eta x = −3 zuzentzailea: P(3, 6) puntua 6 distantziara dago fokutik eta zuzentzailetik', 'La parábola y² = 12x, el foco F(3, 0) y la directriz x = −3: el punto P(3, 6) está a 6 del foco y de la directriz', 'القطع المكافئ y² = 12x والبؤرة F(3, 0) والدليل x = −3: النقطة P(3, 6) على بعد 6 من البؤرة ومن الدليل', 'The parabola y² = 12x, the focus F(3, 0) and the directrix x = −3: the point P(3, 6) is 6 from the focus and from the directrix'))}>
            <Frame box={box} cell={14} ox={20} oy={20} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={1} b={0} c={3} clip={clip} color={SECOND} dashed />
                        <Curve map={map} points={range(-7, 7).map((y): Point => [(y * y) / 12, y])} clip={clip} />
                        <Measure map={map} from={[3, 6]} to={[3, 0]} name="6" color={GREEN} dx={6} dy={4} />
                        <Measure map={map} from={[3, 6]} to={[-3, 6]} name="6" color={GREEN} dx={-4} dy={-8} />
                        <Dot map={map} at={[3, 0]} name="F" color={SECOND} dx={6} dy={18} />
                        <Dot map={map} at={[3, 6]} name="P" dx={8} dy={-4} />
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[50, '√((x − 3)² + y²) = |x + 3|'], [96, 'y² = 12x = 2px', STAGE], [142, 'p = 6  F(3, 0)', SECOND], [188, 'x = −3', SECOND]]} />
            <Caption y={244}>{t(say('Fokutik eta zuzentzailetik distantzia bera', 'La misma distancia al foco y a la directriz', 'المسافة نفسها إلى البؤرة والدليل', 'The same distance to the focus and to the directrix'))}</Caption>
        </Fig>
    )
}

/* ---------- 14. A shifted parabola ---------- */

export function ShiftedParabolaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -5, xMax: 5, yMin: -5, yMax: 7 }
    return (
        <Fig height={250} label={t(say('(y − 1)² = 8(x + 2) parabola: erpina V(−2, 1), fokua F(0, 1) eta zuzentzailea x = −4', 'La parábola (y − 1)² = 8(x + 2): vértice V(−2, 1), foco F(0, 1) y directriz x = −4', 'القطع المكافئ (y − 1)² = 8(x + 2): الرأس V(−2, 1) والبؤرة F(0, 1) والدليل x = −4', 'The parabola (y − 1)² = 8(x + 2): vertex V(−2, 1), focus F(0, 1) and directrix x = −4'))}>
            <Frame box={box} cell={16} ox={20} oy={20} labelStep={2}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={1} b={0} c={4} clip={clip} color={SECOND} dashed />
                        <LineDraw map={map} a={0} b={1} c={-1} clip={clip} color={MUTED} width={1.6} dashed />
                        <Curve map={map} points={range(-5, 7).map((y): Point => [((y - 1) * (y - 1)) / 8 - 2, y])} clip={clip} />
                        <Dot map={map} at={[-2, 1]} name="V" dx={-22} dy={-6} />
                        <Dot map={map} at={[0, 1]} name="F" color={SECOND} dx={6} dy={-8} />
                    </g>
                )}
            </Frame>
            <Notes x={262} rows={[[50, 'V(−2, 1)'], [96, '2p = 8  p/2 = 2'], [142, 'F(0, 1)', SECOND], [188, 'x = −4', SECOND]]} />
            <Caption y={240}>{t(say('Erpina lekualdatzean, fokua eta zuzentzailea ere bai', 'Al trasladar el vértice, se trasladan el foco y la directriz', 'بإزاحة الرأس تنزاح البؤرة والدليل', 'When the vertex is shifted, the focus and the directrix are too'))}</Caption>
        </Fig>
    )
}

/* ---------- 15. The cuts of a cone ---------- */

export function ConeSectionsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const panels: Array<{ name: ReturnType<typeof say>; e: string; cut: ReactNode }> = [
        { name: say('Zirkunferentzia', 'Circunferencia', 'دائرة', 'Circle'), e: 'e = 0', cut: <line x1={46} y1={76} x2={118} y2={76} /> },
        { name: say('Elipsea', 'Elipse', 'قطع ناقص', 'Ellipse'), e: '0 < e < 1', cut: <line x1={38} y1={64} x2={99} y2={104} /> },
        { name: say('Parabola', 'Parábola', 'قطع مكافئ', 'Parabola'), e: 'e = 1', cut: <line x1={36} y1={40} x2={89} y2={119} /> },
        { name: say('Hiperbola', 'Hipérbola', 'قطع زائد', 'Hyperbola'), e: 'e > 1', cut: <line x1={104} y1={30} x2={104} y2={230} /> }
    ]
    return (
        <Fig height={290} label={t(say('Kono bikoitza lau eratara ebakita: zirkunferentzia, elipsea, parabola eta hiperbola', 'Un cono doble cortado de cuatro maneras: circunferencia, elipse, parábola e hipérbola', 'مخروط مزدوج مقطوع بأربع طرق: دائرة وقطع ناقص وقطع مكافئ وقطع زائد', 'A double cone cut in four ways: circle, ellipse, parabola and hyperbola'))}>
            {panels.map((panel, index) => (
                <g key={index} transform={`translate(${12 + index * 176} 0)`}>
                    <rect x={0} y={10} width={164} height={250} rx={12} fill={index % 2 ? STAGE_TINT : MUSTARD_TINT} stroke={INK} strokeWidth={1.4} />
                    <polygon points="22,40 142,40 82,130" fill={PAPER} stroke={INK} strokeWidth={2} />
                    <polygon points="22,220 142,220 82,130" fill={PAPER} stroke={INK} strokeWidth={2} />
                    <g stroke={SECOND} strokeWidth={4} strokeLinecap="round">{panel.cut}</g>
                    <F x={82} y={250} size={17} anchor="middle" color={SECOND}>{panel.e}</F>
                    <Label x={82} y={282} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{t(panel.name)}</Label>
                </g>
            ))}
        </Fig>
    )
}

/* ---------- The unit's cover ---------- */

export function BachConicsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(20 24) rotate(-4)">
                    <rect width={250} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <ellipse cx={125} cy={105} rx={95} ry={58} fill="#dde7f7" stroke="#2f6fdb" strokeWidth={4} />
                    <line x1={125} y1={105} x2={50} y2={105} stroke={INK} strokeWidth={1} strokeDasharray="4 4" />
                    <circle cx={50} cy={105} r={6} fill="#c4432a" />
                    <circle cx={200} cy={105} r={6} fill="#c4432a" />
                    <polyline points="50,105 160,58 200,105" fill="none" stroke="#267b53" strokeWidth={3} strokeDasharray="7 5" />
                    <circle cx={160} cy={58} r={6} fill={INK} />
                </g>
                <g transform="translate(296 40) rotate(5)">
                    <rect width={200} height={190} rx={16} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
                    <path d="M40 30 Q 100 290 160 30" fill="none" stroke="#2f6fdb" strokeWidth={4} />
                    <circle cx={100} cy={110} r={6} fill="#c4432a" />
                    <line x1={20} y1={180} x2={180} y2={180} stroke="#c4432a" strokeWidth={3} strokeDasharray="7 5" />
                </g>
                <g transform="translate(40 276) rotate(2)">
                    <rect width={440} height={86} rx={16} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                    <text x={220} y={56} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>x²/a² + y²/b² = 1     y² = 2px</text>
                </g>
            </svg>
        </div>
    )
}
