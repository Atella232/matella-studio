import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh4-games/Dbh4Games.css'
import './BachSystemsGames.css'
import { createLastRowRounds, LAST_ROW_ROUNDS, lastRowLatex, lastRowMatrixLatex, ROW_KINDS, type LastRowRound, type RowKind } from './lastRow'
import { combined, createZeroRounds, ZERO_ROUNDS, zeroLeft, zeroMatrixLatex, zeroOperationLatex, zeroRowLatex, type ZeroRound } from './zero'

/* ==========================================================================
   Egin zeroa and Irakurri azken errenkada (Ekuazio-sistemak, Batxilergoa 1
   · Zientziak): the first shows an augmented matrix and asks for the row
   operation that leaves a 0 under the pivot, step after step; the second
   shows a triangular matrix and asks how many solutions it has, or which
   value of a changes its type.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const STARS_NOTE = say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3')
const COLUMN_NAMES = ['x', 'y', 'z']

/* ---------- Make the zero ---------- */

function ZeroPlay({ round, language, onAnswer, answered }: RoundProps<ZeroRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const column = COLUMN_NAMES[round.column]
    const row = `E_${round.target + 1}`
    const choose = (index: number) => {
        if (answered) return
        setPicked(index)
        onAnswer(index === round.answer)
    }
    const right = round.options[round.answer]
    const shown = picked === null ? right : round.options[picked]
    const left = zeroLeft(round, shown)
    return (
        <>
            <div className="dbh4-big-formula bach-sys-matrix" dir="ltr">{formula(zeroMatrixLatex(round.rows), language)}</div>
            <p className="prop3-prompt"><MathText text={l(say(`Zein eragiketak uzten du 0 bat $${row}$ errenkadaren $${column}$ zutabean?`, `¿Qué operación deja un 0 en la columna de $${column}$ de $${row}$?`, `أي عملية تترك صفرًا في عمود $${column}$ من $${row}$؟`, `Which operation leaves a 0 in the $${column}$ column of $${row}$?`))} /></p>
            <div className="prop3-options bach-sys-options" dir="ltr">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} className={!answered ? '' : index === round.answer ? 'right' : index === picked ? 'wrong' : ''} onClick={() => choose(index)}>
                        {formula(zeroOperationLatex(round.target, round.source, option), language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    {picked !== round.answer && <span className="dbh4-worked">{formula(`${zeroOperationLatex(round.target, round.source, shown)}\\ \\to\\ ${left}\\neq 0`, language)}</span>}
                    <span className="dbh4-worked">{formula(`${zeroOperationLatex(round.target, round.source, right)}\\ \\to\\ ${zeroRowLatex(combined(round.rows, round.target, round.source, right))}`, language)}</span>
                    {round.solution && <span className="dbh4-worked">{formula(`${zeroMatrixLatex(round.after)}\\ \\to\\ (${round.solution.join(',\\ ')})`, language)}</span>}
                </RoundVerdict>
            )}
        </>
    )
}

export function ZeroGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: ZERO_ROUNDS,
                rules: [
                    say('Matrize zabaldu bat ikusiko duzu, eta zutabe bateko zenbaki bat 0 bihurtu behar da.', 'Verás una matriz ampliada y un número de una columna que tiene que pasar a ser 0.', 'سترى مصفوفة موسعة وعددًا في عمود يجب أن يصير صفرًا.', 'You will see an augmented matrix and a number in one column that has to become 0.'),
                    say('Aukeratu $mE_i+kE_j$ eragiketa: m bider zenbaki hori gehi k bider pibotea 0 izan behar da.', 'Elige la operación $mE_i+kE_j$: m por ese número más k por el pivote tiene que dar 0.', 'اختر العملية $mE_i+kE_j$: m ضرب ذلك العدد زائد k ضرب المحور يجب أن يساوي صفرًا.', 'Choose the operation $mE_i+kE_j$: m times that number plus k times the pivot must be 0.'),
                    say('Urratsak matrize berean jarraitzen du: bukaeran, soluzioa agertzen da.', 'Los pasos siguen en la misma matriz: al final aparece la solución.', 'تستمر الخطوات على المصفوفة نفسها: وفي النهاية يظهر الحل.', 'The steps carry on with the same matrix: at the end, the solution appears.')
                ],
                create: createZeroRounds,
                stars: standardStars(ZERO_ROUNDS),
                starsNote: STARS_NOTE,
                Round: ZeroPlay
            }}
        />
    )
}

/* ---------- Read the last row ---------- */

const KIND_LABELS: Record<RowKind, LocalizedText> = {
    one: say('Soluzio bat', 'Una solución', 'حل واحد', 'One solution'),
    infinite: say('Infinitu soluzio', 'Infinitas soluciones', 'ما لا نهاية من الحلول', 'Infinitely many'),
    none: say('Soluziorik ez', 'Ninguna solución', 'لا حل', 'No solution')
}

