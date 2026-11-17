import { pick, randomInt, shuffle, type Random } from '../../../features/unit-v2/games/random.ts'
import type { LocalizedText } from '../../../features/unit-v2/types.ts'
import { say } from '../../batx2-zientziak-probabilitatea/lab/probability.ts'

/* ==========================================================================
   M-J1 · Alboratuta dago? (¿Hay sesgo?): six studies, each with one fair
   plan and two biased ones (and why they are biased). Level 1: one plan,
   fair or biased? Level 2: three plans, which one is fair? Level 3: a plan
   with numbers of its own, which kind of sampling is it (simple random,
   systematic, stratified or not random at all)? Pure logic.
   ========================================================================== */

export const BIAS_ROUNDS = 6

interface Plan {
    text: LocalizedText
    /** null for the fair plan; otherwise who is left out or why it fails */
    why: LocalizedText | null
}

interface Study {
    goal: LocalizedText
    plans: [Plan, Plan, Plan]
}

const fair = (text: LocalizedText): Plan => ({ text, why: null })
const biased = (text: LocalizedText, why: LocalizedText): Plan => ({ text, why })

export const STUDIES: Study[] = [
    {
        goal: say('Ikastetxe bateko ikasleek etxeko lanetan ematen duten denbora.', 'El tiempo que dedican a los deberes los alumnos de un centro.', 'الوقت الذي يقضيه طلاب مدرسة في الواجبات.', 'The time the pupils of a school spend on homework.'),
        plans: [
            fair(say('Ikastetxeko zerrendatik 60 ikasle zozketatu.', 'Sortear 60 alumnos de la lista del centro.', 'سحب 60 طالبًا بالقرعة من قائمة المدرسة.', 'Draw 60 pupils from the school list.')),
            biased(say('Arratsaldeko bostetan liburutegian daudenei galdetu.', 'Preguntar a quienes están en la biblioteca a las cinco de la tarde.', 'سؤال الموجودين في المكتبة الساعة الخامسة مساءً.', 'Ask whoever is in the library at five in the afternoon.'), say('Liburutegian gehiago ikasten dutenak daude: emaitza handiegia aterako da.', 'En la biblioteca están quienes más estudian: saldrá demasiado alto.', 'في المكتبة من يدرسون أكثر: ستخرج النتيجة مرتفعة جدًّا.', 'Those who study most are in the library: it will come out too high.')),
            biased(say('Lehen mailako gela bati bakarrik galdetu.', 'Preguntar solo a una clase de primero.', 'سؤال صف واحد من السنة الأولى فقط.', 'Ask only one first-year class.'), say('Beste mailak kanpoan geratzen dira, eta lan gehiago izan dezakete.', 'Los demás cursos quedan fuera, y pueden tener más deberes.', 'تُستبعد بقية الصفوف وقد يكون لديها واجبات أكثر.', 'The other years are left out, and they may have more homework.'))
        ]
    },
    {
        goal: say('Herritarrek autobus-linea berri bati buruz duten iritzia.', 'La opinión de los vecinos sobre una nueva línea de autobús.', 'رأي السكان في خط حافلات جديد.', 'What residents think of a new bus line.'),
        plans: [
            fair(say('Erroldatik 200 pertsona zozketatu eta haiei galdetu.', 'Sortear 200 personas del censo y preguntarles.', 'سحب 200 شخص من السجل السكاني وسؤالهم.', 'Draw 200 people from the register and ask them.')),
            biased(say('Autobus-geltokian itxaroten daudenei galdetu.', 'Preguntar a quienes esperan en la parada del autobús.', 'سؤال المنتظرين في موقف الحافلة.', 'Ask those waiting at the bus stop.'), say('Autobusa erabiltzen dutenak bakarrik: autoz edo oinez doazenak kanpoan.', 'Solo quienes usan el autobús: quedan fuera los que van en coche o andando.', 'فقط من يستعملون الحافلة: يُستبعد من يتنقلون بالسيارة أو مشيًا.', 'Only bus users: those who drive or walk are left out.')),
            biased(say('Udalaren webgunean nahi duenak bete dezakeen inkesta bat jarri.', 'Poner en la web del ayuntamiento una encuesta que rellena quien quiere.', 'وضع استطلاع في موقع البلدية يملؤه من يشاء.', 'Put a survey on the town website that anyone who wants can fill in.'), say('Interes handia dutenek bakarrik erantzuten dute: ez da ausazkoa.', 'Solo responden los muy interesados: no es al azar.', 'لا يجيب إلا المهتمون جدًّا: ليست عشوائية.', 'Only the very interested answer: it is not random.'))
        ]
    },
    {
        goal: say('Herri bateko helduen batez besteko altuera.', 'La altura media de los adultos de un pueblo.', 'متوسط طول البالغين في بلدة.', 'The mean height of the adults in a town.'),
        plans: [
            fair(say('Erroldatik helduen ausazko lagin bat hartu eta neurtu.', 'Tomar una muestra al azar de adultos del censo y medirlos.', 'أخذ عيّنة عشوائية من البالغين في السجل وقياسهم.', 'Take a random sample of adults from the register and measure them.')),
            biased(say('Saskibaloi-taldeko kideak neurtu.', 'Medir a los miembros del club de baloncesto.', 'قياس أعضاء نادي كرة السلة.', 'Measure the members of the basketball club.'), say('Jokalariak batez bestekoa baino altuagoak dira.', 'Los jugadores son más altos que la media.', 'اللاعبون أطول من المتوسط.', 'The players are taller than average.')),
            biased(say('Astegunetan, goizeko hamaiketan, etxeetara deitu.', 'Llamar a las casas los días laborables a las once de la mañana.', 'الاتصال بالمنازل في أيام العمل الساعة الحادية عشرة صباحًا.', 'Phone homes on weekdays at eleven in the morning.'), say('Lanean daudenak kanpoan geratzen dira.', 'Quedan fuera quienes están trabajando.', 'يُستبعد من هم في العمل.', 'Those who are at work are left out.'))
        ]
    },
    {
        goal: say('Supermerkatu bateko bezero guztien gogobetetasuna.', 'La satisfacción de todos los clientes de un supermercado.', 'رضا كل عملاء متجر كبير.', 'How satisfied all the customers of a supermarket are.'),
        plans: [
            fair(say('Asteko tiketetatik, 20 tiketetik bat hautatu, lehena zozketatuta.', 'De los tiques de la semana, elegir uno de cada 20, sorteando el primero.', 'من فواتير الأسبوع، اختيار واحدة من كل 20 مع سحب الأولى بالقرعة.', 'From the week\'s receipts, pick one in every 20, drawing the first one.')),
            biased(say('Larunbat goizeko bezeroei bakarrik galdetu.', 'Preguntar solo a los clientes del sábado por la mañana.', 'سؤال عملاء صباح السبت فقط.', 'Ask only Saturday morning customers.'), say('Beste egun eta orduetako bezeroak kanpoan.', 'Quedan fuera los clientes de otros días y horas.', 'يُستبعد عملاء الأيام والساعات الأخرى.', 'Customers on other days and times are left out.')),
            biased(say('Kexa-orria idatzi dutenen iritzia aztertu.', 'Estudiar la opinión de quienes han escrito una hoja de reclamaciones.', 'دراسة رأي من كتبوا ورقة شكوى.', 'Study the opinion of those who have written a complaint.'), say('Kexatzen direnak bakarrik: emaitza txarregia aterako da.', 'Solo los que se quejan: saldrá demasiado bajo.', 'فقط المشتكون: ستخرج النتيجة منخفضة جدًّا.', 'Only those who complain: it will come out too low.'))
        ]
    },
    {
        goal: say('Hiri bateko nerabeen lo-orduak.', 'Las horas de sueño de los adolescentes de una ciudad.', 'ساعات نوم المراهقين في مدينة.', 'How many hours the teenagers of a city sleep.'),
        plans: [
            fair(say('Ikastetxe bakoitzetik ikasleak zozketatu, haren tamainaren arabera.', 'Sortear alumnos de cada centro según su tamaño.', 'سحب طلاب من كل مدرسة حسب حجمها.', 'Draw pupils from each school according to its size.')),
            biased(say('Lagun baten gelako ikasleei galdetu.', 'Preguntar a los alumnos de la clase de un amigo.', 'سؤال طلاب صف صديق.', 'Ask the pupils in a friend\'s class.'), say('Gela bakarra da, eta ez da ausaz aukeratua.', 'Es una sola clase y no se elige al azar.', 'صف واحد لم يُختر عشوائيًّا.', 'It is a single class, not chosen at random.')),
            biased(say('Gauean, bideo-joko baten aplikazioan inkesta bat jarri.', 'Poner una encuesta por la noche en una aplicación de videojuegos.', 'وضع استطلاع ليلًا في تطبيق ألعاب فيديو.', 'Put a survey in a video game app at night.'), say('Gauean jolasten ari direnek gutxiago lo egiten dute: emaitza txikiegia.', 'Quienes juegan de noche duermen menos: saldrá demasiado bajo.', 'من يلعبون ليلًا ينامون أقل: ستخرج النتيجة منخفضة جدًّا.', 'Those playing at night sleep less: it will come out too low.'))
        ]
    },
    {
        goal: say('Hauteskunde batean alderdi bakoitzari emango zaion botoa.', 'La intención de voto a cada partido en unas elecciones.', 'نية التصويت لكل حزب في انتخابات.', 'Voting intention for each party in an election.'),
        plans: [
            fair(say('Ausazko telefono-zenbakietara deitu, mugikorrak barne, ordu guztietan.', 'Llamar a números de teléfono al azar, también móviles, a todas horas.', 'الاتصال بأرقام هاتف عشوائية، بما فيها المحمولة، في كل الأوقات.', 'Phone random numbers, mobiles included, at all hours.')),
            biased(say('Alderdi baten mitinera joandakoei galdetu.', 'Preguntar a los asistentes al mitin de un partido.', 'سؤال حضور تجمع حزب ما.', 'Ask the people at one party\'s rally.'), say('Alderdi horren aldekoak dira gehienak.', 'La mayoría son partidarios de ese partido.', 'معظمهم من أنصار ذلك الحزب.', 'Most of them support that party.')),
            biased(say('Egunkari bateko irakurleei galdetu.', 'Preguntar a los lectores de un periódico.', 'سؤال قرّاء صحيفة.', 'Ask the readers of one newspaper.'), say('Egunkari bakoitzak irakurle-mota bat du: ez dira herri osoa.', 'Cada periódico tiene un tipo de lector: no son toda la población.', 'لكل صحيفة نوع من القرّاء: ليسوا كل السكان.', 'Each newspaper has its kind of reader: they are not the whole population.'))
        ]
    }
]

