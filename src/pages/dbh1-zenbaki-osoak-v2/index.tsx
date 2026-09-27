import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import '../dbh2-zenbaki-osoak/ZenbakiOsoak.css'
import { IntegersIntroHeroArt } from './figures'
import { integerIntroStages, integerIntroTopics } from './lessons'
import './IntegersIntro.css'

const zenbakiOsoakIntroUnit: UnitDefinition = {
    storagePrefix: 'matella-zenbaki-osoak-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Zenbaki osoak', es: 'Números enteros', ar: 'الأعداد الصحيحة' },
    documentTitle: { eu: 'Zenbaki osoak · 1. DBH', es: 'Números enteros · 1.º ESO', ar: 'الأعداد الصحيحة · الصف الأول' },
    tagline: {
        eu: 'Sotoak, zero azpiko tenperaturak eta zorrak: ikasi zenbaki negatiboak ulertzen, zuzenean ordenatzen eta haiekin batu, kendu, biderkatu eta zatitzen.',
        es: 'Sótanos, temperaturas bajo cero y deudas: aprende a entender los números negativos, a ordenarlos en la recta y a sumar, restar, multiplicar y dividir con ellos.',
        ar: 'أقبية ودرجات حرارة تحت الصفر وديون: تعلّم فهم الأعداد السالبة وترتيبها على المستقيم وجمعها وطرحها وضربها وقسمتها.'
    },
    heroArt: <IntegersIntroHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, egoera errealetatik zeinuen araura', es: 'Cinco etapas, de las situaciones reales a la regla de los signos', ar: 'خمس مراحل، من المواقف الحقيقية إلى قاعدة الإشارات' },
    stages: integerIntroStages,
    topics: integerIntroTopics,
    answers: {
        note: { eu: 'Idatzi emaitza zenbaki oso gisa: −7, 12 edo +12.', es: 'Escribe el resultado como número entero: −7, 12 o +12.', ar: 'اكتب النتيجة عددًا صحيحًا: ⁦−7⁩ أو 12 أو ⁦+12⁩.' },
        defaultForm: 'simplified',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −7', es: 'Ej.: −7', ar: 'مثال: ⁦−7⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki oso gisa.', es: 'El valor es correcto, pero escríbelo como número entero.', ar: 'القيمة صحيحة، لكن اكتبها عددًا صحيحًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki oso bat, adibidez −7 edo 12.', es: 'No entiendo esa respuesta. Escribe un número entero, por ejemplo −7 o 12.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا صحيحًا، مثل ⁦−7⁩ أو 12.' }
    },
    errorByStage: {
        meaning: { eu: 'Pentsatu egoera zerotik gora ala behera dagoen, eta aukeratu zeinua.', es: 'Piensa si la situación está por encima o por debajo de cero y elige el signo.', ar: 'فكّر هل الموقف فوق الصفر أم تحته واختر الإشارة.' },
        line: { eu: 'Irudikatu zuzenean: eskuinerago dagoena da handiagoa.', es: 'Imagínalo en la recta: es mayor el que está más a la derecha.', ar: 'تخيّله على المستقيم: الأكبر هو الأبعد نحو اليمين.' },
        absolute: { eu: 'Balio absolutua distantzia da (ez da inoiz negatiboa); aurkakoa lortzeko zeinua aldatu.', es: 'El valor absoluto es una distancia (nunca negativa); para el opuesto, cambia el signo.', ar: 'القيمة المطلقة مسافة (ليست سالبة أبدًا)؛ وللمعاكس غيّر الإشارة.' },
        addsub: { eu: 'Zeinu bera: batu. Zeinu desberdinak: kendu eta irabazlearen zeinua. Kentzea = aurkakoa batzea.', es: 'Mismo signo: suma. Distinto signo: resta y signo del que gana. Restar = sumar el opuesto.', ar: 'الإشارة نفسها: اجمع. مختلفتان: اطرح وضع إشارة الغالب. الطرح = جمع المعاكس.' },
        muldiv: { eu: 'Zeinuen araua: zeinu bera → +, zeinu desberdinak → −.', es: 'Regla de los signos: mismo signo → +, signos distintos → −.', ar: 'قاعدة الإشارات: الإشارة نفسها ← +، مختلفتان ← −.' }
    }
}

export function ZenbakiOsoakIntroPage() {
    return <UnitPage unit={zenbakiOsoakIntroUnit} />
}
