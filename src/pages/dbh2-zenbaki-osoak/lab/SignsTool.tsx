import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import type { LabChallenge } from '../../../features/unit-v2/lab/types'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { NumberLine, type NumberLineJump } from '../figures'
import { signed } from '../format'
import { IntegerAnswer } from './IntegerLabKit'
import {
    initialSignsState,
    integerResultVisible,
    setSignsDividend,
    setSignsGroups,
    setSignsOp,
    setSignsSize,
    SIGN_LIMITS,
    signsChallenges,
    signsProduct,
    signsResult,
    type IntegerToolProps,
    type SignsState
} from './labTools'
import { bracketTex, signedTex } from './text'

const RANGE = SIGN_LIMITS.max * SIGN_LIMITS.max
const signOf = (value: number) => (value < 0 ? '−' : '+')

export function SignsTool(props: IntegerToolProps & { challenges?: LabChallenge<SignsState>[] }) {
    const l = useLabText(props.language)
    const [state, setState] = useState<SignsState>(initialSignsState)
    const { op, groups, size } = state
    const product = signsProduct(state)
    const result = signsResult(state)
    const showResult = integerResultVisible(state, result)
    const multiplying = op === 'multiply'

    const controls = (
        <>
            <Segmented label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })} value={op} options={[{ value: 'multiply', label: l({ eu: 'Biderketa (·)', es: 'Producto (·)', ar: 'الضرب (·)' }) }, { value: 'divide', label: l({ eu: 'Zatiketa (:)', es: 'Cociente (:)', ar: 'القسمة (:)' }) }]} onChange={(next) => setState((current) => setSignsOp(current, next))} />
            {multiplying ? (
                <>
                    <Stepper label={l({ eu: 'Lehen faktorea (jauzi kopurua)', es: 'Primer factor (número de saltos)', ar: 'العامل الأول (عدد القفزات)' })} value={groups} min={SIGN_LIMITS.min} max={SIGN_LIMITS.max} format={(next) => signed(next)} onChange={(next) => setState((current) => setSignsGroups(current, next))} language={props.language} />
                    <Stepper label={l({ eu: 'Bigarren faktorea (jauziaren tamaina)', es: 'Segundo factor (tamaño del salto)', ar: 'العامل الثاني (طول القفزة)' })} value={size} min={SIGN_LIMITS.min} max={SIGN_LIMITS.max} format={(next) => signed(next)} onChange={(next) => setState((current) => setSignsSize(current, next))} language={props.language} />
                </>
            ) : (
                <>
                    <Stepper label={l({ eu: 'Zatikizuna', es: 'Dividendo', ar: 'المقسوم' })} value={product} min={-Math.abs(size) * SIGN_LIMITS.max} max={Math.abs(size) * SIGN_LIMITS.max} step={Math.abs(size)} format={(next) => signed(next)} onChange={(next) => setState((current) => setSignsDividend(current, next))} language={props.language} />
                    <Stepper label={l({ eu: 'Zatitzailea (jauziaren tamaina)', es: 'Divisor (tamaño del salto)', ar: 'المقسوم عليه (طول القفزة)' })} value={size} min={SIGN_LIMITS.min} max={SIGN_LIMITS.max} format={(next) => signed(next)} onChange={(next) => setState((current) => setSignsSize(current, next))} language={props.language} />
                </>
            )}
        </>
    )

    const expression = multiplying ? `${bracketTex(groups)}\\cdot${bracketTex(size)}` : `${bracketTex(product)}\\mathbin{:}${bracketTex(size)}`
    const firstSign = signOf(multiplying ? groups : product)
    const secondSign = signOf(size)
    const hasSign = result !== 0

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$${expression}${showResult ? `=${signedTex(result)}` : ''}$`} />
            </span>
            <span className="fraction-v2-lab-readout-note">
                {multiplying
                    ? l({
                        eu: `${Math.abs(groups)} jauzi, bakoitza ${signed(size)}${groups < 0 ? ', eta gero zeroaren beste aldera islatu (lehen faktorea negatiboa da).' : '.'}`,
                        es: `${Math.abs(groups)} saltos de ${signed(size)}${groups < 0 ? ' y después reflejar al otro lado del cero (el primer factor es negativo).' : '.'}`,
                        ar: `${Math.abs(groups)} قفزات طول كل منها ⁦${signed(size)}⁩${groups < 0 ? '، ثم نعكس إلى الجهة الأخرى من الصفر (العامل الأول سالب).' : '.'}`
                    })
                    : l({
                        eu: `Zenbat jauzi ${signed(size)}koak behar dira ${signed(product)}ra iristeko? Kontuan hartu islatu behar den ala ez.`,
                        es: `¿Cuántos saltos de ${signed(size)} hacen falta para llegar a ${signed(product)}? Ten en cuenta si hay que reflejar.`,
                        ar: `كم قفزة طولها ⁦${signed(size)}⁩ نحتاج للوصول إلى ⁦${signed(product)}⁩؟ انتبه هل يجب العكس أم لا.`
                    })}
            </span>
            <IntegerAnswer language={props.language} state={state} expected={{ numerator: result, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    // Repeated jumps of `size` from zero; a negative first factor reflects the arrival point
    const count = Math.abs(groups)
    const reach = count * size
    const jumps: NumberLineJump[] = Array.from({ length: count }, (_, index) => ({ from: index * size, to: (index + 1) * size, tone: 'ink' }))
    const showJumps = multiplying || showResult
    if (groups < 0 && showJumps) jumps.push({ from: reach, to: -reach, tone: 'second', label: props.language === 'es' ? 'Op' : props.language === 'ar' ? 'معاكس' : 'Aur', row: 1 })

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={props.challenges ?? signsChallenges} state={state}>
            <div className="integers-lab-figure">
                <NumberLine
                    min={-RANGE}
                    max={RANGE}
                    labelEvery={5}
                    plusLabels={false}
                    jumps={showJumps ? jumps : []}
                    points={[{ value: product, label: signed(product) }]}
                    language={props.language}
                />
            </div>
            <table className="integers-sign-table">
                <caption>{multiplying ? l({ eu: 'Zeinuen araua: biderketa', es: 'Regla de los signos: producto', ar: 'قاعدة الإشارات: الضرب' }) : l({ eu: 'Zeinuen araua: zatiketa', es: 'Regla de los signos: cociente', ar: 'قاعدة الإشارات: القسمة' })}</caption>
                <thead>
                    <tr>
                        <th scope="col"><span className="integers-sign-op">{multiplying ? '·' : ':'}</span></th>
                        <th scope="col">+</th>
                        <th scope="col">−</th>
                    </tr>
                </thead>
                <tbody>
                    {(['+', '−'] as const).map((row) => (
                        <tr key={row}>
                            <th scope="row">{row}</th>
                            {(['+', '−'] as const).map((column) => (
                                <td className={hasSign && row === firstSign && column === secondSign ? 'active' : ''} key={column}>{row === column ? '+' : '−'}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </ToolFrame>
    )
}
