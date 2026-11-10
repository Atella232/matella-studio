import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { ChainTool, SlopeGraphTool } from '../../batx1-zientziak-deribatuak/lab/BachDerivativesTools'
import { bach2IndefiniteStages } from '../lessons'
import { ConstantsTool, FractionsTool, PartsTool } from './Bach2IndefiniteTools'
import { bach2IndefiniteLabTools, type Bach2IndefiniteLabToolId } from './labTools'

const toolComponents: Record<Bach2IndefiniteLabToolId, (props: LabToolProps) => JSX.Element> = {
    'slope-graph': SlopeGraphTool,
    parts: PartsTool,
    fractions: FractionsTool,
    chain: ChainTool,
    constants: ConstantsTool
}

export function Bach2IndefiniteLaboratory(props: {
    language: UnitLanguage
    tool: string | null
    onToolChange: (tool: string) => void
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: (topic: string) => void
}) {
    return (
        <LabShell
            {...props}
            tools={bach2IndefiniteLabTools}
            stages={bach2IndefiniteStages}
            components={toolComponents}
            title={{ eu: 'Aukeratu, deskonposatu eta doitu', es: 'Elige, descompón y ajusta', en: 'Choose, split and adjust', ar: 'اختر وفكّك واضبط' }}
        />
    )
}
