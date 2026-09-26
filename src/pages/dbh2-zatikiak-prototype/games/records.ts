import type { FractionStageId, LocalizedText } from '../content.ts'

export type GameId = 'race' | 'memory' | 'target' | 'wall'
export type Stars = 0 | 1 | 2 | 3

export interface GameLevelInfo {
    /** Unit progress id, earned with the first star */
    progressId: number
    stage: FractionStageId
    title: LocalizedText
    description: LocalizedText
}

export interface GameInfo {
    id: GameId
    title: LocalizedText
    tagline: LocalizedText
    skills: LocalizedText
    levels: GameLevelInfo[]
}

/** Best result of one level. `score` is "higher is better"; `timeMs` "lower is better" */
export interface LevelRecord {
    stars: Stars
    score: number
    timeMs: number | null
}

export type GameRecords = Record<string, LevelRecord>

export const GAME_RECORDS_KEY = 'matella-zatikiak-v2-game-records'

export const games: GameInfo[] = [
    {
        id: 'race',
        title: { eu: 'Zatikien lasterketa', es: 'Carrera de fracciones', ar: 'سباق الكسور' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Sei zirkuitu, etapa bakoitzeko bat', es: 'Seis circuitos, uno por etapa', ar: 'ست حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 601, stage: 'equivalence', title: { eu: 'Baliokideak', es: 'Equivalentes', ar: 'المتكافئة' }, description: { eu: 'Sinplifikatu eta osatu zatiki baliokideak.', es: 'Simplifica y completa fracciones equivalentes.', ar: 'بسّط الكسور المتكافئة وأكملها.' } },
            { progressId: 602, stage: 'ordering', title: { eu: 'Konparatu', es: 'Comparar', ar: 'المقارنة' }, description: { eu: 'Handiena, txikiena eta tartekoa aurkitu.', es: 'Encuentra la mayor, la menor y la intermedia.', ar: 'جد الأكبر والأصغر والوسيط.' } },
            { progressId: 603, stage: 'operations', title: { eu: 'Batu eta kendu', es: 'Sumar y restar', ar: 'الجمع والطرح' }, description: { eu: 'Izendatzaile komuna eta zeinuak.', es: 'Denominador común y signos.', ar: 'المقام المشترك والإشارات.' } },
            { progressId: 604, stage: 'operations', title: { eu: 'Biderkatu eta zatitu', es: 'Multiplicar y dividir', ar: 'الضرب والقسمة' }, description: { eu: 'Biderkatu zuzenean, zatitzeko alderantzikatu.', es: 'Multiplica en línea, invierte para dividir.', ar: 'اضرب مباشرة واقلب للقسمة.' } },
            { progressId: 605, stage: 'operations', title: { eu: 'Eragiketa konbinatuak', es: 'Operaciones combinadas', ar: 'العمليات المركبة' }, description: { eu: 'Hierarkia, parentesiak eta berreturak.', es: 'Jerarquía, paréntesis y potencias.', ar: 'الأولوية والأقواس والقوى.' } },
            { progressId: 606, stage: 'proportionality', title: { eu: 'Ehunekoak eta kantitateak', es: 'Porcentajes y cantidades', ar: 'النسب المئوية والكميات' }, description: { eu: 'Zatiki baten zatia, ehunekoak eta osoa.', es: 'Fracción de una cantidad, porcentajes y el total.', ar: 'كسر من كمية والنسب المئوية والكل.' } }
        ]
    },
    {
        id: 'target',
        title: { eu: 'Itua', es: 'Diana', ar: 'الهدف' },
        tagline: { eu: 'Jaurti zatikia zenbaki-zuzenera. Zenbat eta hurbilago, orduan eta puntu gehiago.', es: 'Lanza la fracción a la recta. Cuanto más cerca, más puntos.', ar: 'ارمِ الكسر على خط الأعداد. كلما اقتربت زادت النقاط.' },
        skills: { eu: 'Estimazioa eta ordena', es: 'Estimación y orden', ar: 'التقدير والترتيب' },
        levels: [
            { progressId: 801, stage: 'meaning', title: { eu: '0 eta 1 artean', es: 'Entre 0 y 1', ar: 'بين 0 و1' }, description: { eu: 'Zatiki propioak, marka gabeko zuzen batean.', es: 'Fracciones propias en una recta sin marcas.', ar: 'كسور عادية على خط بلا علامات.' } },
            { progressId: 802, stage: 'ordering', title: { eu: '0tik 3ra', es: 'De 0 a 3', ar: 'من 0 إلى 3' }, description: { eu: 'Zatiki inpropioak, zenbaki mistoak eta hamartarrak.', es: 'Impropias, números mixtos y decimales.', ar: 'كسور غير عادية وأعداد كسرية وعشرية.' } },
            { progressId: 803, stage: 'ordering', title: { eu: '−2tik 2ra', es: 'De −2 a 2', ar: 'من −2 إلى 2' }, description: { eu: 'Zatiki negatiboak ere bai.', es: 'También fracciones negativas.', ar: 'والكسور السالبة أيضًا.' } }
        ]
    },
    {
        id: 'wall',
        title: { eu: 'Zatiki-horma', es: 'Muro de fracciones', ar: 'جدار الكسور' },
        tagline: { eu: 'Kokatu adreiluak eta osatu zehazki unitate bat balio duten ilarak.', es: 'Coloca los ladrillos y completa filas que valgan exactamente una unidad.', ar: 'ضع الطوب وأكمل صفوفًا تساوي وحدة واحدة تمامًا.' },
        skills: { eu: 'Batuketak eta baliokidetasuna', es: 'Sumas y equivalencia', ar: 'الجمع والتكافؤ' },
        levels: [
            { progressId: 901, stage: 'equivalence', title: { eu: 'Erdiak eta laurdenak', es: 'Medios y cuartos', ar: 'الأنصاف والأرباع' }, description: { eu: '1/2, 1/4 eta 1/8 adreiluak.', es: 'Ladrillos de 1/2, 1/4 y 1/8.', ar: 'طوب 1/2 و1/4 و1/8.' } },
            { progressId: 902, stage: 'equivalence', title: { eu: 'Herenak eta seirenak', es: 'Tercios y sextos', ar: 'الأثلاث والأسداس' }, description: { eu: '1/2, 1/3, 1/4, 1/6 eta 1/12 nahasita.', es: 'Mezcla de 1/2, 1/3, 1/4, 1/6 y 1/12.', ar: 'مزيج من 1/2 و1/3 و1/4 و1/6 و1/12.' } },
            { progressId: 903, stage: 'operations', title: { eu: 'Adreilu handiak', es: 'Ladrillos grandes', ar: 'طوب كبير' }, description: { eu: '2/3, 3/4, 5/12, 3/10… ere agertzen dira.', es: 'También aparecen 2/3, 3/4, 5/12, 3/10…', ar: 'تظهر أيضًا 2/3 و3/4 و5/12 و3/10…' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu balio bera modu desberdinetan idazten duten kartak.', es: 'Encuentra las cartas que escriben el mismo valor de formas distintas.', ar: 'جد البطاقات التي تكتب القيمة نفسها بطرق مختلفة.' },
        skills: { eu: 'Adierazpenak: zatikia, hamartarra, %', es: 'Representaciones: fracción, decimal, %', ar: 'التمثيلات: كسر، عشري، %' },
        levels: [
            { progressId: 701, stage: 'meaning', title: { eu: 'Bikoteak', es: 'Parejas', ar: 'أزواج' }, description: { eu: '6 bikote: zatikiak, marrazkiak eta hamartarrak.', es: '6 parejas: fracciones, dibujos y decimales.', ar: '6 أزواج: كسور ورسوم وأعداد عشرية.' } },
            { progressId: 702, stage: 'equivalence', title: { eu: 'Adierazpen gehiago', es: 'Más representaciones', ar: 'تمثيلات أكثر' }, description: { eu: '8 bikote: ehunekoak, mistoak eta zuzena.', es: '8 parejas: porcentajes, mixtos y la recta.', ar: '8 أزواج: نسب مئوية وأعداد كسرية وخط الأعداد.' } },
            { progressId: 703, stage: 'proportionality', title: { eu: 'Hirukoteak', es: 'Tríos', ar: 'ثلاثيات' }, description: { eu: '6 hirukote: zatikia, hamartarra eta ehunekoa.', es: '6 tríos: fracción, decimal y porcentaje.', ar: '6 ثلاثيات: كسر وعدد عشري ونسبة مئوية.' } }
        ]
    }
]

export const gameProgressIds: number[] = games.flatMap((game) => game.levels.map((level) => level.progressId))

export function recordKey(game: GameId, level: number): string {
    return `${game}-${level}`
}

/**
 * Keeps the best of both results: more stars first, then the better score or time.
 * Stars and bests are tracked independently so a faster but sloppier run still
 * updates the best time without lowering the stars.
 */
export function mergeRecord(previous: LevelRecord | undefined, next: LevelRecord): LevelRecord {
    if (!previous) return next
    const bestTime = previous.timeMs === null ? next.timeMs : next.timeMs === null ? previous.timeMs : Math.min(previous.timeMs, next.timeMs)
    return {
        stars: Math.max(previous.stars, next.stars) as Stars,
        score: Math.max(previous.score, next.score),
        timeMs: bestTime
    }
}

export function parseRecords(stored: string | null): GameRecords {
    if (!stored) return {}
    try {
        const parsed: unknown = JSON.parse(stored)
        if (!parsed || typeof parsed !== 'object') return {}
        const records: GameRecords = {}
        for (const [key, value] of Object.entries(parsed as Record<string, unknown>)) {
            if (!value || typeof value !== 'object') continue
            const { stars, score, timeMs } = value as Record<string, unknown>
            if (typeof stars !== 'number' || stars < 0 || stars > 3 || !Number.isInteger(stars)) continue
            if (typeof score !== 'number' || !Number.isFinite(score)) continue
            if (timeMs !== null && (typeof timeMs !== 'number' || !Number.isFinite(timeMs))) continue
            records[key] = { stars: stars as Stars, score, timeMs: timeMs as number | null }
        }
        return records
    } catch {
        return {}
    }
}

export function gameStars(records: GameRecords, game: GameInfo): number {
    return game.levels.reduce((total, _level, index) => total + (records[recordKey(game.id, index)]?.stars ?? 0), 0)
}
