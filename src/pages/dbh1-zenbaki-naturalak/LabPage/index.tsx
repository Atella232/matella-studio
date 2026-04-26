import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import './LabPage.css'

type Lang = 'es' | 'eu' | 'ar'
type ToolId = 'abaco' | 'constructor' | 'comparador' | 'redondeo' | 'operaciones' | 'division' | 'detector' | 'sandbox'
type Op = '+' | '-' | '*'
type RoundOrder = 'decenas' | 'centenas' | 'millares'

interface ToolCopy {
    title: string
    concept: string
    objective: string
}

interface UiCopy {
    pageTitle: string
    pageDesc: string
    controls: string
    result: string
    check: string
    next: string
    equals: string
    target: string
    correct: string
    incorrect: string
    exact: string
    estimate: string
    delta: string
    order: string
    operator: string
    decompositionPlaceholder: string
    expressionPlaceholder: string
    labToolsAria: string
    locale: Intl.LocalesArgument
    orderLabels: Record<RoundOrder, string>
    liveLabel: string
    formulaLabel: string
    panelStrength: string
    panelPractice: string
    regroup: string
    compareA: string
    compareB: string
    boardTools: string
    boardGoal: string
    boardMode: string
    boardModeValue: string
    sampleEq: string
    betweenLabel: string
    lowerBound: string
    upperBound: string
}

function resolveLang(language: string): Lang {
    if (language.startsWith('eu')) return 'eu'
    if (language.startsWith('ar')) return 'ar'
    return 'es'
}

const TOOL_META: Array<{ id: ToolId; icon: string; color: string }> = [
    { id: 'abaco', icon: '🧮', color: '#6366f1' },
    { id: 'constructor', icon: '🧩', color: '#0ea5e9' },
    { id: 'comparador', icon: '⚖️', color: '#8b5cf6' },
    { id: 'redondeo', icon: '🎯', color: '#f59e0b' },
    { id: 'operaciones', icon: '➕', color: '#10b981' },
    { id: 'division', icon: '📦', color: '#ef4444' },
    { id: 'detector', icon: '🕵️', color: '#06b6d4' },
    { id: 'sandbox', icon: '🧠', color: '#a855f7' }
]

