import { checkAnswer, fraction } from '../../../features/unit-v2/math/fraction.ts'
import { freshAnswer, type LabChallenge, type LabToolInfo, type OperationAnswer } from '../../../features/unit-v2/lab/types.ts'
import {
    divides,
    divisibilityLabTools,
    problemCards,
    sieveComplete,
    type CriteriaState,
    type JumpsState,
    type LadderState,
    type RectanglesState,
    type SieveState,
    type SortState,
    type VennState
} from '../../dbh2-zatigarritasuna/lab/labTools.ts'
import { divisors, factorize, gcd, isPrime, lcm } from '../../dbh2-zatigarritasuna/math.ts'
import type { DivisibilityIntroStageId } from '../lessons.tsx'

/* ==========================================================================
   Zatigarritasuna (1. DBH) laboratory. Seven tools are the 2. DBH ones with
   first-year challenges from Santillana (pencils, the pool, the rules for 2,
   3, 5, 9 and 10 only); the divisor table is new: fill in the table of
   products that Santillana uses to list every divisor from the
   factorization. Tests in tests/zatigarritasuna-dbh1-lab.test.ts.
   ========================================================================== */

export type DivisibilityIntroLabToolId = 'rectangles' | 'jumps' | 'criteria' | 'sieve' | 'ladder' | 'table' | 'venn' | 'sort'

export interface DivisibilityIntroLabTool extends LabToolInfo {
    id: DivisibilityIntroLabToolId
    stage: DivisibilityIntroStageId
}

const shared = (id: Exclude<DivisibilityIntroLabToolId, 'table'>) => divisibilityLabTools.find((tool) => tool.id === id)!

/** The rules of the first year: no 7 or 11 */
export const INTRO_CRITERIA = [2, 3, 5, 9, 10] as const

export const divisibilityIntroLabTools: DivisibilityIntroLabTool[] = [
    { ...shared('rectangles'), id: 'rectangles', stage: 'multiples', lessonTopic: 'divisors' },
    { ...shared('jumps'), id: 'jumps', stage: 'multiples', lessonTopic: 'multiples' },
    {
        ...shared('criteria'),
        id: 'criteria',
        stage: 'criteria',
        lessonTopic: 'criteria-digit',
        observe: {
            eu: 'Irizpide bakoitzak zatiketa egin gabe erantzuten du. 2, 5 eta 10ek azken zifrari begiratzen diote; 3k eta 9k, zifren baturari.',
            es: 'Cada criterio responde sin hacer la división. El 2, el 5 y el 10 miran la última cifra; el 3 y el 9, la suma de las cifras.',
            ar: 'كل قاعدة تجيب دون إجراء القسمة. قواعد 2 و5 و10 تنظر إلى الرقم الأخير، وقاعدتا 3 و9 إلى مجموع الأرقام.'
        }
    },
    { ...shared('sieve'), id: 'sieve', stage: 'primes', lessonTopic: 'primes' },
    { ...shared('ladder'), id: 'ladder', stage: 'primes', lessonTopic: 'factorization' },
    {
        id: 'table',
        stage: 'primes',
        lessonTopic: 'divisor-table',
        title: { eu: 'Zatitzaileen taula', es: 'Tabla de divisores', ar: 'جدول القواسم' },
        observe: {
            eu: 'Goiko errenkadan lehen biderkagai lehenaren berreturak daude; ezkerreko zutabean, bigarrenarenak. Gelaxka bakoitza bere errenkadako eta zutabeko zenbakien biderkadura da, eta gelaxka guztiak batera zenbakiaren zatitzaile guztiak dira.',
            es: 'En la fila de arriba están las potencias del primer factor primo; en la columna de la izquierda, las del segundo. Cada casilla es el producto de los números de su fila y su columna, y todas las casillas juntas son todos los divisores del número.',
            ar: 'في الصف العلوي قوى العامل الأولي الأول، وفي العمود الأيسر قوى الثاني. كل خانة حاصل ضرب عددي صفها وعمودها، والخانات كلها معًا هي كل قواسم العدد.'
        }
    },
    { ...shared('venn'), id: 'venn', stage: 'gcd-lcm', lessonTopic: 'gcd' },
    { ...shared('sort'), id: 'sort', stage: 'problems', lessonTopic: 'which' }
]

