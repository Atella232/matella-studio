import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../components/MathText'
import {
    ekuazioakMissions,
    ekuazioakQuizQuestions,
    normalizeEkuazioakLang,
    pickText,
    type QuizQuestion
} from '../dbh2-ekuazioak/content'
import { ekuazioakExerciseSections } from '../dbh2-ekuazioak/exercisesData'
import {
    guidedPractice,
    learningStages,
    prototypeSections,
    type LearningStageId,
    type PrototypeSection
} from './prototypeData'
import './PrototypePage.css'

type LabMode = 'balance' | 'linear' | 'quadratic'
type GameMode = 'mixed' | 'lehen-maila' | 'problemak' | 'bigarren-maila'
type Feedback = 'idle' | 'success' | 'error'

const l = (lang: ReturnType<typeof normalizeEkuazioakLang>, eu: string, es: string, ar: string) => pickText(lang, { eu, es, ar })

function normalizeAnswer(value: string) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[−–—]/g, '-')
        .replace(/[؛;]/g, ',')
        .replace(/،/g, ',')
        .replace(/\s+/g, '')
        .replace(/^x=/i, '')
        .toLowerCase()
}

function answerMatches(value: string, answers: string[]) {
    const normalized = normalizeAnswer(value)
    return answers.some((answer) => normalizeAnswer(answer) === normalized)
}

function missionAnswerMatches(id: number, value: string, answers: string[]) {
    const normalized = normalizeAnswer(value)
    if (id === 8) {
        if (normalized.includes('±3') || normalized.includes('+-3')) return true
        const numbers = normalized.match(/-?\d+(?:[.,]\d+)?/g)?.map((number) => Number(number.replace(',', '.'))) ?? []
        return numbers.includes(-3) && numbers.includes(3)
    }
    if (id === 9) return normalized === '0' || answers.some((answer) => normalizeAnswer(answer) === normalized)
    return answers.some((answer) => normalizeAnswer(answer) === normalized)
}

function useStoredIds(key: string) {
    const [ids, setIds] = useState<number[]>(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored ? JSON.parse(stored) as number[] : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(ids))
    }, [ids, key])

    const add = (id: number) => setIds((current) => current.includes(id) ? current : [...current, id])
    return { ids, add }
}

function useStoredStages(key: string) {
    const [stages, setStages] = useState<LearningStageId[]>(() => {
        try {
            const stored = localStorage.getItem(key)
            return stored ? JSON.parse(stored) as LearningStageId[] : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(stages))
    }, [key, stages])

    const add = (id: LearningStageId) => setStages((current) => current.includes(id) ? current : [...current, id])
    return { stages, add }
}

function formatSigned(value: number, variable = '') {
    if (value === 0) return ''
    const magnitude = `${Math.abs(value)}${variable}`
    return value > 0 ? `+${magnitude}` : `-${magnitude}`
}

function gcd(left: number, right: number): number {
    return right === 0 ? Math.abs(left) : gcd(right, left % right)
}

function exactValue(numerator: number, denominator: number) {
    if (denominator === 0) return '\\text{indefinitua}'
    const divisor = gcd(numerator, denominator)
    const top = numerator / divisor
    const bottom = denominator / divisor
    if (bottom === 1) return String(top)
    if (bottom === -1) return String(-top)
    const sign = bottom < 0 ? -1 : 1
    return `\\frac{${top * sign}}{${Math.abs(bottom)}}`
}

function decimalValue(value: number) {
    if (Number.isInteger(value)) return String(value)
    return value.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')
}

function shuffled<T>(items: T[]) {
    return [...items].sort(() => Math.random() - 0.5)
}

function QuadraticCanvas({ a, b, c, description }: { a: number; b: number; c: number; description: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const context = canvas.getContext('2d')
        if (!context) return

        const ratio = window.devicePixelRatio || 1
        const width = canvas.clientWidth
        const height = canvas.clientHeight
        canvas.width = width * ratio
        canvas.height = height * ratio
        context.scale(ratio, ratio)
        context.clearRect(0, 0, width, height)

        const xMin = -10
        const xMax = 10
        const yMin = -12
        const yMax = 12
        const toX = (x: number) => ((x - xMin) / (xMax - xMin)) * width
        const toY = (y: number) => height - ((y - yMin) / (yMax - yMin)) * height

        context.strokeStyle = 'rgba(148, 163, 184, 0.16)'
        context.lineWidth = 1
        for (let value = -10; value <= 10; value += 2) {
            context.beginPath()
            context.moveTo(toX(value), 0)
            context.lineTo(toX(value), height)
            context.stroke()
        }
        for (let value = -10; value <= 10; value += 2) {
            context.beginPath()
            context.moveTo(0, toY(value))
            context.lineTo(width, toY(value))
            context.stroke()
        }

        context.strokeStyle = 'rgba(226, 232, 240, 0.55)'
        context.lineWidth = 1.5
        context.beginPath()
        context.moveTo(0, toY(0))
        context.lineTo(width, toY(0))
        context.moveTo(toX(0), 0)
        context.lineTo(toX(0), height)
        context.stroke()

        context.strokeStyle = '#38bdf8'
        context.lineWidth = 3
        context.beginPath()
        let started = false
        for (let pixel = 0; pixel <= width; pixel += 1) {
            const x = xMin + (pixel / width) * (xMax - xMin)
            const y = a * x * x + b * x + c
            if (y >= yMin - 4 && y <= yMax + 4) {
                const pointY = toY(y)
                if (!started) {
                    context.moveTo(pixel, pointY)
                    started = true
                } else {
                    context.lineTo(pixel, pointY)
                }
            } else {
                started = false
            }
        }
        context.stroke()
    }, [a, b, c])

    return <canvas ref={canvasRef} className="prototype-quadratic-canvas" role="img" aria-label={description} />
}

