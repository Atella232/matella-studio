import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import './GamesPage.css'

type Lang = 'es' | 'eu' | 'ar'
type GameId = 'flash' | 'parentesis' | 'reparto'

interface GameMeta {
    id: GameId
    icon: string
    color: string
}

interface GameText {
    title: string
    objective: string
    skill: string
}

interface UiText {
    pageTitle: string
    pageDesc: string
    score: string
    streak: string
    check: string
    next: string
    correct: string
    incorrect: string
    gameText: Record<GameId, GameText>
    flash: {
        prompt: string
        askValue: string
    }
    parentesis: {
        prompt: string
        target: string
    }
    reparto: {
        prompt: string
        q: string
        r: string
    }
    gamesAria: string
    locale: Intl.LocalesArgument
}

interface ParenthesisPuzzle {
    statement: string
    target: number
    options: string[]
    correctIndex: number
}

function resolveLang(language: string): Lang {
    if (language.startsWith('eu')) return 'eu'
    if (language.startsWith('ar')) return 'ar'
    return 'es'
}

const GAME_META: GameMeta[] = [
    { id: 'flash', icon: 'J1', color: '#6366f1' },
    { id: 'parentesis', icon: 'J2', color: '#0ea5e9' },
    { id: 'reparto', icon: 'J3', color: '#ef4444' }
]

const UI: Record<Lang, UiText> = {
    es: {
        pageTitle: 'Jokuak: numeros naturales',
        pageDesc: 'Tres juegos para automatizar habilidades clave del tema.',
        score: 'Puntuacion',
        streak: 'Racha',
        check: 'Comprobar',
        next: 'Siguiente',
        correct: 'Correcto',
        incorrect: 'Revisa la estrategia',
        gameText: {
            flash: {
                title: 'Juego 1: Flash posicional',
                objective: 'Reconocer el valor de una cifra en segundos.',
                skill: 'Velocidad y precision posicional.'
            },
            parentesis: {
                title: 'Juego 2: Parentesis tactico',
                objective: 'Elegir la expresion que alcanza un objetivo.',
                skill: 'Razonamiento de jerarquia y parentesis.'
            },
            reparto: {
                title: 'Juego 3: Reparto maestro',
                objective: 'Calcular cociente y resto con interpretacion correcta.',
                skill: 'Division entera en contexto.'
            }
        },
        flash: {
            prompt: 'Numero',
            askValue: 'Escribe el valor de la cifra resaltada'
        },
        parentesis: {
            prompt: 'Expresion base',
            target: 'Objetivo'
        },
        reparto: {
            prompt: 'Divide y completa',
            q: 'Cociente',
            r: 'Resto'
        },
        gamesAria: 'Juegos de la unidad',
        locale: 'es-ES'
    },
    eu: {
        pageTitle: 'Jokuak: zenbaki naturalak',
        pageDesc: 'Gaiaren trebetasun nagusiak automatizatzeko hiru joko.',
        score: 'Puntuazioa',
        streak: 'Segida',
        check: 'Egiaztatu',
        next: 'Hurrengoa',
        correct: 'Zuzena',
        incorrect: 'Berrikusi estrategia',
        gameText: {
            flash: {
                title: '1. jokoa: Flash posizionala',
                objective: 'Zifra baten balioa segundo gutxitan identifikatzea.',
                skill: 'Abiadura eta zehaztasun posizionala.'
            },
            parentesis: {
                title: '2. jokoa: Parentesi taktikoa',
                objective: 'Helburua ematen duen adierazpena aukeratzea.',
                skill: 'Hierarkia eta parentesien arrazoiketa.'
            },
            reparto: {
                title: '3. jokoa: Banaketa maisua',
                objective: 'Zatidura eta hondarra zuzen kalkulatzea.',
                skill: 'Zatiketa osoa testuinguruan.'
            }
        },
        flash: {
            prompt: 'Zenbakia',
            askValue: 'Idatzi nabarmendutako zifraren balioa'
        },
        parentesis: {
            prompt: 'Oinarrizko adierazpena',
            target: 'Helburua'
        },
        reparto: {
            prompt: 'Zatitu eta osatu',
            q: 'Zatidura',
            r: 'Hondarra'
        },
        gamesAria: 'Unitateko jokoak',
        locale: 'eu-ES'
    },
    ar: {
        pageTitle: 'الألعاب: الأعداد الطبيعية',
        pageDesc: 'ثلاث ألعاب لتثبيت المهارات الأساسية في هذه الوحدة.',
        score: 'النقاط',
        streak: 'السلسلة',
        check: 'تحقق',
        next: 'التالي',
        correct: 'صحيح',
        incorrect: 'راجع الاستراتيجية',
        gameText: {
            flash: {
                title: 'اللعبة 1: ومضة مكانية',
                objective: 'تحديد قيمة الرقم بسرعة.',
                skill: 'سرعة ودقة في القيمة المكانية.'
            },
            parentesis: {
                title: 'اللعبة 2: أقواس تكتيكية',
                objective: 'اختيار العبارة التي تحقق الهدف.',
                skill: 'تفكير في ترتيب العمليات والأقواس.'
            },
            reparto: {
                title: 'اللعبة 3: سيد التقسيم',
                objective: 'حساب خارج القسمة والباقي بشكل صحيح.',
                skill: 'القسمة الإقليدية في سياق واقعي.'
            }
        },
        flash: {
            prompt: 'العدد',
            askValue: 'اكتب قيمة الرقم المميز'
        },
        parentesis: {
            prompt: 'العبارة الأساسية',
            target: 'الهدف'
        },
        reparto: {
            prompt: 'اقسم ثم أكمل',
            q: 'خارج القسمة',
            r: 'الباقي'
        },
        gamesAria: 'ألعاب الوحدة',
        locale: 'ar-EG'
    }
}

