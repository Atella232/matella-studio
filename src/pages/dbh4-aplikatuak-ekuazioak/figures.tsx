import type { ReactNode } from 'react'
import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import { Figure, Frac } from '../dbh2-zatikiak-prototype/figures'
import { AxisTitles, Label, PlaneGrid, PlaneLine, PlanePoint } from '../dbh2-funtzioak-v2/plane'
import { useBoxClip } from '../dbh2-funtzioak-v2/planeClip'
import { planeMap, type PlaneBox, type PlaneMap } from '../dbh2-funtzioak-v2/planeMap'
import { Caption } from '../dbh1-proportzionaltasuna-v2/figures'

/* ==========================================================================
   Ekuazioak eta sistemak · 4. DBH aplikatuak — the new lesson figures: the
   three outcomes of a first-degree equation, the quadratic formula worked
   on x² − 7x + 6 = 0, a factored equation, a radical equation with its
   check, a rectangle problem that leads to a quadratic, the solutions of
   x + y = 5 as a table and a line, the three kinds of systems as pairs of
   lines, the three methods on the same system (2x + y = 7, x − y = 2) and
   the hens and rabbits problem. The denominators, incomplete equations,
   discriminant and problem steps reuse the 2. DBH figures. Formulas are
   the same in every language; Arabic captions carry words only.
   ========================================================================== */

const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const STAGE = 'var(--stage, #2f6fdb)'
const STAGE_TINT = 'var(--stage-tint, #dde7f7)'
const SECOND = 'var(--second, #c4432a)'
const GREEN = 'var(--success, #267b53)'
const CARD = 'var(--card, #fffcf6)'
const PAPER = '#fffcf6'
const SOFT = '#fbebc0'
const SERIF = 'Fraunces, serif'

const say = (eu: string, es: string, ar: string): LocalizedText => ({ eu, es, ar })
const pick = (language: UnitLanguage, text: LocalizedText) => pickText(language, text)

/** A small Cartesian plane placed at (ox, oy) inside a figure */
function Frame({ box, cell, ox, oy, labels = true, children }: { box: PlaneBox; cell: number; ox: number; oy: number; labels?: boolean; children?: (map: PlaneMap, clip: string) => ReactNode }) {
    const map = planeMap(box, cell, ox, oy)
    const [clipPath, clip] = useBoxClip(map)
    return (
        <g>
            <defs>{clipPath}</defs>
            <rect x={ox} y={oy} width={map.width} height={map.height} fill={CARD} />
            <PlaneGrid map={map} labels={labels} />
            <AxisTitles map={map} />
            {children?.(map, clip)}
        </g>
    )
}

/* ---------- One solution, none or infinitely many ---------- */

export function SolutionCountFigure({ language }: { language: UnitLanguage }) {
    const cases = [
        { lines: ['3x − 2 = x + 4', '2x = 6', 'x = 3'], color: GREEN, title: say('Ebazpen bat', 'Una solución', 'حل واحد') },
        { lines: ['2(x + 1) = 2x + 5', '2x + 2 = 2x + 5', '0 = 3 ✗'], color: SECOND, title: say('Ebazpenik ez', 'Sin solución', 'لا حل') },
        { lines: ['3(x − 1) = 3x − 3', '3x − 3 = 3x − 3', '0 = 0 ✓'], color: STAGE, title: say('Infinitu: identitatea', 'Infinitas: identidad', 'ما لا نهاية: متطابقة') }
    ]
    return (
        <Figure height={270} label={pick(language, say('Lehen mailako ekuazio baten hiru amaiera', 'Los tres finales de una ecuación de primer grado', 'النهايات الثلاث لمعادلة من الدرجة الأولى'))}>
            {cases.map((item, index) => {
                const x = 20 + index * 232
                return (
                    <g key={index}>
                        <rect x={x} y={20} width={216} height={170} rx={14} fill={index === 0 ? '#d6eddf' : index === 1 ? '#f8dcd0' : STAGE_TINT} stroke={INK} strokeWidth={2} />
                        {item.lines.map((line, row) => <text key={row} x={x + 108} y={60 + row * 40} textAnchor="middle" fontSize={row === 2 ? 22 : 18} fontWeight={700} fill={row === 2 ? item.color : INK}>{line}</text>)}
                        <Label x={x + 108} y={222} textAnchor="middle" fontSize={17} fontWeight={700} fill={item.color}>{pick(language, item.title)}</Label>
                    </g>
                )
            })}
            <Caption y={258} language={language} text={say('x desagertzen bada: 0 = 3 ezinezkoa da; 0 = 0 beti betetzen da', 'Si la x desaparece: 0 = 3 es imposible; 0 = 0 se cumple siempre', 'إذا اختفى x: 0 = 3 مستحيلة؛ و0 = 0 صحيحة دائمًا')} />
        </Figure>
    )
}

