import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-aljebra-v2/lab/Algebra2Lab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import '../../dbh2-funtzioak-v2/Functions.css'
import { QuadraticTool } from '../../dbh2-ekuazioak-v2/lab/EquationsTools'
import { ExponentialTool, SignTool, SystemTool } from '../../dbh4-akademikoak-ekuazioak/lab/EquationsInequalitiesTools'
import { RadicalTool } from '../../dbh4-aplikatuak-ekuazioak/lab/EquationsSystemsTools'
import { RootsTool, RuffiniTool } from '../../dbh4-aplikatuak-polinomioak/lab/PolynomialsTools'
import { bachEquationsStages } from '../lessons'
import { AbsoluteFoldTool, ChangeMachineTool, SignTableTool } from './BachEquationsTools'
import { bachEquationsLabTools, type BachEquationsLabToolId } from './labTools'

const toolComponents: Record<BachEquationsLabToolId, (props: LabToolProps) => JSX.Element> = {
    ruffini: RuffiniTool,
    'root-hunt': RootsTool,
    quadratic: QuadraticTool,
    'change-machine': ChangeMachineTool,
    radical: RadicalTool,
    'absolute-fold': AbsoluteFoldTool,
    exponential: ExponentialTool,
    'sign-table': SignTableTool,
    'parabola-sign': SignTool,
    'two-inequalities': SystemTool
}

export function BachEquationsLaboratory(props: {
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
            tools={bachEquationsLabTools}
            stages={bachEquationsStages}
            components={toolComponents}
            title={{ eu: 'Faktorizatu, tolestu eta aldatu', es: 'Factoriza, dobla y cambia', en: 'Factorise, fold and change', ar: 'حلّل واطوِ وغيّر' }}
        />
    )
}
