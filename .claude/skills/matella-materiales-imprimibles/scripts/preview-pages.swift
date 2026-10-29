// PDF → una imagen por página + hojas de contacto, para revisar cortes de página.
//   swiftc -O preview-pages.swift -o /ruta/preview && /ruta/preview <entrada.pdf> <carpeta-salida>
// Salida: page-01.png … (ancho 900 px) y sheet-1.png … (8 páginas por hoja, 4 columnas).
import AppKit
import PDFKit

let args = CommandLine.arguments
guard args.count >= 3, let doc = PDFDocument(url: URL(fileURLWithPath: args[1])) else {
    print("Uso: preview <entrada.pdf> <carpeta-salida>"); exit(1)
}
let out = URL(fileURLWithPath: args[2], isDirectory: true)
try FileManager.default.createDirectory(at: out, withIntermediateDirectories: true)

func render(_ page: PDFPage, width: CGFloat) -> NSImage {
    let b = page.bounds(for: .mediaBox)
    let size = NSSize(width: width, height: width * b.height / b.width)
    let img = NSImage(size: size)
    img.lockFocus()
    NSColor.white.setFill(); NSRect(origin: .zero, size: size).fill()
    let ctx = NSGraphicsContext.current!.cgContext
    ctx.scaleBy(x: size.width / b.width, y: size.height / b.height)
    page.draw(with: .mediaBox, to: ctx)
    img.unlockFocus()
    return img
}
func png(_ img: NSImage, _ url: URL) {
    guard let t = img.tiffRepresentation, let r = NSBitmapImageRep(data: t),
          let d = r.representation(using: .png, properties: [:]) else { return }
    try? d.write(to: url)
}

var thumbs: [NSImage] = []
for i in 0..<doc.pageCount {
    guard let p = doc.page(at: i) else { continue }
    png(render(p, width: 900), out.appendingPathComponent(String(format: "page-%02d.png", i + 1)))
    thumbs.append(render(p, width: 360))
}
let cols = 4, perSheet = 8, pad: CGFloat = 12
var s = 0
while s * perSheet < thumbs.count {
    let chunk = Array(thumbs[(s * perSheet)..<min(thumbs.count, (s + 1) * perSheet)])
    let tw = chunk[0].size.width, th = chunk[0].size.height
    let rows = (chunk.count + cols - 1) / cols
    let size = NSSize(width: CGFloat(cols) * (tw + pad) + pad, height: CGFloat(rows) * (th + pad) + pad)
    let sheet = NSImage(size: size)
    sheet.lockFocus()
    NSColor(white: 0.55, alpha: 1).setFill(); NSRect(origin: .zero, size: size).fill()
    for (k, im) in chunk.enumerated() {
        let x = pad + CGFloat(k % cols) * (tw + pad)
        let y = size.height - pad - th - CGFloat(k / cols) * (th + pad)
        im.draw(in: NSRect(x: x, y: y, width: tw, height: th))
    }
    sheet.unlockFocus()
    png(sheet, out.appendingPathComponent("sheet-\(s + 1).png"))
    s += 1
}
print("\(doc.pageCount) páginas → \(out.path)")
