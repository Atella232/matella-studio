import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { withGraphs } from '../dbh2-funtzioak-v2/withGraphs'
import '../dbh2-funtzioak-v2/Functions.css'
import { graphsChallenges, graphsDiagnostic, graphsExerciseBank, graphsPractice } from './content'
import { GraphsHeroArt } from './figures'
import { graphsStages, graphsTopics } from './lessons'

const grafikoaUnit: UnitDefinition = {
    storagePrefix: 'matella-grafikoa-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Funtzio baten grafikoa', es: 'Gráfica de una función', ar: 'التمثيل البياني للدالة' },
    documentTitle: { eu: 'Funtzio baten grafikoa · 4. DBH', es: 'Gráfica de una función · 4.º ESO', ar: 'التمثيل البياني للدالة · الصف الرابع' },
    tagline: {
        eu: 'Funtzio elementalak eta haien grafikoak: zuzenak eta haien ekuazioak, parabolak eta erpina, hiperbolak eta asintotak, erroak, esponentzialak eta egoera bakoitzerako eredu egokia.',
        es: 'Las funciones elementales y sus gráficas: rectas y sus ecuaciones, parábolas y su vértice, hipérbolas y asíntotas, raíces, exponenciales y el modelo adecuado para cada situación.',
        ar: 'الدوال الأساسية وبياناتها: المستقيمات ومعادلاتها، والقطوع المكافئة ورؤوسها، والقطوع الزائدة ومقارباتها، والجذور، والدوال الأسية، والنموذج المناسب لكل موقف.'
    },
    heroArt: <GraphsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zuzenetik esponentzialera', es: 'Cinco etapas, de la recta a la exponencial', ar: 'خمس مراحل، من المستقيم إلى الدالة الأسية' },
    stages: graphsStages,
    topics: graphsTopics,
    diagnostic: withGraphs(graphsDiagnostic),
    guidedPractice: withGraphs(graphsPractice),
    exerciseBank: graphsExerciseBank.map((section) => ({ ...section, items: withGraphs(section.items) })),
    challenges: withGraphs(graphsChallenges),
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2, unitaterik gabe.', es: 'Escribe un número: 5, −3, 1,5 o 3/2, sin la unidad.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2، دون الوحدة.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3 o 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 3/2.' }
    },
    errorByStage: {
        linear: { eu: 'y = mx + n zuzenean, m malda da eta n Y ardatzeko ebakidura. X ardatza ebakitzeko, egin y = 0.', es: 'En la recta y = mx + n, m es la pendiente y n el corte con el eje Y. Para el corte con el eje X, haz y = 0.', ar: 'في المستقيم y = mx + n يكون m الميل وn التقاطع مع محور Y. وللتقاطع مع محور X ضع y = 0.' },
        lines: { eu: 'Malda = (y₂ − y₁) / (x₂ − x₁), ordena berean. Gero ordeztu puntu bat n aurkitzeko.', es: 'Pendiente = (y₂ − y₁) / (x₂ − x₁), en el mismo orden. Después sustituye un punto para hallar n.', ar: 'الميل = (y₂ − y₁) / (x₂ − x₁) بالترتيب نفسه. ثم عوّض نقطة لإيجاد n.' },
        quadratic: { eu: 'Erpina x = −b / 2a denean; ordenatua lortzeko ordeztu. Ordeztu beti parentesi artean eta berretura lehenik.', es: 'El vértice está en x = −b / 2a; sustituye para su ordenada. Sustituye siempre entre paréntesis y haz primero la potencia.', ar: 'الرأس عند x = −b / 2a؛ عوّض لإيجاد ترتيبته. عوّض دائمًا بين قوسين واحسب القوة أولًا.' },
        inverse: { eu: 'Alderantzizkoan x · y = k. Asintota bertikala izendatzailea 0 egiten duen x da. Erroaren barrukoa ≥ 0.', es: 'En la inversa x · y = k. La asíntota vertical es la x que anula el denominador. Lo de dentro de la raíz ≥ 0.', ar: 'في العكسية x · y = k. المقارب الرأسي هو x الذي يعدم المقام. ما تحت الجذر ≥ 0.' },
        exponential: { eu: 'y = k · aˣ: k hasierako balioa da (x = 0), a urrats bakoitzeko biderkatzailea. Berretzaile negatiboa: alderantzizkoa.', es: 'y = k · aˣ: k es el valor inicial (x = 0) y a el factor de cada paso. Exponente negativo: el inverso.', ar: 'y = k · aˣ: k القيمة الابتدائية (x = 0) وa عامل كل خطوة. الأس السالب: المقلوب.' }
    }
}

export function GrafikoaDbh4ApIntroPage() {
    return <UnitPage unit={grafikoaUnit} />
}
