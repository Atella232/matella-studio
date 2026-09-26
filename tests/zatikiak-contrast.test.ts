import test from 'node:test'
import assert from 'node:assert/strict'

type Rgb = [number, number, number]

function rgb(hex: string): Rgb {
    const value = Number.parseInt(hex.slice(1), 16)
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function luminance(color: Rgb): number {
    const channels = color.map((channel) => {
        const normalized = channel / 255
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2]
}

function contrast(foreground: string, background: string): number {
    const first = luminance(rgb(foreground))
    const second = luminance(rgb(background))
    return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05)
}

test('core color pairs meet WCAG AA contrast', () => {
    const pairs = [
        // Ink and muted text on paper, cards and the lab controls
        ['#1d2733', '#f6f1e7'],
        ['#1d2733', '#fffcf6'],
        ['#58616e', '#f6f1e7'],
        ['#58616e', '#fffcf6'],
        ['#58616e', '#fbf7ee'],
        ['#f6f1e7', '#1d2733'],
        // Stage text on its tint (chips, lesson numbers, path cards)
        ['#1e4a96', '#dde7f7'],
        ['#4a2f9e', '#e8e0f7'],
        ['#6b4e12', '#fbebc0'],
        ['#9a3218', '#f8dcd0'],
        ['#1f6443', '#d6eddf'],
        // Text on solid stage colours (badges and stage buttons)
        ['#ffffff', '#2f6fdb'],
        ['#ffffff', '#7a55d6'],
        ['#1d2733', '#e0a100'],
        ['#ffffff', '#c4432a'],
        ['#ffffff', '#267b53'],
        // Feedback and accents
        ['#8f2c14', '#f8dcd0'],
        ['#17482f', '#d6eddf'],
        ['#7a1c14', '#f9dedc'],
        ['#6b4e12', '#fbebc0']
    ] as const

    for (const [foreground, background] of pairs) {
        assert.ok(contrast(foreground, background) >= 4.5, `${foreground} on ${background} must meet 4.5:1 (got ${contrast(foreground, background).toFixed(2)})`)
    }
})