export const divisibilityIntroLabToolForTopic: Record<string, DivisibilityIntroLabToolId | undefined> = {
    relation: 'rectangles',
    multiples: 'jumps',
    divisors: 'rectangles',
    'criteria-digit': 'criteria',
    'criteria-sum': 'criteria',
    primes: 'sieve',
    factorization: 'ladder',
    'divisor-table': 'table',
    gcd: 'venn',
    lcm: 'jumps',
    which: 'sort',
    method: 'sort'
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, Math.round(value)))
const answered = (state: OperationAnswer, expected: number) => checkAnswer(state.answer, fraction(expected)) === 'correct'
const pairIs = (first: number, second: number, a: number, b: number) => [first, second].sort((x, y) => x - y).join() === [a, b].sort((x, y) => x - y).join()
const foundAll = (state: RectanglesState, value: number) => divisors(value).every((divisor) => (state.found[value] ?? []).includes(divisor))
const inHistory = (state: CriteriaState, rule: (value: number) => boolean) => state.history.some(rule)

/* ---------- Shared tools, first-year challenges ---------- */

export const introRectanglesChallenges: LabChallenge<RectanglesState>[] = [
    {
        id: 3101,
        prompt: { eu: '18 arkatz 3ko poltsetan: jarri 18 karratu 3ko ilaretan eta erakutsi 3 18ren zatitzailea dela.', es: '18 lápices en bolsas de 3: coloca 18 cuadrados en filas de 3 y demuestra que 3 es divisor de 18.', ar: '18 قلمًا في أكياس من 3: رتّب 18 مربعًا في صفوف من 3 وبيّن أن 3 قاسم لـ 18.' },
        hint: { eu: 'Aukeratu 18 karratu eta 3 ilarako.', es: 'Elige 18 cuadrados y 3 por fila.', ar: 'اختر 18 مربعًا و3 في كل صف.' },
        isSolved: (state) => state.total === 18 && state.perRow === 3
    },
    {
        id: 3102,
        prompt: { eu: 'Gelan 24 ikasle daude. Aurkitu 24ren zatitzaile guztiak laukizuzenekin: talde berdinak egiteko modu guztiak.', es: 'En clase hay 24 alumnos. Encuentra todos los divisores de 24 con rectángulos: todas las formas de hacer grupos iguales.', ar: 'في الصف 24 تلميذًا. جد جميع قواسم 24 بالمستطيلات: كل طرق تكوين مجموعات متساوية.' },
        hint: { eu: 'Probatu 1, 2, 3, 4… ilarako. Laukizuzen bakoitzak bi zatitzaile ematen ditu.', es: 'Prueba 1, 2, 3, 4… por fila. Cada rectángulo da dos divisores.', ar: 'جرّب 1، 2، 3، 4… في الصف. كل مستطيل يعطي قاسمين.' },
        isSolved: (state) => foundAll(state, 24)
    },
    {
        id: 3103,
        prompt: { eu: 'Orain 18 arkatz 4ko poltsetan: jarri 18 karratu 4ko ilaretan. Zenbat geratzen dira soberan?', es: 'Ahora 18 lápices en bolsas de 4: coloca 18 cuadrados en filas de 4. ¿Cuántos sobran?', ar: 'الآن 18 قلمًا في أكياس من 4: رتّب 18 مربعًا في صفوف من 4. كم يبقى؟' },
        hint: { eu: '4 ilara osatzen dira: 4 · 4 = 16.', es: 'Se completan 4 filas: 4 · 4 = 16.', ar: 'تكتمل 4 صفوف: 4 · 4 = 16.' },
        isSolved: (state) => state.total === 18 && state.perRow === 4
    },
    {
        id: 3104,
        prompt: { eu: 'Bilatu 10 eta 20 arteko zenbaki bat laukizuzen bakarra egiten duena (lerro bakarra), eta erakutsi bere bi zatitzaileak.', es: 'Busca un número entre 10 y 20 que solo forme un rectángulo (una sola fila) y muestra sus dos divisores.', ar: 'ابحث عن عدد بين 10 و20 لا يكوّن إلا مستطيلًا واحدًا (صفًا واحدًا) واعرض قاسميه.' },
        hint: { eu: 'Zenbaki lehenek bi zatitzaile bakarrik dituzte: 1 eta zenbakia bera.', es: 'Los números primos solo tienen dos divisores: 1 y el propio número.', ar: 'للأعداد الأولية قاسمان فقط: 1 والعدد نفسه.' },
        isSolved: (state) => state.total > 10 && state.total < 20 && isPrime(state.total) && foundAll(state, state.total)
    }
]

