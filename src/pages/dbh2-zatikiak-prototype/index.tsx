import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import {
    challenges,
    diagnosticQuestions,
    guidedPractice,
    learningStages,
    theoryTopics
} from './content'
import { fractionExerciseSections } from '../dbh2-zatikiak/ExercisesPage/exercisesData'
import { FractionLaboratory } from './lab'
import { labChallengeIds, labToolForTopic, labTools } from './lab/labTools'
import { GamesArea } from './games'
import { GAME_RECORDS_KEY, gameProgressIds } from './games/records'
import { gameModeForPath } from './routing'

const zatikiakUnit: UnitDefinition = {
    storagePrefix: 'matella-zatikiak-v2',
    coursePath: '/matematika/dbh2',
    courseTitle: { eu: '2. DBH', es: '2.º ESO', ar: 'الصف الثاني' },
    title: { eu: 'Zatikiak', es: 'Fracciones', ar: 'الكسور' },
    documentTitle: { eu: 'Zatikiak · 2. DBH', es: 'Fracciones · 2.º ESO', ar: 'الكسور · الصف الثاني' },
    tagline: {
        eu: 'Zatia, banaketa, neurria eta zenbakia: ezagutu zatiki batek izan dezakeen guztia eta ikasi harekin segurtasunez kalkulatzen.',
        es: 'Parte, reparto, medida y número: descubre todo lo que puede ser una fracción y aprende a calcular con ella con seguridad.',
        ar: 'جزء وتقسيم وقياس وعدد: اكتشف كل ما يمكن أن يكونه الكسر وتعلّم الحساب به بثقة.'
    },
    heroArt: (
        <div className="fraction-v2-collage" aria-hidden="true">
            <div className="fraction-v2-collage-pizza"><span /><span /></div>
            <div className="fraction-v2-collage-sticker"><span>3</span><span>4</span></div>
            <div className="fraction-v2-collage-bar">
                <div><span className="filled" /><span className="filled" /><span /><span /><span /></div>
                <strong>2 / 5</strong>
            </div>
            <div className="fraction-v2-collage-line">
                <div><span className="tick" /><span className="tick" /><span className="tick" /><span className="tick" /><span className="dot" /></div>
                <p><span>0</span><span>1</span><span>2</span><span>3</span></p>
            </div>
        </div>
    ),
    pathSubtitle: { eu: 'Bost etapa, zatikiaren ideiatik proportzionaltasunera', es: 'Cinco etapas, de la idea de fracción a la proporcionalidad', ar: 'خمس مراحل، من فكرة الكسر إلى التناسب' },
    stages: learningStages,
    topics: theoryTopics,
    diagnostic: diagnosticQuestions,
    guidedPractice,
    exerciseBank: fractionExerciseSections,
    challenges,
    answers: {
        note: { eu: 'Enuntziatuak forma zehatzik eskatzen ez badu, zatiki baliokideak eta koma edo puntua duten hamartarrak onartzen dira.', es: 'Si el enunciado no pide una forma concreta, se aceptan fracciones equivalentes y decimales con coma o punto.', ar: 'إذا لم يطلب السؤال صيغة محددة، تُقبل الكسور المكافئة والأعداد العشرية بالفاصلة أو النقطة.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        placeholder: (form) => form === 'mixed'
            ? { eu: 'Adib.: 2 1/3', es: 'Ej.: 2 1/3', ar: 'مثال: 2 1/3' }
            : form === 'simplified'
                ? { eu: 'Adib.: 3/4', es: 'Ej.: 3/4', ar: 'مثال: 3/4' }
                : { eu: 'Adib.: 3/4 edo 0,75', es: 'Ej.: 3/4 o 0,75', ar: 'مثال: 3/4 أو 0.75' },
        wrongForm: (form) => form === 'mixed'
            ? { eu: 'Balioa zuzena da, baina idatzi zenbaki misto gisa: oso bat eta zatiki propio laburtezin bat, adibidez 2 1/3.', es: 'El valor es correcto, pero escríbelo como número mixto: un entero y una fracción propia irreducible, por ejemplo 2 1/3.', ar: 'القيمة صحيحة، لكن اكتبها عددًا كسريًا: عدد صحيح وكسر حقيقي في أبسط صورة، مثل 2 1/3.' }
            : { eu: 'Balioa zuzena da, baina oraindik sinplifika daiteke. Idatzi zatiki laburtezina.', es: 'El valor es correcto, pero todavía se puede simplificar. Escribe la fracción irreducible.', ar: 'القيمة صحيحة، لكن يمكن تبسيطها أكثر. اكتب الكسر في أبسط صورة.' },
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zatiki bat (3/4), zenbaki misto bat (2 1/3) edo hamartar bat (0,75).', es: 'No entiendo esa respuesta. Escribe una fracción (3/4), un número mixto (2 1/3) o un decimal (0,75).', ar: 'لم أفهم هذه الإجابة. اكتب كسرًا (3/4) أو عددًا كسريًا (2 1/3) أو عددًا عشريًا (0.75).' }
    },
    errorByStage: {
        meaning: { eu: 'Begiratu zer adierazten duten zenbakitzaileak eta izendatzaileak, eta ea unitate osoak dauden.', es: 'Revisa qué representan numerador y denominador y si hay unidades completas.', ar: 'راجع معنى البسط والمقام وهل توجد وحدات كاملة.' },
        equivalence: { eu: 'Egiaztatu bi terminoetan faktore bera erabili duzula eta emaitza sinplifikatuta dagoela.', es: 'Comprueba que has usado el mismo factor en ambos términos y que el resultado está simplificado.', ar: 'تحقق من استعمال العامل نفسه في البسط والمقام ومن تبسيط النتيجة.' },
        ordering: { eu: 'Begiratu zeinuari lehenik; gero erabili izendatzaile komuna edo biderketa gurutzatua.', es: 'Observa primero el signo; después usa denominador común o productos cruzados.', ar: 'ابدأ بالإشارة ثم استعمل مقامًا مشتركًا أو الضرب التبادلي.' },
        operations: { eu: 'Berrikusi eragiketen ordena, zeinua eta azken sinplifikazioa.', es: 'Revisa el orden de operaciones, el signo y la simplificación final.', ar: 'راجع ترتيب العمليات والإشارة والتبسيط النهائي.' },
        proportionality: { eu: 'Identifikatu zatiaren eta guztizkoaren arteko erlazioa, eta egiaztatu unitatea.', es: 'Identifica la relación entre la parte y el total y comprueba la unidad.', ar: 'حدّد العلاقة بين الجزء والكل وتحقق من الوحدة.' }
    },
    lab: {
        description: { eu: `${labTools.length} tresna zatikiak manipulatzeko, erronkekin.`, es: `${labTools.length} herramientas para manipular fracciones, con retos.`, ar: `${labTools.length} أدوات للتعامل مع الكسور، مع تحديات.` },
        progressIds: labChallengeIds,
        toolForTopic: labToolForTopic,
        render: ({ language, tool, onToolChange, completedIds, onComplete, onOpenLesson }) => (
            <FractionLaboratory
                language={language}
                tool={tool}
                onToolChange={onToolChange}
                completedIds={completedIds}
                onComplete={onComplete}
                onOpenLesson={onOpenLesson}
            />
        )
    },
    games: {
        description: { eu: 'Lau joko abiadura eta zehaztasuna entrenatzeko.', es: 'Cuatro juegos para entrenar rapidez y precisión.', ar: 'أربع ألعاب لتدريب السرعة والدقة.' },
        progressIds: gameProgressIds,
        recordsKey: GAME_RECORDS_KEY,
        render: ({ language, pathname, completedIds, onComplete }) => (
            <GamesArea language={language} completedIds={completedIds} onComplete={onComplete} initialGame={gameModeForPath(pathname)} />
        )
    }
}

export function ZatikiakPrototypePage() {
    return <UnitPage unit={zatikiakUnit} />
}
