import * as THREE from "three";
import { LOGO_ASSEMBLE_END, LOGO_ASSEMBLE_START } from "@/components/home/journey/journey-config";
import type { JourneyPath } from "@/components/home/journey/scene/journey-path";
import { smoothstep, type FrameState, type ScenePart } from "@/components/home/journey/scene/scene-kit";
import { createLogoParticles, sampleLogo, type LogoParticles } from "@/components/home/journey/scene/logo-particles";

export type FinalePart = ScenePart & {
  logo: THREE.Object3D;
  /** Pixels per world unit at distance 1, so particle size follows the viewport. */
  setViewScale: (viewScale: number) => void;
};

const LOGO_WIDTH = 44;
const SCATTER = 30;
const ASSEMBLE_START = LOGO_ASSEMBLE_START;
const ASSEMBLE_END = LOGO_ASSEMBLE_END;

/** Sampling step for the logo particles (in pixels of the sampling canvas): smaller = more particles. */
const LOGO_SAMPLE_STEP = 2;
const STAR_COUNT = 1800;

/**
 * Chapter 07: the line ends in the GDX Studio logo, assembled from thousands of particles that
 * fly in from a scattered cloud (chaos turning into order); the crisp logo fades in once they land.
 */
export function createFinale(scene: THREE.Scene, path: JourneyPath, camera: THREE.Camera): FinalePart {
  const logo = new THREE.Group();
  const endPoint = path.pointAt(1);
  const endTangent = path.tangentAt(1);
  logo.position.copy(endPoint).add(new THREE.Vector3(0, 5, 0)).add(endTangent.clone().multiplyScalar(2));
  logo.visible = false;
  scene.add(logo);

  let particles: LogoParticles | null = null;
  let crispMaterial: THREE.MeshBasicMaterial | null = null;
  let viewScale = 800;
  let isDisposed = false;

  sampleLogo(LOGO_SAMPLE_STEP)
    .then(({ sample, image }) => {
      if (isDisposed) return;
      particles = createLogoParticles(sample, LOGO_WIDTH, SCATTER, false);
      particles.uniforms.uViewScale.value = viewScale;
      logo.add(particles.points);
      if (!image) return;
      const texture = new THREE.Texture(image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.needsUpdate = true;
      crispMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false, fog: false });
      const crisp = new THREE.Mesh(new THREE.PlaneGeometry(LOGO_WIDTH, LOGO_WIDTH / sample.aspect), crispMaterial);
      crisp.position.z = -0.05;
      logo.add(crisp);
    })
    .catch((error: unknown) => console.error("[journey] Could not build the logo", error));

  return {
    logo,
    setViewScale(value: number) {
      viewScale = value;
      if (particles) particles.uniforms.uViewScale.value = value;
    },
    update(state: FrameState) {
      logo.visible = state.progress >= ASSEMBLE_START - 0.01;
      if (!logo.visible) return;
      logo.lookAt(camera.position);
      const assemble = state.reduceMotion ? 1 : smoothstep(state.progress, ASSEMBLE_START, ASSEMBLE_END);
      if (particles) {
        particles.uniforms.uAssemble.value = assemble;
        particles.uniforms.uTime.value = state.elapsed;
        particles.uniforms.uMotion.value = state.reduceMotion ? 0 : 1;
        // The cloud fades in, then thins out once the crisp logo has taken over.
        const appear = smoothstep(state.progress, ASSEMBLE_START - 0.01, ASSEMBLE_START + 0.02);
        particles.uniforms.uOpacity.value = appear * (1 - 0.6 * smoothstep(assemble, 0.85, 1));
      }
      if (crispMaterial) crispMaterial.opacity = smoothstep(assemble, 0.8, 1);
    },
    dispose() {
      isDisposed = true;
    }
  };
}

/** Faint stars scattered along the route for depth. */
export function createStars(scene: THREE.Scene, path: JourneyPath): ScenePart {
  const count = STAR_COUNT;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    const point = path.pointAt(Math.random());
    positions[i * 3] = point.x + (Math.random() - 0.5) * 120;
    positions[i * 3 + 1] = point.y + (Math.random() - 0.3) * 60;
    positions[i * 3 + 2] = point.z + (Math.random() - 0.5) * 60;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  scene.add(new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x7fb6fa, size: 0.12, transparent: true, opacity: 0.55 })));
  return {};
}