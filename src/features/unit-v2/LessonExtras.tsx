import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Icon } from './icons'
import { pickMaybeText, pickText, type LessonMistake, type LessonStep, type UnitLanguage } from './types'
import './LessonExtras.css'

/** The explanation split into cases: one card each, with its name, a short sentence and its formula */
export function LessonCases({ cases, language }: { cases: LessonStep[]; language: UnitLanguage }) {
    return (
        <ul className="lesson-cases">
            {cases.map((item, index) => (
                <li key={index}>
                    {item.title && <strong><MathText text={pickText(language, item.title)} /></strong>}
                    <p><MathText text={pickText(language, item.text)} /></p>
                    {item.math && <FitMath className="lesson-cases-math" text={pickMaybeText(language, item.math)} />}
                </li>
            ))}
        </ul>
    )
}

/** The typical mistake of the lesson: what is often written, crossed out, and the right way */
export function LessonMistakeBox({ mistake, language }: { mistake: LessonMistake; language: UnitLanguage }) {
    return (
        <aside className="lesson-mistake">
            <span className="lesson-mistake-label">{pickText(language, { eu: 'Ohiko akatsa', es: 'Error típico', en: 'Common mistake', ar: 'خطأ شائع' })}</span>
            <p className="lesson-mistake-wrong">
                <span className="lesson-mistake-mark" role="img" aria-label={pickText(language, { eu: 'Gaizki', es: 'Mal', en: 'Wrong', ar: 'خطأ' })}><Icon name="close" size={16} strokeWidth={3} /></span>
                <MathText text={pickText(language, mistake.wrong)} />
            </p>
            <p className="lesson-mistake-right">
                <span className="lesson-mistake-mark" role="img" aria-label={pickText(language, { eu: 'Ondo', es: 'Bien', en: 'Right', ar: 'صحيح' })}><Icon name="check" size={16} strokeWidth={3} /></span>
                <MathText text={pickText(language, mistake.right)} />
            </p>
        </aside>
    )
}

/**
 * The steps or facts of a lesson. When the steps solve the exercise of
 * «Let's solve», they appear one at a time, so the student can think about
 * the next move before seeing it; render it with the lesson id as key so
 * every lesson starts again from the first step.
 */
export function LessonSteps({ steps, kind, progressive, language, solution }: {
    steps: LessonStep[]
    kind: 'steps' | 'facts'
    progressive: boolean
    language: UnitLanguage
    /** Drawing of the exercise already solved: it waits until the last step is shown */
    solution?: ReactNode
}) {
    const l = (text: { eu: string; es: string; en: string; ar: string }) => pickText(language, text)
    const [shown, setShown] = useState(1)
    const listRef = useRef<HTMLOListElement>(null)
    // The first step just revealed by a click, to move the focus there
    const focusFrom = useRef<number | null>(null)
    const visible = progressive ? steps.slice(0, shown) : steps
    const next = visible.length + 1

    useEffect(() => {
        if (focusFrom.current === null) return
        listRef.current?.querySelectorAll<HTMLElement>(':scope > li')[focusFrom.current]?.focus()
        focusFrom.current = null
    }, [shown])

    const reveal = (count: number) => {
        focusFrom.current = shown
        setShown(count)
    }

    return (
        <>
            <ol className={`fraction-v2-lesson-steps ${kind}`} ref={listRef}>
                {visible.map((step, index) => (
                    <li key={index} tabIndex={progressive ? -1 : undefined}>
                        <span className="fraction-v2-lesson-step-badge" aria-hidden="true">{kind === 'steps' ? index + 1 : ''}</span>
                        <div className="fraction-v2-lesson-step-body">
                            {step.title && <strong>{pickText(language, step.title)}</strong>}
                            <p><MathText text={pickText(language, step.text)} /></p>
                        </div>
                        {step.math && <FitMath className="fraction-v2-lesson-step-math" text={pickMaybeText(language, step.math)} />}
                    </li>
                ))}
            </ol>
            {visible.length < steps.length && (
                <div className="lesson-steps-next">
                    <p>
                        <strong>{l({ eu: 'Zer egingo zenuke orain?', es: '¿Qué harías ahora?', en: 'What would you do now?', ar: 'ماذا ستفعل الآن؟' })}</strong>{' '}
                        {l({ eu: `Pentsatu, eta gero begiratu ${next}. urratsa.`, es: `Piénsalo y después mira el paso ${next}.`, en: `Think about it, then look at step ${next}.`, ar: `فكّر فيها ثم انظر إلى الخطوة ${next}.` })}
                    </p>
                    <div className="lesson-steps-next-actions">
                        <button type="button" className="fraction-v2-secondary" onClick={() => reveal(shown + 1)}>
                            {l({ eu: `Ikusi ${next}. urratsa`, es: `Ver el paso ${next}`, en: `Show step ${next}`, ar: `اعرض الخطوة ${next}` })}
                            <Icon name="arrow" size={18} strokeWidth={2.4} className="fraction-v2-icon-flip" />
                        </button>
                        {steps.length - visible.length > 1 && (
                            <button type="button" className="lesson-steps-all" onClick={() => reveal(steps.length)}>
                                {l({ eu: 'Ikusi urrats guztiak', es: 'Ver todos los pasos', en: 'Show all the steps', ar: 'اعرض كل الخطوات' })}
                            </button>
                        )}
                    </div>
                </div>
            )}
            {visible.length === steps.length && solution}
        </>
    )
}

