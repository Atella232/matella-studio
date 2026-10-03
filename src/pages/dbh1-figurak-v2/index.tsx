import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readFiguresAnswer } from './answers'
import { figuresChallenges, figuresDiagnostic, figuresExerciseBank, figuresPractice } from './content'
import { FiguresHeroArt } from './figures'
import { FiguresLaboratory } from './lab'
import { figuresLabChallengeIds, figuresLabToolForTopic, figuresLabTools } from './lab/labTools'
import { figuresStages, figuresTopics } from './lessons'

const figurakUnit: UnitDefinition = {
    storagePrefix: 'matella-figurak-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Irudi lauak', es: 'Figuras planas', ar: 'الأشكال المستوية' },
    documentTitle: { eu: 'Irudi lauak · 1. DBH', es: 'Figuras planas · 1.º ESO', ar: 'الأشكال المستوية · الصف الأول' },
    tagline: {
        eu: 'Diagonalak, lauzak, triangeluen zentroak, simetriak, zirkunferentziak eta irudi konposatuak: irudi lauak sakonago.',
        es: 'Diagonales, baldosas, centros del triángulo, simetrías, circunferencias y figuras compuestas: las figuras planas a fondo.',
        ar: 'الأقطار والبلاط ومراكز المثلث والتناظر والدوائر والأشكال المركّبة: الأشكال المستوية بعمق.'
    },
    heroArt: <FiguresHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, diagonaletatik azalera konposatuetara', es: 'Cinco etapas, de las diagonales a las áreas compuestas', ar: 'خمس مراحل، من الأقطار إلى المساحات المركّبة' },
    stages: figuresStages,
    topics: figuresTopics,
    diagnostic: figuresDiagnostic,
    guidedPractice: figuresPractice,
    exerciseBank: figuresExerciseBank,
    challenges: figuresChallenges,
    lab: {
        description: { eu: `${figuresLabTools.length} tresna irudi lauak ukitzeko: poligonoak, lauzak, triangeluak eta haien zentroak, laukiak, zirkunferentziak, sektoreak eta L formako irudiak, erronkekin.`, es: `${figuresLabTools.length} herramientas para tocar las figuras planas: polígonos, baldosas, triángulos y sus centros, cuadriláteros, circunferencias, sectores y figuras en L, con retos.`, ar: `${figuresLabTools.length} أدوات للمس الأشكال المستوية: المضلعات والبلاط والمثلثات ومراكزها والرباعيات والدوائر والقطاعات والأشكال L، مع تحديات.` },
        progressIds: figuresLabChallengeIds,
        toolForTopic: figuresLabToolForTopic,
        render: (props) => <FiguresLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (18,84 edo 18.84). Angeluetan, gradu-kopurua bakarrik (° gabe ere bai). Erabili π ≈ 3,14.', es: 'Escribe un número, con coma o con punto (18,84 o 18.84). En los ángulos, solo los grados (también sin °). Usa π ≈ 3,14.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (18.84). وفي الزوايا اكتب عدد الدرجات فقط (ويمكن دون °). استعمل π ≈ 3.14.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readFiguresAnswer,
        placeholder: () => ({ eu: 'Adib.: 135', es: 'Ej.: 135', ar: 'مثال: 135' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 135 edo 18,84.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 135 o 18,84.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 135 أو 18.84.' }
    },
    errorByStage: {
        polygons: { eu: 'Diagonalak: n · (n − 3) : 2. Angeluen batura: (n − 2) · 180°. Erregularra: batura : n.', es: 'Diagonales: n · (n − 3) : 2. Suma de ángulos: (n − 2) · 180°. Regular: suma : n.', ar: 'الأقطار: n · (n − 3) : 2. مجموع الزوايا: (n − 2) · 180°. المنتظم: المجموع : n.' },
        triangles: { eu: 'Alde handiena < beste bien batura. Isoszelea: oinarriko angeluak berdinak.', es: 'Lado mayor < suma de los otros dos. Isósceles: ángulos de la base iguales.', ar: 'الضلع الأكبر < مجموع الآخرين. متساوي الساقين: زاويتا القاعدة متساويتان.' },
        quadrilaterals: { eu: 'Laukia: 360°. Paralelogramoa: aurkakoak berdinak, ondokoek 180°.', es: 'Cuadrilátero: 360°. Paralelogramo: opuestos iguales, consecutivos 180°.', ar: 'الرباعي: 360°. متوازي الأضلاع: المتقابلة متساوية والمتتالية 180°.' },
        circles: { eu: 'Konparatu d honekin: r, r₁ + r₂ eta r₁ − r₂. Inskribatua = zentrala : 2.', es: 'Compara d con r, r₁ + r₂ y r₁ − r₂. Inscrito = central : 2.', ar: 'قارن d بـ r وr₁ + r₂ وr₁ − r₂. المحيطية = المركزية : 2.' },
        areas: { eu: 'Zatitu eta batu, edo osatu eta kendu. Sektorea: zirkulua · α : 360.', es: 'Divide y suma, o completa y resta. Sector: círculo · α : 360.', ar: 'قسّم واجمع، أو أكمل واطرح. القطاع: القرص · α : 360.' }
    }
}

export function FigurakIntroPage() {
    return <UnitPage unit={figurakUnit} />
}
