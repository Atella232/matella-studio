import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Label } from '../dbh2-funtzioak-v2/plane'
import { Board } from '../dbh3-segidak/figures'

/* ==========================================================================
   Ekuazioak eta sistemak · 3. DBH — the one lesson figure that is new: two
   ages as bars, now and four years later. The years are added to both
   bars, which is the mistake the ages lesson is about. Every other lesson
   figure comes from 1. and 2. DBH and 4. DBH aplikatuak.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const SECOND_TINT = '#f6d5cc'

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })

/** Ages as bars: the son (x) and the mother (x + 28), now and in four years */
export function AgesFigure({ language }: { language: UnitLanguage }) {
    const scale = 5.4
    const rows = [
        { y: 28, title: say('Orain', 'Ahora', 'الآن', 'Now'), son: 10, mother: 38 },
        { y: 124, title: say('4 urte barru', 'Dentro de 4 años', 'بعد 4 سنوات', 'In 4 years'), son: 14, mother: 42 }
    ]
    return (
        <Board height={236} label={pickText(language, say('Semea x eta ama x + 28; 4 urte barru x + 4 eta x + 32', 'Hijo x y madre x + 28; dentro de 4 años x + 4 y x + 32', 'الابن x والأم x + 28؛ بعد 4 سنوات x + 4 وx + 32', 'Son x and mother x + 28; in 4 years x + 4 and x + 32'))}>
            {rows.map((row, index) => (
                <g key={index}>
                    <Label x={14} y={row.y} fontSize={14} fontWeight={700} fill={MUTED}>{pickText(language, row.title)}</Label>
                    <rect x={14} y={row.y + 10} width={row.son * scale} height={22} rx={5} fill={STAGE_TINT} stroke={STAGE} strokeWidth={2} />
                    <text x={22 + row.son * scale} y={row.y + 27} fontSize={15} fontWeight={700} fill={STAGE}>{index === 0 ? 'x = 10' : 'x + 4 = 14'}</text>
                    <rect x={14} y={row.y + 40} width={row.mother * scale} height={22} rx={5} fill={SECOND_TINT} stroke={SECOND} strokeWidth={2} />
                    <text x={22 + row.mother * scale} y={row.y + 57} fontSize={15} fontWeight={700} fill={SECOND}>{index === 0 ? 'x + 28 = 38' : 'x + 32 = 42'}</text>
                    {index === 1 && (
                        <>
                            <rect x={14 + 10 * scale} y={row.y + 10} width={4 * scale} height={22} fill={STAGE} opacity={0.35} />
                            <rect x={14 + 38 * scale} y={row.y + 40} width={4 * scale} height={22} fill={SECOND} opacity={0.35} />
                        </>
                    )}
                </g>
            ))}
            <text x={180} y={226} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>42 = 3 · 14</text>
        </Board>
    )
}
