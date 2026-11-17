import { useState } from 'react'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import { DeterminantBlock } from '../../batx2-zientziak-determinanteak/DeterminantSvg'
import { MatrixBlock } from '../../batx2-zientziak-matrizeak/MatrixSvg'
import {
    adjugateCells, adjugateChallenges, adjugateDet, adjugateExtra, adjugatePrediction, ADJUGATE_MATRICES, chooseCell, chosenCofactor, chosenMinor, chosenSign, initialAdjugateState,
    inverseSpot, loadAdjugate, matrixOf, setView, type AdjugateState, type AdjugateView
} from './adjugate'
import {
    bundlesChallenges, bundlesDet, bundlesExtra, bundlesPrediction, bundleTotals, BUNDLE_LIMITS, BUNDLE_SCENARIOS, chooseBundle, initialBundlesState, loadBundles, multipleOf, pricesFound,
    setAmount, type BundlesState
} from './bundles'

/* ==========================================================================
   Determinanteak · Batxilergoa 2 · Gizarte Zientziak — the two tools of
   this unit: the bundles (can the prices be found? |A| decides) and the
   adjugate cell by cell (minor, sign, cofactor, its place in Adj A and,
   transposed, in A⁻¹). Each asks for a prediction before it shows the
   result. Logic in bundles.ts and adjugate.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
const bracket = (value: number) => (value < 0 ? `(${value})` : String(value))

/** A price in euros as each language writes it */
const euros = (value: number, language: UnitLanguage) => (language === 'en' ? `€${value}` : `${value} €`)

/** A fraction as text for the board: 2, −1, 4/5, −2/3 */
function fractionText(value: number, denominator: number): string {
    const numerator = Math.round(value * denominator)
    const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
    const g = gcd(numerator, denominator) || 1
    const n = numerator / g
    const d = denominator / g
    return d === 1 ? minus(n) : `${minus(n)}/${d}`
}
const fractionLatex = (value: number, denominator: number) => {
    const text = fractionText(value, denominator).replace('−', '-')
    const [n, d] = text.split('/')
    return d ? `${n.startsWith('-') ? '-' : ''}\\frac{${n.replace('-', '')}}{${d}}` : n
}

/* ---------- L1 · Can the prices be found? ---------- */

