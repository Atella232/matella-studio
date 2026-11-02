import { useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { BOX_OPTIONS_MAX, BOXES_ROUNDS, createBoxesRounds, createModelRounds, MODEL_ANSWERS, MODEL_ROUNDS, modelLatex, type BoxesRound, type Model, type ModelRound } from './combinatorics'
import { standardStars } from './equations'
import { tex } from './geometryDetective'
import './Dbh4Games.css'

/* ==========================================================================
   Does order matter? and The box method (4. DBH academic combinatorics):
   answer first; then the decision tree lights the path of the model, or
   the boxes show one way to fill them.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const YES = say('Bai', 'Sí', 'نعم', 'Yes')
const NO = say('Ez', 'No', 'لا', 'No')

/* ---------- Does order matter? ---------- */

const LEAF_NAMES: Record<'repetition' | 'variations' | 'combinations', LocalizedText> = {
    repetition: say('Errepikapenarekin', 'Con repetición', 'مع التكرار', 'With repetition'),
    variations: say('Aldakuntzak', 'Variaciones', 'التراتيب', 'Variations'),
    combinations: say('Konbinazioak', 'Combinaciones', 'التوافيق', 'Combinations')
}

/** The decision tree: order? → (repeat? → nᵏ or n!/(n−k)!) or combinations; the right path green, a wrong one red */
function DecisionTree({ right, chosen, language }: { right: Model; chosen: { order: boolean; repeat: boolean }; language: UnitLanguage }) {
    const l = useGameText(language)
    const leafOf = (answer: { order: boolean; repeat: boolean }) => (!answer.order ? 'combinations' : answer.repeat ? 'repetition' : 'variations')
    const rightLeaf = leafOf(MODEL_ANSWERS[right])
    const chosenLeaf = leafOf(chosen)
    const leaves = { repetition: [60, 168], variations: [168, 168], combinations: [272, 104] } as const
    type Edge = 'order-yes' | 'order-no' | 'repeat-yes' | 'repeat-no'
    const pathOf = (leaf: keyof typeof leaves): Edge[] => (leaf === 'combinations' ? ['order-no'] : ['order-yes', leaf === 'repetition' ? 'repeat-yes' : 'repeat-no'])
    const stroke = (edge: Edge) => (pathOf(rightLeaf).includes(edge) ? GREEN : pathOf(chosenLeaf).includes(edge) ? RED : 'var(--line, #d6cfc2)')
    const weight = (edge: Edge) => (pathOf(rightLeaf).includes(edge) || pathOf(chosenLeaf).includes(edge) ? 4 : 2)
    const edge = (leaf: keyof typeof leaves) => (leaf === rightLeaf ? GREEN : leaf === chosenLeaf ? RED : 'var(--line, #d6cfc2)')
    return (
        <svg className="dbh4-scene" viewBox="0 0 330 206" direction="ltr" aria-hidden="true">
            <line x1="165" y1="34" x2="114" y2="96" stroke={stroke('order-yes')} strokeWidth={weight('order-yes')} />
            <line x1="165" y1="34" x2="272" y2="104" stroke={stroke('order-no')} strokeWidth={weight('order-no')} />
            <line x1="114" y1="112" x2="60" y2="168" stroke={stroke('repeat-yes')} strokeWidth={weight('repeat-yes')} />
            <line x1="114" y1="112" x2="168" y2="168" stroke={stroke('repeat-no')} strokeWidth={weight('repeat-no')} />
            <rect x="75" y="10" width="180" height="28" rx="14" fill="var(--paper-deep, #ece6da)" stroke={INK} strokeWidth="2" />
            <text x="165" y="29" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>{l(say('Ordenak axola du?', '¿Importa el orden?', 'هل يهم الترتيب؟', 'Does order matter?'))}</text>
            <text x="124" y="66" textAnchor="end" fontSize="12" fontWeight="700" fill={MUTED}>{l(YES)}</text>
            <text x="232" y="56" fontSize="12" fontWeight="700" fill={MUTED}>{l(NO)}</text>
            <rect x="29" y="90" width="170" height="28" rx="14" fill="var(--paper-deep, #ece6da)" stroke={INK} strokeWidth="2" />
            <text x="114" y="109" textAnchor="middle" fontSize="13" fontWeight="700" fill={INK}>{l(say('Errepikatu daiteke?', '¿Se repite?', 'هل يتكرر؟', 'Can it repeat?'))}</text>
            <text x="78" y="138" textAnchor="end" fontSize="12" fontWeight="700" fill={MUTED}>{l(YES)}</text>
            <text x="148" y="138" fontSize="12" fontWeight="700" fill={MUTED}>{l(NO)}</text>
            {(Object.keys(leaves) as Array<keyof typeof leaves>).map((leaf) => (
                <g key={leaf}>
                    <rect x={leaves[leaf][0] - 52} y={leaves[leaf][1]} width="104" height="30" rx="8" fill={leaf === rightLeaf ? 'var(--success-tint, #d9efe2)' : 'var(--card, #fffcf6)'} stroke={edge(leaf)} strokeWidth="2" />
                    <text x={leaves[leaf][0]} y={leaves[leaf][1] + 20} textAnchor="middle" fontSize="12" fontWeight="700" fill={INK}>{l(LEAF_NAMES[leaf])}</text>
                </g>
            ))}
        </svg>
    )
}

function Toggle({ label, value, onChange, disabled, language }: { label: LocalizedText; value: boolean | null; onChange: (value: boolean) => void; disabled: boolean; language: UnitLanguage }) {
    const l = useGameText(language)
    return (
        <div className="dbh4-toggle">
            <span>{l(label)}</span>
            <div className="dbh4-candidates">
                {[true, false].map((option) => (
                    <button key={String(option)} type="button" disabled={disabled} aria-pressed={value === option} className={value === option ? 'chosen' : ''} onClick={() => onChange(option)}>{l(option ? YES : NO)}</button>
                ))}
            </div>
        </div>
    )
}

function ModelPlay({ round, language, onAnswer, answered }: RoundProps<ModelRound>) {
    const l = useGameText(language)
    const [order, setOrder] = useState<boolean | null>(null)
    const [repeat, setRepeat] = useState<boolean | null>(null)
    const [chosen, setChosen] = useState<number | null>(null)
    const truth = MODEL_ANSWERS[round.model]
    // Without order, repetition is not asked (the combinations here never repeat)
    const right = chosen === round.right && order === truth.order && (!truth.order || repeat === truth.repeat)
    const ready = order !== null && (order === false || repeat !== null) && chosen !== null
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.text)} inline /></p>
            <Toggle label={say('Ordenak axola du?', '¿Importa el orden?', 'هل يهم الترتيب؟', 'Does order matter?')} value={order} onChange={setOrder} disabled={answered} language={language} />
            {order !== false && <Toggle label={say('Elementuak errepika daitezke?', '¿Se pueden repetir los elementos?', 'هل يمكن تكرار العناصر؟', 'Can the elements repeat?')} value={repeat} onChange={setRepeat} disabled={answered} language={language} />}
            <div className="dbh4-candidates">
                {round.options.map((option, index) => (
                    <button key={index} type="button" disabled={answered} aria-pressed={chosen === index} className={answered ? (index === round.right ? 'found' : index === chosen ? 'missed' : '') : chosen === index ? 'chosen' : ''} onClick={() => setChosen(index)}>
                        {formula(tex(option), language)}
                    </button>
                ))}
            </div>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" disabled={!ready} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <>
                    <DecisionTree right={round.model} chosen={{ order: order ?? false, repeat: repeat ?? false }} language={language} />
                    <RoundVerdict right={right} language={language}>
                        <span className="dbh4-worked">{formula(`${modelLatex(round.model, round.n, round.k)}=${tex(round.options[round.right])}`, language)}</span>
                        {round.model === 'permutations' && l(say('Guztiak ordenatzen dira: permutazioak.', 'Se ordenan todos: permutaciones.', 'نرتّب الجميع: تباديل.', 'All of them are arranged: permutations.'))}
                    </RoundVerdict>
                </>
            )}
        </>
    )
}

