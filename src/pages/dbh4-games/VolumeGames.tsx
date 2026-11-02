import { useEffect, useState, type ReactNode } from 'react'
import { MathText } from '../../components/MathText'
import { Stepper } from '../../features/unit-v2/lab/LabKit'
import { localLatex, useGameText } from '../../features/unit-v2/games/gameHooks'
import type { GameProps } from '../../features/unit-v2/games/GamesHub'
import { RoundGame, RoundVerdict, type RoundProps } from '../../features/unit-v2/games/RoundGame'
import type { GameInfo } from '../../features/unit-v2/games/records'
import type { LocalizedText, UnitLanguage } from '../../features/unit-v2/types'
import { standardStars } from './equations'
import { plainNumber } from './format'
import { tex } from './geometryDetective'
import { createPourRounds, isRound, POUR_MAX, POUR_ROUNDS, volumeLatex, volumeOf, type PourRound, type Vessel, type VesselShape } from './pour'
import { createTilesRounds, floorArea, floorCells, sideLengths, tileArea, TILES_ROUNDS, type TilesRound } from './tiles'
import './Dbh4Games.css'

/* ==========================================================================
   How many glasses? and Tile the floor (4. DBH areas and volumes): set a
   number, then the big container fills glass by glass or the tiles go down
   row by row; only then does the drawing show whether the number was right.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const formula = (latex: string, language: UnitLanguage) => <MathText text={`$${localLatex(latex, language)}$`} inline />
/** A decimal in LaTeX with up to four decimals (0{,}0625) */
const fine = (value: number) => String(Math.round(value * 10000) / 10000).replace('.', '{,}')
const WATER = '#7fb0e8'
const WATER_EDGE = 'var(--blue, #2f5fb3)'
const INK = 'var(--ink, #1d2733)'
const RED = 'var(--error, #c4432a)'
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Counts from 0 up to the target once the answer is given, one step every `pace` ms (at once without motion) */
function useCountUp(target: number, running: boolean, pace: number, step = 1) {
    const [count, setCount] = useState(0)
    const still = reducedMotion()
    useEffect(() => {
        if (!running || still) return
        const timer = window.setInterval(() => setCount((value) => {
            if (value >= target) {
                window.clearInterval(timer)
                return value
            }
            return Math.min(target, value + step)
        }), pace)
        return () => window.clearInterval(timer)
    }, [running, still, target, pace, step])
    if (!running) return 0
    return still ? target : count
}

/* ---------- How many glasses? ---------- */

const SHAPE_NAMES: Record<VesselShape, LocalizedText> = {
    cylinder: say('zilindroa', 'cilindro', 'أسطوانة', 'cylinder'),
    cone: say('konoa', 'cono', 'مخروط', 'cone'),
    sphere: say('esfera', 'esfera', 'كرة', 'sphere'),
    hemisphere: say('erdiesfera', 'semiesfera', 'نصف كرة', 'hemisphere'),
    prism: say('prisma karratua', 'prisma cuadrado', 'منشور رباعي', 'square prism'),
    pyramid: say('piramide karratua', 'pirámide cuadrada', 'هرم رباعي', 'square pyramid'),
    cube: say('kuboa', 'cubo', 'مكعب', 'cube')
}

/** Width and height of a vessel in centimetres as drawn (the depth of a box and the rim of a round one included) */
const drawnWidth = (v: Vessel) => (isRound(v.shape) ? 2 * v.size : v.size * 1.35)
const drawnHeight = (v: Vessel) => v.height + v.size * (isRound(v.shape) ? 0.25 : 0.3)

