import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { equationsChallenges, equationsDiagnostic, equationsExerciseBank, equationsPractice } from './content'
import { EquationsHeroArt } from './figures'
import { EquationsLaboratory } from './lab'
import { equationsLabChallengeIds, equationsLabToolForTopic, equationsLabTools } from './lab/labTools'
import { equationsStages, equationsTopics } from './lessons'

const ekuazioakUnit: UnitDefinition = {
    storagePrefix: 'matella-ekuazioak-dbh2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Ekuazioak', es: 'Ecuaciones', ar: 'المعادلات' },
    documentTitle: { eu: 'Ekuazioak · 2. DBH', es: 'Ecuaciones · 2.º ESO', ar: 'المعادلات · الصف الثاني' },
    tagline: {
        eu: 'Lehen eta bigarren mailako ekuazioak: ikasi parentesiak eta izendatzaileak dituzten ekuazioak ebazten, buruketak planteatzen eta formula orokorra erabiltzen.',
        es: 'Ecuaciones de primer y segundo grado: aprende a resolver ecuaciones con paréntesis y denominadores, a plantear problemas y a usar la fórmula general.',
        ar: 'معادلات الدرجتين الأولى والثانية: تعلّم حل المعادلات بالأقواس والمقامات وصياغة المسائل واستعمال الصيغة العامة.'
    },
    heroArt: <EquationsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, balantzatik formula orokorrera', es: 'Cinco etapas, de la balanza a la fórmula general', ar: 'خمس مراحل، من الميزان إلى الصيغة العامة' },
    stages: equationsStages,
    topics: equationsTopics,
    diagnostic: equationsDiagnostic,
    guidedPractice: equationsPractice,
    exerciseBank: equationsExerciseBank,
    challenges: equationsChallenges,
    lab: {
        description: { eu: `${equationsLabTools.length} tresna: balioak probatu, urratsez urrats ebatzi, izendatzaileak kendu, buruketak planteatu eta diskriminatzailea, erronkekin.`, es: `${equationsLabTools.length} herramientas: probar valores, resolver paso a paso, quitar denominadores, plantear problemas y el discriminante, con retos.`, ar: `${equationsLabTools.length} أدوات: تجربة القيم والحل خطوة بخطوة وحذف المقامات وصياغة المسائل والمميّز، مع تحديات.` },
        progressIds: equationsLabChallengeIds,
        toolForTopic: equationsLabToolForTopic,
        render: (props) => <EquationsLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi x-ren balioa: 5, −3, 1,2 edo 2/3.', es: 'Escribe el valor de x: 5, −3, 1,2 o 2/3.', ar: 'اكتب قيمة x: 5 أو ⁦−3⁩ أو 1.2 أو 2/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: −3', es: 'Ej.: −3', ar: 'مثال: ⁦−3⁩' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3 edo 2/3.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3 o 2/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2/3.' }
    },
    errorByStage: {
        basics: { eu: 'Ordeztu x eta konparatu bi atalak. Bi ataletan gauza bera eginez, ekuazio baliokidea lortzen da.', es: 'Sustituye la x y compara los dos miembros. Haciendo lo mismo en los dos, se obtiene una ecuación equivalente.', ar: 'عوّض x وقارن الطرفين. بفعل الشيء نفسه في الطرفين نحصل على معادلة مكافئة.' },
        'first-degree': { eu: 'Parentesiak → bildu → laburtu → askatu. Atalez aldatzean, zeinua aldatu.', es: 'Paréntesis → agrupar → reducir → despejar. Al cambiar de miembro, cambia el signo.', ar: 'الأقواس ← الجمع ← التبسيط ← العزل. عند تغيير الطرف تتغيّر الإشارة.' },
        denominators: { eu: 'Biderkatu gai GUZTIAK MKTaz. Zatiki baten aurreko minusak zenbakitzaile osoaren zeinua aldatzen du.', es: 'Multiplica TODOS los términos por el m.c.m. Un menos delante de una fracción cambia el signo de todo el numerador.', ar: 'اضرب كل الحدود في م.م.أ. والناقص قبل الكسر يغيّر إشارة البسط كله.' },
        problems: { eu: 'Erabaki zer den x, planteatu, ebatzi eta egiaztatu enuntziatuan.', es: 'Decide qué es x, plantea, resuelve y comprueba en el enunciado.', ar: 'حدّد ما هو x وصُغ وحلّ وتحقّق في النص.' },
        quadratic: { eu: 'Ordenatu ax² + bx + c = 0 moduan. Δ = b² − 4ac; x = (−b ± √Δ) : 2a.', es: 'Ordena como ax² + bx + c = 0. Δ = b² − 4ac; x = (−b ± √Δ) : 2a.', ar: 'رتّب على شكل ax² + bx + c = 0. Δ = b² − 4ac؛ x = (−b ± √Δ) : 2a.' }
    }
}

export function EkuazioakDBH2Page() {
    return <UnitPage unit={ekuazioakUnit} />
}
