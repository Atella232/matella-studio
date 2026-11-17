import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Inferentzia (Batxilergoa 2 · Gizarte Zientziak) games, all of this
   unit: true or false?, from the interval to the data and the detective
   of inference, the race with a circuit per stage and the memory.
   ========================================================================== */

export type InferenceBatx2gGameId = 'race' | 'truth' | 'backwards' | 'detective' | 'memory'

export const INFERENCE_BATX2G_GAME_RECORDS_KEY = 'matella-inferentzia-batx2g-game-records'

export const inferenceBatx2gGames: GameInfo<InferenceBatx2gGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Inferentziaren lasterketa', es: 'Carrera de la inferencia', en: 'Inference race', ar: 'سباق الاستدلال' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 153401, stage: 'estimation', title: { eu: 'Estimazioa', es: 'Estimación', en: 'Estimation', ar: 'التقدير' }, description: { eu: '$\\hat{p}$ eta balio kritikoa.', es: '$\\hat{p}$ y el valor crítico.', en: '$\\hat{p}$ and the critical value.', ar: '$\\hat{p}$ والقيمة الحرجة.' } },
            { progressId: 153402, stage: 'mean-ci', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط' }, description: { eu: 'Errorea eta mugak.', es: 'El error y los extremos.', en: 'The error and the ends.', ar: 'الخطأ والطرفان.' } },
            { progressId: 153403, stage: 'error-size', title: { eu: 'Tamaina', es: 'Tamaño', en: 'Size', ar: 'الحجم' }, description: { eu: '$n$, gorantz biribilduta.', es: '$n$, redondeada hacia arriba.', en: '$n$, rounded up.', ar: '$n$ مقرّبًا إلى الأعلى.' } },
            { progressId: 153404, stage: 'proportion-ci', title: { eu: 'Proportzioa', es: 'La proporción', en: 'The proportion', ar: 'النسبة' }, description: { eu: 'Errorea eta tamaina.', es: 'Error y tamaño.', en: 'Error and size.', ar: 'الخطأ والحجم.' } },
            { progressId: 153405, stage: 'decisions', title: { eu: 'Inkestak', es: 'Encuestas', en: 'Polls', ar: 'الاستطلاعات' }, description: { eu: 'Marjina eta tartearen erdia.', es: 'Margen y mitad del intervalo.', en: 'Margin and half the interval.', ar: 'الهامش ونصف الفترة.' } }
        ]
    },
    {
        id: 'truth',
        title: { eu: 'Egia ala gezurra?', es: '¿Verdadero o falso?', en: 'True or false?', ar: 'صحيح أم خطأ؟' },
        tagline: { eu: 'Konfiantza-tarteei buruzko esaldiak: egiazkoak dira ala ez?', es: 'Frases sobre intervalos de confianza: ¿son verdad o no?', en: 'Sentences about confidence intervals: are they true or not?', ar: 'عبارات عن فترات الثقة: هل هي صحيحة أم لا؟' },
        skills: { eu: 'Konfiantza ondo interpretatzea', es: 'Interpretar bien la confianza', en: 'Reading confidence properly', ar: 'تفسير الثقة جيدًا' },
        levels: [
            { progressId: 153501, stage: 'mean-ci', title: { eu: 'Esanahia', es: 'Significado', en: 'Meaning', ar: 'المعنى' }, description: { eu: 'Zer esan nahi du % 95 batek?', es: '¿Qué quiere decir un 95 %?', en: 'What does 95% mean?', ar: 'ماذا تعني 95 %؟' } },
            { progressId: 153502, stage: 'error-size', title: { eu: 'Aldaketak', es: 'Cambios', en: 'Changes', ar: 'التغييرات' }, description: { eu: 'Maila, $n$ eta $\\sigma$.', es: 'Nivel, $n$ y $\\sigma$.', en: 'Level, $n$ and $\\sigma$.', ar: 'المستوى و$n$ و$\\sigma$.' } },
            { progressId: 153503, stage: 'decisions', title: { eu: 'Zenbakiekin', es: 'Con números', en: 'With numbers', ar: 'بالأعداد' }, description: { eu: 'Tarte jakin bat.', es: 'Un intervalo concreto.', en: 'A given interval.', ar: 'فترة معيّنة.' } }
        ]
    },
    {
        id: 'backwards',
        title: { eu: 'Tartetik datuetara', es: 'Del intervalo a los datos', en: 'From the interval to the data', ar: 'من الفترة إلى البيانات' },
        tagline: { eu: 'Tarte bat duzu: aurkitu zer datuk eman duten.', es: 'Tienes un intervalo: descubre qué datos lo dieron.', en: 'You have an interval: find the data that gave it.', ar: 'لديك فترة: اكتشف البيانات التي أعطتها.' },
        skills: { eu: '$\\bar{x}$, $E$, $n$ eta maila tartetik', es: '$\\bar{x}$, $E$, $n$ y el nivel desde el intervalo', en: '$\\bar{x}$, $E$, $n$ and the level from the interval', ar: '$\\bar{x}$ و$E$ و$n$ والمستوى من الفترة' },
        levels: [
            { progressId: 153601, stage: 'mean-ci', title: { eu: 'Erdia eta errorea', es: 'Centro y error', en: 'Centre and error', ar: 'الوسط والخطأ' }, description: { eu: '$\\bar{x}$ edo $E$.', es: '$\\bar{x}$ o $E$.', en: '$\\bar{x}$ or $E$.', ar: '$\\bar{x}$ أو $E$.' } },
            { progressId: 153602, stage: 'error-size', title: { eu: 'Tamaina', es: 'Tamaño', en: 'Size', ar: 'الحجم' }, description: { eu: '$n$ aurkitu.', es: 'Halla $n$.', en: 'Find $n$.', ar: 'جد $n$.' } },
            { progressId: 153603, stage: 'estimation', title: { eu: 'Maila', es: 'Nivel', en: 'Level', ar: 'المستوى' }, description: { eu: 'Zein konfiantzarekin?', es: '¿Con qué confianza?', en: 'At what confidence?', ar: 'بأي ثقة؟' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Inferentziaren detektibea', es: 'Detective de la inferencia', en: 'Inference detective', ar: 'مخبر الاستدلال' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Tarteak, tamainak eta proportzioak', es: 'Intervalos, tamaños y proporciones', en: 'Intervals, sizes and proportions', ar: 'الفترات والأحجام والنسب' },
        levels: [
            { progressId: 153701, stage: 'mean-ci', title: { eu: 'Tartea', es: 'Intervalo', en: 'Interval', ar: 'الفترة' }, description: { eu: 'Balio kritikoa, erradioa eta zabalera.', es: 'Valor crítico, radio y anchura.', en: 'Critical value, radius and width.', ar: 'القيمة الحرجة ونصف القطر والعرض.' } },
            { progressId: 153702, stage: 'error-size', title: { eu: 'Tamaina', es: 'Tamaño', en: 'Size', ar: 'الحجم' }, description: { eu: 'Biribildu eta karratua.', es: 'Redondeo y cuadrado.', en: 'Rounding and squaring.', ar: 'التقريب والتربيع.' } },
            { progressId: 153703, stage: 'proportion-ci', title: { eu: 'Proportzioak', es: 'Proporciones', en: 'Proportions', ar: 'النسب' }, description: { eu: 'Erroa, kasurik txarrena eta ehunekoa.', es: 'Raíz, peor caso y porcentaje.', en: 'Root, worst case and percentage.', ar: 'الجذر وأسوأ حالة والنسبة المئوية.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: maila bat eta haren balio kritikoa, edo tarte bat eta haren erdia edo errorea.', es: 'Encuentra las parejas: un nivel y su valor crítico, o un intervalo y su centro o su error.', en: 'Find the pairs: a level and its critical value, or an interval and its centre or its error.', ar: 'جد الأزواج: مستوى وقيمته الحرجة، أو فترة ووسطها أو خطؤها.' },
        skills: { eu: 'z, x̄ eta E', es: 'z, x̄ y E', en: 'z, x̄ and E', ar: 'z وx̄ وE' },
        levels: [
            { progressId: 153801, stage: 'estimation', title: { eu: 'Balio kritikoak', es: 'Valores críticos', en: 'Critical values', ar: 'القيم الحرجة' }, description: { eu: 'Maila ↔ z', es: 'Nivel ↔ z', en: 'Level ↔ z', ar: 'المستوى ↔ z' } },
            { progressId: 153802, stage: 'mean-ci', title: { eu: 'Erdia', es: 'El centro', en: 'The centre', ar: 'الوسط' }, description: { eu: 'Tartea ↔ x̄', es: 'Intervalo ↔ x̄', en: 'Interval ↔ x̄', ar: 'الفترة ↔ x̄' } },
            { progressId: 153803, stage: 'mean-ci', title: { eu: 'Errorea', es: 'El error', en: 'The error', ar: 'الخطأ' }, description: { eu: 'Tartea ↔ E', es: 'Intervalo ↔ E', en: 'Interval ↔ E', ar: 'الفترة ↔ E' } }
        ]
    }
]

export const inferenceBatx2gGameProgressIds: number[] = levelProgressIds(inferenceBatx2gGames)

export const inferenceBatx2gGameSlugs: Record<InferenceBatx2gGameId, string> = { race: 'lasterketa', truth: 'egia', backwards: 'alderantziz', detective: 'detektibea', memory: 'memoria' }

export function inferenceBatx2gGameModeForPath(pathname: string): InferenceBatx2gGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['egia', 'verdadero'].includes(game)) return 'truth'
    if (['alderantziz', 'del-intervalo'].includes(game)) return 'backwards'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
