import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { AreaFunctionTool, SignedTool } from '../../batx1-zientziak-integralak/lab/BachIntegralsTools'
import { bach2DefiniteStages } from '../lessons'
import { MeanRectTool, SqueezeTool, StripsTool } from './Bach2DefiniteTools'
import { bach2DefiniteLabTools, type Bach2DefiniteLabToolId } from './labTools'

const toolComponents: Record<Bach2DefiniteLabToolId, (props: LabToolProps) => JSX.Element> = {
    signed: SignedTool,
    squeeze: SqueezeTool,
    'mean-rect': MeanRectTool,
    'area-function': AreaFunctionTool,
    strips: StripsTool
}

export function Bach2DefiniteLaboratory(props: {
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
            tools={bach2DefiniteLabTools}
            stages={bach2DefiniteStages}
            components={toolComponents}
            title={{ eu: 'Estutu, berdindu eta zatitu', es: 'Encaja, iguala y parte', en: 'Trap, match and split', ar: 'احصر وساوِ وقسّم' }}
        />
    )
}
