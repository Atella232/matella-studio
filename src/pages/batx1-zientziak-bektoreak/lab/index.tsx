import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { CombinationTool, VectorTool } from '../../dbh4-akademikoak-bektoreak/lab/VectorsTools'
import { bachVectorsStages } from '../lessons'
import { RiverTool, ShadowTool, SkewGridTool } from './BachVectorsTools'
import { bachVectorsLabTools, type BachVectorsLabToolId } from './labTools'

const toolComponents: Record<BachVectorsLabToolId, (props: LabToolProps) => JSX.Element> = {
    vector: VectorTool,
    combination: CombinationTool,
    'skew-grid': SkewGridTool,
    shadow: ShadowTool,
    river: RiverTool
}

export function BachVectorsLaboratory(props: {
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
            tools={bachVectorsLabTools}
            stages={bachVectorsStages}
            components={toolComponents}
            title={{ eu: 'Sarea, itzala eta korrontea', es: 'La red, la sombra y la corriente', en: 'The grid, the shadow and the current', ar: 'الشبكة والظل والتيار' }}
        />
    )
}
