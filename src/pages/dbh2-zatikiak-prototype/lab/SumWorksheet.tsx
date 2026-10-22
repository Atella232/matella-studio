import { useId, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import type { LocalizedText } from '../content'
import { lcm, markSumWorksheet, type StepMark, type SumState, type SumWorksheet, type ToolProps } from './labTools'
import { useLabText } from './useLabText'
import './SumWorksheet.css'

const latex = (numerator: number, denominator: number) => `\\frac{${numerator}}{${denominator}}`

/**
 * Adding or subtracting step by step: common denominator, the two
 * equivalent numerators, the numerator of the result and the simplified
 * result. The steps are optional; each one written is checked on its own.
 */
export function SumWorksheetPanel({
    language,
    state,
    onWorksheet,
    onAnswer
}: {
    language: ToolProps['language']
    state: SumState
    onWorksheet: (patch: Partial<SumWorksheet>) => void
    onAnswer: (patch: Partial<Pick<SumState, 'answer' | 'checked' | 'revealed'>>) => void
}) {
    const l = useLabText(language)
    const resultId = useId()
    const { first, second, op, worksheet, checked } = state
    const marks = markSumWorksheet(state)
    const shownCommon = worksheet.common.trim() === '' ? '?' : worksheet.common.trim()
    const least = lcm(first.denominator, second.denominator)
    const symbol = op === 'add' ? '+' : '−'
    const show = (mark: StepMark) => (checked ? mark : 'empty')

    /** One number typed over the common denominator */
    const over = (value: string, name: keyof SumWorksheet, label: string, numeric: boolean) => (
        <span className="ws-frac">
            <input
                value={value}
                inputMode={numeric ? 'numeric' : 'text'}
                autoComplete="off"
                aria-label={label}
                onChange={(event) => onWorksheet({ [name]: event.target.value })}
                onKeyDown={(event) => { if (event.key === 'Enter') onAnswer({ checked: true }) }}
            />
            <span className="ws-frac-bar" aria-hidden="true" />
            <span className="ws-frac-bottom" dir="ltr">{shownCommon}</span>
        </span>
    )

    const waiting: LocalizedText = marks.common === 'empty'
        ? { eu: 'Idatzi lehenik izendatzaile komuna.', es: 'Escribe primero el denominador común.', ar: 'اكتب أولًا المقام المشترك.' }
        : { eu: 'Zuzendu lehenik goiko urratsak.', es: 'Corrige primero los pasos de arriba.', ar: 'صحّح أولًا الخطوات السابقة.' }
    const numeratorTip = (which: 0 | 1): LocalizedText => {
        const factor = marks.factors?.[which] ?? 1
        return {
            eu: `Izendatzailea ${factor} zenbakiaz biderkatu da: biderkatu zenbakitzailea ere zenbaki beraz.`,
            es: `El denominador se ha multiplicado por ${factor}: multiplica el numerador por lo mismo.`,
            ar: `ضُرب المقام في ${factor}: اضرب البسط في العدد نفسه.`
        }
    }

    /** What to say under a step, once checked */
    const note = (mark: StepMark, wrong: LocalizedText): ReactNode => {
        if (!checked) return null
        if (mark === 'wrong') return <p className="ws-note wrong">{l(wrong)}</p>
        if (mark === 'waiting') return <p className="ws-note waiting">{l(waiting)}</p>
        return null
    }

    const allRight = checked && marks.result === 'right'
        && [marks.common, marks.first, marks.second, marks.numerator].every((mark) => mark === 'right' || mark === 'empty')

    return (
        <div className="ws">
            <p className="ws-title">
                {l({ eu: 'Urratsez urrats', es: 'Paso a paso', ar: 'خطوة بخطوة' })}
                <small>{l({ eu: 'Urratsak aukerakoak dira: idatzitako bakoitza zuzentzen da.', es: 'Los pasos son opcionales: se corrige cada uno que escribas.', ar: 'الخطوات اختيارية: تُصحَّح كل خطوة تكتبها.' })}</small>
            </p>
            <ol className="ws-steps">
                <li className={show(marks.common)}>
                    <span className="ws-label">{l({ eu: `Izendatzaile komuna (${first.denominator} eta ${second.denominator} zenbakien multiploa)`, es: `Denominador común (múltiplo de ${first.denominator} y de ${second.denominator})`, ar: `المقام المشترك (مضاعف لـ ${first.denominator} و${second.denominator})` })}</span>
                    <span className="ws-row" dir="ltr">
                        <input
                            className="ws-int"
                            value={worksheet.common}
                            inputMode="numeric"
                            autoComplete="off"
                            aria-label={l({ eu: 'Izendatzaile komuna', es: 'Denominador común', ar: 'المقام المشترك' })}
                            onChange={(event) => onWorksheet({ common: event.target.value })}
                            onKeyDown={(event) => { if (event.key === 'Enter') onAnswer({ checked: true }) }}
                        />
                    </span>
                    {note(marks.common, { eu: `${first.denominator} eta ${second.denominator} zenbakien multiploa izan behar du.`, es: `Tiene que ser múltiplo de ${first.denominator} y de ${second.denominator}.`, ar: `يجب أن يكون مضاعفًا لـ ${first.denominator} و${second.denominator}.` })}
                    {checked && marks.common === 'right' && !marks.least && (
                        <p className="ws-note">{l({ eu: `Balio du. Txikiena ${least} da: harekin zenbaki txikiagoak.`, es: `Vale. El más pequeño es ${least}: con él, números más pequeños.`, ar: `يصلح. الأصغر هو ${least}: معه تكون الأعداد أصغر.` })}</p>
                    )}
                </li>
                <li className={checked ? (marks.first === 'wrong' || marks.second === 'wrong' ? 'wrong' : marks.first === 'waiting' || marks.second === 'waiting' ? 'waiting' : marks.first === 'right' || marks.second === 'right' ? 'right' : 'empty') : 'empty'}>
                    <span className="ws-label">{l({ eu: 'Zatiki baliokideak', es: 'Fracciones equivalentes', ar: 'الكسور المكافئة' })}</span>
                    <span className="ws-row" dir="ltr">
                        <MathText text={`$${latex(first.numerator, first.denominator)}=$`} />
                        {over(worksheet.first, 'first', l({ eu: 'Lehen zenbakitzailea', es: 'Primer numerador', ar: 'البسط الأول' }), true)}
                        <span className="ws-gap" />
                        <MathText text={`$${latex(second.numerator, second.denominator)}=$`} />
                        {over(worksheet.second, 'second', l({ eu: 'Bigarren zenbakitzailea', es: 'Segundo numerador', ar: 'البسط الثاني' }), true)}
                    </span>
                    {note(marks.first, numeratorTip(0))}
                    {marks.first !== 'wrong' && note(marks.second, numeratorTip(1))}
                </li>
                <li className={show(marks.numerator)}>
                    <span className="ws-label">{op === 'add' ? l({ eu: 'Zenbakitzaileen batura', es: 'Suma de numeradores', ar: 'مجموع البسطين' }) : l({ eu: 'Zenbakitzaileen kenketa', es: 'Resta de numeradores', ar: 'فرق البسطين' })}</span>
                    <span className="ws-row" dir="ltr">
                        <span className="ws-op">{`${worksheet.first.trim() || '?'} ${symbol} ${worksheet.second.trim() || '?'} =`}</span>
                        {over(worksheet.numerator, 'numerator', l({ eu: 'Emaitzaren zenbakitzailea', es: 'Numerador del resultado', ar: 'بسط النتيجة' }), op === 'add')}
                    </span>
                    {note(marks.numerator, op === 'add'
                        ? { eu: 'Batu zenbakitzaileak: izendatzailea ez da aldatzen.', es: 'Suma los numeradores: el denominador no cambia.', ar: 'اجمع البسطين: المقام لا يتغيّر.' }
                        : { eu: 'Kendu zenbakitzaileak: izendatzailea ez da aldatzen.', es: 'Resta los numeradores: el denominador no cambia.', ar: 'اطرح البسطين: المقام لا يتغيّر.' })}
                </li>
                <li className={checked ? (marks.result === 'right' ? 'right' : marks.result === 'empty' ? 'empty' : 'wrong') : 'empty'}>
                    <label className="ws-label" htmlFor={resultId}>{l({ eu: 'Emaitza sinplifikatua', es: 'Resultado simplificado', ar: 'النتيجة المبسّطة' })}</label>
                    <span className="ws-row" dir="ltr">
                        <input
                            id={resultId}
                            className="ws-result"
                            value={state.answer}
                            inputMode="text"
                            autoComplete="off"
                            placeholder={l({ eu: 'Adib.: 5/6 edo 1 1/2', es: 'Ej.: 5/6 o 1 1/2', ar: '⁦5/6⁩ أو ⁦1 1/2⁩' })}
                            onChange={(event) => onAnswer({ answer: event.target.value, checked: false })}
                            onKeyDown={(event) => { if (event.key === 'Enter') onAnswer({ checked: true }) }}
                        />
                    </span>
                    {checked && marks.result === 'wrong' && <p className="ws-note wrong">{l({ eu: 'Berrikusi emaitza: lortutako zenbakitzailea izendatzaile komunaren gainean, sinplifikatuta.', es: 'Revisa el resultado: el numerador obtenido sobre el denominador común, simplificado.', ar: 'راجع النتيجة: البسط الناتج على المقام المشترك، بعد الاختزال.' })}</p>}
                    {checked && marks.result === 'wrong-form' && <p className="ws-note waiting">{l({ eu: 'Balioa zuzena da, baina sinplifikatu.', es: 'El valor es correcto, pero simplifícalo.', ar: 'القيمة صحيحة، لكن اختزلها.' })}</p>}
                    {checked && marks.result === 'unreadable' && <p className="ws-note waiting">{l({ eu: 'Idatzi zatiki bat (5/6) edo zenbaki misto bat (1 1/2).', es: 'Escribe una fracción (5/6) o un número mixto (1 1/2).', ar: 'اكتب كسرًا (5/6) أو عددًا كسريًا (1 1/2).' })}</p>}
                </li>
            </ol>
            <div className="ws-actions" aria-live="polite">
                <button type="button" className="fraction-v2-primary" onClick={() => onAnswer({ checked: true })}>{l({ eu: 'Egiaztatu', es: 'Comprobar', ar: 'تحقق' })}</button>
                {allRight && <span className="ws-all-right">{l({ eu: 'Urrats guztiak ondo daude!', es: '¡Todos los pasos están bien!', ar: 'كل الخطوات صحيحة!' })}</span>}
                {!state.revealed && !allRight && (
                    <button type="button" className="fraction-v2-hint-button" onClick={() => onAnswer({ revealed: true })}>{l({ eu: 'Ikusi emaitza', es: 'Ver el resultado', ar: 'اعرض النتيجة' })}</button>
                )}
            </div>
        </div>
    )
}