export type SamplingKind = 'simple' | 'systematic' | 'stratified' | 'convenience'
export const SAMPLING_KINDS: SamplingKind[] = ['simple', 'systematic', 'stratified', 'convenience']

export const kindNames: Record<SamplingKind, LocalizedText> = {
    simple: say('Ausazko sinplea', 'Aleatorio simple', 'عشوائية بسيطة', 'Simple random'),
    systematic: say('Sistematikoa', 'Sistemático', 'منتظمة', 'Systematic'),
    stratified: say('Geruzatua', 'Estratificado', 'طبقية', 'Stratified'),
    convenience: say('Ez da ausazkoa', 'No es aleatorio', 'ليست عشوائية', 'Not random')
}

function kindText(random: Random, kind: SamplingKind): LocalizedText {
    const n = 10 * randomInt(random, 2, 6)
    const step = pick(random, [10, 20, 25, 30])
    const population = n * step
    const start = randomInt(random, 1, step)
    switch (kind) {
        case 'simple':
            return say(`${population} bazkideak zenbakitzen dira eta kalkulagailuarekin ${n} zenbaki zozketatzen dira.`, `Se numeran los ${population} socios y se sortean ${n} números con la calculadora.`, `يُرقَّم الأعضاء الـ ${population} وتُسحب ${n} أرقام بالآلة الحاسبة.`, `The ${population} members are numbered and ${n} numbers are drawn with a calculator.`)
        case 'systematic':
            return say(`${population} bazkideen zerrendan, ${start} zenbakitik hasita, ${step} zenbakitik behin hautatzen da.`, `En la lista de ${population} socios se elige uno de cada ${step}, empezando por el ${start}.`, `في قائمة ${population} عضوًا يُختار واحد من كل ${step} بدءًا من ${start}.`, `In the list of ${population} members one in every ${step} is chosen, starting at number ${start}.`)
        case 'stratified':
            return say(`${population} bazkideak adinaren arabera hiru taldetan banatzen dira, eta talde bakoitzetik bere tamainaren araberako zatia zozketatzen da, ${n} guztira.`, `Los ${population} socios se reparten en tres grupos de edad y de cada grupo se sortea una parte según su tamaño, ${n} en total.`, `يُقسَّم الأعضاء الـ ${population} إلى ثلاث فئات عمرية ويُسحب من كل فئة جزء حسب حجمها، ${n} في المجموع.`, `The ${population} members are split into three age groups and from each group a share is drawn by its size, ${n} in all.`)
        case 'convenience':
            return say(`Klubeko atean sartzen diren lehen ${n} bazkideei galdetzen zaie.`, `Se pregunta a los primeros ${n} socios que entran por la puerta del club.`, `يُسأل أول ${n} أعضاء يدخلون من باب النادي.`, `The first ${n} members who come in through the club door are asked.`)
    }
}

