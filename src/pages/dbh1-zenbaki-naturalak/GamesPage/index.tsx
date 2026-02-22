import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import './GamesPage.css'

type Lang = 'es' | 'eu' | 'ar'
type GameId = 'flash' | 'parentesis' | 'reparto'

interface GameMeta {
    id: GameId
    icon: string
    color: string
}

interface GameText {
    tab: string
    title: string
    objective: string
    skill: string
}

interface UiText {
    pageTitle: string
    pageDesc: string
    score: string
    streak: string
    rounds: string
    accuracy: string
    rank: string
    rankLevels: { base: string; pro: string; master: string }
    formula: string
    check: string
    next: string
    correct: string
    incorrect: string
    lockHint: string
    gameText: Record<GameId, GameText>
    formulas: Record<GameId, string>
    flash: {
        number: string
        focusDigit: string
        place: string
        valuePrompt: string
        placeholder: string
    }
    parentesis: {
        base: string
        target: string
        choose: string
        explanation: string
    }
    reparto: {
        prompt: string
        quotient: string
        remainder: string
        context: string
        rule: string
        condition: string
        solution: string
    }
    gamesAria: string
    locale: Intl.LocalesArgument
    placeNames: string[]
}

interface ParenthesisPuzzle {
    statement: string
    target: number
    options: string[]
    correctIndex: number
}

interface FlashChallenge {
    number: number
    digit: number
    place: number
    value: number
    index: number
}

interface RepartoContext {
    icon: string
    item: string
    group: string
}

interface RepartoChallenge {
    dividend: number
    divisor: number
    quotient: number
    remainder: number
    context: RepartoContext
}

function resolveLang(language: string): Lang {
    if (language.startsWith('eu')) return 'eu'
    if (language.startsWith('ar')) return 'ar'
    return 'es'
}

const GAME_META: GameMeta[] = [
    { id: 'flash', icon: '⚡', color: '#6366f1' },
    { id: 'parentesis', icon: '🧩', color: '#0ea5e9' },
    { id: 'reparto', icon: '📦', color: '#ef4444' }
]

