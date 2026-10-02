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
    name: '1º ESO',
    nameEu: 'DBH 1',
    nameAr: 'السنة الأولى',
    description: 'Fundamentos matemáticos',
    descriptionEu: 'Oinarrizko matematikak',
    descriptionAr: 'أساسيات الرياضيات',
    color: '#2f6fdb',
    topics: [
      { id: 'zenbaki-naturalak', name: 'Números Naturales', nameEu: 'Zenbaki Naturalak', nameAr: 'الأعداد الطبيعية', icon: '🔢', active: true },
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'القابلية للقسمة', icon: '➗', active: true },
      { id: 'numeros-enteros', name: 'Números Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'الأعداد الصحيحة', icon: '±', active: true },
      { id: 'zatikiak', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'الكسور', icon: '½', active: true },
      { id: 'numeros-decimales', name: 'Números Decimales', nameEu: 'Zenbaki Hamartarrak', nameAr: 'الأعداد العشرية', icon: '🔣' },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'التناسب', icon: '⚖️' },
      { id: 'algebra', name: 'Iniciación al Álgebra', nameEu: 'Aljebraren Hastapenak', nameAr: 'مقدمة في الجبر', icon: '🔤', active: true },
      { id: 'geometria', name: 'Geometría del Plano', nameEu: 'Planoko Geometria', nameAr: 'هندسة المستوى', icon: '📐', active: true },
      { id: 'figuras-planas', name: 'Figuras Planas', nameEu: 'Irudi Lauak', nameAr: 'الأشكال المستوية', icon: '🔷' },
      { id: 'estadistica', name: 'Estadística', nameEu: 'Estatistika', nameAr: 'الإحصاء', icon: '📊', active: true },
    ]
  },
  {
    id: 'dbh2',
    name: '2º ESO',
    nameEu: 'DBH 2',
    nameAr: 'السنة الثانية',
    description: 'Consolidación y álgebra',
    descriptionEu: 'Sendotzea eta aljebra',
    descriptionAr: 'التوحيد والجبر',
    color: '#7a55d6',
    topics: [
      { id: 'numeros-enteros', name: 'Números Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'الأعداد الصحيحة', icon: '±', active: true },
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'القابلية للقسمة', icon: '➗', active: true },
      { id: 'zatikiak', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'الكسور', icon: '½', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad y Porcentajes', nameEu: 'Proportzionaltasuna eta Ehunekoak', nameAr: 'التناسب والنسب المئوية', icon: '📈' },
      { id: 'algebra', name: 'Álgebra', nameEu: 'Aljebra', nameAr: 'الجبر', icon: '🔤', active: true },
      { id: 'ekuazioak', name: 'Ecuaciones', nameEu: 'Ekuazioak', nameAr: 'المعادلات', icon: '⚖️', active: true },
      { id: 'teorema-pitagoras', name: 'Teorema de Pitágoras', nameEu: 'Pitagorasen Teorema', nameAr: 'نظرية فيثاغورس', icon: '📐' },
      { id: 'cuerpos-geometricos', name: 'Cuerpos Geométricos', nameEu: 'Gorputz Geometrikoak', nameAr: 'الأجسام الهندسية', icon: '🔲' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', icon: '📈', active: true },
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', icon: '📊' },
    ]
  },
  {
    id: 'dbh3',
    name: '3º ESO',
    nameEu: 'DBH 3',
    nameAr: 'السنة الثالثة',
    description: 'Álgebra y funciones',
    descriptionEu: 'Aljebra eta funtzioak',
    descriptionAr: 'الجبر والدوال',
    color: '#e0a100',
    topics: [
      { id: 'numeros-racionales', name: 'Números Racionales', nameEu: 'Zenbaki Arrazionalak', nameAr: 'الأعداد النسبية', icon: '🔢', active: true },
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', icon: '∞' },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'التناسب', icon: '⚖️' },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'متعددات الحدود', icon: '🔤' },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'المعادلات والأنظمة', icon: '📝' },
      { id: 'geometria-plana', name: 'Geometría del Plano', nameEu: 'Planoko Geometria', nameAr: 'هندسة المستوى', icon: '📐' },
      { id: 'movimientos-plano', name: 'Movimientos en el Plano', nameEu: 'Planoko Mugimenduak', nameAr: 'الحركات في المستوى', icon: '🔄' },
      { id: 'funciones-lineales', name: 'Funciones Lineales', nameEu: 'Funtzio Linealak', nameAr: 'الدوال الخطية', icon: '📈' },
      { id: 'sucesiones', name: 'Sucesiones', nameEu: 'Segidak', nameAr: 'المتتاليات', icon: '🔢' },
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', icon: '📊' },
    ]
  },
  {
    id: 'dbh4-aplikatuak',
    name: '4º ESO · Aplicadas',
    nameEu: 'DBH 4 · Aplikatuak',
    nameAr: 'السنة الرابعة · التطبيقية',
    description: 'Matemáticas orientadas a las enseñanzas aplicadas',
    descriptionEu: 'Irakaskuntza aplikatuetara bideratutako matematika',
    descriptionAr: 'رياضيات موجّهة نحو التعليم التطبيقي',
    color: '#d9502e',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', icon: '∞', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'التناسب', icon: '⚖️' },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'متعددات الحدود', icon: '🔤' },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'المعادلات والأنظمة', icon: '📝' },
      { id: 'areas-volumenes', name: 'Perímetros, Áreas y Volúmenes', nameEu: 'Perimetroak, Azalerak eta Bolumenak', nameAr: 'المحيطات والمساحات والأحجام', icon: '📦' },
      { id: 'semejanza', name: 'Semejanza', nameEu: 'Antzekotasuna', nameAr: 'التشابه', icon: '📐' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', icon: '📈' },
      { id: 'grafica-funcion', name: 'Gráfica de una Función', nameEu: 'Funtzio baten Grafikoa', nameAr: 'التمثيل البياني للدالة', icon: '〰️' },
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', icon: '📊' },
    ]
  },
  {
    id: 'dbh4-akademikoak',
    name: '4º ESO · Académicas',
    nameEu: 'DBH 4 · Akademikoak',
    nameAr: 'السنة الرابعة · الأكاديمية',
    description: 'Matemáticas orientadas a las enseñanzas académicas',
    descriptionEu: 'Irakaskuntza akademikoetara bideratutako matematika',
    descriptionAr: 'رياضيات موجّهة نحو التعليم الأكاديمي',
    color: '#b23a6f',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales y Porcentajes', nameEu: 'Zenbaki Errealak eta Ehunekoak', nameAr: 'الأعداد الحقيقية والنسب المئوية', icon: '∞', active: true },
      { id: 'potencias-radicales', name: 'Potencias, Radicales y Logaritmos', nameEu: 'Berreturak, Erroak eta Logaritmoak', nameAr: 'القوى والجذور واللوغاريتمات', icon: '√' },
      { id: 'polinomios-fracciones', name: 'Polinomios y Fracciones Algebraicas', nameEu: 'Polinomioak eta Zatiki Aljebraikoak', nameAr: 'متعددات الحدود والكسور الجبرية', icon: '🔤' },
      { id: 'ecuaciones-inecuaciones', name: 'Ecuaciones e Inecuaciones', nameEu: 'Ekuazioak eta Inekuazioak', nameAr: 'المعادلات والمتراجحات', icon: '⚖️' },
      { id: 'sistemas', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'أنظمة المعادلات', icon: '📝' },
      { id: 'areas-volumenes-semejanza', name: 'Áreas, Volúmenes y Semejanza', nameEu: 'Azalerak, Bolumenak eta Antzekotasuna', nameAr: 'المساحات والأحجام والتشابه', icon: '📦' },
      { id: 'trigonometria', name: 'Trigonometría', nameEu: 'Trigonometria', nameAr: 'حساب المثلثات', icon: '📏' },
      { id: 'vectores-rectas', name: 'Vectores y Rectas', nameEu: 'Bektoreak eta Zuzenak', nameAr: 'المتجهات والمستقيمات', icon: '➡️' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', icon: '📈' },
      { id: 'funciones-polinomicas-racionales', name: 'Funciones Polinómicas y Racionales', nameEu: 'Funtzio Polinomikoak eta Arrazionalak', nameAr: 'الدوال كثيرة الحدود والنسبية', icon: '〰️' },
      { id: 'funciones-exponenciales', name: 'Funciones Exponenciales, Logarítmicas y Trigonométricas', nameEu: 'Funtzio Esponentzialak, Logaritmikoak eta Trigonometrikoak', nameAr: 'الدوال الأسية واللوغاريتمية والمثلثية', icon: '📈' },
      { id: 'estadistica', name: 'Estadística', nameEu: 'Estatistika', nameAr: 'الإحصاء', icon: '📊' },
      { id: 'combinatoria', name: 'Combinatoria', nameEu: 'Konbinatoria', nameAr: 'التوافيق', icon: '🔢' },
      { id: 'probabilidad', name: 'Probabilidad', nameEu: 'Probabilitatea', nameAr: 'الاحتمالات', icon: '🎲' },
    ]
  },
  {
    id: 'batx1',
    name: '1º Bachillerato',
    nameEu: 'Batxilergoa 1',
    nameAr: 'البكالوريا الأولى',
    description: 'Análisis y geometría avanzada',
    descriptionEu: 'Analisia eta geometria aurreratua',
    descriptionAr: 'التحليل والهندسة المتقدمة',
    color: '#267b53',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', icon: '∞' },
      { id: 'potencias-logaritmos', name: 'Potencias y Logaritmos', nameEu: 'Potentziak eta Logaritmoak', nameAr: 'القوى واللوغاريتمات', icon: '📐' },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'متعددات الحدود', icon: '🔤' },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'المعادلات والأنظمة', icon: '⚖️' },
      { id: 'numeros-complejos', name: 'Números Complejos', nameEu: 'Zenbaki Konplexuak', nameAr: 'الأعداد المركبة', icon: '🔢' },
      { id: 'trigonometria', name: 'Trigonometría', nameEu: 'Trigonometria', nameAr: 'حساب المثلثات', icon: '📐' },
      { id: 'vectores-plano', name: 'Vectores en el Plano', nameEu: 'Planoko Bektoreak', nameAr: 'المتجهات في المستوى', icon: '➡️' },
      { id: 'geometria-analitica', name: 'Geometría Analítica', nameEu: 'Geometria Analitikoa', nameAr: 'الهندسة التحليلية', icon: '📐' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', icon: '📈' },
      { id: 'limites-continuidad', name: 'Límites y Continuidad', nameEu: 'Mugak eta Jarraitutasuna', nameAr: 'النهايات والاتصال', icon: '∞' },
    ]
  },
  {
    id: 'batx2',
    name: '2º Bachillerato',
    nameEu: 'Batxilergoa 2',
    nameAr: 'البكالوريا الثانية',
    description: 'Cálculo y álgebra lineal',
    descriptionEu: 'Kalkulua eta aljebra lineala',
    descriptionAr: 'التفاضل والتكامل والجبر الخطي',
    color: '#c4432a',
    topics: [
      { id: 'matrices', name: 'Matrices', nameEu: 'Matrizeak', nameAr: 'المصفوفات', icon: '🔲' },
      { id: 'determinantes', name: 'Determinantes', nameEu: 'Determinanteak', nameAr: 'المحددات', icon: '📐' },
      { id: 'sistemas-ecuaciones', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'أنظمة المعادلات', icon: '⚖️' },
      { id: 'vectores-espacio', name: 'Vectores en el Espacio', nameEu: 'Espazioko Bektoreak', nameAr: 'المتجهات في الفضاء', icon: '➡️' },
      { id: 'geometria-espacio', name: 'Geometría del Espacio', nameEu: 'Espazioko Geometria', nameAr: 'هندسة الفضاء', icon: '🔲' },
      { id: 'limites', name: 'Límites', nameEu: 'Mugak', nameAr: 'النهايات', icon: '∞' },
      { id: 'derivadas', name: 'Derivadas', nameEu: 'Deribatuak', nameAr: 'المشتقات', icon: '📈' },
      { id: 'aplicaciones-derivadas', name: 'Aplicaciones de Derivadas', nameEu: 'Deribatuen Aplikazioak', nameAr: 'تطبيقات المشتقات', icon: '📊' },
      { id: 'integrales', name: 'Integrales', nameEu: 'Integralak', nameAr: 'التكاملات', icon: '∫' },
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
