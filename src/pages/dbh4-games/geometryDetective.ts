import { pick, randomInt, type Random } from '../../features/unit-v2/games/random.ts'
import { createWorkedCases, type WorkedCase, type WorkedLine } from '../../features/unit-v2/games/workedDetective.ts'
import type { LocalizedText } from '../../features/unit-v2/types.ts'

/* ==========================================================================
   Geometriaren detektibea (4. DBH areas and volumes, applied and academic,
   and applied similarity): a worked solution of three lines with one wrong
   line. The errors need the 4. DBH tools: a height or a slant height found
   with Pythagoras, sectors, rings and segments, hemispheres and compound
   solids, the ratios k² and k³, Thales, scales and shadows. Values with π
   stay as a multiple of π.
   ========================================================================== */

export type GeometryTrack = 'areas' | 'academic' | 'similarity'

export type GeometryDetectiveError =
    | 'height-not-found'
    | 'perimeter-as-side'
    | 'sector-180'
    | 'ring-difference'
    | 'segment-added'
    | 'cone-height-as-slant'
    | 'hemisphere-no-circle'
    | 'compound-shared-face'
    | 'sphere-as-circle'
    | 'hemisphere-whole'
    | 'cone-slant-as-height'
    | 'hole-added'
    | 'triangle-base-half'
    | 'area-ratio-linear'
    | 'volume-ratio-square'
    | 'ratio-not-rooted'
    | 'thales-upside-down'
    | 'additive-similarity'
    | 'thales-whole-segment'
    | 'scale-zeros'
    | 'scale-divided'
    | 'shadow-swapped'
    | 'units-mixed'
    | 'additive-shadow'

export const geometryDetectiveLevels: Record<GeometryTrack, GeometryDetectiveError[][]> = {
    areas: [
        ['height-not-found', 'perimeter-as-side', 'sector-180', 'ring-difference'],
        ['cone-height-as-slant', 'hemisphere-no-circle', 'compound-shared-face', 'sphere-as-circle'],
        ['hemisphere-whole', 'cone-slant-as-height', 'hole-added', 'triangle-base-half']
    ],
    academic: [
        ['segment-added', 'sector-180', 'ring-difference', 'perimeter-as-side'],
        ['cone-height-as-slant', 'compound-shared-face', 'cone-slant-as-height', 'hole-added'],
        ['area-ratio-linear', 'volume-ratio-square', 'ratio-not-rooted', 'thales-whole-segment']
    ],
    similarity: [
        ['thales-upside-down', 'additive-similarity', 'thales-whole-segment'],
        ['area-ratio-linear', 'ratio-not-rooted', 'scale-zeros', 'scale-divided'],
        ['shadow-swapped', 'units-mixed', 'additive-shadow']
    ]
}

export const GEOMETRY_DETECTIVE_CASES = 6

/** Arabic writes the decimal point instead of the comma */
const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const line = (label: LocalizedText, latex: string): WorkedLine => ({ label, latex })
const LABELS = {
    height: say('Altuera', 'Altura', 'الارتفاع', 'Height'),
    slant: say('Sortzailea', 'Generatriz', 'الراسم', 'Slant height'),
    perimeter: say('Perimetroa', 'Perímetro', 'المحيط', 'Perimeter'),
    area: say('Azalera', 'Área', 'المساحة', 'Area'),
    lateral: say('Alboko azalera', 'Área lateral', 'المساحة الجانبية', 'Lateral area'),
    curved: say('Gainazal kurboa', 'Superficie curva', 'السطح المنحني', 'Curved surface'),
    circle: say('Zirkulua', 'Círculo', 'الدائرة', 'Circle'),
    total: say('Azalera osoa', 'Área total', 'المساحة الكلية', 'Total area'),
    cylinder: say('Zilindroa', 'Cilindro', 'الأسطوانة', 'Cylinder'),
    cone: say('Konoa', 'Cono', 'المخروط', 'Cone'),
    cube: say('Kuboa', 'Cubo', 'المكعب', 'Cube'),
    hole: say('Zuloa', 'Agujero', 'الثقب', 'Hole'),
    base: say('Oinarria', 'Base', 'القاعدة', 'Base'),
    volume: say('Bolumena', 'Volumen', 'الحجم', 'Volume'),
    sector: say('Sektorea', 'Sector', 'القطاع', 'Sector'),
    triangle: say('Triangelua', 'Triángulo', 'المثلث', 'Triangle'),
    formula: say('Formula', 'Fórmula', 'القانون', 'Formula'),
    substitute: say('Ordeztu', 'Sustituye', 'عوّض', 'Substitute'),
    result: say('Emaitza', 'Resultado', 'النتيجة', 'Result'),
    ratio: say('Antzekotasun-arrazoia', 'Razón de semejanza', 'نسبة التشابه', 'Scale factor'),
    areas: say('Azaleren arrazoia', 'Razón de las áreas', 'نسبة المساحتين', 'Ratio of the areas'),
    side: say('Aldea', 'Lado', 'الضلع', 'Side'),
    proportion: say('Proportzioa', 'Proporción', 'التناسب', 'Proportion'),
    solve: say('Askatu', 'Despeja', 'أوجد المجهول', 'Solve'),
    difference: say('Aldea', 'Diferencia', 'الفرق', 'Difference'),
    real: say('Errealitatean', 'En la realidad', 'في الواقع', 'In reality'),
    plan: say('Planoan', 'En el plano', 'في المخطط', 'On the plan'),
    convert: say('Unitateak aldatu', 'Cambia de unidad', 'حوّل الوحدة', 'Change units')
}

