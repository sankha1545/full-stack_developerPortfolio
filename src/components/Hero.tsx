import React, { useEffect, useRef, useState, MouseEvent } from 'react';
import anime from 'animejs/lib/anime.es.js';
import { Code, Sparkles, X } from 'lucide-react';
import resumePDF from '/public/assets/Sankha subhra Das.pdf'
// Ensure you have resume.pdf in your public/ folder.
// If you'd rather import it from src/assets/, uncomment below:
// import resumePDF from '../assets/resume.pdf';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const topHandleRef = useRef<HTMLDivElement>(null);
  const bottomHandleRef = useRef<HTMLDivElement>(null);
  const parchmentRef = useRef<HTMLDivElement>(null);
  const [isDecreeOpen, setIsDecreeOpen] = useState(false);

  useEffect(() => {
    const tl = anime.timeline({ autoplay: false });

    tl
      .add({
        targets: logoRef.current,
        scale: [0, 1],
        rotate: [180, 0],
        opacity: [0, 1],
        duration: 1500,
        easing: 'easeOutElastic(1, .8)',
        delay: 500,
      })
      .add(
        {
          targets: textRef.current?.children,
          translateY: [50, 0],
          opacity: [0, 1],
          duration: 800,
          delay: anime.stagger(200),
          easing: 'easeOutQuart',
        },
        '-=800'
      );

    setTimeout(() => tl.play(), 1000);

    const handleEasterEgg = () => {
      anime({
        targets: logoRef.current,
        scale: [1, 1.5, 1],
        rotate: '+=360',
        duration: 2000,
        easing: 'easeInOutQuart',
      });
      anime({
        targets: '.particle-burst',
        scale: [0, 2],
        opacity: [1, 0],
        duration: 1500,
        delay: anime.stagger(100),
        easing: 'easeOutQuart',
      });
    };

    window.addEventListener('triggerEasterEgg', handleEasterEgg);
    return () => window.removeEventListener('triggerEasterEgg', handleEasterEgg);
  }, []);

  const openDecree = (e: MouseEvent) => {
    e.preventDefault();
    setIsDecreeOpen(true);

    setTimeout(() => {
      if (
        parchmentRef.current &&
        scrollContentRef.current &&
        topHandleRef.current &&
        bottomHandleRef.current
      ) {
        anime.set(parchmentRef.current, { height: '40px', opacity: 1 });
        anime.set(scrollContentRef.current, { opacity: 0, translateY: -50 });
        anime.set([topHandleRef.current, bottomHandleRef.current], { rotateX: 0 });

        const scrollTimeline = anime.timeline({ easing: 'easeOutCubic' });
        scrollTimeline
          .add({ targets: modalRef.current, opacity: [0, 1], duration: 300 })
          .add(
            {
              targets: [topHandleRef.current, bottomHandleRef.current],
              rotateX: [-5, 5],
              duration: 400,
              easing: 'easeInOutSine',
            },
            200
          )
          .add(
            {
              targets: parchmentRef.current,
              height: ['40px', '500px'],
              duration: 1200,
              easing: 'easeOutElastic(1, 0.6)',
            },
            400
          )
          .add(
            {
              targets: topHandleRef.current,
              rotateX: [5, 0],
              translateY: [0, -10],
              duration: 600,
            },
            800
          )
          .add(
            {
              targets: bottomHandleRef.current,
              rotateX: [5, 0],
              translateY: [0, 10],
              duration: 600,
            },
            800
          )
          .add(
            {
              targets: scrollContentRef.current,
              opacity: [0, 1],
              translateY: [-50, 0],
              duration: 800,
              easing: 'easeOutQuart',
            },
            1000
          )
          .add(
            {
              targets: parchmentRef.current,
              scale: [1, 1.02, 1],
              duration: 500,
              easing: 'easeInOutSine',
            },
            1600
          );
      }
    }, 50);
  };

  const closeDecree = () => {
    const scrollTimeline = anime.timeline({
      easing: 'easeInCubic',
      complete: () => setIsDecreeOpen(false),
    });

    scrollTimeline
      .add({
        targets: scrollContentRef.current,
        opacity: [1, 0],
        translateY: [0, -30],
        duration: 400,
      })
      .add(
        {
          targets: [topHandleRef.current, bottomHandleRef.current],
          rotateX: [0, 10],
          duration: 300,
        },
        200
      )
      .add(
        {
          targets: parchmentRef.current,
          height: ['500px', '40px'],
          duration: 800,
          easing: 'easeInBack(1.7)',
        },
        400
      )
      .add(
        {
          targets: [topHandleRef.current, bottomHandleRef.current],
          rotateX: [10, 0],
          translateY: [0, 0],
          duration: 400,
        },
        900
      )
      .add(
        {
          targets: modalRef.current,
          opacity: [1, 0],
          duration: 300,
        },
        1000
      );
  };

  return (
    <section id="hero" className="relative flex items-center justify-center min-h-screen">
      {/* Hero Logo & Text */}
      <div ref={heroRef} className="z-20 text-center">
        <div ref={logoRef} className="relative mb-8 opacity-0">
          <Code
            size={120}
            className="text-transparent bg-gradient-to-r from-pink-500 via-cyan-500 to-green-500 bg-clip-text"
          />
          <div className="absolute inset-0 glow-rainbow animate-pulse">
            <Code size={120} className="text-cyan-400 opacity-30" />
          </div>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full particle-burst top-1/2 left-1/2 bg-gradient-to-r from-pink-500 to-cyan-500"
              style={{ transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateX(80px)` }}
            />
          ))}
          <Sparkles
            size={24}
            className="absolute text-yellow-400 -top-4 -right-4 animate-spin"
            style={{ animationDuration: '3s' }}
          />
        </div>

        <div ref={textRef} className="space-y-6">
          <h1 className="text-6xl font-bold opacity-0 md:text-8xl">
            <span className="text-transparent bg-gradient-to-r from-pink-500 via-cyan-500 to-green-500 bg-clip-text glow-text">
              CREATIVE
            </span>
          </h1>
          <h2 className="text-4xl font-light opacity-0 md:text-6xl">
            <span className="text-white glow-white">Full Stack Developer</span>
          </h2>
          <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-300 opacity-0 md:text-2xl">
            Crafting immersive digital experiences with cutting-edge 3D web technologies and pixel-perfect design systems
          </p>
          <div className="flex flex-col justify-center gap-6 pt-8 opacity-0 sm:flex-row">
            <button onClick={openDecree} className="neon-button neon-button-primary group">
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-r from-pink-500 to-cyan-500 group-hover:opacity-20" />
            </button>

            {/* Download Resume Button */}
            <a href={resumePDF} download className="neon-button neon-button-secondary group">
              <span className="relative z-10">Download Resume</span>
              <div className="absolute inset-0 transition-opacity duration-300 rounded-full opacity-0 bg-gradient-to-r from-cyan-500 to-green-500 group-hover:opacity-20" />
            </a>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-cyan-400 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Royal Decree Modal */}
      {isDecreeOpen && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-30 flex items-center justify-center p-8 bg-black bg-opacity-60"
          style={{ opacity: 0 }}
        >
          <div className="relative w-96">
            {/* Top Handle */}
            <div ref={topHandleRef} className="absolute left-0 right-0 z-20 h-6 mx-8 -top-3" style={{ transform: 'rotateX(0deg)' }}>
              <div className="w-full h-6 rounded-full shadow-lg bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
                <div className="w-full h-2 mt-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 opacity-70" />
              </div>
              <div className="absolute w-8 h-8 rounded-full shadow-xl bg-gradient-to-br from-amber-900 to-amber-950 -left-4 -top-1" />
              <div className="absolute w-8 h-8 rounded-full shadow-xl bg-gradient-to-br from-amber-900 to-amber-950 -right-4 -top-1" />
            </div>

            {/* Parchment */}
            <div
              ref={parchmentRef}
              className="relative w-full mx-auto overflow-hidden shadow-2xl bg-gradient-to-br from-yellow-50 via-amber-50 to-yellow-100"
              style={{
                height: '40px',
                borderLeft: '3px solid #d97706',
                borderRight: '3px solid #d97706',
                boxShadow: 'inset 0 0 50px rgba(217, 119, 6, 0.1), 0 25px 50px rgba(0,0,0,0.3)',
              }}
            >
              {/* Scrollable Content */}
              <div
                ref={scrollContentRef}
                className="relative z-10 p-8 max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-amber-200"
                style={{ opacity: 0 }}
              >
                <button onClick={closeDecree} className="absolute text-amber-800 top-4 right-4 hover:text-amber-900">
                  <X size={24} />
                </button>
                <div className="space-y-4 font-serif text-center text-amber-800">
                  <h3 className="text-4xl font-black text-amber-900">📜 Royal Decree 📜</h3>
                  <p><em>By the Grace of Code and the Power of Pixels,</em></p>
                  <p>
                    Henceforth, let it be known throughout the digital realm that the bearer of this sacred scroll is hereby
                    invited to witness the magnificent works and noble feats of this most distinguished Frontend Engineer. <br/>
                   
                    <br/>
                    <a className="font-serif font-bold text-red-500" href="https://drive.google.com/drive/folders/1HQNmgJXU--Bh_YudNy38qJndBcsmlYG3?usp=drive_link">Project reports</a>
                  </p>
                  <div className="p-4 mb-6 text-left rounded-lg shadow-inner bg-amber-100">
                    <h4 className="mb-2 text-xl font-bold text-amber-900">Portfolio Treasures Include:</h4>
                    <ul className="space-y-1 list-disc list-inside">
                      <li>⚡ Enchanted 3D Web Experiences</li>
                      <li>🎨 Interactive Design Systems</li>
                      <li>🚀 Performance Optimization Spells</li>
                      <li>📱 Responsive Layout Mastery</li>
                      <li>🧪 Smooth Frontend-Backend Alchemy</li>
                      <li>🌐 Realms of React, TypeScript & Vite</li>
                      <li>🔮 Motion Sorcery with Anime.js</li>
                      <li>🧭 Three.js Spatial Manipulation</li>
                      <li>🛡️ Secure Form Handling with EmailJS</li>
                      <li>🌪️ Scroll-triggered Animations & Timelines</li>
                      <li>📦 CI/CD Deployment Rituals</li>
                      <li>🧰 DevTools Conjuration & Debugging Wisdom</li>
                      <li>🔥 Code Splitting & Bundle Taming</li>
                      <li>🧙‍♂️ Custom Hook Creation & Reusability Charms</li>
                      <li>⚔️ Combatting Memory Leaks & Performance Bottlenecks</li>
                      <li>🪄 TailwindCSS Styling Spells</li>
                      <li>🌍 RESTful  Incantations</li>
                      <li>📡 Web APIs, Portals & Cloud Gateways</li>
                      
                    </ul>
                  </div>
                  <p><em>Sealed with the Digital Wax of Excellence</em></p>
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center justify-center w-16 h-16 text-2xl rounded-full shadow-lg bg-gradient-to-br from-red-600 to-red-800">
                      👑
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Handle */}
            <div
              ref={bottomHandleRef}
              className="absolute left-0 right-0 z-20 h-6 mx-8 -bottom-3"
              style={{ transform: 'rotateX(0deg)' }}
            >
              <div className="w-full h-6 rounded-full shadow-lg bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900">
                <div className="w-full h-2 rounded-full bg-gradient-to-r from-amber-700 to-amber-600 opacity-70" />
              </div>
              <div className="absolute w-8 h-8 rounded-full shadow-xl bg-gradient-to-br from-amber-900 to-amber-950 -left-4 -top-1" />
              <div className="absolute w-8 h-8 rounded-full shadow-xl bg-gradient-to-br from-amber-900 to-amber-950 -right-4 -top-1" />
            </div>
          </div>
        </div>
      )}

      {/* Hero Scroll Indicator */}
      <div className="absolute z-20 -translate-x-1/2 bottom-8 left-1/2">
        <div className="flex justify-center w-1 h-16 border-2 rounded-full border-cyan-400 glow-cyan">
          <div className="w-1 h-4 mt-2 rounded-full bg-cyan-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
