import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { divisibilityChallenges, divisibilityDiagnostic, divisibilityExerciseBank, divisibilityPractice } from './content'
import { DivisibilityHeroArt } from './figures'
import { DivisibilityGames } from './games'
import { DIVISIBILITY_GAME_RECORDS_KEY, divisibilityGameProgressIds } from './games/info'
import { DivisibilityLaboratory } from './lab'
import { divisibilityLabChallengeIds, divisibilityLabToolForTopic, divisibilityLabTools } from './lab/labTools'
import { divisibilityStages, divisibilityTopics } from './lessons'
import './Zatigarritasuna.css'

const zatigarritasunaUnit: UnitDefinition = {
    storagePrefix: 'matella-zatigarritasuna-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Zatigarritasuna', es: 'Divisibilidad', ar: 'قابلية القسمة' },
    documentTitle: { eu: 'Zatigarritasuna · 2. DBH', es: 'Divisibilidad · 2.º ESO', ar: 'قابلية القسمة · الصف الثاني' },
    tagline: {
        eu: 'Multiploak, zatitzaileak, zenbaki lehenak, ZKH eta MKT: ikasi zenbakiak barrutik ezagutzen eta banaketa eta bat-etortze buruketak ebazten.',
        es: 'Múltiplos, divisores, números primos, m.c.d. y m.c.m.: aprende a conocer los números por dentro y a resolver problemas de repartos y coincidencias.',
        ar: 'المضاعفات والقواسم والأعداد الأولية وق.م.أ وم.م.أ: تعلّم معرفة الأعداد من الداخل وحل مسائل التوزيع والتزامن.'
    },
    heroArt: <DivisibilityHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, multiploetatik ZKH eta MKTko buruketetara', es: 'Cinco etapas, de los múltiplos a los problemas de m.c.d. y m.c.m.', ar: 'خمس مراحل، من المضاعفات إلى مسائل ق.م.أ وم.م.أ' },
    stages: divisibilityStages,
    topics: divisibilityTopics,
    diagnostic: divisibilityDiagnostic,
    guidedPractice: divisibilityPractice,
    exerciseBank: divisibilityExerciseBank,
    challenges: divisibilityChallenges,
    lab: {
        description: { eu: `${divisibilityLabTools.length} tresna multiploak, zatitzaileak, lehenak, ZKH eta MKT manipulatzeko, erronkekin.`, es: `${divisibilityLabTools.length} herramientas para manipular múltiplos, divisores, primos, m.c.d. y m.c.m., con retos.`, ar: `${divisibilityLabTools.length} أدوات للتعامل مع المضاعفات والقواسم والأعداد الأولية وق.م.أ وم.م.أ، مع تحديات.` },
        progressIds: divisibilityLabChallengeIds,
        toolForTopic: divisibilityLabToolForTopic,
        render: (props) => <DivisibilityLaboratory {...props} />
    },
    games: {
        description: { eu: 'Lau joko multiploekin, lehenekin, ZKH eta MKTrekin azkar aritzeko.', es: 'Cuatro juegos para ganar rapidez con múltiplos, primos, m.c.d. y m.c.m.', ar: 'أربع ألعاب لاكتساب السرعة مع المضاعفات والأعداد الأولية وق.م.أ وم.م.أ.' },
        progressIds: divisibilityGameProgressIds,
        recordsKey: DIVISIBILITY_GAME_RECORDS_KEY,
        render: (props) => <DivisibilityGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi emaitza zenbaki gisa, adibidez 12.', es: 'Escribe el resultado como un número, por ejemplo 12.', ar: 'اكتب النتيجة عددًا، مثل 12.' },
        defaultForm: 'simplified',
        inputMode: 'numeric',
        placeholder: () => ({ eu: 'Adib.: 12', es: 'Ej.: 12', ar: 'مثال: 12' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki oso gisa.', es: 'El valor es correcto, pero escríbelo como número entero.', ar: 'القيمة صحيحة، لكن اكتبها عددًا صحيحًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 12.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 12.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 12.' }
    },
    errorByStage: {
        multiples: { eu: 'Multiploak lortzeko biderkatu; zatitzaileak lortzeko, bilatu zatiketa zehatzak.', es: 'Para múltiplos, multiplica; para divisores, busca divisiones exactas.', ar: 'للمضاعفات اضرب، وللقواسم ابحث عن القسمة التامة.' },
        criteria: { eu: 'Berrikusi irizpidea: azken zifra (2, 5, 10), zifren batura (3, 9) edo posizioak (11).', es: 'Repasa el criterio: última cifra (2, 5, 10), suma de cifras (3, 9) o posiciones (11).', ar: 'راجع القاعدة: الرقم الأخير (2، 5، 10) أو مجموع الأرقام (3، 9) أو المواقع (11).' },
        primes: { eu: 'Zatitu lehen txikienetik hasita, eta egiaztatu biderkagai guztiak lehenak direla.', es: 'Divide empezando por el primo más pequeño y comprueba que todos los factores son primos.', ar: 'اقسم بدءًا بأصغر عدد أولي، وتحقق أن كل العوامل أولية.' },
        'gcd-lcm': { eu: 'ZKH: komunak, berretzaile txikienarekin. MKT: guztiak, berretzaile handienarekin.', es: 'm.c.d.: comunes con el menor exponente. m.c.m.: todos con el mayor exponente.', ar: 'ق.م.أ: المشتركة بأصغر أس. م.م.أ: الكل بأكبر أس.' },
        problems: { eu: 'Erabaki lehenik: banatu (ZKH) ala bat etorri (MKT)? Eta eman emaitza unitateekin.', es: 'Decide primero: ¿repartir (m.c.d.) o coincidir (m.c.m.)? Y da el resultado con unidades.', ar: 'قرّر أولًا: توزيع (ق.م.أ) أم تزامن (م.م.أ)؟ ثم اكتب النتيجة مع الوحدات.' }
    }
}

export function ZatigarritasunaPage() {
    return <UnitPage unit={zatigarritasunaUnit} />
}