/** A vessel seen from the front, standing on `bottom`; `level` is the share of its height under water */
function VesselDrawing({ v, cx, bottom, k, level }: { v: Vessel; cx: number; bottom: number; k: number; level: number }) {
    const h = v.height * k
    const top = bottom - h
    const water = Math.min(1, Math.max(0, level))
    const y = bottom - water * h
    if (isRound(v.shape)) {
        const w = v.size * k
        const ry = w * 0.24
        if (v.shape === 'cylinder') {
            return (
                <g>
                    {water > 0 && <path d={`M ${cx - w} ${y} L ${cx - w} ${bottom} A ${w} ${ry} 0 0 0 ${cx + w} ${bottom} L ${cx + w} ${y} Z`} fill={WATER} />}
                    {water > 0 && <ellipse cx={cx} cy={y} rx={w} ry={ry} fill="#a9cbf2" stroke={WATER_EDGE} strokeWidth="1.2" />}
                    <path d={`M ${cx - w} ${top} L ${cx - w} ${bottom} A ${w} ${ry} 0 0 0 ${cx + w} ${bottom} L ${cx + w} ${top}`} fill="none" stroke={INK} strokeWidth="2.4" />
                    <ellipse cx={cx} cy={top} rx={w} ry={ry} fill="none" stroke={INK} strokeWidth="2.4" />
                </g>
            )
        }
        if (v.shape === 'cone') {
            return (
                <g>
                    {water > 0 && <path d={`M ${cx - w} ${top} L ${cx} ${bottom} L ${cx + w} ${top} A ${w} ${ry} 0 0 1 ${cx - w} ${top} Z`} fill={WATER} />}
                    {water > 0 && <ellipse cx={cx} cy={top} rx={w} ry={ry} fill="#a9cbf2" stroke={WATER_EDGE} strokeWidth="1.2" />}
                    <path d={`M ${cx - w} ${top} L ${cx} ${bottom} L ${cx + w} ${top}`} fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
                    <ellipse cx={cx} cy={top} rx={w} ry={ry} fill="none" stroke={INK} strokeWidth="2.4" />
                </g>
            )
        }
        if (v.shape === 'sphere') {
            return (
                <g>
                    <circle cx={cx} cy={bottom - w} r={w} fill={water > 0 ? WATER : 'none'} stroke={INK} strokeWidth="2.4" />
                    <ellipse cx={cx} cy={bottom - w} rx={w} ry={ry} fill="none" stroke={INK} strokeWidth="1.2" strokeDasharray="4 4" />
                </g>
            )
        }
        return (
            <g>
                <path d={`M ${cx - w} ${top} A ${w} ${w} 0 0 0 ${cx + w} ${top} Z`} fill={water > 0 ? WATER : 'none'} stroke={INK} strokeWidth="2.4" />
                <ellipse cx={cx} cy={top} rx={w} ry={ry} fill={water > 0 ? '#a9cbf2' : 'none'} stroke={INK} strokeWidth="2.4" />
            </g>
        )
    }
    // Square vessels in an oblique view: the front face, the top and the right side
    const w = v.size * k
    const [dx, dy] = [w * 0.35, -w * 0.3]
    const x0 = cx - (w + dx) / 2
    const face = (yTop: number, yBottom: number) => `${x0},${yTop} ${x0 + w},${yTop} ${x0 + w},${yBottom} ${x0},${yBottom}`
    const side = (yTop: number, yBottom: number) => `${x0 + w},${yTop} ${x0 + w + dx},${yTop + dy} ${x0 + w + dx},${yBottom + dy} ${x0 + w},${yBottom}`
    const lid = (yLevel: number) => `${x0},${yLevel} ${x0 + w},${yLevel} ${x0 + w + dx},${yLevel + dy} ${x0 + dx},${yLevel + dy}`
    if (v.shape === 'pyramid') {
        const apex = [x0 + (w + dx) / 2, bottom + dy / 2] as const
        return (
            <g>
                {water > 0 && <polygon points={`${x0},${top} ${x0 + w},${top} ${apex[0]},${apex[1]}`} fill={WATER} />}
                {water > 0 && <polygon points={`${x0 + w},${top} ${x0 + w + dx},${top + dy} ${apex[0]},${apex[1]}`} fill="#a9cbf2" />}
                {water > 0 && <polygon points={lid(top)} fill="#a9cbf2" />}
                <line x1={x0 + dx} y1={top + dy} x2={apex[0]} y2={apex[1]} stroke={INK} strokeWidth="1.2" strokeDasharray="4 4" />
                <polygon points={lid(top)} fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
                {[[x0, top], [x0 + w, top], [x0 + w + dx, top + dy]].map(([x, yy]) => <line key={`${x}`} x1={x} y1={yy} x2={apex[0]} y2={apex[1]} stroke={INK} strokeWidth="2.4" />)}
            </g>
        )
    }
    return (
        <g>
            {water > 0 && <polygon points={face(y, bottom)} fill={WATER} />}
            {water > 0 && <polygon points={side(y, bottom)} fill="#6a9fdc" />}
            {water > 0 && <polygon points={lid(y)} fill="#a9cbf2" stroke={WATER_EDGE} strokeWidth="1.2" />}
            <polygon points={face(top, bottom)} fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
            <polygon points={side(top, bottom)} fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
            <polygon points={lid(top)} fill="none" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
        </g>
    )
}

