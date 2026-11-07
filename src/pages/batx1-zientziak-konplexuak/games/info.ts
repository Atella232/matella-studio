import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Zenbaki konplexuak (Batxilergoa 1 · Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (where the affix falls, turn and
   stretch, hunt the roots), the detective, the race and the memory. Every
   id is in the block 104401–104899.
   ========================================================================== */

export type KonplexuakBatx1zGameId = 'race' | 'affix' | 'twist' | 'hunt' | 'detective' | 'memory'

export const KONPLEXUAK_BATX1Z_GAME_RECORDS_KEY = 'matella-konplexuak-batx1z-game-records'

export const konplexuakBatx1zGames: GameInfo<KonplexuakBatx1zGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Konplexuen lasterketa', es: 'Carrera de complejos', en: 'Complex numbers race', ar: 'سباق الأعداد المركبة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 104401, stage: 'binomial', title: { eu: 'Zenbaki berriak', es: 'Números nuevos', en: 'New numbers', ar: 'أعداد جديدة' }, description: { eu: 'Zatiak, aurkakoa eta konjokatua.', es: 'Partes, opuesto y conjugado.', en: 'Parts, opposite and conjugate.', ar: 'الأجزاء والمعاكس والمرافق.' } },
            { progressId: 104402, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Biderkadura, zatidura eta i zenbakiaren berreturak.', es: 'Producto, cociente y potencias de i.', en: 'Product, quotient and powers of i.', ar: 'الجداء والقسمة وقوى i.' } },
            { progressId: 104403, stage: 'polar', title: { eu: 'Forma polarra', es: 'Forma polar', en: 'Polar form', ar: 'الشكل القطبي' }, description: { eu: 'Modulua, argumentua eta zati erreala.', es: 'Módulo, argumento y parte real.', en: 'Modulus, argument and real part.', ar: 'الطويلة والعمدة والجزء الحقيقي.' } },
            { progressId: 104404, stage: 'turns', title: { eu: 'Birak eta berreturak', es: 'Giros y potencias', en: 'Turns and powers', ar: 'الدوران والقوى' }, description: { eu: 'Biderkadura, zatidura eta Moivre.', es: 'Producto, cociente y Moivre.', en: 'Product, quotient and De Moivre.', ar: 'الجداء والقسمة ودي موافر.' } },
            { progressId: 104405, stage: 'roots', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: 'Modulua, lehen argumentua eta zenbat erreal.', es: 'Módulo, primer argumento y cuántas reales.', en: 'Modulus, first argument and how many are real.', ar: 'الطويلة والعمدة الأولى وكم منها حقيقي.' } }
        ]
    },
    {
        id: 'affix',
        title: { eu: 'Non dago afixua?', es: '¿Dónde cae el afijo?', en: 'Where is the affix?', ar: 'أين تقع الصورة؟' },
        tagline: { eu: 'Zenbaki konplexu bat, era batera edo bestera idatzita: ukitu haren afixua planoan.', es: 'Un número complejo escrito de una forma u otra: toca su afijo en el plano.', en: 'A complex number written one way or another: tap its affix on the plane.', ar: 'عدد مركب مكتوب بشكل أو بآخر: المس صورته في المستوى.' },
        skills: { eu: 'Forma binomikoa, eragiketak eta forma polarra', es: 'Forma binómica, operaciones y forma polar', en: 'Binomial form, operations and polar form', ar: 'الشكل الجبري والعمليات والشكل القطبي' },
        levels: [
            { progressId: 104501, stage: 'binomial', title: { eu: 'Zenbakia eta haren islak', es: 'El número y sus reflejos', en: 'The number and its reflections', ar: 'العدد وانعكاساته' }, description: { eu: 'Aurkakoa eta konjokatua.', es: 'Opuesto y conjugado.', en: 'Opposite and conjugate.', ar: 'المعاكس والمرافق.' } },
            { progressId: 104502, stage: 'operations', title: { eu: 'Eragiketen emaitza', es: 'El resultado de una operación', en: 'The result of an operation', ar: 'نتيجة عملية' }, description: { eu: 'Batuketa, biderketa, karratua eta zatiketa.', es: 'Suma, producto, cuadrado y división.', en: 'Sum, product, square and division.', ar: 'الجمع والضرب والمربع والقسمة.' } },
            { progressId: 104503, stage: 'polar', title: { eu: 'Forma polarra', es: 'Forma polar', en: 'Polar form', ar: 'الشكل القطبي' }, description: { eu: 'Moduluarekin eta argumentuarekin.', es: 'Con módulo y argumento.', en: 'With modulus and argument.', ar: 'بالطويلة والعمدة.' } }
        ]
    },
    {
        id: 'twist',
        title: { eu: 'Biratu eta luzatu', es: 'Gira y estira', en: 'Turn and stretch', ar: 'أدِر ومدّ' },
        tagline: { eu: 'z puntu bat da: non geratzen da z · i, −z edo 2z? Aukeratu lau puntuen artean.', es: 'z es un punto: ¿dónde queda z · i, −z o 2z? Elige entre cuatro puntos.', en: 'z is a point: where does z · i, −z or 2z end up? Choose among four points.', ar: 'z نقطة: أين يقع z · i أو −z أو 2z؟ اختر من بين أربع نقاط.' },
        skills: { eu: 'Biraketak, simetriak eta luzapenak', es: 'Giros, simetrías y estiramientos', en: 'Turns, reflections and stretches', ar: 'الدوران والتناظر والتمديد' },
        levels: [
            { progressId: 104601, stage: 'binomial', title: { eu: '90° eta 180°', es: '90° y 180°', en: '90° and 180°', ar: '90° و180°' }, description: { eu: 'i, −i, aurkakoa eta konjokatua.', es: 'i, −i, opuesto y conjugado.', en: 'i, −i, opposite and conjugate.', ar: 'i و−i والمعاكس والمرافق.' } },
            { progressId: 104602, stage: 'turns', title: { eu: 'Biratu eta luzatu', es: 'Girar y estirar', en: 'Turn and stretch', ar: 'الدوران والتمديد' }, description: { eu: '2z, 2i · z, (1 ± i) · z eta z / i.', es: '2z, 2i · z, (1 ± i) · z y z / i.', en: '2z, 2i · z, (1 ± i) · z and z / i.', ar: '2z و2i · z و(1 ± i) · z وz / i.' } },
            { progressId: 104603, stage: 'turns', title: { eu: 'Berreturak eta konjokatuak', es: 'Potencias y conjugados', en: 'Powers and conjugates', ar: 'القوى والمرافقات' }, description: { eu: 'iⁿ · z eta biraketen konjokatuak.', es: 'iⁿ · z y conjugados de giros.', en: 'iⁿ · z and conjugates of turns.', ar: 'iⁿ · z ومرافقات الدوران.' } }
        ]
    },
    {
        id: 'hunt',
        title: { eu: 'Ehizatu erroak', es: 'Caza las raíces', en: 'Hunt the roots', ar: 'اصطد الجذور' },
        tagline: { eu: 'Ekuazio bat eta zirkunferentzia bat, 15° bakoitzean puntu batekin: ukitu soluzio guztiak, ez gehiago ez gutxiago.', es: 'Una ecuación y una circunferencia con un punto cada 15°: toca todas las soluciones, ni una más ni una menos.', en: 'An equation and a circle with a point every 15°: tap every solution, not one more, not one fewer.', ar: 'معادلة ودائرة فيها نقطة كل 15°: المس كل الحلول، لا أكثر ولا أقل.' },
        skills: { eu: 'Erro n-garrenak eta ekuazio binomikoak', es: 'Raíces n-ésimas y ecuaciones binómicas', en: 'n-th roots and binomial equations', ar: 'الجذور النونية والمعادلات ذات الحدين' },
        levels: [
            { progressId: 104701, stage: 'roots', title: { eu: 'w erreala edo irudikaria', es: 'w real o imaginario', en: 'w real or imaginary', ar: 'w حقيقي أو تخيلي' }, description: { eu: 'z⁴ = 16, z² = −9, z³ = 8i.', es: 'z⁴ = 16, z² = −9, z³ = 8i.', en: 'z⁴ = 16, z² = −9, z³ = 8i.', ar: 'z⁴ = 16، z² = −9، z³ = 8i.' } },
            { progressId: 104702, stage: 'roots', title: { eu: 'w forma polarrean', es: 'w en forma polar', en: 'w in polar form', ar: 'w بالشكل القطبي' }, description: { eu: 'Edozein argumentu.', es: 'Cualquier argumento.', en: 'Any argument.', ar: 'أي عمدة.' } },
            { progressId: 104703, stage: 'roots', title: { eu: 'Ekuazio binomikoak', es: 'Ecuaciones binómicas', en: 'Binomial equations', ar: 'المعادلات ذات الحدين' }, description: { eu: 'z³ + 8 = 0 eta antzekoak.', es: 'z³ + 8 = 0 y parecidas.', en: 'z³ + 8 = 0 and the like.', ar: 'z³ + 8 = 0 وما يشبهها.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Konplexuen detektibea', es: 'Detective de complejos', en: 'Complex numbers detective', ar: 'مخبر الأعداد المركبة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 104801, stage: 'operations', title: { eu: 'Forma binomikoa', es: 'Forma binómica', en: 'Binomial form', ar: 'الشكل الجبري' }, description: { eu: 'i², erroak, karratua eta zatiketa.', es: 'i², raíces, cuadrado y división.', en: 'i², roots, square and division.', ar: 'i² والجذور والمربع والقسمة.' } },
            { progressId: 104802, stage: 'polar', title: { eu: 'Forma polarra', es: 'Forma polar', en: 'Polar form', ar: 'الشكل القطبي' }, description: { eu: 'Modulua, koadrantea eta konjokatua.', es: 'Módulo, cuadrante y conjugado.', en: 'Modulus, quadrant and conjugate.', ar: 'الطويلة والربع والمرافق.' } },
            { progressId: 104803, stage: 'roots', title: { eu: 'Birak eta erroak', es: 'Giros y raíces', en: 'Turns and roots', ar: 'الدوران والجذور' }, description: { eu: 'Argumentuak, Moivre eta erroak.', es: 'Argumentos, Moivre y raíces.', en: 'Arguments, De Moivre and roots.', ar: 'العُمَد ودي موافر والجذور.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: i zenbakiaren berretura bat eta haren balioa, forma polarra eta binomikoa, edo eragiketa bat eta haren emaitza.', es: 'Encuentra las parejas: una potencia de i y su valor, la forma polar y la binómica, o una operación y su resultado.', en: 'Find the pairs: a power of i and its value, the polar and the binomial form, or an operation and its result.', ar: 'اعثر على الأزواج: قوة لـ i وقيمتها، والشكل القطبي والجبري، أو عملية ونتيجتها.' },
        skills: { eu: 'i zenbakiaren berreturak, formak eta eragiketak', es: 'Potencias de i, formas y operaciones', en: 'Powers of i, forms and operations', ar: 'قوى i والأشكال والعمليات' },
        levels: [
            { progressId: 104811, stage: 'operations', title: { eu: 'i zenbakiaren berreturak', es: 'Potencias de i', en: 'Powers of i', ar: 'قوى i' }, description: { eu: '3i⁷ ↔ −3i', es: '3i⁷ ↔ −3i', en: '3i⁷ ↔ −3i', ar: '3i⁷ ↔ −3i' } },
            { progressId: 104812, stage: 'polar', title: { eu: 'Polarra eta binomikoa', es: 'Polar y binómica', en: 'Polar and binomial', ar: 'القطبي والجبري' }, description: { eu: '√2 eta 45° ↔ 1 + i', es: '√2 y 45° ↔ 1 + i', en: '√2 and 45° ↔ 1 + i', ar: '√2 و45° ↔ 1 + i' } },
            { progressId: 104813, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: '(2 + i)(2 − i) ↔ 5', es: '(2 + i)(2 − i) ↔ 5', en: '(2 + i)(2 − i) ↔ 5', ar: '(2 + i)(2 − i) ↔ 5' } }
        ]
    }
]

export const konplexuakBatx1zGameProgressIds: number[] = levelProgressIds(konplexuakBatx1zGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const konplexuakBatx1zGameSlugs: Record<KonplexuakBatx1zGameId, string> = { race: 'lasterketa', affix: 'afixua', twist: 'biratu', hunt: 'ehizatu', detective: 'detektibea', memory: 'memoria' }

export function konplexuakBatx1zGameModeForPath(pathname: string): KonplexuakBatx1zGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['afixua', 'afijo'].includes(game)) return 'affix'
    if (['biratu', 'gira'].includes(game)) return 'twist'
    if (['ehizatu', 'caza'].includes(game)) return 'hunt'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
