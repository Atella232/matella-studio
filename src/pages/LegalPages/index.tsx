import { useTranslation } from 'react-i18next'
import './LegalPages.css'

type LegalLanguage = 'eu' | 'es' | 'ar'

interface LegalSection {
    title: string
    paragraphs: string[]
}

interface LegalCopy {
    eyebrow: string
    title: string
    description: string
    sections: LegalSection[]
}

const privacyCopy: Record<LegalLanguage, LegalCopy> = {
    eu: {
        eyebrow: 'Pribatutasuna',
        title: 'Pribatutasun-oharra',
        description: 'Matellak ikasteko behar den gutxieneko informazioa soilik erabiltzen du.',
        sections: [
            {
                title: 'Gailuan gordetako datuak',
                paragraphs: ['Hautatutako hizkuntza eta jarduera batzuen aurrerapena nabigatzailearen biltegiratze lokalean gordetzen dira. Informazio hori erabiltzailearen gailuan geratzen da eta nabigatzailearen ezarpenetatik ezaba daiteke.']
            },
            {
                title: 'Kontuak eta datu pertsonalak',
                paragraphs: ['Webguneak ez du erabiltzaile-konturik sortzen eta ez du izenik, helbide elektronikorik edo ariketen erantzunik zerbitzari propio batera bidaltzen.']
            },
            {
                title: 'Ostatatze teknikoa',
                paragraphs: ['Webgunea ostatatzen duen hornitzaileak sarbideari buruzko datu tekniko arruntak prozesa ditzake segurtasuna eta zerbitzuaren funtzionamendua bermatzeko, bere pribatutasun-politikaren arabera.']
            }
        ]
    },
    es: {
        eyebrow: 'Privacidad',
        title: 'Aviso de privacidad',
        description: 'Matella utiliza únicamente la información mínima necesaria para facilitar el aprendizaje.',
        sections: [
            {
                title: 'Datos guardados en el dispositivo',
                paragraphs: ['El idioma seleccionado y el progreso de algunas actividades se guardan en el almacenamiento local del navegador. Esta información permanece en el dispositivo y puede eliminarse desde la configuración del navegador.']
            },
            {
                title: 'Cuentas y datos personales',
                paragraphs: ['La web no crea cuentas de usuario ni envía nombres, direcciones de correo o respuestas de los ejercicios a un servidor propio.']
            },
            {
                title: 'Alojamiento técnico',
                paragraphs: ['El proveedor que aloja la web puede procesar los datos técnicos de acceso habituales para mantener la seguridad y el funcionamiento del servicio, de acuerdo con su propia política de privacidad.']
            }
        ]
    },
    ar: {
        eyebrow: 'الخصوصية',
        title: 'إشعار الخصوصية',
        description: 'تستخدم Matella الحد الأدنى من المعلومات اللازمة لدعم التعلّم.',
        sections: [
            {
                title: 'البيانات المحفوظة على الجهاز',
                paragraphs: ['تُحفظ اللغة المختارة وتقدّم بعض الأنشطة في التخزين المحلي للمتصفح. تبقى هذه المعلومات على جهاز المستخدم ويمكن حذفها من إعدادات المتصفح.']
            },
            {
                title: 'الحسابات والبيانات الشخصية',
                paragraphs: ['لا ينشئ الموقع حسابات للمستخدمين ولا يرسل الأسماء أو عناوين البريد الإلكتروني أو إجابات التمارين إلى خادم خاص به.']
            },
            {
                title: 'الاستضافة التقنية',
                paragraphs: ['قد يعالج مزوّد استضافة الموقع بيانات الوصول التقنية المعتادة للحفاظ على أمان الخدمة وتشغيلها، وفقاً لسياسة الخصوصية الخاصة به.']
            }
        ]
    }
}

const creditsCopy: Record<LegalLanguage, LegalCopy> = {
    eu: {
        eyebrow: 'Kredituak',
        title: 'Proiektuaren kredituak',
        description: 'Matella matematika modu argi, praktiko eta eskuragarrian ikasteko hezkuntza-proiektua da.',
        sections: [
            {
                title: 'Edukia eta diseinua',
                paragraphs: ['Unitate didaktikoak, azalpenak, ariketak eta jarduera interaktiboak Matella proiekturako prestatu dira.']
            },
            {
                title: 'Erabilitako teknologia',
                paragraphs: ['Webgunea React, TypeScript, i18next eta KaTeX erabiliz eraiki da. Ikono eta animazio osagarriek Lucide eta canvas-confetti erabiltzen dituzte.']
            },
            {
                title: 'Hezkuntza-helburua',
                paragraphs: ['Materiala ikasgelan eta ikaskuntza autonomoan erabiltzeko pentsatuta dago, azalpen teorikoa, esperimentazioa eta berehalako egiaztapena uztartuz.']
            }
        ]
    },
    es: {
        eyebrow: 'Créditos',
        title: 'Créditos del proyecto',
        description: 'Matella es un proyecto educativo para aprender matemáticas de forma clara, práctica y accesible.',
        sections: [
            {
                title: 'Contenido y diseño',
                paragraphs: ['Las unidades didácticas, explicaciones, ejercicios y actividades interactivas se han preparado específicamente para el proyecto Matella.']
            },
            {
                title: 'Tecnología utilizada',
                paragraphs: ['La web está construida con React, TypeScript, i18next y KaTeX. Los iconos y animaciones complementarias utilizan Lucide y canvas-confetti.']
            },
            {
                title: 'Finalidad educativa',
                paragraphs: ['El material está pensado para su uso en el aula y en el aprendizaje autónomo, combinando explicación teórica, experimentación y comprobación inmediata.']
            }
        ]
    },
    ar: {
        eyebrow: 'الاعتمادات',
        title: 'اعتمادات المشروع',
        description: 'Matella مشروع تعليمي لتعلّم الرياضيات بطريقة واضحة وعملية وسهلة الوصول.',
        sections: [
            {
                title: 'المحتوى والتصميم',
                paragraphs: ['أُعدّت الوحدات التعليمية والشروحات والتمارين والأنشطة التفاعلية خصيصاً لمشروع Matella.']
            },
            {
                title: 'التقنيات المستخدمة',
                paragraphs: ['بُني الموقع باستخدام React وTypeScript وi18next وKaTeX، مع استخدام Lucide وcanvas-confetti للأيقونات والحركات المساندة.']
            },
            {
                title: 'الهدف التعليمي',
                paragraphs: ['صُممت المواد للاستخدام في الصف والتعلّم الذاتي، مع الجمع بين الشرح النظري والتجريب والتحقق الفوري.']
            }
        ]
    }
}

function normalizeLanguage(language: string): LegalLanguage {
    if (language.startsWith('ar')) return 'ar'
    if (language.startsWith('es')) return 'es'
    return 'eu'
}

function LegalPage({ copy }: { copy: Record<LegalLanguage, LegalCopy> }) {
    const { i18n } = useTranslation()
    const content = copy[normalizeLanguage(i18n.language)]

    return (
        <div className="legal-page">
            <div className="container legal-page-shell">
                <header className="legal-page-header">
                    <span>{content.eyebrow}</span>
                    <h1>{content.title}</h1>
                    <p>{content.description}</p>
                </header>

                <div className="legal-page-sections">
                    {content.sections.map((section) => (
                        <section className="legal-page-card glass" key={section.title}>
                            <h2>{section.title}</h2>
                            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}

export function PrivacyPage() {
    return <LegalPage copy={privacyCopy} />
}

export function CreditsPage() {
    return <LegalPage copy={creditsCopy} />
}
