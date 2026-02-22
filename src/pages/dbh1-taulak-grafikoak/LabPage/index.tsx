import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart2, Calculator, Database, Filter } from 'lucide-react';
import './LabPage.css';

// --- Frequency Table Component ---
const FrequencyTableLab = () => {
    const { t } = useTranslation();
    const [dataParams, setDataParams] = useState({
        categories: '',
        frequencies: ''
    });

    // Default example data
    const categoriesList = dataParams.categories ? dataParams.categories.split(',').map(s => s.trim()) : ['Gorria', 'Urdina', 'Berdea', 'Horia'];
    const freqsList = dataParams.frequencies ? dataParams.frequencies.split(',').map(s => parseInt(s.trim()) || 0) : [5, 8, 4, 3];

    // Ensure lists match length
    const len = Math.min(categoriesList.length, freqsList.length);
    const validCats = categoriesList.slice(0, len);
    const validFreqs = freqsList.slice(0, len);

    const total = validFreqs.reduce((sum, f) => sum + f, 0);

    return (
        <div className="lab-module glass-card">
            <h3><Database className="inline-icon" /> {t('taulakGrafikoak.lab.tools.frequencyTable.title')}</h3>
            <p className="module-desc">{t('taulakGrafikoak.lab.tools.frequencyTable.description')}</p>

            <div className="input-group">
                <input
                    type="text"
                    placeholder="Kategoriak (komaz bereizita)"
                    value={dataParams.categories}
                    onChange={e => setDataParams({ ...dataParams, categories: e.target.value })}
                    className="glass-input"
                />
                <input
                    type="text"
                    placeholder="Maiztasun absolutuak (komaz bereizita)"
                    value={dataParams.frequencies}
                    onChange={e => setDataParams({ ...dataParams, frequencies: e.target.value })}
                    className="glass-input"
                />
            </div>

            <div className="table-wrapper">
                <table className="freq-table">
                    <thead>
                        <tr>
                            <th>Datuak (xi)</th>
                            <th>M. Absolutua (fi)</th>
                            <th>M. Erlatiboa (hi)</th>
                            <th>Ehunekoa (%)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {validCats.map((cat, i) => {
                            const fi = validFreqs[i];
                            const hi = total ? (fi / total) : 0;
                            const pct = total ? (hi * 100) : 0;
                            return (
                                <tr key={i}>
                                    <td>{cat}</td>
                                    <td className="highlight-val">{fi}</td>
                                    <td>{hi.toFixed(2)}</td>
                                    <td>{pct.toFixed(1)}%</td>
                                </tr>
                            );
                        })}
                        <tr className="total-row">
                            <td>Total</td>
                            <td className="highlight-val">{total}</td>
                            <td>{total ? '1.00' : '0.00'}</td>
                            <td>{total ? '100%' : '0%'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- Basic Statistical Calculator Component ---
const StatCalculatorLab = () => {
    const { t } = useTranslation();
    const [dataset, setDataset] = useState('5, 8, 2, 4, 8, 9, 3, 5, 8');

    const numbers = dataset.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));

    let mean = 0, median = 0, mode = 0, range = 0;

    if (numbers.length > 0) {
        mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

        const sorted = [...numbers].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

        range = sorted[sorted.length - 1] - sorted[0];

        const counts = numbers.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {} as Record<number, number>);

        const maxCount = Math.max(...Object.values(counts));
        const modes = Object.keys(counts).filter(k => counts[parseFloat(k)] === maxCount);
        mode = parseFloat(modes[0]); // simplify to one mode for display
    }

    return (
        <div className="lab-module glass-card">
            <h3><Calculator className="inline-icon" /> {t('taulakGrafikoak.lab.tools.calculator.title')}</h3>
            <p className="module-desc">{t('taulakGrafikoak.lab.tools.calculator.description')}</p>

            <textarea
                value={dataset}
                onChange={e => setDataset(e.target.value)}
                className="glass-textarea"
                placeholder="Idatzi zenbakiak komaz bereizita..."
                rows={3}
            />

            <div className="stat-results">
                <div className="stat-card box-primary">
                    <span className="stat-label">Batez bestekoa (X̄)</span>
                    <span className="stat-value">{mean.toFixed(2)}</span>
                </div>
                <div className="stat-card box-success">
                    <span className="stat-label">Mediana (Me)</span>
                    <span className="stat-value">{median}</span>
                </div>
                <div className="stat-card box-warning">
                    <span className="stat-label">Moda (Mo)</span>
                    <span className="stat-value">{mode}</span>
                </div>
                <div className="stat-card box-purple">
                    <span className="stat-label">Ibilbidea (R)</span>
                    <span className="stat-value">{range}</span>
                </div>
            </div>
        </div>
    );
};

