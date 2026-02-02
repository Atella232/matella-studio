import { useTranslation } from 'react-i18next'
import './AccessibilityPage.css'

export function AccessibilityPage() {
    const { t } = useTranslation()

    return (
        <div className="accessibility-page">
            <div className="container">
                <header className="page-header">
                    <h1>{t('accessibility.title')}</h1>
                    <p className="page-description">{t('accessibility.description')}</p>
                </header>

                <section className="dua-section glass">
                    <h2>Diseño Universal para el Aprendizaje (DUA)</h2>
                    <p>
                        Esta plataforma implementa el marco DUA del CAST Center, reconocido internacionalmente
                        y alineado con el decreto curricular del País Vasco. El DUA se basa en tres principios fundamentales:
                    </p>

                    <div className="dua-principles">
                        <article className="principle-card">
                            <div className="principle-icon">👁️</div>
                            <h3>{t('accessibility.features.perception')}</h3>
                            <ul>
                                <li>Representaciones visuales de fracciones (recta, área, conjuntos)</li>
                                <li>Texto alternativo para todas las imágenes y gráficos</li>
                                <li>Soporte para lectores de pantalla con descripciones matemáticas</li>
                                <li>Modo de alto contraste disponible</li>
                                <li>Texto adaptable (hasta 200% sin pérdida de funcionalidad)</li>
                            </ul>
                        </article>

                        <article className="principle-card">
                            <div className="principle-icon">✍️</div>
                            <h3>{t('accessibility.features.action')}</h3>
                            <ul>
                                <li>Navegación completa por teclado (Tab, Shift+Tab, Enter, Escape)</li>
                                <li>Atajos de teclado para funciones principales</li>
                                <li>Múltiples formas de interactuar (ratón, teclado, táctil)</li>
                                <li>Indicadores de foco visibles y claros</li>
                                <li>Sin dependencia de gestos complejos</li>
                            </ul>
                        </article>

                        <article className="principle-card">
                            <div className="principle-icon">🎯</div>
                            <h3>{t('accessibility.features.engagement')}</h3>
                            <ul>
                                <li>Múltiples contextos de aprendizaje (laboratorio, misiones, práctica)</li>
                                <li>Progresión adaptable al ritmo de cada estudiante</li>
                                <li>Feedback inmediato y constructivo</li>
                                <li>Objetivos claros y desafíos graduales</li>
                                <li>Relevancia cultural (contexto vasco)</li>
                            </ul>
                        </article>
                    </div>
                </section>

                <section className="wcag-section glass">
                    <h2>Conformidad WCAG 2.1</h2>
                    <p>La plataforma cumple con el nivel AA de las Pautas de Accesibilidad para el Contenido Web:</p>

                    <div className="wcag-checklist">
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span><strong>Perceptible:</strong> Información y componentes de interfaz presentables de forma que los usuarios puedan percibirlos</span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span><strong>Operable:</strong> Componentes de navegación e interfaz operables por todos los usuarios</span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span><strong>Comprensible:</strong> Información y operación de interfaz comprensibles</span>
                        </div>
                        <div className="checklist-item">
                            <span className="check-icon">✓</span>
                            <span><strong>Robusto:</strong> Contenido suficientemente robusto para ser interpretado por diversos agentes de usuario</span>
                        </div>
                    </div>
                </section>

                <section className="multilingual-section glass">
                    <h2>Multilingüismo e Inclusión Lingüística</h2>
                    <p>
                        La plataforma respeta la realidad lingüística del País Vasco y la diversidad del alumnado:
                    </p>
                    <ul className="feature-list">
                        <li><strong>Euskera:</strong> Interfaz completa en euskera batua</li>
                        <li><strong>Castellano:</strong> Interfaz completa en español</li>
                        <li><strong>Árabe:</strong> Soporte RTL (derecha a izquierda) para estudiantes de origen árabe</li>
                        <li>Glosario matemático multilingüe con definiciones contextuales</li>
                        <li>Contenido culturalmente relevante (contexto vasco)</li>
                    </ul>
                </section>

                <section className="keyboard-section glass">
                    <h2>Atajos de Teclado</h2>
                    <table className="keyboard-table">
                        <thead>
                            <tr>
                                <th>Atajo</th>
                                <th>Función</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><kbd>Tab</kbd></td>
                                <td>Navegar al siguiente elemento interactivo</td>
                            </tr>
                            <tr>
                                <td><kbd>Shift</kbd> + <kbd>Tab</kbd></td>
                                <td>Navegar al elemento anterior</td>
                            </tr>
                            <tr>
                                <td><kbd>Enter</kbd> / <kbd>Espacio</kbd></td>
                                <td>Activar botón o enlace seleccionado</td>
                            </tr>
                            <tr>
                                <td><kbd>Escape</kbd></td>
                                <td>Cerrar diálogos o cancelar acción</td>
                            </tr>
                            <tr>
                                <td><kbd>←</kbd> <kbd>→</kbd></td>
                                <td>Ajustar valores en controles deslizantes</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

                <section className="contact-section glass">
                    <h2>¿Necesitas ayuda de accesibilidad?</h2>
                    <p>
                        Si encuentras barreras de accesibilidad o necesitas adaptaciones específicas,
                        contacta con el equipo de soporte. Estamos comprometidos con la igualdad de oportunidades
                        en el acceso a la educación matemática.
                    </p>
                </section>
            </div>
        </div>
    )
}
