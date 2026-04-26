import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, RefreshCw, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import './LabPage.css';

interface Equation {
    a: number;
    b: number;
    c: number;
    x: number;
    text: string;
}

const generateNumber = (max: number) => {
    return Math.floor(Math.random() * (max * 2 + 1)) - max;
};

const createEquation = (): Equation => {
    let a = generateNumber(5);
    if (a === 0) a = 1; // Avoid 0 coefficient

    const x = generateNumber(10);
    const b = generateNumber(20);
    const c = a * x + b;
    const bText = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;

    return {
        a, b, c, x,
        text: `${a}x ${bText} = ${c}`
    };
};

export function LabPage() {
    const { t } = useTranslation();
    const [equation, setEquation] = useState<Equation | null>(() => createEquation());
    const [userAnswer, setUserAnswer] = useState<string>('');
    const [feedback, setFeedback] = useState<'idle' | 'success' | 'error'>('idle');
    const [showSolution, setShowSolution] = useState(false);
    const [streak, setStreak] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const generateEquation = () => {
        setEquation(createEquation());
        setUserAnswer('');
        setFeedback('idle');
        setShowSolution(false);

        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const checkAnswer = () => {
        if (!equation) return;

        const parsedAnswer = parseInt(userAnswer, 10);

        if (isNaN(parsedAnswer)) {
            setFeedback('error');
            return;
        }

        if (parsedAnswer === equation.x) {
            setFeedback('success');
            setStreak(s => s + 1);
            setShowSolution(true);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#00f0ff', '#e6007e', '#ffffff']
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

    return (
        <div className="dbh1-algebra-lab">
            <div className="container">
                <header className="page-header">
                    <Link to="/matematika/dbh1/algebra" className="back-button glass">
                        <ArrowLeft className="w-6 h-6" />
                        <span>{t('nav.back')}</span>
                    </Link>
                    <div className="title-container glass">
                        <h1>🧪 {t('algebra.lab.title')}</h1>
                        <p className="subtitle">{t('algebra.lab.subtitle')}</p>
                    </div>
                </header>

                <div className="lab-content">
                    <div className="streak-indicator glass">
                        <span className="streak-icon">🔥</span>
                        <span className="streak-count">{streak}</span>
                        <span className="streak-label">{t('algebra.lab.streak')}</span>
                    </div>

                    <div className="lab-tool-card glass">
                        <div className="tool-header">
                            <h3>{t('algebra.lab.tool_title')}</h3>
                            <button
                                className="btn-icon"
                                onClick={generateEquation}
                                title={t('algebra.lab.new_equation')}
                            >
                                <RefreshCw className="w-5 h-5" />
                            </button>
                        </div>

                        {equation && (
                            <div className="equation-play-area">
                                <div className="equation-display">
                                    {equation.text}
                                </div>

                                <div className="input-area">
                                    <span className="x-label">x = </span>
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
                                </div>

                                <div className="action-buttons">
                                    <button
                                        className="btn-primary"
                                        onClick={checkAnswer}
                                        disabled={!userAnswer || feedback === 'success'}
                                    >
                                        {t('algebra.lab.check')}
                                    </button>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => setShowSolution(true)}
                                        disabled={showSolution}
                                    >
                                        <Lightbulb className="w-4 h-4" />
                                        {t('algebra.lab.show_solution')}
                                    </button>
                                </div>
                            </div>
                        )}

                        {feedback === 'success' && (
                            <div className="feedback-message success glass-success">
                                <CheckCircle className="w-6 h-6" />
                                <span>{t('algebra.lab.correct')}</span>
                            </div>
                        )}

                        {feedback === 'error' && (
                            <div className="feedback-message error glass-error">
                                <XCircle className="w-6 h-6" />
                                <span>{t('algebra.lab.incorrect')}</span>
                            </div>
                        )}

                        {showSolution && equation && (
                            <div className="solution-box glass">
                                <h4>{t('algebra.lab.solution_title')}</h4>
                                <div className="solution-steps">
                                    <p><b>1.</b> {equation.text}</p>
                                    <p><b>2.</b> {equation.a}x = {equation.c} {equation.b >= 0 ? `- ${equation.b}` : `+ ${Math.abs(equation.b)}`}</p>
                                    <p><b>3.</b> {equation.a}x = {equation.c - equation.b}</p>
                                    <p><b>4.</b> x = {equation.c - equation.b} / {equation.a}</p>
                                    <p className="final-answer"><b>x = {equation.x}</b></p>
                                </div>
                                {feedback === 'success' && (
                                    <button className="btn-primary mt-4 w-full" onClick={generateEquation}>
                                        {t('algebra.lab.next_equation')}
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
