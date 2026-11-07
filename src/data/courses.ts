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
      { id: 'estadistica-probabilidad', name: 'Estadística y Probabilidad', nameEu: 'Estatistika eta Probabilitatea', nameAr: 'الإحصاء والاحتمالات', nameEn: 'Statistics and Probability', icon: '📊', active: true },
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
  // Bachillerato in two modalities, as 4. DBH: Ciencias (Matemáticas I/II) and Ciencias Sociales (Matemáticas
  // Aplicadas a las CCSS I/II). One topic per textbook chapter (Santillana + Anaya); list in docs/claude-notes/bachillerato.md
  {
    id: 'batx1-zientziak',
    name: '1º Bachillerato · Ciencias',
    nameEu: 'Batxilergoa 1 · Zientziak',
    nameAr: 'البكالوريا الأولى · العلوم',
    nameEn: '1st Bachillerato · Sciences',
    description: 'Matemáticas I: análisis, geometría y estadística',
    descriptionEu: 'Matematika I: analisia, geometria eta estatistika',
    descriptionAr: 'الرياضيات 1: التحليل والهندسة والإحصاء',
    descriptionEn: 'Mathematics I: analysis, geometry and statistics',
    color: '#267b53',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', nameEn: 'Real Numbers', icon: '∞', active: true },
      { id: 'sucesiones', name: 'Sucesiones', nameEu: 'Segidak', nameAr: 'المتتاليات', nameEn: 'Sequences', icon: '🔢', active: true },
      { id: 'ecuaciones-inecuaciones', name: 'Ecuaciones e Inecuaciones', nameEu: 'Ekuazioak eta Inekuazioak', nameAr: 'المعادلات والمتراجحات', nameEn: 'Equations and Inequalities', icon: '⚖️', active: true },
      { id: 'sistemas', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'أنظمة المعادلات', nameEn: 'Systems of Equations', icon: '📝', active: true },
      { id: 'resolucion-triangulos', name: 'Resolución de Triángulos', nameEu: 'Triangeluen Ebazpena', nameAr: 'حل المثلثات', nameEn: 'Solving Triangles', icon: '📐', active: true },
      { id: 'funciones-trigonometricas', name: 'Fórmulas y Funciones Trigonométricas', nameEu: 'Formula eta Funtzio Trigonometrikoak', nameAr: 'الصيغ والدوال المثلثية', nameEn: 'Trigonometric Formulas and Functions', icon: '〰️', active: true },
      { id: 'numeros-complejos', name: 'Números Complejos', nameEu: 'Zenbaki Konplexuak', nameAr: 'الأعداد المركبة', nameEn: 'Complex Numbers', icon: 'ℂ', active: true },
      { id: 'vectores', name: 'Vectores', nameEu: 'Bektoreak', nameAr: 'المتجهات', nameEn: 'Vectors', icon: '➡️', active: true },
      { id: 'geometria-analitica', name: 'Geometría Analítica', nameEu: 'Geometria Analitikoa', nameAr: 'الهندسة التحليلية', nameEn: 'Analytic Geometry', icon: '📏', active: true },
      { id: 'conicas', name: 'Lugares Geométricos y Cónicas', nameEu: 'Leku Geometrikoak eta Konikak', nameAr: 'المحلات الهندسية والقطوع المخروطية', nameEn: 'Loci and Conic Sections', icon: '⭕', active: true },
      { id: 'funciones', name: 'Funciones Elementales', nameEu: 'Funtzio Elementalak', nameAr: 'الدوال الأساسية', nameEn: 'Elementary Functions', icon: '📈', active: true },
      { id: 'limites-continuidad', name: 'Límites y Continuidad', nameEu: 'Limiteak eta Jarraitutasuna', nameAr: 'النهايات والاتصال', nameEn: 'Limits and Continuity', icon: '→', active: true },
      { id: 'derivadas', name: 'Derivadas', nameEu: 'Deribatuak', nameAr: 'المشتقات', nameEn: 'Derivatives', icon: '📉', active: true },
      { id: 'aplicaciones-derivada', name: 'Aplicaciones de la Derivada', nameEu: 'Deribatuaren Aplikazioak', nameAr: 'تطبيقات المشتقة', nameEn: 'Applications of the Derivative', icon: '⛰️', active: true },
      { id: 'integrales', name: 'Integrales', nameEu: 'Integralak', nameAr: 'التكاملات', nameEn: 'Integrals', icon: '∫', active: true },
      { id: 'estadistica', name: 'Estadística Unidimensional', nameEu: 'Estatistika Unidimentsionala', nameAr: 'الإحصاء أحادي المتغير', nameEn: 'One-Variable Statistics', icon: '📊', active: true },
      { id: 'estadistica-bidimensional', name: 'Estadística Bidimensional', nameEu: 'Estatistika Bidimentsionala', nameAr: 'الإحصاء ثنائي المتغير', nameEn: 'Two-Variable Statistics', icon: '⁘', active: true },
    ]
  },
  {
    id: 'batx1-gizarte',
    name: '1º Bachillerato · Ciencias Sociales',
    nameEu: 'Batxilergoa 1 · Gizarte Zientziak',
    nameAr: 'البكالوريا الأولى · العلوم الاجتماعية',
    nameEn: '1st Bachillerato · Social Sciences',
    description: 'Matemáticas Aplicadas a las Ciencias Sociales I',
    descriptionEu: 'Gizarte Zientziei Aplikatutako Matematika I',
    descriptionAr: 'الرياضيات التطبيقية للعلوم الاجتماعية 1',
    descriptionEn: 'Mathematics Applied to the Social Sciences I',
    color: '#1d6f8a',
    topics: [
      { id: 'numeros-reales', name: 'Números Reales', nameEu: 'Zenbaki Errealak', nameAr: 'الأعداد الحقيقية', nameEn: 'Real Numbers', icon: '∞' },
      { id: 'aritmetica-mercantil', name: 'Aritmética Mercantil', nameEu: 'Merkataritza-aritmetika', nameAr: 'الرياضيات المالية', nameEn: 'Financial Arithmetic', icon: '💶' },
      { id: 'algebra', name: 'Álgebra', nameEu: 'Aljebra', nameAr: 'الجبر', nameEn: 'Algebra', icon: '🔤' },
      { id: 'funciones', name: 'Funciones Elementales', nameEu: 'Funtzio Elementalak', nameAr: 'الدوال الأساسية', nameEn: 'Elementary Functions', icon: '📈' },
      { id: 'funciones-exponenciales', name: 'Funciones Exponenciales, Logarítmicas y Trigonométricas', nameEu: 'Funtzio Esponentzialak, Logaritmikoak eta Trigonometrikoak', nameAr: 'الدوال الأسية واللوغاريتمية والمثلثية', nameEn: 'Exponential, Logarithmic and Trigonometric Functions', icon: '〰️' },
      { id: 'limites-continuidad', name: 'Límites y Continuidad', nameEu: 'Limiteak eta Jarraitutasuna', nameAr: 'النهايات والاتصال', nameEn: 'Limits and Continuity', icon: '→' },
      { id: 'derivadas', name: 'Derivadas y sus Aplicaciones', nameEu: 'Deribatuak eta haien Aplikazioak', nameAr: 'المشتقات وتطبيقاتها', nameEn: 'Derivatives and their Applications', icon: '📉' },
      { id: 'estadistica', name: 'Estadística Unidimensional', nameEu: 'Estatistika Unidimentsionala', nameAr: 'الإحصاء أحادي المتغير', nameEn: 'One-Variable Statistics', icon: '📊' },
      { id: 'estadistica-bidimensional', name: 'Estadística Bidimensional', nameEu: 'Estatistika Bidimentsionala', nameAr: 'الإحصاء ثنائي المتغير', nameEn: 'Two-Variable Statistics', icon: '⁘' },
      { id: 'distribuciones-discretas', name: 'Distribuciones de Probabilidad Discretas', nameEu: 'Probabilitate-banaketa Diskretuak', nameAr: 'التوزيعات الاحتمالية المتقطعة', nameEn: 'Discrete Probability Distributions', icon: '🎲' },
      { id: 'distribucion-normal', name: 'Distribuciones Continuas: la Normal', nameEu: 'Banaketa Jarraituak: Normala', nameAr: 'التوزيعات المتصلة: التوزيع الطبيعي', nameEn: 'Continuous Distributions: the Normal', icon: '🔔' },
    ]
  },
  {
    id: 'batx2-zientziak',
    name: '2º Bachillerato · Ciencias',
    nameEu: 'Batxilergoa 2 · Zientziak',
    nameAr: 'البكالوريا الثانية · العلوم',
    nameEn: '2nd Bachillerato · Sciences',
    description: 'Matemáticas II: álgebra lineal, geometría del espacio y cálculo',
    descriptionEu: 'Matematika II: aljebra lineala, espazioko geometria eta kalkulua',
    descriptionAr: 'الرياضيات 2: الجبر الخطي وهندسة الفضاء والتفاضل والتكامل',
    descriptionEn: 'Mathematics II: linear algebra, solid geometry and calculus',
    color: '#c4432a',
    topics: [
      { id: 'matrices', name: 'Matrices', nameEu: 'Matrizeak', nameAr: 'المصفوفات', nameEn: 'Matrices', icon: '🔲' },
      { id: 'determinantes', name: 'Determinantes', nameEu: 'Determinanteak', nameAr: 'المحددات', nameEn: 'Determinants', icon: '▦' },
      { id: 'sistemas', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'أنظمة المعادلات', nameEn: 'Systems of Equations', icon: '📝' },
      { id: 'vectores-espacio', name: 'Vectores en el Espacio', nameEu: 'Espazioko Bektoreak', nameAr: 'المتجهات في الفضاء', nameEn: 'Vectors in Space', icon: '➡️' },
      { id: 'rectas-planos', name: 'Rectas y Planos en el Espacio', nameEu: 'Zuzenak eta Planoak Espazioan', nameAr: 'المستقيمات والمستويات في الفضاء', nameEn: 'Lines and Planes in Space', icon: '🧊' },
      { id: 'angulos-distancias', name: 'Ángulos y Distancias', nameEu: 'Angeluak eta Distantziak', nameAr: 'الزوايا والمسافات', nameEn: 'Angles and Distances', icon: '📐' },
      { id: 'limites-continuidad', name: 'Límites y Continuidad', nameEu: 'Limiteak eta Jarraitutasuna', nameAr: 'النهايات والاتصال', nameEn: 'Limits and Continuity', icon: '→' },
      { id: 'derivadas', name: 'Derivadas', nameEu: 'Deribatuak', nameAr: 'المشتقات', nameEn: 'Derivatives', icon: '📉' },
      { id: 'aplicaciones-derivada', name: 'Aplicaciones de la Derivada', nameEu: 'Deribatuaren Aplikazioak', nameAr: 'تطبيقات المشتقة', nameEn: 'Applications of the Derivative', icon: '⛰️' },
      { id: 'representacion-funciones', name: 'Representación de Funciones', nameEu: 'Funtzioen Adierazpen Grafikoa', nameAr: 'التمثيل البياني للدوال', nameEn: 'Curve Sketching', icon: '📈' },
      { id: 'integrales-indefinidas', name: 'Integrales Indefinidas', nameEu: 'Integral Mugagabeak', nameAr: 'التكاملات غير المحددة', nameEn: 'Indefinite Integrals', icon: '∫' },
      { id: 'integral-definida', name: 'Integral Definida', nameEu: 'Integral Mugatua', nameAr: 'التكامل المحدد', nameEn: 'Definite Integral', icon: '▨' },
      { id: 'probabilidad', name: 'Probabilidad', nameEu: 'Probabilitatea', nameAr: 'الاحتمالات', nameEn: 'Probability', icon: '🎲' },
      { id: 'binomial-normal', name: 'Distribuciones Binomial y Normal', nameEu: 'Banaketa Binomiala eta Normala', nameAr: 'التوزيع الثنائي والتوزيع الطبيعي', nameEn: 'Binomial and Normal Distributions', icon: '🔔' },
    ]
  },
  {
    id: 'batx2-gizarte',
    name: '2º Bachillerato · Ciencias Sociales',
    nameEu: 'Batxilergoa 2 · Gizarte Zientziak',
    nameAr: 'البكالوريا الثانية · العلوم الاجتماعية',
    nameEn: '2nd Bachillerato · Social Sciences',
    description: 'Matemáticas Aplicadas a las Ciencias Sociales II',
    descriptionEu: 'Gizarte Zientziei Aplikatutako Matematika II',
    descriptionAr: 'الرياضيات التطبيقية للعلوم الاجتماعية 2',
    descriptionEn: 'Mathematics Applied to the Social Sciences II',
    color: '#8a5a12',
    topics: [
      { id: 'matrices', name: 'Matrices', nameEu: 'Matrizeak', nameAr: 'المصفوفات', nameEn: 'Matrices', icon: '🔲' },
      { id: 'determinantes', name: 'Determinantes', nameEu: 'Determinanteak', nameAr: 'المحددات', nameEn: 'Determinants', icon: '▦' },
      { id: 'sistemas', name: 'Sistemas de Ecuaciones', nameEu: 'Ekuazio-sistemak', nameAr: 'أنظمة المعادلات', nameEn: 'Systems of Equations', icon: '📝' },
      { id: 'programacion-lineal', name: 'Programación Lineal', nameEu: 'Programazio Lineala', nameAr: 'البرمجة الخطية', nameEn: 'Linear Programming', icon: '📐' },
      { id: 'limites-continuidad', name: 'Límites y Continuidad', nameEu: 'Limiteak eta Jarraitutasuna', nameAr: 'النهايات والاتصال', nameEn: 'Limits and Continuity', icon: '→' },
      { id: 'derivadas', name: 'Derivadas', nameEu: 'Deribatuak', nameAr: 'المشتقات', nameEn: 'Derivatives', icon: '📉' },
      { id: 'aplicaciones-derivada', name: 'Aplicaciones de la Derivada', nameEu: 'Deribatuaren Aplikazioak', nameAr: 'تطبيقات المشتقة', nameEn: 'Applications of the Derivative', icon: '⛰️' },
      { id: 'representacion-funciones', name: 'Representación de Funciones', nameEu: 'Funtzioen Adierazpen Grafikoa', nameAr: 'التمثيل البياني للدوال', nameEn: 'Curve Sketching', icon: '📈' },
      { id: 'integrales', name: 'Integrales', nameEu: 'Integralak', nameAr: 'التكاملات', nameEn: 'Integrals', icon: '∫' },
      { id: 'probabilidad', name: 'Probabilidad', nameEu: 'Probabilitatea', nameAr: 'الاحتمالات', nameEn: 'Probability', icon: '🎲' },
      { id: 'binomial-normal', name: 'Distribuciones Binomial y Normal', nameEu: 'Banaketa Binomiala eta Normala', nameAr: 'التوزيع الثنائي والتوزيع الطبيعي', nameEn: 'Binomial and Normal Distributions', icon: '🔔' },
      { id: 'muestreo', name: 'Muestras Estadísticas', nameEu: 'Lagin Estatistikoak', nameAr: 'العينات الإحصائية', nameEn: 'Statistical Samples', icon: '🧪' },
      { id: 'inferencia', name: 'Inferencia Estadística: Estimación', nameEu: 'Inferentzia Estatistikoa: Estimazioa', nameAr: 'الاستدلال الإحصائي: التقدير', nameEn: 'Statistical Inference: Estimation', icon: '🎯' },
    ]
  },
]

export function getCourseById(id: string): Course | undefined {
  return courses.find(course => course.id === id)
}

export function getTopicById(courseId: string, topicId: string): Topic | undefined {
  const course = getCourseById(courseId)
  return course?.topics.find(topic => topic.id === topicId)
}
