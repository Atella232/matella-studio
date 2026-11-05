import type { UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { type PlaneBox } from '../dbh2-funtzioak-v2/planeMap'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SERIF, STAGE, STAGE_TINT, useText, type Point } from './figureColors'
import { Arc, Arrow, Caption, Dot, F, Fig, Frame, LineDraw, RightMark, Segment } from './figureKit'

/* ==========================================================================
   Geometria analitikoa · Batxilergoa 1 · Zientziak — the new lesson
   figures: a segment cut in three, a line with its normal and direction
   vectors, the angle of inclination, a pencil of lines, the angle of two
   lines, the distance from a point to a line, the distance between two
   parallel lines, a point reflected in a line, the notable points of a
   triangle and the area of a triangle. The rest reuse the 4. DBH figures.
   ========================================================================== */

/* ---------- 3. Cutting a segment in three ---------- */

export function DivideFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 9, yMin: -2, yMax: 6 }
    return (
        <Fig height={290} label={t(say('A(−1, 5) eta B(8, −1) arteko zuzenkia hiru zati berditan: P₁(2, 3) eta P₂(5, 1)', 'El segmento de A(−1, 5) a B(8, −1) en tres partes iguales: P₁(2, 3) y P₂(5, 1)', 'القطعة من A(−1, 5) إلى B(8, −1) في ثلاثة أجزاء متساوية: P₁(2, 3) وP₂(5, 1)', 'The segment from A(−1, 5) to B(8, −1) in three equal parts: P₁(2, 3) and P₂(5, 1)'))}>
            <Frame box={box} cell={26} ox={20} oy={20}>
                {(map) => (
                    <g>
                        <Arrow map={map} from={[-1, 5]} to={[2, 3]} color={SECOND} width={3.6} />
                        <Arrow map={map} from={[2, 3]} to={[5, 1]} color={SECOND} width={3.6} />
                        <Arrow map={map} from={[5, 1]} to={[8, -1]} color={SECOND} width={3.6} />
                        <Dot map={map} at={[-1, 5]} name="A" dx={-6} dy={-12} />
                        <Dot map={map} at={[8, -1]} name="B" dx={8} dy={-10} />
                        <Dot map={map} at={[2, 3]} name="P₁" color={STAGE} dx={6} dy={-12} />
                        <Dot map={map} at={[5, 1]} name="P₂" color={STAGE} dx={6} dy={-12} />
                    </g>
                )}
            </Frame>
            <F x={340} y={70}>AB = (9, −6)</F>
            <F x={340} y={112} color={SECOND}>AB / 3 = (3, −2)</F>
            <F x={340} y={166} color={STAGE}>P₁ = A + AB / 3 = (2, 3)</F>
            <F x={340} y={208} color={STAGE}>P₂ = A + 2AB / 3 = (5, 1)</F>
            <Caption y={282} x={510}>{t(say('Hiru urrats berdin A-tik B-ra', 'Tres pasos iguales de A a B', 'ثلاث خطوات متساوية من A إلى B', 'Three equal steps from A to B'))}</Caption>
        </Fig>
    )
}

/* ---------- 5. The normal vector ---------- */

export function NormalFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 7, yMin: -5, yMax: 3 }
    return (
        <Fig height={270} label={t(say('2x − 3y − 8 = 0 zuzena P(1, −2) puntutik: d = (3, 2) norabide-bektorea eta n = (2, −3) bektore normala, perpendikularrak', 'La recta 2x − 3y − 8 = 0 por P(1, −2): el vector director d = (3, 2) y el normal n = (2, −3), perpendiculares', 'المستقيم 2x − 3y − 8 = 0 مرورًا بـ P(1, −2): متجه التوجيه d = (3, 2) والمتجه الناظمي n = (2, −3) متعامدان', 'The line 2x − 3y − 8 = 0 through P(1, −2): the direction vector d = (3, 2) and the normal n = (2, −3), perpendicular'))}>
            <Frame box={box} cell={27} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={2} b={-3} c={-8} clip={clip} />
                        <Arrow map={map} from={[1, -2]} to={[4, 0]} color={GREEN} width={3.8} name="d" dx={-4} dy={-12} />
                        <Arrow map={map} from={[1, -2]} to={[3, -5]} color={SECOND} width={3.8} name="n" dx={10} dy={6} />
                        <RightMark map={map} corner={[1, -2]} a={[4, 0]} b={[3, -5]} />
                        <Dot map={map} at={[1, -2]} name="P" dx={-22} dy={-6} />
                    </g>
                )}
            </Frame>
            <F x={290} y={60}>(x − 1) / 3 = (y + 2) / 2</F>
            <F x={290} y={104} color={STAGE}>2x − 3y − 8 = 0</F>
            <F x={290} y={158} color={SECOND}>n = (A, B) = (2, −3)</F>
            <F x={290} y={198} color={GREEN}>d = (−B, A) = (3, 2)</F>
            <Caption y={262} x={500}>{t(say('Normala zuzenarekiko perpendikularra da', 'El normal es perpendicular a la recta', 'الناظمي عمودي على المستقيم', 'The normal is perpendicular to the line'))}</Caption>
        </Fig>
    )
}

