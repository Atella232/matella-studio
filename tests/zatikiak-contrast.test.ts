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
        ['#f3f7fb', '#07111f'],
        ['#a9b8ca', '#07111f'],
        ['#06111e', '#60a5fa'],
        ['#a7f3d0', '#07111f'],
        ['#fecdd3', '#07111f'],
        ['#fb7185', '#07111f']
    ] as const

    for (const [foreground, background] of pairs) {
        assert.ok(contrast(foreground, background) >= 4.5, `${foreground} on ${background} must meet 4.5:1`)
    }
})
