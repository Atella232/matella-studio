import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Perimetroak, azalerak eta bolumenak (4. DBH aplikatuak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star.
   ========================================================================== */

export type AreasVolumesGameId = 'race' | 'memory'

export const AREAS_VOLUMES_GAME_RECORDS_KEY = 'matella-areak-dbh4ap-game-records'

export const areasVolumesGames: GameInfo<AreasVolumesGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Neurrien lasterketa', es: 'Carrera de medidas', ar: 'سباق القياسات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 50101, stage: 'polygons', title: { eu: 'Poligonoak', es: 'Polígonos', ar: 'المضلعات' }, description: { eu: 'Angeluak, diagonalak, zirkunferentziak eta arkuak.', es: 'Ángulos, diagonales, circunferencias y arcos.', ar: 'الزوايا والأقطار والدوائر والأقواس.' } },
            { progressId: 50102, stage: 'pythagoras', title: { eu: 'Pitagoras', es: 'Pitágoras', ar: 'فيثاغورس' }, description: { eu: 'Aldeak, altuerak eta eskailerak.', es: 'Lados, alturas y escaleras.', ar: 'الأضلاع والارتفاعات والسلالم.' } },
            { progressId: 50103, stage: 'plane-areas', title: { eu: 'Azalera lauak', es: 'Áreas planas', ar: 'المساحات المستوية' }, description: { eu: 'Poligonoak, sektoreak, koroak eta L irudiak.', es: 'Polígonos, sectores, coronas y figuras en L.', ar: 'المضلعات والقطاعات والحلقات والأشكال L.' } },
            { progressId: 50104, stage: 'solid-areas', title: { eu: 'Gorputzen azalerak', es: 'Áreas de cuerpos', ar: 'مساحات الأجسام' }, description: { eu: 'Kuboak, piramideak, zilindroak eta konoak.', es: 'Cubos, pirámides, cilindros y conos.', ar: 'المكعبات والأهرامات والأسطوانات والمخاريط.' } },
            { progressId: 50105, stage: 'volumes', title: { eu: 'Bolumenak', es: 'Volúmenes', ar: 'الحجوم' }, description: { eu: 'Gorputz bakunak eta konposatuak.', es: 'Cuerpos simples y compuestos.', ar: 'الأجسام البسيطة والمركّبة.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu kalkulu bakoitza bere emaitzarekin.', es: 'Une cada cálculo con su resultado.', ar: 'صِل كل حساب بنتيجته.' },
        skills: { eu: 'Angeluak, azalerak eta bolumenak', es: 'Ángulos, áreas y volúmenes', ar: 'الزوايا والمساحات والحجوم' },
        levels: [
            { progressId: 50201, stage: 'polygons', title: { eu: 'Angeluen batura', es: 'Suma de ángulos', ar: 'مجموع الزوايا' }, description: { eu: '(5 − 2) · 180° ↔ 540°', es: '(5 − 2) · 180° ↔ 540°', ar: '(5 − 2) · 180° ↔ 540°' } },
            { progressId: 50202, stage: 'plane-areas', title: { eu: 'Azalerak', es: 'Áreas', ar: 'المساحات' }, description: { eu: '(7 + 3) · 4 : 2 ↔ 20', es: '(7 + 3) · 4 : 2 ↔ 20', ar: '(7 + 3) · 4 : 2 ↔ 20' } },
            { progressId: 50203, stage: 'volumes', title: { eu: 'Bolumenak', es: 'Volúmenes', ar: 'الحجوم' }, description: { eu: '6² · 9 : 3 ↔ 108', es: '6² · 9 : 3 ↔ 108', ar: '6² · 9 : 3 ↔ 108' } }
        ]
    }
]

export const areasVolumesGameProgressIds: number[] = levelProgressIds(areasVolumesGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const areasVolumesGameSlugs: Record<AreasVolumesGameId, string> = { race: 'lasterketa', memory: 'memoria' }

export function areasVolumesGameModeForPath(pathname: string): AreasVolumesGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
