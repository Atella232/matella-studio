import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import { NumberLine, type NumberLineJump } from '../figures'
import { signed } from '../format'
import { IntegerAnswer } from './IntegerLabKit'
import { integerResultVisible, initialJumpsState, JUMP_LIMITS, jumpMove, jumpsChallenges, jumpsResult, setJumps, type IntegerToolProps, type JumpsState } from './labTools'
import { bracketTex, oppositeLatex, signedTex } from './text'

export function JumpsTool(props: IntegerToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<JumpsState>(initialJumpsState)
    const { start, op, amount } = state
    const move = jumpMove(state)
    const result = jumpsResult(state)
    const showResult = integerResultVisible(state, result)
    const min = Math.min(-10, start, result)
    const max = Math.max(10, start, result)

    const controls = (
        <>
            <Stepper label={l({ eu: 'Lehen zenbakia', es: 'Primer número', ar: 'العدد الأول' })} value={start} min={JUMP_LIMITS.min} max={JUMP_LIMITS.max} format={(next) => signed(next)} onChange={(next) => setState((current) => setJumps(current, { start: next }))} language={props.language} />
            <Segmented label={l({ eu: 'Eragiketa', es: 'Operación', ar: 'العملية' })} value={op} options={[{ value: 'add', label: '+' }, { value: 'subtract', label: '−' }]} onChange={(next) => setState((current) => setJumps(current, { op: next }))} />
            <Stepper label={l({ eu: 'Bigarren zenbakia', es: 'Segundo número', ar: 'العدد الثاني' })} value={amount} min={JUMP_LIMITS.min} max={JUMP_LIMITS.max} format={(next) => signed(next)} onChange={(next) => setState((current) => setJumps(current, { amount: next }))} language={props.language} />
        </>
    )

    const expression = `${bracketTex(start)}${op === 'add' ? '+' : '-'}${bracketTex(amount)}`
    const asSum = op === 'subtract' ? `=${bracketTex(start)}+${bracketTex(-amount)}` : ''
    const direction = move > 0
        ? l({ eu: `${move} urrats eskuinera`, es: `${move} pasos a la derecha`, ar: `${move} خطوات إلى اليمين` })
        : move < 0
            ? l({ eu: `${-move} urrats ezkerrera`, es: `${-move} pasos a la izquierda`, ar: `${-move} خطوات إلى اليسار` })
            : l({ eu: 'ez da mugitzen', es: 'no se mueve', ar: 'لا يتحرك' })

    const readout = (
        <>
            <span className="fraction-v2-lab-readout-main">
                <MathText text={`$${expression}${asSum}${showResult ? `=${signedTex(result)}` : ''}$`} />
            </span>
            {op === 'subtract' && (
                <span className="fraction-v2-lab-readout-note">
                    <MathText text={l({
                        eu: `Kentzea aurkakoa batzea da: $${oppositeLatex(props.language, signedTex(amount))}=${signedTex(-amount)}$.`,
                        es: `Restar es sumar el opuesto: $${oppositeLatex(props.language, signedTex(amount))}=${signedTex(-amount)}$.`,
                        ar: `الطرح هو جمع المعاكس: معاكس $${signedTex(amount)}$ هو $${signedTex(-amount)}$.`
                    })} />
                </span>
            )}
            <IntegerAnswer language={props.language} state={state} expected={{ numerator: result, denominator: 1 }} onChange={(patch) => setState((current) => ({ ...current, ...patch }))} />
        </>
    )

    const jumps: NumberLineJump[] = []
    if (start !== 0) jumps.push({ from: 0, to: start, tone: 'ink', label: signed(start) })
    if (move !== 0) jumps.push({ from: start, to: result, tone: move > 0 ? 'stage' : 'second', label: signed(move), row: 1 })

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={jumpsChallenges} state={state}>
            <div className="integers-lab-figure">
                <NumberLine
                    min={min}
                    max={max}
                    labelEvery={max - min > 20 ? 2 : 1}
                    jumps={jumps}
                    points={showResult ? [{ value: result, label: signed(result) }] : []}
                    caption={`${l({ eu: 'Hasi', es: 'Empieza en', ar: 'ابدأ من' })} ${signed(start)} · ${direction}`}
                    language={props.language}
                />
            </div>
        </ToolFrame>
    )
}
