import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Laginketa (Batxilergoa 2 · Gizarte Zientziak) games, all of this unit:
   is it biased?, split the sample and the detective of sampling, the race
   with a circuit per stage and the memory.
   ========================================================================== */

export type SamplingBatx2gGameId = 'race' | 'bias' | 'allocate' | 'detective' | 'memory'

export const SAMPLING_BATX2G_GAME_RECORDS_KEY = 'matella-laginketa-batx2g-game-records'

export const samplingBatx2gGames: GameInfo<SamplingBatx2gGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Laginketaren lasterketa', es: 'Carrera del muestreo', en: 'Sampling race', ar: 'سباق المعاينة' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بسرعة وبشكل صحيح: تتقدم سيارتك والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 152401, stage: 'sampling', title: { eu: 'Laginketa', es: 'Muestreo', en: 'Sampling', ar: 'المعاينة' }, description: { eu: 'Jauzia eta aukeratuak.', es: 'El salto y los elegidos.', en: 'The step and those chosen.', ar: 'القفزة والمختارون.' } },
            { progressId: 152402, stage: 'strata', title: { eu: 'Geruzak', es: 'Estratos', en: 'Strata', ar: 'الطبقات' }, description: { eu: 'Esleipen proportzionala eta berdina.', es: 'Afijación proporcional e igual.', en: 'Proportional and equal allocation.', ar: 'التوزيع التناسبي والمتساوي.' } },
            { progressId: 152403, stage: 'means', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط' }, description: { eu: 'σ / √n eta probabilitateak.', es: 'σ / √n y probabilidades.', en: 'σ / √n and probabilities.', ar: 'σ / √n والاحتمالات.' } },
            { progressId: 152404, stage: 'proportions', title: { eu: 'Proportzioa', es: 'La proporción', en: 'The proportion', ar: 'النسبة' }, description: { eu: 'p̂ eta haren desbideratzea.', es: 'p̂ y su desviación.', en: 'p̂ and its deviation.', ar: 'p̂ وانحرافه.' } },
            { progressId: 152405, stage: 'characteristic', title: { eu: 'Tarteak', es: 'Intervalos', en: 'Intervals', ar: 'الفترات' }, description: { eu: 'Erradioa eta mugak.', es: 'El radio y los extremos.', en: 'The radius and the ends.', ar: 'نصف القطر والطرفان.' } }
        ]
    },
    {
        id: 'bias',
        title: { eu: 'Alboratuta dago?', es: '¿Hay sesgo?', en: 'Is it biased?', ar: 'هل هناك تحيّز؟' },
        tagline: { eu: 'Azterketa bat eta lagina aukeratzeko modu bat: ona da ala norbait kanpoan uzten du?', es: 'Un estudio y una forma de elegir la muestra: ¿es buena o deja a alguien fuera?', en: 'A study and a way of choosing the sample: is it fair or does it leave someone out?', ar: 'دراسة وطريقة لاختيار العيّنة: هل هي جيدة أم تستبعد أحدًا؟' },
        skills: { eu: 'Alborapena eta laginketa motak', es: 'El sesgo y los tipos de muestreo', en: 'Bias and the kinds of sampling', ar: 'التحيّز وأنواع المعاينة' },
        levels: [
            { progressId: 152501, stage: 'sampling', title: { eu: 'Ona ala alboratua?', es: '¿Buena o sesgada?', en: 'Fair or biased?', ar: 'جيدة أم متحيّزة؟' }, description: { eu: 'Plan bat, erabaki.', es: 'Un plan, decide.', en: 'One plan, decide.', ar: 'خطة واحدة، قرّر.' } },
            { progressId: 152502, stage: 'sampling', title: { eu: 'Aukeratu ona', es: 'Elige la buena', en: 'Pick the fair one', ar: 'اختر الجيدة' }, description: { eu: 'Hiru plan, bat bakarrik ona.', es: 'Tres planes, solo uno bueno.', en: 'Three plans, only one fair.', ar: 'ثلاث خطط، واحدة فقط جيدة.' } },
            { progressId: 152503, stage: 'strata', title: { eu: 'Zer laginketa da?', es: '¿Qué muestreo es?', en: 'Which sampling is it?', ar: 'أي معاينة هذه؟' }, description: { eu: 'Sinplea, sistematikoa, geruzatua…', es: 'Simple, sistemático, estratificado…', en: 'Simple, systematic, stratified…', ar: 'بسيطة أو منتظمة أو طبقية…' } }
        ]
    },
    {
        id: 'allocate',
        title: { eu: 'Banatu lagina', es: 'Reparte la muestra', en: 'Split the sample', ar: 'وزّع العيّنة' },
        tagline: { eu: 'Hiru geruza eta lagin bat: zenbat pertsona geruza bakoitzetik?', es: 'Tres estratos y una muestra: ¿cuántas personas de cada estrato?', en: 'Three strata and a sample: how many people from each stratum?', ar: 'ثلاث طبقات وعيّنة: كم شخصًا من كل طبقة؟' },
        skills: { eu: 'Esleipen proportzionala', es: 'Afijación proporcional', en: 'Proportional allocation', ar: 'التوزيع التناسبي' },
        levels: [
            { progressId: 152601, stage: 'strata', title: { eu: 'Zehatza', es: 'Exacta', en: 'Exact', ar: 'مضبوطة' }, description: { eu: 'Zatiak zehatz ateratzen dira.', es: 'Las partes salen exactas.', en: 'The shares come out exact.', ar: 'تخرج الحصص مضبوطة.' } },
            { progressId: 152602, stage: 'strata', title: { eu: 'Hondarrak', es: 'Restos', en: 'Remainders', ar: 'البواقي' }, description: { eu: 'Hondar handienekin.', es: 'Con los mayores restos.', en: 'With the largest remainders.', ar: 'بأكبر البواقي.' } },
            { progressId: 152603, stage: 'strata', title: { eu: 'Alderantziz', es: 'Al revés', en: 'Backwards', ar: 'بالعكس' }, description: { eu: 'Laginetik geruzara.', es: 'De la muestra al estrato.', en: 'From the sample to the stratum.', ar: 'من العيّنة إلى الطبقة.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Laginketaren detektibea', es: 'Detective del muestreo', en: 'Sampling detective', ar: 'مخبر المعاينة' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Jauzia, geruzak, √n eta tarteak', es: 'Salto, estratos, √n e intervalos', en: 'Step, strata, √n and intervals', ar: 'القفزة والطبقات و√n والفترات' },
        levels: [
            { progressId: 152701, stage: 'strata', title: { eu: 'Laginketa', es: 'Muestreo', en: 'Sampling', ar: 'المعاينة' }, description: { eu: 'Jauzia eta banaketa.', es: 'Salto y reparto.', en: 'Step and split.', ar: 'القفزة والتوزيع.' } },
            { progressId: 152702, stage: 'means', title: { eu: 'Batez bestekoa', es: 'La media', en: 'The mean', ar: 'المتوسط' }, description: { eu: '√n non doan.', es: 'Dónde va √n.', en: 'Where √n goes.', ar: 'أين يوضع √n.' } },
            { progressId: 152703, stage: 'characteristic', title: { eu: 'Proportzioak eta tarteak', es: 'Proporciones e intervalos', en: 'Proportions and intervals', ar: 'النسب والفترات' }, description: { eu: 'Erroa, balio kritikoa eta erradioa.', es: 'Raíz, valor crítico y radio.', en: 'Root, critical value and radius.', ar: 'الجذر والقيمة الحرجة ونصف القطر.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: zerrenda bat eta haren jauzia, edo lagin bat eta haren desbideratzea.', es: 'Encuentra las parejas: una lista y su salto, o una muestra y su desviación.', en: 'Find the pairs: a list and its step, or a sample and its deviation.', ar: 'جد الأزواج: قائمة وقفزتها، أو عيّنة وانحرافها.' },
        skills: { eu: 'h = N / n, σ / √n eta √(pq / n)', es: 'h = N / n, σ / √n y √(pq / n)', en: 'h = N / n, σ / √n and √(pq / n)', ar: 'h = N / n وσ / √n و√(pq / n)' },
        levels: [
            { progressId: 152801, stage: 'sampling', title: { eu: 'Jauzia', es: 'El salto', en: 'The step', ar: 'القفزة' }, description: { eu: 'N eta n ↔ h', es: 'N y n ↔ h', en: 'N and n ↔ h', ar: 'N وn ↔ h' } },
            { progressId: 152802, stage: 'means', title: { eu: 'Batez bestekoak', es: 'Las medias', en: 'The means', ar: 'المتوسطات' }, description: { eu: 'σ eta n ↔ σ / √n', es: 'σ y n ↔ σ / √n', en: 'σ and n ↔ σ / √n', ar: 'σ وn ↔ σ / √n' } },
            { progressId: 152803, stage: 'proportions', title: { eu: 'Proportzioak', es: 'Las proporciones', en: 'The proportions', ar: 'النسب' }, description: { eu: 'p eta n ↔ √(pq / n)', es: 'p y n ↔ √(pq / n)', en: 'p and n ↔ √(pq / n)', ar: 'p وn ↔ √(pq / n)' } }
        ]
    }
]

export const samplingBatx2gGameProgressIds: number[] = levelProgressIds(samplingBatx2gGames)

export const samplingBatx2gGameSlugs: Record<SamplingBatx2gGameId, string> = { race: 'lasterketa', bias: 'alborapena', allocate: 'banatu', detective: 'detektibea', memory: 'memoria' }

export function samplingBatx2gGameModeForPath(pathname: string): SamplingBatx2gGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['alborapena', 'sesgo'].includes(game)) return 'bias'
    if (['banatu', 'reparte'].includes(game)) return 'allocate'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
