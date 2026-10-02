"use client";

import { Environment, Float, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, type MutableRefObject } from "react";
import { MathUtils, type Group, type Mesh } from "three";
import type { PointerTarget } from "./use-global-pointer";

const BRAND_GOLD = "#E8A44A";
const BRAND_BLUE = "#4F9CF7";
const BRAND_DEEP = "#0B1A33";

/** How strongly the composition turns toward the cursor, in radians. */
const POINTER_TILT_Y = 0.55;
const POINTER_TILT_X = 0.35;
/** Higher is snappier; ~3 gives a heavy, physical follow. */
const FOLLOW_DAMPING = 3;

interface HeroSceneProps {
  pointer: MutableRefObject<PointerTarget>;
  isAnimated: boolean;
  isVisible: boolean;
  onReady: () => void;
}

function PointerRig({ pointer, children }: { pointer: MutableRefObject<PointerTarget>; children: React.ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const rig = group.current;
    if (!rig) return;
    rig.rotation.y = MathUtils.damp(rig.rotation.y, pointer.current.x * POINTER_TILT_Y, FOLLOW_DAMPING, delta);
    rig.rotation.x = MathUtils.damp(rig.rotation.x, -pointer.current.y * POINTER_TILT_X, FOLLOW_DAMPING, delta);
    rig.position.x = MathUtils.damp(rig.position.x, pointer.current.x * 0.15, FOLLOW_DAMPING, delta);
    rig.position.y = MathUtils.damp(rig.position.y, pointer.current.y * 0.1, FOLLOW_DAMPING, delta);
  });

  return <group ref={group}>{children}</group>;
}

function Spinner({ speed, children }: { speed: [number, number, number]; children: React.ReactNode }) {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    const spinner = group.current;
    if (!spinner) return;
    spinner.rotation.x += speed[0] * delta;
    spinner.rotation.y += speed[1] * delta;
    spinner.rotation.z += speed[2] * delta;
  });

  return <group ref={group}>{children}</group>;
}

function Satellite({ radius, speed, offset, color, size }: { radius: number; speed: number; offset: number; color: string; size: number }) {
  const mesh = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    const satellite = mesh.current;
    if (!satellite) return;
    const angle = clock.elapsedTime * speed + offset;
    satellite.position.set(Math.cos(angle) * radius, Math.sin(angle * 1.3) * 0.45, Math.sin(angle) * radius);
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} metalness={0.4} roughness={0.3} />
    </mesh>
  );
}

function Composition({ isAnimated }: { isAnimated: boolean }) {
  return (
    <Float speed={isAnimated ? 1.2 : 0} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh>
        <icosahedronGeometry args={[1.15, 48]} />
        <MeshDistortMaterial
          color="#F2B865"
          emissive={BRAND_GOLD}
          emissiveIntensity={0.12}
          metalness={0.55}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          iridescence={1}
          iridescenceIOR={1.35}
          iridescenceThicknessRange={[120, 420]}
          distort={0.32}
          speed={isAnimated ? 1.4 : 0}
          envMapIntensity={1.6}
        />
      </mesh>

      <Spinner speed={isAnimated ? [0.04, 0.09, 0] : [0, 0, 0]}>
        <mesh>
          <icosahedronGeometry args={[1.75, 1]} />
          <meshBasicMaterial color={BRAND_BLUE} wireframe transparent opacity={0.24} />
        </mesh>
      </Spinner>

      <group rotation={[1.15, 0.25, 0]}>
        <Spinner speed={isAnimated ? [0, 0, 0.18] : [0, 0, 0]}>
          <mesh>
            <torusGeometry args={[2.15, 0.03, 16, 200]} />
            <meshStandardMaterial color={BRAND_GOLD} emissive={BRAND_GOLD} emissiveIntensity={0.35} metalness={1} roughness={0.25} />
          </mesh>
        </Spinner>
      </group>

      {isAnimated && (
        <>
          <Satellite radius={2.4} speed={0.45} offset={0} color={BRAND_BLUE} size={0.09} />
          <Satellite radius={2.0} speed={-0.35} offset={2.1} color={BRAND_GOLD} size={0.07} />
          <Satellite radius={2.6} speed={0.28} offset={4.2} color={BRAND_BLUE} size={0.05} />
        </>
      )}
    </Float>
  );
}

/** Generated studio lighting: reflections without downloading HDR files. */
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight position={[-4, 2, 3]} intensity={40} color={BRAND_BLUE} />
      <pointLight position={[4, -1, 3]} intensity={30} color={BRAND_GOLD} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={[BRAND_DEEP]} />
        <Lightformer form="rect" intensity={3} position={[0, 4, -2]} scale={[10, 2, 1]} color="#FFFFFF" />
        <Lightformer form="rect" intensity={2} position={[-5, 0, 2]} scale={[2, 6, 1]} color={BRAND_BLUE} />
        <Lightformer form="rect" intensity={2.5} position={[5, 1, 2]} scale={[2, 6, 1]} color={BRAND_GOLD} />
        <Lightformer form="rect" intensity={1.2} position={[0, -4, 1]} scale={[8, 1.5, 1]} color={BRAND_BLUE} />
      </Environment>
    </>
  );
}

export default function HeroScene({ pointer, isAnimated, isVisible, onReady }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.9], fov: 40 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={!isVisible ? "never" : isAnimated ? "always" : "demand"}
      onCreated={onReady}
      aria-hidden="true"
    >
      <StudioLighting />
      {isAnimated ? (
        <PointerRig pointer={pointer}>
          <Composition isAnimated />
        </PointerRig>
      ) : (
        <Composition isAnimated={false} />
      )}
    </Canvas>
  );
}
