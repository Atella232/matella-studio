import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import { HalfPlaneTool, ShoppingTool } from '../../dbh4-akademikoak-sistemak/lab/SystemsTools'
import { programazioaStages } from '../stages'
import { programazioaLabTools, type ProgramazioaLabToolId } from './labTools'
import { BuildRegionTool, LevelLineTool } from './ProgrammingTools'

const toolComponents: Record<ProgramazioaLabToolId, (props: LabToolProps) => JSX.Element> = {
    'half-plane': HalfPlaneTool,
    'build-region': BuildRegionTool,
    'level-line': LevelLineTool,
    shopping: ShoppingTool
}

export function ProgramazioaLaboratory(props: {
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
            tools={programazioaLabTools}
            stages={programazioaStages}
            components={toolComponents}
            title={{ eu: 'Eskualdeak, erpinak eta maila-zuzenak', es: 'Regiones, vértices y rectas de nivel', en: 'Regions, vertices and level lines', ar: 'المناطق والرؤوس ومستقيمات المستوى' }}
        />
    )
}
