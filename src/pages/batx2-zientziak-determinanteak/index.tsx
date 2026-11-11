import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { determinanteakChallenges, determinanteakDiagnostic, determinanteakExerciseBank, determinanteakPractice } from './content'
import { DeterminantsHeroArt } from './figures'
import { DeterminanteakLaboratory } from './lab'
import { determinanteakLabChallengeIds, determinanteakLabToolForTopic, determinanteakLabTools } from './lab/labTools'
import { determinanteakStages, determinanteakTopics } from './lessons'

const determinanteakBatx2zUnit: UnitDefinition = {
    storagePrefix: 'matella-determinanteak-batx2z',
    coursePath: '/matematika/batx2-zientziak',
    courseTitle: { eu: 'Batxilergoa 2 · Zientziak', es: '2.º Bachillerato · Ciencias', en: '2nd Bachillerato · Sciences', ar: 'البكالوريا الثانية · العلوم' },
    title: { eu: 'Determinanteak', es: 'Determinantes', en: 'Determinants', ar: 'المحددات' },
    documentTitle: { eu: 'Determinanteak · Batxilergoa 2', es: 'Determinantes · 2.º Bachillerato', en: 'Determinants · 2nd Bachillerato', ar: 'المحددات · البكالوريا الثانية' },
    tagline: {
        eu: '2. eta 3. ordenako determinanteak eta Sarrus, propietateak, menoreak eta adjuntuak, lerro baten araberako garapena, heina menoreekin eta alderantzizkoa matrize adjuntuarekin.',
        es: 'Determinantes de orden 2 y 3 y Sarrus, propiedades, menores y adjuntos, el desarrollo por una línea, el rango con menores y la inversa con la matriz adjunta.',
        en: 'Determinants of order 2 and 3 and Sarrus, properties, minors and cofactors, expanding along a line, rank with minors and the inverse with the adjugate.',
        ar: 'محددات الرتبتين 2 و3 وقاعدة ساروس، والخواص، والمحددات الصغرى والمتممات الجبرية، والنشر حسب خط، والرتبة بالمحددات الصغرى، والمعكوس بالمصفوفة المرافقة.'
    },
    heroArt: <DeterminantsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, azaleratik alderantzizkora', es: 'Cinco etapas, del área a la inversa', en: 'Five stages, from an area to the inverse', ar: 'خمس مراحل، من المساحة إلى المعكوس' },
    stages: determinanteakStages,
    topics: determinanteakTopics,
    diagnostic: determinanteakDiagnostic,
    guidedPractice: determinanteakPractice,
    exerciseBank: determinanteakExerciseBank,
    challenges: determinanteakChallenges,
    lab: {
        description: {
            eu: `${determinanteakLabTools.length} tresna, erronkekin: paralelogramoa, propietateen makina, zeinuen taula eta determinantea k aldatzean, berriak; eta Matrizeak gaiko heinaren graduatzailea.`,
            es: `${determinanteakLabTools.length} herramientas con retos: el paralelogramo, la máquina de propiedades, el tablero de signos y el deslizador del determinante, nuevas; y el deslizador del rango de Matrices.`,
            en: `${determinanteakLabTools.length} tools with challenges: the parallelogram, the property machine, the sign board and the determinant slider, new; and the rank slider from Matrices.`,
            ar: `${determinanteakLabTools.length} أدوات مع تحديات: متوازي الأضلاع وآلة الخواص ولوحة الإشارات ومنزلقة المحدد، وهي جديدة؛ ومنزلقة الرتبة من وحدة المصفوفات.`
        },
        progressIds: determinanteakLabChallengeIds,
        toolForTopic: determinanteakLabToolForTopic,
        render: (props) => <DeterminanteakLaboratory {...props} />
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
        orders: { eu: '$ad-bc$: diagonal nagusia ken bigarrena, ez batu. Sarrusen, beste diagonalaren hiru biderkadurak kentzen dira.', es: '$ad-bc$: la diagonal principal menos la secundaria, no más. En Sarrus, los tres productos de la otra diagonal restan.', en: '$ad-bc$: the main diagonal minus the other, not plus. In Sarrus, the three products of the other diagonal subtract.', ar: '$ad-bc$: القطر الرئيسي ناقص الثانوي لا زائده. وفي ساروس تُطرح حواصل القطر الآخر الثلاثة.' },
        properties: { eu: 'Bi lerro trukatzean, zeinua aldatzen da. Lerro bat $k$ zenbakiaz biderkatzean, $|A|$ ere bai; eta $|kA|=k^n|A|$. Multiplo bat batzeak ez du aldatzen.', es: 'Al cambiar dos líneas cambia el signo. Al multiplicar una línea por $k$, $|A|$ también; y $|kA|=k^n|A|$. Sumar un múltiplo no lo cambia.', en: 'Swapping two lines changes the sign. Multiplying a line by $k$ multiplies $|A|$ too; and $|kA|=k^n|A|$. Adding a multiple does not change it.', ar: 'تبديل خطين يغيّر الإشارة. وضرب خط في $k$ يضرب $|A|$ أيضًا؛ و$|kA|=k^n|A|$. وإضافة مضاعف لا تغيّره.' },
        expansion: { eu: 'Adjuntuak zeinua du: $(-1)^{i+j}$. Garatu zero gehien dituen lerroaren arabera.', es: 'El adjunto lleva signo: $(-1)^{i+j}$. Desarrolla por la línea con más ceros.', en: 'The cofactor carries a sign: $(-1)^{i+j}$. Expand along the line with the most zeros.', ar: 'للمتمم الجبري إشارة: $(-1)^{i+j}$. انشر حسب الخط الذي فيه أكثر الأصفار.' },
        rank: { eu: 'Menore bat 0 izateak ez du ezer esaten: begiratu orlatzen dutenak. $|A|=0$ bada, heina ez da maximoa, baina menoreek esaten dute zenbatekoa den.', es: 'Que un menor valga 0 no dice nada: mira los que lo orlan. Si $|A|=0$, el rango no es máximo, pero los menores dicen cuál es.', en: 'One minor being 0 says nothing: look at those that border it. If $|A|=0$, the rank is not full, but the minors tell you what it is.', ar: 'أن يكون محدد أصغر صفرًا لا يعني شيئًا: انظر إلى التي تطوّقه. وإذا كان $|A|=0$ فالرتبة ليست عظمى، لكن المحددات الصغرى تحدد قيمتها.' },
        inverse: { eu: 'Ez ahaztu iraultzea: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. $|A|=0$ bada, ez dago alderantzizkorik.', es: 'No olvides trasponer: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. Si $|A|=0$, no hay inversa.', en: 'Do not forget to transpose: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. If $|A|=0$, there is no inverse.', ar: 'لا تنسَ النقل: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. وإذا كان $|A|=0$ فلا معكوس.' }
    }
}

export function DeterminanteakBatx2zIntroPage() {
    return <UnitPage unit={determinanteakBatx2zUnit} />
}