/* ---------- 6. The angle of inclination ---------- */

export function InclinationFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 3, yMin: -1, yMax: 5 }
    const root3 = Math.sqrt(3)
    return (
        <Fig height={270} label={t(say('y = √3 x + 1 zuzenak 60°-ko angelua osatzen du X ardatzarekin: malda tan 60° = √3 da', 'La recta y = √3 x + 1 forma 60° con el eje X: la pendiente es tan 60° = √3', 'المستقيم y = √3 x + 1 يصنع 60° مع محور X: الميل tan 60° = √3', 'The line y = √3 x + 1 makes 60° with the x-axis: the slope is tan 60° = √3'))}>
            <Frame box={box} cell={38} ox={24} oy={20}>
                {(map, clip) => {
                    const crossing = -1 / root3
                    return (
                        <g>
                            <LineDraw map={map} a={root3} b={-1} c={1} clip={clip} />
                            <Segment map={map} from={[0, 1]} to={[1, 1]} color={GREEN} width={2.4} />
                            <Segment map={map} from={[1, 1]} to={[1, 1 + root3]} color={SECOND} width={2.4} />
                            <Arc c={[map.x(crossing), map.y(0)]} r={30} a1={0} a2={60} color={SECOND} />
                            <F x={map.x(crossing) + 30} y={map.y(0) - 10} size={17} color={SECOND}>α</F>
                            <F x={map.x(0.5)} y={map.y(1) + 20} size={16} color={GREEN} anchor="middle">1</F>
                            <F x={map.x(1) + 8} y={map.y(1 + root3 / 2) + 6} size={16} color={SECOND}>√3</F>
                        </g>
                    )
                }}
            </Frame>
            <F x={260} y={70}>y = √3 x + 1</F>
            <F x={260} y={124} color={SECOND}>m = tan α = √3</F>
            <F x={260} y={164} color={SECOND}>α = 60°</F>
            <F x={260} y={204} color={MUTED} size={18}>y − y₀ = m (x − x₀)</F>
            <Caption y={262} x={500}>{t(say('Malda: ardatzarekiko angeluaren tangentea', 'La pendiente: la tangente del ángulo con el eje', 'الميل: ظل الزاوية مع المحور', 'The slope: the tangent of the angle with the axis'))}</Caption>
        </Fig>
    )
}

/* ---------- 7. A pencil of lines ---------- */

export function PencilFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 6, yMin: -4, yMax: 6 }
    const slopes = [-2, -0.5, 0.5, 1]
    return (
        <Fig height={300} label={t(say('P(2, −1) zentroko zuzen-sorta: zuzen asko puntu horretatik; Q(4, 5) puntutik pasatzen dena, m = 3', 'El haz de rectas de centro P(2, −1): muchas rectas por ese punto; la que pasa por Q(4, 5) tiene m = 3', 'حزمة المستقيمات التي مركزها P(2, −1): مستقيمات كثيرة عبر تلك النقطة؛ والمار بـ Q(4, 5) ميله m = 3', 'The pencil of lines with centre P(2, −1): many lines through that point; the one through Q(4, 5) has m = 3'))}>
            <Frame box={box} cell={25} ox={24} oy={20}>
                {(map, clip) => (
                    <g>
                        {slopes.map((m) => <LineDraw key={m} map={map} a={m} b={-1} c={-1 - 2 * m} clip={clip} color={MUTED} width={1.6} />)}
                        <LineDraw map={map} a={1} b={0} c={-2} clip={clip} color={MUTED} width={1.6} dashed />
                        <LineDraw map={map} a={3} b={-1} c={-7} clip={clip} color={STAGE} width={3.4} />
                        <Dot map={map} at={[2, -1]} name="P" dx={8} dy={18} />
                        <Dot map={map} at={[4, 5]} name="Q" color={STAGE} dx={-24} dy={-4} />
                    </g>
                )}
            </Frame>
            <F x={270} y={70}>y + 1 = m (x − 2)</F>
            <F x={270} y={110} color={MUTED}>x = 2</F>
            <F x={270} y={170} color={STAGE}>Q(4, 5): 6 = 2m → m = 3</F>
            <F x={270} y={210} color={STAGE}>y = 3x − 7</F>
            <Caption y={292} x={500}>{t(say('Malda bakoitzak sortako zuzen bat', 'Cada pendiente, una recta del haz', 'لكل ميل مستقيم من الحزمة', 'Each slope, one line of the pencil'))}</Caption>
        </Fig>
    )
}

