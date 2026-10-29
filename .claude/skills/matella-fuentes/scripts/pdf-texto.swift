// Extrae el texto de un PDF página a página con PDFKit y dice si la capa de texto sirve.
//   swiftc -O pdf-texto.swift -o /ruta/pdf-texto
//   /ruta/pdf-texto <entrada.pdf> [salida.txt] [--paginas 3-9]
// Cada página empieza con «=== página N ===». El resumen sale por stderr. Si una página no tiene texto o
// el texto está roto (muchos símbolos raros), hay que renderizarla (pdf-paginas.swift) y leerla como imagen.
import Foundation
import PDFKit

var args = Array(CommandLine.arguments.dropFirst())
var range: ClosedRange<Int>? = nil
if let i = args.firstIndex(of: "--paginas"), i + 1 < args.count {
    let p = args[i + 1].split(separator: "-").compactMap { Int($0) }
    if let a = p.first { range = a...(p.count > 1 ? p[1] : a) }
    args.removeSubrange(i...(i + 1))
}
guard let input = args.first, let doc = PDFDocument(url: URL(fileURLWithPath: input)) else {
    FileHandle.standardError.write("Uso: pdf-texto <entrada.pdf> [salida.txt] [--paginas 3-9]\n".data(using: .utf8)!)
    exit(1)
}
var out = ""
var sinTexto: [Int] = [], roto: [Int] = []
let total = doc.pageCount
let pages = range.map { max(1, $0.lowerBound)...min(total, $0.upperBound) } ?? 1...max(1, total)
for n in pages {
    let t = doc.page(at: n - 1)?.string ?? ""
    let compact = t.filter { !$0.isWhitespace }
    if compact.count < 40 { sinTexto.append(n) }
    else {
        // texto roto: pocas letras/cifras sobre el total, o caracteres de sustitución
        let good = compact.filter { $0.isLetter || $0.isNumber || ".,;:()-+=%/".contains($0) }.count
        if Double(good) / Double(compact.count) < 0.75 || compact.contains("\u{FFFD}") { roto.append(n) }
    }
    out += "=== página \(n) ===\n\(t)\n"
}
if args.count > 1 { try? out.write(toFile: args[1], atomically: true, encoding: .utf8) } else { print(out) }
func list(_ a: [Int]) -> String { a.isEmpty ? "ninguna" : a.map(String.init).joined(separator: ", ") }
let msg = "\(total) páginas en el PDF; leídas \(pages.lowerBound)–\(pages.upperBound).\nSin texto (escaneadas): \(list(sinTexto))\nTexto roto: \(list(roto))\n" +
    ((sinTexto.isEmpty && roto.isEmpty) ? "La capa de texto sirve.\n" : "Renderiza esas páginas con pdf-paginas.swift y léelas como imagen.\n")
FileHandle.standardError.write(msg.data(using: .utf8)!)
