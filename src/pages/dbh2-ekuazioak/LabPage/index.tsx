import { useMemo, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { normalizeEkuazioakLang, pickText } from '../content'
import '../../dbh1-zatikiak/LabPage/LabPage.css'
import '../../dbh2-algebra/LabPage/LabPage.css'
import './LabPage.css'

type LabType = 'balance' | 'linear' | 'quadratic'

function solveLinear(a: number, b: number, c: number) {
    if (a === 0) return null
    return (c - b) / a
}

function formatNumber(value: number) {
    if (!Number.isFinite(value)) return '—'
    return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '')
}

function InlineMath({ text }: { text: string }) {
    return <MathText text={text} inline />
}

export function LabPage() {
    const { i18n } = useTranslation()
    const lang = normalizeEkuazioakLang(i18n.language)
    const [activeLab, setActiveLab] = useState<LabType>('balance')
    const [balanceX, setBalanceX] = useState(3)
    const [balanceAdd, setBalanceAdd] = useState(5)
    const [linearA, setLinearA] = useState(3)
    const [linearB, setLinearB] = useState(-4)
    const [linearC, setLinearC] = useState(11)
    const [quadA, setQuadA] = useState(1)
    const [quadB, setQuadB] = useState(-5)
    const [quadC, setQuadC] = useState(6)

    const labs = [
        { id: 'balance' as const, icon: '⚖️', label: pickText(lang, { eu: 'Balantza', es: 'Balanza', ar: 'الميزان' }), color: '#6366f1' },
        { id: 'linear' as const, icon: '🔎', label: pickText(lang, { eu: 'Lehen maila', es: 'Primer grado', ar: 'الدرجة الأولى' }), color: '#10b981' },
        { id: 'quadratic' as const, icon: '📈', label: pickText(lang, { eu: 'Bigarren maila', es: 'Segundo grado', ar: 'الدرجة الثانية' }), color: '#f472b6' }
    ]

    const linearSolution = solveLinear(linearA, linearB, linearC)
    const discriminant = quadB ** 2 - 4 * quadA * quadC
    const quadraticResult = useMemo(() => {
        if (quadA === 0) return { kind: 'invalid', text: 'a=0' }
        if (discriminant < 0) return { kind: 'none', text: pickText(lang, { eu: 'Ez dago soluzio errealik', es: 'No hay soluciones reales', ar: 'لا توجد حلول حقيقية' }) }
        if (discriminant === 0) {
            const x = -quadB / (2 * quadA)
            return { kind: 'one', text: `$x=${formatNumber(x)}$` }
        }
        const root = Math.sqrt(discriminant)
        const x1 = (-quadB + root) / (2 * quadA)
        const x2 = (-quadB - root) / (2 * quadA)
        return { kind: 'two', text: `$x_1=${formatNumber(x1)},\\ x_2=${formatNumber(x2)}$` }
    }, [discriminant, lang, quadA, quadB])

    return (
        <div className="lab-page ekuazioak-lab">
            <div className="container">
                <header className="lab-header">
                    <h1>🧪 {pickText(lang, { eu: 'Ekuazioen Laborategia', es: 'Laboratorio de Ecuaciones', ar: 'مختبر المعادلات' })}</h1>
                    <p className="lab-instructions">
                        {pickText(lang, {
                            eu: 'Probatu oreka, ikusi lehen mailako ebazpena eta aztertu diskriminatzaileak soluzio kopuruan duen eragina.',
                            es: 'Prueba el equilibrio, observa la resolución de primer grado y explora cómo el discriminante cambia el número de soluciones.',
                            ar: 'جرّب التوازن، ولاحظ حل الدرجة الأولى، واستكشف كيف يغير المميز عدد الحلول.'
                        })}
                    </p>
                </header>

                <nav className="lab-grid" role="tablist" aria-label="Ekuazioak labs">
                    {labs.map((lab) => (
                        <button
                            key={lab.id}
                            className={`lab-card ${activeLab === lab.id ? 'active' : ''}`}
                            onClick={() => setActiveLab(lab.id)}
                            style={{ '--lab-color': lab.color } as CSSProperties}
                        >
                            <span className="lab-icon">{lab.icon}</span>
                            <span className="lab-name">{lab.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="lab-content">
                    {activeLab === 'balance' && (
                        <section className="lab-panel">
                            <div className="lab-panel-header">
                                <span className="panel-icon lab-symbol">⚖️</span>
                                <div>
                                    <h2>{labs[0].label}</h2>
                                    <p>{pickText(lang, { eu: 'Alde bietan eragiketa bera egiteak oreka mantentzen du.', es: 'Hacer la misma operación en ambos lados mantiene el equilibrio.', ar: 'إجراء العملية نفسها في الطرفين يحافظ على التوازن.' })}</p>
                                </div>
                            </div>
                            <div className="algebra-tool-grid">
                                <label><span><InlineMath text="$x$" /></span><input className="t-input" type="number" value={balanceX} onChange={(event) => setBalanceX(Number(event.target.value))} /></label>
                                <label><span>{pickText(lang, { eu: 'Gehitu', es: 'Sumar', ar: 'أضف' })}</span><input className="t-input" type="number" value={balanceAdd} onChange={(event) => setBalanceAdd(Number(event.target.value))} /></label>
                            </div>
                            <div className="algebra-result-card">
                                <h3>{pickText(lang, { eu: 'Oreka bera', es: 'Mismo equilibrio', ar: 'التوازن نفسه' })}</h3>
                                <MathText text={`$$x=${balanceX}\\quad \\iff\\quad x+${balanceAdd}=${balanceX + balanceAdd}$$`} />
                            </div>
                        </section>
                    )}

                    {activeLab === 'linear' && (
                        <section className="lab-panel">
                            <div className="lab-panel-header">
                                <span className="panel-icon lab-symbol">🔎</span>
                                <div>
                                    <h2>{labs[1].label}</h2>
                                    <p><MathText text={pickText(lang, { eu: '$ax+b=c$ eredua ebazten du.', es: 'Resuelve el modelo $ax+b=c$.', ar: 'يحل النموذج $ax+b=c$.' })} /></p>
                                </div>
                            </div>
                            <div className="algebra-tool-grid">
                                <label><span><InlineMath text="$a$" /></span><input className="t-input" type="number" value={linearA} onChange={(event) => setLinearA(Number(event.target.value))} /></label>
                                <label><span><InlineMath text="$b$" /></span><input className="t-input" type="number" value={linearB} onChange={(event) => setLinearB(Number(event.target.value))} /></label>
                                <label><span><InlineMath text="$c$" /></span><input className="t-input" type="number" value={linearC} onChange={(event) => setLinearC(Number(event.target.value))} /></label>
                            </div>
                            <div className="algebra-result-card">
                                <h3>{pickText(lang, { eu: 'Ebazpena', es: 'Resolución', ar: 'الحل' })}</h3>
                                <MathText text={`$$${linearA}x${linearB >= 0 ? '+' : ''}${linearB}=${linearC}$$`} />
                                {linearSolution === null
                                    ? <p><MathText text={pickText(lang, { eu: '$a$ ezin da 0 izan.', es: '$a$ no puede ser 0.', ar: 'لا يمكن أن يكون $a$ صفراً.' })} /></p>
                                    : <MathText text={`$$x=\\frac{${linearC}-${linearB}}{${linearA}}=${formatNumber(linearSolution)}$$`} />}
                            </div>
                        </section>
                    )}

                    {activeLab === 'quadratic' && (
                        <section className="lab-panel">
                            <div className="lab-panel-header">
                                <span className="panel-icon lab-symbol">📈</span>
                                <div>
                                    <h2>{labs[2].label}</h2>
                                    <p><MathText text={pickText(lang, { eu: '$ax^2+bx+c=0$ ereduan diskriminatzailea aztertu.', es: 'Analiza el discriminante en $ax^2+bx+c=0$.', ar: 'حلل المميز في $ax^2+bx+c=0$.' })} /></p>
                                </div>
                            </div>
                            <div className="algebra-tool-grid">
                                <label><span><InlineMath text="$a$" /></span><input className="t-input" type="number" value={quadA} onChange={(event) => setQuadA(Number(event.target.value))} /></label>
                                <label><span><InlineMath text="$b$" /></span><input className="t-input" type="number" value={quadB} onChange={(event) => setQuadB(Number(event.target.value))} /></label>
                                <label><span><InlineMath text="$c$" /></span><input className="t-input" type="number" value={quadC} onChange={(event) => setQuadC(Number(event.target.value))} /></label>
                            </div>
                            <div className="algebra-result-card">
                                <h3>{pickText(lang, { eu: 'Diskriminatzailea', es: 'Discriminante', ar: 'المميز' })}</h3>
                                <MathText text={`$$\\Delta=${quadB}^2-4\\cdot${quadA}\\cdot${quadC}=${discriminant}$$`} />
                                <MathText text={quadraticResult.text} />
                                <p>{quadraticResult.kind === 'two' ? pickText(lang, { eu: 'Bi soluzio erreal.', es: 'Dos soluciones reales.', ar: 'حلان حقيقيان.' }) : quadraticResult.kind === 'one' ? pickText(lang, { eu: 'Soluzio erreal bikoitza.', es: 'Una solución real doble.', ar: 'حل حقيقي مزدوج.' }) : quadraticResult.text}</p>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
