import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { sistemakChallenges, sistemakDiagnostic, sistemakExerciseBank, sistemakPractice } from './content'
import { SystemsHeroArt } from './figures'
import { sistemakStages, sistemakTopics } from './lessons'

const sistemakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-sistemak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Ekuazio-sistemak', es: 'Sistemas de ecuaciones', en: 'Systems of equations', ar: 'أنظمة المعادلات' },
    documentTitle: { eu: 'Ekuazio-sistemak · Batxilergoa 2', es: 'Sistemas de ecuaciones · 2.º Bachillerato', en: 'Systems of equations · 2nd Bachillerato', ar: 'أنظمة المعادلات · البكالوريا الثانية' },
    tagline: {
        eu: 'Forma matriziala eta matrize zabaldua, Rouché-Frobeniusen teorema, Cramerren erregela, sistema homogeneoak eta parametro baten araberako eztabaida.',
        es: 'La forma matricial y la matriz ampliada, el teorema de Rouché-Frobenius, la regla de Cramer, los sistemas homogéneos y la discusión según un parámetro.',
        en: 'The matrix form and the augmented matrix, the Rouché–Frobenius theorem, Cramer\'s rule, homogeneous systems and discussing a system with a parameter.',
        ar: 'الصيغة المصفوفية والمصفوفة الموسعة، ومبرهنة روشيه-فروبينيوس، وقاعدة كرامر، والأنظمة المتجانسة، والمناقشة حسب وسيط.'
    },
    heroArt: <SystemsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, heinetatik eztabaidara', es: 'Cinco etapas, de los rangos a la discusión', en: 'Five stages, from ranks to discussing a system', ar: 'خمس مراحل، من الرتب إلى المناقشة' },
    stages: sistemakStages,
    topics: sistemakTopics,
    diagnostic: sistemakDiagnostic,
    guidedPractice: sistemakPractice,
    exerciseBank: sistemakExerciseBank,
    challenges: sistemakChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2.', es: 'Escribe un número: 5, −3, 1,5 o 3/2.', en: 'Write a number: 5, −3, 1.5 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        rouche: { eu: 'Konparatu bi heinak eta ezezagun kopurua: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$ izateak ez du esan nahi determinatua denik.', es: 'Compara los dos rangos y el número de incógnitas: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$ no quiere decir determinado.', en: 'Compare both ranks and the number of unknowns: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$ does not mean independent.', ar: 'قارن الرتبتين وعدد المجاهيل: $\\operatorname{rg}(A)=\\operatorname{rg}(A^*)$ لا تعني أنه محدد.' },
        cramer: { eu: '$x=\\frac{|A_x|}{|A|}$: $B$ zutabea $x$ ezezagunaren zutabean, eta $|A|$ beti behean.', es: '$x=\\frac{|A_x|}{|A|}$: la columna $B$ en la de $x$ y $|A|$ siempre abajo.', en: '$x=\\frac{|A_x|}{|A|}$: the column $B$ in that of $x$, and $|A|$ always below.', ar: '$x=\\frac{|A_x|}{|A|}$: العمود $B$ مكان عمود $x$، و$|A|$ في المقام دائمًا.' },
        homogeneous: { eu: 'Sistema homogeneo bat ez da inoiz bateraezina: $|A|=0$ bada, infinitu soluzio ditu.', es: 'Un homogéneo nunca es incompatible: si $|A|=0$, tiene infinitas soluciones.', en: 'A homogeneous system is never inconsistent: if $|A|=0$, it has infinitely many solutions.', ar: 'النظام المتجانس لا يكون غير متوافق أبدًا: إذا كان $|A|=0$ فله حلول لا نهائية.' },
        discussion: { eu: '$|A|=0$ adierazpenak ez du bateraezina dela esaten: balio kritiko bakoitzean, kalkulatu bi heinak.', es: '$|A|=0$ no dice que sea incompatible: en cada valor crítico, calcula los dos rangos.', en: '$|A|=0$ does not say it is inconsistent: at each critical value, find both ranks.', ar: '$|A|=0$ لا تعني أنه غير متوافق: عند كل قيمة حرجة احسب الرتبتين.' },
        problems: { eu: 'Ekuazio bat datu bakoitzeko, eta egiaztatu emaitza datu guztietan.', es: 'Una ecuación por dato, y comprueba el resultado en todos los datos.', en: 'One equation per piece of data, and check the result against all of them.', ar: 'معادلة لكل معطى، وتحقق من النتيجة في كل المعطيات.' }
    }
}

export function SistemakBatx2zIntroPage() {
    return <UnitPage unit={sistemakBatx2zUnit} />
}
