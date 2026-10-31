import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { VectorsHeroArt } from '../dbh4-akademikoak-bektoreak/figures'
import { motions3Challenges, motions3Diagnostic, motions3ExerciseBank, motions3Practice } from './content'
import { Motions3Games } from './games'
import { MOTIONS3_GAME_RECORDS_KEY, motions3GameProgressIds } from './games/info'
import { Motions3Laboratory } from './lab'
import { motions3LabChallengeIds, motions3LabToolForTopic, motions3LabTools } from './lab/labTools'
import { motions3Stages, motions3Topics } from './lessons'

const motionsUnit: UnitDefinition = {
    storagePrefix: 'matella-mugimenduak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Planoko mugimenduak', es: 'Movimientos en el plano', en: 'Transformations in the plane', ar: 'الحركات في المستوى' },
    documentTitle: { eu: 'Planoko mugimenduak · 3. DBH', es: 'Movimientos en el plano · 3.º ESO', en: 'Transformations in the plane · 3rd ESO', ar: 'الحركات في المستوى · الصف الثالث' },
    tagline: {
        eu: 'Bektoreetatik mosaikoetara: lekualdaketak, biraketak, simetriak, bi ispilu, frisoak, mosaikoak eta homoteziak.',
        es: 'De los vectores a los mosaicos: traslaciones, giros, simetrías, dos espejos, frisos, mosaicos y homotecias.',
        en: 'From vectors to tilings: translations, rotations, reflections, two mirrors, friezes, tilings and enlargements.',
        ar: 'من المتجهات إلى التبليطات: الانسحابات والدورانات والتناظرات والمرآتان والأفاريز والتبليطات والتحاكي.'
    },
    heroArt: <VectorsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, bektoreetatik mosaikoetara', es: 'Cinco etapas, de los vectores a los mosaicos', en: 'Five stages, from vectors to tilings', ar: 'خمس مراحل، من المتجهات إلى التبليطات' },
    stages: motions3Stages,
    topics: motions3Topics,
    diagnostic: motions3Diagnostic,
    guidedPractice: motions3Practice,
    exerciseBank: motions3ExerciseBank,
    challenges: motions3Challenges,
    lab: {
        description: {
            eu: `${motions3LabTools.length} tresna: lekualdatu, biratu, ispilua, bi ispilu eta beste lau, erronkekin.`,
            es: `${motions3LabTools.length} herramientas: desliza, gira, el espejo, dos espejos y cuatro más, con retos.`,
            en: `${motions3LabTools.length} tools: slide, turn, the mirror, two mirrors and four more, with challenges.`,
            ar: `${motions3LabTools.length} أدوات: الانسحاب والدوران والمرآة والمرآتان وأربع أخرى، مع تحديات.`
        },
        progressIds: motions3LabChallengeIds,
        toolForTopic: motions3LabToolForTopic,
        render: (props) => <Motions3Laboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, non erortzen da, zer mugimendu da, estaltzen al dute, mugimenduen detektibea eta memoria.',
            es: 'Seis juegos: carrera, dónde cae, qué movimiento es, cubren el plano, el detective de movimientos y memoria.',
            en: 'Six games: race, where it lands, which movement it is, do they tile, the movements detective and memory.',
            ar: 'ست ألعاب: السباق وأين تقع وأي حركة هذه وهل تغطي المستوى ومخبر الحركات والذاكرة.'
        },
        progressIds: motions3GameProgressIds,
        recordsKey: MOTIONS3_GAME_RECORDS_KEY,
        render: (props) => <Motions3Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3 edo 7,5. Graduak eta unitateak gabe.', es: 'Escribe un número: 5, −3 o 7,5. Sin grados ni unidades.', en: 'Write a number: 5, −3 or 7.5. Without degrees or units.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 7.5. دون درجات أو وحدات.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 5 edo −3.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 5 o −3.', en: 'I don\'t understand that answer. Write a number, for example 5 or −3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 5 أو ⁦−3⁩.' }
    },
    errorByStage: {
        vectors: { eu: 'AB: muturra ken jatorria. Modulua: √(a² + b²), ez a + b.', es: 'AB: extremo menos origen. Módulo: √(a² + b²), no a + b.', en: 'AB: end minus start. Length: √(a² + b²), not a + b.', ar: 'AB: النهاية ناقص البداية. الطول: √(a² + b²) لا a + b.' },
        translations: { eu: 'Puntu guztiak bektore berarekin: (x + a, y + b), zeinuekin.', es: 'Todos los puntos con el mismo vector: (x + a, y + b), con sus signos.', en: 'Every point by the same vector: (x + a, y + b), with the signs.', ar: 'كل النقاط بالمتجه نفسه: (x + a, y + b) بالإشارات.' },
        rotations: { eu: '90°: (x, y) → (−y, x). 180°: (−x, −y). Zentrorako distantzia ez da aldatzen.', es: '90°: (x, y) → (−y, x). 180°: (−x, −y). La distancia al centro no cambia.', en: '90°: (x, y) → (−y, x). 180°: (−x, −y). The distance to the centre stays.', ar: '90°: (x, y) → (−y, x). 180°: (−x, −y). البعد عن المركز لا يتغيّر.' },
        reflections: { eu: 'X ardatza: y aldatu. Y ardatza: x aldatu. x = k: 2k − x. Bi ispilu: bikoitza.', es: 'Eje X: cambia la y. Eje Y: la x. x = k: 2k − x. Dos espejos: el doble.', en: 'X axis: change y. Y axis: change x. x = k: 2k − x. Two mirrors: double.', ar: 'محور X: غيّر y. محور Y: غيّر x. x = k: 2k − x. مرآتان: الضعف.' },
        patterns: { eu: 'Mosaikoa: 360° erpinean. Frisoa: n − 1 jauzi. Homotezia: biderkatu k zenbakiaz.', es: 'Mosaico: 360° en el vértice. Friso: n − 1 saltos. Homotecia: multiplica por k.', en: 'Tiling: 360° at the vertex. Frieze: n − 1 jumps. Enlargement: multiply by k.', ar: 'التبليط: 360° عند الرأس. الإفريز: n − 1 قفزة. التحاكي: اضرب في k.' }
    }
}

export function MugimenduakDBH3Page() {
    return <UnitPage unit={motionsUnit} />
}
