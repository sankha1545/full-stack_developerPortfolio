import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    renderer?: THREE.WebGLRenderer;
    animationId?: number;
    geometries?: THREE.Mesh[];
    grid?: THREE.GridHelper;
    particles?: THREE.Points;
  }>({});

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    mountRef.current.appendChild(renderer.domElement);

    // Neon grid floor
    const grid = new THREE.GridHelper(200, 50, 0x00ffff, 0x00ffff);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    grid.position.y = -50;
    scene.add(grid);

    // Floating geometric shapes
    const geometries: THREE.Mesh[] = [];
    const shapes = [
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.SphereGeometry(1.5, 16, 16),
      new THREE.ConeGeometry(1, 2, 8),
      new THREE.OctahedronGeometry(1.5),
      new THREE.TorusGeometry(1, 0.3, 8, 16)
    ];

    const colors = [0xff0080, 0x00ffff, 0x00ff41, 0xff4000, 0x8000ff];

    for (let i = 0; i < 15; i++) {
      const geometry = shapes[Math.floor(Math.random() * shapes.length)];
      const material = new THREE.MeshPhongMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        emissive: colors[Math.floor(Math.random() * colors.length)],
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.8
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 100
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      geometries.push(mesh);
      scene.add(mesh);
    }

    // Particle system
    const particleCount = 1000;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors_particles = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 200;
      positions[i + 1] = (Math.random() - 0.5) * 200;
      positions[i + 2] = (Math.random() - 0.5) * 200;

      const color = new THREE.Color();
      color.setHSL(Math.random(), 1, 0.5);
      colors_particles[i] = color.r;
      colors_particles[i + 1] = color.g;
      colors_particles[i + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors_particles, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xff0080, 2, 100);
    pointLight1.position.set(50, 50, 50);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x00ff41, 2, 100);
    pointLight2.position.set(-50, 50, -50);
    scene.add(pointLight2);

    // Camera position
    camera.position.set(0, 0, 50);

    // Store references
    sceneRef.current = { scene, camera, renderer, geometries, grid, particles };

    // Animation loop
    const animate = () => {
      const { animationId } = sceneRef.current;
      sceneRef.current.animationId = requestAnimationFrame(animate);

      // Rotate geometries
      geometries.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001;
        mesh.rotation.y += 0.005 + index * 0.001;
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
      });

      // Animate particles
      if (particles) {
        particles.rotation.y += 0.001;
      }

      // Camera movement based on scroll
      const scrollY = window.pageYOffset;
      camera.position.z = 50 + scrollY * 0.01;
      camera.rotation.x = scrollY * 0.0001;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return;
      
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Mouse movement effect
    const handleMouseMove = (event: MouseEvent) => {
      if (!camera) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 5 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (sceneRef.current.animationId) {
        cancelAnimationFrame(sceneRef.current.animationId);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)' }}
    />
  );
};

export default ThreeScene;