import type { ComponentProps } from 'react'
import { ResultAnswer } from '../../../features/unit-v2/lab/LabKit'

/** "Your result" field of the integer operation tools */
export function IntegerAnswer(props: Omit<ComponentProps<typeof ResultAnswer>, 'placeholder' | 'unreadable'>) {
    return (
        <ResultAnswer
            {...props}
            placeholder={{ eu: 'Adib.: −7', es: 'Ej.: −7', ar: 'مثال: ⁦−7⁩' }}
            unreadable={{ eu: 'Idatzi zenbaki oso bat, adibidez −7 edo 12.', es: 'Escribe un número entero, por ejemplo −7 o 12.', ar: 'اكتب عددًا صحيحًا، مثل ⁦−7⁩ أو 12.' }}
        />
    )
}
