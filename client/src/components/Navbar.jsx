import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";

const gearConfig = [
  { label: "Home", id: 0, path: "/" },
  { label: "Sensors", id: 1, path: "/sensors" },
  { label: "Analytics", id: 2, path: "/analytics" },
  { label: "Settings", id: 3, path: "/settings" },
];

const Navbar = () => {
  const canvasRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const gearsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);
    const point = new THREE.PointLight(0xffaa00, 1.2, 100);
    point.position.set(0, 10, 25);
    scene.add(ambient, point);

    // Add subtle grid floor
    const grid = new THREE.GridHelper(80, 40, 0x333333, 0x222222);
    grid.rotation.x = Math.PI / 2;
    grid.position.y = -6;
    scene.add(grid);

    // Gear geometry
    const geometry = new THREE.TorusGeometry(1.2, 0.4, 16, 100);

    gearConfig.forEach((cfg, idx) => {
      const material = new THREE.MeshStandardMaterial({
        color: 0x888888,
        metalness: 0.8,
        roughness: 0.2,
      });
      const gear = new THREE.Mesh(geometry, material);
      gear.position.x = (idx - (gearConfig.length - 1) / 2) * 5;
      gear.rotation.z = Math.random() * Math.PI;
      scene.add(gear);
      gearsRef.current[idx] = gear;
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      gearsRef.current.forEach((gear, idx) => {
        // Opposite neighboring spin
        const baseSpeed = 0.02;
        gear.rotation.z += (hoveredIndex === idx ? baseSpeed * 4 : baseSpeed) * (idx % 2 === 0 ? 1 : -1);

        // Pop out and glow
        const scale = hoveredIndex === idx ? 1.4 : 1.0;
        gear.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
        gear.material.emissive.lerp(
          new THREE.Color(hoveredIndex === idx ? 0xff8c00 : 0x000000),
          0.1
        );
      });

      renderer.render(scene, camera);
    };
    animate();

    window.addEventListener("resize", () => {
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    });

    return () => {
      renderer.dispose();
      geometry.dispose();
      grid.geometry.dispose();
    };
  }, [hoveredIndex]);

  return (
    <div className="relative h-40 bg-gradient-to-r from-gray-900 to-gray-800 overflow-hidden" style={{ perspective: "900px" }}>
      <canvas ref={canvasRef} className="absolute w-full h-full top-0 left-0" />

      {/* Logo + Menu + Status */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-10">
        <div className="flex items-center space-x-4">
          <div className="text-2xl font-extrabold text-white tracking-tight">FactoryAI</div>
          <div className="text-sm text-gray-300">Predictive Maintenance</div>
        </div>
        <nav className="flex space-x-10">
          {gearConfig.map((item, idx) => (
            <Link
              key={item.id}
              to={item.path}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative text-lg font-semibold text-white cursor-pointer transition-transform"
              style={{ transform: hoveredIndex === idx ? 'scale(1.1)' : 'scale(1)' }}
            >
              {item.label}
              <div
                className="absolute left-0 right-0 h-0.5 bg-orange-500 mt-1 transition-all"
                style={{ width: hoveredIndex === idx ? '100%' : '0%' }}
              />
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-6">
          <div className="text-sm text-green-400 animate-pulse">● Online</div>
          <div className="text-sm text-gray-300">User: Admin</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;