export function BundlesTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<BundlesState>(initialBundlesState)
    const scenario = BUNDLE_SCENARIOS[state.scenario]
    const size = state.q.length
    const shown = state.prediction !== null
    const found = pricesFound(state)
    const d = bundlesDet(state)
    const totals = bundleTotals(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Denda', 'Tienda', 'المتجر', 'Shop'))} value={String(state.scenario)} options={BUNDLE_SCENARIOS.map((item, index) => ({ value: String(index), label: l(item.name) }))} onChange={(next) => setState(loadBundles(Number(next)))} />
            <Segmented<string> label={l(say('Sorta', 'Lote', 'المجموعة', 'Bundle'))} value={String(state.bundle)} options={state.q.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => chooseBundle(s, Number(next)))} />
            {scenario.products.map((name, index) => (
                <Stepper key={index} label={l(name)} value={state.q[state.bundle][index]} min={BUNDLE_LIMITS.min} max={BUNDLE_LIMITS.max} onChange={(next) => setState((s) => setAmount(s, index, next))} language={props.language} />
            ))}
        </>
    )
    const twoByTwo = size === 2 ? `=${bracket(state.q[0][0])}\\cdot ${bracket(state.q[1][1])}-${bracket(state.q[0][1])}\\cdot ${bracket(state.q[1][0])}` : ''
    const multiple = multipleOf(state)
    const why: LocalizedText = found
        ? say(
            `Prezio bakarrak: ${scenario.products.map((name, k) => `${name.eu}, ${euros(scenario.prices[k], 'eu')}`).join('; ')}.`,
            `Precios únicos: ${scenario.products.map((name, k) => `${name.es}, ${euros(scenario.prices[k], 'es')}`).join('; ')}.`,
            `أسعار وحيدة: ${scenario.products.map((name, k) => `${name.ar}، ${euros(scenario.prices[k], 'ar')}`).join('؛ ')}.`,
            `Unique prices: ${scenario.products.map((name, k) => `${name.en}, ${euros(scenario.prices[k], 'en')}`).join('; ')}.`
        )
        : multiple
            ? say(
                `${multiple.j + 1}. sorta ${multiple.i + 1}. sortaren ${minus(multiple.k)} aldiz da: ez du ezer berririk esaten. Datuek ez dituzte prezioak finkatzen.`,
                `El lote ${multiple.j + 1} es ${minus(multiple.k)} veces el lote ${multiple.i + 1}: no dice nada nuevo. Los datos no fijan los precios.`,
                `المجموعة ${multiple.j + 1} تساوي ${minus(multiple.k)} مرات المجموعة ${multiple.i + 1}: لا تقول شيئًا جديدًا. المعطيات لا تحدد الأسعار.`,
                `Bundle ${multiple.j + 1} is ${minus(multiple.k)} times bundle ${multiple.i + 1}: it says nothing new. The data do not fix the prices.`
            )
            : say(
                'Sorta bat besteen nahasketa da: ez du ezer berririk esaten. Datuek ez dituzte prezioak finkatzen.',
                'Un lote es mezcla de los otros: no dice nada nuevo. Los datos no fijan los precios.',
                'إحدى المجموعات مزيج من الأخرى: لا تقول شيئًا جديدًا. المعطيات لا تحدد الأسعار.',
                'One bundle is a mix of the others: it says nothing new. The data do not fix the prices.'
            )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: nolakoa da $|A|$?', 'Antes de verlo: ¿cómo es $|A|$?', 'قبل أن ترى: كيف هو $|A|$؟', 'Before you see it: what is $|A|$ like?')}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'), '=': say('Zero', 'Cero', 'صفر', 'Zero'), '>': say('Positiboa', 'Positivo', 'موجب', 'Positive') }}
            actual={bundlesPrediction(state)}
            choice={state.prediction}
            tip={say('Begiratu sorta bat beste baten multiploa den: orduan $|A|=0$.', 'Mira si un lote es múltiplo de otro: entonces $|A|=0$.', 'انظر هل إحدى المجموعات مضاعف لأخرى: عندئذ $|A|=0$.', 'Check whether one bundle is a multiple of another: then $|A|=0$.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={`|A|${twoByTwo}=${d}${found ? '\\neq 0' : ''}`} note={l(why)} />
        </Predict>
    )
    const cell = size === 3 ? 34 : 40
    const gap = size === 3 ? 34 : 42
    const top = size === 3 ? 34 : 44
    const aWidth = size * cell + 28
    const xLeft = 14 + aWidth + 6
    const bLeft = xLeft + cell + 28 + 26
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={bundlesChallenges} extraChallenges={bundlesExtra} state={state}>
            <Board height={230} label={l(say(`${scenario.name.eu}: sorten kopuruak (A), prezioak (X) eta sorten prezioak (B); |A| = ${shown ? d : '?'}`, `${scenario.name.es}: cantidades de los lotes (A), precios (X) y lo que cuesta cada lote (B); |A| = ${shown ? d : '?'}`, `${scenario.name.ar}: كميات المجموعات (A) والأسعار (X) وثمن كل مجموعة (B)؛ |A| = ${shown ? d : '?'}`, `${scenario.name.en}: quantities of the bundles (A), prices (X) and what each bundle costs (B); |A| = ${shown ? d : '?'}`))}>
                <text x={14 + aWidth / 2} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">A</text>
                <MatrixBlock x={14} y={top} cells={state.q.map((row) => row.map(String))} cell={cell} rowGap={gap} size={18} tint={(r) => (r === state.bundle ? STAGE_TINT : undefined)} />
                <text x={xLeft + (cell + 28) / 2} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">X</text>
                <MatrixBlock x={xLeft} y={top} cells={scenario.prices.map((price) => [shown && found ? String(price) : '?'])} cell={cell} rowGap={gap} size={18} tint={() => (shown ? (found ? GREEN_TINT : SECOND_TINT) : MUSTARD_TINT)} color={() => (shown ? (found ? GREEN : SECOND) : MUTED)} />
                <text x={bLeft - 14} y={top + (size * gap) / 2 + 7} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>=</text>
                <text x={bLeft + (cell + 16 + 28) / 2} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">B</text>
                <MatrixBlock x={bLeft} y={top} cells={totals.map((total) => [String(total)])} cell={cell + 16} rowGap={gap} size={18} />
                <text x={180} y={top + size * gap + 40} textAnchor="middle" fontSize={22} fontWeight={700} fill={shown ? (found ? GREEN : SECOND) : MUTED} direction="ltr">{`|A| = ${shown ? minus(d) : '?'}`}</text>
                <Label x={180} y={top + size * gap + 68} textAnchor="middle" fontSize={15} fill={shown ? (found ? GREEN : SECOND) : MUTED}>
                    {shown ? l(found ? say('Prezioak ondorioztatzen dira', 'Los precios se deducen', 'تُستنتج الأسعار', 'The prices can be found') : say('Prezioak ez dira ondorioztatzen', 'Los precios no se deducen', 'لا تُستنتج الأسعار', 'The prices cannot be found')) : l(say('Errenkada bat sorta bakoitzeko', 'Una fila por lote', 'صف لكل مجموعة', 'One row per bundle'))}
                </Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2 · The adjugate, cell by cell ---------- */

export function AdjugateTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<AdjugateState>(initialAdjugateState)
    const shown = state.prediction !== null
    const a = matrixOf(state)
    const d = adjugateDet(state)
    const value = chosenCofactor(state)
    const m = chosenMinor(state)
    const sign = chosenSign(state)
    const spot = inverseSpot(state)
    const i = state.row + 1
    const j = state.column + 1
    const controls = (
        <>
            <Segmented<string> label={l(say('Matrizea', 'Matriz', 'المصفوفة', 'Matrix'))} value={String(state.matrix)} options={ADJUGATE_MATRICES.map((_, index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState(loadAdjugate(Number(next)))} />
            <Segmented<string> label={l(say('Errenkada', 'Fila', 'الصف', 'Row'))} value={String(state.row)} options={[0, 1, 2].map((index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => chooseCell(s, Number(next), s.column))} />
            <Segmented<string> label={l(say('Zutabea', 'Columna', 'العمود', 'Column'))} value={String(state.column)} options={[0, 1, 2].map((index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => chooseCell(s, s.row, Number(next)))} />
            <Segmented<AdjugateView> label={l(say('Ikuspegia', 'Vista', 'العرض', 'View'))} value={state.view} options={[
                { value: 'cofactor', label: l(say('Adjuntua', 'Adjunto', 'المتمم', 'Cofactor')) },
                { value: 'adjugate', label: 'Adj A' },
                { value: 'inverse', label: l(say('Alderantzizkoa', 'Inversa', 'المعكوس', 'Inverse')) }
            ]} onChange={(next) => setState((s) => setView(s, next))} />
        </>
    )
    const rest = a.filter((_, r) => r !== state.row).map((row) => row.filter((_, c) => c !== state.column))
    const cofactorLatex = `A_{${i}${j}}=${sign === 1 ? '+' : '-'}\\begin{vmatrix}${rest.map((row) => row.join('&')).join('\\\\')}\\end{vmatrix}=${sign === 1 ? '' : '-'}${bracket(m)}=${value}`
    const lines: Record<AdjugateView, string[]> = {
        cofactor: [cofactorLatex],
        adjugate: [cofactorLatex, `(\\operatorname{Adj}A)_{${i}${j}}=${value}`],
        inverse: [`|A|=${d}`, `(A^{-1})_{${j}${i}}=\\frac{A_{${i}${j}}}{|A|}=${fractionLatex(spot.value, d)}`]
    }
    const notes: Record<AdjugateView, LocalizedText> = {
        cofactor: say(`Ezabatu ${i}. errenkada eta ${j}. zutabea; ${i + j} ${sign === 1 ? 'bikoitia' : 'bakoitia'} denez, zeinua ${sign === 1 ? 'plus' : 'minus'} da.`, `Tacha la fila ${i} y la columna ${j}; como ${i + j} es ${sign === 1 ? 'par' : 'impar'}, el signo es ${sign === 1 ? 'más' : 'menos'}.`, `احذف الصف ${i} والعمود ${j}؛ وبما أن ${i + j} ${sign === 1 ? 'زوجي' : 'فردي'} فالإشارة ${sign === 1 ? 'موجبة' : 'سالبة'}.`, `Strike out row ${i} and column ${j}; since ${i + j} is ${sign === 1 ? 'even' : 'odd'}, the sign is ${sign === 1 ? 'plus' : 'minus'}.`),
        adjugate: say(`Adjuntua bere tokian geratzen da: Adj A matrizearen (${i},${j}) laukian.`, `El adjunto se queda en su sitio: en la casilla (${i},${j}) de Adj A.`, `يبقى المتمم في مكانه: في الخانة (${i},${j}) من Adj A.`, `The cofactor stays in its place: in cell (${i},${j}) of Adj A.`),
        inverse: say(`Iraultzean, (${i},${j}) adjuntua (${j},${i}) laukira doa, eta $|A|$ zenbakiaz zatitzen da.`, `Al trasponer, el adjunto (${i},${j}) pasa a la casilla (${j},${i}) y se divide entre $|A|$.`, `عند النقل ينتقل المتمم (${i},${j}) إلى الخانة (${j},${i}) ويُقسم على $|A|$.`, `On transposing, cofactor (${i},${j}) moves to cell (${j},${i}) and is divided by $|A|$.`)
    }
    const readout = (
        <Predict
            language={props.language}
            question={say(`Ikusi aurretik: nolakoa da $A_{${i}${j}}$?`, `Antes de verlo: ¿cómo es $A_{${i}${j}}$?`, `قبل أن ترى: كيف هو $A_{${i}${j}}$؟`, `Before you see it: what is $A_{${i}${j}}$ like?`)}
            labels={{ '<': say('Negatiboa', 'Negativo', 'سالب', 'Negative'), '=': say('Zero', 'Cero', 'صفر', 'Zero'), '>': say('Positiboa', 'Positivo', 'موجب', 'Positive') }}
            actual={adjugatePrediction(state)}
            choice={state.prediction}
            tip={say('Menorearen zeinua bider taularen zeinua.', 'El signo del menor por el signo del tablero.', 'إشارة المحدد الأصغر في إشارة اللوحة.', 'The sign of the minor times the sign of the board.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={lines[state.view]} note={l(notes[state.view])} />
        </Predict>
    )
    const cells = adjugateCells(state)
    const hidden = (r: number, c: number) => r === state.row && c === state.column && !shown
    const adjText = cells.map((row, r) => row.map((cofactorValue, c) => (hidden(r, c) ? '?' : minus(cofactorValue))))
    const inverseText = cells.map((_, r) => cells.map((__, c) => (hidden(c, r) ? '?' : fractionText(cells[c][r] / d, d))))
    const rightLabel = state.view === 'inverse' ? 'A⁻¹' : state.view === 'adjugate' ? 'Adj A' : `M${i}${j}`
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={adjugateChallenges} extraChallenges={adjugateExtra} state={state}>
            <Board height={200} label={l(say(`${state.matrix + 1}. matrizea, (${i},${j}) laukia: menorea, adjuntua, Adj A eta A⁻¹`, `Matriz ${state.matrix + 1}, casilla (${i},${j}): menor, adjunto, Adj A y A⁻¹`, `المصفوفة ${state.matrix + 1}، الخانة (${i},${j}): المحدد الأصغر والمتمم وAdj A وA⁻¹`, `Matrix ${state.matrix + 1}, cell (${i},${j}): minor, cofactor, Adj A and A⁻¹`))}>
                <text x={70} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">A</text>
                {state.view === 'cofactor' ? (
                    <DeterminantBlock x={12} y={36} cells={a} cell={38} rowGap={36} size={18} strike={{ row: state.row, column: state.column }} signs />
                ) : (
                    <MatrixBlock x={4} y={36} cells={a.map((row) => row.map(String))} cell={38} rowGap={36} size={18} tint={(r, c) => (r === state.row && c === state.column ? STAGE_TINT : undefined)} />
                )}
                <text x={156} y={98} textAnchor="middle" fontSize={20} fontWeight={700} fill={MUTED}>→</text>
                <text x={262} y={22} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE} direction="ltr">{rightLabel}</text>
                {state.view === 'cofactor' && (
                    <g>
                        <text x={196} y={98} textAnchor="middle" fontSize={20} fontWeight={700} fill={sign === 1 ? GREEN : SECOND} direction="ltr">{sign === 1 ? '+' : '−'}</text>
                        <DeterminantBlock x={212} y={54} cells={rest} cell={40} rowGap={38} size={19} />
                        <text x={262} y={170} textAnchor="middle" fontSize={20} fontWeight={700} fill={shown ? (value < 0 ? SECOND : GREEN) : MUTED} direction="ltr">{`A${i}${j} = ${shown ? minus(value) : '?'}`}</text>
                    </g>
                )}
                {state.view === 'adjugate' && (
                    <MatrixBlock x={178} y={36} cells={adjText} cell={38} rowGap={36} size={18} tint={(r, c) => (r === state.row && c === state.column ? MUSTARD_TINT : undefined)} color={(r, c) => (r === state.row && c === state.column ? SECOND : MUTED)} />
                )}
                {state.view === 'inverse' && (
                    <MatrixBlock x={172} y={36} cells={inverseText} cell={44} rowGap={36} size={inverseText.flat().some((text) => text.length > 3) ? 14 : 16} tint={(r, c) => (r === spot.row && c === spot.column ? GREEN_TINT : undefined)} color={(r, c) => (r === spot.row && c === spot.column ? GREEN : MUTED)} />
                )}
                {state.view !== 'cofactor' && (
                    <text x={state.view === 'inverse' ? 76 : 180} y={182} textAnchor="middle" fontSize={16} fontWeight={700} fill={INK} direction="ltr">{`|A| = ${d}`}</text>
                )}
                {state.view === 'inverse' && (
                    <text x={262} y={182} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK} direction="ltr">A⁻¹ = (1/|A|)·(Adj A)ᵗ</text>
                )}
            </Board>
        </ToolFrame>
    )
}
