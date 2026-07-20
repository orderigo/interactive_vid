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