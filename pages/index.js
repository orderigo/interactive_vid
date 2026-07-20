import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Text } from '@react-three/drei';
import * as THREE from 'three';

const years = Array.from({ length: 26 }, (_, i) => 2001 + i);

function Fireworks({ active }) {
  const { scene } = useThree();
  const particlesRef = useRef();

  useEffect(() => {
    if (!active) return;
    if (particlesRef.current) scene.remove(particlesRef.current);

    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 5 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particleSystem;
    scene.add(particleSystem);

    const animate = () => {
      if (particleSystem) {
        const pos = particleSystem.geometry.attributes.position.array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3 + 1] += 0.05;
          if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -2;
        }
        particleSystem.geometry.attributes.position.needsUpdate = true;
      }
      requestAnimationFrame(animate);
    };
    animate();

    return () => scene.remove(particleSystem);
  }, [active, scene]);
  return null;
}

function YearTile({ year, position, onClick, isSelected }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) meshRef.current.rotation.y += 0.005;
  });

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick(year); }}
      onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.9, 1.2, 0.1]} />
        <meshStandardMaterial
          color={isSelected ? '#ffd700' : hovered ? '#40e0d0' : '#1e90ff'}
          roughness={0.4} metalness={0.6}
        />
      </mesh>
      <Text position={[0, 0, 0.06]} fontSize={0.3} color="white"
        anchorX="center" anchorY="middle">{year}</Text>
    </group>
  );
}

function InteractiveScene({ selectedYear, onYearSelect, showFireworks }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  const gridSize = 5;
  const spacing = 1.5;

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[50, 30]} />
        <meshStandardMaterial color="#000033" />
      </mesh>

      {years.map((year, index) => {
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        const x = (col - Math.floor(gridSize / 2)) * spacing;
        const y = (Math.floor(gridSize / 2) - row) * spacing;
        return (
          <YearTile key={year} year={year} position={[x, y, 0]}
            onClick={onYearSelect} isSelected={selectedYear === year} />
        );
      })}

      {selectedYear === 2026 && (
        <group position={[0, 4, 0]}>
          <Text fontSize={0.6} color="#ffd700" anchorX="center" anchorY="middle" maxWidth={10}>
            ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ်
          </Text>
          <Text position={[0, -0.8, 0]} fontSize={0.4} color="#ffffff"
            anchorX="center" anchorY="middle" maxWidth={12}>
            (၂၅) နှစ်မြောက်ငွေရတုအထိမ်းအမှတ်
          </Text>
        </group>
      )}

      {showFireworks && <Fireworks active={showFireworks} />}
      <Environment preset="city" />
    </>
  );
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    if (year === 2026) {
      setTimeout(() => {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 5000);
      }, 1000);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches) {
      setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    } else {
      setTouchStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = currentX - touchStart.x;
    if (Math.abs(dx) > 50) {
      if (dx > 50 && selectedYear && selectedYear < 2026) {
        handleYearSelect(selectedYear + 1);
      } else if (dx < -50 && selectedYear && selectedYear > 2001) {
        handleYearSelect(selectedYear - 1);
      }
      setTouchStart(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' && selectedYear < 2026) handleYearSelect(selectedYear + 1);
    else if (e.key === 'ArrowLeft' && selectedYear > 2001) handleYearSelect(selectedYear - 1);
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedYear]);

  const statusText = selectedYear
    ? 'Selected: ' + selectedYear + ' - Swipe to navigate'
    : 'Touch a year to select';

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={() => setTouchStart(null)}
      onMouseDown={handleTouchStart} onMouseMove={handleTouchMove} onMouseUp={() => setTouchStart(null)}>
      <Canvas>
        <InteractiveScene selectedYear={selectedYear} onYearSelect={handleYearSelect}
          showFireworks={showFireworks} />
      </Canvas>
      <div style={{
        position: 'absolute', bottom: 20, left: 0, right: 0,
        textAlign: 'center', color: 'white', fontSize: '14px',
        background: 'rgba(0,0,0,0.5)', padding: '10px'
      }}>{statusText}</div>
    </div>
  );
}