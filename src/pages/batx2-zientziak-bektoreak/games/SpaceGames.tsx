import { useEffect, useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { usePlayback } from '../../dbh4-aplikatuak-proportzionaltasuna/lab/usePlayback'
import { Board3D } from '../space/Board3D'
import { SPACE, type SceneItem } from '../space/scene'
import { parallelogram } from '../space/sceneKit'
import type { Vec3 } from '../space/vec3'
import { CROSS_ROUNDS, createCrossRounds, drawnArrow, type CrossRound } from './crossPick'
import { createFlatRounds, FLAT_ROUNDS, mixedAt, wAt, type FlatRound } from './flatBox'
import { createKindRounds, isKindChoice, KIND_ROUNDS, VALUE_KINDS, type KindRound, type ValueKind } from './kind'
import './SpaceGames.css'

/* ==========================================================================
   The three round games of Espazioko bektoreak (Batxilergoa 2 · Zientziak):
   ¿Número o vector? in space, ¿Cuál es u×v? (four arrows on the 3D board)
   and La caja aplastada (the box moves to the k chosen and flattens).
   Logic in kind.ts, crossPick.ts and flatBox.ts.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const vec = (a: Vec3) => `(${a.map((value) => value + 0).join(',')})`

/* ---------- Number or vector? ---------- */

const KIND_LABELS: Record<ValueKind, LocalizedText> = {
    number: say('Zenbaki bat', 'Un número', 'عدد', 'A number'),
    vector: say('Bektore bat', 'Un vector', 'متجه', 'A vector'),
    nonsense: say('Ez du zentzurik', 'No tiene sentido', 'بلا معنى', 'It makes no sense')
}

const KIND_REASONS: Record<ValueKind, LocalizedText> = {
    number: say('Zenbaki bat da: biderkadura eskalarrak, mistoak eta moduluek zenbakiak ematen dituzte.', 'Es un número: los productos escalar y mixto y los módulos dan números.', 'إنه عدد: الجداءان السلمي والمختلط والأطوال تعطي أعدادًا.', 'It is a number: dot and triple products and magnitudes give numbers.'),
    vector: say('Bektore bat da: biderkadura bektoriala, zenbaki bat bider bektore bat edo bektoreen batura.', 'Es un vector: un producto vectorial, un número por un vector o una suma de vectores.', 'إنه متجه: جداء متجهي أو عدد في متجه أو مجموع متجهات.', 'It is a vector: a cross product, a number times a vector or a sum of vectors.'),
    nonsense: say('Ez du zentzurik: ezin dira zenbaki bat eta bektore bat batu, eta biderkadura bektoriala bi bektoreren artekoa da.', 'No tiene sentido: no se suman un número y un vector, y el producto vectorial es entre dos vectores.', 'بلا معنى: لا يُجمع عدد ومتجه، والجداء المتجهي بين متجهين.', 'It makes no sense: you cannot add a number and a vector, and the cross product is between two vectors.')
}

function KindPlay({ round, language, onAnswer, answered }: RoundProps<KindRound>) {
    const l = useGameText(language)
    const [kind, setKind] = useState<ValueKind | null>(null)
    const [value, setValue] = useState<string | null>(null)
    const chooseKind = (choice: ValueKind) => {
        if (answered || kind !== null) return
        setKind(choice)
        if (choice !== round.kind || choice === 'nonsense') onAnswer(choice === round.kind)
    }
    const chooseValue = (option: string) => {
        if (answered || value !== null) return
        setValue(option)
        onAnswer(option === round.answer)
    }
    const right = isKindChoice(round, kind, value)
    return (
        <>
            <div className="space-games-data" dir="ltr">
                <span>{formula(`\\vec{u}=${vec(round.u)}`, language)}</span>
                <span>{formula(`\\vec{v}=${vec(round.v)}`, language)}</span>
                <span>{formula(`\\vec{w}=${vec(round.w)}`, language)}</span>
            </div>
            <div className="dbh4-big-formula space-games-big" dir="ltr">{formula(round.latex, language)}</div>
            <p className="prop3-prompt">{l(say('Zer ematen du?', '¿Qué da?', 'ماذا تعطي؟', 'What does it give?'))}</p>
            <div className="prop3-options space-games-kinds">
                {VALUE_KINDS.map((option) => (
                    <button key={option} type="button" disabled={answered || kind !== null} className={kind === null && !answered ? '' : option === round.kind ? 'right' : option === kind ? 'wrong' : ''} onClick={() => chooseKind(option)}>{l(KIND_LABELS[option])}</button>
                ))}
            </div>
            {kind !== null && kind === round.kind && round.kind !== 'nonsense' && (
                <>
                    <p className="prop3-prompt">{l(say('Zenbat da?', '¿Cuánto vale?', 'كم تساوي؟', 'What is it?'))}</p>
                    <div className="prop3-options space-games-values" dir="ltr">
                        {round.options.map((option) => (
                            <button key={option} type="button" disabled={answered} className={!answered ? '' : option === round.answer ? 'right' : option === value ? 'wrong' : ''} onClick={() => chooseValue(option)}>{formula(option, language)}</button>
                        ))}
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <MathText text={l(KIND_REASONS[round.kind])} />
                    <span className="dbh4-worked space-games-worked">{formula(round.working, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function KindGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: KIND_ROUNDS,
                rules: [
                    say('Adierazpen bakoitzak zenbaki bat edo bektore bat ematen du, edo ez du zentzurik.', 'Cada expresión da un número o un vector, o no tiene sentido.', 'كل عبارة تعطي عددًا أو متجهًا، أو تكون بلا معنى.', 'Each expression gives a number or a vector, or it makes no sense.'),
                    say('$\\vec{u}\\cdot\\vec{v}$ eta $[\\vec{u},\\vec{v},\\vec{w}]$ zenbakiak dira; $\\vec{u}\\times\\vec{v}$, bektore bat.', '$\\vec{u}\\cdot\\vec{v}$ y $[\\vec{u},\\vec{v},\\vec{w}]$ son números; $\\vec{u}\\times\\vec{v}$, un vector.', '$\\vec{u}\\cdot\\vec{v}$ و$[\\vec{u},\\vec{v},\\vec{w}]$ عددان؛ و$\\vec{u}\\times\\vec{v}$ متجه.', '$\\vec{u}\\cdot\\vec{v}$ and $[\\vec{u},\\vec{v},\\vec{w}]$ are numbers; $\\vec{u}\\times\\vec{v}$ is a vector.'),
                    say('Asmatzen baduzu, aukeratu haren balioa.', 'Si aciertas, elige su valor.', 'إذا أصبت فاختر قيمتها.', 'If you get it right, choose its value.')
                ],
                create: createKindRounds,
                stars: standardStars(KIND_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: KindPlay
            }}
        />
    )
}

/* ---------- Which is u × v? ---------- */

const CANDIDATE_COLORS = [SPACE.green, SPACE.violet, SPACE.mustard, '#1b8a9a']

const CANDIDATE_REASONS: Record<string, LocalizedText> = {
    swapped: say('Hori $\\vec{v}\\times\\vec{u}$ da: aurkako noranzkoa.', 'Esa es $\\vec{v}\\times\\vec{u}$: el sentido contrario.', 'هذا $\\vec{v}\\times\\vec{u}$: المنحى المعاكس.', 'That is $\\vec{v}\\times\\vec{u}$: the opposite sense.'),
    'j-forgotten': say('Hori $\\vec{j}$ bektorearen minus zeinua ahaztuta ateratzen da: ez da bi bektoreekiko perpendikularra.', 'Esa sale al olvidar el signo menos de la $\\vec{j}$: no es perpendicular a los dos.', 'هذا ينتج عن نسيان إشارة $\\vec{j}$ السالبة: ليس عموديًا على الاثنين.', 'That comes from forgetting the minus of the $\\vec{j}$: it is not perpendicular to both.'),
    'one-only': say('Hori bektore bakar batekiko perpendikularra da, ez bientzat.', 'Esa es perpendicular a uno solo de los dos.', 'هذا عمودي على متجه واحد فقط.', 'That one is perpendicular to only one of them.')
}

function CrossPlay({ round, language, onAnswer, answered }: RoundProps<CrossRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<string | null>(null)
    const choose = (letter: string) => {
        if (answered) return
        setPicked(letter)
        onAnswer(letter === round.answer)
    }
    const pickedKind = round.candidates.find((candidate) => candidate.letter === picked)?.kind
    const scene: SceneItem[] = [
        parallelogram([0, 0, 0], round.u, round.v, SPACE.planeBlue, 0.32),
        ...round.candidates.map((candidate, index): SceneItem => ({
            kind: 'vector',
            to: drawnArrow(candidate.vector),
            color: answered && candidate.letter !== round.answer ? SPACE.muted : CANDIDATE_COLORS[index],
            label: candidate.letter,
            width: answered && candidate.letter === round.answer ? 4.4 : 2.8,
            dashed: answered && candidate.letter !== round.answer
        })),
        { kind: 'vector', to: round.u, color: SPACE.red, label: 'u' },
        { kind: 'vector', to: round.v, color: SPACE.blue, label: 'v' }
    ]
    return (
        <>
            <div className="space-games-data" dir="ltr">
                <span>{formula(`\\vec{u}=${vec(round.u)}`, language)}</span>
                <span>{formula(`\\vec{v}=${vec(round.v)}`, language)}</span>
            </div>
            <Board3D key={`${vec(round.u)}${vec(round.v)}`} scene={scene} language={language} range={4} height={300} label={l(say('u eta v bektoreak eta A, B, C eta D geziak', 'Los vectores u y v y las flechas A, B, C y D', 'المتجهان u وv والأسهم A وB وC وD', 'The vectors u and v and the arrows A, B, C and D'))} />
            <p className="prop3-prompt"><MathText text={l(say('Zein gezi da $\\vec{u}\\times\\vec{v}$?', '¿Qué flecha es $\\vec{u}\\times\\vec{v}$?', 'أي سهم هو $\\vec{u}\\times\\vec{v}$؟', 'Which arrow is $\\vec{u}\\times\\vec{v}$?'))} /></p>
            <div className="prop3-options space-games-letters" dir="ltr">
                {round.candidates.map((candidate) => (
                    <button key={candidate.letter} type="button" disabled={answered} className={!answered ? '' : candidate.letter === round.answer ? 'right' : candidate.letter === picked ? 'wrong' : ''} onClick={() => choose(candidate.letter)}>
                        <strong>{candidate.letter}</strong>
                        {(round.showCoordinates || answered) && <span className="space-games-coordinates">{formula(vec(candidate.vector), language)}</span>}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {pickedKind && pickedKind !== 'right' && <MathText text={l(CANDIDATE_REASONS[pickedKind])} />}
                    <span className="dbh4-worked space-games-worked">{formula(`\\vec{u}\\times\\vec{v}=\\begin{vmatrix}\\vec{i}&\\vec{j}&\\vec{k}\\\\${round.u.join('&')}\\\\${round.v.join('&')}\\end{vmatrix}=${vec(round.candidates.find((candidate) => candidate.kind === 'right')!.vector)}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function CrossGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CROSS_ROUNDS,
                rules: [
                    say('Lau geziek luzera bera dute: norabidea eta noranzkoa bakarrik axola dira.', 'Las cuatro flechas miden lo mismo: solo cuentan la dirección y el sentido.', 'الأسهم الأربعة بالطول نفسه: لا يهم إلا الاتجاه والمنحى.', 'The four arrows have the same length: only the direction and the sense count.'),
                    say('$\\vec{u}\\times\\vec{v}$ bi bektoreekiko perpendikularra da, eta eskuineko eskuak ematen du noranzkoa.', '$\\vec{u}\\times\\vec{v}$ es perpendicular a los dos, y la mano derecha da el sentido.', '$\\vec{u}\\times\\vec{v}$ عمودي على الاثنين، واليد اليمنى تعطي المنحى.', '$\\vec{u}\\times\\vec{v}$ is perpendicular to both, and the right hand gives the sense.'),
                    say('Biratu taula, arrastatuz, ondo ikusteko.', 'Gira el tablero arrastrando para verlo bien.', 'أدِر اللوحة بالسحب لترى جيدًا.', 'Drag the board to turn it and see well.')
                ],
                create: createCrossRounds,
                stars: standardStars(CROSS_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: CrossPlay
            }}
        />
    )
}

/* ---------- The flattened box ---------- */

function FlatPlay({ round, language, onAnswer, answered }: RoundProps<FlatRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const playback = usePlayback(`${vec(round.u)}${vec(round.v)}${vec(round.w)}`, 1400)
    const { play } = playback
    useEffect(() => {
        if (answered) play()
    }, [answered, play])
    const choose = (option: number) => {
        if (answered) return
        setPicked(option)
        onAnswer(option === round.answer)
    }
    const progress = answered ? playback.progress ?? 1 : 0
    const k = round.start + (round.answer - round.start) * progress
    const w = wAt(round, k)
    const wLatex = `(${round.w.map((value, index) => (index === round.index ? 'k' : String(value + 0))).join(',')})`
    const question = round.volume === 0
        ? say('Zein $k$ baliok zapaltzen du kutxa?', '¿Qué $k$ aplasta la caja?', 'أي $k$ يضغط الصندوق؟', 'Which $k$ flattens the box?')
        : say(`Zein $k>0$ baliok ematen du ${round.volume} bolumena?`, `¿Qué $k>0$ da volumen ${round.volume}?`, `أي $k>0$ يعطي الحجم ${round.volume}؟`, `Which $k>0$ gives volume ${round.volume}?`)
    const scene: SceneItem[] = [
        { kind: 'box', origin: [0, 0, 0], edges: [round.u, round.v, w] },
        { kind: 'vector', to: round.u, color: SPACE.red, label: 'u' },
        { kind: 'vector', to: round.v, color: SPACE.blue, label: 'v' },
        { kind: 'vector', to: w, color: SPACE.violet, label: 'w' }
    ]
    return (
        <>
            <div className="space-games-data" dir="ltr">
                <span>{formula(`\\vec{u}=${vec(round.u)}`, language)}</span>
                <span>{formula(`\\vec{v}=${vec(round.v)}`, language)}</span>
                <span>{formula(`\\vec{w}=${wLatex}`, language)}</span>
            </div>
            <Board3D key={`${vec(round.u)}${vec(round.v)}${vec(round.w)}`} scene={scene} language={language} range={5} height={280} label={l(say('u, v eta w bektoreen kutxa', 'La caja de u, v y w', 'صندوق u وv وw', 'The box of u, v and w'))} />
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className="prop3-options space-games-values" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={!answered ? '' : option === round.answer ? 'right' : option === picked ? 'wrong' : ''} onClick={() => choose(option)}>{formula(`k=${option}`, language)}</button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span className="dbh4-worked space-games-worked">{formula(`[\\vec{u},\\vec{v},\\vec{w}]=${round.slope}k${round.offset < 0 ? '' : '+'}${round.offset}\\qquad k=${round.answer}\\ \\to\\ ${mixedAt(round, round.answer)}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function FlatGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: FLAT_ROUNDS,
                rules: [
                    say('Kutxaren bolumena biderkadura mistoaren balio absolutua da.', 'El volumen de la caja es el valor absoluto del producto mixto.', 'حجم الصندوق هو القيمة المطلقة للجداء المختلط.', 'The volume of the box is the absolute value of the scalar triple product.'),
                    say('Zapalduta dago $[\\vec{u},\\vec{v},\\vec{w}]=0$ denean: hiru bektoreak plano batean.', 'Está aplastada cuando $[\\vec{u},\\vec{v},\\vec{w}]=0$: los tres vectores en un plano.', 'يكون منضغطًا عندما $[\\vec{u},\\vec{v},\\vec{w}]=0$: المتجهات الثلاثة في مستوى.', 'It is flat when $[\\vec{u},\\vec{v},\\vec{w}]=0$: the three vectors in one plane.'),
                    say('Erantzutean, kutxa $k$ zuzenera mugitzen da.', 'Al responder, la caja se mueve al $k$ correcto.', 'عند الإجابة يتحرك الصندوق إلى $k$ الصحيح.', 'When you answer, the box moves to the right $k$.')
                ],
                create: createFlatRounds,
                stars: standardStars(FLAT_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: FlatPlay
            }}
        />
    )
}
