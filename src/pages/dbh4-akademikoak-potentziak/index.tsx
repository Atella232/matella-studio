import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { powersChallenges, powersDiagnostic, powersExerciseBank, powersPractice } from './content'
import { PowersHeroArt } from './figures'
import { PowersGames } from './games'
import { POWERS_GAME_RECORDS_KEY, powersGameProgressIds } from './games/info'
import { PowersLaboratory } from './lab'
import { powersLabChallengeIds, powersLabToolForTopic, powersLabTools } from './lab/labTools'
import { powersStages, powersTopics } from './lessons'

const potentziakUnit: UnitDefinition = {
    storagePrefix: 'matella-potentziak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Berreturak, erroak eta logaritmoak', es: 'Potencias, radicales y logaritmos', ar: 'القوى والجذور واللوغاريتمات' },
    documentTitle: { eu: 'Berreturak, erroak eta logaritmoak · 4. DBH', es: 'Potencias, radicales y logaritmos · 4.º ESO', ar: 'القوى والجذور واللوغاريتمات · الصف الرابع' },
    tagline: {
        eu: 'Berretzaile oso eta zatikiak, idazkera zientifikoa, edozein indizeko erradikalak eta haien eragiketak, arrazionalizatzea konjokatuarekin, eta logaritmoak eta haien propietateak.',
        es: 'Exponentes enteros y fraccionarios, notación científica, radicales de cualquier índice y sus operaciones, racionalizar con el conjugado, y los logaritmos y sus propiedades.',
        ar: 'الأسس الصحيحة والكسرية، والترميز العلمي، والجذور من أي دليل وعملياتها، والإنطاق بالمرافق، واللوغاريتمات وخصائصها.'
    },
    heroArt: <PowersHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, berreturetatik logaritmoetara', es: 'Cinco etapas, de las potencias a los logaritmos', ar: 'خمس مراحل، من القوى إلى اللوغاريتمات' },
    stages: powersStages,
    topics: powersTopics,
    diagnostic: powersDiagnostic,
    guidedPractice: powersPractice,
    exerciseBank: powersExerciseBank,
    challenges: powersChallenges,
    lab: {
        description: {
            eu: `${powersLabTools.length} tresna, erronkekin: berreturen eskailera, faktorizatzeko makina, idazkera zientifikoa, berretzaile zatikia, indize komuna, errotik faktoreak ateratzea, arrazionalizatzeko faktorea, konjokatua, logaritmoen eskailera eta oinarri-aldaketa.`,
            es: `${powersLabTools.length} herramientas con retos: la escalera de potencias, la máquina de factorizar, la notación científica, el exponente fraccionario, el índice común, sacar factores de la raíz, el factor que racionaliza, el conjugado, la escalera de los logaritmos y el cambio de base.`,
            ar: `${powersLabTools.length} أدوات مع تحديات: سُلّم القوى، وآلة التحليل، والترميز العلمي، والأس الكسري، والدليل المشترك، وإخراج العوامل من الجذر، وعامل الإنطاق، والمرافق، وسُلّم اللوغاريتمات، وتغيير الأساس.`
        },
        progressIds: powersLabChallengeIds,
        toolForTopic: powersLabToolForTopic,
        render: (props) => <PowersLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: powersGameProgressIds,
        recordsKey: POWERS_GAME_RECORDS_KEY,
        render: (props) => <PowersGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2. Emaitza erradikal bat bada, eskatzen den zenbakia bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 3/2. Si el resultado es un radical, solo el número que se pide.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2. وإذا كانت النتيجة جذرًا فاكتب العدد المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        powers: { eu: 'Berretzaile negatiboa: alderantzizkoa. Oinarri bera: biderkatzean batu, zatitzean kendu. Oinarri desberdinak: faktorizatu.', es: 'Exponente negativo: el inverso. Misma base: al multiplicar suma, al dividir resta. Bases distintas: factoriza.', ar: 'الأس السالب: المقلوب. الأساس نفسه: في الضرب اجمع وفي القسمة اطرح. أسس مختلفة: حلّل.' },
        radicals: { eu: 'a^(m/n) = ⁿ√aᵐ. Indizea eta berretzailea zenbaki berberaz zatitu edo biderkatu. Konparatzeko, indize komuna.', es: 'a^(m/n) = ⁿ√aᵐ. Divide o multiplica índice y exponente por el mismo número. Para comparar, índice común.', ar: 'a^(m/n) = ⁿ√aᵐ. اقسم الدليل والأس أو اضربهما في العدد نفسه. وللمقارنة دليل مشترك.' },
        operations: { eu: 'Atera faktoreak: berretzailea zati indizea. Antzekoak bakarrik batzen dira. Biderkatzeko, indize bera.', es: 'Saca factores: exponente entre índice. Solo se suman los semejantes. Para multiplicar, el mismo índice.', ar: 'أخرج العوامل: الأس على الدليل. لا تُجمع إلا المتشابهة. وللضرب الدليل نفسه.' },
        rationalize: { eu: '√b: biderkatu √b-z. ⁿ√bᵐ: osatu berretzailea n-raino. Batura edo kenketa: konjokatua.', es: '√b: multiplica por √b. ⁿ√bᵐ: completa el exponente hasta n. Suma o resta: el conjugado.', ar: '√b: اضرب في √b. ⁿ√bᵐ: أكمل الأس حتى n. مجموع أو فرق: المرافق.' },
        logarithms: { eu: 'logₐ b = x ⟺ aˣ = b. Biderkadura → batura, zatidura → kenketa, berretura → biderketa. Oinarri-aldaketa: log b : log a.', es: 'logₐ b = x ⟺ aˣ = b. Producto → suma, cociente → resta, potencia → producto. Cambio de base: log b : log a.', ar: 'logₐ b = x ⟺ aˣ = b. الضرب ← جمع، القسمة ← طرح، القوة ← ضرب. تغيير الأساس: log b : log a.' }
    }
}

export function PotentziakDbh4AkIntroPage() {
    return <UnitPage unit={potentziakUnit} />
}
