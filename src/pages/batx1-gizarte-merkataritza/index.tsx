import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { gizMoneyChallenges, gizMoneyDiagnostic, gizMoneyExerciseBank, gizMoneyPractice } from './content'
import { GizMoneyHeroArt } from './figures'
import { GizMoneyGames } from './games'
import { GIZ_MONEY_GAME_RECORDS_KEY, gizMoneyGameProgressIds } from './games/info'
import { GizMoneyLaboratory } from './lab'
import { gizMoneyLabChallengeIds, gizMoneyLabToolForTopic, gizMoneyLabTools } from './lab/labTools'
import { gizMoneyStages, gizMoneyTopics } from './lessons'

const merkataritzaBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-merkataritza-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Merkataritza-aritmetika', es: 'Aritmética mercantil', en: 'Financial arithmetic', ar: 'الرياضيات المالية' },
    documentTitle: { eu: 'Merkataritza-aritmetika · Batxilergoa 1 · Gizarte Zientziak', es: 'Aritmética mercantil · 1.º Bachillerato · Ciencias Sociales', en: 'Financial arithmetic · 1st Bachillerato · Social Sciences', ar: 'الرياضيات المالية · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Ehunekoak eta aldakuntza-indizeak, interes konposatua eta behar den denbora, urteko tasa baliokidea, pentsio-planak eta maileguak, beren amortizazio-taularekin.',
        es: 'Porcentajes e índices de variación, interés compuesto y el tiempo que hace falta, la TAE, los planes de pensiones y los préstamos, con su tabla de amortización.',
        en: 'Percentages and indexes of change, compound interest and the time it takes, the APR, pension plans and loans, with their repayment table.',
        ar: 'النسب المئوية ومؤشرات التغيّر، والفائدة المركبة والزمن اللازم، والمعدل السنوي المكافئ، وخطط التقاعد والقروض مع جدول إطفائها.'
    },
    heroArt: <GizMoneyHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, ehunekoetatik maileguetara', es: 'Cinco etapas, de los porcentajes a los préstamos', en: 'Five stages, from percentages to loans', ar: 'خمس مراحل، من النسب المئوية إلى القروض' },
    stages: gizMoneyStages,
    topics: gizMoneyTopics,
    diagnostic: gizMoneyDiagnostic,
    guidedPractice: gizMoneyPractice,
    exerciseBank: gizMoneyExerciseBank,
    challenges: gizMoneyChallenges,
    lab: {
        description: {
            eu: `${gizMoneyLabTools.length} tresna, erronkekin: noiz bikoizten da, urteko tasa baliokidea hazten da eta amortizazio-taula, berriak; eta 4. DBHko ehunekoen barra, ehuneko kateatuak, erosketaren tiketa, bakuna ala konposatua eta interesa hilabete eta egunetan.`,
            es: `${gizMoneyLabTools.length} herramientas con retos: ¿cuándo se duplica?, la TAE crece y el cuadro de amortización, nuevas; y de 4.º ESO, la barra del 100 %, los porcentajes encadenados, el tique de la compra, simple o compuesto e interés en meses y días.`,
            en: `${gizMoneyLabTools.length} tools with challenges: when does it double, the APR grows and the repayment table, new; and from 4th ESO, the 100% bar, chained percentages, the shopping receipt, simple or compound, and interest in months and days.`,
            ar: `${gizMoneyLabTools.length} أدوات مع تحديات: متى يتضاعف والمعدل السنوي المكافئ ينمو وجدول الإطفاء، وهي جديدة؛ ومن الصف الرابع: شريط 100 ٪ والنسب المتتالية وإيصال الشراء والبسيطة أم المركبة والفائدة بالأشهر والأيام.`
        },
        progressIds: gizMoneyLabChallengeIds,
        toolForTopic: gizMoneyLabToolForTopic,
        render: (props) => <GizMoneyLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, zein eskaintza da hobea, hutsuneak dituen taula, diruaren detektibea eta memoria, berriak; eta 4. DBHko bankua eta kutxa.',
            es: 'Siete juegos: carrera, ¿qué oferta es mejor?, la tabla con huecos, detective del dinero y memoria, nuevos; y de 4.º ESO, el banco y la caja.',
            en: 'Seven games: race, which offer is better, the table with gaps, money detective and memory, new; and from 4th ESO, the bank and the till.',
            ar: 'سبع ألعاب: السباق وأيّ العرضين أفضل والجدول الناقص ومخبر المال والذاكرة، وهي جديدة؛ ومن الصف الرابع: المصرف والصندوق.'
        },
        progressIds: gizMoneyGameProgressIds,
        recordsKey: GIZ_MONEY_GAME_RECORDS_KEY,
        render: (props) => <GizMoneyGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, 1,05 edo 2122,73. Ehunekoak, % ikurrik gabe; dirua, zentimoetara eskatzen bada.', es: 'Escribe un número: 5, 1,05 o 2122,73. Los porcentajes, sin el signo %; el dinero, a los céntimos si se pide.', en: 'Write a number: 5, 1.05 or 2122.73. Percentages without the % sign; money to the cent when asked.', ar: 'اكتب عددًا: 5 أو 1.05 أو 2122.73. النسب دون الرمز %، والمال إلى السنتات إذا طُلب ذلك.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        placeholder: () => ({ eu: 'Adib.: 1,05', es: 'Ej.: 1,05', en: 'e.g. 1.05', ar: 'مثال: 1.05' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 1,05 edo 2122,73.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 1,05 o 2122,73.', en: 'I don\'t understand that answer. Write a number, for example 1.05 or 2122.73.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 1.05 أو 2122.73.' }
    },
    errorByStage: {
        percent: { eu: 'Ehunekoak ez dira batzen: indizeak biderkatzen dira. +% 20 eta −% 20 ez da 1, 0,96 baizik. Hasierako prezioa: zatitu indizeaz.', es: 'Los porcentajes no se suman: se multiplican los índices. +20 % y −20 % no es 1, sino 0,96. Precio inicial: divide entre el índice.', en: 'Percentages do not add: the indexes multiply. +20% and −20% is not 1 but 0.96. Starting price: divide by the index.', ar: 'النسب لا تُجمع بل تُضرب المؤشرات. +20 % ثم −20 % ليس 1 بل 0.96. السعر الأصلي: اقسم على المؤشر.' },
        interest: { eu: 'Interes konposatua: C · (1 + i)ⁿ. Aldiak: urteko interesa zati aldi kopurua. Denbora logaritmoekin askatzen da, eta urte osoetara biribiltzen da gora.', es: 'Interés compuesto: C · (1 + i)ⁿ. Periodos: el interés anual entre el número de periodos. El tiempo se despeja con logaritmos y se redondea hacia arriba a años completos.', en: 'Compound interest: C · (1 + i)ⁿ. Periods: the yearly interest divided by the number of periods. Time is found with logarithms and rounded up to whole years.', ar: 'الفائدة المركبة: C · (1 + i)ⁿ. الفترات: الفائدة السنوية مقسومة على عدد الفترات. الزمن يُعزل باللوغاريتمات ويُقرَّب إلى الأعلى إلى سنوات كاملة.' },
        tae: { eu: 'Urteko tasa baliokidea: (1 + r/n)ⁿ − 1, ez r. Gastuekin: itzulitakoa zati jasotakoa.', es: 'TAE: (1 + r/n)ⁿ − 1, no r. Con gastos: lo devuelto entre lo recibido.', en: 'APR: (1 + r/n)ⁿ − 1, not r. With costs: what you pay back divided by what you receive.', ar: 'المعدل السنوي المكافئ: (1 + r/n)ⁿ − 1 وليس r. ومع المصاريف: المُعاد مقسومًا على المُستلم.' },
        savings: { eu: 'Sₙ = a₁ · (rⁿ − 1) : (r − 1). Pentsio-plan batean diru-sarrera bakoitzak bere urteak hazten ditu: lehenengoak gehien.', es: 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1). En un plan de pensiones cada ingreso crece sus propios años: el primero, el que más.', en: 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1). In a pension plan each deposit grows for its own years: the first one the most.', ar: 'Sₙ = a₁ · (rⁿ − 1) ÷ (r − 1). في خطة التقاعد ينمو كل إيداع سنواته الخاصة، والأول أكثرها.' },
        loans: { eu: 'Interesak = zorra · i; amortizazioa = urtekoa − interesak. Ezeztatzeko, zor bizia eta komisioa, ez geratzen diren kuotak.', es: 'Intereses = deuda · i; amortización = anualidad − intereses. Para cancelar, la deuda pendiente más la comisión, no las cuotas que quedan.', en: 'Interest = debt · i; repayment = payment − interest. To cancel, the outstanding debt plus the fee, not the instalments left.', ar: 'الفوائد = الدين · i، والإطفاء = الدفعة − الفوائد. وللإلغاء: الدين المتبقي مع العمولة، لا الأقساط الباقية.' }
    }
}

export function MerkataritzaBatx1gIntroPage() {
    return <UnitPage unit={merkataritzaBatx1gUnit} />
}
