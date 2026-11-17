import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { gizAlgebraChallenges, gizAlgebraDiagnostic, gizAlgebraExerciseBank, gizAlgebraPractice } from './content'
import { GizAlgebraHeroArt } from './figures'
import { GizAlgebraGames } from './games'
import { GIZ_ALGEBRA_GAME_RECORDS_KEY, gizAlgebraGameProgressIds } from './games/info'
import { GizAlgebraLaboratory } from './lab'
import { gizAlgebraLabChallengeIds, gizAlgebraLabToolForTopic, gizAlgebraLabTools } from './lab/labTools'
import { gizAlgebraStages, gizAlgebraTopics } from './lessons'

const aljebraBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-aljebra-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Aljebra', es: 'Álgebra', en: 'Algebra', ar: 'الجبر' },
    documentTitle: { eu: 'Aljebra · Batxilergoa 1 · Gizarte Zientziak', es: 'Álgebra · 1.º Bachillerato · Ciencias Sociales', en: 'Algebra · 1st Bachillerato · Social Sciences', ar: 'الجبر · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Polinomioak eta zatiki aljebraikoak, ekuazioak, sistemak eta inekuazioak, eta ekonomiaren aljebra: errentagarritasun-atalasea, eskaintza eta eskaria, eta aurrekontuaren eskualdea.',
        es: 'Polinomios y fracciones algebraicas, ecuaciones, sistemas e inecuaciones, y el álgebra de la economía: el punto muerto, la oferta y la demanda, y la región del presupuesto.',
        en: 'Polynomials and algebraic fractions, equations, systems and inequalities, and the algebra of economics: the break-even point, supply and demand, and the budget region.',
        ar: 'كثيرات الحدود والكسور الجبرية، والمعادلات والأنظمة والمتراجحات، وجبر الاقتصاد: نقطة التعادل والعرض والطلب ومنطقة الميزانية.'
    },
    heroArt: <GizAlgebraHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, polinomioetatik ekonomiara', es: 'Cinco etapas, de los polinomios a la economía', en: 'Five stages, from polynomials to economics', ar: 'خمس مراحل، من كثيرات الحدود إلى الاقتصاد' },
    stages: gizAlgebraStages,
    topics: gizAlgebraTopics,
    diagnostic: gizAlgebraDiagnostic,
    guidedPractice: gizAlgebraPractice,
    exerciseBank: gizAlgebraExerciseBank,
    challenges: gizAlgebraChallenges,
    lab: {
        description: {
            eu: `${gizAlgebraLabTools.length} tresna, erronkekin: errentagarritasun-atalasea, eskaintza eta eskaria, eta aurrekontuaren eskualdea, berriak; eta 1. Zientziakoak: Ruffiniren taula, erroen ehiza, aldagai-aldaketaren makina, erroak dituzten ekuazioak, berretzaileak, zuzena eta zirkunferentzia, Gaussen makina, nahastea, zeinuen taula, erdiplanoa eta eskualdea.`,
            es: `${gizAlgebraLabTools.length} herramientas con retos: el punto muerto, oferta y demanda, y la región del presupuesto, nuevas; y de 1.º Ciencias, la tabla de Ruffini, la caza de raíces, la máquina del cambio de variable, las ecuaciones con radicales, los exponentes, recta y circunferencia, la máquina de Gauss, la mezcla, la tabla de signos, el semiplano y la región.`,
            en: `${gizAlgebraLabTools.length} tools with challenges: the break-even point, supply and demand, and the budget region, new; and from 1st Sciences, Ruffini's table, the root hunt, the change of variable machine, radical equations, exponents, line and circle, the Gauss machine, the mixture, the sign table, the half-plane and the region.`,
            ar: `${gizAlgebraLabTools.length} أداة مع تحديات: نقطة التعادل والعرض والطلب ومنطقة الميزانية، وهي جديدة؛ ومن الأول علوم: جدول روفيني وصيد الجذور وآلة تغيير المتغير والمعادلات الجذرية والأسس والمستقيم والدائرة وآلة غاوس والخليط وجدول الإشارات ونصف المستوى والمنطقة.`
        },
        progressIds: gizAlgebraLabChallengeIds,
        toolForTopic: gizAlgebraLabToolForTopic,
        render: (props) => <GizAlgebraLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zortzi joko: lasterketa, koadratu leihatila, irabazi ala galdu, aljebraren detektibea eta memoria, berriak; eta 1. Zientziakoak: egin zeroa, baliozkoa ala faltsua, eta zeinuen taula.',
            es: 'Ocho juegos: carrera, cuadra la taquilla, ¿gana o pierde?, detective del álgebra y memoria, nuevos; y de 1.º Ciencias, haz el cero, ¿válida o falsa? y la tabla de signos.',
            en: 'Eight games: race, balance the box office, earn or lose, algebra detective and memory, new; and from 1st Sciences, make the zero, valid or false, and the sign table.',
            ar: 'ثماني ألعاب: السباق ووازن شباك التذاكر وربح أم خسارة ومخبر الجبر والذاكرة، وهي جديدة؛ ومن الأول علوم: اصنع الصفر وصحيح أم زائف وجدول الإشارات.'
        },
        progressIds: gizAlgebraGameProgressIds,
        recordsKey: GIZ_ALGEBRA_GAME_RECORDS_KEY,
        render: (props) => <GizAlgebraGames {...props} />
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
        polynomials: { eu: 'Erro bat: P(a) = 0. Ruffini zatitzaileekin probatu, eta faktorizatu arte. Zatiki bat sinplifikatzeko, faktorizatu lehenengo: ezin dira batugaiak ezabatu.', es: 'Una raíz: P(a) = 0. Prueba Ruffini con los divisores y sigue hasta factorizar. Para simplificar una fracción, factoriza primero: no se tachan sumandos.', en: 'A root: P(a) = 0. Try Ruffini with the divisors until it is factorised. To simplify a fraction, factorise first: terms cannot be crossed out.', ar: 'الجذر: P(a) = 0. جرّب روفيني بالقواسم حتى التحليل. ولتبسيط كسر حلّل أولًا: لا تُشطب الحدود المجموعة.' },
        equations: { eu: 'Erroak eta logaritmoak dituzten ekuazioetan, egiaztatu beti soluzioak: karratura jasotzean soluzio faltsuak ager daitezke, eta logaritmoak zenbaki positiboak behar ditu.', es: 'En las ecuaciones con raíces y logaritmos, comprueba siempre las soluciones: al elevar al cuadrado salen soluciones falsas, y el logaritmo necesita números positivos.', en: 'In equations with roots and logarithms, always check the solutions: squaring can give false solutions, and a logarithm needs positive numbers.', ar: 'في المعادلات ذات الجذور واللوغاريتمات تحقق دائمًا من الحلول: التربيع قد يعطي حلولًا زائفة، واللوغاريتم يحتاج إلى أعداد موجبة.' },
        systems: { eu: 'Gaussen metodoan, errenkada osoa aldatzen da, gai askea ere bai. Hiru ezezagunek hiru ekuazio behar dituzte, eta soluzioak zentzua izan behar du.', es: 'En Gauss cambia la fila entera, también el término independiente. Tres incógnitas piden tres ecuaciones, y la solución tiene que tener sentido.', en: 'In Gaussian elimination the whole row changes, the constant term too. Three unknowns need three equations, and the solution must make sense.', ar: 'في طريقة غاوس يتغيّر الصف كله، والحد الثابت أيضًا. ثلاثة مجاهيل تحتاج إلى ثلاث معادلات، ويجب أن يكون للحل معنى.' },
        inequalities: { eu: 'Zenbaki negatibo batez biderkatzean edo zatitzean, desberdintza biratu egiten da. Zeinuen taulan, izendatzailearen erroa ez da inoiz sartzen.', es: 'Al multiplicar o dividir por un negativo, la desigualdad se da la vuelta. En la tabla de signos, la raíz del denominador nunca entra.', en: 'When you multiply or divide by a negative number, the inequality flips. In the sign table, the root of the denominator is never included.', ar: 'عند الضرب أو القسمة على عدد سالب تنقلب المتراجحة. وفي جدول الإشارات لا يدخل جذر المقام أبدًا.' },
        economy: { eu: 'Atalasea: unitate bakoitzak prezioa ken unitateko kostua uzten du, x = F : (p − c). Oreka: D(p) = O(p). Plan bat posible da murrizketa guztiak betetzen baditu.', es: 'Punto muerto: cada unidad deja el precio menos el coste unitario, x = F ÷ (p − c). Equilibrio: D(p) = O(p). Un plan es posible si cumple todas las restricciones.', en: 'Break-even: each unit leaves the price minus the unit cost, x = F ÷ (p − c). Equilibrium: D(p) = S(p). A plan is possible if it meets all the constraints.', ar: 'نقطة التعادل: كل وحدة تترك السعر ناقص تكلفة الوحدة، x = F ÷ (p − c). التوازن: D(p) = O(p). والخطة ممكنة إذا حققت كل القيود.' }
    }
}

export function AljebraBatx1gIntroPage() {
    return <UnitPage unit={aljebraBatx1gUnit} />
}
