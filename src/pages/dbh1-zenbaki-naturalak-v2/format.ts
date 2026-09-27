/** Groups of three digits with a point, as written in class (15.728) */
export function formatNatural(value: number): string {
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}
