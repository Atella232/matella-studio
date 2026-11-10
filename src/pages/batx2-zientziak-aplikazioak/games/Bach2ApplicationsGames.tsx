import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { localize, say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import './Bach2ApplicationsGames.css'
import { createHopitalRounds, HOPITAL_BINS, HOPITAL_ROUNDS, type HopitalBin, type HopitalRound } from './hopitalGame'
import { createOptimizeRounds, OPTIMIZE_ROUNDS, type OptimizeRound } from './optimizeGame'
import { createRolleRounds, ROLLE_BINS, ROLLE_ROUNDS, type RolleBin, type RolleRound } from './rolleGame'

/* ==========================================================================
   ¿Vale L'Hôpital?, ¿Cumple Rolle? and Plantea y optimiza (Aplikazioak,
   Batxilergoa 2 · Zientziak): the first chooses among three verdicts, the
   second among four, the third picks a function and then its optimum.
   After each answer the reason comes in: the form and the value of the
   limit, f(a), f(b) and the point c or where it fails, the working of
   the optimum.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(localize(language, latex), language)}$`} inline />

/* ---------- ¿Vale L'Hôpital? ---------- */

const HOPITAL_LABELS: Record<HopitalBin, LocalizedText> = {
    now: say('Orain aplikatzen da', 'Se aplica ya', 'تُطبَّق الآن', 'It applies now'),
    transform: say('Lehenik eraldatu behar da', 'Hay que transformarlo antes', 'يجب تحويلها أولًا', 'Transform it first'),
    none: say('Ez dago indeterminaziorik', 'No hay indeterminación', 'لا يوجد عدم تعيين', 'No indeterminate form')
}

function hopitalReason(round: HopitalRound): LocalizedText {
    if (round.bin === 'now') return say('Ordezkatuz $\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ ateratzen da: deribatu goikoa eta behekoa.', 'Al sustituir sale $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$: deriva arriba y abajo.', 'بالتعويض نحصل على $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$: اشتق البسط والمقام.', 'Substituting gives $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$: differentiate the top and the bottom.')
    if (round.bin === 'transform') return say('Indeterminazio bat da, baina ez zatidura bat: lehenik idatzi zatidura gisa, edo hartu logaritmoak.', 'Es una indeterminación, pero no un cociente: primero escríbelo como cociente o toma logaritmos.', 'إنها حالة عدم تعيين لكنها ليست خارج قسمة: اكتبها أولًا خارج قسمة أو خذ اللوغاريتم.', 'It is an indeterminate form, but not a quotient: first write it as a quotient or take logarithms.')
    return say('Ordezkatuz balio bat ateratzen da: ez dago indeterminaziorik, eta L\'Hôpitalek ez du balio.', 'Al sustituir sale un valor: no hay indeterminación, y L\'Hôpital no vale.', 'بالتعويض نحصل على قيمة: لا يوجد عدم تعيين، ولا تصح قاعدة لوبيتال.', 'Substituting gives a value: there is no indeterminate form, and L\'Hôpital does not apply.')
}

function HopitalPlay({ round, language, onAnswer, answered }: RoundProps<HopitalRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<HopitalBin | null>(null)
    const choose = (bin: HopitalBin) => {
        if (answered) return
        setPicked(bin)
        onAnswer(bin === round.bin)
    }
    return (
        <>
            <p className="prop3-prompt">{l(say('Zer egin limite honekin?', '¿Qué hacer con este límite?', 'ماذا نفعل بهذه النهاية؟', 'What should you do with this limit?'))}</p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <div className="prop3-options bach2-app-options" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {HOPITAL_BINS.map((bin) => (
                    <button key={bin} type="button" disabled={answered} className={!answered ? '' : bin === round.bin ? 'right' : bin === picked ? 'wrong' : ''} onClick={() => choose(bin)}>
                        {l(HOPITAL_LABELS[bin])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.bin} language={language}>
                    <span className="dbh4-worked">{formula(`\\to\\ ${round.form}`, language)}</span>
                    <span className="dbh4-worked">{formula(`\\lim=${round.value}`, language)}</span>
                    <MathText text={l(hopitalReason(round))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function HopitalGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: HOPITAL_ROUNDS,
                rules: [
                    say('Lehenik ordezkatu: $\\frac{0}{0}$ edo $\\frac{\\infty}{\\infty}$ bada, L\'Hôpital orain aplikatzen da.', 'Primero sustituye: si sale $\\frac{0}{0}$ o $\\frac{\\infty}{\\infty}$, L\'Hôpital se aplica ya.', 'عوّض أولًا: إذا خرج $\\frac{0}{0}$ أو $\\frac{\\infty}{\\infty}$ فقاعدة لوبيتال تُطبَّق الآن.', 'First substitute: if it gives $\\frac{0}{0}$ or $\\frac{\\infty}{\\infty}$, L\'Hôpital applies now.'),
                    say('$0\\cdot\\infty$, $\\infty-\\infty$ eta berretura indeterminatuak lehenik eraldatzen dira. Balio bat ateratzen bada, ez dago indeterminaziorik.', '$0\\cdot\\infty$, $\\infty-\\infty$ y las potencias indeterminadas se transforman antes. Si sale un valor, no hay indeterminación.', '$0\\cdot\\infty$ و$\\infty-\\infty$ والقوى غير المعيّنة تُحوَّل أولًا. وإذا خرجت قيمة فلا عدم تعيين.', '$0\\cdot\\infty$, $\\infty-\\infty$ and indeterminate powers are transformed first. If a value comes out, there is no indeterminate form.')
                ],
                create: createHopitalRounds,
                stars: standardStars(HOPITAL_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: HopitalPlay
            }}
        />
    )
}

/* ---------- ¿Cumple Rolle? ---------- */

const ROLLE_LABELS: Record<RolleBin, LocalizedText> = {
    yes: say('Betetzen du: $c$ bat dago', 'Cumple: hay un $c$', 'تتحقق: توجد $c$', 'It holds: there is a $c$'),
    continuity: say('Ez da jarraitua', 'Falla la continuidad', 'يسقط الاتصال', 'Continuity fails'),
    derivability: say('Ez da deribagarria', 'Falla la derivabilidad', 'يسقط الاشتقاق', 'Differentiability fails'),
    heights: say('$f(a)\\neq f(b)$', '$f(a)\\neq f(b)$', '$f(a)\\neq f(b)$', '$f(a)\\neq f(b)$')
}

function rolleReason(round: RolleRound): LocalizedText {
    if (round.bin === 'yes') return say('Hiru hipotesiak betetzen dira, eta han zuzen ukitzailea horizontala da.', 'Se cumplen las tres hipótesis, y allí la tangente es horizontal.', 'تتحقق الفرضيات الثلاث، وهناك يكون المماس أفقيًّا.', 'The three hypotheses hold, and there the tangent is horizontal.')
    if (round.bin === 'continuity') return say('Puntu horretan ez da jarraitua: Rollek ez du ezer ziurtatzen, altuerak berdinak izan arren.', 'En ese punto no es continua: Rolle no asegura nada, aunque las alturas coincidan.', 'ليست متصلة عند تلك النقطة: لا تضمن مبرهنة رول شيئًا رغم تساوي الارتفاعين.', 'It is not continuous at that point: Rolle guarantees nothing, even though the heights are equal.')
    if (round.bin === 'derivability') return say('Puntu horretan punta bat dago: ez da deribagarria, eta ez dago zuzen ukitzaile horizontalik.', 'En ese punto hay un pico: no es derivable y no hay tangente horizontal.', 'توجد زاوية عند تلك النقطة: فهي غير قابلة للاشتقاق ولا يوجد مماس أفقي.', 'There is a corner at that point: it is not differentiable and there is no horizontal tangent.')
    return say('Muturretako altuerak desberdinak dira: Rolle ez da aplikatzen.', 'Las alturas de los bordes son distintas: Rolle no se aplica.', 'ارتفاعا الطرفين مختلفان: لا تنطبق مبرهنة رول.', 'The heights at the ends are different: Rolle does not apply.')
}

function RollePlay({ round, language, onAnswer, answered }: RoundProps<RolleRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<RolleBin | null>(null)
    const choose = (bin: RolleBin) => {
        if (answered) return
        setPicked(bin)
        onAnswer(bin === round.bin)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(say(`Betetzen al du Rolle $${round.interval}$ tartean?`, `¿Cumple Rolle en $${round.interval}$?`, `هل تتحقق مبرهنة رول على $${round.interval}$؟`, `Does Rolle hold on $${round.interval}$?`))} /></p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(`f(x)=${round.latex}`, language)}</div>
            <div className="prop3-options bach2-app-options" role="group" aria-label={l(say('Erantzuna', 'Respuesta', 'الإجابة', 'Answer'))}>
                {ROLLE_BINS.map((bin) => (
                    <button key={bin} type="button" disabled={answered} className={!answered ? '' : bin === round.bin ? 'right' : bin === picked ? 'wrong' : ''} onClick={() => choose(bin)}>
                        <MathText text={l(ROLLE_LABELS[bin])} />
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.bin} language={language}>
                    <span className="dbh4-worked">{formula(`f(a)=${round.fa}\\qquad f(b)=${round.fb}`, language)}</span>
                    {round.point && <span className="dbh4-worked">{formula(round.point, language)}</span>}
                    <MathText text={l(rolleReason(round))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function RolleGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ROLLE_ROUNDS,
                rules: [
                    say('Rollek hiru hipotesi ditu: jarraitua $[a,b]$ tartean, deribagarria $(a,b)$ tartean eta $f(a)=f(b)$.', 'Rolle tiene tres hipótesis: continua en $[a,b]$, derivable en $(a,b)$ y $f(a)=f(b)$.', 'لمبرهنة رول ثلاث فرضيات: الاتصال على $[a,b]$، والاشتقاق على $(a,b)$، و$f(a)=f(b)$.', 'Rolle has three hypotheses: continuous on $[a,b]$, differentiable on $(a,b)$ and $f(a)=f(b)$.'),
                    say('Begiratu ordena horretan: huts egiten duen lehena da erantzuna.', 'Míralas en ese orden: la primera que falla es la respuesta.', 'افحصها بهذا الترتيب: أول فرضية تسقط هي الجواب.', 'Check them in that order: the first one that fails is the answer.')
                ],
                create: createRolleRounds,
                stars: standardStars(ROLLE_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: RollePlay
            }}
        />
    )
}

/* ---------- Plantea y optimiza ---------- */

function OptimizePlay({ round, language, onAnswer, answered }: RoundProps<OptimizeRound>) {
    const l = useGameText(language)
    const [fn, setFn] = useState<number | null>(null)
    const [value, setValue] = useState<number | null>(null)
    const chooseFunction = (index: number) => {
        if (answered || fn !== null) return
        setFn(index)
        if (index !== round.function) onAnswer(false)
    }
    const chooseValue = (index: number) => {
        if (answered) return
        setValue(index)
        onAnswer(index === round.value)
    }
    const functionRight = fn === round.function
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.prompt)} /></p>
            <p className="bach2-app-step">{l(say('1. Zein da optimizatu beharreko funtzioa?', '1. ¿Cuál es la función que se optimiza?', '1. ما الدالة المراد استمثالها؟', '1. Which function is optimised?'))}</p>
            <div className="prop3-options bach2-app-options bach2-app-options-one" role="group" aria-label={l(say('Funtzioa', 'La función', 'الدالة', 'The function'))}>
                {round.functions.map((option, index) => (
                    <button key={option} type="button" dir="ltr" disabled={answered || fn !== null} className={fn === null ? '' : index === round.function ? 'right' : index === fn ? 'wrong' : ''} onClick={() => chooseFunction(index)}>
                        {formula(option, language)}
                    </button>
                ))}
            </div>
            {functionRight && (
                <>
                    <p className="bach2-app-step">{l(say('2. Zein da balio optimoa?', '2. ¿Cuál es el valor óptimo?', '2. ما القيمة المثلى؟', '2. What is the optimum value?'))}</p>
                    <div className="prop3-options bach2-app-options" role="group" aria-label={l(say('Optimoa', 'El óptimo', 'القيمة المثلى', 'The optimum'))}>
                        {round.values.map((option, index) => (
                            <button key={option} type="button" dir="ltr" disabled={answered} className={!answered ? '' : index === round.value ? 'right' : index === value ? 'wrong' : ''} onClick={() => chooseValue(index)}>
                                {formula(option, language)}
                            </button>
                        ))}
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={functionRight && value === round.value} language={language}>
                    <span className="dbh4-worked bach2-app-wide">{formula(round.functions[round.function], language)}</span>
                    <span className="dbh4-worked bach2-app-wide">{formula(round.working, language)}</span>
                    <MathText text={l(say('Baldintzak aldagai bat askatzen du; gero deribatua 0 egiten da, eta optimoa funtzioaren balioa da puntu horretan.', 'La condición despeja una variable; después se anula la derivada, y el óptimo es el valor de la función en ese punto.', 'يستخرج الشرط أحد المتغيرين؛ ثم نساوي المشتقة بالصفر، والقيمة المثلى هي قيمة الدالة عند تلك النقطة.', 'The condition solves for one variable; then the derivative is set to 0, and the optimum is the value of the function at that point.'))} />
                </RoundVerdict>
            )}
        </>
    )
}

export function OptimizeGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: OPTIMIZE_ROUNDS,
                rules: [
                    say('Lehenik, aukeratu baldintza ondo erabiltzen duen funtzioa.', 'Primero, elige la función que usa bien la condición.', 'أولًا اختر الدالة التي تستعمل الشرط صحيحًا.', 'First, choose the function that uses the condition properly.'),
                    say('Gero, aukeratu balio optimoa: funtzioaren balioa, ez $x$.', 'Después, elige el valor óptimo: el de la función, no la $x$.', 'ثم اختر القيمة المثلى: قيمة الدالة لا $x$.', 'Then choose the optimum value: that of the function, not the $x$.')
                ],
                create: createOptimizeRounds,
                stars: standardStars(OPTIMIZE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: OptimizePlay
            }}
        />
    )
}
