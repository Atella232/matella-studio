import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { RelationTool, TableTool } from '../../dbh2-funtzioak-v2/lab/FunctionsTools'
import { DomainTool, ExplorerTool, PeriodicTool, RateTool } from '../../dbh4-aplikatuak-funtzioak/lab/FunctionsTools'
import { functionsAkStages } from '../lessons'
import { DomainsTool, JoinTool, ParityTool, RootsTool } from './FunctionsAkTools'
import { functionsAkLabTools, type FunctionsAkLabToolId } from './labTools'

const toolComponents: Record<FunctionsAkLabToolId, (props: LabToolProps) => JSX.Element> = {
    relation: RelationTool,
    table: TableTool,
    domain: DomainTool,
    domains: DomainsTool,
    join: JoinTool,
    roots: RootsTool,
    parity: ParityTool,
    explorer: ExplorerTool,
    rate: RateTool,
    periodic: PeriodicTool
}

export function FunctionsAkLaboratory(props: {
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
            tools={functionsAkLabTools}
            stages={functionsAkStages}
            components={toolComponents}
            title={{ eu: 'Eraiki, lotu eta aztertu', es: 'Construye, une y estudia', en: 'Build, connect and study.', ar: 'ابنِ وصِل وادرس' }}
        />
    )
}