export type BiasRound =
    | { kind: 'fair-or-not'; study: number; plan: number; fair: boolean }
    | { kind: 'pick-fair'; study: number; order: number[]; answer: number }
    | { kind: 'which-kind'; text: LocalizedText; answer: SamplingKind }

/** Six rounds of a level, with no study or kind repeated more than needed */
export function createBiasRounds(random: Random, level: number): BiasRound[] {
    if (level === 0) {
        const studies = shuffle(random, STUDIES.map((_, index) => index))
        const fairOnes = new Set(shuffle(random, [0, 1, 2, 3, 4, 5]).slice(0, randomInt(random, 2, 3)))
        return studies.map((study, index) => {
            const plan = fairOnes.has(index) ? 0 : randomInt(random, 1, 2)
            return { kind: 'fair-or-not', study, plan, fair: plan === 0 }
        })
    }
    if (level === 1) {
        return shuffle(random, STUDIES.map((_, index) => index)).map((study) => {
            const order = shuffle(random, [0, 1, 2])
            return { kind: 'pick-fair', study, order, answer: order.indexOf(0) }
        })
    }
    const kinds = shuffle(random, [...SAMPLING_KINDS, ...shuffle(random, SAMPLING_KINDS).slice(0, BIAS_ROUNDS - SAMPLING_KINDS.length)])
    return kinds.map((kind) => ({ kind: 'which-kind', text: kindText(random, kind), answer: kind }))
}