export const geometryDetectiveNames: Record<GeometryDetectiveError, LocalizedText> = {
    'height-not-found': say('Aldea hartu du altueratzat', 'Tomó el lado como si fuera la altura', 'اعتبر الضلع ارتفاعًا', 'Took the side as the height'),
    'perimeter-as-side': say('Alde bat erabili du perimetroaren ordez', 'Usó un lado en vez del perímetro', 'استعمل ضلعًا واحدًا بدل المحيط', 'Used one side instead of the perimeter'),
    'sector-180': say('180 zatitu du, 360 beharrean', 'Dividió entre 180 en vez de entre 360', 'قسم على 180 بدل 360', 'Divided by 180 instead of 360'),
    'ring-difference': say('Erradioen kenduraren karratua egin du', 'Elevó al cuadrado la resta de los radios', 'ربّع فرق نصفي القطر', 'Squared the difference of the radii'),
    'segment-added': say('Triangelua batu du, kendu beharrean', 'Sumó el triángulo en vez de restarlo', 'جمع المثلث بدل طرحه', 'Added the triangle instead of taking it away'),
    'cone-height-as-slant': say('Altuera erabili du sortzailearen ordez', 'Usó la altura en vez de la generatriz', 'استعمل الارتفاع بدل الراسم', 'Used the height instead of the slant height'),
    'hemisphere-no-circle': say('Oinarriko zirkulua ahaztu du', 'Olvidó el círculo de la base', 'نسي دائرة القاعدة', 'Forgot the circle of the base'),
    'compound-shared-face': say('Ezkutuko zirkulua ere batu du', 'Sumó también el círculo que queda oculto', 'جمع أيضًا الدائرة المخفية', 'Also added the hidden circle'),
    'sphere-as-circle': say('Zirkuluaren azalera erabili du esferarena beharrean', 'Usó el área del círculo en vez de la de la esfera', 'استعمل مساحة الدائرة بدل مساحة الكرة', 'Used the area of the circle instead of the sphere'),
    'hemisphere-whole': say('Esfera osoa kalkulatu du, erdia beharrean', 'Calculó la esfera entera en vez de la mitad', 'حسب الكرة كاملة بدل نصفها', 'Worked out the whole sphere instead of half'),
    'cone-slant-as-height': say('Sortzailea erabili du altueraren ordez', 'Usó la generatriz en vez de la altura', 'استعمل الراسم بدل الارتفاع', 'Used the slant height instead of the height'),
    'hole-added': say('Zuloa batu du, kendu beharrean', 'Sumó el agujero en vez de restarlo', 'جمع الثقب بدل طرحه', 'Added the hole instead of taking it away'),
    'triangle-base-half': say('Triangeluaren azaleran ez du 2 zatitu', 'En el área del triángulo no dividió entre 2', 'لم يقسم على 2 في مساحة المثلث', 'Did not divide by 2 in the area of the triangle'),
    'area-ratio-linear': say('Azalera k bider egin du, k² bider beharrean', 'Multiplicó el área por k y no por k²', 'ضرب المساحة في k لا في k²', 'Multiplied the area by k, not by k²'),
    'volume-ratio-square': say('Bolumena k² bider egin du, k³ bider beharrean', 'Multiplicó el volumen por k² y no por k³', 'ضرب الحجم في k² لا في k³', 'Multiplied the volume by k², not by k³'),
    'ratio-not-rooted': say('Azaleren arrazoia hartu du k-tzat', 'Tomó la razón de las áreas como k', 'اعتبر نسبة المساحتين هي k', 'Took the ratio of the areas as k'),
    'thales-upside-down': say('Proportzioa alderantziz idatzi du', 'Escribió la proporción al revés', 'كتب التناسب مقلوبًا', 'Wrote the proportion the wrong way round'),
    'additive-similarity': say('Kendura batu du, biderkatu beharrean', 'Sumó la diferencia en vez de multiplicar', 'جمع الفرق بدل الضرب', 'Added the difference instead of multiplying'),
    'thales-whole-segment': say('Zati bat erabili du alde osoaren ordez', 'Usó un trozo en vez del lado entero', 'استعمل جزءًا بدل الضلع كاملًا', 'Used a part instead of the whole side'),
    'scale-zeros': say('Zentimetroak kilometro egitean zeroak gaizki kendu ditu', 'Al pasar de cm a km quitó mal los ceros', 'أخطأ في حذف الأصفار عند التحويل من cm إلى km', 'Took off the wrong number of zeros from cm to km'),
    'scale-divided': say('Biderkatu egin du, zatitu beharrean', 'Multiplicó en vez de dividir', 'ضرب بدل أن يقسم', 'Multiplied instead of dividing'),
    'shadow-swapped': say('Altuera eta itzala nahastu ditu proportzioan', 'Cruzó altura y sombra en la proporción', 'بدّل الارتفاع والظل في التناسب', 'Mixed up height and shadow in the proportion'),
    'units-mixed': say('Metroak eta zentimetroak nahastu ditu', 'Mezcló metros y centímetros', 'خلط الأمتار بالسنتيمترات', 'Mixed metres and centimetres'),
    'additive-shadow': say('Kendura erabili du, arrazoia beharrean', 'Usó la diferencia en vez de la razón', 'استعمل الفرق بدل النسبة', 'Used the difference instead of the ratio')
}

