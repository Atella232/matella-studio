import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { BisectorTool, CircleTool } from '../../dbh4-akademikoak-bektoreak/lab/VectorsTools'
import { bachConicsStages } from '../lessons'
import { DirectrixTool, EccentricityTool, GardenerTool } from './ConicsTools'
import { bachConicsLabTools, type BachConicsLabToolId } from './labTools'

const toolComponents: Record<BachConicsLabToolId, (props: LabToolProps) => JSX.Element> = {
    bisector: BisectorTool,
    circle: CircleTool,
    gardener: GardenerTool,
    eccentricity: EccentricityTool,
    directrix: DirectrixTool
}

export function BachConicsLaboratory(props: {
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
            tools={bachConicsLabTools}
            stages={bachConicsStages}
            components={toolComponents}
            title={{ eu: 'Soka, fokua eta eszentrikotasuna', es: 'La cuerda, el foco y la excentricidad', en: 'The string, the focus and the eccentricity', ar: 'الخيط والبؤرة والاختلاف المركزي' }}
        />
    )
}
