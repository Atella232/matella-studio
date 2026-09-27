/** Integers are written with an explicit sign, as in the textbook: −3, 0, +4 */
export function signed(value: number, plus = true): string {
    if (value < 0) return `−${Math.abs(value)}`
    if (value > 0 && plus) return `+${value}`
    return String(value)
}
