import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bachSystemsChallenges, bachSystemsDiagnostic, bachSystemsExerciseBank, bachSystemsPractice } from './content'
import { BachSystemsHeroArt } from './figures'
import { BachSystemsGames } from './games'
import { BACH_SYSTEMS_GAME_RECORDS_KEY, bachSystemsGameProgressIds } from './games/info'
import { BachSystemsLaboratory } from './lab'
import { bachSystemsLabChallengeIds, bachSystemsLabToolForTopic, bachSystemsLabTools } from './lab/labTools'
import { bachSystemsStages, bachSystemsTopics } from './lessons'

const sistemakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-sistemak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Ekuazio-sistemak', es: 'Sistemas de ecuaciones', en: 'Systems of equations', ar: 'أنظمة المعادلات' },
    documentTitle: { eu: 'Ekuazio-sistemak · Batxilergoa 1', es: 'Sistemas de ecuaciones · 1.º Bachillerato', en: 'Systems of equations · 1st Bachillerato', ar: 'أنظمة المعادلات · البكالوريا الأولى' },
    tagline: {
        eu: 'Hiru ezezaguneko sistemak, Gaussen metodoa matrize zabalduarekin, sistemak eztabaidatzea eta parametroak, sistema ez-linealak eta bi ezezaguneko inekuazioak.',
        es: 'Sistemas con tres incógnitas, el método de Gauss con la matriz ampliada, discutir sistemas y parámetros, sistemas no lineales e inecuaciones con dos incógnitas.',
        en: 'Systems with three unknowns, Gaussian elimination with the augmented matrix, analysing systems and parameters, non-linear systems and inequalities in two unknowns.',
        ar: 'أنظمة بثلاثة مجاهيل، وطريقة غاوس بالمصفوفة الموسعة، ومناقشة الأنظمة والوسائط، والأنظمة غير الخطية، والمتراجحات بمجهولين.'
    },
    heroArt: <BachSystemsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, hiru ezezagunetik eskualdeetara', es: 'Cinco etapas, de las tres incógnitas a las regiones', en: 'Five stages, from three unknowns to regions', ar: 'خمس مراحل، من ثلاثة مجاهيل إلى المناطق' },
    stages: bachSystemsStages,
    topics: bachSystemsTopics,
    diagnostic: bachSystemsDiagnostic,
    guidedPractice: bachSystemsPractice,
    exerciseBank: bachSystemsExerciseBank,
    challenges: bachSystemsChallenges,
    lab: {
        description: {
            eu: `${bachSystemsLabTools.length} tresna, erronkekin: Gaussen makina, soluzioen familia eta parametroaren graduatzailea, berriak; eta 4. DBHko bigarren zuzena mugitzen, zuzena eta zirkunferentzia, bi karratu, erdiplanoa eta proba-puntua, triangeluaren puntu osoak, eta kopurua eta guztizkoa.`,
            es: `${bachSystemsLabTools.length} herramientas con retos: la máquina de Gauss, la familia de soluciones y el deslizador del parámetro, nuevas; y de 4.º ESO, mueve la segunda recta, recta y circunferencia, dos cuadrados, semiplano y punto de prueba, los puntos enteros del triángulo, y cuántos y cuánto.`,
            en: `${bachSystemsLabTools.length} tools with challenges: the Gauss machine, the family of solutions and the parameter slider, new; and from 4th ESO, move the second line, line and circle, two squared terms, half-plane and test point, the integer points of the triangle, and how many and how much.`,
            ar: `${bachSystemsLabTools.length} أدوات مع تحديات: آلة غاوس وعائلة الحلول ومنزلقة الوسيط، وهي جديدة؛ ومن الصف الرابع: حرّك المستقيم الثاني والمستقيم والدائرة ومربعان ونصف المستوى ونقطة الاختبار والنقاط الصحيحة في المثلث والعدد والمجموع.`
        },
        progressIds: bachSystemsLabChallengeIds,
        toolForTopic: bachSystemsLabToolForTopic,
        render: (props) => <BachSystemsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, egin zeroa, irakurri azken errenkada, sistemen detektibea eta memoria, berriak; eta 4. DBHko ebaki-puntua eta sakatu soluzioa.',
            es: 'Siete juegos: carrera, haz el cero, lee la última fila, detective de sistemas y memoria, nuevos; y de 4.º ESO, el punto de corte y toca la solución.',
            en: 'Seven games: race, make the zero, read the last row, systems detective and memory, new; and from 4th ESO, the crossing point and touch the solution.',
            ar: 'سبع ألعاب: السباق واصنع الصفر واقرأ الصف الأخير ومخبر الأنظمة والذاكرة، وهي جديدة؛ ومن الصف الرابع: نقطة التقاطع والمس الحل.'
        },
        progressIds: bachSystemsGameProgressIds,
        recordsKey: BACH_SYSTEMS_GAME_RECORDS_KEY,
        render: (props) => <BachSystemsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Ezezagun bat baino gehiago badago, eskatzen dena bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si hay varias incógnitas, solo la que se pide.', en: 'Write a number: 5, −3, 1.5 or 3/2. If there are several unknowns, only the one asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت هناك عدة مجاهيل فاكتب المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        linear: { eu: 'Soluzio bat bikote edo hirukote bat da, ez zenbaki bat ezezagun bakoitzeko. $0x+0y=0$ beti betetzen da (infinitu soluzio); $0x+0y=5$, inoiz ez.', es: 'Una solución es un par o una terna, no un número por incógnita. $0x+0y=0$ se cumple siempre (infinitas soluciones); $0x+0y=5$, nunca.', en: 'A solution is a pair or a triple, not one number per unknown. $0x+0y=0$ always holds (infinitely many solutions); $0x+0y=5$, never.', ar: 'الحل زوج أو ثلاثية، لا عدد لكل مجهول. و$0x+0y=0$ تتحقق دائمًا (ما لا نهاية من الحلول)، و$0x+0y=5$ لا تتحقق أبدًا.' },
        gauss: { eu: 'Eragiketa errenkada osoarekin egiten da, gai askea barne. Kontuz zeinuekin kentzean. Ebatzi behetik gora.', es: 'La operación se hace con la fila entera, también el término independiente. Cuidado con los signos al restar. Resuelve de abajo arriba.', en: 'The operation is done on the whole row, the constant term too. Watch the signs when you subtract. Solve from the bottom up.', ar: 'تُجرى العملية على الصف كله، والحد الثابت أيضًا. انتبه إلى الإشارات عند الطرح. وحُلّ من الأسفل إلى الأعلى.' },
        discussion: { eu: '$0z=0$ errenkadak infinitu soluzio ematen ditu, eta $0z=5$ errenkadak bat ere ez. Ez zatitu $a-3$ adierazpenaz $a=3$ aparte aztertu gabe.', es: 'Una fila $0z=0$ da infinitas soluciones y una fila $0z=5$, ninguna. No dividas entre $a-3$ sin estudiar aparte $a=3$.', en: 'A row $0z=0$ gives infinitely many solutions and a row $0z=5$ gives none. Do not divide by $a-3$ without studying $a=3$ separately.', ar: 'الصف $0z=0$ يعطي ما لا نهاية من الحلول، والصف $0z=5$ لا يعطي حلًّا. لا تقسم على $a-3$ قبل دراسة $a=3$ على حدة.' },
        nonlinear: { eu: 'Ez zatitu ezezagun batez: soluzioak galtzen dira. $x^2=9$ ekuazioak bi soluzio ditu. Egiaztatu soluzioak hasierako sisteman: logaritmoek eta erroek soluzio faltsuak ematen dituzte.', es: 'No dividas entre una incógnita: se pierden soluciones. $x^2=9$ tiene dos soluciones. Comprueba en el sistema de partida: logaritmos y raíces dan soluciones falsas.', en: 'Do not divide by an unknown: solutions are lost. $x^2=9$ has two solutions. Check in the starting system: logarithms and roots give false solutions.', ar: 'لا تقسم على مجهول: تضيع حلول. للمعادلة $x^2=9$ حلّان. وتحقق في النظام الأصلي: اللوغاريتمات والجذور تعطي حلولًا زائفة.' },
        inequalities: { eu: 'Proba-puntuak ez du zuzenean egon behar. $<$ eta $>$ ikurrekin zuzena ez dago barruan. Erdiplanoek ez badute zati komunik, ez dago soluziorik.', es: 'El punto de prueba no puede estar en la recta. Con $<$ y $>$ la recta no entra. Si los semiplanos no tienen parte común, no hay solución.', en: 'The test point must not be on the line. With $<$ and $>$ the line is not included. If the half-planes have no part in common, there is no solution.', ar: 'يجب ألا تكون نقطة الاختبار على المستقيم. ومع $<$ و$>$ لا يدخل المستقيم. وإذا لم يكن لأنصاف المستويات جزء مشترك فلا حل.' }
    }
}

export function SistemakBatx1zIntroPage() {
    return <UnitPage unit={sistemakBatx1zUnit} />
}
