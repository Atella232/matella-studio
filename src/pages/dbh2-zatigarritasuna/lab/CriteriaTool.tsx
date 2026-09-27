import { useState } from 'react'
import { MathText } from '../../../components/MathText'
import { ToolFrame } from '../../../features/unit-v2/lab/LabKit'
import { useLabText } from '../../../features/unit-v2/lab/useLabText'
import type { LocalizedText } from '../../../features/unit-v2/types'
import { NumberField } from './LabBits'
import { CRITERIA, CRITERIA_LIMITS, criteriaChallenges, criterionWorking, initialCriteriaState, setCriteriaValue, type CriteriaState, type Criterion, type DivisibilityToolProps } from './labTools'

const ruleText: Record<Criterion, LocalizedText> = {
    2: { eu: 'Azken zifra bikoitia', es: 'Última cifra par', ar: 'الرقم الأخير زوجي' },
    3: { eu: 'Zifren batura 3ren multiploa', es: 'Suma de cifras múltiplo de 3', ar: 'مجموع الأرقام مضاعف لـ 3' },
    5: { eu: 'Azken zifra 0 edo 5', es: 'Última cifra 0 o 5', ar: 'الرقم الأخير 0 أو 5' },
    7: { eu: 'Kendu azken zifraren bikoitza', es: 'Resta el doble de la última cifra', ar: 'اطرح ضعف الرقم الأخير' },
    9: { eu: 'Zifren batura 9ren multiploa', es: 'Suma de cifras múltiplo de 9', ar: 'مجموع الأرقام مضاعف لـ 9' },
    10: { eu: 'Azken zifra 0', es: 'Última cifra 0', ar: 'الرقم الأخير 0' },
    11: { eu: 'Posizio bikoitiak − bakoitiak', es: 'Lugares pares − impares', ar: 'المواقع الزوجية − الفردية' }
}

export function CriteriaTool(props: DivisibilityToolProps) {
    const l = useLabText(props.language)
    const [state, setState] = useState<CriteriaState>(initialCriteriaState)
    const { value } = state
    const yes = CRITERIA.filter((criterion) => criterionWorking(criterion, value).applies)

    const controls = (
        <>
            <NumberField label={l({ eu: 'Zenbakia', es: 'Número', ar: 'العدد' })} value={value} min={CRITERIA_LIMITS.min} max={CRITERIA_LIMITS.max} onChange={(next) => setState((current) => setCriteriaValue(current, next))} language={props.language} />
            <button type="button" className="fraction-v2-secondary" onClick={() => setState((current) => setCriteriaValue(current, 100 + Math.floor(Math.random() * 9900)))}>
                {l({ eu: 'Ausazko zenbakia', es: 'Número al azar', ar: 'عدد عشوائي' })}
            </button>
        </>
    )

    const readout = (
        <span className="fraction-v2-lab-readout-note">
            {yes.length
                ? l({ eu: `${value} honekin zatigarria da: ${yes.join(', ')}.`, es: `${value} es divisible por: ${yes.join(', ')}.`, ar: `${value} يقبل القسمة على: ${yes.join('، ')}.` })
                : l({ eu: `${value} ez da taulako zenbakiekin zatigarria.`, es: `${value} no es divisible por ninguno de la tabla.`, ar: `${value} لا يقبل القسمة على أي عدد في الجدول.` })}
        </span>
    )

    return (
        <ToolFrame {...props} controls={controls} readout={readout} challenges={criteriaChallenges} state={state}>
            <div className="divisibility-criteria-box">
            <table className="divisibility-criteria">
                <thead>
                    <tr>
                        <th scope="col">{l({ eu: 'Honekin', es: 'Por', ar: 'على' })}</th>
                        <th scope="col">{l({ eu: 'Irizpidea', es: 'Criterio', ar: 'القاعدة' })}</th>
                        <th scope="col">{l({ eu: 'Kalkulua', es: 'Cálculo', ar: 'الحساب' })}</th>
                        <th scope="col"><span className="sr-only">{l({ eu: 'Emaitza', es: 'Resultado', ar: 'النتيجة' })}</span></th>
                    </tr>
                </thead>
                <tbody>
                    {CRITERIA.map((criterion) => {
                        const { applies, detail } = criterionWorking(criterion, value)
                        return (
                            <tr className={applies ? 'yes' : 'no'} key={criterion}>
                                <th scope="row">{criterion}</th>
                                <td>{l(ruleText[criterion])}</td>
                                <td dir="ltr"><MathText text={`$${detail}$`} /></td>
                                <td aria-label={applies ? l({ eu: 'Bai', es: 'Sí', ar: 'نعم' }) : l({ eu: 'Ez', es: 'No', ar: 'لا' })}>{applies ? '✓' : '✗'}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            </div>
        </ToolFrame>
    )
}