const UI: Record<Lang, UiText> = {
    es: {
        pageTitle: 'Jokuak: numeros naturales',
        pageDesc: 'Entrenamiento activo con ritmo de juego, formato matematico visual y feedback inmediato.',
        score: 'Puntuacion',
        streak: 'Racha',
        rounds: 'Rondas',
        accuracy: 'Precision',
        rank: 'Rango',
        rankLevels: { base: 'Explorador', pro: 'Estratega', master: 'Maestro numerico' },
        formula: 'Regla',
        check: 'Comprobar',
        next: 'Siguiente ronda',
        correct: 'Respuesta correcta',
        incorrect: 'Todavia no. Revisa prioridad, posicion o resto.',
        lockHint: 'Pulsa "Siguiente ronda" para registrar un nuevo intento.',
        gameText: {
            flash: {
                tab: 'Flash Posicional',
                title: 'Juego 1: Flash Posicional',
                objective: 'Detectar valor posicional en pocos segundos.',
                skill: 'Velocidad + precision en numeracion decimal.'
            },
            parentesis: {
                tab: 'Parentesis Tactico',
                title: 'Juego 2: Parentesis Tactico',
                objective: 'Elegir la expresion que alcanza el objetivo.',
                skill: 'Jerarquia de operaciones y razonamiento estructural.'
            },
            reparto: {
                tab: 'Reparto Maestro',
                title: 'Juego 3: Reparto Maestro',
                objective: 'Calcular cociente y resto con sentido contextual.',
                skill: 'Division entera y verificacion con $$D=d\\cdot c+r$$.'
            }
        },
        formulas: {
            flash: '$$valor = cifra\\times orden$$',
            parentesis: 'Parentesis -> multiplicacion/division -> suma/resta',
            reparto: '$$D=d\\cdot c+r\\quad\\text{y}\\quad 0\\le r<d$$'
        },
        flash: {
            number: 'Numero',
            focusDigit: 'Cifra destacada',
            place: 'Orden',
            valuePrompt: 'Escribe su valor',
            placeholder: 'Ejemplo: 70000'
        },
        parentesis: {
            base: 'Expresion base',
            target: 'Objetivo',
            choose: 'Elige la opcion correcta',
            explanation: 'Justificacion correcta'
        },
        reparto: {
            prompt: 'Reparto del lote',
            quotient: 'Cociente',
            remainder: 'Resto',
            context: 'Contexto',
            rule: 'Comprobacion',
            condition: 'Condicion del resto',
            solution: 'Solucion esperada'
        },
        gamesAria: 'Juegos de la unidad',
        locale: 'es-ES',
        placeNames: ['unidades', 'decenas', 'centenas', 'millares', 'decenas de millar', 'centenas de millar']
    },
    eu: {
        pageTitle: 'Jokuak: zenbaki naturalak',
        pageDesc: 'Jolas-erritmoan egindako entrenamendua, formatu matematiko bisualarekin eta feedback berehalakoarekin.',
        score: 'Puntuazioa',
        streak: 'Segida',
        rounds: 'Errondak',
        accuracy: 'Zehaztasuna',
        rank: 'Maila',
        rankLevels: { base: 'Esploratzailea', pro: 'Estratega', master: 'Zenbaki maisua' },
        formula: 'Arau matematikoa',
        check: 'Egiaztatu',
        next: 'Hurrengo erronda',
        correct: 'Erantzun zuzena',
        incorrect: 'Oraindik ez. Berrikusi lehentasunak edo hondarra.',
        lockHint: '"Hurrengo erronda" sakatu saiakera berria erregistratzeko.',
        gameText: {
            flash: {
                tab: 'Flash Posizionala',
                title: '1. jokoa: Flash Posizionala',
                objective: 'Balio posizionala segundo gutxitan identifikatzea.',
                skill: 'Abiadura + zehaztasuna sistema hamartarrean.'
            },
            parentesis: {
                tab: 'Parentesi Taktikoa',
                title: '2. jokoa: Parentesi Taktikoa',
                objective: 'Helburua ematen duen adierazpena aukeratzea.',
                skill: 'Eragiketen hierarkia eta egiturazko arrazoiketa.'
            },
            reparto: {
                tab: 'Banaketa Maisua',
                title: '3. jokoa: Banaketa Maisua',
                objective: 'Zatidura eta hondarra testuinguruan kalkulatzea.',
                skill: 'Zatiketa osoa eta $$D=d\\cdot c+r$$ egiaztapena.'
            }
        },
        formulas: {
            flash: '$$balioa = zifra\\times ordena$$',
            parentesis: 'Parentesiak -> biderketa/zatiketa -> batuketa/kenketa',
            reparto: '$$D=d\\cdot c+r\\quad\\text{eta}\\quad 0\\le r<d$$'
        },
        flash: {
            number: 'Zenbakia',
            focusDigit: 'Nabarmendutako zifra',
            place: 'Ordena',
            valuePrompt: 'Idatzi balioa',
            placeholder: 'Adibidez: 70000'
        },
        parentesis: {
            base: 'Oinarrizko adierazpena',
            target: 'Helburua',
            choose: 'Aukeratu aukera zuzena',
            explanation: 'Azalpen zuzena'
        },
        reparto: {
            prompt: 'Lotearen banaketa',
            quotient: 'Zatidura',
            remainder: 'Hondarra',
            context: 'Testuingurua',
            rule: 'Egiaztapena',
            condition: 'Hondarraren baldintza',
            solution: 'Espero den emaitza'
        },
        gamesAria: 'Unitateko jokoak',
        locale: 'eu-ES',
        placeNames: ['unitateak', 'hamarrak', 'ehunak', 'milak', 'hamar mila', 'ehun mila']
    },
    ar: {
        pageTitle: 'الألعاب: الأعداد الطبيعية',
        pageDesc: 'تدريب تفاعلي بإيقاع لعب، عرض رياضي واضح، وتغذية راجعة فورية.',
        score: 'النقاط',
        streak: 'السلسلة',
        rounds: 'الجولات',
        accuracy: 'الدقة',
        rank: 'المستوى',
        rankLevels: { base: 'مستكشف', pro: 'استراتيجي', master: 'خبير الأعداد' },
        formula: 'القاعدة',
        check: 'تحقق',
        next: 'الجولة التالية',
        correct: 'إجابة صحيحة',
        incorrect: 'ليست مطابقة بعد. راجع ترتيب العمليات أو الباقي.',
        lockHint: 'اضغط "الجولة التالية" لتسجيل محاولة جديدة.',
        gameText: {
            flash: {
                tab: 'وميض مكاني',
                title: 'اللعبة 1: وميض مكاني',
                objective: 'تحديد القيمة المكانية بسرعة.',
                skill: 'سرعة + دقة في النظام العشري.'
            },
            parentesis: {
                tab: 'أقواس تكتيكية',
                title: 'اللعبة 2: أقواس تكتيكية',
                objective: 'اختيار العبارة التي تحقق الهدف.',
                skill: 'ترتيب العمليات وبناء الاستراتيجية.'
            },
            reparto: {
                tab: 'سيد التقسيم',
                title: 'اللعبة 3: سيد التقسيم',
                objective: 'حساب خارج القسمة والباقي في سياق واقعي.',
                skill: 'القسمة الإقليدية مع التحقق $$D=d\\cdot c+r$$.'
            }
        },
        formulas: {
            flash: '$$القيمة = الرقم\\times المرتبة$$',
            parentesis: 'الأقواس -> الضرب/القسمة -> الجمع/الطرح',
            reparto: '$$D=d\\cdot c+r\\quad\\text{و}\\quad 0\\le r<d$$'
        },
        flash: {
            number: 'العدد',
            focusDigit: 'الرقم المميز',
            place: 'المرتبة',
            valuePrompt: 'اكتب قيمته',
            placeholder: 'مثال: 70000'
        },
        parentesis: {
            base: 'العبارة الأساسية',
            target: 'الهدف',
            choose: 'اختر العبارة الصحيحة',
            explanation: 'التبرير الصحيح'
        },
        reparto: {
            prompt: 'تقسيم الدفعة',
            quotient: 'خارج القسمة',
            remainder: 'الباقي',
            context: 'السياق',
            rule: 'التحقق',
            condition: 'شرط الباقي',
            solution: 'الحل المتوقع'
        },
        gamesAria: 'ألعاب الوحدة',
        locale: 'ar-EG',
        placeNames: ['الآحاد', 'العشرات', 'المئات', 'الآلاف', 'عشرات الآلاف', 'مئات الآلاف']
    }
}

