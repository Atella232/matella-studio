import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { say } from '../../batx1-zientziak-funtzioak/text'
import { standardStars } from '../../dbh4-games/equations'
import '../../dbh2-funtzioak-v2/Functions.css'
import '../../dbh4-games/Dbh4Games.css'
import '../../batx1-zientziak-limiteak/games/BachLimitsGames.css'
import './Bach2gLimitsGames.css'
import { CLOSE_ROUNDS, createCloseRounds, type CloseRound } from './closeTariff'
import { createLongRunRounds, LONG_RUN_BINS, LONG_RUN_ROUNDS, type LongRunBin, type LongRunRound } from './longRun'

/* ==========================================================================
   ¿A largo plazo? and Cierra la tarifa (Limiteak eta jarraitutasuna,
   Batxilergoa 2 · Gizarte Zientziak): the first chooses among three
   answers (it dies away, it levels off, it grows without end), the
   second among four values of the parameter. After each answer the
   reason comes in: the leading terms or the equation at the edge.
   ========================================================================== */

const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const number = (value: number) => String(Math.round(value * 1000) / 1000).replace('.', '{,}')

/* ---------- ¿A largo plazo? ---------- */

const LONG_RUN_LABELS: Record<LongRunBin, LocalizedText> = {
    zero: say('Itzaltzen doa (0)', 'Se apaga (0)', 'يتلاشى (0)', 'It dies away (0)'),
    number: say('Egonkortzen da', 'Se estabiliza', 'يستقر', 'It levels off'),
    infinity: say('Mugarik gabe hazten da', 'Crece sin límite', 'يكبر بلا حد', 'It grows without limit')
}

function LongRunPlay({ round, language, onAnswer, answered }: RoundProps<LongRunRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<LongRunBin | null>(null)
    const choose = (bin: LongRunBin) => {
        if (answered) return
        setPicked(bin)
        onAnswer(bin === round.bin)
    }
    const where = round.bin === 'number'
        ? say(`$${round.value}$ inguruan egonkortzen da.`, `Se estabiliza cerca de $${round.value}$.`, `يستقر قرب $${round.value}$.`, `It levels off near $${round.value}$.`)
        : round.bin === 'zero'
            ? say('0 aldera doa: itzaltzen doa.', 'Tiende a 0: se va apagando.', 'يؤول إلى 0: يتلاشى تدريجيًا.', 'It tends to 0: it dies away.')
            : say('Mugarik gabe hazten da.', 'Crece sin límite.', 'يكبر بلا حد.', 'It grows without limit.')
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.story)} /></p>
            <p className="bach2g-lim-ask">{l(say('Zer gertatzen da epe luzera?', '¿Qué pasa a largo plazo?', 'ماذا يحدث على المدى الطويل؟', 'What happens in the long run?'))}</p>
            <div className="prop3-options" role="group" aria-label={l(say('Epe luzera', 'A largo plazo', 'على المدى الطويل', 'In the long run'))}>
                {LONG_RUN_BINS.map((bin) => (
                    <button key={bin} type="button" disabled={answered} className={!answered ? '' : bin === round.bin ? 'right' : bin === picked ? 'wrong' : ''} onClick={() => choose(bin)}>
                        {l(LONG_RUN_LABELS[bin])}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.bin} language={language}>
                    <span dir="ltr">{formula(round.reason, language)}</span>{' '}<MathText text={l(where)} />
                </RoundVerdict>
            )}
        </>
    )
}

export function LongRunGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: LONG_RUN_ROUNDS,
                rules: [
                    say('Eredu bat ematen da: biztanleria, salmentak, kostuak…', 'Te dan un modelo: población, ventas, costes…', 'يُعطى نموذج: السكان أو المبيعات أو التكاليف…', 'You get a model: population, sales, costs…'),
                    say('Epe luzera $t\\to+\\infty$ da: 0 aldera doa, zenbaki batean egonkortzen da ala mugarik gabe hazten da?', 'A largo plazo es $t\\to+\\infty$: ¿tiende a 0, se estabiliza en un número o crece sin límite?', 'المدى الطويل هو $t\\to+\\infty$: هل يؤول إلى 0 أم يستقر عند عدد أم يكبر بلا حد؟', 'The long run is $t\\to+\\infty$: does it tend to 0, level off at a number or grow without limit?')
                ],
                create: createLongRunRounds,
                stars: standardStars(LONG_RUN_ROUNDS),
                starsNote: say('3 izar: 8 · 2 izar: 7 · izar 1: 4', '3 estrellas: 8 · 2: 7 · 1: 4', '3 نجوم: 8 · 2: 7 · 1: 4', '3 stars: 8 · 2: 7 · 1: 4'),
                Round: LongRunPlay
            }}
        />
    )
}

/* ---------- Cierra la tarifa ---------- */

function ClosePlay({ round, language, onAnswer, answered }: RoundProps<CloseRound>) {
    const l = useGameText(language)
    const [picked, setPicked] = useState<number | null>(null)
    const choose = (value: number) => {
        if (answered) return
        setPicked(value)
        onAnswer(value === round.answer)
    }
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.story)} /></p>
            <div className="dbh4-big-formula bach-lim-big" dir="ltr">{formula(round.latex, language)}</div>
            <p className="bach2g-lim-ask"><MathText text={l(say(`Zein $${round.letter}$ baliorekin ez dago jauzirik?`, `¿Con qué $${round.letter}$ no hay salto?`, `بأي $${round.letter}$ لا توجد قفزة؟`, `With which $${round.letter}$ is there no jump?`))} /></p>
            <div className="prop3-options" role="group" aria-label={round.letter}>
                {round.options.map((value) => (
                    <button key={value} type="button" dir="ltr" disabled={answered} className={!answered ? '' : value === round.answer ? 'right' : value === picked ? 'wrong' : ''} onClick={() => choose(value)}>
                        {formula(`${round.letter}=${number(value)}`, language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={picked === round.answer} language={language}>
                    <span dir="ltr">{formula(round.equation, language)}</span>
                </RoundVerdict>
            )}
        </>
    )
}

export function CloseTariffGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: CLOSE_ROUNDS,
                rules: [
                    say('Tarifa tarteka doa, eta tarte-aldaketan jauzi egin dezake.', 'La tarifa va por tramos y puede saltar al cambiar de tramo.', 'التعريفة حسب الشرائح وقد تقفز عند تغيّر الشريحة.', 'The tariff goes by brackets and may jump where the bracket changes.'),
                    say('Mugan, berdindu ezkerreko zatia eta eskuinekoa.', 'En el límite del tramo, iguala el trozo de la izquierda y el de la derecha.', 'عند حد الشريحة ساوِ الجزء الأيسر بالأيمن.', 'At the edge, set the left piece equal to the right one.')
                ],
                create: createCloseRounds,
                stars: standardStars(CLOSE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ClosePlay
            }}
        />
    )
}