const UI_COPY: Record<Lang, UiCopy> = {
    es: {
        pageTitle: 'Laboratorio: Numeros naturales',
        pageDesc: '8 herramientas interactivas para practicar sistema decimal, operaciones y resolucion de problemas.',
        controls: 'Controles',
        result: 'Resultado',
        check: 'Comprobar',
        next: 'Nuevo reto',
        equals: 'es igual a',
        target: 'Objetivo',
        correct: 'Correcto',
        incorrect: 'Revisa el procedimiento',
        exact: 'Exacto',
        estimate: 'Estimado',
        delta: 'Diferencia',
        order: 'Orden',
        operator: 'Operacion',
        decompositionPlaceholder: '400000 + 7000 + 200 + 5',
        expressionPlaceholder: '(2+3)*4',
        labToolsAria: 'Herramientas de laboratorio',
        locale: 'es-ES',
        orderLabels: {
            decenas: 'Decenas',
            centenas: 'Centenas',
            millares: 'Millares'
        },
        liveLabel: 'Interaccion en vivo',
        formulaLabel: 'Regla matematica',
        panelStrength: 'Visual y manipulable',
        panelPractice: 'Practica guiada',
        regroup: 'Reagrupar',
        compareA: 'Numero A',
        compareB: 'Numero B',
        boardTools: 'Herramientas activas',
        boardGoal: 'Meta',
        boardMode: 'Modo',
        boardModeValue: 'Mixto conceptual + procedimental',
        sampleEq: 'Expresion de referencia',
        betweenLabel: 'Entre',
        lowerBound: 'Inferior',
        upperBound: 'Superior'
    },
    eu: {
        pageTitle: 'Laborategia: zenbaki naturalak',
        pageDesc: '8 tresna interaktibo sistema hamartarra, eragiketak eta problemen ebazpena lantzeko.',
        controls: 'Kontrolak',
        result: 'Emaitza',
        check: 'Egiaztatu',
        next: 'Erronka berria',
        equals: 'hau da',
        target: 'Helburua',
        correct: 'Zuzena',
        incorrect: 'Berrikusi prozedura',
        exact: 'Zehatza',
        estimate: 'Estimazioa',
        delta: 'Aldea',
        order: 'Ordena',
        operator: 'Eragiketa',
        decompositionPlaceholder: '400000 + 7000 + 200 + 5',
        expressionPlaceholder: '(2+3)*4',
        labToolsAria: 'Laborategiko tresnak',
        locale: 'eu-ES',
        orderLabels: {
            decenas: 'Hamarrak',
            centenas: 'Ehunak',
            millares: 'Milak'
        },
        liveLabel: 'Zuzeneko interakzioa',
        formulaLabel: 'Arau matematikoa',
        panelStrength: 'Bisuala eta manipulatiboa',
        panelPractice: 'Praktika gidatua',
        regroup: 'Birrerapatu',
        compareA: 'A zenbakia',
        compareB: 'B zenbakia',
        boardTools: 'Tresna aktiboak',
        boardGoal: 'Helburua',
        boardMode: 'Modua',
        boardModeValue: 'Kontzeptuala + prozedurazkoa',
        sampleEq: 'Erreferentzia adierazpena',
        betweenLabel: 'Tartean',
        lowerBound: 'Behekoa',
        upperBound: 'Goikoa'
    },
    ar: {
        pageTitle: 'المختبر: الأعداد الطبيعية',
        pageDesc: '8 أدوات تفاعلية لتدريب النظام العشري والعمليات وحل المسائل.',
        controls: 'عناصر التحكم',
        result: 'النتيجة',
        check: 'تحقق',
        next: 'تحد جديد',
        equals: 'يساوي',
        target: 'الهدف',
        correct: 'صحيح',
        incorrect: 'راجع الخطوات',
        exact: 'الناتج الدقيق',
        estimate: 'الناتج التقريبي',
        delta: 'الفرق',
        order: 'المرتبة',
        operator: 'العملية',
        decompositionPlaceholder: '400000 + 7000 + 200 + 5',
        expressionPlaceholder: '(2+3)*4',
        labToolsAria: 'أدوات المختبر',
        locale: 'ar-EG',
        orderLabels: {
            decenas: 'العشرات',
            centenas: 'المئات',
            millares: 'الآلاف'
        },
        liveLabel: 'تفاعل مباشر',
        formulaLabel: 'القاعدة الرياضية',
        panelStrength: 'مرئي وقابل للتجريب',
        panelPractice: 'تدريب موجه',
        regroup: 'إعادة التجميع',
        compareA: 'العدد A',
        compareB: 'العدد B',
        boardTools: 'الأدوات النشطة',
        boardGoal: 'الهدف',
        boardMode: 'النمط',
        boardModeValue: 'مفاهيمي + إجرائي',
        sampleEq: 'عبارة مرجعية',
        betweenLabel: 'بين',
        lowerBound: 'الأدنى',
        upperBound: 'الأعلى'
    }
}

