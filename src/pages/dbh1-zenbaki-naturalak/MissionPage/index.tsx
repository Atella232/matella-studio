import { useState } from 'react'
import './MissionPage.css'

type Difficulty = 'nivel1' | 'nivel2' | 'nivel3'

interface Challenge {
    id: number
    difficulty: Difficulty
    title: string
    statement: string
    hints: string[]
    resolution: string[]
    finalAnswer: string
    typicalError: string
    points: number
    validate: (answer: string) => boolean
}

function normalizeText(input: string) {
    return input
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
}

function extractNaturalNumbers(input: string) {
    const matches = input.match(/\d[\d.,]*/g) ?? []
    return matches.map((token) => Number(token.replace(/[.,]/g, '')))
}

const CHALLENGES: Challenge[] = [
    {
        id: 1,
        difficulty: 'nivel1',
        title: 'Nivel 1 - Problema 1: Reconstruccion posicional',
        statement:
            'Construye un numero natural de seis cifras con estas condiciones: centenas de millar 4, decenas de millar 0, millares 7, centenas 2, decenas 0, unidades 5. Escribelo, leelo y descomponlo.',
        hints: [
            'Coloca primero las cifras en una tabla de ordenes.',
            'Las posiciones con 0 tambien cuentan.',
            'La forma final es 4,0,7,2,0,5.'
        ],
        resolution: [
            'Colocamos las cifras por orden: 4 | 0 | 7 | 2 | 0 | 5.',
            'Numero obtenido: $$407,205$$.',
            'Lectura: cuatrocientos siete mil doscientos cinco.',
            'Descomposicion: $$400,000 + 7,000 + 200 + 5$$.'
        ],
        finalAnswer: '$$407,205$$',
        typicalError: 'Escribir $$47,205$$ por ignorar la decena de millar con valor 0.',
        points: 10,
        validate: (answer) => normalizeText(answer).replace(/[.,]/g, '') === '407205'
    },
    {
        id: 2,
        difficulty: 'nivel1',
        title: 'Nivel 1 - Problema 2: Ordena y compara datos',
        statement:
            'Ordena de menor a mayor: 82,600,000 ; 89,678,000,000 ; 7,000,000,000 ; 149,637 ; 24,356,000. Indica cual es el mayor y cual tiene mas cifras.',
        hints: [
            'Empieza por contar cifras.',
            'No compares solo por las ultimas cifras.',
            'El unico numero de 11 cifras sera el mayor.'
        ],
        resolution: [
            'Conteo: 149,637 (6), 24,356,000 (8), 82,600,000 (8), 7,000,000,000 (10), 89,678,000,000 (11).',
            'Orden: $$149,637 < 24,356,000 < 82,600,000 < 7,000,000,000 < 89,678,000,000$$.',
            'Mayor y con mas cifras: $$89,678,000,000$$.'
        ],
        finalAnswer: '$$149,637 < 24,356,000 < 82,600,000 < 7,000,000,000 < 89,678,000,000$$',
        typicalError: 'Poner $$7,000,000,000$$ antes de $$82,600,000$$ por no mirar la cantidad de cifras.',
        points: 10,
        validate: (answer) => {
            const values = extractNaturalNumbers(answer)
            const expected = [149637, 24356000, 82600000, 7000000000, 89678000000]
            if (values.length < expected.length) return false
            return expected.every((value, index) => values[index] === value)
        }
    },
    {
        id: 3,
        difficulty: 'nivel1',
        title: 'Nivel 1 - Problema 3: Redondeo al orden indicado',
        statement:
            'Redondea: 1) 24,963 a millares, 2) 72,580 a millares, 3) 384,523 a decenas de millar.',
        hints: [
            'Identifica primero el orden de redondeo.',
            'Mira solo la cifra inmediata a la derecha.',
            'Sustituye por ceros el resto de cifras.'
        ],
        resolution: [
            '$$24,963$$ -> $$25,000$$ (centena 9).',
            '$$72,580$$ -> $$73,000$$ (centena 5).',
            '$$384,523$$ a decenas de millar -> $$380,000$$ (millares 4).'
        ],
        finalAnswer: '$$25,000$$, $$73,000$$, $$380,000$$',
        typicalError: 'Mirar la cifra equivocada al redondear a decenas de millar.',
        points: 10,
        validate: (answer) => {
            const values = extractNaturalNumbers(answer)
            return values.includes(25000) && values.includes(73000) && values.includes(380000)
        }
    },
    {
        id: 4,
        difficulty: 'nivel2',
        title: 'Nivel 2 - Problema 1: Fruta en cajas',
        statement:
            'Una furgoneta transporta 8 cajas de platanos (15 kg cada una), 20 de naranjas y 6 de manzanas (8 kg cada una para estas dos). Cuantos kg transporta en total?',
        hints: [
            'Calcula por separado los kg de cada tipo de fruta.',
            'Naranjas y manzanas tienen el mismo peso por caja.',
            'Puedes usar $$8\cdot15 + (20+6)\cdot8$$.'
        ],
        resolution: [
            'Platanos: $$8\cdot15 = 120$$ kg.',
            'Naranjas y manzanas: $$20+6=26$$ cajas; $$26\cdot8=208$$ kg.',
            'Total: $$120+208=328$$ kg.'
        ],
        finalAnswer: '$$328$$ kg',
        typicalError: 'Mezclar cantidades y pesos sin modelo claro.',
        points: 20,
        validate: (answer) => extractNaturalNumbers(answer).includes(328)
    },
    {
        id: 5,
        difficulty: 'nivel2',
        title: 'Nivel 2 - Problema 2: Bandejas y cajas',
        statement:
            'Un granjero recoge 1274 huevos. Los envasa en bandejas de 30 huevos y las bandejas en cajas de 10 bandejas. Cuantos huevos sobran sin completar bandeja? Cuantas bandejas sobran sin completar caja?',
        hints: [
            'Primero divide huevos entre 30.',
            'Ese cociente son bandejas completas.',
            'Despues divide las bandejas completas entre 10.'
        ],
        resolution: [
            '$$1274:30 = 42$$ y resto $$14$$ -> sobran $$14$$ huevos.',
            '$$42:10 = 4$$ y resto $$2$$ -> sobran $$2$$ bandejas.'
        ],
        finalAnswer: 'Sobran $$14$$ huevos y $$2$$ bandejas.',
        typicalError: 'Dividir $$1274$$ entre $$300$$ y mezclar niveles (huevos vs bandejas).',
        points: 20,
        validate: (answer) => {
            const values = extractNaturalNumbers(answer)
            return values.includes(14) && values.includes(2)
        }
    },
    {
        id: 6,
        difficulty: 'nivel2',
        title: 'Nivel 2 - Problema 3: Jerarquia y parentesis',
        statement:
            'Resuelve y compara: 1) $$2 + 3\cdot4$$, 2) $$(2+3)\cdot4$$, 3) $$26 - 5\cdot(2+3) + 6$$.',
        hints: [
            'Primero parentesis.',
            'Luego multiplicaciones y divisiones.',
            'Finalmente sumas y restas de izquierda a derecha.'
        ],
        resolution: [
            '$$2 + 3\cdot4 = 14$$.',
            '$$(2+3)\cdot4 = 20$$.',
            '$$26 - 5\cdot(2+3) + 6 = 7$$.'
        ],
        finalAnswer: '$$14$$, $$20$$ y $$7$$',
        typicalError: 'Resolver todo de izquierda a derecha sin jerarquia.',
        points: 20,
        validate: (answer) => {
            const values = extractNaturalNumbers(answer)
            return values.includes(14) && values.includes(20) && values.includes(7)
        }
    },
    {
        id: 7,
        difficulty: 'nivel3',
        title: 'Nivel 3 - Problema 1: Numero oculto',
        statement:
            'Numero natural de cinco cifras con suma de cifras igual a 5. Al intercambiar la cifra de unidades con la de unidades de millar, el numero aumenta en 999. Que numero es?',
        hints: [
            'Llama $$a$$ a la cifra de millares y $$b$$ a la de unidades.',
            'La variacion del intercambio afecta a miles y unidades.',
            'La diferencia es $$999(b-a)$$ y debe valer $$999$$.'
        ],
        resolution: [
            'De $$999(b-a)=999$$ se obtiene $$b-a=1$$.',
            'Con suma de cifras $$5$$, una solucion minima y valida es $$40001$$.',
            'Comprobacion: $$41000 - 40001 = 999$$.'
        ],
        finalAnswer: '$$40001$$',
        typicalError: 'Probar al azar sin modelizar el cambio posicional.',
        points: 30,
        validate: (answer) => normalizeText(answer).replace(/[.,]/g, '') === '40001'
    },
    {
        id: 8,
        difficulty: 'nivel3',
        title: 'Nivel 3 - Problema 2: Aproximacion segun contexto',
        statement:
            'Presupuesto de una obra: 149,637 euros. Da una aproximacion para: informe tecnico detallado, conversacion informal y titular breve. Justifica el orden elegido.',
        hints: [
            'No siempre conviene la misma precision.',
            'En contexto informal se admite mayor simplificacion.',
            'Una aproximacion habitual en conversacion es alrededor de 150,000 euros.'
        ],
        resolution: [
            'Informe tecnico: mantener $$149,637$$ (valor exacto).',
            'Conversacion informal: $$150,000$$ euros.',
            'Titular breve: "unos $$150,000$$ euros" o equivalente.'
        ],
        finalAnswer: 'Exacto $$149,637$$; aproximado $$150,000$$ segun contexto.',
        typicalError: 'Pensar que existe una unica aproximacion correcta para cualquier uso.',
        points: 30,
        validate: (answer) => {
            const values = extractNaturalNumbers(answer)
            return values.includes(149637) && values.includes(150000)
        }
    },
    {
        id: 9,
        difficulty: 'nivel3',
        title: 'Nivel 3 - Problema 3: Produccion y venta',
        statement:
            'Una agricultora tiene 200 melocotoneros. Cada arbol llena 7 cajas de 5 kg. Vende toda la produccion a 2 euros/kg y envasa en pales de 20 cajas. Calcula: kg totales, ingreso total, pales completos y cajas sobrantes.',
        hints: [
            'Calcula primero el numero total de cajas.',
            'Pasa despues de cajas a kg para el ingreso.',
            'Los pales se obtienen dividiendo cajas totales entre 20.'
        ],
        resolution: [
            'Cajas: $$200\cdot7 = 1400$$.',
            'Kg: $$1400\cdot5 = 7000$$ kg.',
            'Ingreso: $$7000\cdot2 = 14,000$$ euros.',
            'Pales: $$1400:20 = 70$$ y resto $$0$$.'
        ],
        finalAnswer: '$$7000$$ kg, $$14,000$$ euros, $$70$$ pales y $$0$$ cajas sobrantes.',
        typicalError: 'Multiplicar por 20 en lugar de dividir para agrupar en pales.',
        points: 40,
        validate: (answer) => {
            const values = extractNaturalNumbers(answer)
            return values.includes(7000) && values.includes(14000) && values.includes(70)
        }
    }
]

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; sublabel: string; icon: string; color: string; bgColor: string }> = {
    nivel1: {
        label: 'Nivel 1',
        sublabel: 'Fundamentos y seguridad basica',
        icon: 'N1',
        color: '#22C55E',
        bgColor: '#DCFCE7'
    },
    nivel2: {
        label: 'Nivel 2',
        sublabel: 'Aplicacion y modelizacion',
        icon: 'N2',
        color: '#F59E0B',
        bgColor: '#FEF3C7'
    },
    nivel3: {
        label: 'Nivel 3',
        sublabel: 'Razonamiento avanzado',
        icon: 'N3',
        color: '#EF4444',
        bgColor: '#FEE2E2'
    }
}

