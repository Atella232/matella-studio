import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { programazioaChallenges, programazioaDiagnostic, programazioaExerciseBank, programazioaPractice } from './content'
import { ProgrammingHeroArt } from './HeroArt'
import { ProgramazioaLaboratory } from './lab'
import { programazioaLabChallengeIds, programazioaLabToolForTopic, programazioaLabTools } from './lab/labTools'
import { programazioaTopics } from './lessons'
import { programazioaStages } from './stages'

const programazioaBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-programazioa-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Programazio lineala', es: 'Programación lineal', en: 'Linear programming', ar: 'البرمجة الخطية' },
    documentTitle: { eu: 'Programazio lineala · Batxilergoa 2 · Gizarte', es: 'Programación lineal · 2.º Bachillerato CCSS', en: 'Linear programming · 2nd Bachillerato Social Sciences', ar: 'البرمجة الخطية · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Inekuazioak eta eskualdeak, enuntziatu baten murrizketak, eskualde bideragarria eta haren erpinak, helburu-funtzioa eta maila-zuzenak, soluzio motak eta irabazi handieneko eta kostu txikieneko problemak.',
        es: 'Inecuaciones y regiones, las restricciones de un enunciado, la región factible y sus vértices, la función objetivo y las rectas de nivel, los tipos de solución y problemas de máximo beneficio y mínimo coste.',
        en: 'Inequalities and regions, the constraints of a statement, the feasible region and its vertices, the objective function and level lines, the kinds of solution and problems of greatest profit and least cost.',
        ar: 'المتراجحات والمناطق، وقيود نص المسألة، والمنطقة الممكنة ورؤوسها، ودالة الهدف ومستقيمات المستوى، وأنواع الحلول، ومسائل أكبر ربح وأقل كلفة.'
    },
    heroArt: <ProgrammingHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, inekuazio batetik irabazi handienera', es: 'Cinco etapas, de una inecuación al máximo beneficio', en: 'Five stages, from one inequality to the greatest profit', ar: 'خمس مراحل، من متراجحة إلى أكبر ربح' },
    stages: programazioaStages,
    topics: programazioaTopics,
    diagnostic: programazioaDiagnostic,
    guidedPractice: programazioaPractice,
    exerciseBank: programazioaExerciseBank,
    challenges: programazioaChallenges,
    lab: {
        description: {
            eu: `${programazioaLabTools.length} tresna, erronkekin: eraiki eskualdea eta maila-zuzena, berriak; eta 4. DBHko erdiplanoa eta aurrekontuarekin erostea.`,
            es: `${programazioaLabTools.length} herramientas con retos: construye la región y la recta de nivel, nuevas; y el semiplano y comprar con un presupuesto de 4.º de ESO.`,
            en: `${programazioaLabTools.length} tools with challenges: build the region and the level line, new; and the half-plane and shopping on a budget from 4th of ESO.`,
            ar: `${programazioaLabTools.length} أدوات مع تحديات: ابنِ المنطقة ومستقيم المستوى، وهما جديدتان؛ ونصف المستوى والشراء بميزانية من الصف الرابع.`
        },
        progressIds: programazioaLabChallengeIds,
        toolForTopic: programazioaLabToolForTopic,
        render: (props) => <ProgramazioaLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 3/2.', es: 'Escribe un número: 5, −3, 1,5 o 3/2.', en: 'Write a number: 5, −3, 1.5 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 12', es: 'Ej.: 12', en: 'e.g. 12', ar: 'مثال: 12' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 12 edo 2,5.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 12 o 2,5.', en: 'I don\'t understand that answer. Write a number, for example 12 or 2.5.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 12 أو 2.5.' }
    },
    errorByStage: {
        regions: { eu: 'Probatu zuzenean ez dagoen puntu batekin, $(0,0)$ adibidez. «Gehienez» $\\le$ da, eta «gutxienez» $\\ge$.', es: 'Prueba con un punto que no esté en la recta, como $(0,0)$. «Como mucho» es $\\le$ y «al menos» es $\\ge$.', en: 'Test with a point that is not on the line, like $(0,0)$. «At most» is $\\le$ and «at least» is $\\ge$.', ar: 'جرّب بنقطة ليست على المستقيم مثل $(0,0)$. «على الأكثر» هي $\\le$ و«على الأقل» هي $\\ge$.' },
        feasible: { eu: 'Ebaki-puntu bat erpina da murrizketa guztiak betetzen baditu bakarrik. Egiaztatu bakoitza.', es: 'Un corte solo es vértice si cumple todas las restricciones. Compruébalo en cada una.', en: 'A crossing is a vertex only if it satisfies every constraint. Check each one.', ar: 'نقطة التقاطع لا تكون رأسًا إلا إذا حققت كل القيود. تحقق من كل قيد.' },
        objective: { eu: 'Optimoa erpin batean dago: kalkulatu $F$ erpin guztietan, ez bakarrik batean.', es: 'El óptimo está en un vértice: calcula $F$ en todos los vértices, no solo en uno.', en: 'The optimum is at a vertex: work out $F$ at every vertex, not just one.', ar: 'القيمة المثلى عند رأس: احسب $F$ عند كل الرؤوس لا عند رأس واحد.' },
        cases: { eu: 'Bi erpinek balio bera badute, soluzioa anitza da. Eskualdea ez bada ixten, begiratu $F$ hobetzen den norabidea.', es: 'Si dos vértices dan el mismo valor, la solución es múltiple. Si la región no se cierra, mira hacia dónde mejora $F$.', en: 'If two vertices give the same value, the solution is multiple. If the region does not close, look at where $F$ improves.', ar: 'إذا أعطى رأسان القيمة نفسها فالحل متعدد. وإذا لم تنغلق المنطقة فانظر إلى حيث تتحسن $F$.' },
        problems: { eu: 'Erantzun bi gauzak: zenbat egin (erpina) eta zenbat irabazi edo gastatu ($F$), unitateekin.', es: 'Responde las dos cosas: cuánto hacer (el vértice) y cuánto se gana o se gasta ($F$), con unidades.', en: 'Answer both things: how much to make (the vertex) and how much is earned or spent ($F$), with units.', ar: 'أجب عن الأمرين: كم نصنع (الرأس) وكم نربح أو ننفق ($F$)، مع الوحدات.' }
    }
}

export function ProgramazioaBatx2gIntroPage() {
    return <UnitPage unit={programazioaBatx2gUnit} />
}
