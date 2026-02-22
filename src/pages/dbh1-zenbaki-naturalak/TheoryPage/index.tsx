import { useState } from 'react'
import './TheoryPage.css'

interface VocabularyItem {
    term: string
    definition: string
}

interface QuickCheckItem {
    question: string
    answer: string
}

interface CardConnections {
    laboratorio: string[]
    erronkak: string[]
    jokuak: string[]
}

interface TheoryCard {
    id: string
    title: string
    icon: string
    color: string
    objective: string
    keyIdea: string
    development: string[]
    vocabulary: VocabularyItem[]
    solvedExample: string[]
    edgeCase: string
    typicalError: string
    correction: string
    quickCheck: QuickCheckItem[]
    connections: CardConnections
}

const THEORY_CARDS: TheoryCard[] = [
    {
        id: 'sistema-decimal',
        title: 'Sistema decimal y valor posicional',
        icon: '01',
        color: '#6366f1',
        objective: 'Comprender que el sistema de numeracion decimal es decimal y posicional.',
        keyIdea:
            'Cada posicion vale diez veces la posicion de su derecha. El valor de una cifra depende del lugar que ocupa.',
        development: [
            'El sistema es decimal porque trabaja con agrupaciones de $$10$$.',
            'Es posicional porque la misma cifra puede representar cantidades distintas segun su orden.',
            'En $$3,507$$ la cifra $$5$$ representa $$500$$; en $$35,070$$ representa $$5,000$$.',
            'Ordenes habituales: unidades, decenas, centenas, unidades de millar, decenas de millar, centenas de millar, millones.',
            'Relaciones clave: $$1$$ decena $$=10$$ unidades; $$1$$ centena $$=100$$ unidades; $$1$$ unidad de millar $$=1000$$ unidades.'
        ],
        vocabulary: [
            { term: 'Cifra', definition: 'Simbolo del $$0$$ al $$9$$.' },
            { term: 'Numero', definition: 'Expresion formada por una o mas cifras.' },
            { term: 'Orden de unidades', definition: 'Posicion de una cifra dentro del numero.' },
            { term: 'Valor posicional', definition: 'Cantidad que representa una cifra segun su posicion.' }
        ],
        solvedExample: [
            'Numero: $$48,205$$.',
            'Descomposicion: $$40,000 + 8,000 + 200 + 0 + 5$$.',
            'Lectura estructurada: cuarenta y ocho mil doscientos cinco.'
        ],
        edgeCase: 'En $$30,004$$ los ceros mantienen la estructura del numero. No es lo mismo que $$34$$.',
        typicalError: 'Pensar que la cifra $$5$$ siempre vale $$5$$.',
        correction: 'La cifra puede valer $$5$$, $$50$$, $$500$$ o $$5,000$$ segun la posicion.',
        quickCheck: [
            { question: 'En $$72,641$$, que valor tiene la cifra $$6$$?', answer: '$$600$$' },
            { question: 'Cuantas unidades son $$3$$ centenas?', answer: '$$300$$' }
        ],
        connections: {
            laboratorio: ['Herramienta 1 (Abaco posicional)', 'Herramienta 2 (Lectura-descomposicion)'],
            erronkak: ['Nivel 1 - Problema 1', 'Nivel 3 - Problema 1'],
            jokuak: ['Juego 1 (Flash Posicional)']
        }
    },
    {
        id: 'lectura-escritura',
        title: 'Lectura, escritura y descomposicion',
        icon: '02',
        color: '#06b6d4',
        objective: 'Leer, escribir y descomponer numeros naturales con precision.',
        keyIdea:
            'Un numero puede representarse de forma equivalente con cifras, palabras y descomposicion aditiva.',
        development: [
            'Representaciones equivalentes: escritura en cifras, lectura en palabras y descomposicion aditiva.',
            'La descomposicion muestra la estructura del numero y evita errores de lectura.',
            'Ejemplo general: $$3,406,018 = 3,000,000 + 400,000 + 6,000 + 10 + 8$$.',
            'Conviene agrupar por periodos de tres cifras para leer bien: unidades, millares, millones.'
        ],
        vocabulary: [
            { term: 'Descomposicion aditiva', definition: 'Suma de los valores posicionales.' },
            { term: 'Periodo', definition: 'Bloque de tres cifras (miles, millones, ...).' }
        ],
        solvedExample: [
            'Numero: $$5,072,304$$.',
            'Descomposicion: $$5,000,000 + 70,000 + 2,000 + 300 + 4$$.',
            'Lectura: cinco millones setenta y dos mil trescientos cuatro.'
        ],
        edgeCase: 'No se lee cifra a cifra. Se lee por periodos completos.',
        typicalError: 'Omitir periodos con cero y deformar la lectura.',
        correction: 'Mantener todos los bloques de tres cifras y leer de izquierda a derecha por periodos.',
        quickCheck: [
            { question: 'Escribe en cifras: dos millones cuarenta mil siete.', answer: '$$2,040,007$$' },
            { question: 'Descompon $$90,305$$.', answer: '$$90,000 + 300 + 5$$' }
        ],
        connections: {
            laboratorio: ['Herramienta 2 (Lectura-escritura-descomposicion)'],
            erronkak: ['Nivel 1 - Problema 1', 'Nivel 1 - Problema 2'],
            jokuak: ['Juego 1 (Flash Posicional)']
        }
    },
    {
        id: 'orden-comparacion',
        title: 'Orden, comparacion y recta numerica',
        icon: '03',
        color: '#8b5cf6',
        objective: 'Comparar y ordenar numeros naturales usando criterio posicional.',
        keyIdea:
            'Primero se compara el numero de cifras; si coinciden, se compara de izquierda a derecha.',
        development: [
            'Regla 1: en naturales, mas cifras suele implicar numero mayor.',
            'Regla 2: si tienen igual numero de cifras, se compara por el orden mas alto.',
            'Simbolos: $$>$$ mayor que, $$<$$ menor que, $$=$$ igual.',
            'En la recta numerica, los numeros mayores quedan a la derecha.'
        ],
        vocabulary: [
            { term: 'Comparar', definition: 'Decidir cual es mayor, menor o igual.' },
            { term: 'Orden creciente', definition: 'De menor a mayor.' },
            { term: 'Orden decreciente', definition: 'De mayor a menor.' }
        ],
        solvedExample: [
            'Comparar $$438,912$$ y $$438,291$$.',
            'Mismas cifras iniciales $$4,3,8$$. En la siguiente posicion $$9>2$$.',
            'Conclusion: $$438,912 > 438,291$$.'
        ],
        edgeCase: '$$40,500 = 40,500$$. Tambien hay casos de igualdad exacta.',
        typicalError: 'Comparar solo por la ultima cifra.',
        correction: 'Siempre comparar desde la cifra de mayor orden.',
        quickCheck: [
            { question: 'Cual es mayor: $$70,203$$ o $$69,999$$?', answer: '$$70,203$$' },
            { question: 'Ordena: $$5402, 5042, 5420$$.', answer: '$$5042 < 5402 < 5420$$' }
        ],
        connections: {
            laboratorio: ['Herramienta 3 (Comparador y recta numerica)'],
            erronkak: ['Nivel 1 - Problema 2'],
            jokuak: ['Juego 1 (Flash Posicional)']
        }
    },
    {
        id: 'numeros-grandes',
        title: 'Numeros grandes y escalas de lectura',
        icon: '04',
        color: '#ec4899',
        objective: 'Manejar numeros grandes con lectura por periodos y sentido de magnitud.',
        keyIdea: 'Agrupar cifras en bloques de tres evita errores de lectura y comparacion.',
        development: [
            'Periodos de lectura: unidades, millares, millones, miles de millones.',
            '$$1,000,000$$ es un millon; $$1,000,000,000$$ es mil millones.',
            'La lectura por periodos ayuda a interpretar datos reales: poblacion, distancias, presupuestos.'
        ],
        vocabulary: [
            { term: 'Millar', definition: '$$1000$$ unidades.' },
            { term: 'Millon', definition: '$$1,000,000$$.' },
            { term: 'Mil millones', definition: '$$1,000,000,000$$.' }
        ],
        solvedExample: [
            'Leer $$2,405,070,018$$ como $$2 | 405 | 070 | 018$$.',
            'Lectura correcta: dos mil cuatrocientos cinco millones setenta mil dieciocho.'
        ],
        edgeCase: 'Error frecuente: perder un periodo y leer "dos millones..." en lugar de "dos mil cuatrocientos cinco millones...".',
        typicalError: 'Leer bloques sin nombrar el periodo correspondiente.',
        correction: 'Separar en grupos de tres y asignar el nombre de cada periodo.',
        quickCheck: [
            { question: 'Escribe en cifras: siete mil millones.', answer: '$$7,000,000,000$$' },
            { question: 'Que numero es mayor: $$999,999,999$$ o $$1,000,000,000$$?', answer: '$$1,000,000,000$$' }
        ],
        connections: {
            laboratorio: ['Herramienta 2', 'Herramienta 3'],
            erronkak: ['Nivel 1 - Problema 2'],
            jokuak: ['Juego 1 (Flash Posicional)']
        }
    },
    {
        id: 'aproximacion-redondeo',
        title: 'Aproximacion y redondeo',
        icon: '05',
        color: '#f59e0b',
        objective: 'Redondear numeros naturales al orden pedido con criterio correcto.',
        keyIdea:
            'Para redondear a un orden, se mira solo la cifra inmediata de la derecha: menor que $$5$$ se mantiene, $$5$$ o mayor se sube una unidad.',
        development: [
            'Paso 1: identificar el orden de aproximacion.',
            'Paso 2: mirar la cifra siguiente.',
            'Paso 3: decidir mantener o subir.',
            'Paso 4: reemplazar por ceros lo que queda a la derecha.',
            'Redondear simplifica la comunicacion, pero pierde precision.'
        ],
        vocabulary: [
            { term: 'Aproximar', definition: 'Sustituir un numero por otro cercano.' },
            { term: 'Redondear', definition: 'Metodo de aproximacion basado en la cifra siguiente.' },
            { term: 'Orden de aproximacion', definition: 'Posicion a la que se redondea.' }
        ],
        solvedExample: [
            'Redondear $$384,523$$ a millares.',
            'Se mira la centena: $$5$$. Como $$5 \ge 5$$, sube el millar.',
            'Resultado: $$385,000$$.'
        ],
        edgeCase: '$$12,500$$ a millares se aproxima a $$13,000$$ porque la centena es $$5$$.',
        typicalError: 'Mirar varias cifras de la derecha en vez de una sola.',
        correction: 'Solo se mira la cifra inmediatamente siguiente al orden elegido.',
        quickCheck: [
            { question: 'Redondea $$72,480$$ a millares.', answer: '$$72,000$$' },
            { question: 'Redondea $$72,580$$ a millares.', answer: '$$73,000$$' }
        ],
        connections: {
            laboratorio: ['Herramienta 4 (Laboratorio de redondeo)'],
            erronkak: ['Nivel 1 - Problema 3', 'Nivel 3 - Problema 2'],
            jokuak: ['Juego 1 (Flash Posicional)']
        }
    },
    {
        id: 'suma-resta',
        title: 'Suma y resta con sentido y comprobacion',
        icon: '06',
        color: '#10b981',
        objective: 'Resolver sumas y restas en contexto y validar el resultado.',
        keyIdea: 'La suma combina cantidades y la resta expresa diferencia o cambio. Son operaciones inversas en muchos casos.',
        development: [
            'Suma: juntar y aumentar.',
            'Resta: quitar, comparar o completar.',
            'Relacion inversa: si $$a+b=c$$ entonces $$c-a=b$$ y $$c-b=a$$.',
            'Conviene estimar antes o despues para controlar la coherencia.'
        ],
        vocabulary: [
            { term: 'Sumandos', definition: 'Numeros que se suman.' },
            { term: 'Total', definition: 'Resultado de la suma.' },
            { term: 'Minuendo, sustraendo, diferencia', definition: 'Terminos de la resta.' },
            { term: 'Comprobacion', definition: 'Verificacion con operacion inversa o estimacion.' }
        ],
        solvedExample: [
            'Compras: $$167 + 235 + 32$$.',
            '$$167 + 235 = 402$$ y $$402 + 32 = 434$$.',
            'Estimacion: $$170 + 240 + 30 \approx 440$$, resultado coherente.'
        ],
        edgeCase: 'En naturales, $$5-9$$ no pertenece al conjunto de naturales.',
        typicalError: 'Aceptar el resultado sin comprobar si tiene sentido.',
        correction: 'Comparar siempre con una estimacion razonable.',
        quickCheck: [
            { question: 'Si $$345 + 280 = 625$$, cuanto vale $$625-345$$?', answer: '$$280$$' },
            { question: 'Estima $$498 + 203$$.', answer: '$$700$$ aprox.' }
        ],
        connections: {
            laboratorio: ['Herramienta 5 (Operaciones + estimacion)'],
            erronkak: ['Nivel 2 - Problema 1'],
            jokuak: ['Juego 1 (Flash Posicional)']
        }
    },
    {
        id: 'multiplicacion',
        title: 'Multiplicacion: significado y propiedades',
        icon: '07',
        color: '#14b8a6',
        objective: 'Entender la multiplicacion y usar propiedades para calcular mejor.',
        keyIdea: 'Multiplicar representa grupos iguales y permite estrategias mentales con distributiva.',
        development: [
            'Interpretaciones: suma repetida, arreglo rectangular y escala.',
            'Conmutativa: $$a \cdot b = b \cdot a$$.',
            'Asociativa: $$(a \cdot b) \cdot c = a \cdot (b \cdot c)$$.',
            'Distributiva: $$a(b+c)=ab+ac$$ y $$a(b-c)=ab-ac$$.',
            'Estrategias mentales: $$n \cdot 9 = n \cdot 10 - n$$, $$n \cdot 11 = n \cdot 10 + n$$.'
        ],
        vocabulary: [
            { term: 'Factores', definition: 'Numeros que se multiplican.' },
            { term: 'Producto', definition: 'Resultado de la multiplicacion.' },
            { term: 'Distributiva', definition: 'Repartir una multiplicacion sobre suma o resta.' }
        ],
        solvedExample: [
            'Calcular $$25 \cdot 9$$.',
            '$$25 \cdot (10-1)=25\cdot10-25\cdot1=250-25=225$$.'
        ],
        edgeCase: '$$3(4+2)=18$$ pero $$3\cdot4+2=14$$. No es lo mismo asociar que distribuir.',
        typicalError: 'Pensar que multiplicar siempre hace crecer el numero.',
        correction: 'Con $$1$$ se mantiene y con $$0$$ se anula.',
        quickCheck: [
            { question: 'Calcula mentalmente $$33 \cdot 11$$.', answer: '$$363$$' },
            { question: 'Que propiedad usas en $$8(10-2)=8\cdot10-8\cdot2$$?', answer: 'Distributiva' }
        ],
        connections: {
            laboratorio: ['Herramienta 5', 'Herramienta 6'],
            erronkak: ['Nivel 2 - Problema 1', 'Nivel 3 - Problema 3'],
            jokuak: ['Juego 2 (Parentesis Tactico)']
        }
    },
    {
        id: 'division-entera',
        title: 'Division entera: cociente y resto',
        icon: '08',
        color: '#ef4444',
        objective: 'Interpretar divisiones enteras y validar con la igualdad fundamental.',
        keyIdea: '$$D = d\cdot c + r$$ con $$0 \le r < d$$.',
        development: [
            'Terminos: dividendo $$D$$, divisor $$d$$, cociente $$c$$, resto $$r$$.',
            'Division exacta: $$r=0$$. No exacta: $$r>0$$.',
            'Interpretaciones: reparto en partes iguales o empaquetado por lotes.',
            'Siempre verificar con la igualdad de la division.'
        ],
        vocabulary: [
            { term: 'Dividendo', definition: 'Cantidad a repartir.' },
            { term: 'Divisor', definition: 'Tamano de grupo o numero de grupos.' },
            { term: 'Cociente', definition: 'Numero de grupos completos.' },
            { term: 'Resto', definition: 'Cantidad que sobra.' }
        ],
        solvedExample: [
            'Dividir $$1274$$ entre $$30$$.',
            '$$30 \cdot 42 = 1260$$ y $$30 \cdot 43 = 1290$$ (se pasa).',
            'Cociente $$42$$, resto $$14$$. Verificacion: $$1274 = 30\cdot42 + 14$$.'
        ],
        edgeCase: '$$1274 = 30\cdot41 + 44$$ no es valido porque $$44$$ no cumple $$r<30$$.',
        typicalError: 'Aceptar restos mayores o iguales al divisor.',
        correction: 'Comprobar siempre $$0 \le r < d$$.',
        quickCheck: [
            { question: 'En $$96:13$$, si $$13\cdot7=91$$, cual es el resto?', answer: '$$5$$' },
            { question: 'Es valida una division con divisor $$12$$ y resto $$12$$?', answer: 'No' }
        ],
        connections: {
            laboratorio: ['Herramienta 6 (Division entera visual)'],
            erronkak: ['Nivel 2 - Problema 2', 'Nivel 3 - Problema 3'],
            jokuak: ['Juego 3 (Reparto Maestro)']
        }
    },
    {
        id: 'operaciones-combinadas',
        title: 'Operaciones combinadas y jerarquia',
        icon: '09',
        color: '#0ea5e9',
        objective: 'Aplicar correctamente el orden de operaciones y el uso de parentesis.',
        keyIdea:
            'Orden: parentesis, luego multiplicaciones/divisiones de izquierda a derecha, y despues sumas/restas de izquierda a derecha.',
        development: [
            'La jerarquia evita ambiguedades y garantiza un resultado unico.',
            'Los parentesis cambian el significado de la expresion.',
            'Mostrar pasos intermedios reduce errores de prioridad.'
        ],
        vocabulary: [
            { term: 'Expresion numerica', definition: 'Combinacion de numeros y operaciones.' },
            { term: 'Jerarquia de operaciones', definition: 'Orden establecido para operar.' },
            { term: 'Parentesis', definition: 'Simbolo que define prioridad.' }
        ],
        solvedExample: [
            'Resolver $$26 - 5\cdot(2+3) + 6$$.',
            'Parentesis: $$2+3=5$$.',
            'Multiplicacion: $$5\cdot5=25$$.',
            'Suma/resta: $$26-25+6=1+6=7$$.'
        ],
        edgeCase: '$$2+3\cdot4=14$$, pero $$(2+3)\cdot4=20$$.',
        typicalError: 'Operar solo de izquierda a derecha sin respetar prioridad.',
        correction: 'Marcar primero que operaciones tienen prioridad.',
        quickCheck: [
            { question: 'Calcula $$15 - 10:5$$.', answer: '$$13$$' },
            { question: 'Calcula $$(15-10):5$$.', answer: '$$1$$' }
        ],
        connections: {
            laboratorio: ['Herramienta 7 (Detector de errores)', 'Herramienta 8 (Taller de expresiones)'],
            erronkak: ['Nivel 2 - Problema 3'],
            jokuak: ['Juego 2 (Parentesis Tactico)']
        }
    },
    {
        id: 'resolucion-problemas',
        title: 'Resolucion de problemas con naturales',
        icon: '10',
        color: '#a855f7',
        objective: 'Modelizar enunciados con operaciones y validar el resultado.',
        keyIdea:
            'Resolver problemas no es solo calcular: hay que interpretar, modelizar, operar y comprobar coherencia.',
        development: [
            'Proceso recomendado: comprender, identificar datos, elegir operaciones, calcular, validar.',
            'Una respuesta completa debe incluir unidad y sentido del resultado.',
            'En problemas de reparto, distinguir numero de grupos, tamano y sobrante.'
        ],
        vocabulary: [
            { term: 'Enunciado', definition: 'Texto del problema.' },
            { term: 'Modelo numerico', definition: 'Expresion que representa la situacion.' },
            { term: 'Validacion', definition: 'Comprobacion de resultado y estrategia.' }
        ],
        solvedExample: [
            'Problema: $$200$$ arboles, cada uno $$7$$ cajas de $$5$$ kg, venta a $$2$$ euros/kg.',
            'Modelo: $$200\cdot7\cdot5\cdot2$$.',
            'Calculo: $$200\cdot7=1400$$; $$1400\cdot5=7000$$; $$7000\cdot2=14,000$$ euros.'
        ],
        edgeCase: '$$200 + 7 + 5 + 2$$ no modela la situacion; mezcla datos sin relacion operativa.',
        typicalError: 'Elegir operaciones por palabras clave sin entender la estructura.',
        correction: 'Representar primero relaciones entre cantidades y unidades.',
        quickCheck: [
            { question: 'Si se envasan $$250$$ kg en cajas de $$10$$ kg, que operacion modela?', answer: '$$250:10$$' },
            { question: 'Si el precio esta en euros/kg, la respuesta final puede quedar en kg?', answer: 'No, debe quedar en euros' }
        ],
        connections: {
            laboratorio: ['Herramienta 5', 'Herramienta 6', 'Herramienta 8'],
            erronkak: ['Todos los problemas del tema'],
            jokuak: ['Juego 2 y Juego 3']
        }
    }
]

