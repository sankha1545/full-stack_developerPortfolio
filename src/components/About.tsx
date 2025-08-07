import React, {
  useEffect,
  useRef,
  useState,
  MouseEvent,
  CSSProperties,
} from 'react';
import anime from 'animejs/lib/anime.es.js';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'React / TypeScript', level: 95, color: '#00FFFF', icon: '⚛️' },
  { name: 'Next.js', level: 90, color: '#FF9900', icon: '🚀' },
  { name: 'Tailwind CSS', level: 92, color: '#38B2AC', icon: '🎨' },
  { name: 'Three.js / WebGL', level: 90, color: '#FF0080', icon: '🎮' },
  { name: 'Node.js / Express', level: 85, color: '#00FF41', icon: '🛠️' },
  { name: 'MongoDb / MySQL', level: 88, color: '#E10098', icon: '📊' },
  { name: 'Docker / CI CD', level: 80, color: '#2496ED', icon: '🐳' },
  { name: 'AWS Cloud Services', level: 83, color: '#FF9900', icon: '☁️' },
  { name: 'UI / UX Design', level: 88, color: '#2496ED', icon: '🖌️' },
  
];

const About: React.FC = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  // hoveredSkill: name of the skill being hovered
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  // tooltipPos: x/y coords relative to the section container
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Scroll‐trigger animations
  useEffect(() => {
    if (!aboutRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          anime({
            targets: '.skill-orb',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 800,
            delay: anime.stagger(150),
            easing: 'easeOutElastic(1, .8)',
          });
          anime({
            targets: '.about-text',
            translateY: [50, 0],
            opacity: [0, 1],
            duration: 1000,
            delay: 300,
            easing: 'easeOutQuart',
          });

          observer.disconnect();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(aboutRef.current);
    return () => observer.disconnect();
  }, []);

  // On hover, capture which skill and its position
  const handleMouseEnter = (skill: Skill, e: MouseEvent<HTMLDivElement>) => {
    if (!aboutRef.current) return;
    const orbRect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const sectionRect = aboutRef.current.getBoundingClientRect();

    // compute coords relative to section
    const x = orbRect.left - sectionRect.left + orbRect.width / 2;
    const y = orbRect.bottom - sectionRect.top;

    setTooltipPos({ x, y });
    setHoveredSkill(skill.name);

    anime({
      targets: `[data-skill="${skill.name}"] .skill-orb-inner`,
      scale: 1.2,
      duration: 300,
      easing: 'easeOutQuart',
    });
  };

  // On leave, reset
  const handleMouseLeave = (skill: Skill) => {
    setHoveredSkill(null);
    anime({
      targets: `[data-skill="${skill.name}"] .skill-orb-inner`,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuart',
    });
  };

  // Tooltip styling, dynamically colored
  const tooltipStyle: CSSProperties = hoveredSkill
    ? {
        position: 'absolute',
        left: tooltipPos.x,
        top: tooltipPos.y + 8, // small gap
        transform: 'translateX(-50%)',
        zIndex: 50,
      }
    : { display: 'none' };

  const activeSkill = skills.find((s) => s.name === hoveredSkill);

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative min-h-screen py-20"
    >
      <div className="px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold opacity-0 md:text-7xl about-text">
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text glow-text">
              About Me
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300 opacity-0 about-text">
            I'm a passionate frontend engineer who specializes in creating
            immersive digital experiences. With a keen eye for design and deep
            technical expertise, I transform complex ideas into intuitive,
            visually stunning web applications that push the boundaries of what's
            possible in the browser.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 gap-8 mb-16 md:grid-cols-3">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="relative cursor-pointer skill-orb"
              data-skill={skill.name}
              onMouseEnter={(e) => handleMouseEnter(skill, e)}
              onMouseLeave={() => handleMouseLeave(skill)}
            >
              {/* Orb Container */}
              <div
                className="relative w-32 h-32 mx-auto overflow-hidden transition-all duration-300 border-4 rounded-full skill-orb-inner"
                style={{
                  borderColor: skill.color,
                  boxShadow: `0 0 30px ${skill.color}40, inset 0 0 30px ${skill.color}20`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-20 animate-pulse"
                  style={{ backgroundColor: skill.color }}
                />
                <div className="relative z-10 flex items-center justify-center w-full h-full text-4xl">
                  {skill.icon}
                </div>
                <svg
                  className="absolute inset-0 w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="2"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={skill.color}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${skill.level * 2.827} ${
                      282.7 - skill.level * 2.827
                    }`}
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: `drop-shadow(0 0 8px ${skill.color})` }}
                  />
                </svg>
              </div>

              {/* Label */}
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-400">{skill.level}%</p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tooltip */}
        {activeSkill && (
          <div
            style={tooltipStyle}
            className="p-4 mt-2 bg-black border rounded-lg bg-opacity-90 backdrop-blur-sm neon-border"
            style={{ ...tooltipStyle, borderColor: activeSkill.color }}
          >
            <div className="text-center">
              <div
                className="mb-2 text-2xl"
                style={{ color: activeSkill.color }}
              >
                {activeSkill.icon}
              </div>
              <h4 className="mb-2 font-semibold text-white">
                {activeSkill.name}
              </h4>
              <div className="w-full h-2 mb-2 bg-gray-700 rounded-full">
                <div
                  className="h-2 transition-all duration-1000 ease-out rounded-full"
                  style={{
                    width: `${activeSkill.level}%`,
                    backgroundColor: activeSkill.color,
                    boxShadow: `0 0 10px ${activeSkill.color}`,
                  }}
                />
              </div>
              <p className="text-sm text-gray-400">
                Proficiency: {activeSkill.level}%
              </p>
            </div>
          </div>
        )}

        {/* Personal Statement */}
        <div className="max-w-4xl mx-auto text-center opacity-0 about-text">
          <div className="p-8 border bg-gradient-to-r from-pink-500/10 via-cyan-500/10 to-green-500/10 backdrop-blur-sm border-gray-700/50 rounded-2xl neon-border">
            <p className="mb-6 text-lg leading-relaxed text-gray-300">
              "I believe that great web experiences shouldn't just
              function—they should inspire, delight, and create lasting
              impressions. Every line of code I write is crafted with
              performance, accessibility, and user experience in mind."
            </p>
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