const PACK_CONTEXT: Record<Lang, RepartoContext[]> = {
    es: [
        { icon: '🥚', item: 'huevos', group: 'bandejas' },
        { icon: '🍎', item: 'manzanas', group: 'cajas' },
        { icon: '📚', item: 'libros', group: 'lotes' }
    ],
    eu: [
        { icon: '🥚', item: 'arrautzak', group: 'erretiluak' },
        { icon: '🍎', item: 'sagarrak', group: 'kaxak' },
        { icon: '📚', item: 'liburuak', group: 'sortak' }
    ],
    ar: [
        { icon: '🥚', item: 'بيض', group: 'صواني' },
        { icon: '🍎', item: 'تفاح', group: 'صناديق' },
        { icon: '📚', item: 'كتب', group: 'حزم' }
    ]
}

const PARENTESIS_PUZZLES: ParenthesisPuzzle[] = [
    {
        statement: '2 + 3*4',
        target: 20,
        options: ['2 + 3*4', '(2+3)*4', '2 + (3*4)'],
        correctIndex: 1
    },
    {
        statement: '15 - 10:5',
        target: 1,
        options: ['15-(10:5)', '(15-10):5', '15-10:5'],
        correctIndex: 1
    },
    {
        statement: '26 - 5*(2+3) + 6',
        target: 7,
        options: ['26 - 5*(2+3) + 6', '(26-5)*(2+3)+6', '26 - 5*2 + 3 + 6'],
        correctIndex: 0
    }
]

function evaluateExpression(raw: string): number | null {
    const normalized = raw
        .replace(/\s+/g, '')
        .replace(/[×·]/g, '*')
        .replace(/÷/g, '/')
        .replace(/[−–]/g, '-')
        .replace(/:/g, '/')
    if (!/^[0-9()+\-*/.]+$/.test(normalized)) return null
    try {
        const value = Function(`"use strict"; return (${normalized});`)() as number
        return Number.isFinite(value) ? value : null
    } catch {
        return null
    }
}

function toMath(expression: string) {
    return `$$${expression}$$`
}

function generateFlashChallenge(): FlashChallenge {
    const number = Math.floor(Math.random() * 900000) + 100000
    const digits = String(number)
    const index = Math.floor(Math.random() * digits.length)
    const digit = Number(digits[index])
    const exponent = digits.length - index - 1
    const place = Math.pow(10, exponent)
    return { number, digit, place, value: digit * place, index }
}

