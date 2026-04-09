export interface Topic {
  id: string
  name: string
  nameEu: string
  nameAr: string
  icon: string
  active?: boolean
}

export interface Course {
  id: string
  name: string
  nameEu: string
  nameAr: string
  description: string
  descriptionEu: string
  descriptionAr: string
  color: string
  topics: Topic[]
}

export const courses: Course[] = [
  {
    id: 'dbh1',
    name: '1Âº ESO',
    nameEu: 'DBH 1',
    nameAr: 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø£ÙˆÙ„Ù‰',
    description: 'Fundamentos matemÃ¡ticos',
    descriptionEu: 'Oinarrizko matematikak',
    descriptionAr: 'Ø£Ø³Ø§Ø³ÙŠØ§Øª Ø§Ù„Ø±ÙŠØ§Ø¶ÙŠØ§Øª',
    color: '#6366f1',
    topics: [
      { id: 'zenbaki-naturalak', name: 'NÃºmeros Naturales', nameEu: 'Zenbaki Naturalak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø·Ø¨ÙŠØ¹ÙŠØ©', icon: 'ðŸ”¢', active: true },
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'Ø§Ù„Ù‚Ø§Ø¨Ù„ÙŠØ© Ù„Ù„Ù‚Ø³Ù…Ø©', icon: 'âž—', active: true },
      { id: 'numeros-enteros', name: 'NÃºmeros Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„ØµØ­ÙŠØ­Ø©', icon: 'Â±', active: true },
      { id: 'zatikiak', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'Ø§Ù„ÙƒØ³ÙˆØ±', icon: 'Â½', active: true },
      { id: 'numeros-decimales', name: 'NÃºmeros Decimales', nameEu: 'Zenbaki Hamartarrak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø¹Ø´Ø±ÙŠØ©', icon: 'ðŸ”£' },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'Ø§Ù„ØªÙ†Ø§Ø³Ø¨', icon: 'âš–ï¸' },
      { id: 'algebra', name: 'IniciaciÃ³n al Ãlgebra', nameEu: 'Aljebraren Hastapenak', nameAr: 'Ù…Ù‚Ø¯Ù…Ø© ÙÙŠ Ø§Ù„Ø¬Ø¨Ø±', icon: 'ðŸ”¤', active: true },
      { id: 'geometria', name: 'GeometrÃ­a del Plano', nameEu: 'Planoko Geometria', nameAr: 'Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…Ø³ØªÙˆÙ‰', icon: 'ðŸ“', active: true },
      { id: 'figuras-planas', name: 'Figuras Planas', nameEu: 'Irudi Lauak', nameAr: 'Ø§Ù„Ø£Ø´ÙƒØ§Ù„ Ø§Ù„Ù…Ø³ØªÙˆÙŠØ©', icon: 'ðŸ”·' },
      { id: 'estadistica', name: 'EstadÃ­stica', nameEu: 'Estatistika', nameAr: 'Ø§Ù„Ø¥Ø­ØµØ§Ø¡', icon: 'ðŸ“Š', active: true },
    ]
  },
  {
    id: 'dbh2',
    name: '2Âº ESO',
    nameEu: 'DBH 2',
    nameAr: 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø«Ø§Ù†ÙŠØ©',
    description: 'ConsolidaciÃ³n y Ã¡lgebra',
    descriptionEu: 'Sendotzea eta aljebra',
    descriptionAr: 'Ø§Ù„ØªÙˆØ­ÙŠØ¯ ÙˆØ§Ù„Ø¬Ø¨Ø±',
    color: '#06b6d4',
    topics: [
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'Ø§Ù„Ù‚Ø§Ø¨Ù„ÙŠØ© Ù„Ù„Ù‚Ø³Ù…Ø©', icon: 'âž—' },
      { id: 'numeros-enteros', name: 'NÃºmeros Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„ØµØ­ÙŠØ­Ø©', icon: 'Â±' },
      { id: 'zatikiak', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'Ø§Ù„ÙƒØ³ÙˆØ±', icon: 'Â½', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad y Porcentajes', nameEu: 'Proportzionaltasuna eta Ehunekoak', nameAr: 'Ø§Ù„ØªÙ†Ø§Ø³Ø¨ ÙˆØ§Ù„Ù†Ø³Ø¨ Ø§Ù„Ù…Ø¦ÙˆÙŠØ©', icon: 'ðŸ“ˆ' },
      { id: 'algebra', name: 'Álgebra', nameEu: 'Aljebra', nameAr: 'الجبر', icon: '🔤', active: true },
      { id: 'ecuaciones', name: 'Ecuaciones', nameEu: 'Ekuazioak', nameAr: 'Ø§Ù„Ù…Ø¹Ø§Ø¯Ù„Ø§Øª', icon: 'âš–ï¸' },
      { id: 'teorema-pitagoras', name: 'Teorema de PitÃ¡goras', nameEu: 'Pitagorasen Teorema', nameAr: 'Ù†Ø¸Ø±ÙŠØ© ÙÙŠØ«Ø§ØºÙˆØ±Ø³', icon: 'ðŸ“' },
      { id: 'cuerpos-geometricos', name: 'Cuerpos GeomÃ©tricos', nameEu: 'Gorputz Geometrikoak', nameAr: 'Ø§Ù„Ø£Ø¬Ø³Ø§Ù… Ø§Ù„Ù‡Ù†Ø¯Ø³ÙŠØ©', icon: 'ðŸ”²' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'Ø§Ù„Ø¯ÙˆØ§Ù„', icon: 'ðŸ“ˆ' },
      { id: 'estadistica-probabilidad', name: 'EstadÃ­stica y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'Ø§Ù„Ø¥Ø­ØµØ§Ø¡ ÙˆØ§Ù„Ø§Ø­ØªÙ…Ø§Ù„Ø§Øª', icon: 'ðŸ“Š' },
    ]
  },
  {
    id: 'dbh3',
    name: '3Âº ESO',
    nameEu: 'DBH 3',
    nameAr: 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø«Ø§Ù„Ø«Ø©',
    description: 'Ãlgebra y funciones',
    descriptionEu: 'Aljebra eta funtzioak',
    descriptionAr: 'Ø§Ù„Ø¬Ø¨Ø± ÙˆØ§Ù„Ø¯ÙˆØ§Ù„',
    color: '#f472b6',
    topics: [
      { id: 'numeros-racionales', name: 'NÃºmeros Racionales', nameEu: 'Zenbaki Arrazionalak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù†Ø³Ø¨ÙŠØ©', icon: 'ðŸ”¢' },
      { id: 'numeros-reales', name: 'NÃºmeros Reales', nameEu: 'Zenbaki Errealak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ©', icon: 'âˆž' },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'Ø§Ù„ØªÙ†Ø§Ø³Ø¨', icon: 'âš–ï¸' },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'Ù…ØªØ¹Ø¯Ø¯Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯', icon: 'ðŸ”¤' },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'Ø§Ù„Ù…Ø¹Ø§Ø¯Ù„Ø§Øª ÙˆØ§Ù„Ø£Ù†Ø¸Ù…Ø©', icon: 'ðŸ“' },
      { id: 'geometria-plana', name: 'GeometrÃ­a del Plano', nameEu: 'Planoko Geometria', nameAr: 'Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…Ø³ØªÙˆÙ‰', icon: 'ðŸ“' },
      { id: 'movimientos-plano', name: 'Movimientos en el Plano', nameEu: 'Planoko Mugimenduak', nameAr: 'Ø§Ù„Ø­Ø±ÙƒØ§Øª ÙÙŠ Ø§Ù„Ù…Ø³ØªÙˆÙ‰', icon: 'ðŸ”„' },
      { id: 'funciones-lineales', name: 'Funciones Lineales', nameEu: 'Funtzio Linealak', nameAr: 'Ø§Ù„Ø¯ÙˆØ§Ù„ Ø§Ù„Ø®Ø·ÙŠØ©', icon: 'ðŸ“ˆ' },
      { id: 'sucesiones', name: 'Sucesiones', nameEu: 'Segidak', nameAr: 'Ø§Ù„Ù…ØªØªØ§Ù„ÙŠØ§Øª', icon: 'ðŸ”¢' },
      { id: 'estadistica-probabilidad', name: 'EstadÃ­stica y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'Ø§Ù„Ø¥Ø­ØµØ§Ø¡ ÙˆØ§Ù„Ø§Ø­ØªÙ…Ø§Ù„Ø§Øª', icon: 'ðŸ“Š' },
    ]
  },
  {
    id: 'dbh4',
    name: '4Âº ESO',
    nameEu: 'DBH 4',
    nameAr: 'Ø§Ù„Ø³Ù†Ø© Ø§Ù„Ø±Ø§Ø¨Ø¹Ø©',
    description: 'PreparaciÃ³n para Bachillerato',
    descriptionEu: 'Batxilergorako prestaketa',
    descriptionAr: 'Ø§Ù„ØªØ­Ø¶ÙŠØ± Ù„Ù„Ø¨ÙƒØ§Ù„ÙˆØ±ÙŠØ§',
    color: '#8b5cf6',
    topics: [
      { id: 'numeros-reales', name: 'NÃºmeros Reales', nameEu: 'Zenbaki Errealak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ©', icon: 'âˆž' },
      { id: 'polinomios-fracciones', name: 'Polinomios y Fracciones Algebraicas', nameEu: 'Polinomioak eta Zatiki Aljebraikoak', nameAr: 'Ù…ØªØ¹Ø¯Ø¯Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯ ÙˆØ§Ù„ÙƒØ³ÙˆØ± Ø§Ù„Ø¬Ø¨Ø±ÙŠØ©', icon: 'ðŸ”¤' },
      { id: 'ecuaciones-inecuaciones', name: 'Ecuaciones e Inecuaciones', nameEu: 'Ekuazioak eta Inekuazioak', nameAr: 'Ø§Ù„Ù…Ø¹Ø§Ø¯Ù„Ø§Øª ÙˆØ§Ù„Ù…ØªØ±Ø§Ø¬Ø­Ø§Øª', icon: 'âš–ï¸' },
      { id: 'geometria-analitica', name: 'GeometrÃ­a AnalÃ­tica', nameEu: 'Geometria Analitikoa', nameAr: 'Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„ØªØ­Ù„ÙŠÙ„ÙŠØ©', icon: 'ðŸ“' },
      { id: 'semejanza-trigonometria', name: 'Semejanza y TrigonometrÃ­a', nameEu: 'Antzekotasuna eta Trigonometria', nameAr: 'Ø§Ù„ØªØ´Ø§Ø¨Ù‡ ÙˆØ§Ù„Ù…Ø«Ù„Ø«Ø§Øª', icon: 'ðŸ“' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'Ø§Ù„Ø¯ÙˆØ§Ù„', icon: 'ðŸ“ˆ' },
      { id: 'combinatoria', name: 'Combinatoria', nameEu: 'Konbinatoria', nameAr: 'Ø§Ù„ØªÙˆØ§ÙÙŠÙ‚', icon: 'ðŸ”¢' },
      { id: 'estadistica-bidimensional', name: 'EstadÃ­stica Bidimensional', nameEu: 'Estatistika Bidimentsionala', nameAr: 'Ø§Ù„Ø¥Ø­ØµØ§Ø¡ Ø«Ù†Ø§Ø¦ÙŠ Ø§Ù„Ø£Ø¨Ø¹Ø§Ø¯', icon: 'ðŸ“Š' },
      { id: 'probabilidad', name: 'Probabilidad', nameEu: 'Probabilitatea', nameAr: 'Ø§Ù„Ø§Ø­ØªÙ…Ø§Ù„Ø§Øª', icon: 'ðŸŽ²' },
    ]
  },
  {
    id: 'batx1',
    name: '1Âº Bachillerato',
    nameEu: 'Batxilergoa 1',
    nameAr: 'Ø§Ù„Ø¨ÙƒØ§Ù„ÙˆØ±ÙŠØ§ Ø§Ù„Ø£ÙˆÙ„Ù‰',
    description: 'AnÃ¡lisis y geometrÃ­a avanzada',
    descriptionEu: 'Analisia eta geometria aurreratua',
    descriptionAr: 'Ø§Ù„ØªØ­Ù„ÙŠÙ„ ÙˆØ§Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„Ù…ØªÙ‚Ø¯Ù…Ø©',
    color: '#10b981',
    topics: [
      { id: 'numeros-reales', name: 'NÃºmeros Reales', nameEu: 'Zenbaki Errealak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ø­Ù‚ÙŠÙ‚ÙŠØ©', icon: 'âˆž' },
      { id: 'potencias-logaritmos', name: 'Potencias y Logaritmos', nameEu: 'Potentziak eta Logaritmoak', nameAr: 'Ø§Ù„Ù‚ÙˆÙ‰ ÙˆØ§Ù„Ù„ÙˆØºØ§Ø±ÙŠØªÙ…Ø§Øª', icon: 'ðŸ“' },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'Ù…ØªØ¹Ø¯Ø¯Ø§Øª Ø§Ù„Ø­Ø¯ÙˆØ¯', icon: 'ðŸ”¤' },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'Ø§Ù„Ù…Ø¹Ø§Ø¯Ù„Ø§Øª ÙˆØ§Ù„Ø£Ù†Ø¸Ù…Ø©', icon: 'âš–ï¸' },
      { id: 'numeros-complejos', name: 'NÃºmeros Complejos', nameEu: 'Zenbaki Konplexuak', nameAr: 'Ø§Ù„Ø£Ø¹Ø¯Ø§Ø¯ Ø§Ù„Ù…Ø±ÙƒØ¨Ø©', icon: 'ðŸ”¢' },
      { id: 'trigonometria', name: 'TrigonometrÃ­a', nameEu: 'Trigonometria', nameAr: 'Ø­Ø³Ø§Ø¨ Ø§Ù„Ù…Ø«Ù„Ø«Ø§Øª', icon: 'ðŸ“' },
      { id: 'vectores-plano', name: 'Vectores en el Plano', nameEu: 'Planoko Bektoreak', nameAr: 'Ø§Ù„Ù…ØªØ¬Ù‡Ø§Øª ÙÙŠ Ø§Ù„Ù…Ø³ØªÙˆÙ‰', icon: 'âž¡ï¸' },
      { id: 'geometria-analitica', name: 'GeometrÃ­a AnalÃ­tica', nameEu: 'Geometria Analitikoa', nameAr: 'Ø§Ù„Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„ØªØ­Ù„ÙŠÙ„ÙŠØ©', icon: 'ðŸ“' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'Ø§Ù„Ø¯ÙˆØ§Ù„', icon: 'ðŸ“ˆ' },
      { id: 'limites-continuidad', name: 'LÃ­mites y Continuidad', nameEu: 'Mugak eta Jarraitutasuna', nameAr: 'Ø§Ù„Ù†Ù‡Ø§ÙŠØ§Øª ÙˆØ§Ù„Ø§ØªØµØ§Ù„', icon: 'âˆž' },
    ]
  },
  {
    id: 'batx2',
    name: '2Âº Bachillerato',
    nameEu: 'Batxilergoa 2',
    nameAr: 'Ø§Ù„Ø¨ÙƒØ§Ù„ÙˆØ±ÙŠØ§ Ø§Ù„Ø«Ø§Ù†ÙŠØ©',
    description: 'CÃ¡lculo y Ã¡lgebra lineal',
    descriptionEu: 'Kalkulua eta aljebra lineala',
    descriptionAr: 'Ø§Ù„ØªÙØ§Ø¶Ù„ ÙˆØ§Ù„ØªÙƒØ§Ù…Ù„ ÙˆØ§Ù„Ø¬Ø¨Ø± Ø§Ù„Ø®Ø·ÙŠ',
    color: '#f59e0b',
    topics: [
      { id: 'matrices', name: 'Matrices', nameEu: 'Matrizeak', nameAr: 'Ø§Ù„Ù…ØµÙÙˆÙØ§Øª', icon: 'ðŸ”²' },
      { id: 'determinantes', name: 'Determinantes', nameEu: 'Determinanteak', nameAr: 'Ø§Ù„Ù…Ø­Ø¯Ø¯Ø§Øª', icon: 'ðŸ“' },
      { id: 'sistemas-ecuaciones', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'Ø£Ù†Ø¸Ù…Ø© Ø§Ù„Ù…Ø¹Ø§Ø¯Ù„Ø§Øª', icon: 'âš–ï¸' },
      { id: 'vectores-espacio', name: 'Vectores en el Espacio', nameEu: 'Espazioko Bektoreak', nameAr: 'Ø§Ù„Ù…ØªØ¬Ù‡Ø§Øª ÙÙŠ Ø§Ù„ÙØ¶Ø§Ø¡', icon: 'âž¡ï¸' },
      { id: 'geometria-espacio', name: 'GeometrÃ­a del Espacio', nameEu: 'Espazioko Geometria', nameAr: 'Ù‡Ù†Ø¯Ø³Ø© Ø§Ù„ÙØ¶Ø§Ø¡', icon: 'ðŸ”²' },
      { id: 'limites', name: 'LÃ­mites', nameEu: 'Mugak', nameAr: 'Ø§Ù„Ù†Ù‡Ø§ÙŠØ§Øª', icon: 'âˆž' },
      { id: 'derivadas', name: 'Derivadas', nameEu: 'Deribatuak', nameAr: 'Ø§Ù„Ù…Ø´ØªÙ‚Ø§Øª', icon: 'ðŸ“ˆ' },
      { id: 'aplicaciones-derivadas', name: 'Aplicaciones de Derivadas', nameEu: 'Deribatuen Aplikazioak', nameAr: 'ØªØ·Ø¨ÙŠÙ‚Ø§Øª Ø§Ù„Ù…Ø´ØªÙ‚Ø§Øª', icon: 'ðŸ“Š' },
      { id: 'integrales', name: 'Integrales', nameEu: 'Integralak', nameAr: 'Ø§Ù„ØªÙƒØ§Ù…Ù„Ø§Øª', icon: 'âˆ«' },
    ]
  }
]

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id)
}

export function getTopicById(courseId: string, topicId: string): Topic | undefined {
  const course = getCourseById(courseId)
  return course?.topics.find(topic => topic.id === topicId)
}

