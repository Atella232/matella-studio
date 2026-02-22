import { useMemo, useState } from 'react'
import './GamesPage.css'

type GameId = 'flash' | 'parentesis' | 'reparto'

interface GameInfo {
    id: GameId
    icon: string
    color: string
    title: string
    objective: string
    skill: string
    mechanics: string
    rules: string[]
    scoring: string[]
    levels: string[]
    feedback: string[]
    frequentErrors: string[]
    example: string[]
    variants: string[]
    theoryLinks: string[]
    labLinks: string[]
    erronkakLinks: string[]
}

const GAMES: GameInfo[] = [
    {
        id: 'flash',
        icon: 'J1',
        color: '#6366f1',
        title: 'Juego 1: Flash Posicional',
        objective: 'Reforzar valor posicional, lectura y descomposicion.',
        skill: 'Identificacion rapida y precision.',
        mechanics:
            'Rondas rapidas: aparece un numero y una consigna. Hay que responder antes de que se agote el tiempo.',
        rules: [
            'Cada ronda muestra un numero y una tarea.',
            'Acierto: suma puntos y activa bonus de racha.',
            'Fallo: resta tiempo o puntos segun modo.',
            'Dificultad progresiva en el mismo bloque de juego.'
        ],
        scoring: ['Base por acierto', 'Bonus por velocidad', 'Multiplicador por racha'],
        levels: ['Facil: hasta $$99,999$$', 'Medio: hasta $$9,999,999$$', 'Dificil: ceros intermedios y magnitudes grandes'],
        feedback: ['Correcto/incorrecto inmediato', 'Explicacion de una linea', 'Resumen final por habilidad'],
        frequentErrors: ['Confundir cifra con valor', 'Omitir ceros al escribir', 'Descomponer con ordenes equivocados'],
        example: [
            'Sale $$407,205$$: valor de la cifra $$7$$ -> $$7,000$$.',
            'Sale "dos millones cuarenta mil siete" -> $$2,040,007$$.',
            'Sale $$90,305$$ -> $$90,000 + 300 + 5$$.'
        ],
        variants: ['Modo solo valor posicional', 'Modo correccion de respuestas erroneas'],
        theoryLinks: ['Tarjeta 1', 'Tarjeta 2', 'Tarjeta 4'],
        labLinks: ['Herramienta 1', 'Herramienta 2'],
        erronkakLinks: ['Nivel 1 - Problema 1', 'Nivel 1 - Problema 2']
    },
    {
        id: 'parentesis',
        icon: 'J2',
        color: '#0ea5e9',
        title: 'Juego 2: Parentesis Tactico',
        objective: 'Dominar jerarquia de operaciones y efecto de parentesis.',
        skill: 'Razonamiento estrategico.',
        mechanics:
            'Con una expresion base, el jugador coloca parentesis para alcanzar un objetivo numerico.',
        rules: [
            'No se cambian numeros ni operaciones (modo base).',
            'Gana quien llega al objetivo exacto.',
            'Puntuacion mejor con menos movimientos y menos tiempo.',
            'En avanzado se justifica la estrategia usada.'
        ],
        scoring: ['Menos movimientos', 'Menos tiempo', 'Justificacion correcta'],
        levels: ['Facil: 2 operaciones', 'Medio: 3-4 operaciones', 'Dificil: parentesis anidados y objetivos multiples'],
        feedback: ['Valor actual en tiempo real', 'Pista sobre operacion dominante', 'Resumen del orden aplicado'],
        frequentErrors: [
            'Operar siempre de izquierda a derecha',
            'Colocar parentesis que no alteran nada',
            'Creer que cualquier objetivo es alcanzable'
        ],
        example: ['Base: $$2 + 3\cdot4$$, objetivo $$20$$.', 'Con parentesis: $$(2+3)\cdot4 = 20$$.'],
        variants: ['Objetivo multiple (maximo/minimo)', 'Detector de parentesis que no cambian resultado'],
        theoryLinks: ['Tarjeta 9', 'Tarjeta 10'],
        labLinks: ['Herramienta 7', 'Herramienta 8'],
        erronkakLinks: ['Nivel 2 - Problema 3', 'Nivel 3 - Problema 3']
    },
    {
        id: 'reparto',
        icon: 'J3',
        color: '#ef4444',
        title: 'Juego 3: Reparto Maestro',
        objective: 'Practicar division entera y significado de cociente/resto.',
        skill: 'Razonamiento aplicado en contexto.',
        mechanics:
            'Gestion de almacen: empaquetar lotes cumpliendo pedidos con el menor sobrante posible.',
        rules: [
            'Responder cociente y resto.',
            'Interpretar que representa el resto en el contexto.',
            'Niveles altos: dos etapas de empaquetado.',
            'La ronda cierra al validar calculo e interpretacion.'
        ],
        scoring: ['Cociente correcto', 'Resto correcto', 'Interpretacion contextual correcta'],
        levels: ['Facil: una division simple', 'Medio: reparto no exacto', 'Dificil: empaquetado por fases'],
        feedback: ['Aviso si $$r \ge d$$', 'Aviso si falta interpretacion', 'Verificacion con $$D=d\cdot c+r$$'],
        frequentErrors: ['Dar solo cociente', 'Resto invalido', 'Confundir objetos sobrantes con paquetes sobrantes'],
        example: [
            '$$1274:30$$ -> $$42$$ bandejas y resto $$14$$ huevos.',
            '$$42:10$$ -> $$4$$ cajas y resto $$2$$ bandejas.'
        ],
        variants: ['Modo tiempo record', 'Modo elige divisor para minimizar resto'],
        theoryLinks: ['Tarjeta 8', 'Tarjeta 10'],
        labLinks: ['Herramienta 6', 'Herramienta 5'],
        erronkakLinks: ['Nivel 2 - Problema 2', 'Nivel 3 - Problema 3']
    }
]

