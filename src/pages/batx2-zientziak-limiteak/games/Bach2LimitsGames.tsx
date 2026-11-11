import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { texDec } from '../../dbh3-segidak/lab/labStyle'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import { ASSURE_BINS, ASSURE_ROUNDS, createAssureRounds, intervalLatex, type AssureBin, type AssureRound } from './assure'
import './Bach2LimitsGames.css'
import { createHuntRounds, HUNT_ROUNDS, HUNT_STARTS, isHuntPick, type HuntRound } from './hunt'
import { createWinnerRounds, WINNER_BINS, WINNER_ROUNDS, type WinnerBin, type WinnerRound } from './winner'

/* ==========================================================================
   ¿Quién gana?, ¿Lo asegura el teorema? and Caza raíces (Limiteak eta
   jarraitutasuna, Batxilergoa 2 · Zientziak): the first two choose among
   three answers, the third marks cards with intervals. After each answer
   the reason comes in: the leading terms, the condition that fails, the
   table of values with its changes of sign.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')

/* ---------- ¿Quién gana? ---------- */

const WINNER_LABELS: Record<WinnerBin, LocalizedText> = {
    zero: say('0', '0', '0', '0'),
    number: say('Zenbaki bat', 'Un número', 'عدد', 'A number'),
    infinity: say('+∞', '+∞', '+∞', '+∞')
}

