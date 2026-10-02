import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readDecimalAnswer } from './answers'
import { decimalsChallenges, decimalsDiagnostic, decimalsExerciseBank, decimalsPractice } from './content'
import { DecimalsHeroArt } from './figures'
import { DecimalsGames } from './games'
import { DECIMALS_GAME_RECORDS_KEY, decimalsGameProgressIds } from './games/info'
import { DecimalsLaboratory } from './lab'
import { decimalsLabChallengeIds, decimalsLabToolForTopic, decimalsLabTools } from './lab/labTools'
import { decimalsStages, decimalsTopics } from './lessons'

const hamartarrakUnit: UnitDefinition = {
    storagePrefix: 'matella-hamartarrak-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Zenbaki hamartarrak', es: 'Números decimales', ar: 'الأعداد العشرية' },
    documentTitle: { eu: 'Zenbaki hamartarrak · 1. DBH', es: 'Números decimales · 1.º ESO', ar: 'الأعداد العشرية · الصف الأول' },
    tagline: {
        eu: 'Jaurtiketak, aparkatutako autoak, forroa eta erosketa-zerrenda: ikasi hamartarrak irakurtzen, ordenatzen, biribiltzen eta haiekin kalkulatzen.',
        es: 'Lanzamientos, coches aparcados, forro de libros y la lista de la compra: aprende a leer, ordenar, redondear y calcular con decimales.',
        ar: 'الرمي والسيارات المتوقفة وتغليف الكتب وقائمة المشتريات: تعلّم قراءة الأعداد العشرية وترتيبها وتقريبها والحساب بها.'
    },
    heroArt: <DecimalsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, hamarrenetatik problemetara', es: 'Cinco etapas, de las décimas a los problemas', ar: 'خمس مراحل، من الأعشار إلى المسائل' },
    stages: decimalsStages,
    topics: decimalsTopics,
    diagnostic: decimalsDiagnostic,
    guidedPractice: decimalsPractice,
    exerciseBank: decimalsExerciseBank,
    challenges: decimalsChallenges,
    lab: {
        description: { eu: `${decimalsLabTools.length} tresna hamartarrak ukitzeko: sareta, posizioak, alderaketa, zuzena, biribiltzea, zatiketa, koma jauzika eta zatitzailea, erronkekin.`, es: `${decimalsLabTools.length} herramientas para tocar los decimales: cuadrícula, posiciones, comparación, recta, redondeo, división, la coma que salta y el divisor, con retos.`, ar: `${decimalsLabTools.length} أدوات للمس الأعداد العشرية: الشبكة والمنازل والمقارنة والمستقيم والتقريب والقسمة والفاصلة القافزة والمقسوم عليه، مع تحديات.` },
        progressIds: decimalsLabChallengeIds,
        toolForTopic: decimalsLabToolForTopic,
        render: (props) => <DecimalsLaboratory {...props} />
    },
    games: {
        description: { eu: 'Hiru joko abiadura eta zehaztasuna entrenatzeko: lasterketa, itua eta memoria.', es: 'Tres juegos para entrenar rapidez y precisión: carrera, diana y memoria.', ar: 'ثلاث ألعاب لتدريب السرعة والدقة: السباق والهدف والذاكرة.' },
        progressIds: decimalsGameProgressIds,
        recordsKey: DECIMALS_GAME_RECORDS_KEY,
        render: (props) => <DecimalsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi hamartarrak komarekin edo puntuarekin (0,75 edo 0.75), eta milakoak bereizlerik gabe (4700).', es: 'Escribe los decimales con coma o con punto (0,75 o 0.75), y los miles sin separador (4700).', ar: 'اكتب الأعداد العشرية بالنقطة أو بالفاصلة (0.75)، والآلاف بلا فاصل (4700).' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readDecimalAnswer,
        placeholder: () => ({ eu: 'Adib.: 2,35', es: 'Ej.: 2,35', ar: 'مثال: 2.35' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki hamartar gisa.', es: 'El valor es correcto, pero escríbelo como número decimal.', ar: 'القيمة صحيحة، لكن اكتبها عددًا عشريًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 2,35.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 2,35.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 2.35.' }
    },
    errorByStage: {
        structure: { eu: 'Komaren ondoren: hamarrenak, ehunenak, milarenak. Maila bakoitzak hurrengoaren 10 balio ditu.', es: 'Tras la coma: décimas, centésimas, milésimas. Cada orden vale 10 del siguiente.', ar: 'بعد الفاصلة: أعشار ثم أجزاء من مئة ثم أجزاء من ألف. كل رتبة تساوي 10 من التالية.' },
        order: { eu: 'Idatzi zifra hamartar kopuru berarekin eta konparatu zifraz zifra, ezkerretik hasita.', es: 'Escríbelos con las mismas cifras decimales y compara cifra a cifra, desde la izquierda.', ar: 'اكتبها بالعدد نفسه من الأرقام العشرية وقارن رقمًا رقمًا من اليسار.' },
        fractions: { eu: 'Zatikia: zenbakitzailea zati izendatzailea. Biribiltzeko, begiratu hurrengo zifrari: 5etik aurrera, gehitu bat.', es: 'Fracción: numerador entre denominador. Para redondear, mira la cifra siguiente: desde 5, suma uno.', ar: 'الكسر: البسط على المقام. وللتقريب انظر إلى الرقم التالي: من 5 فما فوق أضف واحدًا.' },
        operations: { eu: 'Batu eta kendu: koma komaren azpian. Biderkatu: komarik gabe, eta zenbatu zifra hamartarrak.', es: 'Sumar y restar: coma bajo coma. Multiplicar: sin coma, y cuenta las cifras decimales.', ar: 'الجمع والطرح: فاصلة تحت فاصلة. الضرب: بلا فاصلة ثم عُدّ الأرقام العشرية.' },
        division: { eu: 'Zatitzailea hamartarra bada, biderkatu biak 10, 100 edo 1000ez. Jaitsi zeroak hondarrera.', es: 'Si el divisor es decimal, multiplica los dos por 10, 100 o 1000. Baja ceros al resto.', ar: 'إذا كان المقسوم عليه عشريًا فاضرب الاثنين في 10 أو 100 أو 1000. وأنزل أصفارًا إلى الباقي.' }
    }
}

export function HamartarrakIntroPage() {
    return <UnitPage unit={hamartarrakUnit} />
}
