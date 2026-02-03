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
    id: '1eso',
    name: '1º ESO',
    nameEu: 'DBH 1',
    nameAr: 'السنة الأولى',
    description: 'Fundamentos matemáticos',
    descriptionEu: 'Oinarrizko matematikak',
    descriptionAr: 'أساسيات الرياضيات',
    color: '#6366f1',
    topics: [
      { id: 'numeros-naturales', name: 'Números Naturales', nameEu: 'Zenbaki Naturalak', nameAr: 'الأعداد الطبيعية', icon: '🔢' },
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'القابلية للقسمة', icon: '➗' },
      { id: 'numeros-enteros', name: 'Números Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'الأعداد الصحيحة', icon: '±' },
      { id: 'fracciones', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'الكسور', icon: '½' },
      { id: 'numeros-decimales', name: 'Números Decimales', nameEu: 'Zenbaki Hamartarrak', nameAr: 'الأعداد العشرية', icon: '🔣' },
      { id: 'proporcionalidad', name: 'Proporcionalidad', nameEu: 'Proportzionaltasuna', nameAr: 'التناسب', icon: '⚖️' },
      { id: 'algebra', name: 'Iniciación al Álgebra', nameEu: 'Aljebraren Hastapenak', nameAr: 'مقدمة في الجبر', icon: '🔤' },
      { id: 'geometria-plana', name: 'Geometría del Plano', nameEu: 'Planoko Geometria', nameAr: 'هندسة المستوى', icon: '📐' },
      { id: 'figuras-planas', name: 'Figuras Planas', nameEu: 'Irudi Lauak', nameAr: 'الأشكال المستوية', icon: '🔷' },
      { id: 'estadistica', name: 'Estadística', nameEu: 'Estatistika', nameAr: 'الإحصاء', icon: '📊' },
    ]
  },
  {
    id: '2eso',
    name: '2º ESO',
    nameEu: 'DBH 2',
    nameAr: 'السنة الثانية',
    description: 'Consolidación y álgebra',
    descriptionEu: 'Sendotzea eta aljebra',
    descriptionAr: 'التوحيد والجبر',
    color: '#06b6d4',
    topics: [
      { id: 'divisibilidad', name: 'Divisibilidad', nameEu: 'Zatigarritasuna', nameAr: 'القابلية للقسمة', icon: '➗' },
      { id: 'numeros-enteros', name: 'Números Enteros', nameEu: 'Zenbaki Osoak', nameAr: 'الأعداد الصحيحة', icon: '±' },
      { id: 'fracciones', name: 'Fracciones', nameEu: 'Zatikiak', nameAr: 'الكسور', icon: '½', active: true },
      { id: 'proporcionalidad', name: 'Proporcionalidad y Porcentajes', nameEu: 'Proportzionaltasuna eta Ehunekoak', nameAr: 'التناسب والنسب المئوية', icon: '📈' },
      { id: 'expresiones-algebraicas', name: 'Expresiones Algebraicas', nameEu: 'Adierazpen Aljebraikoak', nameAr: 'التعبيرات الجبرية', icon: '🔤' },
      { id: 'ecuaciones', name: 'Ecuaciones', nameEu: 'Ekuazioak', nameAr: 'المعادلات', icon: '⚖️' },
      { id: 'teorema-pitagoras', name: 'Teorema de Pitágoras', nameEu: 'Pitagorasen Teorema', nameAr: 'نظرية فيثاغورس', icon: '📐' },
      { id: 'cuerpos-geometricos', name: 'Cuerpos Geométricos', nameEu: 'Gorputz Geometrikoak', nameAr: 'الأجسام الهندسية', icon: '🔲' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', icon: '📈' },
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', icon: '📊' },
    ]
  },
  {
    id: '3eso',
    name: '3º ESO',
    nameEu: 'DBH 3',
    nameAr: 'السنة الثالثة',
    description: 'Álgebra y funciones',
    descriptionEu: 'Aljebra eta funtzioak',
    descriptionAr: 'الجبر والدوال',
    color: '#f472b6',
    topics: [
      { id: 'numeros-racionales', name: 'Números Racionales', nameEu: 'Zenbaki Arrazionalak', nameAr: 'الأعداد النسبية', icon: '🔢' },
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
    id: '4eso',
    name: '4º ESO',
    nameEu: 'DBH 4',
    nameAr: 'السنة الرابعة',
    description: 'Preparación para Bachillerato',
    descriptionEu: 'Batxilergorako prestaketa',
    descriptionAr: 'التحضير للبكالوريا',
    color: '#8b5cf6',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', icon: '∞' },
      { id: 'polinomios-fracciones', name: 'Polinomios y Fracciones Algebraicas', nameEu: 'Polinomioak eta Zatiki Aljebraikoak', nameAr: 'متعددات الحدود والكسور الجبرية', icon: '🔤' },
      { id: 'ecuaciones-inecuaciones', name: 'Ecuaciones e Inecuaciones', nameEu: 'Ekuazioak eta Inekuazioak', nameAr: 'المعادلات والمتراجحات', icon: '⚖️' },
      { id: 'geometria-analitica', name: 'Geometría Analítica', nameEu: 'Geometria Analitikoa', nameAr: 'الهندسة التحليلية', icon: '📐' },
      { id: 'semejanza-trigonometria', name: 'Semejanza y Trigonometría', nameEu: 'Antzekotasuna eta Trigonometria', nameAr: 'التشابه والمثلثات', icon: '📏' },
      { id: 'funciones', name: 'Funciones', nameEu: 'Funtzioak', nameAr: 'الدوال', icon: '📈' },
      { id: 'combinatoria', name: 'Combinatoria', nameEu: 'Konbinatoria', nameAr: 'التوافيق', icon: '🔢' },
      { id: 'estadistica-bidimensional', name: 'Estadística Bidimensional', nameEu: 'Estatistika Bidimentsionala', nameAr: 'الإحصاء ثنائي الأبعاد', icon: '📊' },
      { id: 'probabilidad', name: 'Probabilidad', nameEu: 'Probabilitatea', nameAr: 'الاحتمالات', icon: '🎲' },
    ]
  },
  {
    id: '1bach',
    name: '1º Bachillerato',
    nameEu: 'Batxilergoa 1',
    nameAr: 'البكالوريا الأولى',
    description: 'Análisis y geometría avanzada',
    descriptionEu: 'Analisia eta geometria aurreratua',
    descriptionAr: 'التحليل والهندسة المتقدمة',
    color: '#10b981',
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
    id: '2bach',
    name: '2º Bachillerato',
    nameEu: 'Batxilergoa 2',
    nameAr: 'البكالوريا الثانية',
    description: 'Cálculo y álgebra lineal',
    descriptionEu: 'Kalkulua eta aljebra lineala',
    descriptionAr: 'التفاضل والتكامل والجبر الخطي',
    color: '#f59e0b',
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
