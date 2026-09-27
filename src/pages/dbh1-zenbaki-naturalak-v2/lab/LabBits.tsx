import type { ComponentProps } from 'react'
import { ResultAnswer } from '../../../features/unit-v2/lab/LabKit'
import { readNaturalAnswer } from '../numbers'

/** "Your result" for natural numbers: 15.000 is read as fifteen thousand */
export function NaturalAnswer(props: Omit<ComponentProps<typeof ResultAnswer>, 'placeholder' | 'unreadable' | 'normalizeInput'>) {
    return (
        <ResultAnswer
            {...props}
            normalizeInput={readNaturalAnswer}
            placeholder={{ eu: 'Adib.: 15.000', es: 'Ej.: 15.000', ar: 'مثال: 15.000' }}
            unreadable={{ eu: 'Idatzi zenbaki natural bat, adibidez 15.000.', es: 'Escribe un número natural, por ejemplo 15.000.', ar: 'اكتب عددًا طبيعيًا، مثل 15.000.' }}
        />
    )
}