export const geometryDetectiveTips: Record<GeometryDetectiveError, LocalizedText> = {
    'height-not-found': say('Altuera Pitagorasekin: $h=\\sqrt{l^{2}-(b/2)^{2}}$.', 'La altura, con Pitágoras: $h=\\sqrt{l^{2}-(b/2)^{2}}$.', 'الارتفاع بفيثاغورس: $h=\\sqrt{l^{2}-(b/2)^{2}}$.', 'The height, with Pythagoras: $h=\\sqrt{l^{2}-(b/2)^{2}}$.'),
    'perimeter-as-side': say('Poligono erregularra: $A=\\frac{P\\cdot a}{2}$, P perimetro osoa.', 'Polígono regular: $A=\\frac{P\\cdot a}{2}$, con P el perímetro entero.', 'المضلع المنتظم: $A=\\frac{P\\cdot a}{2}$ وP المحيط كله.', 'Regular polygon: $A=\\frac{P\\cdot a}{2}$, with P the whole perimeter.'),
    'sector-180': say('Sektorea zirkuluaren zati bat da: $\\frac{\\alpha}{360}$.', 'El sector es una parte del círculo: $\\frac{\\alpha}{360}$.', 'القطاع جزء من الدائرة: $\\frac{\\alpha}{360}$.', 'The sector is a part of the circle: $\\frac{\\alpha}{360}$.'),
    'ring-difference': say('Koroa: zirkulu handia ken txikia, $\\pi(R^{2}-r^{2})$.', 'La corona: círculo grande menos pequeño, $\\pi(R^{2}-r^{2})$.', 'الحلقة: الدائرة الكبيرة ناقص الصغيرة، $\\pi(R^{2}-r^{2})$.', 'The ring: big circle minus small one, $\\pi(R^{2}-r^{2})$.'),
    'segment-added': say('Segmentua = sektorea ken triangelua.', 'Segmento = sector menos triángulo.', 'القطعة = القطاع ناقص المثلث.', 'Segment = sector minus triangle.'),
    'cone-height-as-slant': say('Alboko azalera: $\\pi r g$; $g=\\sqrt{r^{2}+h^{2}}$.', 'Área lateral: $\\pi r g$; $g=\\sqrt{r^{2}+h^{2}}$.', 'المساحة الجانبية: $\\pi r g$؛ $g=\\sqrt{r^{2}+h^{2}}$.', 'Lateral area: $\\pi r g$; $g=\\sqrt{r^{2}+h^{2}}$.'),
    'hemisphere-no-circle': say('Erdiesfera trinkoa: gainazal kurboa gehi zirkulu laua.', 'Semiesfera maciza: superficie curva más el círculo plano.', 'نصف الكرة المصمت: السطح المنحني زائد الدائرة المستوية.', 'Solid hemisphere: curved surface plus the flat circle.'),
    'compound-shared-face': say('Bi gorputz elkartzean, elkarrekin ukitzen duten aurpegia ez da ikusten.', 'Al unir dos cuerpos, la cara que comparten no se ve.', 'عند ضم جسمين لا يظهر الوجه المشترك.', 'When two solids are joined, the face they share is hidden.'),
    'sphere-as-circle': say('Esferaren azalera: $4\\pi r^{2}$.', 'Área de la esfera: $4\\pi r^{2}$.', 'مساحة الكرة: $4\\pi r^{2}$.', 'Area of a sphere: $4\\pi r^{2}$.'),
    'hemisphere-whole': say('Erdiesfera: $\\frac{1}{2}\\cdot\\frac{4}{3}\\pi r^{3}=\\frac{2}{3}\\pi r^{3}$.', 'Semiesfera: $\\frac{1}{2}\\cdot\\frac{4}{3}\\pi r^{3}=\\frac{2}{3}\\pi r^{3}$.', 'نصف الكرة: $\\frac{1}{2}\\cdot\\frac{4}{3}\\pi r^{3}=\\frac{2}{3}\\pi r^{3}$.', 'Hemisphere: $\\frac{1}{2}\\cdot\\frac{4}{3}\\pi r^{3}=\\frac{2}{3}\\pi r^{3}$.'),
    'cone-slant-as-height': say('Bolumenak altuera behar du: $h=\\sqrt{g^{2}-r^{2}}$.', 'El volumen necesita la altura: $h=\\sqrt{g^{2}-r^{2}}$.', 'الحجم يحتاج الارتفاع: $h=\\sqrt{g^{2}-r^{2}}$.', 'The volume needs the height: $h=\\sqrt{g^{2}-r^{2}}$.'),
    'hole-added': say('Zuloa kendu egiten da: $V=V_{1}-V_{2}$.', 'El agujero se resta: $V=V_{1}-V_{2}$.', 'الثقب يُطرح: $V=V_{1}-V_{2}$.', 'The hole is taken away: $V=V_{1}-V_{2}$.'),
    'triangle-base-half': say('Oinarria triangelua da: $\\frac{b\\cdot h}{2}$.', 'La base es un triángulo: $\\frac{b\\cdot h}{2}$.', 'القاعدة مثلث: $\\frac{b\\cdot h}{2}$.', 'The base is a triangle: $\\frac{b\\cdot h}{2}$.'),
    'area-ratio-linear': say('Luzerak k bider, azalerak $k^{2}$ bider.', 'Las longitudes, por k; las áreas, por $k^{2}$.', 'الأطوال في k والمساحات في $k^{2}$.', 'Lengths times k; areas times $k^{2}$.'),
    'volume-ratio-square': say('Bolumenak $k^{3}$ bider handitzen dira.', 'Los volúmenes se multiplican por $k^{3}$.', 'الحجوم تُضرب في $k^{3}$.', 'Volumes are multiplied by $k^{3}$.'),
    'ratio-not-rooted': say('Azalerak $k^{2}$ bider: $k=\\sqrt{\\frac{A\'}{A}}$.', 'Las áreas van por $k^{2}$: $k=\\sqrt{\\frac{A\'}{A}}$.', 'المساحات تُضرب في $k^{2}$: $k=\\sqrt{\\frac{A\'}{A}}$.', 'Areas go times $k^{2}$: $k=\\sqrt{\\frac{A\'}{A}}$.'),
    'thales-upside-down': say('Zuzen bakoitzeko zatiak ordena berean: $\\frac{a}{b}=\\frac{a\'}{b\'}$.', 'Los trozos de cada recta, en el mismo orden: $\\frac{a}{b}=\\frac{a\'}{b\'}$.', 'أجزاء كل مستقيم بالترتيب نفسه: $\\frac{a}{b}=\\frac{a\'}{b\'}$.', 'The pieces of each line in the same order: $\\frac{a}{b}=\\frac{a\'}{b\'}$.'),
    'additive-similarity': say('Antzekoetan biderkatzen da: alde guztiak k bider.', 'En la semejanza se multiplica: todos los lados por k.', 'في التشابه نضرب: كل الأضلاع في k.', 'Similarity multiplies: every side times k.'),
    'thales-whole-segment': say('Triangelu txikia eta handia konparatu: $\\frac{BC}{DE}=\\frac{AB}{AD}$.', 'Compara el triángulo pequeño con el grande: $\\frac{BC}{DE}=\\frac{AB}{AD}$.', 'قارن المثلث الصغير بالكبير: $\\frac{BC}{DE}=\\frac{AB}{AD}$.', 'Compare the small triangle with the big one: $\\frac{BC}{DE}=\\frac{AB}{AD}$.'),
    'scale-zeros': say('$1\\ \\text{km}=100\\,000\\ \\text{cm}$.', '$1\\ \\text{km}=100\\,000\\ \\text{cm}$.', '$1\\ \\text{km}=100\\,000\\ \\text{cm}$.', '$1\\ \\text{km}=100\\,000\\ \\text{cm}$.'),
    'scale-divided': say('Planoa txikiagoa da: errealitatekoa eskalaz zatitzen da.', 'El plano es más pequeño: lo real se divide entre la escala.', 'المخطط أصغر: نقسم الطول الحقيقي على المقياس.', 'The plan is smaller: the real length is divided by the scale.'),
    'shadow-swapped': say('Altuera altueraz eta itzala itzalaz: $\\frac{H}{S}=\\frac{h}{s}$.', 'Altura con altura y sombra con sombra: $\\frac{H}{S}=\\frac{h}{s}$.', 'ارتفاع مع ارتفاع وظل مع ظل: $\\frac{H}{S}=\\frac{h}{s}$.', 'Height with height, shadow with shadow: $\\frac{H}{S}=\\frac{h}{s}$.'),
    'units-mixed': say('Lehenik, neurri guztiak unitate berean.', 'Primero, todas las medidas en la misma unidad.', 'أولًا اجعل كل القياسات بالوحدة نفسها.', 'First, every measure in the same unit.'),
    'additive-shadow': say('Itzalak ez dira beti metro bat luzeago: proportzionalak dira.', 'Las sombras no son siempre un metro más largas: son proporcionales.', 'الظلال ليست أطول دائمًا بمتر: إنها متناسبة.', 'The shadows are not always a metre longer: they are proportional.')
}

