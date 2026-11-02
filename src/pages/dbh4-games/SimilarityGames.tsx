import { useState, type ReactNode, type PointerEvent } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { groupDigits } from '../../utils/numberFormat'
import { standardStars } from './equations'
import { tex } from './geometryDetective'
import { CONTEXT_UNIT, createMapRounds, createScaleRounds, createTowerRounds, kLatex, MAP_ROUNDS, mapPrompt, RULER_CM, SCALE_ROUNDS, scaleFactor, scalePrompt, TOWER_MAX, TOWER_ROUNDS, towerLayout, type MapRound, type ScaleRound, type TowerRound } from './similarity'
import { plainNumber } from './format'
import './Dbh4Games.css'

/* ==========================================================================
   Grow it k times, Measure the tower and The map scale (4. DBH similarity):
   answer first; then the big figure fills with copies of the small one,
   the sun ray (or the line of sight) runs from the top, or the town appears
   on the map.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar: ar.replace(/\{,\}/g, '.') })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
const INK = 'var(--ink, #1d2733)'
const MUTED = 'var(--muted, #58616e)'
const BLUE = 'var(--blue, #2f5fb3)'
const GREEN = 'var(--success, #267b53)'
const RED = 'var(--error, #c4432a)'
const SUN = '#e0a526'
const SOFT = '#fbebc0'
const SKY = '#dde7f7'
const signed = (value: number, language: UnitLanguage) => plainNumber(value, language)

/* ---------- Grow it k times ---------- */

/** cm^{2} → \\ \\text{cm}^{2} */
const unitLatex = (unit: string) => {
    const [base, power] = unit.split('^')
    return `\\ \\text{${base}}${power ? `^${power}` : ''}`
}
const optionLatex = (round: ScaleRound, value: number) => (round.inverse ? `k=${tex(value)}` : `${tex(value)}${unitLatex(CONTEXT_UNIT[round.context])}`)

const ISO = [Math.cos(Math.PI / 6), 0.5] as const

/** n × n × n unit cubes (or one big cube when not split), drawn from the back */
function CubeBlock({ n, unit, ox, oy, fill, split, mark }: { n: number; unit: number; ox: number; oy: number; fill: string; split: boolean; mark?: boolean }) {
    const at = (x: number, y: number, z: number) => [ox + (x - y) * ISO[0] * unit, oy + (x + y) * ISO[1] * unit - z * unit] as const
    const faces = (x: number, y: number, z: number, size: number, color: string, key: string) => {
        const p = (dx: number, dy: number, dz: number) => at(x + dx * size, y + dy * size, z + dz * size).join(',')
        const left = `${p(0, 1, 0)} ${p(1, 1, 0)} ${p(1, 1, 1)} ${p(0, 1, 1)}`
        const right = `${p(1, 0, 0)} ${p(1, 1, 0)} ${p(1, 1, 1)} ${p(1, 0, 1)}`
        return (
            <g key={key} stroke={INK} strokeWidth={split ? 1 : 2} strokeLinejoin="round">
                <polygon points={`${p(0, 0, 1)} ${p(1, 0, 1)} ${p(1, 1, 1)} ${p(0, 1, 1)}`} fill={color} />
                <polygon points={left} fill={color} />
                <polygon points={left} fill="#1d2733" fillOpacity="0.1" />
                <polygon points={right} fill={color} />
                <polygon points={right} fill="#1d2733" fillOpacity="0.2" />
            </g>
        )
    }
    if (!split) return faces(0, 0, 0, n, fill, 'whole')
    // From the back to the front: the sum x + y + z grows towards the viewer
    const order: Array<[number, number, number]> = []
    for (let x = 0; x < n; x += 1) for (let y = 0; y < n; y += 1) for (let z = 0; z < n; z += 1) order.push([x, y, z])
    order.sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]))
    return <g>{order.map(([x, y, z]) => faces(x, y, z, 1, mark && x === n - 1 && y === n - 1 && z === n - 1 ? SOFT : fill, `${x}-${y}-${z}`))}</g>
}

