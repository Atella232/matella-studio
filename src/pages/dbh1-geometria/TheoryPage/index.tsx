import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import './TheoryPage.css';

interface TheorySection {
    id: string;
    titleKey: string;
    content: React.ReactNode;
}

export function TheoryPage() {
    const { t } = useTranslation();
    const [activeSection, setActiveSection] = useState<string | null>('triangles');

    const toggleSection = (id: string) => {
        setActiveSection(activeSection === id ? null : id);
    };

    const sections: TheorySection[] = [
        {
            id: 'triangles',
            titleKey: 'geometria.theory.triangles.title',
            content: (
                <div className="theory-section-content">
                    <p>{t('geometria.theory.triangles.intro')}</p>

                    <h4>{t('geometria.theory.triangles.by_sides.title')}</h4>
                    <div className="table-responsive glass">
                        <table className="geometria-table">
                            <thead>
                                <tr>
                                    <th>{t('geometria.theory.table.type')}</th>
                                    <th>{t('geometria.theory.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>{t('geometria.theory.triangles.by_sides.equilateral.name')}</strong></td>
                                    <td>{t('geometria.theory.triangles.by_sides.equilateral.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.triangles.by_sides.isosceles.name')}</strong></td>
                                    <td>{t('geometria.theory.triangles.by_sides.isosceles.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.triangles.by_sides.scalene.name')}</strong></td>
                                    <td>{t('geometria.theory.triangles.by_sides.scalene.desc')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4 className="mt-4">{t('geometria.theory.triangles.by_angles.title')}</h4>
                    <div className="table-responsive glass">
                        <table className="geometria-table">
                            <thead>
                                <tr>
                                    <th>{t('geometria.theory.table.type')}</th>
                                    <th>{t('geometria.theory.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>{t('geometria.theory.triangles.by_angles.acute.name')}</strong></td>
                                    <td>{t('geometria.theory.triangles.by_angles.acute.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.triangles.by_angles.right.name')}</strong></td>
                                    <td>{t('geometria.theory.triangles.by_angles.right.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.triangles.by_angles.obtuse.name')}</strong></td>
                                    <td>{t('geometria.theory.triangles.by_angles.obtuse.desc')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        {
            id: 'quadrilaterals',
            titleKey: 'geometria.theory.quadrilaterals.title',
            content: (
                <div className="theory-section-content">
                    <h4>{t('geometria.theory.quadrilaterals.parallelograms.title')}</h4>
                    <p>{t('geometria.theory.quadrilaterals.parallelograms.desc')}</p>
                    <div className="table-responsive glass">
                        <table className="geometria-table">
                            <thead>
                                <tr>
                                    <th>{t('geometria.theory.table.type')}</th>
                                    <th>{t('geometria.theory.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>{t('geometria.theory.quadrilaterals.parallelograms.square.name')}</strong></td>
                                    <td>{t('geometria.theory.quadrilaterals.parallelograms.square.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.quadrilaterals.parallelograms.rectangle.name')}</strong></td>
                                    <td>{t('geometria.theory.quadrilaterals.parallelograms.rectangle.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.quadrilaterals.parallelograms.rhombus.name')}</strong></td>
                                    <td>{t('geometria.theory.quadrilaterals.parallelograms.rhombus.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.quadrilaterals.parallelograms.rhomboid.name')}</strong></td>
                                    <td>{t('geometria.theory.quadrilaterals.parallelograms.rhomboid.desc')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h4 className="mt-4">{t('geometria.theory.quadrilaterals.non_parallelograms.title')}</h4>
                    <div className="table-responsive glass">
                        <table className="geometria-table">
                            <thead>
                                <tr>
                                    <th>{t('geometria.theory.table.type')}</th>
                                    <th>{t('geometria.theory.table.description')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>{t('geometria.theory.quadrilaterals.non_parallelograms.trapezium.name')}</strong></td>
                                    <td>{t('geometria.theory.quadrilaterals.non_parallelograms.trapezium.desc')}</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.quadrilaterals.non_parallelograms.trapezoid.name')}</strong></td>
                                    <td>{t('geometria.theory.quadrilaterals.non_parallelograms.trapezoid.desc')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        },
        {
            id: 'pythagoras',
            titleKey: 'geometria.theory.pythagoras.title',
            content: (
                <div className="theory-section-content">
                    <p>{t('geometria.theory.pythagoras.desc')}</p>
                    <div className="formula-box glass">
                        <p className="formula">a² + b² = c²</p>
                        <p className="formula-legend">{t('geometria.theory.pythagoras.legend')}</p>
                    </div>
                </div>
            )
        },
        {
            id: 'areas_perimeters',
            titleKey: 'geometria.theory.areas_perimeters.title',
            content: (
                <div className="theory-section-content">
                    <p>{t('geometria.theory.areas_perimeters.desc')}</p>
                    <div className="table-responsive glass">
                        <table className="geometria-table">
                            <thead>
                                <tr>
                                    <th>{t('geometria.theory.table.figure')}</th>
                                    <th>{t('geometria.theory.table.area')}</th>
                                    <th>{t('geometria.theory.table.perimeter')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>{t('geometria.theory.areas_perimeters.square.name')}</strong></td>
                                    <td className="formula-cell">lado²</td>
                                    <td className="formula-cell">4 · lado</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.areas_perimeters.rectangle.name')}</strong></td>
                                    <td className="formula-cell">base · altura</td>
                                    <td className="formula-cell">2 · (base + altura)</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.areas_perimeters.triangle.name')}</strong></td>
                                    <td className="formula-cell">(base · altura) / 2</td>
                                    <td className="formula-cell">l₁ + l₂ + l₃</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.areas_perimeters.circle.name')}</strong></td>
                                    <td className="formula-cell">π · radio²</td>
                                    <td className="formula-cell">2 · π · radio</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.areas_perimeters.rhombus.name')}</strong></td>
                                    <td className="formula-cell">(D · d) / 2</td>
                                    <td className="formula-cell">4 · lado</td>
                                </tr>
                                <tr>
                                    <td><strong>{t('geometria.theory.areas_perimeters.trapezium.name')}</strong></td>
                                    <td className="formula-cell">((B + b) · h) / 2</td>
                                    <td className="formula-cell">{t('geometria.theory.areas_perimeters.trapezium.perimeter_desc')}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="dbh1-geometria-theory">
            <div className="container">
                <header className="page-header">
                    <Link to="/matematika/dbh1/geometria" className="back-button glass">
                        <ArrowLeft className="w-6 h-6" />
                        <span>{t('nav.back')}</span>
                    </Link>
                    <div className="title-container glass">
                        <h1>📚 {t('geometria.theory.page_title')}</h1>
                        <p className="subtitle">{t('geometria.theory.page_subtitle')}</p>
                    </div>
                </header>

                <div className="theory-content">
                    <div className="accordion">
                        {sections.map((section) => (
                            <div
                                key={section.id}
                                className={`accordion-item glass ${activeSection === section.id ? 'active' : ''}`}
                            >
                                <button
                                    className="accordion-header"
                                    onClick={() => toggleSection(section.id)}
                                    aria-expanded={activeSection === section.id}
                                >
                                    <h3>{t(section.titleKey)}</h3>
                                    {activeSection === section.id ? (
                                        <ChevronUp className="w-6 h-6" />
                                    ) : (
                                        <ChevronDown className="w-6 h-6" />
                                    )}
                                </button>
                                <div
                                    className="accordion-collapse"
                                    style={{
                                        maxHeight: activeSection === section.id ? '2000px' : '0',
                                        opacity: activeSection === section.id ? 1 : 0
                                    }}
                                >
                                    <div className="accordion-body">
                                        {section.content}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