/** A number in LaTeX: hundredths at most, the decimal comma and thousands grouped from five digits */
export function tex(value: number): string {
    const [whole, decimals] = String(Math.round(value * 100) / 100).split('.')
    const grouped = whole.replace('-', '').length > 4 ? whole.replace(/\B(?=(\d{3})+$)/g, '\\,') : whole
    return decimals === undefined ? grouped : `${grouped}{,}${decimals}`
}
const pi = (coefficient: number) => (coefficient === 1 ? '\\pi' : `${tex(coefficient)}\\pi`)
const hundredths = (value: number) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-9
const CM = '\\ \\text{cm}'
const CM2 = '\\ \\text{cm}^{2}'
const CM3 = '\\ \\text{cm}^{3}'
const M = '\\ \\text{m}'

/** Pythagorean triples (a, b, c) with a² + b² = c² */
const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [4, 3, 5], [5, 12, 13], [6, 8, 10], [8, 6, 10], [8, 15, 17], [9, 12, 15], [12, 5, 13], [12, 9, 15]]

const POLYGONS = [
    { sides: 5, apothem: 0.688, name: say('Pentagono', 'Pentágono', 'مخمّس', 'Pentagon') },
    { sides: 6, apothem: 0.866, name: say('Hexagono', 'Hexágono', 'مسدّس', 'Hexagon') },
    { sides: 8, apothem: 1.207, name: say('Oktogono', 'Octógono', 'مثمّن', 'Octagon') }
]

type Built = Omit<WorkedCase<GeometryDetectiveError>, 'options'>

const tower = (s: number, sh: number, T: number) => say(
    `$${tex(s)}${M}$ makila batek $${tex(sh)}${M}$ itzala du. Aldi berean, dorre baten itzala $${tex(T)}${M}$ da. Zer altuera du dorreak?`,
    `Un palo de $${tex(s)}${M}$ da una sombra de $${tex(sh)}${M}$. A la vez, la sombra de una torre mide $${tex(T)}${M}$. ¿Qué altura tiene la torre?`,
    `عصا طولها $${tex(s)}${M}$ ظلها $${tex(sh)}${M}$. وفي اللحظة نفسها ظل برج $${tex(T)}${M}$. ما ارتفاع البرج؟`,
    `A $${tex(s)}${M}$ stick casts a $${tex(sh)}${M}$ shadow. At the same time a tower's shadow is $${tex(T)}${M}$. How tall is the tower?`
)