function GrowthPicture({ round, answered }: { round: ScaleRound; answered: boolean }) {
    // The figure that is n times the other: the new one when it grows, the first one when it shrinks
    const shrinks = round.k[1] > 1
    const n = shrinks ? round.k[1] : round.k[0]
    const [small, big] = shrinks ? [SKY, SOFT] : [SOFT, SKY]
    let drawing: ReactNode
    if (round.growth === 'length') {
        const unit = Math.min(54, 230 / n)
        drawing = (
            <g>
                <line x1="20" y1="54" x2={20 + unit} y2="54" stroke={INK} strokeWidth="7" strokeLinecap="round" />
                <line x1="20" y1="54" x2={20 + unit} y2="54" stroke={small} strokeWidth="4" strokeLinecap="round" />
                <line x1="20" y1="110" x2={20 + unit * n} y2="110" stroke={INK} strokeWidth="7" strokeLinecap="round" />
                <line x1="20" y1="110" x2={20 + unit * n} y2="110" stroke={big} strokeWidth="4" strokeLinecap="round" />
                {answered && Array.from({ length: n + 1 }, (_, index) => <line key={index} x1={20 + index * unit} y1="100" x2={20 + index * unit} y2="120" stroke={INK} strokeWidth="2" />)}
            </g>
        )
    } else if (round.growth === 'area') {
        const unit = Math.min(40, 128 / n)
        const [x, y] = [150, 150 - unit * n]
        drawing = (
            <g>
                <rect x="40" y={150 - unit} width={unit} height={unit} fill={small} stroke={INK} strokeWidth="2" />
                <rect x={x} y={y} width={unit * n} height={unit * n} fill={big} stroke={INK} strokeWidth="2.4" />
                {answered && Array.from({ length: n - 1 }, (_, index) => (
                    <g key={index}>
                        <line x1={x + (index + 1) * unit} y1={y} x2={x + (index + 1) * unit} y2="150" stroke={INK} strokeWidth="1" />
                        <line x1={x} y1={y + (index + 1) * unit} x2={x + unit * n} y2={y + (index + 1) * unit} stroke={INK} strokeWidth="1" />
                    </g>
                ))}
                {answered && <rect x={x} y={150 - unit} width={unit} height={unit} fill={small} stroke={INK} strokeWidth="1.6" />}
            </g>
        )
    } else {
        // A block of n cubes is 2·n·unit tall on the screen and stands on y = 150
        const unit = Math.min(28, 64 / n)
        drawing = (
            <g>
                <CubeBlock n={1} unit={unit} ox={60} oy={150 - unit} fill={small} split={false} />
                <CubeBlock n={n} unit={unit} ox={210} oy={150 - unit * n} fill={big} split={answered} mark />
            </g>
        )
    }
    const factor = round.inverse ? round.value : scaleFactor([n, 1], round.growth)
    return (
        <svg className="dbh4-scene dbh4-scene-short" viewBox="0 0 320 170" direction="ltr" aria-hidden="true">
            {drawing}
            <text x="20" y="30" fontSize="20" fontWeight="700" fill={answered ? BLUE : MUTED}>{answered ? `× ${factor}` : '× ?'}</text>
        </svg>
    )
}