/* ---------- 10. The angle of two lines ---------- */

export function LineAngleFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -2, xMax: 4, yMin: -2, yMax: 4 }
    const angleR = (Math.atan(1 / 3) * 180) / Math.PI
    const angleS = (Math.atan(2) * 180) / Math.PI
    return (
        <Fig height={270} label={t(say('x − 3y + 2 = 0 eta 2x − y − 1 = 0 zuzenak (1, 1) puntuan ebakitzen dira, eta 45°-ko angelu zorrotza osatzen dute', 'Las rectas x − 3y + 2 = 0 y 2x − y − 1 = 0 se cortan en (1, 1) y forman un ángulo agudo de 45°', 'المستقيمان x − 3y + 2 = 0 و2x − y − 1 = 0 يتقاطعان في (1, 1) ويصنعان زاوية حادة 45°', 'The lines x − 3y + 2 = 0 and 2x − y − 1 = 0 meet at (1, 1) and make an acute angle of 45°'))}>
            <Frame box={box} cell={36} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={1} b={-3} c={2} clip={clip} color={STAGE} />
                        <LineDraw map={map} a={2} b={-1} c={-1} clip={clip} color={GREEN} />
                        <Arc c={[map.x(1), map.y(1)]} r={36} a1={angleR} a2={angleS} color={SECOND} />
                        <Arc c={[map.x(1), map.y(1)]} r={22} a1={angleS} a2={angleR + 180} color={MUTED} />
                        <F x={map.x(1) + 40} y={map.y(1) - 16} size={17} color={SECOND}>45°</F>
                        <F x={map.x(1) - 44} y={map.y(1) - 10} size={14} color={MUTED}>135°</F>
                        <F x={map.x(3.4)} y={map.y(1.8) + 22} size={18} color={STAGE}>r</F>
                        <F x={map.x(2.3) + 8} y={map.y(3.6)} size={18} color={GREEN}>s</F>
                    </g>
                )}
            </Frame>
            <F x={270} y={60}>n<tspan dy={5} fontSize={14}>r</tspan><tspan dy={-5}> = (1, −3),  n</tspan><tspan dy={5} fontSize={14}>s</tspan><tspan dy={-5}> = (2, −1)</tspan></F>
            <F x={270} y={114}>cos α = |2 + 3| / (√10 · √5)</F>
            <F x={270} y={154} color={SECOND}>= √2 / 2  →  α = 45°</F>
            <Caption y={262} x={500}>{t(say('Bi zuzenen angelua zorrotza da', 'El ángulo de dos rectas es el agudo', 'زاوية مستقيمين هي الحادة', 'The angle of two lines is the acute one'))}</Caption>
        </Fig>
    )
}

/* ---------- 11. The distance from a point to a line ---------- */

