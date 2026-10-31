import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Planoko mugimenduak (3. DBH) games: the list shown in the hub, with
   levels and the unit progress id each level earns with its first star.
   Four games belong to this topic (where the point lands, which movement
   it is, whether the tiles cover the plane and the movements detective);
   the race and the memory are shared engines. Level descriptions are
   plain text.
   ========================================================================== */

export type Motions3GameId = 'race' | 'where' | 'which' | 'tiles' | 'detective' | 'memory'

export const MOTIONS3_GAME_RECORDS_KEY = 'matella-mugimenduak-dbh3-game-records'

export const motions3Games: GameInfo<Motions3GameId>[] = [
    {
        id: 'race',
        title: { eu: 'Mugimenduen lasterketa', es: 'Carrera de movimientos', en: 'Movements race', ar: 'سباق الحركات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك وتجعلها الأخطاء تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            { progressId: 98101, stage: 'vectors', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' }, description: { eu: 'Osagaiak eta modulua.', es: 'Componentes y módulo.', en: 'Components and length.', ar: 'المركّبات والطول.' } },
            { progressId: 98102, stage: 'translations', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Translations', ar: 'الانسحابات' }, description: { eu: 'Puntuak eta bektoreak.', es: 'Puntos y vectores.', en: 'Points and vectors.', ar: 'النقاط والمتجهات.' } },
            { progressId: 98103, stage: 'rotations', title: { eu: 'Biraketak', es: 'Giros', en: 'Rotations', ar: 'الدورانات' }, description: { eu: '90°, 180° eta 270°.', es: '90°, 180° y 270°.', en: '90°, 180° and 270°.', ar: '90° و180° و270°.' } },
            { progressId: 98104, stage: 'reflections', title: { eu: 'Simetriak', es: 'Simetrías', en: 'Reflections', ar: 'التناظرات' }, description: { eu: 'Ardatzak eta bi ispilu.', es: 'Ejes y dos espejos.', en: 'Axes and two mirrors.', ar: 'المحاور والمرآتان.' } },
            { progressId: 98105, stage: 'patterns', title: { eu: 'Mosaikoak', es: 'Mosaicos', en: 'Tilings', ar: 'التبليطات' }, description: { eu: 'Frisoak, mosaikoak, homoteziak.', es: 'Frisos, mosaicos, homotecias.', en: 'Friezes, tilings, enlargements.', ar: 'الأفاريز والتبليطات والتحاكي.' } }
        ]
    },
    {
        id: 'where',
        title: { eu: 'Non erortzen da?', es: '¿Dónde cae?', en: 'Where does it land?', ar: 'أين تقع؟' },
        tagline: { eu: 'Puntu bat eta mugimendu bat: sakatu sarean haren irudia.', es: 'Un punto y un movimiento: toca su imagen en la cuadrícula.', en: 'A point and a movement: tap its image on the grid.', ar: 'نقطة وحركة: المس صورتها على الشبكة.' },
        skills: { eu: 'Mugimenduak koordenatuetan', es: 'Movimientos en coordenadas', en: 'Movements in coordinates', ar: 'الحركات بالإحداثيات' },
        levels: [
            { progressId: 98301, stage: 'translations', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Translations', ar: 'الانسحابات' }, description: { eu: 'Bektore batekin.', es: 'Con un vector.', en: 'By a vector.', ar: 'بمتجه.' } },
            { progressId: 98302, stage: 'rotations', title: { eu: 'Biraketak', es: 'Giros', en: 'Rotations', ar: 'الدورانات' }, description: { eu: 'Jatorriaren inguruan.', es: 'Alrededor del origen.', en: 'About the origin.', ar: 'حول الأصل.' } },
            { progressId: 98303, stage: 'reflections', title: { eu: 'Simetriak', es: 'Simetrías', en: 'Reflections', ar: 'التناظرات' }, description: { eu: 'Ardatzekiko eta puntuekiko.', es: 'Respecto a ejes y puntos.', en: 'In axes and in points.', ar: 'بالنسبة إلى محاور ونقاط.' } }
        ]
    },
    {
        id: 'which',
        title: { eu: 'Zer mugimendu da?', es: '¿Qué movimiento es?', en: 'Which movement is it?', ar: 'أي حركة هذه؟' },
        tagline: { eu: 'Bandera eta haren irudia: esan zer mugimenduk eraman duen.', es: 'La bandera y su imagen: di qué movimiento la ha llevado.', en: 'The flag and its image: say which movement took it there.', ar: 'العلم وصورته: قل أي حركة نقلته.' },
        skills: { eu: 'Mugimenduak ezagutzea', es: 'Reconocer movimientos', en: 'Recognising movements', ar: 'التعرّف على الحركات' },
        levels: [
            { progressId: 98401, stage: 'translations', title: { eu: 'Lekualdatu ala islatu', es: 'Trasladar o reflejar', en: 'Translate or reflect', ar: 'انسحاب أم انعكاس' }, description: { eu: 'Bi aukera.', es: 'Dos opciones.', en: 'Two choices.', ar: 'خياران.' } },
            { progressId: 98402, stage: 'rotations', title: { eu: 'Biraketak ere bai', es: 'También giros', en: 'Rotations too', ar: 'والدورانات أيضًا' }, description: { eu: 'Hiru aukera.', es: 'Tres opciones.', en: 'Three choices.', ar: 'ثلاثة خيارات.' } },
            { progressId: 98403, stage: 'patterns', title: { eu: 'Homoteziak ere bai', es: 'También homotecias', en: 'Enlargements too', ar: 'والتحاكي أيضًا' }, description: { eu: 'Lau aukera.', es: 'Cuatro opciones.', en: 'Four choices.', ar: 'أربعة خيارات.' } }
        ]
    },
    {
        id: 'tiles',
        title: { eu: 'Estaltzen al dute?', es: '¿Cubren el plano?', en: 'Do they tile?', ar: 'هل تغطي المستوى؟' },
        tagline: { eu: 'Poligono erregularrak erpin batean: hutsunerik gabe ixten al dute?', es: 'Polígonos regulares en un vértice: ¿cierran sin huecos?', en: 'Regular polygons at a vertex: do they close up with no gaps?', ar: 'مضلعات منتظمة عند رأس: هل تُغلق دون فراغات؟' },
        skills: { eu: 'Mosaikoak eta barne-angeluak', es: 'Mosaicos y ángulos interiores', en: 'Tilings and interior angles', ar: 'التبليطات والزوايا الداخلية' },
        levels: [
            { progressId: 98501, stage: 'patterns', title: { eu: 'Poligono bat', es: 'Un polígono', en: 'One polygon', ar: 'مضلع واحد' }, description: { eu: 'Bakarrik estaltzen al du?', es: '¿Cubre él solo?', en: 'Does it tile on its own?', ar: 'هل يغطي وحده؟' } },
            { progressId: 98502, stage: 'patterns', title: { eu: 'Zenbat?', es: '¿Cuántos?', en: 'How many?', ar: 'كم؟' }, description: { eu: 'Zenbat sartzen dira erpinean.', es: 'Cuántos caben en el vértice.', en: 'How many fit at the vertex.', ar: 'كم يتسع الرأس.' } },
            { progressId: 98503, stage: 'patterns', title: { eu: 'Nahasketak', es: 'Mezclas', en: 'Mixtures', ar: 'الخلطات' }, description: { eu: 'Poligono desberdinak batera.', es: 'Polígonos distintos juntos.', en: 'Different polygons together.', ar: 'مضلعات مختلفة معًا.' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Mugimenduen detektibea', es: 'Detective de movimientos', en: 'Movements detective', ar: 'مخبر الحركات' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: اكتشفه وقل ما نوع الخطأ.' },
        skills: { eu: 'Mugimenduetako akats tipikoak', es: 'Errores típicos de movimientos', en: 'Common mistakes with movements', ar: 'الأخطاء الشائعة في الحركات' },
        levels: [
            { progressId: 98601, stage: 'vectors', title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' }, description: { eu: 'Osagaiak, modulua eta lekualdaketak.', es: 'Componentes, módulo y traslaciones.', en: 'Components, length and translations.', ar: 'المركّبات والطول والانسحابات.' } },
            { progressId: 98602, stage: 'rotations', title: { eu: 'Biraketak eta simetriak', es: 'Giros y simetrías', en: 'Rotations and reflections', ar: 'الدورانات والتناظرات' }, description: { eu: 'Koordenatuak eta zeinuak.', es: 'Coordenadas y signos.', en: 'Coordinates and signs.', ar: 'الإحداثيات والإشارات.' } },
            { progressId: 98603, stage: 'patterns', title: { eu: 'Konposizioak eta mosaikoak', es: 'Composiciones y mosaicos', en: 'Compositions and tilings', ar: 'التركيبات والتبليطات' }, description: { eu: 'Bikoitzak, frisoak eta homoteziak.', es: 'Dobles, frisos y homotecias.', en: 'Doubles, friezes and enlargements.', ar: 'الأضعاف والأفاريز والتحاكي.' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Elkartu puntu bakoitza bere irudiarekin.', es: 'Une cada punto con su imagen.', en: 'Match each point with its image.', ar: 'صِل كل نقطة بصورتها.' },
        skills: { eu: 'Mugimenduak buruz', es: 'Movimientos de cabeza', en: 'Movements in your head', ar: 'الحركات ذهنيًا' },
        levels: [
            { progressId: 98201, stage: 'translations', title: { eu: 'Lekualdaketak', es: 'Traslaciones', en: 'Translations', ar: 'الانسحابات' }, description: { eu: 'Puntua + bektorea ↔ irudia', es: 'Punto + vector ↔ imagen', en: 'Point + vector ↔ image', ar: 'نقطة + متجه ↔ صورة' } },
            { progressId: 98202, stage: 'rotations', title: { eu: 'Biraketak', es: 'Giros', en: 'Rotations', ar: 'الدورانات' }, description: { eu: 'Puntua eta angelua ↔ irudia', es: 'Punto y ángulo ↔ imagen', en: 'Point and angle ↔ image', ar: 'نقطة وزاوية ↔ صورة' } },
            { progressId: 98203, stage: 'reflections', title: { eu: 'Simetriak', es: 'Simetrías', en: 'Reflections', ar: 'التناظرات' }, description: { eu: 'Puntua eta ardatza ↔ irudia', es: 'Punto y eje ↔ imagen', en: 'Point and axis ↔ image', ar: 'نقطة ومحور ↔ صورة' } }
        ]
    }
]

export const motions3GameProgressIds: number[] = levelProgressIds(motions3Games)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const motions3GameSlugs: Record<Motions3GameId, string> = { race: 'lasterketa', where: 'non', which: 'zein', tiles: 'mosaikoak', detective: 'detektibea', memory: 'memoria' }

export function motions3GameModeForPath(pathname: string): Motions3GameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['non', 'donde'].includes(game)) return 'where'
    if (['zein', 'cual'].includes(game)) return 'which'
    if (['mosaikoak', 'mosaicos'].includes(game)) return 'tiles'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
