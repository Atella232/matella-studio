import { useId, useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { toNumber } from '../../../features/unit-v2/math/fraction'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { groupDigits } from '../../../utils/numberFormat'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Hidden, PlayButton, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { dec, GREEN, INK, MUSTARD, MUSTARD_TINT, MUTED, PAPER, SECOND, SECOND_TINT, STAGE, STAGE_TINT, texDec } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { CAUSES_LIMITS, causesChallenges, causesExtra, causesPrediction, initialCausesState, pathsOf, posteriorOf, setEditingCause, setRate, setShare, thousandthsLatex, totalOf, type CausesState } from './causes'
import { initialPaintState, namesOf, PAINT_TARGETS, paintChallenges, paintExtra, paintPrediction, sameZones, setTarget, toggleZone, ZONES, type PaintState, type Zone } from './events'
import { aGivenB, bOf, initialMosaicState, isIndependent, MOSAIC_LIMITS, mosaicChallenges, mosaicExtra, mosaicPrediction, piecesOf, setMosaic, type MosaicState } from './mosaic'
import { countsOf, illGivenPositive, initialPeopleState, PEOPLE_LIMITS, peopleChallenges, peopleExtra, peoplePrediction, setPeople, type PeopleState } from './people'
import { hundredthsLatex, probLatex, say, tenthsLatex } from './probability'
import { initialZonesState, unionOf, ZONES_STEP, zonesChallenges, zonesExtra, zonesOf, zonesPrediction, setZones, type ZonesState } from './zones'

/* ==========================================================================
   Probabilitatea · Batxilergoa 2 · Zientziak — the five tools of this
   unit: paint the event (the four zones of a Venn diagram), the four
   zones with probabilities, the probability square (two cuts that show
   the multiplication rule and independence), the causes in the square
   (total probability and Bayes as areas) and 10 000 people (a diagnostic
   test). Each asks for a prediction before it shows the result; the
   square and the causes move with ▶. Logic in events.ts, zones.ts,
   mosaic.ts, causes.ts and people.ts.
   ========================================================================== */

/** The readout formulas in a language: Arabic writes the decimal point */
const inLanguage = (latex: string[], language: UnitLanguage) => (language === 'ar' ? latex.map((line) => line.replace(/\{,\}/g, '.')) : latex)

/** A percentage as each language writes it: % 5 in Basque, 5 % in Spanish, 5% in English, 5٪ in Arabic */
function pct(value: number, language: UnitLanguage): string {
    const number = dec(value, language, 1)
    if (language === 'eu') return `% ${number}`
    if (language === 'en') return `${number}%`
    if (language === 'ar') return `${number}٪`
    return `${number} %`
}

/* ---------- The Venn diagram shared by the first two tools ---------- */

const VENN = { a: { x: 130, y: 112 }, b: { x: 230, y: 112 }, r: 84, box: { x: 10, y: 10, width: 340, height: 204 } }
const half = VENN.b.x - VENN.a.x
const rise = Math.sqrt(VENN.r ** 2 - (half / 2) ** 2)
const top = { x: (VENN.a.x + VENN.b.x) / 2, y: VENN.a.y - rise }
const bottom = { x: top.x, y: VENN.a.y + rise }
const r = VENN.r
const ZONE_PATHS: Record<Zone, string> = {
    both: `M ${top.x} ${top.y} A ${r} ${r} 0 0 1 ${bottom.x} ${bottom.y} A ${r} ${r} 0 0 1 ${top.x} ${top.y} Z`,
    onlyA: `M ${top.x} ${top.y} A ${r} ${r} 0 1 0 ${bottom.x} ${bottom.y} A ${r} ${r} 0 0 1 ${top.x} ${top.y} Z`,
    onlyB: `M ${top.x} ${top.y} A ${r} ${r} 0 1 1 ${bottom.x} ${bottom.y} A ${r} ${r} 0 0 0 ${top.x} ${top.y} Z`,
    none: `M ${VENN.box.x} ${VENN.box.y} h ${VENN.box.width} v ${VENN.box.height} h ${-VENN.box.width} Z M ${top.x} ${top.y} A ${r} ${r} 0 1 0 ${bottom.x} ${bottom.y} A ${r} ${r} 0 1 0 ${top.x} ${top.y} Z`
}
/** Where the number or the label of each zone goes */
const ZONE_SPOTS: Record<Zone, { x: number; y: number }> = {
    onlyA: { x: 88, y: 118 },
    both: { x: 180, y: 118 },
    onlyB: { x: 272, y: 118 },
    none: { x: 318, y: 200 }
}
const ZONE_NAMES: Record<Zone, ReturnType<typeof say>> = {
    onlyA: say('A bakarrik', 'Solo A', 'A وحده', 'Only A'),
    both: say('A eta B', 'A y B', 'A وB', 'A and B'),
    onlyB: say('B bakarrik', 'Solo B', 'B وحده', 'Only B'),
    none: say('Bat ere ez', 'Ninguno', 'لا أحد', 'Neither')
}

function VennOutline() {
    return (
        <g pointerEvents="none">
            <rect x={VENN.box.x} y={VENN.box.y} width={VENN.box.width} height={VENN.box.height} rx={12} fill="none" stroke={INK} strokeWidth={2} />
            <circle cx={VENN.a.x} cy={VENN.a.y} r={r} fill="none" stroke={STAGE} strokeWidth={2.4} />
            <circle cx={VENN.b.x} cy={VENN.b.y} r={r} fill="none" stroke={SECOND} strokeWidth={2.4} />
            <text x={VENN.a.x - r * 0.72} y={VENN.a.y - r * 0.74} textAnchor="middle" fontSize={18} fontWeight={700} fill={STAGE}>A</text>
            <text x={VENN.b.x + r * 0.72} y={VENN.b.y - r * 0.74} textAnchor="middle" fontSize={18} fontWeight={700} fill={SECOND}>B</text>
            <text x={24} y={34} fontSize={15} fontWeight={700} fill={MUTED}>E</text>
        </g>
    )
}

/* ---------- L1. Paint the event ---------- */

export function PaintTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const labelId = useId()
    const [state, setState] = useState<PaintState>(initialPaintState)
    const target = PAINT_TARGETS[state.target]
    const names = namesOf(state.painted)
    const done = sameZones(state.painted, target.zones)
    const controls = (
        <>
            <Stepper label={l(say('Gertaera', 'Suceso', 'الحدث', 'Event'))} value={state.target} min={0} max={PAINT_TARGETS.length - 1} format={(index) => `${index + 1} / ${PAINT_TARGETS.length}`} onChange={(target) => setState((s) => setTarget(s, target))} language={props.language} />
            <div className="fraction-v2-segmented" role="group" aria-labelledby={labelId}>
                <span id={labelId} className="fraction-v2-stepper-label">{l(say('Margotu zonak', 'Pinta las zonas', 'لوّن المناطق', 'Paint the zones'))}</span>
                <div>
                    {ZONES.map((zone, index) => (
                        <button type="button" key={zone} aria-pressed={state.painted[index]} onClick={() => setState((s) => toggleZone(s, zone))}>{l(ZONE_NAMES[zone])}</button>
                    ))}
                </div>
            </div>
        </>
    )
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: zenbat zona ditu $${target.latex}$ gertaerak?`, `Antes de verlo: ¿cuántas zonas ocupa $${target.latex}$?`, `قبل أن ترى: كم منطقة يشغل $${target.latex}$؟`, `Before you see it: how many zones does $${target.latex}$ take?`)}
            labels={{ '<': say('Zona 1', '1 zona', 'منطقة واحدة', '1 zone'), '=': say('2 zona', '2 zonas', 'منطقتان', '2 zones'), '>': say('3 zona', '3 zonas', '3 مناطق', '3 zones') }}
            actual={paintPrediction(state)}
            choice={state.prediction}
            tip={say('Zona bakoitzean galdetu: gertaera hor gertatzen da?', 'En cada zona, pregúntate: ¿ocurre ahí el suceso?', 'في كل منطقة اسأل: هل يقع الحدث هناك؟', 'For each zone, ask: does the event happen there?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout
                latex={names.map((name) => name.latex).join('=')}
                note={l(done
                    ? say(`Bai: hori da $${target.latex}$.`, `Sí: eso es $${target.latex}$.`, `نعم: هذا هو $${target.latex}$.`, `Yes: that is $${target.latex}$.`)
                    : say(`Margotutakoa ez da oraindik $${target.latex}$.`, `Lo pintado todavía no es $${target.latex}$.`, `الملوَّن ليس بعدُ $${target.latex}$.`, `What is painted is not yet $${target.latex}$.`))}
            />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={paintChallenges} extraChallenges={paintExtra} state={state}>
            <p style={{ textAlign: 'center', margin: '0 0 6px', fontSize: 20 }}><MathText text={l(say(`Margotu: $${target.latex}$`, `Pinta: $${target.latex}$`, `لوّن: $${target.latex}$`, `Paint: $${target.latex}$`))} /></p>
            <Board height={224} label={l(say('Venn diagrama baten lau zonak', 'Las cuatro zonas de un diagrama de Venn', 'المناطق الأربع لمخطط فن', 'The four zones of a Venn diagram'))}>
                {ZONES.map((zone, index) => (
                    <path
                        key={zone}
                        d={ZONE_PATHS[zone]}
                        fillRule="evenodd"
                        fill={state.painted[index] ? SECOND : zone === 'none' ? PAPER : STAGE_TINT}
                        fillOpacity={state.painted[index] ? 0.5 : 1}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setState((s) => toggleZone(s, zone))}
                    />
                ))}
                <VennOutline />
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2. The four zones ---------- */

const ZONE_COLOURS = [STAGE, SECOND, MUSTARD, MUTED]

export function ZonesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<ZonesState>(initialZonesState)
    const shown = state.prediction !== null
    const zones = zonesOf(state)
    const format = (value: number) => dec(value / 100, props.language, 2)
    const controls = (
        <>
            <Stepper label="P(A)" value={state.a} min={0} max={100} step={ZONES_STEP} format={format} onChange={(a) => setState((s) => setZones(s, { a }))} language={props.language} />
            <Stepper label="P(B)" value={state.b} min={0} max={100} step={ZONES_STEP} format={format} onChange={(b) => setState((s) => setZones(s, { b }))} language={props.language} />
            <Stepper label="P(A ∩ B)" value={state.both} min={0} max={100} step={ZONES_STEP} format={format} onChange={(both) => setState((s) => setZones(s, { both }))} language={props.language} />
        </>
    )
    const h = hundredthsLatex
    const latex = [`P(A\\cup B)=${h(unionOf(state))}`, `P(A-B)=${h(zones[0])}`, `P(B-A)=${h(zones[2])}`, `P(\\overline{A}\\cap\\overline{B})=${h(zones[3])}`]
    const sum = `$${h(state.a)}+${h(state.b)}-${h(state.both)}=${h(unionOf(state))}$`
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $P(A\\cup B)$ txikiagoa, berdina ala handiagoa da $P(A)+P(B)$ baino?', 'Antes de verlo: ¿$P(A\\cup B)$ es menor, igual o mayor que $P(A)+P(B)$?', 'قبل أن ترى: هل $P(A\\cup B)$ أصغر من $P(A)+P(B)$ أم يساويه أم أكبر؟', 'Before you see it: is $P(A\\cup B)$ less than, equal to or greater than $P(A)+P(B)$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={zonesPrediction(state)}
            choice={state.prediction}
            tip={say('Zona komuna bi aldiz zenbatzen da $P(A)+P(B)$ batuketan: behin kendu behar da.', 'La zona común se cuenta dos veces en $P(A)+P(B)$: hay que restarla una vez.', 'تُحسب المنطقة المشتركة مرتين في $P(A)+P(B)$: يجب طرحها مرة.', 'The common zone is counted twice in $P(A)+P(B)$: subtract it once.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(state.both === 0
                ? say(`Bateraezinak: zona komunik ez, eta bildura batura da, ${sum}.`, `Incompatibles: no hay zona común y la unión es la suma, ${sum}.`, `متنافيان: لا منطقة مشتركة والاتحاد هو المجموع، ${sum}.`, `Mutually exclusive: no common zone, and the union is the sum, ${sum}.`)
                : say(`Zona komuna behin kentzen da: ${sum}. Lau zonek 1 batzen dute.`, `La zona común se resta una vez: ${sum}. Las cuatro zonas suman 1.`, `تُطرح المنطقة المشتركة مرة: ${sum}. ومجموع المناطق الأربع 1.`, `The common zone is subtracted once: ${sum}. The four zones add up to 1.`))} />
        </Predict>
    )
    const starts = zones.map((_, index) => 20 + (zones.slice(0, index).reduce((sum, value) => sum + value, 0) / 100) * 320)
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={zonesChallenges} extraChallenges={zonesExtra} state={state}>
            <Board height={290} label={l(say('Lau zonak probabilitateekin', 'Las cuatro zonas con probabilidades', 'المناطق الأربع بالاحتمالات', 'The four zones with probabilities'))}>
                {ZONES.map((zone) => <path key={zone} d={ZONE_PATHS[zone]} fillRule="evenodd" fill={zone === 'none' ? PAPER : zone === 'both' ? SECOND_TINT : STAGE_TINT} />)}
                <VennOutline />
                {ZONES.map((zone, index) => (
                    zone === 'none' && !shown
                        ? <Hidden key={zone} x={ZONE_SPOTS.none.x} y={ZONE_SPOTS.none.y} size={22} />
                        : <text key={zone} x={ZONE_SPOTS[zone].x} y={ZONE_SPOTS[zone].y} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK}>{format(zones[index])}</text>
                ))}
                {zones.map((value, index) => {
                    const width = (value / 100) * 320
                    const x = starts[index]
                    return (
                        <g key={index}>
                            <rect x={x} y={232} width={width} height={34} fill={ZONE_COLOURS[index]} fillOpacity={index === 3 && !shown ? 0.08 : 0.3} stroke={INK} strokeWidth={1.2} />
                            {width >= 34 && (index < 3 || shown) && <text x={x + width / 2} y={254} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{format(value)}</text>}
                        </g>
                    )
                })}
                <text x={20} y={284} fontSize={12} fill={MUTED}>0</text>
                <text x={340} y={284} textAnchor="end" fontSize={12} fill={MUTED}>1</text>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L3. The probability square ---------- */

const SQUARE = { x: 40, y: 22, side: 270 }

export function MosaicTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<MosaicState>(initialMosaicState)
    const shown = state.prediction !== null
    const key = `${state.a}-${state.bGivenA}-${state.bGivenNotA}`
    const playback = usePlayback(key, 1800)
    const join = !shown ? 0 : playback.progress ?? 0
    const pieces = piecesOf(state)
    const b = bOf(state)
    const value = aGivenB(state)
    const split = SQUARE.x + (SQUARE.side * state.a) / 10
    const bottom = SQUARE.y + SQUARE.side
    const heightA = (SQUARE.side * state.bGivenA) / 10
    const heightNotA = (SQUARE.side * state.bGivenNotA) / 10
    // ▶ «Join B»: the two pieces of B leave the square and line up as one bar, P(B), split into A and Ā
    const bar = { y: 318, height: 26 }
    const lerp = (from: number, to: number) => from + (to - from) * join
    const pieceA = { x: lerp(SQUARE.x, SQUARE.x), y: lerp(bottom - heightA, bar.y), width: lerp(split - SQUARE.x, (SQUARE.side * pieces[0]) / 100), height: lerp(heightA, bar.height) }
    const pieceNotA = { x: lerp(split, SQUARE.x + (SQUARE.side * pieces[0]) / 100), y: lerp(bottom - heightNotA, bar.y), width: lerp(SQUARE.x + SQUARE.side - split, (SQUARE.side * pieces[2]) / 100), height: lerp(heightNotA, bar.height) }
    const format = (tenths: number) => dec(tenths / 10, props.language, 1)
    const controls = (
        <>
            <Stepper label="P(A)" value={state.a} min={MOSAIC_LIMITS.a.min} max={MOSAIC_LIMITS.a.max} format={format} onChange={(a) => setState((s) => setMosaic(s, { a }))} language={props.language} />
            <Stepper label="P(B / A)" value={state.bGivenA} min={MOSAIC_LIMITS.cut.min} max={MOSAIC_LIMITS.cut.max} format={format} onChange={(bGivenA) => setState((s) => setMosaic(s, { bGivenA }))} language={props.language} />
            <Stepper label="P(B / Ā)" value={state.bGivenNotA} min={MOSAIC_LIMITS.cut.min} max={MOSAIC_LIMITS.cut.max} format={format} onChange={(bGivenNotA) => setState((s) => setMosaic(s, { bGivenNotA }))} language={props.language} />
        </>
    )
    const latex = [
        `P(A\\cap B)=${hundredthsLatex(pieces[0])}`,
        `P(B)=${hundredthsLatex(b)}`,
        ...(value === null ? [] : [`P(A/B)=\\frac{${hundredthsLatex(pieces[0])}}{${hundredthsLatex(b)}}=${probLatex(value)}`])
    ]
    const product = `$${tenthsLatex(state.a)}\\cdot ${tenthsLatex(state.bGivenA)}=${hundredthsLatex(pieces[0])}$`
    const verdict = value === null
        ? say('$B$ ezinezkoa da: ezin da $B$ gertaeraren gainean baldintzatu.', '$B$ es imposible: no se puede condicionar a $B$.', '$B$ مستحيل: لا يمكن الاشتراط على $B$.', '$B$ is impossible: you cannot condition on $B$.')
        : isIndependent(state)
            ? say('Mozketak altuera berean: $A$ eta $B$ independenteak dira, eta $P(A/B)=P(A)$.', 'Cortes a la misma altura: $A$ y $B$ son independientes, y $P(A/B)=P(A)$.', 'الخطّان على الارتفاع نفسه: $A$ و$B$ مستقلان، و$P(A/B)=P(A)$.', 'Cuts at the same height: $A$ and $B$ are independent, and $P(A/B)=P(A)$.')
            : say('Mozketak altuera desberdinetan: $B$ jakiteak $A$ aldatzen du; ez dira independenteak.', 'Cortes a distinta altura: saber $B$ cambia $A$; no son independientes.', 'الخطّان على ارتفاعين مختلفين: معرفة $B$ تغيّر $A$؛ ليسا مستقلين.', 'Cuts at different heights: knowing $B$ changes $A$; they are not independent.')
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $P(A/B)$ txikiagoa, berdina ala handiagoa da $P(A)$ baino?', 'Antes de verlo: ¿$P(A/B)$ es menor, igual o mayor que $P(A)$?', 'قبل أن ترى: هل $P(A/B)$ أصغر من $P(A)$ أم يساويه أم أكبر؟', 'Before you see it: is $P(A/B)$ less than, equal to or greater than $P(A)$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={mosaicPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu bi mozketak: $B$ gehiago dago $A$ zerrendan ala $\\overline{A}$ zerrendan?', 'Compara los dos cortes: ¿hay más $B$ en la franja $A$ o en la $\\overline{A}$?', 'قارن الخطّين: هل يوجد $B$ أكثر في شريط $A$ أم في شريط $\\overline{A}$؟', 'Compare the two cuts: is there more $B$ in strip $A$ or in strip $\\overline{A}$?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={`${l(say(`Biderkaduraren erregela: ${product}.`, `Regla del producto: ${product}.`, `قاعدة الضرب: ${product}.`, `Multiplication rule: ${product}.`))} ${l(verdict)}`} />
        </Predict>
    )
    const pieceText = (x: number, y: number, hundredths: number, show: boolean) => show && <text x={x} y={y} textAnchor="middle" fontSize={14} fontWeight={700} fill={INK}>{dec(hundredths / 100, props.language, 2)}</text>
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={mosaicChallenges} extraChallenges={mosaicExtra} state={state}>
            <Board height={352} label={l(say('Probabilitatearen karratua', 'El cuadrado de probabilidad', 'مربع الاحتمال', 'The probability square'))}>
                <rect x={SQUARE.x} y={SQUARE.y} width={SQUARE.side} height={SQUARE.side} fill={PAPER} stroke={INK} strokeWidth={2} />
                <rect x={SQUARE.x} y={SQUARE.y} width={split - SQUARE.x} height={SQUARE.side} fill={STAGE_TINT} fillOpacity={1 - join * 0.6} />
                <rect x={pieceA.x} y={pieceA.y} width={Math.max(0, pieceA.width)} height={Math.max(0, pieceA.height)} fill={SECOND} fillOpacity={0.45} stroke={SECOND} strokeWidth={1.4} />
                <rect x={pieceNotA.x} y={pieceNotA.y} width={Math.max(0, pieceNotA.width)} height={Math.max(0, pieceNotA.height)} fill={MUSTARD} fillOpacity={0.45} stroke={MUSTARD} strokeWidth={1.4} />
                <line x1={split} y1={SQUARE.y} x2={split} y2={bottom} stroke={INK} strokeWidth={2.2} />
                {join === 0 && <line x1={SQUARE.x} y1={bottom - heightA} x2={split} y2={bottom - heightA} stroke={SECOND} strokeWidth={2.4} strokeDasharray={isIndependent(state) ? '7 4' : undefined} />}
                {join === 0 && <line x1={split} y1={bottom - heightNotA} x2={SQUARE.x + SQUARE.side} y2={bottom - heightNotA} stroke={MUSTARD} strokeWidth={2.4} strokeDasharray={isIndependent(state) ? '7 4' : undefined} />}
                <rect x={SQUARE.x} y={SQUARE.y} width={SQUARE.side} height={SQUARE.side} fill="none" stroke={INK} strokeWidth={2} />
                <text x={(SQUARE.x + split) / 2} y={16} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>A</text>
                <text x={(split + SQUARE.x + SQUARE.side) / 2} y={16} textAnchor="middle" fontSize={15} fontWeight={700} fill={MUTED}>Ā</text>
                <text x={SQUARE.x + SQUARE.side + 10} y={bottom - Math.max(heightA, heightNotA) / 2 + 5} fontSize={15} fontWeight={700} fill={SECOND}>B</text>
                {join === 0 && pieceText((SQUARE.x + split) / 2, bottom - heightA / 2 + 5, pieces[0], heightA >= 22 && split - SQUARE.x >= 40)}
                {join === 0 && pieceText((SQUARE.x + split) / 2, SQUARE.y + (SQUARE.side - heightA) / 2 + 5, pieces[1], SQUARE.side - heightA >= 22 && split - SQUARE.x >= 40)}
                {join === 0 && pieceText((split + SQUARE.x + SQUARE.side) / 2, bottom - heightNotA / 2 + 5, pieces[2], heightNotA >= 22 && SQUARE.x + SQUARE.side - split >= 40)}
                {join === 0 && pieceText((split + SQUARE.x + SQUARE.side) / 2, SQUARE.y + (SQUARE.side - heightNotA) / 2 + 5, pieces[3], SQUARE.side - heightNotA >= 22 && SQUARE.x + SQUARE.side - split >= 40)}
                {join === 1 && b > 0 && <text x={SQUARE.x + (SQUARE.side * b) / 200} y={bar.y + bar.height + 2 + 14} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>P(B) = {dec(b / 100, props.language, 2)}</text>}
                {!shown && <Hidden x={SQUARE.x + SQUARE.side / 2} y={bar.y + 20} size={24} />}
            </Board>
            <PlayButton label={l(say('Bildu B', 'Junta B', 'اجمع B', 'Gather B'))} disabled={!shown || b === 0} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L4. The causes in the square ---------- */

const CAUSE_NAMES = ['A₁', 'A₂', 'A₃'] as const
const CAUSE_COLOURS = [STAGE, SECOND, MUSTARD] as const
const CAUSE_TINTS = [STAGE_TINT, SECOND_TINT, MUSTARD_TINT] as const
const FIELD = { x: 30, y: 26, width: 300, height: 230 }

export function CausesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CausesState>(initialCausesState)
    const shown = state.prediction !== null
    const key = `${state.shares.join('-')}|${state.rates.join('-')}`
    const playback = usePlayback(key, 1800)
    const join = !shown ? 0 : playback.progress ?? 0
    const paths = pathsOf(state)
    const total = totalOf(state)
    const bar = { y: 300, height: 26 }
    const before = (values: number[], index: number) => values.slice(0, index).reduce((sum, value) => sum + value, 0)
    const strips = state.shares.map((share, index) => ({
        x: FIELD.x + (FIELD.width * before(state.shares, index)) / 10,
        width: (FIELD.width * share) / 10,
        painted: (FIELD.height * state.rates[index]) / 100,
        barX: FIELD.x + (total === 0 ? 0 : (FIELD.width * before(paths, index)) / total),
        barWidth: total === 0 ? 0 : (FIELD.width * paths[index]) / total
    }))
    const lerp = (from: number, to: number) => from + (to - from) * join
    const percent = (value: number) => pct(value, props.language)
    const controls = (
        <>
            <Stepper label="P(A₁)" value={state.shares[0]} min={CAUSES_LIMITS.share.min} max={CAUSES_LIMITS.share.max} format={(value) => dec(value / 10, props.language, 1)} onChange={(share) => setState((s) => setShare(s, 0, share))} language={props.language} />
            <Stepper label="P(A₂)" value={state.shares[1]} min={CAUSES_LIMITS.share.min} max={CAUSES_LIMITS.share.max} format={(value) => dec(value / 10, props.language, 1)} onChange={(share) => setState((s) => setShare(s, 1, share))} language={props.language} />
            <Segmented<string> label={l(say('Kausa', 'Causa', 'السبب', 'Cause'))} value={String(state.editing)} options={CAUSE_NAMES.map((name, index) => ({ value: String(index), label: name }))} onChange={(value) => setState((s) => setEditingCause(s, Number(value) as 0 | 1 | 2))} />
            <Stepper label={`P(D / ${CAUSE_NAMES[state.editing]})`} value={state.rates[state.editing]} min={CAUSES_LIMITS.rate.min} max={CAUSES_LIMITS.rate.max} format={percent} onChange={(rate) => setState((s) => setRate(s, s.editing, rate))} language={props.language} />
        </>
    )
    const names = ['A_1', 'A_2', 'A_3']
    const latex = [`P(D)=${thousandthsLatex(total)}`, ...(total === 0 ? [] : names.map((name, index) => `P(${name}/D)=${probLatex(posteriorOf(state, index)!)}`))]
    const path = `$${tenthsLatex(state.shares[state.editing])}\\cdot ${probLatex({ numerator: state.rates[state.editing], denominator: 100 })}=${thousandthsLatex(paths[state.editing])}$`
    const sum = `$${paths.map((value) => thousandthsLatex(value)).join('+')}$`
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $D$ jakinda, zein da kausarik probableena?', 'Antes de verlo: sabiendo $D$, ¿cuál es la causa más probable?', 'قبل أن ترى: مع العلم بـ $D$، ما السبب الأرجح؟', 'Before you see it: given $D$, which is the likeliest cause?')}
            labels={{ '<': say('A₁', 'A₁', 'A₁', 'A₁'), '=': say('A₂', 'A₂', 'A₂', 'A₂'), '>': say('A₃', 'A₃', 'A₃', 'A₃') }}
            actual={causesPrediction(state)}
            choice={state.prediction}
            tip={say('Ez begiratu akats-tasari bakarrik: zerrendaren zabalera bider margotutako altuera.', 'No mires solo la tasa de fallo: el ancho de la franja por la altura pintada.', 'لا تنظر إلى نسبة الخطأ وحدها: عرض الشريط في الارتفاع الملوَّن.', 'Do not look at the failure rate alone: the width of the strip times the painted height.')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(total === 0
                ? say('$D$ ezinezkoa da: ez dago a posteriori probabilitaterik.', '$D$ es imposible: no hay probabilidades a posteriori.', '$D$ مستحيل: لا احتمالات بعدية.', '$D$ is impossible: there are no posterior probabilities.')
                : say(`${CAUSE_NAMES[state.editing]} bidea: ${path}. $P(D)$ bideen batura da, ${sum}; Bayes: bide bakoitza zati $P(D)$.`, `Camino de ${CAUSE_NAMES[state.editing]}: ${path}. $P(D)$ es la suma de los caminos, ${sum}; Bayes: cada camino entre $P(D)$.`, `مسار ${CAUSE_NAMES[state.editing]}: ${path}. و$P(D)$ مجموع المسارات ${sum}؛ وبايز: كل مسار على $P(D)$.`, `Path of ${CAUSE_NAMES[state.editing]}: ${path}. $P(D)$ is the sum of the paths, ${sum}; Bayes: each path over $P(D)$.`))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={causesChallenges} extraChallenges={causesExtra} state={state}>
            <Board height={350} label={l(say('Hiru kausa karratu batean', 'Tres causas en un cuadrado', 'ثلاثة أسباب في مربع', 'Three causes in a square'))}>
                {strips.map((strip, index) => (
                    <g key={index}>
                        <rect x={strip.x} y={FIELD.y} width={strip.width} height={FIELD.height} fill={CAUSE_TINTS[index]} fillOpacity={0.5 - join * 0.3} stroke={INK} strokeWidth={1.6} />
                        <text x={strip.x + strip.width / 2} y={18} textAnchor="middle" fontSize={15} fontWeight={700} fill={CAUSE_COLOURS[index]}>{CAUSE_NAMES[index]}</text>
                        {strip.width >= 44 && join === 0 && <text x={strip.x + strip.width / 2} y={FIELD.y + 22} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{percent(state.rates[index])}</text>}
                        <rect
                            x={lerp(strip.x, strip.barX)}
                            y={lerp(FIELD.y + FIELD.height - strip.painted, bar.y)}
                            width={Math.max(0, lerp(strip.width, strip.barWidth))}
                            height={Math.max(0, lerp(strip.painted, bar.height))}
                            fill={CAUSE_COLOURS[index]}
                            fillOpacity={0.55}
                            stroke={CAUSE_COLOURS[index]}
                            strokeWidth={1.4}
                        />
                    </g>
                ))}
                <rect x={FIELD.x} y={FIELD.y} width={FIELD.width} height={FIELD.height} fill="none" stroke={INK} strokeWidth={2} />
                <text x={FIELD.x + FIELD.width + 8} y={FIELD.y + FIELD.height - 4} fontSize={15} fontWeight={700} fill={SECOND}>D</text>
                {join === 1 && total > 0 && strips.map((strip, index) => strip.barWidth >= 26 && <text key={index} x={strip.barX + strip.barWidth / 2} y={bar.y + 18} textAnchor="middle" fontSize={13} fontWeight={700} fill={INK}>{CAUSE_NAMES[index]}</text>)}
                {join === 1 && total > 0 && <text x={FIELD.x + FIELD.width / 2} y={bar.y + bar.height + 18} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>P(D) = {dec(total / 1000, props.language, 3)}</text>}
                {!shown && <Hidden x={FIELD.x + FIELD.width / 2} y={bar.y + 22} size={24} />}
            </Board>
            <PlayButton label={l(say('Bildu margotutakoa', 'Junta lo pintado', 'اجمع الملوَّن', 'Gather the painted parts'))} disabled={!shown || total === 0} playing={playback.playing} onPlay={playback.play} />
        </ToolFrame>
    )
}

/* ---------- L5. 10 000 people ---------- */

const GRID = { x: 30, y: 10, cell: 3, side: 100 }
const PEOPLE_COLOURS = { truePositive: SECOND, falseNegative: SECOND_TINT, falsePositive: MUSTARD, trueNegative: '#e7e2d8' }

/** The rectangles that draw the cells from start to end (row by row): at most three */
function runRects(start: number, end: number): Array<{ x: number; y: number; width: number; height: number }> {
    const rects: Array<{ x: number; y: number; width: number; height: number }> = []
    let at = start
    while (at < end) {
        const row = Math.floor(at / GRID.side)
        const column = at % GRID.side
        if (column === 0 && end - at >= GRID.side) {
            const rows = Math.floor((end - at) / GRID.side)
            rects.push({ x: GRID.x, y: GRID.y + row * GRID.cell, width: GRID.side * GRID.cell, height: rows * GRID.cell })
            at += rows * GRID.side
            continue
        }
        const count = Math.min(GRID.side - column, end - at)
        rects.push({ x: GRID.x + column * GRID.cell, y: GRID.y + row * GRID.cell, width: count * GRID.cell, height: GRID.cell })
        at += count
    }
    return rects
}

export function PeopleTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PeopleState>(initialPeopleState)
    const shown = state.prediction !== null
    const counts = countsOf(state)
    const value = illGivenPositive(state)
    const g = (count: number) => groupDigits(count, props.language)
    const percent = (number: number) => pct(number, props.language)
    const controls = (
        <>
            <Stepper label="P(E)" value={state.prevalence} min={PEOPLE_LIMITS.prevalence.min} max={PEOPLE_LIMITS.prevalence.max} format={percent} onChange={(prevalence) => setState((s) => setPeople(s, { prevalence }))} language={props.language} />
            <Stepper label="P(+ / E)" value={state.sensitivity} min={PEOPLE_LIMITS.sensitivity.min} max={PEOPLE_LIMITS.sensitivity.max} format={percent} onChange={(sensitivity) => setState((s) => setPeople(s, { sensitivity }))} language={props.language} />
            <Stepper label="P(+ / Ē)" value={state.falsePositive} min={PEOPLE_LIMITS.falsePositive.min} max={PEOPLE_LIMITS.falsePositive.max} format={percent} onChange={(falsePositive) => setState((s) => setPeople(s, { falsePositive }))} language={props.language} />
        </>
    )
    // Before the prediction the ill and the healthy are shown, not yet the result of the test
    const groups = shown
        ? [
            { count: counts.truePositive, colour: PEOPLE_COLOURS.truePositive },
            { count: counts.falseNegative, colour: PEOPLE_COLOURS.falseNegative },
            { count: counts.falsePositive, colour: PEOPLE_COLOURS.falsePositive },
            { count: counts.trueNegative, colour: PEOPLE_COLOURS.trueNegative }
        ]
        : [
            { count: counts.ill, colour: SECOND_TINT },
            { count: counts.falsePositive + counts.trueNegative, colour: PEOPLE_COLOURS.trueNegative }
        ]
    let start = 0
    const runs = groups.map((group) => {
        const run = { ...group, rects: runRects(start, start + group.count) }
        start += group.count
        return run
    })
    const legend = [
        { colour: PEOPLE_COLOURS.truePositive, text: say(`Gaixo eta positibo: ${g(counts.truePositive)}`, `Enfermos y positivo: ${g(counts.truePositive)}`, `مرضى وإيجابي: ${g(counts.truePositive)}`, `Ill and positive: ${g(counts.truePositive)}`) },
        { colour: PEOPLE_COLOURS.falsePositive, text: say(`Osasuntsu eta positibo: ${g(counts.falsePositive)}`, `Sanos y positivo: ${g(counts.falsePositive)}`, `أصحاء وإيجابي: ${g(counts.falsePositive)}`, `Healthy and positive: ${g(counts.falsePositive)}`) },
        { colour: PEOPLE_COLOURS.falseNegative, text: say(`Gaixo eta negatibo: ${g(counts.falseNegative)}`, `Enfermos y negativo: ${g(counts.falseNegative)}`, `مرضى وسلبي: ${g(counts.falseNegative)}`, `Ill and negative: ${g(counts.falseNegative)}`) }
    ]
    const latex = [
        `P(E/+)=\\frac{${counts.truePositive}}{${counts.truePositive + counts.falsePositive}}=${probLatex(value)}`,
        `\\approx ${texDec(toNumber(value), props.language, 3)}`
    ]
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: $P(E/+)$ txikiagoa, berdina ala handiagoa da $\\frac{1}{2}$ baino?', 'Antes de verlo: ¿$P(E/+)$ es menor, igual o mayor que $\\frac{1}{2}$?', 'قبل أن ترى: هل $P(E/+)$ أصغر من $\\frac{1}{2}$ أم يساويه أم أكبر؟', 'Before you see it: is $P(E/+)$ less than, equal to or greater than $\\frac{1}{2}$?')}
            labels={{ '<': say('Txikiagoa', 'Menor', 'أصغر', 'Less'), '=': say('Berdina', 'Igual', 'يساوي', 'Equal'), '>': say('Handiagoa', 'Mayor', 'أكبر', 'Greater') }}
            actual={peoplePrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu positibo egiazkoak eta faltsuak: zenbat osasuntsu dago gaixo bakoitzeko?', 'Compara los positivos verdaderos y los falsos: ¿cuántos sanos hay por cada enfermo?', 'قارن الإيجابيات الحقيقية والكاذبة: كم سليمًا مقابل كل مريض؟', 'Compare the true and the false positives: how many healthy people are there for each ill one?')}
            onChoose={(choice) => setState((s) => setPrediction(s, choice))}
        >
            <Readout latex={inLanguage(latex, props.language)} note={l(say('Positiboen artean, zer zati dago benetan gaixo.', 'De entre los positivos, la parte que está enferma de verdad.', 'من بين الإيجابيين، الجزء المريض فعلًا.', 'Among the positives, the part that is really ill.'))} />
        </Predict>
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={peopleChallenges} extraChallenges={peopleExtra} state={state}>
            <Board height={shown ? 412 : 336} label={l(say('10 000 pertsona, gelaxka bana', '10 000 personas, una por casilla', '10 000 شخص، واحد في كل خانة', '10,000 people, one per cell'))}>
                <rect x={GRID.x - 1} y={GRID.y - 1} width={GRID.side * GRID.cell + 2} height={GRID.side * GRID.cell + 2} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                {runs.map((run, index) => run.rects.map((rect, at) => <rect key={`${index}-${at}`} {...rect} fill={run.colour} />))}
                <Label x={180} y={GRID.y + GRID.side * GRID.cell + 20} textAnchor="middle" fontSize={13} fontWeight={700} fill={MUTED}>{l(say(`${g(counts.ill)} gaixo, ${g(10_000 - counts.ill)} osasuntsu`, `${g(counts.ill)} enfermos, ${g(10_000 - counts.ill)} sanos`, `${g(counts.ill)} مريض، ${g(10_000 - counts.ill)} سليم`, `${g(counts.ill)} ill, ${g(10_000 - counts.ill)} healthy`))}</Label>
                {shown && legend.map((item, index) => (
                    <g key={index}>
                        <rect x={40} y={GRID.y + GRID.side * GRID.cell + 34 + index * 20} width={14} height={14} fill={item.colour} stroke={INK} strokeWidth={0.8} />
                        <Label x={62} y={GRID.y + GRID.side * GRID.cell + 46 + index * 20} fontSize={13} fontWeight={700} fill={INK}>{l(item.text)}</Label>
                    </g>
                ))}
                {!shown && <Label x={180} y={GRID.y + GRID.side * GRID.cell + 40} textAnchor="middle" fontSize={12} fill={GREEN}>{l(say('Iragarri ondoren ikusiko dira positiboak.', 'Los positivos se verán después de predecir.', 'سيظهر الإيجابيون بعد التوقّع.', 'The positives will show after you predict.'))}</Label>}
            </Board>
        </ToolFrame>
    )
}
