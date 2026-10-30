import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { equationsInequalitiesChallenges, equationsInequalitiesDiagnostic, equationsInequalitiesExerciseBank, equationsInequalitiesPractice } from './content'
import { EquationsInequalitiesHeroArt } from './figures'
import { EquationsGames } from './games'
import { EQUATIONS_GAME_RECORDS_KEY, equationsGameProgressIds } from './games/info'
import { EquationsInequalitiesLaboratory } from './lab'
import { equationsInequalitiesLabChallengeIds, equationsInequalitiesLabToolForTopic, equationsInequalitiesLabTools } from './lab/labTools'
import { equationsInequalitiesStages, equationsInequalitiesTopics } from './lessons'

const ekuazioakUnit: UnitDefinition = {
    storagePrefix: 'matella-ekuazioak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', en: '4th ESO · Academic', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Ekuazioak eta inekuazioak', es: 'Ecuaciones e inecuaciones', en: 'Equations and inequalities', ar: 'المعادلات والمتراجحات' },
    documentTitle: { eu: 'Ekuazioak eta inekuazioak · 4. DBH', es: 'Ecuaciones e inecuaciones · 4.º ESO', en: 'Equations and inequalities · 4th ESO', ar: 'المعادلات والمتراجحات · الصف الرابع' },
    tagline: {
        eu: 'Bigarren mailako ekuazioak eta haien erroak, ekuazio bikarratuak, arrazionalak, irrazionalak, esponentzialak eta logaritmikoak, eta lehen eta bigarren mailako inekuazioak eta sistemak.',
        es: 'Ecuaciones de segundo grado y sus raíces, bicuadradas, racionales, irracionales, exponenciales y logarítmicas, e inecuaciones de primer y segundo grado y sus sistemas.',
        en: 'Second-degree equations and their roots, biquadratic, rational, irrational, exponential and logarithmic equations, and first- and second-degree inequalities and their systems.',
        ar: 'معادلات الدرجة الثانية وجذورها، والثنائية التربيع والكسرية والجذرية والأسية واللوغاريتمية، ومتراجحات الدرجتين الأولى والثانية وأنظمتها.'
    },
    heroArt: <EquationsInequalitiesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, ekuazioetatik inekuazioetara', es: 'Cinco etapas, de las ecuaciones a las inecuaciones', en: 'Five stages, from equations to inequalities.', ar: 'خمس مراحل، من المعادلات إلى المتراجحات' },
    stages: equationsInequalitiesStages,
    topics: equationsInequalitiesTopics,
    diagnostic: equationsInequalitiesDiagnostic,
    guidedPractice: equationsInequalitiesPractice,
    exerciseBank: equationsInequalitiesExerciseBank,
    challenges: equationsInequalitiesChallenges,
    lab: {
        description: {
            eu: `${equationsInequalitiesLabTools.length} tresna, erronkekin: formula orokorra, erroetatik ekuaziora, bikarratuaren bi t-ak, ebazpen faltsuen ehiza, berretzaileak elkartzen, inekuazioa zuzenean, bi tarifa, parabolaren zeinua, parabola eta zuzena, eta bi inekuazio batera.`,
            es: `${equationsInequalitiesLabTools.length} herramientas con retos: la fórmula general, de las raíces a la ecuación, las dos t de la bicuadrada, la caza de soluciones falsas, los exponentes que se encuentran, la inecuación en la recta, dos tarifas, el signo de la parábola, parábola y recta, y dos inecuaciones a la vez.`,
            en: `${equationsInequalitiesLabTools.length} tools with challenges: the general formula, from the roots to the equation, the two t's of the biquadratic, the hunt for false solutions, matching exponents, the inequality on the number line, two tariffs, the sign of the parabola, parabola and straight line, and two inequalities at once.`,
            ar: `${equationsInequalitiesLabTools.length} أدوات مع تحديات: القانون العام، ومن الجذرين إلى المعادلة، وقيمتا t، وصيد الحلول الزائفة، والأسّان يلتقيان، والمتراجحة على المستقيم، وتعرفتان، وإشارة القطع المكافئ، والقطع المكافئ والمستقيم، ومتراجحتان معًا.`
        },
        progressIds: equationsInequalitiesLabChallengeIds,
        toolForTopic: equationsInequalitiesLabToolForTopic,
        render: (props) => <EquationsInequalitiesLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: equationsGameProgressIds,
        recordsKey: EQUATIONS_GAME_RECORDS_KEY,
        render: (props) => <EquationsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Ebazpen bat, zenbat diren, tarte baten muturra… eskatzen dena bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Una solución, cuántas hay, el extremo de un intervalo… solo lo que se pide.', en: 'Write a number: 5, −3, 1.5 or 3/2. A solution, how many there are, or the end of an interval… only what is asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. حلًا أو عدد الحلول أو طرف مجال… المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −4', es: 'Ej.: −4', en: 'e.g. −4', ar: 'مثال: ⁦−4⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        quadratic: { eu: 'Δ = b² − 4ac: negatiboa bada, ebazpenik ez. Erroen batura −b/a eta biderkadura c/a. Egiaztatu ebazpenek zentzua duten.', es: 'Δ = b² − 4ac: si es negativo, no hay solución. Las raíces suman −b/a y multiplican c/a. Mira si las soluciones tienen sentido.', en: 'Δ = b² − 4ac: if it is negative, there is no solution. The roots add up to −b/a and multiply to c/a. Check whether the solutions make sense.', ar: 'Δ = b² − 4ac: إذا كان سالبًا فلا حل. مجموع الجذرين −b/a وجداؤهما c/a. وانظر هل للحلول معنى.' },
        other: { eu: 't = x²: t negatiboak ez du x-rik ematen. Faktorizatu, ez zatitu x-z. Izendatzailea 0 egiten duena ez da ebazpena.', es: 't = x²: una t negativa no da x. Factoriza, no dividas entre x. Lo que anula un denominador no es solución.', en: 't = x²: a negative t gives no x. Factorise, don\'t divide by x. Anything that makes a denominator zero is not a solution.', ar: 't = x²: لا يعطي t السالب قيمة x. حلّل ولا تقسم على x. وما يعدم المقام ليس حلًا.' },
        exponential: { eu: 'Karratura jasotakoan, egiaztatu. Esponentzialak: oinarri bera. Logaritmoak: argumentu positiboak.', es: 'Tras elevar al cuadrado, comprueba. Exponenciales: misma base. Logaritmos: argumentos positivos.', en: 'After squaring, check. Exponentials: same base. Logarithms: positive arguments.', ar: 'بعد التربيع تحقّق. الأسية: الأساس نفسه. اللوغاريتمات: ما بداخلها موجب.' },
        inequalities: { eu: 'Negatibo batez biderkatu edo zatitzean, zentzua aldatu. [ ] muturra sartzen da, ( ) ez.', es: 'Al multiplicar o dividir por un negativo, cambia el sentido. [ ] el extremo entra, ( ) no.', en: 'Multiplying or dividing by a negative number flips the inequality sign. [ ] the endpoint is included, ( ) it is not.', ar: 'عند الضرب أو القسمة على سالب اقلب الاتجاه. [ ] الطرف داخل، ( ) خارج.' },
        'quadratic-inequalities': { eu: 'Erroak, zatiak eta zeinuak. Sistemetan, zati komuna.', es: 'Raíces, trozos y signos. En los sistemas, la parte común.', en: 'Roots, intervals and signs. In systems, the common part.', ar: 'الجذور والأجزاء والإشارات. وفي الأنظمة الجزء المشترك.' }
    }
}

export function EkuazioakDbh4AkIntroPage() {
    return <UnitPage unit={ekuazioakUnit} />
}
