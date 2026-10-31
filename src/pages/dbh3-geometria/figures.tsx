import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Board } from '../dbh3-segidak/figures'

/* ==========================================================================
   Planoko geometria · 3. DBH — the two lesson figures that are new: the
   perpendicular bisector of a segment (a point on it at the same distance
   from both ends) and the bisector of an angle (a point on it at the same
   distance from both sides, measured at right angles). Every other lesson
   figure comes from 1., 2. and 4. DBH. Vertex letters and numbers are SVG
   text of their own; Arabic words go through Label.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** A segment AB, its perpendicular bisector and a point P on it with PA = PB = 5 */
export function PerpendicularBisectorFigure({ language }: { language: UnitLanguage }) {
    const A = [105, 160]
    const B = [255, 160]
    const P = [180, 60]
    return (
        <Board height={220} label={pickText(language, say('AB segmentuaren erdibitzailea; P puntua A eta B puntuetatik distantzia berera', 'Mediatriz del segmento AB; el punto P está a la misma distancia de A y de B', 'المنصّف العمودي للقطعة AB؛ النقطة P على البعد نفسه من A وB', 'Perpendicular bisector of AB; the point P is the same distance from A and B'))}>
            <line x1={180} x2={180} y1={20} y2={200} stroke={STAGE} strokeWidth={3} />
            <line x1={A[0]} x2={B[0]} y1={A[1]} y2={B[1]} stroke={INK} strokeWidth={3} />
            <path d="M180 148 h12 v12" fill="none" stroke={INK} strokeWidth={1.4} />
            <line x1={A[0]} x2={P[0]} y1={A[1]} y2={P[1]} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
            <line x1={B[0]} x2={P[0]} y1={B[1]} y2={P[1]} stroke={SECOND} strokeWidth={2} strokeDasharray="6 4" />
            {[A, B].map(([x, y], index) => <circle key={index} cx={x} cy={y} r={5} fill={INK} />)}
            <circle cx={P[0]} cy={P[1]} r={6} fill={SECOND} stroke={INK} strokeWidth={1.2} />
            <text x={A[0] - 12} y={A[1] + 22} fontSize={17} fontWeight={700} fill={INK}>A</text>
            <text x={B[0] + 2} y={B[1] + 22} fontSize={17} fontWeight={700} fill={INK}>B</text>
            <text x={P[0] + 10} y={P[1] - 8} fontSize={17} fontWeight={700} fill={SECOND}>P</text>
            <text x={130} y={104} fontSize={15} fontWeight={700} fill={SECOND} textAnchor="middle">5</text>
            <text x={230} y={104} fontSize={15} fontWeight={700} fill={SECOND} textAnchor="middle">5</text>
            <text x={142} y={182} fontSize={13} fill={MUTED} textAnchor="middle">3</text>
            <text x={218} y={182} fontSize={13} fill={MUTED} textAnchor="middle">3</text>
            <Label x={192} y={34} fontSize={13} fontWeight={700} fill={STAGE}>{pickText(language, say('erdibitzailea', 'mediatriz', 'المنصّف العمودي', 'bisector'))}</Label>
        </Board>
    )
}

/** An angle, its bisector and a point Q on it at the same distance from both sides */
export function AngleBisectorFigure({ language }: { language: UnitLanguage }) {
    const O = [40, 190]
    const angle = (degrees: number, length: number) => [O[0] + Math.cos((degrees * Math.PI) / 180) * length, O[1] - Math.sin((degrees * Math.PI) / 180) * length]
    const first = angle(0, 300)
    const second = angle(64, 190)
    const bisector = angle(32, 300)
    const Q = angle(32, 200)
    // The feet of the perpendiculars from Q to both sides
    const along = 200 * Math.cos((32 * Math.PI) / 180)
    const footFirst = angle(0, along)
    const footSecond = angle(64, along)
    return (
        <Board height={220} label={pickText(language, say('Angelu baten erdikaria; Q puntua bi aldeetatik distantzia berera', 'Bisectriz de un ángulo; el punto Q está a la misma distancia de los dos lados', 'منصّف زاوية؛ النقطة Q على البعد نفسه من الضلعين', 'Bisector of an angle; the point Q is the same distance from both sides'))}>
            <line x1={O[0]} y1={O[1]} x2={first[0]} y2={first[1]} stroke={INK} strokeWidth={3} />
            <line x1={O[0]} y1={O[1]} x2={second[0]} y2={second[1]} stroke={INK} strokeWidth={3} />
            <line x1={O[0]} y1={O[1]} x2={bisector[0]} y2={bisector[1]} stroke={STAGE} strokeWidth={3} />
            <line x1={Q[0]} y1={Q[1]} x2={footFirst[0]} y2={footFirst[1]} stroke={GREEN} strokeWidth={2.4} strokeDasharray="6 4" />
            <line x1={Q[0]} y1={Q[1]} x2={footSecond[0]} y2={footSecond[1]} stroke={GREEN} strokeWidth={2.4} strokeDasharray="6 4" />
            <path d={`M${O[0] + 46} ${O[1]} A 46 46 0 0 0 ${angle(32, 46)[0]} ${angle(32, 46)[1]}`} fill="none" stroke={SECOND} strokeWidth={2} />
            <path d={`M${angle(32, 56)[0]} ${angle(32, 56)[1]} A 56 56 0 0 0 ${angle(64, 56)[0]} ${angle(64, 56)[1]}`} fill="none" stroke={SECOND} strokeWidth={2} />
            <circle cx={Q[0]} cy={Q[1]} r={6} fill={GREEN} stroke={INK} strokeWidth={1.2} />
            <text x={Q[0] + 10} y={Q[1] - 6} fontSize={17} fontWeight={700} fill={GREEN}>Q</text>
            <text x={O[0] - 8} y={O[1] + 22} fontSize={17} fontWeight={700} fill={INK}>O</text>
            <Label x={bisector[0] - 6} y={bisector[1] + 22} fontSize={13} fontWeight={700} fill={STAGE} textAnchor="end">{pickText(language, say('erdikaria', 'bisectriz', 'المنصّف', 'bisector'))}</Label>
        </Board>
    )
}
