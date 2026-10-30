import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zenbaki naturalak games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star.
   ========================================================================== */

export type NaturalsGameId = 'race' | 'hunt' | 'sprint' | 'memory'

export const NATURALS_GAME_RECORDS_KEY = 'matella-zenbaki-naturalak-dbh1-game-records'

export const naturalsGames: GameInfo<NaturalsGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Zenbaki naturalen lasterketa', es: 'Carrera de números naturales', en: 'Natural number race', ar: 'سباق الأعداد الطبيعية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 3101, stage: 'numbering', title: { eu: 'Sistema hamartarra', es: 'Sistema decimal', en: 'Decimal system', ar: 'النظام العشري' }, description: { eu: 'Zifren balioa, deskonposizioak eta erromatarrak.', es: 'Valor de las cifras, descomposiciones y romanos.', en: 'Digit values, expanded forms and Roman numerals.', ar: 'قيمة الأرقام والتفكيك والأرقام الرومانية.' } },
            { progressId: 3102, stage: 'rounding', title: { eu: 'Biribiltzea', es: 'Redondeo', en: 'Rounding', ar: 'التقريب' }, description: { eu: 'Gora ala behera? Eta zein ordenatara?', es: '¿Hacia arriba o hacia abajo? ¿Y a qué orden?', en: 'Up or down? And to which place value?', ar: 'إلى الأعلى أم الأسفل؟ وإلى أي مرتبة؟' } },
            { progressId: 3103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Falta den terminoa, hondarra eta buruzko kalkulua.', es: 'El término que falta, el resto y cálculo mental.', en: 'The missing term, the remainder and mental arithmetic.', ar: 'الحد الناقص والباقي والحساب الذهني.' } },
            { progressId: 3104, stage: 'combined', title: { eu: 'Hierarkia', es: 'Jerarquía', en: 'Order of operations', ar: 'الأولوية' }, description: { eu: 'Semaforoa eta buruketa laburrak.', es: 'El semáforo y problemas cortos.', en: 'The traffic light and short problems.', ar: 'إشارة المرور ومسائل قصيرة.' } },
            { progressId: 3105, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'Ez biderkatu oinarria eta berretzailea!', es: '¡No multipliques base por exponente!', en: 'Don\'t multiply the base by the exponent!', ar: 'لا تضرب الأساس في الأس!' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Zenbaki-ehiza', es: 'Caza de números', en: 'Number hunt', ar: 'صيد الأعداد' },
        tagline: { eu: 'Sakatu baldintza betetzen duten zenbaki guztiak, ahalik eta azkarren eta hutsik egin gabe.', es: 'Pulsa todos los números que cumplen la condición, lo más rápido posible y sin fallar.', en: 'Press all the numbers that meet the condition, as fast as possible and without making any mistakes.', ar: 'اضغط كل الأعداد التي تحقق الشرط بأسرع ما يمكن ودون خطأ.' },
        skills: { eu: 'Posizioa, biribiltzea eta karratuak', es: 'Posición, redondeo y cuadrados', en: 'Place value, rounding and squares', ar: 'الموقع والتقريب والمربعات' },
        levels: [
            { progressId: 3201, stage: 'numbering', title: { eu: 'Zifraren balioa', es: 'El valor de la cifra', en: 'The value of the digit', ar: 'قيمة الرقم' }, description: { eu: '«7 zifrak 700 balio du»: kontuz beste posizioetako 7ekin.', es: '«La cifra 7 vale 700»: cuidado con los 7 de otras posiciones.', en: '‘The digit 7 is worth 700’: watch out for the 7s in other positions.', ar: '«قيمة الرقم 7 هي 700»: انتبه للسبعات في مواقع أخرى.' } },
            { progressId: 3202, stage: 'rounding', title: { eu: 'Biribiltzea', es: 'Redondeo', en: 'Rounding', ar: 'التقريب' }, description: { eu: 'Zein zenbakik ematen du 25.000 milakoetara biribiltzean?', es: '¿Qué números dan 25.000 al redondear a los millares?', en: 'Which numbers give 25,000 when rounded to the nearest thousand?', ar: 'أي الأعداد تعطي 25.000 عند التقريب إلى الآلاف؟' } },
            { progressId: 3203, stage: 'powers', title: { eu: 'Karratuak eta kuboak', es: 'Cuadrados y cubos', en: 'Squares and cubes', ar: 'المربعات والمكعبات' }, description: { eu: '49 = 7², baina 50 ez.', es: '49 = 7², pero 50 no.', en: '49 = 7², but 50 isn\'t.', ar: '49 = 7²، أما 50 فلا.' } }
        ]
    },
    {
        id: 'sprint',
        title: { eu: 'Semaforo-sprinta', es: 'Sprint del semáforo', en: 'Traffic light sprint', ar: 'سباق إشارة المرور' },
        tagline: { eu: 'Sakatu eragiketak egin behar diren ordenan. Kalkulua makinak egiten du; zuk ordena asmatu, erlojuaren aurka!', es: 'Pulsa las operaciones en el orden en que hay que hacerlas. La máquina calcula; tú aciertas el orden, ¡contra el reloj!', en: 'Press the operations in the order you need to do them. The machine does the calculating; you get the order right, against the clock!', ar: 'اضغط العمليات بالترتيب الذي يجب إجراؤها به. الآلة تحسب وأنت تختار الترتيب، ضد الساعة!' },
        skills: { eu: 'Eragiketen hierarkia', es: 'Jerarquía de las operaciones', en: 'Order of operations', ar: 'أولوية العمليات' },
        levels: [
            { progressId: 3301, stage: 'combined', title: { eu: 'Parentesirik gabe', es: 'Sin paréntesis', en: 'Without brackets', ar: 'دون أقواس' }, description: { eu: 'Horia berdearen aurretik.', es: 'El amarillo antes que el verde.', en: 'Yellow comes before green.', ar: 'الأصفر قبل الأخضر.' } },
            { progressId: 3302, stage: 'combined', title: { eu: 'Parentesiekin', es: 'Con paréntesis', en: 'With brackets', ar: 'مع الأقواس' }, description: { eu: 'Gorria lehenik.', es: 'Primero el rojo.', en: 'Red first.', ar: 'الأحمر أولًا.' } },
            { progressId: 3303, stage: 'combined', title: { eu: 'Kako zuzenekin', es: 'Con corchetes', en: 'With square brackets', ar: 'مع الأقواس المعقوفة' }, description: { eu: 'Barrutik kanpora: ( ) eta gero [ ].', es: 'De dentro hacia fuera: ( ) y luego [ ].', en: 'From the inside out: ( ) and then [ ].', ar: 'من الداخل إلى الخارج: ( ) ثم [ ].' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak. Kontuz tranpekin: IX eta XI, 2³ eta 3², 3.402 eta 3.042…', es: 'Encuentra las cartas que valen lo mismo. Cuidado con las trampas: IX y XI, 2³ y 3², 3.402 y 3.042…', en: 'Find the cards that are worth the same. Watch out for traps: IX and XI, 2³ and 3², 3,402 and 3,042…', ar: 'جد البطاقات ذات القيمة نفسها. احذر الفخاخ: IX وXI، 2³ و3²، 3.402 و3.042…' },
        skills: { eu: 'Erromatarrak, berreturak eta deskonposizioak', es: 'Romanos, potencias y descomposiciones', en: 'Roman numerals, powers and expanded forms', ar: 'الأرقام الرومانية والقوى والتفكيك' },
        levels: [
            { progressId: 3401, stage: 'numbering', title: { eu: 'Erromatarrak', es: 'Romanos', en: 'Roman numerals', ar: 'الأرقام الرومانية' }, description: { eu: '6 bikote: XL ↔ 40, eta LX ↔ 60 ere bai.', es: '6 parejas: XL ↔ 40, y también LX ↔ 60.', en: '6 pairs: XL ↔ 40, and also LX ↔ 60.', ar: '6 أزواج: XL ↔ 40، وأيضًا LX ↔ 60.' } },
            { progressId: 3402, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '6 bikote: 2⁵ ↔ 32, eta 5² ↔ 25 ere bai.', es: '6 parejas: 2⁵ ↔ 32, y también 5² ↔ 25.', en: '6 pairs: 2⁵ ↔ 32, and also 5² ↔ 25.', ar: '6 أزواج: 2⁵ ↔ 32، وأيضًا 5² ↔ 25.' } },
            { progressId: 3403, stage: 'numbering', title: { eu: 'Hirukoteak', es: 'Tríos', en: 'Trios', ar: 'ثلاثيات' }, description: { eu: 'Zenbakia, deskonposizioa eta 10en berreturak.', es: 'Número, descomposición y potencias de 10.', en: 'Number, expanded form and powers of 10.', ar: 'العدد والتفكيك وقوى العدد 10.' } }
        ]
    }
]

export const naturalsGameProgressIds: number[] = levelProgressIds(naturalsGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const naturalsGameSlugs: Record<NaturalsGameId, string> = { race: 'lasterketa', hunt: 'ehiza', sprint: 'semaforoa', memory: 'memoria' }

export function naturalsGameModeForPath(pathname: string): NaturalsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['caza', 'ehiza'].includes(game)) return 'hunt'
    if (['semaforo', 'semaforoa', 'sprint'].includes(game)) return 'sprint'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
