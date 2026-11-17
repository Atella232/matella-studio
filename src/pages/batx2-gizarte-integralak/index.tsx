import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { bach2gIntegralsChallenges, bach2gIntegralsDiagnostic, bach2gIntegralsExerciseBank, bach2gIntegralsPractice } from './content'
import { Bach2gIntegralsHeroArt } from './figures'
import { Bach2gIntegralsGames } from './games'
import { BACH2G_INTEGRALS_GAME_RECORDS_KEY, bach2gIntegralsGameProgressIds } from './games/info'
import { Bach2gIntegralsLaboratory } from './lab'
import { bach2gIntegralsLabChallengeIds, bach2gIntegralsLabToolForTopic, bach2gIntegralsLabTools } from './lab/labTools'
import { bach2gIntegralsStages, bach2gIntegralsTopics } from './lessons'

const integralakBatx2gUnit: UnitDefinition = {
    storagePrefix: 'matella-integralak-batx2g',
    coursePath: '/matematika/batx2-gizarte',
    courseTitle: { eu: 'Batxilergoa 2 · Gizarte Zientziak', es: '2.º Bachillerato · Ciencias Sociales', en: '2nd Bachillerato · Social Sciences', ar: 'البكالوريا الثانية · العلوم الاجتماعية' },
    title: { eu: 'Integralak', es: 'Integrales', en: 'Integrals', ar: 'التكاملات' },
    documentTitle: { eu: 'Integralak · Batxilergoa 2 · Gizarte Zientziak', es: 'Integrales · 2.º Bachillerato · Ciencias Sociales', en: 'Integrals · 2nd Bachillerato · Social Sciences', ar: 'التكاملات · البكالوريا الثانية · العلوم الاجتماعية' },
    tagline: {
        eu: 'Jatorrizkoak eta berehalako integralak, integral mugatua eta Barrow-en erregela, kurba baten eta ardatzaren arteko azalerak eta bi kurben artekoak, eta integrala ekonomian: kostu osoa, pilatutakoa eta diru-sarrerak.',
        es: 'Primitivas e integrales inmediatas, la integral definida y la regla de Barrow, áreas entre una curva y el eje y entre dos curvas, y la integral en economía: el coste total, lo acumulado y los ingresos.',
        en: 'Antiderivatives and immediate integrals, the definite integral and Barrow\'s rule, areas between a curve and the axis and between two curves, and the integral in economics: the total cost, what piles up and income.',
        ar: 'الدوال الأصلية والتكاملات الفورية، والتكامل المحدد وقاعدة بارو، والمساحات بين منحنى والمحور وبين منحنيين، والتكامل في الاقتصاد: التكلفة الكلية والمتراكم والإيراد.'
    },
    heroArt: <Bach2gIntegralsHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, jatorrizkotik ekonomiako azaleretaraino', es: 'Cinco etapas, de la primitiva a las áreas en economía', en: 'Five stages, from the antiderivative to areas in economics', ar: 'خمس مراحل، من الدالة الأصلية إلى المساحات في الاقتصاد' },
    stages: bach2gIntegralsStages,
    topics: bach2gIntegralsTopics,
    diagnostic: bach2gIntegralsDiagnostic,
    guidedPractice: bach2gIntegralsPractice,
    exerciseBank: bach2gIntegralsExerciseBank,
    challenges: bach2gIntegralsChallenges,
    lab: {
        description: {
            eu: `${bach2gIntegralsLabTools.length} tresna, erronkekin: hurrengo unitatetik kostu osora eta noiz berreskuratzen da inbertsioa?, berriak; eta 1. mailako Integralak unitateko laukizuzenak, azalera zeinuarekin eta bi kurben arteko azalera.`,
            es: `${bach2gIntegralsLabTools.length} herramientas con retos: del marginal al total y ¿cuándo se recupera la inversión?, nuevas; y de Integrales de 1.º, los rectángulos, el área con signo y el área entre dos curvas.`,
            en: `${bach2gIntegralsLabTools.length} tools with challenges: from the next unit to the total and when does the money come back?, new; and from Integrals of 1st year, the rectangles, the signed area and the area between two curves.`,
            ar: `${bach2gIntegralsLabTools.length} أدوات مع تحديات: من الحدّية إلى الكلية ومتى يُسترجع الاستثمار؟، وهي جديدة؛ ومن تكاملات السنة الأولى: المستطيلات والمساحة بالإشارة والمساحة بين منحنيين.`
        },
        progressIds: bach2gIntegralsLabChallengeIds,
        toolForTopic: bach2gIntegralsLabToolForTopic,
        render: (props) => <Bach2gIntegralsLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Bost joko: lasterketa, zein da jatorrizkoa?, azalera zeinuarekin, integralen detektibea eta memoria.',
            es: 'Cinco juegos: carrera, ¿qué primitiva es?, área con signo, detective de integrales y memoria.',
            en: 'Five games: race, which antiderivative is it?, signed area, integrals detective and memory.',
            ar: 'خمس ألعاب: السباق وأي دالة أصلية هي؟ والمساحة بالإشارة ومخبر التكاملات والذاكرة.'
        },
        progressIds: bach2gIntegralsGameProgressIds,
        recordsKey: BACH2G_INTEGRALS_GAME_RECORDS_KEY,
        render: (props) => <Bach2gIntegralsGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −3, 0,25 edo 3/2.', es: 'Escribe un número: 5, −3, 0,25 o 3/2.', en: 'Write a number: 5, −3, 0.25 or 3/2.', ar: 'اكتب عددًا: 5 أو ⁦−3⁩ أو 0.25 أو 3/2.' },
        defaultForm: 'any',
        inputMode: 'text',
        placeholder: () => ({ eu: 'Adib.: 3/2', es: 'Ej.: 3/2', en: 'e.g. 3/2', ar: 'مثال: 3/2' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −3, 2,5 edo 3/2.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −3, 2,5 o 3/2.', en: 'I don\'t understand that answer. Write a number, for example −3, 2.5 or 3/2.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−3⁩ أو 2.5 أو 3/2.' }
    },
    errorByStage: {
        primitives: { eu: '∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C; ∫ eˣ dx = eˣ + C; ∫ 1/x dx = ln|x| + C. Egiaztatu deribatuz.', es: '∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C; ∫ eˣ dx = eˣ + C; ∫ 1/x dx = ln|x| + C. Comprueba derivando.', en: '∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C; ∫ eˣ dx = eˣ + C; ∫ 1/x dx = ln|x| + C. Check by differentiating.', ar: '⁦∫ xⁿ dx = xⁿ⁺¹/(n + 1) + C⁩؛ ⁦∫ eˣ dx = eˣ + C⁩؛ ⁦∫ 1/x dx = ln|x| + C⁩. تحقّق بالاشتقاق.' },
        composite: { eu: "∫ u'uⁿ = uⁿ⁺¹/(n + 1); ∫ u'/u = ln|u|; ∫ u'eᵘ = eᵘ. Zenbaki bat falta bada, doitu. Puntu bat: ebatzi C.", es: "∫ u'uⁿ = uⁿ⁺¹/(n + 1); ∫ u'/u = ln|u|; ∫ u'eᵘ = eᵘ. Si falta un número, ajusta. Con un punto: despeja C.", en: "∫ u'uⁿ = uⁿ⁺¹/(n + 1); ∫ u'/u = ln|u|; ∫ u'eᵘ = eᵘ. If a number is missing, adjust. With a point: solve for C.", ar: "⁦∫ u'uⁿ = uⁿ⁺¹/(n + 1)⁩؛ ⁦∫ u'/u = ln|u|⁩؛ ⁦∫ u'eᵘ = eᵘ⁩. إذا نقص عدد فعدّل. ومع نقطة: استخرج C." },
        definite: { eu: 'Barrow: F(b) − F(a), goikoa ken behekoa. Mugak trukatzean zeinua aldatzen da.', es: 'Barrow: F(b) − F(a), arriba menos abajo. Al cambiar los límites cambia el signo.', en: 'Barrow: F(b) − F(a), top minus bottom. Swapping the limits changes the sign.', ar: 'بارو: ⁦F(b) − F(a)⁩، العلوي ناقص السفلي. وتبديل الحدين يغيّر الإشارة.' },
        areas: { eu: 'Zatitu ebaki-puntuetan eta batu balio absolutuak. Bi kurbaren artean: goikoa ken behekoa.', es: 'Parte en los cortes y suma valores absolutos. Entre dos curvas: la de arriba menos la de abajo.', en: 'Split at the crossings and add absolute values. Between two curves: top minus bottom.', ar: 'قسّم عند نقاط التقاطع واجمع القيم المطلقة. وبين منحنيين: الأعلى ناقص الأدنى.' },
        economy: { eu: "C(x) = K + ∫₀ˣ C'; pilatutakoa: erritmoaren integrala; igoera: ∫ₐᵇ I' = I(b) − I(a).", es: "C(x) = K + ∫₀ˣ C'; lo acumulado: la integral del ritmo; la subida: ∫ₐᵇ I' = I(b) − I(a).", en: "C(x) = K + ∫₀ˣ C'; what piles up: the integral of the rate; the rise: ∫ₐᵇ I' = I(b) − I(a).", ar: "⁦C(x) = K + ∫₀ˣ C'⁩؛ المتراكم: تكامل الوتيرة؛ الزيادة: ⁦∫ₐᵇ I' = I(b) − I(a)⁩." }
    }
}

export function IntegralakBatx2gIntroPage() {
    return <UnitPage unit={integralakBatx2gUnit} />
}
