import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { AreaTool, FactorTool, IdentityTool, MachineTool, TilesTool } from '../../dbh2-aljebra-v2/lab/AlgebraTools'
import { polynomialsStages } from '../lessons'
import { polynomialsLabTools, type PolynomialsLabToolId } from './labTools'
import { RootsTool, RuffiniTool } from './PolynomialsTools'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-aljebra-v2/lab/Algebra2Lab.css'

const toolComponents: Record<PolynomialsLabToolId, (props: LabToolProps) => JSX.Element> = {
    machine: MachineTool,
    tiles: TilesTool,
    area: AreaTool,
    identities: IdentityTool,
    factor: FactorTool,
    ruffini: RuffiniTool,
    roots: RootsTool
}

export function PolynomialsLaboratory(props: {
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
            tools={polynomialsLabTools}
            stages={polynomialsStages}
            components={toolComponents}
            title={{ eu: 'Bider a eta batu', es: 'Por a y suma', ar: 'في a ثم اجمع' }}
        />
    )
}
