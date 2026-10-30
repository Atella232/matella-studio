export interface NaturaTopic {
  id: string
  name: string
  nameEu: string
  nameAr: string
  nameEn: string
  icon: string
  active?: boolean
}

export interface NaturaCourse {
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
  topics: NaturaTopic[]
}

export const naturaCourses: NaturaCourse[] = [
  {
    id: 'dbh1',
    name: '1 ESO',
    nameEu: 'DBH 1',
    nameAr: 'السنة الاولى',
    nameEn: '1st ESO',
    description: 'Inicio de Natura y sistemas de la Tierra',
    descriptionEu: 'Naturaren hastapena eta Lurraren sistemak',
    descriptionAr: 'بداية العلوم الطبيعية وانظمة الارض',
    descriptionEn: 'Introduction to Natural Sciences and Earth systems',
    color: '#10b981',
    topics: [
      { id: 'lurra-eta-ura', name: 'Tierra y Agua', nameEu: 'Lurra eta Ura', nameAr: 'الارض والماء', nameEn: 'Earth and Water', icon: '🌍' },
      { id: 'atmosfera', name: 'Atmosfera', nameEu: 'Atmosfera', nameAr: 'الغلاف الجوي', nameEn: 'Atmosphere', icon: '☁️' },
      { id: 'geosfera', name: 'Geosfera', nameEu: 'Geosfera', nameAr: 'الغلاف الصخري', nameEn: 'Geosphere', icon: '🪨' },
      { id: 'biosfera', name: 'Biosfera', nameEu: 'Biosfera', nameAr: 'المحيط الحيوي', nameEn: 'Biosphere', icon: '🌿', active: true }
    ]
  },
  {
    id: 'dbh2',
    name: '2 ESO',
    nameEu: 'DBH 2',
    nameAr: 'السنة الثانية',
    nameEn: '2nd ESO',
    description: 'Procesos naturales y vida',
    descriptionEu: 'Prozesu naturalak eta bizia',
    descriptionAr: 'العمليات الطبيعية والحياة',
    descriptionEn: 'Natural processes and life',
    color: '#06b6d4',
    topics: []
  },
  {
    id: 'dbh3',
    name: '3 ESO',
    nameEu: 'DBH 3',
    nameAr: 'السنة الثالثة',
    nameEn: '3rd ESO',
    description: 'Ciencias naturales intermedias',
    descriptionEu: 'Natura zientziak erdiko mailan',
    descriptionAr: 'علوم طبيعية متوسطة',
    descriptionEn: 'Intermediate natural sciences',
    color: '#8b5cf6',
    topics: []
  },
  {
    id: 'dbh4',
    name: '4 ESO',
    nameEu: 'DBH 4',
    nameAr: 'السنة الرابعة',
    nameEn: '4th ESO',
    description: 'Profundizacion en Natura',
    descriptionEu: 'Naturan sakontzea',
    descriptionAr: 'تعمق في العلوم الطبيعية',
    descriptionEn: 'Deeper study of Natural Sciences',
    color: '#f59e0b',
    topics: []
  },
  {
    id: 'batx1',
    name: '1 Bach',
    nameEu: 'Batxi 1',
    nameAr: 'البكالوريا الاولى',
    nameEn: '1st Bachillerato',
    description: 'Bachillerato cientifico inicial',
    descriptionEu: 'Batxiko zientzia hasiera',
    descriptionAr: 'بداية البكالوريا العلمية',
    descriptionEn: 'Initial science Bachillerato',
    color: '#22c55e',
    topics: []
  },
  {
    id: 'batx2',
    name: '2 Bach',
    nameEu: 'Batxi 2',
    nameAr: 'البكالوريا الثانية',
    nameEn: '2nd Bachillerato',
    description: 'Preparacion cientifica avanzada',
    descriptionEu: 'Zientzia prestaketa aurreratua',
    descriptionAr: 'تحضير علمي متقدم',
    descriptionEn: 'Advanced science preparation',
    color: '#14b8a6',
    topics: []
  }
]

export function getNaturaCourseById(id: string): NaturaCourse | undefined {
  return naturaCourses.find((course) => course.id === id)
}