export const introJumpsChallenges: LabChallenge<JumpsState>[] = [
    {
        id: 3201,
        prompt: { eu: 'Ana 2 egunean behin doa igerilekura eta Eva 3 egunean behin. Jarri igelak 2 eta 3ko jauzietan eta idatzi lehen bat-egitea.', es: 'Ana va a la piscina cada 2 días y Eva cada 3. Pon las ranas a saltos de 2 y de 3 y escribe la primera coincidencia.', ar: 'تذهب آنا إلى المسبح كل يومين وإيفا كل 3 أيام. اجعل الضفدعين يقفزان 2 و3 واكتب أول التقاء.' },
        hint: { eu: '2, 4, 6… eta 3, 6… Non elkartzen dira lehen aldiz?', es: '2, 4, 6… y 3, 6… ¿Dónde se encuentran por primera vez?', ar: '2، 4، 6… و3، 6… أين يلتقيان أول مرة؟' },
        isSolved: (state) => pairIs(state.first, state.second, 2, 3) && answered(state, 6)
    },
    {
        id: 3202,
        prompt: { eu: 'Itsasontzi bat 4 egunean behin irteten da eta beste bat 6 egunean behin. Noiz irtengo dira berriro batera?', es: 'Un barco sale cada 4 días y otro cada 6. ¿Cuándo vuelven a salir juntos?', ar: 'سفينة تغادر كل 4 أيام وأخرى كل 6. متى تغادران معًا مجددًا؟' },
        hint: { eu: 'Kontuz: 24 multiplo komuna da, baina ez txikiena.', es: 'Cuidado: 24 es múltiplo común, pero no el menor.', ar: 'انتبه: 24 مضاعف مشترك لكنه ليس الأصغر.' },
        isSolved: (state) => pairIs(state.first, state.second, 4, 6) && answered(state, 12)
    },
    {
        id: 3203,
        prompt: { eu: 'Jarri 3ko eta 5eko jauziak eta idatzi MKT. Zer ikusten duzu 3 · 5ekin?', es: 'Pon saltos de 3 y de 5 y escribe el m.c.m. ¿Qué observas con 3 · 5?', ar: 'اجعل القفزات 3 و5 واكتب م.م.أ. ماذا تلاحظ مع 3 · 5؟' },
        hint: { eu: '3k eta 5ek ez dute zatitzaile komunik 1 izan ezik.', es: '3 y 5 no tienen más divisor común que el 1.', ar: 'ليس للعددين 3 و5 قاسم مشترك غير 1.' },
        isSolved: (state) => pairIs(state.first, state.second, 3, 5) && answered(state, 15)
    },
    {
        id: 3204,
        prompt: { eu: 'Aukeratu bi jauzi desberdin, bata bestearen multiploa izanik (adibidez 5 eta 10), eta idatzi MKT.', es: 'Elige dos saltos distintos, uno múltiplo del otro (por ejemplo 5 y 10), y escribe el m.c.m.', ar: 'اختر قفزتين مختلفتين إحداهما مضاعف للأخرى (مثل 5 و10) واكتب م.م.أ.' },
        hint: { eu: 'Jauzi handienak jada zapaltzen ditu biak.', es: 'El salto mayor ya pisa los dos.', ar: 'القفزة الكبرى تمر على الاثنين.' },
        isSolved: (state) => state.first !== state.second && lcm(state.first, state.second) === Math.max(state.first, state.second) && answered(state, Math.max(state.first, state.second))
    }
]

