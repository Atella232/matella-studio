import type { LabToolInfo } from '../../../features/unit-v2/lab/types.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { buildChallenges } from '../../batx2-zientziak-banaketak/lab/build.ts'
import { distributionsBatx2LabTools } from '../../batx2-zientziak-banaketak/lab/labTools.ts'
import { machineChallenges } from '../../batx2-zientziak-banaketak/lab/machine.ts'
import { combinatoricsAkLabTools, pascalChallenges } from '../../dbh4-akademikoak-konbinatoria/lab/labTools.ts'
import type { DiscreteBatx1gStageId } from '../lessons.tsx'
import { fitChallenges } from './fit.ts'
import { galtonChallenges } from './galton.ts'
import { raffleChallenges } from './raffle.ts'

/* ==========================================================================
   Diskretuak (Batxilergoa 1 · Gizarte Zientziak) laboratory. Three tools
   of its own, for what this book has and 2.º Ciencias does not: the
   Galton board (balls that fall, paths and the bars of the binomial), the
   raffle (prizes, price and the mean gain) and fitting a table of data to
   a binomial (observed against expected, with Matella's 5 % rule).
   Borrowed, with their own challenges and ids: Tartaglia's triangle of
   4. DBH académicas, and «build the distribution» and «the binomial
   machine» of 2.º Ciencias. Their progress is kept under this unit's
   storage prefix. Tests in tests/diskretuak-batx1g-lab.test.ts.
   ========================================================================== */

export type DiscreteBatx1gLabToolId = 'pascal' | 'build' | 'raffle' | 'galton' | 'machine' | 'fit'

export interface DiscreteBatx1gLabTool extends LabToolInfo {
    id: DiscreteBatx1gLabToolId
    stage: DiscreteBatx1gStageId
}

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const fromCombinatorics = (id: string) => combinatoricsAkLabTools.find((tool) => tool.id === id)!
const fromDistributions = (id: string) => distributionsBatx2LabTools.find((tool) => tool.id === id)!

export const discreteBatx1gLabTools: DiscreteBatx1gLabTool[] = [
    { ...fromCombinatorics('pascal'), id: 'pascal', stage: 'review', lessonTopic: 'orders' },
    { ...fromDistributions('build'), id: 'build', stage: 'variable', lessonTopic: 'mean-sd', observe: say('Barrek 1 egiten dutenean bakarrik da probabilitate-banaketa. Batez bestekoa barrak orekan dauden puntua da, eta ez da zertan balio bat izan; desbideratzea hazi egiten da pisua muturretara doanean.', 'Las barras solo son una distribución de probabilidad cuando suman 1. La media es el punto donde se equilibran, y no tiene por qué ser un valor; la desviación crece cuando el peso se va a los extremos.', 'لا تكون الأعمدة توزيعًا احتماليًّا إلا إذا كان مجموعها 1. والمتوسط هو النقطة التي تتوازن عندها، ولا يلزم أن يكون قيمة من القيم؛ ويكبر الانحراف عندما يذهب الوزن إلى الطرفين.', 'The bars are a probability distribution only when they add up to 1. The mean is the point where they balance, and it need not be one of the values; the spread grows when the weight moves to the ends.') },
    { id: 'raffle', stage: 'variable', lessonTopic: 'expected-gain', title: say('Zozketa bidezkoa', 'La rifa justa', 'اليانصيب العادل', 'The fair raffle'), observe: say('Sari handi batek ez du jokoa aldekoa egiten: txartel guztien artean banatzen da. Batez besteko irabazia sari guztiak zati txartel kopurua da, ken prezioa; elkartearen irabazia hura bider txartel kopurua da, zeinua aldatuta.', 'Un premio gordo no hace favorable el juego: se reparte entre todos los boletos. La ganancia media es el total de premios entre el número de boletos, menos el precio; lo que gana la asociación es eso por el número de boletos, con el signo cambiado.', 'لا تجعل الجائزة الكبيرة اللعبة مربحة: فهي تُوزّع على كل البطاقات. والربح المتوسط هو مجموع الجوائز على عدد البطاقات ناقص الثمن، وربح الجمعية هو ذلك في عدد البطاقات بإشارة معاكسة.', 'A big prize does not make the game favourable: it is shared among all the tickets. The mean gain is the total prize money over the number of tickets, minus the price; what the association earns is that times the number of tickets, with the sign changed.') },
    { id: 'galton', stage: 'binomial', lessonTopic: 'galton', title: say('Galtonen tresna', 'El aparato de Galton', 'جهاز غالتون', 'The Galton board'), observe: say('Bola gutxirekin, kutxatilak zoriz betetzen dira; ehunka bolarekin, barrek teoriaren itxura hartzen dute. Erdiko kutxatilara bide gehiago iristen dira. Tresna okertzean (p ≠ 0,5), pilaketa alde batera mugitzen da, np inguruan.', 'Con pocas bolas, las casillas se llenan al azar; con cientos, las barras toman la forma de la teoría. Al centro llegan más caminos. Al inclinar el tablero (p ≠ 0,5), el montón se desplaza hacia un lado, cerca de np.', 'مع كرات قليلة تمتلئ الخانات بالصدفة، ومع المئات تأخذ الأعمدة شكل النظرية. تصل إلى الوسط مسارات أكثر. وعند إمالة اللوح (p ≠ 0.5) يتحرك الكوم إلى جهة قرب np.', 'With few balls, the bins fill up at random; with hundreds, the bars take the shape of the theory. More paths reach the middle. When the board is tilted (p ≠ 0.5), the pile moves to one side, near np.') },
    { ...fromDistributions('machine'), id: 'machine', stage: 'binomial', lessonTopic: 'binomial-events' },
    { id: 'fit', stage: 'fit', lessonTopic: 'good-fit', title: say('Doitu datuak', 'Ajusta los datos', 'طابق البيانات', 'Fit the data'), observe: say('p = x̄/n balioarekin, itxaronen batez bestekoa datuena bezalakoa da. Hala ere, itxaronak urrun egon daitezke: barren forma bera ez bada, binomiala ez da eredu ona, eta p mugitzeak ez du konpontzen.', 'Con p = x̄/n, los esperados tienen la misma media que los datos. Aun así pueden quedar lejos: si las barras no tienen la misma forma, la binomial no es un buen modelo, y mover p no lo arregla.', 'مع p = x̄/n يكون للقيم المتوقعة متوسط البيانات نفسه. ومع ذلك قد تبقى بعيدة: إذا لم يكن للأعمدة الشكل نفسه فليس التوزيع الثنائي نموذجًا جيدًا، وتحريك p لا يصلح ذلك.', 'With p = x̄/n, the expected values have the same mean as the data. Even so they may be far off: if the bars do not have the same shape, the binomial is not a good model, and moving p does not fix it.') }
]

export const discreteBatx1gLabToolForTopic: Record<string, DiscreteBatx1gLabToolId | undefined> = {
    compound: undefined,
    orders: 'pascal',
    'random-variable': 'build',
    'probability-table': 'build',
    'mean-sd': 'build',
    'expected-gain': 'raffle',
    galton: 'galton',
    'is-binomial': 'machine',
    'binomial-formula': 'machine',
    'binomial-events': 'machine',
    'binomial-parameters': 'machine',
    'fit-p': 'fit',
    'expected-values': 'fit',
    'good-fit': 'fit'
}

export const discreteBatx1gLabChallengeIds: number[] = [
    pascalChallenges,
    buildChallenges,
    raffleChallenges,
    galtonChallenges,
    machineChallenges,
    fitChallenges
].flatMap((list: Array<{ id: number }>) => list.map((challenge) => challenge.id))
