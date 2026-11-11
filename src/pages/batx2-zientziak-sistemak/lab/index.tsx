import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import { SolutionFamilyTool } from '../../batx1-zientziak-sistemak/lab/BachSystemsTools'
import { sistemakStages } from '../lessons'
import { sistemakLabTools, type SistemakLabToolId } from './labTools'
import { CramerMachineTool, DiscussionMapTool, RoucheLightTool, ThreeLinesTool } from './SystemsTools'

const toolComponents: Record<SistemakLabToolId, (props: LabToolProps) => JSX.Element> = {
    'rouche-light': RoucheLightTool,
    'three-lines': ThreeLinesTool,
    'cramer-machine': CramerMachineTool,
    'solution-family': SolutionFamilyTool,
    'discussion-map': DiscussionMapTool
}

export function SistemakLaboratory(props: {
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
            tools={sistemakLabTools}
            stages={sistemakStages}
            components={toolComponents}
            title={{ eu: 'Heinak, Cramer eta parametroak', es: 'Rangos, Cramer y parámetros', en: 'Ranks, Cramer and parameters', ar: 'الرتب وكرامر والوسائط' }}
        />
    )
}
