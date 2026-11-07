import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { PeriodicTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { LogShiftTool, ShiftTool } from '../../dbh4-akademikoak-esponentzialak/lab/ExponentialAkTools'
import { DomainsTool, JoinTool, ParityTool } from '../../dbh4-akademikoak-funtzioak/lab/FunctionsAkTools'
import { AbsoluteTool } from '../../dbh4-akademikoak-polinomikoak/lab/PolynomialAkTools'
import { bachFunctionsStages } from '../lessons'
import { CompositionTool, MirrorTool, StairsTool, TransformTool } from './BachFunctionsTools'
import { bachFunctionsLabTools, type BachFunctionsLabToolId } from './labTools'

const toolComponents: Record<BachFunctionsLabToolId, (props: LabToolProps) => JSX.Element> = {
    domains: DomainsTool,
    parity: ParityTool,
    periodic: PeriodicTool,
    transform: TransformTool,
    'exp-shift': ShiftTool,
    mirror: MirrorTool,
    'log-shift': LogShiftTool,
    stairs: StairsTool,
    join: JoinTool,
    absolute: AbsoluteTool,
    composition: CompositionTool
}

export function BachFunctionsLaboratory(props: {
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
            tools={bachFunctionsLabTools}
            stages={bachFunctionsStages}
            components={toolComponents}
            title={{ eu: 'Mugitu, islatu eta konposatu', es: 'Mueve, refleja y compón', en: 'Move, reflect and compose', ar: 'حرّك واعكس وركّب' }}
        />
    )
}
