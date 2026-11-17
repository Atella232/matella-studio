import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { CompositionTool, MirrorTool } from '../../batx1-zientziak-funtzioak/lab/BachFunctionsTools'
import { GrowthTool, LogShiftTool, ShiftTool } from '../../dbh4-akademikoak-esponentzialak/lab/ExponentialAkTools'
import { LadderTool } from '../../dbh4-akademikoak-potentziak/lab/PowersTools'
import { ExponentialTool } from '../../dbh4-aplikatuak-grafikoa/lab/GraphsTools'
import { socExpStages } from '../lessons'
import { socExpLabTools, type SocExpLabToolId } from './labTools'
import { LineExpTool, LogisticTool } from './SocExpTools'

const toolComponents: Record<SocExpLabToolId, (props: LabToolProps) => JSX.Element> = {
    shift: ShiftTool,
    composition: CompositionTool,
    mirror: MirrorTool,
    exponential: ExponentialTool,
    growth: GrowthTool,
    'line-exp': LineExpTool,
    ladder: LadderTool,
    'log-shift': LogShiftTool,
    logistic: LogisticTool
}

export function SocExpLaboratory(props: {
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
            tools={socExpLabTools}
            stages={socExpStages}
            components={toolComponents}
            title={{ eu: 'Konposatu, hazi eta moteldu', es: 'Compón, crece y frena', en: 'Compose, grow and slow down', ar: 'ركّب وانمُ وتباطأ' }}
        />
    )
}
