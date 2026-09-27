import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { naturalsChallenges, naturalsDiagnostic, naturalsExerciseBank, naturalsPractice } from './content'
import { NaturalsHeroArt } from './figures'
import { NaturalsLaboratory } from './lab'
import { naturalsLabChallengeIds, naturalsLabToolForTopic, naturalsLabTools } from './lab/labTools'
import { naturalsStages, naturalsTopics } from './lessons'
import { readNaturalAnswer } from './numbers'
import './NaturalNumbers.css'

const zenbakiNaturalakUnit: UnitDefinition = {
    storagePrefix: 'matella-zenbaki-naturalak-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Zenbaki naturalak', es: 'Números naturales', ar: 'الأعداد الطبيعية' },
    documentTitle: { eu: 'Zenbaki naturalak · 1. DBH', es: 'Números naturales · 1.º ESO', ar: 'الأعداد الطبيعية · الصف الأول' },
    tagline: {
        eu: 'Sistema hamartarra, biribiltzea, eragiketak, hierarkia eta berreturak: ikasi zenbaki naturalekin ziur kalkulatzen eta buruketak D-P-E egiturarekin ebazten.',
        es: 'Sistema decimal, redondeo, operaciones, jerarquía y potencias: aprende a calcular con seguridad con números naturales y a resolver problemas con Datos, Procedimiento y Respuesta.',
        ar: 'النظام العشري والتقريب والعمليات والأولوية والقوى: تعلّم الحساب بثقة بالأعداد الطبيعية وحل المسائل بالمعطيات والطريقة والجواب.'
    },
    heroArt: <NaturalsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, sistema hamartarretik berreturetara', es: 'Cinco etapas, del sistema decimal a las potencias', ar: 'خمس مراحل، من النظام العشري إلى القوى' },
    stages: naturalsStages,
    topics: naturalsTopics,
    diagnostic: naturalsDiagnostic,
    guidedPractice: naturalsPractice,
    exerciseBank: naturalsExerciseBank,
    challenges: naturalsChallenges,
    lab: {
        description: { eu: `${naturalsLabTools.length} tresna zenbakiak ukitzeko: posizio-taula, zuzena, erromatarrak, biribiltzea, laukizuzenak, banaketak, semaforoa eta berreturak.`, es: `${naturalsLabTools.length} herramientas para tocar los números: tabla de posiciones, recta, romanos, redondeo, rectángulos, repartos, semáforo y potencias.`, ar: `${naturalsLabTools.length} أدوات للمس الأعداد: جدول المراتب والمستقيم والأرقام الرومانية والتقريب والمستطيلات والتوزيع وإشارة المرور والقوى.` },
        progressIds: naturalsLabChallengeIds,
        toolForTopic: naturalsLabToolForTopic,
        render: (props) => <NaturalsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi emaitza zenbaki gisa, adibidez 44 edo 15.000.', es: 'Escribe el resultado como un número, por ejemplo 44 o 15.000.', ar: 'اكتب النتيجة عددًا، مثل 44 أو 15.000.' },
        defaultForm: 'simplified',
        inputMode: 'numeric',
        normalizeInput: readNaturalAnswer,
        placeholder: () => ({ eu: 'Adib.: 44', es: 'Ej.: 44', ar: 'مثال: 44' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki natural gisa.', es: 'El valor es correcto, pero escríbelo como número natural.', ar: 'القيمة صحيحة، لكن اكتبها عددًا طبيعيًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 44.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 44.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 44.' }
    },
    errorByStage: {
        numbering: { eu: 'Begiratu zifra bakoitzaren posizioa: ezkerrerago dagoen zifrak 10 aldiz gehiago balio du.', es: 'Mira la posición de cada cifra: una posición más a la izquierda vale 10 veces más.', ar: 'انظر إلى موقع كل رقم: كل موقع إلى اليسار يساوي 10 أضعاف.' },
        rounding: { eu: 'Begiratu biribildu beharreko zifraren eskuineko zifrari: 5etik gora, gehitu 1.', es: 'Mira la cifra a la derecha de la que redondeas: de 5 en adelante, suma 1.', ar: 'انظر إلى الرقم الذي على يمين الرقم المقرَّب: من 5 فما فوق أضف 1.' },
        operations: { eu: 'Egiaztatu alderantzizko eragiketarekin: kenketa batuketarekin, zatiketa biderketarekin.', es: 'Comprueba con la operación inversa: la resta con una suma, la división con una multiplicación.', ar: 'تحقّق بالعملية العكسية: الطرح بالجمع، والقسمة بالضرب.' },
        combined: { eu: 'Semaforoa: lehenik parentesiak, gero · eta :, azkenik + eta −.', es: 'Semáforo: primero paréntesis, luego · y :, al final + y −.', ar: 'إشارة المرور: الأقواس أولًا، ثم · و:، وأخيرًا + و−.' },
        powers: { eu: 'Berretzaileak zenbat aldiz biderkatzen den adierazten du; ez biderkatu oinarria eta berretzailea.', es: 'El exponente indica cuántas veces se multiplica la base; no multipliques base por exponente.', ar: 'الأسّ يدل على عدد مرات ضرب الأساس؛ لا تضرب الأساس في الأس.' }
    }
}

export function ZenbakiNaturalakPage() {
    return <UnitPage unit={zenbakiNaturalakUnit} />
}
