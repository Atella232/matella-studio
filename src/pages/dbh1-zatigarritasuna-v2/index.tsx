import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import '../dbh2-zatigarritasuna/Zatigarritasuna.css'
import { DivisibilityIntroHeroArt } from './figures'
import { divisibilityIntroStages, divisibilityIntroTopics } from './lessons'

const zatigarritasunaIntroUnit: UnitDefinition = {
    storagePrefix: 'matella-zatigarritasuna-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Zatigarritasuna', es: 'Divisibilidad', ar: 'قابلية القسمة' },
    documentTitle: { eu: 'Zatigarritasuna · 1. DBH', es: 'Divisibilidad · 1.º ESO', ar: 'قابلية القسمة · الصف الأول' },
    tagline: {
        eu: 'Arkatzak poltsetan, ikasleak taldeetan eta igerilekuko egunak: ikasi multiploak eta zatitzaileak aurkitzen, zenbakiak deskonposatzen eta ZKH eta MKT erabiltzen.',
        es: 'Lápices en bolsas, alumnos en grupos y días de piscina: aprende a encontrar múltiplos y divisores, a descomponer números y a usar el m.c.d. y el m.c.m.',
        ar: 'أقلام في أكياس وتلاميذ في مجموعات وأيام المسبح: تعلّم إيجاد المضاعفات والقواسم وتحليل الأعداد واستعمال ق.م.أ وم.م.أ.'
    },
    heroArt: <DivisibilityIntroHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zatiketa zehatzetik ZKH eta MKTko buruketetara', es: 'Cinco etapas, de la división exacta a los problemas de m.c.d. y m.c.m.', ar: 'خمس مراحل، من القسمة التامة إلى مسائل ق.م.أ وم.م.أ' },
    stages: divisibilityIntroStages,
    topics: divisibilityIntroTopics,
    answers: {
        note: { eu: 'Idatzi emaitza zenbaki gisa, adibidez 12.', es: 'Escribe el resultado como un número, por ejemplo 12.', ar: 'اكتب النتيجة عددًا، مثل 12.' },
        defaultForm: 'simplified',
        inputMode: 'numeric',
        placeholder: () => ({ eu: 'Adib.: 12', es: 'Ej.: 12', ar: 'مثال: 12' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki oso gisa.', es: 'El valor es correcto, pero escríbelo como número entero.', ar: 'القيمة صحيحة، لكن اكتبها عددًا صحيحًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 12.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 12.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 12.' }
    },
    errorByStage: {
        multiples: { eu: 'Multiploak lortzeko biderkatu; zatitzaileak lortzeko, bilatu hondarra 0 duten zatiketak.', es: 'Para múltiplos, multiplica; para divisores, busca divisiones con resto 0.', ar: 'للمضاعفات اضرب، وللقواسم ابحث عن القسمة التي باقيها 0.' },
        criteria: { eu: 'Berrikusi irizpidea: azken zifra (2, 5, 10) edo zifren batura (3, 9).', es: 'Repasa el criterio: última cifra (2, 5, 10) o suma de cifras (3, 9).', ar: 'راجع القاعدة: الرقم الأخير (2، 5، 10) أو مجموع الأرقام (3، 9).' },
        primes: { eu: 'Zatitu lehen txikienetik hasita (2, 3, 5, 7…), eta egiaztatu biderkagai guztiak lehenak direla.', es: 'Divide empezando por el primo más pequeño (2, 3, 5, 7…) y comprueba que todos los factores son primos.', ar: 'اقسم بدءًا بأصغر عدد أولي (2، 3، 5، 7…) وتحقق أن كل العوامل أولية.' },
        'gcd-lcm': { eu: 'ZKH: zatitzaile komunetako handiena. MKT: multiplo komunetako txikiena.', es: 'm.c.d.: el mayor de los divisores comunes. m.c.m.: el menor de los múltiplos comunes.', ar: 'ق.م.أ: أكبر القواسم المشتركة. م.م.أ: أصغر المضاعفات المشتركة.' },
        problems: { eu: 'Erabaki lehenik: banatu (ZKH) ala bat etorri (MKT)? Eta eman emaitza unitateekin.', es: 'Decide primero: ¿repartir (m.c.d.) o coincidir (m.c.m.)? Y da el resultado con unidades.', ar: 'قرّر أولًا: توزيع (ق.م.أ) أم تزامن (م.م.أ)؟ ثم اكتب النتيجة مع الوحدات.' }
    }
}

export function ZatigarritasunaIntroPage() {
    return <UnitPage unit={zatigarritasunaIntroUnit} />
}
