import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readMoneyAnswer } from './answers'
import { proportionDbh4ApChallenges, proportionDbh4ApDiagnostic, proportionDbh4ApExerciseBank, proportionDbh4ApPractice } from './content'
import { ProportionDbh4ApHeroArt } from './figures'
import { proportionDbh4ApStages, proportionDbh4ApTopics } from './lessons'

const proportzionaltasunaDbh4ApUnit: UnitDefinition = {
    storagePrefix: 'matella-proportzionaltasuna-dbh4ap',
    coursePath: '/matematika/dbh4-aplikatuak',
    courseTitle: { eu: '4. DBH · Aplikatuak', es: '4.º ESO · Aplicadas', ar: 'الصف الرابع · التطبيقية' },
    title: { eu: 'Proportzionaltasuna', es: 'Proporcionalidad', ar: 'التناسب' },
    documentTitle: { eu: 'Proportzionaltasuna · 4. DBH', es: 'Proporcionalidad · 4.º ESO', ar: 'التناسب · الصف الرابع' },
    tagline: {
        eu: 'Hiruko erregelatik bankura: proportzionaltasun konposatua, banaketak, ehuneko kateatuak, interes bakuna eta konposatua, nahasketak, mugikariak eta txorrotak.',
        es: 'De la regla de tres al banco: proporcionalidad compuesta, repartos, porcentajes encadenados, interés simple y compuesto, mezclas, móviles y grifos.',
        ar: 'من قاعدة الثلاثة إلى المصرف: التناسب المركّب، والتوزيعات، والنسب المتتالية، والفائدة البسيطة والمركّبة، والخلائط، والمتحركات، والصنابير.'
    },
    heroArt: <ProportionDbh4ApHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, hiruko erregelatik problema aritmetikoetara', es: 'Cinco etapas, de la regla de tres a los problemas aritméticos', ar: 'خمس مراحل، من قاعدة الثلاثة إلى المسائل الحسابية' },
    stages: proportionDbh4ApStages,
    topics: proportionDbh4ApTopics,
    diagnostic: proportionDbh4ApDiagnostic,
    guidedPractice: proportionDbh4ApPractice,
    exerciseBank: proportionDbh4ApExerciseBank,
    challenges: proportionDbh4ApChallenges,
    answers: {
        note: { eu: 'Idatzi zenbaki bat, komarekin edo puntuarekin (27,75 edo 27.75). Ehunekoetan, idatzi % ikurraren aurreko zenbakia; dirua, zentimoetara biribilduta.', es: 'Escribe un número, con coma o con punto (27,75 o 27.75). En los porcentajes, escribe el número que va delante del %; el dinero, redondeado a los céntimos.', ar: 'اكتب عددًا بالنقطة أو بالفاصلة (27.75). وفي النسب المئوية اكتب العدد الذي يسبق ٪؛ والمال مقرّبًا إلى السنتات.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        normalizeInput: readMoneyAnswer,
        placeholder: () => ({ eu: 'Adib.: 27,75', es: 'Ej.: 27,75', ar: 'مثال: 27.75' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez 30 edo 27,75.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo 30 o 27,75.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل 30 أو 27.75.' }
    },
    errorByStage: {
        simple: { eu: 'Zuzena: zatidura konstantea, x = b · c : a. Alderantzizkoa: biderkadura konstantea, x = a · b : c.', es: 'Directa: cociente constante, x = b · c : a. Inversa: producto constante, x = a · b : c.', ar: 'الطردي: حاصل قسمة ثابت، x = b · c : a. العكسي: حاصل ضرب ثابت، x = a · b : c.' },
        compound: { eu: 'Magnitude bakoitza bere aldetik: zuzena berria/zaharra, alderantzizkoa zaharra/berria. Banaketa alderantzizkoa: alderantzizkoekiko.', es: 'Cada magnitud por separado: directa nuevo/viejo, inversa viejo/nuevo. Reparto inverso: a los inversos.', ar: 'كل مقدار على حدة: الطردي الجديد/القديم، والعكسي القديم/الجديد. التوزيع العكسي: على المقلوبات.' },
        percent: { eu: 'Amaierakoa = hasierakoa · indizea. Kateatuak: biderkatu indizeak.', es: 'Final = inicial · índice. Encadenados: multiplica los índices.', ar: 'النهائية = الأصلية · المؤشر. المتتالية: اضرب المؤشرات.' },
        interest: { eu: 'Bakuna: I = C · r · t : 100 (hilabeteak: 1200). Konposatua: urtero bider 1 + r : 100.', es: 'Simple: I = C · r · t : 100 (meses: 1200). Compuesto: cada año por 1 + r : 100.', ar: 'البسيطة: I = C · r · t : 100 (الأشهر: 1200). المركّبة: كل سنة في 1 + r : 100.' },
        problems: { eu: 'Nahasketa: kostu osoa : kantitate osoa. Mugikariak: batu edo kendu abiadurak. Txorrotak: batu ordu bateko zatiak.', es: 'Mezcla: coste total : cantidad total. Móviles: suma o resta las velocidades. Grifos: suma las partes de una hora.', ar: 'الخليط: الكلفة الكلية : الكمية الكلية. المتحركات: اجمع السرعتين أو اطرحهما. الصنابير: اجمع أجزاء الساعة.' }
    }
}

export function ProportzionaltasunaDbh4ApIntroPage() {
    return <UnitPage unit={proportzionaltasunaDbh4ApUnit} />
}