// --- Custom Graph Creator ---
const GraphCreatorLab = () => {
    const { t } = useTranslation();
    const data = [
        { label: 'Gorria', value: 30, color: '#ef4444' },
        { label: 'Urdina', value: 45, color: '#3b82f6' },
        { label: 'Berdea', value: 25, color: '#10b981' }
    ];

    const maxVal = Math.max(...data.map(d => d.value));

    // Simple Conic Gradient for Pie Chart
    let currentAngle = 0;
    const pieStops = data.map(d => {
        const percentage = d.value / 100;
        const start = currentAngle;
        const end = start + percentage * 360;
        currentAngle = end;
        return `${d.color} ${start}deg ${end}deg`;
    }).join(', ');

    return (
        <div className="lab-module glass-card">
            <h3><BarChart2 className="inline-icon" /> {t('taulakGrafikoak.lab.tools.graphCreator.title')}</h3>
            <p className="module-desc">{t('taulakGrafikoak.lab.tools.graphCreator.description')}</p>

            <div className="graphs-container">
                <div className="graph-box">
                    <h4 className="text-center mb-4">Barra diagramak</h4>
                    <div className="bar-chart">
                        {data.map((d, i) => (
                            <div key={i} className="bar-wrapper">
                                <div className="bar-value">{d.value}</div>
                                <div
                                    className="bar"
                                    style={{
                                        height: `${(d.value / maxVal) * 100}%`,
                                        backgroundColor: d.color,
                                        boxShadow: `0 0 10px ${d.color}80`
                                    }}
                                ></div>
                                <div className="bar-label">{d.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="graph-box">
                    <h4 className="text-center mb-4">Sektore diagramak</h4>
                    <div className="pie-chart-wrapper">
                        <div
                            className="pie-chart"
                            style={{ background: `conic-gradient(${pieStops})` }}
                        ></div>
                        <div className="pie-legend">
                            {data.map((d, i) => (
                                <div key={i} className="legend-item">
                                    <span className="color-dot" style={{ backgroundColor: d.color }}></span>
                                    {d.label} ({d.value}%)
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Variable Classifier Interactive Tool ---
const VariableClassifierLab = () => {
    const { t } = useTranslation();
    const [score, setScore] = useState(0);
    const [currentVariableIndex, setCurrentVariableIndex] = useState(0);
    const [feedback, setFeedback] = useState<{ message: string, isCorrect: boolean } | null>(null);

    const variables = [
        { text: "Pertsona baten begien kolorea", type: "qualitative", typeName: "Kualitatiboa" },
        { text: "Familia bateko seme-alaba kopurua", type: "discrete", typeName: "Kuantitatibo diskretua" },
        { text: "Ikasle baten altuera", type: "continuous", typeName: "Kuantitatibo jarraitua" },
        { text: "Ibilgailu baten marka", type: "qualitative", typeName: "Kualitatiboa" },
        { text: "Azterketa bateko nota (0-10)", type: "continuous", typeName: "Kuantitatibo jarraitua" }
    ];

    const handleAnswer = (selectedType: string) => {
        const correct = variables[currentVariableIndex].type === selectedType;
        if (correct) {
            setScore(s => s + 1);
            setFeedback({ message: "Zuzena!", isCorrect: true });
        } else {
            setFeedback({
                message: `Okerra. '${variables[currentVariableIndex].text}' aldagai ${variables[currentVariableIndex].typeName} da.`,
                isCorrect: false
            });
        }

        setTimeout(() => {
            setFeedback(null);
            setCurrentVariableIndex((prev) => (prev + 1) % variables.length);
        }, 2500);
    };

    const currentVar = variables[currentVariableIndex];

    return (
        <div className="lab-module glass-card">
            <h3><Filter className="inline-icon" /> {t('taulakGrafikoak.lab.tools.variableClassifier.title')}</h3>
            <p className="module-desc">{t('taulakGrafikoak.lab.tools.variableClassifier.description')}</p>

            <div className="classifier-game">
                <div className="score-display">Puntuazioa: <span>{score}</span></div>

                <div className="variable-prompt glass-morphic">
                    <h4>Identifikatu aldagai mota:</h4>
                    <p className="variable-text">"{currentVar.text}"</p>
                </div>

                {feedback ? (
                    <div className={`feedback-message ${feedback.isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                        {feedback.message}
                    </div>
                ) : (
                    <div className="classifier-options">
                        <button className="classifier-btn box-primary" onClick={() => handleAnswer('qualitative')}>
                            Kualitatiboa
                        </button>
                        <button className="classifier-btn box-success" onClick={() => handleAnswer('discrete')}>
                            Kuant. Diskretua
                        </button>
                        <button className="classifier-btn box-warning" onClick={() => handleAnswer('continuous')}>
                            Kuant. Jarraitua
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export function LabPage() {
    const { t } = useTranslation();

    return (
        <div className="dbh1-taulak-grafikoak-lab">
            <div className="container py-8">
                <header className="page-header mb-8">
                    <Link to="/matematika/dbh1/estadistica" className="back-button glass">
                        <ArrowLeft className="w-5 h-5" />
                        <span>{t('nav.back')}</span>
                    </Link>
                </header>

                <div className="lab-header text-center mb-12">
                    <h1 className="page-title">
                        <span className="title-icon">🧪</span>
                        {t('taulakGrafikoak.lab.title')}
                    </h1>
                    <p className="lab-subtitle">{t('taulakGrafikoak.lab.subtitle')}</p>
                </div>

                <div className="lab-grid">
                    <FrequencyTableLab />
                    <StatCalculatorLab />
                    <GraphCreatorLab />
                    <VariableClassifierLab />
                </div>
            </div>
        </div>
    );
}
