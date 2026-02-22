import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MathText } from '../../../components/MathText'
import './TheoryPage.css'

type Lang = 'es' | 'eu' | 'ar'

interface TheoryCard {
    id: string
    title: string
    icon: string
    color: string
    objective: string
    keyIdea: string
    example: string
    typicalError: string
    correction: string
    quickQ: string
    quickA: string
    lab: string
    mission: string
    game: string
}

interface TheoryCopy {
    title: string
    subtitle: string
    description: string
    cards: TheoryCard[]
    labels: {
        objective: string
        keyIdea: string
        example: string
        typicalError: string
        correction: string
        answer: string
        lab: string
        mission: string
        game: string
    }
    coherenceTitle: string
    coherenceRows: Array<{ central: string; reinforces: string; connection: string }>
    qualityTitle: string
    qualityItems: string[]
}

function resolveLang(language: string): Lang {
    if (language.startsWith('eu')) return 'eu'
    if (language.startsWith('ar')) return 'ar'
    return 'es'
}

const COMMON_META = [
    { id: 't1', icon: '🔢', color: '#6366f1' },
    { id: 't2', icon: '🧾', color: '#06b6d4' },
    { id: 't3', icon: '⚖️', color: '#8b5cf6' },
    { id: 't4', icon: '🌍', color: '#ec4899' },
    { id: 't5', icon: '🎯', color: '#f59e0b' },
    { id: 't6', icon: '➕', color: '#10b981' },
    { id: 't7', icon: '✖️', color: '#14b8a6' },
    { id: 't8', icon: '➗', color: '#ef4444' },
    { id: 't9', icon: '🧩', color: '#0ea5e9' },
    { id: 't10', icon: '🧠', color: '#a855f7' }
] as const

