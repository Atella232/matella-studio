import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'
import type { Bach2gSketchStageId } from '../lessons.tsx'

/* ==========================================================================
   Funtzioen adierazpen grafikoa (Batxilergoa 2 · Gizarte Zientziak) games:
   the list shown in the hub, with levels and the unit progress id each
   level earns with its first star. Two games of its own (which graph is
   it?, fill in the card), the detective with the mistakes of this unit,
   the race and the memory.
   ========================================================================== */

export type Bach2gSketchGameId = 'race' | 'which' | 'sheet' | 'detective' | 'memory'

export const BACH2G_SKETCH_GAME_RECORDS_KEY = 'matella-adierazpena-batx2g-game-records'

const level = (progressId: number, stage: Bach2gSketchStageId, title: [string, string, string, string], description: [string, string, string, string]) => ({
    progressId,
    stage,
    title: { eu: title[0], es: title[1], ar: title[2], en: title[3] },
    description: { eu: description[0], es: description[1], ar: description[2], en: description[3] }
})

export const bach2gSketchGames: GameInfo<Bach2gSketchGameId>[] = [
    {
        id: 'race',
        title: { eu: 'Grafikoen lasterketa', es: 'Carrera de gráficas', en: 'Graphs race', ar: 'سباق التمثيلات' },
        tagline: { eu: 'Erantzun ondo eta azkar: zure autoa aurrera doa, akatsek irrist egiten dute.', es: 'Responde bien y rápido: tu coche avanza, los errores le hacen derrapar.', en: 'Answer correctly and quickly: your car moves forward, mistakes make it skid.', ar: 'أجب بدقة وسرعة: تتقدم سيارتك، والأخطاء تجعلها تنزلق.' },
        skills: { eu: 'Bost zirkuitu, etapa bakoitzeko bat', es: 'Cinco circuitos, uno por etapa', en: 'Five circuits, one per stage', ar: 'خمس حلبات، واحدة لكل مرحلة' },
        levels: [
            level(148401, 'first', ['Lehen begiradan', 'Lo primero', 'النظرة الأولى', 'First sight'], ['Izate-eremua eta ebaki-puntuak.', 'Dominio y cortes.', 'المجال والتقاطعات.', 'Domain and intercepts.']),
            level(148402, 'asymptotes', ['Asintotak', 'Asíntotas', 'المقاربات', 'Asymptotes'], ['Bertikala, horizontala eta zeiharra.', 'Vertical, horizontal y oblicua.', 'العمودي والأفقي والمائل.', 'Vertical, horizontal and oblique.']),
            level(148403, 'derivatives', ['Deribatuekin', 'Con derivadas', 'بالمشتقات', 'With derivatives'], ['Muturrak eta inflexioa.', 'Extremos e inflexión.', 'القيم القصوى والانعطاف.', 'Extrema and inflection.']),
            level(148404, 'graphs', ['Grafikoak', 'Gráficas', 'التمثيلات', 'Graphs'], ['Arrazionalak, e eta ln.', 'Racionales, e y ln.', 'الكسرية وe وln.', 'Rational, e and ln.']),
            level(148405, 'reading', ['Irakurri', 'Leer', 'القراءة', 'Read'], ['Balio absolutua eta ereduak.', 'Valor absoluto y modelos.', 'القيمة المطلقة والنماذج.', 'Absolute value and models.'])
        ]
    },
    {
        id: 'which',
        title: { eu: 'Zein grafiko da?', es: '¿Qué gráfica es?', en: 'Which graph is it?', ar: 'أي تمثيل هو؟' },
        tagline: { eu: 'Formula bat eta hiru grafiko: aukeratu berea.', es: 'Una fórmula y tres gráficas: elige la suya.', en: 'A formula and three graphs: pick its own.', ar: 'صيغة وثلاثة تمثيلات: اختر تمثيلها.' },
        skills: { eu: 'Formula grafiko bihurtu', es: 'Pasar de la fórmula a la gráfica', en: 'From the formula to the graph', ar: 'من الصيغة إلى التمثيل' },
        levels: [
            level(148501, 'graphs', ['Polinomioak', 'Polinomios', 'الحدوديات', 'Polynomials'], ['Adarrak eta muturrak.', 'Ramas y extremos.', 'الفرعان والقيم القصوى.', 'Branches and extrema.']),
            level(148502, 'asymptotes', ['Arrazionalak', 'Racionales', 'الكسرية', 'Rational'], ['Asintotak eta adarrak.', 'Asíntotas y ramas.', 'المقاربات والفرعان.', 'Asymptotes and branches.']),
            level(148503, 'graphs', ['e eta ln', 'e y ln', 'e وln', 'e and ln'], ['Ispiluak eta asintotak.', 'Espejos y asíntotas.', 'المرايا والمقاربات.', 'Mirrors and asymptotes.'])
        ]
    },
    {
        id: 'sheet',
        title: { eu: 'Osatu fitxa', es: 'Completa la ficha', en: 'Fill in the card', ar: 'أكمل البطاقة' },
        tagline: { eu: 'Funtzio bat eta haren fitxaren lerro bat: aukeratu datu zuzena.', es: 'Una función y una línea de su ficha: elige el dato correcto.', en: 'A function and one line of its card: pick the right fact.', ar: 'دالة وسطر من بطاقتها: اختر المعطى الصحيح.' },
        skills: { eu: 'Izate-eremua, asintotak eta muturrak', es: 'Dominio, asíntotas y extremos', en: 'Domain, asymptotes and extrema', ar: 'المجال والمقاربات والقيم القصوى' },
        levels: [
            level(148601, 'first', ['Lehen begiradan', 'Lo primero', 'النظرة الأولى', 'First sight'], ['Izate-eremua eta ebaki-puntuak.', 'Dominio y cortes.', 'المجال والتقاطعات.', 'Domain and intercepts.']),
            level(148602, 'asymptotes', ['Asintotak', 'Asíntotas', 'المقاربات', 'Asymptotes'], ['Hiru motak.', 'Los tres tipos.', 'الأنواع الثلاثة.', 'The three kinds.']),
            level(148603, 'derivatives', ['Muturrak', 'Extremos', 'القيم القصوى', 'Extrema'], ['Maximoa, minimoa eta inflexioa.', 'Máximo, mínimo e inflexión.', 'العظمى والصغرى والانعطاف.', 'Maximum, minimum and inflection.'])
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Grafikoen detektibea', es: 'Detective de gráficas', en: 'Graphs detective', ar: 'مخبر التمثيلات' },
        tagline: { eu: 'Ebatzitako ariketa batean lerro bat dago gaizki: aurkitu eta esan zer akats den.', es: 'En un ejercicio resuelto hay una línea mal: encuéntrala y di qué error es.', en: 'In a solved exercise one line is wrong: find it and name the mistake.', ar: 'في تمرين محلول سطر خاطئ: اعثر عليه وسمِّ الخطأ.' },
        skills: { eu: 'Grafikoak marraztean egiten diren akatsak', es: 'Los errores típicos al representar funciones', en: 'The typical mistakes in curve sketching', ar: 'الأخطاء الشائعة في رسم الدوال' },
        levels: [
            level(148701, 'asymptotes', ['Lehen begiradan', 'Lo primero', 'النظرة الأولى', 'First sight'], ['Izate-eremua, zuloak eta asintotak.', 'Dominio, agujeros y asíntotas.', 'المجال والثغرات والمقاربات.', 'Domain, holes and asymptotes.']),
            level(148702, 'derivatives', ['Deribatuekin', 'Con derivadas', 'بالمشتقات', 'With derivatives'], ["Inflexioa, muturrak eta f''.", "Inflexión, extremos y f''.", "الانعطاف والقيم القصوى و‏f''.", "Inflection, extrema and f''."]),
            level(148703, 'reading', ['Grafikoak', 'Gráficas', 'التمثيلات', 'Graphs'], ['Zeiharra, ln, balio absolutua eta ereduak.', 'Oblicua, ln, valor absoluto y modelos.', 'المائل وln والقيمة المطلقة والنماذج.', 'Oblique, ln, absolute value and models.'])
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Asintoten memoria', es: 'Memoria de asíntotas', en: 'Asymptotes memory', ar: 'ذاكرة المقاربات' },
        tagline: { eu: 'Aurkitu bikoteak: funtzio bat eta haren asintota.', es: 'Encuentra las parejas: una función y su asíntota.', en: 'Find the pairs: a function and its asymptote.', ar: 'اعثر على الأزواج: دالة ومقاربها.' },
        skills: { eu: 'Bertikalak, horizontalak eta zeiharrak', es: 'Verticales, horizontales y oblicuas', en: 'Vertical, horizontal and oblique', ar: 'العمودية والأفقية والمائلة' },
        levels: [
            level(148801, 'asymptotes', ['Bertikalak', 'Verticales', 'العمودية', 'Vertical'], ['k/(x − a).', 'k/(x − a).', 'k/(x − a).', 'k/(x − a).']),
            level(148802, 'asymptotes', ['Horizontalak', 'Horizontales', 'الأفقية', 'Horizontal'], ['(bx + c)/(x − a).', '(bx + c)/(x − a).', '(bx + c)/(x − a).', '(bx + c)/(x − a).']),
            level(148803, 'asymptotes', ['Zeiharrak', 'Oblicuas', 'المائلة', 'Oblique'], ['(x² + px + q)/x.', '(x² + px + q)/x.', '(x² + px + q)/x.', '(x² + px + q)/x.'])
        ]
    }
]

export const bach2gSketchGameProgressIds: number[] = levelProgressIds(bach2gSketchGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const bach2gSketchGameSlugs: Record<Bach2gSketchGameId, string> = { race: 'lasterketa', which: 'zein-grafiko', sheet: 'fitxa', detective: 'detektibea', memory: 'memoria' }

export function bach2gSketchGameModeForPath(pathname: string): Bach2gSketchGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['carrera', 'lasterketa'].includes(game)) return 'race'
    if (['zein-grafiko', 'que-grafica'].includes(game)) return 'which'
    if (['fitxa', 'ficha'].includes(game)) return 'sheet'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
