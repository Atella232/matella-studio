import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Berreturak, erroak eta logaritmoak (4. DBH akademikoak) games: the list shown
   in the hub, with levels and the unit progress id each level earns with
   its first star.
   ========================================================================== */

export type PowersGameId = 'race' | 'memory' | 'radical' | 'log' | 'detective'

export const POWERS_GAME_RECORDS_KEY = 'matella-potentziak-dbh4ak-game-records'

export const powersGames: GameInfo<PowersGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Berreturen lasterketa', es: 'Carrera de potencias', en: 'Powers race', ar: 'سباق القوى' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 62101, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'Berretzaile negatiboak, faktorizazioa eta idazkera zientifikoa.', es: 'Exponentes negativos, factorización y notación científica.', en: 'Negative exponents, factorisation and scientific notation.', ar: 'الأسس السالبة والتحليل والترميز العلمي.' } },
            { progressId: 62102, stage: 'radicals', title: { eu: 'Erradikalak', es: 'Radicales', en: 'Radicals', ar: 'الجذور' }, description: { eu: 'Erroak, berretzaile zatikiak eta indize komuna.', es: 'Raíces, exponentes fraccionarios e índice común.', en: 'Roots, fractional exponents and common index.', ar: 'الجذور والأسس الكسرية والدليل المشترك.' } },
            { progressId: 62103, stage: 'operations', title: { eu: 'Eragiketak', es: 'Operaciones', en: 'Operations', ar: 'العمليات' }, description: { eu: 'Atera, batu, biderkatu eta sartu.', es: 'Sacar, sumar, multiplicar e introducir.', en: 'Take out, add, multiply and bring in.', ar: 'الإخراج والجمع والضرب والإدخال.' } },
            { progressId: 62104, stage: 'rationalize', title: { eu: 'Arrazionalizatu', es: 'Racionalizar', en: 'Rationalise', ar: 'الإنطاق' }, description: { eu: '√b, ⁿ√bᵐ eta konjokatua.', es: '√b, ⁿ√bᵐ y el conjugado.', en: '√b, ⁿ√bᵐ and the conjugate.', ar: '√b وⁿ√bᵐ والمرافق.' } },
            { progressId: 62105, stage: 'logarithms', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Definizioa, oinarria, propietateak eta tarteak.', es: 'Definición, base, propiedades y acotación.', en: 'Definition, base, properties and bounds.', ar: 'التعريف والأساس والخصائص والحصر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere balioarekin.', es: 'Une cada expresión con su valor.', en: 'Match each expression with its value.', ar: 'صِل كل عبارة بقيمتها.' },
        skills: { eu: 'Berretzaile zatikiak, erroak eta logaritmoak', es: 'Exponentes fraccionarios, raíces y logaritmos', en: 'Fractional exponents, roots and logarithms', ar: 'الأسس الكسرية والجذور واللوغاريتمات' },
        levels: [
            { progressId: 62201, stage: 'radicals', title: { eu: 'Berretzaile zatikiak', es: 'Exponentes fraccionarios', en: 'Fractional exponents', ar: 'الأسس الكسرية' }, description: { eu: '8^(2/3) ↔ 4', es: '8^(2/3) ↔ 4', en: '8^(2/3) ↔ 4', ar: '8^(2/3) ↔ 4' } },
            { progressId: 62202, stage: 'operations', title: { eu: 'Faktoreak atera', es: 'Sacar factores', en: 'Take factors out', ar: 'إخراج العوامل' }, description: { eu: '∛54 ↔ 3∛2', es: '∛54 ↔ 3∛2', en: '∛54 ↔ 3∛2', ar: '∛54 ↔ 3∛2' } },
            { progressId: 62203, stage: 'logarithms', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'log₂ 32 ↔ 5', es: 'log₂ 32 ↔ 5', en: 'log₂ 32 ↔ 5', ar: 'log₂ 32 ↔ 5' } }
        ]
    },
    {
        id: 'radical',
        title: { eu: 'Sinplifikatu errokizuna', es: 'Simplifica el radical', en: 'Simplify the radical', ar: 'بسّط الجذر' },
        tagline: { eu: 'Idatzi a·ⁿ√b gisa; gero faktoreak taldeka aterako dira errotik.', es: 'Escríbelo como a·ⁿ√b; luego los factores salen de la raíz en grupos.', en: 'Write it as a·ⁿ√b; then the factors leave the root in groups.', ar: 'اكتبه على صورة a·ⁿ√b، ثم تخرج العوامل من الجذر في مجموعات.' },
        skills: { eu: 'Faktoreak errotik atera', es: 'Extraer factores del radical', en: 'Taking factors out of a root', ar: 'إخراج العوامل من الجذر' },
        levels: [
            { progressId: 62301, stage: 'radicals', title: { eu: 'Erro karratuak', es: 'Raíces cuadradas', en: 'Square roots', ar: 'الجذور التربيعية' }, description: { eu: 'Bikoteak ateratzen dira.', es: 'Salen las parejas.', en: 'Pairs come out.', ar: 'تخرج الأزواج.' } },
            { progressId: 62302, stage: 'radicals', title: { eu: 'Erro kubikoak eta laugarrenak', es: 'Raíces cúbicas y cuartas', en: 'Cube and fourth roots', ar: 'الجذور التكعيبية والرابعة' }, description: { eu: 'Hirukoteak eta laukoteak.', es: 'Tríos y cuartetos.', en: 'Groups of three and four.', ar: 'مجموعات من ثلاثة وأربعة.' } },
            { progressId: 62303, stage: 'operations', title: { eu: 'Batuketak', es: 'Sumas', en: 'Sums', ar: 'المجاميع' }, description: { eu: 'Erroen batuketak eta kenketak.', es: 'Sumas y restas de radicales.', en: 'Sums and differences of roots.', ar: 'جمع الجذور وطرحها.' } }
        ]
    },
    {
        id: 'log',
        title: { eu: 'Aurkitu berretzailea', es: 'Encuentra el exponente', en: 'Find the exponent', ar: 'أوجد الأس' },
        tagline: { eu: 'Logaritmo bat: zein berretzailera igo behar da oinarria? Gero, berreturen eskailera.', es: 'Un logaritmo: ¿a qué exponente hay que elevar la base? Luego, la escalera de potencias.', en: 'A logarithm: what power must the base be raised to? Then the ladder of powers.', ar: 'لوغاريتم: إلى أي أس نرفع الأساس؟ ثم سلّم القوى.' },
        skills: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' },
        levels: [
            { progressId: 62401, stage: 'logarithms', title: { eu: 'Berretzaile osoak', es: 'Exponentes enteros', en: 'Whole exponents', ar: 'أسس صحيحة' }, description: { eu: '2, 3, 5 eta 10 oinarriak.', es: 'Bases 2, 3, 5 y 10.', en: 'Bases 2, 3, 5 and 10.', ar: 'الأسس 2 و3 و5 و10.' } },
            { progressId: 62402, stage: 'logarithms', title: { eu: 'Negatiboak eta zatikiak', es: 'Negativos y fracciones', en: 'Negatives and fractions', ar: 'السالبة والكسرية' }, description: { eu: 'Zatikiak, hamartarrak eta erroak.', es: 'Fracciones, decimales y raíces.', en: 'Fractions, decimals and roots.', ar: 'كسور وأعداد عشرية وجذور.' } },
            { progressId: 62403, stage: 'logarithms', title: { eu: 'Oinarria edo zenbakia', es: 'La base o el número', en: 'The base or the number', ar: 'الأساس أو العدد' }, description: { eu: 'Ezezaguna beste toki batean.', es: 'La incógnita en otro sitio.', en: 'The unknown somewhere else.', ar: 'المجهول في مكان آخر.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Berreturen detektibea', es: 'Detective de potencias', en: 'Powers detective', ar: 'مخبر القوى' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Berretura, erro eta logaritmoetako akats tipikoak', es: 'Errores típicos con potencias, raíces y logaritmos', en: 'Common mistakes with powers, roots and logarithms', ar: 'الأخطاء الشائعة في القوى والجذور واللوغاريتمات' },
        levels: [
            { progressId: 62501, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'Berretzaileak eta notazio zientifikoa.', es: 'Exponentes y notación científica.', en: 'Exponents and scientific notation.', ar: 'الأسس والترميز العلمي.' } },
            { progressId: 62502, stage: 'rationalize', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: 'Batuketak, zatikiak eta arrazionalizazioa.', es: 'Sumas, fracciones y racionalización.', en: 'Sums, fractions and rationalising.', ar: 'المجاميع والكسور وإنطاق المقام.' } },
            { progressId: 62503, stage: 'logarithms', title: { eu: 'Logaritmoak', es: 'Logaritmos', en: 'Logarithms', ar: 'اللوغاريتمات' }, description: { eu: 'Batuketak, berreturak eta zatidurak.', es: 'Sumas, potencias y cocientes.', en: 'Sums, powers and quotients.', ar: 'المجاميع والقوى والقسمة.' } }
        ]
    }
]

export const powersGameProgressIds: number[] = levelProgressIds(powersGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const powersGameSlugs: Record<PowersGameId, string> = { race: 'lasterketa', memory: 'memoria', radical: 'erroak', log: 'berretzailea', detective: 'detektibea' }

export function powersGameModeForPath(pathname: string): PowersGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['erroak', 'radicales'].includes(game)) return 'radical'
    if (['berretzailea', 'exponente'].includes(game)) return 'log'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
