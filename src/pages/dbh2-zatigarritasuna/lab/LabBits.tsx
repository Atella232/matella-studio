export { NumberField } from '../../../features/unit-v2/lab/NumberField'
import type { ComponentProps } from 'react'
import { ResultAnswer } from '../../../features/unit-v2/lab/LabKit'

/** "Your result" for whole-number answers */
export function WholeAnswer(props: Omit<ComponentProps<typeof ResultAnswer>, 'placeholder' | 'unreadable'>) {
    return (
        <ResultAnswer
            {...props}
            placeholder={{ eu: 'Adib.: 12', es: 'Ej.: 12', ar: 'مثال: 12' }}
            unreadable={{ eu: 'Idatzi zenbaki oso bat, adibidez 12.', es: 'Escribe un número entero, por ejemplo 12.', ar: 'اكتب عددًا صحيحًا، مثل 12.' }}
        />
    )
}
