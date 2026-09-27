import type { ComponentProps } from 'react'
import { ResultAnswer as UnitResultAnswer } from '../../../features/unit-v2/lab/LabKit'

export { Segmented, Stepper, ToolFrame } from '../../../features/unit-v2/lab/LabKit'

/** "Your result" field of the fraction operation tools */
export function ResultAnswer(props: Omit<ComponentProps<typeof UnitResultAnswer>, 'placeholder' | 'unreadable'>) {
    return (
        <UnitResultAnswer
            {...props}
            placeholder={{ eu: 'Adib.: 5/6 edo 1 1/2', es: 'Ej.: 5/6 o 1 1/2', ar: 'مثال: 5/6 أو 1 1/2' }}
            unreadable={{ eu: 'Idatzi zatiki bat, zenbaki misto bat edo hamartar bat.', es: 'Escribe una fracción, un número mixto o un decimal.', ar: 'اكتب كسرًا أو عددًا كسريًا أو عددًا عشريًا.' }}
        />
    )
}