export const introCriteriaChallenges: LabChallenge<CriteriaState>[] = [
    {
        id: 3301,
        prompt: { eu: 'Idatzi hiru zifrako zenbaki bat, 10ekin zatigarria.', es: 'Escribe un número de tres cifras divisible por 10.', ar: 'اكتب عددًا من ثلاثة أرقام يقبل القسمة على 10.' },
        hint: { eu: '0z amaitu behar du.', es: 'Tiene que acabar en 0.', ar: 'يجب أن ينتهي بـ 0.' },
        isSolved: (state) => inHistory(state, (value) => value >= 100 && value <= 999 && divides(10, value))
    },
    {
        id: 3302,
        prompt: { eu: 'Bilatu 3rekin zatigarria baina 9rekin zatigarria ez den zenbaki bat.', es: 'Busca un número divisible por 3 pero no por 9.', ar: 'ابحث عن عدد يقبل القسمة على 3 ولا يقبلها على 9.' },
        hint: { eu: 'Zifren batura 3, 6, 12 edo 15 izan dadila, baina ez 9 edo 18.', es: 'Que sus cifras sumen 3, 6, 12 o 15, pero no 9 ni 18.', ar: 'ليكن مجموع أرقامه 3 أو 6 أو 12 أو 15، لا 9 ولا 18.' },
        isSolved: (state) => inHistory(state, (value) => divides(3, value) && !divides(9, value))
    },
    {
        id: 3303,
        prompt: { eu: 'Bilatu 2rekin, 3rekin eta 5ekin aldi berean zatigarria den zenbaki bat.', es: 'Busca un número divisible a la vez por 2, por 3 y por 5.', ar: 'ابحث عن عدد يقبل القسمة على 2 و3 و5 معًا.' },
        hint: { eu: '0z amaitu behar du, eta zifren baturak 3ren multiploa izan behar du.', es: 'Tiene que acabar en 0 y la suma de sus cifras tiene que ser múltiplo de 3.', ar: 'يجب أن ينتهي بـ 0 وأن يكون مجموع أرقامه مضاعفًا لـ 3.' },
        isSolved: (state) => inHistory(state, (value) => divides(30, value))
    },
    {
        id: 3304,
        prompt: { eu: 'Idatzi 9rekin zatigarria den lau zifrako zenbaki bat.', es: 'Escribe un número de cuatro cifras divisible por 9.', ar: 'اكتب عددًا من أربعة أرقام يقبل القسمة على 9.' },
        hint: { eu: 'Zifren batura 9, 18, 27… izan dadila. Adibidez, hasi 1ekin.', es: 'Que sus cifras sumen 9, 18, 27… Por ejemplo, empieza por 1.', ar: 'ليكن مجموع أرقامه 9 أو 18 أو 27… مثلًا ابدأ بـ 1.' },
        isSolved: (state) => inHistory(state, (value) => value >= 1000 && value <= 9999 && divides(9, value))
    }
]

export const introSieveChallenges: LabChallenge<SieveState>[] = [
    {
        id: 3401,
        prompt: { eu: 'Hasi bahea: aukeratu 2 eta 3.', es: 'Empieza la criba: elige el 2 y el 3.', ar: 'ابدأ الغربال: اختر 2 و3.' },
        hint: { eu: '1 ez da lehena. 2 da lehen lehena.', es: 'El 1 no es primo. El 2 es el primer primo.', ar: 'العدد 1 ليس أوليًا. و2 هو أول عدد أولي.' },
        isSolved: (state) => state.circled.includes(2) && state.circled.includes(3)
    },
    {
        id: 3402,
        prompt: { eu: 'Osatu bahea 100 arte.', es: 'Completa la criba hasta 100.', ar: 'أكمل الغربال حتى 100.' },
        hint: { eu: 'Aukeratu beti ratatu gabeko hurrengo zenbakia: 5, 7…', es: 'Elige siempre el siguiente sin tachar: 5, 7…', ar: 'اختر دائمًا العدد التالي غير المشطوب: 5، 7…' },
        isSolved: (state) => sieveComplete(state)
    },
    {
        id: 3403,
        prompt: { eu: 'Bahea osatuta, zenbatu: zenbat zenbaki lehen daude 100 arte?', es: 'Con la criba completa, cuenta: ¿cuántos primos hay hasta 100?', ar: 'بعد اكتمال الغربال عُدّ: كم عددًا أوليًا حتى 100؟' },
        hint: { eu: 'Zenbatu ratatu gabeak hamarreko bakoitzean.', es: 'Cuenta los que quedan sin tachar en cada decena.', ar: 'عُدّ الأعداد غير المشطوبة في كل عشرة.' },
        isSolved: (state) => sieveComplete(state) && answered(state, 25)
    },
    {
        id: 3404,
        prompt: { eu: 'Osatu bahea lau zenbaki bakarrik sakatuta.', es: 'Completa la criba pulsando solo cuatro números.', ar: 'أكمل الغربال بالضغط على أربعة أعداد فقط.' },
        hint: { eu: '7 ondoren ez da ezer berririk ratatzen, 11 · 11 = 121 100 baino handiagoa delako.', es: 'Después del 7 ya no se tacha nada nuevo, porque 11 · 11 = 121 es mayor que 100.', ar: 'بعد 7 لا يُشطب شيء جديد لأن 11 · 11 = 121 أكبر من 100.' },
        isSolved: (state) => state.circled.join() === '2,3,5,7' && sieveComplete(state)
    }
]

