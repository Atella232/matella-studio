import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { LayersTool } from '../../batx1-zientziak-aplikazioak/lab/BachApplicationsTools'
import { TransformTool } from '../../batx1-zientziak-funtzioak/lab/BachFunctionsTools'
import { bach2SketchStages } from '../lessons'
import { AsymptoteTool, DerivativeTool, MirrorTool, SymmetryTool } from './Bach2SketchTools'
import { bach2SketchLabTools, type Bach2SketchLabToolId } from './labTools'

const toolComponents: Record<Bach2SketchLabToolId, (props: LabToolProps) => JSX.Element> = {
    layers: LayersTool,
    asymptote: AsymptoteTool,
    symmetry: SymmetryTool,
    transform: TransformTool,
    mirror: MirrorTool,
    derivative: DerivativeTool
}

export function Bach2SketchLaboratory(props: {
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
            tools={bach2SketchLabTools}
            stages={bach2SketchStages}
            components={toolComponents}
            title={{ eu: 'Grafikoak hurbiletik', es: 'Las gráficas de cerca', en: 'Graphs up close', ar: 'الرسوم البيانية عن قرب' }}
        />
    )
}
