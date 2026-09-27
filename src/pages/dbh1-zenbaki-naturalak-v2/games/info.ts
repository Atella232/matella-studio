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
        title: { eu: 'Zenbaki naturalen lasterketa', es: 'Carrera de números naturales', ar: 'سباق الأعداد الطبيعية' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 3101, stage: 'numbering', title: { eu: 'Sistema hamartarra', es: 'Sistema decimal', ar: 'النظام العشري' }, description: { eu: 'Zifren balioa, deskonposizioak eta erromatarrak.', es: 'Valor de las cifras, descomposiciones y romanos.', ar: 'قيمة الأرقام والتفكيك والأرقام الرومانية.' } },
            { progressId: 3102, stage: 'rounding', title: { eu: 'Biribiltzea', es: 'Redondeo', ar: 'التقريب' }, description: { eu: 'Gora ala behera? Eta zein ordenatara?', es: '¿Hacia arriba o hacia abajo? ¿Y a qué orden?', ar: 'إلى الأعلى أم الأسفل؟ وإلى أي مرتبة؟' } },
            { progressId: 3103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', ar: 'العمليات' }, description: { eu: 'Falta den terminoa, hondarra eta buruzko kalkulua.', es: 'El término que falta, el resto y cálculo mental.', ar: 'الحد الناقص والباقي والحساب الذهني.' } },
            { progressId: 3104, stage: 'combined', title: { eu: 'Hierarkia', es: 'Jerarquía', ar: 'الأولوية' }, description: { eu: 'Semaforoa eta buruketa laburrak.', es: 'El semáforo y problemas cortos.', ar: 'إشارة المرور ومسائل قصيرة.' } },
            { progressId: 3105, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' }, description: { eu: 'Ez biderkatu oinarria eta berretzailea!', es: '¡No multipliques base por exponente!', ar: 'لا تضرب الأساس في الأس!' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Zenbaki-ehiza', es: 'Caza de números', ar: 'صيد الأعداد' },
        tagline: { eu: 'Sakatu baldintza betetzen duten zenbaki guztiak, ahalik eta azkarren eta hutsik egin gabe.', es: 'Pulsa todos los números que cumplen la condición, lo más rápido posible y sin fallar.', ar: 'اضغط كل الأعداد التي تحقق الشرط بأسرع ما يمكن ودون خطأ.' },
        skills: { eu: 'Posizioa, biribiltzea eta karratuak', es: 'Posición, redondeo y cuadrados', ar: 'الموقع والتقريب والمربعات' },
        levels: [
            { progressId: 3201, stage: 'numbering', title: { eu: 'Zifraren balioa', es: 'El valor de la cifra', ar: 'قيمة الرقم' }, description: { eu: '«7 zifrak 700 balio du»: kontuz beste posizioetako 7ekin.', es: '«La cifra 7 vale 700»: cuidado con los 7 de otras posiciones.', ar: '«قيمة الرقم 7 هي 700»: انتبه للسبعات في مواقع أخرى.' } },
            { progressId: 3202, stage: 'rounding', title: { eu: 'Biribiltzea', es: 'Redondeo', ar: 'التقريب' }, description: { eu: 'Zein zenbakik ematen du 25.000 milakoetara biribiltzean?', es: '¿Qué números dan 25.000 al redondear a los millares?', ar: 'أي الأعداد تعطي 25.000 عند التقريب إلى الآلاف؟' } },
            { progressId: 3203, stage: 'powers', title: { eu: 'Karratuak eta kuboak', es: 'Cuadrados y cubos', ar: 'المربعات والمكعبات' }, description: { eu: '49 = 7², baina 50 ez.', es: '49 = 7², pero 50 no.', ar: '49 = 7²، أما 50 فلا.' } }
        ]
    },
    {
        id: 'sprint',
        title: { eu: 'Semaforo-sprinta', es: 'Sprint del semáforo', ar: 'سباق إشارة المرور' },
        tagline: { eu: 'Sakatu eragiketak egin behar diren ordenan. Kalkulua makinak egiten du; zuk ordena asmatu, erlojuaren aurka!', es: 'Pulsa las operaciones en el orden en que hay que hacerlas. La máquina calcula; tú aciertas el orden, ¡contra el reloj!', ar: 'اضغط العمليات بالترتيب الذي يجب إجراؤها به. الآلة تحسب وأنت تختار الترتيب، ضد الساعة!' },
        skills: { eu: 'Eragiketen hierarkia', es: 'Jerarquía de las operaciones', ar: 'أولوية العمليات' },
        levels: [
            { progressId: 3301, stage: 'combined', title: { eu: 'Parentesirik gabe', es: 'Sin paréntesis', ar: 'دون أقواس' }, description: { eu: 'Horia berdearen aurretik.', es: 'El amarillo antes que el verde.', ar: 'الأصفر قبل الأخضر.' } },
            { progressId: 3302, stage: 'combined', title: { eu: 'Parentesiekin', es: 'Con paréntesis', ar: 'مع الأقواس' }, description: { eu: 'Gorria lehenik.', es: 'Primero el rojo.', ar: 'الأحمر أولًا.' } },
            { progressId: 3303, stage: 'combined', title: { eu: 'Kako zuzenekin', es: 'Con corchetes', ar: 'مع الأقواس المعقوفة' }, description: { eu: 'Barrutik kanpora: ( ) eta gero [ ].', es: 'De dentro hacia fuera: ( ) y luego [ ].', ar: 'من الداخل إلى الخارج: ( ) ثم [ ].' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera duten kartak. Kontuz tranpekin: IX eta XI, 2³ eta 3², 3.402 eta 3.042…', es: 'Encuentra las cartas que valen lo mismo. Cuidado con las trampas: IX y XI, 2³ y 3², 3.402 y 3.042…', ar: 'جد البطاقات ذات القيمة نفسها. احذر الفخاخ: IX وXI، 2³ و3²، 3.402 و3.042…' },
        skills: { eu: 'Erromatarrak, berreturak eta deskonposizioak', es: 'Romanos, potencias y descomposiciones', ar: 'الأرقام الرومانية والقوى والتفكيك' },
        levels: [
            { progressId: 3401, stage: 'numbering', title: { eu: 'Erromatarrak', es: 'Romanos', ar: 'الأرقام الرومانية' }, description: { eu: '6 bikote: XL ↔ 40, eta LX ↔ 60 ere bai.', es: '6 parejas: XL ↔ 40, y también LX ↔ 60.', ar: '6 أزواج: XL ↔ 40، وأيضًا LX ↔ 60.' } },
            { progressId: 3402, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' }, description: { eu: '6 bikote: 2⁵ ↔ 32, eta 5² ↔ 25 ere bai.', es: '6 parejas: 2⁵ ↔ 32, y también 5² ↔ 25.', ar: '6 أزواج: 2⁵ ↔ 32، وأيضًا 5² ↔ 25.' } },
            { progressId: 3403, stage: 'numbering', title: { eu: 'Hirukoteak', es: 'Tríos', ar: 'ثلاثيات' }, description: { eu: 'Zenbakia, deskonposizioa eta 10en berreturak.', es: 'Número, descomposición y potencias de 10.', ar: 'العدد والتفكيك وقوى العدد 10.' } }
        ]
    }
]

export const naturalsGameProgressIds: number[] = levelProgressIds(naturalsGames)

export function naturalsGameModeForPath(pathname: string): NaturalsGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['caza', 'ehiza'].includes(game)) return 'hunt'
    if (['semaforo', 'semaforoa', 'sprint'].includes(game)) return 'sprint'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
