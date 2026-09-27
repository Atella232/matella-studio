import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { integerChallenges, integerDiagnostic, integerExerciseBank, integerPractice } from './content'
import { IntegersHeroArt } from './figures'
import { integerStages, integerTopics } from './lessons'
import './ZenbakiOsoak.css'

const zenbakiOsoakUnit: UnitDefinition = {
    storagePrefix: 'matella-zenbaki-osoak-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Zenbaki osoak', es: 'Números enteros', ar: 'الأعداد الصحيحة' },
    documentTitle: { eu: 'Zenbaki osoak · 2. DBH', es: 'Números enteros · 2.º ESO', ar: 'الأعداد الصحيحة · الصف الثاني' },
    tagline: {
        eu: 'Tenperaturak, zorrak, solairuak eta itsas maila: ikasi zenbaki positibo eta negatiboak zuzenean kokatzen, alderatzen eta zeinuak ondo erabiliz kalkulatzen.',
        es: 'Temperaturas, deudas, plantas y nivel del mar: aprende a situar, comparar y calcular con números positivos y negativos sin perder el signo.',
        ar: 'درجات الحرارة والديون والطوابق ومستوى سطح البحر: تعلّم وضع الأعداد الموجبة والسالبة ومقارنتها والحساب بها دون أن تفقد الإشارة.'
    },
    heroArt: <IntegersHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zenbaki negatiboetatik eragiketa konbinatuetara', es: 'Cinco etapas, de los números negativos a las operaciones combinadas', ar: 'خمس مراحل، من الأعداد السالبة إلى العمليات المركبة' },
    stages: integerStages,
    topics: integerTopics,
    diagnostic: integerDiagnostic,
    guidedPractice: integerPractice,
    exerciseBank: integerExerciseBank,
    challenges: integerChallenges,
    answers: {
        note: { eu: 'Idatzi emaitza zenbaki oso gisa: −7, 12 edo +12.', es: 'Escribe el resultado como número entero: −7, 12 o +12.', ar: 'اكتب النتيجة عددًا صحيحًا: ⁦−7⁩ أو 12 أو ⁦+12⁩.' },
        defaultForm: 'simplified',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −7', es: 'Ej.: −7', ar: 'مثال: ⁦−7⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki oso gisa, zatikirik gabe.', es: 'El valor es correcto, pero escríbelo como número entero, sin fracciones.', ar: 'القيمة صحيحة، لكن اكتبها عددًا صحيحًا دون كسور.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki oso bat, adibidez −7 edo 12.', es: 'No entiendo esa respuesta. Escribe un número entero, por ejemplo −7 o 12.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا صحيحًا، مثل ⁦−7⁩ أو 12.' }
    },
    errorByStage: {
        integers: { eu: 'Pentsatu egoera zerotik gora ala behera dagoen, eta aukeratu zeinua.', es: 'Piensa si la situación está por encima o por debajo de cero y elige el signo.', ar: 'فكّر هل الموقف فوق الصفر أم تحته واختر الإشارة.' },
        absolute: { eu: 'Balio absolutua distantzia da (ez da inoiz negatiboa); aurkakoa lortzeko zeinua aldatu.', es: 'El valor absoluto es una distancia (nunca negativa); para el opuesto, cambia el signo.', ar: 'القيمة المطلقة مسافة (ليست سالبة أبدًا)؛ وللمعاكس غيّر الإشارة.' },
        ordering: { eu: 'Irudikatu zenbakiak zuzenean: eskuinean dagoena da handiena.', es: 'Imagina los números en la recta: el que está más a la derecha es el mayor.', ar: 'تخيّل الأعداد على الخط: الواقع إلى اليمين هو الأكبر.' },
        addsub: { eu: 'Kendu parentesiak zeinuak zainduz, eta batu positiboak eta negatiboak bereiz.', es: 'Quita los paréntesis cuidando los signos y suma por separado positivos y negativos.', ar: 'احذف الأقواس مع الانتباه للإشارات، واجمع الموجبة والسالبة كلًا على حدة.' },
        muldiv: { eu: 'Egiaztatu zeinuen araua eta hierarkia: parentesiak, biderketak eta zatiketak, eta azkenik batuketak.', es: 'Revisa la regla de los signos y la jerarquía: paréntesis, productos y cocientes y, al final, sumas.', ar: 'راجع قاعدة الإشارات وأولوية العمليات: الأقواس ثم الضرب والقسمة ثم الجمع.' }
    }
}

export function ZenbakiOsoakPage() {
    return <UnitPage unit={zenbakiOsoakUnit} />
}