/**
 * A formula block that never gets cut on a phone: when the formula is wider
 * than its box, the font shrinks (down to 60 %, never under 12 px); only
 * then does the box scroll.
 */
export function FitMath({ text, className, as: Tag = 'div' }: { text: string; className: string; as?: 'div' | 'figure' }) {
    const boxRef = useRef<HTMLElement | null>(null)

    useLayoutEffect(() => {
        const box = boxRef.current
        if (!box) return
        let lastWidth = -1
        const fit = () => {
            box.style.fontSize = ''
            const base = parseFloat(getComputedStyle(box).fontSize)
            const floor = Math.max(base * 0.6, 12)
            let size = base
            // Twice: KaTeX keeps some fixed widths, so one proportional step can fall a little short
            for (let pass = 0; pass < 2; pass++) {
                const ratio = overflowRatio(box)
                if (ratio >= 1 || size <= floor) break
                size = Math.max(floor, size * ratio * 0.98)
                box.style.fontSize = `${size}px`
            }
        }
        // Only a change of width matters: the shrinking itself changes the height
        const observer = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width
            if (width === lastWidth) return
            lastWidth = width
            fit()
        })
        observer.observe(box)
        // KaTeX fonts change the widths when they arrive
        let active = true
        void document.fonts?.ready.then(() => { if (active) fit() })
        return () => {
            active = false
            observer.disconnect()
        }
    }, [text])

    return (
        <Tag className={className} ref={(node: HTMLElement | null) => { boxRef.current = node }}>
            <MathText text={text} />
        </Tag>
    )
}

/** How much the widest piece of math must shrink to fit its box (1 when it already fits) */
function overflowRatio(box: HTMLElement): number {
    const scrollers = [box, ...box.querySelectorAll<HTMLElement>('.math-token')]
    let ratio = 1
    for (const element of scrollers) {
        if (element.clientWidth > 0 && element.scrollWidth > element.clientWidth + 1) {
            ratio = Math.min(ratio, element.clientWidth / element.scrollWidth)
        }
    }
    return ratio
}

/**
 * The drawing of a lesson. It always fits the width of the lesson, so
 * nothing is hidden; when that makes it much smaller than it was drawn, an
 * «Enlarge» button opens it full screen, turned sideways on a phone held
 * upright so that it uses the long side of the screen.
 */
