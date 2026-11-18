import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import { GaussMachineTool } from '../../batx1-zientziak-sistemak/lab/BachSystemsTools'
import { DiscussionMapTool } from '../../batx2-zientziak-sistemak/lab/SystemsTools'
import { gizarteSistemakStages } from '../stages'
import { gizarteSistemakLabTools, type GizarteSistemakLabToolId } from './labTools'
import { PricesCountTool, StatementTool } from './SocialTools'

const toolComponents: Record<GizarteSistemakLabToolId, (props: LabToolProps) => JSX.Element> = {
    'gauss-machine': GaussMachineTool,
    'prices-count': PricesCountTool,
    'discussion-map': DiscussionMapTool,
    statement: StatementTool
}

export function GizarteSistemakLaboratory(props: {
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
            tools={gizarteSistemakLabTools}
            stages={gizarteSistemakStages}
            components={toolComponents}
            title={{ eu: 'Gauss, heinak eta enuntziatuak', es: 'Gauss, rangos y enunciados', en: 'Gauss, ranks and statements', ar: 'غاوس والرتب ونصوص المسائل' }}
        />
    )
}
