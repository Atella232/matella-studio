import type { LocalizedText } from '../dbh2-ekuazioak/content'

export type PrototypeSection = 'route' | 'learn' | 'lab' | 'practice' | 'challenges' | 'games'
export type LearningStageId = 'meaning' | 'linear' | 'complex' | 'problems' | 'quadratic'

export interface LearningStage {
    id: LearningStageId
    number: string
    icon: string
    title: LocalizedText
    eyebrow: LocalizedText
    description: LocalizedText
    objective: LocalizedText
    explanation: LocalizedText
    example: LocalizedText
    steps: LocalizedText[]
    practiceIds: number[]
}

export interface GuidedPracticeItem {
    id: number
    stage: LearningStageId
    difficulty: 'easy' | 'medium' | 'hard'
    prompt: LocalizedText
    answers: string[]
    success: LocalizedText
    help: LocalizedText
    solution: LocalizedText
}

const t = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })

export const prototypeSections: Array<{ id: PrototypeSection; icon: string; label: LocalizedText }> = [
    { id: 'route', icon: '⌂', label: t('Nire ibilbidea', 'Mi recorrido', 'مساري') },
    { id: 'learn', icon: '◫', label: t('Ikasi', 'Aprende', 'تعلّم') },
    { id: 'lab', icon: '⚖', label: t('Laborategia', 'Laboratorio', 'المختبر') },
    { id: 'practice', icon: '✎', label: t('Praktikatu', 'Practica', 'تدرّب') },
    { id: 'challenges', icon: '◆', label: t('Erronkak', 'Retos', 'التحديات') },
    { id: 'games', icon: '★', label: t('Jokoak', 'Juegos', 'الألعاب') }
]

