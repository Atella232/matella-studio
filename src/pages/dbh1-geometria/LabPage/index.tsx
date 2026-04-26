import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import './LabPage.css';

type ShapeType = 'square' | 'rectangle' | 'triangle' | 'circle';

interface GeometryProblem {
    type: ShapeType;
    dimensions: {
        side?: number;
        base?: number;
        height?: number;
        radius?: number;
    };
    area: number;
}

const createProblem = (): GeometryProblem => {
    const types: ShapeType[] = ['square', 'rectangle', 'triangle', 'circle'];
    const type = types[Math.floor(Math.random() * types.length)];
    const dimensions: GeometryProblem['dimensions'] = {};
    let area = 0;

    switch (type) {
        case 'square':
            dimensions.side = Math.floor(Math.random() * 10) + 2;
            area = dimensions.side * dimensions.side;
            break;
        case 'rectangle':
            dimensions.base = Math.floor(Math.random() * 10) + 3;
            dimensions.height = Math.floor(Math.random() * 8) + 2;
            if (dimensions.base === dimensions.height) dimensions.base += 1;
            area = dimensions.base * dimensions.height;
            break;
        case 'triangle':
            dimensions.base = Math.floor(Math.random() * 8) + 2;
            dimensions.height = Math.floor(Math.random() * 8) + 2;
            if ((dimensions.base * dimensions.height) % 2 !== 0) {
                dimensions.base += 1;
            }
            area = (dimensions.base * dimensions.height) / 2;
            break;
        case 'circle':
            dimensions.radius = Math.floor(Math.random() * 5) + 2;
            area = Math.round(Math.PI * dimensions.radius * dimensions.radius);
            break;
    }

    return { type, dimensions, area };
};

export function LabPage() {
    const { t } = useTranslation();
    const [problem, setProblem] = useState<GeometryProblem | null>(() => createProblem());
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
    const [showSolution, setShowSolution] = useState(false);
    const [streak, setStreak] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const generateProblem = () => {
        setProblem(createProblem());
        setUserAnswer('');
        setFeedback('idle');
        setShowSolution(false);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const checkAnswer = () => {
        if (!problem) return;

        const parsedAnswer = parseInt(userAnswer, 10);

        if (isNaN(parsedAnswer)) {
            setFeedback('error');
            return;
        }

        const isCorrect = problem.type === 'circle'
            ? Math.abs(parsedAnswer - problem.area) <= 1
            : parsedAnswer === problem.area;

        if (isCorrect) {
            setFeedback('success');
            setStreak(s => s + 1);
            setShowSolution(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00d2ff', '#00ff88', '#ffffff']
            });
        } else {
            setFeedback('error');
            setStreak(0);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    const renderShapeIcon = () => {
        if (!problem) return null;
        switch (problem.type) {
            case 'square': return <div className="shape-icon square" />;
            case 'rectangle': return <div className="shape-icon rectangle" />;
            case 'triangle': return <div className="shape-icon triangle" />;
            case 'circle': return <div className="shape-icon circle" />;
        }
    };

    return (
        <div className="dbh1-geometria-lab">
            <div className="container">
                <header className="page-header">
                    <Link to="/matematika/dbh1/geometria" className="back-button glass">
                        <ArrowLeft className="w-6 h-6" />
                        <span>{t('nav.back')}</span>
                    </Link>
                    <div className="title-container glass">
                        <h1>🧪 {t('geometria.lab.title')}</h1>
                        <p className="subtitle">{t('geometria.lab.subtitle')}</p>
                    </div>
                </header>

                <div className="lab-content">
                    <div className="streak-indicator glass">
                        <span className="streak-icon">🔥</span>
                        <span className="streak-count">{streak}</span>
                        <span className="streak-label">{t('geometria.lab.streak')}</span>
                    </div>

                    <div className="lab-tool-card glass">
                        <div className="tool-header">
                            <h3>{t('geometria.lab.tool_title')}</h3>
                            <button
                                className="btn-icon"
                                onClick={generateProblem}
                                title={t('geometria.lab.new_problem')}
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>

                        {problem && (
                            <div className="problem-play-area">

                                <div className="shape-visualization glass">
                                    {renderShapeIcon()}
                                    <div className="dimensions-labels">
                                        {problem.dimensions.side && <span>{t('geometria.lab.side')}: {problem.dimensions.side}</span>}
                                        {problem.dimensions.base && <span>{t('geometria.lab.base')}: {problem.dimensions.base}</span>}
                                        {problem.dimensions.height && <span>{t('geometria.lab.height')}: {problem.dimensions.height}</span>}
                                        {problem.dimensions.radius && <span>{t('geometria.lab.radius')}: {problem.dimensions.radius}</span>}
                                    </div>
                                </div>

                                <p className="problem-instruction">
                                    {problem.type === 'circle' ? t('geometria.lab.find_area_rounded') : t('geometria.lab.find_area')}
                                </p>

                                <div className="input-area">
                                    <span className="area-label">Area = </span>
                                    <input
                                        ref={inputRef}
                                        type="number"
                                        className={`answer-input ${feedback}`}
                                        value={userAnswer}
                                        onChange={(e) => {
                                            setUserAnswer(e.target.value);
                                            if (feedback !== 'idle') setFeedback('idle');
                                        }}
                                        onKeyDown={handleKeyDown}
                                        placeholder="?"
                                        disabled={feedback === 'success'}
                                    />
                                    <span className="unit-label">u²</span>
                                </div>

                                <div className="action-buttons">
                                    <button
                                        className="btn-primary"
                                        onClick={checkAnswer}
                                        disabled={!userAnswer || feedback === 'success'}
                                    >
                                        {t('geometria.lab.check')}
                                    </button>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => setShowSolution(true)}
                                        disabled={showSolution}
                                    >
                                        <Lightbulb className="w-4 h-4" />
                                        {t('geometria.lab.show_solution')}
                                    </button>
                                </div>
                            </div>
                        )}

                        {feedback === 'success' && (
                            <div className="feedback-message success glass-success">
                                <CheckCircle className="w-6 h-6" />
                                <span>{t('geometria.lab.correct')}</span>
                            </div>
                        )}

                        {feedback === 'error' && (
                            <div className="feedback-message error glass-error">
                                <XCircle className="w-6 h-6" />
                                <span>{t('geometria.lab.incorrect')}</span>
                            </div>
                        )}

                        {showSolution && problem && (
                            <div className="solution-box glass">
                                <h4>{t('geometria.lab.solution_title')}</h4>
                                <div className="solution-steps">
                                    {problem.type === 'square' && <p>A = lado² = {problem.dimensions.side}² = {problem.area}</p>}
                                    {problem.type === 'rectangle' && <p>A = base × altura = {problem.dimensions.base} × {problem.dimensions.height} = {problem.area}</p>}
                                    {problem.type === 'triangle' && <p>A = (base × altura) / 2 = ({problem.dimensions.base} × {problem.dimensions.height}) / 2 = {problem.area}</p>}
                                    {problem.type === 'circle' && <p>A = π × radio² = π × {problem.dimensions.radius}² ≈ {problem.area}</p>}
                                </div>
                                {feedback === 'success' && (
                                    <button className="btn-primary mt-4 w-full" onClick={generateProblem}>
                                        {t('geometria.lab.next_problem')}
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
