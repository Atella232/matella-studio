import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { socialBivarChallenges, socialBivarDiagnostic, socialBivarExerciseBank, socialBivarPractice } from './content'
import { SocialBivarHeroArt } from './figures'
import { SocialBivarGames } from './games'
import { SOCIAL_BIVAR_GAME_RECORDS_KEY, socialBivarGameProgressIds } from './games/info'
import { SocialBivarLaboratory } from './lab'
import { socialBivarLabChallengeIds, socialBivarLabToolForTopic, socialBivarLabTools } from './lab/labTools'
import { socialBivarStages, socialBivarTopics } from './lessons'

const bidimentsionalaBatx1gUnit: UnitDefinition = {
    storagePrefix: 'matella-bidimentsionala-batx1g',
    coursePath: '/matematika/batx1-gizarte',
    courseTitle: { eu: 'Batxilergoa 1 · Gizarte Zientziak', es: '1.º Bachillerato · Ciencias Sociales', en: '1st Bachillerato · Social Sciences', ar: 'البكالوريا الأولى · العلوم الاجتماعية' },
    title: { eu: 'Estatistika bidimentsionala', es: 'Estadística bidimensional', en: 'Two-variable statistics', ar: 'الإحصاء ثنائي المتغير' },
    documentTitle: { eu: 'Estatistika bidimentsionala · Batxilergoa 1 · Gizarte Zientziak', es: 'Estadística bidimensional · 1.º Bachillerato · Ciencias Sociales', en: 'Two-variable statistics · 1st Bachillerato · Social Sciences', ar: 'الإحصاء ثنائي المتغير · البكالوريا الأولى · العلوم الاجتماعية' },
    tagline: {
        eu: 'Erlazio funtzionala ala estatistikoa, puntu-hodeia eta r, kobariantza, bi erregresio-zuzenak eta estimazio fidagarriak, eta kontingentzia-taulak: errenta, gastua, kontsumoa eta inkestak.',
        es: 'Relación funcional o estadística, la nube de puntos y r, la covarianza, las dos rectas de regresión y las estimaciones fiables, y las tablas de contingencia: renta, gasto, consumo y encuestas.',
        en: 'Functional or statistical relation, the scatter plot and r, covariance, the two regression lines and reliable estimates, and contingency tables: income, spending, consumption and surveys.',
        ar: 'العلاقة الدالية أو الإحصائية، وسحابة النقاط وr، والتغاير، ومستقيما الانحدار والتقديرات الموثوقة، وجداول التوافق: الدخل والإنفاق والاستهلاك والاستطلاعات.'
    },
    heroArt: <SocialBivarHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, hodeitik kontingentzia-tauletara', es: 'Cinco etapas, de la nube a las tablas de contingencia', en: 'Five stages, from the cloud to contingency tables', ar: 'خمس مراحل، من السحابة إلى جداول التوافق' },
    stages: socialBivarStages,
    topics: socialBivarTopics,
    diagnostic: socialBivarDiagnostic,
    guidedPractice: socialBivarPractice,
    exerciseBank: socialBivarExerciseBank,
    challenges: socialBivarChallenges,
    lab: {
        description: {
            eu: `${socialBivarLabTools.length} tresna, erronkekin: funtzionala ala estatistikoa eta fidagarria ala ez, berriak; eta Zientzietako lau koadranteak, guraizeak eta independenteak, eta 4. DBHko hodeia eta kontingentzia-taula.`,
            es: `${socialBivarLabTools.length} herramientas con retos: ¿funcional o estadística? y ¿fiable o no?, nuevas; y de Ciencias, los cuatro cuadrantes, las tijeras y ¿independientes?, y de 4.º ESO, la nube y la tabla de contingencia.`,
            en: `${socialBivarLabTools.length} tools with challenges: functional or statistical? and reliable or not?, new; and from Sciences, the four quadrants, the scissors and independent?, and from 4th ESO, the cloud and the contingency table.`,
            ar: `${socialBivarLabTools.length} أدوات مع تحديات: دالية أم إحصائية وموثوق أم لا، وهما جديدتان؛ ومن العلوم: الأرباع الأربعة والمقصّ ومستقلان؟، ومن الصف الرابع: السحابة وجدول التوافق.`
        },
        progressIds: socialBivarLabChallengeIds,
        toolForTopic: socialBivarLabToolForTopic,
        render: (props) => <SocialBivarLaboratory {...props} />
    },
    games: {
        description: {
            eu: 'Zazpi joko: lasterketa, zein r dagokio, aurreikusi zuzenarekin, detektibea eta memoria, berriak; eta Zientzietako kobariantzaren zeinua eta 4. DBHko asmatu korrelazioa.',
            es: 'Siete juegos: carrera, ¿qué r le toca?, predice con la recta, detective y memoria, nuevos; y el signo de la covarianza de Ciencias y adivina la correlación de 4.º ESO.',
            en: 'Seven games: race, which r fits?, predict with the line, detective and memory, new; and the sign of the covariance from Sciences and guess the correlation from 4th ESO.',
            ar: 'سبع ألعاب: السباق وأي r يناسبها وتوقّع بالمستقيم والمخبر والذاكرة، وهي جديدة؛ وإشارة التغاير من العلوم وخمّن الارتباط من الصف الرابع.'
        },
        progressIds: socialBivarGameProgressIds,
        recordsKey: SOCIAL_BIVAR_GAME_RECORDS_KEY,
        render: (props) => <SocialBivarGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −2, 0,15 edo 3/4.', es: 'Escribe un número: 5, −2, 0,15 o 3/4.', en: 'Write a number: 5, −2, 0.15 or 3/4.', ar: 'اكتب عددًا: 5 أو ⁦−2⁩ أو 0.15 أو 3/4.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,8', es: 'Ej.: 0,8', en: 'e.g. 0.8', ar: 'مثال: 0.8' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −2, 0,15 edo 3/4.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −2, 0,15 o 3/4.', en: 'I don\'t understand that answer. Write a number, for example −2, 0.15 or 3/4.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−2⁩ أو 0.15 أو 3/4.' }
    },
    errorByStage: {
        cloud: { eu: 'r koefizientearen indarra $|r|$ da, eta zeinuak hodeia gora ala behera doan bakarrik esaten du.', es: 'La fuerza de r es $|r|$; el signo solo dice si la nube sube o baja.', en: 'The strength of r is $|r|$; the sign only says whether the cloud rises or falls.', ar: 'قوة r هي $|r|$؛ والإشارة تقول فقط هل تصعد السحابة أم تهبط.' },
        parameters: { eu: 'Kobariantzan, ez ahaztu $-\\bar{x}\\,\\bar{y}$. r kalkulatzeko, zatitu $\\sigma_x\\,\\sigma_y$ biderkaduraz, ez bariantzez.', es: 'En la covarianza no olvides el $-\\bar{x}\\,\\bar{y}$. Para r, divide entre $\\sigma_x\\,\\sigma_y$, no entre las varianzas.', en: 'In the covariance, do not forget the $-\\bar{x}\\,\\bar{y}$. For r, divide by $\\sigma_x\\,\\sigma_y$, not by the variances.', ar: 'في التغاير لا تنسَ $-\\bar{x}\\,\\bar{y}$. ولحساب r اقسم على $\\sigma_x\\,\\sigma_y$ لا على التباينين.' },
        regression: { eu: 'y estimatzeko, Y-ren X-rekiko zuzena; x estimatzeko, X-ren Y-rekikoa. Datuetatik urrun, estimazioa ez da fidagarria.', es: 'Para estimar y, la recta de Y sobre X; para estimar x, la de X sobre Y. Lejos de los datos, la estimación no es fiable.', en: 'To estimate y, the line of Y on X; to estimate x, that of X on Y. Far from the data, the estimate is not reliable.', ar: 'لتقدير y مستقيم Y على X، ولتقدير x مستقيم X على Y. وبعيدًا عن البيانات لا يكون التقدير موثوقًا.' },
        problems: { eu: 'Bi zuzenak $(\\bar{x},\\bar{y})$ puntutik pasatzen dira, eta $r^2=m_{yx}\\cdot m_{xy}$.', es: 'Las dos rectas pasan por $(\\bar{x},\\bar{y})$ y $r^2=m_{yx}\\cdot m_{xy}$.', en: 'Both lines pass through $(\\bar{x},\\bar{y})$ and $r^2=m_{yx}\\cdot m_{xy}$.', ar: 'يمرّ المستقيمان بـ $(\\bar{x},\\bar{y})$ و$r^2=m_{yx}\\cdot m_{xy}$.' },
        tables: { eu: 'Baldintzazkoa bere errenkadaren edo zutabearen guztizkoaz zatitzen da, ez $N$ zenbakiaz.', es: 'La condicionada se divide entre el total de su fila o columna, no entre $N$.', en: 'The conditional is divided by the total of its row or column, not by $N$.', ar: 'يُقسَم التوزيع الشرطي على مجموع سطره أو عموده لا على $N$.' }
    }
}

export function BidimentsionalaBatx1gIntroPage() {
    return <UnitPage unit={bidimentsionalaBatx1gUnit} />
}
