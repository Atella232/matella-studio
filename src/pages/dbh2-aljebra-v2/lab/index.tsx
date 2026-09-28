import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { algebraStages } from '../lessons'
import { AreaTool, FactorTool, IdentityTool, MachineTool, TilesTool } from './AlgebraTools'
import { algebraLabTools, type AlgebraLabToolId } from './labTools'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import './Algebra2Lab.css'

const toolComponents: Record<AlgebraLabToolId, (props: LabToolProps) => JSX.Element> = {
    machine: MachineTool,
    tiles: TilesTool,
    area: AreaTool,
    identities: IdentityTool,
    factor: FactorTool
}

export function AlgebraLaboratory(props: {
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
            tools={algebraLabTools}
            stages={algebraStages}
            components={toolComponents}
            title={{ eu: 'Ordeztu, eraiki eta faktorizatu', es: 'Sustituye, construye y factoriza', ar: 'عوّض وابنِ وحلّل' }}
        />
    )
}