const ES_CARDS: Omit<TheoryCard, 'id' | 'icon' | 'color'>[] = [
    {
        title: 'Sistema decimal y valor posicional',
        objective: 'Entender que el valor de una cifra depende de su posicion.',
        keyIdea: 'Cada orden vale 10 veces el orden de su derecha.',
        example: '$$48,205 = 40,000 + 8,000 + 200 + 5$$.',
        typicalError: 'Creer que la cifra $$5$$ siempre vale $$5$$.',
        correction: 'Puede valer $$5$$, $$50$$, $$500$$ o $$5,000$$.',
        quickQ: 'Valor del $$6$$ en $$72,641$$?',
        quickA: '$$600$$',
        lab: 'Herramienta 1 y 2',
        mission: 'Nivel 1 - Problema 1',
        game: 'Juego 1'
    },
    {
        title: 'Lectura, escritura y descomposicion',
        objective: 'Pasar de cifras a palabras y descomposicion sin errores.',
        keyIdea: 'Las tres representaciones son equivalentes.',
        example: '$$5,072,304 = 5,000,000 + 70,000 + 2,000 + 300 + 4$$.',
        typicalError: 'Omitir periodos con cero.',
        correction: 'Leer por bloques de tres cifras.',
        quickQ: 'Dos millones cuarenta mil siete en cifras?',
        quickA: '$$2,040,007$$',
        lab: 'Herramienta 2',
        mission: 'Nivel 1 - Problema 1 y 2',
        game: 'Juego 1'
    },
    {
        title: 'Orden, comparacion y recta numerica',
        objective: 'Comparar naturales con criterio estable.',
        keyIdea: 'Primero cifras totales; luego comparar desde la izquierda.',
        example: '$$438,912 > 438,291$$.',
        typicalError: 'Comparar solo por unidades.',
        correction: 'Comenzar por la cifra de mayor orden.',
        quickQ: 'Mayor: $$70,203$$ o $$69,999$$?',
        quickA: '$$70,203$$',
        lab: 'Herramienta 3',
        mission: 'Nivel 1 - Problema 2',
        game: 'Juego 1'
    },
    {
        title: 'Numeros grandes y escalas de lectura',
        objective: 'Leer magnitudes grandes correctamente.',
        keyIdea: 'Separar en bloques de tres simplifica lectura y orden.',
        example: '$$2,405,070,018 = 2|405|070|018$$.',
        typicalError: 'Perder un periodo al leer.',
        correction: 'Nombrar cada bloque con su periodo.',
        quickQ: 'Escribe siete mil millones.',
        quickA: '$$7,000,000,000$$',
        lab: 'Herramienta 2 y 3',
        mission: 'Nivel 1 - Problema 2',
        game: 'Juego 1'
    },
    {
        title: 'Aproximacion y redondeo',
        objective: 'Redondear al orden indicado con seguridad.',
        keyIdea: 'Mirar solo la cifra siguiente: <5 mantiene, >=5 sube.',
        example: '$$384,523$$ a millares -> $$385,000$$.',
        typicalError: 'Mirar varias cifras a la vez.',
        correction: 'Solo cuenta la cifra inmediata.',
        quickQ: '$$72,580$$ a millares?',
        quickA: '$$73,000$$',
        lab: 'Herramienta 4',
        mission: 'Nivel 1 - Problema 3',
        game: 'Juego 1'
    },
    {
        title: 'Suma y resta con sentido',
        objective: 'Resolver y comprobar resultados en contexto.',
        keyIdea: 'Suma y resta son inversas en muchos problemas.',
        example: '$$167 + 235 + 32 = 434$$.',
        typicalError: 'Aceptar resultado sin validar.',
        correction: 'Comprobar con estimacion y operacion inversa.',
        quickQ: 'Si $$345 + 280 = 625$$, cuanto es $$625-345$$?',
        quickA: '$$280$$',
        lab: 'Herramienta 5',
        mission: 'Nivel 2 - Problema 1',
        game: 'Juego 1'
    },
    {
        title: 'Multiplicacion en naturales',
        objective: 'Usar propiedades para calcular mejor.',
        keyIdea: 'La distributiva ayuda al calculo mental.',
        example: '$$25\cdot9 = 25\cdot(10-1) = 225$$.',
        typicalError: 'Pensar que multiplicar siempre aumenta.',
        correction: 'Con $$1$$ se mantiene y con $$0$$ se anula.',
        quickQ: '$$33\cdot11$$?',
        quickA: '$$363$$',
        lab: 'Herramienta 5 y 6',
        mission: 'Nivel 2 - Problema 1',
        game: 'Juego 2'
    },
    {
        title: 'Division entera: cociente y resto',
        objective: 'Interpretar reparto exacto y con sobrante.',
        keyIdea: '$$D=d\cdot c+r$$ con $$0 \le r < d$$.',
        example: '$$1274:30 = 42$$ y resto $$14$$.',
        typicalError: 'Aceptar resto mayor o igual al divisor.',
        correction: 'Verificar siempre la condicion del resto.',
        quickQ: 'En $$96:13$$ con $$13\cdot7=91$$, resto?',
        quickA: '$$5$$',
        lab: 'Herramienta 6',
        mission: 'Nivel 2 - Problema 2',
        game: 'Juego 3'
    },
    {
        title: 'Operaciones combinadas y parentesis',
        objective: 'Aplicar bien la jerarquia de operaciones.',
        keyIdea: 'Parentesis -> multiplicacion/division -> suma/resta.',
        example: '$$26 - 5\cdot(2+3) + 6 = 7$$.',
        typicalError: 'Resolver de izquierda a derecha sin prioridad.',
        correction: 'Marcar primero las operaciones prioritarias.',
        quickQ: '$$15 - 10:5$$?',
        quickA: '$$13$$',
        lab: 'Herramienta 7 y 8',
        mission: 'Nivel 2 - Problema 3',
        game: 'Juego 2'
    },
    {
        title: 'Resolucion de problemas con naturales',
        objective: 'Modelizar, calcular y validar en contexto real.',
        keyIdea: 'No es solo hacer cuentas: hay que justificar el modelo.',
        example: '$$200\cdot7\cdot5\cdot2 = 14,000$$ euros.',
        typicalError: 'Elegir operaciones por palabras sueltas.',
        correction: 'Relacionar datos, unidades y objetivo del enunciado.',
        quickQ: 'Modelo para $$250$$ kg en cajas de $$10$$ kg?',
        quickA: '$$250:10$$',
        lab: 'Herramienta 5, 6 y 8',
        mission: 'Todos los niveles',
        game: 'Juego 2 y 3'
    }
]