export function PointLineFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -3, yMax: 4 }
    const foot: Point = [1.4, -0.2]
    return (
        <Fig height={270} label={t(say('P(3, 1) puntutik 4x + 3y − 5 = 0 zuzenerako distantzia perpendikularrean neurtzen da: 2; beste edozein puntu urrunago dago', 'La distancia de P(3, 1) a 4x + 3y − 5 = 0 se mide por la perpendicular: 2; cualquier otro punto está más lejos', 'تُقاس المسافة من P(3, 1) إلى 4x + 3y − 5 = 0 على العمود: 2؛ وأي نقطة أخرى أبعد', 'The distance from P(3, 1) to 4x + 3y − 5 = 0 is measured along the perpendicular: 2; any other point is further away'))}>
            <Frame box={box} cell={32} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={4} b={3} c={-5} clip={clip} />
                        <Segment map={map} from={[3, 1]} to={foot} color={SECOND} width={3.4} dashed={false} />
                        <Segment map={map} from={[3, 1]} to={[2, -1]} color={MUTED} width={2} />
                        <RightMark map={map} corner={foot} a={[3, 1]} b={[0.2, 1.4]} />
                        <Dot map={map} at={[3, 1]} name="P" dx={8} dy={-8} />
                        <Dot map={map} at={[2, -1]} name="Q" color={MUTED} dx={8} dy={16} />
                        <F x={map.x(2.2) - 12} y={map.y(0.4) - 10} size={17} color={SECOND}>2</F>
                    </g>
                )}
            </Frame>
            <F x={250} y={64}>d(P, r) = |4 · 3 + 3 · 1 − 5| / √(4² + 3²)</F>
            <F x={250} y={110} color={SECOND}>= 10 / 5 = 2</F>
            <F x={250} y={160} color={MUTED} size={18}>|PQ| = √5 &gt; 2</F>
            <Caption y={262} x={480}>{t(say('Bide laburrena perpendikularra da', 'El camino más corto es la perpendicular', 'أقصر طريق هو العمود', 'The shortest way is the perpendicular'))}</Caption>
        </Fig>
    )
}

/* ---------- 12. The distance between two parallel lines ---------- */

export function ParallelDistanceFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -2, yMax: 4 }
    return (
        <Fig height={260} label={t(say('3x − 4y + 2 = 0 eta 6x − 8y − 11 = 0 zuzen paraleloak: lehenengoaren P(2, 2) puntutik bigarrenera, 15/10', 'Las paralelas 3x − 4y + 2 = 0 y 6x − 8y − 11 = 0: desde P(2, 2) de la primera hasta la segunda, 15/10', 'المستقيمان المتوازيان 3x − 4y + 2 = 0 و6x − 8y − 11 = 0: من P(2, 2) على الأول إلى الثاني 15/10', 'The parallels 3x − 4y + 2 = 0 and 6x − 8y − 11 = 0: from P(2, 2) on the first to the second, 15/10'))}>
            <Frame box={box} cell={34} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={3} b={-4} c={2} clip={clip} />
                        <LineDraw map={map} a={6} b={-8} c={-11} clip={clip} color={GREEN} />
                        <Segment map={map} from={[2, 2]} to={[2.9, 0.8]} color={SECOND} width={3.4} dashed={false} />
                        <RightMark map={map} corner={[2.9, 0.8]} a={[2, 2]} b={[4.5, 2]} />
                        <Dot map={map} at={[2, 2]} name="P" dx={-22} dy={-6} />
                        <F x={map.x(4.3)} y={map.y(3.2)} size={18} color={STAGE}>r</F>
                        <F x={map.x(4.5)} y={map.y(1.4) + 24} size={18} color={GREEN}>s</F>
                    </g>
                )}
            </Frame>
            <F x={260} y={62}>3 / 6 = −4 / −8 ≠ 2 / −11</F>
            <F x={260} y={108}>P(2, 2) ∈ r</F>
            <F x={260} y={152} color={SECOND}>d = |12 − 16 − 11| / √(36 + 64)</F>
            <F x={260} y={192} color={SECOND}>= 15 / 10</F>
            <Caption y={252} x={480}>{t(say('r-ko edozein puntutatik s-ra', 'Desde cualquier punto de r hasta s', 'من أي نقطة على r إلى s', 'From any point of r to s'))}</Caption>
        </Fig>
    )
}

/* ---------- 13. A point reflected in a line ---------- */

