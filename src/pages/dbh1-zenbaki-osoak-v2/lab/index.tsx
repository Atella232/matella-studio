import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { CompareTool } from '../../dbh2-zenbaki-osoak/lab/CompareTool'
import { CountersTool } from '../../dbh2-zenbaki-osoak/lab/CountersTool'
import '../../dbh2-zenbaki-osoak/lab/IntegerLab.css'
import { JumpsTool } from '../../dbh2-zenbaki-osoak/lab/JumpsTool'
import { LineTool } from '../../dbh2-zenbaki-osoak/lab/LineTool'
import { MirrorTool } from '../../dbh2-zenbaki-osoak/lab/MirrorTool'
import { SignsTool } from '../../dbh2-zenbaki-osoak/lab/SignsTool'
import { integerIntroStages } from '../lessons'
import { BracketsTool } from './BracketsTool'
import {
    introCompareChallenges,
    introCountersChallenges,
    introJumpsChallenges,
    introLabTools,
    introLineChallenges,
    introMirrorChallenges,
    introSignsChallenges,
    type IntroLabToolId
} from './labTools'
import './IntroLab.css'

/** The 2. DBH tools with first-year challenges, plus the brackets tool */
const toolComponents: Record<IntroLabToolId, (props: LabToolProps) => JSX.Element> = {
    line: (props) => <LineTool {...props} challenges={introLineChallenges} />,
    compare: (props) => <CompareTool {...props} challenges={introCompareChallenges} />,
    mirror: (props) => <MirrorTool {...props} challenges={introMirrorChallenges} />,
    counters: (props) => <CountersTool {...props} challenges={introCountersChallenges} />,
    jumps: (props) => <JumpsTool {...props} challenges={introJumpsChallenges} />,
    brackets: BracketsTool,
    signs: (props) => <SignsTool {...props} challenges={introSignsChallenges} />
}

export function IntegerIntroLaboratory(props: {
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
            tools={introLabTools}
            stages={integerIntroStages}
            components={toolComponents}
            title={{ eu: 'Ukitu zenbaki osoak', es: 'Toca los números enteros', ar: 'المس الأعداد الصحيحة' }}
        />
    )
}
