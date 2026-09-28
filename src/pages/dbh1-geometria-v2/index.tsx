import { UnitPage } from '../../features/unit-v2/UnitPage'
import type { UnitDefinition } from '../../features/unit-v2/types'
import { geometryIntroChallenges, geometryIntroDiagnostic, geometryIntroExerciseBank, geometryIntroPractice } from './content'
import { GeometryIntroHeroArt } from './figures'
import { GeometryIntroGames } from './games'
import { GEOMETRY_GAME_RECORDS_KEY, geometryGameProgressIds } from './games/info'
import { GeometryIntroLaboratory } from './lab'
import { geometryLabChallengeIds, geometryLabToolForTopic, geometryLabTools } from './lab/labTools'
import { geometryIntroStages, geometryIntroTopics } from './lessons'

const geometriaIntroUnit: UnitDefinition = {
    storagePrefix: 'matella-geometria-dbh1',
    coursePath: '/matematika/dbh1',
    courseTitle: { eu: '1. DBH', es: '1.º ESO', ar: 'الصف الأول' },
    title: { eu: 'Planoko geometria', es: 'Geometría del plano', ar: 'هندسة المستوي' },
    documentTitle: { eu: 'Planoko geometria · 1. DBH', es: 'Geometría del plano · 1.º ESO', ar: 'هندسة المستوي · الصف الأول' },
    tagline: {
        eu: 'Zuzenak, angeluak, triangeluak, laukiak eta zirkuluak: ikasi irudiak ezagutzen, Pitagorasen teorema erabiltzen eta perimetroak eta azalerak kalkulatzen.',
        es: 'Rectas, ángulos, triángulos, cuadriláteros y círculos: aprende a reconocer figuras, a usar el teorema de Pitágoras y a calcular perímetros y áreas.',
        ar: 'مستقيمات وزوايا ومثلثات ورباعيات ودوائر: تعلّم التعرّف إلى الأشكال واستعمال مبرهنة فيثاغورس وحساب المحيطات والمساحات.'
    },
    heroArt: <GeometryIntroHeroArt />,
    pathSubtitle: { eu: 'Bost etapa, zuzenetatik azaleretara', es: 'Cinco etapas, de las rectas a las áreas', ar: 'خمس مراحل، من المستقيمات إلى المساحات' },
    stages: geometryIntroStages,
    topics: geometryIntroTopics,
    diagnostic: geometryIntroDiagnostic,
    guidedPractice: geometryIntroPractice,
    exerciseBank: geometryIntroExerciseBank,
    challenges: geometryIntroChallenges,
    lab: {
        description: { eu: `${geometryLabTools.length} tresna: garraiagailua, triangelu-sortzailea, Pitagorasen karratuak, azalera-sarea eta zirkulua, erronkekin.`, es: `${geometryLabTools.length} herramientas: transportador, constructor de triángulos, cuadrados de Pitágoras, cuadrícula de áreas y círculo, con retos.`, ar: `${geometryLabTools.length} أدوات: المنقلة وباني المثلثات ومربعات فيثاغورس وشبكة المساحات والدائرة، مع تحديات.` },
        progressIds: geometryLabChallengeIds,
        toolForTopic: geometryLabToolForTopic,
        render: (props) => <GeometryIntroLaboratory {...props} />
    },
    games: {
        description: { eu: 'Hiru joko: lasterketa, angelu-begia eta memoria.', es: 'Tres juegos: carrera, ojo de ángulos y memoria.', ar: 'ثلاث ألعاب: السباق وعين الزوايا والذاكرة.' },
        progressIds: geometryGameProgressIds,
        recordsKey: GEOMETRY_GAME_RECORDS_KEY,
        render: (props) => <GeometryIntroGames {...props} />
    },
    answers: {
        note: { eu: 'Idatzi zenbakia bakarrik (unitaterik gabe): 55 edo 31,4.', es: 'Escribe solo el número (sin unidades): 55 o 31,4.', ar: 'اكتب العدد فقط (دون وحدات): 55 أو 31.4.' },
        defaultForm: 'any',
        inputMode: 'decimal',
        placeholder: () => ({ eu: 'Adib.: 31,4', es: 'Ej.: 31,4', ar: 'مثال: 31.4' }),
        wrongForm: () => ({ eu: 'Balioa zuzena da, baina idatzi zenbaki gisa.', es: 'El valor es correcto, pero escríbelo como número.', ar: 'القيمة صحيحة، لكن اكتبها عددًا.' }),
        unreadable: { eu: 'Ez dut erantzun hori ulertzen. Idatzi zenbaki bat, unitaterik gabe: 55 edo 31,4.', es: 'No entiendo esa respuesta. Escribe un número, sin unidades: 55 o 31,4.', ar: 'لم أفهم هذه الإجابة. اكتب عددًا دون وحدات: 55 أو 31.4.' }
    },
    errorByStage: {
        angles: { eu: 'Konparatu 90°-rekin eta 180°-rekin: osagarriak 90° dira batuta, betegarriak 180°.', es: 'Compara con 90° y 180°: complementarios suman 90°, suplementarios 180°.', ar: 'قارن بـ 90° و180°: المتتامتان مجموعهما 90° والمتكاملتان 180°.' },
        polygons: { eu: 'Triangelu baten angeluak 180° dira batuta; lauki batenak, 360°.', es: 'Los ángulos de un triángulo suman 180°; los de un cuadrilátero, 360°.', ar: 'مجموع زوايا المثلث 180°، والرباعي 360°.' },
        pythagoras: { eu: 'Hipotenusa alde luzeena da: a² = b² + c². Amaieran, erro karratua.', es: 'La hipotenusa es el lado más largo: a² = b² + c². Al final, raíz cuadrada.', ar: 'الوتر هو الضلع الأطول: a² = b² + c². وفي النهاية الجذر التربيعي.' },
        perimeters: { eu: 'Perimetroa: alde guztiak batuta. Zirkunferentzia: L = 2πr.', es: 'Perímetro: todos los lados sumados. Circunferencia: L = 2πr.', ar: 'المحيط: مجموع الأضلاع. الدائرة: L = 2πr.' },
        areas: { eu: 'Laukizuzena: b · h. Triangelua: b · h : 2. Zirkulua: πr².', es: 'Rectángulo: b · h. Triángulo: b · h : 2. Círculo: πr².', ar: 'المستطيل: b · h. المثلث: b · h : 2. القرص: πr².' }
    }
}

export function GeometriaIntroPage() {
    return <UnitPage unit={geometriaIntroUnit} />
}