const EU_CARDS: Omit<TheoryCard, 'id' | 'icon' | 'color'>[] = [
    {
        title: 'Sistema hamartarra eta balio posizionala',
        objective: 'Zifra baten balioa kokapenaren araberakoa dela ulertzea.',
        keyIdea: 'Orden bakoitza eskuinekoaren 10 bider da.',
        example: '$$48,205 = 40,000 + 8,000 + 200 + 5$$.',
        typicalError: '$$5$$ zifrak beti $$5$$ balio duela pentsatzea.',
        correction: 'Balioa ordenaren arabera aldatzen da.',
        quickQ: '$$72,641$$-en $$6$$ zifraren balioa?',
        quickA: '$$600$$',
        lab: '1. eta 2. tresnak',
        mission: '1. maila - 1. problema',
        game: '1. jokoa'
    },
    {
        title: 'Irakurketa, idazketa eta deskonposizioa',
        objective: 'Zifrak, hitzak eta deskonposizioa zuzen lotzea.',
        keyIdea: 'Hiru formak baliokideak dira.',
        example: '$$5,072,304 = 5,000,000 + 70,000 + 2,000 + 300 + 4$$.',
        typicalError: 'Zeroa duten periodoak kentzea.',
        correction: 'Hiru zifrako blokeetan irakurri.',
        quickQ: 'Bi milioi berrogei mila zazpi, zifretan?',
        quickA: '$$2,040,007$$',
        lab: '2. tresna',
        mission: '1. maila - 1. eta 2. problema',
        game: '1. jokoa'
    },
    {
        title: 'Ordena, konparaketa eta zenbaki-zuzena',
        objective: 'Zenbaki naturalak irizpidearekin konparatzea.',
        keyIdea: 'Lehenik zifra kopurua, gero ezkerretik konparatu.',
        example: '$$438,912 > 438,291$$.',
        typicalError: 'Unitateei bakarrik begiratzea.',
        correction: 'Orden handienetik hasi.',
        quickQ: '$$70,203$$ ala $$69,999$$ handiagoa?',
        quickA: '$$70,203$$',
        lab: '3. tresna',
        mission: '1. maila - 2. problema',
        game: '1. jokoa'
    },
    {
        title: 'Zenbaki handiak eta irakurketa-eskalak',
        objective: 'Magnitude handiak segurtasunez irakurtzea.',
        keyIdea: 'Hiru zifrako blokeek irakurketa errazten dute.',
        example: '$$2,405,070,018 = 2|405|070|018$$.',
        typicalError: 'Periodo bat galtzea irakurketan.',
        correction: 'Bloke bakoitzari periodo-izena eman.',
        quickQ: 'Idatzi zazpi mila milioi.',
        quickA: '$$7,000,000,000$$',
        lab: '2. eta 3. tresnak',
        mission: '1. maila - 2. problema',
        game: '1. jokoa'
    },
    {
        title: 'Hurbilketa eta biribiltzea',
        objective: 'Eskatutako ordenara biribiltzea.',
        keyIdea: '<5 mantendu, >=5 igo.',
        example: '$$384,523$$ milakoetara -> $$385,000$$.',
        typicalError: 'Hainbat zifra batera begiratzea.',
        correction: 'Hurrengo zifra bakarrik aztertu.',
        quickQ: '$$72,580$$ milakoetara?',
        quickA: '$$73,000$$',
        lab: '4. tresna',
        mission: '1. maila - 3. problema',
        game: '1. jokoa'
    },
    {
        title: 'Batuketa eta kenketa zentzuz',
        objective: 'Emaitzak testuinguruan ebatzi eta egiaztatzea.',
        keyIdea: 'Batuketa eta kenketa alderantzizkoak dira kasu askotan.',
        example: '$$167 + 235 + 32 = 434$$.',
        typicalError: 'Emaitza zuzena den ala ez ez egiaztatzea.',
        correction: 'Estimazioa eta alderantzizko eragiketa erabili.',
        quickQ: '$$345 + 280 = 625$$ bada, zenbat da $$625-345$$?',
        quickA: '$$280$$',
        lab: '5. tresna',
        mission: '2. maila - 1. problema',
        game: '1. jokoa'
    },
    {
        title: 'Biderketa naturaletan',
        objective: 'Propietateak erabiliz azkarrago kalkulatzea.',
        keyIdea: 'Banakortasuna oso erabilgarria da buruzko kalkuluan.',
        example: '$$25\cdot9 = 25\cdot(10-1) = 225$$.',
        typicalError: 'Biderketak beti handitzen duela pentsatzea.',
        correction: '$$1$$ekin berdin, $$0$$rekin zero.',
        quickQ: '$$33\cdot11$$?',
        quickA: '$$363$$',
        lab: '5. eta 6. tresnak',
        mission: '2. maila - 1. problema',
        game: '2. jokoa'
    },
    {
        title: 'Zatiketa osoa: zatidura eta hondarra',
        objective: 'Banaketa zehatza eta soberakina ulertzea.',
        keyIdea: '$$D=d\cdot c+r$$ eta $$0 \le r < d$$.',
        example: '$$1274:30 = 42$$ eta hondarra $$14$$.',
        typicalError: 'Hondarra zatitzailea baino handiagoa onartzea.',
        correction: 'Baldintza beti egiaztatu.',
        quickQ: '$$96:13$$ eta $$13\cdot7=91$$; hondarra?',
        quickA: '$$5$$',
        lab: '6. tresna',
        mission: '2. maila - 2. problema',
        game: '3. jokoa'
    },
    {
        title: 'Eragiketa konbinatuak eta parentesiak',
        objective: 'Hierarkia zuzen aplikatzea.',
        keyIdea: 'Parentesiak -> biderketa/zatiketa -> batuketa/kenketa.',
        example: '$$26 - 5\cdot(2+3) + 6 = 7$$.',
        typicalError: 'Ezkerretik eskuinera zuzenean kalkulatzea.',
        correction: 'Lehentasunak markatu kalkulatu aurretik.',
        quickQ: '$$15 - 10:5$$?',
        quickA: '$$13$$',
        lab: '7. eta 8. tresnak',
        mission: '2. maila - 3. problema',
        game: '2. jokoa'
    },
    {
        title: 'Problemak zenbaki naturalekin ebaztea',
        objective: 'Modelizatu, kalkulatu eta balidatu.',
        keyIdea: 'Ez da kontu hutsa: eredua justifikatu behar da.',
        example: '$$200\cdot7\cdot5\cdot2 = 14,000$$ euro.',
        typicalError: 'Hitz solteengatik eragiketa aukeratzea.',
        correction: 'Datuak, unitateak eta helburua lotu.',
        quickQ: '$$250$$ kg eta $$10$$ kg-ko kutxak: eredua?',
        quickA: '$$250:10$$',
        lab: '5., 6. eta 8. tresnak',
        mission: 'Maila guztiak',
        game: '2. eta 3. jokoa'
    }
]

