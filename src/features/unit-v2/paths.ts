/** Units rendered by the V2 engine: they draw their own header and hide the site's */
export const unitV2Paths = ['/matematika/dbh1/zenbaki-naturalak', '/matematika/dbh1/numeros-enteros', '/matematika/dbh1/divisibilidad', '/matematika/dbh1/zatikiak', '/matematika/dbh1/algebra', '/matematika/dbh1/geometria', '/matematika/dbh1/estadistica', '/matematika/dbh2/zatikiak', '/matematika/dbh2/numeros-enteros', '/matematika/dbh2/divisibilidad', '/matematika/dbh2/algebra', '/matematika/dbh2/ekuazioak', '/matematika/dbh2/funciones', '/matematika/dbh4-aplikatuak/numeros-reales']

export function isUnitV2Path(pathname: string): boolean {
    return unitV2Paths.some((path) => pathname === path || pathname.startsWith(`${path}/`))
}