const TOOL_COPY: Record<Lang, Record<ToolId, ToolCopy>> = {
    es: {
        abaco: {
            title: 'Herramienta 1: Abaco posicional',
            concept: 'Valor posicional y agrupaciones de 10.',
            objective: 'Ver como cambia el numero al mover cantidades entre ordenes.'
        },
        constructor: {
            title: 'Herramienta 2: Constructor de descomposicion',
            concept: 'Numero en cifras <-> descomposicion.',
            objective: 'Comprobar si una descomposicion representa el numero dado.'
        },
        comparador: {
            title: 'Herramienta 3: Comparador dinamico',
            concept: 'Comparacion de dos naturales.',
            objective: 'Decidir rapidamente >, < o =.'
        },
        redondeo: {
            title: 'Herramienta 4: Redondeo con criterio',
            concept: 'Aproximacion por cifra siguiente.',
            objective: 'Aplicar redondeo al orden pedido con seguridad.'
        },
        operaciones: {
            title: 'Herramienta 5: Operaciones + estimacion',
            concept: 'Exacto frente a estimado.',
            objective: 'Detectar si un resultado es razonable.'
        },
        division: {
            title: 'Herramienta 6: Division entera visual',
            concept: 'Cociente, resto y verificacion.',
            objective: 'Validar que $$0 <= r < d$$.'
        },
        detector: {
            title: 'Herramienta 7: Detector de errores',
            concept: 'Jerarquia de operaciones.',
            objective: 'Identificar la resolucion correcta y explicar el error.'
        },
        sandbox: {
            title: 'Herramienta 8: Taller de expresiones',
            concept: 'Modelizacion con operaciones combinadas.',
            objective: 'Construir una expresion que cumpla un objetivo.'
        }
    },
    eu: {
        abaco: {
            title: '1. tresna: Abako posizionala',
            concept: 'Balio posizionala eta 10eko agrupazioak.',
            objective: 'Ordenen arteko aldaketek zenbakia nola aldatzen duten ikustea.'
        },
        constructor: {
            title: '2. tresna: Deskonposizio-eraikitzailea',
            concept: 'Zifrak <-> deskonposizioa.',
            objective: 'Emandako zenbakiaren deskonposizio zuzena egiaztatzea.'
        },
        comparador: {
            title: '3. tresna: Konparatzaile dinamikoa',
            concept: 'Bi zenbaki naturalen konparaketa.',
            objective: '>, < edo = azkar erabakitzea.'
        },
        redondeo: {
            title: '4. tresna: Biribiltzea irizpidearekin',
            concept: 'Hurrengo zifraren bidezko hurbilketa.',
            objective: 'Eskatutako ordenan biribiltzea segurtasunez.'
        },
        operaciones: {
            title: '5. tresna: Eragiketak + estimazioa',
            concept: 'Emaitza zehatza vs estimatua.',
            objective: 'Emaitza zentzuzkoa den ala ez detektatzea.'
        },
        division: {
            title: '6. tresna: Zatiketa oso bisuala',
            concept: 'Zatidura, hondarra eta egiaztapena.',
            objective: '$$0 <= r < d$$ baldintza balioztatzea.'
        },
        detector: {
            title: '7. tresna: Akatsen detektagailua',
            concept: 'Eragiketen hierarkia.',
            objective: 'Ebazpen zuzena identifikatzea eta akatsa azaltzea.'
        },
        sandbox: {
            title: '8. tresna: Adierazpenen tailerra',
            concept: 'Eragiketa konbinatuen modelizazioa.',
            objective: 'Helburua betetzen duen adierazpena eraikitzea.'
        }
    },
    ar: {
        abaco: {
            title: 'الأداة 1: المعداد الموضعي',
            concept: 'القيمة المكانية وتجميعات العشرة.',
            objective: 'فهم كيف تتغير قيمة العدد عند تغيير المرتبة.'
        },
        constructor: {
            title: 'الأداة 2: منشئ التفكيك',
            concept: 'العدد بالأرقام <-> التفكيك.',
            objective: 'التحقق من أن التفكيك يطابق العدد المعطى.'
        },
        comparador: {
            title: 'الأداة 3: المقارن الديناميكي',
            concept: 'مقارنة عددين طبيعيين.',
            objective: 'اختيار > أو < أو = بسرعة.'
        },
        redondeo: {
            title: 'الأداة 4: التقريب بالقاعدة',
            concept: 'التقريب اعتمادا على الرقم التالي.',
            objective: 'تقريب العدد إلى المرتبة المطلوبة بثقة.'
        },
        operaciones: {
            title: 'الأداة 5: العمليات + التقدير',
            concept: 'مقارنة الناتج الدقيق بالتقدير.',
            objective: 'اكتشاف ما إذا كانت النتيجة منطقية.'
        },
        division: {
            title: 'الأداة 6: القسمة الإقليدية المرئية',
            concept: 'خارج القسمة والباقي والتحقق.',
            objective: 'التحقق من الشرط $$0 <= r < d$$.'
        },
        detector: {
            title: 'الأداة 7: كاشف الأخطاء',
            concept: 'ترتيب العمليات.',
            objective: 'اختيار الحل الصحيح وشرح الخطأ.'
        },
        sandbox: {
            title: 'الأداة 8: ورشة العبارات',
            concept: 'نمذجة بعمليات مركبة.',
            objective: 'بناء عبارة تحقق الهدف.'
        }
    }
}

