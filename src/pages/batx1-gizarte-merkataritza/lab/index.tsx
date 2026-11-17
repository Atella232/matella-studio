import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ChainTool } from '../../dbh2-proportzionaltasuna-v2/lab/ProportionDbh2Tools'
import { CalendarTool } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/CalendarTool'
import { PercentBarTool } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/PercentBarTool'
import { GrowthTool } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/ProportionDbh4ApTools'
import { ReceiptTool } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/ReceiptTool'
import { gizMoneyStages } from '../lessons'
import { DoubleTool, TableTool, TaeTool } from './GizMoneyTools'
import { gizMoneyLabTools, type GizMoneyLabToolId } from './labTools'

const toolComponents: Record<GizMoneyLabToolId, (props: LabToolProps) => JSX.Element> = {
    percentbar: PercentBarTool,
    chain: ChainTool,
    receipt: ReceiptTool,
    growth: GrowthTool,
    calendar: CalendarTool,
    double: DoubleTool,
    tae: TaeTool,
    table: TableTool
}

export function GizMoneyLaboratory(props: {
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
            tools={gizMoneyLabTools}
            stages={gizMoneyStages}
            components={toolComponents}
            title={{ eu: 'Aurreztu, konparatu eta itzuli', es: 'Ahorra, compara y devuelve', en: 'Save, compare and pay back', ar: 'ادّخر وقارن وسدّد' }}
        />
    )
}
