// Renderiza páginas de un PDF a JPG para leerlas como imagen (libros escaneados o con la capa de texto rota).
//   swiftc -O pdf-paginas.swift -o /ruta/pdf-paginas
//   /ruta/pdf-paginas <entrada.pdf> <carpeta-salida> [--paginas 3-9] [--ancho 1400]
// Escribe pagina-NN.jpg. 1400 px de ancho basta para leer ejercicios; sube a 2000 si hay letra pequeña.
import AppKit
import PDFKit

var args = Array(CommandLine.arguments.dropFirst())
func option(_ name: String) -> String? {
    guard let i = args.firstIndex(of: name), i + 1 < args.count else { return nil }
    let v = args[i + 1]; args.removeSubrange(i...(i + 1)); return v
}
let pagesArg = option("--paginas")
let width = CGFloat(Double(option("--ancho") ?? "1400") ?? 1400)
guard args.count >= 2, let doc = PDFDocument(url: URL(fileURLWithPath: args[0])) else {
    print("Uso: pdf-paginas <entrada.pdf> <carpeta-salida> [--paginas 3-9] [--ancho 1400]"); exit(1)
}
let out = URL(fileURLWithPath: args[1], isDirectory: true)
try FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)
var range = 1...max(1, doc.pageCount)
if let p = pagesArg?.split(separator: "-").compactMap({ Int($0) }), let a = p.first {
    range = max(1, a)...min(doc.pageCount, p.count > 1 ? p[1] : a)
}
for n in range {
    guard let page = doc.page(at: n - 1) else { continue }
    let b = page.bounds(for: .mediaBox)
    let size = NSSize(width: width, height: width * b.height / b.width)
    let img = NSImage(size: size)
    img.lockFocus()
    NSColor.white.setFill(); NSRect(origin: .zero, size: size).fill()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.scaleBy(x: size.width / b.width, y: size.height / b.height)
    page.draw(with: .mediaBox, to: ctx)
    img.unlockFocus()
    guard let t = img.tiffRepresentation, let r = NSBitmapImageRep(data: t),
          let d = r.representation(using: .jpeg, properties: [.compressionFactor: 0.8]) else { continue }
    try d.write(to: out.appendingPathComponent(String(format: "pagina-%02d.jpg", n)))
}
print("páginas \(range.lowerBound)–\(range.upperBound) → \(out.path)")
