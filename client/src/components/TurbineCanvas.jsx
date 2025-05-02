import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const TurbineCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const size = 100;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(size, size);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pt = new THREE.PointLight(0x00fff2, 1, 10);
    pt.position.set(2, 2, 2);
    scene.add(pt);

    const turbine = new THREE.Group();
    // shaft
    const shaftGeo = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
    const shaftMat = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const shaft = new THREE.Mesh(shaftGeo, shaftMat);
    shaft.rotation.z = Math.PI / 2;
    turbine.add(shaft);

    // blades
    const bladeGeo = new THREE.BoxGeometry(0.05, 0.3, 0.01);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x00fff2,
      emissive: 0x00fff2,
      emissiveIntensity: 0.5,
    });
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.set(
        0.6 * Math.cos((i * Math.PI) / 2),
        0.6 * Math.sin((i * Math.PI) / 2),
        0
      );
      turbine.add(blade);
    }

    scene.add(turbine);

    const animate = () => {
      turbine.rotation.z += 0.1;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => renderer.dispose();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={100}
      height={100}
      className="block mx-auto"
    />
  );
};

export default TurbineCanvas;