/* ---------- The quadratic formula ---------- */

export function QuadraticFormulaFigure({ language }: { language: UnitLanguage }) {
    const chips = [
        { x: 356, text: 'a = 1' },
        { x: 486, text: 'b = −7' },
        { x: 616, text: 'c = 6' }
    ]
    return (
        <Figure height={300} label={pick(language, say('x² − 7x + 6 = 0 formula orokorrarekin: x = 6 eta x = 1', 'x² − 7x + 6 = 0 con la fórmula general: x = 6 y x = 1', 'x² − 7x + 6 = 0 بالصيغة العامة: x = 6 وx = 1'))}>
            <text x={70} y={46} fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>x² − 7x + 6 = 0</text>
            {chips.map((chip) => (
                <g key={chip.text}>
                    <rect x={chip.x - 56} y={20} width={112} height={38} rx={10} fill={SOFT} stroke={INK} strokeWidth={1.6} />
                    <text x={chip.x} y={46} textAnchor="middle" fontSize={19} fontWeight={700} fill={INK}>{chip.text}</text>
                </g>
            ))}
            <text x={70} y={136} fontSize={24} fontWeight={700} fill={INK}>x =</text>
            <Frac x={250} y={128} n="−b ± √(b² − 4ac)" d="2a" color={STAGE} />
            <text x={392} y={136} fontSize={24} fontWeight={700} fill={INK}>=</text>
            <Frac x={520} y={128} n="7 ± √(49 − 24)" d="2" />
            <text x={70} y={216} fontSize={24} fontWeight={700} fill={INK}>=</text>
            <Frac x={150} y={208} n="7 ± 5" d="2" />
            <text x={230} y={216} fontSize={22} fontWeight={700} fill={GREEN}>→  x₁ = 12/2 = 6,   x₂ = 2/2 = 1</text>
            <Caption y={284} language={language} text={say('Lehenik idatzi a, b eta c, zeinuekin', 'Primero escribe a, b y c, con sus signos', 'اكتب أولًا a وb وc بإشاراتها')} />
        </Figure>
    )
}

/* ---------- A factored equation ---------- */

export function FactoredFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={240} label={pick(language, say('(x + 1)(x² − 4) = 0: x = −1, x = 2, x = −2', '(x + 1)(x² − 4) = 0: x = −1, x = 2, x = −2', '(x + 1)(x² − 4) = 0: x = −1 وx = 2 وx = −2'))}>
            <text x={360} y={56} textAnchor="middle" fontSize={30} fontWeight={700} fill={INK} fontFamily={SERIF}>(x + 1) · (x² − 4) = 0</text>
            <path d="M290 72 L200 128" stroke={INK} strokeWidth={2} />
            <path d="M430 72 L520 128" stroke={INK} strokeWidth={2} />
            <rect x={90} y={132} width={220} height={52} rx={12} fill={STAGE_TINT} stroke={INK} strokeWidth={2} />
            <rect x={380} y={132} width={280} height={52} rx={12} fill={SOFT} stroke={INK} strokeWidth={2} />
            <text x={200} y={166} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>x + 1 = 0 → x = −1</text>
            <text x={520} y={166} textAnchor="middle" fontSize={21} fontWeight={700} fill={INK}>x² = 4 → x = 2, x = −2</text>
            <Caption y={226} language={language} text={say('Faktore bakoitza 0 egin: hiru ebazpen', 'Iguala a 0 cada factor: tres soluciones', 'اجعل كل عامل 0: ثلاثة حلول')} />
        </Figure>
    )
}

