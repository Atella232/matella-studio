import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { polynomialsChallenges, polynomialsDiagnostic, polynomialsExerciseBank, polynomialsPractice } from './content'
import { PolynomialsHeroArt } from './figures'
import { PolynomialsLaboratory } from './lab'
import { polynomialsLabChallengeIds, polynomialsLabToolForTopic, polynomialsLabTools } from './lab/labTools'
import { polynomialsStages, polynomialsTopics } from './lessons'

const polinomioakUnit: UnitDefinition = {
    storagePrefix: 'matella-polinomioak-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Polinomioak', es: 'Polinomios', ar: 'الحدوديات' },
    documentTitle: { eu: 'Polinomioak · 4. DBH', es: 'Polinomios · 4.º ESO', ar: 'الحدوديات · الصف الرابع' },
    tagline: {
        eu: 'Monomioetatik faktorizaziora: eragiketak, identitate nabarmenak, zatiketa eta Ruffini, hondarraren teorema, erroak eta zatiki aljebraikoak.',
        es: 'De los monomios a la factorización: operaciones, igualdades notables, división y Ruffini, teorema del resto, raíces y fracciones algebraicas.',
        ar: 'من وحيدات الحد إلى التحليل: العمليات، والمتطابقات الشهيرة، والقسمة وروفيني، ومبرهنة الباقي، والجذور، والكسور الجبرية.'
    },
    heroArt: <PolynomialsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, monomioetatik zatiki aljebraikoetara', es: 'Cinco etapas, de los monomios a las fracciones algebraicas', ar: 'خمس مراحل، من وحيدات الحد إلى الكسور الجبرية' },
    stages: polynomialsStages,
    topics: polynomialsTopics,
    diagnostic: polynomialsDiagnostic,
    guidedPractice: polynomialsPractice,
    exerciseBank: polynomialsExerciseBank,
    challenges: polynomialsChallenges,
    lab: {
        description: { eu: `${polynomialsLabTools.length} tresna: zenbaki-makina, fitxa aljebraikoak, biderketaren azalera, identitateak, Ruffiniren taula, erroen bila eta faktore komuna, erronkekin.`, es: `${polynomialsLabTools.length} herramientas: máquina de números, fichas algebraicas, área del producto, identidades, tabla de Ruffini, caza de raíces y factor común, con retos.`, ar: `${polynomialsLabTools.length} أدوات: آلة الأعداد والبطاقات الجبرية ومساحة الجداء والمتطابقات وجدول روفيني والبحث عن الجذور والعامل المشترك، مع تحديات.` },
        progressIds: polynomialsLabChallengeIds,
        toolForTopic: polynomialsLabToolForTopic,
        render: (props) => <PolynomialsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: −8, 22, 6,5 edo 13/2.', es: 'Escribe un número: −8, 22, 6,5 o 13/2.', ar: 'اكتب عددًا: ⁦−8⁩ أو 22 أو 6.5 أو 13/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −8', es: 'Ej.: −8', ar: 'مثال: ⁦−8⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −8.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −8.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−8⁩.' }
    },
    errorByStage: {
        monomials: { eu: 'Batzeko, antzekoak bakarrik. Ordeztean, negatiboak parentesi artean eta lehenik berreturak.', es: 'Para sumar, solo semejantes. Al sustituir, negativos entre paréntesis y primero las potencias.', ar: 'في الجمع المتشابهة فقط. وعند التعويض السالب بين قوسين والقوى أولًا.' },
        operations: { eu: 'Minus baten atzean zeinu guztiak aldatu. (a ± b)² = a² ± 2ab + b²: ez ahaztu 2ab.', es: 'Tras un menos cambian todos los signos. (a ± b)² = a² ± 2ab + b²: no olvides 2ab.', ar: 'بعد الناقص تتغيّر كل الإشارات. (a ± b)² = a² ± 2ab + b²: لا تنسَ 2ab.' },
        division: { eu: 'Ruffini: falta diren gaien tokian 0; x + 3 bada, a = −3. Hondarra = P(a).', es: 'Ruffini: 0 en los términos que faltan; si es x + 3, a = −3. Resto = P(a).', ar: 'روفيني: 0 مكان الحدود الناقصة؛ إذا كان x + 3 فإن a = −3. الباقي = P(a).' },
        factor: { eu: 'Erro osoak gai askearen zatitzaileak dira. Lehenik faktore komuna.', es: 'Las raíces enteras son divisores del término independiente. Primero el factor común.', ar: 'الجذور الصحيحة قواسم الحد الثابت. العامل المشترك أولًا.' },
        expressions: { eu: 'Faktoreak bakarrik sinplifikatu, ez gaiak. Izendatzaileak: biderkatu MKTz gai guztiak.', es: 'Solo se simplifican factores, no sumandos. Denominadores: multiplica todos los términos por el m.c.m.', ar: 'نختصر العوامل فقط لا الحدود. المقامات: اضرب كل الحدود في المضاعف المشترك.' }
    }
}

export function PolinomioakDbh4ApIntroPage() {
    return <UnitPage unit={polinomioakUnit} />
}