/** The measures under a vessel, one per line */
function measureLines(v: Vessel): string[] {
    if (v.shape === 'sphere' || v.shape === 'hemisphere') return [`r = ${v.size} cm`]
    if (v.shape === 'cube') return [`a = ${v.size} cm`]
    return [`${isRound(v.shape) ? 'r' : 'a'} = ${v.size} cm`, `h = ${v.height} cm`]
}

const POUR_FLOOR = 200
const SOURCE_X = 72
const TARGET_X = 214

function PourScene({ round, poured, answered }: { round: PourRound; poured: number; answered: boolean }) {
    const { source, target, fills } = round
    const k = Math.min(150 / drawnWidth(target), 170 / drawnHeight(target), 104 / drawnWidth(source), 170 / drawnHeight(source))
    const level = poured / fills
    const spilled = poured > fills
    return (
        <svg className="dbh4-scene" viewBox="0 0 320 244" direction="ltr" aria-hidden="true">
            <line x1="8" y1={POUR_FLOOR + 1} x2="312" y2={POUR_FLOOR + 1} stroke="var(--line, #d6cfc2)" strokeWidth="3" />
            <VesselDrawing v={source} cx={SOURCE_X} bottom={POUR_FLOOR} k={k} level={1} />
            <VesselDrawing v={target} cx={TARGET_X} bottom={POUR_FLOOR} k={k} level={level} />
            {answered && <text x={SOURCE_X} y="22" textAnchor="middle" fontSize="18" fontWeight="700" fill={WATER_EDGE}>{`× ${poured}`}</text>}
            {spilled && (
                <g className="dbh4-spill">
                    {[[0, 0], [10, 16], [-6, 30], [14, 40]].map(([ox, oy]) => <circle key={`${ox}-${oy}`} cx={TARGET_X + drawnWidth(target) * k * 0.55 + ox} cy={POUR_FLOOR - target.height * k + 20 + oy} r="5" fill={WATER} stroke={WATER_EDGE} strokeWidth="1.5" />)}
                </g>
            )}
            {[source, target].map((v, index) => measureLines(v).map((text, position) => (
                <text key={`${index}-${position}`} x={index === 0 ? SOURCE_X : TARGET_X} y={POUR_FLOOR + 20 + position * 18} textAnchor="middle" fontSize="15" fontWeight="700" fill={INK}>{text}</text>
            )))}
        </svg>
    )
}

