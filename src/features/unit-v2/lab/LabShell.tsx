import type { JSX, KeyboardEvent } from 'react'
import type { LocalizedText, UnitLanguage, UnitStage } from '../types'
import { useLabText } from './useLabText'
import type { LabToolInfo, LabToolProps } from './types'

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

/** The laboratory of a unit: a tab per tool and the chosen tool below */
export function LabShell<Tool extends LabToolInfo>({
    language,
    tools,
    stages,
    components,
    title,
    tool,
    onToolChange,
    completedIds,
    onComplete,
    onOpenLesson
}: {
    language: UnitLanguage
    tools: Tool[]
    stages: UnitStage[]
    components: Record<string, (props: LabToolProps<Tool>) => JSX.Element>
    /** Headline of the laboratory */
    title: LocalizedText
    tool: string | null
    onToolChange: (tool: string) => void
    completedIds: number[]
    onComplete: (id: number) => void
    onOpenLesson: (topic: string) => void
}) {
    const l = useLabText(language)
    const current = tools.find((item) => item.id === tool) ?? tools[0]
    const stageIndex = stages.findIndex((stage) => stage.id === current.stage)
    const stage = stages[stageIndex]
    const toneOf = (stageId: string) => stages.find((item) => item.id === stageId)?.tone
    const ToolComponent = components[current.id]

    return (
        <section className="fraction-v2-lab" aria-labelledby="fraction-v2-lab-title">
            <div className="fraction-v2-page-intro">
                <span>{l({ eu: 'LABORATEGIA', es: 'LABORATORIO', ar: 'المختبر' })}</span>
                <h1 id="fraction-v2-lab-title">{l(title)}</h1>
                <p>{l({ eu: 'Aukeratu tresna bat, manipulatu eredua eta gainditu bere erronkak.', es: 'Elige una herramienta, manipula el modelo y supera sus retos.', ar: 'اختر أداة وتعامل مع النموذج وتغلّب على تحدياتها.' })}</p>
            </div>

            <div className="fraction-v2-lab-picker" role="tablist" aria-label={l({ eu: 'Tresna aukeratu', es: 'Elegir herramienta', ar: 'اختر أداة' })}>
                {tools.map((item) => (
                    <button
                        type="button"
                        role="tab"
                        id={`fraction-v2-lab-tab-${item.id}`}
                        aria-controls="fraction-v2-lab-panel"
                        aria-selected={item.id === current.id}
                        tabIndex={item.id === current.id ? 0 : -1}
                        className={item.id === current.id ? 'active' : ''}
                        data-stage={item.stage}
                        data-tone={toneOf(item.stage)}
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
                tone={stage?.tone}
                stageLabel={`${l({ eu: `${stageIndex + 1}. etapa`, es: `Etapa ${stageIndex + 1}`, ar: `المرحلة ${stageIndex + 1}` })} · ${stage ? l(stage.title) : ''}`}
                language={language}
                completedIds={completedIds}
                onComplete={onComplete}
                onOpenLesson={() => onOpenLesson(current.lessonTopic)}
            />
        </section>
    )
}
