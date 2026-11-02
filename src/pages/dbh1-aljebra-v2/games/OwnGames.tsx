import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import { Stepper } from '../../../features/unit-v2/lab/LabKit'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { COEFFICIENT_LIMIT, createTilesRounds, KINDS, polyLatex, termsLatex, tileCounts, TILES_ROUNDS, type Kind, type Poly, type TilesRound } from './tilesRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   Algebra tiles (1. DBH algebra): set the coefficients of the reduced
   expression; then the tiles of each kind, + over −, cancel in pairs.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const signed = (value: number) => (value < 0 ? `−${-value}` : value > 0 ? `+${value}` : '0')

/** The size of a tile of each kind and the space it takes in a line */
const TILE: Record<Kind, { width: number; height: number; pitch: number }> = {
    x2: { width: 26, height: 26, pitch: 30 },
    x: { width: 10, height: 26, pitch: 14 },
    c: { width: 12, height: 12, pitch: 16 }
}
const LABEL: Record<Kind, string> = { x2: 'x²', x: 'x', c: '1' }

/** The tiles in rows by kind: + on top, − below, column by column; the pairs fade */
function Tiles({ round }: { round: TilesRound }) {
    const kinds = KINDS.filter((kind) => round.terms.some((term) => term.kind === kind))
    const space = (kind: Kind) => 2 * TILE[kind].height + 22
    const rows = kinds.map((kind, index) => {
        const [positives, negatives] = tileCounts(round.terms, kind)
        const { width, height, pitch } = TILE[kind]
        const top = 10 + kinds.slice(0, index).reduce((sum, above) => sum + space(above), 0)
        return { kind, positives, negatives, width, height, pitch, top }
    })
    return (
        <svg className="dbh4-scene" viewBox={`0 0 340 ${10 + kinds.reduce((sum, kind) => sum + space(kind), 0)}`} direction="ltr" aria-hidden="true">
            {rows.map(({ kind, positives, negatives, width, height, pitch, top }) => {
                const pairs = Math.min(positives, negatives)
                const tile = (index: number, positive: boolean) => (
                    <rect key={`${positive}-${index}`} className={index < pairs ? 'dbh1-cancel' : 'dbh1-left'} x={48 + index * pitch} y={positive ? top : top + height + 6} width={width} height={height} rx="2"
                        fill={positive ? (kind === 'x2' ? 'var(--blue-tint, #dde7f7)' : kind === 'x' ? 'var(--success-tint, #d9efe2)' : 'var(--mustard-tint, #fbebc0)') : 'var(--coral-tint, #f6d5cc)'}
                        stroke={positive ? 'var(--ink, #1d2733)' : 'var(--coral, #d9502e)'} strokeWidth="1.8" />
                )
                return (
                    <g key={kind}>
                        <text x="20" y={top + height + 8} textAnchor="middle" fontSize="16" fontWeight="700" fill="var(--ink, #1d2733)">{LABEL[kind]}</text>
                        {Array.from({ length: positives }, (_, index) => tile(index, true))}
                        {Array.from({ length: negatives }, (_, index) => tile(index, false))}
                    </g>
                )
            })}
        </svg>
    )
}

function TilesPlay({ round, level, language, onAnswer, answered }: RoundProps<TilesRound>) {
    const l = useGameText(language)
    const [values, setValues] = useState<Poly>({ x2: 0, x: 0, c: 0 })
    const kinds: Kind[] = level === 2 ? ['x2', 'x', 'c'] : ['x', 'c']
    const right = KINDS.every((kind) => values[kind] === round.answer[kind])
    const set = (kind: Kind) => (value: number) => setValues({ ...values, [kind]: value })
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Laburtu:', 'Reduce:', 'اختصر:', 'Simplify:'))}
                <span className="dbh4-big-formula" dir="ltr">{formula(termsLatex(round.terms), language)}</span>
            </p>
            {answered && <Tiles round={round} />}
            <p className="dbh4-readout" dir="ltr">{formula(polyLatex(values), language)}</p>
            {!answered && (
                <>
                    <div className="func2-steppers" dir="ltr">
                        {kinds.map((kind) => <Stepper key={kind} label={LABEL[kind]} value={values[kind]} min={-COEFFICIENT_LIMIT} max={COEFFICIENT_LIMIT} format={signed} onChange={set(kind)} language={language} />)}
                    </div>
                    <div className="prop3-panel">
                        <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                    </div>
                </>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(`${termsLatex(round.terms)}=${polyLatex(round.answer)}`, language)}</span>
                    {l(say('Antzekoak bakarrik batzen dira: x-ak x-ekin eta zenbakiak zenbakiekin. Fitxa positibo eta negatibo batek 0 balio dute.', 'Solo se juntan los semejantes: las x con las x y los números con los números. Una ficha + y una − valen 0.', 'نجمع الحدود المتشابهة فقط: x مع x والأعداد مع الأعداد. قطعة موجبة وقطعة سالبة تساويان 0.', 'Only like terms go together: x with x and numbers with numbers. A + tile and a − tile make 0.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function TilesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TILES_ROUNDS,
                rules: [
                    say('Karratu handiak $x^{2}$ dira, barrak $x$, eta karratu txikiak $1$.', 'Los cuadrados grandes son $x^{2}$, las barras $x$ y los cuadraditos $1$.', 'المربعات الكبيرة هي $x^{2}$، والأشرطة $x$، والمربعات الصغيرة $1$.', 'Big squares are $x^{2}$, bars are $x$ and small squares are $1$.'),
                    say('Gai antzekoak bakarrik batzen dira: $3x+2x=5x$.', 'Solo se suman los términos semejantes: $3x+2x=5x$.', 'نجمع الحدود المتشابهة فقط: $3x+2x=5x$.', 'Only like terms add up: $3x+2x=5x$.'),
                    say('Jarri koefizienteak eta egiaztatu: gero, fitxak.', 'Pon los coeficientes y comprueba: luego, las fichas.', 'ضع المعاملات وتحقّق: ثم القطع.', 'Set the coefficients and check: then the tiles.')
                ],
                create: createTilesRounds,
                stars: standardStars(TILES_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TilesPlay
            }}
        />
    )
}

/** The art of algebra tiles: an x² square, x bars and units */
export function TilesArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="20" y="30" width="56" height="56" rx="4" fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2.5" />
            {[0, 1, 2].map((index) => <rect key={index} x={92 + index * 22} y="30" width="14" height="56" rx="3" fill="var(--success-tint, #d9efe2)" stroke="var(--ink)" strokeWidth="2.5" />)}
            {[0, 1, 2, 3].map((index) => <rect key={index} x={164 + (index % 2) * 20} y={40 + Math.floor(index / 2) * 20} width="14" height="14" rx="2" fill={index === 3 ? 'var(--coral-tint, #f6d5cc)' : 'var(--mustard-tint, #fbebc0)'} stroke={index === 3 ? 'var(--coral)' : 'var(--ink)'} strokeWidth="2.5" />)}
        </svg>
    )
}
