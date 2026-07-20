import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

const EVENT_NAME = "ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ်";
const EVENT_SUBTITLE = "(၂၅) နှစ်မြောက်ငွေရတုအထိမ်းအမှတ်";
const years = Array.from({ length: 26 }, (_, i) => 2001 + i);

const yearImages = {
  2001: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  2002: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
  2003: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
  2004: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
  2005: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  2006: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  2007: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
  2008: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
  2009: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
  2010: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  2011: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  2012: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
  2013: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
  2014: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
  2015: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  2016: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  2017: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
  2018: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
  2019: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
  2020: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  2021: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop',
  2022: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop',
  2023: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400&h=300&fit=crop',
  2024: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
  2025: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
  2026: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop'
};

function Fireworks({ active }) {
  const { scene } = useThree();
  const particleSystemsRef = useRef([]);
  useEffect(() => {
    if (!active) return;
    const createBurst = (xPosition) => {
      const particleCount = 100;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const velocities = [];
      const fireworkColors = [
        { r: 1, g: 0.84, b: 0 },
        { r: 1, g: 0.2, b: 0.2 },
        { r: 0.2, g: 1, b: 0.2 },
        { r: 0, g: 0.5, b: 1 }
      ];
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = xPosition + (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 1] = -8 + Math.random() * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
        const color = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2;
        velocities.push({
          vx: Math.cos(angle) * speed,
          vy: Math.random() * 3 + 2,
          vz: Math.sin(angle) * speed,
          life: 80 + Math.random() * 40
        });
      }
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
      });
      const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
      particleSystemsRef.current.push(particleSystem);
      scene.add(particleSystem);
      const animate = () => {
        if (particleSystem && scene.children.includes(particleSystem)) {
          const pos = particleSystem.geometry.attributes.position.array;
          for (let i = 0; i < particleCount; i++) {
            const velocity = velocities[i];
            if (velocity.life > 0) {
              pos[i * 3] += velocity.vx * 0.05;
              pos[i * 3 + 1] += velocity.vy * 0.05;
              pos[i * 3 + 2] += velocity.vz * 0.05;
              velocity.vy -= 0.02;
              velocity.life--;
            }
          }
          particleSystem.geometry.attributes.position.needsUpdate = true;
          if (velocities.every(v => v.life <= 0)) {
            scene.remove(particleSystem);
          } else {
            requestAnimationFrame(animate);
          }
        }
      };
      requestAnimationFrame(animate);
    };
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createBurst((i - 1) * 4), i * 300);
    }
    const interval = setInterval(() => {
      if (active) createBurst((Math.random() - 0.5) * 8);
    }, 500);
    return () => {
      clearInterval(interval);
      particleSystemsRef.current.forEach(system => scene.remove(system));
    };
  }, [active, scene]);
  return null;
}

