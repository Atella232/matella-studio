import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import './HomePage.css'

type Lang = 'es' | 'eu' | 'ar'

interface FeatureItem {
    icon: string
    title: string
    description: string
    href: string
    link: string
}

interface HomeCopy {
    title: string
    subtitle: string
    description: string
    ctas: {
        theory: string
        lab: string
        missions: string
        games: string
    }
    sectionTitle: string
    features: FeatureItem[]
    goalsTitle: string
    goalsIntro: string
    goals: Array<{ icon: string; label: string }>
}

const COPY: Record<Lang, HomeCopy> = {
    es: {
        title: 'Numeros naturales',
        subtitle: 'Sistema decimal, aproximacion y operaciones',
        description:
            'Unidad completa de 1 ESO para pasar de la comprension del valor posicional a la resolucion de problemas con operaciones combinadas.',
        ctas: {
            theory: 'Teoria',
            lab: 'Laboratorio',
            missions: 'Erronkak',
            games: 'Jokuak'
        },
        sectionTitle: 'Itinerario del tema',
        features: [
            {
                icon: 'T',
                title: 'Teoria',
                description:
                    '10 tarjetas: sistema decimal, lectura de grandes numeros, redondeo, operaciones y modelizacion.',
                href: '/matematika/dbh1/zenbaki-naturalak/teoria',
                link: 'Entrar en teoria ->'
            },
            {
                icon: 'L',
                title: 'Laboratorio',
                description:
                    '8 herramientas interactivas para experimentar y validar: abaco, comparador, redondeo, operaciones, division y mas.',
                href: '/matematika/dbh1/zenbaki-naturalak/laboratorio',
                link: 'Ir al laboratorio ->'
            },
            {
                icon: 'E',
                title: 'Erronkak',
                description:
                    '9 problemas por niveles con pistas graduadas, correccion y resolucion paso a paso.',
                href: '/matematika/dbh1/zenbaki-naturalak/retos',
                link: 'Practicar erronkak ->'
            },
            {
                icon: 'J',
                title: 'Jokuak',
                description:
                    '3 juegos para entrenar valor posicional, parentesis tacticos y division entera en contexto.',
                href: '/matematika/dbh1/zenbaki-naturalak/jokuak',
                link: 'Abrir jokuak ->'
            },
            {
                icon: 'A',
                title: 'Accesibilidad',
                description:
                    'Diseno adaptable para trabajo de aula y casa, con navegacion clara en los tres idiomas.',
                href: '/accesibilidad',
                link: 'Ver opciones ->'
            }
        ],
        goalsTitle: 'Objetivos de aprendizaje',
        goalsIntro:
            'Progresion didactica desde la numeracion decimal hasta la resolucion de problemas con validacion del resultado.',
        goals: [
            { icon: 'N', label: 'Valor posicional y numeracion' },
            { icon: 'O', label: 'Operaciones y jerarquia' },
            { icon: 'P', label: 'Modelizacion y validacion' }
        ]
    },
    eu: {
        title: 'Zenbaki naturalak',
        subtitle: 'Sistema hamartarra, hurbilketa eta eragiketak',
        description:
            'DBH 1eko unitate osoa: balio posizionaletik hasi eta eragiketa konbinatuekin problemak ebazteraino.',
        ctas: {
            theory: 'Teoria',
            lab: 'Laborategia',
            missions: 'Erronkak',
            games: 'Jokuak'
        },
        sectionTitle: 'Gaiaren ibilbidea',
        features: [
            {
                icon: 'T',
                title: 'Teoria',
                description:
                    '10 txartel: sistema hamartarra, zenbaki handien irakurketa, biribiltzea, eragiketak eta modelizazioa.',
                href: '/matematika/dbh1/zenbaki-naturalak/teoria',
                link: 'Teorian sartu ->'
            },
            {
                icon: 'L',
                title: 'Laborategia',
                description:
                    '8 tresna interaktibo: abakoa, konparatzailea, biribiltzea, eragiketak, zatiketa eta gehiago.',
                href: '/matematika/dbh1/zenbaki-naturalak/laboratorio',
                link: 'Laborategira joan ->'
            },
            {
                icon: 'E',
                title: 'Erronkak',
                description:
                    '9 problema mailaka, pista progresiboekin eta urratsez urratseko ebazpenarekin.',
                href: '/matematika/dbh1/zenbaki-naturalak/retos',
                link: 'Erronkak praktikatu ->'
            },
            {
                icon: 'J',
                title: 'Jokuak',
                description:
                    '3 joko: balio posizionala, parentesi taktikoak eta zatiketa osoa testuinguruan lantzeko.',
                href: '/matematika/dbh1/zenbaki-naturalak/jokuak',
                link: 'Jokuak ireki ->'
            },
            {
                icon: 'A',
                title: 'Irisgarritasuna',
                description:
                    'Aula eta etxeko erabilerarako diseinu moldagarria, hiru hizkuntzetan nabigazio argiarekin.',
                href: '/accesibilidad',
                link: 'Aukerak ikusi ->'
            }
        ],
        goalsTitle: 'Ikaskuntza helburuak',
        goalsIntro:
            'Aurrerapen didaktikoa sistema hamartarretik hasi eta emaitzaren balidaziora iristen den problemagintzaraino.',
        goals: [
            { icon: 'N', label: 'Balio posizionala eta numerazioa' },
            { icon: 'O', label: 'Eragiketak eta hierarkia' },
            { icon: 'P', label: 'Modelizazioa eta balidazioa' }
        ]
    },
    ar: {
        title: 'الأعداد الطبيعية',
        subtitle: 'النظام العشري، التقريب والعمليات',
        description:
            'وحدة كاملة للسنة الأولى إعدادي تنتقل من فهم القيمة المكانية إلى حل مسائل العمليات المركبة.',
        ctas: {
            theory: 'النظرية',
            lab: 'المختبر',
            missions: 'التحديات',
            games: 'الألعاب'
        },
        sectionTitle: 'مسار الوحدة',
        features: [
            {
                icon: 'T',
                title: 'النظرية',
                description:
                    '10 بطاقات: النظام العشري، قراءة الأعداد الكبيرة، التقريب، العمليات والنمذجة.',
                href: '/matematika/dbh1/zenbaki-naturalak/teoria',
                link: 'ادخل إلى النظرية ->'
            },
            {
                icon: 'L',
                title: 'المختبر',
                description:
                    '8 أدوات تفاعلية للتجريب والتحقق: المعداد، المقارن، التقريب، العمليات، القسمة وغيرها.',
                href: '/matematika/dbh1/zenbaki-naturalak/laboratorio',
                link: 'اذهب إلى المختبر ->'
            },
            {
                icon: 'E',
                title: 'التحديات',
                description:
                    '9 مسائل بمستويات مع تلميحات تدريجية وتصحيح وحل خطوة بخطوة.',
                href: '/matematika/dbh1/zenbaki-naturalak/retos',
                link: 'تدرب على التحديات ->'
            },
            {
                icon: 'J',
                title: 'الألعاب',
                description:
                    '3 ألعاب لتدريب القيمة المكانية، الأقواس التكتيكية والقسمة الإقليدية في سياق.',
                href: '/matematika/dbh1/zenbaki-naturalak/jokuak',
                link: 'افتح الألعاب ->'
            },
            {
                icon: 'A',
                title: 'إمكانية الوصول',
                description:
                    'تصميم متجاوب للاستخدام في الصف والمنزل مع تنقل واضح باللغات الثلاث.',
                href: '/accesibilidad',
                link: 'عرض الخيارات ->'
            }
        ],
        goalsTitle: 'أهداف التعلم',
        goalsIntro:
            'تدرج تعليمي من النظام العشري إلى حل المسائل مع التحقق من النتيجة.',
        goals: [
            { icon: 'N', label: 'القيمة المكانية والترقيم' },
            { icon: 'O', label: 'العمليات وترتيبها' },
            { icon: 'P', label: 'النمذجة والتحقق' }
        ]
    }
}

