import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { AlgebraHeroArt } from './figures'
import { algebraStages, algebraTopics } from './lessons'

const aljebraUnit: UnitDefinition = {
    storagePrefix: 'matella-aljebra-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Adierazpen aljebraikoak', es: 'Expresiones algebraicas', ar: 'العبارات الجبرية' },
    documentTitle: { eu: 'Adierazpen aljebraikoak · 2. DBH', es: 'Expresiones algebraicas · 2.º ESO', ar: 'العبارات الجبرية · الصف الثاني' },
    tagline: {
        eu: 'Letrak, monomioak eta polinomioak: ikasi haiekin eragiketak egiten, biderkadura nabarmenak erabiltzen eta faktore komuna ateratzen.',
        es: 'Letras, monomios y polinomios: aprende a operar con ellos, a usar los productos notables y a sacar factor común.',
        ar: 'حروف ووحيدات حد وحدوديات: تعلّم إجراء العمليات عليها واستعمال المتطابقات الشهيرة وإخراج العامل المشترك.'
    },
    heroArt: <AlgebraHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, hizkuntza aljebraikotik faktorizaziora', es: 'Cinco etapas, del lenguaje algebraico a la factorización', ar: 'خمس مراحل، من اللغة الجبرية إلى التحليل' },
    stages: algebraStages,
    topics: algebraTopics,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: −45, 12 edo 0,5.', es: 'Escribe un número: −45, 12 o 0,5.', ar: 'اكتب عددًا: ⁦−45⁩ أو 12 أو 0.5.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −45', es: 'Ej.: −45', ar: 'مثال: ⁦−45⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −45.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −45.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−45⁩.' }
    },
    errorByStage: {
        language: { eu: 'Ordeztu letra zenbakiaz, negatiboak parentesi artean, eta lehenik berreturak.', es: 'Sustituye la letra por el número, los negativos entre paréntesis, y primero las potencias.', ar: 'عوّض الحرف بالعدد، والسالب بين قوسين، والقوى أولًا.' },
        monomials: { eu: 'Batzeko, antzekoak bakarrik. Biderkatzean berretzaileak batu; zatitzean, kendu.', es: 'Para sumar, solo semejantes. Al multiplicar se suman los exponentes; al dividir, se restan.', ar: 'في الجمع المتشابهة فقط. عند الضرب نجمع الأسس وعند القسمة نطرحها.' },
        polynomials: { eu: 'Minus baten atzeko parentesian zeinu guztiak aldatu. Biderkatzean, gai bakoitza guztiez.', es: 'Tras un menos, cambian todos los signos del paréntesis. Al multiplicar, cada término por todos.', ar: 'بعد الناقص تتغيّر كل إشارات القوس. وفي الضرب كل حد في كل الحدود.' },
        products: { eu: '(a ± b)² = a² ± 2ab + b². Ez ahaztu 2ab! (a + b)(a − b) = a² − b².', es: '(a ± b)² = a² ± 2ab + b². ¡No olvides 2ab! (a + b)(a − b) = a² − b².', ar: '(a ± b)² = a² ± 2ab + b². لا تنسَ 2ab! (a + b)(a − b) = a² − b².' },
        factor: { eu: 'Koefizienteen ZKH eta letra komunak berretzaile txikienarekin. Egiaztatu biderkatuz.', es: 'm.c.d. de los coeficientes y letras comunes con el menor exponente. Comprueba multiplicando.', ar: 'ق.م.أ للمعاملات والحروف المشتركة بأصغر أس. تحقّق بالضرب.' }
    }
}

export function AljebraDBH2Page() {
    return <UnitPage unit={aljebraUnit} />
}
