import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Ekuazioak eta sistemak (3. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Four games belong to this topic (the right step, the roots on the line,
   where two lines cross and the equations detective); the race and the
   memory are shared engines.
   ========================================================================== */

export type Equations3GameId = 'race' | 'step' | 'roots' | 'crossing' | 'detective' | 'memory'

export const EQUATIONS3_GAME_RECORDS_KEY = 'matella-ekuazioak-dbh3-game-records'

export const equations3Games: GameInfo<Equations3GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Ekuazioen lasterketa', es: 'Carrera de ecuaciones', en: 'Equations race', ar: 'سباق المعادلات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 94101, stage: 'linear', title: { eu: 'Lehen maila', es: 'Primer grado', en: 'First degree', ar: 'الدرجة الأولى' }, description: { eu: 'Parentesiak eta izendatzaileak.', es: 'Paréntesis y denominadores.', en: 'Brackets and denominators.', ar: 'الأقواس والمقامات.' } },
            { progressId: 94102, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' }, description: { eu: 'Ebazpenak eta diskriminatzailea.', es: 'Soluciones y discriminante.', en: 'Solutions and the discriminant.', ar: 'الحلول والمميّز.' } },
            { progressId: 94103, stage: 'systems', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'Bikoteak eta ebakidurak.', es: 'Parejas y puntos de corte.', en: 'Pairs and crossing points.', ar: 'الأزواج ونقاط التقاطع.' } },
            { progressId: 94104, stage: 'methods', title: { eu: 'Metodoak', es: 'Métodos', en: 'Methods', ar: 'الطرق' }, description: { eu: 'Ordezkapena, berdinketa, laburketa.', es: 'Sustitución, igualación, reducción.', en: 'Substitution, equalisation, elimination.', ar: 'التعويض والمساواة والحذف.' } },
            { progressId: 94105, stage: 'problems', title: { eu: 'Problemak', es: 'Problemas', en: 'Problems', ar: 'المسائل' }, description: { eu: 'Zenbakiak, adinak eta sarrerak.', es: 'Números, edades y entradas.', en: 'Numbers, ages and tickets.', ar: 'أعداد وأعمار وتذاكر.' } }
        ]
    },
    {
        id: 'step',
        title: { eu: 'Urrats zuzena', es: 'El paso correcto', en: 'The right step', ar: 'الخطوة الصحيحة' },
        tagline: { eu: 'Hiru urratsetatik bakarra da ekuazio baliokidea: aukeratu.', es: 'De tres pasos, solo uno da una ecuación equivalente: elígelo.', en: 'Of three steps, only one gives an equivalent equation: choose it.', ar: 'من ثلاث خطوات واحدة فقط تعطي معادلة مكافئة: اخترها.' },
        skills: { eu: 'Ekuazio baliokideak', es: 'Ecuaciones equivalentes', en: 'Equivalent equations', ar: 'المعادلات المكافئة' },
        levels: [
            { progressId: 94301, stage: 'linear', title: { eu: 'Gaiak eraman', es: 'Trasponer', en: 'Moving terms', ar: 'نقل الحدود' }, description: { eu: 'Batzen zena kentzen da.', es: 'Lo que suma pasa restando.', en: 'Adding becomes subtracting.', ar: 'الجمع يصير طرحًا.' } },
            { progressId: 94302, stage: 'linear', title: { eu: 'Parentesiak', es: 'Paréntesis', en: 'Brackets', ar: 'الأقواس' }, description: { eu: 'Minusak gai guztiei.', es: 'El menos, a todos.', en: 'The minus, to all.', ar: 'السالب على الكل.' } },
            { progressId: 94303, stage: 'linear', title: { eu: 'Izendatzaileak', es: 'Denominadores', en: 'Denominators', ar: 'المقامات' }, description: { eu: 'Gai guztiak bider m.k.t.', es: 'Todos los términos por el m.c.m.', en: 'Every term times the LCM.', ar: 'كل الحدود في م.م.أ.' } }
        ]
    },
    {
        id: 'roots',
        title: { eu: 'Erroak zuzenean', es: 'Raíces en la recta', en: 'Roots on the line', ar: 'الجذور على المستقيم' },
        tagline: { eu: 'Markatu ekuazioaren ebazpen guztiak zuzenean, edo esan ez duela.', es: 'Marca en la recta todas las soluciones de la ecuación, o di que no tiene.', en: 'Mark every solution of the equation on the line, or say it has none.', ar: 'علّم كل حلول المعادلة على المستقيم، أو قل إنه لا حل لها.' },
        skills: { eu: 'Bigarren mailako ekuazioak', es: 'Ecuaciones de segundo grado', en: 'Quadratic equations', ar: 'معادلات الدرجة الثانية' },
        levels: [
            { progressId: 94401, stage: 'quadratic', title: { eu: 'Osatugabeak', es: 'Incompletas', en: 'Incomplete', ar: 'الناقصة' }, description: { eu: 'ax² + c eta ax² + bx', es: 'ax² + c y ax² + bx', en: 'ax² + c and ax² + bx', ar: '\u2066ax²\u00a0+\u00a0c\u2069 و\u2066ax²\u00a0+\u00a0bx\u2069' } },
            { progressId: 94402, stage: 'quadratic', title: { eu: 'Osoak', es: 'Completas', en: 'Complete', ar: 'التامة' }, description: { eu: 'Bi ebazpen.', es: 'Dos soluciones.', en: 'Two solutions.', ar: 'حلّان.' } },
            { progressId: 94403, stage: 'quadratic', title: { eu: 'Zenbat?', es: '¿Cuántas?', en: 'How many?', ar: 'كم؟' }, description: { eu: 'Bat, bi ala bat ere ez.', es: 'Una, dos o ninguna.', en: 'One, two or none.', ar: 'حلّ أو حلّان أو لا حل.' } }
        ]
    },
    {
        id: 'crossing',
        title: { eu: 'Zuzenen gurutzea', es: 'El cruce de rectas', en: 'Where lines cross', ar: 'تقاطع المستقيمات' },
        tagline: { eu: 'Sakatu bi zuzenen ebakidura-puntua, edo esan paraleloak edo berdinak direla.', es: 'Toca el punto donde se cortan las dos rectas, o di si son paralelas o la misma.', en: 'Tap the point where the two lines cross, or say whether they are parallel or the same line.', ar: 'المس نقطة تقاطع المستقيمين، أو قل إنهما متوازيان أو متطابقان.' },
        skills: { eu: 'Sistemen ebazpen grafikoa', es: 'Resolución gráfica de sistemas', en: 'Solving systems graphically', ar: 'الحل البياني للأنظمة' },
        levels: [
            { progressId: 94501, stage: 'systems', title: { eu: 'Marraztuta', es: 'Dibujadas', en: 'Drawn', ar: 'مرسومة' }, description: { eu: 'Zuzenak ikusten dira.', es: 'Las rectas se ven.', en: 'The lines are drawn.', ar: 'المستقيمات ظاهرة.' } },
            { progressId: 94502, stage: 'systems', title: { eu: 'Ekuazioak', es: 'Ecuaciones', en: 'Equations', ar: 'معادلات' }, description: { eu: 'Ekuazioak bakarrik; zuzenak gero.', es: 'Solo las ecuaciones; las rectas, después.', en: 'Only the equations; the lines come after.', ar: 'المعادلتان فقط؛ والمستقيمان بعد ذلك.' } },
            { progressId: 94503, stage: 'systems', title: { eu: 'Hiru motak', es: 'Los tres tipos', en: 'All three kinds', ar: 'الأنواع الثلاثة' }, description: { eu: 'Paraleloak eta berdinak ere bai.', es: 'También paralelas e iguales.', en: 'Parallel and identical lines too.', ar: 'والمتوازية والمتطابقة أيضًا.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Ekuazioen detektibea', es: 'Detective de ecuaciones', en: 'Equations detective', ar: 'مخبر المعادلات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Ekuazioetako akats tipikoak', es: 'Errores típicos de ecuaciones', en: 'Common mistakes with equations', ar: 'الأخطاء الشائعة في المعادلات' },
        levels: [
            { progressId: 94601, stage: 'linear', title: { eu: 'Lehen maila', es: 'Primer grado', en: 'First degree', ar: 'الدرجة الأولى' }, description: { eu: 'Zeinuak, parentesiak eta izendatzaileak.', es: 'Signos, paréntesis y denominadores.', en: 'Signs, brackets and denominators.', ar: 'الإشارات والأقواس والمقامات.' } },
            { progressId: 94602, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' }, description: { eu: 'Galdutako erroak eta zeinuak.', es: 'Raíces perdidas y signos.', en: 'Lost roots and signs.', ar: 'جذور ضائعة وإشارات.' } },
            { progressId: 94603, stage: 'methods', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'Ordezkatu, biderkatu eta egiaztatu.', es: 'Sustituir, multiplicar y comprobar.', en: 'Substituting, multiplying and checking.', ar: 'التعويض والضرب والتحقق.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu ekuazio bakoitza bere ebazpenarekin.', es: 'Une cada ecuación con su solución.', en: 'Match each equation with its solution.', ar: 'صِل كل معادلة بحلّها.' },
        skills: { eu: 'Ekuazioak buruz ebaztea', es: 'Resolver ecuaciones de cabeza', en: 'Solving equations in your head', ar: 'حلّ المعادلات ذهنيًا' },
        levels: [
            { progressId: 94201, stage: 'linear', title: { eu: 'Lehen maila', es: 'Primer grado', en: 'First degree', ar: 'الدرجة الأولى' }, description: { eu: '3x − 4 = 11 ↔ x = 5', es: '3x − 4 = 11 ↔ x = 5', en: '3x − 4 = 11 ↔ x = 5', ar: '\u20663x\u00a0−\u00a04\u00a0=\u00a011\u00a0↔\u00a0x\u00a0=\u00a05\u2069' } },
            { progressId: 94202, stage: 'quadratic', title: { eu: 'Bigarren maila', es: 'Segundo grado', en: 'Second degree', ar: 'الدرجة الثانية' }, description: { eu: 'x² = 49 ↔ x = ±7', es: 'x² = 49 ↔ x = ±7', en: 'x² = 49 ↔ x = ±7', ar: '\u2066x²\u00a0=\u00a049\u00a0↔\u00a0x\u00a0=\u00a0±7\u2069' } },
            { progressId: 94203, stage: 'systems', title: { eu: 'Sistemak', es: 'Sistemas', en: 'Systems', ar: 'الأنظمة' }, description: { eu: 'x + y = 5, x − y = 1 ↔ (3, 2)', es: 'x + y = 5, x − y = 1 ↔ (3, 2)', en: 'x + y = 5, x − y = 1 ↔ (3, 2)', ar: '\u2066x\u00a0+\u00a0y\u00a0=\u00a05,\u00a0x\u00a0−\u00a0y\u00a0=\u00a01\u00a0↔\u00a0(3,\u00a02)\u2069' } }
        ]
    }
]

export const equations3GameProgressIds: number[] = levelProgressIds(equations3Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const equations3GameSlugs: Record<Equations3GameId, string> = { race: 'lasterketa', step: 'urratsa', roots: 'erroak', crossing: 'gurutzea', detective: 'detektibea', memory: 'memoria' }

export function equations3GameModeForPath(pathname: string): Equations3GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['urratsa', 'paso'].includes(game)) return 'step'
    if (['erroak', 'raices'].includes(game)) return 'roots'
    if (['gurutzea', 'cruce'].includes(game)) return 'crossing'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
