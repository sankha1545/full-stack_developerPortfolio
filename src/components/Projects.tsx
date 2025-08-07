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
import PortfolioImg from '/public/assets/Portfolio.png';
import DogramImg from '/public/assets/DOGRAM.jpg';
import FitclubImg from '/public/assets/FITCLUB.png';

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
    image: PortfolioImg,
    demoUrl: 'https://sankha123.netlify.app/',
    codeUrl: 'https://github.com/sankha1545/portfolio-latest-',
  },
  {
    id: 4,
    title: 'FITCLUB',
    description: 'Just a casual frontend Fitness website.',
    tech: ['HTML', 'CSS', 'JavaScript', 'ReactJS'],
    color: '#ff4000',
    image: FitclubImg,
    demoUrl: 'https://factory-vr.example.com',
    codeUrl: 'https://github.com/sankha1545/FITCLUB',
  },
  {
    id: 5,
    title: 'DOGRAM',
    description: 'A Social media web application with only the frontend.',
    tech: ['React Native', 'Node.js'],
    color: '#8000ff',
    image: DogramImg,
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
  const currentProjectRef = useRef(currentProject);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Keep ref in sync
  useEffect(() => {
    currentProjectRef.current = currentProject;
  }, [currentProject]);

  // THREE.js setup
  useEffect(() => {
    if (!sceneContainer.current) return;

    // Scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;

    // Append canvas
    sceneContainer.current.appendChild(renderer.domElement);

    // Responsive resize handler
    const resize = () => {
      if (!sceneContainer.current || !cameraRef.current || !rendererRef.current)
        return;
      const width = sceneContainer.current.clientWidth;
      const height = width; // square aspect
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener('resize', resize);
    resize(); // initial sizing

    // Create project cards
    const radius = 8;
    projects.forEach((proj, idx) => {
      const geo = new THREE.PlaneGeometry(4, 5);
      const mat = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.8,
      });
      new THREE.TextureLoader().load(proj.image, (tex) => {
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

    // Animation loop
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
      window.removeEventListener('resize', resize);
      sceneContainer.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [isAutoRotating]);

  // Auto-rotate timer
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

  const handleProjectSelect = (idx: number) => {
    setCurrentProject(idx);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  const current = projects[currentProject];

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="relative py-20 bg-transparent-900"
    >
      <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        {/* Title */}
        <h2 className="mb-12 text-4xl font-extrabold text-center text-transparent opacity-0 sm:text-5xl md:text-6xl bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 project-title">
          Featured Projects
        </h2>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* 3D Carousel */}
          <div className="opacity-0 project-card">
            <div
              ref={sceneContainer}
              className="w-full max-w-md mx-auto aspect-square"
              onMouseEnter={() => setIsAutoRotating(false)}
              onMouseLeave={() => setIsAutoRotating(true)}
            />
            {/* Dots */}
            <div className="flex justify-center mt-6 space-x-3">
              {projects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProjectSelect(idx)}
                  className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
                    currentProject === idx
                      ? 'bg-cyan-400 border-cyan-400'
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
                className="px-4 py-2 transition border border-gray-600 rounded-lg hover:border-cyan-400"
              >
                ←
              </button>
              <button
                onClick={() =>
                  handleProjectSelect((currentProject + 1) % projects.length)
                }
                className="px-4 py-2 transition border border-gray-600 rounded-lg hover:border-cyan-400"
              >
                →
              </button>
            </div>
          </div>

          {/* Details + Links */}
          <div className="opacity-0 project-card">
            <div
              className="p-6 border rounded-2xl backdrop-blurbg bg-gradient-to-br from-gray-800/60 to-gray-900/60"
              style={{
                borderColor: current.color,
                boxShadow: `0 0 20px ${current.color}40`,
              }}
            >
              <h3
                className="mb-4 text-2xl font-bold sm:text-3xl"
                style={{ color: current.color }}
              >
                {current.title}
              </h3>
              <p className="mb-6 text-gray-300">{current.description}</p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="mb-2 text-xs tracking-wide text-gray-400 uppercase">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {current.tech.map((t, i) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-sm transition bg-gray-800 border border-gray-600 rounded-full hover:border-cyan-400"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-4 sm:flex-row">
                <a
                  href={current.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 transition rounded-lg bg-cyan-500 hover:bg-cyan-600"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
                <a
                  href={current.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 transition bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  <Github size={18} />
                  View Code
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
