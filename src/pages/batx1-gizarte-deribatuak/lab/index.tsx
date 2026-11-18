import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { BoxTool, SignTool } from '../../batx1-zientziak-aplikazioak/lab/BachApplicationsTools'
import { RateTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { socDerivStages } from '../lessons'
import { socDerivLabTools, type SocDerivLabToolId } from './labTools'
import { MarginalTool, ProfitTool } from './SocDerivTools'

const toolComponents: Record<SocDerivLabToolId, (props: LabToolProps) => JSX.Element> = {
    rate: RateTool,
    marginal: MarginalTool,
    sign: SignTool,
    profit: ProfitTool,
    box: BoxTool
}

export function SocDerivLaboratory(props: {
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
            tools={socDerivLabTools}
            stages={socDerivStages}
            components={toolComponents}
            title={{ eu: 'Neurtu malda, eta aurkitu onena', es: 'Mide la pendiente y encuentra lo mejor', en: 'Measure the slope and find the best', ar: 'قِس الميل وجد الأفضل' }}
        />
    )
}