const PARENTESIS_PUZZLES: ParenthesisPuzzle[] = [
    { statement: '2 + 3*4', target: 20, options: ['2 + 3*4', '(2+3)*4', '2 + (3*4)'], correctIndex: 1 },
    { statement: '6 - 2*3', target: 12, options: ['(6-2)*3', '6-(2*3)', '(6-2*3)'], correctIndex: 0 },
    { statement: '15 - 10:5', target: 1, options: ['15-(10:5)', '(15-10):5', '15-10:5'], correctIndex: 1 }
]

function generateFlashChallenge() {
    const number = Math.floor(Math.random() * 900000) + 100000
    const text = String(number)
    const index = Math.floor(Math.random() * text.length)
    const digit = Number(text[index])
    const place = Math.pow(10, text.length - index - 1)
    return { number, digit, place, value: digit * place }
}

function generateRepartoChallenge() {
    const divisor = Math.floor(Math.random() * 25) + 5
    const quotient = Math.floor(Math.random() * 40) + 5
    const remainder = Math.floor(Math.random() * divisor)
    const dividend = divisor * quotient + remainder
    return { dividend, divisor, quotient, remainder }
}

export function GamesPage() {
    const { i18n } = useTranslation()
    const lang = resolveLang(i18n.language)
    const ui = UI[lang]
    const formatNumber = (value: number) => value.toLocaleString(ui.locale)

    const [activeGame, setActiveGame] = useState<GameId>('flash')

    const [score, setScore] = useState(0)
    const [streak, setStreak] = useState(0)

    const [flashChallenge, setFlashChallenge] = useState(generateFlashChallenge)
    const [flashInput, setFlashInput] = useState('')
    const [flashFeedback, setFlashFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')

    const [puzzleIndex, setPuzzleIndex] = useState(0)
    const [puzzleChoice, setPuzzleChoice] = useState<number | null>(null)
    const [puzzleFeedback, setPuzzleFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')

    const [repartoChallenge, setRepartoChallenge] = useState(generateRepartoChallenge)
    const [repartoQ, setRepartoQ] = useState('')
    const [repartoR, setRepartoR] = useState('')
    const [repartoFeedback, setRepartoFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')

    const currentGame = useMemo(
        () => GAME_META.find((game) => game.id === activeGame) ?? GAME_META[0],
        [activeGame]
    )
    const currentPuzzle = PARENTESIS_PUZZLES[puzzleIndex]

    const reward = (ok: boolean) => {
        if (ok) {
            setScore((v) => v + 10)
            setStreak((v) => v + 1)
        } else {
            setStreak(0)
        }
    }

    const checkFlash = () => {
        const ok = Number(flashInput.replace(/[.,\s]/g, '')) === flashChallenge.value
        setFlashFeedback(ok ? 'ok' : 'ko')
        reward(ok)
    }

    const nextFlash = () => {
        setFlashChallenge(generateFlashChallenge())
        setFlashInput('')
        setFlashFeedback('idle')
    }

    const checkPuzzle = () => {
        if (puzzleChoice === null) return
        const ok = puzzleChoice === currentPuzzle.correctIndex
        setPuzzleFeedback(ok ? 'ok' : 'ko')
        reward(ok)
    }

    const nextPuzzle = () => {
        setPuzzleIndex((v) => (v + 1) % PARENTESIS_PUZZLES.length)
        setPuzzleChoice(null)
        setPuzzleFeedback('idle')
    }

    const checkReparto = () => {
        const q = Number(repartoQ)
        const r = Number(repartoR)
        const ok = q === repartoChallenge.quotient && r === repartoChallenge.remainder
        setRepartoFeedback(ok ? 'ok' : 'ko')
        reward(ok)
    }

    const nextReparto = () => {
        setRepartoChallenge(generateRepartoChallenge())
        setRepartoQ('')
        setRepartoR('')
        setRepartoFeedback('idle')
    }

    return (
        <div className="zn-games-page" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container">
                <header className="zn-games-header">
                    <h1>{ui.pageTitle}</h1>
                    <p>{ui.pageDesc}</p>
                    <p>
                        {ui.score}: <strong>{score}</strong> | {ui.streak}: <strong>{streak}</strong>
                    </p>
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
                            <span>{ui.gameText[game.id].title}</span>
                        </button>
                    ))}
                </nav>

                <section className="zn-game-panel" style={{ '--game-color': currentGame.color } as React.CSSProperties}>
                    <div className="zn-game-top">
                        <span className="chip">{currentGame.icon}</span>
                        <div>
                            <h2>{ui.gameText[currentGame.id].title}</h2>
                            <p>{ui.gameText[currentGame.id].objective}</p>
                            <p>{ui.gameText[currentGame.id].skill}</p>
                        </div>
                    </div>

                    {activeGame === 'flash' && (
                        <div className="zn-widget">
                            <p>{ui.flash.prompt}: <strong>{formatNumber(flashChallenge.number)}</strong></p>
                            <p>
                                {ui.flash.askValue}: <strong>{flashChallenge.digit}</strong>
                            </p>
                            <input value={flashInput} onChange={(e) => setFlashInput(e.target.value)} />
                            <div className="zn-widget-actions">
                                <button onClick={checkFlash}>{ui.check}</button>
                                <button onClick={nextFlash}>{ui.next}</button>
                            </div>
                            {flashFeedback === 'ok' && <p className="ok">{ui.correct}</p>}
                            {flashFeedback === 'ko' && <p className="ko">{ui.incorrect}</p>}
                        </div>
                    )}

                    {activeGame === 'parentesis' && (
                        <div className="zn-widget">
                            <p>{ui.parentesis.prompt}: <strong>{currentPuzzle.statement}</strong></p>
                            <p>{ui.parentesis.target}: <strong>{currentPuzzle.target}</strong></p>
                            <div className="zn-option-list">
                                {currentPuzzle.options.map((option, index) => (
                                    <button
                                        key={option}
                                        className={`option ${puzzleChoice === index ? 'selected' : ''}`}
                                        onClick={() => setPuzzleChoice(index)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <div className="zn-widget-actions">
                                <button onClick={checkPuzzle}>{ui.check}</button>
                                <button onClick={nextPuzzle}>{ui.next}</button>
                            </div>
                            {puzzleFeedback === 'ok' && <p className="ok">{ui.correct}</p>}
                            {puzzleFeedback === 'ko' && <p className="ko">{ui.incorrect}</p>}
                        </div>
                    )}

                    {activeGame === 'reparto' && (
                        <div className="zn-widget">
                            <p>
                                {ui.reparto.prompt}: <strong>{repartoChallenge.dividend}</strong> : <strong>{repartoChallenge.divisor}</strong>
                            </p>
                            <div className="zn-widget-grid">
                                <label>
                                    {ui.reparto.q}
                                    <input value={repartoQ} onChange={(e) => setRepartoQ(e.target.value)} />
                                </label>
                                <label>
                                    {ui.reparto.r}
                                    <input value={repartoR} onChange={(e) => setRepartoR(e.target.value)} />
                                </label>
                            </div>
                            <div className="zn-widget-actions">
                                <button onClick={checkReparto}>{ui.check}</button>
                                <button onClick={nextReparto}>{ui.next}</button>
                            </div>
                            {repartoFeedback === 'ok' && <p className="ok">{ui.correct}</p>}
                            {repartoFeedback === 'ko' && <p className="ko">{ui.incorrect}</p>}
                        </div>
                    )}
                </section>
            </div>
        </div>
    )
}
