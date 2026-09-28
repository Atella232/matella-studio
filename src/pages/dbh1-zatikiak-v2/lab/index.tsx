import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { CompareTool } from '../../dbh2-zatikiak-prototype/lab/CompareTool'
import { EquivalenceTool } from '../../dbh2-zatikiak-prototype/lab/EquivalenceTool'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import { NumberLineTool } from '../../dbh2-zatikiak-prototype/lab/NumberLineTool'
import { PartsTool } from '../../dbh2-zatikiak-prototype/lab/PartsTool'
import { ProductTool } from '../../dbh2-zatikiak-prototype/lab/ProductTool'
import { ProportionTool } from '../../dbh2-zatikiak-prototype/lab/ProportionTool'
import { SumTool } from '../../dbh2-zatikiak-prototype/lab/SumTool'
import { WallTool } from '../../dbh2-zatikiak-prototype/lab/WallTool'
import { fractionsIntroStages } from '../lessons'
import {
    fractionsIntroLabTools,
    INTRO_NUMBER_LINE_RANGES,
    INTRO_PROPORTION_MODES,
    introCompareChallenges,
    introEquivalenceChallenges,
    introNumberLineChallenges,
    introPartsChallenges,
    introProductChallenges,
    introProportionChallenges,
    introSumChallenges,
    introWallChallenges,
    type FractionsIntroLabToolId
} from './labTools'

/** The 2. DBH tools with first-year challenges, no negatives and no percentages */
const toolComponents: Record<FractionsIntroLabToolId, (props: LabToolProps) => JSX.Element> = {
    parts: (props) => <PartsTool {...props} challenges={introPartsChallenges} />,
    numberline: (props) => <NumberLineTool {...props} ranges={INTRO_NUMBER_LINE_RANGES} challenges={introNumberLineChallenges} />,
    wall: (props) => <WallTool {...props} challenges={introWallChallenges} />,
    equivalence: (props) => <EquivalenceTool {...props} challenges={introEquivalenceChallenges} />,
    compare: (props) => <CompareTool {...props} challenges={introCompareChallenges} />,
    addsub: (props) => <SumTool {...props} challenges={introSumChallenges} />,
    muldiv: (props) => <ProductTool {...props} challenges={introProductChallenges} />,
    proportion: (props) => <ProportionTool {...props} modes={INTRO_PROPORTION_MODES} challenges={introProportionChallenges} />
}

export function FractionsIntroLaboratory(props: {
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
            tools={fractionsIntroLabTools}
            stages={fractionsIntroStages}
            components={toolComponents}
            title={{ eu: 'Ikusi balioa, ez soilik ikurra', es: 'Observa el valor, no solo el símbolo', ar: 'شاهد القيمة لا الرمز فقط' }}
        />
    )
}