export const introLadderChallenges: LabChallenge<LadderState>[] = [
    {
        id: 3501,
        prompt: { eu: 'Deskonposatu 36, liburuan bezala.', es: 'Descompón 36, como en el libro.', ar: 'حلّل 36 كما في الكتاب.' },
        hint: { eu: '36 bikoitia da: hasi 2rekin.', es: '36 es par: empieza por 2.', ar: '36 زوجي: ابدأ بـ 2.' },
        isSolved: (state) => state.finished.includes(36)
    },
    {
        id: 3502,
        prompt: { eu: 'Deskonposatu 45.', es: 'Descompón 45.', ar: 'حلّل 45.' },
        hint: { eu: '45 ez da bikoitia; $4+5=9$, beraz 3rekin zatigarria da.', es: '45 no es par; $4+5=9$, así que es divisible por 3.', ar: '45 ليس زوجيًا؛ $4+5=9$ فهو يقبل القسمة على 3.' },
        isSolved: (state) => state.finished.includes(45)
    },
    {
        id: 3503,
        prompt: { eu: 'Deskonposatu 100.', es: 'Descompón 100.', ar: 'حلّل 100.' },
        hint: { eu: '0z amaitzen da: 2rekin eta 5ekin zatigarria da.', es: 'Acaba en 0: es divisible por 2 y por 5.', ar: 'ينتهي بـ 0: يقبل القسمة على 2 و5.' },
        isSolved: (state) => state.finished.includes(100)
    },
    {
        id: 3504,
        prompt: { eu: 'Bilatu eta deskonposatu 100 baino txikiagoa den zenbaki bat, hiru lehen desberdin dituena.', es: 'Busca y descompón un número menor que 100 con tres primos distintos.', ar: 'ابحث عن عدد أصغر من 100 له ثلاثة عوامل أولية مختلفة وحلّله.' },
        hint: { eu: 'Biderkatu hiru lehen txiki: 2 · 3 · 5…', es: 'Multiplica tres primos pequeños: 2 · 3 · 5…', ar: 'اضرب ثلاثة أعداد أولية صغيرة: 2 · 3 · 5…' },
        isSolved: (state) => state.finished.some((value) => value < 100 && factorize(value).length === 3)
    }
]

export const introVennChallenges: LabChallenge<VennState>[] = [
    {
        id: 3701,
        prompt: { eu: 'Jonen 12 lokomotorak eta Peioren 18 hegazkinak: kalkulatu ZKH(12, 18).', es: 'Las 12 locomotoras de Juan y los 18 aviones de Pedro: calcula el m.c.d.(12, 18).', ar: 'قاطرات خوان الـ 12 وطائرات بيدرو الـ 18: احسب ق.م.أ(12، 18).' },
        hint: { eu: 'Biderkatu erdiko biderkagaiak.', es: 'Multiplica los factores del centro.', ar: 'اضرب العوامل التي في الوسط.' },
        isSolved: (state) => pairIs(state.first, state.second, 12, 18) && state.ask === 'gcd' && answered(state, 6)
    },
    {
        id: 3702,
        prompt: { eu: 'Kalkulatu MKT(4, 6).', es: 'Calcula el m.c.m.(4, 6).', ar: 'احسب م.م.أ(4، 6).' },
        hint: { eu: 'Biderkatu diagramako biderkagai guztiak.', es: 'Multiplica todos los factores del diagrama.', ar: 'اضرب كل عوامل المخطط.' },
        isSolved: (state) => pairIs(state.first, state.second, 4, 6) && state.ask === 'lcm' && answered(state, 12)
    },
    {
        id: 3703,
        prompt: { eu: 'Kalkulatu ZKH(24, 36).', es: 'Calcula el m.c.d.(24, 36).', ar: 'احسب ق.م.أ(24، 36).' },
        hint: { eu: 'Erdian 2, 2 eta 3 geratzen dira.', es: 'En el centro quedan 2, 2 y 3.', ar: 'في الوسط يبقى 2 و2 و3.' },
        isSolved: (state) => pairIs(state.first, state.second, 24, 36) && state.ask === 'gcd' && answered(state, 12)
    },
    {
        id: 3704,
        prompt: { eu: 'Aukeratu 5 baino handiagoak diren bi zenbaki, erdian ezer ez dutenak, eta kalkulatu haien MKT.', es: 'Elige dos números mayores que 5 que no tengan nada en el centro y calcula su m.c.m.', ar: 'اختر عددين أكبر من 5 لا شيء في وسطهما واحسب م.م.أ لهما.' },
        hint: { eu: 'Erdia hutsik badago, ZKH = 1 eta MKT biderkadura da. Probatu 8 eta 9.', es: 'Si el centro está vacío, el m.c.d. es 1 y el m.c.m. es el producto. Prueba 8 y 9.', ar: 'إذا كان الوسط فارغًا فإن ق.م.أ = 1 وم.م.أ هو حاصل الضرب. جرّب 8 و9.' },
        isSolved: (state) => state.first > 5 && state.second > 5 && gcd(state.first, state.second) === 1 && state.ask === 'lcm' && answered(state, state.first * state.second)
    }
]

