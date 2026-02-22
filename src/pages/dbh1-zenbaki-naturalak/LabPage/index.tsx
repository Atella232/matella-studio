import { useMemo, useState } from 'react'
import './LabPage.css'

type ToolId =
    | 'abaco'
    | 'constructor'
    | 'comparador'
    | 'redondeo'
    | 'operaciones'
    | 'division'
    | 'detector'
    | 'sandbox'

interface ToolInfo {
    id: ToolId
    icon: string
    color: string
    title: string
    concept: string
    objective: string
    interaction: string
    initialView: string
    controls: string[]
    steps: string[]
    realtime: string[]
    patterns: string[]
    activities: string[]
    errors: string[]
    easyVariant: string
    hardVariant: string
    indicators: string[]
    theoryLinks: string[]
    erronkakLinks: string[]
    technical: string[]
}

const TOOLS: ToolInfo[] = [
    {
        id: 'abaco',
        icon: 'H1',
        color: '#6366f1',
        title: 'Herramienta 1: Abaco posicional interactivo',
        concept: 'Sistema decimal y valor posicional.',
        objective: 'Visualizar como cambia el valor de una cifra al cambiar su posicion.',
        interaction: 'Arrastrar fichas, input numerico, selector de ordenes y botones de agrupar/desagrupar.',
        initialView:
            'Tablero por columnas (unidades, decenas, centenas, millares) con fichas iniciales y panel de numero + descomposicion.',
        controls: [
            'Arrastrar ficha a una columna: suma una unidad de ese orden.',
            'Boton Agrupar 10: convierte 10 fichas en 1 ficha del orden superior.',
            'Boton Desagrupar: realiza la operacion inversa.',
            'Input Ir a numero: carga una representacion concreta.',
            'Selector de rango: hasta millares o millones.'
        ],
        steps: [
            'El alumno coloca fichas en columnas.',
            'La herramienta calcula valor total por peso decimal.',
            'Si hay 10 o mas fichas, puede reagrupar.',
            'Se actualizan numero, lectura y descomposicion en tiempo real.',
            'Se observa que reagrupar no altera el valor global.'
        ],
        realtime: [
            'Cada columna pesa distinto: unidad x1, decena x10, centena x100.',
            'El numero final cambia de forma instantanea al mover fichas.'
        ],
        patterns: [
            '$$10$$ unidades equivalen a $$1$$ decena.',
            'La misma cifra cambia su valor segun la posicion.',
            'Los ceros marcan ordenes sin cantidad pero mantienen estructura.'
        ],
        activities: [
            'Construye $$4,028$$ y explica por que el $$0$$ es necesario.',
            'Intenta mover una ficha de centenas a decenas de millar y justifica por que no es equivalente sin compensar.',
            'Reagrupa totalmente una representacion y verifica que el valor se conserva.'
        ],
        errors: ['Contar fichas sin multiplicar por el orden.', 'Creer que reagrupar cambia el numero.'],
        easyVariant: 'Solo unidades, decenas y centenas.',
        hardVariant: 'Hasta millones con retos de reconstruccion por valor parcial.',
        indicators: [
            'Construye numeros dados sin ensayo-error excesivo.',
            'Explica equivalencias de agrupacion con lenguaje correcto.',
            'Corrige representaciones erroneas justificando valor posicional.'
        ],
        theoryLinks: ['Tarjeta 1', 'Tarjeta 2'],
        erronkakLinks: ['Nivel 1 - Problema 1', 'Nivel 3 - Problema 1'],
        technical: ['Grid visual con drag and drop', 'Estado reactivo del numero', 'Conversor automatico a lectura y descomposicion']
    },
    {
        id: 'constructor',
        icon: 'H2',
        color: '#0ea5e9',
        title: 'Herramienta 2: Constructor lectura <-> escritura <-> descomposicion',
        concept: 'Traduccion entre representaciones de un mismo numero natural.',
        objective: 'Convertir entre cifras, palabras y descomposicion con coherencia.',
        interaction: 'Inputs, campos de periodos, tarjetas editables y validacion por bloques.',
        initialView: 'Tres paneles sincronizados: numero en cifras, lectura y descomposicion. Boton Generar reto.',
        controls: [
            'Input de cifras.',
            'Campos de millones, millares y unidades.',
            'Editor de descomposicion para activar o quitar terminos.',
            'Boton Validar equivalencia.',
            'Boton Escuchar lectura (opcional accesibilidad).'
        ],
        steps: [
            'Introducir numero en cifras.',
            'Separar automaticamente en periodos.',
            'Completar lectura y descomposicion.',
            'Validar exactitud de terminos y coherencia global.',
            'Recibir feedback por bloque con error.'
        ],
        realtime: [
            'Un cambio de cifra altera periodos, lectura y descomposicion.',
            'Se visualiza la dependencia entre notacion y estructura posicional.'
        ],
        patterns: [
            'La descomposicion puede omitir terminos con coeficiente $$0$$.',
            'Cambiar una cifra puede modificar miles/millones en la lectura.'
        ],
        activities: [
            'Convierte $$2,040,007$$ a lectura y descomposicion.',
            'Dado "tres millones seis mil cuarenta", escribe el numero y justifica los ceros.',
            'Corrige una descomposicion incorrecta propuesta por la herramienta.'
        ],
        errors: ['Confundir $$70,000$$ con $$7,000$$.', 'Ordenar terminos en posicion incorrecta.'],
        easyVariant: 'Numeros hasta $$99,999$$.',
        hardVariant: 'Hasta miles de millones con periodos incompletos.',
        indicators: [
            'Traduce sin errores entre las tres representaciones.',
            'Justifica por que dos descomposiciones son equivalentes cuando procede.'
        ],
        theoryLinks: ['Tarjeta 1', 'Tarjeta 2', 'Tarjeta 4'],
        erronkakLinks: ['Nivel 1 - Problema 1', 'Nivel 1 - Problema 2'],
        technical: ['Validador semantico de descomposicion', 'Parser de periodos', 'Feedback visual por bloques']
    },
    {
        id: 'comparador',
        icon: 'H3',
        color: '#8b5cf6',
        title: 'Herramienta 3: Comparador dinamico y recta numerica',
        concept: 'Orden y comparacion en naturales conectados con posicion en recta.',
        objective: 'Relacionar simbolos de comparacion con ubicacion numerica.',
        interaction: 'Doble input, arrastre de marcadores, slider de zoom y ordenacion por drag-sort.',
        initialView: 'Recta horizontal con marcadores A y B, cajas de entrada y panel con comparacion pendiente.',
        controls: ['Input A/B', 'Drag de marcadores', 'Zoom de escala', 'Boton Ordenar lista'],
        steps: [
            'Introducir o mover dos numeros.',
            'Ajustar escala para incluir ambos.',
            'Mostrar cual queda a la derecha y el simbolo $$<,>,=$$.',
            'En modo lista, ordenar tarjetas y validar.'
        ],
        realtime: [
            'La posicion de cada punto cambia de forma proporcional al valor.',
            'El simbolo comparativo se actualiza al instante.'
        ],
        patterns: [
            'Mas cifras suelen situarse mas a la derecha.',
            'Diferencias pequenas pueden verse grandes o pequenas segun escala.'
        ],
        activities: [
            'Compara $$438,912$$ y $$438,291$$ y justifica antes de validar.',
            'Ordena cinco numeros con igual numero de cifras.',
            'Busca un caso donde la ultima cifra no decide la comparacion.'
        ],
        errors: ['Guiarse por la ultima cifra.', 'Confundir diferencia visual con diferencia absoluta.'],
        easyVariant: 'Comparaciones hasta $$10,000$$.',
        hardVariant: 'Numeros de hasta 10 cifras con zoom adaptativo.',
        indicators: [
            'Decide simbolo correctamente antes del resultado automatico.',
            'Argumenta comparando desde la izquierda.'
        ],
        theoryLinks: ['Tarjeta 3', 'Tarjeta 4'],
        erronkakLinks: ['Nivel 1 - Problema 2'],
        technical: ['Recta escalable', 'Interpolacion visual', 'Modo lista con validacion']
    },
    {
        id: 'redondeo',
        icon: 'H4',
        color: '#f59e0b',
        title: 'Herramienta 4: Laboratorio de redondeo con zoom',
        concept: 'Aproximacion y redondeo segun orden.',
        objective: 'Entender redondeo como decision de cercania y umbral del $$5$$.',
        interaction: 'Input de numero, selector de orden, recta de candidatos y modo paso a paso.',
        initialView: 'Numero base, dos candidatos de redondeo y selector de orden.',
        controls: ['Input numero', 'Selector de orden', 'Modo paso a paso', 'Modo exploracion libre'],
        steps: [
            'Elegir numero y orden.',
            'Localizar dos multiplos consecutivos del orden.',
            'Situar el numero entre ambos.',
            'Elegir candidato mas cercano.',
            'Relacionar decision con cifra siguiente.'
        ],
        realtime: [
            'Los extremos de la recta cambian con el orden.',
            'La aproximacion cambia al cruzar el punto medio.'
        ],
        patterns: [
            'Los saltos de redondeo ocurren en umbrales.',
            'La regla del $$5$$ representa el punto medio.'
        ],
        activities: [
            'Redondea $$72,480$$ y $$72,580$$ a millares y compara.',
            'Busca dos numeros consecutivos con misma aproximacion a centenas.',
            'Explora que pasa con numeros terminados en $$500$$ al redondear a millares.'
        ],
        errors: ['Confundir orden de redondeo con cifra observada.', 'Poner ceros sin decidir antes si sube o se mantiene.'],
        easyVariant: 'Redondeo a decenas y centenas.',
        hardVariant: 'Eleccion del orden segun contexto comunicativo.',
        indicators: [
            'Explica redondeo por cercania y por cifra siguiente.',
            'Justifica orden de aproximacion segun contexto.'
        ],
        theoryLinks: ['Tarjeta 5'],
        erronkakLinks: ['Nivel 1 - Problema 3', 'Nivel 3 - Problema 2'],
        technical: ['Recta dinamica', 'Calculo de multiplos inferior/superior', 'Modo exploracion persistente']
    },
    {
        id: 'operaciones',
        icon: 'H5',
        color: '#10b981',
        title: 'Herramienta 5: Simulador de operaciones basicas + estimacion',
        concept: 'Suma, resta, multiplicacion y control de plausibilidad.',
        objective: 'Resolver con sentido y validar con estimacion.',
        interaction: 'Inputs, selector de operacion, modo estimado/exacto y comprobacion.',
        initialView: 'Dos o tres operandos, selector de operacion y panel de estimacion.',
        controls: ['Inputs numericos', 'Selector +,-,*', 'Boton Estimar primero', 'Boton Resolver exacto', 'Boton Comprobar'],
        steps: [
            'Introducir datos.',
            'Generar estimacion previa.',
            'Resolver exacto.',
            'Comparar exacto y estimado.',
            'Revisar si hay discrepancia excesiva.'
        ],
        realtime: [
            'Al cambiar operandos, se actualizan estimacion, resultado y diferencia.',
            'Se refuerza el control de plausibilidad.'
        ],
        patterns: ['La estimacion orienta el orden de magnitud.', 'Operaciones inversas ayudan a comprobar.'],
        activities: [
            'Estimar y resolver $$167+235+32$$.',
            'Disenar una resta y comprobarla con una suma.',
            'Encontrar un producto rapido usando $$\\cdot9$$ o $$\\cdot11$$.'
        ],
        errors: ['Estimar sin criterio uniforme.', 'Aceptar resultados sin contraste.'],
        easyVariant: 'Sumas y restas de dos operandos.',
        hardVariant: 'Problemas de varios pasos con eleccion de operacion.',
        indicators: ['Estima antes de calcular.', 'Detecta resultados imposibles rapidamente.'],
        theoryLinks: ['Tarjeta 6', 'Tarjeta 7', 'Tarjeta 10'],
        erronkakLinks: ['Nivel 2 - Problema 1', 'Nivel 3 - Problema 3'],
        technical: ['Modulo de estimacion', 'Historial de intentos', 'Comparador exacto/aproximado']
    },
    {
        id: 'division',
        icon: 'H6',
        color: '#ef4444',
        title: 'Herramienta 6: Division entera visual',
        concept: 'Cociente, resto y validacion $$D=d\\cdot c+r$$.',
        objective: 'Diferenciar reparto exacto y reparto con sobrante.',
        interaction: 'Simulacion visual, inputs de dividendo/divisor y modo reparto/empaquetado.',
        initialView: 'Objetos y contenedores con dos modos: repartir en grupos o empaquetar en cajas.',
        controls: ['Input dividendo', 'Input divisor', 'Selector de modo', 'Boton Reparto automatico', 'Boton Mostrar igualdad'],
        steps: [
            'Elegir dividendo y divisor.',
            'Repartir manual o automaticamente.',
            'Contar grupos completos y sobrantes.',
            'Mostrar cociente, resto e igualdad de verificacion.',
            'Marcar error cuando $$r \\ge d$$.'
        ],
        realtime: [
            'Agregar elementos puede aumentar resto o completar un grupo.',
            'Cambiar divisor modifica tamano de grupo y cociente.'
        ],
        patterns: [
            'El resto siempre es menor que el divisor.',
            'Mismo dividendo, resultados distintos segun divisor.'
        ],
        activities: [
            'Representa $$1274:30$$ y verifica cociente/resto.',
            'Busca una division exacta y otra no exacta con mismo dividendo.',
            'Construye una division con cociente $$12$$ y resto $$5$$.'
        ],
        errors: ['Interpretar el resto como otro grupo completo.', 'Confundir divisor y cociente.'],
        easyVariant: 'Divisiones con numeros pequenos y visual completa.',
        hardVariant: 'Empaquetado en dos niveles (objeto -> lote -> caja).',
        indicators: ['Interpreta el resto en contexto.', 'Usa la igualdad de division sin ayuda.'],
        theoryLinks: ['Tarjeta 7', 'Tarjeta 8', 'Tarjeta 10'],
        erronkakLinks: ['Nivel 2 - Problema 2', 'Nivel 3 - Problema 3'],
        technical: ['Canvas con objetos', 'Algoritmo de reparto', 'Comprobador de condicion del resto']
    },
    {
        id: 'detector',
        icon: 'H7',
        color: '#0ea5e9',
        title: 'Herramienta 7: Detector de errores en combinadas',
        concept: 'Jerarquia de operaciones y correccion razonada.',
        objective: 'Identificar por que una solucion es incorrecta.',
        interaction: 'Seleccion multiple, marcado de pasos, reescritura guiada y feedback inmediato.',
        initialView: 'Una expresion y varias resoluciones de alumnos ficticios.',
        controls: ['Seleccionar solucion correcta', 'Marcar primer paso incorrecto', 'Reescribir paso', 'Ver pista'],
        steps: [
            'Analizar resoluciones propuestas.',
            'Elegir solucion correcta.',
            'Detectar primer paso erroneo de una incorrecta.',
            'Corregirlo y recibir feedback por tipo de error.'
        ],
        realtime: [
            'El feedback cambia segun error de prioridad, parentesis o calculo elemental.'
        ],
        patterns: [
            'Muchos fallos son de orden de operaciones, no de cuentas basicas.',
            'Corregir el primer error suele arreglar toda la cadena.'
        ],
        activities: [
            'Detecta el error en $$2+3\\cdot4$$ cuando alguien obtiene $$20$$.',
            'Corrige una expresion con parentesis ignorados.',
            'Clasifica errores por tipo.'
        ],
        errors: ['Acertar por intuicion sin justificar.', 'Corregir un paso tardio sin localizar el primer fallo.'],
        easyVariant: 'Expresiones con dos operaciones.',
        hardVariant: 'Parentesis anidados y errores plausibles.',
        indicators: ['Localiza sistematicamente el primer error.', 'Nombra la regla violada con terminologia correcta.'],
        theoryLinks: ['Tarjeta 9', 'Tarjeta 10'],
        erronkakLinks: ['Nivel 2 - Problema 3', 'Nivel 3 - Problema 3'],
        technical: ['Banco de errores etiquetado', 'Evaluacion de justificacion', 'Feedback por tipo']
    },
    {
        id: 'sandbox',
        icon: 'H8',
        color: '#a855f7',
        title: 'Herramienta 8: Taller de expresiones y modelizacion',
        concept: 'Construccion de expresiones para representar situaciones.',
        objective: 'Pasar de texto a expresion matematica correcta y equivalente.',
        interaction: 'Constructor por bloques, editor libre y comparador de equivalencia.',
        initialView: 'Panel con bloques de numeros, operaciones y parentesis; zona de construccion.',
        controls: ['Arrastrar bloques', 'Boton Evaluar', 'Boton Comparar equivalencia', 'Modo Texto a expresion'],
        steps: [
            'Recibir enunciado o construir libremente.',
            'Montar expresion.',
            'Evaluar resultado.',
            'Comparar con modelo y analizar si es equivalente.'
        ],
        realtime: [
            'El resultado cambia con parentesis y orden por jerarquia.',
            'El arbol de operaciones refleja la estructura del calculo.'
        ],
        patterns: ['El orden de escritura importa.', 'Dos expresiones distintas pueden ser equivalentes.'],
        activities: [
            'Modela 8 cajas de 15 kg y 26 cajas de 8 kg.',
            'Construye dos expresiones distintas con mismo resultado.',
            'Modifica parentesis y predice el cambio antes de evaluar.'
        ],
        errors: ['Traducir palabra por palabra sin interpretar relaciones.', 'Añadir parentesis innecesarios pensando que no afectan.'],
        easyVariant: 'Expresiones de un paso.',
        hardVariant: 'Modelizacion anidada de varios pasos.',
        indicators: ['Construye expresiones correctas sin ayuda.', 'Justifica equivalencia o no equivalencia.'],
        theoryLinks: ['Tarjeta 9', 'Tarjeta 10'],
        erronkakLinks: ['Nivel 2 - Problema 1', 'Nivel 2 - Problema 3', 'Nivel 3 - Problema 3'],
        technical: ['Parser de expresiones', 'Evaluador matematico', 'Comparador estructural y numerico']
    }
]

