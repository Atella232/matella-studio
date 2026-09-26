import type { JSX, KeyboardEvent } from 'react'
import { learningStages, type PrototypeLanguage, type TheoryTopicId } from '../content'
import { labTools, type LabToolId } from './labTools'
import { useLabText } from './useLabText'
import { PartsTool } from './PartsTool'
import { OperationsTool, ProportionTool, type ToolProps } from './ClassicTools'
import { CompareTool } from './CompareTool'
import { EquivalenceTool } from './EquivalenceTool'
import { NumberLineTool } from './NumberLineTool'
import { WallTool } from './WallTool'
import './Lab.css'

const toolComponents: Record<LabToolId, (props: ToolProps) => JSX.Element> = {
    parts: PartsTool,
    numberline: NumberLineTool,
    wall: WallTool,
    equivalence: EquivalenceTool,
    compare: CompareTool,
    operations: OperationsTool,
    proportion: ProportionTool
}

function handleTabKeys(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return
    const tabs = Array.from(event.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [])
    const current = tabs.indexOf(event.currentTarget)
    if (current < 0) return
    event.preventDefault()
    const isRtl = document.documentElement.dir === 'rtl'
    let next = current
    if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = tabs.length - 1
    else next = (current + ((event.key === 'ArrowRight') !== isRtl ? 1 : -1) + tabs.length) % tabs.length
    tabs[next].focus()
    tabs[next].click()
}

export function FractionLaboratory({
    language,
    tool,
    onToolChange,
    completedIds,
    onComplete,
    onOpenLesson
}: {
    language: PrototypeLanguage
    tool: LabToolId
    onToolChange: (tool: LabToolId) => void
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: (topic: TheoryTopicId) => void
}) {
    const l = useLabText(language)
    const current = labTools.find((item) => item.id === tool) ?? labTools[0]
    const stageIndex = learningStages.findIndex((stage) => stage.id === current.stage)
    const ToolComponent = toolComponents[current.id]

    return (
        <section className="fraction-v2-lab" aria-labelledby="fraction-v2-lab-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: 'LABORATEGIA', es: 'LABORATORIO', ar: 'المختبر' })}</span>
                <h1 id="fraction-v2-lab-title">{l({ eu: 'Ikusi balioa, ez soilik ikurra', es: 'Observa el valor, no solo el símbolo', ar: 'شاهد القيمة لا الرمز فقط' })}</h1>
                <p>{l({ eu: 'Aukeratu tresna bat, manipulatu eredua eta gainditu bere erronkak.', es: 'Elige una herramienta, manipula el modelo y supera sus retos.', ar: 'اختر أداة وتعامل مع النموذج وتغلّب على تحدياتها.' })}</p>
            </div>

            <div className="fraction-v2-lab-picker" role="tablist" aria-label={l({ eu: 'Tresna aukeratu', es: 'Elegir herramienta', ar: 'اختر أداة' })}>
                {labTools.map((item) => (
                    <button
                        type="button"
                        role="tab"
                        id={`fraction-v2-lab-tab-${item.id}`}
                        aria-controls="fraction-v2-lab-panel"
                        aria-selected={item.id === current.id}
                        tabIndex={item.id === current.id ? 0 : -1}
                        className={item.id === current.id ? 'active' : ''}
                        data-stage={item.stage}
                        onKeyDown={handleTabKeys}
                        onClick={() => onToolChange(item.id)}
                        key={item.id}
                    >
                        <span aria-hidden="true" />
                        {l(item.title)}
                    </button>
                ))}
            </div>

            <ToolComponent
                key={current.id}
                tool={current}
                stageLabel={`${l({ eu: `${stageIndex + 1}. etapa`, es: `Etapa ${stageIndex + 1}`, ar: `المرحلة ${stageIndex + 1}` })} · ${l(learningStages[stageIndex].title)}`}
                language={language}
                completedIds={completedIds}
                onComplete={onComplete}
                onOpenLesson={() => onOpenLesson(current.lessonTopic)}
            />
        </section>
    )
}
