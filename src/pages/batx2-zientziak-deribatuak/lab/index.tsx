import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { SecantTool, SlopeGraphTool, SmoothTool } from '../../batx1-zientziak-deribatuak/lab/BachDerivativesTools'
import { bach2DerivativesStages } from '../lessons'
import { ImplicitTool, MirrorTool, NoCornerTool, ZoomTool } from './Bach2DerivativesTools'
import { bach2DerivativesLabTools, type Bach2DerivativesLabToolId } from './labTools'

const toolComponents: Record<Bach2DerivativesLabToolId, (props: LabToolProps) => JSX.Element> = {
    secant: SecantTool,
    smooth: SmoothTool,
    zoom: ZoomTool,
    'no-corner': NoCornerTool,
    'slope-graph': SlopeGraphTool,
    mirror: MirrorTool,
    implicit: ImplicitTool
}

export function Bach2DerivativesLaboratory(props: {
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
            tools={bach2DerivativesLabTools}
            stages={bach2DerivativesStages}
            components={toolComponents}
            title={{ eu: 'Lupak, ispiluak eta zuzen ukitzaileak', es: 'Lupas, espejos y tangentes', en: 'Lenses, mirrors and tangents', ar: 'عدسات ومرايا ومماسات' }}
        />
    )
}
