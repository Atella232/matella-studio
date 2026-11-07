import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readTrigonometryAnswer } from '../dbh4-akademikoak-trigonometria/answers'
import { complexChallenges, complexDiagnostic, complexExerciseBank, complexPractice } from './content'
import { ComplexHeroArt } from './figures'
import { complexStages, complexTopics } from './lessons'

const konplexuakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-konplexuak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Zenbaki konplexuak', es: 'Números complejos', en: 'Complex numbers', ar: 'الأعداد المركبة' },
    documentTitle: { eu: 'Zenbaki konplexuak · Batxilergoa 1', es: 'Números complejos · 1.º Bachillerato', en: 'Complex numbers · 1st Bachillerato', ar: 'الأعداد المركبة · البكالوريا الأولى' },
    tagline: {
        eu: 'Unitate irudikaria eta forma binomikoa, plano konplexua, eragiketak eta i zenbakiaren berreturak, forma polarra eta trigonometrikoa, biderkatzea biratzea da, Moivreren formula eta erroak, poligono erregularrak marrazten dituztenak.',
        es: 'La unidad imaginaria y la forma binómica, el plano complejo, las operaciones y las potencias de i, la forma polar y la trigonométrica, multiplicar es girar, la fórmula de Moivre y las raíces, que dibujan polígonos regulares.',
        en: 'The imaginary unit and the binomial form, the complex plane, the operations and the powers of i, the polar and the trigonometric form, multiplying is turning, De Moivre\'s formula and the roots, which draw regular polygons.',
        ar: 'الوحدة التخيلية والشكل الجبري، والمستوى المركب، والعمليات وقوى i، والشكل القطبي والشكل المثلثي، والضرب دوران، وصيغة دي موافر والجذور التي ترسم مضلعات منتظمة.'
    },
    heroArt: <ComplexHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, i zenbakitik erroen poligonoetara', es: 'Cinco etapas, de la i a los polígonos de las raíces', en: 'Five stages, from i to the polygons of the roots', ar: 'خمس مراحل، من i إلى مضلعات الجذور' },
    stages: complexStages,
    topics: complexTopics,
    diagnostic: complexDiagnostic,
    guidedPractice: complexPractice,
    exerciseBank: complexExerciseBank,
    challenges: complexChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat edo zatiki bat (3/4), komarekin edo puntuarekin (0,75 edo 0.75). Argumentuak gradutan, 0° eta 360° artean. Negatiboak minus ikurrarekin.', es: 'Escribe un número o una fracción (3/4), con coma o con punto (0,75 o 0.75). Los argumentos, en grados entre 0° y 360°. Los negativos, con signo menos.', en: 'Write a number or a fraction (3/4); a decimal point or a comma both work (0.75). Arguments in degrees, between 0° and 360°. Negatives with a minus sign.', ar: 'اكتب عددًا أو كسرًا (3/4) بالنقطة أو بالفاصلة (0.75). والعُمَد بالدرجات بين 0° و360°. والسالب بإشارة الناقص.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readTrigonometryAnswer,
        placeholder: () => ({ eu: 'Adib.: −3/4 edo 120', es: 'Ej.: −3/4 o 120', en: 'e.g. −3/4 or 120', ar: 'مثال: ⁦−3/4⁩ أو 120' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki edo zatiki gisa.', es: 'El valor es correcto, pero escríbelo como número o fracción.', en: 'The value is correct, but write it as a number or a fraction.', ar: 'القيمة صحيحة، لكن اكتبها عددًا أو كسرًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat edo zatiki bat, adibidez 5, −3/4, 2,24 edo 135.', es: 'No entiendo esa respuesta. Escribe un número o una fracción, por ejemplo 5, −3/4, 2,24 o 135.', en: 'I don\'t understand that answer. Write a number or a fraction, for example 5, −3/4, 2.24 or 135.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا أو كسرًا، مثل 5 أو ⁦−3/4⁩ أو 2.24 أو 135.' }
    },
    errorByStage: {
        binomial: { eu: 'i² = −1, ez 1. Konjokatuak zati irudikariaren zeinua bakarrik aldatzen du; aurkakoak, biak. Afixuan, lehenik zati erreala.', es: 'i² = −1, no 1. El conjugado cambia solo el signo de la parte imaginaria; el opuesto, los dos. En el afijo, primero la parte real.', en: 'i² = −1, not 1. The conjugate changes only the sign of the imaginary part; the opposite, both. In the affix, the real part first.', ar: 'i² = −1 لا 1. المرافق يغيّر إشارة الجزء التخيلي فقط، والمعاكس يغيّر الإشارتين. وفي الصورة يأتي الجزء الحقيقي أولًا.' },
        operations: { eu: 'Biderkatzean, banatu eta i² = −1 jarri. Zatitzeko, biderkatu goian eta behean izendatzailearen konjokatuaz. iⁿ: n zati 4 egitean geratzen den hondarrak agintzen du.', es: 'Al multiplicar, reparte y pon i² = −1. Para dividir, multiplica arriba y abajo por el conjugado del denominador. En iⁿ manda el resto de dividir n entre 4.', en: 'To multiply, expand and put i² = −1. To divide, multiply top and bottom by the conjugate of the denominator. In iⁿ, the remainder of n divided by 4 decides.', ar: 'عند الضرب وزّع وضع i² = −1. وللقسمة اضرب البسط والمقام في مرافق المقام. وفي iⁿ يحسم باقي قسمة n على 4.' },
        polar: { eu: 'Modulua √(a² + b²) da, ez a + b. Argumentuak koadrantea begiratu behar du: kalkulagailuak ez du beti angelu zuzena ematen.', es: 'El módulo es √(a² + b²), no a + b. El argumento mira el cuadrante: la calculadora no siempre da el ángulo bueno.', en: 'The modulus is √(a² + b²), not a + b. The argument depends on the quadrant: the calculator does not always give the right angle.', ar: 'الطويلة √(a² + b²) لا a + b. والعمدة تتبع الربع: الآلة الحاسبة لا تعطي الزاوية الصحيحة دائمًا.' },
        turns: { eu: 'Biderkatzean moduluak biderkatu eta argumentuak batu egiten dira; zatitzean, zatitu eta kendu. Moivre: modulua rⁿ eta argumentua n·α, ez n·r.', es: 'Al multiplicar, los módulos se multiplican y los argumentos se suman; al dividir, se dividen y se restan. Moivre: módulo rⁿ y argumento n·α, no n·r.', en: 'To multiply, the moduli multiply and the arguments add; to divide, they divide and subtract. De Moivre: modulus rⁿ and argument n·α, not n·r.', ar: 'عند الضرب تُضرب الطويلات وتُجمع العُمَد، وعند القسمة تُقسم وتُطرح. دي موافر: الطويلة rⁿ والعمدة n·α، لا n·r.' },
        roots: { eu: 'Zenbaki batek n erro n-garren ditu, ez bakarra. Argumentuak: (α + 360°·k)/n, k = 0, 1, …, n − 1. Poligono erregular bat osatzen dute.', es: 'Un número tiene n raíces n-ésimas, no una. Argumentos: (α + 360°·k)/n, con k = 0, 1, …, n − 1. Forman un polígono regular.', en: 'A number has n n-th roots, not one. Arguments: (α + 360°·k)/n, with k = 0, 1, …, n − 1. They form a regular polygon.', ar: 'للعدد n جذرًا نونيًا لا جذر واحد. العُمَد: (α + 360°·k)/n حيث k = 0, 1, …, n − 1. وتشكّل مضلعًا منتظمًا.' }
    }
}

export function KonplexuakBatx1zIntroPage() {
    return <UnitPage unit={konplexuakBatx1zUnit} />
}
