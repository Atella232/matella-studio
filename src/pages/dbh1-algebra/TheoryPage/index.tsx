import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import { ArrowLeft, ChevronDown, Puzzle, Equal, Calculator } from 'lucide-react';
import './TheoryPage.css';

export function TheoryPage() {
    const { t } = useTranslation();
    const [expandedSection, setExpandedSection] = useState<string | null>('letras');

    const toggleSection = (id: string) => {
        setExpandedSection(expandedSection === id ? null : id);
    };

    const sections = [
        {
            id: 'letras',
            icon: <Puzzle className="w-6 h-6" />,
            title: t('algebra.theory.sections.letras.title'),
            content: (
                <div className="theory-content">
                    <h3>{t('algebra.theory.sections.letras.subtitle1')}</h3>
                    <p>
                        <Trans i18nKey="algebra.theory.sections.letras.p1">
                            En situaciones donde no conocemos un valor exacto, usamos una letra para representarlo. A esta letra la llamamos <b>incógnita</b> o <b>variable</b>. Esto nos permite generalizar reglas y resolver problemas complejos.
                        </Trans>
                    </p>
                    <div className="example-box glass">
                        <p>
                            <Trans i18nKey="algebra.theory.sections.letras.example1">
                                <b>Ejemplo:</b> Si la edad de Juan es 'x', dentro de 15 años tendrá 'x + 15' años, y hace un año tenía 'x - 1'.
                            </Trans>
                        </p>
                    </div>

                    <h3>{t('algebra.theory.sections.letras.subtitle2')}</h3>
                    <p>{t('algebra.theory.sections.letras.p2')}</p>
                    <div className="concept-box glass">
                        <h4>{t('algebra.theory.sections.letras.components_title')}</h4>
                        <ul>
                            <li>
                                <Trans i18nKey="algebra.theory.sections.letras.c1">
                                    <b>Letras (Variables):</b> Representan valores desconocidos (x, y, a, b...).
                                </Trans>
                            </li>
                            <li>
                                <Trans i18nKey="algebra.theory.sections.letras.c2">
                                    <b>Números (Coeficientes):</b> Los valores conocidos que multiplican a las variables.
                                </Trans>
                            </li>
                            <li>
                                <Trans i18nKey="algebra.theory.sections.letras.c3">
                                    <b>Operaciones:</b> Suma, resta, multiplicación, división, etc.
                                </Trans>
                            </li>
                        </ul>
                    </div>
                    <div className="example-box glass">
                        <p>
                            <Trans i18nKey="algebra.theory.sections.letras.example2">
                                <b>Ejemplos:</b> 3x - 5 (el triple de un número menos cinco), x² + 1 (el cuadrado de un número más uno).
                            </Trans>
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'ecuaciones',
            icon: <Equal className="w-6 h-6" />,
            title: t('algebra.theory.sections.ecuaciones.title'),
            content: (
                <div className="theory-content">
                    <h3>{t('algebra.theory.sections.ecuaciones.subtitle1')}</h3>
                    <p>
                        <Trans i18nKey="algebra.theory.sections.ecuaciones.p1">
                            Una ecuación es una igualdad entre dos expresiones algebraicas que contiene uno o más valores desconocidos (incógnitas). Es como una balanza en equilibrio: lo que hay a un lado del signo igual (=) debe valer lo mismo que lo que hay al otro lado.
                        </Trans>
                    </p>
                    <div className="concept-box glass highlight">
                        <p>
                            <Trans i18nKey="algebra.theory.sections.ecuaciones.goal">
                                <b>El objetivo:</b> Encontrar el valor de la incógnita (normalmente 'x') que hace que la igualdad sea cierta.
                            </Trans>
                        </p>
                    </div>

                    <h3>{t('algebra.theory.sections.ecuaciones.subtitle2')}</h3>
                    <p>{t('algebra.theory.sections.ecuaciones.p2')}</p>

                    <div className="steps-container">
                        <div className="step-card glass">
                            <h4>{t('algebra.theory.sections.ecuaciones.step1_title')}</h4>
                            <p>
                                <Trans i18nKey="algebra.theory.sections.ecuaciones.step1_desc">
                                    Movemos todos los términos que tienen la incógnita (x) a un lado del igual y todos los números al otro lado. <b>Regla clave:</b> lo que está sumando en un lado, pasa restando al otro, y viceversa.
                                </Trans>
                            </p>
                            <div className="math-display">4 + 2x = x + 10 → 2x - x = 10 - 4</div>
                        </div>

                        <div className="step-card glass">
                            <h4>{t('algebra.theory.sections.ecuaciones.step2_title')}</h4>
                            <p>{t('algebra.theory.sections.ecuaciones.step2_desc')}</p>
                            <div className="math-display">2x - x = 10 - 4 → x = 6</div>
                        </div>

                        <div className="step-card glass">
                            <h4>{t('algebra.theory.sections.ecuaciones.step3_title')}</h4>
                            <p>{t('algebra.theory.sections.ecuaciones.step3_desc')}</p>
                            <div className="math-display">3x = 15 → x = 15 / 3 → x = 5</div>
                        </div>
                    </div>

                    <h3>{t('algebra.theory.sections.ecuaciones.subtitle3')}</h3>
                    <p>{t('algebra.theory.sections.ecuaciones.p3')}</p>
                    <div className="example-box glass">
                        <p>
                            <Trans i18nKey="algebra.theory.sections.ecuaciones.problem_example">
                                <b>Problema:</b> Un montón de monedas y una séptima parte de ese montón suman 24 euros. ¿Cuánto vale el montón?<br /><b>Planteamiento:</b> x + (1/7)x = 24<br /><b>Resolución:</b> (8/7)x = 24 → x = (24 × 7) / 8 → x = 21. El montón vale 21 euros.
                            </Trans>
                        </p>
                    </div>
                </div>
            )
        },
        {
            id: 'monomios',
            icon: <Calculator className="w-6 h-6" />,
            title: t('algebra.theory.sections.monomios.title'),
            content: (
                <div className="theory-content">
                    <h3>{t('algebra.theory.sections.monomios.subtitle1')}</h3>
                    <p>
                        <Trans i18nKey="algebra.theory.sections.monomios.p1">
                            Solo se pueden sumar o restar monomios <b>semejantes</b>, es decir, aquellos que tienen la misma parte literal (mismas letras con los mismos exponentes).
                        </Trans>
                    </p>
                    <div className="concept-box glass">
                        <h4>{t('algebra.theory.sections.monomios.rule_title')}</h4>
                        <p>{t('algebra.theory.sections.monomios.rule_desc')}</p>
                    </div>
                    <div className="example-box glass">
                        <p>
                            <Trans i18nKey="algebra.theory.sections.monomios.example1">
                                <b>Semejantes:</b> 4x + 2x = 6x<br /><b>No semejantes:</b> 3a + 2b (no se puede simplificar)
                            </Trans>
                        </p>
                    </div>

                    <h3>{t('algebra.theory.sections.monomios.subtitle2')}</h3>
                    <p>{t('algebra.theory.sections.monomios.p2')}</p>

                    <div className="rules-grid">
                        <div className="rule-card glass">
                            <h4>{t('algebra.theory.sections.monomios.mult_title')}</h4>
                            <p>{t('algebra.theory.sections.monomios.mult_desc')}</p>
                            <div className="math-display">(3x²) · (2x³) = (3 · 2)x²⁺³ = 6x⁵</div>
                        </div>

                        <div className="rule-card glass">
                            <h4>{t('algebra.theory.sections.monomios.div_title')}</h4>
                            <p>{t('algebra.theory.sections.monomios.div_desc')}</p>
                            <div className="math-display">(6x⁵) / (2x²) = (6 / 2)x⁵⁻² = 3x³</div>
                        </div>

                        <div className="rule-card glass">
                            <h4>{t('algebra.theory.sections.monomios.dist_title')}</h4>
                            <p>{t('algebra.theory.sections.monomios.dist_desc')}</p>
                            <div className="math-display">2x(x² + 3y) = 2x³ + 6xy</div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="dbh1-algebra-theory">
            <div className="container">
                <header className="page-header">
                    <Link to="/matematika/dbh1/algebra" className="back-button glass">
                        <ArrowLeft className="w-6 h-6" />
                        <span>{t('nav.back')}</span>
                    </Link>
                    <div className="title-container glass">
                        <h1>📚 {t('nav.theory')}</h1>
                        <p className="subtitle">{t('algebra.title')}</p>
                    </div>
                </header>

                <div className="theory-accordion">
                    {sections.map((section) => (
                        <div
                            key={section.id}
                            className={`accordion-item glass ${expandedSection === section.id ? 'expanded' : ''}`}
                        >
                            <button
                                className="accordion-header"
                                onClick={() => toggleSection(section.id)}
                                aria-expanded={expandedSection === section.id}
                            >
                                <div className="header-content">
                                    <div className="icon-container">{section.icon}</div>
                                    <h2>{section.title}</h2>
                                </div>
                                <ChevronDown className="chevron-icon" />
                            </button>

                            <div className="accordion-body">
                                <div className="accordion-content">
                                    {section.content}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