const AR_CARDS: Omit<TheoryCard, 'id' | 'icon' | 'color'>[] = [
    {
        title: 'النظام العشري والقيمة المكانية',
        objective: 'فهم أن قيمة الرقم تعتمد على موضعه.',
        keyIdea: 'كل مرتبة تساوي 10 أضعاف المرتبة التي على يمينها.',
        example: '$$48,205 = 40,000 + 8,000 + 200 + 5$$.',
        typicalError: 'الاعتقاد أن الرقم $$5$$ قيمته دائمًا $$5$$.',
        correction: 'قد تكون قيمته $$5$$ أو $$50$$ أو $$500$$ أو $$5,000$$.',
        quickQ: 'ما قيمة $$6$$ في $$72,641$$؟',
        quickA: '$$600$$',
        lab: 'الأداة 1 و2',
        mission: 'المستوى 1 - المسألة 1',
        game: 'اللعبة 1'
    },
    {
        title: 'القراءة والكتابة والتحليل',
        objective: 'التحويل بين الأرقام والكلمات والتحليل دون أخطاء.',
        keyIdea: 'التمثيلات الثلاثة متكافئة.',
        example: '$$5,072,304 = 5,000,000 + 70,000 + 2,000 + 300 + 4$$.',
        typicalError: 'إهمال الفترات التي تحتوي على صفر.',
        correction: 'اقرأ العدد على شكل كتل من ثلاث خانات.',
        quickQ: 'اكتب "مليونان وأربعون ألفًا وسبعة" بالأرقام.',
        quickA: '$$2,040,007$$',
        lab: 'الأداة 2',
        mission: 'المستوى 1 - المسألة 1 و2',
        game: 'اللعبة 1'
    },
    {
        title: 'الترتيب والمقارنة ومستقيم الأعداد',
        objective: 'مقارنة الأعداد الطبيعية بمعيار ثابت.',
        keyIdea: 'أولًا عدد الخانات، ثم المقارنة من اليسار.',
        example: '$$438,912 > 438,291$$.',
        typicalError: 'المقارنة اعتمادًا على الآحاد فقط.',
        correction: 'ابدأ من المرتبة الأعلى.',
        quickQ: 'أي أكبر: $$70,203$$ أم $$69,999$$؟',
        quickA: '$$70,203$$',
        lab: 'الأداة 3',
        mission: 'المستوى 1 - المسألة 2',
        game: 'اللعبة 1'
    },
    {
        title: 'الأعداد الكبيرة ومقاييس القراءة',
        objective: 'قراءة المقادير الكبيرة بثقة.',
        keyIdea: 'تقسيم العدد إلى كتل من ثلاث خانات يسهل القراءة.',
        example: '$$2,405,070,018 = 2|405|070|018$$.',
        typicalError: 'فقدان فترة عند القراءة.',
        correction: 'سم كل كتلة حسب فترتها.',
        quickQ: 'اكتب سبعة مليارات.',
        quickA: '$$7,000,000,000$$',
        lab: 'الأداة 2 و3',
        mission: 'المستوى 1 - المسألة 2',
        game: 'اللعبة 1'
    },
    {
        title: 'التقريب والتدوير',
        objective: 'تقريب العدد إلى المرتبة المطلوبة بدقة.',
        keyIdea: 'إذا كان الرقم التالي <5 نبقي، وإذا كان >=5 نزيد.',
        example: '$$384,523$$ إلى الآلاف -> $$385,000$$.',
        typicalError: 'النظر إلى أكثر من رقم في اليمين.',
        correction: 'ننظر فقط إلى الرقم التالي مباشرة.',
        quickQ: '$$72,580$$ إلى الآلاف؟',
        quickA: '$$73,000$$',
        lab: 'الأداة 4',
        mission: 'المستوى 1 - المسألة 3',
        game: 'اللعبة 1'
    },
    {
        title: 'الجمع والطرح بمعنى',
        objective: 'حل النتائج والتحقق منها داخل سياق.',
        keyIdea: 'الجمع والطرح عمليتان عكسيتان في كثير من الحالات.',
        example: '$$167 + 235 + 32 = 434$$.',
        typicalError: 'قبول الناتج دون تحقق.',
        correction: 'استخدم التقدير والعملية العكسية.',
        quickQ: 'إذا كان $$345 + 280 = 625$$ فكم $$625-345$$؟',
        quickA: '$$280$$',
        lab: 'الأداة 5',
        mission: 'المستوى 2 - المسألة 1',
        game: 'اللعبة 1'
    },
    {
        title: 'الضرب في الأعداد الطبيعية',
        objective: 'استخدام الخصائص لتحسين الحساب.',
        keyIdea: 'خاصية التوزيع مفيدة جدًا في الحساب الذهني.',
        example: '$$25\cdot9 = 25\cdot(10-1) = 225$$.',
        typicalError: 'الاعتقاد أن الضرب دائمًا يكبر العدد.',
        correction: 'مع $$1$$ يبقى كما هو، ومع $$0$$ يصبح صفرًا.',
        quickQ: '$$33\cdot11$$?',
        quickA: '$$363$$',
        lab: 'الأداة 5 و6',
        mission: 'المستوى 2 - المسألة 1',
        game: 'اللعبة 2'
    },
    {
        title: 'القسمة الإقليدية: خارج القسمة والباقي',
        objective: 'فهم القسمة الدقيقة والقسمة مع باقي.',
        keyIdea: '$$D=d\cdot c+r$$ حيث $$0 \le r < d$$.',
        example: '$$1274:30 = 42$$ والباقي $$14$$.',
        typicalError: 'قبول باقي أكبر من أو يساوي المقسوم عليه.',
        correction: 'تحقق دائمًا من شرط الباقي.',
        quickQ: 'في $$96:13$$ مع $$13\cdot7=91$$ ما الباقي؟',
        quickA: '$$5$$',
        lab: 'الأداة 6',
        mission: 'المستوى 2 - المسألة 2',
        game: 'اللعبة 3'
    },
    {
        title: 'العمليات المركبة والأقواس',
        objective: 'تطبيق ترتيب العمليات بشكل صحيح.',
        keyIdea: 'الأقواس ثم الضرب/القسمة ثم الجمع/الطرح.',
        example: '$$26 - 5\cdot(2+3) + 6 = 7$$.',
        typicalError: 'الحل من اليسار لليمين دون أولوية.',
        correction: 'حدد العمليات ذات الأولوية أولًا.',
        quickQ: '$$15 - 10:5$$?',
        quickA: '$$13$$',
        lab: 'الأداة 7 و8',
        mission: 'المستوى 2 - المسألة 3',
        game: 'اللعبة 2'
    },
    {
        title: 'حل المسائل بالأعداد الطبيعية',
        objective: 'النمذجة والحساب والتحقق في سياق واقعي.',
        keyIdea: 'ليس الحساب فقط، بل تبرير النموذج أيضًا.',
        example: '$$200\cdot7\cdot5\cdot2 = 14,000$$ يورو.',
        typicalError: 'اختيار العمليات من كلمات منفصلة فقط.',
        correction: 'اربط بين المعطيات والوحدات والهدف.',
        quickQ: 'ما نموذج $$250$$ كغ في صناديق $$10$$ كغ؟',
        quickA: '$$250:10$$',
        lab: 'الأداة 5 و6 و8',
        mission: 'كل المستويات',
        game: 'اللعبة 2 و3'
    }
]

