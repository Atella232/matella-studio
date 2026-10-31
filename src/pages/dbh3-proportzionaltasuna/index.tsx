import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { ProportionHeroArt } from '../dbh1-proportzionaltasuna-v2/figures'
import { readMoneyAnswer } from '../dbh4-aplikatuak-proportzionaltasuna/answers'
import { proportion3Challenges, proportion3Diagnostic, proportion3ExerciseBank, proportion3Practice } from './content'
import { Proportion3Laboratory } from './lab'
import { proportion3LabChallengeIds, proportion3LabToolForTopic, proportion3LabTools } from './lab/labTools'
import { proportion3Stages, proportion3Topics } from './lessons'

const proportion3Unit: UnitDefinition = {
    storagePrefix: 'matella-proportzionaltasuna-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Proportzionaltasuna', es: 'Proporcionalidad', en: 'Proportionality', ar: 'التناسب' },
    documentTitle: { eu: 'Proportzionaltasuna · 3. DBH', es: 'Proporcionalidad · 3.º ESO', en: 'Proportionality · 3rd ESO', ar: 'التناسب · الصف الثالث' },
    tagline: {
        eu: 'Arrazoietatik eta eskaletatik problema aritmetikoetara: zuzena eta alderantzizkoa, konposatua eta banaketak, ehunekoak eta interesa, nahasteak, mugikariak eta txorrotak.',
        es: 'De las razones y las escalas a los problemas aritméticos: directa e inversa, compuesta y repartos, porcentajes e interés, mezclas, móviles y grifos.',
        en: 'From ratios and scales to arithmetic problems: direct and inverse proportion, compound proportion and sharing, percentages and interest, mixtures, moving objects and taps.',
        ar: 'من النسب والمقاييس إلى المسائل الحسابية: الطردي والعكسي، والمركّب والتوزيعات، والنسب المئوية والفائدة، والخلطات والمتحركات والصنابير.'
    },
    heroArt: <ProportionHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, arrazoietatik problemetara', es: 'Cinco etapas, de las razones a los problemas', en: 'Five stages, from ratios to problems', ar: 'خمس مراحل، من النسب إلى المسائل' },
    stages: proportion3Stages,
    topics: proportion3Topics,
    diagnostic: proportion3Diagnostic,
    guidedPractice: proportion3Practice,
    exerciseBank: proportion3ExerciseBank,
    challenges: proportion3Challenges,
    lab: {
        description: {
            eu: `${proportion3LabTools.length} tresna: errezeta eta despentsa, mapa eskalan, gurpil hortzdunak, luzatzen den laukizuzena, hiruko erregela, konposatua, banaketak, ehunekoak, interesa, nahasteak, errepidea eta txorrotak, erronkekin.`,
            es: `${proportion3LabTools.length} herramientas: la receta y la despensa, el mapa a escala, las ruedas dentadas, el rectángulo que se estira, la regla de tres, la compuesta, los repartos, los porcentajes, el interés, las mezclas, la carretera y los grifos, con retos.`,
            en: `${proportion3LabTools.length} tools: the recipe and the pantry, the scale map, the gear wheels, the stretching rectangle, the rule of three, compound proportion, sharing, percentages, interest, mixtures, the road and the taps, with challenges.`,
            ar: `${proportion3LabTools.length} أداة: الوصفة والمخزن والخريطة بالمقياس والعجلات المسننة والمستطيل الذي يتمدّد وقاعدة الثلاثة والمركّب والتوزيعات والنسب المئوية والفائدة والخلطات والطريق والصنابير، مع تحديات.`
        },
        progressIds: proportion3LabChallengeIds,
        toolForTopic: proportion3LabToolForTopic,
        render: (props) => <Proportion3Laboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (12,6 edo 12.6). Ehunekoetan, idatzi % ikurraren aurreko zenbakia; dirua, euroetan; denbora, ordutan.', es: 'Escribe un número, con coma o con punto (12,6 o 12.6). En los porcentajes, el número que va delante del %; el dinero, en euros; el tiempo, en horas.', en: 'Write a number, with a decimal point or a decimal comma (for example 12.6). For percentages, write the number before the %; money in euros; time in hours.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (12.6). وفي النسب المئوية العدد الذي يسبق ٪؛ والمال باليورو؛ والزمن بالساعات.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readMoneyAnswer,
        placeholder: () => ({ eu: 'Adib.: 12,6', es: 'Ej.: 12,6', en: 'e.g. 12.6', ar: 'مثال: 12.6' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 15 edo 12,6.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 15 o 12,6.', en: 'I don\'t understand that answer. Write a number, for example 15 or 12.6.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 15 أو 12.6.' }
    },
    errorByStage: {
        ratios: { eu: 'Proportzioan muturren biderkadura = erdikoen biderkadura. Eskala: benetakoa = mapa · n, cm-tan.', es: 'En una proporción, producto de extremos = producto de medios. Escala: real = mapa · n, en cm.', en: 'In a proportion, product of the extremes = product of the means. Scale: real = map · n, in cm.', ar: 'في التناسب: حاصل ضرب الطرفين = حاصل ضرب الوسطين. المقياس: الحقيقي = الخريطة · n بالسنتيمتر.' },
        simple: { eu: 'Zuzena: zatidura konstantea. Alderantzizkoa: biderkadura konstantea; kalkulatu lehenik biderkadura hori.', es: 'Directa: cociente constante. Inversa: producto constante; calcula primero ese producto.', en: 'Direct: constant quotient. Inverse: constant product; work out that product first.', ar: 'الطردي: حاصل قسمة ثابت. العكسي: حاصل ضرب ثابت؛ احسب ذلك الحاصل أولًا.' },
        compound: { eu: 'Magnitude bakoitza bakarka: zuzena berria/zaharra, alderantzizkoa zaharra/berria. Banaketa: zatitu zenbakien baturaz.', es: 'Cada magnitud por separado: directa nuevo/viejo, inversa viejo/nuevo. Reparto: divide entre la suma de los números.', en: 'Each quantity separately: direct new/old, inverse old/new. Sharing: divide by the sum of the numbers.', ar: 'كل مقدار على حدة: الطردي الجديد/القديم والعكسي القديم/الجديد. التوزيع: اقسم على مجموع الأعداد.' },
        percent: { eu: 'Amaierakoa = hasierakoa · indizea. Kateatuak: biderkatu indizeak. $I=\\frac{C\\cdot r\\cdot t}{100}$, $t$ urtetan.', es: 'Final = inicial · índice. Encadenados: multiplica los índices. $I=\\frac{C\\cdot r\\cdot t}{100}$, con $t$ en años.', en: 'Final = original · index. Successive: multiply the indices. $I=\\frac{C\\cdot r\\cdot t}{100}$, with $t$ in years.', ar: 'النهائية = الأصلية · المؤشر. المتتالية: اضرب المؤشرات. $I=\\frac{C\\cdot r\\cdot t}{100}$ و$t$ بالسنوات.' },
        problems: { eu: 'Nahastea: balio osoa zati kilo osoak. Elkarrengana: abiadurak batu; atzetik: kendu. Txorrotak: batu ordu bateko zatiak.', es: 'Mezcla: valor total entre kilos totales. Encuentro: suma las velocidades; alcance: resta. Grifos: suma las partes de una hora.', en: 'Mixture: total value divided by total kilos. Meeting: add the speeds; catching up: subtract. Taps: add the parts per hour.', ar: 'الخليط: القيمة الكلية على الكيلوغرامات الكلية. التقابل: اجمع السرعتين؛ اللحاق: اطرح. الصنابير: اجمع أجزاء الساعة.' }
    }
}

export function ProportzionaltasunaDBH3Page() {
    return <UnitPage unit={proportion3Unit} />
}