/* ---------- A radical equation ---------- */

export function RadicalFigure({ language }: { language: UnitLanguage }) {
    const rows = [
        { text: say('Erroa bakarrik dago: karratura jaso', 'La raíz está sola: eleva al cuadrado', 'الجذر وحده: ربّع الطرفين'), math: '√(x + 2) = x  →  x + 2 = x²' },
        { text: say('Ebatzi 2. mailako ekuazioa', 'Resuelve la ecuación de 2.º grado', 'حلّ معادلة الدرجة الثانية'), math: 'x² − x − 2 = 0  →  x = 2,  x = −1' }
    ]
    return (
        <Figure height={300} label={pick(language, say('√(x + 2) = x: x = 2 bakarrik da ebazpena', '√(x + 2) = x: solo x = 2 es solución', '√(x + 2) = x: الحل x = 2 فقط'))}>
            {rows.map((row, index) => (
                <g key={index}>
                    <Label x={360} y={34 + index * 70} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, row.text)}</Label>
                    <text x={360} y={64 + index * 70} textAnchor="middle" fontSize={23} fontWeight={700} fill={INK} fontFamily={SERIF}>{row.math}</text>
                </g>
            ))}
            <rect x={70} y={172} width={270} height={60} rx={12} fill="#d6eddf" stroke={INK} strokeWidth={2} />
            <rect x={380} y={172} width={270} height={60} rx={12} fill="#f8dcd0" stroke={INK} strokeWidth={2} />
            <text x={205} y={210} textAnchor="middle" fontSize={20} fontWeight={700} fill={GREEN}>x = 2: √4 = 2 ✓</text>
            <text x={515} y={210} textAnchor="middle" fontSize={20} fontWeight={700} fill={SECOND}>x = −1: √1 = 1 ≠ −1 ✗</text>
            <Caption y={272} language={language} text={say('Karratura jasotzean ebazpen faltsuak ager daitezke: egiaztatu beti', 'Al elevar al cuadrado pueden aparecer soluciones falsas: comprueba siempre', 'قد يظهر بالتربيع حل زائف: تحقّق دائمًا')} />
        </Figure>
    )
}

/* ---------- A rectangle that leads to a quadratic ---------- */

export function AreaProblemFigure({ language }: { language: UnitLanguage }) {
    return (
        <Figure height={290} label={pick(language, say('Azalera 150 cm² eta perimetroa 50 cm: aldeak 15 eta 10', 'Área 150 cm² y perímetro 50 cm: lados 15 y 10', 'المساحة 150 سم² والمحيط 50 سم: الضلعان 15 و10'))}>
            <rect x={60} y={50} width={240} height={150} fill={STAGE_TINT} stroke={INK} strokeWidth={2.4} />
            <text x={180} y={38} textAnchor="middle" fontSize={20} fontWeight={700} fill={STAGE} fontStyle="italic">x</text>
            <text x={312} y={132} fontSize={20} fontWeight={700} fill={SECOND}>25 − x</text>
            <text x={180} y={134} textAnchor="middle" fontSize={22} fontWeight={700} fill={INK}>150 cm²</text>
            <text x={540} y={70} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>x(25 − x) = 150</text>
            <text x={540} y={116} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>x² − 25x + 150 = 0</text>
            <text x={540} y={162} textAnchor="middle" fontSize={20} fontWeight={700} fill={GREEN}>x = 15,  x = 10</text>
            <Label x={540} y={200} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, say('Bi ebazpenek laukizuzen bera ematen dute', 'Las dos soluciones dan el mismo rectángulo', 'الحلّان يعطيان المستطيل نفسه'))}</Label>
            <Caption y={262} language={language} text={say('Perimetroa 50 bada, bi alde jarraiak 25 dira guztira', 'Si el perímetro es 50, dos lados contiguos suman 25', 'إذا كان المحيط 50 فمجموع ضلعين متجاورين 25')} />
        </Figure>
    )
}