export function LessonFigure({ children, language }: { children: ReactNode; language: UnitLanguage }) {
    const l = (text: { eu: string; es: string; en: string; ar: string }) => pickText(language, text)
    const boxRef = useRef<HTMLDivElement>(null)
    const openerRef = useRef<HTMLButtonElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)
    const [small, setSmall] = useState(false)
    const [zoom, setZoom] = useState<{ width: number; rotated: boolean } | null>(null)

    useEffect(() => {
        const box = boxRef.current
        if (!box) return
        // The first observation arrives right after observe(), so this also measures the first time
        const observer = new ResizeObserver(() => {
            const svg = box.querySelector('svg')
            const drawn = svg?.viewBox.baseVal?.width ?? 0
            setSmall(svg !== null && drawn > 0 && svg.getBoundingClientRect().width < drawn * 0.8)
        })
        observer.observe(box)
        return () => observer.disconnect()
    }, [])

    const isOpen = zoom !== null

    useEffect(() => {
        if (!isOpen) return
        const opener = openerRef.current
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        closeRef.current?.focus()
        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setZoom(null)
        }
        // Turning the phone or resizing the window lays the drawing out again
        const onResize = () => setZoom(zoomLayout(boxRef.current))
        document.addEventListener('keydown', onKey)
        window.addEventListener('resize', onResize)
        return () => {
            document.body.style.overflow = previousOverflow
            document.removeEventListener('keydown', onKey)
            window.removeEventListener('resize', onResize)
            opener?.focus()
        }
    }, [isOpen])

    const enlargeLabel = l({ eu: 'Handitu marrazkia', es: 'Ampliar el dibujo', en: 'Enlarge the drawing', ar: 'كبّر الرسم' })

    return (
        <div className={`fraction-v2-lesson-figure ${small ? 'lesson-figure-small' : ''}`} ref={boxRef}>
            <div className="lesson-figure-drawing" onClick={small ? () => setZoom(zoomLayout(boxRef.current)) : undefined}>
                {children}
            </div>
            {small && (
                <button type="button" className="lesson-figure-enlarge" ref={openerRef} onClick={() => setZoom(zoomLayout(boxRef.current))} aria-label={enlargeLabel}>
                    <Icon name="expand" size={18} strokeWidth={2.4} />
                    <span>{l({ eu: 'Handitu', es: 'Ampliar', en: 'Enlarge', ar: 'تكبير' })}</span>
                </button>
            )}
            {zoom && (
                <div className="lesson-figure-zoom" role="dialog" aria-modal="true" aria-label={enlargeLabel} onClick={(event) => { if (event.target === event.currentTarget) setZoom(null) }}>
                    <button type="button" className="lesson-figure-zoom-close" ref={closeRef} onClick={() => setZoom(null)}>
                        <Icon name="close" size={20} strokeWidth={2.6} />
                        <span>{l({ eu: 'Itxi', es: 'Cerrar', en: 'Close', ar: 'إغلاق' })}</span>
                    </button>
                    <div
                        className={`lesson-figure-zoom-drawing ${zoom.rotated ? 'rotated' : ''}`}
                        style={{ '--zoom-width': `${zoom.width}px` } as CSSProperties}
                    >
                        {children}
                    </div>
                    {zoom.rotated && (
                        <p className="lesson-figure-zoom-hint">{l({ eu: 'Biratu mugikorra', es: 'Gira el móvil', en: 'Turn your phone', ar: 'أدِر هاتفك' })}</p>
                    )}
                </div>
            )}
        </div>
    )
}

/** Width of the enlarged drawing, and whether to turn it to use the long side of an upright phone */
function zoomLayout(box: HTMLElement | null): { width: number; rotated: boolean } {
    const viewBox = box?.querySelector('svg')?.viewBox.baseVal
    const aspect = viewBox && viewBox.height > 0 ? viewBox.width / viewBox.height : 2
    // Room left by the close button above and a margin around
    const room = { width: window.innerWidth - 24, height: window.innerHeight - 96 }
    const upright = window.matchMedia('(orientation: portrait)').matches
    const rotated = upright && aspect > 1.15 && room.width < 640
    const width = rotated
        ? Math.min(room.height, room.width * aspect)
        : Math.min(room.width, room.height * aspect, 1080)
    return { width: Math.floor(width), rotated }
}
