import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import { periodicChallenges } from '../../dbh4-aplikatuak-funtzioak/lab/labTools.ts'
import { exponentialAkLabTools, logShiftChallenges, shiftChallenges } from '../../dbh4-akademikoak-esponentzialak/lab/labTools.ts'
import { domainsChallenges, functionsAkLabTools, joinChallenges, parityChallenges } from '../../dbh4-akademikoak-funtzioak/lab/labTools.ts'
import { absoluteChallenges, polynomialAkLabTools } from '../../dbh4-akademikoak-polinomikoak/lab/labTools.ts'
import type { BachFunctionsStageId } from '../lessons.tsx'
import { say } from '../text.ts'
import { compositionChallenges } from './composition.ts'
import { mirrorChallenges } from './mirror.ts'
import { stairsChallenges } from './stairs.ts'
import { transformChallenges } from './transform.ts'

/* ==========================================================================
   Funtzio elementalak (Batxilergoa 1 · Zientziak) laboratory. Four tools of
   its own, for what 1.º Bachillerato adds: the transformation workshop
   (A·f(Bx + c) + k moving a point P), two machines in a row in both
   orders, the mirror y = x with a cut and a horizontal line, and the
   staircase of E(x). The review comes from 4. DBH académicas with its
   challenges and ids (progress is kept apart, under this unit's storage
   prefix): build the domain, even or odd, periodic functions, move the
   exponential and the logarithm, join two pieces and fold the absolute
   value. Tests in tests/funtzioak-batx1z-lab.test.ts.
   ========================================================================== */

export type BachFunctionsLabToolId = 'domains' | 'parity' | 'periodic' | 'transform' | 'exp-shift' | 'mirror' | 'log-shift' | 'stairs' | 'join' | 'absolute' | 'composition'

export interface BachFunctionsLabTool extends LabToolInfo {
    id: BachFunctionsLabToolId
    stage: BachFunctionsStageId
}

const from = (tools: LabToolInfo[], id: string) => tools.find((tool) => tool.id === id)!