function YearTile({ year, position, onClick, isSelected, imageUrl }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      if (isSelected) {
        meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.002) * 0.1;
      } else {
        meshRef.current.position.y = position[1];
      }
    }
  });
  const handleClick = (e) => {
    e.stopPropagation();
    onClick(year);
  };
  return (
    <group position={position}>
      <group 
        onClick={handleClick}
        onPointerOver={() => setHovered(true)} 
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => {
          if (meshRef.current) meshRef.current.scale.set(0.9, 0.9, 0.9);
        }}
        onPointerUp={() => {
          if (meshRef.current) meshRef.current.scale.set(1, 1, 1);
        }}
      >
        {isSelected && (
          <pointLight position={[0, 0, 0.5]} intensity={1.5} distance={3} color="#ffd700" decay={2} />
        )}
        <mesh ref={meshRef}>
          <boxGeometry args={[0.9, 1.2, 0.1]} />
          <meshStandardMaterial
            color={isSelected ? '#ffd700' : hovered ? '#40e0d0' : '#1e90ff'}
            roughness={0.1} 
            metalness={0.9}
            emissive={isSelected ? '#ffd700' : '#003366'}
            emissiveIntensity={isSelected ? 0.5 : 0.1}
          />
        </mesh>
        <Text position={[0, 0, 0.06]} fontSize={0.35} color="white" anchorX="center" anchorY="middle">
          {year}
        </Text>
        {isSelected && (
          <mesh position={[0, 0, 0.11]}>
            <ringGeometry args={[1.1, 1.2, 32]} />
            <meshBasicMaterial color="#ffd700" side={THREE.DoubleSide} transparent opacity={0.8} />
          </mesh>
        )}
      </group>
      {isSelected && imageUrl && (
        <group position={[0, 1.8, 0]}>
          <Html distanceFactor={10} position={[0, 0, 0.1]} transform occlude="blending">
            <div style={{ width: '180px', height: 'auto', border: '3px solid gold', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 30px rgba(255, 215, 0, 0.8)' }}>
              <img src={imageUrl} alt={'Year ' + year} style={{ width: '100%', height: 'auto', display: 'block' }} onError={(e) => { e.target.src = 'https://via.placeholder.com/180x120/1e90ff/ffffff?text=' + year; }} />
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

function EventTitle({ show, year }) {
  const titleRef = useRef();
  const [scale, setScale] = useState(0);
  const [opacity, setOpacity] = useState(0);
  useEffect(() => {
    if (show) {
      setScale(0);
      setOpacity(0);
      setTimeout(() => setScale(1), 100);
      setTimeout(() => setOpacity(1), 200);
    } else {
      setScale(0);
      setOpacity(0);
    }
  }, [show]);
  useFrame(() => {
    if (titleRef.current && show) {
      titleRef.current.rotation.y += 0.0005;
    }
  });
  if (!show) return null;
  return (
    <group position={[0, 8, 0]} ref={titleRef} scale={scale}>
      <pointLight position={[0, 0, 0]} intensity={2} distance={10} color="#ffd700" />
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[14, 4, 0.1]} />
        <meshStandardMaterial color="#000000" transparent={true} opacity={0.8 * opacity} roughness={0.1} metalness={0.9} />
      </mesh>
      <Text position={[0, 0.8, 0]} fontSize={1.0} color="#ffd700" anchorX="center" anchorY="middle" maxWidth={12} lineHeight={1.4} opacity={opacity}>
        {EVENT_NAME}
      </Text>
      <Text position={[0, -0.2, 0]} fontSize={0.6} color="#ffffff" anchorX="center" anchorY="middle" maxWidth={14} opacity={opacity}>
        {EVENT_SUBTITLE}
      </Text>
      {year && (
        <Text position={[0, -1.2, 0]} fontSize={0.7} color="#ff69b4" anchorX="center" anchorY="middle" opacity={opacity}>
          {year}
        </Text>
      )}
    </group>
  );
}

function InteractiveScene({ selectedYear, onYearSelect, showFireworks, showEventTitle }) {
  const { camera, gl, scene } = useThree();
  const sceneRef = useRef();
  useEffect(() => {
    camera.position.set(0, 5, 14);
    camera.lookAt(0, 0, 0);
    camera.fov = 60;
    camera.updateProjectionMatrix();
    gl.setClearColor('#000011');
    scene.fog = new THREE.Fog('#000011', 12, 25);
    gl.toneMapping = THREE.ACESFilmicToneMapping;
    gl.toneMappingExposure = 1.2;
  }, [camera, gl, scene]);
  return (
    <scene ref={sceneRef}>
      <ambientLight intensity={0.4} color="#404080" />
      <pointLight position={[15, 10, 15]} intensity={1.5} color="#ffffff" distance={20} />
      <pointLight position={[-15, 5, -15]} intensity={1.0} color="#ffd700" distance={20} />
      <directionalLight position={[0, 20, 0]} intensity={0.6} color="#ffffff" />
      <hemisphereLight intensity={0.3} color="#4040ff" groundColor="#ff4040" />
      <mesh position={[0, 0, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#000011" roughness={1} metalness={0} />
      </mesh>
      {Array.from({ length: 200 }).map((_, i) => {
        const distance = Math.random() * 60 + 10;
        const angle = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 30;
        return (
          <mesh key={'star-' + i} position={[Math.cos(angle) * distance, height, Math.sin(angle) * distance]}>
            <sphereGeometry args={[Math.random() * 0.08 + 0.02, 8, 8]} />
            <meshBasicMaterial color={'hsl(' + ((i * 10) % 360) + ', 100%, 70%)'} />
          </mesh>
        );
      })}
      {years.map((year, index) => {
        const angle = (index / years.length) * Math.PI * 2;
        const radius = 4.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius * 0.4;
        const z = Math.sin(angle) * radius * 0.3;
        return (
          <YearTile key={year} year={year} position={[x, y, z]} onClick={onYearSelect} isSelected={selectedYear === year} imageUrl={yearImages[year]} />
        );
      })}
      <EventTitle show={showEventTitle} year={selectedYear} />
      {showFireworks && <Fireworks active={showFireworks} />}
      <Environment preset="city" />
    </scene>
  );
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(null);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showEventTitle, setShowEventTitle] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchStartTime, setTouchStartTime] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    if (year === 2026) {
      setTimeout(() => {
        setShowEventTitle(true);
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 10000);
      }, 1000);
    } else {
      setShowEventTitle(false);
      setShowFireworks(false);
    }
  };
  const handleTouchStart = (e) => {
    const now = Date.now();
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;
    setTouchStart({ x, y });
    setTouchStartTime(now);
    setIsSwiping(false);
  };
  const handleTouchMove = (e) => {
    if (!touchStart || !touchStartTime) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = currentX - touchStart.x;
    const now = Date.now();
    const duration = now - touchStartTime;
    if (Math.abs(dx) > 30 && duration < 200) {
      setIsSwiping(true);
      if (dx > 30) {
        const currentIndex = selectedYear ? years.indexOf(selectedYear) : -1;
        const nextIndex = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, years.length - 1);
        handleYearSelect(years[nextIndex]);
        setTouchStart(null);
        setTouchStartTime(null);
      } else if (dx < -30) {
        const currentIndex = selectedYear ? years.indexOf(selectedYear) : years.length;
        const prevIndex = currentIndex <= 0 ? years.length - 1 : currentIndex - 1;
        handleYearSelect(years[prevIndex]);
        setTouchStart(null);
        setTouchStartTime(null);
      }
    }
  };
  const handleTouchEnd = () => {
    if (!isSwiping && touchStart && !selectedYear) {
      handleYearSelect(2001);
    }
    setIsSwiping(false);
    setTouchStart(null);
    setTouchStartTime(null);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      const currentIndex = selectedYear ? years.indexOf(selectedYear) : -1;
      const nextIndex = currentIndex < 0 ? 0 : Math.min(currentIndex + 1, years.length - 1);
      handleYearSelect(years[nextIndex]);
    } else if (e.key === 'ArrowLeft') {
      const currentIndex = selectedYear ? years.indexOf(selectedYear) : years.length;
      const prevIndex = currentIndex <= 0 ? years.length - 1 : currentIndex - 1;
      handleYearSelect(years[prevIndex]);
    } else if (e.key === 'Escape') {
      setSelectedYear(null);
      setShowEventTitle(false);
      setShowFireworks(false);
    } else if (e.key === 'Home') {
      handleYearSelect(2001);
    } else if (e.key === 'End') {
      handleYearSelect(2026);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedYear]);
  const statusText = selectedYear
    ? (selectedYear === 2026 ? 'Final Year! ' : '') + 'Selected: ' + selectedYear + ' - ' + (selectedYear === 2026 ? 'Final Year!' : 'Swipe to navigate')
    : 'Touch a year to select (2001-2026) | Swipe to browse';
  return (
    <div 
      style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'none', background: 'linear-gradient(135deg, #000011 0%, #000022 100%)' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >
      <Canvas camera={{ position: [0, 5, 14], fov: 60 }}>
        <InteractiveScene selectedYear={selectedYear} onYearSelect={handleYearSelect} showFireworks={showFireworks} showEventTitle={showEventTitle} />
      </Canvas>
      <div style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', color: 'white', fontSize: '16px', background: 'rgba(0,0,0,0.8)', padding: '12px', zIndex: 100, fontFamily: 'Arial, sans-serif' }}>
        {statusText}
      </div>
      <div style={{ position: 'absolute', top: 20, left: 0, right: 0, textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '14px', zIndex: 100, fontFamily: 'Arial, sans-serif' }}>
        Swipe Left/Right to navigate | Tap to select | ESC to reset
      </div>
      <div style={{ position: 'absolute', bottom: 80, left: 20, right: 0, textAlign: 'left', color: 'rgba(255,215,0,0.8)', fontSize: '12px', zIndex: 100, fontFamily: 'Arial, sans-serif', maxWidth: '300px' }}>
        {EVENT_NAME} - {EVENT_SUBTITLE}
      </div>
    </div>
  );
}