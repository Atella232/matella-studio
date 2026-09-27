/** Units rendered by the V2 engine: they draw their own header and hide the site's */
export const unitV2Paths = ['/matematika/dbh1/zenbaki-naturalak', '/matematika/dbh2/zatikiak', '/matematika/dbh2/numeros-enteros', '/matematika/dbh2/divisibilidad']

export function isUnitV2Path(pathname: string): boolean {
    return unitV2Paths.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}
