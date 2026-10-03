import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readSolidsAnswer } from './answers'
import { solidsChallenges, solidsDiagnostic, solidsExerciseBank, solidsPractice } from './content'
import { SolidsHeroArt } from './figures'
import { SolidsGames } from './games'
import { SOLIDS_GAME_RECORDS_KEY, solidsGameProgressIds } from './games/info'
import { SolidsLaboratory } from './lab'
import { solidsLabChallengeIds, solidsLabToolForTopic, solidsLabTools } from './lab/labTools'
import { solidsStages, solidsTopics } from './lessons'

const gorputzakUnit: UnitDefinition = {
    storagePrefix: 'matella-gorputzak-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Gorputz geometrikoak', es: 'Cuerpos geométricos', ar: 'الأجسام الهندسية' },
    documentTitle: { eu: 'Gorputz geometrikoak · 2. DBH', es: 'Cuerpos geométricos · 2.º ESO', ar: 'الأجسام الهندسية · الصف الثاني' },
    tagline: {
        eu: 'Poliedroak eta Euler, prismak, piramideak, zilindroak, konoak eta esferak: haien garapenak, azalerak eta bolumenak, litroetaraino.',
        es: 'Poliedros y Euler, prismas, pirámides, cilindros, conos y esferas: sus desarrollos, sus áreas y sus volúmenes, hasta los litros.',
        ar: 'متعددات الأوجه وأويلر، والمناشير والأهرامات والأسطوانات والمخاريط والكرات: نشرها ومساحاتها وحجومها حتى اللترات.'
    },
    heroArt: <SolidsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, poliedroetatik bolumenetara', es: 'Cinco etapas, de los poliedros a los volúmenes', ar: 'خمس مراحل، من متعددات الأوجه إلى الحجوم' },
    stages: solidsStages,
    topics: solidsTopics,
    diagnostic: solidsDiagnostic,
    guidedPractice: solidsPractice,
    exerciseBank: solidsExerciseBank,
    challenges: solidsChallenges,
    lab: {
        description: { eu: `${solidsLabTools.length} tresna gorputzak ukitzeko: prismak eta piramideak, bost poliedro erregularrak, kaxa eta haren garapena, piramidearen apotema, zilindroa, konoa eta esfera, depositua litrotan eta bolumenak konparatzeko, erronkekin.`, es: `${solidsLabTools.length} herramientas para tocar los cuerpos: prismas y pirámides, los cinco poliedros regulares, la caja y su desarrollo, la apotema de la pirámide, cilindro, cono y esfera, el depósito en litros y comparar volúmenes, con retos.`, ar: `${solidsLabTools.length} أدوات للمس الأجسام: المناشير والأهرامات، ومتعددات الأوجه المنتظمة الخمسة، والصندوق ونشره، وعامد الهرم، والأسطوانة والمخروط والكرة، والخزان باللترات، ومقارنة الحجوم، مع تحديات.` },
        progressIds: solidsLabChallengeIds,
        toolForTopic: solidsLabToolForTopic,
        render: (props) => <SolidsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: solidsGameProgressIds,
        recordsKey: SOLIDS_GAME_RECORDS_KEY,
        render: (props) => <SolidsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (188,4 edo 188.4), unitaterik gabe. Erabili π ≈ 3,14.', es: 'Escribe un número, con coma o con punto (188,4 o 188.4), sin la unidad. Usa π ≈ 3,14.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (188.4) دون الوحدة. استعمل π ≈ 3.14.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readSolidsAnswer,
        placeholder: () => ({ eu: 'Adib.: 188,4', es: 'Ej.: 188,4', ar: 'مثال: 188.4' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 120 edo 188,4.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 120 o 188,4.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 120 أو 188.4.' }
    },
    errorByStage: {
        polyhedra: { eu: 'Prisma: n + 2 aurpegi, 3n ertz, 2n erpin. Piramidea: n + 1, 2n, n + 1. Euler: aurpegiak + erpinak = ertzak + 2.', es: 'Prisma: n + 2 caras, 3n aristas, 2n vértices. Pirámide: n + 1, 2n, n + 1. Euler: caras + vértices = aristas + 2.', ar: 'المنشور: n + 2 وجهًا و3n حرفًا و2n رأسًا. الهرم: n + 1 و2n وn + 1. أويلر: الأوجه + الرؤوس = الأحرف + 2.' },
        areas: { eu: 'Marraztu garapena: alboko aurpegiak gehi oinarriak. Piramidean apotema erabili, ez altuera.', es: 'Dibuja el desarrollo: caras laterales más bases. En la pirámide usa la apotema, no la altura.', ar: 'ارسم النشر: الأوجه الجانبية مع القاعدتين. في الهرم استعمل العامد لا الارتفاع.' },
        round: { eu: 'Zilindroa: 2πrh. Konoa: πrg. Esfera: 4πr². Diametroa ematen badute, erdia hartu.', es: 'Cilindro: 2πrh. Cono: πrg. Esfera: 4πr². Si dan el diámetro, toma la mitad.', ar: 'الأسطوانة: 2πrh. المخروط: πrg. الكرة: 4πr². إذا أُعطي القطر فخذ نصفه.' },
        units: { eu: 'Bolumenean maila bakoitza 1000 da. 1 dm³ = 1 L eta 1 cm³ = 1 mL.', es: 'En volumen cada escalón es 1000. 1 dm³ = 1 L y 1 cm³ = 1 mL.', ar: 'في الحجم كل درجة 1000. 1 dm³ = 1 L و1 cm³ = 1 mL.' },
        volume: { eu: 'Prisma eta zilindroa: oinarria · altuera. Piramidea eta konoa: herena. Esfera: 4πr³ : 3.', es: 'Prisma y cilindro: base · altura. Pirámide y cono: un tercio. Esfera: 4πr³ : 3.', ar: 'المنشور والأسطوانة: القاعدة · الارتفاع. الهرم والمخروط: الثلث. الكرة: 4πr³ : 3.' }
    }
}

export function GorputzakIntroPage() {
    return <UnitPage unit={gorputzakUnit} />
}
