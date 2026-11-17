import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { BetweenTool, RectanglesTool, SignedTool } from '../../batx1-zientziak-integralak/lab/BachIntegralsTools'
import { bach2gIntegralsStages } from '../lessons'
import { PaybackTool, TotalTool } from './Bach2gIntegralsTools'
import { bach2gIntegralsLabTools, type Bach2gIntegralsLabToolId } from './labTools'

const toolComponents: Record<Bach2gIntegralsLabToolId, (props: LabToolProps) => JSX.Element> = {
    rectangles: RectanglesTool,
    signed: SignedTool,
    between: BetweenTool,
    total: TotalTool,
    payback: PaybackTool
}

export function Bach2gIntegralsLaboratory(props: {
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
            tools={bach2gIntegralsLabTools}
            stages={bach2gIntegralsStages}
            components={toolComponents}
            title={{ eu: 'Azalerak, kostuak eta pilatutakoa', es: 'Áreas, costes y lo acumulado', en: 'Areas, costs and what piles up', ar: 'مساحات وتكاليف ومتراكم' }}
        />
    )
}
