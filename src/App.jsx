import React, { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground';
import ProgressIndicator from './components/ProgressIndicator';
import MusicButton from './components/MusicButton';
import WelcomePage from './components/WelcomePage';
import BirthdayCafe from './components/BirthdayCafe';
import BalloonPage from './components/BalloonPage';
import CakePage from './components/CakePage';
import MemoryPage from './components/MemoryPage';
import LetterPage from './components/LetterPage';
import GiftShop from './components/GiftShop';
import FinalCelebration from './components/FinalCelebration';
import './App.css';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToStep = (stepNumber) => {
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: 'instant' });

    setTimeout(() => {
      setCurrentStep(stepNumber);
      setIsTransitioning(false);
    }, 280);
  };

  return (
    <div className="birthday-journey-app">
      {/* Dynamic Ambient Background Canvas */}
      <AmbientBackground />

      {/* Floating Header HUD: Step Progress & Music Control */}
      <header className="journey-top-hud" role="banner">
        <ProgressIndicator currentStep={currentStep} totalSteps={7} />
        <MusicButton />
      </header>

      {/* Discrete Single-Screen Viewport Container */}
      <main
        className={`journey-screen-container ${
          isTransitioning ? 'page-transition-exit' : 'page-transition-enter'
        }`}
      >
        {currentStep === 1 && (
          <WelcomePage onEnter={() => goToStep(2)} />
        )}

        {currentStep === 2 && (
          <BirthdayCafe onContinue={() => goToStep(3)} />
        )}

        {currentStep === 3 && (
          <BalloonPage onContinue={() => goToStep(4)} />
        )}

        {currentStep === 4 && (
          <CakePage onContinue={() => goToStep(5)} />
        )}

        {currentStep === 5 && (
          <MemoryPage onContinue={() => goToStep(6)} />
        )}

        {currentStep === 6 && (
          <LetterPage onContinue={() => goToStep(7)} />
        )}

        {currentStep === 7 && (
          <GiftShop onContinue={() => goToStep(8)} />
        )}

        {currentStep === 8 && (
          <FinalCelebration onRestart={() => goToStep(1)} />
        )}
      </main>
    </div>
  );
}
