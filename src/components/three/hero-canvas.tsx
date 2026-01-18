"use client";

import { useEffect, useRef } from "react";

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

import { cn } from "@/lib/utils";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function HeroThreeCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const el = canvas;

    const reduce = prefersReducedMotion();

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.6, 6.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    const lightKey = new THREE.DirectionalLight(0xffffff, 2.0);
    lightKey.position.set(3, 4, 5);
    scene.add(lightKey);

    const lightFill = new THREE.DirectionalLight(0xffffff, 0.7);
    lightFill.position.set(-5, 2, -2);
    scene.add(lightFill);

    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    const group = new THREE.Group();
    scene.add(group);

    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#a78bfa"),
      roughness: 0.15,
      metalness: 0,
      transmission: 1,
      thickness: 0.9,
      ior: 1.5,
      envMapIntensity: 1.2,
      specularIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
    });

    const edge = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1f1638"),
      metalness: 0.2,
      roughness: 0.5,
      envMapIntensity: 0.6,
    });

    const cardGeo = new RoundedBoxGeometry(2.75, 1.6, 0.14, 10, 0.16);

    const cardA = new THREE.Mesh(cardGeo, glass);
    cardA.position.set(0.4, 0.2, 0);
    cardA.rotation.set(-0.08, -0.35, 0.03);
    group.add(cardA);

    const glassB = glass.clone();
    glassB.color = new THREE.Color("#60a5fa");
    const cardB = new THREE.Mesh(cardGeo, glassB);
    cardB.position.set(1.35, -0.55, -0.55);
    cardB.scale.set(0.72, 0.72, 0.72);
    cardB.rotation.set(0.18, -0.05, 0.12);
    group.add(cardB);

    const frameGeo = new RoundedBoxGeometry(2.85, 1.7, 0.04, 10, 0.16);
    const frameA = new THREE.Mesh(frameGeo, edge);
    frameA.position.copy(cardA.position);
    frameA.rotation.copy(cardA.rotation);
    frameA.position.z -= 0.09;
    group.add(frameA);

    // Soft glow orbs (additive)
    const orbMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#7c3aed"),
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const orb1 = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 16), orbMat);
    orb1.position.set(-1.8, 1.0, -1.6);
    group.add(orb1);

    const orbMat2 = orbMat.clone();
    orbMat2.color = new THREE.Color("#2563eb");
    const orb2 = new THREE.Mesh(
      new THREE.SphereGeometry(0.65, 32, 16),
      orbMat2
    );
    orb2.position.set(2.1, 0.9, -2.0);
    group.add(orb2);

    const orbMat3 = orbMat.clone();
    orbMat3.color = new THREE.Color("#a855f7");
    const orb3 = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 16), orbMat3);
    orb3.position.set(0.2, -1.3, -1.8);
    group.add(orb3);

    const clock = new THREE.Clock();
    let raf = 0;
    let isVisible = true;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    function onPointerMove(e: PointerEvent) {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      target.x = (x - 0.5) * 2;
      target.y = (y - 0.5) * 2;
    }

    el.addEventListener("pointermove", onPointerMove, { passive: true });

    function resize() {
      const rect = el.getBoundingClientRect();
      const width = Math.max(1, Math.floor(rect.width));
      const height = Math.max(1, Math.floor(rect.height));
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(el);
    resize();

    const io = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((en) => en.isIntersecting);
        if (isVisible && !raf) tick();
      },
      { root: null, threshold: 0.01 }
    );
    io.observe(el);

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!isVisible) return;

      const t = clock.getElapsedTime();

      // Smooth pointer tracking
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;

      // Base motion
      const wobble = reduce ? 0 : 0.06;
      group.rotation.y = -0.12 + current.x * 0.18 + Math.sin(t * 0.35) * wobble;
      group.rotation.x = 0.06 + -current.y * 0.14 + Math.cos(t * 0.28) * wobble;
      group.position.y = Math.sin(t * 0.6) * (reduce ? 0 : 0.08);

      orb1.position.y = 1.0 + Math.sin(t * 0.9) * (reduce ? 0 : 0.12);
      orb2.position.x = 2.1 + Math.cos(t * 0.7) * (reduce ? 0 : 0.14);
      orb3.position.y = -1.3 + Math.sin(t * 0.8) * (reduce ? 0 : 0.1);

      renderer.render(scene, camera);
    }

    tick();

    return () => {
      cancelAnimationFrame(raf);
      raf = 0;
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onPointerMove);

      // Dispose
      cardGeo.dispose();
      frameGeo.dispose();
      orb1.geometry.dispose();
      orb2.geometry.dispose();
      orb3.geometry.dispose();
      glass.dispose();
      glassB.dispose();
      edge.dispose();
      orbMat.dispose();
      orbMat2.dispose();
      orbMat3.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "h-full w-full [touch-action:manipulation] [contain:layout_paint_size]",
        className
      )}
      aria-hidden="true"
    />
  );
}
