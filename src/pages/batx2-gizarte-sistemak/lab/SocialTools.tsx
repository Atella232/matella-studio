import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { Label } from '../../dbh2-funtzioak-v2/plane'
import { Board, Predict, Readout } from '../../dbh3-segidak/lab/LabParts'
import { GREEN, GREEN_TINT, INK, MUSTARD_TINT, MUTED, PAPER, say, SECOND, SECOND_TINT, STAGE, STAGE_TINT } from '../../dbh3-segidak/lab/labStyle'
import { setPrediction } from '../../dbh3-segidak/lab/prediction'
import './SocialTools.css'
import { MatrixBlock } from '../../batx2-zientziak-matrizeak/MatrixSvg'
import { equationLatex } from '../../batx2-zientziak-sistemak/system'
import {
    choosePricesBundle, initialPricesState, loadPrices, pricesChallenges, pricesClassification, pricesExtra, pricesPrediction, PRICES_SCENARIOS, QUANTITY_LIMITS, setBundleAmount,
    setBundleTotal, TOTAL_LIMITS, uniquePrices, type PricesCountState
} from './pricesCount'
import {
    builtSolution, chooseSentence, COEFFICIENT_LIMITS, initialStatementState, loadStatement, RIGHT_LIMITS, rightRows, setTerm, statementChallenges, statementExtra, STATEMENT_SCENARIOS,
    systemDone, type StatementState
} from './statement'

/* ==========================================================================
   Sistemak · Batxilergoa 2 · Gizarte Zientziak — the two tools of this
   unit: three bundles and how many sets of prices fit them (none, one,
   infinitely many: Rouché), and a problem whose sentences the learner
   turns into equations. Logic in pricesCount.ts and statement.ts.
   ========================================================================== */

const minus = (value: number) => (value < 0 ? `−${-value}` : String(value))
const euros = (value: number, language: UnitLanguage) => (language === 'en' ? `€${value}` : `${value} €`)

const COUNT_LABELS: Record<'<' | '=' | '>', LocalizedText> = {
    '<': say('Bat ere ez', 'Ninguno', 'لا شيء', 'None'),
    '=': say('Bat', 'Uno', 'واحدة', 'One'),
    '>': say('Infinitu', 'Infinitos', 'لا نهائية', 'Infinitely many')
}

/* ---------- L1 · None, one or infinitely many? ---------- */