const FORMULAS: Record<Lang, Record<ToolId, string>> = {
    es: {
        abaco: '$$N = 1000M + 100C + 10D + U$$',
        constructor: '$$N = a_k10^k + ... + a_110 + a_0$$',
        comparador: '$$A ? B$$ comparando desde la izquierda',
        redondeo: 'si siguiente < 5 mantiene; si >= 5 aumenta',
        operaciones: 'exacto + estimacion para validar plausibilidad',
        division: '$$D = d\\cdot c + r,\\ 0 \\le r < d$$',
        detector: '$$(\\ ) \\to \\times/\\div \\to +,-$$',
        sandbox: 'modelo numerico de un enunciado'
    },
    eu: {
        abaco: '$$N = 1000M + 100C + 10D + U$$',
        constructor: '$$N = a_k10^k + ... + a_110 + a_0$$',
        comparador: '$$A ? B$$ ezkerretik konparatuz',
        redondeo: 'hurrengoa < 5 mantendu; >= 5 igo',
        operaciones: 'zehatza + estimazioa, egiaztatzeko',
        division: '$$D = d\\cdot c + r,\\ 0 \\le r < d$$',
        detector: '$$(\\ ) \\to \\times/\\div \\to +,-$$',
        sandbox: 'enuntziatu baten eredu numerikoa'
    },
    ar: {
        abaco: '$$N = 1000M + 100C + 10D + U$$',
        constructor: '$$N = a_k10^k + ... + a_110 + a_0$$',
        comparador: '$$A ? B$$ بالمقارنة من اليسار',
        redondeo: 'إذا التالي < 5 نبقي، وإذا >= 5 نزيد',
        operaciones: 'ناتج دقيق + تقدير للتحقق',
        division: '$$D = d\\cdot c + r,\\ 0 \\le r < d$$',
        detector: '$$(\\ ) \\to \\times/\\div \\to +,-$$',
        sandbox: 'نموذج عددي لوضعية لفظية'
    }
}

const ROUND_FACTORS: Record<RoundOrder, number> = { decenas: 10, centenas: 100, millares: 1000 }

function roundToOrder(value: number, order: RoundOrder) {
    const factor = ROUND_FACTORS[order]
    const base = Math.floor(value / factor)
    const next = Math.floor((value % factor) / (factor / 10))
    return next >= 5 ? (base + 1) * factor : base * factor
}

function normalizeExpression(expression: string) {
    return expression
        .replace(/\s+/g, '')
        .replace(/[×·]/g, '*')
        .replace(/÷/g, '/')
        .replace(/[−–]/g, '-')
        .replace(/:/g, '/')
}

function safeEval(raw: string): number | null {
    const candidate = normalizeExpression(raw)
    if (!/^[0-9()+\-*/.]+$/.test(candidate)) return null
    try {
        const value = Function(`"use strict"; return (${candidate});`)() as number
        if (!Number.isFinite(value)) return null
        return value
    } catch {
        return null
    }
}

function buildNumberChallenge() {
    return Math.floor(Math.random() * 9000000) + 1000
}