export function ModelGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: MODEL_ROUNDS,
                rules: [
                    say('Bi galdera: ordenak axola du? Elementuak errepika daitezke?', 'Dos preguntas: ¿importa el orden? ¿Se pueden repetir los elementos?', 'سؤالان: هل يهم الترتيب؟ هل يمكن تكرار العناصر؟', 'Two questions: does order matter? Can the elements repeat?'),
                    say('Ordenarekin: errepikapenarekin $n^{k}$, gabe $\\frac{n!}{(n-k)!}$. Ordenarik gabe: $\\binom{n}{k}$.', 'Con orden: con repetición $n^{k}$, sin ella $\\frac{n!}{(n-k)!}$. Sin orden: $\\binom{n}{k}$.', 'مع الترتيب: مع التكرار $n^{k}$ ودونه $\\frac{n!}{(n-k)!}$. دون ترتيب: $\\binom{n}{k}$.', 'With order: with repetition $n^{k}$, without it $\\frac{n!}{(n-k)!}$. Without order: $\\binom{n}{k}$.'),
                    say('Erantzun bi galderak eta aukeratu zenbat diren: gero, erabaki-zuhaitza.', 'Responde a las dos preguntas y elige cuántos hay: luego, el árbol de decisión.', 'أجب عن السؤالين واختر العدد: ثم شجرة القرار.', 'Answer both questions and choose how many there are: then the decision tree.')
                ],
                create: createModelRounds,
                stars: standardStars(MODEL_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ModelPlay
            }}
        />
    )
}

/* ---------- The box method ---------- */

