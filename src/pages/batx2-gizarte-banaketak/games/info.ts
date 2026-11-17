import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import { distributionsBatx2Games } from '../../batx2-zientziak-banaketak/games/info.ts'

/* ==========================================================================
   Banaketak (Batxilergoa 2 · Gizarte Zientziak) games: three of its own
   (the cut-off mark, who stands out most? and the detective of this unit),
   and the race (circuits 2–5 of 2.º Ciencias, one per stage of this
   unit), «which area is it?», «find it in the table» and the memory of
   2.º Ciencias, with their texts and levels but the progress ids of this
   unit.
   ========================================================================== */

export type DistributionsBatx2gGameId = 'race' | 'cutoff' | 'standout' | 'detective' | 'area' | 'hunt' | 'memory'

export const DISTRIBUTIONS_BATX2G_GAME_RECORDS_KEY = 'matella-banaketak-batx2g-game-records'

const fromCiencias = (id: string) => distributionsBatx2Games.find((game) => game.id === id)!
const race = fromCiencias('race')
const area = fromCiencias('area')
const hunt = fromCiencias('hunt')
const memory = fromCiencias('memory')

export const distributionsBatx2gGames: GameInfo<DistributionsBatx2gGameId>[] = [
    { ...race, id: 'race', skills: { eu: 'Lau zirkuitu, etapa bakoitzeko bat', es: 'Cuatro circuitos, uno por etapa', en: 'Four circuits, one per stage', ar: 'أربع حلبات، واحدة لكل مرحلة' }, levels: race.levels.slice(1).map((level, index) => ({ ...level, stage: ['discrete', 'binomial', 'normal', 'approximation'][index], progressId: 151401 + index })) },
    {
        id: 'cutoff',
        title: { eu: 'Ebaketa-nota', es: 'La nota de corte', en: 'The cut-off mark', ar: 'درجة القبول' },
        tagline: { eu: 'Beka bat % onenarentzat, errepasoa txarrenentzat: aurkitu muga kanpaian.', es: 'Una beca para el mejor %, repaso para el peor: halla el corte en la campana.', en: 'A grant for the best %, revision for the lowest: find the cut-off in the bell.', ar: 'منحة لأفضل نسبة ومراجعة لأدناها: جد الحد في الجرس.' },
        skills: { eu: 'Alderantzizko bilaketa eta tarte karakteristikoa', es: 'Búsqueda inversa e intervalo característico', en: 'The inverse search and the characteristic interval', ar: 'البحث العكسي والفترة المميزة' },
        levels: [
            { progressId: 151501, stage: 'normal', title: { eu: 'Onenak', es: 'Los mejores', en: 'The best', ar: 'الأفضل' }, description: { eu: 'Eskuineko buztana.', es: 'La cola derecha.', en: 'The right tail.', ar: 'الذيل الأيمن.' } },
            { progressId: 151502, stage: 'normal', title: { eu: 'Txarrenak', es: 'Los peores', en: 'The lowest', ar: 'الأدنى' }, description: { eu: 'Ezkerreko buztana.', es: 'La cola izquierda.', en: 'The left tail.', ar: 'الذيل الأيسر.' } },
            { progressId: 151503, stage: 'approximation', title: { eu: 'Erdikoak', es: 'Los centrales', en: 'The central ones', ar: 'الأوسط' }, description: { eu: 'Tarte karakteristikoa.', es: 'El intervalo característico.', en: 'The characteristic interval.', ar: 'الفترة المميزة.' } }
        ]
    },
    {
        id: 'standout',
        title: { eu: 'Nork nabarmentzen du gehiago?', es: '¿Quién destaca más?', en: 'Who stands out most?', ar: 'من يتميز أكثر؟' },
        tagline: { eu: 'Nota desberdinak, eskala desberdinak: tipifikatu eta aukeratu nabarmenena.', es: 'Notas distintas, escalas distintas: tipifica y elige a quien más destaca.', en: 'Different marks, different scales: standardise and pick the one who stands out.', ar: 'درجات مختلفة ومقاييس مختلفة: وحّد واختر الأكثر تميزًا.' },
        skills: { eu: 'Puntuazio tipikoak', es: 'Puntuaciones tipificadas', en: 'Standard scores', ar: 'الدرجات المعيارية' },
        levels: [
            { progressId: 151601, stage: 'normal', title: { eu: 'Bi pertsona', es: 'Dos personas', en: 'Two people', ar: 'شخصان' }, description: { eu: 'z handiena.', es: 'La z mayor.', en: 'The biggest z.', ar: 'أكبر z.' } },
            { progressId: 151602, stage: 'normal', title: { eu: 'Ezohikoena', es: 'El más inusual', en: 'The most unusual', ar: 'الأكثر ندرة' }, description: { eu: 'Batez bestekotik urrunen.', es: 'El más lejos de la media.', en: 'The furthest from the mean.', ar: 'الأبعد عن المتوسط.' } },
            { progressId: 151603, stage: 'normal', title: { eu: 'Hiru pertsona', es: 'Tres personas', en: 'Three people', ar: 'ثلاثة أشخاص' }, description: { eu: 'Hiru z konparatu.', es: 'Compara tres z.', en: 'Compare three z.', ar: 'قارن ثلاث قيم z.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Banaketen detektibea', es: 'Detective de distribuciones', en: 'Distributions detective', ar: 'مخبر التوزيعات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Binomiala, taula eta tarteak', es: 'Binomial, tabla e intervalos', en: 'Binomial, table and intervals', ar: 'الثنائي والجدول والفترات' },
        levels: [
            { progressId: 151701, stage: 'binomial', title: { eu: 'Binomiala', es: 'Binomial', en: 'Binomial', ar: 'الثنائي' }, description: { eu: 'Ordenak, σ eta «gutxienez bat».', es: 'Órdenes, σ y «al menos uno».', en: 'Orders, σ and ‘at least one’.', ar: 'الترتيبات وσ و«واحد على الأقل».' } },
            { progressId: 151702, stage: 'normal', title: { eu: 'Normala', es: 'Normal', en: 'Normal', ar: 'الطبيعي' }, description: { eu: 'Taula, tipifikazioa eta buztanak.', es: 'Tabla, tipificación y colas.', en: 'Table, standardising and tails.', ar: 'الجدول والتوحيد والذيول.' } },
            { progressId: 151703, stage: 'approximation', title: { eu: 'Tarteak', es: 'Intervalos', en: 'Intervals', ar: 'الفترات' }, description: { eu: 'Erradioa, balio kritikoa eta zuzenketa.', es: 'Radio, valor crítico y corrección.', en: 'Radius, critical value and correction.', ar: 'نصف القطر والقيمة الحرجة والتصحيح.' } }
        ]
    },
    { ...area, id: 'area', levels: area.levels.map((level, index) => ({ ...level, stage: 'normal', progressId: 151811 + index })) },
    { ...hunt, id: 'hunt', levels: hunt.levels.map((level, index) => ({ ...level, stage: 'normal', progressId: 151821 + index })) },
    { ...memory, id: 'memory', levels: memory.levels.map((level, index) => ({ ...level, progressId: 151801 + index })) }
]

export const distributionsBatx2gGameProgressIds: number[] = levelProgressIds(distributionsBatx2gGames)

export const distributionsBatx2gGameSlugs: Record<DistributionsBatx2gGameId, string> = { race: 'lasterketa', cutoff: 'ebaketa', standout: 'nabarmena', detective: 'detektibea', area: 'azalera', hunt: 'taulan', memory: 'memoria' }

export function distributionsBatx2gGameModeForPath(pathname: string): DistributionsBatx2gGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['ebaketa', 'nota-de-corte'].includes(game)) return 'cutoff'
    if (['nabarmena', 'quien-destaca'].includes(game)) return 'standout'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['azalera', 'area'].includes(game)) return 'area'
    if (['taulan', 'tabla'].includes(game)) return 'hunt'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