/* ---------- The solutions of x + y = 5 ---------- */

export function LinearSolutionsFigure({ language }: { language: UnitLanguage }) {
    const pairs = [[0, 5], [1, 4], [2, 3], [3, 2], [4, 1], [5, 0]] as const
    return (
        <Figure height={290} label={pick(language, say('x + y = 5 ekuazioaren ebazpenak: taula eta zuzena', 'Las soluciones de x + y = 5: tabla y recta', 'حلول x + y = 5: جدول ومستقيم'))}>
            <text x={170} y={40} textAnchor="middle" fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>x + y = 5</text>
            {['x', 'y'].map((name, row) => (
                <g key={name}>
                    <rect x={20} y={64 + row * 44} width={44} height={44} fill={SOFT} stroke={INK} strokeWidth={1.6} />
                    <text x={42} y={93 + row * 44} textAnchor="middle" fontSize={19} fontWeight={700} fontStyle="italic" fill={INK}>{name}</text>
                    {pairs.map((pair, column) => (
                        <g key={column}>
                            <rect x={64 + column * 42} y={64 + row * 44} width={42} height={44} fill={PAPER} stroke={INK} strokeWidth={1.6} />
                            <text x={85 + column * 42} y={93 + row * 44} textAnchor="middle" fontSize={18} fontWeight={700} fill={row === 0 ? STAGE : SECOND}>{pair[row]}</text>
                        </g>
                    ))}
                </g>
            ))}
            <Label x={170} y={190} textAnchor="middle" fontSize={15} fill={MUTED}>{pick(language, say('Bikote bakoitza ebazpen bat da', 'Cada pareja es una solución', 'كل زوج حلّ'))}</Label>
            <Frame box={{ xMin: 0, xMax: 6, yMin: 0, yMax: 6 }} cell={32} ox={400} oy={34}>
                {(map, clip) => (
                    <g>
                        <PlaneLine map={map} m={-1} n={5} clip={clip} />
                        {pairs.map((pair) => <PlanePoint key={pair[0]} map={map} point={[pair[0], pair[1]]} color={SECOND} radius={5.5} />)}
                    </g>
                )}
            </Frame>
            <Caption y={272} language={language} text={say('Bi ezezaguneko ekuazio batek infinitu ebazpen ditu: zuzen bat', 'Una ecuación con dos incógnitas tiene infinitas soluciones: una recta', 'لمعادلة بمجهولين حلول لا نهاية لها: مستقيم')} />
        </Figure>
    )
}

/* ---------- The three kinds of systems ---------- */