interface ParenthesisPuzzle {
    statement: string
    target: number
    options: string[]
    correctIndex: number
}

const PARENTESIS_PUZZLES: ParenthesisPuzzle[] = [
    {
        statement: '2 + 3*4',
        target: 20,
        options: ['2 + 3*4', '(2+3)*4', '2 + (3*4)'],
        correctIndex: 1
    },
    {
        statement: '6 - 2*3',
        target: 12,
        options: ['(6-2)*3', '6-(2*3)', '(6-2*3)'],
        correctIndex: 0
    },
    {
        statement: '15 - 10:5',
        target: 1,
        options: ['15-(10:5)', '(15-10):5', '15-10:5'],
        correctIndex: 1
    }
]

function generateFlashChallenge() {
    const number = Math.floor(Math.random() * 900000) + 100000
    const text = String(number)
    const index = Math.floor(Math.random() * text.length)
    const digit = Number(text[index])
    const place = Math.pow(10, text.length - index - 1)
    const value = digit * place
    return { number, index, value }
}

export function GamesPage() {
    const [activeGame, setActiveGame] = useState<GameId>('flash')

    const [flashChallenge, setFlashChallenge] = useState(generateFlashChallenge)
    const [flashInput, setFlashInput] = useState('')
    const [flashFeedback, setFlashFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')

    const [puzzleIndex, setPuzzleIndex] = useState(0)
    const [selectedOption, setSelectedOption] = useState<number | null>(null)
    const [puzzleFeedback, setPuzzleFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')

    const [repartoDividend, setRepartoDividend] = useState(1274)
    const [repartoDivisor, setRepartoDivisor] = useState(30)
    const [repartoQ, setRepartoQ] = useState('')
    const [repartoR, setRepartoR] = useState('')
    const [repartoFeedback, setRepartoFeedback] = useState<'idle' | 'ok' | 'ko'>('idle')

    const currentGame = useMemo(() => GAMES.find((game) => game.id === activeGame) ?? GAMES[0], [activeGame])
    const currentPuzzle = PARENTESIS_PUZZLES[puzzleIndex]

    const trueQ = Math.floor(repartoDividend / Math.max(1, repartoDivisor))
    const trueR = repartoDividend - trueQ * Math.max(1, repartoDivisor)

    const checkFlash = () => {
        const normalized = flashInput.replace(/[.,\s]/g, '')
        const expected = String(flashChallenge.value)
        setFlashFeedback(normalized === expected ? 'ok' : 'ko')
    }

    const nextFlash = () => {
        setFlashChallenge(generateFlashChallenge())
        setFlashInput('')
        setFlashFeedback('idle')
    }

    const checkPuzzle = () => {
        if (selectedOption === null) return
        setPuzzleFeedback(selectedOption === currentPuzzle.correctIndex ? 'ok' : 'ko')
    }

    const nextPuzzle = () => {
        setPuzzleIndex((value) => (value + 1) % PARENTESIS_PUZZLES.length)
        setSelectedOption(null)
        setPuzzleFeedback('idle')
    }

    const checkReparto = () => {
        const q = Number(repartoQ)
        const r = Number(repartoR)
        setRepartoFeedback(q === trueQ && r === trueR && r >= 0 && r < Math.max(1, repartoDivisor) ? 'ok' : 'ko')
    }

    return (
        <div className="zn-games-page">
            <div className="container">
                <header className="zn-games-header">
                    <h1>Jokuak: Numeros Naturales</h1>
                    <p>Juegos conectados con teoria, laboratorio y erronkak para automatizar habilidades clave.</p>
                </header>

                <nav className="zn-games-nav" role="tablist" aria-label="Juegos">
                    {GAMES.map((game) => (
                        <button
                            key={game.id}
                            role="tab"
                            aria-selected={activeGame === game.id}
                            className={`zn-game-tab ${activeGame === game.id ? 'active' : ''}`}
                            onClick={() => setActiveGame(game.id)}
                            style={{ '--game-color': game.color } as React.CSSProperties}
                        >
                            <span className="tab-icon">{game.icon}</span>
                            <span>{game.title}</span>
                        </button>
                    ))}
                </nav>

                <section className="zn-game-panel" style={{ '--game-color': currentGame.color } as React.CSSProperties}>
                    <div className="zn-game-top">
                        <span className="chip">{currentGame.icon}</span>
                        <div>
                            <h2>{currentGame.title}</h2>
                            <p>{currentGame.objective}</p>
                        </div>
                    </div>

                    <div className="zn-game-metadata">
                        <article>
                            <h3>Habilidad</h3>
                            <p>{currentGame.skill}</p>
                        </article>
                        <article>
                            <h3>Mecanica principal</h3>
                            <p>{currentGame.mechanics}</p>
                        </article>
                    </div>

                    <GameWidget
                        gameId={activeGame}
                        flashChallenge={flashChallenge}
                        flashInput={flashInput}
                        flashFeedback={flashFeedback}
                        onFlashInput={setFlashInput}
                        onCheckFlash={checkFlash}
                        onNextFlash={nextFlash}
                        puzzle={currentPuzzle}
                        selectedOption={selectedOption}
                        puzzleFeedback={puzzleFeedback}
                        onSelectOption={setSelectedOption}
                        onCheckPuzzle={checkPuzzle}
                        onNextPuzzle={nextPuzzle}
                        repartoDividend={repartoDividend}
                        repartoDivisor={repartoDivisor}
                        repartoQ={repartoQ}
                        repartoR={repartoR}
                        repartoFeedback={repartoFeedback}
                        trueQ={trueQ}
                        trueR={trueR}
                        onRepartoDividend={setRepartoDividend}
                        onRepartoDivisor={setRepartoDivisor}
                        onRepartoQ={setRepartoQ}
                        onRepartoR={setRepartoR}
                        onCheckReparto={checkReparto}
                    />

                    <div className="zn-game-grid">
                        <article>
                            <h3>Reglas</h3>
                            <ul>{currentGame.rules.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                        <article>
                            <h3>Puntuacion / progreso</h3>
                            <ul>{currentGame.scoring.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                        <article>
                            <h3>Niveles de dificultad</h3>
                            <ul>{currentGame.levels.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                        <article>
                            <h3>Feedback al alumno</h3>
                            <ul>{currentGame.feedback.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                        <article>
                            <h3>Errores frecuentes</h3>
                            <ul>{currentGame.frequentErrors.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                        <article>
                            <h3>Ejemplo de ronda</h3>
                            <ol>{currentGame.example.map((item) => <li key={item}>{item}</li>)}</ol>
                        </article>
                        <article>
                            <h3>Variantes</h3>
                            <ul>{currentGame.variants.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                    </div>

                    <div className="zn-links-grid">
                        <article>
                            <h3>Conecta con teoria</h3>
                            <ul>{currentGame.theoryLinks.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                        <article>
                            <h3>Conecta con laboratorio</h3>
                            <ul>{currentGame.labLinks.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                        <article>
                            <h3>Conecta con erronkak</h3>
                            <ul>{currentGame.erronkakLinks.map((item) => <li key={item}>{item}</li>)}</ul>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    )
}

interface GameWidgetProps {
    gameId: GameId
    flashChallenge: { number: number; index: number; value: number }
    flashInput: string
    flashFeedback: 'idle' | 'ok' | 'ko'
    onFlashInput: (value: string) => void
    onCheckFlash: () => void
    onNextFlash: () => void
    puzzle: ParenthesisPuzzle
    selectedOption: number | null
    puzzleFeedback: 'idle' | 'ok' | 'ko'
    onSelectOption: (index: number) => void
    onCheckPuzzle: () => void
    onNextPuzzle: () => void
    repartoDividend: number
    repartoDivisor: number
    repartoQ: string
    repartoR: string
    repartoFeedback: 'idle' | 'ok' | 'ko'
    trueQ: number
    trueR: number
    onRepartoDividend: (value: number) => void
    onRepartoDivisor: (value: number) => void
    onRepartoQ: (value: string) => void
    onRepartoR: (value: string) => void
    onCheckReparto: () => void
}

function GameWidget(props: GameWidgetProps) {
    if (props.gameId === 'flash') {
        const digitText = String(props.flashChallenge.number)
        const targetDigit = digitText[props.flashChallenge.index]
        const placeName = ['centenas de millar', 'decenas de millar', 'millares', 'centenas', 'decenas', 'unidades'][props.flashChallenge.index]
        return (
            <div className="zn-widget">
                <h3>Microjuego: Flash Posicional</h3>
                <p>
                    Numero: <strong>{props.flashChallenge.number.toLocaleString('es-ES')}</strong>. Valor de la cifra{' '}
                    <strong>{targetDigit}</strong> en <strong>{placeName}</strong>.
                </p>
                <div className="zn-widget-actions">
                    <input
                        value={props.flashInput}
                        onChange={(event) => props.onFlashInput(event.target.value)}
                        placeholder="Escribe el valor"
                    />
                    <button onClick={props.onCheckFlash}>Comprobar</button>
                    <button onClick={props.onNextFlash}>Siguiente</button>
                </div>
                {props.flashFeedback === 'ok' && <p className="ok">Correcto.</p>}
                {props.flashFeedback === 'ko' && <p className="ko">Revisa el orden posicional.</p>}
            </div>
        )
    }

    if (props.gameId === 'parentesis') {
        return (
            <div className="zn-widget">
                <h3>Microjuego: Parentesis Tactico</h3>
                <p>
                    Expresion base: <strong>{props.puzzle.statement}</strong>. Objetivo: <strong>{props.puzzle.target}</strong>.
                </p>
                <div className="zn-option-list">
                    {props.puzzle.options.map((option, index) => (
                        <button
                            key={option}
                            className={`option ${props.selectedOption === index ? 'selected' : ''}`}
                            onClick={() => props.onSelectOption(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="zn-widget-actions">
                    <button onClick={props.onCheckPuzzle}>Comprobar</button>
                    <button onClick={props.onNextPuzzle}>Otro reto</button>
                </div>
                {props.puzzleFeedback === 'ok' && <p className="ok">Objetivo alcanzado.</p>}
                {props.puzzleFeedback === 'ko' && <p className="ko">No llega al objetivo, revisa prioridad y parentesis.</p>}
            </div>
        )
    }

    return (
        <div className="zn-widget">
            <h3>Microjuego: Reparto Maestro</h3>
            <div className="zn-widget-grid">
                <label>
                    Dividendo
                    <input
                        type="number"
                        min={0}
                        value={props.repartoDividend}
                        onChange={(event) => props.onRepartoDividend(Number(event.target.value))}
                    />
                </label>
                <label>
                    Divisor
                    <input
                        type="number"
                        min={1}
                        value={props.repartoDivisor}
                        onChange={(event) => props.onRepartoDivisor(Math.max(1, Number(event.target.value)))}
                    />
                </label>
                <label>
                    Cociente
                    <input value={props.repartoQ} onChange={(event) => props.onRepartoQ(event.target.value)} />
                </label>
                <label>
                    Resto
                    <input value={props.repartoR} onChange={(event) => props.onRepartoR(event.target.value)} />
                </label>
            </div>
            <div className="zn-widget-actions">
                <button onClick={props.onCheckReparto}>Comprobar</button>
            </div>
            {props.repartoFeedback === 'ok' && <p className="ok">Division valida.</p>}
            {props.repartoFeedback === 'ko' && (
                <p className="ko">
                    Revisa: cociente {props.trueQ}, resto {props.trueR} y condicion $$0 {'<='} r {'<'} d$$.
                </p>
            )}
        </div>
    )
}