function generateRepartoChallenge(lang: Lang): RepartoChallenge {
    const divisor = Math.floor(Math.random() * 22) + 6
    const quotient = Math.floor(Math.random() * 36) + 8
    const remainder = Math.floor(Math.random() * divisor)
    const dividend = divisor * quotient + remainder
    const contexts = PACK_CONTEXT[lang]
    const context = contexts[Math.floor(Math.random() * contexts.length)]
    return { dividend, divisor, quotient, remainder, context }
}

export function GamesPage() {
    const { i18n } = useTranslation()
    const lang = resolveLang(i18n.language)
    const ui = UI[lang]
    const formatNumber = (value: number) => value.toLocaleString(ui.locale)

    const [activeGame, setActiveGame] = useState<GameId>('flash')
    const [score, setScore] = useState(0)
    const [streak, setStreak] = useState(0)
    const [rounds, setRounds] = useState(0)
    const [hits, setHits] = useState(0)

    const [flashChallenge, setFlashChallenge] = useState<FlashChallenge>(generateFlashChallenge)
    const [flashInput, setFlashInput] = useState('')
    const [flashFeedback, setFlashFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')
    const [flashLocked, setFlashLocked] = useState(false)

    const [puzzleIndex, setPuzzleIndex] = useState(0)
    const [puzzleChoice, setPuzzleChoice] = useState<number | null>(null)
    const [puzzleFeedback, setPuzzleFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')
    const [puzzleLocked, setPuzzleLocked] = useState(false)

    const [repartoChallenge, setRepartoChallenge] = useState<RepartoChallenge>(() => generateRepartoChallenge(lang))
    const [repartoQ, setRepartoQ] = useState('')
    const [repartoR, setRepartoR] = useState('')
    const [repartoFeedback, setRepartoFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')
    const [repartoLocked, setRepartoLocked] = useState(false)

    useEffect(() => {
        setRepartoChallenge(generateRepartoChallenge(lang))
        setRepartoQ('')
        setRepartoR('')
        setRepartoFeedback('idle')
        setRepartoLocked(false)
    }, [lang])

    const currentGame = useMemo(
        () => GAME_META.find((game) => game.id === activeGame) ?? GAME_META[0],
        [activeGame]
    )
    const currentPuzzle = PARENTESIS_PUZZLES[puzzleIndex]
    const accuracy = rounds === 0 ? 0 : Math.round((hits / rounds) * 100)
    const rank = score >= 200
        ? ui.rankLevels.master
        : score >= 100
            ? ui.rankLevels.pro
            : ui.rankLevels.base

    const registerAttempt = (ok: boolean) => {
        setRounds((value) => value + 1)
        if (ok) {
            setScore((value) => value + 12)
            setHits((value) => value + 1)
            setStreak((value) => value + 1)
        } else {
            setStreak(0)
        }
    }

    const checkFlash = () => {
        if (flashLocked) return
        const answer = Number(flashInput.replace(/[.,\s]/g, ''))
        const ok = answer === flashChallenge.value
        setFlashFeedback(ok ? 'ok' : 'ko')
        setFlashLocked(true)
        registerAttempt(ok)
    }

    const nextFlash = () => {
        setFlashChallenge(generateFlashChallenge())
        setFlashInput('')
        setFlashFeedback('idle')
        setFlashLocked(false)
    }

    const checkPuzzle = () => {
        if (puzzleChoice === null || puzzleLocked) return
        const ok = puzzleChoice === currentPuzzle.correctIndex
        setPuzzleFeedback(ok ? 'ok' : 'ko')
        setPuzzleLocked(true)
        registerAttempt(ok)
    }

    const nextPuzzle = () => {
        setPuzzleIndex((value) => (value + 1) % PARENTESIS_PUZZLES.length)
        setPuzzleChoice(null)
        setPuzzleFeedback('idle')
        setPuzzleLocked(false)
    }

    const checkReparto = () => {
        if (repartoLocked) return
        const q = Number(repartoQ)
        const r = Number(repartoR)
        const ok = q === repartoChallenge.quotient && r === repartoChallenge.remainder && r >= 0 && r < repartoChallenge.divisor
        setRepartoFeedback(ok ? 'ok' : 'ko')
        setRepartoLocked(true)
        registerAttempt(ok)
    }

    const nextReparto = () => {
        setRepartoChallenge(generateRepartoChallenge(lang))
        setRepartoQ('')
        setRepartoR('')
        setRepartoFeedback('idle')
        setRepartoLocked(false)
    }

    const flashExponent = String(flashChallenge.number).length - flashChallenge.index - 1
    const flashPlaceName = ui.placeNames[flashExponent] ?? ui.placeNames[0]
    const puzzleExpected = currentPuzzle.options[currentPuzzle.correctIndex]
    const puzzleExpectedValue = evaluateExpression(puzzleExpected)

    return (
        <div className="zn-games-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container">
                <header className="zn-games-header">
                    <h1>🎮 {ui.pageTitle}</h1>
                    <p>{ui.pageDesc}</p>

                    <div className="zn-scoreboard">
                        <article className="score-card glass">
                            <span className="score-icon">🏆</span>
                            <strong>{score}</strong>
                            <span>{ui.score}</span>
                        </article>
                        <article className="score-card glass">
                            <span className="score-icon">🔥</span>
                            <strong>{streak}</strong>
                            <span>{ui.streak}</span>
                        </article>
                        <article className="score-card glass">
                            <span className="score-icon">🎯</span>
                            <strong>{accuracy}%</strong>
                            <span>{ui.accuracy}</span>
                        </article>
                        <article className="score-card glass">
                            <span className="score-icon">📈</span>
                            <strong>{rounds}</strong>
                            <span>{ui.rounds}</span>
                        </article>
                        <article className="score-card glass rank-card">
                            <span className="score-icon">⭐</span>
                            <strong>{rank}</strong>
                            <span>{ui.rank}</span>
                        </article>
                    </div>
                </header>

                <nav className="zn-games-nav" role="tablist" aria-label={ui.gamesAria}>
                    {GAME_META.map((game) => (
                        <button
                            key={game.id}
                            role="tab"
                            aria-selected={activeGame === game.id}
                            className={`zn-game-tab ${activeGame === game.id ? 'active' : ''}`}
                            onClick={() => setActiveGame(game.id)}
                            style={{ '--game-color': game.color } as React.CSSProperties}
                        >
                            <span className="tab-icon">{game.icon}</span>
                            <span className="tab-text">{ui.gameText[game.id].tab}</span>
                        </button>
                    ))}
                </nav>

                <section className="zn-game-panel" style={{ '--game-color': currentGame.color } as React.CSSProperties}>
                    <div className="zn-game-top">
                        <span className="chip">{currentGame.icon}</span>
                        <div>
                            <h2>{ui.gameText[currentGame.id].title}</h2>
                            <p>{ui.gameText[currentGame.id].objective}</p>
                            <p><MathText text={ui.gameText[currentGame.id].skill} /></p>
                        </div>
                    </div>

                    <div className="zn-formula-bar">
                        <strong>{ui.formula}:</strong> <MathText text={ui.formulas[activeGame]} />
                    </div>

                    {activeGame === 'flash' && (
                        <div className="zn-widget">
                            <h3>⚡ Flash</h3>
                            <p className="zn-label">{ui.flash.number}</p>
                            <div className="digit-track" aria-label={ui.flash.number}>
                                {String(flashChallenge.number).split('').map((digit, index) => (
                                    <span key={`${digit}-${index}`} className={`digit ${index === flashChallenge.index ? 'focus' : ''}`}>
                                        {digit}
                                    </span>
                                ))}
                            </div>
                            <p className="zn-note">{formatNumber(flashChallenge.number)}</p>
                            <div className="zn-mini-grid">
                                <p><strong>{ui.flash.focusDigit}:</strong> {flashChallenge.digit}</p>
                                <p><strong>{ui.flash.place}:</strong> {flashPlaceName}</p>
                            </div>
                            <p className="zn-math-inline">
                                <MathText text={toMath(`${flashChallenge.digit} \\cdot ${flashChallenge.place} = ?`)} inline />
                            </p>
                            <input
                                value={flashInput}
                                onChange={(e) => setFlashInput(e.target.value)}
                                placeholder={ui.flash.placeholder}
                                onKeyDown={(e) => e.key === 'Enter' && checkFlash()}
                            />
                            <div className="zn-widget-actions">
                                <button onClick={checkFlash}>{ui.check}</button>
                                <button onClick={nextFlash}>{ui.next}</button>
                            </div>
                            {flashFeedback !== 'idle' && (
                                <div className={`zn-feedback ${flashFeedback === 'ok' ? 'ok' : 'ko'}`}>
                                    <p>{flashFeedback === 'ok' ? ui.correct : ui.incorrect}</p>
                                    <p>{ui.flash.valuePrompt}: <MathText text={toMath(String(flashChallenge.value))} inline /></p>
                                    <p className="feedback-hint">{ui.lockHint}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeGame === 'parentesis' && (
                        <div className="zn-widget">
                            <h3>🧩 Parentesis</h3>
                            <p className="zn-label">{ui.parentesis.base}</p>
                            <p className="zn-math-inline"><MathText text={toMath(currentPuzzle.statement)} inline /></p>
                            <div className="target-pill">
                                {ui.parentesis.target}: <MathText text={toMath(String(currentPuzzle.target))} inline />
                            </div>
                            <p className="zn-label">{ui.parentesis.choose}</p>
                            <div className="zn-option-list">
                                {currentPuzzle.options.map((option, index) => (
                                    <button
                                        key={option}
                                        className={`option ${puzzleChoice === index ? 'selected' : ''}`}
                                        onClick={() => {
                                            if (puzzleLocked) return
                                            setPuzzleChoice(index)
                                            setPuzzleFeedback('idle')
                                        }}
                                    >
                                        <span className="option-expression"><MathText text={toMath(option)} inline /></span>
                                    </button>
                                ))}
                            </div>
                            <div className="zn-widget-actions">
                                <button onClick={checkPuzzle}>{ui.check}</button>
                                <button onClick={nextPuzzle}>{ui.next}</button>
                            </div>
                            {puzzleFeedback !== 'idle' && (
                                <div className={`zn-feedback ${puzzleFeedback === 'ok' ? 'ok' : 'ko'}`}>
                                    <p>{puzzleFeedback === 'ok' ? ui.correct : ui.incorrect}</p>
                                    <p>
                                        {ui.parentesis.explanation}:{' '}
                                        <MathText
                                            text={toMath(
                                                `${puzzleExpected}${puzzleExpectedValue !== null ? ` = ${puzzleExpectedValue}` : ''}`
                                            )}
                                            inline
                                        />
                                    </p>
                                    <p className="feedback-hint">{ui.lockHint}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeGame === 'reparto' && (
                        <div className="zn-widget">
                            <h3>📦 Reparto</h3>
                            <p className="zn-label">{ui.reparto.context}</p>
                            <p className="zn-note">
                                {repartoChallenge.context.icon} {ui.reparto.prompt}: {formatNumber(repartoChallenge.dividend)} {repartoChallenge.context.item}{' '}
                                / {formatNumber(repartoChallenge.divisor)} {repartoChallenge.context.item} por {repartoChallenge.context.group}
                            </p>
                            <div className="zn-equation">
                                <MathText text={toMath(`${repartoChallenge.dividend}:${repartoChallenge.divisor}`)} inline />
                            </div>
                            <div className="zn-widget-grid">
                                <label>
                                    {ui.reparto.quotient}
                                    <input value={repartoQ} onChange={(e) => setRepartoQ(e.target.value)} />
                                </label>
                                <label>
                                    {ui.reparto.remainder}
                                    <input value={repartoR} onChange={(e) => setRepartoR(e.target.value)} />
                                </label>
                            </div>
                            <div className="zn-rule-box">
                                <p>
                                    <strong>{ui.reparto.rule}:</strong>{' '}
                                    <MathText
                                        text={toMath(`${repartoChallenge.dividend} = ${repartoChallenge.divisor}\\cdot c + r`)}
                                        inline
                                    />
                                </p>
                                <p>
                                    <strong>{ui.reparto.condition}:</strong>{' '}
                                    <MathText text={toMath(`0 \\le r < ${repartoChallenge.divisor}`)} inline />
                                </p>
                            </div>
                            <div className="zn-widget-actions">
                                <button onClick={checkReparto}>{ui.check}</button>
                                <button onClick={nextReparto}>{ui.next}</button>
                            </div>
                            {repartoFeedback !== 'idle' && (
                                <div className={`zn-feedback ${repartoFeedback === 'ok' ? 'ok' : 'ko'}`}>
                                    <p>{repartoFeedback === 'ok' ? ui.correct : ui.incorrect}</p>
                                    <p>
                                        {ui.reparto.solution}:{' '}
                                        <MathText
                                            text={toMath(`c = ${repartoChallenge.quotient},\\ r = ${repartoChallenge.remainder}`)}
                                            inline
                                        />
                                    </p>
                                    <p className="feedback-hint">{ui.lockHint}</p>
                                </div>
                            )}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}

