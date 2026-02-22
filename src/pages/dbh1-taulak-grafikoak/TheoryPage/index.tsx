import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import './TheoryPage.css';

// Reusable TheoryContent Component
interface TheoryContentProps {
    title: string;
    description?: string;
    sections: {
        title: string;
        content: React.ReactNode;
        icon?: string;
    }[];
}

const TheoryContent: React.FC<TheoryContentProps> = ({ title, description, sections }) => {
    const [openSection, setOpenSection] = useState<number | null>(0);

    const toggleSection = (index: number) => {
        setOpenSection(openSection === index ? null : index);
    };

    return (
        <div className="theory-content-container glass">
            <div className="theory-header text-center mb-8">
                <h2>{title}</h2>
                {description && <p className="theory-description">{description}</p>}
            </div>

            <div className="theory-sections">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`theory-section glass-card ${openSection === index ? 'open' : ''}`}
                    >
                        <button
                            className="section-header"
                            onClick={() => toggleSection(index)}
                            aria-expanded={openSection === index}
                        >
                            <div className="section-title-wrap">
                                {section.icon && <span className="section-icon">{section.icon}</span>}
                                <h3>{section.title}</h3>
                            </div>
                            {openSection === index ? <ChevronUp className="chevron" /> : <ChevronDown className="chevron" />}
                        </button>

                        <div className="section-content-wrapper">
                            <div className="section-content">
                                {section.content}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export function TheoryPage() {
    const { t } = useTranslation();

    const theorySections = [
        {
            title: t('taulakGrafikoak.theory.sections.poblacion'),
            icon: "👥",
            content: (
                <div className="theory-block">
                    <p className="intro-text">{t('taulakGrafikoak.theory.poblacion.description')}</p>

                    <div className="concept-grid">
                        <div className="concept-box box-primary">
                            <h4>{t('taulakGrafikoak.theory.poblacion.population.title')}</h4>
                            <p>{t('taulakGrafikoak.theory.poblacion.population.text')}</p>
                        </div>
                        <div className="concept-box box-success">
                            <h4>{t('taulakGrafikoak.theory.poblacion.sample.title')}</h4>
                            <p>{t('taulakGrafikoak.theory.poblacion.sample.text')}</p>
                        </div>
                        <div className="concept-box box-warning">
                            <h4>{t('taulakGrafikoak.theory.poblacion.individual.title')}</h4>
                            <p>{t('taulakGrafikoak.theory.poblacion.individual.text')}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('taulakGrafikoak.theory.sections.variables'),
            icon: "📋",
            content: (
                <div className="theory-block">
                    <p className="intro-text">{t('taulakGrafikoak.theory.variables.description')}</p>

                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>{t('taulakGrafikoak.theory.variables.qualitative.title')}</th>
                                    <th>{t('taulakGrafikoak.theory.variables.quantitative.title')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <p>{t('taulakGrafikoak.theory.variables.qualitative.text')}</p>
                                    </td>
                                    <td>
                                        <p>{t('taulakGrafikoak.theory.variables.quantitative.text')}</p>
                                        <ul className="custom-bullet-list mt-3">
                                            <li><strong>{t('taulakGrafikoak.theory.variables.quantitative.discrete').split(':')[0]}:</strong> {t('taulakGrafikoak.theory.variables.quantitative.discrete').split(':')[1]}</li>
                                            <li><strong>{t('taulakGrafikoak.theory.variables.quantitative.continuous').split(':')[0]}:</strong> {t('taulakGrafikoak.theory.variables.quantitative.continuous').split(':')[1]}</li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        {
            title: t('taulakGrafikoak.theory.sections.frecuencias'),
            icon: "📊",
            content: (
                <div className="theory-block">
                    <p className="intro-text">{t('taulakGrafikoak.theory.frecuencias.description')}</p>

                    <div className="steps-container">
                        <div className="step-item">
                            <div className="step-number">fi</div>
                            <div className="step-content">
                                <h4>{t('taulakGrafikoak.theory.frecuencias.absolute.title')}</h4>
                                <p>{t('taulakGrafikoak.theory.frecuencias.absolute.text')}</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-number">hi</div>
                            <div className="step-content">
                                <h4>{t('taulakGrafikoak.theory.frecuencias.relative.title')}</h4>
                                <p>{t('taulakGrafikoak.theory.frecuencias.relative.text')}</p>
                            </div>
                        </div>
                        <div className="step-item">
                            <div className="step-number">%</div>
                            <div className="step-content">
                                <h4>{t('taulakGrafikoak.theory.frecuencias.percentage.title')}</h4>
                                <p>{t('taulakGrafikoak.theory.frecuencias.percentage.text')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('taulakGrafikoak.theory.sections.graficos'),
            icon: "📈",
            content: (
                <div className="theory-block">
                    <p className="intro-text">{t('taulakGrafikoak.theory.graficos.description')}</p>

                    <div className="concept-grid two-cols">
                        <div className="concept-box box-info">
                            <h4>📊 {t('taulakGrafikoak.theory.graficos.bar.title')}</h4>
                            <p>{t('taulakGrafikoak.theory.graficos.bar.text')}</p>
                        </div>
                        <div className="concept-box box-purple">
                            <h4>🥧 {t('taulakGrafikoak.theory.graficos.pie.title')}</h4>
                            <p>{t('taulakGrafikoak.theory.graficos.pie.text')}</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: t('taulakGrafikoak.theory.sections.medidas'),
            icon: "📐",
            content: (
                <div className="theory-block">
                    <p className="intro-text">{t('taulakGrafikoak.theory.medidas.description')}</p>

                    <div className="measures-grid">
                        <div className="measure-card">
                            <div className="measure-icon">X̄</div>
                            <div className="measure-info">
                                <h4>{t('taulakGrafikoak.theory.medidas.media.title')}</h4>
                                <p>{t('taulakGrafikoak.theory.medidas.media.text')}</p>
                            </div>
                        </div>

                        <div className="measure-card">
                            <div className="measure-icon">Me</div>
                            <div className="measure-info">
                                <h4>{t('taulakGrafikoak.theory.medidas.mediana.title')}</h4>
                                <p>{t('taulakGrafikoak.theory.medidas.mediana.text')}</p>
                            </div>
                        </div>

                        <div className="measure-card">
                            <div className="measure-icon">Mo</div>
                            <div className="measure-info">
                                <h4>{t('taulakGrafikoak.theory.medidas.moda.title')}</h4>
                                <p>{t('taulakGrafikoak.theory.medidas.moda.text')}</p>
                            </div>
                        </div>

                        <div className="measure-card">
                            <div className="measure-icon">R</div>
                            <div className="measure-info">
                                <h4>{t('taulakGrafikoak.theory.medidas.rango.title')}</h4>
                                <p>{t('taulakGrafikoak.theory.medidas.rango.text')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="theory-page-container">
            <div className="container py-8">
                <header className="page-header mb-8">
                    <Link to="/matematika/dbh1/estadistica" className="back-button glass">
                        <ArrowLeft className="w-5 h-5" />
                        <span>{t('nav.back')}</span>
                    </Link>
                </header>

                <h1 className="page-title text-center mb-8">
                    <span className="title-icon">📚</span>
                    {t('taulakGrafikoak.theory.title')}
                </h1>

                <TheoryContent
                    title={t('taulakGrafikoak.theory.subtitle')}
                    sections={theorySections}
                />
            </div>
        </div>
    );
}
