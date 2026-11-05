import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachEquationsChallenges, bachEquationsDiagnostic, bachEquationsExerciseBank, bachEquationsPractice } from './content'
import { BachEquationsHeroArt } from './figures'
import { BachEquationsGames } from './games'
import { BACH_EQUATIONS_GAME_RECORDS_KEY, bachEquationsGameProgressIds } from './games/info'
import { BachEquationsLaboratory } from './lab'
import { bachEquationsLabChallengeIds, bachEquationsLabToolForTopic, bachEquationsLabTools } from './lab/labTools'
import { bachEquationsStages, bachEquationsTopics } from './lessons'

const ekuazioakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-ekuazioak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Ekuazioak eta inekuazioak', es: 'Ecuaciones e inecuaciones', en: 'Equations and inequalities', ar: 'المعادلات والمتراجحات' },
    documentTitle: { eu: 'Ekuazioak eta inekuazioak · Batxilergoa 1', es: 'Ecuaciones e inecuaciones · 1.º Bachillerato', en: 'Equations and inequalities · 1st Bachillerato', ar: 'المعادلات والمتراجحات · البكالوريا الأولى' },
    tagline: {
        eu: 'Ruffini eta faktorizazioa, maila handiko ekuazioak eta aldagai-aldaketa, erroak eta balio absolutua, esponentzialak eta logaritmikoak, eta inekuazioak zeinuen taularekin.',
        es: 'Ruffini y factorización, ecuaciones de grado alto y cambio de variable, radicales y valor absoluto, exponenciales y logarítmicas, e inecuaciones con tabla de signos.',
        en: 'Ruffini and factorising, higher-degree equations and change of variable, radicals and absolute value, exponential and logarithmic equations, and inequalities with a sign table.',
        ar: 'روفيني والتحليل، ومعادلات الدرجات العليا وتغيير المتغير، والجذور والقيمة المطلقة، والمعادلات الأسية واللوغاريتمية، والمتراجحات بجدول الإشارات.'
    },
    heroArt: <BachEquationsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, Ruffinitik zeinuen taulara', es: 'Cinco etapas, de Ruffini a la tabla de signos', en: 'Five stages, from Ruffini to the sign table', ar: 'خمس مراحل، من روفيني إلى جدول الإشارات' },
    stages: bachEquationsStages,
    topics: bachEquationsTopics,
    diagnostic: bachEquationsDiagnostic,
    guidedPractice: bachEquationsPractice,
    exerciseBank: bachEquationsExerciseBank,
    challenges: bachEquationsChallenges,
    lab: {
        description: {
            eu: `${bachEquationsLabTools.length} tresna, erronkekin: zeinuen taula, balio absolutu tolestua eta aldagai-aldaketaren makina, berriak; eta 4. DBHko Ruffiniren taula, erroen bila, formula orokorra, soluzio faltsuen ehiza, berretzaileak elkartzen, parabolaren zeinua eta bi inekuazio batera.`,
            es: `${bachEquationsLabTools.length} herramientas con retos: la tabla de signos, el valor absoluto doblado y la máquina del cambio de variable, nuevas; y de 4.º ESO, la tabla de Ruffini, a la caza de raíces, la fórmula general, a la caza de soluciones falsas, los exponentes se encuentran, el signo de la parábola y dos inecuaciones a la vez.`,
            en: `${bachEquationsLabTools.length} tools with challenges: the sign table, the folded absolute value and the change of variable machine, new; and from 4th ESO, Ruffini's table, hunting for roots, the quadratic formula, hunting for false solutions, the exponents meet, the sign of the parabola and two inequalities at once.`,
            ar: `${bachEquationsLabTools.length} أدوات مع تحديات: جدول الإشارات والقيمة المطلقة المطوية وآلة تغيير المتغير، وهي جديدة؛ ومن الصف الرابع: جدول روفيني والبحث عن الجذور والقانون العام وصيد الحلول الزائفة والأسّان يلتقيان وإشارة القطع المكافئ ومتراجحتان معًا.`
        },
        progressIds: bachEquationsLabChallengeIds,
        toolForTopic: bachEquationsLabToolForTopic,
        render: (props) => <BachEquationsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bederatzi joko: lasterketa, baliozkoa ala faltsua?, bete zeinuen taula, ekuazioen detektibea eta memoria, berriak; eta 4. DBHko soluzioa al da?, margotu soluzioa, erroen ehiza eta sinplifikatu zatikia.',
            es: 'Nueve juegos: carrera, ¿válida o falsa?, rellena la tabla de signos, detective de ecuaciones y memoria, nuevos; y de 4.º ESO, ¿es solución?, pinta la solución, caza de raíces y simplifica la fracción.',
            en: 'Nine games: race, true or false?, fill in the sign table, equations detective and memory, new; and from 4th ESO, is it a solution?, paint the solution, root hunt and simplify the fraction.',
            ar: 'تسع ألعاب: السباق وصحيح أم زائف؟ واملأ جدول الإشارات ومخبر المعادلات والذاكرة، وهي جديدة؛ ومن الصف الرابع: هل هو حل؟ ولوّن الحل وصيد الجذور واختصر الكسر.'
        },
        progressIds: bachEquationsGameProgressIds,
        recordsKey: BACH_EQUATIONS_GAME_RECORDS_KEY,
        render: (props) => <BachEquationsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Soluzio bat baino gehiago badago, eskatzen dena bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si hay varias soluciones, solo la que se pide.', en: 'Write a number: 5, −3, 1.5 or 3/2. If there are several solutions, only the one asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت هناك عدة حلول فاكتب المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        polynomials: { eu: 'Erro osoek gai askea zatitzen dute: probatu zatitzaile guztiak, zeinu biekin. Faktoreak bakarrik sinplifikatzen dira, ez batugaiak.', es: 'Las raíces enteras dividen al término independiente: prueba todos los divisores, con los dos signos. Solo se simplifican factores, no sumandos.', en: 'Integer roots divide the constant term: try every divisor, with both signs. Only factors cancel, not terms of a sum.', ar: 'الجذور الصحيحة تقسم الحد الثابت: جرّب كل القواسم بالإشارتين. ولا تُبسّط إلا العوامل لا الحدود المجموعة.' },
        'polynomial-equations': { eu: 'Ez zatitu x zenbakiaz: x = 0 galtzen da. t = x² eginda, t negatiboak baztertu; t = x³ eginda, ez. Izendatzailea anulatzen duten soluzioak ez dira onak.', es: 'No dividas entre x: se pierde x = 0. Con t = x², descarta los t negativos; con t = x³, no. Las soluciones que anulan un denominador no valen.', en: 'Do not divide by x: you lose x = 0. With t = x², throw out negative t; with t = x³, do not. Solutions that make a denominator zero do not work.', ar: 'لا تقسم على x: يضيع الحل x = 0. مع t = x² استبعد قيم t السالبة، ومع t = x³ لا. والحلول التي تعدم مقامًا لا تصلح.' },
        'radical-absolute': { eu: 'Isolatu erroa karratura jaso aurretik, eta egiaztatu soluzioak. |A| = c: bi kasu, A = c eta A = −c; c < 0 bada, soluziorik ez.', es: 'Aísla el radical antes de elevar al cuadrado y comprueba las soluciones. |A| = c: dos casos, A = c y A = −c; si c < 0, no hay solución.', en: 'Isolate the radical before squaring and check the solutions. |A| = c: two cases, A = c and A = −c; if c < 0, there is no solution.', ar: 'اعزل الجذر قبل التربيع وتحقق من الحلول. |A| = c: حالتان A = c وA = −c، وإذا كان c < 0 فلا حل.' },
        'exp-log': { eu: '3ˣ = 7 ez da x = 7/3: hartu logaritmoak. aˣ beti da positiboa. log a − log b = log(a/b), ez log(a − b). Argumentuek positiboak izan behar dute.', es: '3ˣ = 7 no es x = 7/3: toma logaritmos. aˣ siempre es positivo. log a − log b = log(a/b), no log(a − b). Los argumentos tienen que ser positivos.', en: '3ˣ = 7 is not x = 7/3: take logarithms. aˣ is always positive. log a − log b = log(a/b), not log(a − b). The arguments must be positive.', ar: '3ˣ = 7 لا يعني x = 7/3: خذ اللوغاريتم. وaˣ موجب دائمًا. وlog a − log b = log(a/b) لا log(a − b). ويجب أن تكون الوسائط موجبة.' },
        inequalities: { eu: 'Ez zatitu edo biderkatu zeinua ezagutzen ez duzun adierazpen batez: erabili zeinuen taula. Izendatzailearen zeroak inoiz ez dira sartzen. |A| < c tarte bat da; |A| > c, bi zuzenerdi.', es: 'No dividas ni multipliques por algo cuyo signo no conoces: usa una tabla de signos. Los ceros del denominador nunca entran. |A| < c es un intervalo; |A| > c, dos semirrectas.', en: 'Do not divide or multiply by something whose sign you do not know: use a sign table. Zeros of the denominator are never included. |A| < c is an interval; |A| > c, two half-lines.', ar: 'لا تقسم ولا تضرب في عبارة لا تعرف إشارتها: استعمل جدول الإشارات. وأصفار المقام لا تدخل أبدًا. |A| < c مجال واحد، و|A| > c نصفا مستقيم.' }
    }
}

export function EkuazioakBatx1zIntroPage() {
    return <UnitPage unit={ekuazioakBatx1zUnit} />
}