const COHERENCE_MAP: Array<{ central: string; reinforces: string; connection: string }> = [
    {
        central: 'Tarjetas 1 y 2',
        reinforces: 'Herramientas 1 y 2, Juego 1',
        connection: 'Valor posicional, lectura por periodos y descomposicion.'
    },
    {
        central: 'Tarjetas 3 y 4',
        reinforces: 'Herramienta 3, Nivel 1 - Problema 2',
        connection: 'Comparacion por cifras y lectura de magnitudes grandes.'
    },
    {
        central: 'Tarjeta 5',
        reinforces: 'Herramienta 4, Nivel 1 - Problema 3, Nivel 3 - Problema 2',
        connection: 'Redondeo por cifra siguiente y eleccion del orden segun contexto.'
    },
    {
        central: 'Tarjetas 6, 7 y 8',
        reinforces: 'Herramientas 5 y 6, Juego 3',
        connection: 'Operacion con sentido, estimacion y division entera con resto valido.'
    },
    {
        central: 'Tarjetas 9 y 10',
        reinforces: 'Herramientas 7 y 8, Juego 2, Erronkak de nivel 2 y 3',
        connection: 'Jerarquia de operaciones, modelizacion y validacion de resultados.'
    }
]

const QUALITY_CHECKLIST: string[] = [
    'Rigor matematico: se trabaja en naturales, con division entera $$D=d\\cdot c+r$$ y $$0 \\le r < d$$.',
    'Progresion didactica: del sistema decimal a la modelizacion de problemas.',
    'Cobertura completa: numeracion, comparacion, redondeo, operaciones y combinadas.',
    'Alineacion entre teoria, laboratorio, erronkak y jokuak con conexiones explicitas.'
]

