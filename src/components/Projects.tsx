import React, {
  useEffect,
  useRef,
  useState,
  MutableRefObject,
} from 'react';
import anime from 'animejs/lib/anime.es.js';
import * as THREE from 'three';
import { ExternalLink, Github } from 'lucide-react';
import MedicoxImg from '/assets/MEDICOX.png';
import PlanoImg from '/assets/PLANO.png';
import Portfolio from '/public/assets/Portfolio.png'
import Dogram from '/public/assets/DOGRAM.jpg';
import Fitclub from '/public/assets/FITCLUB.png';
interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  color: string;
  image: string;
  demoUrl: string;
  codeUrl: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'MEDICOX',
    description:
      'Modern healthcare platform for booking doctor appointments and managing records.',
    tech: [
      'Three.js',
      'React',
      'Docker',
      'CI/CD',
      'Express',
      'OAuth',
      'MongoDB',
      'Nginx',
      'Framer Motion',
      'Prometheus',
      'Grafana',
    ],
    color: '#ff0080',
    image: MedicoxImg,
    demoUrl: 'https://medicox123.netlify.app/login',
    codeUrl: 'https://github.com/sankha1545/MEDICO',
  },
  {
    id: 2,
    title: 'PLANO',
    description:
      'Simple, intuitive to-do list app to organize tasks, goals, and daily productivity.',
    tech: ['React', 'TailwindCSS', 'Vite', 'TypeScript'],
    color: '#00ffff',
    image: PlanoImg,
    demoUrl: 'https://todolist-alien-brains.vercel.app/',
    codeUrl: 'https://github.com/sankha1545/Todolist-alienBrains-',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description:
      'Personal portfolio with 3D elements, smooth animations, and interactive UI.',
    tech: ['Three.js', 'React', 'Framer Motion', 'Netlify'],
    color: '#00ff41',
    image:
      Portfolio,
    demoUrl: 'https://sankha123.netlify.app/',
    codeUrl: 'https://github.com/sankha1545/portfolio-latest-',
  },
  {
    id: 4,
    title: 'FITCLUB',
    description:
      'Just a casual frontend Fitness website ',
    tech: ['HTML', 'CSS', 'javascript', 'ReactJs'],
    color: '#ff4000',
    image:
      Fitclub,
    demoUrl: 'https://factory-vr.example.com',
    codeUrl: 'https://github.com/sankha1545/FITCLUB',
  },
  {
    id: 5,
    title: 'DOGRAM',
    description:
      'A Social media web application with only the frontend ',
    tech: ['React Native','Node.js'],
    color: '#8000ff',
    image:
      Dogram,
    demoUrl: 'https://dogram.example.com',
    codeUrl: 'https://github.com/sankha1545/AlienBrains-DoGram-',
  },
];

const Projects: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const sceneContainer = useRef<HTMLDivElement>(null);

  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cardsRef = useRef<THREE.Mesh[]>([]);

  const [currentProject, setCurrentProject] = useState(0);
  const currentProjectRef = useRef(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Sync ref
  useEffect(() => {
    currentProjectRef.current = currentProject;
  }, [currentProject]);

  // Initialize Three.js once
  useEffect(() => {
    if (!sceneContainer.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(400, 400);
    renderer.setClearColor(0x000000, 0);
    sceneContainer.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Create cards
    const radius = 8;
    projects.forEach((proj, idx) => {
      const geo = new THREE.PlaneGeometry(4, 5);
      const texLoader = new THREE.TextureLoader();
      const mat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.8 });
      texLoader.load(proj.image, (tex) => {
        mat.map = tex;
        mat.needsUpdate = true;
      });
      const card = new THREE.Mesh(geo, mat);
      const angle = (idx / projects.length) * Math.PI * 2;

      card.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      card.rotation.y = -angle;
      scene.add(card);
      cardsRef.current.push(card);

      // Glow behind
      const glowGeo = new THREE.PlaneGeometry(4.2, 5.2);
      const glowMat = new THREE.MeshBasicMaterial({
        color: proj.color,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(card.position);
      glow.rotation.copy(card.rotation);
      glow.position.z -= 0.01;
      scene.add(glow);
    });

    camera.position.z = 15;

    // Animate loop
    let rafId: number;
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (isAutoRotating) scene.rotation.y += 0.005;
      cardsRef.current.forEach((card, idx) => {
        if (idx === currentProjectRef.current) {
          card.scale.setScalar(1.1);
          card.position.y = 0.5;
        } else {
          card.scale.setScalar(1);
          card.position.y = 0;
        }
      });
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      renderer.domElement &&
        sceneContainer.current!.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []); // run once

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      if (isAutoRotating) {
        setCurrentProject((p) => (p + 1) % projects.length);
      }
    }, 4000);
    return () => clearInterval(id);
  }, [isAutoRotating]);

  // Scroll-in animations
  useEffect(() => {
    if (!projectsRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            anime({
              targets: '.project-title',
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutQuart',
            });
            anime({
              targets: '.project-card',
              scale: [0.8, 1],
              opacity: [0, 1],
              duration: 800,
              delay: 500,
              easing: 'easeOutElastic(1, .8)',
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(projectsRef.current);
    return () => obs.disconnect();
  }, []);

  // User selects a project
  const handleProjectSelect = (idx: number) => {
    setCurrentProject(idx);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  const current = projects[currentProject];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-20"
      ref={projectsRef}
    >
      <div className="px-6 mx-auto max-w-7xl">
        {/* Title */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold opacity-0 md:text-7xl project-title">
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text glow-text">
              Featured Projects
            </span>
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Carousel */}
          <div className="relative opacity-0 project-card">
            <div
              ref={sceneContainer}
              className="relative w-full max-w-md mx-auto"
              onMouseEnter={() => setIsAutoRotating(false)}
              onMouseLeave={() => setIsAutoRotating(true)}
            />
            {/* Dots */}
            <div className="flex justify-center mt-8 space-x-4">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProjectSelect(idx)}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    currentProject === idx
                      ? 'bg-cyan-400 border-cyan-400 glow-cyan'
                      : 'border-gray-600 hover:border-cyan-400'
                  }`}
                />
              ))}
            </div>
            {/* Arrows */}
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() =>
                  handleProjectSelect(
                    (currentProject + projects.length - 1) % projects.length
                  )
                }
                className="neon-button neon-button-small"
              >
                ←
              </button>
              <button
                onClick={() =>
                  handleProjectSelect((currentProject + 1) % projects.length)
                }
                className="neon-button neon-button-small"
              >
                →
              </button>
            </div>
          </div>

          {/* Details + Links */}
          <div className="opacity-0 project-card">
            <div
              className="p-8 border border-gray-700 bg-gradient-to-br from-gray-900/50 via-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl neon-border"
              style={{
                borderColor: current.color,
                boxShadow: `0 0 30px ${current.color}20`,
              }}
            >
              <h3 className="mb-4 text-3xl font-bold text-white glow-white">
                {current.title}
              </h3>
              <p className="mb-6 text-lg leading-relaxed text-gray-300">
                {current.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="mb-3 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-3">
                  {current.tech.map((t, i) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm text-gray-300 transition-colors duration-300 bg-gray-800 border border-gray-600 rounded-full hover:border-cyan-400"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Demo & View Code */}
              <div className="flex gap-4">
                <a
                  href={current.demoUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 neon-button neon-button-primary group"
                >
                  <ExternalLink size={18} />
                  <span>Live Demo</span>
                </a>
                <a
                  href={current.codeUrl}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center gap-2 neon-button neon-button-secondary group"
                >
                  <Github size={18} />
                  <span>View Code</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
