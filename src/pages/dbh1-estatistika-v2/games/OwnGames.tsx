import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { BAG_LIMIT, BAG_ROUNDS, bagRight, createBagRounds, favours, type BagEvent, type BagRound, type Colour } from './bagRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   The bag (1. DBH probability): set the probability as favourable over
   possible; then the favourable balls or cards light up.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'

const FILL: Record<Colour, string> = { red: 'var(--coral, #d9502e)', blue: 'var(--blue, #2f5fb3)', green: 'var(--success, #267b53)', yellow: 'var(--mustard, #e0a526)' }
/** «Red» as said of a ball (feminine in Spanish and Arabic) */
const NAME: Record<Colour, LocalizedText> = {
    red: say('gorria', 'roja', 'حمراء', 'red'),
    blue: say('urdina', 'azul', 'زرقاء', 'blue'),
    green: say('berdea', 'verde', 'خضراء', 'green'),
    yellow: say('horia', 'amarilla', 'صفراء', 'yellow')
}

function question(event: BagEvent, cards: number): LocalizedText {
    switch (event.kind) {
        case 'colour': return say(`Bola bat ateratzen duzu begiratu gabe. Zein da bola ${NAME[event.colour].eu} izateko probabilitatea?`, `Sacas una bola sin mirar. ¿Qué probabilidad hay de que sea ${NAME[event.colour].es}?`, `تسحب كرة دون أن تنظر. ما احتمال أن تكون ${NAME[event.colour].ar}؟`, `You take a ball without looking. What is the probability that it is ${NAME[event.colour].en}?`)
        case 'not': return say(`Bola bat ateratzen duzu begiratu gabe. Zein da bola ${NAME[event.colour].eu} ez izateko probabilitatea?`, `Sacas una bola sin mirar. ¿Qué probabilidad hay de que no sea ${NAME[event.colour].es}?`, `تسحب كرة دون أن تنظر. ما احتمال ألا تكون ${NAME[event.colour].ar}؟`, `You take a ball without looking. What is the probability that it is not ${NAME[event.colour].en}?`)
        case 'or': {
            const [first, second] = event.colours.map((colour) => NAME[colour])
            return say(`Bola bat ateratzen duzu begiratu gabe. Zein da bola ${first.eu} edo ${second.eu} izateko probabilitatea?`, `Sacas una bola sin mirar. ¿Qué probabilidad hay de que sea ${first.es} o ${second.es}?`, `تسحب كرة دون أن تنظر. ما احتمال أن تكون ${first.ar} أو ${second.ar}؟`, `You take a ball without looking. What is the probability that it is ${first.en} or ${second.en}?`)
        }
        default: {
            const what = event.kind === 'even'
                ? say('zenbaki bikoiti bat', 'un número par', 'عدد زوجي', 'an even number')
                : event.kind === 'greater'
                    ? say(`$${event.than}$ baino handiagoa den zenbaki bat`, `un número mayor que $${event.than}$`, `عدد أكبر من $${event.than}$`, `a number greater than $${event.than}$`)
                    : event.kind === 'multiple'
                        ? say(`$${event.of}$ zenbakiaren multiplo bat`, `un múltiplo de $${event.of}$`, `مضاعف للعدد $${event.of}$`, `a multiple of $${event.of}$`)
                        : say('zenbaki lehen bat', 'un número primo', 'عدد أولي', 'a prime number')
            return say(`$1$ eta $${cards}$ arteko zenbakiak dituzten kartetatik bat ateratzen duzu. Zein da ${what.eu} ateratzeko probabilitatea?`, `Sacas una carta numerada del $1$ al $${cards}$. ¿Qué probabilidad hay de que salga ${what.es}?`, `تسحب بطاقة مرقمة من $1$ إلى $${cards}$. ما احتمال أن يظهر ${what.ar}؟`, `You draw a card numbered $1$ to $${cards}$. What is the probability of ${what.en}?`)
        }
    }
}

