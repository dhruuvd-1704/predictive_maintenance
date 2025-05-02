import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// — 3D Hero Canvas: Interlocking Factory Gears (Interactive) —
const HeroCanvas = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const width = 400;
    const height = 400;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);

    // OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const keyLight = new THREE.PointLight(0xffeaa7, 1);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);
    const fillLight = new THREE.PointLight(0x74b9ff, 0.6);
    fillLight.position.set(-5, -3, 5);
    scene.add(fillLight);

    // Gear helper
    const createGear = (radius, teeth, thickness, color) => {
      const gear = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color, metalness: 0.7, roughness: 0.3 });
      const cyl = new THREE.CylinderGeometry(radius * 0.6, radius * 0.6, thickness, 32);
      const center = new THREE.Mesh(cyl, mat);
      center.rotation.x = Math.PI / 2;
      gear.add(center);
      const toothGeo = new THREE.BoxGeometry(radius * 0.1, thickness, radius * 0.02);
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeo, mat);
        tooth.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        tooth.rotation.z = -angle;
        gear.add(tooth);
      }
      return gear;
    };

    // Gears
    const gear1 = createGear(1.2, 20, 0.3, 0xdfe6e9);
    const gear2 = createGear(0.8, 14, 0.3, 0x00cec9);
    gear1.position.x = -1.1;
    gear2.position.x = 1.1;
    scene.add(gear1, gear2);

    // Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let speed1 = 0.005;
    let speed2 = -0.007;
    const onClick = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(gear1.children.concat(gear2.children));
      if (hits.length) {
        const obj = hits[0].object.parent;
        if (obj === gear1) speed1 *= 1.5;
        if (obj === gear2) speed2 *= 1.5;
      }
    };
    renderer.domElement.addEventListener('click', onClick);

    // Animate
    const animate = () => {
      gear1.rotation.z += speed1;
      gear2.rotation.z += speed2;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener('click', onClick);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
      className="w-full max-w-sm mx-auto cursor-grab"
    />
  );
};

// — 3D Turbine Canvas —
const TurbineCanvas = () => {
  const canvasRef = useRef();
  useEffect(() => {
    const size = 120;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
    camera.position.z = 2;
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, alpha: true });
    renderer.setSize(size, size);
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pt = new THREE.PointLight(0x00cec9, 1, 10);
    pt.position.set(2, 2, 2);
    scene.add(pt);
    const tGroup = new THREE.Group();
    const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1, 12), new THREE.MeshStandardMaterial({ color: 0x6c5ce7 }));
    shaft.rotation.z = Math.PI / 2; tGroup.add(shaft);
    const bladeGeo = new THREE.BoxGeometry(0.04, 0.4, 0.02);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x00cec9, emissive: 0x00cec9, emissiveIntensity: 0.5 });
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      blade.position.set(0.7 * Math.cos((i * Math.PI) / 2), 0.7 * Math.sin((i * Math.PI) / 2), 0);
      tGroup.add(blade);
    }
    scene.add(tGroup);
    const tick = () => { tGroup.rotation.z += 0.14; renderer.render(scene, camera); requestAnimationFrame(tick); };
    tick();
    return () => renderer.dispose();
  }, []);
  return <canvas ref={canvasRef} width={120} height={120} className="block mx-auto" />;
};
// const navigate = useNavigate();
// — Home Page —
const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
    <section className="container mx-auto px-6 pt-28 pb-24 flex flex-col-reverse lg:flex-row items-center">
      <div className="lg:w-1/2 space-y-6 text-center lg:text-left mt-12 lg:mt-0">
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
          Factory Machine Health<br />
          <span className="text-teal-400">In Real Time</span>
        </h1>
        <p className="text-lg text-gray-300">
          Monitor factory equipment with live sensor feeds and AI-driven insights to prevent unplanned downtime.
        </p>
        <div className="flex justify-center lg:justify-start space-x-4">
          <a href='/sensors' className="px-6 py-3 bg-teal-400 text-gray-900 rounded-lg font-medium hover:bg-teal-300 transition">Get Started</a>
          <a href="#features" className="px-6 py-3 border border-teal-400 rounded-lg font-medium hover:bg-teal-400 hover:text-gray-900 transition">How It Works</a>
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center">
        <div className="bg-black p-4 rounded-2xl cursor-grab">
          <HeroCanvas />
        </div>
      </div>
    </section>

    <section id="features" className="bg-gray-800 py-20">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="bg-gray-700 p-8 rounded-2xl hover:shadow-2xl transition duration-300">
          <h3 className="text-2xl font-bold mb-4">Live Monitoring</h3>
          <p className="text-gray-300 mb-6">Visualize sensor data from factory machines in real time with customizable dashboards.</p>
        </div>

        <div className="bg-gray-700 p-8 rounded-2xl hover:shadow-2xl transition duration-300 relative">
          <div className="absolute -top-10 right-8 w-24 h-24">
            <TurbineCanvas />
          </div>
          <h3 className="text-2xl font-bold mt-16 mb-4">Predictive Alerts</h3>
          <p className="text-gray-300">Receive early warnings on potential failures using advanced machine learning models.</p>
        </div>

        <div className="bg-gray-700 p-8 rounded-2xl hover:shadow-2xl transition duration-300">
          <h3 className="text-2xl font-bold mb-4">Automated Reports</h3>
          <p className="text-gray-300">Get detailed failure analyses and maintenance recommendations delivered automatically.</p>
        </div>
      </div>
    </section>

    <footer className="py-8 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} FactoryAI — Predictive Maintenance Platform
    </footer>
  </div>
);

export default HomePage;