export function EkuazioakPrototypePage() {
    const { i18n } = useTranslation()
    const lang = normalizeEkuazioakLang(i18n.language)
    const isRtl = lang === 'ar'
    const [section, setSection] = useState<PrototypeSection>('route')
    const [stageId, setStageId] = useState<LearningStageId>('meaning')
    const learned = useStoredStages('matella-ekuazioak-v2-learned')
    const practiceProgress = useStoredIds('matella-ekuazioak-v2-practice')
    const challengeProgress = useStoredIds('matella-ekuazioak-v2-challenges')

    const currentStage = learningStages.find((stage) => stage.id === stageId) ?? learningStages[0]
    const totalGoals = learningStages.length + guidedPractice.length + ekuazioakMissions.length
    const completedGoals = learned.stages.length + practiceProgress.ids.length + challengeProgress.ids.length
    const progress = Math.round((completedGoals / totalGoals) * 100)
    const recommendedStage = learningStages.find((stage) => !learned.stages.includes(stage.id)) ?? learningStages[learningStages.length - 1]

    const navigate = (next: PrototypeSection) => {
        setSection(next)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <div className="ekuazioak-prototype" dir={isRtl ? 'rtl' : 'ltr'}>
            <header className="prototype-unit-header">
                <div className="prototype-unit-brand">
                    <div className="prototype-brand-mark" aria-hidden="true">E=</div>
                    <div>
                        <span className="prototype-kicker">MATELLA · DBH 2</span>
                        <strong>{l(lang, 'Ekuazioak', 'Ecuaciones', 'المعادلات')}</strong>
                    </div>
                </div>
                <nav className="prototype-unit-nav" aria-label={l(lang, 'Unitateko nabigazioa', 'Navegación de la unidad', 'التنقل في الوحدة')}>
                    {prototypeSections.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className={section === item.id ? 'active' : ''}
                            aria-current={section === item.id ? 'page' : undefined}
                            onClick={() => navigate(item.id)}
                        >
                            <span aria-hidden="true">{item.icon}</span>
                            {pickText(lang, item.label)}
                        </button>
                    ))}
                </nav>
                <div className="prototype-header-tools">
                    <div className="prototype-language-switch" role="group" aria-label={l(lang, 'Hizkuntza', 'Idioma', 'اللغة')}>
                        {(['eu', 'es', 'ar'] as const).map((language) => (
                            <button key={language} className={lang === language ? 'active' : ''} aria-pressed={lang === language} onClick={() => i18n.changeLanguage(language)}>
                                {language === 'ar' ? 'AR' : language.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <Link className="prototype-original-link" to="/matematika/dbh2/ekuazioak">
                        {l(lang, 'Jatorrizkoa ikusi', 'Ver versión original', 'عرض النسخة الأصلية')} ↗
                    </Link>
                </div>
            </header>

            <main className="prototype-main">
                {section === 'route' && (
                    <RoutePanel
                        lang={lang}
                        progress={progress}
                        completedGoals={completedGoals}
                        totalGoals={totalGoals}
                        learnedStages={learned.stages}
                        recommendedStage={recommendedStage.id}
                        onOpenStage={(id) => { setStageId(id); navigate('learn') }}
                        onNavigate={navigate}
                    />
                )}
                {section === 'learn' && (
                    <LearnPanel
                        lang={lang}
                        currentStage={currentStage}
                        completed={learned.stages.includes(currentStage.id)}
                        onSelect={setStageId}
                        onComplete={() => learned.add(currentStage.id)}
                        onNavigate={navigate}
                    />
                )}
                {section === 'lab' && <LabPanel lang={lang} />}
                {section === 'practice' && (
                    <PracticePanel lang={lang} completed={practiceProgress.ids} onComplete={practiceProgress.add} />
                )}
                {section === 'challenges' && (
                    <ChallengesPanel lang={lang} completed={challengeProgress.ids} onComplete={challengeProgress.add} />
                )}
                {section === 'games' && <GamesPanel lang={lang} />}
            </main>
        </div>
    )
}

interface PanelLangProps {
    lang: ReturnType<typeof normalizeEkuazioakLang>
}

function RoutePanel({
    lang,
    progress,
    completedGoals,
    totalGoals,
    learnedStages,
    recommendedStage,
    onOpenStage,
    onNavigate
}: PanelLangProps & {
    progress: number
    completedGoals: number
    totalGoals: number
    learnedStages: LearningStageId[]
    recommendedStage: LearningStageId
    onOpenStage: (id: LearningStageId) => void
    onNavigate: (section: PrototypeSection) => void
}) {
    const recommended = learningStages.find((stage) => stage.id === recommendedStage) ?? learningStages[0]

    return (
        <div className="prototype-panel route-panel">
            <section className="prototype-hero">
                <div className="prototype-hero-copy">
                    <span className="prototype-eyebrow">{l(lang, 'IKASKUNTZA IBILBIDEA', 'RECORRIDO DE APRENDIZAJE', 'مسار التعلّم')}</span>
                    <h1>{l(lang, 'Ekuazioak ulertu, ez bakarrik ebatzi.', 'Entiende las ecuaciones, no solo las resuelvas.', 'افهم المعادلات، لا تكتفِ بحلها.')}</h1>
                    <p>{l(lang, 'Oreka ulertzetik egoera errealak modelizatzera. Pauso laburrak, tresna bisualak eta une bakoitzean zer egin jakiteko ibilbide argia.', 'Desde comprender el equilibrio hasta modelizar situaciones reales. Pasos breves, herramientas visuales y un recorrido que siempre te indica qué hacer después.', 'من فهم التوازن إلى نمذجة مواقف حقيقية، بخطوات قصيرة وأدوات بصرية ومسار واضح.')}</p>
                    <div className="prototype-hero-actions">
                        <button className="prototype-primary-action" onClick={() => onOpenStage(recommended.id)}>
                            {progress === 0 ? l(lang, 'Ibilbidea hasi', 'Empezar recorrido', 'ابدأ المسار') : l(lang, 'Ikasten jarraitu', 'Continuar aprendiendo', 'تابع التعلّم')}
                            <span aria-hidden="true">→</span>
                        </button>
                        <button className="prototype-secondary-action" onClick={() => onNavigate('lab')}>
                            ⚖ {l(lang, 'Laborategira', 'Abrir laboratorio', 'افتح المختبر')}
                        </button>
                    </div>
                </div>
                <div className="prototype-progress-card">
                    <div className="prototype-progress-ring" style={{ '--progress': `${progress * 3.6}deg` } as CSSProperties}>
                        <div><strong>{progress}%</strong><span>{l(lang, 'osatuta', 'completado', 'مكتمل')}</span></div>
                    </div>
                    <div>
                        <span className="prototype-card-label">{l(lang, 'ZURE AURRERAPENA', 'TU PROGRESO', 'تقدّمك')}</span>
                        <h2>{completedGoals}/{totalGoals} {l(lang, 'helburu', 'objetivos', 'هدفاً')}</h2>
                        <p>{l(lang, 'Aurrerapena gailu honetan gordetzen da.', 'El progreso se guarda en este dispositivo.', 'يُحفظ التقدم على هذا الجهاز.')}</p>
                    </div>
                </div>
            </section>

            <section className="prototype-learning-path" aria-labelledby="path-title">
                <div className="prototype-section-heading">
                    <div>
                        <span className="prototype-eyebrow">{l(lang, '5 ETAPA', '5 ETAPAS', '5 مراحل')}</span>
                        <h2 id="path-title">{l(lang, 'Zure ikaskuntza mapa', 'Tu mapa de aprendizaje', 'خريطة تعلّمك')}</h2>
                    </div>
                    <p>{l(lang, 'Etapa bakoitzak teoria, esperimentua eta praktika lotzen ditu.', 'Cada etapa conecta explicación, experimento y práctica.', 'تربط كل مرحلة بين الشرح والتجربة والتدريب.')}</p>
                </div>
                <div className="prototype-stage-list">
                    {learningStages.map((stage, index) => {
                        const done = learnedStages.includes(stage.id)
                        const recommendedNow = stage.id === recommendedStage
                        return (
                            <article key={stage.id} className={`prototype-stage-row ${done ? 'done' : ''} ${recommendedNow ? 'recommended' : ''}`}>
                                <span className="prototype-stage-number">{stage.number}</span>
                                <div className="prototype-stage-icon" aria-hidden="true">{stage.icon}</div>
                                <div className="prototype-stage-copy">
                                    <span>{pickText(lang, stage.eyebrow)}</span>
                                    <h3>{pickText(lang, stage.title)}</h3>
                                    <p>{pickText(lang, stage.description)}</p>
                                </div>
                                <div className="prototype-stage-status">
                                    {done && <span className="status-done">✓ {l(lang, 'Eginda', 'Completada', 'مكتملة')}</span>}
                                    {!done && recommendedNow && <span className="status-next">{l(lang, 'Hurrengoa', 'Siguiente', 'التالي')}</span>}
                                </div>
                                <button onClick={() => onOpenStage(stage.id)} aria-label={`${l(lang, 'Ireki', 'Abrir', 'افتح')} ${pickText(lang, stage.title)}`}>
                                    {index === 0 && !done ? l(lang, 'Hasi', 'Empezar', 'ابدأ') : l(lang, 'Ireki', 'Abrir', 'افتح')} <span aria-hidden="true">→</span>
                                </button>
                            </article>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

function LearnPanel({ lang, currentStage, completed, onSelect, onComplete, onNavigate }: PanelLangProps & {
    currentStage: (typeof learningStages)[number]
    completed: boolean
    onSelect: (id: LearningStageId) => void
    onComplete: () => void
    onNavigate: (section: PrototypeSection) => void
}) {
    return (
        <div className="prototype-panel learn-panel">
            <header className="prototype-page-heading">
                <span className="prototype-eyebrow">{l(lang, 'ULERTU · IKUSI · PROBATU', 'COMPRENDE · OBSERVA · PRUEBA', 'افهم · لاحظ · جرّب')}</span>
                <h1>{l(lang, 'Ikasi pausoz pauso', 'Aprende paso a paso', 'تعلّم خطوة بخطوة')}</h1>
                <p>{l(lang, 'Kontzeptu bakoitza adibide gidatu batekin eta hurrengo ekintza argi batekin.', 'Cada concepto incluye un ejemplo guiado y una acción clara para continuar.', 'كل مفهوم يتضمن مثالاً موجهاً وخطوة واضحة للمتابعة.')}</p>
            </header>

            <nav className="prototype-stage-tabs" aria-label={l(lang, 'Ikaskuntza etapak', 'Etapas de aprendizaje', 'مراحل التعلّم')}>
                {learningStages.map((stage) => (
                    <button key={stage.id} className={stage.id === currentStage.id ? 'active' : ''} aria-current={stage.id === currentStage.id ? 'step' : undefined} onClick={() => onSelect(stage.id)}>
                        <span>{stage.number}</span>{pickText(lang, stage.title)}
                    </button>
                ))}
            </nav>

            <article className="prototype-lesson-card">
                <div className="prototype-lesson-main">
                    <span className="prototype-lesson-index">{currentStage.number} · {pickText(lang, currentStage.eyebrow)}</span>
                    <h2>{pickText(lang, currentStage.title)}</h2>
                    <div className="prototype-objective">
                        <strong>{l(lang, 'HELBURUA', 'OBJETIVO', 'الهدف')}</strong>
                        <MathText text={pickText(lang, currentStage.objective)} />
                    </div>
                    <p className="prototype-lesson-explanation"><MathText text={pickText(lang, currentStage.explanation)} /></p>
                    <div className="prototype-guided-example">
                        <span>{l(lang, 'ADIBIDE GIDATUA', 'EJEMPLO GUIADO', 'مثال موجّه')}</span>
                        <MathText text={pickText(lang, currentStage.example)} />
                    </div>
                </div>
                <aside className="prototype-step-card">
                    <span className="prototype-card-label">{l(lang, 'ARRAKASTARAKO PAUSOAK', 'PASOS PARA ACERTAR', 'خطوات النجاح')}</span>
                    <ol>
                        {currentStage.steps.map((step, index) => <li key={index}><span>{index + 1}</span><MathText text={pickText(lang, step)} /></li>)}
                    </ol>
                    <button className={completed ? 'completed' : ''} onClick={onComplete} disabled={completed}>
                        {completed ? `✓ ${l(lang, 'Etapa ulertuta', 'Etapa comprendida', 'تم فهم المرحلة')}` : l(lang, 'Ulertuta markatu', 'Marcar como comprendida', 'علّمها كمفهومة')}
                    </button>
                </aside>
            </article>

            <div className="prototype-next-actions">
                <button onClick={() => onNavigate('lab')}><span>⚖</span><div><small>{l(lang, 'ORAIN PROBATU', 'AHORA PRUEBA', 'جرّب الآن')}</small><strong>{l(lang, 'Kontzeptua laborategian', 'El concepto en el laboratorio', 'المفهوم في المختبر')}</strong></div><b>→</b></button>
                <button onClick={() => onNavigate('practice')}><span>✎</span><div><small>{l(lang, 'GERO PRAKTIKATU', 'DESPUÉS PRACTICA', 'ثم تدرّب')}</small><strong>{currentStage.practiceIds.length} {l(lang, 'ariketa gidatu', 'ejercicios guiados', 'تمارين موجّهة')}</strong></div><b>→</b></button>
            </div>
        </div>
    )
}

function LabPanel({ lang }: PanelLangProps) {
    const [mode, setMode] = useState<LabMode>('balance')
    const [balanceB, setBalanceB] = useState(5)
    const [balanceC, setBalanceC] = useState(12)
    const [operation, setOperation] = useState(-5)
    const [balanceHistory, setBalanceHistory] = useState<string[]>(['x+5=12'])
    const [linearA, setLinearA] = useState(3)
    const [linearB, setLinearB] = useState(-4)
    const [linearC, setLinearC] = useState(11)
    const [quadA, setQuadA] = useState(1)
    const [quadB, setQuadB] = useState(-5)
    const [quadC, setQuadC] = useState(6)

    const balanceEquation = `x${formatSigned(balanceB)}=${balanceC}`
    const resetBalance = (b = 5, c = 12) => {
        setBalanceB(b)
        setBalanceC(c)
        setOperation(-b)
        setBalanceHistory([`x${formatSigned(b)}=${c}`])
    }
    const applyOperation = () => {
        const nextB = balanceB + operation
        const nextC = balanceC + operation
        setBalanceB(nextB)
        setBalanceC(nextC)
        setBalanceHistory((history) => [...history, `x${formatSigned(nextB)}=${nextC}`])
        setOperation(nextB === 0 ? 0 : -nextB)
    }

    const linearSteps = useMemo(() => {
        const equation = `${linearA}x${formatSigned(linearB)}=${linearC}`
        if (linearA === 0 && linearB === linearC) return { kind: 'infinite', equation, steps: [`${linearB}=${linearC}`] }
        if (linearA === 0) return { kind: 'none', equation, steps: [`${linearB}=${linearC}`] }
        const numerator = linearC - linearB
        const solution = numerator / linearA
        return {
            kind: 'solution',
            equation,
            solution,
            steps: [`${linearA}x=${linearC}-${linearB >= 0 ? `(${linearB})` : `(${linearB})`}=${numerator}`, `x=${exactValue(numerator, linearA)}`, `${linearA}\\cdot(${exactValue(numerator, linearA)})${formatSigned(linearB)}=${linearC}`]
        }
    }, [linearA, linearB, linearC])

    const discriminant = quadB ** 2 - 4 * quadA * quadC
    const quadraticSummary = useMemo(() => {
        if (quadA === 0) return { kind: 'linear', text: l(lang, 'Ez da bigarren mailakoa: $a=0$.', 'No es de segundo grado: $a=0$.', 'ليست من الدرجة الثانية لأن $a=0$.') }
        if (discriminant < 0) return { kind: 'none', text: l(lang, 'Ez dago soluzio errealik.', 'No hay soluciones reales.', 'لا توجد حلول حقيقية.') }
        if (discriminant === 0) {
            const root = -quadB / (2 * quadA)
            return { kind: 'one', text: `${l(lang, 'Soluzio bikoitza', 'Solución doble', 'حل مزدوج')}: $x=${decimalValue(root)}$` }
        }
        const root = Math.sqrt(discriminant)
        const x1 = (-quadB + root) / (2 * quadA)
        const x2 = (-quadB - root) / (2 * quadA)
        return { kind: 'two', text: `${l(lang, 'Bi soluzio erreal', 'Dos soluciones reales', 'حلّان حقيقيان')}: $x_1\\approx${decimalValue(x1)},\\quad x_2\\approx${decimalValue(x2)}$` }
    }, [discriminant, lang, quadA, quadB])

    const labLabels: Array<{ id: LabMode; icon: string; title: string; subtitle: string }> = [
        { id: 'balance', icon: '⚖', title: l(lang, 'Oreka', 'Balanza', 'الميزان'), subtitle: l(lang, 'Egin eragiketa bera', 'Opera en ambos lados', 'طبّق العملية على الطرفين') },
        { id: 'linear', icon: 'x', title: l(lang, 'Ebazle gidatua', 'Resolutor guiado', 'حل موجّه'), subtitle: l(lang, 'Ulertu pauso bakoitza', 'Entiende cada paso', 'افهم كل خطوة') },
        { id: 'quadratic', icon: 'x²', title: l(lang, 'Parabolak', 'Parábolas', 'القطع المكافئ'), subtitle: l(lang, 'Ikusi diskriminatzailea', 'Visualiza el discriminante', 'شاهد المميّز') }
    ]

    return (
        <div className="prototype-panel lab-panel-v2">
            <header className="prototype-page-heading">
                <span className="prototype-eyebrow">{l(lang, 'UKITU · ALDATU · ULERTU', 'TOCA · CAMBIA · COMPRENDE', 'غيّر · جرّب · افهم')}</span>
                <h1>{l(lang, 'Ekuazioen laborategia', 'Laboratorio de ecuaciones', 'مختبر المعادلات')}</h1>
                <p>{l(lang, 'Ez begiratu soilik emaitzari: aldatu balioak eta behatu pauso bakoitzean zer gertatzen den.', 'No te limites a mirar el resultado: cambia valores y observa qué ocurre en cada paso.', 'لا تكتفِ بالنتيجة؛ غيّر القيم ولاحظ ما يحدث في كل خطوة.')}</p>
            </header>

            <div className="prototype-lab-tabs" role="tablist" aria-label={l(lang, 'Laborategiko tresnak', 'Herramientas del laboratorio', 'أدوات المختبر')}>
                {labLabels.map((item) => (
                    <button key={item.id} role="tab" aria-selected={mode === item.id} aria-controls={`prototype-lab-${item.id}`} className={mode === item.id ? 'active' : ''} onClick={() => setMode(item.id)}>
                        <span aria-hidden="true">{item.icon}</span><div><strong>{item.title}</strong><small>{item.subtitle}</small></div>
                    </button>
                ))}
            </div>

            {mode === 'balance' && (
                <section id="prototype-lab-balance" role="tabpanel" className="prototype-tool-panel">
                    <div className="prototype-tool-heading"><div><span className="prototype-card-label">{l(lang, 'OREKAREN PRINTZIPIOA', 'PRINCIPIO DE EQUILIBRIO', 'مبدأ التوازن')}</span><h2>{l(lang, 'Aldatu bi aldeak batera', 'Modifica los dos miembros a la vez', 'غيّر الطرفين معاً')}</h2></div><MathText text={`$${balanceEquation}$`} /></div>
                    <div className="prototype-balance-visual" aria-label={l(lang, 'Ekuazio orekatua', 'Ecuación equilibrada', 'معادلة متوازنة')}>
                        <div className="prototype-pan left"><div><span className="x-block">x</span>{balanceB !== 0 && <span className="number-block">{formatSigned(balanceB)}</span>}</div></div>
                        <div className="prototype-balance-center"><span></span><i></i></div>
                        <div className="prototype-pan right"><div><span className="number-block">{balanceC}</span></div></div>
                    </div>
                    <div className="prototype-operation-box">
                        <label>{l(lang, 'Bi aldeetan aplikatu', 'Aplicar en ambos miembros', 'طبّق على الطرفين')}<input type="number" value={operation} onChange={(event) => setOperation(Number(event.target.value))} /></label>
                        <button className="prototype-primary-action" onClick={applyOperation}>{operation >= 0 ? '+' : ''}{operation} {l(lang, 'bi aldeetan', 'en ambos', 'على الطرفين')}</button>
                        <button className="prototype-ghost-action" onClick={() => setOperation(-balanceB)}>{l(lang, 'Iradokitako pausoa', 'Paso recomendado', 'الخطوة المقترحة')}: {formatSigned(-balanceB) || '0'}</button>
                    </div>
                    <div className="prototype-history">
                        <strong>{l(lang, 'Ekuazio baliokideak', 'Ecuaciones equivalentes', 'معادلات متكافئة')}</strong>
                        <div>{balanceHistory.map((item, index) => <span key={`${item}-${index}`}><MathText text={`$${item}$`} />{index < balanceHistory.length - 1 && <b>⇔</b>}</span>)}</div>
                    </div>
                    {balanceB === 0 && <div className="prototype-success-banner" role="status">✓ {l(lang, 'Ezezaguna bakarrik geratu da', 'La incógnita ha quedado aislada', 'تم عزل المجهول')}: <MathText text={`$x=${balanceC}$`} /></div>}
                    <div className="prototype-example-buttons"><span>{l(lang, 'Beste adibide bat', 'Otro ejemplo', 'مثال آخر')}:</span><button onClick={() => resetBalance(5, 12)}>$x+5=12$</button><button onClick={() => resetBalance(-3, 8)}>$x-3=8$</button><button onClick={() => resetBalance(7, 2)}>$x+7=2$</button></div>
                </section>
            )}

            {mode === 'linear' && (
                <section id="prototype-lab-linear" role="tabpanel" className="prototype-tool-panel">
                    <div className="prototype-tool-heading"><div><span className="prototype-card-label">{l(lang, 'LEHEN MAILA', 'PRIMER GRADO', 'الدرجة الأولى')}</span><h2>{l(lang, 'Ebazpena azalpenarekin', 'Resolución con explicación', 'حل مع شرح')}</h2></div><MathText text="$ax+b=c$" /></div>
                    <div className="prototype-coefficient-grid">
                        {([['a', linearA, setLinearA], ['b', linearB, setLinearB], ['c', linearC, setLinearC]] as const).map(([name, value, setter]) => <label key={name}><MathText text={`$${name}$`} /><input type="number" value={value} onChange={(event) => setter(Number(event.target.value))} /></label>)}
                    </div>
                    <div className="prototype-solver-grid">
                        <div className="prototype-equation-focus"><span>{l(lang, 'ZURE EKUAZIOA', 'TU ECUACIÓN', 'معادلتك')}</span><MathText text={`$$${linearSteps.equation}$$`} /></div>
                        <div className="prototype-solution-steps" aria-live="polite">
                            <span className="prototype-card-label">{l(lang, 'ARRAZOIKETA', 'RAZONAMIENTO', 'الاستدلال')}</span>
                            {linearSteps.kind === 'solution' && <ol>{linearSteps.steps.map((step, index) => <li key={step}><span>{index + 1}</span><MathText text={`$${step}$`} /></li>)}</ol>}
                            {linearSteps.kind === 'infinite' && <div className="prototype-case-message"><strong>∞</strong><p>{l(lang, 'Berdintasuna beti egia da: infinitu soluzio.', 'La igualdad siempre es verdadera: hay infinitas soluciones.', 'المساواة صحيحة دائماً: حلول لا نهائية.')}</p></div>}
                            {linearSteps.kind === 'none' && <div className="prototype-case-message error"><strong>∅</strong><p>{l(lang, 'Berdintasuna kontraesana da: ez dago soluziorik.', 'La igualdad es una contradicción: no hay solución.', 'المساواة متناقضة: لا يوجد حل.')}</p></div>}
                        </div>
                    </div>
                </section>
            )}

            {mode === 'quadratic' && (
                <section id="prototype-lab-quadratic" role="tabpanel" className="prototype-tool-panel">
                    <div className="prototype-tool-heading"><div><span className="prototype-card-label">{l(lang, 'BIGARREN MAILA · ZABALTZEA', 'SEGUNDO GRADO · AMPLIACIÓN', 'الدرجة الثانية · توسع')}</span><h2>{l(lang, 'Diskriminatzailea ikusi', 'Observa el discriminante', 'شاهد المميّز')}</h2></div><MathText text="$ax^2+bx+c=0$" /></div>
                    <div className="prototype-coefficient-grid">
                        {([['a', quadA, setQuadA], ['b', quadB, setQuadB], ['c', quadC, setQuadC]] as const).map(([name, value, setter]) => <label key={name}><MathText text={`$${name}$`} /><input type="number" value={value} onChange={(event) => setter(Number(event.target.value))} /></label>)}
                    </div>
                    <div className="prototype-quadratic-grid">
                        <div className="prototype-graph-card">
                            <QuadraticCanvas a={quadA} b={quadB} c={quadC} description={l(lang, 'Sartutako koefizienteen parabola', 'Parábola de los coeficientes introducidos', 'منحنى القطع المكافئ للمعاملات المدخلة')} />
                            <p>{l(lang, 'X ardatzarekiko ebakidurak soluzio errealak dira.', 'Los cortes con el eje X son las soluciones reales.', 'نقاط تقاطع المنحنى مع محور X هي الحلول الحقيقية.')}</p>
                        </div>
                        <div className="prototype-discriminant-card">
                            <span className="prototype-card-label">{l(lang, 'DISKRIMINATZAILEA', 'DISCRIMINANTE', 'المميّز')}</span>
                            <MathText text={`$$\\Delta=(${quadB})^2-4\\cdot(${quadA})\\cdot(${quadC})=${discriminant}$$`} />
                            <div className={`prototype-delta-value ${quadraticSummary.kind}`}><strong>{discriminant}</strong><span>Δ</span></div>
                            <p><MathText text={quadraticSummary.text} /></p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    )
}

function PracticePanel({ lang, completed, onComplete }: PanelLangProps & { completed: number[]; onComplete: (id: number) => void }) {
    const [stageFilter, setStageFilter] = useState<LearningStageId | 'all'>('all')
    const [answers, setAnswers] = useState<Record<number, string>>({})
    const [feedback, setFeedback] = useState<Record<number, Feedback>>({})
    const [hints, setHints] = useState<number[]>([])
    const filtered = guidedPractice.filter((item) => stageFilter === 'all' || item.stage === stageFilter)

    const check = (id: number) => {
        const item = guidedPractice.find((entry) => entry.id === id)
        if (!item) return
        if (answerMatches(answers[id] ?? '', item.answers)) {
            setFeedback((current) => ({ ...current, [id]: 'success' }))
            onComplete(id)
        } else {
            setFeedback((current) => ({ ...current, [id]: 'error' }))
        }
    }

    return (
        <div className="prototype-panel practice-panel-v2">
            <header className="prototype-page-heading split">
                <div><span className="prototype-eyebrow">{l(lang, 'PRAKTIKA AKTIBOA', 'PRÁCTICA ACTIVA', 'تدريب نشط')}</span><h1>{l(lang, 'Saiatu lehenik. Ulertu ondoren.', 'Inténtalo primero. Entiéndelo después.', 'حاول أولاً، ثم افهم.')}</h1><p>{l(lang, '8 ariketa autokorregigarri eta 56 ariketako banku osoa.', '8 ejercicios autocorregibles y el banco completo de 56 actividades.', '8 تمارين ذاتية التصحيح وبنك كامل من 56 نشاطاً.')}</p></div>
                <div className="prototype-mini-progress"><strong>{completed.length}/8</strong><span>{l(lang, 'gidatuak eginda', 'guiados completados', 'تمارين موجّهة مكتملة')}</span></div>
            </header>

            <div className="prototype-filter-row" role="group" aria-label={l(lang, 'Ariketa iragazkia', 'Filtro de ejercicios', 'تصفية التمارين')}>
                <button className={stageFilter === 'all' ? 'active' : ''} onClick={() => setStageFilter('all')}>{l(lang, 'Guztiak', 'Todos', 'الكل')}</button>
                {learningStages.map((stage) => <button key={stage.id} className={stageFilter === stage.id ? 'active' : ''} onClick={() => setStageFilter(stage.id)}>{pickText(lang, stage.title)}</button>)}
            </div>

            <div className="prototype-practice-grid">
                {filtered.map((item) => {
                    const state = feedback[item.id] ?? 'idle'
                    const done = completed.includes(item.id)
                    return (
                        <article key={item.id} className={`prototype-practice-card ${state} ${done ? 'done' : ''}`}>
                            <div className="prototype-practice-meta"><span>{String(item.id).padStart(2, '0')}</span><b className={item.difficulty}>{item.difficulty}</b>{done && <i>✓</i>}</div>
                            <div className="prototype-practice-question"><MathText text={pickText(lang, item.prompt)} /></div>
                            <label>{l(lang, 'Zure erantzuna', 'Tu respuesta', 'إجابتك')}<input value={answers[item.id] ?? ''} onChange={(event) => { setAnswers((current) => ({ ...current, [item.id]: event.target.value })); setFeedback((current) => ({ ...current, [item.id]: 'idle' })) }} onKeyDown={(event) => event.key === 'Enter' && check(item.id)} /></label>
                            <div className="prototype-practice-actions"><button onClick={() => setHints((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])}>💡 {l(lang, 'Pista', 'Pista', 'تلميح')}</button><button className="check" onClick={() => check(item.id)}>{l(lang, 'Egiaztatu', 'Comprobar', 'تحقق')}</button></div>
                            {hints.includes(item.id) && state === 'idle' && <div className="prototype-hint"><MathText text={pickText(lang, item.help)} /></div>}
                            {state === 'success' && <div className="prototype-answer-feedback success" role="status"><strong>✓ {pickText(lang, item.success)}</strong><MathText text={pickText(lang, item.solution)} /></div>}
                            {state === 'error' && <div className="prototype-answer-feedback error" role="alert"><strong>{l(lang, 'Oraindik ez', 'Todavía no', 'ليس بعد')}</strong><MathText text={pickText(lang, item.help)} /></div>}
                        </article>
                    )
                })}
            </div>

            <section className="prototype-exercise-bank">
                <div className="prototype-section-heading"><div><span className="prototype-eyebrow">{l(lang, 'ARIKETA BANKUA', 'BANCO DE EJERCICIOS', 'بنك التمارين')}</span><h2>{l(lang, '56 ariketa pausoka antolatuta', '56 ejercicios organizados por progresión', '56 تمريناً مرتبة بالتدرّج')}</h2></div><p>{l(lang, 'Erabili hau praktika gehigarrirako edo irakasleak aukeratutako lanerako.', 'Utilízalo como práctica adicional o para el trabajo seleccionado por el profesorado.', 'استخدمها للتدريب الإضافي أو للعمل الذي يختاره المعلّم.')}</p></div>
                <div className="prototype-bank-list">
                    {ekuazioakExerciseSections.map((group) => (
                        <details key={group.id}>
                            <summary><span>{group.icon}</span><div><strong>{pickText(lang, group.title)}</strong><small>{group.count} {l(lang, 'ariketa', 'ejercicios', 'تمارين')}</small></div><b aria-hidden="true">+</b></summary>
                            <div className="prototype-bank-grid">
                                {group.items.map((item) => <details key={item.id} className="prototype-bank-item"><summary><span>{item.id}</span><MathText text={pickText(lang, item.question)} /></summary><div><strong>{l(lang, 'Soluzioa', 'Solución', 'الحل')}</strong><MathText text={pickText(lang, item.solution)} /></div></details>)}
                            </div>
                        </details>
                    ))}
                </div>
            </section>
        </div>
    )
}

function ChallengesPanel({ lang, completed, onComplete }: PanelLangProps & { completed: number[]; onComplete: (id: number) => void }) {
    const [challengeId, setChallengeId] = useState(1)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState<Feedback>('idle')
    const [showHint, setShowHint] = useState(false)
    const current = ekuazioakMissions.find((mission) => mission.id === challengeId) ?? ekuazioakMissions[0]
    const totalPoints = completed.reduce((sum, id) => sum + (ekuazioakMissions.find((mission) => mission.id === id)?.points ?? 0), 0)

    const check = () => {
        if (missionAnswerMatches(current.id, answer, current.answer)) {
            setFeedback('success')
            onComplete(current.id)
        } else {
            setFeedback('error')
        }
    }
    const selectChallenge = (id: number) => { setChallengeId(id); setAnswer(''); setFeedback('idle'); setShowHint(false) }
    const next = () => selectChallenge(current.id === ekuazioakMissions.length ? 1 : current.id + 1)

    return (
        <div className="prototype-panel challenges-panel-v2">
            <header className="prototype-page-heading split">
                <div><span className="prototype-eyebrow">{l(lang, '9 ERRONKA · 3 MAILA', '9 RETOS · 3 NIVELES', '9 تحديات · 3 مستويات')}</span><h1>{l(lang, 'Erakutsi zer dakizun', 'Demuestra lo que sabes', 'أظهر ما تعرفه')}</h1><p>{l(lang, 'Idatzi erantzuna zure modura: sistemak formatu baliokideak onartzen ditu.', 'Escribe la respuesta a tu manera: el sistema acepta formatos equivalentes.', 'اكتب الإجابة بطريقتك؛ يقبل النظام الصيغ المتكافئة.')}</p></div>
                <div className="prototype-points-card"><span>◆</span><strong>{totalPoints}</strong><small>{l(lang, 'puntu', 'puntos', 'نقطة')}</small></div>
            </header>

            <div className="prototype-challenge-layout">
                <nav className="prototype-challenge-list" aria-label={l(lang, 'Erronken zerrenda', 'Lista de retos', 'قائمة التحديات')}>
                    {ekuazioakMissions.map((mission) => <button key={mission.id} className={`${mission.id === current.id ? 'active' : ''} ${completed.includes(mission.id) ? 'done' : ''}`} onClick={() => selectChallenge(mission.id)}><span>{mission.id}</span><div><small>{mission.difficulty}</small><strong>{pickText(lang, mission.title)}</strong></div>{completed.includes(mission.id) && <i>✓</i>}</button>)}
                </nav>
                <article className="prototype-active-challenge">
                    <div className="prototype-challenge-top"><span>{l(lang, 'ERRONKA', 'RETO', 'التحدي')} {current.id}/9</span><b>+{current.points} {l(lang, 'puntu', 'puntos', 'نقطة')}</b></div>
                    <h2>{pickText(lang, current.title)}</h2>
                    <div className="prototype-challenge-question"><MathText text={pickText(lang, current.description)} /></div>
                    <label>{l(lang, 'Zure erantzuna', 'Tu respuesta', 'إجابتك')}<input value={answer} onChange={(event) => { setAnswer(event.target.value); setFeedback('idle') }} onKeyDown={(event) => event.key === 'Enter' && check()} placeholder={l(lang, 'Adib.: x=5', 'Ej.: x=5', 'مثال: x=5')} /></label>
                    <div className="prototype-challenge-actions"><button className="prototype-ghost-action" onClick={() => setShowHint((value) => !value)}>💡 {showHint ? l(lang, 'Pista ezkutatu', 'Ocultar pista', 'إخفاء التلميح') : l(lang, 'Pista ikusi', 'Ver pista', 'عرض التلميح')}</button><button className="prototype-primary-action" onClick={check}>{l(lang, 'Egiaztatu', 'Comprobar', 'تحقق')}</button></div>
                    {showHint && feedback === 'idle' && <div className="prototype-hint"><MathText text={pickText(lang, current.hint)} /></div>}
                    {feedback === 'success' && <div className="prototype-challenge-feedback success" role="status"><span>✓</span><div><strong>{l(lang, 'Lortuta!', '¡Conseguido!', 'أحسنت!')}</strong><MathText text={pickText(lang, current.success)} /></div><button onClick={next}>{l(lang, 'Hurrengo erronka', 'Siguiente reto', 'التحدي التالي')} →</button></div>}
                    {feedback === 'error' && <div className="prototype-challenge-feedback error" role="alert"><span>↻</span><div><strong>{l(lang, 'Berriro saiatu', 'Prueba otra vez', 'حاول مجدداً')}</strong><MathText text={pickText(lang, current.error)} /></div></div>}
                </article>
            </div>
        </div>
    )
}

function GamesPanel({ lang }: PanelLangProps) {
    const [gameType, setGameType] = useState<'quiz' | 'detective'>('quiz')
    const [mode, setMode] = useState<GameMode>('mixed')
    const [questions, setQuestions] = useState<QuizQuestion[]>(() => shuffled(ekuazioakQuizQuestions))
    const [index, setIndex] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)

    const reset = (nextMode: GameMode) => {
        const nextQuestions = ekuazioakQuizQuestions.filter((question) => nextMode === 'mixed' || question.category === nextMode)
        setMode(nextMode)
        setQuestions(shuffled(nextQuestions))
        setIndex(0)
        setSelected(null)
        setScore(0)
        setFinished(false)
    }

    const current = questions[index]
    const choose = (option: number) => {
        if (selected !== null || !current) return
        setSelected(option)
        if (option === current.answer) setScore((value) => value + 1)
    }
    const next = () => {
        if (selected === null) return
        if (index === questions.length - 1) setFinished(true)
        else { setIndex((value) => value + 1); setSelected(null) }
    }
    const explanation = current?.category === 'problemak'
        ? l(lang, 'Lehenik erlazioa adierazpen aljebraiko bihurtu eta gero egiaztatu unitateak.', 'Primero traduce la relación a lenguaje algebraico y después comprueba las unidades.', 'حوّل العلاقة أولاً إلى لغة جبرية ثم تحقق من الوحدات.')
        : current?.category === 'bigarren-maila'
            ? l(lang, 'Begiratu berretzaileari, faktorizazioari edo diskriminatzaileari.', 'Observa el exponente, la factorización o el discriminante.', 'انظر إلى الأس أو التحليل أو المميّز.')
            : l(lang, 'Egin eragiketa bera bi aldeetan eta egiaztatu ordezkatuz.', 'Realiza la misma operación en ambos miembros y comprueba sustituyendo.', 'طبّق العملية نفسها على الطرفين وتحقق بالتعويض.')

    return (
        <div className="prototype-panel games-panel-v2">
            <header className="prototype-page-heading">
                <span className="prototype-eyebrow">{l(lang, 'BI JOKO · FEEDBACK ARGIA', 'DOS JUEGOS · FEEDBACK CLARO', 'لعبتان · تغذية راجعة واضحة')}</span>
                <h1>{l(lang, 'Jokatu, huts egin eta ikasi', 'Juega, equivócate y aprende', 'العب واخطئ وتعلّم')}</h1>
                <p>{l(lang, 'Aukeratu quiz azkarra edo bilakatu akatsen detektibe. Partida bakoitzak amaiera eta azalpena dauka.', 'Elige un quiz rápido o conviértete en detective de errores. Cada partida tiene final y explicación.', 'اختر اختباراً سريعاً أو كن محققاً للأخطاء. لكل جولة نهاية وشرح.')}</p>
            </header>

            <div className="prototype-game-type-switch">
                <button className={gameType === 'quiz' ? 'active' : ''} onClick={() => setGameType('quiz')}><span>✦</span><div><strong>{l(lang, 'Quiz espresa', 'Quiz exprés', 'اختبار سريع')}</strong><small>{l(lang, 'Aukeratu erantzuna', 'Elige la respuesta', 'اختر الإجابة')}</small></div></button>
                <button className={gameType === 'detective' ? 'active' : ''} onClick={() => setGameType('detective')}><span>⌕</span><div><strong>{l(lang, 'Akatsen detektibea', 'Detective de errores', 'محقق الأخطاء')}</strong><small>{l(lang, 'Aurkitu pauso faltsua', 'Encuentra el paso falso', 'اكتشف الخطوة الخاطئة')}</small></div></button>
            </div>

            {gameType === 'quiz' && (
                <>
                    <div className="prototype-game-modes">
                        {(['mixed', 'lehen-maila', 'problemak', 'bigarren-maila'] as GameMode[]).map((item) => <button key={item} className={mode === item ? 'active' : ''} onClick={() => reset(item)}><span>{item === 'mixed' ? '✦' : item === 'lehen-maila' ? 'x' : item === 'problemak' ? '?' : 'x²'}</span><strong>{item === 'mixed' ? l(lang, 'Nahasia', 'Mixto', 'مختلط') : item === 'lehen-maila' ? l(lang, 'Lehen maila', 'Primer grado', 'الدرجة الأولى') : item === 'problemak' ? l(lang, 'Problemak', 'Problemas', 'المسائل') : l(lang, 'Bigarren maila', 'Segundo grado', 'الدرجة الثانية')}</strong></button>)}
                    </div>

                    {!finished && current && (
                        <article className="prototype-quiz-card">
                            <div className="prototype-quiz-meta"><span>{l(lang, 'GALDERA', 'PREGUNTA', 'السؤال')} {index + 1}/{questions.length}</span><strong>{score} {l(lang, 'zuzen', 'aciertos', 'صحيحة')}</strong></div>
                            <div className="prototype-quiz-progress"><i style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
                            <h2><MathText text={pickText(lang, current.question)} /></h2>
                            <div className="prototype-quiz-options">
                                {current.options.map((option, optionIndex) => {
                                    const isCorrect = selected !== null && optionIndex === current.answer
                                    const isWrong = selected === optionIndex && optionIndex !== current.answer
                                    return <button key={optionIndex} className={`${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`} disabled={selected !== null} onClick={() => choose(optionIndex)}><span>{String.fromCharCode(65 + optionIndex)}</span><MathText text={pickText(lang, option)} />{isCorrect && <b>✓</b>}{isWrong && <b>×</b>}</button>
                                })}
                            </div>
                            {selected !== null && <div className={`prototype-quiz-explanation ${selected === current.answer ? 'success' : 'error'}`} role="status"><strong>{selected === current.answer ? l(lang, 'Zuzena!', '¡Correcto!', 'صحيح!') : l(lang, 'Ez da hori.', 'No es esa.', 'ليست هذه.')}</strong><p>{explanation}</p></div>}
                            <div className="prototype-quiz-next"><button className="prototype-primary-action" disabled={selected === null} onClick={next}>{index === questions.length - 1 ? l(lang, 'Partida amaitu', 'Terminar partida', 'إنهاء الجولة') : l(lang, 'Hurrengo galdera', 'Siguiente pregunta', 'السؤال التالي')} →</button></div>
                        </article>
                    )}

                    {finished && (
                        <article className="prototype-game-result">
                            <span>{score === questions.length ? '★' : '◆'}</span>
                            <small>{l(lang, 'PARTIDA AMAITUTA', 'PARTIDA COMPLETADA', 'اكتملت الجولة')}</small>
                            <h2>{score}/{questions.length}</h2>
                            <p>{score === questions.length ? l(lang, 'Bikain! Kontzeptuak sendo daude.', '¡Excelente! Los conceptos están consolidados.', 'ممتاز! المفاهيم راسخة.') : l(lang, 'Ondo! Berrikusi huts egindako kontzeptuak eta saiatu berriro.', '¡Bien! Revisa los conceptos que han fallado y vuelve a intentarlo.', 'جيد! راجع المفاهيم التي أخطأت فيها وحاول مجدداً.')}</p>
                            <button className="prototype-primary-action" onClick={() => reset(mode)}>{l(lang, 'Berriro jokatu', 'Jugar otra vez', 'العب مجدداً')}</button>
                        </article>
                    )}
                </>
            )}

            {gameType === 'detective' && <ErrorDetectiveGame lang={lang} />}
        </div>
    )
}

function ErrorDetectiveGame({ lang }: PanelLangProps) {
    const rounds = [
        {
            equation: '$3x-5=16$',
            steps: ['$3x-5+5=16+5$', '$3x=21$', '$x=21-3$', '$x=7$'],
            error: 2,
            explanation: l(lang, '$3x=21$ ekuazioan bi aldeak 3rekin zatitu behar dira.', 'En $3x=21$ hay que dividir ambos miembros entre 3, no restar 3.', 'في $3x=21$ يجب قسمة الطرفين على 3، لا طرح 3.')
        },
        {
            equation: '$2(x+4)=18$',
            steps: ['$2x+4=18$', '$2x=14$', '$x=7$'],
            error: 0,
            explanation: l(lang, '2 parentesi barruko termino guztiei banatu behar zaie: $2x+8$.', 'El 2 debe distribuirse a todos los términos del paréntesis: $2x+8$.', 'يجب توزيع 2 على جميع حدود القوس: $2x+8$.')
        },
        {
            equation: '$x^2=25$',
            steps: ['$x=\\sqrt{25}$', '$x=5$', '$S=\\{5\\}$'],
            error: 2,
            explanation: l(lang, 'Erro karratua hartzean bi zeinu daude: soluzioak $-5$ eta $5$ dira.', 'Al tomar la raíz hay dos signos: las soluciones son $-5$ y $5$.', 'عند أخذ الجذر توجد إشارتان: الحلّان هما $-5$ و$5$.')
        }
    ]
    const [round, setRound] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)
    const current = rounds[round]

    const choose = (index: number) => {
        if (selected !== null) return
        setSelected(index)
        if (index === current.error) setScore((value) => value + 1)
    }
    const next = () => {
        if (round === rounds.length - 1) setFinished(true)
        else { setRound((value) => value + 1); setSelected(null) }
    }
    const reset = () => { setRound(0); setSelected(null); setScore(0); setFinished(false) }

    if (finished) {
        return <article className="prototype-game-result"><span>⌕</span><small>{l(lang, 'IKERKETA AMAITUTA', 'INVESTIGACIÓN COMPLETADA', 'اكتمل التحقيق')}</small><h2>{score}/3</h2><p>{l(lang, 'Akats bat aurkitzea zuzen ebaztea bezain garrantzitsua da.', 'Encontrar un error es tan importante como resolver correctamente.', 'اكتشاف الخطأ مهم بقدر الحل الصحيح.')}</p><button className="prototype-primary-action" onClick={reset}>{l(lang, 'Beste ikerketa bat', 'Nueva investigación', 'تحقيق جديد')}</button></article>
    }

    return (
        <article className="prototype-detective-card">
            <div className="prototype-quiz-meta"><span>{l(lang, 'KASUA', 'CASO', 'القضية')} {round + 1}/3</span><strong>{score} {l(lang, 'aurkituta', 'detectados', 'مكتشفة')}</strong></div>
            <div className="prototype-quiz-progress"><i style={{ width: `${((round + 1) / rounds.length) * 100}%` }} /></div>
            <div className="prototype-detective-heading"><span>⌕</span><div><small>{l(lang, 'HASIERAKO EKUAZIOA', 'ECUACIÓN INICIAL', 'المعادلة الأصلية')}</small><MathText text={`$$${current.equation.replaceAll('$', '')}$$`} /></div></div>
            <h2>{l(lang, 'Zein pausotan dago lehen akatsa?', '¿En qué paso aparece el primer error?', 'في أي خطوة يظهر الخطأ الأول؟')}</h2>
            <div className="prototype-detective-steps">
                {current.steps.map((step, index) => {
                    const correct = selected !== null && index === current.error
                    const wrong = selected === index && index !== current.error
                    return <button key={step} className={`${correct ? 'correct' : ''} ${wrong ? 'wrong' : ''}`} disabled={selected !== null} onClick={() => choose(index)}><span>{index + 1}</span><MathText text={step} />{correct && <b>← {l(lang, 'Hemen', 'Aquí', 'هنا')}</b>}</button>
                })}
            </div>
            {selected !== null && <div className={`prototype-quiz-explanation ${selected === current.error ? 'success' : 'error'}`} role="status"><strong>{selected === current.error ? l(lang, 'Detektatuta!', '¡Detectado!', 'تم الاكتشاف!') : l(lang, 'Begiratu pauso bat geroago.', 'Revisa un paso más adelante.', 'راجع خطوة لاحقة.')}</strong><p><MathText text={current.explanation} /></p></div>}
            <div className="prototype-quiz-next"><button className="prototype-primary-action" disabled={selected === null} onClick={next}>{round === rounds.length - 1 ? l(lang, 'Ikerketa amaitu', 'Cerrar investigación', 'إنهاء التحقيق') : l(lang, 'Hurrengo kasua', 'Siguiente caso', 'القضية التالية')} →</button></div>
        </article>
    )
}
