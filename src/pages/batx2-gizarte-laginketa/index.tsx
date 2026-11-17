import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { samplingBatx2gChallenges, samplingBatx2gDiagnostic, samplingBatx2gExerciseBank, samplingBatx2gPractice } from './content'
import { SamplingBatx2gHeroArt } from './figures'
import { SamplingBatx2gGames } from './games'
import { SAMPLING_BATX2G_GAME_RECORDS_KEY, samplingBatx2gGameProgressIds } from './games/info'
import { SamplingBatx2gLaboratory } from './lab'
import { samplingBatx2gLabChallengeIds, samplingBatx2gLabToolForTopic, samplingBatx2gLabTools } from './lab/labTools'
import { samplingBatx2gStages, samplingBatx2gTopics } from './lessons'

const laginketaBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-laginketa-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Laginketa', es: 'Muestreo', en: 'Sampling', ar: 'المعاينة' },
    documentTitle: { eu: 'Laginketa · Batxilergoa 2 · Gizarte', es: 'Muestreo · 2.º Bachillerato · Sociales', en: 'Sampling · 2nd Bachillerato · Social Sciences', ar: 'المعاينة · البكالوريا الثانية · اجتماعية' },
    tagline: {
        eu: 'Populazioa eta lagina, alborapena, laginketa aleatorio, sistematiko eta geruzatua, laginaren batez bestekoaren eta proportzioaren banaketak, limitearen teorema zentrala eta tarte karakteristikoak.',
        es: 'Población y muestra, el sesgo, el muestreo aleatorio, sistemático y estratificado, las distribuciones de la media y de la proporción muestrales, el teorema central del límite y los intervalos característicos.',
        en: 'Population and sample, bias, random, systematic and stratified sampling, the distributions of the sample mean and the sample proportion, the central limit theorem and the characteristic intervals.',
        ar: 'المجتمع والعيّنة، والتحيّز، والمعاينة العشوائية والمنتظمة والطبقية، وتوزيعا متوسط العيّنة ونسبتها، ونظرية النهاية المركزية، والفترات المميزة.'
    },
    heroArt: <SamplingBatx2gHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, laginetik tarteetara', es: 'Cinco etapas, de la muestra a los intervalos', en: 'Five stages, from the sample to the intervals', ar: 'خمس مراحل، من العيّنة إلى الفترات' },
    stages: samplingBatx2gStages,
    topics: samplingBatx2gTopics,
    diagnostic: samplingBatx2gDiagnostic,
    guidedPractice: samplingBatx2gPractice,
    exerciseBank: samplingBatx2gExerciseBank,
    challenges: samplingBatx2gChallenges,
    lab: {
        description: {
            eu: `${samplingBatx2gLabTools.length} tresna, erronkekin: batez bestekoen kutxa eta lagin asko, berriak; eta DBHko lagina eta lagin geruzatua.`,
            es: `${samplingBatx2gLabTools.length} herramientas con retos: la urna de las medias y muchas muestras, nuevas; y la muestra y la muestra estratificada de la ESO.`,
            en: `${samplingBatx2gLabTools.length} tools with challenges: the urn of the means and many samples, new; and the sample and the stratified sample from ESO.`,
            ar: `${samplingBatx2gLabTools.length} أدوات مع تحديات: صندوق المتوسطات وعيّنات كثيرة، وهما جديدتان؛ والعيّنة والعيّنة الطبقية من المرحلة الثانوية.`
        },
        progressIds: samplingBatx2gLabChallengeIds,
        toolForTopic: samplingBatx2gLabToolForTopic,
        render: (props) => <SamplingBatx2gLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bost joko, denak berriak: alboratuta dago?, banatu lagina, laginketaren detektibea, lasterketa eta memoria.',
            es: 'Cinco juegos, todos nuevos: ¿hay sesgo?, reparte la muestra, el detective del muestreo, la carrera y la memoria.',
            en: 'Five games, all new: is it biased?, split the sample, the sampling detective, the race and the memory.',
            ar: 'خمس ألعاب، كلها جديدة: هل هناك تحيّز؟ ووزّع العيّنة ومخبر المعاينة والسباق والذاكرة.'
        },
        progressIds: samplingBatx2gGameProgressIds,
        recordsKey: SAMPLING_BATX2G_GAME_RECORDS_KEY,
        render: (props) => <SamplingBatx2gGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki zehatz bat: 0,1587, 25 edo 5,88. Normalaren probabilitateak, taulako lau hamartarrekin.', es: 'Escribe un número exacto: 0,1587, 25 o 5,88. Las probabilidades de la normal, con los cuatro decimales de la tabla.', en: 'Write an exact number: 0.1587, 25 or 5.88. Normal probabilities with the four decimals of the table.', ar: 'اكتب عددًا مضبوطًا: 0.1587 أو 25 أو 5.88. احتمالات التوزيع الطبيعي بأربعة أرقام عشرية من الجدول.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,1587', es: 'Ej.: 0,1587', en: 'e.g. 0.1587', ar: 'مثال: 0.1587' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat: 0,1587, 25 edo 5,88.', es: 'No entiendo esa respuesta. Escribe un número: 0,1587, 25 o 5,88.', en: 'I don\'t understand that answer. Write a number: 0.1587, 25 or 5.88.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا: 0.1587 أو 25 أو 5.88.' }
    },
    errorByStage: {
        sampling: { eu: 'Jauzia h = N / n da. Lagin ona ausazkoa da eta ez du talderik kanpoan uzten.', es: 'El salto es h = N / n. Una buena muestra es al azar y no deja grupos fuera.', en: 'The step is h = N / n. A good sample is random and leaves no group out.', ar: 'القفزة h = N / n. العيّنة الجيدة عشوائية ولا تستبعد أي مجموعة.' },
        strata: { eu: 'Proportzionalean, geruza bakoitzak bere pisua: n · Nᵢ / N. Batuketak n eman behar du.', es: 'En la proporcional, cada estrato según su peso: n · Nᵢ / N. La suma debe dar n.', en: 'In proportional allocation, each stratum by its weight: n · Nᵢ / N. The sum must give n.', ar: 'في التوزيع التناسبي، كل طبقة حسب وزنها: n · Nᵢ / N. ويجب أن يكون المجموع n.' },
        means: { eu: 'Batez bestekoaren desbideratzea σ / √n da, ez σ. Batura: nμ eta σ√n.', es: 'La desviación de la media es σ / √n, no σ. La suma: nμ y σ√n.', en: 'The deviation of the mean is σ / √n, not σ. The sum: nμ and σ√n.', ar: 'انحراف المتوسط σ / √n لا σ. والمجموع: nμ وσ√n.' },
        proportions: { eu: 'p̂ = x / n. Desbideratzea √(pq / n) da, erroarekin.', es: 'p̂ = x / n. La desviación es √(pq / n), con la raíz.', en: 'p̂ = x / n. The deviation is √(pq / n), with the root.', ar: 'p̂ = x / n. والانحراف √(pq / n) مع الجذر.' },
        characteristic: { eu: 'Erradioa z · σ / √n da. Lagina lau aldiz handiagoa: erradioa erdia.', es: 'El radio es z · σ / √n. Muestra cuatro veces mayor: la mitad de radio.', en: 'The radius is z · σ / √n. A sample four times bigger: half the radius.', ar: 'نصف القطر z · σ / √n. عيّنة أكبر بأربع مرات: نصف القطر.' }
    }
}

export function LaginketaBatx2gIntroPage() {
    return <UnitPage unit={laginketaBatx2gUnit} />
}
