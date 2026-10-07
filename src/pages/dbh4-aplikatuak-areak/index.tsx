import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readSolidsAnswer } from '../dbh2-gorputzak-v2/answers'
import { areasVolumesChallenges, areasVolumesDiagnostic, areasVolumesExerciseBank, areasVolumesPractice } from './content'
import { AreasVolumesHeroArt } from './figures'
import { AreasVolumesLaboratory } from './lab'
import { areasVolumesLabChallengeIds, areasVolumesLabToolForTopic, areasVolumesLabTools } from './lab/labTools'
import { areasVolumesStages, areasVolumesTopics } from './lessons'

const areakUnit: UnitDefinition = {
    storagePrefix: 'matella-areak-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Perimetroak, azalerak eta bolumenak', es: 'Perímetros, áreas y volúmenes', ar: 'المحيطات والمساحات والأحجام' },
    documentTitle: { eu: 'Perimetroak, azalerak eta bolumenak · 4. DBH', es: 'Perímetros, áreas y volúmenes · 4.º ESO', ar: 'المحيطات والمساحات والأحجام · الصف الرابع' },
    tagline: {
        eu: 'Poligonoetatik gorputzetara: angeluak eta triangeluak, zirkunferentzia, Pitagoras problemetan, irudi lau eta konposatuen azalerak, prismen, piramideen eta biraketa-gorputzen azalerak eta bolumenak, litroetaraino.',
        es: 'De los polígonos a los cuerpos: ángulos y triángulos, la circunferencia, Pitágoras en problemas, áreas de figuras planas y compuestas, áreas y volúmenes de prismas, pirámides y cuerpos de revolución, hasta los litros.',
        ar: 'من المضلعات إلى الأجسام: الزوايا والمثلثات، والدائرة، وفيثاغورس في المسائل، ومساحات الأشكال المستوية والمركّبة، ومساحات المناشير والأهرامات والأجسام الدورانية وحجومها حتى اللترات.'
    },
    heroArt: <AreasVolumesHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, poligonoetatik gorputz konposatuen bolumenera', es: 'Cinco etapas, de los polígonos al volumen de los cuerpos compuestos', ar: 'خمس مراحل، من المضلعات إلى حجم الأجسام المركّبة' },
    stages: areasVolumesStages,
    topics: areasVolumesTopics,
    diagnostic: areasVolumesDiagnostic,
    guidedPractice: areasVolumesPractice,
    exerciseBank: areasVolumesExerciseBank,
    challenges: areasVolumesChallenges,
    lab: {
        description: { eu: `${areasVolumesLabTools.length} tresna: poligonoen angeluak, triangeluak sailkatzea, arkuak, Pitagoras eta triangelu ezkutuak, poligono erregularrak, sektoreak, kaxa, piramidea, biraketa-gorputzak, bolumenak eta gorputz konposatuak, erronkekin.`, es: `${areasVolumesLabTools.length} herramientas: ángulos de polígonos, clasificar triángulos, arcos, Pitágoras y triángulos escondidos, polígonos regulares, sectores, la caja, la pirámide, cuerpos de revolución, volúmenes y cuerpos compuestos, con retos.`, ar: `${areasVolumesLabTools.length} أداة: زوايا المضلعات، وتصنيف المثلثات، والأقواس، وفيثاغورس والمثلثات المخفية، والمضلعات المنتظمة، والقطاعات، والصندوق، والهرم، والأجسام الدورانية، والحجوم، والأجسام المركّبة، مع تحديات.` },
        progressIds: areasVolumesLabChallengeIds,
        toolForTopic: areasVolumesLabToolForTopic,
        render: (props) => <AreasVolumesLaboratory {...props} />
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
        polygons: { eu: 'Barne-angeluak: 180° · (n − 2). Zirkunferentzia: 2πr; diametroa ematen badute, erdia hartu.', es: 'Ángulos interiores: 180° · (n − 2). Circunferencia: 2πr; si dan el diámetro, toma la mitad.', ar: 'الزوايا الداخلية: 180° · (n − 2). الدائرة: 2πr؛ وإذا أُعطي القطر فخذ نصفه.' },
        pythagoras: { eu: 'Hipotenusa angelu zuzenaren aurrean dago. Hipotenusa: batu karratuak; katetoa: kendu.', es: 'La hipotenusa está enfrente del ángulo recto. Hipotenusa: suma los cuadrados; cateto: resta.', ar: 'الوتر مقابل الزاوية القائمة. الوتر: اجمع المربعين؛ الضلع القائم: اطرح.' },
        'plane-areas': { eu: 'Triangelua eta erronboa: zati bi. Zirkulua: πr², ez 2πr. Unitate berean jarri datu guztiak.', es: 'Triángulo y rombo: entre dos. Círculo: πr², no 2πr. Pon todos los datos en la misma unidad.', ar: 'المثلث والمعيّن: على اثنين. القرص: πr² لا 2πr. ضع جميع المعطيات بالوحدة نفسها.' },
        'solid-areas': { eu: 'Marraztu garapena: alboko aurpegiak gehi oinarriak. Piramidean apotema, konoan sortzailea.', es: 'Dibuja el desarrollo: caras laterales más bases. En la pirámide, la apotema; en el cono, la generatriz.', ar: 'ارسم النشر: الأوجه الجانبية مع القواعد. في الهرم العامد، وفي المخروط الراسم.' },
        volumes: { eu: 'Prisma eta zilindroa: oinarria · altuera. Piramidea eta konoa: zati 3. 1 dm³ = 1 L.', es: 'Prisma y cilindro: base · altura. Pirámide y cono: entre 3. 1 dm³ = 1 L.', ar: 'المنشور والأسطوانة: القاعدة · الارتفاع. الهرم والمخروط: على 3. 1 dm³ = 1 L.' }
    }
}

export function AreakDbh4ApIntroPage() {
    return <UnitPage unit={areakUnit} />
}
