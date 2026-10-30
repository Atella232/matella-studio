import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { polynomialsChallenges, polynomialsDiagnostic, polynomialsExerciseBank, polynomialsPractice } from './content'
import { PolynomialsHeroArt } from './figures'
import { PolynomialsGames } from './games'
import { POLYNOMIALS_GAME_RECORDS_KEY, polynomialsGameProgressIds } from './games/info'
import { PolynomialsLaboratory } from './lab'
import { polynomialsLabChallengeIds, polynomialsLabToolForTopic, polynomialsLabTools } from './lab/labTools'
import { polynomialsStages, polynomialsTopics } from './lessons'

const polinomioakUnit: UnitDefinition = {
    storagePrefix: 'matella-polinomioak-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', en: '4th ESO · Applied', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Polinomioak', es: 'Polinomios', en: 'Polynomials', ar: 'الحدوديات' },
    documentTitle: { eu: 'Polinomioak · 4. DBH', es: 'Polinomios · 4.º ESO', en: 'Polynomials · 4th ESO', ar: 'الحدوديات · الصف الرابع' },
    tagline: {
        eu: 'Monomioetatik faktorizaziora: eragiketak, identitate nabarmenak, zatiketa eta Ruffini, hondarraren teorema, erroak eta zatiki aljebraikoak.',
        es: 'De los monomios a la factorización: operaciones, igualdades notables, división y Ruffini, teorema del resto, raíces y fracciones algebraicas.',
        en: 'From monomials to factorisation: operations, remarkable identities, division and Ruffini, remainder theorem, roots and algebraic fractions.',
        ar: 'من وحيدات الحد إلى التحليل: العمليات، والمتطابقات الشهيرة، والقسمة وروفيني، ومبرهنة الباقي، والجذور، والكسور الجبرية.'
    },
    heroArt: <PolynomialsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, monomioetatik zatiki aljebraikoetara', es: 'Cinco etapas, de los monomios a las fracciones algebraicas', en: 'Five stages, from monomials to algebraic fractions.', ar: 'خمس مراحل، من وحيدات الحد إلى الكسور الجبرية' },
    stages: polynomialsStages,
    topics: polynomialsTopics,
    diagnostic: polynomialsDiagnostic,
    guidedPractice: polynomialsPractice,
    exerciseBank: polynomialsExerciseBank,
    challenges: polynomialsChallenges,
    lab: {
        description: { eu: `${polynomialsLabTools.length} tresna: zenbaki-makina, fitxa aljebraikoak, biderketaren azalera, identitateak, Ruffiniren taula, erroen bila eta faktore komuna, erronkekin.`, es: `${polynomialsLabTools.length} herramientas: máquina de números, fichas algebraicas, área del producto, identidades, tabla de Ruffini, caza de raíces y factor común, con retos.`, en: `${polynomialsLabTools.length} tools: number machine, algebra tiles, area of a product, identities, Ruffini table, root hunt and common factor, with challenges.`, ar: `${polynomialsLabTools.length} أدوات: آلة الأعداد والبطاقات الجبرية ومساحة الجداء والمتطابقات وجدول روفيني والبحث عن الجذور والعامل المشترك، مع تحديات.` },
        progressIds: polynomialsLabChallengeIds,
        toolForTopic: polynomialsLabToolForTopic,
        render: (props) => <PolynomialsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: polynomialsGameProgressIds,
        recordsKey: POLYNOMIALS_GAME_RECORDS_KEY,
        render: (props) => <PolynomialsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: −8, 22, 6,5 edo 13/2.', es: 'Escribe un número: −8, 22, 6,5 o 13/2.', en: 'Write a number: −8, 22, 6.5 or 13/2.', ar: 'اكتب عددًا: ⁦−8⁩ أو 22 أو 6.5 أو 13/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −8', es: 'Ej.: −8', en: 'e.g. −8', ar: 'مثال: ⁦−8⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −8.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −8.', en: 'I don\'t understand that answer. Write a number, for example −8.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−8⁩.' }
    },
    errorByStage: {
        monomials: { eu: 'Batzeko, antzekoak bakarrik. Ordeztean, negatiboak parentesi artean eta lehenik berreturak.', es: 'Para sumar, solo semejantes. Al sustituir, negativos entre paréntesis y primero las potencias.', en: 'To add, only like terms. When you substitute, put negatives in brackets and do powers first.', ar: 'في الجمع المتشابهة فقط. وعند التعويض السالب بين قوسين والقوى أولًا.' },
        operations: { eu: 'Minus baten atzean zeinu guztiak aldatu. (a ± b)² = a² ± 2ab + b²: ez ahaztu 2ab.', es: 'Tras un menos cambian todos los signos. (a ± b)² = a² ± 2ab + b²: no olvides 2ab.', en: 'After a minus sign, all the signs change. (a ± b)² = a² ± 2ab + b²: don\'t forget 2ab.', ar: 'بعد الناقص تتغيّر كل الإشارات. (a ± b)² = a² ± 2ab + b²: لا تنسَ 2ab.' },
        division: { eu: 'Ruffini: falta diren gaien tokian 0; x + 3 bada, a = −3. Hondarra = P(a).', es: 'Ruffini: 0 en los términos que faltan; si es x + 3, a = −3. Resto = P(a).', en: 'Ruffini: use 0 for the missing terms; if it is x + 3, then a = −3. Remainder = P(a).', ar: 'روفيني: 0 مكان الحدود الناقصة؛ إذا كان x + 3 فإن a = −3. الباقي = P(a).' },
        factor: { eu: 'Erro osoak gai askearen zatitzaileak dira. Lehenik faktore komuna.', es: 'Las raíces enteras son divisores del término independiente. Primero el factor común.', en: 'Integer roots are divisors of the constant term. First, take out the common factor.', ar: 'الجذور الصحيحة قواسم الحد الثابت. العامل المشترك أولًا.' },
        expressions: { eu: 'Faktoreak bakarrik sinplifikatu, ez gaiak. Izendatzaileak: biderkatu MKTz gai guztiak.', es: 'Solo se simplifican factores, no sumandos. Denominadores: multiplica todos los términos por el m.c.m.', en: 'Only factors can be simplified, not terms. Denominators: multiply all terms by the LCM.', ar: 'نختصر العوامل فقط لا الحدود. المقامات: اضرب كل الحدود في المضاعف المشترك.' }
    }
}

export function PolinomioakDbh4ApIntroPage() {
    return <UnitPage unit={polinomioakUnit} />
}
