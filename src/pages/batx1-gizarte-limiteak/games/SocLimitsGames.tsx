import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import { say } from '../text'
import { createJoinRounds, JOIN_ROUNDS, joinLatex, jumpWith, pieceAt, type JoinRound } from './join'
import { createLongRounds, LONG_ROUNDS, type LongRound } from './longRun'
import './SocLimitsGames.css'

/* ==========================================================================
   ¿Y a la larga? and Empalma los trozos (Limiteak eta jarraitutasuna,
   Batxilergoa 1 · Gizarte Zientziak): the first shows a function and asks
   what it does in the long run; the second draws a function in two pieces
   with the k of the chosen card, so the jump moves on the board until the
   pieces join.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')

function Choices({ values, label, chosen, disabled, onChoose }: { values: string[]; label: (value: string) => ReactNode; chosen: string | null; disabled: boolean; onChoose: (value: string) => void }) {
    return (
        <div className="soc-lim-choices">
            {values.map((value) => (
                <button key={value} type="button" className={`soc-lim-choice${chosen === value ? ' chosen' : ''}`} aria-pressed={chosen === value} disabled={disabled} onClick={() => onChoose(value)}>{label(value)}</button>
            ))}
        </div>
    )
}

/* ---------- ¿Y a la larga? ---------- */

