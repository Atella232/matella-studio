import { useState, type ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import { localLatex, useGameText } from '../../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { standardStars } from '../../dbh4-games/equations'
import { amountFor, createGridRounds, createRecipeRounds, GRID_ROUNDS, INGREDIENTS, RECIPE_ROUNDS, type GridRound, type Ingredient, type RecipeRound } from './proportionRounds'
import '../../dbh4-games/Dbh4Games.css'
import './OwnGames.css'

/* ==========================================================================
   The recipe and paint the percentage (1. DBH proportionality): choose the
   amount, or paint the squares; then the whole recipe for the new number
   of people, or the right squares.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const CHECK = say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check')
const STARS_NOTE = say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3')
const tex = (value: number) => String(Math.round(value * 100) / 100).replace('.', '{,}')

/* ---------- The recipe ---------- */

const NAMES: Record<Ingredient, LocalizedText> = {
    flour: say('irin', 'harina', 'الطحين', 'flour'),
    sugar: say('azukre', 'azúcar', 'السكر', 'sugar'),
    milk: say('esne', 'leche', 'الحليب', 'milk')
}
/** With the article, for the recipe card and the table */
const LISTED: Record<Ingredient, LocalizedText> = {
    flour: say('irina', 'harina', 'الطحين', 'flour'),
    sugar: say('azukrea', 'azúcar', 'السكر', 'sugar'),
    milk: say('esnea', 'leche', 'الحليب', 'milk')
}
const UNIT: Record<Ingredient, LocalizedText> = {
    flour: say('g', 'g', 'غ', 'g'),
    sugar: say('g', 'g', 'غ', 'g'),
    milk: say('ml', 'ml', 'مل', 'ml')
}

/** The recipe for the old and the new number of people, the asked ingredient marked */
function RecipeTable({ round, people, language }: { round: RecipeRound; people: number[]; language: UnitLanguage }) {
    const l = useGameText(language)
    return (
        <div className="dbh4-table-wrap">
            <table className="dbh4-table dbh1-recipe">
                <thead>
                    <tr>
                        <th />
                        {people.map((count) => <th key={count}>{l(say(`${count} pertsona`, `${count} personas`, `الأشخاص: ${count}`, `${count} people`))}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {INGREDIENTS.map((ingredient) => (
                        <tr key={ingredient} className={ingredient === round.asked ? 'asked' : ''}>
                            <th>{l(LISTED[ingredient])}</th>
                            {people.map((count) => <td key={count}>{`${amountFor(round, count, ingredient)} ${l(UNIT[ingredient])}`}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function RecipePlay({ round, language, onAnswer, answered }: RoundProps<RecipeRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const { people, target, given } = round
    const name = l(NAMES[round.asked])
    const unit = l(UNIT[round.asked])
    const amount = amountFor(round, people)
    const per = round.perPerson[round.asked]
    const prompt = given === null
        ? say(`Zenbat ${name} behar da ${target} pertsonarentzat?`, `¿Qué cantidad de ${name} hace falta para ${target} personas?`, `كم يلزم من ${name} إذا كان عدد الأشخاص ${target}؟`, `How much ${name} is needed for ${target} people?`)
        : say(`${given} ${unit} ${name} dituzu. Zenbat pertsonarentzat da nahikoa?`, `Tienes ${given} ${unit} de ${name}. ¿Para cuántas personas llega?`, `لديك ${given} ${unit} من ${name}. لكم شخصًا يكفي؟`, `You have ${given} ${unit} of ${name}. How many people is it enough for?`)
    return (
        <>
            <p className="prop3-prompt">
                {l(say(`Errezeta, ${people} pertsonarentzat:`, `Receta para ${people} personas:`, `وصفة، عدد الأشخاص ${people}:`, `Recipe for ${people} people:`))}
                <span className="dbh4-subprompt">{INGREDIENTS.map((ingredient) => `${l(LISTED[ingredient])} ${amountFor(round, people, ingredient)} ${l(UNIT[ingredient])}`).join(' · ')}</span>
                <span className="dbh4-story">{l(prompt)}</span>
            </p>
            {answered && <RecipeTable round={round} people={[people, target]} language={language} />}
            <div className="dbh4-candidates" dir="ltr">
                {round.options.map((option) => (
                    <button key={option} type="button" disabled={answered} className={answered ? (option === round.answer ? 'found' : option === chosen ? 'missed' : '') : ''} onClick={() => {
                        setChosen(option)
                        onAnswer(option === round.answer)
                    }}>
                        {given === null ? `${option} ${unit}` : option}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen === round.answer} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(given === null ? `${amount}\\div ${people}=${per}\\ \\to\\ ${per}\\cdot ${target}=${round.answer}` : `${amount}\\div ${people}=${per}\\ \\to\\ ${given}\\div ${per}=${target}`, language)}</span>
                    {l(say('Proportzio zuzena: lehenik pertsona baterako kantitatea; gero, biderkatu edo zatitu.', 'Proporción directa: primero la cantidad para una persona; después, multiplica o divide.', 'تناسب طردي: أولًا الكمية لشخص واحد، ثم نضرب أو نقسم.', 'Direct proportion: first the amount for one person; then multiply or divide.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function RecipeGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: RECIPE_ROUNDS,
                rules: [
                    say('Pertsona bikoitza, osagai bikoitza: proportzio zuzena.', 'El doble de personas, el doble de ingredientes: proporción directa.', 'ضعف الأشخاص يعني ضعف المكونات: تناسب طردي.', 'Twice the people, twice the ingredients: direct proportion.'),
                    say('Lehenik pertsona baterako kantitatea; gero, biderkatu.', 'Primero la cantidad para una persona; después, multiplica.', 'أولًا الكمية لشخص واحد ثم اضرب.', 'First the amount for one person; then multiply.'),
                    say('Aukeratu erantzuna: gero, errezeta osoa.', 'Elige la respuesta: luego, la receta entera.', 'اختر الإجابة: ثم الوصفة كاملة.', 'Choose the answer: then the whole recipe.')
                ],
                create: createRecipeRounds,
                stars: standardStars(RECIPE_ROUNDS),
                starsNote: STARS_NOTE,
                Round: RecipePlay
            }}
        />
    )
}

/* ---------- Paint the percentage ---------- */

function GridPlay({ round, language, onAnswer, answered }: RoundProps<GridRound>) {
    const l = useGameText(language)
    const [painted, setPainted] = useState(0)
    const { total, percent, kind, answer } = round
    const right = painted === answer
    const prompt = kind === 'part'
        ? say(`Margotu laukitxoen $${percent}\\,\\%$.`, `Pinta el $${percent}\\,\\%$ de las casillas.`, `لوّن $${percent}\\,\\%$ من المربعات.`, `Paint $${percent}\\,\\%$ of the squares.`)
        : kind === 'rise'
            ? say(`Ertz beltzeko laukitxoak prezioa dira ($100\\,\\%$). Margotu prezio berria, $${percent}\\,\\%$ igo ondoren.`, `Las casillas de borde negro son el precio ($100\\,\\%$). Pinta el precio nuevo tras una subida del $${percent}\\,\\%$.`, `المربعات ذات الإطار الأسود هي السعر ($100\\,\\%$). لوّن السعر الجديد بعد زيادة $${percent}\\,\\%$.`, `The squares with a black border are the price ($100\\,\\%$). Paint the new price after a $${percent}\\,\\%$ rise.`)
            : say(`Ertz beltzeko laukitxoak prezioa dira ($100\\,\\%$). Margotu prezio berria, $${percent}\\,\\%$-ko deskontuaren ondoren.`, `Las casillas de borde negro son el precio ($100\\,\\%$). Pinta el precio nuevo tras un descuento del $${percent}\\,\\%$.`, `المربعات ذات الإطار الأسود هي السعر ($100\\,\\%$). لوّن السعر الجديد بعد تخفيض $${percent}\\,\\%$.`, `The squares with a black border are the price ($100\\,\\%$). Paint the new price after a $${percent}\\,\\%$ discount.`)
    const paint = (index: number) => setPainted(painted === index + 1 ? index : index + 1)
    const part = (total * percent) / 100
    const worked = kind === 'part' ? `${total}\\cdot ${percent}\\div 100=${answer}` : `${total}${kind === 'rise' ? '+' : '-'}${total}\\cdot ${percent}\\div 100=${total}${kind === 'rise' ? '+' : '-'}${part}=${answer}`
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} inline /></p>
            <div className="dbh1-grid" dir="ltr">
                {Array.from({ length: round.shown }, (_, index) => (
                    <button key={index} type="button" aria-label={String(index + 1)} disabled={answered} onClick={() => paint(index)}
                        className={`${index < total ? 'whole' : 'extra'}${index < painted ? ' painted' : ''}${answered && index < answer ? ' target' : ''}`} />
                ))}
            </div>
            <p className="dbh4-readout">{l(say(`Margotuta: ${painted}`, `Pintadas: ${painted}`, `الملوّنة: ${painted}`, `Painted: ${painted}`))}</p>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(CHECK)}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked" dir="ltr">{formula(worked, language)}</span>
                    <MathText text={l(say(`Laukitxo bakoitza osoaren $${tex(100 / total)}\\,\\%$ da.`, `Cada casilla es el $${tex(100 / total)}\\,\\%$ del total.`, `كل مربع يساوي $${tex(100 / total)}\\,\\%$ من الكل.`, `Each square is $${tex(100 / total)}\\,\\%$ of the whole.`))} inline />
                </RoundVerdict>
            )}
        </>
    )
}

export function GridGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: GRID_ROUNDS,
                rules: [
                    say('Laukitxo bat sakatzean, hura arteko guztiak margotzen dira.', 'Al tocar una casilla se pintan todas hasta ella.', 'عند لمس مربع تُلوَّن كل المربعات حتى هو.', 'Tapping a square paints every square up to it.'),
                    say('$p\\,\\%$ kalkulatzeko: bider $p$ eta zati $100$.', 'El $p\\,\\%$: por $p$ y entre $100$.', 'لحساب $p\\,\\%$: نضرب في $p$ ونقسم على $100$.', '$p\\,\\%$: times $p$, divided by $100$.'),
                    say('Margotu eta egiaztatu: gero, laukitxo zuzenak markatuta.', 'Pinta y comprueba: luego, las casillas correctas marcadas.', 'لوّن وتحقّق: ثم تظهر المربعات الصحيحة.', 'Paint and check: then the right squares are marked.')
                ],
                create: createGridRounds,
                stars: standardStars(GRID_ROUNDS),
                starsNote: STARS_NOTE,
                Round: GridPlay
            }}
        />
    )
}

/* ---------- Art ---------- */

/** The art of the recipe: the same recipe for 4 and for 8 */
export function RecipeArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[[20, 240], [120, 480]].map(([x, flour]) => (
                <g key={x}>
                    <rect x={x} y="16" width="80" height="88" rx="8" fill="var(--card)" stroke="var(--ink)" strokeWidth="2.5" />
                    <rect x={x + 12} y={96 - flour / 6.5} width="22" height={flour / 6.5} fill="var(--mustard-tint, #fbebc0)" stroke="var(--ink)" strokeWidth="2" />
                    <rect x={x + 46} y={96 - flour / 10} width="22" height={flour / 10} fill="var(--blue-tint, #dde7f7)" stroke="var(--ink)" strokeWidth="2" />
                </g>
            ))}
            <text x="110" y="12" textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--blue)" direction="ltr">×2</text>
        </svg>
    )
}

/** The art of paint the percentage: 20 squares, 6 of them painted (30 %) */
export function GridArt() {
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {Array.from({ length: 20 }, (_, index) => (
                <rect key={index} x={10 + (index % 10) * 20} y={26 + Math.floor(index / 10) * 20} width="20" height="20" fill={index < 6 ? 'var(--blue-tint, #dde7f7)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2" />
            ))}
            <text x="110" y="100" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--blue)" direction="ltr">30 %</text>
        </svg>
    )
}
