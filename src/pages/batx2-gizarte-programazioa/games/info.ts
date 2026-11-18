import { levelProgressIds, type GameInfo } from '../../../features/unit-v2/games/records.ts'

/* ==========================================================================
   Programazio lineala (Batxilergoa 2 · Gizarte Zientziak) games: the list
   shown in the hub, with levels and the unit progress id each level earns
   with its first star. Five games of its own: which vertex wins,
   constraint express, unique, multiple or none, the detective and the
   memory. Block of ids: 144401–144899.
   ========================================================================== */

export type ProgramazioaGameId = 'which-vertex' | 'express' | 'solution-kind' | 'detective' | 'memory'

export const PROGRAMAZIOA_GAME_RECORDS_KEY = 'matella-programazioa-batx2g-game-records'

export const programazioaGames: GameInfo<ProgramazioaGameId>[] = [
    {
        id: 'which-vertex',
        title: { eu: 'Zein erpinek irabazten du?', es: '¿Qué vértice gana?', en: 'Which vertex wins?', ar: 'أي رأس يفوز؟' },
        tagline: { eu: 'Eskualde bat eta helburu-funtzio bat: aukeratu optimoa ematen duen erpina.', es: 'Una región y una función objetivo: elige el vértice que da el óptimo.', en: 'A region and an objective function: choose the vertex that gives the optimum.', ar: 'منطقة ودالة هدف: اختر الرأس الذي يعطي القيمة المثلى.' },
        skills: { eu: 'Erpinen metodoa', es: 'El método de los vértices', en: 'The method of the vertices', ar: 'طريقة الرؤوس' },
        levels: [
            { progressId: 144401, stage: 'objective', title: { eu: 'Maximoa', es: 'Máximo', en: 'Maximum', ar: 'العظمى' }, description: { eu: 'Bi murrizketa ≤', es: 'Dos restricciones ≤', en: 'Two ≤ constraints', ar: 'قيدان ≤' } },
            { progressId: 144402, stage: 'objective', title: { eu: 'Minimoa', es: 'Mínimo', en: 'Minimum', ar: 'الصغرى' }, description: { eu: '≥ murrizketak eta (0, 0) tranpa', es: 'Restricciones ≥ y la trampa (0, 0)', en: '≥ constraints and the (0, 0) trap', ar: 'قيود ≥ وفخ (0، 0)' } },
            { progressId: 144403, stage: 'problems', title: { eu: 'Hiru murrizketa', es: 'Tres restricciones', en: 'Three constraints', ar: 'ثلاثة قيود' }, description: { eu: 'Erpin gehiago', es: 'Más vértices', en: 'More vertices', ar: 'رؤوس أكثر' } }
        ]
    },
    {
        id: 'express',
        title: { eu: 'Murrizketa azkarra', es: 'Restricción exprés', en: 'Constraint express', ar: 'القيد السريع' },
        tagline: { eu: 'Problema baten esaldi bat eta lau inekuazio: bakarrak esaten du esaldiak esaten duena.', es: 'Una frase de un problema y cuatro inecuaciones: solo una dice lo que dice la frase.', en: 'A sentence of a problem and four inequalities: only one says what the sentence says.', ar: 'جملة من مسألة وأربع متراجحات: واحدة فقط تقول ما تقوله الجملة.' },
        skills: { eu: 'Murrizketak idaztea', es: 'Escribir restricciones', en: 'Writing constraints', ar: 'كتابة القيود' },
        levels: [
            { progressId: 144501, stage: 'regions', title: { eu: 'Gehienez eta gutxienez', es: 'Como mucho y al menos', en: 'At most and at least', ar: 'على الأكثر وعلى الأقل' }, description: { eu: 'Orduak, guztira, A', es: 'Horas, total, A', en: 'Hours, total, A', ar: 'الساعات والمجموع وA' } },
            { progressId: 144502, stage: 'regions', title: { eu: 'Aurrekontua', es: 'Presupuesto', en: 'Budget', ar: 'الميزانية' }, description: { eu: 'Prezioak, B, B ≤ A', es: 'Precios, B, B ≤ A', en: 'Prices, B, B ≤ A', ar: 'الأسعار وB وB ≤ A' } },
            { progressId: 144503, stage: 'problems', title: { eu: 'Arrazoiak eta dietak', es: 'Razones y dietas', en: 'Ratios and diets', ar: 'النسب والأنظمة الغذائية' }, description: { eu: 'Bikoitza, proteinak, orduak', es: 'El doble, proteínas, horas', en: 'Twice, proteins, hours', ar: 'الضعف والبروتين والساعات' } }
        ]
    },
    {
        id: 'solution-kind',
        title: { eu: 'Bakarra, anitza ala bat ere ez?', es: '¿Única, múltiple o ninguna?', en: 'Unique, multiple or none?', ar: 'وحيد أم متعدد أم لا شيء؟' },
        tagline: { eu: 'Eskualde bat eta F: soluzioa bakarra, anitza, optimorik gabea ala hutsa da?', es: 'Una región y F: ¿la solución es única, múltiple, sin óptimo o vacía?', en: 'A region and F: is the solution unique, multiple, without optimum or empty?', ar: 'منطقة وF: هل الحل وحيد أم متعدد أم بلا قيمة مثلى أم خالٍ؟' },
        skills: { eu: 'Soluzio motak', es: 'Tipos de solución', en: 'Kinds of solution', ar: 'أنواع الحلول' },
        levels: [
            { progressId: 144601, stage: 'cases', title: { eu: 'Bakarra ala anitza', es: 'Única o múltiple', en: 'Unique or multiple', ar: 'وحيد أم متعدد' }, description: { eu: 'Eskualde itxiak', es: 'Regiones cerradas', en: 'Closed regions', ar: 'مناطق مغلقة' } },
            { progressId: 144602, stage: 'cases', title: { eu: 'Lau motak', es: 'Los cuatro tipos', en: 'The four kinds', ar: 'الأنواع الأربعة' }, description: { eu: 'Irekiak eta hutsak ere', es: 'También abiertas y vacías', en: 'Open and empty too', ar: 'المفتوحة والخالية أيضًا' } },
            { progressId: 144603, stage: 'cases', title: { eu: 'Maximoa eta minimoa', es: 'Máximo y mínimo', en: 'Maximum and minimum', ar: 'العظمى والصغرى' }, description: { eu: 'Nahastuta', es: 'Mezclados', en: 'Mixed', ar: 'مختلطة' } }
        ]
    },
    {
        id: 'detective',
        title: { eu: 'Programazio linealaren detektibea', es: 'Detective de programación lineal', en: 'Linear programming detective', ar: 'مخبر البرمجة الخطية' },
        tagline: { eu: 'Ebazpen bakoitzean lerro bat gaizki dago: aurkitu eta esan zer akats den.', es: 'En cada resolución hay una línea mal: encuéntrala y di qué error es.', en: 'Each solution has one wrong line: find it and say what the mistake is.', ar: 'في كل حل سطر خاطئ: جده وقل ما الخطأ.' },
        skills: { eu: 'Unitate honetako akats tipikoak', es: 'Los errores típicos de esta unidad', en: 'The typical mistakes of this unit', ar: 'الأخطاء الشائعة في هذه الوحدة' },
        levels: [
            { progressId: 144801, stage: 'regions', title: { eu: 'Murrizketak', es: 'Restricciones', en: 'Constraints', ar: 'القيود' }, description: { eu: '≤ / ≥, orduak, guztira', es: '≤ / ≥, horas, total', en: '≤ / ≥, hours, total', ar: '≤ / ≥ والساعات والمجموع' } },
            { progressId: 144802, stage: 'feasible', title: { eu: 'Erpinak', es: 'Vértices', en: 'Vertices', ar: 'الرؤوس' }, description: { eu: 'Kanpokoa, ahaztua, gaizki kalkulatua', es: 'Fuera, olvidado, mal calculado', en: 'Outside, forgotten, worked out wrong', ar: 'خارجي ومنسي ومحسوب خطأ' } },
            { progressId: 144803, stage: 'cases', title: { eu: 'Optimoa', es: 'El óptimo', en: 'The optimum', ar: 'القيمة المثلى' }, description: { eu: 'Maximoa ala minimoa, (0, 0), berdinketa', es: 'Máximo o mínimo, (0, 0), empate', en: 'Maximum or minimum, (0, 0), tie', ar: 'العظمى أم الصغرى و(0، 0) والتعادل' } }
        ]
    },
    {
        id: 'memory',
        title: { eu: 'Memoria', es: 'Memoria', en: 'Memory', ar: 'الذاكرة' },
        tagline: { eu: 'Aurkitu bikoteak: F erpin batean eta haren balioa, bi zuzen eta haien ebaki-puntua, edo laukizuzen bat eta haren puntu osoak.', es: 'Encuentra las parejas: F en un vértice y su valor, dos rectas y su corte, o un rectángulo y sus puntos enteros.', en: 'Find the pairs: F at a vertex and its value, two lines and where they cross, or a rectangle and its whole points.', ar: 'جد الأزواج: F عند رأس وقيمتها، أو مستقيمان وتقاطعهما، أو مستطيل ونقاطه الصحيحة.' },
        skills: { eu: 'Balioak, erpinak eta puntu osoak', es: 'Valores, vértices y puntos enteros', en: 'Values, vertices and whole points', ar: 'القيم والرؤوس والنقاط الصحيحة' },
        levels: [
            { progressId: 144851, stage: 'objective', title: { eu: 'Balioa', es: 'El valor', en: 'The value', ar: 'القيمة' }, description: { eu: 'F (p, q) ↔ zenbakia', es: 'F (p, q) ↔ número', en: 'F (p, q) ↔ number', ar: 'F (p، q) ↔ عدد' } },
            { progressId: 144852, stage: 'feasible', title: { eu: 'Ebaki-puntua', es: 'El corte', en: 'The crossing', ar: 'التقاطع' }, description: { eu: 'Sistema ↔ erpina', es: 'Sistema ↔ vértice', en: 'System ↔ vertex', ar: 'النظام ↔ الرأس' } },
            { progressId: 144853, stage: 'feasible', title: { eu: 'Puntu osoak', es: 'Puntos enteros', en: 'Whole points', ar: 'النقاط الصحيحة' }, description: { eu: 'Laukizuzena ↔ kopurua', es: 'Rectángulo ↔ cuántos', en: 'Rectangle ↔ how many', ar: 'المستطيل ↔ العدد' } }
        ]
    }
]

export const programazioaGameProgressIds: number[] = levelProgressIds(programazioaGames)

/** Address of each game (Basque); the parser below also accepts the Spanish ones */
export const programazioaGameSlugs: Record<ProgramazioaGameId, string> = { 'which-vertex': 'zein-erpin', express: 'murrizketa-azkarra', 'solution-kind': 'soluzio-mota', detective: 'detektibea', memory: 'memoria' }

export function programazioaGameModeForPath(pathname: string): ProgramazioaGameId | 'hub' {
    const game = pathname.match(/\/(?:juegos|jokuak)\/([a-z-]+)$/)?.[1]
    if (!game) return 'hub'
    if (['zein-erpin', 'que-vertice'].includes(game)) return 'which-vertex'
    if (['murrizketa-azkarra', 'restriccion-expres'].includes(game)) return 'express'
    if (['soluzio-mota', 'tipo-de-solucion'].includes(game)) return 'solution-kind'
    if (['detektibea', 'detective'].includes(game)) return 'detective'
    if (['memoria', 'memory'].includes(game)) return 'memory'
    return 'hub'
}
