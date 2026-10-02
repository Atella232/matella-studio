import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { CompareTool } from '../../dbh2-zatikiak-prototype/lab/CompareTool'
import { EquivalenceTool } from '../../dbh2-zatikiak-prototype/lab/EquivalenceTool'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { NumberLineTool } from '../../dbh2-zatikiak-prototype/lab/NumberLineTool'
import { ProductTool } from '../../dbh2-zatikiak-prototype/lab/ProductTool'
import { SumTool } from '../../dbh2-zatikiak-prototype/lab/SumTool'
import { DecimalsTool, GeneratrixTool } from '../../dbh4-aplikatuak-errealak/lab/RealsTools'
import { rationalsStages } from '../lessons'
import { HierarchyTool } from './HierarchyTool'
import {
    RATIONALS_NUMBER_LINE_RANGES,
    rationalsCompareChallenges,
    rationalsEquivalenceChallenges,
    rationalsLabTools,
    rationalsNumberLineChallenges,
    rationalsProductChallenges,
    rationalsSumChallenges,
    type RationalsLabToolId
} from './labTools'

const toolComponents: Record<RationalsLabToolId, (props: LabToolProps) => JSX.Element> = {
    equivalence: (props) => <EquivalenceTool {...props} challenges={rationalsEquivalenceChallenges} />,
    numberline: (props) => <NumberLineTool {...props} ranges={RATIONALS_NUMBER_LINE_RANGES} challenges={rationalsNumberLineChallenges} />,
    compare: (props) => <CompareTool {...props} challenges={rationalsCompareChallenges} />,
    addsub: (props) => <SumTool {...props} challenges={rationalsSumChallenges} />,
    muldiv: (props) => <ProductTool {...props} challenges={rationalsProductChallenges} />,
    hierarchy: HierarchyTool,
    decimals: DecimalsTool,
    generatrix: GeneratrixTool
}

export function RationalsLaboratory(props: {
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
            tools={rationalsLabTools}
            stages={rationalsStages}
            components={toolComponents}
            title={{ eu: 'Zatitu, ordenatu eta eragin', es: 'Divide, ordena y opera', ar: 'اقسم ورتّب واحسب' }}
        />
    )
}
