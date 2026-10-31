import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Segidak (3. DBH) games: the list shown in the hub, with levels and the
   unit progress id each level earns with its first star. Four games belong
   to this topic (the hidden term, the sorter, Gauss's staircase and the
   progressions detective); the race and the memory are shared engines.
   ========================================================================== */

export type SequencesGameId = 'race' | 'hidden' | 'sorter' | 'staircase' | 'detective' | 'memory'

export const SEQUENCES_GAME_RECORDS_KEY = 'matella-segidak-dbh3-game-records'

export const sequencesGames: GameInfo<SequencesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Segiden lasterketa', es: 'Carrera de sucesiones', en: 'Sequences race', ar: 'سباق المتتاليات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 90101, stage: 'sequences', title: { eu: 'Segidak', es: 'Sucesiones', en: 'Sequences', ar: 'المتتاليات' }, description: { eu: 'Gai orokorra eta errepikapena.', es: 'Término general y recurrencia.', en: 'General term and recursion.', ar: 'الحد العام والتراجع.' } },
            { progressId: 90102, stage: 'arithmetic', title: { eu: 'Aritmetikoak', es: 'Aritméticas', en: 'Arithmetic', ar: 'الحسابية' }, description: { eu: 'Gaiak eta diferentzia.', es: 'Términos y diferencia.', en: 'Terms and difference.', ar: 'الحدود والفرق.' } },
            { progressId: 90103, stage: 'sums', title: { eu: 'Baturak', es: 'Sumas', en: 'Sums', ar: 'المجاميع' }, description: { eu: 'Gauss eta Sₙ.', es: 'Gauss y Sₙ.', en: 'Gauss and Sₙ.', ar: 'غاوس وSₙ.' } },
            { progressId: 90104, stage: 'geometric', title: { eu: 'Geometrikoak', es: 'Geométricas', en: 'Geometric', ar: 'الهندسية' }, description: { eu: 'Gaiak eta arrazoia.', es: 'Términos y razón.', en: 'Terms and ratio.', ar: 'الحدود والأساس.' } },
            { progressId: 90105, stage: 'geo-sums', title: { eu: 'Batura geometrikoak', es: 'Sumas geométricas', en: 'Geometric sums', ar: 'المجاميع الهندسية' }, description: { eu: 'Sₙ, batura infinitua eta hazkundea.', es: 'Sₙ, suma infinita y crecimiento.', en: 'Sₙ, infinite sum and growth.', ar: 'Sₙ والمجموع اللانهائي والنمو.' } }
        ]
    },
    {
        id: 'hidden',
        title: { eu: 'Patroi ezkutua', es: 'El patrón escondido', en: 'The hidden pattern', ar: 'النمط المخفي' },
        tagline: { eu: 'Gai bat ezkutatuta dago: aurkitu araua eta aukeratu falta dena.', es: 'Hay un término escondido: descubre la regla y elige el que falta.', en: 'One term is hidden: find the rule and pick the missing one.', ar: 'هناك حد مخفي: اكتشف القاعدة واختر الناقص.' },
        skills: { eu: 'Araua aurkitzea: batu, biderkatu ala beste zerbait', es: 'Descubrir la regla: sumar, multiplicar u otra cosa', en: 'Finding the rule: adding, multiplying or something else', ar: 'اكتشاف القاعدة: الجمع أم الضرب أم شيء آخر' },
        levels: [
            { progressId: 90301, stage: 'arithmetic', title: { eu: 'Batu', es: 'Sumar', en: 'Adding', ar: 'الجمع' }, description: { eu: 'Progresio aritmetikoak.', es: 'Progresiones aritméticas.', en: 'Arithmetic progressions.', ar: 'متتاليات حسابية.' } },
            { progressId: 90302, stage: 'geometric', title: { eu: 'Biderkatu', es: 'Multiplicar', en: 'Multiplying', ar: 'الضرب' }, description: { eu: 'Progresio geometrikoak.', es: 'Progresiones geométricas.', en: 'Geometric progressions.', ar: 'متتاليات هندسية.' } },
            { progressId: 90303, stage: 'sequences', title: { eu: 'Beste arau batzuk', es: 'Otras reglas', en: 'Other rules', ar: 'قواعد أخرى' }, description: { eu: 'Fibonacci, karratuak…', es: 'Fibonacci, cuadrados…', en: 'Fibonacci, squares…', ar: 'فيبوناتشي ومربعات…' } }
        ]
    },
    {
        id: 'sorter',
        title: { eu: 'Sailkatzailea', es: 'El clasificador', en: 'The sorter', ar: 'المصنِّف' },
        tagline: { eu: 'Aritmetikoa, geometrikoa ala bat ere ez? Sailkatu segida bakoitza.', es: '¿Aritmética, geométrica o ninguna? Clasifica cada sucesión.', en: 'Arithmetic, geometric or neither? Sort each sequence.', ar: 'حسابية أم هندسية أم لا هذه ولا تلك؟ صنّف كل متتالية.' },
        skills: { eu: 'Diferentzia eta arrazoia ezagutzea', es: 'Reconocer la diferencia y la razón', en: 'Recognising the difference and the ratio', ar: 'التعرّف على الفرق والأساس' },
        levels: [
            { progressId: 90401, stage: 'arithmetic', title: { eu: 'Argiak', es: 'Los claros', en: 'The clear ones', ar: 'الواضحة' }, description: { eu: 'Zenbaki osoak.', es: 'Números enteros.', en: 'Whole numbers.', ar: 'أعداد صحيحة.' } },
            { progressId: 90402, stage: 'geometric', title: { eu: 'Hamartarrak eta zatikiak', es: 'Decimales y fracciones', en: 'Decimals and fractions', ar: 'العشرية والكسور' }, description: { eu: 'Arrazoi negatiboak ere.', es: 'También razones negativas.', en: 'Negative ratios too.', ar: 'وأسس سالبة أيضًا.' } },
            { progressId: 90403, stage: 'geometric', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Karratuak, zeinu txandakatuak…', es: 'Cuadrados, signos alternos…', en: 'Squares, alternating signs…', ar: 'مربعات وإشارات متناوبة…' } }
        ]
    },
    {
        id: 'staircase',
        title: { eu: 'Gaussen eskailera', es: 'La escalera de Gauss', en: 'Gauss\'s staircase', ar: 'درج غاوس' },
        tagline: { eu: 'Eraiki eskailera bloke guztiekin, bat ere soberan utzi gabe.', es: 'Construye la escalera con todos los bloques, sin que sobre ninguno.', en: 'Build the staircase with all the blocks, without any left over.', ar: 'ابنِ الدرج بكل الكتل دون أن تبقى أي كتلة.' },
        skills: { eu: 'Progresio aritmetikoaren batura', es: 'La suma de una progresión aritmética', en: 'The sum of an arithmetic progression', ar: 'مجموع متتالية حسابية' },
        levels: [
            { progressId: 90501, stage: 'sums', title: { eu: '1, 2, 3…', es: '1, 2, 3…', en: '1, 2, 3…', ar: '1، 2، 3…' }, description: { eu: 'Bloke bat gehiago ilara bakoitzean.', es: 'Un bloque más en cada fila.', en: 'One more block in each row.', ar: 'كتلة إضافية في كل صف.' } },
            { progressId: 90502, stage: 'sums', title: { eu: 'Beste hasiera bat', es: 'Otro comienzo', en: 'Another start', ar: 'بداية أخرى' }, description: { eu: 'a₁ desberdina, d = 1 edo 2.', es: 'Otro a₁, d = 1 o 2.', en: 'Another a₁, d = 1 or 2.', ar: 'a₁ آخر، d = 1 أو 2.' } },
            { progressId: 90503, stage: 'sums', title: { eu: 'Jauzi handiak', es: 'Saltos grandes', en: 'Big jumps', ar: 'قفزات كبيرة' }, description: { eu: 'd = 2, 3 edo 4.', es: 'd = 2, 3 o 4.', en: 'd = 2, 3 or 4.', ar: 'd = 2 أو 3 أو 4.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Progresioen detektibea', es: 'Detective de progresiones', en: 'Progressions detective', ar: 'مخبر المتتاليات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Progresioetako akats tipikoak', es: 'Errores típicos de progresiones', en: 'Common mistakes with progressions', ar: 'الأخطاء الشائعة في المتتاليات' },
        levels: [
            { progressId: 90601, stage: 'arithmetic', title: { eu: 'Aritmetikoak', es: 'Aritméticas', en: 'Arithmetic', ar: 'الحسابية' }, description: { eu: 'Jauziak, diferentzia eta batura.', es: 'Saltos, diferencia y suma.', en: 'Jumps, difference and sum.', ar: 'القفزات والفرق والمجموع.' } },
            { progressId: 90602, stage: 'geometric', title: { eu: 'Geometrikoak', es: 'Geométricas', en: 'Geometric', ar: 'الهندسية' }, description: { eu: 'Berretura, arrazoia eta erroa.', es: 'Potencia, razón y raíz.', en: 'Power, ratio and root.', ar: 'القوة والأساس والجذر.' } },
            { progressId: 90603, stage: 'geo-sums', title: { eu: 'Baturak', es: 'Sumas', en: 'Sums', ar: 'المجاميع' }, description: { eu: 'Sₙ eta batura infinitua.', es: 'Sₙ y suma infinita.', en: 'Sₙ and the infinite sum.', ar: 'Sₙ والمجموع اللانهائي.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu galdera bakoitza bere emaitzarekin.', es: 'Une cada pregunta con su resultado.', en: 'Match each question with its result.', ar: 'صِل كل سؤال بنتيجته.' },
        skills: { eu: 'Gaiak eta baturak buruz', es: 'Términos y sumas de cabeza', en: 'Terms and sums in your head', ar: 'الحدود والمجاميع ذهنيًا' },
        levels: [
            { progressId: 90201, stage: 'arithmetic', title: { eu: 'Aritmetikoak', es: 'Aritméticas', en: 'Arithmetic', ar: 'الحسابية' }, description: { eu: 'a₁ = 3, d = 2 → a₅ ↔ 11', es: 'a₁ = 3, d = 2 → a₅ ↔ 11', en: 'a₁ = 3, d = 2 → a₅ ↔ 11', ar: 'a₁ = 3، d = 2 → a₅ ↔ 11' } },
            { progressId: 90202, stage: 'geometric', title: { eu: 'Geometrikoak', es: 'Geométricas', en: 'Geometric', ar: 'الهندسية' }, description: { eu: 'a₁ = 2, r = 3 → a₄ ↔ 54', es: 'a₁ = 2, r = 3 → a₄ ↔ 54', en: 'a₁ = 2, r = 3 → a₄ ↔ 54', ar: 'a₁ = 2، r = 3 → a₄ ↔ 54' } },
            { progressId: 90203, stage: 'sums', title: { eu: 'Baturak', es: 'Sumas', en: 'Sums', ar: 'المجاميع' }, description: { eu: '1 + … + 10 ↔ 55', es: '1 + … + 10 ↔ 55', en: '1 + … + 10 ↔ 55', ar: '1 + … + 10 ↔ 55' } }
        ]
    }
]

export const sequencesGameProgressIds: number[] = levelProgressIds(sequencesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const sequencesGameSlugs: Record<SequencesGameId, string> = { race: 'lasterketa', hidden: 'ezkutua', sorter: 'sailkatu', staircase: 'eskailera', detective: 'detektibea', memory: 'memoria' }

export function sequencesGameModeForPath(pathname: string): SequencesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ezkutua', 'escondido'].includes(game)) return 'hidden'
    if (['sailkatu', 'clasificar'].includes(game)) return 'sorter'
    if (['eskailera', 'escalera'].includes(game)) return 'staircase'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