function withMeta(cards: Omit<TheoryCard, 'id' | 'icon' | 'color'>[]): TheoryCard[] {
    return cards.map((card, index) => ({ ...card, ...COMMON_META[index] }))
}

const CONTENT: Record<Lang, TheoryCopy> = {
    es: {
        title: 'Teoria: Numeros naturales (1 ESO)',
        subtitle: 'Sistema decimal, aproximacion y operaciones',
        description: '10 tarjetas conectadas con laboratorio, erronkak y jokuak.',
        cards: withMeta(ES_CARDS),
        labels: {
            objective: 'Objetivo',
            keyIdea: 'Idea clave',
            example: 'Ejemplo',
            typicalError: 'Error tipico',
            correction: 'Correccion',
            answer: 'Respuesta',
            lab: 'LABORATORIO',
            mission: 'ERRONKAK',
            game: 'JOKUAK'
        },
        coherenceTitle: 'Mapa de coherencia del tema',
        coherenceRows: [
            { central: 'Tarjetas 1-2', reinforces: 'Herramientas 1-2 y Juego 1', connection: 'Valor posicional y lectura.' },
            { central: 'Tarjetas 3-4', reinforces: 'Herramienta 3 y Nivel 1', connection: 'Comparacion y numeros grandes.' },
            { central: 'Tarjeta 5', reinforces: 'Herramienta 4', connection: 'Redondeo y eleccion de orden.' },
            { central: 'Tarjetas 6-8', reinforces: 'Herramientas 5-6 y Juego 3', connection: 'Operaciones y division entera.' },
            { central: 'Tarjetas 9-10', reinforces: 'Herramientas 7-8 y Juego 2', connection: 'Jerarquia y modelizacion.' }
        ],
        qualityTitle: 'Revision final de calidad',
        qualityItems: [
            'Rigor: $$D=d\cdot c+r$$ y $$0 \le r < d$$.',
            'Progresion: de numeracion a resolucion de problemas.',
            'Cobertura completa del tema de naturales.',
            'Alineacion entre teoria, laboratorio, erronkak y jokuak.'
        ]
    },
    eu: {
        title: 'Teoria: zenbaki naturalak (DBH 1)',
        subtitle: 'Sistema hamartarra, hurbilketa eta eragiketak',
        description: '10 txartel, laborategi, erronkak eta jokuakekin lotuta.',
        cards: withMeta(EU_CARDS),
        labels: {
            objective: 'Helburua',
            keyIdea: 'Ideia nagusia',
            example: 'Adibidea',
            typicalError: 'Akats tipikoa',
            correction: 'Zuzenketa',
            answer: 'Erantzuna',
            lab: 'LABORATEGIA',
            mission: 'ERRONKAK',
            game: 'JOKUAK'
        },
        coherenceTitle: 'Gaiaren koherentzia-mapa',
        coherenceRows: [
            { central: '1-2 txartelak', reinforces: '1-2 tresnak eta 1. jokoa', connection: 'Balio posizionala eta irakurketa.' },
            { central: '3-4 txartelak', reinforces: '3. tresna eta 1. maila', connection: 'Konparaketa eta zenbaki handiak.' },
            { central: '5. txartela', reinforces: '4. tresna', connection: 'Biribiltzea eta ordena.' },
            { central: '6-8 txartelak', reinforces: '5-6 tresnak eta 3. jokoa', connection: 'Eragiketak eta zatiketa osoa.' },
            { central: '9-10 txartelak', reinforces: '7-8 tresnak eta 2. jokoa', connection: 'Hierarkia eta modelizazioa.' }
        ],
        qualityTitle: 'Azken kalitate-berrikuspena',
        qualityItems: [
            'Zorroztasuna: $$D=d\cdot c+r$$ eta $$0 \le r < d$$.',
            'Aurrerapena: numeraziotik problemen ebazpenera.',
            'Zenbaki naturalen gaia osorik estalita.',
            'Teoria, laborategia, erronkak eta jokuak lerrokatuta.'
        ]
    },
    ar: {
        title: 'النظرية: الأعداد الطبيعية (1 ESO)',
        subtitle: 'النظام العشري، التقريب والعمليات',
        description: '10 بطاقات مترابطة مع المختبر والتحديات والألعاب.',
        cards: withMeta(AR_CARDS),
        labels: {
            objective: 'الهدف',
            keyIdea: 'الفكرة الأساسية',
            example: 'مثال',
            typicalError: 'خطأ شائع',
            correction: 'التصحيح',
            answer: 'الإجابة',
            lab: 'المختبر',
            mission: 'التحديات',
            game: 'الألعاب'
        },
        coherenceTitle: 'خريطة ترابط الوحدة',
        coherenceRows: [
            { central: 'البطاقات 1-2', reinforces: 'الأدوات 1-2 واللعبة 1', connection: 'القيمة المكانية والقراءة.' },
            { central: 'البطاقات 3-4', reinforces: 'الأداة 3 والمستوى 1', connection: 'المقارنة والأعداد الكبيرة.' },
            { central: 'البطاقة 5', reinforces: 'الأداة 4', connection: 'التقريب واختيار المرتبة.' },
            { central: 'البطاقات 6-8', reinforces: 'الأدوات 5-6 واللعبة 3', connection: 'العمليات والقسمة الإقليدية.' },
            { central: 'البطاقات 9-10', reinforces: 'الأدوات 7-8 واللعبة 2', connection: 'ترتيب العمليات والنمذجة.' }
        ],
        qualityTitle: 'مراجعة الجودة النهائية',
        qualityItems: [
            'الدقة الرياضية: $$D=d\cdot c+r$$ و $$0 \le r < d$$.',
            'تدرج واضح من الترقيم إلى حل المسائل.',
            'تغطية كاملة لموضوع الأعداد الطبيعية.',
            'ترابط واضح بين النظرية والمختبر والتحديات والألعاب.'
        ]
    }
}