const rightOf = (state: SortState, kind: 'gcd' | 'lcm') => problemCards.filter((card) => card.kind === kind && state.answers[card.id] === kind).length

export const introSortChallenges: LabChallenge<SortState>[] = [
    {
        id: 3801,
        prompt: { eu: 'Aurkitu ZKH behar duten hiru egoera.', es: 'Encuentra tres situaciones que necesitan el m.c.d.', ar: 'جد ثلاثة مواقف تحتاج ق.م.أ.' },
        hint: { eu: 'Banatu, moztu, taldekatu, ezer soberan gabe…', es: 'Repartir, cortar, agrupar, sin que sobre nada…', ar: 'نوزّع، نقص، نجمع، دون أن يبقى شيء…' },
        isSolved: (state) => rightOf(state, 'gcd') >= 3
    },
    {
        id: 3802,
        prompt: { eu: 'Aurkitu MKT behar duten hiru egoera.', es: 'Encuentra tres situaciones que necesitan el m.c.m.', ar: 'جد ثلاثة مواقف تحتاج م.م.أ.' },
        hint: { eu: 'Berriro batera, aldi berean, lehen aldiz…', es: 'Volver a coincidir, a la vez, por primera vez…', ar: 'يلتقيان مجددًا، في الوقت نفسه، لأول مرة…' },
        isSolved: (state) => rightOf(state, 'lcm') >= 3
    },
    {
        id: 3803,
        prompt: { eu: 'Sailkatu egoera guztiak akatsik gabe.', es: 'Clasifica todas las situaciones sin ningún error.', ar: 'صنّف كل المواقف دون أي خطأ.' },
        hint: { eu: 'Akatsen bat egin baduzu, sakatu «Berriro hasi».', es: 'Si te has equivocado, pulsa «Empezar de nuevo».', ar: 'إذا أخطأت فاضغط «ابدأ من جديد».' },
        isSolved: (state) => state.mistakes === 0 && problemCards.every((card) => state.answers[card.id] === card.kind)
    }
]

/* ---------- Divisor table (new) ---------- */

export const TABLE_LIMITS = { min: 2, max: 200 } as const

export interface TableState extends OperationAnswer {
    value: number
    /** What the learner typed in each cell, keyed "row,column" */
    entries: Record<string, string>
    /** Numbers whose table has been completed */
    finished: number[]
}

export interface DivisorTable {
    /** 1 and the powers of the first prime (top row) */
    top: number[]
    /** 1 and the powers of the second prime (left column); just [1] for powers of one prime */
    left: number[]
    /** Every cell: top[column] · left[row] */
    cells: number[][]
}

/** The table works for numbers with one or two different primes; null otherwise */
export function divisorTable(value: number): DivisorTable | null {
    const factors = factorize(value)
    if (factors.length === 0 || factors.length > 2) return null
    const [[firstPrime, firstExponent], second] = factors
    const top = Array.from({ length: firstExponent + 1 }, (_, power) => firstPrime ** power)
    const left = second ? Array.from({ length: second[1] + 1 }, (_, power) => second[0] ** power) : [1]
    return { top, left, cells: left.map((row) => top.map((column) => row * column)) }
}

export const cellKey = (row: number, column: number) => `${row},${column}`

