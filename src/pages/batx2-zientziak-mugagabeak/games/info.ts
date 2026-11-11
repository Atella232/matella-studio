import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Integral mugagabeak (Batxilergoa 2 · Zientziak) games: the list shown in
   the hub, with levels and the unit progress id each level earns with its
   first star. Three games of its own (which method, choose the u, build
   the fractions), the detective of this unit's mistakes, the race and the
   memory.
   ========================================================================== */

export type Bach2IndefiniteGameId = 'race' | 'method' | 'choose-u' | 'fractions' | 'detective' | 'memory'

export const BACH2_INDEFINITE_GAME_RECORDS_KEY = 'matella-mugagabeak-batx2z-game-records'

export const bach2IndefiniteGames: GameInfo<Bach2IndefiniteGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Integral mugagabeen lasterketa', es: 'Carrera de integrales indefinidas', en: 'Indefinite integrals race', ar: 'سباق التكاملات غير المحددة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 126401, stage: 'review', title: { eu: 'Errepasoa', es: 'Repaso', en: 'Review', ar: 'المراجعة' }, description: { eu: 'Konposatuak eta arku tangentea doitzea.', es: 'Ajustar compuestas y arcotangentes.', en: 'Adjusting composite integrals and arctangents.', ar: 'ضبط المركّبة وقوس الظل.' } },
            { progressId: 126402, stage: 'parts', title: { eu: 'Zatika', es: 'Por partes', en: 'By parts', ar: 'بالتجزئة' }, description: { eu: 'Emaitzaren koefizienteak.', es: 'Los coeficientes del resultado.', en: 'The coefficients of the result.', ar: 'معاملات النتيجة.' } },
            { progressId: 126403, stage: 'rational', title: { eu: 'Arrazionalak', es: 'Racionales', en: 'Rational', ar: 'الكسرية' }, description: { eu: 'A, B eta zatiketaren hondarra.', es: 'A, B y el resto de la división.', en: 'A, B and the remainder of the division.', ar: 'A و B وباقي القسمة.' } },
            { progressId: 126404, stage: 'substitution', title: { eu: 'Aldaketa', es: 'Cambio', en: 'Substitution', ar: 'التعويض' }, description: { eu: 'Aldaketak dakarren zenbakia.', es: 'El número que trae el cambio.', en: 'The number the change brings.', ar: 'العدد الذي يجلبه التعويض.' } },
            { progressId: 126405, stage: 'strategy', title: { eu: 'Baldintzak', es: 'Condiciones', en: 'Conditions', ar: 'الشروط' }, description: { eu: 'Puntua, malda eta f″.', es: 'El punto, la pendiente y f″.', en: 'The point, the slope and f″.', ar: 'النقطة والميل و f″.' } }
        ]
    },
    {
        id: 'method',
        title: { eu: 'Zein metodo?', es: '¿Qué método?', en: 'Which method?', ar: 'أيّ طريقة؟' },
        tagline: { eu: 'Integral bakoitza bere saskira: berehalakoa, zatika, arrazionala ala aldaketa.', es: 'Cada integral a su cesta: inmediata, por partes, racional o cambio de variable.', en: 'Each integral to its basket: basic, by parts, rational or substitution.', ar: 'كل تكامل إلى سلّته: مباشر أو بالتجزئة أو كسري أو تعويض.' },
        skills: { eu: 'Kalkulatu aurretik, forma begiratu', es: 'Antes de calcular, mirar la forma', en: 'Look at the shape before working it out', ar: 'انظر إلى الشكل قبل الحساب' },
        levels: [
            { progressId: 126501, stage: 'strategy', title: { eu: 'Argiak', es: 'Claras', en: 'Clear ones', ar: 'الواضحة' }, description: { eu: 'Metodo bakoitzaren adibide garbiak.', es: 'Ejemplos limpios de cada método.', en: 'Clean examples of each method.', ar: 'أمثلة واضحة لكل طريقة.' } },
            { progressId: 126502, stage: 'strategy', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Arrazional itxurako konposatuak.', es: 'Compuestas que parecen racionales.', en: 'Composite integrals that look rational.', ar: 'مركّبة تبدو كسرية.' } },
            { progressId: 126503, stage: 'strategy', title: { eu: 'Denak', es: 'Todas', en: 'All of them', ar: 'الكل' }, description: { eu: 'Logaritmoak, berreturak eta zatiketak ere bai.', es: 'También logaritmos, potencias y divisiones.', en: 'Logarithms, powers and divisions too.', ar: 'واللوغاريتمات والقوى والقسمة أيضًا.' } }
        ]
    },
    {
        id: 'choose-u',
        title: { eu: 'Aukeratu u', es: 'Elige la u', en: 'Choose the u', ar: 'اختر u' },
        tagline: { eu: 'Hiru banaketa u eta dv artean: bakar batek egiten du integral berria errazagoa.', es: 'Tres repartos de u y dv: solo uno hace la integral nueva más fácil.', en: 'Three ways to split into u and dv: only one makes the new integral easier.', ar: 'ثلاث طرق لتوزيع u و dv: واحدة فقط تجعل التكامل الجديد أسهل.' },
        skills: { eu: 'Zatikako integrazioa', es: 'Integración por partes', en: 'Integration by parts', ar: 'التكامل بالتجزئة' },
        levels: [
            { progressId: 126551, stage: 'parts', title: { eu: 'x bider', es: 'x por', en: 'x times', ar: 'x في' }, description: { eu: 'x bider esponentzial bat edo kosinu bat.', es: 'x por una exponencial o un coseno.', en: 'x times an exponential or a cosine.', ar: 'x في دالة أسية أو جيب تمام.' } },
            { progressId: 126552, stage: 'parts', title: { eu: 'Maila handiagoa', es: 'Más grado', en: 'Higher degree', ar: 'درجة أعلى' }, description: { eu: 'x², x³ eta logaritmoak.', es: 'x², x³ y logaritmos.', en: 'x², x³ and logarithms.', ar: 'x² و x³ واللوغاريتمات.' } },
            { progressId: 126553, stage: 'parts', title: { eu: 'Faktore bakarra', es: 'Un solo factor', en: 'A single factor', ar: 'عامل واحد' }, description: { eu: 'ln x eta arkuak, dv = dx denean.', es: 'ln x y arcos, con dv = dx.', en: 'ln x and arcs, with dv = dx.', ar: 'ln x ودوال القوس مع dv = dx.' } }
        ]
    },
    {
        id: 'fractions',
        title: { eu: 'Eraiki zatikiak', es: 'Construye las fracciones', en: 'Build the fractions', ar: 'ابنِ الكسور' },
        tagline: { eu: 'Izendatzaileari begiratu, eta aukeratu zatiki sinpleak, haien zenbakiak edo lehenik zatiketa.', es: 'Mira el denominador y elige las fracciones simples, sus números o la división primero.', en: 'Look at the denominator and choose the partial fractions, their numbers or the division first.', ar: 'انظر إلى المقام واختر الكسور البسيطة أو أعدادها أو القسمة أولًا.' },
        skills: { eu: 'Integral arrazionalak', es: 'Integrales racionales', en: 'Rational integrals', ar: 'التكاملات الكسرية' },
        levels: [
            { progressId: 126601, stage: 'rational', title: { eu: 'Hezurdura', es: 'El esqueleto', en: 'The skeleton', ar: 'الهيكل' }, description: { eu: 'Erro bakunak, bikoitzak eta errorik gabeak.', es: 'Raíces simples, dobles y sin raíces.', en: 'Simple, double and no roots.', ar: 'جذور بسيطة ومضاعفة وبلا جذور.' } },
            { progressId: 126602, stage: 'rational', title: { eu: 'A eta B', es: 'A y B', en: 'A and B', ar: 'A و B' }, description: { eu: 'Estali faktorea eta ordeztu erroa.', es: 'Tapa el factor y sustituye la raíz.', en: 'Cover the factor and put in the root.', ar: 'غطِّ العامل وعوّض الجذر.' } },
            { progressId: 126603, stage: 'rational', title: { eu: 'Lehenik zatitu', es: 'Primero divide', en: 'Divide first', ar: 'اقسم أولًا' }, description: { eu: 'Zenbakitzailearen maila handiagoa denean.', es: 'Cuando el numerador tiene más grado.', en: 'When the numerator has a higher degree.', ar: 'عندما تكون درجة البسط أعلى.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Integral mugagabeen detektibea', es: 'Detective de integrales indefinidas', en: 'Indefinite integrals detective', ar: 'مخبر التكاملات غير المحددة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 126701, stage: 'parts', title: { eu: 'Zatika', es: 'Por partes', en: 'By parts', ar: 'بالتجزئة' }, description: { eu: 'Zeinua, v eta azken urratsa.', es: 'El signo, la v y el último paso.', en: 'The sign, the v and the last step.', ar: 'الإشارة و v والخطوة الأخيرة.' } },
            { progressId: 126702, stage: 'rational', title: { eu: 'Arrazionalak', es: 'Racionales', en: 'Rational', ar: 'الكسرية' }, description: { eu: 'Zatiketa, erroak eta erro bikoitza.', es: 'La división, las raíces y la raíz doble.', en: 'The division, the roots and the double root.', ar: 'القسمة والجذور والجذر المضاعف.' } },
            { progressId: 126703, stage: 'substitution', title: { eu: 'Aldaketa eta baldintzak', es: 'Cambio y condiciones', en: 'Substitution and conditions', ar: 'التعويض والشروط' }, description: { eu: 'dx, aldaketa desegitea eta konstanteak.', es: 'El dx, deshacer el cambio y las constantes.', en: 'The dx, undoing the change and the constants.', ar: 'dx والتراجع عن التعويض والثوابت.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta haren jatorrizkoa.', es: 'Encuentra las parejas: una función y su primitiva.', en: 'Find the pairs: a function and its antiderivative.', ar: 'اعثر على الأزواج: دالة وأصليتها.' },
        skills: { eu: 'Konposatuak, zatika eta aldaketa', es: 'Compuestas, partes y cambio', en: 'Composite, by parts and substitution', ar: 'المركّبة والتجزئة والتعويض' },
        levels: [
            { progressId: 126801, stage: 'review', title: { eu: 'Konposatuak', es: 'Compuestas', en: 'Composite', ar: 'المركّبة' }, description: { eu: '2x·e^(x²) ↔ e^(x²)', es: '2x·e^(x²) ↔ e^(x²)', en: '2x·e^(x²) ↔ e^(x²)', ar: '2x·e^(x²) ↔ e^(x²)' } },
            { progressId: 126802, stage: 'parts', title: { eu: 'Zatika', es: 'Por partes', en: 'By parts', ar: 'بالتجزئة' }, description: { eu: 'x·eˣ ↔ eˣ(x − 1)', es: 'x·eˣ ↔ eˣ(x − 1)', en: 'x·eˣ ↔ eˣ(x − 1)', ar: 'x·eˣ ↔ eˣ(x − 1)' } },
            { progressId: 126803, stage: 'substitution', title: { eu: 'Aldaketa', es: 'Cambio', en: 'Substitution', ar: 'التعويض' }, description: { eu: 'ln x / x ↔ (ln x)²/2', es: 'ln x / x ↔ (ln x)²/2', en: 'ln x / x ↔ (ln x)²/2', ar: 'ln x / x ↔ (ln x)²/2' } }
        ]
    }
]

export const bach2IndefiniteGameProgressIds: number[] = levelProgressIds(bach2IndefiniteGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2IndefiniteGameSlugs: Record<Bach2IndefiniteGameId, string> = { race: 'lasterketa', method: 'metodoa', 'choose-u': 'aukeratu-u', fractions: 'zatikiak', detective: 'detektibea', memory: 'memoria' }

export function bach2IndefiniteGameModeForPath(pathname: string): Bach2IndefiniteGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['metodoa', 'metodo'].includes(game)) return 'method'
    if (['aukeratu-u', 'elige-u'].includes(game)) return 'choose-u'
    if (['zatikiak', 'fracciones'].includes(game)) return 'fractions'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