/** The balls in the bag, or the cards in a row; after answering, the favourable ones ringed and the rest faded */
function Bag({ round, answered }: { round: BagRound; answered: boolean }) {
    if (round.balls) {
        const perRow = Math.ceil(round.balls.length / 2)
        return (
            <svg className="dbh4-scene" viewBox="0 0 340 130" direction="ltr" aria-hidden="true">
                <path d="M 40 30 Q 40 120 170 122 Q 300 120 300 30 Z" fill="var(--paper-deep, #ece6da)" stroke={INK} strokeWidth="2.5" />
                <path d="M 30 30 H 310" stroke={INK} strokeWidth="4" strokeLinecap="round" />
                {round.balls.map((colour, index) => {
                    const good = favours(round.event, colour)
                    const [x, y] = [170 + ((index % perRow) - (perRow - 1) / 2) * 38, 58 + Math.floor(index / perRow) * 36]
                    return (
                        <g key={index} opacity={answered && !good ? 0.3 : 1}>
                            <circle cx={x} cy={y} r="14" fill={FILL[colour]} stroke={INK} strokeWidth="2" />
                            {answered && good && <circle cx={x} cy={y} r="18" fill="none" stroke="var(--success, #267b53)" strokeWidth="3" />}
                        </g>
                    )
                })}
            </svg>
        )
    }
    const perRow = round.cards <= 6 ? round.cards : Math.ceil(round.cards / 2)
    return (
        <svg className="dbh4-scene" viewBox={`0 0 340 ${round.cards <= 6 ? 80 : 140}`} direction="ltr" aria-hidden="true">
            {Array.from({ length: round.cards }, (_, index) => {
                const card = index + 1
                const good = favours(round.event, card)
                const [x, y] = [170 + ((index % perRow) - (perRow - 1) / 2) * 46, 14 + Math.floor(index / perRow) * 60]
                return (
                    <g key={card} opacity={answered && !good ? 0.3 : 1}>
                        <rect x={x - 18} y={y} width="36" height="50" rx="6" fill={answered && good ? 'var(--success-tint, #d9efe2)' : 'var(--card, #fffcf6)'} stroke={answered && good ? 'var(--success, #267b53)' : INK} strokeWidth={answered && good ? 3 : 2} />
                        <text x={x} y={y + 32} textAnchor="middle" fontSize="18" fontWeight="700" fill={INK}>{card}</text>
                    </g>
                )
            })}
        </svg>
    )
}

function BagPlay({ round, language, onAnswer, answered }: RoundProps<BagRound>) {
    const l = useGameText(language)
    const [favourable, setFavourable] = useState(0)
    const [possible, setPossible] = useState(1)
    const right = bagRight(round, favourable, possible)
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(question(round.event, round.cards))} inline /></p>
            <Bag round={round} answered={answered} />
            <p className="dbh4-readout" dir="ltr">{formula(`P=\\dfrac{${favourable}}{${possible}}`, language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers" dir="ltr">
                        <Stepper label={l(say('Aldekoak', 'Favorables', 'الملائمة', 'Favourable'))} value={favourable} min={0} max={BAG_LIMIT} onChange={setFavourable} language={language} />
                        <Stepper label={l(say('Posibleak', 'Posibles', 'الممكنة', 'Possible'))} value={possible} min={1} max={BAG_LIMIT} onChange={setPossible} language={language} />
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(`P=\\frac{${round.favourable}}{${round.possible}}`, language)}</span>
                    {l(say(`Aldeko kasuak: ${round.favourable}. Kasu posibleak: ${round.possible}.`, `Casos favorables: ${round.favourable}. Casos posibles: ${round.possible}.`, `الحالات الملائمة: ${round.favourable}. الحالات الممكنة: ${round.possible}.`, `Favourable cases: ${round.favourable}. Possible cases: ${round.possible}.`))}
                </RoundVerdict>
            )}
        </>
    )
}

export function BagGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BAG_ROUNDS,
                rules: [
                    say('Laplace: $P=\\frac{\\text{aldekoak}}{\\text{posibleak}}$.', 'Laplace: $P=\\frac{\\text{favorables}}{\\text{posibles}}$.', 'لابلاس: الاحتمال = الحالات الملائمة ÷ الحالات الممكنة.', 'Laplace: $P=\\frac{\\text{favourable}}{\\text{possible}}$.'),
                    say('Zatiki baliokide bat ere zuzena da.', 'Una fracción equivalente también vale.', 'الكسر المكافئ صحيح أيضًا.', 'An equivalent fraction is right too.'),
                    say('Jarri zatikia eta egiaztatu: gero, aldeko kasuak markatuta.', 'Pon la fracción y comprueba: luego, los casos favorables marcados.', 'ضع الكسر وتحقّق: ثم تظهر الحالات الملائمة.', 'Set the fraction and check: then the favourable cases are marked.')
                ],
                create: createBagRounds,
                stars: standardStars(BAG_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: BagPlay
            }}
        />
    )
}

/** The art of the bag: a bag of coloured balls, two of them ringed */
export function BagArt() {
    const balls: Array<[number, number, Colour]> = [[78, 62, 'red'], [110, 62, 'blue'], [142, 62, 'red'], [94, 90, 'green'], [126, 90, 'blue']]
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <path d="M 46 40 Q 46 116 110 116 Q 174 116 174 40 Z" fill="var(--paper-deep, #ece6da)" stroke="var(--ink)" strokeWidth="2.5" />
            <path d="M 40 40 H 180" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
            {balls.map(([x, y, colour], index) => <circle key={index} cx={x} cy={y} r="12" fill={FILL[colour]} stroke="var(--ink)" strokeWidth="2" />)}
            {balls.filter(([, , colour]) => colour === 'red').map(([x, y], index) => <circle key={index} cx={x} cy={y} r="16" fill="none" stroke="var(--success, #267b53)" strokeWidth="2.5" />)}
            <text x="110" y="24" textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink)" direction="ltr">P = 2/5</text>
        </svg>
    )
}
