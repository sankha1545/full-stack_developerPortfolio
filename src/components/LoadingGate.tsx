import React, { useEffect, useRef } from 'react';
import anime from 'animejs/lib/anime.es.js';


const LoadingGate: React.FC = () => {
  const gateRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial animation - gates closing (they start open)
    const tl = anime.timeline();
    
    // Loading animation
    tl.add({
      targets: '.loading-text',
      opacity: [0, 1],
      scale: [0.8, 1],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)',
    })
    .add({
      targets: '.loading-bar',
      scaleX: [0, 1],
      duration: 2000,
      easing: 'easeInOutQuart',
    }, '-=500')
    .add({
      targets: '.loading-text',
      opacity: [1, 0],
      scale: [1, 0.8],
      duration: 500,
      easing: 'easeInQuart',
    }, '+=200');

    // Gate opening animation
    setTimeout(() => {
      anime({
        targets: leftPanelRef.current,
        translateX: '-100%',
        duration: 1500,
        easing: 'easeInOutQuart',
      });

      anime({
        targets: rightPanelRef.current,
        translateX: '100%',
        duration: 1500,
        easing: 'easeInOutQuart',
        complete: () => {
          if (gateRef.current) {
            gateRef.current.style.display = 'none';
          }
        }
      });
    }, 2500);
  }, []);

  return (
    <div 
      ref={gateRef}
      className="fixed inset-0 z-50 flex overflow-hidden"
    >
      {/* Left Panel */}
      <div 
        ref={leftPanelRef}
        className="relative flex items-center justify-end w-1/2 h-full pr-8 overflow-hidden bg-gradient-to-r from-black via-gray-900 to-gray-800"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-full bg-gradient-to-b from-cyan-500 to-transparent animate-pulse"
              style={{
                left: `${i * 5}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="text-6xl font-bold opacity-0 text-cyan-400 loading-text">
          PORT
        </div>
      </div>

      {/* Right Panel */}
      <div 
        ref={rightPanelRef}
        className="relative flex items-center justify-start w-1/2 h-full pl-8 overflow-hidden bg-gradient-to-l from-black via-gray-900 to-gray-800"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-full bg-gradient-to-b from-pink-500 to-transparent animate-pulse"
              style={{
                right: `${i * 5}%`,
                animationDelay: `${i * 100}ms`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
        
        <div className="text-6xl font-bold text-pink-500 opacity-0 loading-text">
          FOLIO
        </div>
      </div>

      {/* Center Loading Indicator */}
      <div className="absolute text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="w-32 h-1 mb-4 overflow-hidden bg-gray-800 rounded-full">
          <div className="h-full origin-left scale-x-0 rounded-full loading-bar bg-gradient-to-r from-cyan-500 to-pink-500" />
        </div>
        <div className="text-sm text-white opacity-0 opacity-60 loading-text">
          Loading Experience...
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingGate;