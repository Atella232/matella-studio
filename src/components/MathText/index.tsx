import { useMemo } from 'react'
import katex from 'katex'
import 'katex/dist/katex.min.css'
import './MathText.css'

type RenderPiece =
    | { type: 'text'; key: string; value: string }
    | { type: 'math'; key: string; html: string; display: boolean }

interface MathTextProps {
    text: string
    className?: string
    inline?: boolean
}

function parseMath(text: string): Array<{ type: 'text' | 'math'; value: string }> {
    const pieces: Array<{ type: 'text' | 'math'; value: string }> = []
    const pattern = /\$\$([\s\S]+?)\$\$/g
    let lastIndex = 0

    for (const match of text.matchAll(pattern)) {
        const index = match.index ?? 0
        if (index > lastIndex) {
            pieces.push({ type: 'text', value: text.slice(lastIndex, index) })
        }
        pieces.push({ type: 'math', value: (match[1] ?? '').trim() })
        lastIndex = index + match[0].length
    }

    if (lastIndex < text.length) {
        pieces.push({ type: 'text', value: text.slice(lastIndex) })
    }

    if (pieces.length === 0) {
        pieces.push({ type: 'text', value: text })
    }

    return pieces
}

function renderMath(latex: string, display: boolean): string {
    const withOperators = latex
        .replace(/->/g, '\\to ')
        .replace(/<=/g, '\\le ')
        .replace(/>=/g, '\\ge ')
        .replace(/(^|[^\\])\*/g, '$1\\cdot ')
        .replace(/(^|[^\\]):/g, '$1\\div ')

    const withRecoveredCommands = withOperators
        .replace(/(^|[^\\])cdot(?=[^a-zA-Z]|$)/g, '$1\\cdot ')
        .replace(/(^|[^\\])times(?=[^a-zA-Z]|$)/g, '$1\\times ')
        .replace(/(^|[^\\])div(?=[^a-zA-Z]|$)/g, '$1\\div ')
        .replace(/(^|[^\\])to(?=[^a-zA-Z]|$)/g, '$1\\to ')
        .replace(/(^|[^\\])quadtext\{/g, '$1\\quad \\text{')
        .replace(/(^|[^\\])quad(?=[^a-zA-Z]|$)/g, '$1\\quad ')
        .replace(/(^|[^\\])text\{/g, '$1\\text{')
        .replace(/([0-9a-zA-Z)\]}])\s*le\s*([0-9a-zA-Z({\[])/g, '$1\\le $2')
        .replace(/([0-9a-zA-Z)\]}])\s*ge\s*([0-9a-zA-Z({\[])/g, '$1\\ge $2')

    const normalized = withRecoveredCommands.replace(/\s{2,}/g, ' ').trim()

    return katex.renderToString(normalized, {
        throwOnError: false,
        strict: 'ignore',
        displayMode: display,
        trust: false
    })
}

export function MathText({ text, className, inline = false }: MathTextProps) {
    const content = useMemo<RenderPiece[]>(() => {
        const parsed = parseMath(text)
        const onlyMath = parsed.length === 1 && parsed[0].type === 'math' && !inline

        return parsed.map((piece, index) => {
            const key = `${piece.type}-${index}`
            if (piece.type === 'text') return { type: 'text', key, value: piece.value }
            return {
                type: 'math',
                key,
                html: renderMath(piece.value, onlyMath),
                display: onlyMath
            }
        })
    }, [text, inline])

    return (
        <span className={['math-text', className].filter(Boolean).join(' ')}>
            {content.map((piece) =>
                piece.type === 'text' ? (
                    <span key={piece.key}>{piece.value}</span>
                ) : (
                    <span
                        key={piece.key}
                        className={`math-token ${piece.display ? 'display' : 'inline'}`}
                        dangerouslySetInnerHTML={{ __html: piece.html }}
                    />
                )
            )}
        </span>
    )
}