export function SystemTypesFigure({ language }: { language: UnitLanguage }) {
    const box: PlaneBox = { xMin: -1, xMax: 5, yMin: -1, yMax: 5 }
    const cases = [
        { ox: 54, lines: [{ m: -1, n: 4 }, { m: 1, n: -2 }], point: true, title: say('Bateragarri determinatua', 'Compatible determinado', 'متوافق محدد'), text: say('ebazpen bat: (3, 1)', 'una solución: (3, 1)', 'حل واحد: (3, 1)') },
        { ox: 294, lines: [{ m: 1, n: 1 }, { m: 1, n: -2 }], point: false, title: say('Bateraezina', 'Incompatible', 'غير متوافق'), text: say('paraleloak: ebazpenik ez', 'paralelas: sin solución', 'متوازيان: لا حل') },
        { ox: 534, lines: [{ m: -0.5, n: 3 }, { m: -0.5, n: 3 }], point: false, title: say('Bateragarri indeterminatua', 'Compatible indeterminado', 'متوافق غير محدد'), text: say('berdinak: infinitu ebazpen', 'coincidentes: infinitas', 'منطبقان: ما لا نهاية') }
    ]
    return (
        <Figure height={280} label={pick(language, say('Sistema motak: zuzenak ebakitzen dira, paraleloak dira edo bat datoz', 'Tipos de sistemas: las rectas se cortan, son paralelas o coinciden', 'أنواع الأنظمة: المستقيمان متقاطعان أو متوازيان أو منطبقان'))}>
            {cases.map((item, index) => (
                <g key={index}>
                    <Frame box={box} cell={22} ox={item.ox} oy={32} labels={false}>
                        {(map, clip) => (
                            <g>
                                <PlaneLine map={map} m={item.lines[0].m} n={item.lines[0].n} clip={clip} width={3.2} />
                                <PlaneLine map={map} m={item.lines[1].m} n={item.lines[1].n} color={SECOND} clip={clip} width={3.2} dashed />
                                {item.point && <PlanePoint map={map} point={[3, 1]} color={GREEN} radius={6} />}
                            </g>
                        )}
                    </Frame>
                    <Label x={item.ox + 66} y={192} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, item.title)}</Label>
                    <Label x={item.ox + 66} y={214} textAnchor="middle" fontSize={14} fill={MUTED}>{pick(language, item.text)}</Label>
                </g>
            ))}
            <Caption y={262} language={language} text={say('Sistemaren ebazpena bi zuzenen ebaki-puntua da', 'La solución del sistema es el punto de corte de las dos rectas', 'حل النظام نقطة تقاطع المستقيمين')} />
        </Figure>
    )
}

/* ---------- The three methods on the same system ---------- */

/** The system 2x + y = 7, x − y = 2 with a brace, on the left */
function SystemBrace({ x, y, top, bottom }: { x: number; y: number; top: string; bottom: string }) {
    return (
        <g>
            <text x={x} y={y + 30} fontSize={70} fill={INK} fontWeight={300}>{'{'}</text>
            <text x={x + 34} y={y} fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>{top}</text>
            <text x={x + 34} y={y + 40} fontSize={22} fontWeight={700} fill={INK} fontFamily={SERIF}>{bottom}</text>
        </g>
    )
}

function MethodFigure({ language, label, rows, caption }: { language: UnitLanguage; label: LocalizedText; rows: Array<{ text: LocalizedText; math: string }>; caption: LocalizedText }) {
    return (
        <Figure height={60 + rows.length * 62 + 40} label={pick(language, label)}>
            <SystemBrace x={20} y={70} top="2x + y = 7" bottom="x − y = 2" />
            {rows.map((row, index) => (
                <g key={index}>
                    <rect x={250} y={18 + index * 62} width={450} height={54} rx={10} fill={index === rows.length - 1 ? '#d6eddf' : index % 2 === 0 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.4} />
                    <Label x={475} y={36 + index * 62} textAnchor="middle" fontSize={13} fill={MUTED}>{pick(language, row.text)}</Label>
                    <text x={475} y={62 + index * 62} textAnchor="middle" fontSize={20} fontWeight={700} fill={index === rows.length - 1 ? GREEN : INK}>{row.math}</text>
                </g>
            ))}
            <text x={130} y={170} textAnchor="middle" fontSize={22} fontWeight={700} fill={GREEN}>x = 3,  y = 1</text>
            <Caption y={60 + rows.length * 62 + 26} language={language} text={caption} />
        </Figure>
    )
}