/** Why the system is of its kind */
function kindReason(round: LastRowRound): LocalizedText {
    const zeroRow = round.rows.findIndex((row) => row.slice(0, 3).every((value) => value === '0') && row[3] !== '0')
    if (round.kind === 'none') {
        const row = `0z=${round.rows[zeroRow][3]}`
        return say(`$${row}$ errenkada ez da inoiz betetzen: bateraezina.`, `La fila $${row}$ no se cumple nunca: incompatible.`, `الصف $${row}$ لا يتحقق أبدًا: غير متوافق.`, `The row $${row}$ never holds: inconsistent.`)
    }
    if (round.kind === 'infinite') {
        const zeros = round.rows.filter((row) => row.every((value) => value === '0')).length
        return zeros === 2
            ? say('Bi errenkada soberan daude: bi parametro, $\\lambda$ eta $\\mu$.', 'Sobran dos filas: dos parámetros, $\\lambda$ y $\\mu$.', 'صفّان زائدان: وسيطان $\\lambda$ و$\\mu$.', 'Two rows are spare: two parameters, $\\lambda$ and $\\mu$.')
            : say('$0z=0$ beti betetzen da: $z=\\lambda$, bateragarri indeterminatua.', '$0z=0$ se cumple siempre: $z=\\lambda$, compatible indeterminado.', '$0z=0$ تتحقق دائمًا: $z=\\lambda$، متوافق غير محدد.', '$0z=0$ always holds: $z=\\lambda$, consistent and dependent.')
    }
    const last = lastRowLatex(round)
    return say(`$${last}$ ekuazioak $z$ bakarra ematen du: bateragarri determinatua.`, `$${last}$ da un solo $z$: compatible determinado.`, `تعطي $${last}$ قيمة واحدة لـ $z$: متوافق محدد.`, `$${last}$ gives a single $z$: consistent and independent.`)
}

function LastRowPlay({ round, language, onAnswer, answered }: RoundProps<LastRowRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<string | null>(null)
    const parameter = round.mode === 'parameter'
    const choices = parameter ? round.values.map(String) : ROW_KINDS
    const rightChoice = parameter ? String(round.critical) : round.kind
    const choose = (choice: string) => {
        if (answered) return
        setPicked(choice)
        onAnswer(choice === rightChoice)
    }
    const question = parameter
        ? round.asked === 'none'
            ? say('Zein $a$ baliotarako da bateraezina?', '¿Para qué valor de $a$ es incompatible?', 'لأي قيمة لـ $a$ يكون غير متوافق؟', 'For which value of $a$ is it inconsistent?')
            : say('Zein $a$ baliotarako ditu infinitu soluzio?', '¿Para qué valor de $a$ tiene infinitas soluciones?', 'لأي قيمة لـ $a$ يكون له ما لا نهاية من الحلول؟', 'For which value of $a$ does it have infinitely many solutions?')
        : say('Zenbat soluzio ditu sistemak?', '¿Cuántas soluciones tiene el sistema?', 'كم حلًّا للنظام؟', 'How many solutions does the system have?')
    const reason = parameter
        ? say(`$a=${round.critical}$ denean, $z$ ezezagunaren koefizientea 0 da: $${lastRowLatex(round)}$ errenkada $0z=${round.asked === 'none' ? round.meta.d : 0}$ bihurtzen da.`, `Con $a=${round.critical}$ el coeficiente de $z$ es 0: la fila $${lastRowLatex(round)}$ pasa a ser $0z=${round.asked === 'none' ? round.meta.d : 0}$.`, `مع $a=${round.critical}$ يصير معامل $z$ صفرًا: يصير الصف $${lastRowLatex(round)}$ إلى $0z=${round.asked === 'none' ? round.meta.d : 0}$.`, `With $a=${round.critical}$ the coefficient of $z$ is 0: the row $${lastRowLatex(round)}$ becomes $0z=${round.asked === 'none' ? round.meta.d : 0}$.`)
        : kindReason(round)
    return (
        <>
            <div className="dbh4-big-formula bach-sys-matrix" dir="ltr">{formula(lastRowMatrixLatex(round), language)}</div>
            <p className="prop3-prompt"><MathText text={l(question)} /></p>
            <div className={`prop3-options ${parameter ? 'bach-sys-options' : 'bach-sys-kinds'}`} dir={parameter ? 'ltr' : undefined}>
                {choices.map((choice) => (
                    <button key={choice} type="button" disabled={answered} className={!answered ? '' : choice === rightChoice ? 'right' : choice === picked ? 'wrong' : ''} onClick={() => choose(choice)}>
                        {parameter ? formula(`a=${choice}`, language) : l(KIND_LABELS[choice as RowKind])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === rightChoice} language={language}>
                    <MathText text={l(reason)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function LastRowGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: LAST_ROW_ROUNDS,
                rules: [
                    say('Sistema bakoitza mailakatuta dago, matrize zabaldu gisa.', 'Cada sistema ya está escalonado, como matriz ampliada.', 'كل نظام درجي ومكتوب مصفوفةً موسعة.', 'Each system is already triangular, as an augmented matrix.'),
                    say('Begiratu errenkada guztiei: $0\\ 0\\ 0\\mid 5$ batek esan nahi du ez dagoela soluziorik; $0\\ 0\\ 0\\mid 0$ batek, errenkada bat soberan dagoela.', 'Mira todas las filas: un $0\\ 0\\ 0\\mid 5$ quiere decir que no hay solución; un $0\\ 0\\ 0\\mid 0$, que sobra una fila.', 'انظر إلى كل الصفوف: $0\\ 0\\ 0\\mid 5$ يعني لا حل، و$0\\ 0\\ 0\\mid 0$ يعني صفًّا زائدًا.', 'Look at every row: a $0\\ 0\\ 0\\mid 5$ means there is no solution; a $0\\ 0\\ 0\\mid 0$, that one row is spare.'),
                    say('Azken mailan, $a$ parametroa dago: bilatu $z$ ezezagunaren koefizientea 0 egiten duen balioa.', 'En el último nivel hay un parámetro $a$: busca el valor que hace 0 el coeficiente de $z$.', 'في المستوى الأخير يوجد وسيط $a$: ابحث عن القيمة التي تجعل معامل $z$ صفرًا.', 'In the last level there is a parameter $a$: look for the value that makes the coefficient of $z$ zero.')
                ],
                create: createLastRowRounds,
                stars: standardStars(LAST_ROW_ROUNDS),
                starsNote: STARS_NOTE,
                Round: LastRowPlay
            }}
        />
    )
}