function resolveLang(language: string): Lang {
    if (language.startsWith('eu')) return 'eu'
    if (language.startsWith('ar')) return 'ar'
    return 'es'
}

export function HomePage() {
    const { i18n } = useTranslation()
    const lang = resolveLang(i18n.language)
    const copy = COPY[lang]

    return (
        <div className="home-page zenbaki-naturalak-home" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
            <section className="hero">
                <div className="container">
                    <h1>{copy.title}</h1>
                    <h2 className="hero-subtitle">{copy.subtitle}</h2>
                    <p className="hero-description">{copy.description}</p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh1/zenbaki-naturalak/teoria" className="btn btn-primary">
                            {copy.ctas.theory}
                        </Link>
                        <Link to="/matematika/dbh1/zenbaki-naturalak/laboratorio" className="btn btn-primary">
                            {copy.ctas.lab}
                        </Link>
                        <Link to="/matematika/dbh1/zenbaki-naturalak/retos" className="btn btn-secondary">
                            {copy.ctas.missions}
                        </Link>
                        <Link to="/matematika/dbh1/zenbaki-naturalak/jokuak" className="btn btn-secondary">
                            {copy.ctas.games}
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>{copy.sectionTitle}</h2>
                    <div className="features-grid">
                        {copy.features.map((feature) => (
                            <article key={feature.title} className="feature-card glass">
                                <div className="feature-icon">{feature.icon}</div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                                <Link to={feature.href} className="feature-link">
                                    {feature.link}
                                </Link>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="curriculum">
                <div className="container">
                    <h2>{copy.goalsTitle}</h2>
                    <p className="curriculum-intro">{copy.goalsIntro}</p>

                    <div className="competencies">
                        {copy.goals.map((goal) => (
                            <div key={goal.label} className="competency-card glass">
                                <span className="competency-icon">{goal.icon}</span>
                                <h4>{goal.label}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
