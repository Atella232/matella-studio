import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { PolynomialsHeroArt } from '../dbh4-aplikatuak-polinomioak/figures'
import { polynomialsChallenges, polynomialsDiagnostic, polynomialsExerciseBank, polynomialsPractice } from './content'
import { Polynomials3Games } from './games'
import { POLYNOMIALS3_GAME_RECORDS_KEY, polynomials3GameProgressIds } from './games/info'
import { Polynomials3Laboratory } from './lab'
import { polynomials3LabChallengeIds, polynomials3LabToolForTopic, polynomials3LabTools } from './lab/labTools'
import { polynomialsStages, polynomialsTopics } from './lessons'

const polynomialsUnit: UnitDefinition = {
    storagePrefix: 'matella-polinomioak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' },
    documentTitle: { eu: 'Polinomioak · 3. DBH', es: 'Polinomios · 3.º ESO', en: 'Polynomials · 3rd ESO', ar: 'الحدوديات · الصف الثالث' },
    tagline: {
        eu: 'Hizkuntza aljebraikotik faktorizaziora: monomioak eta polinomioak, eragiketak, identitate nabarmenak, Ruffini, erroak eta zatiki aljebraikoak.',
        es: 'Del lenguaje algebraico a la factorización: monomios y polinomios, operaciones, identidades notables, Ruffini, raíces y fracciones algebraicas.',
        en: 'From algebraic language to factorisation: monomials and polynomials, operations, special products, Ruffini, roots and algebraic fractions.',
        ar: 'من اللغة الجبرية إلى التحليل: وحيدات الحد والحدوديات والعمليات والمتطابقات الشهيرة وروفيني والجذور والكسور الجبرية.'
    },
    heroArt: <PolynomialsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, monomioetatik faktorizaziora', es: 'Cinco etapas, de los monomios a la factorización', en: 'Five stages, from monomials to factorisation', ar: 'خمس مراحل، من وحيدات الحد إلى التحليل' },
    stages: polynomialsStages,
    topics: polynomialsTopics,
    diagnostic: polynomialsDiagnostic,
    guidedPractice: polynomialsPractice,
    exerciseBank: polynomialsExerciseBank,
    challenges: polynomialsChallenges,
    lab: {
        description: {
            eu: `${polynomials3LabTools.length} tresna: fitxa aljebraikoak, karratu baten azalera, hondarraren makina, faktorizatzeko laukizuzena eta beste lau, erronkekin.`,
            es: `${polynomials3LabTools.length} herramientas: las fichas algebraicas, el área de un cuadrado, la máquina del resto, el rectángulo para factorizar y cuatro más, con retos.`,
            en: `${polynomials3LabTools.length} tools: algebra chips, the area of a square, the remainder machine, the factorising rectangle and four more, with challenges.`,
            ar: `${polynomials3LabTools.length} أدوات: البطاقات الجبرية ومساحة المربع وآلة الباقي ومستطيل التحليل وأربع أخرى، مع تحديات.`
        },
        progressIds: polynomials3LabChallengeIds,
        toolForTopic: polynomials3LabToolForTopic,
        render: (props) => <Polynomials3Laboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, antzekoen bila, identitatearen pieza, Ruffiniren taula, polinomioen detektibea eta memoria.',
            es: 'Seis juegos: carrera, a por los semejantes, la pieza de la identidad, la tabla de Ruffini, el detective de polinomios y memoria.',
            en: 'Six games: race, find the like terms, the missing piece, Ruffini\'s table, the polynomials detective and memory.',
            ar: 'ست ألعاب: السباق والبحث عن المتشابهة وقطعة المتطابقة وجدول روفيني ومخبر الحدوديات والذاكرة.'
        },
        progressIds: polynomials3GameProgressIds,
        recordsKey: POLYNOMIALS3_GAME_RECORDS_KEY,
        render: (props) => <Polynomials3Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Emaitza polinomio bat bada, eskatzen den zenbakia bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si el resultado es un polinomio, solo el número que se pide.', en: 'Write a number: 5, −3, 1.5 or 3/2. If the result is a polynomial, only the number asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت النتيجة حدودية فاكتب العدد المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 12', es: 'Ej.: 12', en: 'e.g. 12', ar: 'مثال: 12' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 12 edo −6.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 12 o −6.', en: 'I don\'t understand that answer. Write a number, for example 12 or −6.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 12 أو ⁦−6⁩.' }
    },
    errorByStage: {
        algebra: { eu: 'Antzekoak bakarrik batzen dira; biderkatzean berretzaileak batu. Balioa: ordezkatu x parentesi artean.', es: 'Solo se suman los semejantes; al multiplicar se suman los exponentes. Valor: sustituye x entre paréntesis.', en: 'Only like terms are added; when multiplying, add the exponents. Value: substitute x in brackets.', ar: 'لا تُجمع إلا المتشابهة؛ وعند الضرب تُجمع الأسس. القيمة: عوّض x بين قوسين.' },
        operations: { eu: 'Kentzean minusak gai guztiei eragiten die. Biderkatzean, gai bakoitza bider gai guztiak.', es: 'Al restar, el menos afecta a todos los términos. Al multiplicar, cada término por todos.', en: 'When subtracting, the minus affects every term. When multiplying, each term times every term.', ar: 'عند الطرح يؤثر السالب في كل الحدود. وعند الضرب كل حد في كل الحدود.' },
        identities: { eu: '(a ± b)² = a² ± 2ab + b²; (a + b)(a − b) = a² − b². Ez ahaztu 2ab.', es: '(a ± b)² = a² ± 2ab + b²; (a + b)(a − b) = a² − b². No olvides 2ab.', en: '(a ± b)² = a² ± 2ab + b²; (a + b)(a − b) = a² − b². Do not forget 2ab.', ar: '(a ± b)² = a² ± 2ab + b²؛ (a + b)(a − b) = a² − b². لا تنسَ 2ab.' },
        ruffini: { eu: 'x − a zatitzean, a erabili (x + 3 → −3). Hondarra P(a) da; 0 bada, a erroa da.', es: 'Para dividir entre x − a usa a (x + 3 → −3). El resto es P(a); si es 0, a es raíz.', en: 'To divide by x − a use a (x + 3 → −3). The remainder is P(a); if it is 0, a is a root.', ar: 'للقسمة على x − a استعمل a (x + 3 → −3). الباقي P(a)؛ وإذا كان 0 فإن a جذر.' },
        factor: { eu: 'Lehenik faktore komuna, gero identitateak, azkenik Ruffini. Egiaztatu biderkatuz.', es: 'Primero factor común, después identidades y por último Ruffini. Comprueba multiplicando.', en: 'First the common factor, then special products and finally Ruffini. Check by multiplying.', ar: 'أولًا العامل المشترك ثم المتطابقات وأخيرًا روفيني. تحقّق بالضرب.' }
    }
}

export function PolinomioakDBH3Page() {
    return <UnitPage unit={polynomialsUnit} />
}
