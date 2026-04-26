import { useMemo, useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import { normalizeAlgebraLang, pickText } from '../content'
import '../../dbh1-zatikiak/LabPage/LabPage.css'
import './LabPage.css'

type LabType = 'calculator' | 'monomial' | 'notables' | 'factor'

function safeEvaluate(expression: string, x: number, y: number) {
    const prepared = expression
        .replace(/\^/g, '**')
        .replace(/x/g, `(${x})`)
        .replace(/y/g, `(${y})`)

    try {
        return Function(`"use strict"; return (${prepared});`)()
    } catch {
        return null
    }
}

function formatExpression(expression: string) {
    return expression.replace(/\*/g, ' \\cdot ')
}

export function LabPage() {
    const { i18n } = useTranslation()
    const lang = normalizeAlgebraLang(i18n.language)
    const [activeLab, setActiveLab] = useState<LabType>('calculator')
    const [expression, setExpression] = useState('3*x^2 - 2*x + 1')
    const [xValue, setXValue] = useState('2')
    const [yValue, setYValue] = useState('0')
    const [selectedMonomial, setSelectedMonomial] = useState('5x^2yz|5|x^2yz|4')
    const [notableType, setNotableType] = useState<'sum2' | 'diff2' | 'sumdiff'>('sum2')
    const [aValue, setAValue] = useState(3)
    const [bValue, setBValue] = useState(2)
    const [selectedFactor, setSelectedFactor] = useState('4x^2 + 8x|4x|x + 2')

    const calculatorResult = useMemo(() => {
        const x = Number(xValue)
        const y = Number(yValue)
        const value = safeEvaluate(expression, x, y)
        return Number.isFinite(value) ? value : null
    }, [expression, xValue, yValue])

    const monomialParts = selectedMonomial.split('|')
    const factorParts = selectedFactor.split('|')

    const notableFormula = useMemo(() => {
        if (notableType === 'sum2') {
            return `$$(${aValue}+${bValue})^2 = ${aValue ** 2} + 2\\cdot${aValue}\\cdot${bValue} + ${bValue ** 2} = ${(aValue + bValue) ** 2}$$`
        }
        if (notableType === 'diff2') {
            return `$$(${aValue}-${bValue})^2 = ${aValue ** 2} - 2\\cdot${aValue}\\cdot${bValue} + ${bValue ** 2} = ${(aValue - bValue) ** 2}$$`
        }
        return `$$(${aValue}+${bValue})(${aValue}-${bValue}) = ${aValue ** 2} - ${bValue ** 2} = ${aValue ** 2 - bValue ** 2}$$`
    }, [aValue, bValue, notableType])

    const notableLabel = useMemo(() => {
        if (notableType === 'sum2') return '$$(a+b)^2$$'
        if (notableType === 'diff2') return '$$(a-b)^2$$'
        return '$$(a+b)(a-b)$$'
    }, [notableType])

    const notableDescription = useMemo(() => {
        if (notableType === 'sum2') {
            return pickText(lang, {
                eu: 'Karratu handia lau zatitan banatzen da: a^2, bi ab laukizuzen eta b^2.',
                es: 'El cuadrado grande se divide en a^2, dos rectángulos ab y b^2.',
                ar: 'ينقسم المربع الكبير إلى a^2 ومستطيلين ab و b^2.'
            })
        }
        if (notableType === 'diff2') {
            return pickText(lang, {
                eu: 'Karratu handiari bi ab laukizuzen kentzen zaizkio eta b^2 txokoa gehitzen da.',
                es: 'Al cuadrado grande se le restan dos rectángulos ab y se añade la esquina b^2.',
                ar: 'من المربع الكبير نطرح مستطيلين ab ونضيف الزاوية b^2.'
            })
        }
        return pickText(lang, {
            eu: 'Bi luzera konjugatuen biderkadurak a^2 eta b^2 arteko diferentzia ematen du.',
            es: 'El producto de dos binomios conjugados da la diferencia entre a^2 y b^2.',
            ar: 'حاصل ضرب مقدارين مترافقين يعطي الفرق بين a^2 و b^2.'
        })
    }, [lang, notableType])

    const labs = [
        {
            id: 'calculator' as const,
            icon: '🧮',
            label: pickText(lang, { eu: 'Balio numerikoa', es: 'Valor numérico', ar: 'القيمة العددية' }),
            description: pickText(lang, { eu: 'Adierazpenak ebaluatu', es: 'Evalúa expresiones', ar: 'قيّم التعابير' }),
            color: '#6366f1'
        },
        {
            id: 'monomial' as const,
            icon: '🔍',
            label: pickText(lang, { eu: 'Monomioak', es: 'Monomios', ar: 'الحدود الأحادية' }),
            description: pickText(lang, { eu: 'Zatitu osagaietan', es: 'Descompón en partes', ar: 'حلل إلى أجزاء' }),
            color: '#06b6d4'
        },
        {
            id: 'notables' as const,
            icon: '📐',
            label: pickText(lang, { eu: 'Biderkadura nabarmenak', es: 'Productos notables', ar: 'المتطابقات الشهيرة' }),
            description: pickText(lang, { eu: 'Ikusi egitura geometrikoa', es: 'Visualiza la estructura geométrica', ar: 'شاهد البنية الهندسية' }),
            color: '#f472b6'
        },
        {
            id: 'factor' as const,
            icon: '🔑',
            label: pickText(lang, { eu: 'Faktore komuna', es: 'Factor común', ar: 'العامل المشترك' }),
            description: pickText(lang, { eu: 'Egitura aurkitu', es: 'Encuentra la estructura', ar: 'اعثر على البنية' }),
            color: '#10b981'
        }
    ]

    return (
        <div className="lab-page">
            <div className="container">
                <header className="lab-header">
                    <h1>{labs.find((lab) => lab.id === activeLab)?.icon} {pickText(lang, { eu: 'Aljebraren Laborategia', es: 'Laboratorio de Álgebra', ar: 'مختبر الجبر' })}</h1>
                    <p className="lab-instructions">
                        {pickText(lang, {
                            eu: 'Zatikiaken laborategiaren estetika bera, baina Algebra 2 DBHko tresnekin.',
                            es: 'La misma estética del laboratorio de Zatikiak, pero con herramientas de Algebra 2 DBH.',
                            ar: 'نفس جمالية مختبر Zatikiak ولكن بأدوات Algebra 2 DBH.'
                        })}
                    </p>
                </header>

                <nav className="lab-grid" role="tablist" aria-label="Algebra labs">
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
                    {activeLab === 'calculator' && (
                        <section className="lab-panel">
                            <div className="lab-panel-header">
                                <span className="panel-icon">🧮</span>
                                <div>
                                    <h2>{labs[0].label}</h2>
                                    <p>{labs[0].description}</p>
                                </div>
                            </div>
                            <div className="algebra-tool-grid">
                                <label>
                                    <span><MathText text="$$f(x,y)$$" inline /></span>
                                    <input className="t-input" value={expression} onChange={(e) => setExpression(e.target.value)} />
                                </label>
                                <label>
                                    <span><MathText text="$x$" inline /></span>
                                    <input className="t-input" value={xValue} onChange={(e) => setXValue(e.target.value)} />
                                </label>
                                <label>
                                    <span><MathText text="$y$" inline /></span>
                                    <input className="t-input" value={yValue} onChange={(e) => setYValue(e.target.value)} />
                                </label>
                            </div>
                            <div className="algebra-result-card">
                                <h3>{pickText(lang, { eu: 'Emaitza', es: 'Resultado', ar: 'النتيجة' })}</h3>
                                <div className="result-number">{calculatorResult ?? '—'}</div>
                                <p><MathText text={`$${formatExpression(expression)}$`} /></p>
                            </div>
                        </section>
                    )}

                    {activeLab === 'monomial' && (
                        <section className="lab-panel">
                            <div className="lab-panel-header">
                                <span className="panel-icon">🔍</span>
                                <div>
                                    <h2>{labs[1].label}</h2>
                                    <p>{labs[1].description}</p>
                                </div>
                            </div>
                            <select className="t-input" value={selectedMonomial} onChange={(e) => setSelectedMonomial(e.target.value)}>
                                <option value="5x^2yz|5|x^2yz|4">5x^2yz</option>
                                <option value="-3ab^2|-3|ab^2|3">-3ab^2</option>
                                <option value="7n^4|7|n^4|4">7n^4</option>
                                <option value="-2|-2|1|0">-2</option>
                            </select>
                            <div className="mono-parts">
                                <div className="mono-part coef">
                                    <div className="pval"><MathText text={`$${monomialParts[1]}$`} inline /></div>
                                    <div className="plbl">{pickText(lang, { eu: 'Koefizientea', es: 'Coeficiente', ar: 'المعامل' })}</div>
                                </div>
                                <div className="mono-part lit">
                                    <div className="pval"><MathText text={`$${monomialParts[2]}$`} inline /></div>
                                    <div className="plbl">{pickText(lang, { eu: 'Zati literala', es: 'Parte literal', ar: 'الجزء الحرفي' })}</div>
                                </div>
                                <div className="mono-part gr">
                                    <div className="pval"><MathText text={`$${monomialParts[3]}$`} inline /></div>
                                    <div className="plbl">{pickText(lang, { eu: 'Gradua', es: 'Grado', ar: 'الدرجة' })}</div>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeLab === 'notables' && (
                        <section className="lab-panel">
                            <div className="lab-panel-header">
                                <span className="panel-icon">📐</span>
                                <div>
                                    <h2>{labs[2].label}</h2>
                                    <p>{labs[2].description}</p>
                                </div>
                            </div>
                            <div className="type-select">
                                <button className={`type-btn ${notableType === 'sum2' ? 'active' : ''}`} onClick={() => setNotableType('sum2')}>
                                    <MathText text="$$(a+b)^2$$" />
                                </button>
                                <button className={`type-btn ${notableType === 'diff2' ? 'active' : ''}`} onClick={() => setNotableType('diff2')}>
                                    <MathText text="$$(a-b)^2$$" />
                                </button>
                                <button className={`type-btn ${notableType === 'sumdiff' ? 'active' : ''}`} onClick={() => setNotableType('sumdiff')}>
                                    <MathText text="$$(a+b)(a-b)$$" />
                                </button>
                            </div>
                            <div className="slider-row">
                                <label>
                                    <span><MathText text={`$a = ${aValue}$`} inline /></span>
                                    <input type="range" min="1" max="8" value={aValue} onChange={(e) => setAValue(Number(e.target.value))} />
                                </label>
                                <label>
                                    <span><MathText text={`$b = ${bValue}$`} inline /></span>
                                    <input type="range" min="1" max="8" value={bValue} onChange={(e) => setBValue(Number(e.target.value))} />
                                </label>
                            </div>

                            <div className="pn-visual-card">
                                <div className="pn-visual-header">
                                    <div>
                                        <h3><MathText text={notableLabel} /></h3>
                                        <p>{notableDescription}</p>
                                    </div>
                                </div>

                                {notableType === 'sum2' && (
                                    <div className="pn-square-grid sum2">
                                        <div className="sq-cell a2"><MathText text={`$${aValue}^2$`} inline /></div>
                                        <div className="sq-cell ab top"><MathText text={`$${aValue}\\cdot${bValue}$`} inline /></div>
                                        <div className="sq-cell ab side"><MathText text={`$${aValue}\\cdot${bValue}$`} inline /></div>
                                        <div className="sq-cell b2"><MathText text={`$${bValue}^2$`} inline /></div>
                                    </div>
                                )}

                                {notableType === 'diff2' && (
                                    <div className="pn-square-grid diff2">
                                        <div className="sq-cell a2"><MathText text={`$${aValue}^2$`} inline /></div>
                                        <div className="sq-cell ab top negative"><MathText text={`$-${aValue}\\cdot${bValue}$`} inline /></div>
                                        <div className="sq-cell ab side negative"><MathText text={`$-${aValue}\\cdot${bValue}$`} inline /></div>
                                        <div className="sq-cell b2"><MathText text={`$${bValue}^2$`} inline /></div>
                                    </div>
                                )}

                                {notableType === 'sumdiff' && (
                                    <div className="pn-balance-grid">
                                        <div className="balance-box positive"><MathText text={`$${aValue}^2$`} inline /></div>
                                        <div className="balance-symbol"><MathText text="$-$" inline /></div>
                                        <div className="balance-box negative"><MathText text={`$${bValue}^2$`} inline /></div>
                                    </div>
                                )}
                            </div>

                            <div className="pn-formula">
                                <MathText text={notableFormula} />
                            </div>
                        </section>
                    )}

                    {activeLab === 'factor' && (
                        <section className="lab-panel">
                            <div className="lab-panel-header">
                                <span className="panel-icon">🔑</span>
                                <div>
                                    <h2>{labs[3].label}</h2>
                                    <p>{labs[3].description}</p>
                                </div>
                            </div>
                            <select className="t-input" value={selectedFactor} onChange={(e) => setSelectedFactor(e.target.value)}>
                                <option value="6x + 9|3|2x + 3">6x + 9</option>
                                <option value="4x^2 + 8x|4x|x + 2">4x^2 + 8x</option>
                                <option value="5x^2 + 10xy + 15x|5x|x + 2y + 3">5x^2 + 10xy + 15x</option>
                            </select>
                            <div className="algebra-result-card">
                                <h3>{pickText(lang, { eu: 'Deskonposizioa', es: 'Descomposición', ar: 'التحليل' })}</h3>
                                <p><MathText text={`$${factorParts[0]} = ${factorParts[1]}(${factorParts[2]})$`} /></p>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    )
}