export function SubstitutionFigure({ language }: { language: UnitLanguage }) {
    return (
        <MethodFigure
            language={language}
            label={say('Ordezkapen-metodoa: x = 3, y = 1', 'Método de sustitución: x = 3, y = 1', 'طريقة التعويض: x = 3 وy = 1')}
            rows={[
                { text: say('1. Askatu y lehen ekuazioan', '1. Despeja y en la primera ecuación', '1. اعزل y في المعادلة الأولى'), math: 'y = 7 − 2x' },
                { text: say('2. Ordeztu bigarrenean', '2. Sustitúyela en la segunda', '2. عوّضها في الثانية'), math: 'x − (7 − 2x) = 2' },
                { text: say('3. Ebatzi', '3. Resuelve', '3. حلّ'), math: '3x − 7 = 2  →  x = 3' },
                { text: say('4. Kalkulatu y', '4. Calcula y', '4. احسب y'), math: 'y = 7 − 2 · 3 = 1' }
            ]}
            caption={say('Askatu errazen askatzen den ezezaguna (koefizientea 1 edo −1)', 'Despeja la incógnita más fácil (coeficiente 1 o −1)', 'اعزل أسهل مجهول (معامله 1 أو −1)')}
        />
    )
}

export function EqualizationFigure({ language }: { language: UnitLanguage }) {
    return (
        <MethodFigure
            language={language}
            label={say('Berdinketa-metodoa: x = 3, y = 1', 'Método de igualación: x = 3, y = 1', 'طريقة المساواة: x = 3 وy = 1')}
            rows={[
                { text: say('1. Askatu y bi ekuazioetan', '1. Despeja y en las dos ecuaciones', '1. اعزل y في المعادلتين'), math: 'y = 7 − 2x,   y = x − 2' },
                { text: say('2. Berdindu', '2. Iguala', '2. ساوِ بينهما'), math: '7 − 2x = x − 2' },
                { text: say('3. Ebatzi', '3. Resuelve', '3. حلّ'), math: '9 = 3x  →  x = 3' },
                { text: say('4. Kalkulatu y', '4. Calcula y', '4. احسب y'), math: 'y = 3 − 2 = 1' }
            ]}
            caption={say('Ezezagun bera askatu bietan eta adierazpenak berdindu', 'Despeja la misma incógnita en las dos e iguala las expresiones', 'اعزل المجهول نفسه في المعادلتين وساوِ العبارتين')}
        />
    )
}

export function ReductionFigure({ language }: { language: UnitLanguage }) {
    return (
        <MethodFigure
            language={language}
            label={say('Laburketa-metodoa: x = 3, y = 1', 'Método de reducción: x = 3, y = 1', 'طريقة الحذف: x = 3 وy = 1')}
            rows={[
                { text: say('1. y-ren koefizienteak aurkakoak dira: batu', '1. Los coeficientes de y son opuestos: suma', '1. معاملا y متعاكسان: اجمع'), math: '(2x + y) + (x − y) = 7 + 2' },
                { text: say('2. y desagertu da', '2. La y ha desaparecido', '2. اختفى y'), math: '3x = 9  →  x = 3' },
                { text: say('3. Ordeztu ekuazio batean', '3. Sustituye en una ecuación', '3. عوّض في معادلة'), math: '2 · 3 + y = 7  →  y = 1' }
            ]}
            caption={say('Behar bada, biderkatu ekuazioak koefizienteak aurkako bihurtzeko', 'Si hace falta, multiplica las ecuaciones para que los coeficientes sean opuestos', 'اضرب المعادلتين عند الحاجة ليصير المعاملان متعاكسين')}
        />
    )
}

/* ---------- Hens and rabbits ---------- */

