import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { readStatisticsAnswer } from '../dbh2-estatistika-v2/answers'
import { bivarChallenges, bivarDiagnostic, bivarExerciseBank, bivarPractice } from './content'
import { BivariateHeroArt } from './figures'
import { BivarLaboratory } from './lab'
import { bivarLabChallengeIds, bivarLabToolForTopic, bivarLabTools } from './lab/labTools'
import { bivarStages, bivarTopics } from './lessons'

const bidimentsionalaBatx1zUnit: UnitDefinition = {
    storagePrefix: 'matella-bidimentsionala-batx1z',
    coursePath: '/matematika/batx1-zientziak',
    courseTitle: { eu: 'Batxilergoa 1 · Zientziak', es: '1.º Bachillerato · Ciencias', en: '1st Bachillerato · Sciences', ar: 'البكالوريا الأولى · العلوم' },
    title: { eu: 'Estatistika bidimentsionala', es: 'Estadística bidimensional', en: 'Two-variable statistics', ar: 'الإحصاء ثنائي المتغير' },
    documentTitle: { eu: 'Estatistika bidimentsionala · Batxilergoa 1', es: 'Estadística bidimensional · 1.º Bachillerato', en: 'Two-variable statistics · 1st Bachillerato', ar: 'الإحصاء ثنائي المتغير · البكالوريا الأولى' },
    tagline: {
        eu: 'Sarrera bikoitzeko taulak, banaketa marjinalak eta baldintzatuak, independentzia, puntu-hodeia, kobariantza, korrelazio-koefizientea eta bi erregresio-zuzenak.',
        es: 'Tablas de doble entrada, distribuciones marginales y condicionadas, independencia, nube de puntos, covarianza, coeficiente de correlación y las dos rectas de regresión.',
        en: 'Two-way tables, marginal and conditional distributions, independence, the scatter plot, covariance, the correlation coefficient and the two regression lines.',
        ar: 'الجداول مزدوجة المدخل، والتوزيعات الهامشية والشرطية، والاستقلال، وسحابة النقاط، والتغاير، ومعامل الارتباط، ومستقيما الانحدار.'
    },
    heroArt: <BivariateHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, taulatik bi zuzenetara', es: 'Cinco etapas, de la tabla a las dos rectas', en: 'Five stages, from the table to the two lines', ar: 'خمس مراحل، من الجدول إلى المستقيمين' },
    stages: bivarStages,
    topics: bivarTopics,
    diagnostic: bivarDiagnostic,
    guidedPractice: bivarPractice,
    exerciseBank: bivarExerciseBank,
    challenges: bivarChallenges,
    lab: {
        description: {
            eu: `${bivarLabTools.length} tresna, erronkekin: independenteak?, lau koadranteak eta guraizeak, berriak; eta 4. DBHko kontingentzia-taula eta hodeia, r eta erregresio-zuzena.`,
            es: `${bivarLabTools.length} herramientas con retos: ¿independientes?, los cuatro cuadrantes y las tijeras, nuevas; y de 4.º ESO, la tabla de contingencia y la nube, r y la recta de regresión.`,
            en: `${bivarLabTools.length} tools with challenges: independent?, the four quadrants and the scissors, new; and from 4th ESO, the contingency table and the cloud, r and the regression line.`,
            ar: `${bivarLabTools.length} أدوات مع تحديات: مستقلان؟ والأرباع الأربعة والمقصّ، وهي جديدة؛ ومن الصف الرابع: جدول التوافق والسحابة وr ومستقيم الانحدار.`
        },
        progressIds: bivarLabChallengeIds,
        toolForTopic: bivarLabToolForTopic,
        render: (props) => <BivarLaboratory {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbaki bat: 5, −2, 0,15 edo 1/3.', es: 'Escribe un número: 5, −2, 0,15 o 1/3.', en: 'Write a number: 5, −2, 0.15 or 1/3.', ar: 'اكتب عددًا: 5 أو ⁦−2⁩ أو 0.15 أو 1/3.' },
        defaultForm: 'any',
        inputMode: 'text',
        normalizeInput: readStatisticsAnswer,
        placeholder: () => ({ eu: 'Adib.: 0,6', es: 'Ej.: 0,6', en: 'e.g. 0.6', ar: 'مثال: 0.6' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi eskatutako moduan.', es: 'El valor es correcto, pero escríbelo de la forma que se pide.', en: 'The value is correct, but write it in the form that is asked for.', ar: 'القيمة صحيحة، لكن اكتبها بالصورة المطلوبة.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, adibidez −2, 0,6 edo 1/3.', es: 'No entiendo esa respuesta. Escribe un número, por ejemplo −2, 0,6 o 1/3.', en: 'I don\'t understand that answer. Write a number, for example −2, 0.6 or 1/3.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا، مثل ⁦−2⁩ أو 0.6 أو 1/3.' }
    },
    errorByStage: {
        tables: { eu: 'N gelaxka guztien batura da. Marjinalak errenkaden eta zutabeen guztizkoak dira. Baldintzatuan, zatitu errenkadaren guztizkoaz, ez N zenbakiaz.', es: 'N es la suma de todas las casillas. Las marginales son los totales de filas y columnas. En la condicionada, divide entre el total de la fila, no entre N.', en: 'N is the sum of all the cells. The marginals are the row and column totals. In a conditional, divide by the row total, not by N.', ar: 'N مجموع كل الخانات. والهامشيان مجاميع الأسطر والأعمدة. وفي الشرطي اقسم على مجموع السطر لا على N.' },
        cloud: { eu: 'Zentroa $(\\bar{x},\\bar{y})$ da. Minus bider minus, plus: behean ezkerrean ere biderkadura positiboa da. Hodeia behera: negatiboa, ez ahula.', es: 'El centro es $(\\bar{x},\\bar{y})$. Menos por menos es más: abajo a la izquierda el producto también es positivo. Nube que baja: negativa, no débil.', en: 'The centre is $(\\bar{x},\\bar{y})$. Minus times minus is plus: down on the left the product is positive too. A falling cloud: negative, not weak.', ar: 'المركز $(\\bar{x},\\bar{y})$. سالب في سالب موجب: في الأسفل يسارًا الجداء موجب أيضًا. السحابة الهابطة سالبة لا ضعيفة.' },
        parameters: { eu: '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: ez ahaztu kenketa. $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, desbideratzeekin, ez bariantzekin. Unitateak aldatzeak ez du r aldatzen.', es: '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: no olvides restar. $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, con las desviaciones, no con las varianzas. Cambiar de unidades no cambia r.', en: '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: do not forget to subtract. $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$, with the deviations, not the variances. Changing the units does not change r.', ar: '$\\sigma_{xy}=\\frac{\\sum x_i\\,y_i}{N}-\\bar{x}\\,\\bar{y}$: لا تنسَ الطرح. $r=\\frac{\\sigma_{xy}}{\\sigma_x\\,\\sigma_y}$ بالانحرافين لا بالتباينين. وتغيير الوحدات لا يغيّر r.' },
        regression: { eu: 'Y-ren X-rekiko malda $\\frac{\\sigma_{xy}}{\\sigma_x^2}$ da. x estimatzeko, erabili X-ren Y-rekiko zuzena. $m_{yx}\\cdot m_{xy}=r^2$, ez r.', es: 'La pendiente de Y sobre X es $\\frac{\\sigma_{xy}}{\\sigma_x^2}$. Para estimar x, usa la recta de X sobre Y. $m_{yx}\\cdot m_{xy}=r^2$, no r.', en: 'The slope of Y on X is $\\frac{\\sigma_{xy}}{\\sigma_x^2}$. To estimate x, use the line of X on Y. $m_{yx}\\cdot m_{xy}=r^2$, not r.', ar: 'ميل Y على X هو $\\frac{\\sigma_{xy}}{\\sigma_x^2}$. ولتقدير x استعمل مستقيم X على Y. و$m_{yx}\\cdot m_{xy}=r^2$ لا r.' },
        problems: { eu: 'Tarteekin, erabili klase-markak eta gelaxka bakoitzaren maiztasuna. $\\sum x^2$ eta $(\\sum x)^2$ ez dira gauza bera. $\\bar{y}$ zuzenaren balioa da $\\bar{x}$ puntuan.', es: 'Con intervalos, usa las marcas de clase y la frecuencia de cada casilla. $\\sum x^2$ no es $(\\sum x)^2$. $\\bar{y}$ es el valor de la recta en $\\bar{x}$.', en: 'With intervals, use the class marks and the frequency of each cell. $\\sum x^2$ is not $(\\sum x)^2$. $\\bar{y}$ is the value of the line at $\\bar{x}$.', ar: 'مع الفئات استعمل مراكزها وتكرار كل خانة. $\\sum x^2$ ليس $(\\sum x)^2$. و$\\bar{y}$ قيمة المستقيم عند $\\bar{x}$.' }
    }
}

export function BidimentsionalaBatx1zIntroPage() {
    return <UnitPage unit={bidimentsionalaBatx1zUnit} />
}
