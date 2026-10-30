import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readProportionAnswer } from './answers'
import { proportionChallenges, proportionDiagnostic, proportionExerciseBank, proportionPractice } from './content'
import { ProportionHeroArt } from './figures'
import { ProportionGames } from './games'
import { PROPORTION_GAME_RECORDS_KEY, proportionGameProgressIds } from './games/info'
import { ProportionLaboratory } from './lab'
import { proportionLabChallengeIds, proportionLabToolForTopic, proportionLabTools } from './lab/labTools'
import { proportionStages, proportionTopics } from './lessons'

const proportzionaltasunaUnit: UnitDefinition = {
    storagePrefix: 'matella-proportzionaltasuna-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', en: '1st ESO', ar: 'الصف الأول' },
    title: { eu: 'Proportzionaltasuna', es: 'Proporcionalidad', en: 'Proportionality', ar: 'التناسب' },
    documentTitle: { eu: 'Proportzionaltasuna · 1. DBH', es: 'Proporcionalidad · 1.º ESO', en: 'Proportionality · 1st ESO', ar: 'التناسب · الصف الأول' },
    tagline: {
        eu: 'Kroketak, behiak, igeltseroak eta beherapenak: ikasi proportzionaltasun zuzena eta alderantzizkoa ezagutzen eta ehunekoekin kalkulatzen.',
        es: 'Croquetas, vacas, albañiles y rebajas: aprende a reconocer la proporcionalidad directa e inversa y a calcular con porcentajes.',
        en: 'Croquettes, cows, bricklayers and discounts: learn to recognise direct and inverse proportion and to calculate with percentages.',
        ar: 'الكروكيت والأبقار والبنّاؤون والتخفيضات: تعلّم تمييز التناسب الطردي والعكسي والحساب بالنسب المئوية.'
    },
    heroArt: <ProportionHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, arrazoietatik beherapenetara', es: 'Cinco etapas, de las razones a las rebajas', en: 'Five stages, from ratios to discounts', ar: 'خمس مراحل، من النسب إلى التخفيضات' },
    stages: proportionStages,
    topics: proportionTopics,
    diagnostic: proportionDiagnostic,
    guidedPractice: proportionPractice,
    exerciseBank: proportionExerciseBank,
    challenges: proportionChallenges,
    lab: {
        description: { eu: `${proportionLabTools.length} tresna proportzionaltasuna ukitzeko: arrazoiak, proportzioak, sailkapena, taulak, unitatera laburtzea, ehunekoak eta beherapenak, erronkekin.`, es: `${proportionLabTools.length} herramientas para tocar la proporcionalidad: razones, proporciones, clasificación, tablas, reducción a la unidad, porcentajes y rebajas, con retos.`, en: `${proportionLabTools.length} tools to explore proportionality: ratios, proportions, classification, tables, the unitary method, percentages and discounts, with challenges.`, ar: `${proportionLabTools.length} أدوات للمس التناسب: النسب والتناسبات والتصنيف والجداول والإرجاع إلى الوحدة والنسب المئوية والتخفيضات، مع تحديات.` },
        progressIds: proportionLabChallengeIds,
        toolForTopic: proportionLabToolForTopic,
        render: (props) => <ProportionLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: proportionGameProgressIds,
        recordsKey: PROPORTION_GAME_RECORDS_KEY,
        render: (props) => <ProportionGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (6,24 edo 6.24). Ehunekoetan, idatzi % ikurraren aurreko zenbakia.', es: 'Escribe un número, con coma o con punto (6,24 o 6.24). En los porcentajes, escribe el número que va delante del %.', en: 'Write a number, with a decimal point or a decimal comma (for example 6.24). For percentages, write the number that goes before the %.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (6.24). وفي النسب المئوية اكتب العدد الذي يسبق ٪.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readProportionAnswer,
        placeholder: () => ({ eu: 'Adib.: 14', es: 'Ej.: 14', en: 'E.g.: 14', ar: 'مثال: 14' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 14 edo 6,24.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 14 o 6,24.', en: 'I don\'t understand that answer. Write a number, for example 14 or 6.24.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 14 أو 6.24.' }
    },
    errorByStage: {
        ratios: { eu: 'Proportzio batean muturren biderkadura = erdikoen biderkadura.', es: 'En una proporción, producto de extremos = producto de medios.', en: 'In a proportion, the product of the extremes = the product of the means.', ar: 'في التناسب: حاصل ضرب الطرفين = حاصل ضرب الوسطين.' },
        direct: { eu: 'Zuzena: lehenik bat (zatitu), gero nahi direnak (biderkatu).', es: 'Directa: primero uno (divide), luego los que quieras (multiplica).', en: 'Direct: to reach one, divide; then multiply for as many as you want.', ar: 'طردي: أولًا الواحد (اقسم) ثم ما تريد (اضرب).' },
        inverse: { eu: 'Alderantzizkoa: biderkadura beti bera; bat bakarrak gehiago (biderkatu), gero zatitu.', es: 'Inversa: el producto siempre igual; uno solo, más (multiplica), luego divide.', en: 'Inverse: the product is always the same; to reach one, multiply, then divide.', ar: 'عكسي: حاصل الضرب ثابت؛ الواحد يحتاج أكثر (اضرب) ثم اقسم.' },
        percent: { eu: 'Kantitate baten % p: kantitatea · p : 100. Zer ehuneko: zatia : osoa · 100.', es: 'El p % de una cantidad: cantidad · p : 100. Qué porcentaje: parte : total · 100.', en: 'The p% of a quantity: quantity · p : 100. What percentage: part : total · 100.', ar: 'p٪ من كمية: الكمية · p : 100. أي نسبة: الجزء : الكل · 100.' },
        changes: { eu: 'Beherapena: kendu; igoera: batu. Edo biderkatu (100 − p) : 100 edo (100 + p) : 100 eginez.', es: 'Descuento: resta; aumento: suma. O multiplica por (100 − p) : 100 o (100 + p) : 100.', en: 'Discount: subtract; increase: add. Or multiply by (100 − p) : 100 or (100 + p) : 100.', ar: 'التخفيض: اطرح؛ الزيادة: اجمع. أو اضرب في (100 − p) : 100 أو (100 + p) : 100.' }
    }
}

export function ProportzionaltasunaIntroPage() {
    return <UnitPage unit={proportzionaltasunaUnit} />
}
