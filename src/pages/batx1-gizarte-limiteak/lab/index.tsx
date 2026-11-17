import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { DegreesTool, HoleTool, LensTool } from '../../batx1-zientziak-limiteak/lab/BachLimitsTools'
import { socLimitsStages } from '../lessons'
import { socLimitsLabTools, type SocLimitsLabToolId } from './labTools'
import { LongRunTool, TariffTool } from './SocLimitsTools'

const toolComponents: Record<SocLimitsLabToolId, (props: LabToolProps) => JSX.Element> = {
    'long-run': LongRunTool,
    degrees: DegreesTool,
    lens: LensTool,
    hole: HoleTool,
    tariff: TariffTool
}

export function SocLimitsLaboratory(props: {
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
            tools={socLimitsLabTools}
            stages={socLimitsStages}
            components={toolComponents}
            title={{ eu: 'Urrutira begiratu, hurbildu eta lotu', es: 'Mira lejos, acércate y une', en: 'Look far, close in and join', ar: 'انظر بعيدًا واقترب وصِل' }}
        />
    )
}