export function cellRight(state: Pick<TableState, 'value' | 'entries'>, row: number, column: number): boolean {
    const table = divisorTable(state.value)
    const entry = state.entries[cellKey(row, column)]?.trim()
    return Boolean(table && entry && Number(entry) === table.cells[row]?.[column])
}

export function tableComplete(state: Pick<TableState, 'value' | 'entries'>): boolean {
    const table = divisorTable(state.value)
    return Boolean(table && table.cells.every((cells, row) => cells.every((_, column) => cellRight(state, row, column))))
}

export const initialTableState: TableState = { value: 36, entries: {}, finished: [], ...freshAnswer }

export function setTableValue(state: TableState, value: number): TableState {
    return { ...state, value: clamp(value, TABLE_LIMITS.min, TABLE_LIMITS.max), entries: {}, ...freshAnswer }
}

export function setTableEntry(state: TableState, row: number, column: number, entry: string): TableState {
    const next = { ...state, entries: { ...state.entries, [cellKey(row, column)]: entry } }
    if (!tableComplete(next) || next.finished.includes(next.value)) return next
    return { ...next, finished: [...next.finished, next.value] }
}

export const tableChallenges: LabChallenge<TableState>[] = [
    {
        id: 3601,
        prompt: { eu: 'Bete 36ren taula, liburuan bezala.', es: 'Rellena la tabla de 36, como en el libro.', ar: 'املأ جدول 36 كما في الكتاب.' },
        hint: { eu: '36 = 2² · 3². Lehen errenkada: 1, 2, 4. Bigarrena bider 3; hirugarrena bider 9.', es: '36 = 2² · 3². Primera fila: 1, 2, 4. La segunda por 3; la tercera por 9.', ar: '36 = 2² · 3². الصف الأول: 1، 2، 4. الثاني مضروبًا في 3؛ والثالث في 9.' },
        isSolved: (state) => state.finished.includes(36)
    },
    {
        id: 3602,
        prompt: { eu: 'Bete 45en taula eta idatzi zenbat zatitzaile dituen.', es: 'Rellena la tabla de 45 y escribe cuántos divisores tiene.', ar: 'املأ جدول 45 واكتب عدد قواسمه.' },
        hint: { eu: '45 = 3² · 5: 3 zutabe eta 2 errenkada.', es: '45 = 3² · 5: 3 columnas y 2 filas.', ar: '45 = 3² · 5: ‏3 أعمدة وصفان.' },
        isSolved: (state) => state.value === 45 && tableComplete(state) && answered(state, 6)
    },
    {
        id: 3603,
        prompt: { eu: 'Bilatu zehazki 8 zatitzaile dituen zenbaki bat eta bete haren taula.', es: 'Busca un número con exactamente 8 divisores y rellena su tabla.', ar: 'ابحث عن عدد له 8 قواسم بالضبط واملأ جدوله.' },
        hint: { eu: 'Taulak 8 gelaxka behar ditu: 4 · 2 edo 2 · 4. Adibidez, $2^{3}\\cdot 3$.', es: 'La tabla necesita 8 casillas: 4 · 2 o 2 · 4. Por ejemplo, $2^{3}\\cdot 3$.', ar: 'يحتاج الجدول 8 خانات: 4 · 2 أو 2 · 4. مثلًا $2^{3}\\cdot 3$.' },
        isSolved: (state) => state.finished.some((value) => divisors(value).length === 8)
    },
    {
        id: 3604,
        prompt: { eu: 'Bilatu errenkada bakarreko taula duen zenbaki konposatu bat eta bete.', es: 'Busca un número compuesto cuya tabla tenga una sola fila y rellénala.', ar: 'ابحث عن عدد مؤلف لجدوله صف واحد فقط واملأه.' },
        hint: { eu: 'Lehen bakar baten berretura izan behar du: 8, 16, 27…', es: 'Tiene que ser potencia de un solo primo: 8, 16, 27…', ar: 'يجب أن يكون قوة لعدد أولي واحد: 8، 16، 27…' },
        isSolved: (state) => state.finished.some((value) => !isPrime(value) && factorize(value).length === 1)
    }
]

export const divisibilityIntroLabChallengeIds: number[] = [
    ...introRectanglesChallenges,
    ...introJumpsChallenges,
    ...introCriteriaChallenges,
    ...introSieveChallenges,
    ...introLadderChallenges,
    ...tableChallenges,
    ...introVennChallenges,
    ...introSortChallenges
].map((challenge) => challenge.id)
