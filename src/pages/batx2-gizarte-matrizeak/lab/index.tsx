import type { JSX } from 'react'
import { LabShell } from '../../../features/unit-v2/lab/LabShell'
import type { LabToolProps } from '../../../features/unit-v2/lab/types'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import '../../dbh2-zatikiak-prototype/lab/Lab.css'
import '../../dbh1-aljebra-v2/lab/AlgebraLab.css'
import '../../dbh2-ekuazioak-v2/lab/EquationsLab.css'
import { GaussJordanTool, RankSliderTool } from '../../batx2-zientziak-matrizeak/lab/MatricesTools'
import { gizarteMatrizeakStages } from '../lessons'
import { gizarteMatrizeakLabTools, type GizarteMatrizeakLabToolId } from './labTools'
import { ChainTool, TicketTool } from './SocialTools'

const toolComponents: Record<GizarteMatrizeakLabToolId, (props: LabToolProps) => JSX.Element> = {
    ticket: TicketTool,
    'production-chain': ChainTool,
    'rank-slider': RankSliderTool,
    'gauss-jordan': GaussJordanTool
}

export function GizarteMatrizeakLaboratory(props: {
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
            tools={gizarteMatrizeakLabTools}
            stages={gizarteMatrizeakStages}
            components={toolComponents}
            title={{ eu: 'Taulak, kateak eta matrizeak', es: 'Tablas, cadenas y matrices', en: 'Tables, chains and matrices', ar: 'جداول وسلاسل ومصفوفات' }}
        />
    )
}
