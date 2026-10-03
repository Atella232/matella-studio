import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { ProportionTool } from '../../dbh2-zatikiak-prototype/lab/ProportionTool'
import { PERCENT_MODES, percentChallenges } from '../../dbh1-proportzionaltasuna-v2/lab/labTools'
import { TableTool } from '../../dbh1-proportzionaltasuna-v2/lab/ProportionTools'
import { proportionDbh2Stages } from '../lessons'
import { proportionDbh2LabTools, type ProportionDbh2LabToolId } from './labTools'
import { ChainTool, CompoundTool, InterestTool, ShareTool } from './ProportionDbh2Tools'

const toolComponents: Record<ProportionDbh2LabToolId, (props: LabToolProps) => JSX.Element> = {
    table: TableTool,
    compound: CompoundTool,
    share: ShareTool,
    percent: (props) => <ProportionTool {...props} modes={PERCENT_MODES} challenges={percentChallenges} />,
    chain: ChainTool,
    interest: InterestTool
}

export function ProportionDbh2Laboratory(props: {
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
            tools={proportionDbh2LabTools}
            stages={proportionDbh2Stages}
            components={toolComponents}
            title={{ eu: 'Zuzena, alderantzizkoa ala biak?', es: '¿Directa, inversa o las dos?', ar: 'طردي أم عكسي أم كلاهما؟' }}
        />
    )
}
