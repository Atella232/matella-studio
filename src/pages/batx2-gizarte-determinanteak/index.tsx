import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { DeterminantsHeroArt } from '../batx2-zientziak-determinanteak/figures'
import { gizarteDeterminanteakChallenges, gizarteDeterminanteakDiagnostic, gizarteDeterminanteakExerciseBank, gizarteDeterminanteakPractice } from './content'
import { GizarteDeterminanteakLaboratory } from './lab'
import { gizarteDeterminanteakLabChallengeIds, gizarteDeterminanteakLabToolForTopic, gizarteDeterminanteakLabTools } from './lab/labTools'
import { gizarteDeterminanteakStages, gizarteDeterminanteakTopics } from './lessons'

const determinanteakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-determinanteak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Determinanteak', es: 'Determinantes', en: 'Determinants', ar: 'المحددات' },
    documentTitle: { eu: 'Determinanteak · Batxilergoa 2 · Gizarte', es: 'Determinantes · 2.º Bachillerato CCSS', en: 'Determinants · 2nd Bachillerato Social Sciences', ar: 'المحددات · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: '2. eta 3. ordenako determinanteak eta Sarrus, propietateak, menoreak eta adjuntuak, heina menoreekin, alderantzizkoa matrize adjuntuarekin eta sorta batzuen prezioak ondoriozta daitezkeen.',
        es: 'Determinantes de orden 2 y 3 y Sarrus, propiedades, menores y adjuntos, el rango con menores, la inversa con la adjunta y si se pueden averiguar los precios de unos lotes.',
        en: 'Determinants of order 2 and 3 and Sarrus, properties, minors and cofactors, rank with minors, the inverse with the adjugate and whether the prices of some bundles can be found.',
        ar: 'محددات الرتبتين 2 و3 وقاعدة ساروس، والخواص، والمحددات الصغرى والمتممات الجبرية، والرتبة بالمحددات الصغرى، والمعكوس بالمرافقة، وهل يمكن معرفة أسعار مجموعات.'
    },
    heroArt: <DeterminantsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, 2. ordenako determinantetik sorten prezioetara', es: 'Cinco etapas, del determinante de orden 2 a los precios de unos lotes', en: 'Five stages, from a determinant of order 2 to the prices of some bundles', ar: 'خمس مراحل، من محدد الرتبة 2 إلى أسعار مجموعات' },
    stages: gizarteDeterminanteakStages,
    topics: gizarteDeterminanteakTopics,
    diagnostic: gizarteDeterminanteakDiagnostic,
    guidedPractice: gizarteDeterminanteakPractice,
    exerciseBank: gizarteDeterminanteakExerciseBank,
    challenges: gizarteDeterminanteakChallenges,
    lab: {
        description: {
            eu: `${gizarteDeterminanteakLabTools.length} tresna, erronkekin: sortak (ondoriozta daitezke prezioak?) eta adjuntua laukiz lauki, berriak; eta Zientzietako propietateen makina eta determinantearen graduatzailea.`,
            es: `${gizarteDeterminanteakLabTools.length} herramientas con retos: los lotes (¿se deducen los precios?) y la adjunta casilla a casilla, nuevas; y la máquina de propiedades y el deslizador del determinante de Ciencias.`,
            en: `${gizarteDeterminanteakLabTools.length} tools with challenges: the bundles (can the prices be found?) and the adjugate cell by cell, new; and the property machine and the determinant slider from Sciences.`,
            ar: `${gizarteDeterminanteakLabTools.length} أدوات مع تحديات: المجموعات (هل تُستنتج الأسعار؟) والمرافقة خانةً خانة، وهما جديدتان؛ وآلة الخواص ومنزلقة المحدد من العلوم.`
        },
        progressIds: gizarteDeterminanteakLabChallengeIds,
        toolForTopic: gizarteDeterminanteakLabToolForTopic,
        render: (props) => <GizarteDeterminanteakLaboratory {...props} />
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
        properties: { eu: 'Bi errenkada trukatzean, zeinua aldatzen da. Errenkada bat $k$ zenbakiaz biderkatzean, $|A|$ ere bai, baina $|kA|=k^n|A|$. Multiplo bat batzeak ez du aldatzen.', es: 'Al cambiar dos filas cambia el signo. Al multiplicar una fila por $k$, $|A|$ también, pero $|kA|=k^n|A|$. Sumar un múltiplo no lo cambia.', en: 'Swapping two rows changes the sign. Multiplying one row by $k$ multiplies $|A|$ too, but $|kA|=k^n|A|$. Adding a multiple does not change it.', ar: 'تبديل صفين يغيّر الإشارة. وضرب صف واحد في $k$ يضرب $|A|$ أيضًا، لكن $|kA|=k^n|A|$. وإضافة مضاعف لا تغيّره.' },
        expansion: { eu: 'Adjuntuak zeinua du: $A_{ij}=(-1)^{i+j}M_{ij}$. Garatu zero gehien dituen lerroaren arabera, eta biderkatu elementu bakoitza bere adjuntuaz.', es: 'El adjunto lleva signo: $A_{ij}=(-1)^{i+j}M_{ij}$. Desarrolla por la línea con más ceros y multiplica cada elemento por su adjunto.', en: 'The cofactor carries a sign: $A_{ij}=(-1)^{i+j}M_{ij}$. Expand along the line with the most zeros and multiply each entry by its cofactor.', ar: 'للمتمم الجبري إشارة: $A_{ij}=(-1)^{i+j}M_{ij}$. انشر حسب الخط الذي فيه أكثر الأصفار، واضرب كل عنصر في متممه.' },
        rank: { eu: 'Menore bat 0 izateak ez du ezer esaten: begiratu orlatzen dutenak. $|A|=0$ bada, heina ez da maximoa, baina menoreek esaten dute zenbatekoa den.', es: 'Que un menor valga 0 no dice nada: mira los que lo orlan. Si $|A|=0$, el rango no es máximo, pero los menores dicen cuál es.', en: 'One minor being 0 says nothing: look at those that border it. If $|A|=0$, the rank is not full, but the minors tell you what it is.', ar: 'أن يكون محدد أصغر صفرًا لا يعني شيئًا: انظر إلى التي تطوّقه. وإذا كان $|A|=0$ فالرتبة ليست عظمى، لكن المحددات الصغرى تحدد قيمتها.' },
        inverse: { eu: 'Ez ahaztu iraultzea eta $|A|$ zenbakiaz zatitzea: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. $|A|=0$ bada, ez dago alderantzizkorik, eta sorten prezioak ezin dira ondorioztatu.', es: 'No olvides trasponer y dividir entre $|A|$: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. Si $|A|=0$, no hay inversa y los precios de los lotes no se pueden averiguar.', en: 'Do not forget to transpose and divide by $|A|$: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. If $|A|=0$, there is no inverse and the prices of the bundles cannot be found.', ar: 'لا تنسَ النقل والقسمة على $|A|$: $A^{-1}=\\frac{1}{|A|}(\\operatorname{Adj}A)^t$. وإذا كان $|A|=0$ فلا معكوس ولا يمكن معرفة أسعار المجموعات.' }
    }
}

export function DeterminanteakBatx2gIntroPage() {
    return <UnitPage unit={determinanteakBatx2gUnit} />
}
