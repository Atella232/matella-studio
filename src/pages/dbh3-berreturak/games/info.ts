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
        title: { eu: 'Berreturen lasterketa', es: 'Carrera de potencias y raíces', en: 'Powers and roots race', ar: 'سباق القوى والجذور' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 37101, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'Zeinua, berretzaile negatiboa eta propietateak.', es: 'Signo, exponente negativo y propiedades.', en: 'Sign, negative exponent and properties.', ar: 'الإشارة والأس السالب والخصائص.' } },
            { progressId: 37102, stage: 'scientific', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' }, description: { eu: 'Berretzailea, biderketa eta zatiketa.', es: 'Exponente, producto y cociente.', en: 'Exponent, product and quotient.', ar: 'الأس والضرب والقسمة.' } },
            { progressId: 37103, stage: 'roots', title: { eu: 'Erroak', es: 'Raíces', en: 'Roots', ar: 'الجذور' }, description: { eu: 'Erro zehatzak, faktoreak atera eta sartu.', es: 'Raíces exactas, sacar y meter factores.', en: 'Exact roots, taking factors out and in.', ar: 'جذور صحيحة وإخراج العوامل وإدخالها.' } },
            { progressId: 37104, stage: 'reals', title: { eu: 'Zenbaki errealak', es: 'Números reales', en: 'Real numbers', ar: 'الأعداد الحقيقية' }, description: { eu: 'Irrazionalak, tarteak eta zuzena.', es: 'Irracionales, intervalos y recta.', en: 'Irrational numbers, intervals and the number line.', ar: 'غير النسبية والفترات والمستقيم.' } },
            { progressId: 37105, stage: 'approx', title: { eu: 'Hurbilketak', es: 'Aproximaciones', en: 'Approximations', ar: 'التقريب' }, description: { eu: 'Trunkatu, biribildu eta errorea.', es: 'Truncar, redondear y error.', en: 'Truncating, rounding and error.', ar: 'البتر والتقريب والخطأ.' } }
        ]
    },
    {
        id: 'order',
        title: { eu: 'Eskala kosmikoa', es: 'Escala cósmica', en: 'Cosmic scale', ar: 'السُّلّم الكوني' },
        tagline: { eu: 'Ordenatu tamainak txikienetik handienera: atomoetatik galaxietara.', es: 'Ordena los tamaños de menor a mayor: de los átomos a las galaxias.', en: 'Order the sizes from smallest to largest: from atoms to galaxies.', ar: 'رتّب الأحجام من الأصغر إلى الأكبر: من الذرات إلى المجرات.' },
        skills: { eu: 'Idazkera zientifikoko zenbakiak konparatzea', es: 'Comparar números en notación científica', en: 'Compare numbers in scientific notation.', ar: 'مقارنة الأعداد بالترميز العلمي' },
        levels: [
            { progressId: 37301, stage: 'scientific', title: { eu: 'Gauzak', es: 'Objetos', en: 'Objects', ar: 'الأجسام' }, description: { eu: 'Atomoa, inurria, Lurra, galaxia…', es: 'El átomo, la hormiga, la Tierra, la galaxia…', en: 'The atom, the ant, the Earth, the galaxy…', ar: 'الذرة والنملة والأرض والمجرة…' } },
            { progressId: 37302, stage: 'scientific', title: { eu: 'Berretzaileak', es: 'Exponentes', en: 'Exponents', ar: 'الأسس' }, description: { eu: 'Berretzaile positiboak eta negatiboak.', es: 'Exponentes positivos y negativos.', en: 'Positive and negative exponents.', ar: 'أسس موجبة وسالبة.' } },
            { progressId: 37303, stage: 'scientific', title: { eu: 'Tranpak', es: 'Trampas', en: 'Traps', ar: 'الفخاخ' }, description: { eu: 'Berretzaile bera eta zenbakiak ongi idatzi gabe.', es: 'Mismo exponente y números mal escritos.', en: 'Same exponent and numbers written wrongly.', ar: 'الأس نفسه وأعداد غير مكتوبة جيدًا.' } }
        ]
    },
    {
        id: 'extract',
        title: { eu: 'Atera errotik', es: 'Saca de la raíz', en: 'Take out of the root', ar: 'أخرِج من الجذر' },
        tagline: { eu: 'Faktore berdinen bikoteak errotik atera: bikote bakoitzak faktore bat ematen du.', es: 'Saca de la raíz las parejas de factores iguales: cada pareja da un factor fuera.', en: 'Take the pairs of equal factors out of the root: each pair gives one factor outside.', ar: 'أخرج أزواج العوامل المتساوية من الجذر: كل زوج يعطي عاملًا في الخارج.' },
        skills: { eu: 'Errokizuna deskonposatzea eta faktoreak ateratzea', es: 'Descomponer el radicando y sacar factores', en: 'Break down the radicand and take out factors.', ar: 'تحليل ما تحت الجذر وإخراج العوامل' },
        levels: [
            { progressId: 37401, stage: 'roots', title: { eu: 'Bi faktore lehen', es: 'Dos primos', en: 'Two prime factors', ar: 'عاملان أوليان' }, description: { eu: '√72, √50, √48…', es: '√72, √50, √48…', en: '√72, √50, √48…', ar: '√72 و√50 و√48…' } },
            { progressId: 37402, stage: 'roots', title: { eu: 'Hiru faktore lehen', es: 'Tres primos', en: 'Three prime factors', ar: 'ثلاثة عوامل أولية' }, description: { eu: '√360, √450, √588…', es: '√360, √450, √588…', en: '√360, √450, √588…', ar: '√360 و√450 و√588…' } },
            { progressId: 37403, stage: 'roots', title: { eu: 'Zenbaki handiak', es: 'Números grandes', en: 'Large numbers', ar: 'أعداد كبيرة' }, description: { eu: '√1800, √2352, √3465…', es: '√1800, √2352, √3465…', en: '√1800, √2352, √3465…', ar: '√1800 و√2352 و√3465…' } }
        ]
    },
    {
        id: 'guard',
        title: { eu: 'Zubiaren zaindaria', es: 'El guardián del puente', en: 'The bridge guardian', ar: 'حارس الجسر' },
        tagline: { eu: 'Zenbakiak zubira iristen dira: arrazionala ala irrazionala? Erabaki ondo.', es: 'Los números llegan al puente: ¿racional o irracional? Decide bien.', en: 'Numbers reach the bridge: rational or irrational? Decide carefully.', ar: 'تصل الأعداد إلى الجسر: نسبي أم غير نسبي؟ قرّر بحكمة.' },
        skills: { eu: 'Arrazionalak eta irrazionalak bereiztea', es: 'Distinguir racionales de irracionales', en: 'Telling rational numbers from irrational ones.', ar: 'التمييز بين النسبية وغير النسبية' },
        levels: [
            { progressId: 37501, stage: 'reals', title: { eu: 'Argiak', es: 'Los claros', en: 'The clear ones', ar: 'الواضحة' }, description: { eu: '√2, 0,5, π, √9…', es: '√2, 0,5, π, √9…', en: '√2, 0.5, π, √9…', ar: '√2 و0.5 و π و√9…' } },
            { progressId: 37502, stage: 'reals', title: { eu: 'Hamartarrak', es: 'Decimales', en: 'Decimals', ar: 'العشرية' }, description: { eu: 'Periodikoak, 22/7, 3,14…', es: 'Periódicos, 22/7, 3,14…', en: 'Recurring, 22/7, 3.14…', ar: 'الدورية و22/7 و3.14…' } },
            { progressId: 37503, stage: 'reals', title: { eu: 'Tranpak', es: 'Con trampa', en: 'Tricky ones', ar: 'بفخاخ' }, description: { eu: '√2·√8, 2√2, (√3)²…', es: '√2·√8, 2√2, (√3)²…', en: '√2·√8, 2√2, (√3)²…', ar: '√2·√8 و2√2 و(√3)²…' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Berreturen detektibea', es: 'Detective de potencias y raíces', en: 'Powers and roots detective', ar: 'مخبر القوى والجذور' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Berreturetako, errokoetako eta hurbilketetako akats tipikoak', es: 'Errores típicos de potencias, raíces y aproximaciones', en: 'Common mistakes with powers, roots and approximations', ar: 'الأخطاء الشائعة في القوى والجذور والتقريب' },
        levels: [
            { progressId: 37601, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: 'Zeinua, berretzaile negatiboa eta propietateak.', es: 'Signo, exponente negativo y propiedades.', en: 'Sign, negative exponent and properties.', ar: 'الإشارة والأس السالب والخصائص.' } },
            { progressId: 37602, stage: 'roots', title: { eu: 'Idazkera eta erroak', es: 'Notación y raíces', en: 'Notation and roots', ar: 'الترميز والجذور' }, description: { eu: 'Idazkera zientifikoa eta erradikalak.', es: 'Notación científica y radicales.', en: 'Scientific notation and radicals.', ar: 'الترميز العلمي والجذريات.' } },
            { progressId: 37603, stage: 'approx', title: { eu: 'Errealak eta hurbilketak', es: 'Reales y aproximaciones', en: 'Real numbers and approximations', ar: 'الحقيقية والتقريب' }, description: { eu: 'Irrazionalak, tarteak eta errorea.', es: 'Irracionales, intervalos y error.', en: 'Irrational numbers, intervals and error.', ar: 'غير النسبية والفترات والخطأ.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu adierazpen bakoitza bere balioarekin.', es: 'Une cada expresión con su valor.', en: 'Match each expression with its value.', ar: 'صِل كل عبارة بقيمتها.' },
        skills: { eu: 'Berreturak, idazkera zientifikoa eta erradikalak buruz', es: 'Potencias, notación científica y radicales de cabeza', en: 'Powers, scientific notation and radicals in your head', ar: 'القوى والترميز العلمي والجذريات ذهنيًا' },
        levels: [
            { progressId: 37201, stage: 'powers', title: { eu: 'Berreturak', es: 'Potencias', en: 'Powers', ar: 'القوى' }, description: { eu: '2⁻³ ↔ 1/8', es: '2⁻³ ↔ 1/8', en: '2⁻³ ↔ 1/8', ar: '2⁻³ ↔ 1/8' } },
            { progressId: 37202, stage: 'scientific', title: { eu: 'Idazkera zientifikoa', es: 'Notación científica', en: 'Scientific notation', ar: 'الترميز العلمي' }, description: { eu: '4,5·10³ ↔ 4500', es: '4,5·10³ ↔ 4500', en: '4.5·10³ ↔ 4500', ar: '4.5·10³ ↔ 4500' } },
            { progressId: 37203, stage: 'roots', title: { eu: 'Erradikalak', es: 'Radicales', en: 'Radicals', ar: 'الجذريات' }, description: { eu: '√72 ↔ 6√2', es: '√72 ↔ 6√2', en: '√72 ↔ 6√2', ar: '√72 ↔ 6√2' } }
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
