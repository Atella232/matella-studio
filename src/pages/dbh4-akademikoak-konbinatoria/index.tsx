import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readCountAnswer } from './answers'
import { combinatoricsAkChallenges, combinatoricsAkDiagnostic, combinatoricsAkExerciseBank, combinatoricsAkPractice } from './content'
import { CombinatoricsAkHeroArt } from './figures'
import { CombinatoricsAkGames } from './games'
import { COMBINATORICS_AK_GAME_RECORDS_KEY, combinatoricsAkGameProgressIds } from './games/info'
import { CombinatoricsAkLaboratory } from './lab'
import { combinatoricsAkLabChallengeIds, combinatoricsAkLabToolForTopic, combinatoricsAkLabTools } from './lab/labTools'
import { combinatoricsAkStages, combinatoricsAkTopics } from './lessons'

const konbinatoriaUnit: UnitDefinition = {
    storagePrefix: 'matella-konbinatoria-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', en: '4th ESO · Academic', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Konbinatoria', es: 'Combinatoria', en: 'Combinatorics', ar: 'التحليل التوافقي' },
    documentTitle: { eu: 'Konbinatoria · 4. DBH', es: 'Combinatoria · 4.º ESO', en: 'Combinatorics · 4th ESO', ar: 'التحليل التوافقي · الصف الرابع' },
    tagline: {
        eu: 'Zuhaitzak eta biderkaduraren erregela, faktoriala, aldakuntzak errepikapenarekin eta gabe, permutazioak, konbinazioak eta zenbaki konbinatorioak, Tartagliaren triangelua eta problemak.',
        es: 'Árboles y principio del producto, factorial, variaciones con y sin repetición, permutaciones, combinaciones y números combinatorios, el triángulo de Tartaglia y problemas.',
        en: 'Trees and the multiplication principle, factorial, arrangements with and without repetition, permutations, combinations and combinatorial numbers, Tartaglia\'s triangle and problems.',
        ar: 'الأشجار ومبدأ الضرب، والمضروب، والتراتيب مع التكرار ودونه، والتباديل، والتوافيق والأعداد التوافقية، ومثلث تارتاليا، ومسائل.'
    },
    heroArt: <CombinatoricsAkHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zuhaitzetik batzordeetara', es: 'Cinco etapas, del árbol a las comisiones', en: 'Five stages, from the tree to the committees.', ar: 'خمس مراحل، من الشجرة إلى اللجان' },
    stages: combinatoricsAkStages,
    topics: combinatoricsAkTopics,
    diagnostic: combinatoricsAkDiagnostic,
    guidedPractice: combinatoricsAkPractice,
    exerciseBank: combinatoricsAkExerciseBank,
    challenges: combinatoricsAkChallenges,
    lab: {
        description: {
            eu: `${combinatoricsAkLabTools.length} tresna, erronkekin: zuhaitza, faktorialak, laukiak errepikatuz edo errepikatu gabe, letren ordenak, n-tik k aukeratzea, Tartagliaren triangelua eta sareko bideak.`,
            es: `${combinatoricsAkLabTools.length} herramientas con retos: el árbol, los factoriales, las casillas con o sin repetición, los órdenes de letras, elegir k de n, el triángulo de Tartaglia y los caminos en la cuadrícula.`,
            en: `${combinatoricsAkLabTools.length} tools with challenges: the tree, factorials, boxes with or without repetition, orders of letters, choosing k out of n, Tartaglia's triangle and paths on the grid.`,
            ar: `${combinatoricsAkLabTools.length} أدوات مع تحديات: الشجرة، والمضاريب، والخانات مع التكرار أو دونه، وترتيبات الأحرف، واختيار k من n، ومثلث تارتاليا، والمسارات في الشبكة.`
        },
        progressIds: combinatoricsAkLabChallengeIds,
        toolForTopic: combinatoricsAkLabToolForTopic,
        render: (props) => <CombinatoricsAkLaboratory {...props} />
    },
    games: {
        description: { eu: 'Bi joko abiadura eta zehaztasuna entrenatzeko: lasterketa eta memoria.', es: 'Dos juegos para entrenar rapidez y precisión: carrera y memoria.', en: 'Two games to train speed and accuracy: race and memory.', ar: 'لعبتان لتدريب السرعة والدقة: السباق والذاكرة.' },
        progressIds: combinatoricsAkGameProgressIds,
        recordsKey: COMBINATORICS_AK_GAME_RECORDS_KEY,
        render: (props) => <CombinatoricsAkGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki oso bat: 120 edo 40 320 (hutsuneak berdin).', es: 'Escribe un número entero: 120 o 40 320 (los espacios dan igual).', en: 'Write an integer: 120 or 40,320 (spaces don\'t matter).', ar: 'اكتب عددًا صحيحًا: 120 أو 40320.' },
        defaultForm: 'any',
        inputMode: 'numeric',
        normalizeInput: readCountAnswer,
        placeholder: () => ({ eu: 'Adib.: 120', es: 'Ej.: 120', en: 'e.g. 120', ar: 'مثال: 120' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki oso gisa.', es: 'El valor es correcto, pero escríbelo como número entero.', en: 'The value is correct, but write it as an integer.', ar: 'القيمة صحيحة، لكن اكتبها عددًا صحيحًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki oso bat, adibidez 120.', es: 'No entiendo esa respuesta. Escribe un número entero, por ejemplo 120.', en: 'I don\'t understand that answer. Write an integer, for example 120.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا صحيحًا، مثل 120.' }
    },
    errorByStage: {
        counting: { eu: 'Erabakiak «eta» bidez: biderkatu. n! = n · (n − 1)!: sinplifikatu biderkatu baino lehen.', es: 'Decisiones unidas con «y»: multiplica. n! = n · (n − 1)!: simplifica antes de multiplicar.', en: 'Choices joined by ‘and’: multiply. n! = n · (n − 1)!: simplify before multiplying.', ar: 'قرارات مربوطة بـ«و»: اضرب. n! = n · (n − 1)!: اختصر قبل الضرب.' },
        variations: { eu: 'Ordena bai eta errepikatuz: nᵏ. Errepikatu gabe: n-tik beherantz k faktore. Hasi baldintza duen laukitik.', es: 'Con orden y repitiendo: nᵏ. Sin repetir: k factores hacia abajo desde n. Empieza por la casilla con condición.', en: 'With order and repetition: nᵏ. Without repetition: k factors going down from n. Start with the box that has a condition.', ar: 'مع الترتيب والتكرار: nᵏ. دون تكرار: k عاملًا نزولًا من n. ابدأ بالخانة ذات الشرط.' },
        permutations: { eu: 'Guztiak ordenatu: n!. Elkarrekin: bloke bat. Berdinak: zatitu haien faktorialez.', es: 'Ordenar todos: n!. Juntos: un bloque. Iguales: divide entre sus factoriales.', en: 'Arrange all: n!. Together: one block. Identical items: divide by their factorials.', ar: 'ترتيب الكل: n!. معًا: كتلة. المتماثلة: اقسم على مضاريبها.' },
        combinations: { eu: 'Ordenak ez du axola: V zati k!. Simetria: n gain k = n gain n − k.', es: 'Sin orden: V entre k!. Simetría: n sobre k = n sobre n − k.', en: 'Without order: V divided by k!. Symmetry: n choose k = n choose (n − k).', ar: 'دون ترتيب: V على k!. التماثل: n فوق k = n فوق n − k.' },
        problems: { eu: 'Bi galdera: ordenak axola du? Errepika daiteke? Aukeraketak batera: biderkatu; kasu bereiziak: batu.', es: 'Dos preguntas: ¿importa el orden? ¿Se repite? Elecciones a la vez: multiplica; casos separados: suma.', en: 'Two questions: does order matter? Can items repeat? Choices made together: multiply; separate cases: add.', ar: 'سؤالان: هل يهم الترتيب؟ هل يتكرر؟ اختيارات معًا: اضرب؛ حالات منفصلة: اجمع.' }
    }
}

export function KonbinatoriaDbh4AkIntroPage() {
    return <UnitPage unit={konbinatoriaUnit} />
}
