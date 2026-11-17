import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { LayersTool } from '../../batx1-zientziak-aplikazioak/lab/BachApplicationsTools'
import { DerivativeTool, MirrorTool } from '../../batx2-zientziak-adierazpena/lab/Bach2SketchTools'
import { bach2gSketchStages } from '../lessons'
import { DataTool, ObliqueTool } from './Bach2gSketchTools'
import { bach2gSketchLabTools, type Bach2gSketchLabToolId } from './labTools'

const toolComponents: Record<Bach2gSketchLabToolId, (props: LabToolProps) => JSX.Element> = {
    oblique: ObliqueTool,
    derivative: DerivativeTool,
    layers: LayersTool,
    mirror: MirrorTool,
    data: DataTool
}

export function Bach2gSketchLaboratory(props: {
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
            tools={bach2gSketchLabTools}
            stages={bach2gSketchStages}
            components={toolComponents}
            title={{ eu: 'Asintotak, datuak eta grafikoak', es: 'Asíntotas, datos y gráficas', en: 'Asymptotes, data and graphs', ar: 'مقاربات ومعطيات وتمثيلات' }}
        />
    )
}
