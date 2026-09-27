import { useEffect, useState, type CSSProperties } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../components/MathText'
import { DiagnosticQuiz } from './Diagnostic'
import { Icon } from './icons'
import { PracticeArea, PracticeDeck } from './Practice'
import { parseUnitPath, unitBasePath, unitPathFor, type PracticeMode } from './routing'
import { useStoredIds, useStoredTopics } from './storage'
import {
    availableSections,
    exerciseBankSize,
    normalizeUnitLanguage,
    pickMaybeText,
    pickText,
    totalGoals,
    unitSections,
    type LocalizedText,
    type UnitDefinition,
    type UnitSection
} from './types'
import './UnitPage.css'

export function UnitPage({ unit }: { unit: UnitDefinition }) {
    const { t, i18n } = useTranslation()
    const location = useLocation()
    const language = normalizeUnitLanguage(i18n.language)
    const isRtl = language === 'ar'
    const l = (text: LocalizedText) => pickText(language, text)
    const sections = availableSections(unit)
    const goTo = useNavigate()
    const basePath = unitBasePath(location.pathname)
    const place = parseUnitPath(location.pathname)
    const section: UnitSection = sections.includes(place.section) ? place.section : 'route'
    const topicInPath = unit.topics.find((topic) => topic.id === place.detail)?.id
    // The lesson last opened, so the Learn tab and the practice keep their context
    const [lastTopicId, setLastTopicId] = useState(unit.topics[0].id)
    const topicId = section === 'learn' && topicInPath ? topicInPath : lastTopicId
    const practiceTopic = section === 'practice' ? unit.topics.find((topic) => topic.id === place.detail) : undefined
    const labTool = section === 'lab' ? place.detail ?? null : null
    const [moreOpen, setMoreOpen] = useState(false)
    const key = (suffix: string) => `${unit.storagePrefix}-${suffix}`
    const learned = useStoredTopics(key('learned'), unit.topics.map((topic) => topic.id))
    const diagnosticProgress = useStoredIds(key('diagnostic'))
    const diagnosticCorrect = useStoredIds(key('diagnostic-correct'), key('diagnostic'))
    const practiceProgress = useStoredIds(key('practice'))
    const bankProgress = useStoredIds(key('exercise-bank'))
    const challengeProgress = useStoredIds(key('challenges'))
    const playProgress = useStoredIds(key('play'))
    const labProgress = useStoredIds(key('lab'))

    useEffect(() => {
        document.documentElement.lang = language
        document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
    }, [isRtl, language])

    useEffect(() => {
        const previousTitle = document.title
        document.title = `${pickText(language, unit.documentTitle)} | Matella`
        return () => { document.title = previousTitle }
    }, [language, unit.documentTitle])

    const scrollToTop = () => {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })
    }

    /** Every move inside the unit changes the address, so reload, Back and shared links keep the place */
    const navigate = (next: UnitSection, detail?: string, practiceMode?: PracticeMode) => {
        const nextDetail = detail ?? (next === 'learn' ? topicId : undefined)
        if (next === 'learn' && nextDetail) setLastTopicId(nextDetail)
        goTo(unitPathFor(basePath, next, nextDetail, practiceMode))
        scrollToTop()
    }

    const stageOf = (id: string) => unit.stages.find((stage) => stage.id === id) ?? unit.stages[0]

    const resetAllProgress = () => {
        const confirmed = window.confirm(l({ eu: 'Unitate honetako aurrerapen guztia ezabatu nahi duzu?', es: '¿Quieres borrar todo el progreso de esta unidad?', ar: 'هل تريد حذف كل التقدم في هذه الوحدة؟' }))
        if (!confirmed) return
        diagnosticProgress.reset()
        diagnosticCorrect.reset()
        learned.reset()
        practiceProgress.reset()
        bankProgress.reset()
        challengeProgress.reset()
        playProgress.reset()
        labProgress.reset()
        if (unit.games?.recordsKey) {
            try {
                localStorage.removeItem(unit.games.recordsKey)
            } catch {
                // Storage unavailable: nothing to clear
            }
        }
    }

    const gameIds = unit.games?.progressIds ?? []
    const labIds = unit.lab?.progressIds ?? []
    const completedGoals = diagnosticProgress.ids.length + learned.ids.length + practiceProgress.ids.length + bankProgress.ids.length + challengeProgress.ids.length
        + playProgress.ids.filter((id) => gameIds.includes(id)).length
        + labProgress.ids.filter((id) => labIds.includes(id)).length
    const progress = Math.min(100, Math.round((completedGoals / Math.max(1, totalGoals(unit))) * 100))
    const recommendedTopic = unit.topics.find((topic) => !learned.ids.includes(topic.id)) ?? unit.topics[unit.topics.length - 1]

    const unitTitle = l(unit.title)
    const courseTitle = l(unit.courseTitle)
    const mobilePrimarySections = (['route', 'learn', 'practice', 'play'] as UnitSection[]).filter((id) => sections.includes(id))
    const navSections = unitSections.filter((item) => sections.includes(item.id))
    const mobileMoreSections = navSections.filter((item) => !mobilePrimarySections.includes(item.id))
    const moreIsActive = mobileMoreSections.some((item) => item.id === section)

    return (
        <div className="fraction-v2" dir={isRtl ? 'rtl' : 'ltr'}>
            <header className="fraction-v2-header">
                <div className="fraction-v2-topbar">
                    <Link className="fraction-v2-brand" to="/" aria-label={l({ eu: 'Matella, hasiera', es: 'Matella, inicio', ar: 'Matella، الصفحة الرئيسية' })}>
                        <span className="fraction-v2-brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
                        <span className="fraction-v2-brand-name">Matella</span>
                    </Link>
                    <Link className="fraction-v2-mobile-back" to={unit.coursePath} aria-label={`${l({ eu: 'Itzuli', es: 'Volver a', ar: 'العودة إلى' })} ${courseTitle}`}>
                        <Icon name="back" size={22} className="fraction-v2-icon-flip" />
                    </Link>
                    <nav className="fraction-v2-breadcrumb" aria-label={l({ eu: 'Kokapena', es: 'Ruta de navegación', ar: 'مسار التنقل' })}>
                        <Link to="/matematika">{l({ eu: 'Matematika', es: 'Matemáticas', ar: 'الرياضيات' })}</Link>
                        <span aria-hidden="true">/</span>
                        <Link to={unit.coursePath}>{courseTitle}</Link>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">{unitTitle}</span>
                    </nav>
                    <span className="fraction-v2-mobile-title">{unitTitle}</span>
                    <div className="fraction-v2-language" role="group" aria-label={l({ eu: 'Hizkuntza', es: 'Idioma', ar: 'اللغة' })}>
                        {([['eu', 'EU'], ['es', 'ES'], ['ar', 'عربي']] as const).map(([code, label]) => (
                            <button type="button" lang={code} aria-pressed={language === code} onClick={() => void i18n.changeLanguage(code)} key={code}>{label}</button>
                        ))}
                    </div>
                </div>
                <nav className="fraction-v2-nav" aria-label={l({ eu: 'Unitateko atalak', es: 'Secciones de la unidad', ar: 'أقسام الوحدة' })}>
                    {navSections.map((item) => (
                        <button
                            type="button"
                            className={`${section === item.id ? 'active' : ''} ${mobilePrimarySections.includes(item.id) ? 'primary' : 'secondary'}`}
                            aria-current={section === item.id ? 'page' : undefined}
                            onClick={() => { setMoreOpen(false); navigate(item.id) }}
                            key={item.id}
                        >
                            <Icon name={item.id} size={20} />
                            <span>{l(item.label)}</span>
                        </button>
                    ))}
                    {mobileMoreSections.length > 0 && (
                        <button
                            type="button"
                            className={`fraction-v2-nav-more ${moreIsActive ? 'active' : ''}`}
                            aria-expanded={moreOpen}
                            aria-controls="fraction-v2-more-menu"
                            onClick={() => setMoreOpen((open) => !open)}
                        >
                            <Icon name={moreOpen ? 'close' : 'more'} size={20} />
                            <span>{l({ eu: 'Gehiago', es: 'Más', ar: 'المزيد' })}</span>
                        </button>
                    )}
                </nav>
                {moreOpen && (
                    <div className="fraction-v2-more-menu" id="fraction-v2-more-menu">
                        {mobileMoreSections.map((item) => (
                            <button type="button" className={section === item.id ? 'active' : ''} aria-current={section === item.id ? 'page' : undefined} onClick={() => { setMoreOpen(false); navigate(item.id) }} key={item.id}>
                                <Icon name={item.id} size={22} />
                                {l(item.label)}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            <main className="fraction-v2-main">
                {section === 'route' && renderRoute()}
                {section === 'diagnostic' && (
                    <DiagnosticQuiz
                        unit={unit}
                        answeredIds={diagnosticProgress.ids}
                        correctIds={diagnosticCorrect.ids}
                        onAnswer={(id, correct) => {
                            diagnosticProgress.addId(id)
                            if (correct) diagnosticCorrect.addId(id)
                        }}
                        onRestart={() => { diagnosticProgress.reset(); diagnosticCorrect.reset() }}
                        language={language}
                        onStartLearning={openTopic}
                    />
                )}
                {section === 'learn' && renderLearn()}
                {section === 'lab' && unit.lab?.render({
                    language,
                    tool: labTool,
                    onToolChange: (tool) => goTo(unitPathFor(basePath, 'lab', tool), { replace: true }),
                    completedIds: labProgress.ids,
                    onComplete: labProgress.addId,
                    onOpenLesson: openTopic
                })}
                {section === 'practice' && (
                    <PracticeArea
                        unit={unit}
                        language={language}
                        mode={place.practiceMode}
                        onModeChange={(mode) => goTo(unitPathFor(basePath, 'practice', practiceTopic?.id, mode), { replace: true })}
                        focusStage={practiceTopic?.stage}
                        guidedCompletedIds={practiceProgress.ids}
                        onGuidedComplete={practiceProgress.addId}
                        bankCompletedIds={bankProgress.ids}
                        onBankComplete={bankProgress.addId}
                    />
                )}
                {section === 'challenges' && (
                    <PracticeDeck
                        unit={unit}
                        items={unit.challenges ?? []}
                        completedIds={challengeProgress.ids}
                        onComplete={challengeProgress.addId}
                        language={language}
                        challengeMode
                    />
                )}
                {section === 'play' && (
                    <div key={`games-${location.pathname}`}>
                        {unit.games?.render({ language, pathname: location.pathname, completedIds: playProgress.ids, onComplete: playProgress.addId })}
                    </div>
                )}
            </main>
        </div>
    )

    function lessonsLabel(count: number) {
        return count === 1
            ? l({ eu: 'Ikasgai 1', es: '1 lección', ar: 'درس واحد' })
            : l({ eu: `${count} ikasgai`, es: `${count} lecciones`, ar: `${count} دروس` })
    }

    function openTopic(nextTopic: string) {
        navigate('learn', nextTopic)
    }

    function renderRoute() {
        const recommendedIndex = unit.topics.findIndex((topic) => topic.id === recommendedTopic.id)
        const recommendedStageIndex = unit.stages.findIndex((stage) => stage.id === recommendedTopic.stage)
        const recommendedTone = stageOf(recommendedTopic.stage).tone
        const hasStarted = completedGoals > 0
        const diagnosticCount = unit.diagnostic?.length ?? 0
        const diagnosticPending = diagnosticCount > 0 && diagnosticProgress.ids.length < diagnosticCount
        const guidedCount = unit.guidedPractice?.length ?? 0
        const bankCount = exerciseBankSize(unit)
        const tools: Array<{ id: UnitSection; title: LocalizedText; description: LocalizedText }> = []
        if (unit.lab) tools.push({ id: 'lab', title: { eu: 'Laborategia', es: 'Laboratorio', ar: 'المختبر' }, description: unit.lab.description })
        if (sections.includes('practice')) {
            tools.push({
                id: 'practice',
                title: { eu: 'Praktika', es: 'Práctica', ar: 'التدريب' },
                description: bankCount > 0
                    ? { eu: `${guidedCount} jarduera gidatu eta ${bankCount} ariketa zailtasunaren arabera.`, es: `${guidedCount} actividades guiadas y ${bankCount} ejercicios por dificultad.`, ar: `${guidedCount} أنشطة موجّهة و${bankCount} تمرينًا حسب الصعوبة.` }
                    : { eu: `${guidedCount} jarduera gidatu, pistekin.`, es: `${guidedCount} actividades guiadas, con pistas.`, ar: `${guidedCount} أنشطة موجّهة مع تلميحات.` }
            })
        }
        if (unit.challenges?.length) tools.push({ id: 'challenges', title: { eu: 'Erronkak', es: 'Retos', ar: 'التحديات' }, description: { eu: `Bizitza errealeko ${unit.challenges.length} problema ikasitakoa aplikatzeko.`, es: `${unit.challenges.length} problemas de la vida real para aplicar lo aprendido.`, ar: `${unit.challenges.length} مسألة من الحياة الواقعية لتطبيق ما تعلّمته.` } })
        if (unit.games) tools.push({ id: 'play', title: { eu: 'Jokoak', es: 'Juegos', ar: 'الألعاب' }, description: unit.games.description })

        return (
            <div className="fraction-v2-route">
                <section className="fraction-v2-hero" aria-labelledby="fraction-v2-unit-title">
                    <div className="fraction-v2-hero-copy">
                        <span className="fraction-v2-chip fraction-v2-chip-coral">{courseTitle} · {l({ eu: 'Matematika', es: 'Matemáticas', ar: 'الرياضيات' })}</span>
                        <h1 id="fraction-v2-unit-title">{unitTitle}</h1>
                        <p>{l(unit.tagline)}</p>
                        <div className="fraction-v2-hero-actions">
                            <button type="button" className="fraction-v2-primary" onClick={() => diagnosticPending ? navigate('diagnostic') : openTopic(recommendedTopic.id)}>
                                {diagnosticPending
                                    ? l({ eu: 'Hasi diagnostikoarekin', es: 'Empezar con el diagnóstico', ar: 'ابدأ بالتشخيص' })
                                    : hasStarted
                                        ? l({ eu: 'Jarraitu hurrengo urratsarekin', es: 'Seguir con el siguiente paso', ar: 'تابع إلى الخطوة التالية' })
                                        : l({ eu: 'Hasi lehen ikasgaiarekin', es: 'Empezar la primera lección', ar: 'ابدأ الدرس الأول' })}
                                <Icon name="arrow" size={18} strokeWidth={2.4} className="fraction-v2-icon-flip" />
                            </button>
                            {unit.lab && (
                                <button type="button" className="fraction-v2-secondary" onClick={() => navigate('lab')}>
                                    {l({ eu: 'Ireki laborategia', es: 'Abrir el laboratorio', ar: 'افتح المختبر' })}
                                </button>
                            )}
                        </div>
                        {diagnosticPending && (
                            <p className="fraction-v2-hero-note">{l({ eu: `${diagnosticCount} galdera, notarik gabe. Nondik hastea komeni zaizun esango dizugu.`, es: `${diagnosticCount} preguntas, sin nota. Te diremos por dónde te conviene empezar.`, ar: `${diagnosticCount} أسئلة بلا علامة. سنقترح عليك من أين تبدأ.` })}</p>
                        )}
                    </div>
                    {unit.heroArt}
                </section>

                <section className="fraction-v2-continue" aria-label={l({ eu: 'Zure aurrerapena', es: 'Tu progreso', ar: 'تقدمك' })}>
                    <div className="fraction-v2-ring" style={{ '--progress': `${progress}%` } as CSSProperties} role="img" aria-label={`${progress}%`}>
                        <span>{progress}%</span>
                    </div>
                    <div className="fraction-v2-continue-text">
                        <span>{hasStarted
                            ? l({ eu: 'Jarraitu utzi zenuen lekutik', es: 'Continúa donde lo dejaste', ar: 'تابع من حيث توقفت' })
                            : l({ eu: 'Hasi hemendik', es: 'Empieza por aquí', ar: 'ابدأ من هنا' })}</span>
                        <strong>{l({ eu: 'Ikasgaia', es: 'Lección', ar: 'الدرس' })} {recommendedIndex + 1} · {l(recommendedTopic.title)}</strong>
                    </div>
                    <span className="fraction-v2-chip" data-stage={recommendedTopic.stage} data-tone={recommendedTone}>{l({ eu: `${recommendedStageIndex + 1}. etapa`, es: `Etapa ${recommendedStageIndex + 1}`, ar: `المرحلة ${recommendedStageIndex + 1}` })}</span>
                    <button type="button" className="fraction-v2-stage-button" data-stage={recommendedTopic.stage} data-tone={recommendedTone} onClick={() => openTopic(recommendedTopic.id)}>
                        {hasStarted ? l({ eu: 'Jarraitu', es: 'Continuar', ar: 'تابع' }) : l({ eu: 'Hasi', es: 'Empezar', ar: 'ابدأ' })}
                    </button>
                </section>

                <section className="fraction-v2-overview" aria-labelledby="fraction-v2-path-title">
                    <div className="fraction-v2-section-heading">
                        <h2 id="fraction-v2-path-title">{l({ eu: 'Zure ibilbidea', es: 'Tu ruta', ar: 'مسارك' })}</h2>
                        <p>{l(unit.pathSubtitle)}</p>
                    </div>
                    <ol className="fraction-v2-path-grid" style={{ '--stages': unit.stages.length } as CSSProperties}>
                        {unit.stages.map((stage, index) => {
                            const stageTopics = unit.topics.filter((topic) => topic.stage === stage.id)
                            const learnedCount = stageTopics.filter((topic) => learned.ids.includes(topic.id)).length
                            const complete = stageTopics.length > 0 && learnedCount === stageTopics.length
                            const current = !complete && stage.id === recommendedTopic.stage
                            return (
                                <li key={stage.id}>
                                    <button
                                        type="button"
                                        className={`fraction-v2-path-card ${complete ? 'complete' : ''} ${current ? 'current' : ''}`}
                                        data-stage={stage.id}
                                        data-tone={stage.tone}
                                        aria-current={current ? 'step' : undefined}
                                        onClick={() => openTopic((stageTopics.find((topic) => !learned.ids.includes(topic.id)) ?? stageTopics[0]).id)}
                                    >
                                        <span className="fraction-v2-stage-badge">{complete ? <Icon name="check" size={18} strokeWidth={3} /> : index + 1}</span>
                                        <strong>{l(stage.title)}</strong>
                                        {current && (
                                            <span className="fraction-v2-meter"><span style={{ width: `${(learnedCount / stageTopics.length) * 100}%` }} /></span>
                                        )}
                                        <small>{complete
                                            ? `${l({ eu: 'Osatuta', es: 'Completada', ar: 'مكتملة' })} · ${lessonsLabel(stageTopics.length)}`
                                            : current
                                                ? `${l({ eu: 'Martxan', es: 'En curso', ar: 'قيد التقدم' })} · ${learnedCount} / ${stageTopics.length}`
                                                : lessonsLabel(stageTopics.length)}</small>
                                    </button>
                                </li>
                            )
                        })}
                    </ol>
                </section>

                {tools.length > 0 && (
                    <section className="fraction-v2-tools" aria-labelledby="fraction-v2-tools-title">
                        <div className="fraction-v2-section-heading">
                            <h2 id="fraction-v2-tools-title">{l({ eu: 'Ikasteko beste modu batzuk', es: 'Más formas de aprender', ar: 'طرق أخرى للتعلّم' })}</h2>
                        </div>
                        <div className="fraction-v2-tools-grid">
                            {tools.map((tool) => (
                                <button type="button" className="fraction-v2-tool-card" data-tool={tool.id} onClick={() => navigate(tool.id)} key={tool.id}>
                                    <span className="fraction-v2-tool-icon"><Icon name={tool.id} size={24} strokeWidth={1.9} /></span>
                                    <strong>{l(tool.title)}</strong>
                                    <span>{l(tool.description)}</span>
                                </button>
                            ))}
                        </div>
                    </section>
                )}

                <div className="fraction-v2-route-footer">
                    <nav aria-label={l({ eu: 'Informazio legala', es: 'Información legal', ar: 'معلومات قانونية' })}>
                        <Link to="/accesibilidad">{t('footer.accessibility')}</Link>
                        <Link to="/privacidad">{t('footer.privacy')}</Link>
                        <Link to="/creditos">{t('footer.credits')}</Link>
                    </nav>
                    <button type="button" onClick={resetAllProgress}>{l({ eu: 'Aurrerapena berrezarri', es: 'Reiniciar el progreso', ar: 'إعادة ضبط التقدم' })}</button>
                </div>
            </div>
        )
    }

    function renderLearn() {
        const currentIndex = Math.max(0, unit.topics.findIndex((topic) => topic.id === topicId))
        const currentTopic = unit.topics[currentIndex]
        const currentStageIndex = unit.stages.findIndex((stage) => stage.id === currentTopic.stage)
        const currentTone = stageOf(currentTopic.stage).tone
        const nextTopic = unit.topics[currentIndex + 1]
        const isLearned = learned.ids.includes(currentTopic.id)
        const labToolId = unit.lab?.toolForTopic[currentTopic.id]
        const selectTopic = (id: string) => navigate('learn', id)

        return (
            <section className="fraction-v2-learning">
                <nav className="fraction-v2-lesson-index" aria-label={l({ eu: 'Ikasgaiak', es: 'Lecciones', ar: 'الدروس' })}>
                    {unit.stages.map((stage, stageIndex) => (
                        <div className="fraction-v2-lesson-group" data-stage={stage.id} data-tone={stage.tone} key={stage.id}>
                            <span className="fraction-v2-lesson-group-title"><span aria-hidden="true" />{stageIndex + 1} · {l(stage.title)}</span>
                            {unit.topics.map((topic, index) => topic.stage !== stage.id ? null : (
                                <button
                                    type="button"
                                    className={`${topic.id === currentTopic.id ? 'active' : ''} ${learned.ids.includes(topic.id) ? 'done' : ''}`}
                                    aria-current={topic.id === currentTopic.id ? 'step' : undefined}
                                    onClick={() => selectTopic(topic.id)}
                                    key={topic.id}
                                >
                                    <span className="fraction-v2-lesson-number">{learned.ids.includes(topic.id) && topic.id !== currentTopic.id ? <Icon name="check" size={14} strokeWidth={3.2} /> : index + 1}</span>
                                    {l(topic.title)}
                                </button>
                            ))}
                        </div>
                    ))}
                </nav>

                <article className="fraction-v2-lesson" data-stage={currentTopic.stage} data-tone={currentTone} aria-labelledby="fraction-v2-lesson-title">
                    <div className="fraction-v2-lesson-meta">
                        <span className="fraction-v2-chip" data-stage={currentTopic.stage} data-tone={currentTone}>{l({ eu: `${currentStageIndex + 1}. etapa`, es: `Etapa ${currentStageIndex + 1}`, ar: `المرحلة ${currentStageIndex + 1}` })} · {l(unit.stages[currentStageIndex].title)}</span>
                        <span>{l({ eu: `${currentIndex + 1}. ikasgaia / ${unit.topics.length}`, es: `Lección ${currentIndex + 1} de ${unit.topics.length}`, ar: `الدرس ${currentIndex + 1} من ${unit.topics.length}` })}</span>
                    </div>
                    <h1 id="fraction-v2-lesson-title">{l(currentTopic.title)}</h1>
                    <p className="fraction-v2-lesson-goal"><strong>{l({ eu: 'Helburua:', es: 'Objetivo:', ar: 'الهدف:' })}</strong> {l(currentTopic.goal)}</p>
                    <p className="fraction-v2-lesson-body"><MathText text={l(currentTopic.explanation)} /></p>
                    {currentTopic.problem && (
                        <div className="fraction-v2-lesson-problem">
                            <span>{l({ eu: 'Ebatz dezagun', es: 'Vamos a resolver', ar: 'لنحلّ' })}</span>
                            <p><MathText text={l(currentTopic.problem)} /></p>
                        </div>
                    )}
                    {currentTopic.steps && (
                        <ol className={`fraction-v2-lesson-steps ${currentTopic.stepsKind ?? 'steps'}`}>
                            {currentTopic.steps.map((step, index) => (
                                <li key={index}>
                                    <span className="fraction-v2-lesson-step-badge" aria-hidden="true">{(currentTopic.stepsKind ?? 'steps') === 'steps' ? index + 1 : ''}</span>
                                    <div className="fraction-v2-lesson-step-body">
                                        {step.title && <strong>{l(step.title)}</strong>}
                                        <p><MathText text={l(step.text)} /></p>
                                    </div>
                                    {step.math && <div className="fraction-v2-lesson-step-math"><MathText text={pickMaybeText(language, step.math)} /></div>}
                                </li>
                            ))}
                        </ol>
                    )}
                    {currentTopic.figure && <div className="fraction-v2-lesson-figure">{currentTopic.figure(language)}</div>}
                    <figure className="fraction-v2-example">
                        <MathText text={pickMaybeText(language, currentTopic.example)} />
                    </figure>
                    <aside className="fraction-v2-takeaway">
                        <span className="fraction-v2-takeaway-icon"><Icon name="bulb" size={22} /></span>
                        <div>
                            <span>{l({ eu: 'Ideia nagusia', es: 'Idea clave', ar: 'الفكرة الأساسية' })}</span>
                            <p><MathText text={l(currentTopic.takeaway)} /></p>
                        </div>
                    </aside>
                    <div className="fraction-v2-lesson-actions">
                        <button type="button" className={`fraction-v2-primary ${isLearned ? 'done' : ''}`} onClick={() => learned.addId(currentTopic.id)} disabled={isLearned}>
                            {isLearned && <Icon name="check" size={18} strokeWidth={3} />}
                            {isLearned
                                ? l({ eu: 'Ulertuta', es: 'Entendido', ar: 'تم الفهم' })
                                : l({ eu: 'Ulertu dut', es: 'Lo he entendido', ar: 'فهمت' })}
                        </button>
                        {sections.includes('practice') && (
                            <button type="button" className="fraction-v2-secondary" onClick={() => { setLastTopicId(currentTopic.id); navigate('practice', currentTopic.id) }}>
                                {l({ eu: 'Praktikatu', es: 'Practicar', ar: 'تدرّب' })}
                            </button>
                        )}
                        {labToolId && (
                            <button type="button" className="fraction-v2-secondary" onClick={() => { setLastTopicId(currentTopic.id); navigate('lab', labToolId) }}>
                                <Icon name="lab" size={18} />
                                {l({ eu: 'Esperimentatu laborategian', es: 'Experimentar en el laboratorio', ar: 'جرّب في المختبر' })}
                            </button>
                        )}
                        {nextTopic && (
                            <button type="button" className="fraction-v2-next" data-stage={nextTopic.stage} data-tone={stageOf(nextTopic.stage).tone} onClick={() => selectTopic(nextTopic.id)}>
                                <span>{l({ eu: 'Hurrengoa:', es: 'Siguiente:', ar: 'التالي:' })} {l(nextTopic.title)}</span>
                                <Icon name="arrow" size={18} strokeWidth={2.4} className="fraction-v2-icon-flip" />
                            </button>
                        )}
                    </div>
                </article>
            </section>
        )
    }
}