function LongPlay({ round, language, onAnswer, answered }: RoundProps<LongRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<string | null>(null)
    const right = chosen === round.answer
    const where = round.toward === '+' ? '+\\infty' : '-\\infty'
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say(`Zer egiten du funtzio honek $x\\to ${where}$ denean?`, `¿Qué hace esta función cuando $x\\to ${where}$?`, `ماذا تفعل هذه الدالة عندما $x\\to ${where}$؟`, `What does this function do as $x\\to ${where}$?`))} /></p>
            <div className="dbh4-big-formula">{formula(`f(x)=${round.latex}`, language)}</div>
            <Choices values={round.options} label={(value) => formula(value, language)} chosen={chosen} disabled={answered} onChoose={setChosen} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(round.working, language)}</span>
                    <span className="dbh4-worked">{formula(`\\lim_{x\\to ${where}}f(x)=${round.answer}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function LongGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: LONG_ROUNDS,
                rules: [
                    say('Polinomio batean, maila handieneko gaiak agintzen du. $a^x$: $+\\infty$ aldera $a>1$ bada, 0 baliora $0<a<1$ bada.', 'En un polinomio manda el término de mayor grado. $a^x$: a $+\\infty$ si $a>1$, a 0 si $0<a<1$.', 'في الحدودية يحكم الحد ذو الدرجة الأكبر. و$a^x$: إلى $+\\infty$ إذا $a>1$ وإلى 0 إذا $0<a<1$.', 'In a polynomial the highest-degree term rules. $a^x$: to $+\\infty$ if $a>1$, to 0 if $0<a<1$.'),
                    say('Zatidura batean, alderatu mailak: maila bera, koefizienteen zatidura; behean handiagoa, 0.', 'En un cociente, compara los grados: mismo grado, cociente de coeficientes; más abajo, 0.', 'في خارج القسمة قارن الدرجات: الدرجة نفسها، خارج قسمة المعاملين؛ والمقام أكبر، 0.', 'In a quotient, compare the degrees: same degree, the quotient of the coefficients; higher below, 0.'),
                    say('Aukeratu txartel bat eta egiaztatu.', 'Elige una tarjeta y comprueba.', 'اختر بطاقة وتحقّق.', 'Choose a card and check.')
                ],
                create: createLongRounds,
                stars: standardStars(LONG_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: LongPlay
            }}
        />
    )
}

/* ---------- Empalma los trozos ---------- */

const W = 300
const H = 210

function JoinBoard({ round, k, language }: { round: JoinRound; k: number | null; language: UnitLanguage }) {
    const l = useGameText(language)
    const span = round.tariff ? round.a : 4
    const from = round.tariff ? 0 : round.a - span
    const to = round.a + span
    // One scale for every card, so that the jump grows and shrinks on the same board
    const values = [from, round.a, to].flatMap((x) => [pieceAt(round.left, x, round.answer), ...round.options.map((option) => pieceAt(round.right, x, option))]).concat(round.options.map((option) => pieceAt(round.left, round.a, option)))
    const low = Math.min(0, ...values)
    const high = Math.max(1, ...values)
    const pad = (high - low) * 0.08
    const X = (x: number) => 20 + ((x - from) / (to - from)) * (W - 40)
    const Y = (y: number) => H - 30 - ((y - low + pad) / (high - low + 2 * pad)) * (H - 46)
    const path = (piece: JoinRound['left'], a: number, b: number, value: number) => {
        const points: string[] = []
        for (let i = 0; i <= 40; i += 1) {
            const x = a + ((b - a) * i) / 40
            points.push(`${i === 0 ? 'M' : 'L'} ${X(x).toFixed(1)} ${Y(pieceAt(piece, x, value)).toFixed(1)}`)
        }
        return points.join(' ')
    }
    const leftK = round.left.k ? k : 0
    const rightK = round.right.k ? k : 0
    const leftEnd = leftK === null ? null : pieceAt(round.left, round.a, leftK)
    const rightStart = rightK === null ? null : pieceAt(round.right, round.a, rightK)
    const joined = k !== null && jumpWith(round, k) === 0
    return (
        <svg className="soc-lim-board" viewBox={`0 0 ${W} ${H}`} direction="ltr" role="img" aria-label={l(say('Bi zatiak eta haien lotura', 'Los dos trozos y su unión', 'الجزآن ونقطة وصلهما', 'The two pieces and their join'))}>
            <rect x={0} y={0} width={W} height={H} rx={12} fill="var(--card, #fffcf6)" />
            {low < 0 && high > 0 && <line x1={X(from)} x2={X(to)} y1={Y(0)} y2={Y(0)} stroke="var(--line, #c9bfae)" strokeWidth={1.5} />}
            <line x1={X(round.a)} x2={X(round.a)} y1={10} y2={H - 26} stroke="var(--ink)" strokeWidth={1.3} strokeDasharray="4 3" />
            <text x={X(round.a)} y={H - 10} textAnchor="middle" fontSize={13} fontWeight={700} fill="var(--ink)">{round.a}</text>
            {leftK !== null && <path d={path(round.left, from, round.a, leftK)} fill="none" stroke="var(--coral, #c4432a)" strokeWidth={3.4} />}
            {rightK !== null && <path d={path(round.right, round.a, to, rightK)} fill="none" stroke="var(--success, #267b53)" strokeWidth={3.4} />}
            {leftEnd !== null && rightStart !== null && !joined && <line x1={X(round.a) + 9} x2={X(round.a) + 9} y1={Y(leftEnd)} y2={Y(rightStart)} stroke="var(--mustard, #e0a100)" strokeWidth={3.4} />}
            {leftEnd !== null && <circle cx={X(round.a)} cy={Y(leftEnd)} r={6} fill={joined ? 'var(--ink)' : 'var(--coral, #c4432a)'} stroke="var(--card, #fffcf6)" strokeWidth={1.5} />}
            {rightStart !== null && !joined && <circle cx={X(round.a)} cy={Y(rightStart)} r={6} fill="var(--card, #fffcf6)" stroke="var(--success, #267b53)" strokeWidth={2.4} />}
            {k === null && <text x={W * 0.72} y={H / 2} textAnchor="middle" fontSize={30} fontWeight={700} fill="var(--muted)" opacity={0.6}>?</text>}
        </svg>
    )
}

function JoinPlay({ round, language, onAnswer, answered }: RoundProps<JoinRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const right = chosen === round.answer
    const shown = answered ? round.answer : chosen
    const k = (value: number) => String(value)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.tariff
                ? say('Tarifa bat eurotan, $x$ unitaterengatik. Zer $k$ baliorekin ez du jauzirik egiten?', 'Una tarifa en euros por $x$ unidades. ¿Con qué $k$ no salta?', 'تعرفة باليورو مقابل $x$ وحدة. مع أي $k$ لا تقفز؟', 'A tariff in euros for $x$ units. With which $k$ does it not jump?')
                : say('Zer $k$ baliorekin da jarraitua?', '¿Con qué $k$ es continua?', 'مع أي $k$ تكون متصلة؟', 'For which $k$ is it continuous?'))} /></p>
            <div className="dbh4-big-formula">{formula(joinLatex(round), language)}</div>
            <JoinBoard round={round} k={shown} language={language} />
            <Choices values={round.options.map(k)} label={(value) => formula(`k=${value}`, language)} chosen={chosen === null ? null : k(chosen)} disabled={answered} onChoose={(value) => setChosen(Number(value))} />
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={chosen === null} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`\\lim_{x\\to ${round.a}^-}${round.tariff ? 'C' : 'f'}(x)=${String(pieceAt(round.left, round.a, round.answer)).replace('.', '{,}')}`, language)}</span>
                    <span className="dbh4-worked">{formula(`k=${round.answer}`, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function JoinGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: JOIN_ROUNDS,
                rules: [
                    say('Txartel bakoitzak bigarren zatia marrazten du bere $k$ balioarekin: begiratu jauzia.', 'Cada tarjeta dibuja el segundo trozo con su $k$: mira el salto.', 'كل بطاقة ترسم الجزء الثاني بقيمة $k$ الخاصة بها: انظر إلى القفزة.', 'Each card draws the second piece with its $k$: watch the jump.'),
                    say('Jarraitua: bi zatiek balio bera ematen dute lotura-puntuan.', 'Continua: los dos trozos dan lo mismo en el punto de unión.', 'متصلة: يعطي الجزآن القيمة نفسها عند نقطة الوصل.', 'Continuous: both pieces give the same at the joining point.'),
                    say('Aukeratu txartel bat eta egiaztatu.', 'Elige una tarjeta y comprueba.', 'اختر بطاقة وتحقّق.', 'Choose a card and check.')
                ],
                create: createJoinRounds,
                stars: standardStars(JOIN_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: JoinPlay
            }}
        />
    )
}