export function ReflectionFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -1, xMax: 6, yMin: -1, yMax: 5 }
    return (
        <Fig height={260} label={t(say('P(5, 0) puntuaren simetrikoa x − 2y = 0 zuzenarekiko: perpendikularraren oina M(4, 2) da, eta P′(3, 4)', 'El simétrico de P(5, 0) respecto de x − 2y = 0: el pie de la perpendicular es M(4, 2) y P′(3, 4)', 'نظير P(5, 0) بالنسبة إلى x − 2y = 0: موقع العمود M(4, 2) والنظير P′(3, 4)', 'The reflection of P(5, 0) in x − 2y = 0: the foot of the perpendicular is M(4, 2) and P′(3, 4)'))}>
            <Frame box={box} cell={34} ox={20} oy={20}>
                {(map, clip) => (
                    <g>
                        <LineDraw map={map} a={1} b={-2} c={0} clip={clip} />
                        <Segment map={map} from={[5, 0]} to={[3, 4]} color={SECOND} width={2.4} />
                        <RightMark map={map} corner={[4, 2]} a={[5, 0]} b={[6, 3]} />
                        <Dot map={map} at={[5, 0]} name="P" dx={8} dy={-6} />
                        <Dot map={map} at={[4, 2]} name="M" color={STAGE} dx={10} dy={14} />
                        <Dot map={map} at={[3, 4]} name="P′" color={SECOND} dx={-30} dy={-6} />
                    </g>
                )}
            </Frame>
            <F x={290} y={64}>(x, y) = (5, 0) + t (1, −2)</F>
            <F x={290} y={106} color={STAGE}>M = (4, 2)</F>
            <F x={290} y={150} color={SECOND}>P′ = 2M − P = (3, 4)</F>
            <Caption y={252} x={500}>{t(say('Zuzena ispilua da: M erdiko puntua', 'La recta hace de espejo: M es el punto medio', 'المستقيم مرآة: M هي المنتصف', 'The line is a mirror: M is the midpoint'))}</Caption>
        </Fig>
    )
}

/* ---------- 14. The notable points of a triangle ---------- */

export function TrianglePointsFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: -3, xMax: 5, yMin: -2, yMax: 6 }
    const A: Point = [-2, -1]
    const B: Point = [4, -1]
    const C: Point = [1, 5]
    return (
        <Fig height={290} label={t(say('A(−2, −1), B(4, −1) eta C(1, 5) triangelua: barizentroa G(1, 1), medianen ebakidura; ortozentroa H(1, 1/2), altueren ebakidura', 'Triángulo A(−2, −1), B(4, −1), C(1, 5): baricentro G(1, 1), corte de las medianas; ortocentro H(1, 1/2), corte de las alturas', 'المثلث A(−2, −1) وB(4, −1) وC(1, 5): مركز الثقل G(1, 1) ملتقى المتوسطات، وملتقى الارتفاعات H(1, 1/2)', 'Triangle A(−2, −1), B(4, −1), C(1, 5): centroid G(1, 1), where the medians meet; orthocentre H(1, 1/2), where the altitudes meet'))}>
            <Frame box={box} cell={28} ox={20} oy={20}>
                {(map) => (
                    <g>
                        <polygon points={[A, B, C].map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
                        <Segment map={map} from={A} to={[2.5, 2]} color={GREEN} />
                        <Segment map={map} from={B} to={[-0.5, 2]} color={GREEN} />
                        <Segment map={map} from={C} to={[1, -1]} color={SECOND} width={2.2} />
                        <Segment map={map} from={A} to={[2.8, 1.4]} color={SECOND} width={2.2} />
                        <Dot map={map} at={A} name="A" dx={-20} dy={6} />
                        <Dot map={map} at={B} name="B" dx={8} dy={8} />
                        <Dot map={map} at={C} name="C" dx={8} dy={-6} />
                        <Dot map={map} at={[1, 1]} name="G" color={GREEN} dx={8} dy={-8} />
                        <Dot map={map} at={[1, 0.5]} name="H" color={SECOND} dx={8} dy={16} />
                    </g>
                )}
            </Frame>
            <F x={280} y={66} color={GREEN}>G = (A + B + C) / 3 = (1, 1)</F>
            <F x={280} y={120} color={SECOND}>H = (1, 1/2)</F>
            <Label x={280} y={170} fontSize={17} fill={GREEN}>{t(say('Berdeak: medianak', 'Verdes: medianas', 'الخضراء: المتوسطات', 'Green: medians'))}</Label>
            <Label x={280} y={198} fontSize={17} fill={SECOND}>{t(say('Gorriak: altuerak', 'Rojas: alturas', 'الحمراء: الارتفاعات', 'Red: altitudes'))}</Label>
            <Caption y={282} x={480}>{t(say('Bi zuzen ebakitzea nahikoa da', 'Basta cortar dos de sus rectas', 'يكفي تقاطع مستقيمين منها', 'Cutting two of the lines is enough'))}</Caption>
        </Fig>
    )
}