export const learningStages: LearningStage[] = [
    {
        id: 'meaning',
        number: '01',
        icon: '=',
        eyebrow: t('Oinarria', 'El punto de partida', 'نقطة البداية'),
        title: t('Berdintasuna ulertu', 'Comprende la igualdad', 'افهم المساواة'),
        description: t('Ekuazioak bi adierazpenen arteko oreka dira.', 'Una ecuación expresa el equilibrio entre dos expresiones.', 'المعادلة تعبّر عن توازن بين عبارتين.'),
        objective: t('Soluzio bat ordezkapenaren bidez egiaztatzea.', 'Comprobar una solución mediante sustitución.', 'التحقق من الحل بالتعويض.'),
        explanation: t('Berdin zeinuak bi aldeek balio bera dutela dio. Soluzio batek berdintasuna egia bihurtzen du.', 'El signo igual afirma que ambos miembros tienen el mismo valor. Una solución es un valor que hace verdadera esa igualdad.', 'تعني إشارة المساواة أن للطرفين القيمة نفسها. الحل قيمة تجعل المساواة صحيحة.'),
        example: t('$$2x+3=11\\quad x=4\\Rightarrow2\\cdot4+3=11$$', '$$2x+3=11\\quad x=4\\Rightarrow2\\cdot4+3=11$$', '$$2x+3=11\\quad x=4\\Rightarrow2\\cdot4+3=11$$'),
        steps: [
            t('Ezezaguna eta bi kideak identifikatu.', 'Identifica la incógnita y los dos miembros.', 'حدّد المجهول والطرفين.'),
            t('Proposatutako balioa ordezkatu.', 'Sustituye el valor propuesto.', 'عوّض بالقيمة المقترحة.'),
            t('Bi aldeak bereizita kalkulatu.', 'Calcula por separado ambos lados.', 'احسب الطرفين كلّاً على حدة.')
        ],
        practiceIds: [1, 2]
    },
    {
        id: 'linear',
        number: '02',
        icon: 'x',
        eyebrow: t('Lehen maila', 'Primer grado', 'الدرجة الأولى'),
        title: t('Ezezaguna askatu', 'Despeja sin perder el equilibrio', 'اعزل المجهول مع الحفاظ على التوازن'),
        description: t('Eragiketa bera bi aldeetan, pausoz pauso.', 'La misma operación en ambos miembros, paso a paso.', 'العملية نفسها في الطرفين، خطوة بخطوة.'),
        objective: t('$ax+b=c$ motako ekuazioak ebaztea eta egiaztatzea.', 'Resolver y comprobar ecuaciones del tipo $ax+b=c$.', 'حل معادلات من الشكل $ax+b=c$ والتحقق منها.'),
        explanation: t('Ezezaguna bakarrik uzteko, eragiketak alderantzizko ordenan desegiten ditugu. Egindako aldaketa bakoitza bi aldeetan aplikatzen da.', 'Para dejar sola la incógnita, deshacemos las operaciones en orden inverso. Cada cambio se aplica en los dos miembros.', 'لعزل المجهول نعكس العمليات بالترتيب، ونطبق كل تغيير على الطرفين.'),
        example: t('$$3x-4=11\\Rightarrow3x=15\\Rightarrow x=5$$', '$$3x-4=11\\Rightarrow3x=15\\Rightarrow x=5$$', '$$3x-4=11\\Rightarrow3x=15\\Rightarrow x=5$$'),
        steps: [
            t('Gehitu 4 bi aldeetan.', 'Suma 4 en ambos miembros.', 'أضف 4 إلى الطرفين.'),
            t('Zatitu bi aldeak 3rekin.', 'Divide ambos miembros entre 3.', 'اقسم الطرفين على 3.'),
            t('$x=5$ jatorrizko ekuazioan egiaztatu.', 'Comprueba $x=5$ en la ecuación original.', 'تحقق من $x=5$ في المعادلة الأصلية.')
        ],
        practiceIds: [3, 4]
    },
    {
        id: 'complex',
        number: '03',
        icon: '( )',
        eyebrow: t('Egitura', 'Más estructura', 'بنية أكثر'),
        title: t('Parentesiak eta izendatzaileak', 'Paréntesis y denominadores', 'الأقواس والمقامات'),
        description: t('Lehenik sinplifikatu; gero oreka mantendu.', 'Primero simplifica; después conserva el equilibrio.', 'بسّط أولاً ثم حافظ على التوازن.'),
        objective: t('Banatze-propietatea eta m.k.t. zuzen erabiltzea.', 'Usar correctamente la distributiva y el m.c.m.', 'استخدام خاصية التوزيع والمضاعف المشترك الأصغر.'),
        explanation: t('Parentesiak banatu daitezke, eta izendatzaileak m.k.t.-arekin kendu. Helburua ekuazio lineal argiago bat lortzea da.', 'Los paréntesis pueden desarrollarse y los denominadores eliminarse con el m.c.m. El objetivo es obtener una ecuación lineal más clara.', 'يمكن فك الأقواس وإزالة المقامات بالمضاعف المشترك الأصغر للحصول على معادلة خطية أوضح.'),
        example: t('$$\\frac{x}{2}+\\frac{x-3}{3}=5\\Rightarrow3x+2x-6=30\\Rightarrow x=\\frac{36}{5}$$', '$$\\frac{x}{2}+\\frac{x-3}{3}=5\\Rightarrow3x+2x-6=30\\Rightarrow x=\\frac{36}{5}$$', '$$\\frac{x}{2}+\\frac{x-3}{3}=5\\Rightarrow3x+2x-6=30\\Rightarrow x=\\frac{36}{5}$$'),
        steps: [
            t('Sinplifikatzeko estrategia aukeratu.', 'Elige una estrategia para simplificar.', 'اختر استراتيجية للتبسيط.'),
            t('Zeinuak arretaz landu.', 'Vigila especialmente los signos.', 'انتبه جيداً للإشارات.'),
            t('Emaitza ordezkapen bidez egiaztatu.', 'Verifica el resultado por sustitución.', 'تحقق من النتيجة بالتعويض.')
        ],
        practiceIds: [5, 6]
    },
    {
        id: 'problems',
        number: '04',
        icon: '?',
        eyebrow: t('Modelizazioa', 'Modelización', 'النمذجة'),
        title: t('Testutik ekuaziora', 'Del texto a la ecuación', 'من النص إلى المعادلة'),
        description: t('Egoera bat aljebra bihurtu eta erantzuna testuinguruan eman.', 'Convierte una situación en álgebra y responde en su contexto.', 'حوّل الموقف إلى جبر وأجب ضمن سياقه.'),
        objective: t('Ezezaguna definitu, ekuazioa planteatu eta emaitza interpretatu.', 'Definir la incógnita, plantear la ecuación e interpretar el resultado.', 'تحديد المجهول وصياغة المعادلة وتفسير النتيجة.'),
        explanation: t('Problemaren datuak ez dira zuzenean kalkulu bat: lehenik zer den $x$ esan, erlazioa idatzi eta amaieran unitateekin erantzun.', 'Los datos del problema no son todavía una operación: primero define qué representa $x$, escribe la relación y termina respondiendo con unidades.', 'معطيات المسألة ليست عملية جاهزة: عرّف أولاً ما يمثله $x$، ثم اكتب العلاقة وأجب بالوحدات.'),
        example: t('Luzera $x+3$ eta zabalera $x$: $$2x+2(x+3)=30\\Rightarrow x=6$$', 'Largo $x+3$ y ancho $x$: $$2x+2(x+3)=30\\Rightarrow x=6$$', 'الطول $x+3$ والعرض $x$: $$2x+2(x+3)=30\\Rightarrow x=6$$'),
        steps: [
            t('Idatzi: “$x$ ... da”.', 'Escribe: “$x$ representa…”.', 'اكتب: «يمثّل $x$…».'),
            t('Datu bakoitza adierazpen bihurtu.', 'Convierte cada dato en una expresión.', 'حوّل كل معطى إلى عبارة.'),
            t('Ebatzi, egiaztatu eta unitateekin erantzun.', 'Resuelve, comprueba y responde con unidades.', 'حل وتحقق وأجب بالوحدات.')
        ],
        practiceIds: [7]
    },
    {
        id: 'quadratic',
        number: '05',
        icon: 'x²',
        eyebrow: t('Zabaltzea', 'Ampliación', 'توسّع'),
        title: t('Bigarren mailako oinarriak', 'Bases del segundo grado', 'أساسيات الدرجة الثانية'),
        description: t('Faktorizazioa, biderkadura nulua eta diskriminatzailea.', 'Factorización, producto nulo y discriminante.', 'التحليل والجداء الصفري والمميّز.'),
        objective: t('Ekuazio sinpleak ebatzi eta soluzio kopurua interpretatu.', 'Resolver ecuaciones sencillas e interpretar el número de soluciones.', 'حل معادلات بسيطة وتفسير عدد الحلول.'),
        explanation: t('$uv=0$ bada, gutxienez faktoreetako bat 0 da. Ezin bada faktorizatu, formula orokorra erabil daiteke; diskriminatzaileak soluzio errealen kopurua azaltzen du.', 'Si $uv=0$, al menos uno de los factores vale 0. Cuando no se puede factorizar, puede usarse la fórmula general; el discriminante anticipa el número de soluciones reales.', 'إذا كان $uv=0$ فأحد العاملين على الأقل يساوي صفراً. وعند تعذر التحليل نستخدم القانون العام، ويحدد المميز عدد الحلول الحقيقية.'),
        example: t('$$x^2-5x+6=0\\Rightarrow(x-2)(x-3)=0\\Rightarrow x=2\\ \\text{edo}\\ x=3$$', '$$x^2-5x+6=0\\Rightarrow(x-2)(x-3)=0\\Rightarrow x=2\\ \\text{o}\\ x=3$$', '$$x^2-5x+6=0\\Rightarrow(x-2)(x-3)=0\\Rightarrow x=2\\ \\text{أو}\\ x=3$$'),
        steps: [
            t('Dena alde batera eraman.', 'Lleva todos los términos a un miembro.', 'انقل الحدود إلى طرف واحد.'),
            t('Faktorizatu ahal bada, biderkadura nulua erabili.', 'Si se puede factorizar, aplica el producto nulo.', 'إن أمكن التحليل فاستعمل الجداء الصفري.'),
            t('Bestela, formula eta diskriminatzailea erabili.', 'En otro caso, utiliza la fórmula y el discriminante.', 'وإلا فاستخدم القانون والمميّز.')
        ],
        practiceIds: [8]
    }
]

