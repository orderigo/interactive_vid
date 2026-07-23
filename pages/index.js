import Image from 'next/image';
import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EVENT_NAME = 'ရန်ကုန်အနောက်ပိုင်းတက္ကသိုလ်';
const MEMORY_TITLE = 'ကျောင်းအမှတ်တရ အစ';

const campusPhotos = [
  '/img/Screenshot_20260721-101836.png',
  '/img/Screenshot_20260721-101925.png',
  '/img/Screenshot_20260721-102147.png',
  '/img/Screenshot_20260721-103154.png',
];

const slides = [
  { year: 2001, type: 'intro' },
  { year: 2001, type: 'particles' },
];

function MemoryNodes() {
  const nodes = useMemo(
    () =>
      Array.from({ length: 28 }, (_, index) => ({
        id: index,
        x: (index * 37) % 100,
        y: (index * 53) % 100,
        size: 6 + (index % 5) * 4,
        delay: -(index % 10) * 0.7,
        duration: 8 + (index % 6),
      })),
    []
  );

  return (
    <div className="memoryLayer" aria-hidden="true">
      <div className="memoryOrb memoryOrbOne" />
      <div className="memoryOrb memoryOrbTwo" />
      <div className="memoryGrid" />
      <svg className="memoryLines" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M4 70 C20 48, 28 85, 45 55 S70 22, 96 40" />
        <path d="M8 28 C26 18, 34 42, 52 30 S78 8, 92 24" />
        <path d="M15 90 C30 70, 54 86, 72 62 S84 42, 98 58" />
      </svg>
      {nodes.map((node) => (
        <span
          className="memoryNode"
          key={node.id}
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            animationDelay: `${node.delay}s`,
            animationDuration: `${node.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

function FloatingPhoto({ src, index }) {
  return (
    <figure className={`floatingPhoto floatingPhoto${index + 1}`}>
      <Image src={src} alt={`2001 campus memory ${index + 1}`} fill sizes="(max-width: 820px) 44vw, 28vw" priority draggable="false" />
    </figure>
  );
}

function ParticleField() {
  const pointsRef = useRef();
  const groupRef = useRef();
  const particleCount = 2600;

  const { positions, targets, colors } = useMemo(() => {
    const startPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const colorValues = new Float32Array(particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      const angle = i * 0.055;
      const radius = 4.6 + Math.sin(i * 0.013) * 1.8;
      startPositions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 5;
      startPositions[i3 + 1] = (Math.random() - 0.5) * 5.8;
      startPositions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 5;

      const photo = i % 4;
      const gridIndex = Math.floor(i / 4);
      const column = gridIndex % 34;
      const row = Math.floor(gridIndex / 34) % 20;
      const photoX = photo % 2 === 0 ? -1.85 : 1.85;
      const photoY = photo < 2 ? 1.18 : -1.18;
      targetPositions[i3] = photoX + (column / 33 - 0.5) * 2.65;
      targetPositions[i3 + 1] = photoY + (row / 19 - 0.5) * 1.48;
      targetPositions[i3 + 2] = Math.sin(column * 0.4 + row * 0.25) * 0.12;

      color.setHSL(0.52 + photo * 0.06 + Math.random() * 0.08, 0.9, 0.58 + Math.random() * 0.25);
      colorValues[i3] = color.r;
      colorValues[i3 + 1] = color.g;
      colorValues[i3 + 2] = color.b;
    }

    return { positions: startPositions, targets: targetPositions, colors: colorValues };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const elapsed = clock.getElapsedTime();
    const current = pointsRef.current.geometry.attributes.position.array;
    const morph = THREE.MathUtils.smoothstep(Math.min(elapsed / 4.2, 1), 0, 1);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const wave = Math.sin(elapsed * 1.6 + i * 0.013) * 0.035;
      current[i] = THREE.MathUtils.lerp(positions[i], targets[i], morph) + wave;
      current[i + 1] = THREE.MathUtils.lerp(positions[i + 1], targets[i + 1], morph) + Math.cos(elapsed * 1.4 + i * 0.011) * 0.03;
      current[i + 2] = THREE.MathUtils.lerp(positions[i + 2], targets[i + 2], morph);
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    groupRef.current.rotation.y = Math.sin(elapsed * 0.28) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.038} vertexColors transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>
    </group>
  );
}

function ParticleMemorySlide() {
  return (
    <section className="yearCard particleCard">
      <div className="particleCanvas">
        <Canvas camera={{ position: [0, 0, 6.8], fov: 46 }} dpr={[1, 1.8]}>
          <color attach="background" args={['#02040f']} />
          <ambientLight intensity={0.8} />
          <ParticleField />
        </Canvas>
      </div>
      <div className="particleScan" />
      <div className="particleHalo" />
    </section>
  );
}

function IntroSlide() {
  return (
    <section className="yearCard introCard">
      <header className="memoryTitle">
        <p>{EVENT_NAME}</p>
        <h1>2001</h1>
        <h2>{MEMORY_TITLE}</h2>
      </header>
      <div className="floatingPhotoWall" aria-label="2001 campus memory photos">
        {campusPhotos.map((src, index) => (
          <FloatingPhoto src={src} index={index} key={src} />
        ))}
      </div>
    </section>
  );
}

function YearCard({ slide }) {
  if (slide.type === 'particles') return <ParticleMemorySlide />;
  return <IntroSlide />;
}

export default function Home() {
  const [cardIndex, setCardIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const goToCard = (direction) => {
    setCardIndex((current) => Math.min(Math.max(current + direction, 0), slides.length - 1));
  };

  const handlePointerStart = (event) => {
    const point = event.touches ? event.touches[0] : event;
    setTouchStart({ x: point.clientX, y: point.clientY });
  };

  const handlePointerEnd = (event) => {
    if (!touchStart) return;
    const point = event.changedTouches ? event.changedTouches[0] : event;
    const deltaX = point.clientX - touchStart.x;
    const deltaY = point.clientY - touchStart.y;

    if (Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY)) {
      goToCard(deltaX < 0 ? 1 : -1);
    }

    setTouchStart(null);
  };

  return (
    <main
      className="appShell"
      onTouchStart={handlePointerStart}
      onTouchEnd={handlePointerEnd}
      onMouseDown={handlePointerStart}
      onMouseUp={handlePointerEnd}
    >
      <MemoryNodes />
      <div className="cardTrack" style={{ transform: `translateX(-${cardIndex * 100}vw)` }}>
        {slides.map((slide) => (
          <YearCard key={`${slide.year}-${slide.type}`} slide={slide} />
        ))}
      </div>
    </main>
  );
}