export function TheoryPage() {
    const [expandedSection, setExpandedSection] = useState<string | null>(null)

    const toggleSection = (id: string) => {
        setExpandedSection((current) => (current === id ? null : id))
    }

    return (
        <div className="theory-page zenbaki-naturalak-theory">
            <div className="container">
                <header className="theory-header">
                    <h1>Teoria: Numeros Naturales (1 ESO)</h1>
                    <p className="theory-subtitle">Sistema decimal, aproximacion y operaciones</p>
                    <p className="theory-description">
                        Secuencia didactica progresiva desde valor posicional hasta resolucion de problemas con
                        operaciones combinadas.
                    </p>
                </header>

                <div className="theory-grid">
                    {THEORY_CARDS.map((card) => (
                        <div
                            key={card.id}
                            className={`theory-card ${expandedSection === card.id ? 'expanded' : ''}`}
                            style={{ '--card-color': card.color } as React.CSSProperties}
                            onClick={() => toggleSection(card.id)}
                        >
                            <div className="card-header">
                                <span className="card-icon">{card.icon}</span>
                                <h3 className="card-title">{card.title}</h3>
                                <span className="card-toggle">{expandedSection === card.id ? '-' : '+'}</span>
                            </div>

                            <div className={`card-content ${expandedSection === card.id ? 'visible' : ''}`}>
                                <TheoryCardContent card={card} />
                            </div>
                        </div>
                    ))}
                </div>

                <section className="coherence-map">
                    <h2>Mapa de coherencia del tema</h2>
                    <div className="coherence-grid">
                        {COHERENCE_MAP.map((row) => (
                            <article className="coherence-card" key={row.central}>
                                <h3>{row.central}</h3>
                                <p>
                                    <strong>Refuerza/prepara:</strong> {row.reinforces}
                                </p>
                                <p>
                                    <strong>Conexion:</strong> {row.connection}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="quality-review">
                    <h2>Revision final de calidad</h2>
                    <ul>
                        {QUALITY_CHECKLIST.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}

function TheoryCardContent({ card }: { card: TheoryCard }) {
    return (
        <div className="content-section">
            <h4>Objetivo</h4>
            <p>{card.objective}</p>

            <h4>Idea clave</h4>
            <p>{card.keyIdea}</p>

            <h4>Desarrollo teorico</h4>
            <ul className="example-list">
                {card.development.map((point) => (
                    <li key={point}>{point}</li>
                ))}
            </ul>

            <h4>Vocabulario matematico esencial</h4>
            <div className="vocab-grid">
                {card.vocabulary.map((item) => (
                    <div className="vocab-card" key={item.term}>
                        <h5>{item.term}</h5>
                        <p>{item.definition}</p>
                    </div>
                ))}
            </div>

            <h4>Ejemplo resuelto</h4>
            <ol className="example-steps">
                {card.solvedExample.map((step) => (
                    <li key={step}>{step}</li>
                ))}
            </ol>

            <div className="tip-box">
                <strong>Contraejemplo o caso limite:</strong>
                <p>{card.edgeCase}</p>
            </div>

            <div className="warning-box">
                <strong>Error tipico:</strong>
                <p>{card.typicalError}</p>
                <strong>Correccion:</strong>
                <p>{card.correction}</p>
            </div>

            <h4>Mini comprobacion</h4>
            <div className="quick-check-grid">
                {card.quickCheck.map((item) => (
                    <div className="quick-check-card" key={item.question}>
                        <p className="quick-question">{item.question}</p>
                        <p className="quick-answer">Respuesta: {item.answer}</p>
                    </div>
                ))}
            </div>

            <h4>Conexiones didacticas</h4>
            <div className="connections-grid">
                <div className="connection-card">
                    <h5>LABORATORIO</h5>
                    <ul>
                        {card.connections.laboratorio.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="connection-card">
                    <h5>ERRONKAK</h5>
                    <ul>
                        {card.connections.erronkak.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
                <div className="connection-card">
                    <h5>JOKUAK</h5>
                    <ul>
                        {card.connections.jokuak.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