type RoundOrder = 'decenas' | 'centenas' | 'millares' | 'decenas-millar' | 'millones'

const ORDER_FACTORS: Record<RoundOrder, number> = {
    decenas: 10,
    centenas: 100,
    millares: 1000,
    'decenas-millar': 10000,
    millones: 1000000
}

function roundNatural(value: number, order: RoundOrder) {
    const factor = ORDER_FACTORS[order]
    const nextBase = factor / 10
    const baseDigit = Math.floor(value / factor)
    const nextDigit = Math.floor((value % factor) / nextBase)
    const rounded = nextDigit >= 5 ? (baseDigit + 1) * factor : baseDigit * factor
    return { rounded, nextDigit }
}

export function LabPage() {
    const [activeTool, setActiveTool] = useState<ToolId>('abaco')
    const [compareA, setCompareA] = useState(438912)
    const [compareB, setCompareB] = useState(438291)
    const [roundValue, setRoundValue] = useState(384523)
    const [roundOrder, setRoundOrder] = useState<RoundOrder>('millares')
    const [dividend, setDividend] = useState(1274)
    const [divisor, setDivisor] = useState(30)

    const currentTool = useMemo(
        () => TOOLS.find((tool) => tool.id === activeTool) ?? TOOLS[0],
        [activeTool]
    )

    const compareSymbol = compareA === compareB ? '=' : compareA > compareB ? '>' : '<'
    const roundData = useMemo(() => roundNatural(Math.max(0, Math.floor(roundValue)), roundOrder), [roundValue, roundOrder])

    const safeDividend = Math.max(0, Math.floor(dividend))
    const safeDivisor = Math.max(1, Math.floor(divisor))
    const quotient = Math.floor(safeDividend / safeDivisor)
    const remainder = safeDividend - safeDivisor * quotient

    return (
        <div className="zn-lab-page">
            <div className="container">
                <header className="zn-lab-header">
                    <h1>Laboratorio: Numeros Naturales</h1>
                    <p>
                        Ocho herramientas para observar, manipular y validar ideas clave del tema. Selecciona una
                        herramienta y practica con la ficha didactica y el mini widget asociado.
                    </p>
                </header>

                <nav className="zn-lab-grid" role="tablist" aria-label="Herramientas de laboratorio">
                    {TOOLS.map((tool) => (
                        <button
                            key={tool.id}
                            role="tab"
                            aria-selected={activeTool === tool.id}
                            aria-controls={`panel-${tool.id}`}
                            id={`tab-${tool.id}`}
                            className={`zn-lab-card ${activeTool === tool.id ? 'active' : ''}`}
                            onClick={() => setActiveTool(tool.id)}
                            style={{ '--lab-color': tool.color } as React.CSSProperties}
                        >
                            <span className="zn-lab-icon">{tool.icon}</span>
                            <span className="zn-lab-name">{tool.title}</span>
                        </button>
                    ))}
                </nav>

                <section
                    id={`panel-${currentTool.id}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${currentTool.id}`}
                    className="zn-lab-panel"
                    style={{ '--panel-color': currentTool.color } as React.CSSProperties}
                >
                    <div className="zn-lab-panel-header">
                        <span className="panel-chip">{currentTool.icon}</span>
                        <div>
                            <h2>{currentTool.title}</h2>
                            <p>{currentTool.objective}</p>
                        </div>
                    </div>

                    <div className="zn-meta-grid">
                        <article className="zn-meta-card">
                            <h3>Concepto</h3>
                            <p>{currentTool.concept}</p>
                        </article>
                        <article className="zn-meta-card">
                            <h3>Interaccion</h3>
                            <p>{currentTool.interaction}</p>
                        </article>
                        <article className="zn-meta-card">
                            <h3>Pantalla inicial</h3>
                            <p>{currentTool.initialView}</p>
                        </article>
                    </div>
                    <LabMiniWidget
                        toolId={currentTool.id}
                        compareA={compareA}
                        compareB={compareB}
                        compareSymbol={compareSymbol}
                        roundOrder={roundOrder}
                        roundValue={roundValue}
                        roundData={roundData}
                        dividend={safeDividend}
                        divisor={safeDivisor}
                        quotient={quotient}
                        remainder={remainder}
                        onCompareA={setCompareA}
                        onCompareB={setCompareB}
                        onRoundOrder={setRoundOrder}
                        onRoundValue={setRoundValue}
                        onDividend={setDividend}
                        onDivisor={setDivisor}
                    />

                    <div className="zn-detail-grid">
                        <article className="zn-detail-card">
                            <h3>Controles</h3>
                            <ul>
                                {currentTool.controls.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Funcionamiento paso a paso</h3>
                            <ol>
                                {currentTool.steps.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ol>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Cambios en tiempo real</h3>
                            <ul>
                                {currentTool.realtime.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Patrones a descubrir</h3>
                            <ul>
                                {currentTool.patterns.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Actividades guiadas</h3>
                            <ol>
                                {currentTool.activities.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ol>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Errores tipicos</h3>
                            <ul>
                                {currentTool.errors.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>

                    <div className="zn-variants-row">
                        <article className="zn-variant-card">
                            <h3>Variante facil</h3>
                            <p>{currentTool.easyVariant}</p>
                        </article>
                        <article className="zn-variant-card">
                            <h3>Variante dificil</h3>
                            <p>{currentTool.hardVariant}</p>
                        </article>
                    </div>

                    <div className="zn-detail-grid">
                        <article className="zn-detail-card">
                            <h3>Indicadores de comprension</h3>
                            <ul>
                                {currentTool.indicators.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Relacion con teoria</h3>
                            <ul>
                                {currentTool.theoryLinks.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Relacion con erronkak</h3>
                            <ul>
                                {currentTool.erronkakLinks.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                        <article className="zn-detail-card">
                            <h3>Requisitos tecnicos sugeridos</h3>
                            <ul>
                                {currentTool.technical.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </section>
            </div>
        </div>
    )
}

interface LabMiniWidgetProps {
    toolId: ToolId
    compareA: number
    compareB: number
    compareSymbol: string
    roundValue: number
    roundOrder: RoundOrder
    roundData: { rounded: number; nextDigit: number }
    dividend: number
    divisor: number
    quotient: number
    remainder: number
    onCompareA: (value: number) => void
    onCompareB: (value: number) => void
    onRoundValue: (value: number) => void
    onRoundOrder: (value: RoundOrder) => void
    onDividend: (value: number) => void
    onDivisor: (value: number) => void
}

function LabMiniWidget({
    toolId,
    compareA,
    compareB,
    compareSymbol,
    roundValue,
    roundOrder,
    roundData,
    dividend,
    divisor,
    quotient,
    remainder,
    onCompareA,
    onCompareB,
    onRoundValue,
    onRoundOrder,
    onDividend,
    onDivisor
}: LabMiniWidgetProps) {
    if (toolId === 'comparador') {
        return (
            <div className="zn-widget-card">
                <h3>Mini widget: comparador inmediato</h3>
                <div className="zn-widget-grid">
                    <label>
                        Numero A
                        <input
                            type="number"
                            value={compareA}
                            onChange={(event) => onCompareA(Number(event.target.value))}
                        />
                    </label>
                    <label>
                        Numero B
                        <input
                            type="number"
                            value={compareB}
                            onChange={(event) => onCompareB(Number(event.target.value))}
                        />
                    </label>
                </div>
                <p className="zn-widget-result">
                    Resultado: A {compareSymbol} B
                </p>
                <p className="zn-widget-note">
                    Regla aplicada: primero numero de cifras; si empatan, comparar de izquierda a derecha.
                </p>
            </div>
        )
    }

    if (toolId === 'redondeo') {
        return (
            <div className="zn-widget-card">
                <h3>Mini widget: redondeo paso a paso</h3>
                <div className="zn-widget-grid">
                    <label>
                        Numero
                        <input
                            type="number"
                            min={0}
                            value={roundValue}
                            onChange={(event) => onRoundValue(Number(event.target.value))}
                        />
                    </label>
                    <label>
                        Orden
                        <select
                            value={roundOrder}
                            onChange={(event) => onRoundOrder(event.target.value as RoundOrder)}
                        >
                            <option value="decenas">Decenas</option>
                            <option value="centenas">Centenas</option>
                            <option value="millares">Millares</option>
                            <option value="decenas-millar">Decenas de millar</option>
                            <option value="millones">Millones</option>
                        </select>
                    </label>
                </div>
                <p className="zn-widget-result">Aproximacion: {roundData.rounded.toLocaleString('es-ES')}</p>
                <p className="zn-widget-note">
                    Cifra siguiente observada: {roundData.nextDigit}. Si es menor que 5 se mantiene; si es 5 o mayor se sube.
                </p>
            </div>
        )
    }

    if (toolId === 'division') {
        return (
            <div className="zn-widget-card">
                <h3>Mini widget: division entera</h3>
                <div className="zn-widget-grid">
                    <label>
                        Dividendo
                        <input
                            type="number"
                            min={0}
                            value={dividend}
                            onChange={(event) => onDividend(Number(event.target.value))}
                        />
                    </label>
                    <label>
                        Divisor
                        <input
                            type="number"
                            min={1}
                            value={divisor}
                            onChange={(event) => onDivisor(Number(event.target.value))}
                        />
                    </label>
                </div>
                <p className="zn-widget-result">
                    Cociente: {quotient} | Resto: {remainder}
                </p>
                <p className="zn-widget-note">
                    Verificacion: {dividend} = {divisor} x {quotient} + {remainder}. Condicion: 0 {'<='} r {'<'} d.
                </p>
            </div>
        )
    }

    return null
}
