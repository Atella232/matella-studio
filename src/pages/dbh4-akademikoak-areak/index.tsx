import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readSimilarityAnswer } from '../dbh4-aplikatuak-antzekotasuna/answers'
import { areasSimilarityChallenges, areasSimilarityDiagnostic, areasSimilarityExerciseBank, areasSimilarityPractice } from './content'
import { AreasSimilarityHeroArt } from './figures'
import { areasSimilarityStages, areasSimilarityTopics } from './lessons'

const areakUnit: UnitDefinition = {
    storagePrefix: 'matella-areak-dbh4ak',
    coursePath: '/matematika/dbh4-akademikoak',
    courseTitle: { eu: '4. DBH · Akademikoak', es: '4.º ESO · Académicas', ar: 'الصف الرابع · الأكاديمية' },
    title: { eu: 'Azalerak, bolumenak eta antzekotasuna', es: 'Áreas, volúmenes y semejanza', ar: 'المساحات والأحجام والتشابه' },
    documentTitle: { eu: 'Azalerak, bolumenak eta antzekotasuna · 4. DBH', es: 'Áreas, volúmenes y semejanza · 4.º ESO', ar: 'المساحات والأحجام والتشابه · الصف الرابع' },
    tagline: {
        eu: 'Poligono erregularrak eta apotema, sektoreak, koroak eta segmentuak, poliedroen eta gorputz biribilen azalerak eta bolumenak, Tales eta triangelu antzekoak, altueraren eta katetoaren teoremak, enborrak, eta k, k² eta k³ eskaletan.',
        es: 'Polígonos regulares y apotema, sectores, coronas y segmentos, áreas y volúmenes de poliedros y cuerpos redondos, Tales y triángulos semejantes, los teoremas de la altura y del cateto, los troncos, y k, k² y k³ en las escalas.',
        ar: 'المضلعات المنتظمة والعامد، والقطاعات والحلقات والقطع، ومساحات وحجوم متعددات الأوجه والأجسام الدورانية، وطاليس والمثلثات المتشابهة، ومبرهنتا الارتفاع والضلع القائم، والجذوع، وk وk² وk³ في المقاييس.'
    },
    heroArt: <AreasSimilarityHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, apotematik maketetara', es: 'Cinco etapas, de la apotema a las maquetas', ar: 'خمس مراحل، من العامد إلى المجسّمات' },
    stages: areasSimilarityStages,
    topics: areasSimilarityTopics,
    diagnostic: areasSimilarityDiagnostic,
    guidedPractice: areasSimilarityPractice,
    exerciseBank: areasSimilarityExerciseBank,
    challenges: areasSimilarityChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (263,76 edo 263.76), unitaterik gabe. Erabili π ≈ 3,14.', es: 'Escribe un número, con coma o con punto (263,76 o 263.76), sin la unidad. Usa π ≈ 3,14.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (263.76) دون الوحدة. استعمل π ≈ 3.14.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readSimilarityAnswer,
        placeholder: () => ({ eu: 'Adib.: 263,76', es: 'Ej.: 263,76', ar: 'مثال: 263.76' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 48 edo 113,04.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 48 o 113,04.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 48 أو 113.04.' }
    },
    errorByStage: {
        'plane-areas': { eu: 'Apotema: erradioa hipotenusa da. Sektorea: osoaren n/360. Koroa: karratuak kendu, ez erradioak.', es: 'Apotema: el radio es la hipotenusa. Sector: n/360 del total. Corona: resta los cuadrados, no los radios.', ar: 'العامد: نصف القطر هو الوتر. القطاع: n/360 من الكل. الحلقة: اطرح المربعات لا أنصاف الأقطار.' },
        'solid-areas': { eu: 'Piramidean apotema, konoan sortzailea, ez altuera. Esfera: 4πr². Elkarguneak ez dira zenbatzen.', es: 'En la pirámide, la apotema; en el cono, la generatriz; no la altura. Esfera: 4πr². Las uniones no cuentan.', ar: 'في الهرم العامد وفي المخروط الراسم لا الارتفاع. الكرة: 4πr². ومواضع الالتقاء لا تُحسب.' },
        volumes: { eu: 'Bolumenerako altuera behar da. Piramidea eta konoa: zati 3. Esfera: 4/3 πr³. 1 dm³ = 1 L.', es: 'Para el volumen hace falta la altura. Pirámide y cono: entre 3. Esfera: 4/3 πr³. 1 dm³ = 1 L.', ar: 'يلزم للحجم الارتفاع. الهرم والمخروط: على 3. الكرة: 4/3 πr³. 1 dm³ = 1 L.' },
        similarity: { eu: 'Parekatu alde homologoak ordena berean. Altuera: h² = m · n. Katetoa: bere proiekzioarekin.', es: 'Empareja los lados homólogos en el mismo orden. Altura: h² = m · n. Cateto: con su propia proyección.', ar: 'قابل الأضلاع المتناظرة بالترتيب نفسه. الارتفاع: h² = m · n. الضلع القائم: بمسقطه.' },
        ratios: { eu: 'Luzerak × k, azalerak × k², bolumenak × k³. Enborra: handia ken txikia. Kontuz unitateekin.', es: 'Longitudes × k, áreas × k², volúmenes × k³. Tronco: el grande menos el pequeño. Cuidado con las unidades.', ar: 'الأطوال × k، المساحات × k²، الحجوم × k³. الجذع: الكبير ناقص الصغير. وانتبه للوحدات.' }
    }
}

export function AreakDbh4AkIntroPage() {
    return <UnitPage unit={areakUnit} />
}
