import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const width = 400, height = 400;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0x404040, 0.5));

    const geo = new THREE.TorusKnotGeometry(0.8, 0.2, 100, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x00fff2,
      metalness: 0.6,
      roughness: 0.2,
      emissive: 0x002222,
      emissiveIntensity: 0.2,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    const animate = () => {
      knot.rotation.x += 0.005;
      knot.rotation.y += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => renderer.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="w-full max-w-xs md:max-w-sm"
    />
  );
};

export default HeroCanvas;