export function PricesCountTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<PricesCountState>(initialPricesState)
    const scenario = PRICES_SCENARIOS[state.scenario]
    const shown = state.prediction !== null
    const { rankA, rankAugmented, kind } = pricesClassification(state)
    const prices = uniquePrices(state)
    const controls = (
        <>
            <Segmented<string> label={l(say('Denda', 'Tienda', 'المتجر', 'Shop'))} value={String(state.scenario)} options={PRICES_SCENARIOS.map((item, index) => ({ value: String(index), label: l(item.name) }))} onChange={(next) => setState(loadPrices(Number(next)))} />
            <Segmented<string> label={l(say('Sorta', 'Lote', 'المجموعة', 'Bundle'))} value={String(state.bundle)} options={[0, 1, 2].map((index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => choosePricesBundle(s, Number(next)))} />
            {scenario.products.map((name, index) => (
                <Stepper key={index} label={l(name)} value={state.q[state.bundle][index]} min={QUANTITY_LIMITS.min} max={QUANTITY_LIMITS.max} onChange={(next) => setState((s) => setBundleAmount(s, index, next))} language={props.language} />
            ))}
            <Stepper label={l(say('Prezioa (€)', 'Precio (€)', 'الثمن (€)', 'Price (€)'))} value={state.totals[state.bundle]} min={TOTAL_LIMITS.min} max={TOTAL_LIMITS.max} onChange={(next) => setState((s) => setBundleTotal(s, next))} language={props.language} />
        </>
    )
    const note: LocalizedText = kind === 'inconsistent'
        ? say('Datuak ez datoz bat: ez dago preziorik.', 'Los datos no cuadran: no hay precios.', 'المعطيات لا تتوافق: لا أسعار.', 'The data do not fit: there are no prices.')
        : kind === 'indeterminate'
            ? say('Datuak falta dira: infinitu prezio-multzo datoz bat.', 'Faltan datos: cuadran infinitos juegos de precios.', 'تنقص معطيات: تتوافق مجموعات أسعار لا نهائية.', 'Data are missing: infinitely many sets of prices fit.')
            : say(
                `Prezio bakarrak: ${scenario.products[0].eu}, ${euros(prices![0], 'eu')}; ${scenario.products[1].eu}, ${euros(prices![1], 'eu')}.`,
                `Precios únicos: ${scenario.products[0].es}, ${euros(prices![0], 'es')}; ${scenario.products[1].es}, ${euros(prices![1], 'es')}.`,
                `أسعار وحيدة: ${scenario.products[0].ar}، ${euros(prices![0], 'ar')}؛ ${scenario.products[1].ar}، ${euros(prices![1], 'ar')}.`,
                `Unique prices: ${scenario.products[0].en}, ${euros(prices![0], 'en')}; ${scenario.products[1].en}, ${euros(prices![1], 'en')}.`
            )
    const readout = (
        <Predict
            language={props.language}
            question={say('Ikusi aurretik: zenbat prezio-multzo datoz bat?', 'Antes de verlo: ¿cuántos juegos de precios cuadran?', 'قبل أن ترى: كم مجموعة أسعار تتوافق؟', 'Before you see it: how many sets of prices fit?')}
            labels={COUNT_LABELS}
            actual={pricesPrediction(state)}
            choice={state.prediction}
            tip={say('Konparatu $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ eta 2 produktuak.', 'Compara $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ y los 2 productos.', 'قارن $\\operatorname{rg}(A)$ و$\\operatorname{rg}(A^*)$ والمنتجين.', 'Compare $\\operatorname{rg}(A)$, $\\operatorname{rg}(A^*)$ and the 2 products.')}
            onChoose={(prediction) => setState((s) => setPrediction(s, prediction))}
        >
            <Readout latex={`\\operatorname{rg}(A)=${rankA}\\qquad \\operatorname{rg}(A^*)=${rankAugmented}`} note={l(note)} />
        </Predict>
    )
    const color = kind === 'inconsistent' ? SECOND : kind === 'determined' ? GREEN : STAGE
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={pricesChallenges} extraChallenges={pricesExtra} state={state}>
            <Board height={220} label={l(say(`${scenario.name.eu}: hiru sortaren A* matrizea; heinak ${shown ? `${rankA} eta ${rankAugmented}` : '?'}`, `${scenario.name.es}: la matriz A* de los tres lotes; rangos ${shown ? `${rankA} y ${rankAugmented}` : '?'}`, `${scenario.name.ar}: المصفوفة A* للمجموعات الثلاث؛ الرتبتان ${shown ? `${rankA} و${rankAugmented}` : '?'}`, `${scenario.name.en}: the matrix A* of the three bundles; ranks ${shown ? `${rankA} and ${rankAugmented}` : '?'}`))}>
                <text x={92} y={22} textAnchor="middle" fontSize={16} fontWeight={700} fill={STAGE} direction="ltr">A*</text>
                <MatrixBlock
                    x={12}
                    y={34}
                    cells={state.q.map((row, r) => [...row.map(String), String(state.totals[r])])}
                    cell={48}
                    rowGap={38}
                    size={18}
                    bracket={10}
                    barBefore={2}
                    tint={(r, c) => (r === state.bundle ? (c === 2 ? MUSTARD_TINT : STAGE_TINT) : undefined)}
                />
                <text x={268} y={70} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK} direction="ltr">{`rg(A) = ${shown ? rankA : '?'}`}</text>
                <text x={268} y={104} textAnchor="middle" fontSize={17} fontWeight={700} fill={INK} direction="ltr">{`rg(A*) = ${shown ? rankAugmented : '?'}`}</text>
                <rect x={196} y={124} width={144} height={36} rx={10} fill={shown ? (kind === 'inconsistent' ? SECOND_TINT : kind === 'determined' ? GREEN_TINT : MUSTARD_TINT) : PAPER} stroke={INK} strokeWidth={1.4} />
                <Label x={268} y={148} textAnchor="middle" fontSize={15} fill={shown ? color : MUTED}>{shown ? l(COUNT_LABELS[pricesPrediction(state)]) : '?'}</Label>
                <Label x={180} y={204} textAnchor="middle" fontSize={14} fill={MUTED}>{l(say('Errenkada bat sorta bakoitzeko; azken zutabean, prezioa', 'Una fila por lote; en la última columna, lo que cuesta', 'صف لكل مجموعة؛ وفي العمود الأخير ثمنها', 'One row per bundle; in the last column, what it costs'))}</Label>
            </Board>
        </ToolFrame>
    )
}

/* ---------- L2 · From the statement to the equation ---------- */

