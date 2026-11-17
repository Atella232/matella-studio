import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import { DetSliderTool, PropertyMachineTool } from '../../batx2-zientziak-determinanteak/lab/DeterminantsTools'
import { gizarteDeterminanteakStages } from '../lessons'
import { gizarteDeterminanteakLabTools, type GizarteDeterminanteakLabToolId } from './labTools'
import { AdjugateTool, BundlesTool } from './SocialTools'

const toolComponents: Record<GizarteDeterminanteakLabToolId, (props: LabToolProps) => JSX.Element> = {
    'property-machine': PropertyMachineTool,
    adjugate: AdjugateTool,
    'det-slider': DetSliderTool,
    bundles: BundlesTool
}

export function GizarteDeterminanteakLaboratory(props: {
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
            tools={gizarteDeterminanteakLabTools}
            stages={gizarteDeterminanteakStages}
            components={toolComponents}
            title={{ eu: 'Propietateak, adjuntuak eta prezioak', es: 'Propiedades, adjuntos y precios', en: 'Properties, cofactors and prices', ar: 'الخواص والمتممات والأسعار' }}
        />
    )
}
