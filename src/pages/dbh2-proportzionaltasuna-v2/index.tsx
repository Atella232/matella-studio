import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readProportionAnswer } from '../dbh1-proportzionaltasuna-v2/answers'
import { proportionDbh2Challenges, proportionDbh2Diagnostic, proportionDbh2ExerciseBank, proportionDbh2Practice } from './content'
import { ProportionDbh2HeroArt } from './figures'
import { ProportionDbh2Games } from './games'
import { PROPORTION_DBH2_GAME_RECORDS_KEY, proportionDbh2GameProgressIds } from './games/info'
import { ProportionDbh2Laboratory } from './lab'
import { proportionDbh2LabChallengeIds, proportionDbh2LabToolForTopic, proportionDbh2LabTools } from './lab/labTools'
import { proportionDbh2Stages, proportionDbh2Topics } from './lessons'

const proportzionaltasunaDbh2Unit: UnitDefinition = {
    storagePrefix: 'matella-proportzionaltasuna-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', en: '2nd ESO', ar: 'الصف الثاني' },
    title: { eu: 'Proportzionaltasuna eta ehunekoak', es: 'Proporcionalidad y porcentajes', en: 'Proportion and percentages', ar: 'التناسب والنسب المئوية' },
    documentTitle: { eu: 'Proportzionaltasuna eta ehunekoak · 2. DBH', es: 'Proporcionalidad y porcentajes · 2.º ESO', en: 'Proportion and percentages · 2nd ESO', ar: 'التناسب والنسب المئوية · الصف الثاني' },
    tagline: {
        eu: 'Igeltseroak, behiak, sariak eta bankua: proportzionaltasun konposatua, banaketak, ehunekoen indizeak eta interesa.',
        es: 'Albañiles, vacas, premios y el banco: proporcionalidad compuesta, repartos, índices de variación e interés.',
        en: 'Bricklayers, cows, prizes and the bank: compound proportion, proportional sharing, change multipliers and interest.',
        ar: 'البنّاؤون والأبقار والجوائز والمصرف: التناسب المركّب والتوزيعات ومؤشرات التغيّر والفائدة.'
    },
    heroArt: <ProportionDbh2HeroArt />,
    pathSubtitle: { eu: 'Bost etapa, proportzioetatik interesera', es: 'Cinco etapas, de las proporciones al interés', en: 'Five stages, from proportions to interest', ar: 'خمس مراحل، من التناسبات إلى الفائدة' },
    stages: proportionDbh2Stages,
    topics: proportionDbh2Topics,
    diagnostic: proportionDbh2Diagnostic,
    guidedPractice: proportionDbh2Practice,
    exerciseBank: proportionDbh2ExerciseBank,
    challenges: proportionDbh2Challenges,
    lab: {
        description: { eu: `${proportionDbh2LabTools.length} tresna: taula eta grafikoa, proportzionaltasun konposatuaren makina, banaketak, ehunekoak, ehuneko kateatuak eta interesa, erronkekin.`, es: `${proportionDbh2LabTools.length} herramientas: tabla y gráfica, máquina de proporcionalidad compuesta, repartos, porcentajes, porcentajes encadenados e interés, con retos.`, en: `${proportionDbh2LabTools.length} tools: table and graph, compound proportion machine, proportional sharing, percentages, chained percentages and interest, with challenges.`, ar: `${proportionDbh2LabTools.length} أدوات: الجدول والرسم، وآلة التناسب المركّب، والتوزيعات، والنسب المئوية، والنسب المتتالية، والفائدة، مع تحديات.` },
        progressIds: proportionDbh2LabChallengeIds,
        toolForTopic: proportionDbh2LabToolForTopic,
        render: (props) => <ProportionDbh2Laboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: proportionDbh2GameProgressIds,
        recordsKey: PROPORTION_DBH2_GAME_RECORDS_KEY,
        render: (props) => <ProportionDbh2Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (10,8 edo 10.8). Ehunekoetan, idatzi % ikurraren aurreko zenbakia.', es: 'Escribe un número, con coma o con punto (10,8 o 10.8). En los porcentajes, escribe el número que va delante del %.', en: 'Write a number, using a decimal point or a comma (10.8). For percentages, write the number before the % sign.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (10.8). وفي النسب المئوية اكتب العدد الذي يسبق ٪.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readProportionAnswer,
        placeholder: () => ({ eu: 'Adib.: 30', es: 'Ej.: 30', en: 'Example: 30', ar: 'مثال: 30' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 30 edo 10,8.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 30 o 10,8.', en: 'I don\'t understand that answer. Write a number, for example 30 or 10.8.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 30 أو 10.8.' }
    },
    errorByStage: {
        proportions: { eu: 'Zuzena: zatidura konstantea. Alderantzizkoa: biderkadura konstantea.', es: 'Directa: cociente constante. Inversa: producto constante.', en: 'Direct: constant quotient. Inverse: constant product.', ar: 'الطردي: حاصل قسمة ثابت. العكسي: حاصل ضرب ثابت.' },
        compound: { eu: 'Magnitude bakoitza bere aldetik: zuzena berria/zaharra, alderantzizkoa zaharra/berria.', es: 'Cada magnitud por separado: directa nuevo/viejo, inversa viejo/nuevo.', en: 'Each quantity separately: direct new/old, inverse old/new.', ar: 'كل مقدار على حدة: الطردي الجديد/القديم، والعكسي القديم/الجديد.' },
        shares: { eu: 'Zuzena: kantitatea : zenbakien batura. Alderantzizkoa: banatu alderantzizkoekiko.', es: 'Directo: cantidad : suma de los números. Inverso: reparte a los inversos.', en: 'Direct: quantity : sum of the numbers. Inverse: share in proportion to the inverses.', ar: 'الطردي: الكمية : مجموع الأعداد. العكسي: وزّع على المقلوبات.' },
        percent: { eu: '% p = p : 100. Osoa = zatia : hamartarra. Ehunekoa = zatia : osoa · 100.', es: 'p % = p : 100. Total = parte : decimal. Porcentaje = parte : total · 100.', en: 'p% = p : 100. Whole = part : decimal. Percentage = part : whole · 100.', ar: 'p٪ = p : 100. الكل = الجزء : العدد العشري. النسبة = الجزء : الكل · 100.' },
        changes: { eu: 'Indizea: 1 ± p : 100. Kateatuak: biderkatu indizeak. I = C · r · t : 100.', es: 'Índice: 1 ± p : 100. Encadenados: multiplica los índices. I = C · r · t : 100.', en: 'Multiplier: 1 ± p : 100. Chained: multiply the multipliers. I = C · r · t : 100.', ar: 'المؤشر: 1 ± p : 100. المتتالية: اضرب المؤشرات. I = C · r · t : 100.' }
    }
}

export function ProportzionaltasunaDbh2IntroPage() {
    return <UnitPage unit={proportzionaltasunaDbh2Unit} />
}
