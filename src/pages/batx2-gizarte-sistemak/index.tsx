import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { SystemsHeroArt } from '../batx2-zientziak-sistemak/figures'
import { gizarteSistemakChallenges, gizarteSistemakDiagnostic, gizarteSistemakExerciseBank, gizarteSistemakPractice } from './content'
import { GizarteSistemakGames } from './games'
import { GIZARTE_SISTEMAK_GAME_RECORDS_KEY, gizarteSistemakGameProgressIds } from './games/info'
import { GizarteSistemakLaboratory } from './lab'
import { gizarteSistemakLabChallengeIds, gizarteSistemakLabToolForTopic, gizarteSistemakLabTools } from './lab/labTools'
import { gizarteSistemakTopics } from './lessons'
import { gizarteSistemakStages } from './stages'

const sistemakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-sistemak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Ekuazio-sistemak', es: 'Sistemas de ecuaciones', en: 'Systems of equations', ar: 'أنظمة المعادلات' },
    documentTitle: { eu: 'Ekuazio-sistemak · Batxilergoa 2 · Gizarte', es: 'Sistemas de ecuaciones · 2.º Bachillerato CCSS', en: 'Systems of equations · 2nd Bachillerato Social Sciences', ar: 'أنظمة المعادلات · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Gaussen metodoa, Rouché-Frobeniusen teorema, Cramerren erregela eta sistema homogeneoak, parametro baten araberako eztabaida, eta problema ekonomikoak: prezioak, inbertsioak eta azterketak.',
        es: 'El método de Gauss, el teorema de Rouché-Frobenius, la regla de Cramer y los homogéneos, la discusión según un parámetro y problemas económicos: precios, inversiones y exámenes.',
        en: 'Gaussian elimination, the Rouché–Frobenius theorem, Cramer\'s rule and homogeneous systems, discussing with a parameter, and economic problems: prices, investments and exams.',
        ar: 'طريقة غاوس، ومبرهنة روشيه-فروبينيوس، وقاعدة كرامر والأنظمة المتجانسة، والمناقشة حسب وسيط، ومسائل اقتصادية: أسعار واستثمارات وامتحانات.'
    },
    heroArt: <SystemsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, Gaussen metodotik problema ekonomikoetara', es: 'Cinco etapas, del método de Gauss a los problemas económicos', en: 'Five stages, from Gaussian elimination to economic problems', ar: 'خمس مراحل، من طريقة غاوس إلى المسائل الاقتصادية' },
    stages: gizarteSistemakStages,
    topics: gizarteSistemakTopics,
    diagnostic: gizarteSistemakDiagnostic,
    guidedPractice: gizarteSistemakPractice,
    exerciseBank: gizarteSistemakExerciseBank,
    challenges: gizarteSistemakChallenges,
    lab: {
        description: {
            eu: `${gizarteSistemakLabTools.length} tresna, erronkekin: prezio bat ere ez, bat ala infinitu, eta enuntziatutik ekuaziora, berriak; eta Zientzietako Gaussen makina eta eztabaidaren mapa.`,
            es: `${gizarteSistemakLabTools.length} herramientas con retos: ¿ninguno, uno o infinitos precios? y del enunciado a la ecuación, nuevas; y la máquina de Gauss y el mapa de la discusión de Ciencias.`,
            en: `${gizarteSistemakLabTools.length} tools with challenges: none, one or infinitely many prices? and from the statement to the equation, new; and the Gauss machine and the discussion map from Sciences.`,
            ar: `${gizarteSistemakLabTools.length} أدوات مع تحديات: لا أسعار أم واحدة أم لا نهائية؟ ومن النص إلى المعادلة، وهما جديدتان؛ وآلة غاوس وخريطة المناقشة من العلوم.`
        },
        progressIds: gizarteSistemakLabChallengeIds,
        toolForTopic: gizarteSistemakLabToolForTopic,
        render: (props) => <GizarteSistemakLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, zenbat soluzio ditu negozioak?, itzuli esaldia, Rouché espresa, Cramer zutabez zutabe, sistemen detektibea eta memoria.',
            es: 'Siete juegos: carrera, ¿cuántas soluciones tiene el negocio?, traduce la frase, Rouché exprés, Cramer columna a columna, detective de sistemas y memoria.',
            en: 'Seven games: race, how many solutions does the business have?, translate the sentence, Rouché express, Cramer column by column, systems detective and memory.',
            ar: 'سبع ألعاب: السباق وكم حلًّا للتجارة؟ وترجم الجملة وروشيه السريع وكرامر عمودًا عمودًا ومخبر الأنظمة والذاكرة.'
        },
        progressIds: gizarteSistemakGameProgressIds,
        recordsKey: GIZARTE_SISTEMAK_GAME_RECORDS_KEY,
        render: (props) => <GizarteSistemakGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2.', es: 'Escribe un número: 5, −3, 1,5 o 3/2.', en: 'Write a number: 5, −3, 1.5 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        gauss: { eu: 'Gaussen metodoan, eragiketa errenkada osoan egiten da, gai askea barne. Azken errenkada $0z=5$ bada, sistema bateraezina da; $0z=0$ bada, infinitu soluzio ditu.', es: 'En Gauss, la operación va en toda la fila, término independiente incluido. Si la última fila es $0z=5$, es incompatible; si es $0z=0$, tiene infinitas soluciones.', en: 'In Gaussian elimination, the operation goes on the whole row, constant term included. If the last row is $0z=5$, it is inconsistent; if it is $0z=0$, there are infinitely many solutions.', ar: 'في طريقة غاوس تُجرى العملية على الصف كله بما فيه الحد الثابت. إذا كان الصف الأخير $0z=5$ فالنظام غير متوافق؛ وإذا كان $0z=0$ فله حلول لا نهائية.' },
        rouche: { eu: 'Konparatu bi heinak eta ezezagun kopurua. Ekuazioak zenbatzea ez da nahikoa: hiru sorta eta bi prezio izan daitezke bateragarriak.', es: 'Compara los dos rangos y el número de incógnitas. Contar ecuaciones no basta: tres lotes y dos precios pueden ser compatibles.', en: 'Compare the two ranks and the number of unknowns. Counting equations is not enough: three bundles and two prices can be consistent.', ar: 'قارن الرتبتين وعدد المجاهيل. عدّ المعادلات لا يكفي: قد تتوافق ثلاث مجموعات مع سعرين.' },
        cramer: { eu: '$x=\\frac{|A_x|}{|A|}$: $B$ zutabea $x$ ezezagunaren zutabean, eta $|A|$ beti behean. Sistema homogeneo bat ez da inoiz bateraezina.', es: '$x=\\frac{|A_x|}{|A|}$: la columna $B$ en la de $x$ y $|A|$ siempre abajo. Un homogéneo nunca es incompatible.', en: '$x=\\frac{|A_x|}{|A|}$: the column $B$ in that of $x$, and $|A|$ always below. A homogeneous system is never inconsistent.', ar: '$x=\\frac{|A_x|}{|A|}$: العمود $B$ مكان عمود $x$ و$|A|$ دائمًا في المقام. والنظام المتجانس لا يكون غير متوافق أبدًا.' },
        discussion: { eu: '$|A|=0$ adierazpenak ez du bateraezina dela esaten: balio kritiko bakoitzean, kalkulatu bi heinak. Ez zatitu $a-1$ bezalako adierazpen batez, balio hori aparte aztertu gabe.', es: '$|A|=0$ no dice que sea incompatible: en cada valor crítico, calcula los dos rangos. No dividas entre algo como $a-1$ sin estudiar aparte ese valor.', en: '$|A|=0$ does not say it is inconsistent: at each critical value, find both ranks. Do not divide by something like $a-1$ without studying that value apart.', ar: '$|A|=0$ لا يعني أنه غير متوافق: احسب الرتبتين عند كل قيمة حرجة. ولا تقسم على عبارة مثل $a-1$ قبل دراسة تلك القيمة على حدة.' },
        problems: { eu: 'Izendatu ezezagunak unitatearekin, ekuazio bat esaldi bakoitzeko, eta egiaztatu emaitza esaldi guztietan. «Bikoitza»: zer bikoizten den begiratu.', es: 'Nombra las incógnitas con su unidad, una ecuación por frase, y comprueba el resultado en todas las frases. «El doble»: mira qué es lo que se dobla.', en: 'Name the unknowns with their unit, one equation per sentence, and check the result in every sentence. «Twice»: look at what is doubled.', ar: 'سمِّ المجاهيل مع وحدتها، ومعادلة لكل جملة، وتحقق من النتيجة في كل الجمل. «الضعف»: انظر ما الذي يُضاعف.' }
    }
}

export function SistemakBatx2gIntroPage() {
    return <UnitPage unit={sistemakBatx2gUnit} />
}
