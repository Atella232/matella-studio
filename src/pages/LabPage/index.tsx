import { useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { NumberLineLab } from '../../features/labs/NumberLineLab'
import { AreaLab } from '../../features/labs/AreaLab'
import { EquivalenceLab } from '../../features/labs/EquivalenceLab'
import { PizzaLab } from '../../features/labs/PizzaLab'
import { OperationsLab } from '../../features/labs/OperationsLab'
import { ComparatorLab } from '../../features/labs/ComparatorLab'
import './LabPage.css'

type LabType = 'numberLine' | 'area' | 'equivalence' | 'pizza' | 'operations' | 'comparator'

interface LabInfo {
    id: LabType
    icon: string
    label: string
    description: string
    color: string
}

export function LabPage() {
    const { t, i18n } = useTranslation()
    const [activeLab, setActiveLab] = useState<LabType>('pizza')
    const tabRefs = useRef<Partial<Record<LabType, HTMLButtonElement>>>({})

    const labs: LabInfo[] = [
        {
            id: 'pizza',
            icon: '🍕',
            label: t('lab.pizza.title'),
            description: t('lab.pizza.description'),
            color: '#F59E0B'
        },
        {
            id: 'numberLine',
            icon: '📏',
            label: t('lab.numberLine'),
            description: t('lab.numberLineDesc'),
            color: '#3B82F6'
        },
        {
            id: 'area',
            icon: '📐',
            label: t('lab.area'),
            description: t('lab.areaDesc'),
            color: '#10B981'
        },
        {
            id: 'equivalence',
            icon: '⚖️',
            label: t('lab.equivalence'),
            description: t('lab.equivalenceDesc'),
            color: '#8B5CF6'
        },
        {
            id: 'operations',
            icon: '➕',
            label: t('lab.operations.title'),
            description: t('lab.operations.description'),
            color: '#EC4899'
        },
        {
            id: 'comparator',
            icon: '🔍',
            label: t('lab.comparator.title'),
            description: t('lab.comparator.description'),
            color: '#6366F1'
        },
    ]

    const renderLab = () => {
        switch (activeLab) {
            case 'pizza':
                return <PizzaLab />
            case 'numberLine':
                return <NumberLineLab />
            case 'area':
                return <AreaLab />
            case 'equivalence':
                return <EquivalenceLab />
            case 'operations':
                return <OperationsLab />
            case 'comparator':
                return <ComparatorLab />
        }
    }

    const activeLabInfo = labs.find(l => l.id === activeLab)

    const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const isRtl = i18n.dir() === 'rtl'
        let nextIndex: number | null = null

        if (event.key === 'Home') nextIndex = 0
        if (event.key === 'End') nextIndex = labs.length - 1
        if (event.key === 'ArrowDown' || event.key === (isRtl ? 'ArrowLeft' : 'ArrowRight')) {
            nextIndex = (index + 1) % labs.length
        }
        if (event.key === 'ArrowUp' || event.key === (isRtl ? 'ArrowRight' : 'ArrowLeft')) {
            nextIndex = (index - 1 + labs.length) % labs.length
        }

        if (nextIndex === null) return
        event.preventDefault()
        const nextLab = labs[nextIndex]
        setActiveLab(nextLab.id)
        tabRefs.current[nextLab.id]?.focus()
    }

    return (
        <div className="lab-page">
            <div className="container">
                <header className="lab-header">
                    <h1>🧪 {t('lab.title')}</h1>
                    <p className="lab-instructions">{t('lab.instructions')}</p>
                </header>

                <nav className="lab-grid" role="tablist" aria-label={t('lab.title')}>
                    {labs.map((lab, index) => (
                        <button
                            key={lab.id}
                            type="button"
                            ref={(element) => {
                                if (element) tabRefs.current[lab.id] = element
                                else delete tabRefs.current[lab.id]
                            }}
                            role="tab"
                            aria-selected={activeLab === lab.id}
                            aria-controls={`panel-${lab.id}`}
                            id={`tab-${lab.id}`}
                            tabIndex={activeLab === lab.id ? 0 : -1}
                            className={`lab-card ${activeLab === lab.id ? 'active' : ''}`}
                            onClick={() => setActiveLab(lab.id)}
                            onKeyDown={(event) => handleTabKeyDown(event, index)}
                            style={{ '--lab-color': lab.color } as React.CSSProperties}
                        >
                            <span className="lab-icon">{lab.icon}</span>
                            <span className="lab-name">{lab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="lab-content">
                    <section
                        id={`panel-${activeLab}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${activeLab}`}
                        tabIndex={0}
                        className="lab-panel"
                    >
                        <div className="lab-panel-header">
                            <span className="panel-icon">{activeLabInfo?.icon}</span>
                            <div>
                                <h2>{activeLabInfo?.label}</h2>
                                <p>{activeLabInfo?.description}</p>
                            </div>
                        </div>
                        {renderLab()}
                    </section>
                </div>
            </div>
        </div>
    )
}