export const guidedPractice: GuidedPracticeItem[] = [
    { id: 1, stage: 'meaning', difficulty: 'easy', prompt: t('$x=4$ soluzioa al da $2x+1=9$ ekuazioan? Idatzi bai edo ez.', '¿Es $x=4$ solución de $2x+1=9$? Escribe sí o no.', 'هل $x=4$ حل للمعادلة $2x+1=9$؟ اكتب نعم أو لا.'), answers: ['bai', 'si', 'sí', 'yes', 'نعم'], success: t('Zuzena: bi aldeek 9 balio dute.', 'Correcto: ambos miembros valen 9.', 'صحيح: قيمة الطرفين 9.'), help: t('$x$ 4rekin ordezkatu.', 'Sustituye $x$ por 4.', 'عوّض $x$ بـ4.'), solution: t('$2\\cdot4+1=9$, beraz bai.', '$2\\cdot4+1=9$, por tanto sí.', '$2\\cdot4+1=9$، إذن نعم.') },
    { id: 2, stage: 'meaning', difficulty: 'easy', prompt: t('$3y-2=10$ ekuazioan zein da ezezaguna?', '¿Cuál es la incógnita en $3y-2=10$?', 'ما المجهول في $3y-2=10$؟'), answers: ['y'], success: t('Hori da: ezezaguna $y$ da.', 'Eso es: la incógnita es $y$.', 'صحيح: المجهول هو $y$.'), help: t('Bilatu letra.', 'Busca la letra.', 'ابحث عن الحرف.'), solution: t('$y$', '$y$', '$y$') },
    { id: 3, stage: 'linear', difficulty: 'easy', prompt: t('Ebatzi: $x+7=15$.', 'Resuelve: $x+7=15$.', 'حل: $x+7=15$.'), answers: ['8', 'x=8'], success: t('Ongi: $x=8$.', 'Bien: $x=8$.', 'جيد: $x=8$.'), help: t('Kendu 7 bi aldeetan.', 'Resta 7 en ambos miembros.', 'اطرح 7 من الطرفين.'), solution: t('$x+7-7=15-7\\Rightarrow x=8$', '$x+7-7=15-7\\Rightarrow x=8$', '$x+7-7=15-7\\Rightarrow x=8$') },
    { id: 4, stage: 'linear', difficulty: 'medium', prompt: t('Ebatzi: $5x-4=2x+11$.', 'Resuelve: $5x-4=2x+11$.', 'حل: $5x-4=2x+11$.'), answers: ['5', 'x=5'], success: t('Bikain: $x=5$.', 'Perfecto: $x=5$.', 'ممتاز: $x=5$.'), help: t('Kendu $2x$ eta gehitu 4 bi aldeetan.', 'Resta $2x$ y suma 4 en ambos miembros.', 'اطرح $2x$ وأضف 4 إلى الطرفين.'), solution: t('$3x-4=11\\Rightarrow3x=15\\Rightarrow x=5$', '$3x-4=11\\Rightarrow3x=15\\Rightarrow x=5$', '$3x-4=11\\Rightarrow3x=15\\Rightarrow x=5$') },
    { id: 5, stage: 'complex', difficulty: 'medium', prompt: t('Ebatzi: $3(x-2)=12$.', 'Resuelve: $3(x-2)=12$.', 'حل: $3(x-2)=12$.'), answers: ['6', 'x=6'], success: t('Zuzena: $x=6$.', 'Correcto: $x=6$.', 'صحيح: $x=6$.'), help: t('Lehenik zatitu bi aldeak 3rekin.', 'Primero divide ambos miembros entre 3.', 'اقسم الطرفين على 3 أولاً.'), solution: t('$x-2=4\\Rightarrow x=6$', '$x-2=4\\Rightarrow x=6$', '$x-2=4\\Rightarrow x=6$') },
    { id: 6, stage: 'complex', difficulty: 'hard', prompt: t('Ebatzi: $\\frac{x}{3}+\\frac{x}{6}=9$.', 'Resuelve: $\\frac{x}{3}+\\frac{x}{6}=9$.', 'حل: $\\frac{x}{3}+\\frac{x}{6}=9$.'), answers: ['18', 'x=18'], success: t('Oso ondo: $x=18$.', 'Muy bien: $x=18$.', 'أحسنت: $x=18$.'), help: t('Biderkatu ekuazio osoa 6rekin.', 'Multiplica toda la ecuación por 6.', 'اضرب المعادلة كلها في 6.'), solution: t('$2x+x=54\\Rightarrow3x=54\\Rightarrow x=18$', '$2x+x=54\\Rightarrow3x=54\\Rightarrow x=18$', '$2x+x=54\\Rightarrow3x=54\\Rightarrow x=18$') },
    { id: 7, stage: 'problems', difficulty: 'hard', prompt: t('Laukizuzen baten zabalera 6 m da eta luzera 3 m handiagoa. Zein da perimetroa?', 'Un rectángulo mide 6 m de ancho y 3 m más de largo. ¿Cuál es su perímetro?', 'عرض مستطيل 6 م وطوله أكبر بـ3 م. ما محيطه؟'), answers: ['30', '30m', '30 m'], success: t('Zuzena: 30 m.', 'Correcto: 30 m.', 'صحيح: 30 م.'), help: t('Luzera 9 m da; erabili $P=2l+2z$.', 'El largo es 9 m; utiliza $P=2l+2a$.', 'الطول 9 م؛ استخدم قانون المحيط.'), solution: t('$P=2\\cdot9+2\\cdot6=30\\text{ m}$', '$P=2\\cdot9+2\\cdot6=30\\text{ m}$', '$P=2\\cdot9+2\\cdot6=30\\text{ m}$') },
    { id: 8, stage: 'quadratic', difficulty: 'hard', prompt: t('Ebatzi: $x^2-9=0$. Idatzi bi soluzioak.', 'Resuelve: $x^2-9=0$. Escribe las dos soluciones.', 'حل: $x^2-9=0$. اكتب الحلين.'), answers: ['-3,3', '3,-3', '±3', '+-3', '3 y -3', '-3 y 3'], success: t('Zuzena: $x=-3$ eta $x=3$.', 'Correcto: $x=-3$ y $x=3$.', 'صحيح: $x=-3$ و$x=3$.'), help: t('$x^2=9$; erro karratuak bi zeinu ditu.', '$x^2=9$; la raíz cuadrada da dos signos.', '$x^2=9$؛ للجذر إشارتان.'), solution: t('$(x-3)(x+3)=0\\Rightarrow x=-3,3$', '$(x-3)(x+3)=0\\Rightarrow x=-3,3$', '$(x-3)(x+3)=0\\Rightarrow x=-3,3$') }
]