function PourPlay({ round, language, onAnswer, answered }: RoundProps<PourRound>) {
    const l = useGameText(language)
    const [glasses, setGlasses] = useState(0)
    const poured = useCountUp(glasses, answered, 380)
    const right = glasses === round.fills
    const { source, target } = round
    const unit = isRound(target.shape) ? '\\pi' : ''
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Zenbat aldiz hustu behar da ontzi txikia handian, hura betetzeko?', '¿Cuántas veces hay que vaciar el recipiente pequeño en el grande para llenarlo?', 'كم مرة يجب أن نفرغ الوعاء الصغير في الكبير حتى يمتلئ؟', 'How many times must the small container be emptied into the big one to fill it?'))}
                <span className="dbh4-subprompt">{l(say(`Txikia: ${SHAPE_NAMES[source.shape].eu} · Handia: ${SHAPE_NAMES[target.shape].eu}`, `Pequeño: ${SHAPE_NAMES[source.shape].es} · Grande: ${SHAPE_NAMES[target.shape].es}`, `الصغير: ${SHAPE_NAMES[source.shape].ar} · الكبير: ${SHAPE_NAMES[target.shape].ar}`, `Small: ${SHAPE_NAMES[source.shape].en} · Big: ${SHAPE_NAMES[target.shape].en}`))}</span>
            </p>
            <PourScene round={round} poured={poured} answered={answered} />
            {!answered && (
                <div className="dbh4-controls">
                    <Stepper label={l(say('Zenbat aldiz', 'Cuántas veces', 'كم مرة', 'How many times'))} value={glasses} min={0} max={POUR_MAX} format={(value) => `× ${value}`} onChange={setGlasses} language={language} />
                    <button type="button" className="fraction-v2-primary" disabled={glasses === 0} onClick={() => onAnswer(right)}>{l(say('Bota ura', 'Vierte el agua', 'اسكب الماء', 'Pour the water'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(volumeLatex(target), language)}</span>
                    <span className="dbh4-worked">{formula(volumeLatex(source), language)}</span>
                    <span className="dbh4-worked">{formula(`${volumeOf(target)}${unit}\\div ${volumeOf(source)}${unit}=${round.fills}`, language)}</span>
                    {right
                        ? l(say('Goraino bete da.', 'Se llena justo hasta arriba.', 'امتلأ حتى الحافة تمامًا.', 'It fills right to the top.'))
                        : glasses > round.fills
                            ? l(say('Ura gainezka egiten du.', 'El agua se desborda.', 'يفيض الماء.', 'The water spills over.'))
                            : l(say('Ez da bete.', 'No llega a llenarse.', 'لم يمتلئ.', 'It is not full.'))}
                </RoundVerdict>
            )}
        </>
    )
}

export function PourGame({ game, art, ...props }: GameProps & { game: GameInfo; art: ReactNode }) {
    return (
        <RoundGame
            {...props}
            config={{
                game,
                art,
                rounds: POUR_ROUNDS,
                rules: [
                    say('Bi ontziak eskala berean daude marraztuta; neurriak zentimetrotan.', 'Los dos recipientes están dibujados a la misma escala; las medidas, en centímetros.', 'الوعاءان مرسومان بالمقياس نفسه؛ والقياسات بالسنتيمتر.', 'Both containers are drawn to the same scale; the measures are in centimetres.'),
                    say('Kalkulatu bi bolumenak eta zatitu: handia zati txikia.', 'Calcula los dos volúmenes y divide: el grande entre el pequeño.', 'احسب الحجمين واقسم: الكبير على الصغير.', 'Work out both volumes and divide: the big one by the small one.'),
                    say('Konoa eta piramidea: oinarria bider altuera, zati 3. Esfera: $\\frac{4}{3}\\pi r^{3}$.', 'Cono y pirámide: base por altura entre 3. Esfera: $\\frac{4}{3}\\pi r^{3}$.', 'المخروط والهرم: القاعدة في الارتفاع على 3. الكرة: $\\frac{4}{3}\\pi r^{3}$.', 'Cone and pyramid: base times height over 3. Sphere: $\\frac{4}{3}\\pi r^{3}$.')
                ],
                create: createPourRounds,
                stars: standardStars(POUR_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: PourPlay
            }}
        />
    )
}

/* ---------- Tile the floor ---------- */

interface SideLabel { x: number; y: number; anchor: 'start' | 'middle' | 'end'; length: number }

/** A label for each side, the long sides first: outside the floor, inside when that spot is taken, left out when both are (that side follows from the others) */
function sideLabels(outline: ReadonlyArray<readonly [number, number]>, lengths: number[], rectangle: boolean): SideLabel[] {
    const placed: Array<SideLabel & { box: [number, number, number, number] }> = []
    const order = outline.map((_, index) => index).sort((a, b) => lengths[b] - lengths[a])
    for (const index of order) {
        // A rectangle shows only its bottom and left sides
        if (rectangle && index < 2) continue
        const [x, y] = outline[index]
        const [nx, ny] = outline[(index + 1) % outline.length]
        const size = Math.hypot(nx - x, ny - y)
        // Outward normal of an outline drawn clockwise on the screen
        const [ux, uy] = [(ny - y) / size, -(nx - x) / size]
        const horizontal = Math.abs(ny - y) < 1e-9
        const width = 8 + 7 * String(lengths[index]).length + 12
        for (const side of [1, -1]) {
            const cx = (x + nx) / 2 + side * ux * 6
            const cy = (y + ny) / 2 + side * uy * 11 + 4
            const anchor: SideLabel['anchor'] = horizontal ? 'middle' : side * ux > 0 ? 'start' : 'end'
            const left = anchor === 'middle' ? cx - width / 2 : anchor === 'start' ? cx : cx - width
            const box: [number, number, number, number] = [left, cy - 11, left + width, cy + 2]
            if (placed.some(({ box: other }) => box[0] < other[2] && other[0] < box[2] && box[1] < other[3] && other[1] < box[3])) continue
            placed.push({ x: cx, y: cy, anchor, length: lengths[index], box })
            break
        }
    }
    return placed
}

const PLAN = { left: 44, top: 24, width: 232, height: 146 }

function TilesScene({ round, laid, target, answered, language }: { round: TilesRound; laid: number; target: number; answered: boolean; language: UnitLanguage }) {
    const [tw, th] = round.tile
    const k = Math.min(PLAN.width / (round.columns * tw), PLAN.height / (round.rows * th))
    const ox = PLAN.left + (PLAN.width - round.columns * tw * k) / 2
    const point = ([x, y]: [number, number]) => [ox + x * tw * k, PLAN.top + y * th * k] as const
    const outline = round.outline.map(point)
    const polygon = outline.map(([x, y]) => `${x},${y}`).join(' ')
    const cells = floorCells(round)
    const lengths = sideLengths(round)
    // Once every tile of the answer is down, the bare floor shows and the tiles left over are counted
    const finished = answered && laid >= target
    const extra = Math.max(0, target - cells.length)
    // As tall as the plan and its labels
    const height = Math.ceil(PLAN.top + round.rows * th * k + 30)
    return (
        <svg className="dbh4-scene" viewBox={`0 0 320 ${height}`} direction="ltr" aria-hidden="true">
            <polygon points={polygon} fill="var(--paper-deep, #ece6da)" />
            {answered && cells.map(([column, row], index) => {
                const [x, y] = point([column, row])
                if (index < laid) return <rect key={index} x={x + 0.8} y={y + 0.8} width={tw * k - 1.6} height={th * k - 1.6} rx="1" fill="var(--mustard-tint, #fbebc0)" stroke="#b08a2e" strokeWidth="0.8" />
                if (finished) return <rect key={index} x={x + 1.5} y={y + 1.5} width={tw * k - 3} height={th * k - 3} fill="none" stroke={RED} strokeWidth="1" strokeDasharray="3 2" />
                return null
            })}
            <polygon points={polygon} fill="none" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" />
            {sideLabels(outline, lengths, round.kind === 'rectangle').map((label, index) => <text key={index} x={label.x} y={label.y} textAnchor={label.anchor} fontSize="12" fontWeight="700" fill={INK}>{`${plainNumber(label.length, language)} m`}</text>)}
            {finished && extra > 0 && <text x="310" y={height - 8} textAnchor="end" fontSize="15" fontWeight="700" fill={RED}>{`+${extra}`}</text>}
        </svg>
    )
}

function TilesPlay({ round, language, onAnswer, answered }: RoundProps<TilesRound>) {
    const l = useGameText(language)
    const [tiles, setTiles] = useState(0)
    const laid = useCountUp(tiles, answered, 50, Math.max(1, Math.ceil(round.count / 24)))
    const right = tiles === round.count
    const set = (value: number) => !answered && setTiles(Math.min(round.max, Math.max(0, Math.round(value))))
    const area = floorArea(round)
    const tile = tileArea(round)
    const short = round.count - tiles
    return (
        <>
            <p className="prop3-prompt">
                {l(say('Zenbat lauza behar dira lurzoru osoa estaltzeko?', '¿Cuántas baldosas hacen falta para cubrir todo el suelo?', 'كم بلاطة نحتاج لتغطية الأرضية كلها؟', 'How many tiles are needed to cover the whole floor?'))}
                <span className="dbh4-subprompt">{l(say(`Lauza bakoitza: ${round.tile[0]} cm × ${round.tile[1]} cm`, `Cada baldosa: ${round.tile[0]} cm × ${round.tile[1]} cm`, `كل بلاطة: ${round.tile[0]} cm × ${round.tile[1]} cm`, `Each tile: ${round.tile[0]} cm × ${round.tile[1]} cm`))}</span>
            </p>
            <TilesScene round={round} laid={laid} target={tiles} answered={answered} language={language} />
            {!answered && (
                <div className="dbh4-controls">
                    <input type="range" min={0} max={round.max} step={1} value={tiles} onChange={(event) => set(Number(event.target.value))} aria-label={l(say('Lauzak', 'Baldosas', 'البلاطات', 'Tiles'))} />
                    <Stepper label={l(say('Lauzak', 'Baldosas', 'البلاطات', 'Tiles'))} value={tiles} min={0} max={round.max} onChange={set} language={language} />
                    <button type="button" className="fraction-v2-primary" disabled={tiles === 0} onClick={() => onAnswer(right)}>{l(say('Jarri lauzak', 'Coloca las baldosas', 'ضع البلاطات', 'Lay the tiles'))}</button>
                </div>
            )}
            {answered && (
                <RoundVerdict right={right} language={language}>
                    <span className="dbh4-worked">{formula(`A=${tex(area)}\\ \\text{m}^{2},\\ a=${fine(round.tile[0] / 100)}\\cdot ${fine(round.tile[1] / 100)}=${fine(tile)}\\ \\text{m}^{2}`, language)}</span>
                    <span className="dbh4-worked">{formula(`${tex(area)}\\div ${fine(tile)}=${round.count}`, language)}</span>
                    {right
                        ? l(say('Lurzorua zehatz-mehatz estali da.', 'El suelo queda cubierto justo.', 'غُطّيت الأرضية تمامًا.', 'The floor is covered exactly.'))
                        : short > 0
                            ? l(say(`${short} lauza falta dira.`, `Faltan ${short} baldosas.`, `تنقص ${short} بلاطة.`, `${short} tiles are missing.`))
                            : l(say(`${-short} lauza soberan daude.`, `Sobran ${-short} baldosas.`, `تزيد ${-short} بلاطة.`, `${-short} tiles are left over.`))}
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
                    say('Planoak lurzoruaren aldeak ditu metrotan; lauza zentimetrotan dago.', 'El plano da los lados del suelo en metros; la baldosa, en centímetros.', 'المخطط يعطي أضلاع الأرضية بالأمتار، والبلاطة بالسنتيمترات.', 'The plan gives the sides of the floor in metres; the tile is in centimetres.'),
                    say('Kalkulatu lurzoruaren azalera eta zatitu lauzaren azaleraz, unitate berean.', 'Calcula el área del suelo y divide entre el área de la baldosa, en la misma unidad.', 'احسب مساحة الأرضية واقسمها على مساحة البلاطة بالوحدة نفسها.', 'Work out the area of the floor and divide by the area of a tile, in the same unit.'),
                    say('L, U edo T formako lurzoruak: zatitu laukizuzenetan.', 'Suelos en L, U o T: pártelos en rectángulos.', 'الأرضيات على شكل L أو U أو T: قسّمها إلى مستطيلات.', 'L-, U- or T-shaped floors: split them into rectangles.')
                ],
                create: createTilesRounds,
                stars: standardStars(TILES_ROUNDS),
                starsNote: say('3 izar: 5 · 2 izar: 4 · izar 1: 3', '3 estrellas: 5 · 2: 4 · 1: 3', '3 نجوم: 5 · 2: 4 · 1: 3', '3 stars: 5 · 2: 4 · 1: 3'),
                Round: TilesPlay
            }}
        />
    )
}

/** The art of the volume games */
export function VolumeArt({ game }: { game: 'pour' | 'tiles' }) {
    if (game === 'pour') {
        return (
            <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
                <path d="M 120 50 L 120 108 A 40 9 0 0 0 200 108 L 200 50" fill="none" stroke="var(--ink)" strokeWidth="3" />
                <path d="M 120 82 L 120 108 A 40 9 0 0 0 200 108 L 200 82 Z" fill={WATER} />
                <ellipse cx="160" cy="82" rx="40" ry="9" fill="#a9cbf2" stroke={WATER_EDGE} strokeWidth="1.5" />
                <ellipse cx="160" cy="50" rx="40" ry="9" fill="none" stroke="var(--ink)" strokeWidth="3" />
                <g transform="rotate(-38 70 40)">
                    <path d="M 44 22 L 70 78 L 96 22 A 26 6 0 0 1 44 22 Z" fill={WATER} stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
                </g>
                <path d="M 108 50 Q 116 62 130 70" fill="none" stroke={WATER_EDGE} strokeWidth="4" strokeLinecap="round" />
                <text x="40" y="112" fontSize="18" fontWeight="700" fill="var(--ink)" direction="ltr">× ?</text>
            </svg>
        )
    }
    return (
        <svg className="fraction-v2-game-art" viewBox="0 0 220 120" aria-hidden="true">
            <polygon points="30,14 130,14 130,54 190,54 190,106 30,106" fill="var(--paper-deep)" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" />
            {Array.from({ length: 4 }, (_, row) => Array.from({ length: 8 }, (_, column) => {
                const [x, y] = [30 + column * 20, 14 + row * 23]
                if (x >= 130 && y < 54) return null
                if (row * 8 + column > 22) return null
                return <rect key={`${row}-${column}`} x={x + 1.5} y={y + 1.5} width="17" height="20" rx="2" fill="var(--mustard-tint, #fbebc0)" stroke="#b08a2e" strokeWidth="1.2" />
            }))}
        </svg>
    )
}
