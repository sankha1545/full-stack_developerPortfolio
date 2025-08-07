import React, { useEffect, useState } from 'react';
import ThreeScene from './components/ThreeScene';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LoadingGate from './components/LoadingGate';
import CursorTrail from './components/CursorTrail';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for dramatic entrance
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {isLoading && <LoadingGate />}
      
      <ThreeScene />
      <CursorTrail />
      
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </div>

      {/* Navigation */}
      <nav className="fixed top-8 right-8 z-50 flex flex-col space-y-4">
        {['Hero', 'About', 'Projects', 'Contact'].map((section, index) => (
          <button
            key={section}
            onClick={() => {
              document.getElementById(section.toLowerCase())?.scrollIntoView({
                behavior: 'smooth'
              });
            }}
            className="w-3 h-3 rounded-full border-2 border-cyan-400 hover:bg-cyan-400 
                     transition-all duration-300 glow-cyan"
            style={{
              boxShadow: '0 0 10px #00ffff, inset 0 0 10px rgba(0,255,255,0.1)'
            }}
          />
        ))}
      </nav>

      {/* Easter egg trigger */}
      <div
        className="fixed bottom-8 left-8 w-8 h-8 cursor-pointer opacity-20 hover:opacity-100 
                   transition-opacity duration-300"
        onClick={() => {
          // Trigger easter egg animation
          const event = new CustomEvent('triggerEasterEgg');
          window.dispatchEvent(event);
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-pink-500 to-cyan-500 rounded-full 
                        animate-pulse glow-rainbow" />
      </div>
    </div>
  );
}

export default App;