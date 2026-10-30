import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Berreturak eta erroak (3. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Four games belong to this topic (sorting numbers in scientific notation,
   taking pairs of factors out of a root, rational or irrational, the power
   detective); the race and the memory are shared with the other units.
   ========================================================================== */

export type PowersGameId = 'race' | 'order' | 'extract' | 'guard' | 'detective' | 'memory'

export const POWERS_GAME_RECORDS_KEY = 'matella-berreturak-dbh3-game-records'

export const powersGames: GameInfo<PowersGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Berreturen lasterketa', es: 'Carrera de potencias y raíces', ar: 'سباق القوى والجذور' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 37101, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' }, description: { eu: 'Zeinua, berretzaile negatiboa eta propietateak.', es: 'Signo, exponente negativo y propiedades.', ar: 'الإشارة والأس السالب والخصائص.' } },
            { progressId: 37102, stage: 'scientific', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', ar: 'الترميز العلمي' }, description: { eu: 'Berretzailea, biderketa eta zatiketa.', es: 'Exponente, producto y cociente.', ar: 'الأس والضرب والقسمة.' } },
            { progressId: 37103, stage: 'roots', title: { eu: 'Erroak', es: 'Raíces', ar: 'الجذور' }, description: { eu: 'Erro zehatzak, faktoreak atera eta sartu.', es: 'Raíces exactas, sacar y meter factores.', ar: 'جذور صحيحة وإخراج العوامل وإدخالها.' } },
            { progressId: 37104, stage: 'reals', title: { eu: 'Zenbaki errealak', es: 'Números reales', ar: 'الأعداد الحقيقية' }, description: { eu: 'Irrazionalak, tarteak eta zuzena.', es: 'Irracionales, intervalos y recta.', ar: 'غير النسبية والفترات والمستقيم.' } },
            { progressId: 37105, stage: 'approx', title: { eu: 'Hurbilketak', es: 'Aproximaciones', ar: 'التقريب' }, description: { eu: 'Trunkatu, biribildu eta errorea.', es: 'Truncar, redondear y error.', ar: 'البتر والتقريب والخطأ.' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Eskala kosmikoa', es: 'Escala cósmica', ar: 'السُّلّم الكوني' },
        tagline: { eu: 'Ordenatu tamainak txikienetik handienera: atomoetatik galaxietara.', es: 'Ordena los tamaños de menor a mayor: de los átomos a las galaxias.', ar: 'رتّب الأحجام من الأصغر إلى الأكبر: من الذرات إلى المجرات.' },
        skills: { eu: 'Idazkera zientifikoko zenbakiak konparatzea', es: 'Comparar números en notación científica', ar: 'مقارنة الأعداد بالترميز العلمي' },
        levels: [
            { progressId: 37301, stage: 'scientific', title: { eu: 'Gauzak', es: 'Objetos', ar: 'الأجسام' }, description: { eu: 'Atomoa, inurria, Lurra, galaxia…', es: 'El átomo, la hormiga, la Tierra, la galaxia…', ar: 'الذرة والنملة والأرض والمجرة…' } },
            { progressId: 37302, stage: 'scientific', title: { eu: 'Berretzaileak', es: 'Exponentes', ar: 'الأسس' }, description: { eu: 'Berretzaile positiboak eta negatiboak.', es: 'Exponentes positivos y negativos.', ar: 'أسس موجبة وسالبة.' } },
            { progressId: 37303, stage: 'scientific', title: { eu: 'Tranpak', es: 'Trampas', ar: 'الفخاخ' }, description: { eu: 'Berretzaile bera eta zenbakiak ongi idatzi gabe.', es: 'Mismo exponente y números mal escritos.', ar: 'الأس نفسه وأعداد غير مكتوبة جيدًا.' } }
        ]
    },
    {
        id: 'extract',
        title: { eu: 'Atera errotik', es: 'Saca de la raíz', ar: 'أخرِج من الجذر' },
        tagline: { eu: 'Faktore berdinen bikoteak errotik atera: bikote bakoitzak faktore bat ematen du.', es: 'Saca de la raíz las parejas de factores iguales: cada pareja da un factor fuera.', ar: 'أخرج أزواج العوامل المتساوية من الجذر: كل زوج يعطي عاملًا في الخارج.' },
        skills: { eu: 'Errokizuna deskonposatzea eta faktoreak ateratzea', es: 'Descomponer el radicando y sacar factores', ar: 'تحليل ما تحت الجذر وإخراج العوامل' },
        levels: [
            { progressId: 37401, stage: 'roots', title: { eu: 'Bi faktore lehen', es: 'Dos primos', ar: 'عاملان أوليان' }, description: { eu: '√72, √50, √48…', es: '√72, √50, √48…', ar: '√72 و√50 و√48…' } },
            { progressId: 37402, stage: 'roots', title: { eu: 'Hiru faktore lehen', es: 'Tres primos', ar: 'ثلاثة عوامل أولية' }, description: { eu: '√360, √450, √588…', es: '√360, √450, √588…', ar: '√360 و√450 و√588…' } },
            { progressId: 37403, stage: 'roots', title: { eu: 'Zenbaki handiak', es: 'Números grandes', ar: 'أعداد كبيرة' }, description: { eu: '√1800, √2352, √3465…', es: '√1800, √2352, √3465…', ar: '√1800 و√2352 و√3465…' } }
        ]
    },
    {
        id: 'guard',
        title: { eu: 'Zubiaren zaindaria', es: 'El guardián del puente', ar: 'حارس الجسر' },
        tagline: { eu: 'Zenbakiak zubira iristen dira: arrazionala ala irrazionala? Erabaki ondo.', es: 'Los números llegan al puente: ¿racional o irracional? Decide bien.', ar: 'تصل الأعداد إلى الجسر: نسبي أم غير نسبي؟ قرّر بحكمة.' },
        skills: { eu: 'Arrazionalak eta irrazionalak bereiztea', es: 'Distinguir racionales de irracionales', ar: 'التمييز بين النسبية وغير النسبية' },
        levels: [
            { progressId: 37501, stage: 'reals', title: { eu: 'Argiak', es: 'Los claros', ar: 'الواضحة' }, description: { eu: '√2, 0,5, π, √9…', es: '√2, 0,5, π, √9…', ar: '√2 و0.5 و π و√9…' } },
            { progressId: 37502, stage: 'reals', title: { eu: 'Hamartarrak', es: 'Decimales', ar: 'العشرية' }, description: { eu: 'Periodikoak, 22/7, 3,14…', es: 'Periódicos, 22/7, 3,14…', ar: 'الدورية و22/7 و3.14…' } },
            { progressId: 37503, stage: 'reals', title: { eu: 'Tranpak', es: 'Con trampa', ar: 'بفخاخ' }, description: { eu: '√2·√8, 2√2, (√3)²…', es: '√2·√8, 2√2, (√3)²…', ar: '√2·√8 و2√2 و(√3)²…' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Berreturen detektibea', es: 'Detective de potencias y raíces', ar: 'مخبر القوى والجذور' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Berreturetako, errokoetako eta hurbilketetako akats tipikoak', es: 'Errores típicos de potencias, raíces y aproximaciones', ar: 'الأخطاء الشائعة في القوى والجذور والتقريب' },
        levels: [
            { progressId: 37601, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' }, description: { eu: 'Zeinua, berretzaile negatiboa eta propietateak.', es: 'Signo, exponente negativo y propiedades.', ar: 'الإشارة والأس السالب والخصائص.' } },
            { progressId: 37602, stage: 'roots', title: { eu: 'Idazkera eta erroak', es: 'Notación y raíces', ar: 'الترميز والجذور' }, description: { eu: 'Idazkera zientifikoa eta erradikalak.', es: 'Notación científica y radicales.', ar: 'الترميز العلمي والجذريات.' } },
            { progressId: 37603, stage: 'approx', title: { eu: 'Errealak eta hurbilketak', es: 'Reales y aproximaciones', ar: 'الحقيقية والتقريب' }, description: { eu: 'Irrazionalak, tarteak eta errorea.', es: 'Irracionales, intervalos y error.', ar: 'غير النسبية والفترات والخطأ.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere balioarekin.', es: 'Une cada expresión con su valor.', ar: 'صِل كل عبارة بقيمتها.' },
        skills: { eu: 'Berreturak, idazkera zientifikoa eta erradikalak buruz', es: 'Potencias, notación científica y radicales de cabeza', ar: 'القوى والترميز العلمي والجذريات ذهنيًا' },
        levels: [
            { progressId: 37201, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', ar: 'القوى' }, description: { eu: '2⁻³ ↔ 1/8', es: '2⁻³ ↔ 1/8', ar: '2⁻³ ↔ 1/8' } },
            { progressId: 37202, stage: 'scientific', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', ar: 'الترميز العلمي' }, description: { eu: '4,5·10³ ↔ 4500', es: '4,5·10³ ↔ 4500', ar: '4.5·10³ ↔ 4500' } },
            { progressId: 37203, stage: 'roots', title: { eu: 'Erradikalak', es: 'Radicales', ar: 'الجذريات' }, description: { eu: '√72 ↔ 6√2', es: '√72 ↔ 6√2', ar: '√72 ↔ 6√2' } }
        ]
    }
]

export const powersGameProgressIds: number[] = levelProgressIds(powersGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const powersGameSlugs: Record<PowersGameId, string> = { race: 'lasterketa', order: 'ordena', extract: 'atera', guard: 'zaindaria', detective: 'detektibea', memory: 'memoria' }

export function powersGameModeForPath(pathname: string): PowersGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ordena', 'ordenar'].includes(game)) return 'order'
    if (['atera', 'sacar'].includes(game)) return 'extract'
    if (['zaindaria', 'guardian'].includes(game)) return 'guard'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