/* ---------- 15. The area of a triangle ---------- */

export function TriangleAreaFigure({ language }: { language: UnitLanguage }) {
    const t = useText(language)
    const box: PlaneBox = { xMin: 0, xMax: 8, yMin: 0, yMax: 7 }
    const A: Point = [1, 1]
    const B: Point = [7, 4]
    const C: Point = [2, 6]
    const foot: Point = [3.8, 2.4]
    return (
        <Fig height={270} label={t(say('A(1, 1), B(7, 4) eta C(2, 6) triangelua: oinarria |AB| = 3√5 eta altuera C-tik AB zuzenerako distantzia, 9/√5; azalera 27/2', 'Triángulo A(1, 1), B(7, 4), C(2, 6): base |AB| = 3√5 y altura la distancia de C a la recta AB, 9/√5; área 27/2', 'المثلث A(1, 1) وB(7, 4) وC(2, 6): القاعدة |AB| = 3√5 والارتفاع المسافة من C إلى المستقيم AB، أي 9/√5؛ والمساحة 27/2', 'Triangle A(1, 1), B(7, 4), C(2, 6): base |AB| = 3√5 and height the distance from C to the line AB, 9/√5; area 27/2'))}>
            <Frame box={box} cell={30} ox={20} oy={20}>
                {(map) => (
                    <g>
                        <polygon points={[A, B, C].map(([x, y]) => `${map.x(x)},${map.y(y)}`).join(' ')} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                        <Segment map={map} from={A} to={B} color={STAGE} width={4} dashed={false} />
                        <Segment map={map} from={C} to={foot} color={SECOND} width={3} />
                        <RightMark map={map} corner={foot} a={C} b={B} />
                        <Dot map={map} at={A} name="A" dx={-20} dy={6} />
                        <Dot map={map} at={B} name="B" dx={8} dy={6} />
                        <Dot map={map} at={C} name="C" dx={-4} dy={-12} />
                    </g>
                )}
            </Frame>
            <F x={290} y={60} color={STAGE}>|AB| = √(36 + 9) = 3√5</F>
            <F x={290} y={104} color={SECOND}>d(C, AB) = 9 / √5</F>
            <F x={290} y={160}>S = ½ · 3√5 · 9 / √5 = 27 / 2</F>
            <Caption y={262} x={500}>{t(say('Oinarria bider altuera, zati bi', 'Base por altura entre dos', 'القاعدة في الارتفاع على اثنين', 'Base times height over two'))}</Caption>
        </Fig>
    )
}

/* ---------- Hero art: a line with its normal, a distance and a triangle ---------- */

export function BachGeometryHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(20 24) rotate(-4)">
                    <rect width={250} height={210} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <line x1={20} y1={170} x2={230} y2={50} stroke="#2f6fdb" strokeWidth={4} />
                    <circle cx={160} cy={160} r={6} fill={INK} />
                    <line x1={160} y1={160} x2={130} y2={107} stroke="#c4432a" strokeWidth={3} strokeDasharray="7 5" />
                    <line x1={90} y1={130} x2={115} y2={174} stroke="#267b53" strokeWidth={4} />
                    <polygon points="121,184 108,174 120,166" fill="#267b53" />
                </g>
                <g transform="translate(296 40) rotate(5)">
                    <rect width={200} height={190} rx={16} fill={MUSTARD_TINT} stroke={INK} strokeWidth={2} />
                    <polygon points="30,160 170,160 90,30" fill="#dde7f7" stroke={INK} strokeWidth={2} />
                    <line x1={30} y1={160} x2={130} y2={95} stroke="#267b53" strokeWidth={2} strokeDasharray="5 4" />
                    <line x1={170} y1={160} x2={60} y2={95} stroke="#267b53" strokeWidth={2} strokeDasharray="5 4" />
                    <circle cx={97} cy={117} r={6} fill="#267b53" />
                </g>
                <g transform="translate(40 276) rotate(2)">
                    <rect width={440} height={86} rx={16} fill={GREEN_TINT} stroke={INK} strokeWidth={2} />
                    <text x={220} y={56} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>d = |Ax₀ + By₀ + C| / √(A² + B²)</text>
                </g>
            </svg>
        </div>
    )
}
