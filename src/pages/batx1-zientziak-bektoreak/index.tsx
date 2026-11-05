import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readVectorsAnswer } from '../dbh4-akademikoak-bektoreak/answers'
import { bachVectorsChallenges, bachVectorsDiagnostic, bachVectorsExerciseBank, bachVectorsPractice } from './content'
import { BachVectorsHeroArt } from './figures'
import { BachVectorsGames } from './games'
import { BACH_VECTORS_GAME_RECORDS_KEY, bachVectorsGameProgressIds } from './games/info'
import { BachVectorsLaboratory } from './lab'
import { bachVectorsLabChallengeIds, bachVectorsLabToolForTopic, bachVectorsLabTools } from './lab/labTools'
import { bachVectorsStages, bachVectorsTopics } from './lessons'

const bektoreakBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-bektoreak-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Bektoreak', es: 'Vectores', en: 'Vectors', ar: 'المتجهات' },
    documentTitle: { eu: 'Bektoreak · Batxilergoa 1', es: 'Vectores · 1.º Bachillerato', en: 'Vectors · 1st Bachillerato', ar: 'المتجهات · البكالوريا الأولى' },
    tagline: {
        eu: 'Bektore finkoak eta askeak, konbinazio lineala eta oinarriak, biderkadura eskalarra, modulua, angelua eta perpendikulartasuna, proiekzioak, eta indarrak eta abiadurak.',
        es: 'Vectores fijos y libres, combinación lineal y bases, el producto escalar, módulo, ángulo y perpendicularidad, proyecciones, y fuerzas y velocidades.',
        en: 'Fixed and free vectors, linear combinations and bases, the dot product, magnitude, angle and perpendicularity, projections, and forces and velocities.',
        ar: 'المتجهات المقيّدة والحرة، والتركيب الخطي والأساسات، والجداء السلمي، والطول والزاوية والتعامد، والإسقاطات، والقوى والسرعات.'
    },
    heroArt: <BachVectorsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, geziatik biderkadura eskalarrera', es: 'Cinco etapas, de la flecha al producto escalar', en: 'Five stages, from the arrow to the dot product', ar: 'خمس مراحل، من السهم إلى الجداء السلمي' },
    stages: bachVectorsStages,
    topics: bachVectorsTopics,
    diagnostic: bachVectorsDiagnostic,
    guidedPractice: bachVectorsPractice,
    exerciseBank: bachVectorsExerciseBank,
    challenges: bachVectorsChallenges,
    lab: {
        description: {
            eu: `${bachVectorsLabTools.length} tresna, erronkekin: sare okerra, itzala eta txalupa eta ibaia, berriak; eta 4. DBHko A-tik B-rako bektorea eta a · u + b · v konbinazioa.`,
            es: `${bachVectorsLabTools.length} herramientas con retos: la cuadrícula torcida, la sombra y el barco y el río, nuevas; y de 4.º ESO, el vector de A a B y la combinación a · u + b · v.`,
            en: `${bachVectorsLabTools.length} tools with challenges: the skew grid, the shadow and the boat and the river, new; and from 4th ESO, the vector from A to B and the combination a · u + b · v.`,
            ar: `${bachVectorsLabTools.length} أدوات مع تحديات: الشبكة المائلة والظل والقارب والنهر، وهي جديدة؛ ومن الصف الرابع: المتجه من A إلى B والتركيب a · u + b · v.`
        },
        progressIds: bachVectorsLabChallengeIds,
        toolForTopic: bachVectorsLabToolForTopic,
        render: (props) => <BachVectorsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, zenbakia ala bektorea?, biderkadurak poligonoan, bektoreen detektibea eta memoria, berriak; eta 4. DBHko bektore-jauzia eta aurkitu k.',
            es: 'Siete juegos: carrera, ¿número o vector?, productos en el polígono, detective de vectores y memoria, nuevos; y de 4.º ESO, el salto del vector y encuentra k.',
            en: 'Seven games: race, number or vector?, products in the polygon, vectors detective and memory, new; and from 4th ESO, the vector jump and find k.',
            ar: 'سبع ألعاب: السباق وعدد أم متجه؟ والجداءات في المضلع ومخبر المتجهات والذاكرة، وهي جديدة؛ ومن الصف الرابع: قفزة المتجه وأوجد k.'
        },
        progressIds: bachVectorsGameProgressIds,
        recordsKey: BACH_VECTORS_GAME_RECORDS_KEY,
        render: (props) => <BachVectorsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bakar bat: eskatzen den koordenatua, modulua, biderkadura eskalarra, angelua gradutan edo parametroa. Adibidez 5, −3, 2,5 edo 3/5.', es: 'Escribe un solo número: la coordenada, el módulo, el producto escalar, el ángulo en grados o el parámetro que se pide. Por ejemplo 5, −3, 2,5 o 3/5.', en: 'Write a single number: the coordinate, magnitude, dot product, angle in degrees or parameter that is asked for. For example 5, −3, 2.5 or 3/5.', ar: 'اكتب عددًا واحدًا: المركّبة أو الطول أو الجداء السلمي أو الزاوية بالدرجات أو الوسيط المطلوب. مثلًا 5 أو ⁦−3⁩ أو 2.5 أو 3/5.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readVectorsAnswer,
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', en: 'e.g. −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', en: 'The value is correct, but write it as a number.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bakar bat, adibidez −3, 2,5 edo 3/5.', es: 'No entiendo esa respuesta. Escribe un solo número, por ejemplo −3, 2,5 o 3/5.', en: 'I don\'t understand that answer. Write a single number, for example −3, 2.5 or 3/5.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا واحدًا، مثل ⁦−3⁩ أو 2.5 أو 3/5.' }
    },
    errorByStage: {
        vectors: { eu: 'Koordenatuak: muturra ken jatorria, ez alderantziz. Zenbaki batez biderkatzean, bi koordenatuak.', es: 'Coordenadas: extremo menos origen, no al revés. Por un número se multiplican las dos coordenadas.', en: 'Coordinates: end point minus start point, not the other way round. A number multiplies both coordinates.', ar: 'المركّبتان: الطرف ناقص الأصل لا العكس. والعدد يضرب المركّبتين معًا.' },
        bases: { eu: 'Oinarri bateko koordenatuak sistema batetik ateratzen dira: ez dira bektorearen koordenatu kanonikoak. Paraleloak ez diren bi bektorek bakarrik osatzen dute oinarria.', es: 'Las coordenadas en una base salen de un sistema: no son las coordenadas canónicas del vector. Solo dos vectores no paralelos forman una base.', en: 'Coordinates in a basis come from a system: they are not the standard coordinates of the vector. Only two non-parallel vectors form a basis.', ar: 'المركّبات في أساس تأتي من نظام: ليست المركّبات القانونية للمتجه. ولا يكوّن أساسًا إلا متجهان غير متوازيين.' },
        dot: { eu: 'Biderkadura eskalarra zenbaki bat da. Angelua bi bektoreak puntu beretik ateratzen direla neurtzen da. |u + v|² garatzean, 2u · v ez ahaztu.', es: 'El producto escalar es un número. El ángulo se mide con los dos vectores saliendo del mismo punto. Al desarrollar |u + v|², no olvides 2u · v.', en: 'The dot product is a number. The angle is measured with both vectors leaving the same point. When you expand |u + v|², do not forget 2u · v.', ar: 'الجداء السلمي عدد. وتُقاس الزاوية والمتجهان خارجان من النقطة نفسها. وعند نشر |u + v|² لا تنسَ 2u · v.' },
        analytic: { eu: 'u₁v₁ + u₂v₂ oinarri ortonormalean bakarrik. Unitarioa: zatitu moduluaz. Kosinu negatiboa: angelu kamutsa. (a, b) bektorearen perpendikularra: (−b, a).', es: 'u₁v₁ + u₂v₂ solo en base ortonormal. Unitario: divide entre el módulo. Coseno negativo: ángulo obtuso. Perpendicular a (a, b): (−b, a).', en: 'u₁v₁ + u₂v₂ only in an orthonormal basis. Unit vector: divide by the magnitude. Negative cosine: obtuse angle. Perpendicular to (a, b): (−b, a).', ar: 'u₁v₁ + u₂v₂ في الأساس المتعامد المتجانس فقط. متجه الوحدة: اقسم على الطول. جيب تمام سالب: زاوية منفرجة. العمودي على (a, b): ‏(−b, a).' },
        applications: { eu: 'Proiekzioa: u · v zati proiektatzen den gaineko bektorearen modulua. Indarrak bektore gisa batzen dira, ez moduluak.', es: 'Proyección: u · v entre el módulo del vector sobre el que se proyecta. Las fuerzas se suman como vectores, no sus módulos.', en: 'Projection: u · v divided by the magnitude of the vector you project onto. Forces add as vectors, not their magnitudes.', ar: 'الإسقاط: u · v مقسومًا على طول المتجه الذي نُسقط عليه. وتُجمع القوى كمتجهات لا أطوالها.' }
    }
}

export function BektoreakBatx1zIntroPage() {
    return <UnitPage unit={bektoreakBatx1zUnit} />
}
