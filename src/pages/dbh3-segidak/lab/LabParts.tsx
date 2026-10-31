import type { ReactNode } from 'react'
import { MathText } from '../../../components/MathText'
import type { LocalizedText, UnitLanguage } from '../../../features/unit-v2/types'
import { PredictionStep } from '../../dbh2-zatikiak-prototype/lab/PredictionStep'
import { MUTED, say } from './labStyle'
import type { Prediction } from './prediction'

/* ==========================================================================
   The pieces every 3. DBH lab tool is built from, after Zatikiak 2. DBH and
   Proportzionaltasuna 4. DBH aplikatuak: a 360-wide board that can be read
   on a phone, the worked result (one formula per line so that none
   overflows), the prediction that comes before the result, and the ▶
   button. Colours come from the stage of the tool.
   ========================================================================== */

export function Board({ height, label, children }: { height: number; label: string; children: ReactNode }) {
    return (
        <svg viewBox={`0 0 360 ${height}`} direction="ltr" role="img" aria-label={label} style={{ display: 'block', width: '100%', maxWidth: 520, height: 'auto', margin: '0 auto', fontFamily: '"Atkinson Hyperlegible", "Noto Sans Arabic", system-ui, sans-serif' }}>
            {children}
        </svg>
    )
}

/** The worked result, one line per formula, and a note */
export function Readout({ latex, note }: { latex: string | string[]; note: string }) {
    return (
        <>
            {(Array.isArray(latex) ? latex : [latex]).map((line) => <span key={line} className="fraction-v2-lab-readout-main"><MathText text={`$${line}$`} /></span>)}
            <span className="fraction-v2-lab-readout-note"><MathText text={note} /></span>
        </>
    )
}

const seeAfter = say('Iragarri lehenik; gero ikusiko duzu emaitza.', 'Primero predice; después verás el resultado.', 'توقّع أولًا، ثم سترى النتيجة.', 'First predict; then you will see the result.')

export function Predict({ language, question, labels, actual, choice, tip, onChoose, children }: {
    language: UnitLanguage
    question: LocalizedText
    labels: Record<Prediction, LocalizedText>
    actual: Prediction
    choice: Prediction | null
    tip: LocalizedText
    onChoose: (prediction: Prediction) => void
    children: ReactNode
}) {
    return <PredictionStep language={language} question={question} labels={labels} actual={actual} choice={choice} tip={tip} wait={seeAfter} onChoose={onChoose}>{children}</PredictionStep>
}

export function PlayButton({ label, disabled, playing, onPlay }: { label: string; disabled: boolean; playing: boolean; onPlay: () => void }) {
    return (
        <div className="fraction-v2-lab-quick-actions" style={{ width: '100%', maxWidth: 520, margin: '0 auto' }}>
            <button type="button" onClick={onPlay} disabled={disabled || playing}>{`▶ ${label}`}</button>
        </div>
    )
}

/** A big question mark where the result will be drawn */
export const Hidden = ({ x, y, size = 26 }: { x: number; y: number; size?: number }) => <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={700} fill={MUTED} opacity={0.65}>?</text>
