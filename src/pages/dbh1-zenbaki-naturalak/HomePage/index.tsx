import { Link } from 'react-router-dom'
import './HomePage.css'

export function HomePage() {
    return (
        <div className="home-page zenbaki-naturalak-home">
            <section className="hero">
                <div className="container">
                    <h1>Numeros Naturales</h1>
                    <h2 className="hero-subtitle">Numeracion, aproximacion y operaciones</h2>
                    <p className="hero-description">
                        Recorrido completo para 1 ESO: sistema decimal, lectura de numeros grandes, redondeo,
                        operaciones y resolucion de problemas con validacion.
                    </p>

                    <div className="hero-cta">
                        <Link to="/matematika/dbh1/zenbaki-naturalak/teoria" className="btn btn-primary">
                            Teoria
                        </Link>
                        <Link to="/matematika/dbh1/zenbaki-naturalak/laboratorio" className="btn btn-primary">
                            Laboratorio
                        </Link>
                        <Link to="/matematika/dbh1/zenbaki-naturalak/retos" className="btn btn-secondary">
                            Erronkak
                        </Link>
                        <Link to="/matematika/dbh1/zenbaki-naturalak/jokuak" className="btn btn-secondary">
                            Jokuak
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <h2>Itinerario del tema</h2>
                    <div className="features-grid">
                        <article className="feature-card glass">
                            <div className="feature-icon">T</div>
                            <h3>Teoria</h3>
                            <p>
                                Diez tarjetas progresivas: valor posicional, lectura y descomposicion, redondeo,
                                operaciones y modelizacion.
                            </p>
                            <Link to="/matematika/dbh1/zenbaki-naturalak/teoria" className="feature-link">
                                Entrar en teoria -&gt;
                            </Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">L</div>
                            <h3>Laboratorio</h3>
                            <p>
                                Ocho herramientas didacticas para observar y manipular: abaco, comparador, redondeo,
                                operaciones, division y detector de errores.
                            </p>
                            <Link to="/matematika/dbh1/zenbaki-naturalak/laboratorio" className="feature-link">
                                Ir al laboratorio -&gt;
                            </Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">E</div>
                            <h3>Erronkak</h3>
                            <p>
                                Nueve problemas por niveles (1-3) con pistas graduadas, comprobacion y resolucion
                                paso a paso.
                            </p>
                            <Link to="/matematika/dbh1/zenbaki-naturalak/retos" className="feature-link">
                                Practicar erronkak -&gt;
                            </Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">J</div>
                            <h3>Jokuak</h3>
                            <p>
                                Tres juegos para automatizar valor posicional, jerarquia de operaciones y division
                                entera en contexto.
                            </p>
                            <Link to="/matematika/dbh1/zenbaki-naturalak/jokuak" className="feature-link">
                                Abrir jokuak -&gt;
                            </Link>
                        </article>

                        <article className="feature-card glass">
                            <div className="feature-icon">A</div>
                            <h3>Accesibilidad</h3>
                            <p>
                                Opciones de lectura y navegacion para mantener una experiencia clara en aula y en casa.
                            </p>
                            <Link to="/accesibilidad" className="feature-link">
                                Ver opciones -&gt;
                            </Link>
                        </article>
                    </div>
                </div>
            </section>

            <section className="curriculum">
                <div className="container">
                    <h2>Objetivos de aprendizaje</h2>
                    <p className="curriculum-intro">
                        Progresion desde comprension del sistema decimal hasta resolucion de problemas con operaciones
                        combinadas y validacion del resultado.
                    </p>

                    <div className="competencies">
                        <div className="competency-card glass">
                            <span className="competency-icon">N</span>
                            <h4>Valor posicional y numeracion</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">O</span>
                            <h4>Operaciones y jerarquia</h4>
                        </div>
                        <div className="competency-card glass">
                            <span className="competency-icon">P</span>
                            <h4>Modelizacion y resolucion de problemas</h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