export function StatementTool(props: LabToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<StatementState>(initialStatementState)
    const scenario = STATEMENT_SCENARIOS[state.scenario]
    const names = scenario.unknowns.map((unknown) => unknown.letter)
    const right = rightRows(state)
    const done = systemDone(state)
    const solution = builtSolution(state)
    const row = state.rows[state.sentence]
    const controls = (
        <>
            <Segmented<string> label={l(say('Problema', 'Problema', 'المسألة', 'Problem'))} value={String(state.scenario)} options={STATEMENT_SCENARIOS.map((item, index) => ({ value: String(index), label: l(item.name) }))} onChange={(next) => setState(loadStatement(Number(next)))} />
            <Segmented<string> label={l(say('Esaldia', 'Frase', 'الجملة', 'Sentence'))} value={String(state.sentence)} options={[0, 1, 2].map((index) => ({ value: String(index), label: String(index + 1) }))} onChange={(next) => setState((s) => chooseSentence(s, Number(next)))} />
            {names.map((name, index) => (
                <Stepper key={name} label={name} value={row[index]} min={COEFFICIENT_LIMITS.min} max={COEFFICIENT_LIMITS.max} format={minus} onChange={(next) => setState((s) => setTerm(s, index, next))} language={props.language} />
            ))}
            <Stepper label={l(say('Eskuinean', 'A la derecha', 'على اليمين', 'On the right'))} value={row[3]} min={RIGHT_LIMITS.min} max={RIGHT_LIMITS.max} format={minus} onChange={(next) => setState((s) => setTerm(s, 3, next))} language={props.language} />
        </>
    )
    const latex = state.rows.map((cells) => equationLatex(cells.slice(0, 3), cells[3], names))
    const readout = (
        <Readout
            latex={done && solution ? [`\\begin{cases}${latex.join('\\\\ ')}\\end{cases}`, names.map((name, index) => `${name}=${solution[index]}`).join(',\\ ')] : latex[state.sentence]}
            note={l(done
                ? say('Hiru ekuazioak zuzenak dira. Egiaztatu soluzioa esaldi bakoitzean.', 'Las tres ecuaciones son correctas. Comprueba la solución en cada frase.', 'المعادلات الثلاث صحيحة. تحقق من الحل في كل جملة.', 'The three equations are right. Check the solution in each sentence.')
                : right[state.sentence]
                    ? say('Esaldi honen ekuazioa zuzena da.', 'La ecuación de esta frase es correcta.', 'معادلة هذه الجملة صحيحة.', 'The equation of this sentence is right.')
                    : say('Ekuazio honek ez du esaldia esaten. Begiratu zer den gehiago eta zer gutxiago.', 'Esta ecuación no dice la frase. Mira qué es más y qué es menos.', 'هذه المعادلة لا تقول الجملة. انظر ما الأكثر وما الأقل.', 'This equation does not say the sentence. Look at which is more and which is less.'))}
        />
    )
    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={statementChallenges} extraChallenges={statementExtra} state={state}>
            <div className="soc-statement">
                <p><MathText text={l(say('Ezezagunak:', 'Incógnitas:', 'المجاهيل:', 'Unknowns:'))} /> {scenario.unknowns.map((unknown) => <span key={unknown.letter}><MathText text={`$${unknown.letter}$`} /> {l(unknown.meaning)}. </span>)}</p>
                <ol>
                    {scenario.sentences.map((sentence, index) => (
                        <li key={index} className={index === state.sentence ? 'soc-statement-active' : undefined}>
                            <MathText text={l(sentence)} /> <strong className={right[index] ? 'soc-statement-ok' : 'soc-statement-no'}>{right[index] ? '✓' : '·'}</strong>
                        </li>
                    ))}
                </ol>
            </div>
            <Board height={150} label={l(say('Eraikitako hiru ekuazioak', 'Las tres ecuaciones construidas', 'المعادلات الثلاث المبنية', 'The three equations built'))}>
                {state.rows.map((cells, index) => (
                    <g key={index}>
                        <rect x={20} y={12 + index * 44} width={320} height={36} rx={10} fill={right[index] ? GREEN_TINT : index === state.sentence ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
                        <text x={40} y={36 + index * 44} fontSize={15} fontWeight={700} fill={MUTED} direction="ltr">{index + 1}</text>
                        <text x={190} y={36 + index * 44} textAnchor="middle" fontSize={18} fontWeight={700} fill={right[index] ? GREEN : INK} direction="ltr">{equationLatex(cells.slice(0, 3), cells[3], names).replace(/-/g, ' − ').replace(/\+/g, ' + ').replace('=', ' = ')}</text>
                    </g>
                ))}
            </Board>
        </ToolFrame>
    )
}