function BoxesPlay({ round, language, onAnswer, answered }: RoundProps<BoxesRound>) {
    const l = useGameText(language)
    const [boxes, setBoxes] = useState<number[]>(round.boxes.map(() => 1))
    const product = boxes.reduce((total, value) => total * value, 1)
    const right = product === round.total
    const change = (index: number, step: number) => setBoxes((previous) => previous.map((value, place) => (place === index ? Math.min(BOX_OPTIONS_MAX, Math.max(1, value + step)) : value)))
    const shown = answered ? round.boxes : boxes
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(round.text)} inline /></p>
            <div className="dbh4-boxes" dir="ltr">
                {shown.map((value, index) => (
                    <div key={index} className={`dbh4-box${answered && round.first === index ? ' first' : ''}`}>
                        {!answered && <button type="button" aria-label={`${l(say('Handitu', 'Aumentar', 'زيادة', 'Increase'))} ${index + 1}`} disabled={value >= BOX_OPTIONS_MAX} onClick={() => change(index, 1)}>▲</button>}
                        <output>{value}</output>
                        {!answered && <button type="button" aria-label={`${l(say('Gutxitu', 'Reducir', 'إنقاص', 'Decrease'))} ${index + 1}`} disabled={value <= 1} onClick={() => change(index, -1)}>▼</button>}
                    </div>
                ))}
            </div>
            <p className="dbh4-readout" dir="ltr">{formula(`${boxes.join('\\cdot ')}=${tex(product)}`, language)}</p>
            {!answered && (
                <div className="prop3-panel">
                    <button type="button" className="fraction-v2-primary" onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`${round.boxes.join('\\cdot ')}=${tex(round.total)}`, language)}</span>
                    {round.first !== null
                        ? l(say('Lehenik, baldintza duen kutxa (nabarmenduta); gero, gainerakoak.', 'Primero, la casilla con condición (resaltada); luego, las demás.', 'أولًا الخانة ذات الشرط (المظلَّلة)، ثم الباقي.', 'First the box with the condition (highlighted); then the others.'))
                        : l(say('Kutxa bakoitzean, zenbat aukera geratzen diren.', 'En cada casilla, cuántas opciones quedan.', 'في كل خانة، كم خيارًا يبقى.', 'In each box, how many options are left.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function BoxesGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: BOXES_ROUNDS,
                rules: [
                    say('Kutxa bakoitzean idatzi zenbat aukera dauden; emaitza biderkadura da.', 'En cada casilla escribe cuántas opciones hay; el resultado es el producto.', 'اكتب في كل خانة عدد الخيارات؛ والنتيجة هي الجداء.', 'In each box write how many options there are; the result is the product.'),
                    say('Errepikatu ezin bada, kutxa bakoitzean aukera bat gutxiago.', 'Si no se puede repetir, en cada casilla una opción menos.', 'إذا لم يجز التكرار ففي كل خانة خيار أقل.', 'If nothing can repeat, each box has one option fewer.'),
                    say('Baldintza dagoenean, bete lehenik kutxa hori.', 'Si hay una condición, rellena primero esa casilla.', 'إذا وُجد شرط فاملأ تلك الخانة أولًا.', 'If there is a condition, fill that box first.')
                ],
                create: createBoxesRounds,
                stars: standardStars(BOXES_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: BoxesPlay
            }}
        />
    )
}

/** The art of the combinatorics games */
export function CombinatoricsArt({ game }: { game: 'model' | 'boxes' }) {
    if (game === 'model') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <line x1="110" y1="26" x2="56" y2="70" stroke={GREEN} strokeWidth="4" />
                <line x1="110" y1="26" x2="170" y2="70" stroke="var(--line)" strokeWidth="3" />
                <line x1="56" y1="80" x2="30" y2="104" stroke="var(--line)" strokeWidth="3" />
                <line x1="56" y1="80" x2="88" y2="104" stroke={GREEN} strokeWidth="4" />
                <circle cx="110" cy="22" r="12" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2.5" />
                <circle cx="56" cy="76" r="10" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="2.5" />
                <rect x="70" y="100" width="40" height="16" rx="4" fill="var(--success-tint, #d9efe2)" stroke={GREEN} strokeWidth="2" />
                <text x="110" y="27" textAnchor="middle" fontSize="14" fontWeight="700" fill="var(--ink)">?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            {[9, 9, 8].map((value, index) => (
                <g key={index}>
                    <rect x={30 + index * 58} y="34" width="46" height="52" rx="8" fill={index === 0 ? 'var(--mustard-tint, #fbebc0)' : 'var(--card)'} stroke="var(--ink)" strokeWidth="2.5" />
                    <text x={53 + index * 58} y="68" textAnchor="middle" fontSize="22" fontWeight="700" fill="var(--ink)">{value}</text>
                </g>
            ))}
            <text x="110" y="110" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" direction="ltr">9 · 9 · 8 = 648</text>
        </svg>
    )
}