export function TheoryPage() {
    const { i18n } = useTranslation()
    const lang = resolveLang(i18n.language)
    const copy = useMemo(() => CONTENT[lang], [lang])
    const [expanded, setExpanded] = useState<string | null>(null)

    return (
        <div className="theory-page zenbaki-naturalak-theory" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <div className="container">
                <header className="theory-header">
                    <h1>{copy.title}</h1>
                    <p className="theory-subtitle">{copy.subtitle}</p>
                    <p className="theory-description">{copy.description}</p>
                </header>

                <div className="theory-grid">
                    {copy.cards.map((card) => (
                        <div
                            key={card.id}
                            className={`theory-card ${expanded === card.id ? 'expanded' : ''}`}
                            style={{ '--card-color': card.color } as React.CSSProperties}
                            onClick={() => setExpanded((value) => (value === card.id ? null : card.id))}
                        >
                            <div className="card-header">
                                <span className="card-icon">{card.icon}</span>
                                <h3 className="card-title">{card.title}</h3>
                                <span className="card-toggle">{expanded === card.id ? '−' : '+'}</span>
                            </div>

                            <div className={`card-content ${expanded === card.id ? 'visible' : ''}`}>
                                <div className="content-section">
                                    <h4>{copy.labels.objective}</h4>
                                    <p><MathText text={card.objective} /></p>
                                    <h4>{copy.labels.keyIdea}</h4>
                                    <p><MathText text={card.keyIdea} /></p>
                                    <h4>{copy.labels.example}</h4>
                                    <div className="formula-box highlight">
                                        <p><MathText text={card.example} /></p>
                                    </div>

                                    <div className="warning-box">
                                        <strong>{copy.labels.typicalError}:</strong>
                                        <p><MathText text={card.typicalError} /></p>
                                        <strong>{copy.labels.correction}:</strong>
                                        <p><MathText text={card.correction} /></p>
                                    </div>

                                    <div className="quick-check-grid">
                                        <div className="quick-check-card">
                                            <p className="quick-question"><MathText text={card.quickQ} /></p>
                                            <p className="quick-answer">✅ {copy.labels.answer}: <MathText text={card.quickA} /></p>
                                        </div>
                                    </div>

                                    <div className="connections-grid">
                                        <div className="connection-card">
                                            <h5>{copy.labels.lab}</h5>
                                            <p><MathText text={card.lab} /></p>
                                        </div>
                                        <div className="connection-card">
                                            <h5>{copy.labels.mission}</h5>
                                            <p><MathText text={card.mission} /></p>
                                        </div>
                                        <div className="connection-card">
                                            <h5>{copy.labels.game}</h5>
                                            <p><MathText text={card.game} /></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <section className="coherence-map">
                    <h2>🧭 {copy.coherenceTitle}</h2>
                    <div className="coherence-grid">
                        {copy.coherenceRows.map((row) => (
                            <article className="coherence-card" key={row.central}>
                                <h3>{row.central}</h3>
                                <p>{row.reinforces}</p>
                                <p>{row.connection}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="quality-review">
                    <h2>✅ {copy.qualityTitle}</h2>
                    <ul>
                        {copy.qualityItems.map((item) => (
                            <li key={item}><MathText text={item} /></li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    )
}
