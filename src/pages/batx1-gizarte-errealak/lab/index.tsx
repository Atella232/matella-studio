import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { DistanceTool } from '../../batx1-zientziak-errealak/lab/BachRealsTools'
import { ChangeBaseTool, CommonTool, ConjugateTool, ExtractTool } from '../../dbh4-akademikoak-potentziak/lab/PowersTools'
import { IntervalsTool, RoundingTool } from '../../dbh4-aplikatuak-errealak/lab/RealsTools'
import { gizRealsStages } from '../lessons'
import { CommaTool, DigitsTool, WeightTool } from './GizRealsTools'
import { gizRealsLabTools, type GizRealsLabToolId } from './labTools'

const toolComponents: Record<GizRealsLabToolId, (props: LabToolProps) => JSX.Element> = {
    intervals: IntervalsTool,
    distance: DistanceTool,
    common: CommonTool,
    extract: ExtractTool,
    conjugate: ConjugateTool,
    digits: DigitsTool,
    'change-base': ChangeBaseTool,
    rounding: RoundingTool,
    weight: WeightTool,
    comma: CommaTool
}

export function GizRealsLaboratory(props: {
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
            tools={gizRealsLabTools}
            stages={gizRealsStages}
            components={toolComponents}
            title={{ eu: 'Neurtu, konparatu eta idatzi', es: 'Mide, compara y escribe', en: 'Measure, compare and write', ar: 'قِس وقارن واكتب' }}
        />
    )
}
