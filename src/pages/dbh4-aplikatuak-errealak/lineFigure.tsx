import type { UnitLanguage } from '../../features/unit-v2/types'
import { LineInterval, LinePoint, RealAxis } from './realLine'
import { lineMap, type LineSpec } from './realLineMap'

/* Zenbaki errealak (4. DBH) — the real line an exercise refers to, drawn from its LineSpec. */

const colors = { stage: 'var(--stage, #2f6fdb)', second: 'var(--second, #c4432a)', green: 'var(--success, #267b53)' }

export function LineSpecFigure({ spec, language }: { spec: LineSpec; language: UnitLanguage }) {
    const lifts = (spec.intervals ?? []).map((item) => item.lift ?? 0)
    const top = 40 + Math.max(0, ...lifts)
    const map = lineMap(spec.from, spec.to, 40, 520, top)
    return (
        <svg viewBox={`0 0 560 ${top + 50}`} role="img" aria-label={language === 'eu' ? 'Zuzen erreala' : language === 'es' ? 'Recta real' : 'المستقيم الحقيقي'} className="reals-line">
            <RealAxis map={map} step={spec.step ?? 1} labelEvery={spec.labelEvery ?? 1} arabic={language === 'ar'} />
            {spec.intervals?.map((item, index) => <LineInterval key={index} map={map} value={item.value} color={colors[item.color ?? 'stage']} lift={item.lift} />)}
            {spec.points?.map((point, index) => <LinePoint key={index} map={map} value={point.value} name={point.name} />)}
        </svg>
    )
}