export function MissionPage() {
    const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | null>(null)
    const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
    const [answer, setAnswer] = useState('')
    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle')
    const [hintIndex, setHintIndex] = useState(-1)
    const [showResolution, setShowResolution] = useState(false)
    const [completedChallenges, setCompletedChallenges] = useState<number[]>([])
    const [totalPoints, setTotalPoints] = useState(0)

    const filteredChallenges = selectedDifficulty
        ? CHALLENGES.filter((challenge) => challenge.difficulty === selectedDifficulty)
        : []

    const handleCheck = () => {
        if (!currentChallenge) return
        const isCorrect = currentChallenge.validate(answer)
        setFeedback(isCorrect ? 'success' : 'error')

        if (isCorrect && !completedChallenges.includes(currentChallenge.id)) {
            setCompletedChallenges((state) => [...state, currentChallenge.id])
            setTotalPoints((state) => state + currentChallenge.points)
        }
    }

    const openChallenge = (challenge: Challenge) => {
        setCurrentChallenge(challenge)
        setAnswer('')
        setFeedback('idle')
        setHintIndex(-1)
        setShowResolution(false)
    }

    const handleBack = () => {
        if (currentChallenge) {
            setCurrentChallenge(null)
        } else {
            setSelectedDifficulty(null)
        }
        setAnswer('')
        setFeedback('idle')
        setHintIndex(-1)
        setShowResolution(false)
    }

    const getProgress = (difficulty: Difficulty) => {
        const levelChallenges = CHALLENGES.filter((challenge) => challenge.difficulty === difficulty)
        const completed = levelChallenges.filter((challenge) => completedChallenges.includes(challenge.id)).length
        return { completed, total: levelChallenges.length }
    }

    if (!selectedDifficulty) {
        return (
            <div className="mission-page">
                <div className="container">
                    <header className="mission-header">
                        <h1>Erronkak: Numeros Naturales</h1>
                        <p className="mission-subtitle">
                            9 problemas progresivos con pistas graduadas, validacion y resolucion guiada.
                        </p>
                    </header>

                    <div className="points-display glass">
                        <span className="points-icon">PTS</span>
                        <span className="points-value">{totalPoints}</span>
                        <span className="points-label">puntuacion total</span>
                    </div>

                    <div className="difficulty-grid">
                        {(Object.keys(DIFFICULTY_CONFIG) as Difficulty[]).map((difficulty) => {
                            const config = DIFFICULTY_CONFIG[difficulty]
                            const progress = getProgress(difficulty)

                            return (
                                <button
                                    key={difficulty}
                                    className="difficulty-card glass"
                                    onClick={() => setSelectedDifficulty(difficulty)}
                                    style={{ '--level-color': config.color, '--level-bg': config.bgColor } as React.CSSProperties}
                                >
                                    <span className="difficulty-icon">{config.icon}</span>
                                    <h3>{config.label}</h3>
                                    <p className="difficulty-sublabel">{config.sublabel}</p>
                                    <div className="difficulty-progress">
                                        <div className="mini-progress-bar">
                                            <div
                                                className="mini-progress-fill"
                                                style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                                            />
                                        </div>
                                        <span>
                                            {progress.completed}/{progress.total}
                                        </span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if (!currentChallenge) {
        const config = DIFFICULTY_CONFIG[selectedDifficulty]
        return (
            <div className="mission-page">
                <div className="container">
                    <button className="back-button" onClick={handleBack}>
                        {'<-'} Volver
                    </button>

                    <header className="mission-header level-header" style={{ '--level-color': config.color } as React.CSSProperties}>
                        <span className="level-icon">{config.icon}</span>
                        <h1>{config.label}</h1>
                        <p className="mission-subtitle">{config.sublabel}</p>
                    </header>

                    <div className="challenges-grid">
                        {filteredChallenges.map((challenge, index) => {
                            const solved = completedChallenges.includes(challenge.id)
                            return (
                                <button
                                    key={challenge.id}
                                    className={`challenge-card glass ${solved ? 'completed' : ''}`}
                                    onClick={() => openChallenge(challenge)}
                                    style={{ '--level-color': config.color } as React.CSSProperties}
                                >
                                    <span className="challenge-number">{index + 1}</span>
                                    <h4>{challenge.title}</h4>
                                    <div className="challenge-meta">
                                        <span className="challenge-points">+{challenge.points} pts</span>
                                        {solved && <span className="completed-check">OK</span>}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    const config = DIFFICULTY_CONFIG[currentChallenge.difficulty]

    return (
        <div className="mission-page">
            <div className="container">
                <button className="back-button" onClick={handleBack}>
                    {'<-'} Volver
                </button>

                <div className="challenge-container glass" style={{ '--level-color': config.color } as React.CSSProperties}>
                    <div className="challenge-header">
                        <span className="challenge-difficulty-badge" style={{ background: config.bgColor, color: config.color }}>
                            {config.icon} {config.label}
                        </span>
                        <span className="challenge-points-badge">+{currentChallenge.points} pts</span>
                    </div>

                    <h2 className="challenge-title">{currentChallenge.title}</h2>
                    <p className="challenge-description">{currentChallenge.statement}</p>

                    <div className="answer-section">
                        <input
                            type="text"
                            value={answer}
                            onChange={(event) => {
                                setAnswer(event.target.value)
                                setFeedback('idle')
                            }}
                            placeholder="Escribe aqui tu respuesta"
                            className={`answer-input ${feedback !== 'idle' ? feedback : ''}`}
                            onKeyDown={(event) => event.key === 'Enter' && handleCheck()}
                        />
                        <button onClick={handleCheck} className="btn btn-primary check-btn">
                            Comprobar
                        </button>
                    </div>

                    {feedback === 'success' && (
                        <div className="feedback success" role="alert">
                            <span className="feedback-icon">OK</span>
                            <p>Respuesta correcta. Buen trabajo.</p>
                        </div>
                    )}

                    {feedback === 'error' && (
                        <div className="feedback error" role="alert">
                            <span className="feedback-icon">X</span>
                            <p>No coincide aun. Revisa el modelo y usa pistas.</p>
                        </div>
                    )}

                    <div className="mission-tools-row">
                        <button
                            onClick={() => setHintIndex((value) => Math.min(value + 1, currentChallenge.hints.length - 1))}
                            className="hint-toggle"
                        >
                            Mostrar pista {Math.min(hintIndex + 2, currentChallenge.hints.length)}
                        </button>
                        <button onClick={() => setShowResolution((value) => !value)} className="hint-toggle">
                            {showResolution ? 'Ocultar resolucion' : 'Ver resolucion paso a paso'}
                        </button>
                    </div>

                    {hintIndex >= 0 && (
                        <div className="hint-box">
                            <p>{currentChallenge.hints[hintIndex]}</p>
                        </div>
                    )}

                    {showResolution && (
                        <div className="resolution-box">
                            <h3>Resolucion guiada</h3>
                            <ol>
                                {currentChallenge.resolution.map((step) => (
                                    <li key={step}>{step}</li>
                                ))}
                            </ol>
                            <p>
                                <strong>Respuesta final:</strong> {currentChallenge.finalAnswer}
                            </p>
                            <p>
                                <strong>Error tipico:</strong> {currentChallenge.typicalError}
                            </p>
                        </div>
                    )}
                </div>

                {completedChallenges.includes(currentChallenge.id) && (
                    <div className="success-banner glass">
                        <span>LOGRO</span>
                        <p>Erronka completada</p>
                    </div>
                )}
            </div>
        </div>
    )
}
