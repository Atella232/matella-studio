import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Sistemak (Batxilergoa 2 · Zientziak) games: the list shown in the hub,
   with levels and the unit progress id each level earns with its first
   star. Two games of its own (Rouché express, Cramer column by column) and
   the detective of systems, plus the race and the memory. Block of ids:
   118401–118899.
   ========================================================================== */

export type SistemakGameId = 'race' | 'rouche-express' | 'cramer-columns' | 'detective' | 'memory'

export const SISTEMAK_GAME_RECORDS_KEY = 'matella-sistemak-batx2z-game-records'

export const sistemakGames: GameInfo<SistemakGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Sistemen lasterketa', es: 'Carrera de sistemas', en: 'Systems race', ar: 'سباق الأنظمة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 118401, stage: 'rouche', title: { eu: 'Rouché-Frobenius', es: 'Rouché-Frobenius', en: 'Rouché–Frobenius', ar: 'روشيه-فروبينيوس' }, description: { eu: 'Heinak, parametroak eta hiru zuzen.', es: 'Rangos, parámetros y tres rectas.', en: 'Ranks, parameters and three lines.', ar: 'الرتب والوسائط وثلاثة مستقيمات.' } },
            { progressId: 118402, stage: 'cramer', title: { eu: 'Cramer', es: 'Cramer', en: 'Cramer', ar: 'كرامر' }, description: { eu: '|Aₓ| eta ezezagun bat.', es: '|Aₓ| y una incógnita.', en: '|Aₓ| and an unknown.', ar: '|Aₓ| ومجهول.' } },
            { progressId: 118403, stage: 'homogeneous', title: { eu: 'Homogeneoak', es: 'Homogéneos', en: 'Homogeneous', ar: 'المتجانسة' }, description: { eu: 'Soluzio ez-tribialak dituen k.', es: 'La k con soluciones no triviales.', en: 'The k with non-trivial solutions.', ar: 'قيمة k ذات الحلول غير البديهية.' } },
            { progressId: 118404, stage: 'discussion', title: { eu: 'Eztabaida', es: 'Discusión', en: 'Discussion', ar: 'المناقشة' }, description: { eu: 'Balio kritikoak eta b bakarra.', es: 'Valores críticos y la b justa.', en: 'Critical values and the right b.', ar: 'القيم الحرجة وقيمة b المناسبة.' } },
            { progressId: 118405, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Batura eta kendura, eta soluzio emana.', es: 'Suma y diferencia, y una solución dada.', en: 'Sum and difference, and a given solution.', ar: 'المجموع والفرق وحل معطى.' } }
        ]
    },
    {
        id: 'rouche-express',
        title: { eu: 'Rouché espresa', es: 'Rouché exprés', en: 'Rouché express', ar: 'روشيه السريع' },
        tagline: { eu: 'Sistema bat ikusiko duzu: zenbat soluzio ditu? Bat ere ez, bat ala infinitu.', es: 'Verás un sistema: ¿cuántas soluciones tiene? Ninguna, una o infinitas.', en: 'You will see a system: how many solutions does it have? None, one or infinitely many.', ar: 'سترى نظامًا: كم حلًّا له؟ لا حل أو حل واحد أو ما لا نهاية.' },
        skills: { eu: 'Sistemak sailkatzea, ebatzi gabe', es: 'Clasificar sistemas sin resolverlos', en: 'Classifying systems without solving them', ar: 'تصنيف الأنظمة دون حلها' },
        levels: [
            { progressId: 118501, stage: 'rouche', title: { eu: 'Heinak emanda', es: 'Con los rangos', en: 'With the ranks', ar: 'مع الرتب' }, description: { eu: 'rg(A), rg(A*) eta n', es: 'rg(A), rg(A*) y n', en: 'rg(A), rg(A*) and n', ar: 'rg(A) و rg(A*) و n' } },
            { progressId: 118502, stage: 'rouche', title: { eu: 'Matrize zabaldua', es: 'La matriz ampliada', en: 'The augmented matrix', ar: 'المصفوفة الموسعة' }, description: { eu: 'A* zenbakiekin', es: 'A* con números', en: 'A* with numbers', ar: 'A* بالأعداد' } },
            { progressId: 118503, stage: 'discussion', title: { eu: 'Parametroarekin', es: 'Con parámetro', en: 'With a parameter', ar: 'مع وسيط' }, description: { eu: 'a balio bat ordeztuta', es: 'Un valor de a sustituido', en: 'A value of a put in', ar: 'قيمة لـ a معوَّضة' } }
        ]
    },
    {
        id: 'cramer-columns',
        title: { eu: 'Cramer, zutabez zutabe', es: 'Cramer, columna a columna', en: 'Cramer, column by column', ar: 'كرامر عمودًا عمودًا' },
        tagline: { eu: 'Aukeratu ezezagun baten determinantea: B zutabea haren zutabearen lekuan. Gero, haren balioa.', es: 'Elige el determinante de una incógnita: la columna B en el lugar de la suya. Después, su valor.', en: 'Choose the determinant of an unknown: column B in the place of its column. Then, its value.', ar: 'اختر محدد مجهول: العمود B مكان عموده. ثم قيمته.' },
        skills: { eu: 'Cramerren erregela', es: 'La regla de Cramer', en: 'Cramer\'s rule', ar: 'قاعدة كرامر' },
        levels: [
            { progressId: 118601, stage: 'cramer', title: { eu: 'Bi ezezagun', es: 'Dos incógnitas', en: 'Two unknowns', ar: 'مجهولان' }, description: { eu: '|Aₓ| eta |A_y|', es: '|Aₓ| y |A_y|', en: '|Aₓ| and |A_y|', ar: '|Aₓ| و |A_y|' } },
            { progressId: 118602, stage: 'cramer', title: { eu: 'Hiru ezezagun', es: 'Tres incógnitas', en: 'Three unknowns', ar: 'ثلاثة مجاهيل' }, description: { eu: 'Zein zutabe aldatzen da?', es: '¿Qué columna cambia?', en: 'Which column changes?', ar: 'أي عمود يتغير؟' } },
            { progressId: 118603, stage: 'cramer', title: { eu: 'Balioa', es: 'El valor', en: 'The value', ar: 'القيمة' }, description: { eu: '|A_j| / |A|', es: '|A_j| / |A|', en: '|A_j| / |A|', ar: '|A_j| / |A|' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Sistemen detektibea', es: 'Detective de sistemas', en: 'Systems detective', ar: 'مخبر الأنظمة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 118801, stage: 'rouche', title: { eu: 'Rouché', es: 'Rouché', en: 'Rouché', ar: 'روشيه' }, description: { eu: 'n ahaztuta, |A| = 0, homogeneoak', es: 'Olvidar n, |A| = 0, homogéneos', en: 'Forgetting n, |A| = 0, homogeneous', ar: 'نسيان n و |A| = 0 والمتجانسة' } },
            { progressId: 118802, stage: 'cramer', title: { eu: 'Cramer', es: 'Cramer', en: 'Cramer', ar: 'كرامر' }, description: { eu: 'Alderantziz, errenkada, zutabe okerra', es: 'Al revés, la fila, la columna equivocada', en: 'Upside down, the row, the wrong column', ar: 'المقلوب والصف والعمود الخطأ' } },
            { progressId: 118803, stage: 'discussion', title: { eu: 'Eztabaida', es: 'Discusión', en: 'Discussion', ar: 'المناقشة' }, description: { eu: 'Erro bat falta, A* ahaztuta', es: 'Falta una raíz, olvidar A*', en: 'A missing root, forgetting A*', ar: 'جذر ناقص ونسيان A*' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: sistema baten matrize zabaldua eta haren soluzioa edo haren |Aₓ|, edo sistema homogeneo batena eta soluzio ez-tribialak ematen dituen k.', es: 'Encuentra las parejas: la matriz ampliada de un sistema y su solución o su |Aₓ|, o la de un homogéneo y la k que da soluciones no triviales.', en: 'Find the pairs: the augmented matrix of a system and its solution or its |Aₓ|, or that of a homogeneous system and the k that gives non-trivial solutions.', ar: 'جد الأزواج: المصفوفة الموسعة لنظام وحله أو |Aₓ|، أو مصفوفة نظام متجانس وقيمة k التي تعطي حلولًا غير بديهية.' },
        skills: { eu: 'Soluzioak, |Aₓ| eta k', es: 'Soluciones, |Aₓ| y k', en: 'Solutions, |Aₓ| and k', ar: 'الحلول و |Aₓ| و k' },
        levels: [
            { progressId: 118851, stage: 'cramer', title: { eu: 'Soluzioa', es: 'Solución', en: 'Solution', ar: 'الحل' }, description: { eu: 'A* ↔ (x, y)', es: 'A* ↔ (x, y)', en: 'A* ↔ (x, y)', ar: 'A* ↔ (x, y)' } },
            { progressId: 118852, stage: 'rouche', title: { eu: 'Cramer', es: 'Cramer', en: 'Cramer', ar: 'كرامر' }, description: { eu: 'A* ↔ |Aₓ|', es: 'A* ↔ |Aₓ|', en: 'A* ↔ |Aₓ|', ar: 'A* ↔ |Aₓ|' } },
            { progressId: 118853, stage: 'homogeneous', title: { eu: 'Homogeneoak', es: 'Homogéneos', en: 'Homogeneous', ar: 'المتجانسة' }, description: { eu: 'A* ↔ k', es: 'A* ↔ k', en: 'A* ↔ k', ar: 'A* ↔ k' } }
        ]
    }
]

export const sistemakGameProgressIds: number[] = levelProgressIds(sistemakGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const sistemakGameSlugs: Record<SistemakGameId, string> = { race: 'lasterketa', 'rouche-express': 'rouche-espresa', 'cramer-columns': 'cramer-zutabez', detective: 'detektibea', memory: 'memoria' }

export function sistemakGameModeForPath(pathname: string): SistemakGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['rouche-espresa', 'rouche-expres'].includes(game)) return 'rouche-express'
    if (['cramer-zutabez', 'cramer-columnas'].includes(game)) return 'cramer-columns'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
