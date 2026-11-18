import { pickText, type LocalizedText, type UnitLanguage } from '../../features/unit-v2/types'
import type { HalfPlane } from './lp'
import { integerPoints, optimum, vertices, withSigns } from './lp'
import { RegionPlane } from './RegionPlane'

/* ==========================================================================
   Programazio lineala · Batxilergoa 2 · Gizarte Zientziak — the figures of
   the lessons of this unit: the region of each «Let's solve», with its
   vertices and, where the lesson speaks of it, the objective line through
   the optimum or the whole-number points.
   ========================================================================== */

const say = (eu: string, es: string, ar: string, en: string): LocalizedText => ({ eu, es, en, ar })
const L = (a: number, b: number, c: number, sense: HalfPlane['sense'] = '≤'): HalfPlane => ({ a, b, c, sense })
const NAMES = ['A', 'B', 'C', 'D', 'E']

interface Setup {
    constraints: HalfPlane[]
    size: number
    unit?: number
    objective?: { a: number; b: number; goal: 'max' | 'min' }
    integers?: boolean
    label: LocalizedText
}

const SETUPS: Record<string, Setup> = {
    constraints: { constraints: [L(2, 1, 40), L(1, 0, 5, '≥')], size: 40, unit: 5, label: say('2x + y ≤ 40 eta x ≥ 5 eskualdea', 'La región de 2x + y ≤ 40 y x ≥ 5', 'منطقة 2x + y ≤ 40 وx ≥ 5', 'The region of 2x + y ≤ 40 and x ≥ 5') },
    vertices: { constraints: [L(1, 1, 6), L(1, 2, 8)], size: 8, label: say('x + y ≤ 6 eta x + 2y ≤ 8 eskualdea, lau erpinekin', 'La región de x + y ≤ 6 y x + 2y ≤ 8, con sus cuatro vértices', 'منطقة x + y ≤ 6 وx + 2y ≤ 8 مع رؤوسها الأربعة', 'The region of x + y ≤ 6 and x + 2y ≤ 8, with its four vertices') },
    integers: { constraints: [L(1, 2, 6), L(0, 1, 1, '≥')], size: 7, integers: true, label: say('x + 2y ≤ 6 eta y ≥ 1 eskualdeko 9 puntu osoak', 'Los 9 puntos enteros de la región x + 2y ≤ 6, y ≥ 1', 'النقاط الصحيحة التسع في المنطقة x + 2y ≤ 6 وy ≥ 1', 'The 9 whole points of the region x + 2y ≤ 6, y ≥ 1') },
    level: { constraints: [L(1, 1, 6), L(1, 2, 8)], size: 8, objective: { a: 3, b: 2, goal: 'max' }, label: say('3x + 2y = 18 maila-zuzena eskualdea uzten duen erpinean, (6, 0)', 'La recta de nivel 3x + 2y = 18 en el vértice donde deja la región, (6, 0)', 'مستقيم المستوى 3x + 2y = 18 عند الرأس الذي يغادر فيه المنطقة (6، 0)', 'The level line 3x + 2y = 18 at the vertex where it leaves the region, (6, 0)') },
    vertex: { constraints: [L(1, 1, 5), L(3, 1, 9)], size: 6, objective: { a: 2, b: 1, goal: 'max' }, label: say('Eskualdeko erpinak; F = 2x + y maximoa (2, 3) erpinean da', 'Los vértices de la región; el máximo de F = 2x + y está en (2, 3)', 'رؤوس المنطقة؛ القيمة العظمى لـ F = 2x + y عند (2، 3)', 'The vertices of the region; the maximum of F = 2x + y is at (2, 3)') },
    types: { constraints: [L(1, 1, 5), L(1, 0, 4), L(0, 1, 3)], size: 6, objective: { a: 1, b: 1, goal: 'max' }, label: say('F = x + y zuzena x + y = 5 aldearen gainean: soluzio anitza', 'La recta F = x + y sobre el lado x + y = 5: solución múltiple', 'المستقيم F = x + y على الضلع x + y = 5: حل متعدد', 'The line F = x + y on the side x + y = 5: a multiple solution') },
    profit: { constraints: [L(2, 1, 40), L(1, 2, 50)], size: 40, unit: 5, objective: { a: 30, b: 20, goal: 'max' }, label: say('Mahaien eta aulkien eskualdea; irabazi handiena (10, 20) erpinean', 'La región de mesas y sillas; el beneficio máximo, en (10, 20)', 'منطقة الطاولات والكراسي؛ أكبر ربح عند (10، 20)', 'The region of tables and chairs; the greatest profit, at (10, 20)') },
    cost: { constraints: [L(2, 1, 8, '≥'), L(1, 3, 9, '≥')], size: 10, objective: { a: 3, b: 2, goal: 'min' }, label: say('Gorantz irekitako eskualdea; kostu txikiena (3, 2) erpinean', 'Una región abierta hacia arriba; el coste mínimo, en (3, 2)', 'منطقة مفتوحة إلى الأعلى؛ أقل كلفة عند (3، 2)', 'A region open upwards; the least cost, at (3, 2)') },
    full: { constraints: [L(1, 1, 100), L(1, 3, 180)], size: 100, unit: 10, objective: { a: 2, b: 5, goal: 'max' }, label: say('Etxebizitzen eskualdea; irabazi handiena (60, 40) erpinean', 'La región de las viviendas; el beneficio máximo, en (60, 40)', 'منطقة المساكن؛ أكبر ربح عند (60، 40)', 'The region of the homes; the greatest profit, at (60, 40)') }
}

export function LessonRegion({ setup, language }: { setup: keyof typeof SETUPS; language: UnitLanguage }) {
    const { constraints, size, unit, objective, integers, label } = SETUPS[setup]
    const all = withSigns(constraints)
    const best = objective ? optimum(all, objective, objective.goal) : null
    const points = vertices(all)
    const bestKeys = new Set(best?.at.map((point) => point.join()) ?? [])
    return (
        <RegionPlane
            label={pickText(language, label)}
            constraints={constraints}
            size={size}
            unit={unit}
            vertices={points.map((point, index) => ({ point, name: NAMES[index], best: bestKeys.has(point.join()) }))}
            level={objective && best?.value != null ? { objective, k: best.value } : undefined}
            integers={integers ? integerPoints(all, size) : []}
        />
    )
}