export function SystemProblemFigure({ language }: { language: UnitLanguage }) {
    const head = [say('buruak', 'cabezas', 'الرؤوس'), say('hankak', 'patas', 'الأرجل')]
    const rows = [
        { name: say('oiloak', 'gallinas', 'الدجاج'), cells: ['x', '2x'] },
        { name: say('untxiak', 'conejos', 'الأرانب'), cells: ['y', '4y'] },
        { name: say('guztira', 'total', 'المجموع'), cells: ['20', '56'] }
    ]
    return (
        <Figure height={270} label={pick(language, say('Oiloak eta untxiak: 20 buru eta 56 hanka', 'Gallinas y conejos: 20 cabezas y 56 patas', 'دجاج وأرانب: 20 رأسًا و56 رجلًا'))}>
            {head.map((text, column) => <Label key={column} x={210 + column * 100} y={40} textAnchor="middle" fontSize={15} fontWeight={700} fill={STAGE}>{pick(language, text)}</Label>)}
            {rows.map((row, index) => (
                <g key={index}>
                    <rect x={30} y={54 + index * 46} width={130} height={46} fill={SOFT} stroke={INK} strokeWidth={1.6} />
                    <Label x={95} y={83 + index * 46} textAnchor="middle" fontSize={15} fontWeight={700} fill={INK}>{pick(language, row.name)}</Label>
                    {row.cells.map((cell, column) => (
                        <g key={column}>
                            <rect x={160 + column * 100} y={54 + index * 46} width={100} height={46} fill={index === 2 ? STAGE_TINT : PAPER} stroke={INK} strokeWidth={1.6} />
                            <text x={210 + column * 100} y={84 + index * 46} textAnchor="middle" fontSize={20} fontWeight={700} fill={INK}>{cell}</text>
                        </g>
                    ))}
                </g>
            ))}
            <SystemBrace x={410} y={78} top="x + y = 20" bottom="2x + 4y = 56" />
            <text x={530} y={186} textAnchor="middle" fontSize={21} fontWeight={700} fill={GREEN}>x = 12,  y = 8</text>
            <Caption y={250} language={language} text={say('Taula batek bi ekuazioak idazten laguntzen du: 12 oilo eta 8 untxi', 'Una tabla ayuda a escribir las dos ecuaciones: 12 gallinas y 8 conejos', 'يساعد الجدول على كتابة المعادلتين: 12 دجاجة و8 أرانب')} />
        </Figure>
    )
}

/* ---------- Hero art: a system, its two lines and the formula ---------- */

export function EquationsSystemsHeroArt() {
    return (
        <div className="fraction-v2-collage" aria-hidden="true">
            <svg viewBox="0 0 520 400" direction="ltr" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
                <g transform="translate(30 40) rotate(-4)">
                    <rect width={240} height={130} rx={16} fill={PAPER} stroke={INK} strokeWidth={2} />
                    <text x={22} y={92} fontSize={84} fill={INK} fontWeight={300}>{'{'}</text>
                    <text x={66} y={56} fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>2x + y = 7</text>
                    <text x={66} y={98} fontSize={24} fontWeight={700} fill={INK} fontFamily={SERIF}>x − y = 2</text>
                </g>
                <g transform="translate(300 50) rotate(5)">
                    <rect width={180} height={150} rx={16} fill="#d6eddf" stroke={INK} strokeWidth={2} />
                    <line x1={20} x2={160} y1={120} y2={120} stroke={INK} strokeWidth={1.6} />
                    <line x1={40} x2={40} y1={20} y2={136} stroke={INK} strokeWidth={1.6} />
                    <line x1={30} x2={160} y1={30} y2={130} stroke="#2f6fdb" strokeWidth={3.4} />
                    <line x1={40} x2={170} y1={130} y2={40} stroke="#c4432a" strokeWidth={3.4} />
                    <circle cx={102} cy={78} r={7} fill="#267b53" stroke={INK} strokeWidth={1.4} />
                </g>
                <g transform="translate(40 240) rotate(2)">
                    <rect width={440} height={90} rx={16} fill="#fbebc0" stroke={INK} strokeWidth={2} />
                    <text x={220} y={56} textAnchor="middle" fontSize={26} fontWeight={700} fill={INK} fontFamily={SERIF}>x = (−b ± √(b² − 4ac)) / 2a</text>
                </g>
            </svg>
        </div>
    )
}