function decompositionOf(value: number) {
    const parts: number[] = []
    let n = value
    let place = 1
    while (n > 0) {
        const digit = n % 10
        if (digit !== 0) parts.unshift(digit * place)
        n = Math.floor(n / 10)
        place *= 10
    }
    return parts.join(' + ')
}

function toMath(expression: string) {
    return `$$${expression}$$`
}

function opToLatex(op: Op) {
    return op === '*' ? '\\cdot' : op
}

export function LabPage() {
    const { i18n } = useTranslation()
    const lang = resolveLang(i18n.language)
    const ui = UI_COPY[lang]
    const formatNumber = (value: number) => value.toLocaleString(ui.locale)

    const [activeTool, setActiveTool] = useState<ToolId>('abaco')

    const [u, setU] = useState(7)
    const [d, setD] = useState(5)
    const [c, setC] = useState(3)
    const [m, setM] = useState(0)

    const [constructorNumber, setConstructorNumber] = useState(buildNumberChallenge)
    const [constructorInput, setConstructorInput] = useState('')
    const [constructorOk, setConstructorOk] = useState<boolean | null>(null)

    const [a, setA] = useState(438912)
    const [b, setB] = useState(438291)

    const [roundNumber, setRoundNumber] = useState(384523)
    const [roundOrder, setRoundOrder] = useState<RoundOrder>('millares')

    const [op, setOp] = useState<Op>('+')
    const [opA, setOpA] = useState(167)
    const [opB, setOpB] = useState(235)

    const [dividend, setDividend] = useState(1274)
    const [divisor, setDivisor] = useState(30)
    const [studentQ, setStudentQ] = useState('')
    const [studentR, setStudentR] = useState('')
    const [divisionOk, setDivisionOk] = useState<boolean | null>(null)

    const [detectorChoice, setDetectorChoice] = useState<number | null>(null)
    const [detectorOk, setDetectorOk] = useState<boolean | null>(null)

    const [sandboxExpression, setSandboxExpression] = useState('')

    const currentMeta = TOOL_META.find((tool) => tool.id === activeTool)!
    const toolText = TOOL_COPY[lang][activeTool]

    const abacusTotal = u + d * 10 + c * 100 + m * 1000
    const compareSymbol = a === b ? '=' : a > b ? '>' : '<'

    const cleanRound = Math.max(0, Math.floor(roundNumber))
    const rounded = roundToOrder(cleanRound, roundOrder)
    const roundFactor = ROUND_FACTORS[roundOrder]
    const roundLower = Math.floor(cleanRound / roundFactor) * roundFactor
    const roundUpper = roundLower + roundFactor

    const exactResult = op === '+' ? opA + opB : op === '-' ? opA - opB : opA * opB
    const estimateA = Math.round(opA / 10) * 10
    const estimateB = Math.round(opB / 10) * 10
    const estimatedResult = op === '+' ? estimateA + estimateB : op === '-' ? estimateA - estimateB : estimateA * estimateB

    const trueQ = Math.floor(Math.max(0, dividend) / Math.max(1, divisor))
    const trueR = Math.max(0, dividend) - Math.max(1, divisor) * trueQ

    const detectorOptions = {
        es: ['(2+3)*4 = 20', '2+3*4 = 20', '2+3*4 = 5*4 = 20'],
        eu: ['(2+3)*4 = 20', '2+3*4 = 20', '2+3*4 = 5*4 = 20'],
        ar: ['(2+3)*4 = 20', '2+3*4 = 20', '2+3*4 = 5*4 = 20']
    }[lang]

    const sandboxTargetExpr = '8*15 + 26*8'
    const sandboxTargetValue = safeEval(sandboxTargetExpr)
    const sandboxValue = safeEval(sandboxExpression)

    const constructorExpected = decompositionOf(constructorNumber)

    const constructorFeedback = constructorOk === null ? '' : constructorOk ? ui.correct : ui.incorrect
    const divisionFeedback = divisionOk === null ? '' : divisionOk ? ui.correct : ui.incorrect
    const detectorFeedback = detectorOk === null ? '' : detectorOk ? ui.correct : ui.incorrect

    const regroupU = () => {
        if (u >= 10) {
            setU((value) => value - 10)
            setD((value) => value + 1)
        }
    }

    const regroupD = () => {
        if (d >= 10) {
            setD((value) => value - 10)
            setC((value) => value + 1)
        }
    }

    const regroupC = () => {
        if (c >= 10) {
            setC((value) => value - 10)
            setM((value) => value + 1)
        }
    }

    const checkConstructor = () => {
        const user = normalizeExpression(constructorInput)
        const expected = normalizeExpression(constructorExpected)
        setConstructorOk(user === expected)
    }

    const nextConstructor = () => {
        setConstructorNumber(buildNumberChallenge())
        setConstructorInput('')
        setConstructorOk(null)
    }

    const checkDivision = () => {
        const q = Number(studentQ)
        const r = Number(studentR)
        setDivisionOk(q === trueQ && r === trueR && r >= 0 && r < Math.max(1, divisor))
    }

    const checkDetector = () => {
        if (detectorChoice === null) return
        setDetectorOk(detectorChoice === 0)
    }

    return (
        <div className="zn-lab-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container">
                <header className="zn-lab-header">
                    <h1>🧪 {ui.pageTitle}</h1>
                    <p>{ui.pageDesc}</p>
                    <div className="zn-lab-board glass">
                        <span><strong>8</strong> {ui.boardTools}</span>
                        <span><strong>1º ESO</strong> {ui.boardGoal}</span>
                        <span><strong>{ui.panelStrength}</strong></span>
                        <span>{ui.boardMode}: <strong>{ui.boardModeValue}</strong></span>
                    </div>
                </header>

                <nav className="zn-lab-grid" role="tablist" aria-label={ui.labToolsAria}>
                    {TOOL_META.map((tool) => (
                        <button
                            key={tool.id}
                            role="tab"
                            className={`zn-lab-card ${activeTool === tool.id ? 'active' : ''}`}
                            onClick={() => setActiveTool(tool.id)}
                            style={{ '--lab-color': tool.color } as React.CSSProperties}
                        >
                            <span className="zn-lab-icon">{tool.icon}</span>
                            <span className="zn-lab-name">{TOOL_COPY[lang][tool.id].title}</span>
                        </button>
                    ))}
                </nav>

                <section className="zn-lab-panel" style={{ '--panel-color': currentMeta.color } as React.CSSProperties}>
                    <div className="zn-lab-panel-header">
                        <span className="panel-chip">{currentMeta.icon}</span>
                        <div>
                            <h2>{toolText.title}</h2>
                            <p><MathText text={toolText.objective} /></p>
                            <p><MathText text={toolText.concept} /></p>
                        </div>
                    </div>

                    <div className="zn-lab-panel-tags">
                        <span className="tag">⚡ {ui.liveLabel}</span>
                        <span className="tag">🧭 {ui.panelPractice}</span>
                    </div>

                    <div className="zn-formula-strip">
                        <strong>{ui.formulaLabel}:</strong> <MathText text={FORMULAS[lang][activeTool]} />
                    </div>

                    {activeTool === 'abaco' && (
                        <div className="zn-widget-card">
                            <h3>🧮 {ui.controls}</h3>
                            <div className="zn-widget-grid">
                                <label>U<input type="number" min={0} value={u} onChange={(e) => setU(Number(e.target.value))} /></label>
                                <label>D<input type="number" min={0} value={d} onChange={(e) => setD(Number(e.target.value))} /></label>
                                <label>C<input type="number" min={0} value={c} onChange={(e) => setC(Number(e.target.value))} /></label>
                                <label>M<input type="number" min={0} value={m} onChange={(e) => setM(Number(e.target.value))} /></label>
                            </div>
                            <div className="zn-widget-actions">
                                <button onClick={regroupU}>{ui.regroup} U→D</button>
                                <button onClick={regroupD}>{ui.regroup} D→C</button>
                                <button onClick={regroupC}>{ui.regroup} C→M</button>
                            </div>
                            <p className="zn-widget-result">{ui.result}: {formatNumber(abacusTotal)}</p>
                            <p className="zn-widget-note">
                                <MathText text={toMath(`${abacusTotal} = ${m}\\cdot1000 + ${c}\\cdot100 + ${d}\\cdot10 + ${u}`)} inline />
                            </p>
                        </div>
                    )}

                    {activeTool === 'constructor' && (
                        <div className="zn-widget-card">
                            <h3>🧩 {ui.controls}</h3>
                            <p>{ui.target}: <strong>{formatNumber(constructorNumber)}</strong></p>
                            <p>{ui.result}: <MathText text={toMath(constructorExpected)} inline /></p>
                            <input
                                value={constructorInput}
                                onChange={(e) => {
                                    setConstructorInput(e.target.value)
                                    setConstructorOk(null)
                                }}
                                placeholder={ui.decompositionPlaceholder}
                            />
                            <div className="zn-widget-actions">
                                <button onClick={checkConstructor}>{ui.check}</button>
                                <button onClick={nextConstructor}>{ui.next}</button>
                            </div>
                            {constructorFeedback && <p className={constructorOk ? 'ok' : 'ko'}>{constructorFeedback}</p>}
                        </div>
                    )}

                    {activeTool === 'comparador' && (
                        <div className="zn-widget-card">
                            <h3>⚖️ {ui.controls}</h3>
                            <div className="zn-widget-grid">
                                <label>{ui.compareA}<input type="number" value={a} onChange={(e) => setA(Number(e.target.value))} /></label>
                                <label>{ui.compareB}<input type="number" value={b} onChange={(e) => setB(Number(e.target.value))} /></label>
                            </div>
                            <div className="zn-comparator-display">
                                <span>{formatNumber(a)}</span>
                                <span className={`symbol ${compareSymbol === '>' ? 'gt' : compareSymbol === '<' ? 'lt' : 'eq'}`}>{compareSymbol}</span>
                                <span>{formatNumber(b)}</span>
                            </div>
                        </div>
                    )}

                    {activeTool === 'redondeo' && (
                        <div className="zn-widget-card">
                            <h3>🎯 {ui.controls}</h3>
                            <div className="zn-widget-grid">
                                <label>
                                    N
                                    <input type="number" min={0} value={roundNumber} onChange={(e) => setRoundNumber(Number(e.target.value))} />
                                </label>
                                <label>
                                    {ui.order}
                                    <select value={roundOrder} onChange={(e) => setRoundOrder(e.target.value as RoundOrder)}>
                                        <option value="decenas">{ui.orderLabels.decenas} (10)</option>
                                        <option value="centenas">{ui.orderLabels.centenas} (100)</option>
                                        <option value="millares">{ui.orderLabels.millares} (1000)</option>
                                    </select>
                                </label>
                            </div>
                            <p className="zn-widget-note">
                                {ui.betweenLabel}: <MathText text={toMath(`${roundLower} \\le N < ${roundUpper}`)} inline />
                            </p>
                            <p className="zn-widget-note">
                                {ui.lowerBound}: <MathText text={toMath(String(roundLower))} inline /> · {ui.upperBound}:{' '}
                                <MathText text={toMath(String(roundUpper))} inline />
                            </p>
                            <p className="zn-widget-result">{ui.result}: {formatNumber(rounded)}</p>
                        </div>
                    )}

                    {activeTool === 'operaciones' && (
                        <div className="zn-widget-card">
                            <h3>➕ {ui.controls}</h3>
                            <div className="zn-widget-grid">
                                <label>A<input type="number" value={opA} onChange={(e) => setOpA(Number(e.target.value))} /></label>
                                <label>
                                    {ui.operator}
                                    <select value={op} onChange={(e) => setOp(e.target.value as Op)}>
                                        <option value="+">+</option>
                                        <option value="-">-</option>
                                        <option value="*">×</option>
                                    </select>
                                </label>
                                <label>B<input type="number" value={opB} onChange={(e) => setOpB(Number(e.target.value))} /></label>
                            </div>
                            <p className="zn-widget-note">
                                <MathText text={toMath(`${opA} ${opToLatex(op)} ${opB} = ${exactResult}`)} inline />
                            </p>
                            <p className="zn-widget-result">{ui.exact}: {formatNumber(exactResult)}</p>
                            <p className="zn-widget-note">{ui.estimate}: {formatNumber(estimatedResult)}</p>
                            <p className="zn-widget-note">{ui.delta}: {formatNumber(Math.abs(exactResult - estimatedResult))}</p>
                        </div>
                    )}

                    {activeTool === 'division' && (
                        <div className="zn-widget-card">
                            <h3>📦 {ui.controls}</h3>
                            <div className="zn-widget-grid">
                                <label>D<input type="number" min={0} value={dividend} onChange={(e) => setDividend(Number(e.target.value))} /></label>
                                <label>d<input type="number" min={1} value={divisor} onChange={(e) => setDivisor(Math.max(1, Number(e.target.value)))} /></label>
                                <label>c<input value={studentQ} onChange={(e) => { setStudentQ(e.target.value); setDivisionOk(null) }} /></label>
                                <label>r<input value={studentR} onChange={(e) => { setStudentR(e.target.value); setDivisionOk(null) }} /></label>
                            </div>
                            <div className="zn-widget-actions">
                                <button onClick={checkDivision}>{ui.check}</button>
                            </div>
                            <p className="zn-widget-note">
                                <MathText text={toMath(`${Math.max(0, dividend)} = ${Math.max(1, divisor)}\\cdot${trueQ} + ${trueR}`)} inline />
                            </p>
                            {divisionFeedback && <p className={divisionOk ? 'ok' : 'ko'}>{divisionFeedback}</p>}
                        </div>
                    )}

                    {activeTool === 'detector' && (
                        <div className="zn-widget-card">
                            <h3>🕵️ {ui.controls}</h3>
                            <p>{ui.target}: <MathText text={toMath('2 + 3*4 = 20')} inline /></p>
                            <div className="zn-option-list">
                                {detectorOptions.map((option, index) => (
                                    <button
                                        key={option}
                                        className={`option ${detectorChoice === index ? 'selected' : ''}`}
                                        onClick={() => {
                                            setDetectorChoice(index)
                                            setDetectorOk(null)
                                        }}
                                    >
                                        <MathText text={toMath(option)} inline />
                                    </button>
                                ))}
                            </div>
                            <div className="zn-widget-actions">
                                <button onClick={checkDetector}>{ui.check}</button>
                            </div>
                            {detectorFeedback && <p className={detectorOk ? 'ok' : 'ko'}>{detectorFeedback}</p>}
                        </div>
                    )}

                    {activeTool === 'sandbox' && (
                        <div className="zn-widget-card">
                            <h3>🧠 {ui.controls}</h3>
                            <p>{ui.sampleEq}: <MathText text={toMath(`${sandboxTargetExpr} = ${sandboxTargetValue}`)} inline /></p>
                            <input
                                value={sandboxExpression}
                                onChange={(e) => setSandboxExpression(e.target.value)}
                                placeholder={ui.expressionPlaceholder}
                            />
                            <p className="zn-widget-note">
                                {ui.result}:{' '}
                                {sandboxValue === null
                                    ? '---'
                                    : <MathText text={toMath(String(sandboxValue))} inline />}
                            </p>
                            {sandboxValue !== null && sandboxTargetValue !== null && (
                                <p className={sandboxValue === sandboxTargetValue ? 'ok' : 'ko'}>
                                    {sandboxValue === sandboxTargetValue ? ui.correct : ui.incorrect}
                                </p>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

