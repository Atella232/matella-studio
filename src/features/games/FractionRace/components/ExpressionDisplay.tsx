import type { ExpressionNode } from '../types'
import { FractionDisplay } from './FractionDisplay'

export function ExpressionDisplay({ node }: { node: ExpressionNode }) {
    if (node.type === 'fraction') {
        return <FractionDisplay fraction={node.value} />
    }

    if (node.type === 'operation') {
        const isPower = node.operator === '^'

        let content
        if (isPower && node.right.type === 'number') {
            content = (
                <>
                    <ExpressionDisplay node={node.left} />
                    <sup className="question-exponent">{node.right.value}</sup>
                </>
            )
        } else {
            content = (
                <>
                    <ExpressionDisplay node={node.left} />
                    <span className="operator" style={{ margin: '0 0.5rem' }}>{node.operator}</span>
                    <ExpressionDisplay node={node.right} />
                </>
            )
        }

        if (node.wrapped) {
            return (
                <span className="expression-wrapper" style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <span className="paren">(</span>
                    {content}
                    <span className="paren">)</span>
                </span>
            )
        }
        return <span className="expression-wrapper" style={{ display: 'inline-flex', alignItems: 'center' }}>{content}</span>
    }

    return null
}