export const bachFunctionsLabTools: BachFunctionsLabTool[] = [
    { ...from(functionsAkLabTools, 'domains'), id: 'domains', stage: 'study', lessonTopic: 'domain' },
    { ...from(functionsAkLabTools, 'parity'), id: 'parity', stage: 'study', lessonTopic: 'symmetry' },
    { ...from(functionsAkLabTools, 'periodic'), id: 'periodic', stage: 'study', lessonTopic: 'periodic' },
    {
        id: 'transform',
        stage: 'transforms',
        lessonTopic: 'shifts',
        title: say('Transformazioen tailerra', 'El taller de transformaciones', 'ورشة التحويلات', 'The transformation workshop'),
        observe: say(
            'Kanpoko zenbakiek y aldatzen dute: k batzeak grafikoa igotzen du, eta A biderkatzeak luzatu edo X ardatzean islatzen du. Barrukoek x aldatzen dute, alderantziz: x + 3 ezkerrera doa, 2x estutu egiten da eta −x Y ardatzean islatzen da.',
            'Los números de fuera cambian la y: sumar k sube la gráfica y multiplicar por A la estira o la refleja en el eje X. Los de dentro cambian la x, al revés: x + 3 va a la izquierda, 2x la comprime y −x la refleja en el eje Y.',
            'الأعداد الخارجية تغيّر y: جمع k يرفع الرسم، والضرب في A يمدّده أو يعكسه في محور X. والأعداد الداخلية تغيّر x بالعكس: x + 3 تذهب إلى اليسار، و2x تقلّصه، و−x تعكسه في محور Y.',
            'The numbers outside change y: adding k raises the graph and multiplying by A stretches it or reflects it in the x-axis. The ones inside change x, the other way round: x + 3 goes left, 2x squeezes it and −x reflects it in the y-axis.'
        )
    },
    { ...from(exponentialAkLabTools, 'shift'), id: 'exp-shift', stage: 'transforms', lessonTopic: 'shifts' },
    {
        id: 'mirror',
        stage: 'inverse',
        lessonTopic: 'inverse-graph',
        title: say('y = x ispilua', 'El espejo y = x', 'مرآة y = x', 'The mirror y = x'),
        observe: say(
            'Alderantzizkoa y = x zuzenean islatzean ikusten da. Zuzen horizontal batek bi aldiz mozten badu, islapenak bi y ditu x batentzat eta ez da funtzioa: moztu eta gorde adar bat.',
            'La inversa se ve al reflejar en la recta y = x. Si una recta horizontal la corta dos veces, el reflejo tiene dos y para una x y no es una función: corta y quédate con una rama.',
            'تظهر الدالة العكسية بالانعكاس في المستقيم y = x. وإذا قطعها مستقيم أفقي مرتين فللانعكاس قيمتان لـ y عند x واحدة وليس دالة: اقطع واحتفظ بفرع.',
            'The inverse appears when you reflect in the line y = x. If a horizontal line cuts it twice, the reflection has two y for one x and is not a function: cut it and keep one branch.'
        )
    },
    { ...from(exponentialAkLabTools, 'log-shift'), id: 'log-shift', stage: 'inverse', lessonTopic: 'exp-log' },
    {
        id: 'stairs',
        stage: 'piecewise',
        lessonTopic: 'floor',
        title: say('Zati osoaren eskailera', 'La escalera de la parte entera', 'درج الجزء الصحيح', 'The integer part staircase'),
        observe: say(
            'E(x) eskailera bat da: maila bakoitza ezkerrean itxita eta eskuinean irekita. Negatiboekin ere beherantz biribiltzen da. Zati hamartarra, x − E(x), zerra bat da, 0 eta 1 artean.',
            'E(x) es una escalera: cada peldaño cerrado a la izquierda y abierto a la derecha. También con negativos redondea hacia abajo. La parte decimal, x − E(x), es una sierra entre 0 y 1.',
            'E(x) درج: كل درجة مغلقة من اليسار ومفتوحة من اليمين. ومع السالبة أيضًا تقرّب إلى الأسفل. والجزء الكسري x − E(x) منشار بين 0 و1.',
            'E(x) is a staircase: each step closed on the left and open on the right. With negatives it also rounds down. The fractional part, x − E(x), is a saw between 0 and 1.'
        )
    },
    { ...from(functionsAkLabTools, 'join'), id: 'join', stage: 'piecewise', lessonTopic: 'piecewise' },
    { ...from(polynomialAkLabTools, 'absolute'), id: 'absolute', stage: 'piecewise', lessonTopic: 'absolute' },
    {
        id: 'composition',
        stage: 'operations',
        lessonTopic: 'composition',
        title: say('Bi makina segidan', 'Dos máquinas en cadena', 'آلتان متتاليتان', 'Two machines in a row'),
        observe: say(
            'Goiko errenkadan x zenbakia g makinan sartzen da lehenik: f ∘ g. Behekoan, f makinan: g ∘ f. Bi batuketak edo bi biderketak ordena aldatuta ere berdin geratzen dira; gehienetan, ez.',
            'En la fila de arriba, x entra primero en la máquina g: f ∘ g. En la de abajo, en la f: g ∘ f. Dos sumas o dos productos dan lo mismo en cualquier orden; casi siempre, no.',
            'في الصف العلوي يدخل x أولًا في الآلة g: f ∘ g. وفي السفلي في الآلة f: g ∘ f. الجمعان أو الضربان يعطيان الشيء نفسه بأي ترتيب؛ وفي أغلب الأحيان لا.',
            'In the top row, x goes into machine g first: f ∘ g. In the bottom row, into f: g ∘ f. Two additions or two products give the same in any order; almost always, they do not.'
        )
    }
]

export const bachFunctionsLabToolForTopic: Record<string, BachFunctionsLabToolId | undefined> = {
    domain: 'domains',
    symmetry: 'parity',
    periodic: 'periodic',
    shifts: 'transform',
    reflections: 'transform',
    stretch: 'transform',
    'inverse-function': 'mirror',
    'inverse-graph': 'mirror',
    'exp-log': 'log-shift',
    piecewise: 'join',
    absolute: 'absolute',
    floor: 'stairs',
    operations: 'composition',
    composition: 'composition'
}

export const bachFunctionsLabChallengeIds: number[] = [
    domainsChallenges,
    parityChallenges,
    periodicChallenges,
    transformChallenges,
    shiftChallenges,
    mirrorChallenges,
    logShiftChallenges,
    stairsChallenges,
    joinChallenges,
    absoluteChallenges,
    compositionChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
