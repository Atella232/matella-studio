import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { BoxTool, CurveTool, SignTool } from '../../batx1-zientziak-aplikazioak/lab/BachApplicationsTools'
import { bach2gApplicationsStages } from '../lessons'
import { AverageTool, PriceTool, ProfitTool } from './Bach2gApplicationsTools'
import { bach2gApplicationsLabTools, type Bach2gApplicationsLabToolId } from './labTools'

const toolComponents: Record<Bach2gApplicationsLabToolId, (props: LabToolProps) => JSX.Element> = {
    sign: SignTool,
    box: BoxTool,
    curvature: CurveTool,
    profit: ProfitTool,
    average: AverageTool,
    price: PriceTool
}

export function Bach2gApplicationsLaboratory(props: {
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
            tools={bach2gApplicationsLabTools}
            stages={bach2gApplicationsStages}
            components={toolComponents}
            title={{ eu: 'Irabaziak, kostuak eta prezioak', es: 'Beneficios, costes y precios', en: 'Profits, costs and prices', ar: 'أرباح وتكاليف وأسعار' }}
        />
    )
}