function WinnerPlay({ round, language, onAnswer, answered }: RoundProps<WinnerRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<WinnerBin | null>(null)
    const choose = (bin: WinnerBin) => {
        if (answered) return
        setPicked(bin)
        onAnswer(bin === round.bin)
    }
    const [top, bottom] = round.leading
    const reason = round.bin === 'zero'
        ? say(`Behean ordena handiagoko infinitua dago: $${bottom}$ gaiak irabazten dio $${top}$ gaiari.`, `Abajo hay un infinito de mayor orden: $${bottom}$ gana a $${top}$.`, `في المقام لانهاية من رتبة أكبر: $${bottom}$ تتفوق على $${top}$.`, `Below there is an infinity of higher order: $${bottom}$ beats $${top}$.`)
        : round.bin === 'infinity'
            ? say(`Goian ordena handiagoko infinitua dago: $${top}$ gaiak irabazten dio $${bottom}$ gaiari.`, `Arriba hay un infinito de mayor orden: $${top}$ gana a $${bottom}$.`, `في البسط لانهاية من رتبة أكبر: $${top}$ تتفوق على $${bottom}$.`, `On top there is an infinity of higher order: $${top}$ beats $${bottom}$.`)
            : say(`Ordena bera: koefizienteak zatitzen dira, $${round.value}$.`, `El mismo orden: se dividen los coeficientes, $${round.value}$.`, `الرتبة نفسها: نقسم المعاملين، $${round.value}$.`, `The same order: divide the coefficients, $${round.value}$.`)
    return (
        <>
            <p className="prop3-prompt">{l(say('Nora doa zatidura?', '¿Adónde va el cociente?', 'إلى أين يؤول خارج القسمة؟', 'Where does the quotient go?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.limit, language)}</div>
            <div className="prop3-options" role="group" aria-label={l(say('Limitea', 'El límite', 'النهاية', 'The limit'))}>
                {WINNER_BINS.map((bin) => (
                    <button key={bin} type="button" dir={bin === 'number' ? undefined : 'ltr'} disabled={answered} className={!answered ? '' : bin === round.bin ? 'right' : bin === picked ? 'wrong' : ''} onClick={() => choose(bin)}>
                        {l(WINNER_LABELS[bin])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.bin} language={language}>
                    <MathText text={l(reason)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function WinnerGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: WINNER_ROUNDS,
                rules: [
                    say('$x\\to+\\infty$ denean, bi infinituren zatidura bat ematen da.', 'Te dan el cociente de dos infinitos cuando $x\\to+\\infty$.', 'يُعطى خارج قسمة لانهايتين عندما $x\\to+\\infty$.', 'You get the quotient of two infinities as $x\\to+\\infty$.'),
                    say('Ordena: $\\ln x\\ll x^p\\ll a^x$. Gai nagusiak bakarrik dira garrantzitsuak.', 'El orden: $\\ln x\\ll x^p\\ll a^x$. Solo cuentan los términos principales.', 'الترتيب: $\\ln x\\ll x^p\\ll a^x$. ولا تُحسب إلا الحدود الرئيسية.', 'The order: $\\ln x\\ll x^p\\ll a^x$. Only the leading terms count.')
                ],
                create: createWinnerRounds,
                stars: standardStars(WINNER_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: WinnerPlay
            }}
        />
    )
}

/* ---------- ¿Lo asegura el teorema? ---------- */

const ASSURE_LABELS: Record<AssureBin, LocalizedText> = {
    yes: say('Bai, ziurtatzen du', 'Sí, lo asegura', 'نعم، تضمنه', 'Yes, it does'),
    continuity: say('Ez: ez da jarraitua', 'No: no es continua', 'لا: ليست متصلة', 'No: not continuous'),
    other: say('Ez: beste baldintza bat', 'No: otra condición', 'لا: شرط آخر', 'No: another condition')
}

function claimText(round: AssureRound): LocalizedText {
    const f = `$f(x)=${round.fn.latex}$`
    const interval = `$${intervalLatex(round)}$`
    if (round.claim === 'root') return say(`${f} funtzioak erro bat du ${interval} tartean (Bolzano).`, `${f} tiene una raíz en ${interval} (Bolzano).`, `للدالة ${f} جذر في ${interval} (بولتسانو).`, `${f} has a root in ${interval} (Bolzano).`)
    if (round.claim === 'value') return say(`${f} funtzioak $${round.k}$ balioa hartzen du ${interval} tartean (tarteko balioak).`, `${f} toma el valor $${round.k}$ en ${interval} (valores intermedios).`, `تأخذ ${f} القيمة $${round.k}$ في ${interval} (القيم الوسيطة).`, `${f} takes the value $${round.k}$ on ${interval} (intermediate values).`)
    return say(`${f} funtzioak maximo eta minimo absolutuak ditu ${interval} tartean (Weierstrass).`, `${f} tiene máximo y mínimo absolutos en ${interval} (Weierstrass).`, `للدالة ${f} قيمة عظمى وصغرى مطلقتان على ${interval} (فايرشتراس).`, `${f} has an absolute maximum and minimum on ${interval} (Weierstrass).`)
}

function assureReason(round: AssureRound, language: UnitLanguage): LocalizedText {
    const value = (x: number) => {
        const y = round.fn.f(x)
        return Number.isFinite(y) ? texDec(y, language, 2) : '\\nexists'
    }
    const ends = `$f(${round.a})=${value(round.a)}$, $f(${round.b})=${value(round.b)}$`
    if (round.bin === 'continuity') return say('Ez da jarraitua tarte osoan (jauzi bat, asintota bat edo izate-eremutik kanpo): teoremak ez du ezer ziurtatzen.', 'No es continua en todo el intervalo (un salto, una asíntota o fuera del dominio): el teorema no asegura nada.', 'ليست متصلة على الفترة كلها (قفزة أو مقارب أو خارج المجال): المبرهنة لا تضمن شيئًا.', 'It is not continuous on the whole interval (a jump, an asymptote or outside the domain): the theorem ensures nothing.')
    if (round.claim === 'extremes') {
        return round.bin === 'yes'
            ? say('Jarraitua tarte itxian: Weierstrassek maximoa eta minimoa ziurtatzen ditu.', 'Continua en un intervalo cerrado: Weierstrass asegura máximo y mínimo.', 'متصلة على فترة مغلقة: يضمن فايرشتراس القيمتين العظمى والصغرى.', 'Continuous on a closed interval: Weierstrass ensures a maximum and a minimum.')
            : say('Tartea ez da itxia: Weierstrassek ez du ezer ziurtatzen.', 'El intervalo no es cerrado: Weierstrass no asegura nada.', 'الفترة ليست مغلقة: فايرشتراس لا يضمن شيئًا.', 'The interval is not closed: Weierstrass ensures nothing.')
    }
    if (!(round.closed[0] && round.closed[1])) return say('Tartea ez da itxia: teoremak $[a,b]$ tartea eskatzen du.', 'El intervalo no es cerrado: el teorema pide $[a,b]$.', 'الفترة ليست مغلقة: تشترط المبرهنة $[a,b]$.', 'The interval is not closed: the theorem needs $[a,b]$.')
    if (round.claim === 'root') {
        return round.bin === 'yes'
            ? say(`${ends}: zeinu desberdinak, erro bat dago.`, `${ends}: signos distintos, hay una raíz.`, `${ends}: إشارتان مختلفتان، يوجد جذر.`, `${ends}: different signs, there is a root.`)
            : say(`${ends}: zeinu bera, Bolzanok ez du ezer esaten.`, `${ends}: el mismo signo, Bolzano no dice nada.`, `${ends}: الإشارة نفسها، بولتسانو لا تقول شيئًا.`, `${ends}: the same sign, Bolzano says nothing.`)
    }
    return round.bin === 'yes'
        ? say(`${ends}: $${round.k}$ tartean dago.`, `${ends}: el $${round.k}$ está entre medias.`, `${ends}: العدد $${round.k}$ بينهما.`, `${ends}: $${round.k}$ is in between.`)
        : say(`${ends}: $${round.k}$ ez dago tartean.`, `${ends}: el $${round.k}$ no está entre medias.`, `${ends}: العدد $${round.k}$ ليس بينهما.`, `${ends}: $${round.k}$ is not in between.`)
}

function AssurePlay({ round, language, onAnswer, answered }: RoundProps<AssureRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<AssureBin | null>(null)
    const choose = (bin: AssureBin) => {
        if (answered) return
        setPicked(bin)
        onAnswer(bin === round.bin)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Teoremak ziurtatzen al du?', '¿Lo asegura el teorema?', 'هل تضمنه المبرهنة؟', 'Does the theorem ensure it?'))}</p>
            <p className="bach2-lim-claim"><MathText text={l(claimText(round))} /></p>
            <div className="prop3-options" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {ASSURE_BINS.map((bin) => (
                    <button key={bin} type="button" disabled={answered} className={!answered ? '' : bin === round.bin ? 'right' : bin === picked ? 'wrong' : ''} onClick={() => choose(bin)}>
                        {l(ASSURE_LABELS[bin])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.bin} language={language}>
                    <MathText text={l(assureReason(round, language))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function AssureGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ASSURE_ROUNDS,
                rules: [
                    say('Lehenik begiratu jarraitua den tarte osoan; ez bada, hori da erantzuna.', 'Primero mira si es continua en todo el intervalo; si no, esa es la respuesta.', 'انظر أولًا هل هي متصلة على الفترة كلها؛ وإن لم تكن فهذه هي الإجابة.', 'First check whether it is continuous on the whole interval; if not, that is the answer.'),
                    say('Gero, beste baldintza: zeinu-aldaketa, $k$ tartean edo tarte itxia.', 'Después, la otra condición: cambio de signo, $k$ entre medias o intervalo cerrado.', 'ثم الشرط الآخر: تغيّر الإشارة، أو $k$ بينهما، أو فترة مغلقة.', 'Then the other condition: a change of sign, $k$ in between, or a closed interval.')
                ],
                create: createAssureRounds,
                stars: standardStars(ASSURE_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: AssurePlay
            }}
        />
    )
}

/* ---------- Caza raíces ---------- */

function HuntPlay({ round, language, onAnswer, answered }: RoundProps<HuntRound>) {
    const l = useGameText(language)
    const [marked, setMarked] = useState<number[]>([])
    const right = isHuntPick(round, marked)
    const toggle = (n: number) => setMarked((current) => (current.includes(n) ? current.filter((item) => item !== n) : [...current, n]))
    const state = (n: number) => {
        if (!answered) return marked.includes(n) ? 'marked' : ''
        if (round.right.includes(n)) return marked.includes(n) ? 'right' : 'missed'
        return marked.includes(n) ? 'wrong' : ''
    }
    const values = [-3, -2, -1, 0, 1, 2, 3].map((n) => `h(${n})=${round.h(n)}`)
    return (
        <>
            <p className="prop3-prompt">{l(say('Markatu Bolzanok erro bat ziurtatzen duen tarte guztiak.', 'Marca todos los intervalos donde Bolzano asegura una raíz.', 'حدّد كل الفترات التي تضمن فيها بولتسانو جذرًا.', 'Mark every interval where Bolzano ensures a root.'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="bach-lim-cards" dir="ltr" role="group" aria-label={l(say('Tarteak', 'Intervalos', 'الفترات', 'Intervals'))}>
                {HUNT_STARTS.map((n) => (
                    <button key={n} type="button" className={`bach-lim-card ${state(n)}`} aria-pressed={marked.includes(n)} disabled={answered} onClick={() => toggle(n)}>
                        {formula(`[${n},${n + 1}]`, language)}
                    </button>
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={marked.length === 0} onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`h(x)=${round.hLatex}`, language)}</span>
                    <div className="bach2-lim-values" dir="ltr">{values.map((value) => <span key={value}>{formula(value, language)}</span>)}</div>
                    <MathText text={l(say(`Zeinu-aldaketak: ${round.right.map((n) => `$[${n},${n + 1}]$`).join(', ')}.`, `Cambios de signo: ${round.right.map((n) => `$[${n},${n + 1}]$`).join(', ')}.`, `تغيّرات الإشارة: ${round.right.map((n) => `$[${n},${n + 1}]$`).join('، ')}.`, `Changes of sign: ${round.right.map((n) => `$[${n},${n + 1}]$`).join(', ')}.`))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function HuntGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HUNT_ROUNDS,
                rules: [
                    say('Kalkulatu $h(n)$ zenbaki osoetan, $-3$ eta 3 artean.', 'Calcula $h(n)$ en los enteros de $-3$ a 3.', 'احسب $h(n)$ عند الأعداد الصحيحة من $-3$ إلى 3.', 'Work out $h(n)$ at the integers from $-3$ to 3.'),
                    say('Zeinua aldatzen den tarte bakoitzean erro bat dago. Ekuazio bat bada, $h=f-g$.', 'En cada intervalo donde cambia el signo hay una raíz. Si es una ecuación, $h=f-g$.', 'في كل فترة تتغير فيها الإشارة جذر. وإن كانت معادلة فـ $h=f-g$.', 'Each interval where the sign changes holds a root. If it is an equation, $h=f-g$.')
                ],
                create: createHuntRounds,
                stars: standardStars(HUNT_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: HuntPlay
            }}
        />
    )
}