function build(random: Random, error: GeometryDetectiveError): Built | null {
    switch (error) {
        case 'height-not-found': {
            const [half, h, s] = pick(random, TRIPLES)
            const b = 2 * half
            return {
                problem: say(`Triangelu isoszelea: oinarria $${b}${CM}$, alde berdinak $${s}${CM}$. Kalkulatu azalera.`, `Triángulo isósceles: base $${b}${CM}$ y lados iguales de $${s}${CM}$. Halla su área.`, `مثلث متساوي الساقين: القاعدة $${b}${CM}$ وكل ساق $${s}${CM}$. احسب مساحته.`, `Isosceles triangle: base $${b}${CM}$, equal sides $${s}${CM}$. Find its area.`),
                lines: [line(LABELS.height, `h=${s}`), line(LABELS.area, `A=\\frac{${b}\\cdot ${s}}{2}`), line(LABELS.result, `A=${b * s / 2}${CM2}`)],
                wrong: 0, error, fix: `h=\\sqrt{${s}^{2}-${half}^{2}}=${h}\\ \\to\\ A=${b * h / 2}${CM2}`, right: (b * h) / 2, reached: (b * s) / 2
            }
        }
        case 'perimeter-as-side': {
            const polygon = pick(random, POLYGONS)
            const side = pick(random, [4, 6, 8, 10])
            const apothem = Math.round(polygon.apothem * side * 10) / 10
            const perimeter = polygon.sides * side
            return {
                problem: say(`${polygon.name.eu} erregularra: aldea $${side}${CM}$, apotema $${tex(apothem)}${CM}$. Kalkulatu azalera.`, `${polygon.name.es} regular: lado $${side}${CM}$ y apotema $${tex(apothem)}${CM}$. Halla su área.`, `${polygon.name.ar} منتظم: الضلع $${side}${CM}$ والعامد $${tex(apothem)}${CM}$. احسب مساحته.`, `Regular ${polygon.name.en.toLowerCase()}: side $${side}${CM}$, apothem $${tex(apothem)}${CM}$. Find its area.`),
                lines: [line(LABELS.perimeter, `P=${polygon.sides}\\cdot ${side}=${perimeter}`), line(LABELS.area, `A=\\frac{${side}\\cdot ${tex(apothem)}}{2}`), line(LABELS.result, `A=${tex((side * apothem) / 2)}${CM2}`)],
                wrong: 1, error, fix: `A=\\frac{${perimeter}\\cdot ${tex(apothem)}}{2}=${tex((perimeter * apothem) / 2)}${CM2}`, right: (perimeter * apothem) / 2, reached: (side * apothem) / 2
            }
        }
        case 'sector-180': {
            const r = pick(random, [3, 4, 6, 9, 10, 12])
            const angle = pick(random, [30, 45, 60, 90, 120, 150, 240, 270])
            const right = (r * r * angle) / 360
            if (!Number.isInteger(right) || right < 2) return null
            return {
                problem: say(`Zirkulu-sektorea: erradioa $${r}${CM}$, angelua $${angle}^{\\circ}$. Kalkulatu azalera.`, `Sector circular: radio $${r}${CM}$ y ángulo de $${angle}^{\\circ}$. Halla su área.`, `قطاع دائري: نصف القطر $${r}${CM}$ والزاوية $${angle}^{\\circ}$. احسب مساحته.`, `Circular sector: radius $${r}${CM}$, angle $${angle}^{\\circ}$. Find its area.`),
                lines: [line(LABELS.formula, `A=\\frac{\\pi r^{2}\\cdot\\alpha}{180}`), line(LABELS.substitute, `A=\\frac{\\pi\\cdot ${r}^{2}\\cdot ${angle}}{180}`), line(LABELS.result, `A=${pi(2 * right)}${CM2}`)],
                wrong: 0, error, fix: `A=\\frac{\\pi\\cdot ${r}^{2}\\cdot ${angle}}{360}=${pi(right)}${CM2}`, right: right * Math.PI, reached: 2 * right * Math.PI
            }
        }
        case 'ring-difference': {
            const R = randomInt(random, 4, 10)
            const r = randomInt(random, 2, R - 2)
            return {
                problem: say(`Koroa zirkularra: erradioak $${R}${CM}$ eta $${r}${CM}$. Kalkulatu azalera.`, `Corona circular de radios $${R}${CM}$ y $${r}${CM}$. Halla su área.`, `حلقة دائرية نصفا قطريها $${R}${CM}$ و$${r}${CM}$. احسب مساحتها.`, `A ring between circles of radius $${R}${CM}$ and $${r}${CM}$. Find its area.`),
                lines: [line(LABELS.formula, `A=\\pi\\cdot(${R}-${r})^{2}`), line(LABELS.substitute, `A=\\pi\\cdot ${R - r}^{2}`), line(LABELS.result, `A=${pi((R - r) ** 2)}${CM2}`)],
                wrong: 0, error, fix: `A=\\pi\\cdot(${R}^{2}-${r}^{2})\\ \\to\\ A=${pi(R * R - r * r)}${CM2}`, right: (R * R - r * r) * Math.PI, reached: (R - r) ** 2 * Math.PI
            }
        }
        case 'segment-added': {
            const r = pick(random, [2, 4, 6, 8, 10])
            const sector = (r * r) / 4
            const triangle = (r * r) / 2
            return {
                problem: say(`$90^{\\circ}$ zirkulu-segmentua, erradioa $${r}${CM}$. Kalkulatu azalera.`, `Segmento circular de $90^{\\circ}$ y radio $${r}${CM}$. Halla su área.`, `قطعة دائرية زاويتها $90^{\\circ}$ ونصف قطرها $${r}${CM}$. احسب مساحتها.`, `A circular segment of $90^{\\circ}$, radius $${r}${CM}$. Find its area.`),
                lines: [line(LABELS.sector, `A_{S}=\\frac{\\pi\\cdot ${r}^{2}}{4}=${pi(sector)}`), line(LABELS.triangle, `A_{T}=\\frac{${r}\\cdot ${r}}{2}=${triangle}`), line(LABELS.result, `A=${pi(sector)}+${triangle}`)],
                wrong: 2, error, fix: `A=${pi(sector)}-${triangle}${CM2}`, right: sector * Math.PI - triangle, reached: sector * Math.PI + triangle
            }
        }
        case 'cone-height-as-slant': {
            const [r, h, g] = pick(random, TRIPLES)
            return {
                problem: say(`Konoa: erradioa $${r}${CM}$, altuera $${h}${CM}$. Kalkulatu alboko azalera.`, `Cono de radio $${r}${CM}$ y altura $${h}${CM}$. Halla su área lateral.`, `مخروط نصف قطره $${r}${CM}$ وارتفاعه $${h}${CM}$. احسب مساحته الجانبية.`, `A cone of radius $${r}${CM}$ and height $${h}${CM}$. Find its lateral area.`),
                lines: [line(LABELS.slant, `g=${h}`), line(LABELS.lateral, `A_{L}=\\pi\\cdot ${r}\\cdot ${h}`), line(LABELS.result, `A_{L}=${pi(r * h)}${CM2}`)],
                wrong: 0, error, fix: `g=\\sqrt{${r}^{2}+${h}^{2}}=${g}\\ \\to\\ A_{L}=${pi(r * g)}${CM2}`, right: r * g * Math.PI, reached: r * h * Math.PI
            }
        }
        case 'hemisphere-no-circle': {
            const r = randomInt(random, 2, 9)
            return {
                problem: say(`Erdiesfera trinkoa, erradioa $${r}${CM}$. Kalkulatu azalera osoa.`, `Semiesfera maciza de radio $${r}${CM}$. Halla su área total.`, `نصف كرة مصمت نصف قطره $${r}${CM}$. احسب مساحته الكلية.`, `A solid hemisphere of radius $${r}${CM}$. Find its total area.`),
                lines: [line(LABELS.curved, `A_{1}=\\frac{4\\pi\\cdot ${r}^{2}}{2}=${pi(2 * r * r)}`), line(LABELS.circle, `A_{2}=\\pi\\cdot ${r}^{2}=${pi(r * r)}`), line(LABELS.total, `A=${pi(2 * r * r)}${CM2}`)],
                wrong: 2, error, fix: `A=${pi(2 * r * r)}+${pi(r * r)}\\ \\to\\ A=${pi(3 * r * r)}${CM2}`, right: 3 * r * r * Math.PI, reached: 2 * r * r * Math.PI
            }
        }
        case 'compound-shared-face': {
            const [r, , g] = pick(random, TRIPLES.filter(([a]) => a <= 6))
            const H = pick(random, [4, 5, 6, 8, 10])
            const sides = 2 * r * H + r * g
            return {
                problem: say(`Siloa: zilindroa ($r=${r},\\ h=${H}$) eta gainean konoa ($g=${g}$), metrotan. Kalkulatu kanpoko azalera.`, `Un silo: cilindro ($r=${r},\\ h=${H}$) con un cono encima ($g=${g}$), en metros. Halla su área exterior.`, `صومعة: أسطوانة ($r=${r},\\ h=${H}$) فوقها مخروط ($g=${g}$) بالأمتار. احسب مساحتها الخارجية.`, `A silo: a cylinder ($r=${r},\\ h=${H}$) with a cone on top ($g=${g}$), in metres. Find its outer area.`),
                lines: [line(LABELS.cylinder, `2\\pi\\cdot ${r}\\cdot ${H}=${pi(2 * r * H)}`), line(LABELS.cone, `\\pi\\cdot ${r}\\cdot ${g}=${pi(r * g)}`), line(LABELS.total, `A=${pi(sides)}+2\\cdot ${pi(r * r)}`)],
                wrong: 2, error, fix: `A=${pi(sides)}+${pi(r * r)}\\ \\to\\ A=${pi(sides + r * r)}\\ \\text{m}^{2}`, right: (sides + r * r) * Math.PI, reached: (sides + 2 * r * r) * Math.PI
            }
        }
        case 'sphere-as-circle': {
            const r = randomInt(random, 2, 9)
            return {
                problem: say(`Esfera, erradioa $${r}${CM}$. Kalkulatu azalera.`, `Esfera de radio $${r}${CM}$. Halla su área.`, `كرة نصف قطرها $${r}${CM}$. احسب مساحتها.`, `A sphere of radius $${r}${CM}$. Find its area.`),
                lines: [line(LABELS.formula, `A=\\pi r^{2}`), line(LABELS.substitute, `A=\\pi\\cdot ${r}^{2}`), line(LABELS.result, `A=${pi(r * r)}${CM2}`)],
                wrong: 0, error, fix: `A=4\\pi\\cdot ${r}^{2}=${pi(4 * r * r)}${CM2}`, right: 4 * r * r * Math.PI, reached: r * r * Math.PI
            }
        }
        case 'hemisphere-whole': {
            const r = pick(random, [3, 6, 9])
            return {
                problem: say(`Ontzi erdiesferikoa, erradioa $${r}${CM}$. Kalkulatu bolumena.`, `Cuenco semiesférico de radio $${r}${CM}$. Halla su volumen.`, `وعاء على شكل نصف كرة نصف قطره $${r}${CM}$. احسب حجمه.`, `A hemispherical bowl of radius $${r}${CM}$. Find its volume.`),
                lines: [line(LABELS.formula, `V=\\frac{4}{3}\\pi\\cdot ${r}^{3}`), line(LABELS.substitute, `V=\\frac{4}{3}\\pi\\cdot ${r ** 3}`), line(LABELS.result, `V=${pi((4 * r ** 3) / 3)}${CM3}`)],
                wrong: 0, error, fix: `V=\\frac{2}{3}\\pi\\cdot ${r}^{3}=${pi((2 * r ** 3) / 3)}${CM3}`, right: ((2 * r ** 3) / 3) * Math.PI, reached: ((4 * r ** 3) / 3) * Math.PI
            }
        }
        case 'cone-slant-as-height': {
            const [r, h, g] = pick(random, TRIPLES.filter(([a]) => a % 3 === 0))
            return {
                problem: say(`Konoa: erradioa $${r}${CM}$, sortzailea $${g}${CM}$. Kalkulatu bolumena.`, `Cono de radio $${r}${CM}$ y generatriz $${g}${CM}$. Halla su volumen.`, `مخروط نصف قطره $${r}${CM}$ وراسمه $${g}${CM}$. احسب حجمه.`, `A cone of radius $${r}${CM}$ and slant height $${g}${CM}$. Find its volume.`),
                lines: [line(LABELS.height, `h=${g}`), line(LABELS.volume, `V=\\frac{\\pi\\cdot ${r}^{2}\\cdot ${g}}{3}`), line(LABELS.result, `V=${pi((r * r * g) / 3)}${CM3}`)],
                wrong: 0, error, fix: `h=\\sqrt{${g}^{2}-${r}^{2}}=${h}\\ \\to\\ V=${pi((r * r * h) / 3)}${CM3}`, right: ((r * r * h) / 3) * Math.PI, reached: ((r * r * g) / 3) * Math.PI
            }
        }
        case 'hole-added': {
            const a = pick(random, [6, 8, 10, 12])
            const r = randomInt(random, 1, Math.min(3, a / 2 - 1))
            return {
                problem: say(`Kuboa, ertza $${a}${CM}$; $${r}${CM}$ erradioko zulo zilindriko batek zeharkatzen du. Kalkulatu bolumena.`, `Un cubo de arista $${a}${CM}$ con un agujero cilíndrico de radio $${r}${CM}$ que lo atraviesa. Halla su volumen.`, `مكعب حرفه $${a}${CM}$ يخترقه ثقب أسطواني نصف قطره $${r}${CM}$. احسب حجمه.`, `A cube of edge $${a}${CM}$ with a cylindrical hole of radius $${r}${CM}$ right through it. Find its volume.`),
                lines: [line(LABELS.cube, `${a}^{3}=${a ** 3}`), line(LABELS.hole, `\\pi\\cdot ${r}^{2}\\cdot ${a}=${pi(r * r * a)}`), line(LABELS.result, `V=${a ** 3}+${pi(r * r * a)}`)],
                wrong: 2, error, fix: `V=${a ** 3}-${pi(r * r * a)}${CM3}`, right: a ** 3 - r * r * a * Math.PI, reached: a ** 3 + r * r * a * Math.PI
            }
        }
        case 'triangle-base-half': {
            const b = pick(random, [2, 3, 4, 5])
            const t = pick(random, [1.5, 2, 2.5, 3])
            const L = pick(random, [3, 4, 5, 6])
            if (!hundredths((b * t) / 2)) return null
            return {
                problem: say(`Kanpin-denda prisma triangeluarra da: oinarria $${b}${M}$, triangeluaren altuera $${tex(t)}${M}$ eta luzera $${L}${M}$. Kalkulatu bolumena.`, `Una tienda de campaña es un prisma triangular: base $${b}${M}$, altura del triángulo $${tex(t)}${M}$ y largo $${L}${M}$. Halla su volumen.`, `خيمة على شكل منشور ثلاثي: القاعدة $${b}${M}$ وارتفاع المثلث $${tex(t)}${M}$ والطول $${L}${M}$. احسب حجمها.`, `A tent is a triangular prism: base $${b}${M}$, triangle height $${tex(t)}${M}$, length $${L}${M}$. Find its volume.`),
                lines: [line(LABELS.base, `A_{B}=${b}\\cdot ${tex(t)}=${tex(b * t)}`), line(LABELS.volume, `V=${tex(b * t)}\\cdot ${L}`), line(LABELS.result, `V=${tex(b * t * L)}\\ \\text{m}^{3}`)],
                wrong: 0, error, fix: `A_{B}=\\frac{${b}\\cdot ${tex(t)}}{2}=${tex((b * t) / 2)}\\ \\to\\ V=${tex((b * t * L) / 2)}\\ \\text{m}^{3}`, right: (b * t * L) / 2, reached: b * t * L
            }
        }
        case 'area-ratio-linear': {
            const k = randomInt(random, 2, 5)
            const A = pick(random, [6, 8, 10, 12, 15, 20])
            return {
                problem: say(`Bi irudi antzeko, $k=${k}$ arrazoiarekin. Txikiaren azalera: $${A}${CM2}$. Zein da handiarena?`, `Dos figuras semejantes con razón $k=${k}$. La pequeña tiene un área de $${A}${CM2}$. ¿Y la grande?`, `شكلان متشابهان نسبتهما $k=${k}$. مساحة الصغير $${A}${CM2}$. فما مساحة الكبير؟`, `Two similar figures with scale factor $k=${k}$. The small one has an area of $${A}${CM2}$. What about the big one?`),
                lines: [line(LABELS.ratio, `k=${k}`), line(LABELS.area, `A'=${A}\\cdot ${k}`), line(LABELS.result, `A'=${A * k}${CM2}`)],
                wrong: 1, error, fix: `A'=${A}\\cdot ${k}^{2}=${A * k * k}${CM2}`, right: A * k * k, reached: A * k
            }
        }
        case 'volume-ratio-square': {
            const k = randomInt(random, 2, 4)
            const V = pick(random, [5, 10, 12, 20, 40])
            return {
                problem: say(`Bi gorputz antzeko, $k=${k}$ arrazoiarekin. Txikiaren bolumena: $${V}${CM3}$. Zein da handiarena?`, `Dos cuerpos semejantes con razón $k=${k}$. El pequeño tiene un volumen de $${V}${CM3}$. ¿Y el grande?`, `جسمان متشابهان نسبتهما $k=${k}$. حجم الصغير $${V}${CM3}$. فما حجم الكبير؟`, `Two similar solids with scale factor $k=${k}$. The small one has a volume of $${V}${CM3}$. What about the big one?`),
                lines: [line(LABELS.ratio, `k=${k}`), line(LABELS.volume, `V'=${V}\\cdot ${k}^{2}`), line(LABELS.result, `V'=${V * k * k}${CM3}`)],
                wrong: 1, error, fix: `V'=${V}\\cdot ${k}^{3}=${V * k ** 3}${CM3}`, right: V * k ** 3, reached: V * k * k
            }
        }
        case 'ratio-not-rooted': {
            const k = randomInt(random, 2, 5)
            const side = randomInt(random, 2, 6)
            return {
                problem: say(`Irudi handiaren azalera txikiarena bider $${k * k}$ da. Txikiaren alde bat: $${side}${CM}$. Zenbat neurtzen du handian?`, `El área de una figura es $${k * k}$ veces la de otra semejante. Un lado de la pequeña mide $${side}${CM}$. ¿Cuánto mide en la grande?`, `مساحة شكل تساوي $${k * k}$ أضعاف مساحة شكل مشابه له. ضلع في الصغير طوله $${side}${CM}$. كم طوله في الكبير؟`, `The area of a figure is $${k * k}$ times that of a similar one. A side of the small one is $${side}${CM}$. How long is it in the big one?`),
                lines: [line(LABELS.areas, `\\frac{A'}{A}=${k * k}`), line(LABELS.ratio, `k=${k * k}`), line(LABELS.side, `l'=${side}\\cdot ${k * k}=${side * k * k}${CM}`)],
                wrong: 1, error, fix: `k=\\sqrt{${k * k}}=${k}\\ \\to\\ l'=${side * k}${CM}`, right: side * k, reached: side * k * k
            }
        }
        case 'thales-upside-down': {
            const a = randomInt(random, 2, 9)
            const b = randomInt(random, 2, 12)
            const m = pick(random, [1.5, 2, 2.5, 3])
            const top = a * m
            const right = b * m
            const reached = (a * top) / b
            if (a === b || top === b || !hundredths(top) || !hundredths(right) || !Number.isInteger(reached)) return null
            return {
                problem: say(`Tales: paraleloek ebakitako bi zuzen. Batean, $${a}${CM}$ eta $${b}${CM}$; bestean, $${tex(top)}${CM}$ eta $x$. Kalkulatu $x$.`, `Tales: dos rectas cortadas por paralelas. En una, $${a}${CM}$ y $${b}${CM}$; en la otra, $${tex(top)}${CM}$ y $x$. Halla $x$.`, `طاليس: مستقيمان تقطعهما متوازيات. في الأول $${a}${CM}$ و$${b}${CM}$، وفي الثاني $${tex(top)}${CM}$ و$x$. أوجد $x$.`, `Thales: two lines cut by parallels. On one, $${a}${CM}$ and $${b}${CM}$; on the other, $${tex(top)}${CM}$ and $x$. Find $x$.`),
                lines: [line(LABELS.proportion, `\\frac{${a}}{${b}}=\\frac{x}{${tex(top)}}`), line(LABELS.solve, `x=\\frac{${a}\\cdot ${tex(top)}}{${b}}`), line(LABELS.result, `x=${tex(reached)}${CM}`)],
                wrong: 0, error, fix: `\\frac{${a}}{${b}}=\\frac{${tex(top)}}{x}\\ \\to\\ x=${tex(right)}${CM}`, right, reached
            }
        }
        case 'additive-similarity': {
            const a = randomInt(random, 2, 8)
            const b = randomInt(random, 2, 10)
            const k = pick(random, [1.5, 2, 2.5, 3])
            const grown = a * k
            if (a === b || !Number.isInteger(grown) || !hundredths(b * k)) return null
            return {
                problem: say(`$${a}\\times ${b}${CM}$ laukizuzena handitu da: $${a}${CM}$ aldeak orain $${grown}${CM}$ neurtzen du. Zenbat bestea?`, `Un rectángulo de $${a}\\times ${b}${CM}$ se amplía: el lado de $${a}${CM}$ pasa a medir $${grown}${CM}$. ¿Y el otro?`, `يُكبَّر مستطيل $${a}\\times ${b}${CM}$ فيصبح الضلع $${a}${CM}$ بطول $${grown}${CM}$. فكم يصبح الآخر؟`, `A $${a}\\times ${b}${CM}$ rectangle is enlarged: the $${a}${CM}$ side becomes $${grown}${CM}$. And the other side?`),
                lines: [line(LABELS.difference, `${grown}-${a}=${grown - a}`), line(LABELS.side, `x=${b}+${grown - a}`), line(LABELS.result, `x=${b + grown - a}${CM}`)],
                wrong: 0, error, fix: `k=\\frac{${grown}}{${a}}=${tex(k)}\\ \\to\\ x=${b}\\cdot ${tex(k)}=${tex(b * k)}${CM}`, right: b * k, reached: b + grown - a
            }
        }
        case 'thales-whole-segment': {
            const p = randomInt(random, 2, 8)
            const q = randomInt(random, 1, 8)
            const d = randomInt(random, 2, 9)
            const right = (d * (p + q)) / p
            const reached = (d * q) / p
            if (p === q || !hundredths(right) || !hundredths(reached)) return null
            return {
                problem: say(`$ABC$ triangeluan $DE\\parallel BC$ da, eta $D$ puntua $AB$ aldean: $AD=${p}$, $DB=${q}$, $DE=${d}$ (cm). Kalkulatu $BC$.`, `En el triángulo $ABC$, $DE\\parallel BC$ con $D$ en $AB$: $AD=${p}$, $DB=${q}$, $DE=${d}$ (cm). Halla $BC$.`, `في المثلث $ABC$ يكون $DE\\parallel BC$ والنقطة $D$ على $AB$: $AD=${p}$ و$DB=${q}$ و$DE=${d}$ (cm). أوجد $BC$.`, `In triangle $ABC$, $DE\\parallel BC$ with $D$ on $AB$: $AD=${p}$, $DB=${q}$, $DE=${d}$ (cm). Find $BC$.`),
                lines: [line(LABELS.proportion, `\\frac{x}{${d}}=\\frac{${q}}{${p}}`), line(LABELS.solve, `x=\\frac{${d}\\cdot ${q}}{${p}}`), line(LABELS.result, `x=${tex(reached)}${CM}`)],
                wrong: 0, error, fix: `\\frac{x}{${d}}=\\frac{${p + q}}{${p}}\\ \\to\\ x=${tex(right)}${CM}`, right, reached
            }
        }
        case 'scale-zeros': {
            const scale = pick(random, [25000, 50000, 200000, 250000])
            const cm = randomInt(random, 2, 12)
            const real = cm * scale
            return {
                problem: say(`$1\\mathbin{:}${tex(scale)}$ eskalako mapa batean, bi herri $${cm}${CM}$ tartera daude. Zenbat km dira errealitatean?`, `En un mapa a escala $1\\mathbin{:}${tex(scale)}$, dos pueblos están a $${cm}${CM}$. ¿Cuántos km son en la realidad?`, `في خريطة بمقياس $1\\mathbin{:}${tex(scale)}$ تبعد قريتان $${cm}${CM}$. كم كيلومترًا في الواقع؟`, `On a map at scale $1\\mathbin{:}${tex(scale)}$, two villages are $${cm}${CM}$ apart. How many km is that in reality?`),
                lines: [line(LABELS.real, `d=${cm}\\cdot ${tex(scale)}`), line(LABELS.result, `d=${tex(real)}${CM}`), line(LABELS.convert, `d=${tex(real / 1000)}\\ \\text{km}`)],
                wrong: 2, error, fix: `${tex(real)}${CM}=${tex(real / 100000)}\\ \\text{km}`, right: real / 100000, reached: real / 1000
            }
        }
        case 'scale-divided': {
            const scale = pick(random, [20, 50, 100])
            const metres = pick(random, [2, 2.5, 3, 3.5, 4, 4.5, 5, 6])
            const cm = metres * 100
            if (!hundredths(cm / scale)) return null
            return {
                problem: say(`Planoa $1\\mathbin{:}${scale}$ eskalan dago. Horma baten luzera: $${tex(metres)}${M}$. Zenbat neurtzen du planoan?`, `Un plano está a escala $1\\mathbin{:}${scale}$. Una pared mide $${tex(metres)}${M}$. ¿Cuánto mide en el plano?`, `مخطط بمقياس $1\\mathbin{:}${scale}$. طول جدار $${tex(metres)}${M}$. كم طوله في المخطط؟`, `A plan is at scale $1\\mathbin{:}${scale}$. A wall is $${tex(metres)}${M}$ long. How long is it on the plan?`),
                lines: [line(LABELS.convert, `${tex(metres)}${M}=${cm}${CM}`), line(LABELS.plan, `${cm}\\cdot ${scale}`), line(LABELS.result, `${tex(cm * scale)}${CM}`)],
                wrong: 1, error, fix: `${cm}\\div ${scale}=${tex(cm / scale)}${CM}`, right: cm / scale, reached: cm * scale
            }
        }
        case 'shadow-swapped': {
            const s = pick(random, [1, 1.5, 2])
            const sh = pick(random, [0.5, 1, 1.5, 2, 2.5, 3])
            const k = randomInt(random, 3, 12)
            const T = sh * k
            const reached = (T * sh) / s
            if (s === sh || !hundredths(reached) || T > 30) return null
            return {
                problem: tower(s, sh, T),
                lines: [line(LABELS.proportion, `\\frac{H}{${tex(T)}}=\\frac{${tex(sh)}}{${tex(s)}}`), line(LABELS.solve, `H=\\frac{${tex(T)}\\cdot ${tex(sh)}}{${tex(s)}}`), line(LABELS.result, `H=${tex(reached)}${M}`)],
                wrong: 0, error, fix: `\\frac{H}{${tex(T)}}=\\frac{${tex(s)}}{${tex(sh)}}\\ \\to\\ H=${tex(s * k)}${M}`, right: s * k, reached
            }
        }
        case 'units-mixed': {
            const p = pick(random, [1.5, 1.6, 1.8])
            const sh = pick(random, [40, 50, 60, 80, 120, 150])
            const k = randomInt(random, 4, 15)
            const T = (sh / 100) * k
            const reached = (T * p) / sh
            if (!hundredths(T) || !hundredths(reached) || T > 30) return null
            return {
                problem: say(`$${tex(p)}${M}$ pertsona batek $${sh}${CM}$ itzala du. Eraikin baten itzala $${tex(T)}${M}$ da. Zer altuera du eraikinak?`, `Una persona de $${tex(p)}${M}$ da una sombra de $${sh}${CM}$. La sombra de un edificio mide $${tex(T)}${M}$. ¿Qué altura tiene?`, `شخص طوله $${tex(p)}${M}$ ظله $${sh}${CM}$. وظل مبنى $${tex(T)}${M}$. ما ارتفاع المبنى؟`, `A $${tex(p)}${M}$ person casts a $${sh}${CM}$ shadow. A building's shadow is $${tex(T)}${M}$. How tall is the building?`),
                lines: [line(LABELS.proportion, `\\frac{H}{${tex(T)}}=\\frac{${tex(p)}}{${sh}}`), line(LABELS.solve, `H=\\frac{${tex(T)}\\cdot ${tex(p)}}{${sh}}`), line(LABELS.result, `H=${tex(reached)}${M}`)],
                wrong: 0, error, fix: `${sh}${CM}=${tex(sh / 100)}${M}\\ \\to\\ H=${tex(p * k)}${M}`, right: p * k, reached
            }
        }
        case 'additive-shadow': {
            const s = pick(random, [1, 1.5, 2])
            const sh = pick(random, [1.5, 2, 2.5, 3, 4])
            const k = randomInt(random, 3, 10)
            const T = sh * k
            if (sh <= s || !hundredths(T) || T > 30) return null
            return {
                problem: tower(s, sh, T),
                lines: [line(LABELS.difference, `${tex(sh)}-${tex(s)}=${tex(sh - s)}`), line(LABELS.height, `H=${tex(T)}-${tex(sh - s)}`), line(LABELS.result, `H=${tex(T - sh + s)}${M}`)],
                wrong: 1, error, fix: `\\frac{H}{${tex(T)}}=\\frac{${tex(s)}}{${tex(sh)}}\\ \\to\\ H=${tex(s * k)}${M}`, right: s * k, reached: T - sh + s
            }
        }
    }
}

export const createGeometryDetectiveCases = (track: GeometryTrack) => (random: Random, levelIndex: number) => createWorkedCases(random, geometryDetectiveLevels[track][levelIndex], GEOMETRY_DETECTIVE_CASES, build)
