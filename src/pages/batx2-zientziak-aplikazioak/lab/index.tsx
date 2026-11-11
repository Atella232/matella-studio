import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { BoxTool, CurveTool, SignTool } from '../../batx1-zientziak-aplikazioak/lab/BachApplicationsTools'
import { bach2ApplicationsStages } from '../lessons'
import { DistanceTool, HopitalTool, MeanValueTool, RolleTool } from './Bach2ApplicationsTools'
import { bach2ApplicationsLabTools, type Bach2ApplicationsLabToolId } from './labTools'

const toolComponents: Record<Bach2ApplicationsLabToolId, (props: LabToolProps) => JSX.Element> = {
    sign: SignTool,
    curvature: CurveTool,
    rolle: RolleTool,
    mean: MeanValueTool,
    hopital: HopitalTool,
    distance: DistanceTool,
    box: BoxTool
}

export function Bach2ApplicationsLaboratory(props: {
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
            tools={bach2ApplicationsLabTools}
            stages={bach2ApplicationsStages}
            components={toolComponents}
            title={{ eu: 'Teoremak hurbiletik', es: 'Los teoremas de cerca', en: 'The theorems up close', ar: 'المبرهنات عن قرب' }}
        />
    )
}
