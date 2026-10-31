export interface Topic {
  id: string
  name: string
  nameEu: string
  nameAr: string
  nameEn: string
  icon: string
  active?: boolean
}

export interface Course {
  id: string
  name: string
  nameEu: string
  nameAr: string
  nameEn: string
  description: string
  descriptionEu: string
  descriptionAr: string
  descriptionEn: string
  color: string
  topics: Topic[]
}

export const courses: Course[] = [
  {
    id: 'dbh1',
    name: '1º ESO',
    nameEu: 'DBH 1',
    nameAr: 'السنة الأولى',
    nameEn: '1st ESO',
    description: 'Fundamentos matemáticos',
    descriptionEu: 'Oinarrizko matematikak',
    descriptionAr: 'أساسيات الرياضيات',
    descriptionEn: 'Mathematical foundations',
    color: '#2f6fdb',
    topics: [
      { id: 'zenbaki-naturalak', name: 'Números Naturales', nameEu: 'Zenbaki Naturalak', nameAr: 'الأعداد الطبيعية', nameEn: 'Natural Numbers', icon: '🔢', active: true },
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'القابلية للقسمة', nameEn: 'Divisibility', icon: '➗', active: true },
      { id: 'numeros-enteros', name: 'Números Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'الأعداد الصحيحة', nameEn: 'Integers', icon: '±', active: true },
      { id: 'zatikiak', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'الكسور', nameEn: 'Fractions', icon: '½', active: true },
      { id: 'numeros-decimales', name: 'Números Decimales', nameEu: 'Zenbaki Hamartarrak', nameAr: 'الأعداد العشرية', nameEn: 'Decimal Numbers', icon: '🔣', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'التناسب', nameEn: 'Proportionality', icon: '⚖️', active: true },
      { id: 'algebra', name: 'Iniciación al Álgebra', nameEu: 'Aljebraren Hastapenak', nameAr: 'مقدمة في الجبر', nameEn: 'Introduction to Algebra', icon: '🔤', active: true },
      { id: 'geometria', name: 'Geometría del Plano', nameEu: 'Planoko Geometria', nameAr: 'هندسة المستوى', nameEn: 'Plane Geometry', icon: '📐', active: true },
      { id: 'figuras-planas', name: 'Figuras Planas', nameEu: 'Irudi Lauak', nameAr: 'الأشكال المستوية', nameEn: 'Plane Figures', icon: '🔷', active: true },
      { id: 'estadistica', name: 'Estadística', nameEu: 'Estatistika', nameAr: 'الإحصاء', nameEn: 'Statistics', icon: '📊', active: true },
    ]
  },
  {
    id: 'dbh2',
    name: '2º ESO',
    nameEu: 'DBH 2',
    nameAr: 'السنة الثانية',
    nameEn: '2nd ESO',
    description: 'Consolidación y álgebra',
    descriptionEu: 'Sendotzea eta aljebra',
    descriptionAr: 'التوحيد والجبر',
    descriptionEn: 'Consolidation and algebra',
    color: '#7a55d6',
    topics: [
      { id: 'numeros-enteros', name: 'Números Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'الأعداد الصحيحة', nameEn: 'Integers', icon: '±', active: true },
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'القابلية للقسمة', nameEn: 'Divisibility', icon: '➗', active: true },
      { id: 'zatikiak', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'الكسور', nameEn: 'Fractions', icon: '½', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad y Porcentajes', nameEu: 'Proportzionaltasuna eta Ehunekoak', nameAr: 'التناسب والنسب المئوية', nameEn: 'Proportionality and Percentages', icon: '📈', active: true },
      { id: 'algebra', name: 'Álgebra', nameEu: 'Aljebra', nameAr: 'الجبر', nameEn: 'Algebra', icon: '🔤', active: true },
      { id: 'ekuazioak', name: 'Ecuaciones', nameEu: 'Ekuazioak', nameAr: 'المعادلات', nameEn: 'Equations', icon: '⚖️', active: true },
      { id: 'teorema-pitagoras', name: 'Teorema de Pitágoras', nameEu: 'Pitagorasen Teorema', nameAr: 'نظرية فيثاغورس', nameEn: 'Pythagoras\' Theorem', icon: '📐', active: true },
      { id: 'cuerpos-geometricos', name: 'Cuerpos Geométricos', nameEu: 'Gorputz Geometrikoak', nameAr: 'الأجسام الهندسية', nameEn: 'Solid Figures', icon: '🔲', active: true },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', nameEn: 'Functions', icon: '📈', active: true },
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', nameEn: 'Statistics and Probability', icon: '📊', active: true },
    ]
  },
  {
    id: 'dbh3',
    name: '3º ESO',
    nameEu: 'DBH 3',
    nameAr: 'السنة الثالثة',
    nameEn: '3rd ESO',
    description: 'Álgebra y funciones',
    descriptionEu: 'Aljebra eta funtzioak',
    descriptionAr: 'الجبر والدوال',
    descriptionEn: 'Algebra and functions',
    color: '#e0a100',
    topics: [
      { id: 'numeros-racionales', name: 'Números Racionales', nameEu: 'Zenbaki Arrazionalak', nameAr: 'الأعداد النسبية', nameEn: 'Rational Numbers', icon: '🔢', active: true },
      { id: 'potencias-raices', name: 'Potencias y Raíces', nameEu: 'Berreturak eta Erroak', nameAr: 'القوى والجذور', nameEn: 'Powers and Roots', icon: '√', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'التناسب', nameEn: 'Proportionality', icon: '⚖️', active: true },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'متعددات الحدود', nameEn: 'Polynomials', icon: '🔤', active: true },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'المعادلات والأنظمة', nameEn: 'Equations and Systems', icon: '📝', active: true },
      { id: 'geometria-plana', name: 'Geometría del Plano', nameEu: 'Planoko Geometria', nameAr: 'هندسة المستوى', nameEn: 'Plane Geometry', icon: '📐', active: true },
      { id: 'movimientos-plano', name: 'Movimientos en el Plano', nameEu: 'Planoko Mugimenduak', nameAr: 'الحركات في المستوى', nameEn: 'Transformations in the Plane', icon: '🔄', active: true },
      { id: 'funciones-lineales', name: 'Funciones Lineales', nameEu: 'Funtzio Linealak', nameAr: 'الدوال الخطية', nameEn: 'Linear Functions', icon: '📈', active: true },
      { id: 'sucesiones', name: 'Sucesiones', nameEu: 'Segidak', nameAr: 'المتتاليات', nameEn: 'Sequences', icon: '🔢', active: true },
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', nameEn: 'Statistics and Probability', icon: '📊' },
    ]
  },
  {
    id: 'dbh4-aplikatuak',
    name: '4º ESO · Aplicadas',
    nameEu: 'DBH 4 · Aplikatuak',
    nameAr: 'السنة الرابعة · التطبيقية',
    nameEn: '4th ESO · Applied',
    description: 'Matemáticas orientadas a las enseñanzas aplicadas',
    descriptionEu: 'Irakaskuntza aplikatuetara bideratutako matematika',
    descriptionAr: 'رياضيات موجّهة نحو التعليم التطبيقي',
    descriptionEn: 'Mathematics for applied studies',
    color: '#d9502e',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', nameEn: 'Real Numbers', icon: '∞', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'التناسب', nameEn: 'Proportionality', icon: '⚖️', active: true },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'متعددات الحدود', nameEn: 'Polynomials', icon: '🔤', active: true },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'المعادلات والأنظمة', nameEn: 'Equations and Systems', icon: '📝', active: true },
      { id: 'areas-volumenes', name: 'Perímetros, Áreas y Volúmenes', nameEu: 'Perimetroak, Azalerak eta Bolumenak', nameAr: 'المحيطات والمساحات والأحجام', nameEn: 'Perimeters, Areas and Volumes', icon: '📦', active: true },
      { id: 'semejanza', name: 'Semejanza', nameEu: 'Antzekotasuna', nameAr: 'التشابه', nameEn: 'Similarity', icon: '📐', active: true },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', nameEn: 'Functions', icon: '📈', active: true },
      { id: 'grafica-funcion', name: 'Gráfica de una Función', nameEu: 'Funtzio baten Grafikoa', nameAr: 'التمثيل البياني للدالة', nameEn: 'Graph of a Function', icon: '〰️', active: true },
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', nameEn: 'Statistics and Probability', icon: '📊', active: true },
    ]
  },
  {
    id: 'dbh4-akademikoak',
    name: '4º ESO · Académicas',
    nameEu: 'DBH 4 · Akademikoak',
    nameAr: 'السنة الرابعة · الأكاديمية',
    nameEn: '4th ESO · Academic',
    description: 'Matemáticas orientadas a las enseñanzas académicas',
    descriptionEu: 'Irakaskuntza akademikoetara bideratutako matematika',
    descriptionAr: 'رياضيات موجّهة نحو التعليم الأكاديمي',
    descriptionEn: 'Mathematics for academic studies',
    color: '#b23a6f',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales y Porcentajes', nameEu: 'Zenbaki Errealak eta Ehunekoak', nameAr: 'الأعداد الحقيقية والنسب المئوية', nameEn: 'Real Numbers and Percentages', icon: '∞', active: true },
      { id: 'potencias-radicales', name: 'Potencias, Radicales y Logaritmos', nameEu: 'Berreturak, Erroak eta Logaritmoak', nameAr: 'القوى والجذور واللوغاريتمات', nameEn: 'Powers, Roots and Logarithms', icon: '√', active: true },
      { id: 'polinomios-fracciones', name: 'Polinomios y Fracciones Algebraicas', nameEu: 'Polinomioak eta Zatiki Aljebraikoak', nameAr: 'متعددات الحدود والكسور الجبرية', nameEn: 'Polynomials and Algebraic Fractions', icon: '🔤', active: true },
      { id: 'ecuaciones-inecuaciones', name: 'Ecuaciones e Inecuaciones', nameEu: 'Ekuazioak eta Inekuazioak', nameAr: 'المعادلات والمتراجحات', nameEn: 'Equations and Inequalities', icon: '⚖️', active: true },
      { id: 'sistemas', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'أنظمة المعادلات', nameEn: 'Systems of Equations', icon: '📝', active: true },
      { id: 'areas-volumenes-semejanza', name: 'Áreas, Volúmenes y Semejanza', nameEu: 'Azalerak, Bolumenak eta Antzekotasuna', nameAr: 'المساحات والأحجام والتشابه', nameEn: 'Areas, Volumes and Similarity', icon: '📦', active: true },
      { id: 'trigonometria', name: 'Trigonometría', nameEu: 'Trigonometria', nameAr: 'حساب المثلثات', nameEn: 'Trigonometry', icon: '📏', active: true },
      { id: 'vectores-rectas', name: 'Vectores y Rectas', nameEu: 'Bektoreak eta Zuzenak', nameAr: 'المتجهات والمستقيمات', nameEn: 'Vectors and Lines', icon: '➡️', active: true },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', nameEn: 'Functions', icon: '📈', active: true },
      { id: 'funciones-polinomicas-racionales', name: 'Funciones Polinómicas y Racionales', nameEu: 'Funtzio Polinomikoak eta Arrazionalak', nameAr: 'الدوال كثيرة الحدود والنسبية', nameEn: 'Polynomial and Rational Functions', icon: '〰️', active: true },
      { id: 'funciones-exponenciales', name: 'Funciones Exponenciales, Logarítmicas y Trigonométricas', nameEu: 'Funtzio Esponentzialak, Logaritmikoak eta Trigonometrikoak', nameAr: 'الدوال الأسية واللوغاريتمية والمثلثية', nameEn: 'Exponential, Logarithmic and Trigonometric Functions', icon: '📈', active: true },
      { id: 'estadistica', name: 'Estadística', nameEu: 'Estatistika', nameAr: 'الإحصاء', nameEn: 'Statistics', icon: '📊', active: true },
      { id: 'combinatoria', name: 'Combinatoria', nameEu: 'Konbinatoria', nameAr: 'التوافيق', nameEn: 'Combinatorics', icon: '🔢', active: true },
      { id: 'probabilidad', name: 'Probabilidad', nameEu: 'Probabilitatea', nameAr: 'الاحتمالات', nameEn: 'Probability', icon: '🎲', active: true },
    ]
  },
  {
    id: 'batx1',
    name: '1º Bachillerato',
    nameEu: 'Batxilergoa 1',
    nameAr: 'البكالوريا الأولى',
    nameEn: '1st Bachillerato',
    description: 'Análisis y geometría avanzada',
    descriptionEu: 'Analisia eta geometria aurreratua',
    descriptionAr: 'التحليل والهندسة المتقدمة',
    descriptionEn: 'Advanced analysis and geometry',
    color: '#267b53',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', nameEn: 'Real Numbers', icon: '∞' },
      { id: 'potencias-logaritmos', name: 'Potencias y Logaritmos', nameEu: 'Potentziak eta Logaritmoak', nameAr: 'القوى واللوغاريتمات', nameEn: 'Powers and Logarithms', icon: '📐' },
      { id: 'polinomios', name: 'Polinomios', nameEu: 'Polinomioak', nameAr: 'متعددات الحدود', nameEn: 'Polynomials', icon: '🔤' },
      { id: 'ecuaciones-sistemas', name: 'Ecuaciones y Sistemas', nameEu: 'Ekuazioak eta Sistemak', nameAr: 'المعادلات والأنظمة', nameEn: 'Equations and Systems', icon: '⚖️' },
      { id: 'numeros-complejos', name: 'Números Complejos', nameEu: 'Zenbaki Konplexuak', nameAr: 'الأعداد المركبة', nameEn: 'Complex Numbers', icon: '🔢' },
      { id: 'trigonometria', name: 'Trigonometría', nameEu: 'Trigonometria', nameAr: 'حساب المثلثات', nameEn: 'Trigonometry', icon: '📐' },
      { id: 'vectores-plano', name: 'Vectores en el Plano', nameEu: 'Planoko Bektoreak', nameAr: 'المتجهات في المستوى', nameEn: 'Vectors in the Plane', icon: '➡️' },
      { id: 'geometria-analitica', name: 'Geometría Analítica', nameEu: 'Geometria Analitikoa', nameAr: 'الهندسة التحليلية', nameEn: 'Analytic Geometry', icon: '📐' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', nameEn: 'Functions', icon: '📈' },
      { id: 'limites-continuidad', name: 'Límites y Continuidad', nameEu: 'Mugak eta Jarraitutasuna', nameAr: 'النهايات والاتصال', nameEn: 'Limits and Continuity', icon: '∞' },
    ]
  },
  {
    id: 'batx2',
    name: '2º Bachillerato',
    nameEu: 'Batxilergoa 2',
    nameAr: 'البكالوريا الثانية',
    nameEn: '2nd Bachillerato',
    description: 'Cálculo y álgebra lineal',
    descriptionEu: 'Kalkulua eta aljebra lineala',
    descriptionAr: 'التفاضل والتكامل والجبر الخطي',
    descriptionEn: 'Calculus and linear algebra',
    color: '#c4432a',
    topics: [
      { id: 'matrices', name: 'Matrices', nameEu: 'Matrizeak', nameAr: 'المصفوفات', nameEn: 'Matrices', icon: '🔲' },
      { id: 'determinantes', name: 'Determinantes', nameEu: 'Determinanteak', nameAr: 'المحددات', nameEn: 'Determinants', icon: '📐' },
      { id: 'sistemas-ecuaciones', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'أنظمة المعادلات', nameEn: 'Systems of Equations', icon: '⚖️' },
      { id: 'vectores-espacio', name: 'Vectores en el Espacio', nameEu: 'Espazioko Bektoreak', nameAr: 'المتجهات في الفضاء', nameEn: 'Vectors in Space', icon: '➡️' },
      { id: 'geometria-espacio', name: 'Geometría del Espacio', nameEu: 'Espazioko Geometria', nameAr: 'هندسة الفضاء', nameEn: 'Solid Geometry', icon: '🔲' },
      { id: 'limites', name: 'Límites', nameEu: 'Mugak', nameAr: 'النهايات', nameEn: 'Limits', icon: '∞' },
      { id: 'derivadas', name: 'Derivadas', nameEu: 'Deribatuak', nameAr: 'المشتقات', nameEn: 'Derivatives', icon: '📈' },
      { id: 'aplicaciones-derivadas', name: 'Aplicaciones de Derivadas', nameEu: 'Deribatuen Aplikazioak', nameAr: 'تطبيقات المشتقات', nameEn: 'Applications of Derivatives', icon: '📊' },
      { id: 'integrales', name: 'Integrales', nameEu: 'Integralak', nameAr: 'التكاملات', nameEn: 'Integrals', icon: '∫' },
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