function ScalePlay({ round, language, onAnswer, answered }: RoundProps<ScaleRound>) {
    const l = useGameText(language)
    const [chosen, setChosen] = useState<number | null>(null)
    const power = round.growth === 'length' ? '' : round.growth === 'area' ? '^{2}' : '^{3}'
    const k = round.k[1] === 1 ? kLatex(round.k) : `\\left(${kLatex(round.k)}\\right)`
    const worked = round.inverse
        ? `k=${round.growth === 'area' ? `\\sqrt{${round.value}}` : `\\sqrt[3]{${round.value}}`}=${round.k[0]}`
        : `${tex(round.value)}\\cdot ${k}${power}=${optionLatex(round, round.options[round.right])}`
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(scalePrompt(round))} inline /></p>
            <GrowthPicture round={round} answered={answered} />
            <div className="dbh4-candidates dbh4-fractions">
                {round.options.map((option, index) => (
                    <button
                        key={index}
                        type="button"
                        className={answered ? (index === round.right ? 'found' : index === chosen ? 'missed' : '') : ''}
                        disabled={answered}
                        onClick={() => {
                            setChosen(index)
                            onAnswer(index === round.right)
                        }}
                    >
                        {formula(optionLatex(round, option), language)}
                    </button>
                ))}
            </div>
            {answered && (
                <RoundVerdict right={chosen === round.right} language={language}>
                    <span className="dbh4-worked">{formula(worked, language)}</span>
                    {round.growth === 'length'
                        ? l(say('Luzerak k bider.', 'Las longitudes van por k.', 'الأطوال تُضرب في k.', 'Lengths go times k.'))
                        : round.growth === 'area'
                            ? l(say('Azalerak k² bider: koadro txikiaren kopiak.', 'Las áreas van por k²: copias del cuadrado pequeño.', 'المساحات تُضرب في k²: نسخ من المربع الصغير.', 'Areas go times k²: copies of the small square.'))
                            : l(say('Bolumenak k³ bider: kubo txikiaren kopiak.', 'Los volúmenes van por k³: copias del cubo pequeño.', 'الحجوم تُضرب في k³: نسخ من المكعب الصغير.', 'Volumes go times k³: copies of the small cube.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function ScaleGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: SCALE_ROUNDS,
                rules: [
                    say('Antzekotasun-arrazoia k bada, luzerak k bider, azalerak $k^{2}$ bider eta bolumenak $k^{3}$ bider.', 'Si la razón de semejanza es k, las longitudes van por k, las áreas por $k^{2}$ y los volúmenes por $k^{3}$.', 'إذا كانت نسبة التشابه k فالأطوال تُضرب في k والمساحات في $k^{2}$ والحجوم في $k^{3}$.', 'If the scale factor is k, lengths go times k, areas times $k^{2}$ and volumes times $k^{3}$.'),
                    say('Pintura eta haziak azalerari dagozkio; ura eta pisua, bolumenari.', 'La pintura y las semillas van con el área; el agua y el peso, con el volumen.', 'الدهان والبذور تتبع المساحة، والماء والوزن يتبعان الحجم.', 'Paint and seed go with the area; water and weight, with the volume.'),
                    say('Aukeratu erantzuna: gero, irudi handia txikiaren kopiekin beteko da.', 'Elige la respuesta: después, la figura grande se llenará de copias de la pequeña.', 'اختر الإجابة: بعدها يمتلئ الشكل الكبير بنسخ من الصغير.', 'Choose the answer: then the big figure fills up with copies of the small one.')
                ],
                create: createScaleRounds,
                stars: standardStars(SCALE_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: ScalePlay
            }}
        />
    )
}

/* ---------- Measure the tower ---------- */

const GROUND = 186
const SCENE_LEFT = 24

function TowerScene({ round, guess, answered, language }: { round: TowerRound; guess: number; answered: boolean; language: UnitLanguage }) {
    const layout = towerLayout(round)
    // Across, fitted to the ground of the scene; up, to the highest tower of the stepper, never to the answer.
    // Two scales keep parallel rays parallel and points in line in line.
    const sx = 270 / (layout.extent + 1)
    const sy = 164 / TOWER_MAX
    const X = (metres: number) => SCENE_LEFT + metres * sx
    const Y = (metres: number) => GROUND - metres * sy
    const towerX = X(layout.towerX)
    const right = Math.abs(guess - round.height) < 1e-9
    const top = Y(guess)
    const label = (value: number) => `${signed(value, language)} m`
    let known: ReactNode
    let ray: ReactNode = null
    if (round.method === 'shadow') {
        const stickX = X(0)
        const tip = X(round.near)
        const landing = layout.towerX + (guess * round.near) / round.known
        known = (
            <g>
                <circle cx="40" cy="24" r="12" fill={SUN} />
                <line x1={stickX} y1={GROUND} x2={tip} y2={GROUND} stroke={MUTED} strokeWidth="6" />
                <line x1={stickX} y1={GROUND} x2={stickX} y2={Y(round.known)} stroke={INK} strokeWidth="4" strokeLinecap="round" />
                <line x1={stickX} y1={Y(round.known)} x2={tip} y2={GROUND} stroke={SUN} strokeWidth="2" strokeDasharray="5 4" />
                <line x1={towerX} y1={GROUND} x2={X(layout.towerX + round.far)} y2={GROUND} stroke={MUTED} strokeWidth="6" />
                <text x={stickX + 4} y={Y(round.known) - 6} fontSize="12" fontWeight="700" fill={INK}>{label(round.known)}</text>
                <text x={(stickX + tip) / 2} y={GROUND + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={MUTED}>{label(round.near)}</text>
                <text x={(towerX + X(layout.towerX + round.far)) / 2} y={GROUND + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={MUTED}>{label(round.far)}</text>
            </g>
        )
        // The ray from the top that was set, and the real one when they differ
        if (answered) ray = (
            <g>
                {!right && <line x1={towerX} y1={Y(round.height)} x2={X(layout.towerX + round.far)} y2={GROUND} stroke={GREEN} strokeWidth="2" strokeDasharray="4 4" />}
                <line x1={towerX} y1={top} x2={X(landing)} y2={GROUND} stroke={right ? GREEN : RED} strokeWidth="2.6" strokeDasharray="6 4" />
            </g>
        )
    } else if (round.method === 'mirror') {
        const person = X(0)
        const mirror = X(layout.mirrorX!)
        known = (
            <g>
                <line x1={person} y1={GROUND} x2={person} y2={Y(round.known) + 8} stroke={INK} strokeWidth="4" strokeLinecap="round" />
                <circle cx={person} cy={Y(round.known)} r="5" fill={INK} />
                <rect x={mirror - 8} y={GROUND - 3} width="16" height="5" rx="2" fill={SKY} stroke={BLUE} strokeWidth="1.5" />
                <line x1={person} y1={Y(round.known)} x2={mirror} y2={GROUND - 2} stroke={SUN} strokeWidth="2" strokeDasharray="5 4" />
                <text x={person + 7} y={Y(round.known) - 4} fontSize="12" fontWeight="700" fill={INK}>{label(round.known)}</text>
                <text x={(person + mirror) / 2} y={GROUND + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={MUTED}>{label(round.near)}</text>
                <text x={(mirror + towerX) / 2} y={GROUND + 16} textAnchor="middle" fontSize="12" fontWeight="700" fill={MUTED}>{label(round.far)}</text>
            </g>
        )
        if (answered) ray = <line x1={mirror} y1={GROUND - 2} x2={towerX} y2={Y(round.height)} stroke={GREEN} strokeWidth="2.6" strokeDasharray="6 4" />
    } else {
        const eye = X(0)
        const stick = X(round.near)
        known = (
            <g>
                <circle cx={eye} cy={GROUND - 3} r="5" fill={INK} />
                <line x1={stick} y1={GROUND} x2={stick} y2={Y(round.known)} stroke={INK} strokeWidth="4" strokeLinecap="round" />
                <line x1={eye} y1={GROUND - 3} x2={stick} y2={Y(round.known)} stroke={SUN} strokeWidth="2" strokeDasharray="5 4" />
                <text x={stick + 5} y={Y(round.known) - 4} fontSize="12" fontWeight="700" fill={INK}>{label(round.known)}</text>
                <line x1={eye} y1={GROUND + 9} x2={stick} y2={GROUND + 9} stroke={MUTED} strokeWidth="1.5" />
                <text x={(eye + stick) / 2} y={GROUND + 22} textAnchor="middle" fontSize="12" fontWeight="700" fill={MUTED}>{label(round.near)}</text>
                <line x1={eye} y1={GROUND + 30} x2={towerX} y2={GROUND + 30} stroke={MUTED} strokeWidth="1.5" />
                <text x={(eye + towerX) / 2} y={GROUND + 43} textAnchor="middle" fontSize="12" fontWeight="700" fill={MUTED}>{label(round.far)}</text>
            </g>
        )
        if (answered) ray = <line x1={eye} y1={GROUND - 3} x2={towerX} y2={Y(round.height)} stroke={GREEN} strokeWidth="2.6" strokeDasharray="6 4" />
    }
    return (
        <svg className="dbh4-scene" viewBox="0 0 320 236" direction="ltr" aria-hidden="true">
            <line x1="6" y1={GROUND} x2="314" y2={GROUND} stroke="var(--line, #d6cfc2)" strokeWidth="3" />
            {known}
            {guess > 0 && <rect x={towerX - 7} y={top} width="14" height={GROUND - top} fill={answered ? (right ? '#cfe8d8' : '#f3d3cb') : SKY} stroke={answered ? (right ? GREEN : RED) : BLUE} strokeWidth="2" />}
            {answered && !right && <line x1={towerX - 12} y1={Y(round.height)} x2={towerX + 12} y2={Y(round.height)} stroke={GREEN} strokeWidth="3" />}
            {ray}
            {guess > 0 && <text x={towerX - 11} y={Math.max(14, top - 6)} textAnchor="end" fontSize="13" fontWeight="700" fill={BLUE}>{label(guess)}</text>}
        </svg>
    )
}

const TOWER_PROMPTS: Record<TowerRound['method'], LocalizedText> = {
    shadow: say('Eguzkiak makila eta dorrea argitzen ditu. Zer altuera du dorreak?', 'El sol ilumina el palo y la torre. ¿Qué altura tiene la torre?', 'الشمس تضيء العصا والبرج. ما ارتفاع البرج؟', 'The sun shines on the stick and the tower. How tall is the tower?'),
    mirror: say('Pertsonak dorrearen goialdea ikusten du lurreko ispiluan. Zer altuera du dorreak?', 'La persona ve la punta de la torre en el espejo del suelo. ¿Qué altura tiene la torre?', 'يرى الشخص قمة البرج في المرآة على الأرض. ما ارتفاع البرج؟', 'The person sees the top of the tower in the mirror on the ground. How tall is the tower?'),
    sight: say('Lurrean etzanda, begiak makilaren puntua eta dorrearena lerro berean ikusten ditu. Zer altuera du dorreak?', 'Tumbado en el suelo, el ojo ve en línea la punta del palo y la de la torre. ¿Qué altura tiene la torre?', 'من على الأرض ترى العين رأس العصا وقمة البرج على خط واحد. ما ارتفاع البرج؟', 'Lying on the ground, the eye sees the top of the stick and of the tower in line. How tall is the tower?')
}

function TowerPlay({ round, language, onAnswer, answered }: RoundProps<TowerRound>) {
    const l = useGameText(language)
    const [guess, setGuess] = useState(0)
    const right = Math.abs(guess - round.height) < 1e-9
    const set = (value: number) => !answered && setGuess(Math.min(TOWER_MAX, Math.max(0, Math.round(value / round.step) * round.step)))
    return (
        <>
            <p className="prop3-prompt">{l(TOWER_PROMPTS[round.method])}</p>
            <TowerScene round={round} guess={guess} answered={answered} language={language} />
            {!answered && (
                <div className="dbh4-controls">
                    <input type="range" min={0} max={TOWER_MAX} step={round.step} value={guess} onChange={(event) => set(Number(event.target.value))} aria-label={l(say('Dorrearen altuera', 'Altura de la torre', 'ارتفاع البرج', 'Height of the tower'))} />
                    <Stepper label={l(say('Altuera (m)', 'Altura (m)', 'الارتفاع (م)', 'Height (m)'))} value={guess} min={0} max={TOWER_MAX} step={round.step} format={(value) => signed(value, language)} onChange={set} language={language} />
                    <button type="button" className="fraction-v2-primary" disabled={guess === 0} onClick={() => onAnswer(right)}>{l(say('Bota izpia', 'Lanza el rayo', 'أطلق الشعاع', 'Cast the ray'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`\\dfrac{H}{${tex(round.far)}}=\\dfrac{${tex(round.known)}}{${tex(round.near)}}\\ \\to\\ H=${tex(round.height)}\\ \\text{m}`, language)}</span>
                    {right
                        ? l(say('Izpiak puntu zehatzean egiten du topo.', 'El rayo llega justo al punto.', 'يصل الشعاع إلى النقطة تمامًا.', 'The ray lands exactly on the point.'))
                        : l(say('Marra berdea: benetako altuera. Bi triangeluak antzekoak dira.', 'La raya verde: la altura de verdad. Los dos triángulos son semejantes.', 'الخط الأخضر: الارتفاع الحقيقي. المثلثان متشابهان.', 'The green mark: the real height. The two triangles are similar.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function TowerGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: TOWER_ROUNDS,
                rules: [
                    say('Makilak eta dorreak triangelu antzekoak egiten dituzte: $\\frac{H}{D}=\\frac{h}{d}$.', 'El palo y la torre forman triángulos semejantes: $\\frac{H}{D}=\\frac{h}{d}$.', 'العصا والبرج يكوّنان مثلثين متشابهين: $\\frac{H}{D}=\\frac{h}{d}$.', 'The stick and the tower make similar triangles: $\\frac{H}{D}=\\frac{h}{d}$.'),
                    say('Ispiluan, sartzen den izpiak eta ateratzen denak angelu bera egiten dute lurrarekin.', 'En el espejo, el rayo que llega y el que sale forman el mismo ángulo con el suelo.', 'في المرآة يصنع الشعاع الداخل والخارج الزاوية نفسها مع الأرض.', 'In the mirror, the ray coming in and the ray going out make the same angle with the ground.'),
                    say('Jarri altuera eta bota izpia: orduan ikusiko duzu asmatu duzun.', 'Pon la altura y lanza el rayo: entonces verás si aciertas.', 'ضع الارتفاع وأطلق الشعاع: عندها سترى إن أصبت.', 'Set the height and cast the ray: then you will see whether you got it.')
                ],
                create: createTowerRounds,
                stars: standardStars(TOWER_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TowerPlay
            }}
        />
    )
}

/* ---------- The map scale ---------- */

const RULER_LEFT = 20
const CM_PX = 28
const ROAD_Y = 74

/** 1 : 200 000 as plain text, the thousands mark of the language (a thin space but in English) */
const scaleText = (scale: number, language: UnitLanguage) => `1 : ${groupDigits(scale, language)}`

function MapScene({ round, mark, answered, onPick, language }: { round: MapRound; mark: number | null; answered: boolean; onPick: (cm: number) => void; language: UnitLanguage }) {
    const x = (cm: number) => RULER_LEFT + cm * CM_PX
    const showB = round.mode === 'read' || answered
    const right = mark !== null && Math.abs(mark - round.cm) < 1e-9
    const pick = (event: PointerEvent<SVGSVGElement>) => {
        if (answered || round.mode !== 'place') return
        const svg = event.currentTarget
        const box = svg.getBoundingClientRect()
        const viewX = ((event.clientX - box.left) / box.width) * 320
        const cm = Math.round((viewX - RULER_LEFT) / CM_PX / round.snap) * round.snap
        onPick(Math.min(RULER_CM, Math.max(round.snap, cm)))
    }
    return (
        <svg className={`dbh4-scene${round.mode === 'place' && !answered ? ' dbh4-pickable' : ''}`} viewBox="0 0 320 196" direction="ltr" aria-hidden="true" onPointerDown={pick}>
            <rect x="8" y="8" width="304" height="112" rx="10" fill="#d6eddf" stroke={INK} strokeWidth="2" />
            <path d="M 8 100 C 70 84, 120 116, 190 98 S 280 82, 312 92" fill="none" stroke={BLUE} strokeWidth="5" strokeOpacity="0.35" />
            {[[60, 32], [236, 30], [150, 104], [282, 106]].map(([cx, cy]) => <circle key={`${cx}`} cx={cx} cy={cy} r="7" fill="#9fcfae" />)}
            <line x1={x(0)} y1={ROAD_Y} x2={x(RULER_CM)} y2={ROAD_Y} stroke="var(--paper-deep, #ece6da)" strokeWidth="6" strokeLinecap="round" />
            <text x="304" y="26" textAnchor="end" fontSize="13" fontWeight="700" fill={INK}>{scaleText(round.scale, language)}</text>
            <circle cx={x(0)} cy={ROAD_Y} r="7" fill={RED} />
            <text x={x(0)} y={ROAD_Y - 12} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>A</text>
            {showB && (
                <g>
                    <circle cx={x(round.cm)} cy={ROAD_Y} r="7" fill={answered && round.mode === 'place' ? GREEN : RED} />
                    <text x={x(round.cm)} y={ROAD_Y - 12} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>B</text>
                    <line x1={x(round.cm)} y1={ROAD_Y + 8} x2={x(round.cm)} y2="140" stroke={MUTED} strokeWidth="1" strokeDasharray="3 3" />
                </g>
            )}
            {round.mode === 'place' && mark !== null && (!answered || !right) && (
                <g>
                    <circle cx={x(mark)} cy={ROAD_Y} r="8" fill="none" stroke={answered ? RED : BLUE} strokeWidth="3" />
                    <line x1={x(mark)} y1={ROAD_Y + 9} x2={x(mark)} y2="140" stroke={answered ? RED : BLUE} strokeWidth="1.5" strokeDasharray="3 3" />
                </g>
            )}
            <rect x={RULER_LEFT - 8} y="140" width={RULER_CM * CM_PX + 16} height="44" rx="4" fill="#fbebc0" stroke={INK} strokeWidth="1.5" />
            {Array.from({ length: RULER_CM * 2 + 1 }, (_, index) => {
                const whole = index % 2 === 0
                return <line key={index} x1={x(index / 2)} y1="140" x2={x(index / 2)} y2={whole ? 154 : 148} stroke={INK} strokeWidth={whole ? 1.6 : 1} />
            })}
            {Array.from({ length: RULER_CM + 1 }, (_, cm) => <text key={cm} x={x(cm)} y="170" textAnchor="middle" fontSize="11" fontWeight="700" fill={INK}>{cm}</text>)}
            <text x={x(RULER_CM) + 4} y="181" textAnchor="end" fontSize="10" fill={MUTED}>cm</text>
        </svg>
    )
}

function MapPlay({ round, language, onAnswer, answered }: RoundProps<MapRound>) {
    const l = useGameText(language)
    const [mark, setMark] = useState<number | null>(null)
    const [real, setReal] = useState(0)
    const right = round.mode === 'place' ? mark !== null && Math.abs(mark - round.cm) < 1e-9 : Math.abs(real - round.real) < 1e-9
    const unit = round.unit === 'km' ? 'km' : 'm'
    const realLatex = `${tex(round.real)}\\ \\text{${unit}}`
    const prompt = mapPrompt(round)
    const centimetres = round.cm * round.scale
    const worked = `${tex(round.cm)}\\cdot ${tex(round.scale)}=${tex(centimetres)}\\ \\text{cm}=${realLatex}`
    return (
        <>
            <p className="prop3-prompt"><MathText text={l(prompt)} inline /></p>
            <MapScene round={round} mark={mark} answered={answered} onPick={setMark} language={language} />
            {!answered && (
                <div className="dbh4-controls">
                    {round.mode === 'read' && <input type="range" min={0} max={RULER_CM * round.perCm} step={round.snap * round.perCm} value={real} onChange={(event) => setReal(Number(event.target.value))} aria-label={l(say('Benetako distantzia', 'Distancia real', 'المسافة الحقيقية', 'Real distance'))} />}
                    {round.mode === 'read' && <Stepper label={l(say(`Errealitatean (${unit})`, `En la realidad (${unit})`, `في الواقع (${unit})`, `In reality (${unit})`))} value={real} min={0} max={RULER_CM * round.perCm} step={round.snap * round.perCm} format={(value) => `${signed(value, language)} ${unit}`} onChange={setReal} language={language} />}
                    {round.mode === 'place' && <p className="dbh4-hint">{l(say('Sakatu erregela edo mapa, edo erabili + eta −.', 'Pulsa la regla o el mapa, o usa + y −.', 'اضغط على المسطرة أو الخريطة، أو استعمل + و−.', 'Tap the ruler or the map, or use + and −.'))}</p>}
                    {round.mode === 'place' && <Stepper label={l(say('B mapan (cm)', 'B en el mapa (cm)', 'B على الخريطة (cm)', 'B on the map (cm)'))} value={mark ?? 0} min={0} max={RULER_CM} step={round.snap} format={(value) => `${signed(value, language)} cm`} onChange={(value) => setMark(value === 0 ? null : value)} language={language} />}
                    <button type="button" className="fraction-v2-primary" disabled={round.mode === 'place' ? mark === null : real === 0} onClick={() => onAnswer(right)}>{l(say('Egiaztatu', 'Comprobar', 'تحقّق', 'Check'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(worked, language)}</span>
                    {round.unit === 'km'
                        ? l(say('Gogoratu: 1 km = 100 000 cm.', 'Recuerda: 1 km = 100 000 cm.', 'تذكّر: 1 km = 100 000 cm.', 'Remember: 1 km = 100,000 cm.'))
                        : l(say('Gogoratu: 1 m = 100 cm.', 'Recuerda: 1 m = 100 cm.', 'تذكّر: 1 m = 100 cm.', 'Remember: 1 m = 100 cm.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function MapGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: MAP_ROUNDS,
                rules: [
                    say('$1\\mathbin{:}50\\,000$ eskalan, mapako zentimetro bat errealitateko $50\\,000\\ \\text{cm}$ da.', 'A escala $1\\mathbin{:}50\\,000$, un centímetro del mapa son $50\\,000\\ \\text{cm}$ de verdad.', 'بمقياس $1\\mathbin{:}50\\,000$ يساوي سنتيمتر الخريطة $50\\,000\\ \\text{cm}$ في الواقع.', 'At scale $1\\mathbin{:}50\\,000$, one centimetre of the map is $50\\,000\\ \\text{cm}$ in reality.'),
                    say('Batzuetan B kokatu behar duzu erregelan; beste batzuetan, benetako distantzia eman.', 'Unas veces colocas B en la regla; otras, das la distancia real.', 'أحيانًا تضع B على المسطرة، وأحيانًا تعطي المسافة الحقيقية.', 'Sometimes you place B on the ruler; other times you give the real distance.'),
                    say('Erregela zentimetrotan dago, erdiak ere bai.', 'La regla está en centímetros, con las medias.', 'المسطرة بالسنتيمترات مع الأنصاف.', 'The ruler is in centimetres, with the halves.')
                ],
                create: createMapRounds,
                stars: standardStars(MAP_ROUNDS),
                starsNote: say('3 izar: 6 · 2 izar: 5 · izar 1: 3', '3 estrellas: 6 · 2: 5 · 1: 3', '3 نجوم: 6 · 2: 5 · 1: 3', '3 stars: 6 · 2: 5 · 1: 3'),
                Round: MapPlay
            }}
        />
    )
}

/** The art of the similarity games */
export function SimilarityArt({ game }: { game: 'scale' | 'tower' | 'map' }) {
    if (game === 'scale') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <rect x="20" y="78" width="24" height="24" fill={SOFT} stroke="var(--ink)" strokeWidth="2.4" />
                <rect x="104" y="30" width="72" height="72" fill={SKY} stroke="var(--ink)" strokeWidth="2.4" />
                {[1, 2].map((index) => <g key={index}><line x1={104 + index * 24} y1="30" x2={104 + index * 24} y2="102" stroke="var(--ink)" strokeWidth="1.2" /><line x1="104" y1={30 + index * 24} x2="176" y2={30 + index * 24} stroke="var(--ink)" strokeWidth="1.2" /></g>)}
                <text x="70" y="64" textAnchor="middle" fontSize="18" fontWeight="700" fill="var(--blue)" direction="ltr">× 9</text>
            </svg>
        )
    }
    if (game === 'tower') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <circle cx="20" cy="20" r="11" fill={SUN} />
                <line x1="8" y1="104" x2="212" y2="104" stroke="var(--ink)" strokeWidth="2.5" />
                <line x1="30" y1="104" x2="30" y2="80" stroke="var(--ink)" strokeWidth="4" strokeLinecap="round" />
                <line x1="30" y1="80" x2="62" y2="104" stroke={SUN} strokeWidth="2.5" strokeDasharray="5 4" />
                <rect x="96" y="28" width="16" height="76" fill={SKY} stroke="var(--blue)" strokeWidth="2.4" />
                <line x1="104" y1="28" x2="206" y2="104" stroke={SUN} strokeWidth="2.5" strokeDasharray="5 4" />
                <text x="88" y="64" textAnchor="end" fontSize="18" fontWeight="700" fill="var(--blue)" direction="ltr">?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <rect x="10" y="10" width="200" height="66" rx="8" fill="#d6eddf" stroke="var(--ink)" strokeWidth="2.4" />
            <line x1="30" y1="44" x2="150" y2="44" stroke="var(--ink)" strokeWidth="2" strokeDasharray="5 4" />
            <circle cx="30" cy="44" r="6" fill={RED} />
            <circle cx="150" cy="44" r="6" fill={GREEN} />
            <rect x="20" y="84" width="180" height="26" rx="3" fill={SOFT} stroke="var(--ink)" strokeWidth="2" />
            {Array.from({ length: 10 }, (_, index) => <line key={index} x1={30 + index * 17} y1="84" x2={30 + index * 17} y2={index % 2 === 0 ? 96 : 91} stroke="var(--ink)" strokeWidth="1.5" />)}
        </svg>
    )
}
