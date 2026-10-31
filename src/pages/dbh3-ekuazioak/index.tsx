import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { EquationsSystemsHeroArt } from '../dbh4-aplikatuak-ekuazioak/figures'
import { equations3Challenges, equations3Diagnostic, equations3ExerciseBank, equations3Practice } from './content'
import { Equations3Games } from './games'
import { EQUATIONS3_GAME_RECORDS_KEY, equations3GameProgressIds } from './games/info'
import { Equations3Laboratory } from './lab'
import { equations3LabChallengeIds, equations3LabToolForTopic, equations3LabTools } from './lab/labTools'
import { equations3Stages, equations3Topics } from './lessons'

const equationsUnit: UnitDefinition = {
    storagePrefix: 'matella-ekuazioak-dbh3',
    coursePath: '/matematika/dbh3',
    courseTitle: { eu: '3. DBH', es: '3.º ESO', en: '3rd ESO', ar: 'الصف الثالث' },
    title: { eu: 'Ekuazioak eta sistemak', es: 'Ecuaciones y sistemas', en: 'Equations and systems', ar: 'المعادلات والأنظمة' },
    documentTitle: { eu: 'Ekuazioak eta sistemak · 3. DBH', es: 'Ecuaciones y sistemas · 3.º ESO', en: 'Equations and systems · 3rd ESO', ar: 'المعادلات والأنظمة · الصف الثالث' },
    tagline: {
        eu: 'Balantzatik sistemetara: lehen eta bigarren mailako ekuazioak, diskriminatzailea, sistemak eta haien metodoak, eta problemak.',
        es: 'De la balanza a los sistemas: ecuaciones de primer y segundo grado, el discriminante, los sistemas y sus métodos, y problemas.',
        en: 'From the balance to systems: first-degree and quadratic equations, the discriminant, systems and their methods, and problems.',
        ar: 'من الميزان إلى الأنظمة: معادلات الدرجة الأولى والثانية، والمميّز، والأنظمة وطرقها، والمسائل.'
    },
    heroArt: <EquationsSystemsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, balantzatik problemetara', es: 'Cinco etapas, de la balanza a los problemas', en: 'Five stages, from the balance to problems', ar: 'خمس مراحل، من الميزان إلى المسائل' },
    stages: equations3Stages,
    topics: equations3Topics,
    diagnostic: equations3Diagnostic,
    guidedPractice: equations3Practice,
    exerciseBank: equations3ExerciseBank,
    challenges: equations3Challenges,
    lab: {
        description: {
            eu: `${equations3LabTools.length} tresna: balantza, parabola eta lurra, bi balantza, adinen denbora-lerroa eta beste bost, erronkekin.`,
            es: `${equations3LabTools.length} herramientas: la balanza, la parábola y el suelo, dos balanzas, la línea del tiempo de las edades y cinco más, con retos.`,
            en: `${equations3LabTools.length} tools: the balance, the parabola and the ground, two balances, ages on a timeline and five more, with challenges.`,
            ar: `${equations3LabTools.length} أدوات: الميزان، والقطع المكافئ والأرض، وميزانان، وخط زمن الأعمار وخمس أخرى، مع تحديات.`
        },
        progressIds: equations3LabChallengeIds,
        toolForTopic: equations3LabToolForTopic,
        render: (props) => <Equations3Laboratory {...props} />
    },
    games: {
        description: {
            eu: 'Sei joko: lasterketa, urrats zuzena, erroak zuzenean, zuzenen gurutzea, ekuazioen detektibea eta memoria.',
            es: 'Seis juegos: carrera, el paso correcto, raíces en la recta, el cruce de rectas, el detective de ecuaciones y memoria.',
            en: 'Six games: race, the right step, roots on the line, where lines cross, the equations detective and memory.',
            ar: 'ست ألعاب: السباق والخطوة الصحيحة والجذور على المستقيم وتقاطع المستقيمات ومخبر المعادلات والذاكرة.'
        },
        progressIds: equations3GameProgressIds,
        recordsKey: EQUATIONS3_GAME_RECORDS_KEY,
        render: (props) => <Equations3Games {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 1,5 edo 16/5. Bi ebazpen badaude, eskatzen dena bakarrik.', es: 'Escribe un número: 5, −3, 1,5 o 16/5. Si hay dos soluciones, solo la que se pide.', en: 'Write a number: 5, −3, 1.5 or 16/5. If there are two solutions, only the one asked for.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 1.5 أو 16/5. وإذا كان هناك حلّان فاكتب المطلوب فقط.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 5', es: 'Ej.: 5', en: 'e.g. 5', ar: 'مثال: 5' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 5 edo −3.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 5 o −3.', en: 'I don\'t understand that answer. Write a number, for example 5 or −3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 5 أو ⁦−3⁩.' }
    },
    errorByStage: {
        linear: { eu: 'Bi ataletan gauza bera. Batzen dena kentzen da; biderkatzen dena zatitzen da. Minusak parentesiko gai guztiei.', es: 'Lo mismo en los dos miembros. Lo que suma pasa restando; lo que multiplica pasa dividiendo. El menos, a todo el paréntesis.', en: 'The same on both sides. Adding becomes subtracting; multiplying becomes dividing. The minus applies to the whole bracket.', ar: 'الشيء نفسه في الطرفين. الجمع يصير طرحًا والضرب قسمة. والسالب على القوس كله.' },
        quadratic: { eu: 'Ez zatitu x ezezagunaz. x² = a: ±√a. Formulan −b, eta Δ = b² − 4ac zeinuekin.', es: 'No dividas entre x. x² = a: ±√a. En la fórmula, −b, y Δ = b² − 4ac con sus signos.', en: 'Do not divide by x. x² = a: ±√a. In the formula, −b, and Δ = b² − 4ac with its signs.', ar: 'لا تقسم على x. x² = a: ±√a. وفي الصيغة −b، وΔ = b² − 4ac بإشاراتها.' },
        systems: { eu: 'Ebazpena BI ekuazioak betetzen dituen bikotea da: bi zuzenen ebakidura.', es: 'La solución es la pareja que cumple LAS DOS ecuaciones: el corte de las dos rectas.', en: 'The solution is the pair that satisfies BOTH equations: where the two lines cross.', ar: 'الحل هو الزوج الذي يحقق المعادلتين: تقاطع المستقيمين.' },
        methods: { eu: 'Ordezkatzean, parentesiak. Biderkatzean, bi atalak. Amaieran, egiaztatu bietan.', es: 'Al sustituir, paréntesis. Al multiplicar, los dos miembros. Al final, comprueba en las dos.', en: 'When substituting, brackets. When multiplying, both sides. At the end, check in both.', ar: 'عند التعويض أقواس. وعند الضرب الطرفان. وفي النهاية تحقّق في الاثنتين.' },
        problems: { eu: 'Erabaki x, idatzi dena x-rekin eta egiaztatu: urteak biei batzen zaizkie; luzerak ez dira negatiboak.', es: 'Decide x, escribe todo con x y comprueba: los años se suman a los dos; las longitudes no son negativas.', en: 'Choose x, write everything with x and check: years are added to both; lengths are never negative.', ar: 'حدّد x واكتب الكل بـx وتحقّق: تُضاف السنوات إلى الاثنين؛ والأطوال لا تكون سالبة.' }
    }
}

export function EkuazioakDBH3Page() {
    return <UnitPage unit={equationsUnit} />
}
