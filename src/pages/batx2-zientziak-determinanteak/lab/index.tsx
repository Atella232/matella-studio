import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import { RankSliderTool } from '../../batx2-zientziak-matrizeak/lab/MatricesTools'
import { determinanteakStages } from '../lessons'
import { DetSliderTool, ParallelogramTool, PropertyMachineTool, SignBoardTool } from './DeterminantsTools'
import { determinanteakLabTools, type DeterminanteakLabToolId } from './labTools'

const toolComponents: Record<DeterminanteakLabToolId, (props: LabToolProps) => JSX.Element> = {
    parallelogram: ParallelogramTool,
    'property-machine': PropertyMachineTool,
    'sign-board': SignBoardTool,
    'rank-slider': RankSliderTool,
    'det-slider': DetSliderTool
}

export function DeterminanteakLaboratory(props: {
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
            tools={determinanteakLabTools}
            stages={determinanteakStages}
            components={toolComponents}
            title={{ eu: 'Azalerak, propietateak eta zeinuak', es: 'Áreas, propiedades y signos', en: 'Areas, properties and signs', ar: 'المساحات والخواص والإشارات' }}
        />
    )
}
